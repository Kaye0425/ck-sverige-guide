
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-earth-forest text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'sv' ? 'Om Sveriges Pärlor' : 'About Gems of Sweden'}
            </h1>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="prose prose-lg mx-auto">
              {language === 'sv' ? (
                <>
                  <p>
                    Välkommen till Sveriges Pärlor, din ultimata guide till Sveriges vackraste och mest fascinerande platser. 
                    Vår mission är att hjälpa resenärer, både svenska och internationella, att upptäcka de unika platser som 
                    gör Sverige till ett så speciellt resmål.
                  </p>
                  
                  <p>
                    Från de majestätiska fjällen i norr till de bördiga slätterna i söder, från historiska 
                    stadskärnor till orörd vildmark - vi har samlat information om de bästa platserna att besöka, 
                    oavsett vilken typ av upplevelse du söker.
                  </p>
                  
                  <p>
                    För varje destination presenterar vi praktisk information som hur lång tid du bör avsätta, 
                    uppskattade kostnader, och vad du kan köpa på plats. Vi delar också med oss av varför varje 
                    plats är speciell och värd att besöka.
                  </p>
                  
                  <p>
                    Sveriges Pärlor skapades av en grupp passionerade reseentusiaster som älskar att utforska Sverige 
                    och som vill dela med sig av sina erfarenheter och upptäckter. Vi uppdaterar regelbundet vår information 
                    för att säkerställa att du får aktuella och pålitliga rekommendationer.
                  </p>
                  
                  <p>
                    Vi hoppas att vår guide hjälper dig att upptäcka och uppleva det bästa som Sverige har att erbjuda!
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Welcome to Gems of Sweden, your ultimate guide to Sweden's most beautiful and fascinating places. 
                    Our mission is to help travelers, both Swedish and international, discover the unique places that 
                    make Sweden such a special destination.
                  </p>
                  
                  <p>
                    From the majestic mountains in the north to the fertile plains in the south, from historic 
                    city centers to pristine wilderness - we have collected information about the best places to visit, 
                    regardless of what type of experience you are looking for.
                  </p>
                  
                  <p>
                    For each destination, we present practical information such as how much time you should allocate, 
                    estimated costs, and what you can buy on site. We also share why each place is special and worth visiting.
                  </p>
                  
                  <p>
                    Gems of Sweden was created by a group of passionate travel enthusiasts who love exploring Sweden 
                    and want to share their experiences and discoveries. We regularly update our information 
                    to ensure you get current and reliable recommendations.
                  </p>
                  
                  <p>
                    We hope our guide helps you discover and experience the best that Sweden has to offer!
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
