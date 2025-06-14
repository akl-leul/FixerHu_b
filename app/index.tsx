import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/(auth)/signin');
      } else if (!user.is_verified) {
        router.replace('/onboarding/email-verification');
      } else if (!user.role) {
        router.replace('/onboarding/role-selection');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading FixerHub...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563EB" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
});