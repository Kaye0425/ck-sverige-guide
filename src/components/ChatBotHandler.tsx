
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { generateResponse } from './ChatBotResponses';

interface Message {
  text: string;
  isUser: boolean;
}

export const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { language } = useLanguage();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = { text: inputValue, isUser: true };
    
    // Add user message to the chat
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Generate a response to the user message
    const botResponse = { text: generateResponse(inputValue, language), isUser: false };
    
    // Add a small delay to make the interaction feel more natural
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 600);
    
    // Clear the input field
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    messages,
    setMessages,
    inputValue,
    handleInputChange,
    handleSendMessage,
    handleKeyPress,
  };
};
