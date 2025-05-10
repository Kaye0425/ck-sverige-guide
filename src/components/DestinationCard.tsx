
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Destination } from '@/data/destinations';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { language } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  
  const handleImageError = () => {
    console.info(`Image failed to load for: ${destination.name[language]}`);
    setImageError(true);
  };

  const imageUrl = imageError ? fallbackImage : destination.imageUrl;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={destination.name[language]}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          loading="eager"
        />
      </div>
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{destination.name[language]}</h3>
        <p className="text-sm text-gray-500 mb-3">Region: {destination.region[language]}</p>
        <p className="line-clamp-3">{destination.description[language]}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/destination/${destination.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
