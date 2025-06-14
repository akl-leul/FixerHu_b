import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Users, Wrench } from 'lucide-react-native';

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<'client' | 'professional' | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { updateUserRole } = useAuth();
  const router = useRouter();

  const handleRoleSelection = async () => {
    if (!selectedRole) return;
    
    setLoading(true);
    try {
      await updateUserRole(selectedRole);
      
      if (selectedRole === 'professional') {
        router.replace('/onboarding/professional-setup');
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>
            How would you like to use FixerHub?
          </Text>
        </View>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'client' && styles.selectedCard,
            ]}
            onPress={() => setSelectedRole('client')}
          >
            <Card style={styles.cardContent}>
              <View style={styles.roleIcon}>
                <Users 
                  color={selectedRole === 'client' ? '#FFFFFF' : '#2563EB'} 
                  size={32} 
                />
              </View>
              <Text style={[
                styles.roleTitle,
                selectedRole === 'client' && styles.selectedText,
              ]}>
                I'm a Client
              </Text>
              <Text style={[
                styles.roleDescription,
                selectedRole === 'client' && styles.selectedText,
              ]}>
                I need to hire professionals for various services and repairs
              </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'professional' && styles.selectedCard,
            ]}
            onPress={() => setSelectedRole('professional')}
          >
            <Card style={styles.cardContent}>
              <View style={styles.roleIcon}>
                <Wrench 
                  color={selectedRole === 'professional' ? '#FFFFFF' : '#2563EB'} 
                  size={32} 
                />
              </View>
              <Text style={[
                styles.roleTitle,
                selectedRole === 'professional' && styles.selectedText,
              ]}>
                I'm a Professional
              </Text>
              <Text style={[
                styles.roleDescription,
                selectedRole === 'professional' && styles.selectedText,
              ]}>
                I offer professional services and want to connect with clients
              </Text>
            </Card>
          </TouchableOpacity>
        </View>

        <Button
          title="Continue"
          onPress={handleRoleSelection}
          loading={loading}
          disabled={!selectedRole}
          style={styles.continueButton}
        />
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
  roleContainer: {
    marginBottom: 40,
  },
  roleCard: {
    marginBottom: 16,
  },
  selectedCard: {
    transform: [{ scale: 1.02 }],
  },
  cardContent: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  roleDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  continueButton: {
    marginTop: 'auto',
  },
});

// Update the selected card styling
const selectedCardStyle = StyleSheet.create({
  selectedCard: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  selectedIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

// Merge the styles
Object.assign(styles, selectedCardStyle);