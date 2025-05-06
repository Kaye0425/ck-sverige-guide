
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import destinations from '@/data/destinations';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Destinations = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDestinations = destinations.filter(destination => 
    destination.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.location[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.region[language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-earth-forest text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'sv' ? 'Resmål i Sverige' : 'Destinations in Sweden'}
            </h1>
            <p className="max-w-2xl mx-auto mb-8">
              {language === 'sv' 
                ? 'Upptäck Sveriges vackraste platser, från kända sevärdheter till dolda pärlor.' 
                : 'Discover Sweden\'s most beautiful places, from famous attractions to hidden gems.'}
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-forest h-5 w-5" />
              <Input
                type="text"
                placeholder={language === 'sv' ? 'Sök efter resmål...' : 'Search destinations...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-white text-earth-forest"
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map(destination => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {language === 'sv'
                    ? 'Inga resmål hittades. Försök med en annan sökning.'
                    : 'No destinations found. Try a different search.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;
