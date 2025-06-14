import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { AISearchChat } from '@/components/AISearchChat';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  MessageCircle,
  Zap,
  Wrench,
  Droplets,
  Scissors,
  Sparkles,
  Home,
  Car,
  Smartphone,
  Bot,
  SlidersHorizontal
} from 'lucide-react-native';

const categories = [
  { id: 1, name: 'Electrical', icon: Zap, color: '#EAB308' },
  { id: 2, name: 'Plumbing', icon: Droplets, color: '#3B82F6' },
  { id: 3, name: 'Repair', icon: Wrench, color: '#6B7280' },
  { id: 4, name: 'Beauty', icon: Scissors, color: '#EC4899' },
  { id: 5, name: 'Cleaning', icon: Sparkles, color: '#10B981' },
  { id: 6, name: 'Home', icon: Home, color: '#F59E0B' },
  { id: 7, name: 'Automotive', icon: Car, color: '#EF4444' },
  { id: 8, name: 'Tech', icon: Smartphone, color: '#8B5CF6' },
];

const professionals = [
  {
    id: '1',
    name: 'John Smith',
    profession: 'Electrician',
    rating: 4.8,
    reviews: 156,
    price: 75,
    distance: 0.8,
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    verified: true,
    services: ['Fix Light Switch', 'Install Ceiling Fan', 'Electrical Outlet Repair'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    profession: 'Plumber',
    rating: 4.9,
    reviews: 203,
    price: 85,
    distance: 1.2,
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    verified: true,
    services: ['Leak Repair', 'Drain Cleaning', 'Toilet Installation'],
  },
  {
    id: '3',
    name: 'Mike Wilson',
    profession: 'Repair Technician',
    rating: 4.7,
    reviews: 89,
    price: 65,
    distance: 2.1,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    verified: true,
    services: ['Appliance Repair', 'Furniture Repair', 'General Maintenance'],
  },
  {
    id: '4',
    name: 'Emma Davis',
    profession: 'House Cleaner',
    rating: 4.9,
    reviews: 134,
    price: 45,
    distance: 1.5,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    verified: true,
    services: ['Deep Cleaning', 'Regular Cleaning', 'Move-out Cleaning'],
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [filteredProfessionals, setFilteredProfessionals] = useState(professionals);
  const [filters, setFilters] = useState({
    maxDistance: 10,
    minRating: 0,
    maxPrice: 200,
    verified: false,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProfessionals(query, selectedCategory, filters);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    filterProfessionals(searchQuery, categoryId, filters);
  };

  const filterProfessionals = (query: string, categoryId: number | null, currentFilters: typeof filters) => {
    let filtered = [...professionals];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(query.toLowerCase()) ||
        prof.profession.toLowerCase().includes(query.toLowerCase()) ||
        prof.services?.some(service => service.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Filter by category
    if (categoryId) {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        filtered = filtered.filter(prof => 
          prof.profession.toLowerCase().includes(category.name.toLowerCase())
        );
      }
    }

    // Apply other filters
    filtered = filtered.filter(prof => 
      prof.distance <= currentFilters.maxDistance &&
      prof.rating >= currentFilters.minRating &&
      prof.price <= currentFilters.maxPrice &&
      (!currentFilters.verified || prof.verified)
    );

    setFilteredProfessionals(filtered);
  };

  const handleHire = (professional: any) => {
    console.log('Hiring:', professional.name);
    // Implement hire functionality
  };

  const handleMessage = (professional: any) => {
    console.log('Messaging:', professional.name);
    // Navigate to messages
  };

  const handleViewProfile = (professional: any) => {
    console.log('Viewing profile:', professional.name);
    // Navigate to professional profile
  };

  const handleServiceSelect = (service: string) => {
    setSearchQuery(service);
    setShowAIChat(false);
    filterProfessionals(service, null, filters);
  };

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setShowFilters(false);
    filterProfessionals(searchQuery, selectedCategory, newFilters);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Professionals</Text>
        <TouchableOpacity style={styles.locationButton}>
          <MapPin color="#6B7280" size={16} />
          <Text style={styles.locationText}>Within {filters.maxDistance} miles</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#6B7280" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="What service do you need?"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <SlidersHorizontal color="#6B7280" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.aiChatButton}
          onPress={() => setShowAIChat(true)}
        >
          <Bot color="#2563EB" size={20} />
          <Text style={styles.aiChatText}>AI Assistant</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategory,
                ]}
                onPress={() => handleCategorySelect(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: `${category.color}15` }
                ]}>
                  <category.icon 
                    color={category.color} 
                    size={24} 
                  />
                </View>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.selectedCategoryText,
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory 
                ? `${categories.find(c => c.id === selectedCategory)?.name} Professionals`
                : searchQuery 
                  ? `Results for "${searchQuery}"`
                  : 'Top Professionals Near You'
              }
            </Text>
            <Text style={styles.resultsCount}>{filteredProfessionals.length} found</Text>
          </View>

          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              onHire={handleHire}
              onMessage={handleMessage}
              onViewProfile={handleViewProfile}
            />
          ))}

          {filteredProfessionals.length === 0 && (
            <Card style={styles.noResultsCard}>
              <Text style={styles.noResultsTitle}>No professionals found</Text>
              <Text style={styles.noResultsText}>
                Try adjusting your search criteria or use our AI assistant to help find what you need.
              </Text>
              <Button
                title="Try AI Assistant"
                onPress={() => setShowAIChat(true)}
                variant="outline"
                style={styles.aiButton}
              />
            </Card>
          )}
        </View>
      </ScrollView>

      {/* AI Chat Modal */}
      <Modal
        visible={showAIChat}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <AISearchChat
          onServiceSelect={handleServiceSelect}
          onClose={() => setShowAIChat(false)}
        />
      </Modal>

      {/* Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filtersModal}>
            <View style={styles.filtersHeader}>
              <Text style={styles.filtersTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Text style={styles.closeText}>Done</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.filtersContent}>
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Maximum Distance: {filters.maxDistance} miles</Text>
                {/* Add slider component here */}
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Minimum Rating: {filters.minRating} stars</Text>
                {/* Add rating selector here */}
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Maximum Price: ${filters.maxPrice}/hr</Text>
                {/* Add price slider here */}
              </View>
              
              <TouchableOpacity 
                style={styles.verifiedFilter}
                onPress={() => setFilters(prev => ({ ...prev, verified: !prev.verified }))}
              >
                <Text style={styles.filterLabel}>Verified professionals only</Text>
                <View style={[styles.checkbox, filters.verified && styles.checkboxChecked]}>
                  {filters.verified && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
            </ScrollView>
            
            <Button
              title="Apply Filters"
              onPress={() => applyFilters(filters)}
              style={styles.applyButton}
            />
          </View>
        </View>
      </Modal>
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
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  aiChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  aiChatText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  resultsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  noResultsCard: {
    alignItems: 'center',
    padding: 32,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  aiButton: {
    paddingHorizontal: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filtersModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filtersTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  filtersContent: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  verifiedFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  applyButton: {
    margin: 20,
    marginTop: 0,
  },
});