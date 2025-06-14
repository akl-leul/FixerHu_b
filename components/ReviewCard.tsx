import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Star, User } from 'lucide-react-native';

interface Review {
  id: string;
  clientName: string;
  rating: number;
  reviewText: string;
  date: string;
  serviceType?: string;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color="#EAB308"
        fill={index < rating ? "#EAB308" : "transparent"}
      />
    ));
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.clientInfo}>
          <View style={styles.avatar}>
            <User color="#6B7280" size={16} />
          </View>
          <View style={styles.clientDetails}>
            <Text style={styles.clientName}>{review.clientName}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>
        </View>
        <View style={styles.rating}>
          <View style={styles.stars}>
            {renderStars(review.rating)}
          </View>
          <Text style={styles.ratingText}>{review.rating}.0</Text>
        </View>
      </View>

      {review.serviceType && (
        <View style={styles.serviceTag}>
          <Text style={styles.serviceText}>{review.serviceType}</Text>
        </View>
      )}

      <Text style={styles.reviewText}>{review.reviewText}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  rating: {
    alignItems: 'flex-end',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  serviceTag: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  serviceText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});