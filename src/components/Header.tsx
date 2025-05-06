
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Flag, Menu, X } from 'lucide-react';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'sv' ? 'en' : 'sv');
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-earth-forest">
          {t('site.title')}
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link font-medium">
            {t('nav.home')}
          </Link>
          <Link to="/destinations" className="nav-link font-medium">
            {t('nav.destinations')}
          </Link>
          <Link to="/about" className="nav-link font-medium">
            {t('nav.about')}
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Flag className="h-4 w-4" />
            {t('language.switch')}
          </Button>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card shadow-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="nav-link font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/destinations" 
              className="nav-link font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.destinations')}
            </Link>
            <Link 
              to="/about" 
              className="nav-link font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 justify-start py-2"
            >
              <Flag className="h-4 w-4" />
              {t('language.switch')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
