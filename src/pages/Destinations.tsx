
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import destinations from '@/data/destinations';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';

const Destinations = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // All searchable terms for destinations in current language
  const allTerms = destinations.flatMap(destination => [
    destination.name[language].toLowerCase(),
    destination.location[language].toLowerCase(),
    destination.region[language].toLowerCase()
  ]);

  // Filter destinations based on search term
  const filteredDestinations = destinations.filter(destination => 
    destination.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.location[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.region[language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find suggestions for possible misspellings
  useEffect(() => {
    if (searchTerm.length > 2 && filteredDestinations.length === 0) {
      // Simple suggestion algorithm - terms that include at least half of the search chars
      const possibleMatches = allTerms.filter(term => {
        const searchChars = searchTerm.toLowerCase().split('');
        const matchCount = searchChars.filter(char => term.includes(char)).length;
        return matchCount >= Math.floor(searchTerm.length / 2);
      });
      
      // Take top 3 unique suggestions
      const uniqueSuggestions = Array.from(new Set(possibleMatches)).slice(0, 3);
      setSuggestions(uniqueSuggestions);
      setShowSuggestions(uniqueSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, language]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

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
            
            <div className="max-w-md mx-auto relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-forest h-5 w-5 z-10" />
              <Input
                type="text"
                placeholder={language === 'sv' ? 'Sök efter resmål, regioner eller platser...' : 'Search destinations, regions or places...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-white text-earth-forest pr-10"
              />
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {showSuggestions && (
              <div className="max-w-md mx-auto mb-8 bg-white rounded-md shadow-md overflow-hidden">
                <Command>
                  <CommandList>
                    <CommandGroup heading={language === 'sv' ? 'Menade du:' : 'Did you mean:'}>
                      {suggestions.map((suggestion, index) => (
                        <CommandItem 
                          key={index} 
                          onSelect={() => handleSuggestionClick(suggestion)}
                          className="cursor-pointer"
                        >
                          {suggestion}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
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
                <p className="text-lg text-muted-foreground mb-4">
                  {language === 'sv'
                    ? 'Inga resmål hittades.'
                    : 'No destinations found.'}
                </p>
                {searchTerm.length > 0 && (
                  <p className="text-md text-muted-foreground">
                    {language === 'sv'
                      ? 'Försök med en annan sökning eller se alla resmål nedan.'
                      : 'Try a different search or browse all destinations below.'}
                  </p>
                )}
                {!showSuggestions && searchTerm.length > 0 && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={clearSearch}
                  >
                    {language === 'sv' ? 'Visa alla resmål' : 'View all destinations'}
                  </Button>
                )}
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
