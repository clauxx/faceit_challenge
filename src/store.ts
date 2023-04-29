import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  configureStore,
  combineReducers,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

interface PostsState {
  liked: number[];
}

const initialState: PostsState = {
  liked: [],
};
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<number>) => {
      state.liked.push(action.payload);
    },
    unlikePost: (state, action: PayloadAction<number>) => {
      state.liked = state.liked.filter((id) => id !== action.payload);
    },
  },
});

export const { likePost, unlikePost } = postsSlice.actions;

export const selectLikedPost = (id: number) => (state: RootState) =>
  state.posts.liked.includes(id);

const reducers = combineReducers({
  posts: postsSlice.reducer,
});

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
