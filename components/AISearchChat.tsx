import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User,
  Lightbulb,
  ArrowRight
} from 'lucide-react-native';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

interface AISearchChatProps {
  onServiceSelect: (service: string) => void;
  onClose: () => void;
}

export function AISearchChat({ onServiceSelect, onClose }: AISearchChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you find the perfect service. What do you need help with today?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "My kitchen appliance is broken",
        "I need electrical work done",
        "Looking for plumbing help",
        "Need home cleaning service"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text.trim());
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): ChatMessage => {
    const input = userInput.toLowerCase();
    
    if (input.includes('kitchen') || input.includes('appliance') || input.includes('refrigerator') || input.includes('stove')) {
      return {
        id: Date.now().toString(),
        text: "I can help you with kitchen appliance repairs! Based on what you've described, here are some specific services that might help:",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Refrigerator Repair",
          "Stove/Oven Repair",
          "Dishwasher Repair",
          "Microwave Repair"
        ]
      };
    }
    
    if (input.includes('electrical') || input.includes('light') || input.includes('outlet') || input.includes('wiring')) {
      return {
        id: Date.now().toString(),
        text: "Electrical issues can be tricky! Let me suggest some specific electrical services:",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Fix Light Switch",
          "Electrical Outlet Repair",
          "Install Ceiling Fan",
          "Circuit Breaker Repair"
        ]
      };
    }
    
    if (input.includes('plumbing') || input.includes('leak') || input.includes('toilet') || input.includes('drain')) {
      return {
        id: Date.now().toString(),
        text: "Plumbing problems need quick attention! Here are some plumbing services I can help you find:",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "Leak Repair",
          "Drain Cleaning",
          "Toilet Installation",
          "Water Heater Repair"
        ]
      };
    }
    
    if (input.includes('clean') || input.includes('house') || input.includes('home')) {
      return {
        id: Date.now().toString(),
        text: "Great! I can help you find cleaning services. What type of cleaning do you need?",
        sender: 'ai',
        timestamp: new Date(),
        suggestions: [
          "House Cleaning",
          "Deep Cleaning",
          "Move-in/Move-out Cleaning",
          "Office Cleaning"
        ]
      };
    }

    return {
      id: Date.now().toString(),
      text: "I understand you need help with that. Could you provide a bit more detail about the specific issue or service you're looking for? This will help me suggest the most relevant professionals.",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "Tell me more about the problem",
        "What room is this for?",
        "Is this urgent?",
        "What's your budget range?"
      ]
    };
  };

  const handleSuggestionPress = (suggestion: string) => {
    if (suggestion.includes('Repair') || suggestion.includes('Install') || suggestion.includes('Fix') || suggestion.includes('Clean')) {
      onServiceSelect(suggestion);
    } else {
      handleSendMessage(suggestion);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Bot color="#2563EB" size={24} />
          <Text style={styles.headerTitle}>AI Service Assistant</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageWrapper}>
            <View style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userMessage : styles.aiMessage
            ]}>
              <View style={styles.messageHeader}>
                {message.sender === 'ai' ? (
                  <Bot color="#2563EB" size={16} />
                ) : (
                  <User color="#FFFFFF" size={16} />
                )}
                <Text style={[
                  styles.messageText,
                  message.sender === 'user' ? styles.userMessageText : styles.aiMessageText
                ]}>
                  {message.text}
                </Text>
              </View>
            </View>
            
            {message.suggestions && (
              <View style={styles.suggestionsContainer}>
                {message.suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionButton}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Lightbulb color="#2563EB" size={14} />
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                    <ArrowRight color="#2563EB" size={14} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Describe what you need help with..."
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim().length > 0 && styles.sendButtonActive
            ]}
            onPress={() => handleSendMessage(inputText)}
            disabled={inputText.trim().length === 0}
          >
            <Send 
              color={inputText.trim().length > 0 ? '#FFFFFF' : '#9CA3AF'} 
              size={18} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 16,
    padding: 12,
  },
  userMessage: {
    backgroundColor: '#2563EB',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#111827',
  },
  suggestionsContainer: {
    marginTop: 12,
    marginLeft: 8,
  },
  suggestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  suggestionText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
    marginHorizontal: 8,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#2563EB',
  },
});