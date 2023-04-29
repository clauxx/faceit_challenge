import { AuthorAvatar } from '@/components/AuthorAvatar';
import { Poster } from '@/components/Poster';
import { H3, H5, P3, P4 } from '@/components/styled';
import { ErrorBoundary } from 'react-error-boundary';
import { usePost } from '@/utils/posts';
import { colors, debugStyle } from '@/utils/styles';
import { useNavigation } from '@react-navigation/native';
import { memo, Suspense, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { Heart } from './Heart';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Btn = styled.TouchableOpacity<{ hideAuthor: boolean }>`
  width: 100%;
  height: ${({ hideAuthor }) => `${hideAuthor ? 200 : 300}px`}
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
`;

const StyledFeedItem = styled.View`
  flex: 1;
  padding: 0 20px;
  ${debugStyle()}
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  height: 200px;
  ${debugStyle()};
`;
const Header = styled.View`
  height: 100px;
  width: 100%;
  flex-direction: row;
  ${debugStyle()}
`;
const AvatarContainer = styled.View`
  flex: 0.25;
  align-items: center;
  justify-content: center;
  ${debugStyle()}
`;
const HeaderContent = styled.View`
  flex: 0.75;
  align-items: flex-start;
  justify-content: center;
  ${debugStyle()}
`;
const PosterContainer = styled.View`
  padding: 12px;
  flex: 0.4;
  align-items: center;
  justify-content: center;
`;
const ContentContainer = styled.View`
  flex: 0.6
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 2px;
  ${debugStyle()}
`;
const PostContainer = styled.View`
  flex: 1;
  padding-right: 12px;
  overflow: hidden;
  ${debugStyle()}
`;
const Separator = styled.View`
  width: 100%;
  height: 6px;
  background-color: ${colors.textWhite40};
`;
const GameName = styled(H5)`
  padding-right: 4px;
`;
const GameReleaseYear = styled(P4)`
  margin-top: 2px;
`;
const PostText = styled(P3)`
  margin-top: 16px;
  font-style: italic;
`;

interface PostItemProps {
  id: number;
  queryKey: string;
  hideAuthor?: boolean;
  visible?: boolean;
}

const PostItemUnmemoized = ({
  id,
  queryKey,
  hideAuthor = false,
  visible,
}: PostItemProps) => {
  const post = usePost(queryKey, id);
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(() => {
    navigation.navigate('Post', { queryKey, id });
  }, [queryKey, id]);

  const posterAnimationStyle = useAnimatedStyle(() => {
    const config = {
      damping: 10,
      stiffness: 100,
      mass: 2,
    };
    return {
      opacity: withSpring(visible ? 1 : 0.4, config),
      transform: [
        {
          rotateX: withSpring(visible ? '5deg' : '-40deg', config),
        },
        {
          rotateY: withSpring(visible ? '0deg' : '10deg', config),
        },
        {
          scale: isPressed
            ? withTiming(0.9, { duration: 150 })
            : withSpring(visible ? 1 : 1.1, config),
        },
      ],
    };
  }, [visible, isPressed]);

  const heartAnimationStyle = useAnimatedStyle(() => {
    const config = {
      damping: 10,
      stiffness: 100,
      mass: 1,
    };

    return {
      transform: [
        {
          rotateY: visible ? withSpring('360deg', config) : '0deg',
        },
      ],
    };
  }, [visible]);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  return (
    <Btn
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      hideAuthor={hideAuthor}
      onPress={handlePress}
    >
      <StyledFeedItem>
        <Separator />
        {!hideAuthor && (
          <Header>
            <AvatarContainer>
              <AuthorAvatar author={post.author} size={50} />
            </AvatarContainer>
            <HeaderContent>
              <H3>{post.author.name}</H3>
            </HeaderContent>
            <Animated.View
              style={[
                {
                  flex: 0.1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                },
                heartAnimationStyle,
              ]}
            >
              <Heart postId={post.id} size={30} />
            </Animated.View>
          </Header>
        )}
        <Content>
          <PosterContainer>
            <Animated.View style={[posterAnimationStyle]}>
              <Poster url={post.game.posterUrl} />
            </Animated.View>
          </PosterContainer>
          <ContentContainer>
            <GameName>{post.game.name}</GameName>
            <GameReleaseYear>{`(${post.game.releaseYear})`}</GameReleaseYear>
            <PostContainer>
              <PostText numberOfLines={7}>{'" ' + post.post}</PostText>
            </PostContainer>
          </ContentContainer>
        </Content>
      </StyledFeedItem>
    </Btn>
  );
};

const NamePlaceholder = styled(H3)`
  background-color: ${colors.placeholder};
  border-radius: 8px;
  overflow: hidden;
  width: ${() => Math.random() * (200 - 100) + 100}px;
`;
const GameNamePlaceholder = styled(GameName)`
  background-color: ${colors.placeholder};
  border-radius: 8px;
  overflow: hidden;
  width: ${() => Math.random() * (200 - 100) + 100}px;
`;
const GameReleasePlaceholder = styled(GameReleaseYear)`
  background-color: ${colors.placeholder};
  border-radius: 8px;
  overflow: hidden;
  width: ${() => Math.random() * (40 - 20) + 20}px;
`;
const PostContainerPlaceholder = styled(PostContainer)`
  background-color: ${colors.placeholder};
  margin-top: 16px;
  border-radius: 8px;
`;

const Fallback = (props: Pick<PostItemProps, 'hideAuthor'>) => (
  <Btn hideAuthor={props.hideAuthor ?? false}>
    <StyledFeedItem>
      <Separator />
      {props.hideAuthor ? null : (
        <Header>
          <AvatarContainer>
            <AuthorAvatar author={null} size={50} />
          </AvatarContainer>
          <HeaderContent>
            <NamePlaceholder />
          </HeaderContent>
        </Header>
      )}
      <Content>
        <PosterContainer>
          <Poster url={null} />
        </PosterContainer>
        <ContentContainer>
          <GameNamePlaceholder />
          <GameReleasePlaceholder />
          <PostContainerPlaceholder />
        </ContentContainer>
      </Content>
    </StyledFeedItem>
  </Btn>
);

export const PostItem = memo((props: PostItemProps) => (
  <Suspense fallback={<Fallback {...props} />}>
    <ErrorBoundary fallback={<Fallback {...props} />}>
      <PostItemUnmemoized {...props} />
    </ErrorBoundary>
  </Suspense>
));
