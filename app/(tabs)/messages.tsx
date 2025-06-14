import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  MessageCircle, 
  Send, 
  ArrowLeft,
  Phone,
  MoreVertical,
  Clock
} from 'lucide-react-native';

const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'When can you start the plumbing work?',
    timestamp: '2:30 PM',
    unread: 2,
    avatar: 'SJ',
    online: true,
    type: 'client',
  },
  {
    id: 2,
    name: 'Mike Wilson',
    lastMessage: 'The electrical repair is complete.',
    timestamp: '1:15 PM',
    unread: 0,
    avatar: 'MW',
    online: false,
    type: 'professional',
  },
  {
    id: 3,
    name: 'Emma Davis',
    lastMessage: 'Thank you for the great service!',
    timestamp: '11:45 AM',
    unread: 1,
    avatar: 'ED',
    online: true,
    type: 'client',
  },
  {
    id: 4,
    name: 'John Smith',
    lastMessage: 'I can help with your air conditioning issue.',
    timestamp: 'Yesterday',
    unread: 0,
    avatar: 'JS',
    online: false,
    type: 'professional',
  },
];

const chatMessages = [
  {
    id: 1,
    text: 'Hi! I need help with my kitchen sink. It\'s been leaking for a few days.',
    sender: 'client',
    timestamp: '2:25 PM',
  },
  {
    id: 2,
    text: 'I can help you with that. Can you describe the type of leak? Is it from the faucet or under the sink?',
    sender: 'professional',
    timestamp: '2:27 PM',
  },
  {
    id: 3,
    text: 'It\'s under the sink. There\'s water pooling in the cabinet.',
    sender: 'client',
    timestamp: '2:28 PM',
  },
  {
    id: 4,
    text: 'That sounds like a pipe connection issue. I can come take a look tomorrow morning. My rate is $85/hour.',
    sender: 'professional',
    timestamp: '2:29 PM',
  },
  {
    id: 5,
    text: 'When can you start the plumbing work?',
    sender: 'client',
    timestamp: '2:30 PM',
  },
];

export default function MessagesScreen() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversationsList = () => (
    <View style={styles.conversationsContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#6B7280" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredConversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationItem}
            onPress={() => setSelectedConversation(conversation.id)}
          >
            <View style={styles.conversationContent}>
              <View style={styles.avatarContainer}>
                <View style={[
                  styles.avatar,
                  conversation.type === 'professional' 
                    ? styles.professionalAvatar 
                    : styles.clientAvatar
                ]}>
                  <Text style={styles.avatarText}>{conversation.avatar}</Text>
                </View>
                {conversation.online && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>{conversation.name}</Text>
                  <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                </View>
                <View style={styles.conversationFooter}>
                  <Text 
                    style={[
                      styles.lastMessage,
                      conversation.unread > 0 && styles.unreadMessage
                    ]}
                    numberOfLines={1}
                  >
                    {conversation.lastMessage}
                  </Text>
                  {conversation.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>{conversation.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderChatScreen = () => {
    const conversation = conversations.find(c => c.id === selectedConversation);
    if (!conversation) return null;

    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedConversation(null)}
          >
            <ArrowLeft color="#374151" size={24} />
          </TouchableOpacity>
          
          <View style={styles.chatHeaderInfo}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarText}>{conversation.avatar}</Text>
            </View>
            <View style={styles.chatHeaderText}>
              <Text style={styles.chatHeaderName}>{conversation.name}</Text>
              <Text style={styles.chatHeaderStatus}>
                {conversation.online ? 'Online' : 'Last seen 2h ago'}
              </Text>
            </View>
          </View>

          <View style={styles.chatHeaderActions}>
            <TouchableOpacity style={styles.headerAction}>
              <Phone color="#6B7280" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <MoreVertical color="#6B7280" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {chatMessages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'professional' 
                  ? styles.sentMessage 
                  : styles.receivedMessage
              ]}
            >
              <View style={[
                styles.messageBubble,
                message.sender === 'professional' 
                  ? styles.sentBubble 
                  : styles.receivedBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  message.sender === 'professional' 
                    ? styles.sentText 
                    : styles.receivedText
                ]}>
                  {message.text}
                </Text>
              </View>
              <View style={styles.messageTimestamp}>
                <Clock color="#9CA3AF" size={12} />
                <Text style={styles.timestampText}>{message.timestamp}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.messageInput}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              value={messageText}
              onChangeText={setMessageText}
              placeholderTextColor="#9CA3AF"
              multiline
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                messageText.length > 0 && styles.sendButtonActive
              ]}
              disabled={messageText.length === 0}
            >
              <Send 
                color={messageText.length > 0 ? '#FFFFFF' : '#9CA3AF'} 
                size={20} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedConversation ? renderChatScreen() : renderConversationsList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  conversationsContainer: {
    flex: 1,
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  conversationItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  conversationContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  professionalAvatar: {
    backgroundColor: '#2563EB',
  },
  clientAvatar: {
    backgroundColor: '#059669',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#111827',
  },
  unreadBadge: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  chatHeaderInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  chatAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  chatHeaderText: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#6B7280',
  },
  chatHeaderActions: {
    flexDirection: 'row',
  },
  headerAction: {
    padding: 8,
    marginLeft: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  sentMessage: {
    alignItems: 'flex-end',
  },
  receivedMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  sentBubble: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: '#111827',
  },
  messageTimestamp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timestampText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  messageInput: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
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