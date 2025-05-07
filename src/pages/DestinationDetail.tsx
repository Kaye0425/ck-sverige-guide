import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Clock, Euro, MapPin, ShoppingCart, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import destinations from '@/data/destinations';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WorldTimeClock from '@/components/WorldTimeClock';

// Currency exchange rates (updated May 2025)
const exchangeRates = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
  JPY: 164.50,
  SEK: 11.25,
  CHF: 0.97,
  INR: 90.15
};

// Currency symbols
const currencySymbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  SEK: 'kr',
  CHF: 'Fr',
  INR: '₹'
};

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [showWorldClock, setShowWorldClock] = useState(false);
  
  const destination = destinations.find(d => d.id === id);
  
  useEffect(() => {
    if (!destination) {
      navigate('/destinations');
    }
    window.scrollTo(0, 0);
  }, [destination, navigate]);
  
  if (!destination) {
    return null;
  }
  
  const formatTime = () => {
    if (destination.timeNeeded.days > 0) {
      return `${destination.timeNeeded.days} ${destination.timeNeeded.days === 1 ? t('destination.day') : t('destination.days')}`;
    } else {
      return `${destination.timeNeeded.hours} ${t('destination.hours')}`;
    }
  };
  
  const pronounceName = () => {
    const text = destination.name[language];
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on the current language
    utterance.lang = language === 'sv' ? 'sv-SE' : 'en-US';
    
    // Speak the destination name
    window.speechSynthesis.speak(utterance);
  };

  // Extract expense range from text (assumes format like "€50-100" or "€200")
  const extractExpenseRange = (expenseText) => {
    const matches = expenseText.match(/€(\d+)(?:-(\d+))?/);
    if (!matches) return { min: 0, max: 0 };
    
    const min = parseInt(matches[1]);
    const max = matches[2] ? parseInt(matches[2]) : min;
    return { min, max };
  };

  // Convert expenses to selected currency
  const convertExpense = (expenseText) => {
    const { min, max } = extractExpenseRange(expenseText);
    
    if (min === 0 && max === 0) return expenseText; // Return original if no match
    
    const convertedMin = (min * exchangeRates[selectedCurrency] / exchangeRates.EUR).toFixed(0);
    const convertedMax = (max * exchangeRates[selectedCurrency] / exchangeRates.EUR).toFixed(0);
    
    const symbol = currencySymbols[selectedCurrency];
    
    if (min === max) {
      return `${symbol}${convertedMin}`;
    } else {
      return `${symbol}${convertedMin}-${convertedMax}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <div 
        className="fixed left-0 top-0 bottom-0 z-10"
        onMouseEnter={() => setShowWorldClock(true)}
        onMouseLeave={() => setShowWorldClock(false)}
      >
        <div className={`transition-all duration-300 ${showWorldClock ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
          <WorldTimeClock />
        </div>
        {/* Hover tab for the clock */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 bg-earth-forest text-white p-1 rounded-r-md cursor-pointer shadow-md">
          <Clock size={18} />
        </div>
      </div>

      <Header />
      
      <main className="flex-grow">
        {/* Hero Image */}
        <div className="relative h-80 md:h-96 lg:h-[500px]">
          <img
            src={destination.image}
            alt={destination.name[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl md:text-5xl font-bold">
                {destination.name[language]}
              </h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20" 
                      onClick={pronounceName}
                    >
                      <Mic className="h-4 w-4 text-white" />
                      <span className="sr-only">Pronounce {destination.name[language]}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pronounce {destination.name[language]}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              <span className="text-lg">{destination.location[language]}, {destination.region[language]}</span>
            </div>
          </div>
        </div>
        
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link to="/destinations">
            <Button variant="ghost" className="mb-6 hover:bg-earth-forest hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'sv' ? 'Tillbaka till alla resmål' : 'Back to all destinations'}
            </Button>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'sv' ? 'Om' : 'About'} {destination.name[language]}
              </h2>
              <p className="mb-8 text-lg">
                {destination.description[language]}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-earth-forest">
                {t('destination.why.visit')}
              </h3>
              <div className="p-5 bg-earth-moss/10 rounded-lg mb-8 border border-earth-moss/30">
                <p>{destination.whyVisit[language]}</p>
              </div>
              
              <h3 className="text-xl font-bold mb-4">
                {language === 'sv' ? 'Planera ditt besök' : 'Plan your visit'}
              </h3>
              
              <p className="mb-6">
                {language === 'sv'
                  ? 'Här finns allt du behöver veta för att planera ditt besök till ' + destination.name.sv + '.'
                  : 'Here\'s everything you need to know to plan your visit to ' + destination.name.en + '.'}
              </p>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 pb-3 border-b">
                  {language === 'sv' ? 'Snabbfakta' : 'Quick Facts'}
                </h3>
                
                <div className="space-y-6">
                  {/* Time Needed */}
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-earth-moss/20 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-earth-forest" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">
                        {t('destination.time')}
                      </h4>
                      <p className="text-lg font-medium">{formatTime()}</p>
                    </div>
                  </div>
                  
                  {/* Expenses */}
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-earth-moss/20 flex items-center justify-center">
                        <Euro className="h-6 w-6 text-earth-forest" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-muted-foreground">
                          {t('destination.expenses')}
                        </h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              {selectedCurrency}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {Object.keys(exchangeRates).map((currency) => (
                              <DropdownMenuItem
                                key={currency}
                                onClick={() => setSelectedCurrency(currency)}
                                className="cursor-pointer"
                              >
                                {currency} ({currencySymbols[currency]})
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-lg font-medium">{convertExpense(destination.expenses[language])}</p>
                    </div>
                  </div>
                  
                  {/* Shopping */}
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-earth-moss/20 flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-earth-forest" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">
                        {t('destination.shopping')}
                      </h4>
                      <p>{destination.shopping[language]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
