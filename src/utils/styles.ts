export const colors = {
  primary: 'rgb(19, 7, 12)',
  textWhite: 'rgb(232, 233, 235)',
  textWhite80: 'rgba(232, 233, 235, 0.8)',
  textWhite90: 'rgba(232, 233, 235, 0.9)',
  textWhite40: 'rgba(232, 233, 235, 0.2)',
  placeholder: 'rgba(232, 233, 235, 0.2)',
  card: 'rgb(0, 0, 0)',
  heart: 'rgb(215, 130, 186)',
  avatarBorder: 'rgb(232, 233, 235)',
} as const;

export const headerHeight = 120;

const SHOW_DEBUG = false;

const randomColor = (alpha: number) =>
  `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, ${alpha})`;
export const debugStyle = () =>
  __DEV__ && SHOW_DEBUG && `border: 1px solid ${randomColor(0.4)}`;
