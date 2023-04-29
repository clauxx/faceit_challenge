import { Author } from '@/utils/api';
import { colors } from '@/utils/styles';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import styled from 'styled-components/native';

interface AuthorAvatarProps {
  author: Author | null;
  size: 50 | 100;
}

const ContainerBtn = styled.TouchableOpacity<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  padding: 2px;
  border-radius: ${({ size }) => size / 2}px;
  border-width: 2px;
`;
const PlaceholderBtn = styled(ContainerBtn)`
  background-color: ${colors.textWhite40};
`;

const StyledImage = styled.Image<{ size: number }>`
  width: 100%;
  height: 100%;
  border-radius: ${({ size }) => size / 2}px;
`;

export const AuthorAvatar = ({ author, size }: AuthorAvatarProps) => {
  const { navigate } = useNavigation();

  const handlePress = useCallback(() => {
    if (author) {
      navigate('Author', { author });
    }
  }, []);

  return author ? (
    <ContainerBtn activeOpacity={0.8} onPress={handlePress} size={size}>
      <StyledImage size={size} source={{ uri: author.avatarUrl }} />
    </ContainerBtn>
  ) : (
    <PlaceholderBtn activeOpacity={1} size={size} />
  );
};
