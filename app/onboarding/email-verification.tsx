import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Mail } from 'lucide-react-native';

export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { verifyEmail, user } = useAuth();
  const router = useRouter();

  const handleVerification = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await verifyEmail(verificationCode);
      Alert.alert(
        'Email Verified',
        'Your email has been successfully verified!',
        [{ text: 'Continue', onPress: () => router.replace('/onboarding/role-selection') }]
      );
    } catch (error: any) {
      setError(error.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Mail color="#2563EB" size={32} />
          </View>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to{'\n'}
            <Text style={styles.email}>{user?.email}</Text>
          </Text>
        </View>

        <Card style={styles.formCard}>
          <Input
            label="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Enter 6-digit code"
            keyboardType="number-pad"
            maxLength={6}
            error={error}
            style={styles.codeInput}
          />
          
          <Button
            title="Verify Email"
            onPress={handleVerification}
            loading={loading}
            style={styles.verifyButton}
          />
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Didn't receive the code?{' '}
            <Text style={styles.resendLink}>Resend Code</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  email: {
    fontWeight: '600',
    color: '#2563EB',
  },
  formCard: {
    marginBottom: 24,
  },
  codeInput: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 4,
    fontWeight: '600',
  },
  verifyButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#6B7280',
  },
  resendLink: {
    color: '#2563EB',
    fontWeight: '600',
  },
});