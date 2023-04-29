import { AuthorAvatar } from '@/components/AuthorAvatar';
import { Heart } from '@/components/Heart';
import { Poster } from '@/components/Poster';
import { Container, H2, H3, H4, P2 } from '@/components/styled';
import { RootRouteProps } from '@/Navigation';
import { usePost } from '@/utils/posts';
import { colors, debugStyle } from '@/utils/styles';
import { useRoute } from '@react-navigation/native';
import { Suspense } from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  padding-top: 36px;
  width: 100%;
  align-items: center ${debugStyle()};
`;
const StyledScroll = styled.ScrollView`
  flex: 1
  padding: 0 16px;
`;
const GameContainer = styled.View`
  width: 100%;
  margin-top: 36px;
  flex-direction: row;
  ${debugStyle()};
`;
const GameContent = styled.View`
  flex: 1;
  padding: 4px 16px;
  justify-content: flex-end;
`;
const PostContent = styled.View`
  width: 100%;
  margin-top: 36px;
  padding-right: 20px;
  flex-direction: row;
  padding-bottom: 36px;
`;
const PostBar = styled.View`
  width: 8px;
  height: 100%;
  background-color: ${colors.textWhite80};
`;
const PostContentContainer = styled.View`
  padding-left: 28px;
`;
const HeartContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;
const ReleaseYearText = styled(H4)`
  margin-top: 4px;
`;
const PostText = styled(P2)`
  font-style: italic;
`;
const Name = styled(H2)`
  margin-top: 8px;
`;

export interface PostProps {
  id: number;
  queryKey: string;
}

const PostScreen = () => {
  const {
    params: { id, queryKey },
  } = useRoute<RootRouteProps<'Post'>>();
  const post = usePost(queryKey, id);

  return (
    <Container>
      <StyledScroll>
        <HeaderContainer>
          <AuthorAvatar author={post.author} size={100} />
          <Name>{post.author.name}</Name>
        </HeaderContainer>
        <GameContainer>
          <Poster url={post.game.posterUrl} />
          <GameContent>
            <HeartContainer>
              <Heart postId={post.id} size={60} />
            </HeartContainer>
            <H3>{post.game.name}</H3>
            <ReleaseYearText>{`(${post.game.releaseYear})`}</ReleaseYearText>
          </GameContent>
        </GameContainer>
        <PostContent>
          <PostBar />
          <PostContentContainer>
            <PostText>{post.post}</PostText>
          </PostContentContainer>
        </PostContent>
      </StyledScroll>
    </Container>
  );
};

export const Post = () => (
  <Suspense fallback={null}>
    <PostScreen />
  </Suspense>
);
