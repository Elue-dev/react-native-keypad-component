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
  keypadColor?: string;
  textColor?: string;
  activeDotColor?: string;
  emptyDotColor?: string;
  dotWidth?: number;
  dotHeight?: number;
  gridGap?: number;
  renderFaceIdIcon?: () => ReactNode;
  applyBackgroundToFaceIdButton?: boolean;
};
