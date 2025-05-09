
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Mic } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Destination {
  id: string;
  name: {
    sv: string;
    en: string;
  };
  location: {
    sv: string;
    en: string;
  };
  timeNeeded: {
    hours: number;
    days: number;
  };
  image: string;
  region: {
    sv: string;
    en: string;
  };
  description: {
    sv: string;
    en: string;
  };
  expenses: {
    sv: string;
    en: string;
  };
  shopping: {
    sv: string;
    en: string;
  };
  whyVisit: {
    sv: string;
    en: string;
  };
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { language, t } = useLanguage();
  
  const formatTime = () => {
    if (destination.timeNeeded.days > 0) {
      return `${destination.timeNeeded.days} ${destination.timeNeeded.days === 1 ? t('destination.day') : t('destination.days')}`;
    } else {
      return `${destination.timeNeeded.hours} ${t('destination.hours')}`;
    }
  };

  const pronounceName = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const text = destination.name[language];
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language based on the current language
    utterance.lang = language === 'sv' ? 'sv-SE' : 'en-US';
    
    // Speak the destination name
    window.speechSynthesis.speak(utterance);
  };

  // Fallback image in case the destination image is missing or fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1576744822484-c5a6b149fb36?auto=format&fit=crop&w=800";

  return (
    <Link to={`/destination/${destination.id}`} className="destination-card block hover:scale-[1.02] transition-all">
      <div className="relative rounded-t-lg overflow-hidden">
        <img
          src={destination.image || fallbackImage}
          alt={destination.name[language]}
          className="destination-card-image object-cover w-full h-52 hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackImage) {
              target.src = fallbackImage;
              console.log(`Image failed to load, using fallback for: ${destination.name[language]}`);
            }
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{destination.name[language]}</h3>
            <div className="relative group">
              <Mic 
                className="h-4 w-4 text-white opacity-80 hover:opacity-100 cursor-pointer" 
                aria-label={`Pronounce ${destination.name[language]}`}
                onClick={pronounceName}
              />
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Pronounce {destination.name[language]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{destination.location[language]}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatTime()}</span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
