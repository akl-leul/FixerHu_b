import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import { 
  Search, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  Calendar,
  MessageSquare,
  Wrench
} from 'lucide-react-native';

export default function Home() {
  const { user } = useAuth();
  const isProfessional = user?.role === 'professional';

  const stats = [
    { label: 'Active Jobs', value: '12', icon: Wrench, color: '#2563EB' },
    { label: 'Messages', value: '8', icon: MessageSquare, color: '#059669' },
    { label: 'Rating', value: '4.8', icon: Star, color: '#EA580C' },
    { label: 'Clients', value: '156', icon: Users, color: '#7C3AED' },
  ];

  const clientStats = [
    { label: 'Bookings', value: '5', icon: Calendar, color: '#2563EB' },
    { label: 'Messages', value: '3', icon: MessageSquare, color: '#059669' },
    { label: 'Favorites', value: '12', icon: Star, color: '#EA580C' },
    { label: 'Reviews', value: '8', icon: TrendingUp, color: '#7C3AED' },
  ];

  const recentActivity = [
    { 
      id: 1, 
      title: 'Electrical Repair Completed', 
      subtitle: 'John Smith - $150', 
      time: '2 hours ago',
      type: 'completed'
    },
    { 
      id: 2, 
      title: 'New Message from Sarah', 
      subtitle: 'About plumbing service', 
      time: '4 hours ago',
      type: 'message'
    },
    { 
      id: 3, 
      title: 'Job Request Received', 
      subtitle: 'Kitchen appliance repair', 
      time: '1 day ago',
      type: 'request'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Good morning, {user?.username}! 👋
            </Text>
            <Text style={styles.subGreeting}>
              {isProfessional 
                ? 'Ready to help clients today?' 
                : 'What service do you need today?'
              }
            </Text>
          </View>
          <TouchableOpacity style={styles.locationButton}>
            <MapPin color="#6B7280" size={20} />
            <Text style={styles.locationText}>Current Location</Text>
          </TouchableOpacity>
        </View>

        {!isProfessional && (
          <Card style={styles.searchCard}>
            <TouchableOpacity style={styles.searchButton}>
              <Search color="#6B7280" size={20} />
              <Text style={styles.searchText}>What are you looking for?</Text>
            </TouchableOpacity>
          </Card>
        )}

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {(isProfessional ? stats : clientStats).map((stat, index) => (
              <Card key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <stat.icon color={stat.color} size={24} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Card>
            ))}
          </View>
        </View>

        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((activity) => (
            <Card key={activity.id} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </Card>
          ))}
        </View>

        {isProfessional && (
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Wrench color="#2563EB" size={24} />
                <Text style={styles.quickActionText}>Add Service</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Calendar color="#059669" size={24} />
                <Text style={styles.quickActionText}>Schedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <TrendingUp color="#EA580C" size={24} />
                <Text style={styles.quickActionText}>Analytics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Users color="#7C3AED" size={24} />
                <Text style={styles.quickActionText}>Clients</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    padding: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  searchCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 0,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  searchText: {
    marginLeft: 12,
    fontSize: 16,
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
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activityContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  activityCard: {
    marginBottom: 8,
    padding: 16,
  },
  activityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});