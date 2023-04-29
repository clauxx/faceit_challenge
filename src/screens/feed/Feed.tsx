import { Container, H1, H2, H3, H4 } from '@/components/styled';
import _ from 'lodash';
import {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Post, Api } from '@/utils/api';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import { colors } from '@/utils/styles';
import { PostItem } from '@/components/PostItem';
import styled from 'styled-components/native';
import { flattenPaginatedPosts } from '@/utils/posts';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigation } from '@react-navigation/native';
import { usePostViewability } from '@/utils/usePostViewability';

export const StyledList = styled(FlatList as typeof FlatList<Post>)`
  flex: 1;
  padding-top: 60px;
  padding-bottom: 80px;
`;
const CenterContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

// NOTE: hacky way to get nr of posts to know when to stop paginating,
// cause the backend doesn't return pagination info
const TOTAL_POSTS = (require('@/../server/db.json') as { posts: Post[] }).posts
  .length;
const PAGINATION_LIMIT = 8 as const;
export const FEED_QUERY_KEY = 'feed' as const;

const FeedScreen = memo(() => {
  const [page, setPage] = useState(1);
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [FEED_QUERY_KEY],
    queryFn: Api.posts({ limit: PAGINATION_LIMIT }),
    keepPreviousData: true,
    getNextPageParam: () => {
      return page;
    },
    useErrorBoundary: true,
  });
  const listData = useMemo(() => flattenPaginatedPosts(data), [data]);
  const hasNextPage = useMemo(() => {
    return listData.length < TOTAL_POSTS;
  }, [listData]);

  const { visiblePosts, handleViewPosts, viewabilityConfig } =
    usePostViewability();

  const handleRenderItem: ListRenderItem<Post> = useCallback(
    ({ item }) => {
      return (
        <PostItem
          queryKey={FEED_QUERY_KEY}
          id={item.id}
          visible={visiblePosts.includes(item.id)}
        />
      );
    },
    [visiblePosts]
  );

  const fetchMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage({ pageParam: page + 1 }).then(() => {
        setPage(page + 1);
      });
    }
  }, [fetchNextPage, isFetchingNextPage, hasNextPage, page]);

  const queryClient = useQueryClient();
  const refresh = useCallback(() => {
    if (!isRefetching) {
      setPage(1);
      refetch();
    }
  }, [queryClient, refetch]);

  return isLoading ? (
    <CenterContainer>
      <ActivityIndicator size={'large'} />
    </CenterContainer>
  ) : (
    <Container>
      <StyledList
        data={listData}
        keyExtractor={(item) => `item-${item.id}`}
        renderItem={handleRenderItem}
        onEndReached={fetchMore}
        contentContainerStyle={{ paddingBottom: 80 }}
        onEndReachedThreshold={2}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refresh}
            tintColor={colors.textWhite}
          />
        }
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handleViewPosts}
      />
    </Container>
  );
});

const ErrorFallback = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <CenterContainer>
      <H1>:(</H1>
      <H2 style={{ marginTop: 20 }}>Something went wrong</H2>
      <H4 style={{ marginTop: 16, paddingHorizontal: 20, textAlign: 'center' }}>
        Make sure the server is running. If on a device, replace localhost with
        your IP inside the `./src/utils/api.ts` file
      </H4>
    </CenterContainer>
  );
};
export const Feed = () => (
  <ErrorBoundary fallback={<ErrorFallback />}>
    <FeedScreen />
  </ErrorBoundary>
);
