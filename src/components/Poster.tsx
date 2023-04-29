import { colors, debugStyle } from '@/utils/styles';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 120px;
  height: 180px;
  ${debugStyle()};
`;
const PlaceholderContainer = styled(Container)`
  background-color: ${colors.placeholder};
  border-radius: 12px;
`;
const StyledImage = styled.Image`
  flex: 1;
  border-radius: 12px;
`;

interface PosterProps {
  url: string | null;
}

export const Poster = ({ url }: PosterProps) => {
  return url ? (
    <Container>
      <StyledImage resizeMode={'cover'} source={{ uri: url }} />
    </Container>
  ) : (
    <PlaceholderContainer />
  );
};
