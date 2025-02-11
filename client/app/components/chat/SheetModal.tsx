import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  isVisible: boolean;
  onDismiss: () => void;
}

const emojis = ['😡', '😂', '❤️', '👍', '🔥', '+'];

export default function SheetModal({ isVisible, onDismiss }: Props) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onDismiss} style={styles.modal}>
      <View style={styles.container}>
        <Animatable.View animation="bounceIn" duration={800} style={styles.emojiContainer}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity key={index} style={styles.emojiButton}>
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </Animatable.View>
        <View style={styles.actionList}>
          <ActionItem icon="arrow-undo-outline" text="Reply" />
          <ActionItem icon="chatbubbles-outline" text="Whisper Reply" />
          <ActionItem icon="copy-outline" text="Copy" />
          <ActionItem icon="happy-outline" text="Reactions" />
          <ActionItem icon="alert-circle" text="Report" isReport />
        </View>
      </View>
    </Modal>
  );
}

const ActionItem = ({ icon, text, isReport = false }: { icon: string; text: string; isReport?: boolean }) => (
  <TouchableOpacity style={styles.actionItem}>
    <Icon name={icon} size={20} color={isReport ? '#FF3B30' : '#333'} style={styles.actionIcon} />
    <Text style={[styles.actionText, isReport && styles.deleteText]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff', 
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'transparent',  
    boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: 25,
  },
  emojiButton: {
    backgroundColor: '#f0f0f0',  
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  emoji: {
    fontSize: 22,
  },
  actionList: {
    marginTop: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
  deleteText: {
    color: '#FF3B30',
  },
});
