import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { Post } from './api';
import { suspend } from 'suspend-react';
import { useMemo } from 'react';

type PaginatedPosts = InfiniteData<Post[]>;

const isPostArray = (data: any): data is Post[] => {
  return Array.isArray(data as Post[]) && 'post' in data[0];
};

export const flattenPaginatedPosts = (data: PaginatedPosts | undefined) =>
  _.uniqBy(_.flatten(data?.pages), 'id');
const convertDataToPosts = (data: any) => {
  if (data) {
    if (isPostArray(data)) {
      return data;
    } else {
      return flattenPaginatedPosts(data);
    }
  } else {
    return [];
  }
};

export const usePost = (queryKey: string, id: number) => {
  const client = useQueryClient();
  const { data } = useQuery([queryKey], async () =>
    client.getQueryData([queryKey])
  );
  const post = useMemo(
    () => convertDataToPosts(data).find((post) => post.id === id),
    [data]
  );

  return suspend(async () => {
    return new Promise<Post>((res, rej) => {
      setTimeout(() => {
        if (post) {
          res(post);
        } else {
          rej(new Error('Post not found'));
        }
      }, Math.random() * 2000);
    });
  }, [post?.id]);
};
