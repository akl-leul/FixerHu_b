import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { 
  Upload, 
  FileText, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Camera,
  Image as ImageIcon
} from 'lucide-react-native';

type SetupStep = 'documents' | 'verification' | 'location' | 'complete';

export default function ProfessionalSetup() {
  const [currentStep, setCurrentStep] = useState<SetupStep>('documents');
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState({
    nationalId: null as string | null,
    workClearance: null as string | null,
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [location, setLocation] = useState({
    address: '',
    latitude: 0,
    longitude: 0,
  });
  
  const { user } = useAuth();
  const router = useRouter();

  const handleDocumentUpload = (type: 'nationalId' | 'workClearance') => {
    // Simulate document upload
    Alert.alert(
      'Upload Document',
      `Select ${type === 'nationalId' ? 'National ID' : 'Work Clearance'} document`,
      [
        { text: 'Camera', onPress: () => simulateUpload(type, 'camera') },
        { text: 'Gallery', onPress: () => simulateUpload(type, 'gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const simulateUpload = (type: 'nationalId' | 'workClearance', source: string) => {
    setDocuments(prev => ({
      ...prev,
      [type]: `https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=300`
    }));
  };

  const handleDocumentSubmission = async () => {
    if (!documents.nationalId || !documents.workClearance) {
      Alert.alert('Missing Documents', 'Please upload both required documents');
      return;
    }

    setLoading(true);
    try {
      // Simulate AI document processing and OTP sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep('verification');
      Alert.alert(
        'Verification Code Sent',
        'We\'ve sent a verification code to your phone number for identity confirmation.'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process documents');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep('location');
    } catch (error) {
      Alert.alert('Verification Failed', 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSetup = async () => {
    if (!location.address) {
      Alert.alert('Location Required', 'Please set your service location');
      return;
    }

    setLoading(true);
    try {
      // Simulate location saving
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep('complete');
    } catch (error) {
      Alert.alert('Error', 'Failed to save location');
    } finally {
      setLoading(false);
    }
  };

  const completeSetup = () => {
    Alert.alert(
      'Setup Complete!',
      'Your professional account has been set up successfully. You can now start adding your services.',
      [{ text: 'Continue', onPress: () => router.replace('/(tabs)') }]
    );
  };

  const renderDocumentUpload = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Document Verification</Text>
        <Text style={styles.subtitle}>
          Upload your identification documents for verification
        </Text>
      </View>

      <Card style={styles.documentCard}>
        <View style={styles.documentHeader}>
          <FileText color="#2563EB" size={24} />
          <Text style={styles.documentTitle}>National ID</Text>
          {documents.nationalId && <CheckCircle color="#059669" size={20} />}
        </View>
        <Text style={styles.documentDescription}>
          Upload a clear photo of your national identification document
        </Text>
        <TouchableOpacity
          style={[styles.uploadButton, documents.nationalId && styles.uploadedButton]}
          onPress={() => handleDocumentUpload('nationalId')}
        >
          <Upload color={documents.nationalId ? "#059669" : "#6B7280"} size={20} />
          <Text style={[styles.uploadText, documents.nationalId && styles.uploadedText]}>
            {documents.nationalId ? 'Document Uploaded' : 'Upload National ID'}
          </Text>
        </TouchableOpacity>
      </Card>

      <Card style={styles.documentCard}>
        <View style={styles.documentHeader}>
          <FileText color="#2563EB" size={24} />
          <Text style={styles.documentTitle}>Work Clearance</Text>
          {documents.workClearance && <CheckCircle color="#059669" size={20} />}
        </View>
        <Text style={styles.documentDescription}>
          Upload your professional certification or work clearance document
        </Text>
        <TouchableOpacity
          style={[styles.uploadButton, documents.workClearance && styles.uploadedButton]}
          onPress={() => handleDocumentUpload('workClearance')}
        >
          <Upload color={documents.workClearance ? "#059669" : "#6B7280"} size={20} />
          <Text style={[styles.uploadText, documents.workClearance && styles.uploadedText]}>
            {documents.workClearance ? 'Document Uploaded' : 'Upload Work Clearance'}
          </Text>
        </TouchableOpacity>
      </Card>

      <Button
        title="Submit Documents"
        onPress={handleDocumentSubmission}
        loading={loading}
        disabled={!documents.nationalId || !documents.workClearance}
        style={styles.submitButton}
      />
    </ScrollView>
  );

  const renderVerification = () => (
    <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <AlertCircle color="#EAB308" size={32} />
        </View>
        <Text style={styles.title}>Identity Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your phone number
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
          style={styles.codeInput}
        />
        
        <Button
          title="Verify Identity"
          onPress={handleVerification}
          loading={loading}
          style={styles.verifyButton}
        />
      </Card>

      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendText}>Didn't receive code? Resend</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLocationSetup = () => (
    <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MapPin color="#2563EB" size={32} />
        </View>
        <Text style={styles.title}>Service Location</Text>
        <Text style={styles.subtitle}>
          Set your primary service location
        </Text>
      </View>

      <Card style={styles.formCard}>
        <Input
          label="Service Address"
          value={location.address}
          onChangeText={(text) => setLocation(prev => ({ ...prev, address: text }))}
          placeholder="Enter your service area address"
        />
        
        <TouchableOpacity style={styles.locationButton}>
          <MapPin color="#2563EB" size={20} />
          <Text style={styles.locationButtonText}>Use Current Location</Text>
        </TouchableOpacity>
        
        <Button
          title="Save Location"
          onPress={handleLocationSetup}
          loading={loading}
          disabled={!location.address}
          style={styles.saveButton}
        />
      </Card>
    </View>
  );

  const renderComplete = () => (
    <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <CheckCircle color="#059669" size={48} />
        </View>
        <Text style={styles.title}>Setup Complete!</Text>
        <Text style={styles.subtitle}>
          Your professional account is ready. You can now start adding your services and connecting with clients.
        </Text>
      </View>

      <Card style={styles.completeCard}>
        <Text style={styles.completeTitle}>What's Next?</Text>
        <View style={styles.nextSteps}>
          <View style={styles.nextStep}>
            <CheckCircle color="#059669" size={16} />
            <Text style={styles.nextStepText}>Add your professional services</Text>
          </View>
          <View style={styles.nextStep}>
            <CheckCircle color="#059669" size={16} />
            <Text style={styles.nextStepText}>Set competitive pricing</Text>
          </View>
          <View style={styles.nextStep}>
            <CheckCircle color="#059669" size={16} />
            <Text style={styles.nextStepText}>Start receiving client requests</Text>
          </View>
        </View>
      </Card>

      <Button
        title="Get Started"
        onPress={completeSetup}
        style={styles.getStartedButton}
      />
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'documents':
        return renderDocumentUpload();
      case 'verification':
        return renderVerification();
      case 'location':
        return renderLocationSetup();
      case 'complete':
        return renderComplete();
      default:
        return renderDocumentUpload();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderStepContent()}
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
    marginBottom: 32,
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
    lineHeight: 24,
  },
  documentCard: {
    marginBottom: 20,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  documentDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
  },
  uploadedButton: {
    backgroundColor: '#F0FDF4',
    borderColor: '#059669',
    borderStyle: 'solid',
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  uploadedText: {
    color: '#059669',
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
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
  resendButton: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF4FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  locationButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  saveButton: {
    marginTop: 8,
  },
  completeCard: {
    marginBottom: 32,
  },
  completeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  nextSteps: {
    gap: 12,
  },
  nextStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextStepText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
  },
  getStartedButton: {
    marginBottom: 20,
  },
});