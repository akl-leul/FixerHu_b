import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { UserPlus } from 'lucide-react-native';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signUp } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.username, formData.phone);
      Alert.alert(
        'Account Created',
        'Please check your email for verification instructions.',
        [{ text: 'OK', onPress: () => router.replace('/onboarding/email-verification') }]
      );
    } catch (error: any) {
      Alert.alert('Sign Up Error', error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <UserPlus color="#2563EB" size={32} />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join FixerHub and connect with professionals</Text>
          </View>

          <Card style={styles.formCard}>
            <Input
              label="Username"
              value={formData.username}
              onChangeText={(value) => updateFormData('username', value)}
              placeholder="Enter your username"
              error={errors.username}
            />
            
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              placeholder="Enter your email"
              error={errors.email}
            />
            
            <Input
              label="Phone Number"
              type="phone"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              placeholder="Enter your phone number"
              error={errors.phone}
            />
            
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              placeholder="Create a password"
              error={errors.password}
            />
            
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />
            
            <Button
              title="Create Account"
              onPress={handleSignUp}
              loading={loading}
              style={styles.signUpButton}
            />
          </Card>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Link href="/(auth)/signin" style={styles.link}>
                Sign In
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  formCard: {
    marginBottom: 24,
  },
  signUpButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#6B7280',
  },
  link: {
    color: '#2563EB',
    fontWeight: '600',
  },
});