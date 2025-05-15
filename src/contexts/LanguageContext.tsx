import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sv' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  // Header
  'site.title': {
    sv: 'Sveriges Pärlor',
    en: 'Gems of Sweden',
  },
  'nav.home': {
    sv: 'Hem',
    en: 'Home',
  },
  'nav.destinations': {
    sv: 'Resmål',
    en: 'Destinations',
  },
  'nav.about': {
    sv: 'Om',
    en: 'About',
  },
  'language.switch': {
    sv: 'English',
    en: 'Svenska',
  },
  
  // Home page
  'home.hero.title': {
    sv: 'Upptäck Sveriges Vackraste Platser',
    en: 'Discover Sweden\'s Most Beautiful Places',
  },
  'home.hero.subtitle': {
    sv: 'Från natursköna landskap till historiska platser',
    en: 'From scenic landscapes to historic sites',
  },
  'home.explore.button': {
    sv: 'Utforska Resmål',
    en: 'Explore Destinations',
  },
  'home.featured.title': {
    sv: 'Populära Resmål',
    en: 'Featured Destinations',
  },
  
  // Destination page
  'destination.time': {
    sv: 'Tidsåtgång',
    en: 'Time Needed',
  },
  'destination.expenses': {
    sv: 'Uppskattade kostnader',
    en: 'Estimated Expenses',
  },
  'destination.shopping': {
    sv: 'Shopping',
    en: 'Shopping',
  },
  'destination.why.visit': {
    sv: 'Varför besöka',
    en: 'Why Visit',
  },
  'destination.hours': {
    sv: 'timmar',
    en: 'hours',
  },
  'destination.day': {
    sv: 'dag',
    en: 'day',
  },
  'destination.days': {
    sv: 'dagar',
    en: 'days',
  },
  
  // Chatbot translations
  'chatbot.title': {
    sv: 'Reseassistent',
    en: 'Travel Assistant',
  },
  'chatbot.placeholder': {
    sv: 'Skriv ditt meddelande...',
    en: 'Type your message...',
  },
  'chatbot.send': {
    sv: 'Skicka',
    en: 'Send',
  },
  'chatbot.open': {
    sv: 'Öppna chatt',
    en: 'Open chat',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('sv');

  const translate = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
