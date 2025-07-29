import * as React from 'react';
import * as TestingLibrary from '@testing-library/react-native';
import { Keypad } from '../index';
import { Text } from 'react-native';

const { render, fireEvent } = TestingLibrary;

// TODO: fix test CI issues

describe('Keypad', () => {
  it('renders correct number of dot placeholders', () => {
    const { getAllByTestId } = render(<Keypad onPinEntered={jest.fn()} />);
    expect(getAllByTestId('pin-dot')).toHaveLength(4);
  });

  it('fills dots as digits are entered', () => {
    const { getByText, getAllByTestId } = render(
      <Keypad onPinEntered={jest.fn()} />
    );
    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    const filledDots = getAllByTestId('pin-dot-filled');
    expect(filledDots).toHaveLength(2);
  });

  it('calls onPinEntered when pin is complete', () => {
    const onPinEntered = jest.fn();
    const { getByText } = render(
      <Keypad onPinEntered={onPinEntered} pinLength={4} />
    );
    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText('4'));
    expect(onPinEntered).toHaveBeenCalledWith('1234');
  });

  it('deletes last digit on delete press', () => {
    const { getByText, getAllByTestId } = render(
      <Keypad onPinEntered={jest.fn()} />
    );
    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    fireEvent.press(getByText('⌫'));
    const filledDots = getAllByTestId('pin-dot-filled');
    expect(filledDots).toHaveLength(1);
  });

  it('renders face ID icon if usesFaceId is true', () => {
    const renderFaceIdIcon = jest.fn(() => <Text>🔒</Text>);
    const { getByText } = render(
      <Keypad
        onPinEntered={jest.fn()}
        usesFaceId
        renderFaceIdIcon={renderFaceIdIcon}
      />
    );
    expect(getByText('🔒')).toBeTruthy();
  });

  it('renders error message component if error and component provided', () => {
    const errorMessage = () => <Text testID="error-msg">Wrong PIN</Text>;
    const { getByTestId } = render(
      <Keypad
        onPinEntered={jest.fn()}
        onPinErrored
        errorMessageComponent={errorMessage}
      />
    );
    expect(getByTestId('error-msg')).toBeTruthy();
  });
});
