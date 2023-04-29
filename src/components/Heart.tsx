import {
  likePost,
  selectLikedPost,
  unlikePost,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { useCallback } from 'react';
import styled from 'styled-components/native';

const Btn = styled.TouchableOpacity<{ size: number }>`
  align-items: center;
  justify-content: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
`;
const HeartImage = styled.Image<{ isLiked: boolean }>`
  opacity: ${({ isLiked }) => (isLiked ? 1 : 0.3)};
  width: 100%;
  height: 100%;
`;

interface HeartProps {
  postId: number;
  size: 30 | 60;
}

export const Heart = ({ postId, size }: HeartProps) => {
  const isLiked = useAppSelector(selectLikedPost(postId));
  const dispatch = useAppDispatch();

  const handleLike = useCallback(() => {
    if (isLiked) {
      dispatch(unlikePost(postId));
    } else {
      dispatch(likePost(postId));
    }
  }, [dispatch, isLiked, postId]);

  return (
    <Btn onPress={handleLike} size={size}>
      <HeartImage isLiked={isLiked} source={require('@/assets/heart.png')} />
    </Btn>
  );
};
