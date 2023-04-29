import { useCallback, useState, useMemo } from 'react';
import { ViewToken } from 'react-native';
import { Post } from './api';

export const usePostViewability = () => {
  const [visible, setVisible] = useState<number[]>([]);

  const handleViewPosts = useCallback(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      const visiblePosts: Post[] = info.viewableItems.map((v) => v.item);
      const visibleIds = visiblePosts.map((p) => p.id);
      setVisible(visibleIds);
    },
    []
  );

  const viewabilityConfig = useMemo(
    () => ({
      minimumViewTime: 1,
      itemVisiblePercentThreshold: 40,
    }),
    []
  );

  return {
    visiblePosts: visible,
    handleViewPosts,
    viewabilityConfig,
  };
};
