# react-native-keypad

A customizable and animated keypad component for React Native applications, perfect for PIN entry, passcode screens, and secure input scenarios.

## Features

- ✨ Smooth animations with React Native Reanimated
- 🎨 Customizable themes (light/dark)
- 📱 Biometric authentication support (Face ID/Touch ID)
- 🔧 Highly configurable styling
- 🎯 TypeScript support
- 📏 Adjustable PIN length
- 🚫 Built-in error handling with shake animation
- 🎭 Custom error message components

## Installation

### npm

```sh
npm install react-native-keypad
```

### yarn

```sh
yarn add react-native-keypad
```

### bun

```sh
bun add react-native-keypad
```

### Expo

```sh
npx expo install react-native-keypad
```

### Peer Dependencies

This package requires the following peer dependencies:

```sh
yarn add react-native-reanimated
```

Make sure to follow the [React Native Reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) for proper setup.

## Basic Usage

```js
import React from 'react';
import { Keypad } from 'react-native-keypad';

export default function App() {
  const handlePinEntered = (pin) => {
    console.log('PIN entered:', pin);
    // Handle PIN validation here
  };

  return <Keypad onPinEntered={handlePinEntered} pinLength={4} />;
}
```

## Advanced Usage

```js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Keypad } from 'react-native-keypad';

export default function SecureScreen() {
  const [hasError, setHasError] = useState(false);

  const handlePinEntered = (pin) => {
    if (pin === '1234') {
      setHasError(false);
      // Navigate to secure area
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 3000);
    }
  };

  const renderFaceIdIcon = () => <Text style={{ fontSize: 24 }}>👆</Text>;

  const renderErrorMessage = () => (
    <Text style={{ color: 'red', marginBottom: 10 }}>
      Incorrect PIN. Please try again.
    </Text>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Keypad
        onPinEntered={handlePinEntered}
        onPinErrored={hasError}
        errorMessageComponent={renderErrorMessage}
        pinLength={6}
        theme="dark"
        usesFaceId={true}
        renderFaceIdIcon={renderFaceIdIcon}
        keypadRadius={12}
        gridGap={15}
        dotColorDark="#007AFF"
        keypadColorDark="#2C2C2E"
        textColorDark="#FFFFFF"
      />
    </View>
  );
}
```

## Props

| Prop                            | Type                    | Required | Default     | Description                                         |
| ------------------------------- | ----------------------- | -------- | ----------- | --------------------------------------------------- |
| `onPinEntered`                  | `(pin: string) => void` | ✅       | -           | Callback function called when PIN entry is complete |
| `onPinErrored`                  | `boolean`               | ❌       | `false`     | Triggers error state and shake animation            |
| `errorMessageComponent`         | `() => ReactNode`       | ❌       | `undefined` | Custom component to display error messages          |
| `pinLength`                     | `number`                | ❌       | `4`         | Number of digits in the PIN                         |
| `style`                         | `ViewStyle`             | ❌       | `undefined` | Custom styles for the main container                |
| `buttonStyle`                   | `ViewStyle`             | ❌       | `undefined` | Custom styles for keypad buttons                    |
| `buttonTextStyle`               | `TextStyle`             | ❌       | `undefined` | Custom styles for button text                       |
| `keypadTextSize`                | `number`                | ❌       | `24`        | Font size for keypad button text                    |
| `disableKeypadBackground`       | `boolean`               | ❌       | `false`     | Removes background color from buttons               |
| `usesFaceId`                    | `boolean`               | ❌       | `false`     | Enables Face ID/Touch ID button                     |
| `keypadRadius`                  | `number`                | ❌       | `8`         | Border radius for buttons and dots                  |
| `theme`                         | `'light' \| 'dark'`     | ❌       | `'light'`   | Overall theme of the keypad                         |
| `keypadColorLight`              | `string`                | ❌       | `'#f2f2f7'` | Button background color in light theme              |
| `keypadColorDark`               | `string`                | ❌       | `'#1c1c1e'` | Button background color in dark theme               |
| `textColorLight`                | `string`                | ❌       | `'#000000'` | Text color in light theme                           |
| `textColorDark`                 | `string`                | ❌       | `'#ffffff'` | Text color in dark theme                            |
| `dotColorLight`                 | `string`                | ❌       | `'#000000'` | Filled dot color in light theme                     |
| `dotColorDark`                  | `string`                | ❌       | `'#ffffff'` | Filled dot color in dark theme                      |
| `emptyDotColor`                 | `string`                | ❌       | `'#d1d1d6'` | Empty dot color                                     |
| `gridGap`                       | `number`                | ❌       | `10`        | Gap between keypad buttons                          |
| `renderFaceIdIcon`              | `() => ReactNode`       | ❌       | `undefined` | Custom Face ID/Touch ID icon component              |
| `applyBackgroundToFaceIdButton` | `boolean`               | ❌       | `false`     | Applies button background to Face ID button         |

## Theming

The keypad supports both light and dark themes out of the box. You can customize colors for each theme:

### Light Theme Colors

- `keypadColorLight`: Button background color
- `textColorLight`: Button text color
- `dotColorLight`: Filled dot color

### Dark Theme Colors

- `keypadColorDark`: Button background color
- `textColorDark`: Button text color
- `dotColorDark`: Filled dot color

### Universal Colors

- `emptyDotColor`: Color for empty PIN dots

## Animations

The keypad includes several built-in animations:

- **Dot Animation**: Dots scale when PIN digits are entered/removed
- **Shake Animation**: Triggered when `onPinErrored` is true
- **Error Message**: Smooth zoom in/out transitions
- **Layout Transitions**: Smooth transitions when error messages appear/disappear

## Error Handling

To display errors and trigger the shake animation:

```js
const [hasError, setHasError] = useState(false);

const handlePinEntered = (pin) => {
  if (isValidPin(pin)) {
    setHasError(false);
    // Handle success
  } else {
    setHasError(true);
    // Clear error after some time
    setTimeout(() => setHasError(false), 3000);
  }
};

<Keypad
  onPinEntered={handlePinEntered}
  onPinErrored={hasError}
  errorMessageComponent={() => (
    <Text style={{ color: 'red' }}>Invalid PIN</Text>
  )}
/>;
```

## Biometric Authentication

Enable Face ID or Touch ID button:

```js
const renderFaceIdIcon = () => (
  <Icon name="face-id" size={24} color="#007AFF" />
);

<Keypad
  usesFaceId={true}
  renderFaceIdIcon={renderFaceIdIcon}
  applyBackgroundToFaceIdButton={true}
  onPinEntered={handlePinEntered}
/>;
```

## Customization Examples

### Minimal Keypad

```js
<Keypad
  onPinEntered={handlePin}
  disableKeypadBackground={true}
  pinLength={6}
  emptyDotColor="transparent"
  style={{ backgroundColor: 'transparent' }}
/>
```

### Colorful Keypad

```js
<Keypad
  onPinEntered={handlePin}
  theme="dark"
  keypadColorDark="#FF6B6B"
  textColorDark="#FFFFFF"
  dotColorDark="#4ECDC4"
  emptyDotColor="#95A5A6"
  keypadRadius={20}
  gridGap={20}
/>
```

## Testing

The component includes test IDs for easy testing:

- `pin-dot`: Empty PIN dots
- `pin-dot-filled`: Filled PIN dots
- `key-{digit}`: Individual keypad buttons (e.g., `key-1`, `key-2`)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://reactnative.dev/docs/the-new-architecture/create-module-library)
