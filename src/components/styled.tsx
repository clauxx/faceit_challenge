import { ViewProps } from 'react-native/types';
import { useHeaderHeight } from '@react-navigation/elements';
import styled from 'styled-components/native';
import { colors, debugStyle } from '@/utils/styles';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.primary};
`;

export const ContainerView = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`;
export const Container = (props: ViewProps) => {
  const height = useHeaderHeight();
  return (
    <ContainerView {...props} style={[props.style, { paddingTop: height }]} />
  );
};

export const H1 = styled.Text`
  font-size: 44px;
  font-weight: 900;
  color: ${colors.textWhite};
  text-align: left;
  ${debugStyle()}
`;
export const H2 = styled.Text`
  font-size: 32px;
  font-weight: 900;
  color: ${colors.textWhite};
  text-align: left;
  ${debugStyle()}
`;
export const H3 = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.textWhite};
  text-align: left;
`;
export const H4 = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: ${colors.textWhite80};
  text-align: left;
`;
export const H5 = styled.Text`
  font-size: 12px;
  font-weight: 800;
  color: ${colors.textWhite};
  text-align: left;
`;

export const P2 = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textWhite80};
  text-align: left;
`;
export const P3 = styled.Text`
  font-size: 12px;
  font-weight: 300;
  color: ${colors.textWhite80};
  text-align: left;
`;
export const P4 = styled.Text`
  font-size: 8px;
  font-weight: 500;
  color: ${colors.textWhite80};
  text-align: left;
`;
