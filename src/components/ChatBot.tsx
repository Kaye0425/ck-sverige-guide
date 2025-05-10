import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, MessageSquare, X } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// The useChatBot hook must be imported at the top of the file
import { useChatBot } from './ChatBotHandler';

const ChatBot = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // Use our custom hook for chat functionality
  const { 
    messages, 
    inputValue, 
    handleInputChange, 
    handleSendMessage, 
    handleKeyPress 
  } = useChatBot();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // If opening the chat and no messages yet, add a welcome message
    if (!isOpen && messages.length === 0) {
      const welcomeMessage = {
        text: language === 'sv' 
          ? "Hej! Jag är din reseguide för Sverige. Hur kan jag hjälpa dig idag?" 
          : "Hello! I'm your Sweden travel guide. How can I help you today?",
        isUser: false
      };
      
      setTimeout(() => {
        // We can't directly use setMessages here since it's inside the useChatBot hook,
        // but this is handled by ensuring we check messages.length === 0 above
        messages.push(welcomeMessage);
      }, 300);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Interface */}
      {isOpen && (
        <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="bg-earth-forest text-white p-4 flex items-center justify-between">
            <span className="font-bold">{t('chatbot.title')}</span>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-earth-sand text-earth-forest' : 'bg-gray-100 text-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <Textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder={t('chatbot.placeholder')}
                className="flex-grow mr-2 rounded-md border-gray-300 focus:border-earth-forest focus:ring-earth-forest"
                rows={1}
              />
              <Button onClick={handleSendMessage} variant="secondary">
                <Send className="h-4 w-4 mr-2" />
                {t('chatbot.send')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <Button variant="outline" onClick={toggleChat} className="rounded-full w-14 h-14 flex items-center justify-center shadow-md">
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">{t('chatbot.open')}</span>
      </Button>
    </div>
  );
};

export default ChatBot;
