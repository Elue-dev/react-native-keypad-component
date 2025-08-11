import { TEST_PIN } from './constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Keypad from 'react-native-keypad-component';
import * as Haptics from 'expo-haptics';

export default function App() {
  const [pinErrored, setPinErrored] = useState(false);
  const isDarkMode = true;
  const styles = getStyles(isDarkMode);

  function handleFaceIdAuth() {}

  function onDigitPressed(digit: string) {
    console.log(digit);
    Haptics.selectionAsync();
  }

  function onBackspacePressed() {
    Haptics.selectionAsync();
  }

  return (
    <View style={styles.container}>
      <Keypad
        onPinEntered={(pin) => {
          if (pin !== TEST_PIN) {
            setPinErrored(true);
            setTimeout(() => setPinErrored(false), 1500);
          } else {
            Alert.alert('PIN Correct ✅');
          }
        }}
        onPinErrored={pinErrored}
        pinLength={5}
        keypadColor="#053345"
        onDigitPressed={onDigitPressed}
        onBackspacePressed={onBackspacePressed}
        usesFaceId={true}
        theme={isDarkMode ? 'dark' : 'light'}
        errorMessageComponent={() => (
          <Text style={styles.errorText}>You entered an invalid PIN</Text>
        )}
        keypadRadius={30}
        renderFaceIdIcon={() => (
          <TouchableOpacity onPress={handleFaceIdAuth}>
            {Platform.OS === 'android' ? (
              <Ionicons
                name="finger-print-outline"
                size={20}
                color={isDarkMode ? '#fff' : '#000'}
              />
            ) : (
              <MaterialCommunityIcons
                name="face-recognition"
                size={20}
                color={isDarkMode ? '#fff' : '#000'}
              />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function getStyles(isDarkMode: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    errorText: {
      color: isDarkMode ? '#c10007' : '#e7000b',
    },
  });
}
