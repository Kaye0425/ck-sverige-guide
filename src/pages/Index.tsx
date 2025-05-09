
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';
import WorldTimeClock from '../components/WorldTimeClock';
import ContactForm from '../components/ContactForm';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  const featuredDestinations = destinations.slice(0, 3);
  const fallbackHeroImage = 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
  
  const heroBgStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${fallbackHeroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="w-full py-24 px-4 sm:px-6" style={heroBgStyle}>
        <div className="max-w-5xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Discover the Beauty of Sweden
          </h1>
          <p className="text-xl mb-8">
            Explore the rich culture, breathtaking landscapes, and unique experiences that Sweden has to offer.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link to="/destinations">Explore Destinations</Link>
            </Button>
            <Button variant="outline" size="lg">
              <a href="#contact">Contact an Agent</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Destinations Section */}
      <section className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* World Time Section */}
      <section className="px-4 sm:px-6 py-8 bg-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Local Time</h2>
          <Card>
            <CardContent className="pt-6">
              <WorldTimeClock />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
          <ContactForm />
        </div>
      </section>

      <Toaster />
    </div>
  );
};

export default Index;
