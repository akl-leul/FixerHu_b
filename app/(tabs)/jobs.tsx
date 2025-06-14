import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  DollarSign,
  MapPin,
  Calendar,
  Zap,
  Wrench,
  Droplets
} from 'lucide-react-native';

const jobCategories = [
  { id: 1, name: 'Electrical', icon: Zap, color: '#EAB308' },
  { id: 2, name: 'Plumbing', icon: Droplets, color: '#3B82F6' },
  { id: 3, name: 'Repair', icon: Wrench, color: '#6B7280' },
];

const professionalJobs = [
  {
    id: 1,
    category: 'Electrical',
    categoryIcon: Zap,
    categoryColor: '#EAB308',
    totalPrice: 250,
    subServices: [
      { name: 'Fix Light Switch', price: 75 },
      { name: 'Install Ceiling Fan', price: 125 },
      { name: 'Electrical Outlet Repair', price: 50 },
    ],
    location: 'Downtown Area',
    dateAdded: '2024-01-15',
    status: 'active',
    inquiries: 8,
  },
  {
    id: 2,
    category: 'Plumbing',
    categoryIcon: Droplets,
    categoryColor: '#3B82F6',
    totalPrice: 180,
    subServices: [
      { name: 'Leak Repair', price: 80 },
      { name: 'Drain Cleaning', price: 60 },
      { name: 'Toilet Installation', price: 40 },
    ],
    location: 'Residential Area',
    dateAdded: '2024-01-12',
    status: 'active',
    inquiries: 12,
  },
];

export default function JobsScreen() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'add'>('jobs');

  const renderJobsList = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>My Services</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setActiveTab('add')}
        >
          <Plus color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Active Jobs</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>68</Text>
            <Text style={styles.statLabel}>Total Inquiries</Text>
          </Card>
        </View>
      </View>

      <View style={styles.jobsContainer}>
        {professionalJobs.map((job) => (
          <Card key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View style={styles.jobCategory}>
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: `${job.categoryColor}15` }
                ]}>
                  <job.categoryIcon color={job.categoryColor} size={20} />
                </View>
                <Text style={styles.categoryName}>{job.category}</Text>
              </View>
              <View style={styles.jobActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Eye color="#6B7280" size={16} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Edit color="#6B7280" size={16} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Trash2 color="#DC2626" size={16} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.jobInfo}>
              <View style={styles.priceContainer}>
                <DollarSign color="#059669" size={16} />
                <Text style={styles.totalPrice}>${job.totalPrice}</Text>
                <Text style={styles.priceLabel}>Total Service Price</Text>
              </View>
              
              <View style={styles.jobDetails}>
                <View style={styles.detailItem}>
                  <MapPin color="#6B7280" size={14} />
                  <Text style={styles.detailText}>{job.location}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Calendar color="#6B7280" size={14} />
                  <Text style={styles.detailText}>Added {job.dateAdded}</Text>
                </View>
              </View>
            </View>

            <View style={styles.subServicesContainer}>
              <Text style={styles.subServicesTitle}>Sub-services:</Text>
              {job.subServices.map((service, index) => (
                <View key={index} style={styles.subServiceItem}>
                  <Text style={styles.subServiceName}>{service.name}</Text>
                  <Text style={styles.subServicePrice}>${service.price}</Text>
                </View>
              ))}
            </View>

            <View style={styles.jobFooter}>
              <View style={styles.inquiriesContainer}>
                <Text style={styles.inquiriesText}>
                  {job.inquiries} inquiries this month
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: job.status === 'active' ? '#059669' : '#6B7280' }
              ]}>
                <Text style={styles.statusText}>
                  {job.status.toUpperCase()}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );

  const renderAddJobForm = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setActiveTab('jobs')}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add New Service</Text>
      </View>

      <View style={styles.formContainer}>
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Select Category</Text>
          <View style={styles.categoryGrid}>
            {jobCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryOption}
              >
                <View style={[
                  styles.categoryIconLarge,
                  { backgroundColor: `${category.color}15` }
                ]}>
                  <category.icon color={category.color} size={24} />
                </View>
                <Text style={styles.categoryOptionName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Service Details</Text>
          <Text style={styles.formSubtitle}>
            Add the specific services you offer and set prices for each
          </Text>
          
          <View style={styles.serviceInputContainer}>
            <Text style={styles.inputLabel}>Service Name</Text>
            <View style={styles.serviceInput}>
              <Text style={styles.placeholderText}>e.g., Fix Light Switch</Text>
            </View>
          </View>

          <View style={styles.serviceInputContainer}>
            <Text style={styles.inputLabel}>Price ($)</Text>
            <View style={styles.serviceInput}>
              <Text style={styles.placeholderText}>Enter price</Text>
            </View>
          </View>

          <Button
            title="Add Service"
            onPress={() => {}}
            variant="outline"
            size="small"
            style={styles.addServiceButton}
          />
        </Card>

        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Location</Text>
          <View style={styles.locationContainer}>
            <MapPin color="#6B7280" size={20} />
            <Text style={styles.locationText}>Use current location</Text>
          </View>
        </Card>

        <Button
          title="Create Service Listing"
          onPress={() => setActiveTab('jobs')}
          style={styles.createButton}
        />
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {activeTab === 'jobs' ? renderJobsList() : renderAddJobForm()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 8,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
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
  jobsContainer: {
    paddingHorizontal: 20,
  },
  jobCard: {
    marginBottom: 16,
    padding: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  jobActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  jobInfo: {
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#059669',
    marginLeft: 4,
    marginRight: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  subServicesContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  subServicesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  subServiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  subServiceName: {
    fontSize: 14,
    color: '#6B7280',
  },
  subServicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inquiriesContainer: {
    flex: 1,
  },
  inquiriesText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  formCard: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryOption: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    width: '30%',
  },
  categoryIconLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryOptionName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  serviceInputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  serviceInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  addServiceButton: {
    alignSelf: 'flex-start',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  createButton: {
    marginBottom: 40,
  },
});