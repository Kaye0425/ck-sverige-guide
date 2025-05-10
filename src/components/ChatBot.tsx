
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use our custom hook for chat functionality
  const { 
    messages, 
    setMessages,
    inputValue, 
    handleInputChange, 
    handleSendMessage, 
    handleKeyPress 
  } = useChatBot();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
      
      setMessages([welcomeMessage]);
    }
  };

  // Get translated strings with fallbacks
  const chatTitle = typeof t('chatbot.title') === 'string' ? t('chatbot.title') : 'Travel Assistant';
  const chatPlaceholder = typeof t('chatbot.placeholder') === 'string' ? t('chatbot.placeholder') : 'Type your message...';
  const sendButtonText = typeof t('chatbot.send') === 'string' ? t('chatbot.send') : 'Send';
  const openChatText = typeof t('chatbot.open') === 'string' ? t('chatbot.open') : 'Open chat';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Interface */}
      {isOpen && (
        <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-96">
          {/* Chat Header */}
          <div className="bg-earth-forest text-white p-4 flex items-center justify-between">
            <span className="font-bold">{chatTitle}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg max-w-[80%] ${message.isUser ? 'bg-earth-sand text-earth-forest' : 'bg-gray-100 text-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <Textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder={chatPlaceholder}
                className="flex-grow mr-2 rounded-md border-gray-300 focus:border-earth-forest focus:ring-earth-forest"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage} 
                variant="secondary"
                aria-label="Send message"
              >
                <Send className="h-4 w-4 mr-2" />
                <span>{sendButtonText}</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <Button 
        variant="outline" 
        onClick={toggleChat} 
        className="rounded-full w-14 h-14 flex items-center justify-center shadow-md bg-white hover:bg-gray-100"
        aria-label={openChatText}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatBot;
