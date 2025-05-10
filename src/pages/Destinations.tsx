import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { destinations } from '@/data/destinations';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';

// Function to normalize text by removing accents and special characters
const normalizeText = (text: string): string => {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[øø]/gi, 'o')
    .replace(/[åå]/gi, 'a')
    .replace(/[ääæ]/gi, 'a')
    .replace(/[ööœ]/gi, 'o');
};

const Destinations = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [normalizedSearchTerm, setNormalizedSearchTerm] = useState('');
  
  // Fallback image in case the destination image is missing or fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800";
  
  // Update normalized search term when search term changes
  useEffect(() => {
    setNormalizedSearchTerm(normalizeText(searchTerm));
  }, [searchTerm]);
  
  // All searchable terms for destinations in current language
  const allTerms = destinations.flatMap(destination => [
    destination.name[language].toLowerCase(),
    destination.location[language].toLowerCase(),
    destination.region[language].toLowerCase()
  ]);

  // Generate normalized terms for search
  const normalizedTerms = allTerms.map(term => normalizeText(term));
  
  // Filter destinations based on normalized search term
  const filteredDestinations = destinations.filter(destination => {
    const normalizedName = normalizeText(destination.name[language]);
    const normalizedLocation = normalizeText(destination.location[language]);
    const normalizedRegion = normalizeText(destination.region[language]);
    
    return normalizedName.includes(normalizedSearchTerm) || 
           normalizedLocation.includes(normalizedSearchTerm) || 
           normalizedRegion.includes(normalizedSearchTerm);
  });

  // Find suggestions for possible misspellings
  useEffect(() => {
    if (normalizedSearchTerm.length > 2 && filteredDestinations.length === 0) {
      // Simple suggestion algorithm - terms that include at least half of the search chars
      const searchChars = normalizedSearchTerm.split('');
      const possibleMatches = allTerms.filter((term, index) => {
        const normalizedTerm = normalizedTerms[index];
        const matchCount = searchChars.filter(char => normalizedTerm.includes(char)).length;
        return matchCount >= Math.floor(normalizedSearchTerm.length / 2);
      });
      
      // Take top 3 unique suggestions
      const uniqueSuggestions = Array.from(new Set(possibleMatches)).slice(0, 3);
      setSuggestions(uniqueSuggestions as string[]); 
      setShowSuggestions(uniqueSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [normalizedSearchTerm, language]);

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
