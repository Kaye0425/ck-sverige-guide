
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-forest text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('site.title')}</h3>
            <p className="text-sm opacity-80">
              {language === 'sv' 
                ? 'Din guide till Sveriges vackraste platser och sevärdheter.'
                : 'Your guide to Sweden\'s most beautiful places and attractions.'}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{language === 'sv' ? 'Snabblänkar' : 'Quick Links'}</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm opacity-80 hover:opacity-100">{t('nav.home')}</a></li>
              <li><a href="/destinations" className="text-sm opacity-80 hover:opacity-100">{t('nav.destinations')}</a></li>
              <li><a href="/about" className="text-sm opacity-80 hover:opacity-100">{t('nav.about')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{language === 'sv' ? 'Kontakt' : 'Contact'}</h3>
            <p className="text-sm opacity-80">info@sverigesparlor.se</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-70">
          <p>© {currentYear} {t('site.title')}. {language === 'sv' ? 'Alla rättigheter förbehållna.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
