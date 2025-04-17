import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const PasswordField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = true,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#000',
  },
});
