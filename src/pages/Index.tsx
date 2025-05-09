
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import DestinationCard from '@/components/DestinationCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import destinations from '@/data/destinations';
import { ArrowRight, MapPin } from 'lucide-react';

const Index = () => {
  const { t, language } = useLanguage();
  const featuredDestinations = destinations.slice(0, 3);
  
  // Fallback image in case an image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1576744822484-c5a6b149fb36?auto=format&fit=crop&w=800";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="hero-section bg-cover bg-center relative h-[60vh] flex items-center justify-center" 
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1501804091302-b174a0b3e116?auto=format&fit=crop&w=1500)' 
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center text-white px-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg mb-8">
              {t('home.hero.subtitle')}
            </p>
            <Link to="/destinations">
              <Button className="bg-earth-forest hover:bg-earth-moss transition-colors">
                {t('home.explore.button')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Featured Destinations Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {t('home.featured.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map((destination) => (
                <DestinationCard 
                  key={destination.id} 
                  destination={destination} 
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/destinations">
                <Button variant="outline" className="border-earth-forest text-earth-forest hover:bg-earth-forest hover:text-white">
                  {language === 'sv' ? 'Se alla resmål' : 'View all destinations'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Regions Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {language === 'sv' ? 'Utforska efter region' : 'Explore by region'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 'norrland', name: { sv: 'Norrland', en: 'Northern Sweden' }, image: 'https://images.unsplash.com/photo-1557546607-59c6989579d4?auto=format&fit=crop&w=400' },
                { id: 'svealand', name: { sv: 'Svealand', en: 'Central Sweden' }, image: 'https://images.unsplash.com/photo-1572973843894-825e041604d8?auto=format&fit=crop&w=400' },
                { id: 'gotaland', name: { sv: 'Götaland', en: 'Southern Sweden' }, image: 'https://images.unsplash.com/photo-1573799792866-3cfc308652dd?auto=format&fit=crop&w=400' },
              ].map((region) => (
                <div key={region.id} className="relative overflow-hidden rounded-lg group h-60">
                  <img 
                    src={region.image} 
                    alt={region.name[language]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallbackImage) {
                        target.src = fallbackImage;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-white text-xl font-bold">{region.name[language]}</h3>
                      <Link to={`/region/${region.id}`} className="inline-flex items-center text-white/90 hover:text-white mt-2">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{language === 'sv' ? 'Upptäck platser' : 'Discover places'}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
