import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import { Keypad } from '@eluedev/react-native-keypad';

export default function App() {
  const [pinErrored, setPinErrored] = useState(false);
  const isDarkMode = true;

  function handleFaceIdAuth() {}

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode ? '#000' : '#fff',
      }}
    >
      <Keypad
        onPinEntered={(pin) => {
          if (pin !== '1234') {
            setPinErrored(true);
            setTimeout(() => setPinErrored(false), 1500);
          } else {
            Alert.alert('PIN Correct', pin);
          }
        }}
        onPinErrored={pinErrored}
        usesFaceId={true}
        theme={isDarkMode ? 'dark' : 'light'}
        dotColorDark="#0062cc"
        dotColorLight="#0062cc"
        // disableKeypadBackground
        gridGap={14}
        keypadTextSize={25}
        errorMessageComponent={() => (
          <Text style={{ color: isDarkMode ? '#c10007' : '#e7000b' }}>
            You entered an invalid PIN
          </Text>
        )}
        renderFaceIdIcon={() => (
          <TouchableOpacity onPress={handleFaceIdAuth}>
            {Platform.OS === 'android' ? (
              <Ionicons
                name="finger-print-outline"
                size={24}
                color={isDarkMode ? '#fff' : '#000'}
              />
            ) : (
              <MaterialCommunityIcons
                name="face-recognition"
                size={24}
                color={isDarkMode ? '#fff' : '#000'}
              />
            )}
          </TouchableOpacity>
        )}
        applyBackgroundToFaceIdButton
      />
    </View>
  );
}
