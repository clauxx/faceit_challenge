import {
  DarkTheme,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '@/components/Header';
import { PostProps } from '@/screens/post/Post';
import { AuthorProps } from './screens/author/Author';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type RootStackParamList = {
  Feed: undefined;
  Post: PostProps;
  Author: AuthorProps;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

const screens: Record<keyof RootStackParamList, any> = {
  Feed: () => require('@/screens/feed/Feed').Feed,
  Post: () => require('@/screens/post/Post').Post,
  Author: () => require('@/screens/author/Author').Author,
};

type GetOptions = <T extends keyof RootStackParamList>(args: {
  route: RouteProp<RootStackParamList, T>;
}) => {};

const getOptionsWithHeader =
  (config?: { showBack?: boolean }) =>
  (...[args]: Parameters<GetOptions>): ReturnType<GetOptions> =>
    ({
      headerShown: true,
      headerTransparent: true,
      header: () => (
        <Header title={args.route.name} showBack={config?.showBack ?? false} />
      ),
    } as const);

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen
          name="Feed"
          getComponent={screens.Feed}
          options={getOptionsWithHeader()}
        />
        <Stack.Screen
          name="Post"
          getComponent={screens.Post}
          options={getOptionsWithHeader({ showBack: true })}
        />
        <Stack.Screen
          name="Author"
          getComponent={screens.Author}
          options={getOptionsWithHeader({ showBack: true })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
