import React, { Fragment, useCallback, useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
  ZoomOut,
  type SharedValue,
} from 'react-native-reanimated';
import { ANIMATION_VALUES, DEFAULTS } from './constants';
import type { KeypadProps, Theme } from './types';

export default function Keypad({
  onPinEntered,
  onPinErrored,
  onDigitPressed,
  onBackspacePressed,
  errorMessageComponent,
  pinLength = DEFAULTS.pinLength,
  containerStyle,
  buttonStyle,
  buttonTextStyle,
  keypadTextSize = DEFAULTS.keypadTextSize,
  disableKeypadBackground = DEFAULTS.displayKeypadBg,
  usesFaceId = DEFAULTS.useFaceId,
  keypadRadius = DEFAULTS.borderRadius,
  theme = DEFAULTS.theme as Theme,
  activeDotColor,
  emptyDotColor = DEFAULTS.emptyDotColor,
  keypadColor,
  textColor,
  dotWidth = DEFAULTS.dotWidth,
  dotHeight = DEFAULTS.dotHeight,
  gridGap = DEFAULTS.gridGap,
  renderFaceIdIcon,
  applyBackgroundToFaceIdButton = DEFAULTS.applyFaceIdButtonBackground,
}: KeypadProps) {
  const isDarkTheme = theme === 'dark';
  const dotColor = isDarkTheme ? DEFAULTS.dotColorDark : DEFAULTS.dotColorLight;
  const defaultTextColor = isDarkTheme
    ? DEFAULTS.textColorDark
    : DEFAULTS.textColorLight;
  const defaultKeypadColor = isDarkTheme
    ? DEFAULTS.keyboardColorDark
    : DEFAULTS.keyboardColorLight;
  const [pin, setPin] = useState<string>('');
  const offset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });
  const dotScales: SharedValue<number>[] = [
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
  ];

  const animatedDotStyles = [
    useAnimatedStyle(() => ({
      transform: [{ scale: dotScales[0]?.value ?? 1 }],
    })),
    useAnimatedStyle(() => ({
      transform: [{ scale: dotScales[1]?.value ?? 2 }],
    })),
    useAnimatedStyle(() => ({
      transform: [{ scale: dotScales[2]?.value ?? 3 }],
    })),
    useAnimatedStyle(() => ({
      transform: [{ scale: dotScales[3]?.value ?? 4 }],
    })),
  ];

  const applyShakeAnimation = useCallback(() => {
    offset.value = withSequence(
      withTiming(-ANIMATION_VALUES.offset, {
        duration: ANIMATION_VALUES.timing / 2,
      }),
      withRepeat(
        withTiming(ANIMATION_VALUES.offset, {
          duration: ANIMATION_VALUES.timing,
        }),
        4,
        true
      ),
      withTiming(0, { duration: ANIMATION_VALUES.timing / 2 })
    );
  }, [offset]);

  useEffect(() => {
    if (onPinErrored) {
      applyShakeAnimation();
    }
  }, [onPinErrored, applyShakeAnimation]);

  function handlePress(digit: string) {
    onDigitPressed?.(digit);
    const newPin = pin + digit;
    if (newPin.length <= pinLength) {
      setPin(newPin);

      const nextIndex = newPin.length - 1;
      const dot = dotScales[nextIndex];
      if (dot) {
        dot.value = withSequence(
          withTiming(1.2, { duration: 100 }),
          withTiming(1, { duration: 100 })
        );
      }

      if (newPin.length === pinLength) {
        onPinEntered(newPin);
        setTimeout(() => setPin(''), 200);
      }
    }
  }

  function handleDelete() {
    onBackspacePressed?.();
    if (pin.length > 0) {
      const indexToAnimate = pin.length - 1;

      const dot = dotScales[indexToAnimate];
      if (dot) {
        dot.value = withSequence(
          withTiming(1.2, { duration: 100 }),
          withTiming(1, { duration: 100 })
        );
      }

      setPin((prev) => prev.slice(0, -1));
    }
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.dotsContainer, animatedStyle]}>
        {Array.from({ length: pinLength }).map((_, index) => {
          return (
            <Animated.View
              key={index}
              testID={index < pin.length ? 'pin-dot-filled' : 'pin-dot'}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index < pin.length
                      ? (activeDotColor ?? dotColor)
                      : emptyDotColor,
                  borderRadius: keypadRadius,
                  width: dotWidth,
                  height: dotHeight,
                },
                animatedDotStyles[index],
              ]}
            />
          );
        })}
      </Animated.View>

      {onPinErrored && errorMessageComponent && (
        <Animated.View
          layout={LinearTransition.springify().damping(
            ANIMATION_VALUES.damping
          )}
          entering={ZoomIn}
          exiting={ZoomOut}
          style={{ marginBottom: 10 }}
        >
          {errorMessageComponent()}
        </Animated.View>
      )}

      <Animated.View
        layout={LinearTransition.springify().damping(ANIMATION_VALUES.damping)}
        style={[
          styles.grid,
          {
            gap: gridGap,
          },
        ]}
      >
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'face', '0', 'del'].map(
          (key, index) => {
            if (key === 'face') {
              return usesFaceId ? (
                <Fragment key={key}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={[
                      styles.button,
                      {
                        borderRadius: keypadRadius,
                        backgroundColor: disableKeypadBackground
                          ? 'transparent'
                          : applyBackgroundToFaceIdButton
                            ? (buttonStyle &&
                                (buttonStyle as ViewStyle).backgroundColor) ||
                              keypadColor ||
                              defaultKeypadColor
                            : 'transparent',
                      },
                      buttonStyle,
                    ]}
                  >
                    {renderFaceIdIcon ? renderFaceIdIcon() : <Text>🔐</Text>}
                  </TouchableOpacity>
                </Fragment>
              ) : (
                <View
                  key={index}
                  style={[
                    styles.button,
                    {
                      backgroundColor: disableKeypadBackground
                        ? 'transparent'
                        : (keypadColor ?? defaultKeypadColor),
                      borderRadius: keypadRadius,
                      opacity: 0,
                    },
                  ]}
                />
              );
            }

            if (key === 'del') {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={key}
                  style={[
                    styles.button,
                    {
                      backgroundColor: disableKeypadBackground
                        ? 'transparent'
                        : (keypadColor ?? defaultKeypadColor),
                      borderRadius: keypadRadius,
                    },
                    buttonStyle,
                  ]}
                  onPress={handleDelete}
                >
                  <Text
                    style={[
                      {
                        color: textColor ?? defaultTextColor,
                        fontSize: keypadTextSize,
                      },
                      buttonTextStyle,
                    ]}
                  >
                    ⌫
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                activeOpacity={0.6}
                testID={`key-${key}`}
                key={index}
                style={[
                  styles.button,
                  {
                    backgroundColor: disableKeypadBackground
                      ? 'transparent'
                      : (keypadColor ?? defaultKeypadColor),
                    borderRadius: keypadRadius,
                  },
                  buttonStyle,
                ]}
                onPress={() => handlePress(key)}
              >
                <Text
                  style={[
                    {
                      color: textColor ?? defaultTextColor,
                      fontSize: keypadTextSize,
                    },
                    buttonTextStyle,
                  ]}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 5,
  },
  dot: {
    margin: 8,
    borderRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
