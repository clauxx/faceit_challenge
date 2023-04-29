import { AuthorAvatar } from '@/components/AuthorAvatar';
import { PostItem } from '@/components/PostItem';
import { Container, H2 } from '@/components/styled';
import { RootRouteProps } from '@/Navigation';
import { Api, Author as IAuthor, Post } from '@/utils/api';
import { debugStyle } from '@/utils/styles';
import { usePostViewability } from '@/utils/usePostViewability';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, ViewToken } from 'react-native';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  padding-top: 36px;
  padding-bottom: 36px;
  width: 100%;
  align-items: center ${debugStyle()};
`;
const StyledList = styled(FlatList as typeof FlatList<Post>)`
  flex: 1;
  ${debugStyle()};
`;
const Name = styled(H2)`
  margin-top: 8px;
`;

export interface AuthorProps {
  author: IAuthor;
}

const AuthorScreen = () => {
  const {
    params: { author },
  } = useRoute<RootRouteProps<'Author'>>();
  const queryKey = useMemo(() => `authorFeed-${author.id}`, [author]);
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: Api.postsByAuthor({ authorId: author.id }),
  });
  const listData = useMemo(() => {
    return data ?? [];
  }, [data]);

  const { visiblePosts, handleViewPosts, viewabilityConfig } =
    usePostViewability();

  const handleRenderItem: ListRenderItem<Post> = useCallback(
    ({ item }) => {
      return (
        <PostItem
          key={item.id}
          queryKey={queryKey}
          id={item.id}
          hideAuthor={true}
          visible={visiblePosts.includes(item.id)}
        />
      );
    },
    [visiblePosts]
  );

  const ListHeader = useMemo(
    () => (
      <HeaderContainer>
        <AuthorAvatar author={author} size={100} />
        <Name>{author.name}</Name>
      </HeaderContainer>
    ),
    [author]
  );

  return (
    <Container>
      <StyledList
        data={listData}
        renderItem={handleRenderItem}
        ListHeaderComponent={ListHeader}
        onViewableItemsChanged={handleViewPosts}
        viewabilityConfig={viewabilityConfig}
      />
    </Container>
  );
};

export const Author = () => (
  <Suspense fallback={null}>
    <AuthorScreen />
  </Suspense>
);
