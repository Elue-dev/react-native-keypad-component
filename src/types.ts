import type { ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';

export type Theme = 'light' | 'dark';

export type KeypadProps = {
  onPinEntered: (pin: string) => void;
  onPinErrored?: boolean;
  errorMessageComponent?: () => ReactNode;
  pinLength?: number;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  keypadTextSize?: number;
  disableKeypadBackground?: boolean;
  usesFaceId?: boolean;
  keypadRadius?: number;
  theme?: Theme;
  keypadColorLight?: string;
  keypadColorDark?: string;
  textColorLight?: string;
  textColorDark?: string;
  dotColorLight?: string;
  dotColorDark?: string;
  emptyDotColor?: string;
  gridGap?: number;
  renderFaceIdIcon?: () => ReactNode;
  applyBackgroundToFaceIdButton?: boolean;
};
