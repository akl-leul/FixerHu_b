import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  User, 
  Settings, 
  Shield, 
  Star, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Edit,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const isProfessional = user?.role === 'professional';

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/(auth)/signin');
            } catch (error) {
              console.error('Sign out error:', error);
            }
          }
        }
      ]
    );
  };

  const profileStats = isProfessional ? [
    { label: 'Jobs Completed', value: '127', icon: Award, color: '#059669' },
    { label: 'Average Rating', value: '4.8', icon: Star, color: '#EAB308' },
    { label: 'Total Earnings', value: '$12,450', icon: TrendingUp, color: '#2563EB' },
    { label: 'Active Services', value: '8', icon: Settings, color: '#7C3AED' },
  ] : [
    { label: 'Services Booked', value: '23', icon: Calendar, color: '#059669' },
    { label: 'Favorite Pros', value: '12', icon: Star, color: '#EAB308' },
    { label: 'Reviews Given', value: '18', icon: TrendingUp, color: '#2563EB' },
    { label: 'Total Spent', value: '$2,340', icon: CreditCard, color: '#7C3AED' },
  ];

  const menuItems = [
    { 
      id: 1, 
      title: 'Edit Profile', 
      icon: Edit, 
      color: '#6B7280',
      onPress: () => {}
    },
    { 
      id: 2, 
      title: 'Account Settings', 
      icon: Settings, 
      color: '#6B7280',
      onPress: () => {}
    },
    { 
      id: 3, 
      title: 'Privacy & Security', 
      icon: Shield, 
      color: '#6B7280',
      onPress: () => {}
    },
    { 
      id: 4, 
      title: 'Payment Methods', 
      icon: CreditCard, 
      color: '#6B7280',
      onPress: () => {}
    },
    { 
      id: 5, 
      title: 'Help & Support', 
      icon: HelpCircle, 
      color: '#6B7280',
      onPress: () => {}
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={[
                styles.avatar,
                { backgroundColor: isProfessional ? '#2563EB' : '#059669' }
              ]}>
                <Text style={styles.avatarText}>
                  {user?.username?.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={[
                styles.roleBadge,
                { backgroundColor: isProfessional ? '#2563EB' : '#059669' }
              ]}>
                <Text style={styles.roleText}>
                  {isProfessional ? 'PRO' : 'CLIENT'}
                </Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.username}</Text>
              <Text style={styles.userRole}>
                {isProfessional ? 'Professional' : 'Client'}
              </Text>
              <View style={styles.verificationStatus}>
                <Shield 
                  color={user?.is_verified ? '#059669' : '#EAB308'} 
                  size={16} 
                />
                <Text style={[
                  styles.verificationText,
                  { color: user?.is_verified ? '#059669' : '#EAB308' }
                ]}>
                  {user?.is_verified ? 'Verified' : 'Pending Verification'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail color="#6B7280" size={16} />
              <Text style={styles.contactText}>{user?.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone color="#6B7280" size={16} />
              <Text style={styles.contactText}>{user?.phone_number}</Text>
            </View>
            {user?.location && (
              <View style={styles.contactItem}>
                <MapPin color="#6B7280" size={16} />
                <Text style={styles.contactText}>{user.location.address}</Text>
              </View>
            )}
          </View>
        </Card>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            {profileStats.map((stat, index) => (
              <Card key={index} style={styles.statCard}>
                <View style={[
                  styles.statIcon,
                  { backgroundColor: `${stat.color}15` }
                ]}>
                  <stat.icon color={stat.color} size={24} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Card>
            ))}
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemLeft}>
                  <item.icon color={item.color} size={20} />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Text style={styles.menuItemArrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.signOutContainer}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="danger"
            style={styles.signOutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  roleBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  roleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  signOutContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  signOutButton: {
    marginTop: 8,
  },
});