import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'phone';
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  type = 'text',
  containerStyle,
  style,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  const isSecureTextEntry = type === 'password' && !isPasswordVisible;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            type === 'password' && styles.passwordInput,
            style,
          ]}
          keyboardType={getKeyboardType()}
          secureTextEntry={isSecureTextEntry}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          autoCorrect={false}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {type === 'password' && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeOff color="#6B7280" size={20} />
            ) : (
              <Eye color="#6B7280" size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#111827',
  },
  passwordInput: {
    paddingRight: 50,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 4,
  },
});