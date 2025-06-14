import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Star, 
  MapPin, 
  MessageCircle, 
  CheckCircle,
  DollarSign
} from 'lucide-react-native';

interface Professional {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  price: number;
  distance: number;
  image: string;
  verified: boolean;
  services?: string[];
}

interface ProfessionalCardProps {
  professional: Professional;
  onHire: (professional: Professional) => void;
  onMessage: (professional: Professional) => void;
  onViewProfile: (professional: Professional) => void;
}

export function ProfessionalCard({ 
  professional, 
  onHire, 
  onMessage, 
  onViewProfile 
}: ProfessionalCardProps) {
  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={() => onViewProfile(professional)}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: professional.image }} 
              style={styles.profileImage}
              defaultSource={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150' }}
            />
            {professional.verified && (
              <View style={styles.verifiedBadge}>
                <CheckCircle color="#FFFFFF" size={12} />
              </View>
            )}
          </View>
          
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{professional.name}</Text>
              {professional.verified && (
                <View style={styles.verifiedIcon}>
                  <CheckCircle color="#059669" size={16} />
                </View>
              )}
            </View>
            <Text style={styles.profession}>{professional.profession}</Text>
            
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Star color="#EAB308" size={14} fill="#EAB308" />
                <Text style={styles.statText}>
                  {professional.rating} ({professional.reviews})
                </Text>
              </View>
              <View style={styles.statItem}>
                <MapPin color="#6B7280" size={14} />
                <Text style={styles.statText}>{professional.distance} mi</Text>
              </View>
            </View>
          </View>
        </View>

        {professional.services && professional.services.length > 0 && (
          <View style={styles.services}>
            <Text style={styles.servicesTitle}>Services:</Text>
            <View style={styles.servicesList}>
              {professional.services.slice(0, 3).map((service, index) => (
                <View key={index} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
              {professional.services.length > 3 && (
                <View style={styles.serviceTag}>
                  <Text style={styles.serviceText}>+{professional.services.length - 3} more</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <DollarSign color="#059669" size={16} />
          <Text style={styles.price}>From ${professional.price}/hr</Text>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.messageButton}
            onPress={() => onMessage(professional)}
          >
            <MessageCircle color="#6B7280" size={18} />
          </TouchableOpacity>
          <Button
            title="Hire"
            onPress={() => onHire(professional)}
            size="small"
            style={styles.hireButton}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#059669',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  profession: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  services: {
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  servicesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
  },
  hireButton: {
    paddingHorizontal: 20,
  },
});