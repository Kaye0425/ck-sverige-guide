
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MinimizeIcon, MessageSquare, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_swedish_guide";
const EMAILJS_TEMPLATE_ID = "template_swedish_guide";
const EMAILJS_USER_ID = "YOUR_USER_ID"; // Replace with your actual EmailJS user ID in a production app

const defaultGreeting = "Hi there! I'm your travel assistant for Sverige Guide. Ask me anything about travel costs, planning trips, or recommendations for Sweden!";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: defaultGreeting,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { toast: uiToast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const contactRealAgent = async () => {
    // Prevent multiple simultaneous email attempts
    if (isSendingEmail) return;
    setIsSendingEmail(true);
    
    // Prepare the message content - include chat history
    const chatHistory = messages.map(msg => 
      `${msg.sender.toUpperCase()}: ${msg.content}`
    ).join('\n\n');
    
    const agentEmail = "khayevillafuerte@gmail.com";
    
    // Show notification that we're attempting to send an email
    toast("Contacting an agent via email...", {
      description: "An agent will contact you at their earliest convenience.",
      duration: 5000,
    });
    
    try {
      // For direct email without EmailJS setup, we'll use a mailto link as fallback
      // This will open the user's email client with a pre-filled email
      const subject = encodeURIComponent("Customer Assistance Request - Sverige Guide");
      const body = encodeURIComponent(
        `A customer is requesting assistance on the Sverige Guide website.\n\nChat History:\n${chatHistory}`
      );
      
      // Open mailto link in a new tab
      window.open(`mailto:${agentEmail}?subject=${subject}&body=${body}`, '_blank');
      
      // Log confirmation for debugging
      console.log("Opening email client to contact agent:", agentEmail);
      console.log("Email subject:", "Customer Assistance Request - Sverige Guide");
      console.log("Email body contains chat history with", messages.length, "messages");
      
      // Add confirmation message in chat
      const botMessage: Message = {
        id: Date.now().toString(),
        content: "I've opened your email client so you can directly contact our travel specialist. You can modify the email before sending if you'd like to add more details. Is there anything else I can help with?",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error sending email:", error);
      
      // Add error message in chat
      const botMessage: Message = {
        id: Date.now().toString(),
        content: "I'm having trouble contacting our agent. Please email khayevillafuerte@gmail.com directly or try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // Show error notification
      toast("Email error", {
        description: "Could not send email to agent. Please try again or email directly.",
        duration: 5000,
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Generate a response based on user input
  const generateBotResponse = (userInput: string): string => {
    const lowerCaseInput = userInput.toLowerCase();
    
    // Check for requests to speak with a real person
    if (lowerCaseInput.includes('real person') || 
        lowerCaseInput.includes('real agent') || 
        lowerCaseInput.includes('speak to someone') ||
        lowerCaseInput.includes('human') ||
        lowerCaseInput.includes('talk to agent') ||
        lowerCaseInput.includes('speak with agent')) {
      
      setTimeout(contactRealAgent, 500);
      return "I understand you'd like to speak with a real person. I'm opening your email client so you can directly contact our travel specialist.";
    }
    
    // Destination info - tourist spots
    if (lowerCaseInput.includes('tourist spot') || 
        lowerCaseInput.includes('attraction') || 
        lowerCaseInput.includes('landmark') ||
        lowerCaseInput.includes('sight') ||
        lowerCaseInput.includes('what to see')) {
      
      // Check for specific locations
      if (lowerCaseInput.includes('stockholm')) {
        return `## Stockholm's Top Attractions

<img src="https://images.unsplash.com/photo-1580650968142-3245a92b0979" alt="Stockholm Old Town (Gamla Stan)" style="width:100%;border-radius:8px;margin:8px 0;" />

### Gamla Stan (Old Town)
* **Location:** Central Stockholm
* **Highlights:** Medieval streets, Royal Palace, Nobel Museum
* **Opening hours:** The area is always open, individual attractions vary
* **Entry fees:** Free to walk around, Palace entry ~180 SEK
* **Best time to visit:** Early morning or weekdays to avoid crowds

### Vasa Museum
* **Location:** Djurgården island
* **Highlights:** 17th-century warship preserved almost intact
* **Opening hours:** 10:00-17:00 (longer in summer)
* **Entry fees:** 170 SEK (adults)
* **Best time to visit:** Book tickets online in advance

### Skansen Open-Air Museum
* **Location:** Djurgården island
* **Highlights:** World's oldest open-air museum with historic Swedish buildings
* **Opening hours:** Seasonal, generally 10:00-16:00 (longer in summer)
* **Entry fees:** 220 SEK (adults), seasonal variations
* **Rules:** Some buildings have special dress code or visitor limits

Would you like more specific information about any of these attractions or others in Sweden?`;
      }
      
      if (lowerCaseInput.includes('gothenburg') || lowerCaseInput.includes('göteborg')) {
        return `## Gothenburg's Top Attractions

<img src="https://images.unsplash.com/photo-1599486005627-785cb1888682" alt="Gothenburg canals and architecture" style="width:100%;border-radius:8px;margin:8px 0;" />

### Liseberg Amusement Park
* **Location:** Central Gothenburg
* **Highlights:** Scandinavian's largest amusement park with thrilling rides
* **Opening hours:** Seasonal, generally 12:00-22:00 in summer
* **Entry fees:** ~110 SEK entrance, rides extra
* **Best time to visit:** Weekdays or non-holiday periods

### Gothenburg Archipelago
* **Location:** Just offshore from the city
* **Highlights:** Beautiful car-free islands with stunning nature
* **Access:** Regular ferries from Saltholmen
* **Entry fees:** Only ferry ticket required (~30-70 SEK)
* **Best time to visit:** Summer months for swimming and outdoor activities

### Haga District
* **Location:** Central Gothenburg
* **Highlights:** Charming pedestrian street with wooden houses and cafés
* **Opening hours:** Shops typically 10:00-18:00
* **Famous for:** "Hagabullen" - giant cinnamon buns
* **Tips:** Visit the Skansen Kronan fortress for panoramic views

Would you like information about other attractions or more details about these?`;
      }
      
      // Default attractions response
      return `## Sweden's Must-Visit Attractions

<img src="https://images.unsplash.com/photo-1501708702036-8b0867c2ad0c" alt="Swedish archipelago with traditional red houses" style="width:100%;border-radius:8px;margin:8px 0;" />

### Top Attractions by Region:

**Stockholm Region:**
* Stockholm Old Town (Gamla Stan) - Historic medieval city center
* Vasa Museum - Perfectly preserved 17th-century warship
* Stockholm Archipelago - Over 30,000 islands and islets
* The Royal Palace - Official residence of the Swedish monarch

**Gothenburg Region:**
* Liseberg Amusement Park - Scandinavia's largest theme park
* Gothenburg Archipelago - Beautiful car-free islands
* The Garden Society - One of Europe's best-preserved 19th-century parks

**Malmö and South:**
* Øresund Bridge - Engineering marvel connecting Sweden and Denmark
* Malmö Castle - Renaissance castle with excellent museums
* Ales Stenar - Sweden's "Stonehenge" megalithic monument

**Northern Sweden:**
* Icehotel in Jukkasjärvi - World-famous hotel rebuilt annually from ice
* Abisko National Park - One of the best places to see Northern Lights
* Kebnekaise - Sweden's highest mountain with stunning hiking trails

Would you like more specific information about any of these attractions or regions?`;
    }
    
    // Opening hours and visiting times
    if (lowerCaseInput.includes('opening hour') || 
        lowerCaseInput.includes('visiting time') || 
        lowerCaseInput.includes('when to visit') ||
        lowerCaseInput.includes('best time')) {
      
      return `## Best Times to Visit Swedish Attractions

### Seasonal Considerations:
* **Summer (June-August):** Peak tourist season with long daylight hours (18-20 hours of light!), ideal for outdoor activities
* **Fall (September-October):** Beautiful foliage, fewer crowds, moderate prices
* **Winter (November-March):** Dark days but perfect for Northern Lights, winter sports, and Christmas markets
* **Spring (April-May):** Blooming season with moderate temperatures and fewer tourists

### Typical Opening Hours:
* **Museums:** Usually 10:00-17:00, often closed Mondays
* **Shopping:** Typically 10:00-19:00 weekdays, 10:00-16:00 Saturdays, limited Sunday hours
* **Restaurants:** Lunch 11:00-14:00, Dinner from 17:00-22:00
* **Government offices:** 09:00-16:00 Monday-Friday

### Tips for Visitors:
* Many attractions have extended hours during summer
* National holidays may affect opening hours
* Many places close or reduce hours during July (national vacation month)
* Advance booking is recommended for popular attractions, especially during peak season

Would you like information about specific attractions or regions?`;
    }

    // Entry fees and tickets
    if (lowerCaseInput.includes('entry fee') || 
        lowerCaseInput.includes('ticket') || 
        lowerCaseInput.includes('admission') ||
        lowerCaseInput.includes('how much to enter')) {
      
      return `## Entry Fees for Popular Swedish Attractions

<img src="https://images.unsplash.com/photo-1603458834583-4a1c0aa3d191" alt="Stockholm Vasa Museum entrance" style="width:100%;border-radius:8px;margin:8px 0;" />

### Top Museums & Attractions:
* **Vasa Museum (Stockholm):** 170 SEK for adults, free for under 18
* **Skansen Open-Air Museum:** 220 SEK adults, 100 SEK children (4-15)
* **ABBA Museum:** 295 SEK adults, 95 SEK children
* **Liseberg Amusement Park (Gothenburg):** 110 SEK entrance + ride costs
* **Icehotel (Jukkasjärvi):** 325 SEK day visit, overnight stays from 2,700 SEK

### Money-Saving Tips:
* **Stockholm Pass:** From 759 SEK for 1 day, includes 60+ attractions
* **Gothenburg City Card:** From 395 SEK for 24 hours
* **Uppsala Card:** From 250 SEK for 24 hours
* Many museums offer free entry on specific days/times each month
* Student and senior discounts available at most attractions (bring ID)

### Booking Information:
* Most attractions allow online booking to avoid queues
* Some popular sites use timed entry tickets
* Group discounts often available for parties of 10+

Would you like help purchasing tickets for a specific attraction?`;
    }
    
    // Rules and restrictions
    if (lowerCaseInput.includes('rule') || 
        lowerCaseInput.includes('restriction') || 
        lowerCaseInput.includes('dress code') ||
        lowerCaseInput.includes('not allowed')) {
      
      return `## Rules and Guidelines for Visitors to Sweden

### General Cultural Guidelines:
* Punctuality is highly valued - arrive on time for appointments
* Queuing is orderly and respected - don't cut in line
* Shoes are typically removed when entering someone's home
* Indoor voice - Swedes generally speak quietly in public spaces

### Dress Codes:
* Generally casual but neat attire is acceptable at most places
* Churches may require covered shoulders and knees
* Upscale restaurants might have smart casual or formal dress codes
* Winter requires proper clothing (layers, hat, gloves) for comfort and safety

### Important Restrictions:
* Strict anti-smoking laws - no smoking in public buildings, restaurants, or near entrances
* Zero tolerance for drink driving (blood alcohol limit 0.02%)
* No alcohol consumption in public places except designated areas
* Photography may be restricted in some museums, churches, and government buildings
* Wild camping allowed under "Allemansrätten" (Right of Public Access) but with specific rules

### National Park Rules:
* Stay on marked trails in sensitive areas
* No littering or damage to natural features
* Restrictions on fires during dry seasons
* Some areas may prohibit pets

Is there a specific place or activity you'd like to know the rules for?`;
    }
    
    // Weather information
    if (lowerCaseInput.includes('weather') || 
        lowerCaseInput.includes('climate') || 
        lowerCaseInput.includes('temperature') ||
        lowerCaseInput.includes('when to go') ||
        lowerCaseInput.includes('season')) {
      
      return `## Sweden's Weather and Climate Information

<img src="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22" alt="Winter scene in Sweden with snow-covered trees" style="width:100%;border-radius:8px;margin:8px 0;" />

### Seasonal Weather:
* **Summer (June-August):** 15-25°C, long daylight hours (18-24 hours), occasional rain
* **Fall (September-October):** 5-15°C, beautiful foliage, increasing rainfall
* **Winter (November-March):** -15 to 5°C, snow common, very short days (3-6 hours of light)
* **Spring (April-May):** 5-15°C, beautiful blooms, unpredictable weather

### Regional Variations:
* **South (Skåne):** Milder climate, less snow in winter
* **Central (Stockholm):** Four distinct seasons, moderate precipitation
* **North (Lapland):** Subarctic climate, long cold winters, midnight sun in summer

### Packing Tips:
* **Summer:** Light clothing but bring layers and rain jacket
* **Fall/Spring:** Warm layers, waterproof jacket, comfortable walking shoes
* **Winter:** Thermal layers, heavy coat, hat, gloves, waterproof boots
* Regardless of season, always have layers available

### Weather Phenomena:
* Midnight sun in northern Sweden (May-July)
* Northern Lights visible in north (September-March)
* Ice roads across frozen lakes and sea in winter

Would you like weather information for a specific city or region in Sweden?`;
    }
    
    // Safety advisories
    if (lowerCaseInput.includes('safety') || 
        lowerCaseInput.includes('danger') || 
        lowerCaseInput.includes('warning') ||
        lowerCaseInput.includes('safe country')) {
      
      return `## Safety Information for Travelers in Sweden

### General Safety:
Sweden is generally a very safe country with low crime rates. However, as with any destination, it's good to be aware of potential issues:

* **Petty crime:** Pickpocketing can occur in tourist areas and public transport
* **Scams:** Be cautious of common tourist scams in major cities
* **Emergency number:** 112 works throughout Sweden for all emergencies

### Nature Safety:
* **Wildlife:** Few dangerous animals, but be aware of moose and elk on roads
* **Water safety:** Cold water temperatures even in summer can cause shock
* **Winter conditions:** Roads can be icy, proper footwear with good grip is essential
* **Wilderness hiking:** Always inform someone of your route and expected return

### Current Advisories:
* Always check for current travel advisories before your trip
* Follow official guidance during extreme weather events
* Be prepared for rapid weather changes in mountain areas

### Health Precautions:
* High-quality healthcare available but bring travel insurance
* Tap water is safe to drink throughout the country
* Pharmacies ("Apotek") are widely available for minor health needs
* Tick-borne encephalitis and Lyme disease are present - use insect repellent in rural areas

Would you like more specific safety information about certain activities or regions?`;
    }
    
    // Nearby hotels and accommodations
    if (lowerCaseInput.includes('hotel') || 
        lowerCaseInput.includes('accommodation') || 
        lowerCaseInput.includes('place to stay') ||
        lowerCaseInput.includes('hostel') ||
        lowerCaseInput.includes('airbnb')) {
      
      // Check for specific locations
      let locationContext = "Sweden";
      if (lowerCaseInput.includes('stockholm')) locationContext = "Stockholm";
      if (lowerCaseInput.includes('gothenburg') || lowerCaseInput.includes('göteborg')) locationContext = "Gothenburg";
      if (lowerCaseInput.includes('malmö') || lowerCaseInput.includes('malmo')) locationContext = "Malmö";
      
      // Check for budget preferences
      let budgetContext = "";
      if (lowerCaseInput.includes('luxury') || lowerCaseInput.includes('high end') || lowerCaseInput.includes('expensive')) {
        budgetContext = "luxury";
      } else if (lowerCaseInput.includes('budget') || lowerCaseInput.includes('cheap') || lowerCaseInput.includes('affordable')) {
        budgetContext = "budget";
      } else if (lowerCaseInput.includes('mid') || lowerCaseInput.includes('moderate')) {
        budgetContext = "mid-range";
      }
      
      let responseText = `## Accommodation Options in ${locationContext}

<img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" alt="Stylish modern Scandinavian hotel room" style="width:100%;border-radius:8px;margin:8px 0;" />

`;
      
      // Add appropriate hotel recommendations based on budget and location
      if (budgetContext === "luxury") {
        responseText += `### Luxury Accommodations:
* **Grand Hôtel (Stockholm):** Historic 5-star hotel with waterfront views, from 3,500 SEK/night
* **Hotel Diplomat:** Elegant Art Nouveau hotel in central Stockholm, from 2,800 SEK/night
* **Upper House (Gothenburg):** Modern luxury with infinity pool and spa, from 3,200 SEK/night
* **Arctic Bath (Lapland):** Floating hotel and spa in pristine nature, from 9,500 SEK/night
* **Treehotel (Harads):** Unique designer treehouses in the forest, from 5,000 SEK/night

### Luxury Amenities:
* Five-star service with concierge
* Premium spas and wellness centers
* Fine dining restaurants on premises
* Central locations or exceptional views
* Unique design elements and experiences`;
      } else if (budgetContext === "budget") {
        responseText += `### Budget-Friendly Options:
* **STF Hostels:** Clean, well-run hostels throughout Sweden, from 250 SEK/night
* **Comfort Hotels:** Good value chain hotels in city centers, from 700 SEK/night
* **Ibis Hotels:** Reliable budget option in major cities, from 650 SEK/night
* **Camping Cabins:** Simple but comfortable option, from 400 SEK/night
* **University Housing:** Available during summer in university towns, from 500 SEK/night

### Budget Tips:
* Book well in advance for best rates
* Consider accommodations slightly outside city centers
* Many hostels offer private rooms as well as dorms
* Camping is allowed in many natural areas under "Right of Public Access" rules
* Off-season travel (Sep-May) offers significantly lower rates`;
      } else {
        // Default to mid-range
        responseText += `### Popular Mid-Range Options:
* **Scandic Hotels:** Sweden's largest chain with locations everywhere, from 900-1,500 SEK/night
* **Elite Hotels:** Quality hotels often in historic buildings, from 1,000-1,800 SEK/night
* **Clarion Hotels:** Modern rooms with good amenities, from 1,100-1,700 SEK/night
* **Countryside Bed & Breakfasts:** Charming local experiences, from 800-1,200 SEK/night
* **Vacation Rentals:** Great for families or longer stays, from 900-2,000 SEK/night

### Mid-Range Features:
* Good locations within easy reach of attractions
* Clean, comfortable rooms with private bathrooms
* Often include breakfast buffets
* Usually offer free WiFi and other basic amenities
* Good balance of quality and value`;
      }
      
      responseText += `

### Booking Tips:
* Summer months (June-August) and December require early booking
* Many hotels offer non-refundable rates at significant discounts
* Breakfast is often included in room rates
* Most accommodations are non-smoking
* City tax is generally included in the quoted price

Would you like me to recommend specific properties for your trip dates or help with booking?`;
      
      return responseText;
    }
    
    // Restaurants and food
    if (lowerCaseInput.includes('restaurant') || 
        lowerCaseInput.includes('food') || 
        lowerCaseInput.includes('eat') ||
        lowerCaseInput.includes('dining') ||
        lowerCaseInput.includes('cafe')) {
      
      let dietaryPref = "";
      if (lowerCaseInput.includes('vegetarian')) dietaryPref = "vegetarian";
      if (lowerCaseInput.includes('vegan')) dietaryPref = "vegan";
      if (lowerCaseInput.includes('halal')) dietaryPref = "halal";
      if (lowerCaseInput.includes('gluten')) dietaryPref = "gluten-free";
      
      let responseText = `## Swedish Food and Dining

<img src="https://images.unsplash.com/photo-1601928782687-9dc73cce6f1a" alt="Traditional Swedish meatballs with lingonberry sauce" style="width:100%;border-radius:8px;margin:8px 0;" />

### Must-Try Swedish Dishes:
* **Köttbullar:** Traditional Swedish meatballs with gravy, potatoes and lingonberry
* **Gravlax:** Cured salmon served with mustard-dill sauce
* **Kanelbullar:** Swedish cinnamon buns, perfect with coffee
* **Smörgåstårta:** Savory sandwich cake for special occasions
* **Räksmörgås:** Open-faced shrimp sandwich on rye bread

### Dining Experiences:
* **Fika:** Swedish coffee break tradition with pastries (daily occurrence!)
* **Smörgåsbord:** Traditional buffet with hot and cold dishes
* **Food Markets:** Östermalms Saluhall (Stockholm) and other food halls
* **Outdoor dining:** Popular in summer months
* **"After Work":** Swedish happy hour with food and drink specials`;

      // Add dietary specific information if requested
      if (dietaryPref === "vegetarian") {
        responseText += `

### Vegetarian Options:
* Most restaurants offer several vegetarian alternatives
* **Hermans (Stockholm):** Popular vegetarian buffet with amazing views
* **Légumes (Gothenburg):** Fine vegetarian dining
* **MAX Burgers:** Fast food chain with excellent plant-based options
* Look for "Dagens Vegetarisk" (vegetarian dish of the day) in restaurants`;
      } else if (dietaryPref === "vegan") {
        responseText += `

### Vegan Options:
* **Växthuset (Stockholm):** 100% plant-based menu
* **Kafé 44 (Stockholm):** Alternative vegan café with cultural events
* **Blackbird (Malmö):** Vegan comfort food
* **Happy Vegan (multiple locations):** Fast-casual vegan food
* Many supermarkets have extensive vegan sections (look for "Vegan" labels)`;
      } else if (dietaryPref === "halal") {
        responseText += `

### Halal Options:
* **Lilla Istanbul (Stockholm):** Authentic Turkish cuisine with halal meat
* **Folkets Kebab (multiple locations):** Halal certified kebab shops
* **Noor Fès (Gothenburg):** Moroccan restaurant with halal options
* **Aria Persian Restaurant (Stockholm):** Persian cuisine with halal dishes
* Most major cities have halal grocery stores`;
      } else if (dietaryPref === "gluten-free") {
        responseText += `

### Gluten-Free Options:
* **Friends Food (Stockholm):** 100% gluten-free bakery and café
* **GreenMeal (multiple locations):** Labels all allergens clearly
* **Café FOAM (Malmö):** Known for gluten-free pastries
* Most restaurants can accommodate gluten-free diets if asked
* Look for "Glutenfri" labels on menus and in supermarkets`;
      }
      
      responseText += `

### Dining Tips:
* Tipping is not expected but rounding up or leaving 5-10% for good service is appreciated
* Lunch specials ("Dagens rätt") offer great value (approximately 95-150 SEK)
* Reservations recommended for dinner, especially on weekends
* Tap water is always free and of excellent quality
* Credit cards are accepted almost everywhere, even for small purchases

Would you like recommendations for specific restaurants in a particular city or area?`;
      
      return responseText;
    }
    
    // ATMs and banks
    if (lowerCaseInput.includes('atm') || 
        lowerCaseInput.includes('bank') || 
        lowerCaseInput.includes('cash') ||
        lowerCaseInput.includes('money')) {
      
      return `## Banking and Money Information in Sweden

### Cash and Cards:
* Sweden is almost entirely a cashless society
* Credit/debit cards are accepted virtually everywhere
* Cards with chip and PIN are preferred
* Contactless payment widely available
* Major cards (Visa, Mastercard) accepted everywhere, American Express less common

### ATMs and Banks:
* ATMs ("Bankomat" or "Uttagsautomat") are widely available in cities and towns
* Most common banks: Swedbank, SEB, Handelsbanken, and Nordea
* Bank opening hours typically 10:00-15:00 Monday-Friday
* Service fees may apply for international ATM withdrawals

### Currency Information:
* Swedish Krona (SEK) is the official currency
* Notes: 20, 50, 100, 200, 500, 1000 SEK
* Coins: 1, 2, 5, 10 SEK
* Current exchange rate: approximately 10 SEK to 1 EUR or 11 SEK to 1 USD (check for current rates)

### Money Tips:
* Inform your bank of travel plans to avoid card blocks
* Many places no longer accept cash at all
* Currency exchange offices charge high fees - better to use ATMs
* Keep small amounts of cash for emergencies or small markets
* Tipping is not required but appreciated for good service (typically 5-10%)

Would you like information about current exchange rates or specific bank locations?`;
    }
    
    // Hospitals and emergency services
    if (lowerCaseInput.includes('hospital') || 
        lowerCaseInput.includes('emergency') || 
        lowerCaseInput.includes('doctor') ||
        lowerCaseInput.includes('medical') ||
        lowerCaseInput.includes('pharmacy')) {
      
      return `## Emergency and Medical Services in Sweden

### Emergency Contacts:
* **Emergency number: 112** (police, fire, ambulance)
* **Non-emergency healthcare advice: 1177** (also available as app and website)
* **Police non-emergency: 114 14**

### Medical Facilities:
* **Hospitals (Sjukhus):** Major cities have large hospitals with emergency rooms
* **Healthcare centers (Vårdcentral):** For non-emergency care (appointment needed)
* **Private clinics:** Available in larger cities (higher cost but shorter wait times)
* **Pharmacies (Apotek):** Widely available, some open 24/7 in major cities

### Important Healthcare Information:
* Emergency care is provided to everyone regardless of nationality
* EU citizens should bring European Health Insurance Card (EHIC)
* Non-EU visitors should have travel insurance
* Pharmacies can be identified by a green cross sign
* Prescription medicines require doctor's prescription

### Costs:
* Emergency care: 300-400 SEK fee
* Doctor's visit at clinic: 200-300 SEK for EU citizens, higher for others
* Hospital stay: Approximately 100 SEK/day for EU citizens
* Prescription medicines: Partially subsidized system with maximum annual cost
* Without proper insurance, healthcare can be expensive

Would you like information about specific medical facilities in a particular city or area?`;
    }
    
    // Public transportation
    if (lowerCaseInput.includes('public transport') || 
        lowerCaseInput.includes('bus') || 
        lowerCaseInput.includes('train') ||
        lowerCaseInput.includes('subway') ||
        lowerCaseInput.includes('metro') ||
        lowerCaseInput.includes('how to get around')) {
      
      return `## Public Transportation in Sweden

<img src="https://images.unsplash.com/photo-1599912103887-38eb67e535e2" alt="Stockholm metro station with artistic decoration" style="width:100%;border-radius:8px;margin:8px 0;" />

### National Transport Options:
* **SJ Trains:** National rail network connecting major cities
* **Regional trains:** Connect smaller towns within regions
* **Flixbus, Nettbuss:** Intercity bus services, often cheaper than trains
* **Domestic flights:** Connect major cities, especially useful for northern destinations

### City Transport:
* **Stockholm:** Metro (Tunnelbana), buses, trams, commuter trains, and ferries
* **Gothenburg:** Trams, buses, and ferries
* **Malmö:** Buses and trains
* **Smaller cities:** Primarily bus networks

### Tickets and Passes:
* **Stockholm SL card:** 24hr (165 SEK), 72hr (330 SEK), 7-day (430 SEK)
* **Gothenburg card:** 24hr (110 SEK), 72hr (220 SEK)
* **Regional differences:** Each region has its own ticketing system
* **Apps:** Most regions have transport apps for mobile tickets
* **SJ train tickets:** Cheaper when booked in advance

### Travel Tips:
* Punctuality is excellent - trains and buses run on time
* Public transport is generally safe, clean and efficient
* Off-peak travel offers less crowded conditions
* Most stations and vehicles have free WiFi
* Transport information is available in English in major cities

Would you like specific information about transportation in a particular city or between specific destinations?`;
    }
    
    // Taxis and ride-sharing
    if (lowerCaseInput.includes('taxi') || 
        lowerCaseInput.includes('cab') || 
        lowerCaseInput.includes('uber') ||
        lowerCaseInput.includes('ride')) {
      
      return `## Taxis and Ride-Sharing Services in Sweden

### Taxi Services:
* **Major companies:** Taxi Stockholm, Taxi Kurir, Taxi 020
* **Identification:** Legitimate taxis have yellow number plates
* **Pricing:** Not regulated - compare prices before choosing
* **Payment:** Credit cards accepted in all legitimate taxis
* **Booking:** Can be hailed on street, at taxi stands, by phone, or app

### Ride-Sharing Services:
* **Uber:** Available in Stockholm, Gothenburg, and Malmö
* **Bolt:** Available in major cities
* **Taxi apps:** Most traditional taxi companies have their own apps

### Costs and Tips:
* Taxis are expensive in Sweden (starting around 45-50 SEK + 10-15 SEK/km)
* Airport transfers often have fixed prices (500-600 SEK to/from Stockholm airport)
* Always confirm price before starting journey or ensure meter is used
* Look for price comparison stickers on taxi windows
* Tipping is not expected but appreciated for good service

### Safety Advice:
* Use established companies or official taxi stands
* Pre-book when possible, especially during busy times
* Keep receipt in case of disputes
* Avoid unmarked "black taxis" offering cheaper rides

Would you like help with arranging transportation for a specific journey?`;
    }
    
    // Car/scooter rental
    if (lowerCaseInput.includes('rent') || 
        lowerCaseInput.includes('rental') || 
        lowerCaseInput.includes('car hire') ||
        lowerCaseInput.includes('scooter')) {
      
      return `## Car and Vehicle Rentals in Sweden

<img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c" alt="Car driving on a scenic Swedish road" style="width:100%;border-radius:8px;margin:8px 0;" />

### Car Rental Information:
* **Major companies:** Hertz, Avis, Europcar, Sixt, Budget
* **Local options:** Circle K, OKQ8, Mabi
* **Requirements:** Valid driver's license, credit card, usually 20+ years old (25+ for some vehicles)
* **Costs:** From around 400 SEK/day for small car, significantly more in peak season
* **Insurance:** CDW (Collision Damage Waiver) typically included but with high excess

### Electric Vehicle Rentals:
* Growing network of charging stations throughout Sweden
* Many rental companies offer Tesla and other EV options
* Green Car is a service specializing in EV rentals

### Other Vehicle Rentals:
* **Scooters:** E-scooter services like Voi, Tier, and Lime in major cities
* **Bicycles:** City bikes in Stockholm, Gothenburg, and Malmö
* **Motorcycles:** Available from specialized rental companies

### Driving in Sweden:
* Drive on the right side
* Seat belts mandatory for all passengers
* Headlights required at all times, day and night
* Strict drink-driving laws (0.02% blood alcohol limit)
* Winter tires required between December 1 and March 31

### Tips:
* Book in advance, especially in summer
* Consider one-way rentals for long-distance trips
* Parking can be expensive in cities
* Gas (petrol) prices are high
* Many areas have congestion charges

Would you like specific information about renting in a particular city or about road trip routes?`;
    }
    
    // Travel times between attractions
    if ((lowerCaseInput.includes('travel time') || 
        lowerCaseInput.includes('how long') || 
        lowerCaseInput.includes('distance') ||
        lowerCaseInput.includes('far')) &&
        lowerCaseInput.includes('between')) {
      
      return `## Travel Times Between Swedish Destinations

### Major Routes:
* **Stockholm to Gothenburg:** 3-3.5 hours by train, 5 hours by car
* **Stockholm to Malmö:** 4.5 hours by train, 6-7 hours by car
* **Stockholm to Uppsala:** 40 minutes by train, 1 hour by car
* **Gothenburg to Malmö:** 2.5 hours by train, 3 hours by car
* **Stockholm to Kiruna (Lapland):** 15 hours by train, 2 hours by flight

### Stockholm Attractions:
* **Gamla Stan to Vasa Museum:** 30 minutes walking, 10 minutes by public transport
* **Central Station to Skansen:** 30 minutes by public transport
* **Djurgården attractions:** Most within 10-15 minutes walking distance of each other
* **Stockholm to Drottningholm Palace:** 45 minutes by public transport

### Gothenburg Attractions:
* **Central Station to Liseberg:** 15 minutes walking, 5 minutes by tram
* **Gothenburg to Marstrand island:** 1 hour by public transport
* **City center to Gothenburg Archipelago:** 30 minutes by tram + ferry

### Day Trips:
* **Stockholm to Sigtuna:** 1 hour by public transport
* **Stockholm to Uppsala:** 40 minutes by train
* **Gothenburg to Marstrand:** 1 hour by public transport
* **Malmö to Lund:** 15 minutes by train
* **Stockholm to Finnish archipelago:** 11-16 hours by ferry (overnight)

### General Tips:
* Public transport is punctual and reliable
* Traffic congestion can significantly increase drive times in and around cities
* Add extra time in winter due to weather conditions
* Google Maps and the local transport apps provide accurate time estimates

Would you like travel time information for specific destinations?`;
    }

    // Expense estimation and budget
    if (lowerCaseInput.includes('estimation') || lowerCaseInput.includes('estimate') || 
        lowerCaseInput.includes('cost') || lowerCaseInput.includes('price') || 
        lowerCaseInput.includes('budget') || lowerCaseInput.includes('how much') ||
        (lowerCaseInput.includes('people') && (lowerCaseInput.includes('month') || lowerCaseInput.includes('week') || lowerCaseInput.includes('day')))) {
      
      // Parse the query for people information
      const peopleMatch = userInput.match(/(\d+)\s*people/i);
      const adultsMatch = userInput.match(/(\d+)\s*adults?/i);
      const kidsMatch = userInput.match(/(\d+)\s*kids?/i);
      const elderlyMatch = userInput.match(/(\d+)\s*elderly/i);
      
      // Default values
      let totalPeople = 0;
      let adults = adultsMatch ? parseInt(adultsMatch[1]) : 0;
      let kids = kidsMatch ? parseInt(kidsMatch[1]) : 0;
      let elderly = elderlyMatch ? parseInt(elderlyMatch[1]) : 0;
      
      // If total people is mentioned but not broken down
      if (peopleMatch) {
        totalPeople = parseInt(peopleMatch[1]);
        // If no breakdown is provided, assume all adults
        if (adults === 0 && kids === 0 && elderly === 0) {
          adults = totalPeople;
        }
      } else {
        totalPeople = adults + kids + elderly;
      }
      
      // If still no people found, assume at least one adult
      if (totalPeople === 0) {
        adults = 1;
        totalPeople = 1;
      }
      
      // Parse duration
      const monthMatch = userInput.match(/(\d+)\s*months?/i);
      const weekMatch = userInput.match(/(\d+)\s*weeks?/i);
      const dayMatch = userInput.match(/(\d+)\s*days?/i);
      
      const months = monthMatch ? parseInt(monthMatch[1]) : 0;
      const weeks = weekMatch ? parseInt(weekMatch[1]) : 0;
      const days = dayMatch ? parseInt(dayMatch[1]) : 0;
      
      // Calculate total days
      let totalDays = (months * 30) + (weeks * 7) + days;
      
      // If no duration mentioned, assume one week
      if (totalDays === 0) {
        totalDays = 7;
      }
      
      // Parse location
      let location = 'Sweden';
      if (lowerCaseInput.includes('norrland')) location = 'Norrland';
      else if (lowerCaseInput.includes('svealand')) location = 'Svealand';
      else if (lowerCaseInput.includes('gotaland') || lowerCaseInput.includes('götaland')) location = 'Götaland';
      else if (lowerCaseInput.includes('stockholm')) location = 'Stockholm';
      else if (lowerCaseInput.includes('gothenburg')) location = 'Gothenburg';
      else if (lowerCaseInput.includes('malmö') || lowerCaseInput.includes('malmo')) location = 'Malmö';
      
      // Calculate estimate
      // Base rates per person per day (in SEK)
      const adultRate = 2000;
      const kidRate = 1000;
      const elderlyRate = 1500;
      
      // Location modifier
      let locationModifier = 1;
      if (location === 'Norrland') locationModifier = 1.2;
      else if (location === 'Svealand') locationModifier = 1.1;
      else if (location === 'Stockholm') locationModifier = 1.3;
      
      // Calculate total
      const totalCost = ((adults * adultRate) + (kids * kidRate) + (elderly * elderlyRate)) * totalDays * locationModifier;
      
      // Format the response
      let response = `## Travel Cost Estimate

<img src="https://images.unsplash.com/photo-1534971710649-2f97e5f98bc4" alt="Swedish krona banknotes and coins" style="width:100%;border-radius:8px;margin:8px 0;" />

Based on your request, I estimate that for `;
      
      // Format people information
      if (totalPeople === 1) {
        response += `1 person `;
      } else {
        response += `${totalPeople} people `;
        if (adults > 0) response += `(${adults} adults${kids > 0 || elderly > 0 ? ', ' : ''}`; 
        if (kids > 0) response += `${kids} kids${elderly > 0 ? ', ' : ''}`; 
        if (elderly > 0) response += `${elderly} elderly`;
        if (adults > 0) response += `) `;
      }
      
      // Format duration
      response += `staying in ${location} for `;
      if (months > 0) {
        response += `${months} month${months > 1 ? 's' : ''}`;
        if (weeks > 0 || days > 0) response += ', ';
      }
      if (weeks > 0) {
        response += `${weeks} week${weeks > 1 ? 's' : ''}`;
        if (days > 0) response += ', ';
      }
      if (days > 0) {
        response += `${days} day${days > 1 ? 's' : ''}`;
      }
      
      response += `, the estimated cost would be around **${totalCost.toLocaleString()} SEK**.

### Cost Breakdown:
* **Accommodation:** ~${Math.round(totalCost * 0.4).toLocaleString()} SEK
* **Food and dining:** ~${Math.round(totalCost * 0.3).toLocaleString()} SEK
* **Activities and transportation:** ~${Math.round(totalCost * 0.2).toLocaleString()} SEK
* **Miscellaneous expenses:** ~${Math.round(totalCost * 0.1).toLocaleString()} SEK

### Typical Daily Costs (per person):
* **Budget traveler:** 700-1,000 SEK
* **Mid-range traveler:** 1,500-2,500 SEK
* **Luxury traveler:** 3,000+ SEK

### Money-Saving Tips:
* Travel during off-season (September-May)
* Use public transportation instead of taxis
* Look for "Dagens rätt" (dish of the day) at restaurants for lunch
* Shop at supermarkets for some meals
* Consider hostels or vacation rentals for longer stays

Would you like me to suggest some hotels for your stay in ${location}? I can show you options for different budgets.`;
      
      return response;
    }
    
    // Currency information
    if (lowerCaseInput.includes('currency') || 
        lowerCaseInput.includes('exchange') || 
        lowerCaseInput.includes('convert') ||
        lowerCaseInput.includes('krona') ||
        lowerCaseInput.includes('sek')) {
      
      return `## Swedish Currency Information

<img src="https://images.unsplash.com/photo-1534971710649-2f97e5f98bc4" alt="Swedish krona banknotes and coins" style="width:100%;border-radius:8px;margin:8px 0;" />

### Basic Information:
* **Currency:** Swedish Krona (SEK)
* **Symbol:** kr
* **International code:** SEK
* **Nickname:** "kronor" (plural) or "krona" (singular)

### Denominations:
* **Banknotes:** 20, 50, 100, 200, 500, 1000 SEK
* **Coins:** 1, 2, 5, 10 SEK

### Exchange Rates (approximate):
* **1 EUR ≈ 11 SEK**
* **1 USD ≈ 10 SEK**
* **1 GBP ≈ 13 SEK**
* Rates fluctuate - check current rates before travel

### Currency Exchange Tips:
* ATMs ("Bankomat") offer the best rates for withdrawing SEK
* Avoid exchange offices at airports/hotels (poor rates)
* Notify your bank before traveling to avoid card blocks
* Sweden is largely cashless - cards accepted almost everywhere
* Major credit cards widely accepted (Visa, Mastercard)
* American Express less widely accepted than Visa/Mastercard

Would you like me to convert a specific amount to or from Swedish Krona?`;
    }
    
    // Suggest itineraries
    if (lowerCaseInput.includes('itinerary') || 
        lowerCaseInput.includes('day by day') || 
        lowerCaseInput.includes('day plan') ||
        lowerCaseInput.includes('travel plan') ||
        lowerCaseInput.includes('what should i do')) {
      
      let duration = "1 week"; // default
      
      if (lowerCaseInput.includes('3 day') || lowerCaseInput.includes('3-day') || lowerCaseInput.includes('three day')) {
        duration = "3 days";
      } else if (lowerCaseInput.includes('5 day') || lowerCaseInput.includes('5-day') || lowerCaseInput.includes('five day')) {
        duration = "5 days";
      } else if (lowerCaseInput.includes('1 week') || lowerCaseInput.includes('one week') || lowerCaseInput.includes('7 day')) {
        duration = "1 week";
      } else if (lowerCaseInput.includes('10 day') || lowerCaseInput.includes('10-day') || lowerCaseInput.includes('ten day')) {
        duration = "10 days";
      } else if (lowerCaseInput.includes('2 week') || lowerCaseInput.includes('two week') || lowerCaseInput.includes('14 day')) {
        duration = "2 weeks";
      }
      
      let interests = "general";
      if (lowerCaseInput.includes('culture') || lowerCaseInput.includes('museum') || lowerCaseInput.includes('history')) {
        interests = "cultural";
      } else if (lowerCaseInput.includes('nature') || lowerCaseInput.includes('outdoor') || lowerCaseInput.includes('hiking')) {
        interests = "nature";
      } else if (lowerCaseInput.includes('family') || lowerCaseInput.includes('kid') || lowerCaseInput.includes('children')) {
        interests = "family";
      }
      
      // Determine which itinerary to show
      if (duration === "3 days" || duration === "5 days") {
        return `## ${duration} Stockholm Itinerary

<img src="https://images.unsplash.com/photo-1600162055849-91af4c136106" alt="Stockholm waterfront with colorful buildings" style="width:100%;border-radius:8px;margin:8px 0;" />

### Day 1: Stockholm Old Town & Royal Sites
* **Morning:** Gamla Stan (Old Town) walking tour, Royal Palace visit
* **Lunch:** Traditional Swedish lunch at Stortorgskällaren
* **Afternoon:** Nobel Prize Museum, Stockholm Cathedral
* **Evening:** Dinner in Östermalm district

### Day 2: Museum Day
* **Morning:** Vasa Museum (spectacular preserved 17th-century warship)
* **Lunch:** At Rosendals Trädgård garden café
* **Afternoon:** Skansen Open-Air Museum or ABBA Museum (depending on interest)
* **Evening:** Dinner and stroll along Strandvägen waterfront

### Day 3: Island Exploration
* **Morning:** Boat tour of Stockholm archipelago
* **Lunch:** Seafood lunch at Fjäderholmarna island
* **Afternoon:** Fotografiska (photography museum) or Modern Art Museum
* **Evening:** Farewell dinner at Pelikan for traditional Swedish cuisine

${duration === "5 days" ? `
### Day 4: Uppsala Day Trip
* **Morning:** Train to Uppsala (40 min from Stockholm)
* **Midday:** Visit Uppsala Cathedral and University
* **Afternoon:** Old Uppsala archaeological site
* **Evening:** Return to Stockholm for dinner

### Day 5: Stockholm Nature & Relaxation
* **Morning:** Djurgården island nature walks
* **Lunch:** Picnic in the Royal National City Park
* **Afternoon:** Thiel Gallery or free time for shopping
* **Evening:** Rooftop dining with city views at Urban Deli Sveavägen
` : ''}

### Practical Information:
* **Stockholm Card:** Consider purchasing for unlimited public transport and entry to major attractions
* **Public Transport:** T-bana (metro) is efficient and stations are works of art themselves
* **Time Management:** Most museums close at 5-6pm, plan accordingly
* **Weather:** Be prepared for sudden weather changes, even in summer

Would you like me to modify this itinerary based on specific interests or provide more details?`;
      } else if (duration === "1 week") {
        // 1-week itinerary
        if (interests === "nature") {
          return `## 1-Week Nature-Focused Sweden Itinerary

<img src="https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc" alt="Swedish wilderness with lake and forest" style="width:100%;border-radius:8px;margin:8px 0;" />

### Day 1-2: Stockholm & Archipelago
* **Day 1:** Arrive in Stockholm, explore Djurgården island's green spaces
* **Day 2:** Full-day boat tour of Stockholm archipelago with hiking on remote islands

### Day 3-4: Dalarna Region
* **Day 3:** Travel to Dalarna (3hr from Stockholm), visit Lake Siljan
* **Day 4:** Hiking in Fulufjället National Park, see Njupeskär waterfall (Sweden's highest)

### Day 5-6: High Coast (Höga Kusten)
* **Day 5:** Travel to High Coast UNESCO World Heritage site (5hr from Dalarna)
* **Day 6:** Hiking on Skuleskogen National Park trails, visit Slåttdalsskrevan crevice

### Day 7: Return to Stockholm
* Morning wildlife watching
* Afternoon return to Stockholm
* Final dinner in the city

### Nature Highlights:
* Islands of Stockholm archipelago
* Sweden's highest waterfall
* UNESCO World Heritage natural sites
* Ancient forests and pristine lakes
* Coastal landscapes and unique geology

### Practical Information:
* Rent a car for flexibility outside Stockholm
* Pack layers for changeable weather
* Bring good hiking boots and rain gear
* "Allemansrätten" (Right of Public Access) allows you to hike and camp responsibly almost anywhere
* Wildlife to watch for: moose, reindeer, eagles, and more

Would you like me to modify this itinerary or provide more specific details about any destination?`;
        } else if (interests === "cultural") {
          return `## 1-Week Cultural Sweden Itinerary

<img src="https://images.unsplash.com/photo-1601162050503-acc28a4a5d4c" alt="Gamla Stan (Old Town) in Stockholm with colorful buildings" style="width:100%;border-radius:8px;margin:8px 0;" />

### Day 1-3: Stockholm's Cultural Treasures
* **Day 1:** Gamla Stan, Royal Palace, Changing of the Guards
* **Day 2:** Vasa Museum, Nordic Museum, ABBA Museum
* **Day 3:** City Hall (Nobel Prize venue), Modern Art Museum, Swedish History Museum

### Day 4: Uppsala Day Trip
* Uppsala Cathedral (burial place of Swedish kings)
* Oldest university in Scandinavia
* Ancient burial mounds at Gamla Uppsala

### Day 5-6: Gothenburg & West Coast
* **Day 5:** Travel to Gothenburg, explore Haga district, Art Museum
* **Day 6:** Gothenburg Maritime Museum, day trip to Marstrand fortress island

### Day 7: Return to Stockholm
* Morning in Gothenburg
* Afternoon train to Stockholm
* Evening farewell dinner

### Cultural Highlights:
* Nobel Prize venues and museums
* Medieval old towns and churches
* World-class museums with unique collections
* Historic royal palaces and residences
* Traditional Swedish design and crafts

### Practical Information:
* Consider a Swedish Rail Pass for train travel
* Most museums are closed on Mondays
* Photography restrictions in some museums and churches
* Look for combined museum passes in each city
* English guided tours available at most major attractions

Would you like recommendations for specific cultural events or performances during your visit?`;
        } else if (interests === "family") {
          return `## 1-Week Family-Friendly Sweden Itinerary

<img src="https://images.unsplash.com/photo-1531402406718-bb340fa0d6bf" alt="Family enjoying Skansen open-air museum in Stockholm" style="width:100%;border-radius:8px;margin:8px 0;" />

### Day 1-3: Stockholm Family Adventures
* **Day 1:** Junibacken (Pippi Longstocking museum), ferry rides
* **Day 2:** Skansen Open-Air Museum with zoo animals and historical buildings
* **Day 3:** Gröna Lund amusement park, Vasa Museum

### Day 4-5: Astrid Lindgren's World
* **Day 4:** Travel to Vimmerby (3.5hr from Stockholm)
* **Day 5:** Full day at Astrid Lindgren's World theme park (Pippi Longstocking, Emil, etc.)

### Day 6-7: Return via Kolmården
* **Day 6:** Travel to Kolmården Wildlife Park (2hr from Vimmerby)
* **Day 7:** Morning animal viewing, afternoon return to Stockholm

### Family-Friendly Highlights:
* Interactive children's museums
* Wildlife and zoo experiences
* Literature-themed attractions
* Outdoor play areas and parks
* Boat rides and gentle adventures

### Practical Information:
* Many attractions offer family tickets at reduced rates
* Restaurants typically have children's menus and high chairs
* Changing facilities widely available
* Public transport is stroller-friendly
* Swimming opportunities in clean lakes and pools

Would you like recommendations for rainy-day activities or child-friendly restaurants?`;
        } else {
          // Default general itinerary
          return `## 1-Week Classic Sweden Itinerary

<img src="https://images.unsplash.com/photo-1591123109200-bce36d1c3660" alt="Scenic view of Stockholm from above" style="width:100%;border-radius:8px;margin:8px 0;" />

### Day 1-3: Stockholm
* **Day 1:** Gamla Stan (Old Town), Royal Palace, Nobel Museum
* **Day 2:** Vasa Museum, Skansen Open-Air Museum, Djurgården island
* **Day 3:** City Hall, boat tour of archipelago, shopping

### Day 4: Uppsala or Sigtuna Day Trip
* Ancient burial mounds, cathedral, and Sweden's oldest university
* Alternative: Visit medieval Sigtuna, Sweden's first town

### Day 5-6: Gothenburg & West Coast
* **Day 5:** Train to Gothenburg, explore canals and Haga district
* **Day 6:** Liseberg amusement park, archipelago boat tour

### Day 7: Return to Stockholm
* Morning in Gothenburg
* Afternoon high-speed train to Stockholm
* Evening farewell dinner

### Highlights:
* UNESCO World Heritage sites
* Stunning architecture across different periods
* Museums with world-class collections
* Beautiful urban green spaces
* Stockholm's amazing archipelago

### Practical Information:
* Consider the Stockholm Pass for the first days
* Trains between major cities are comfortable and scenic
* Credit cards accepted almost everywhere
* English widely spoken
* Weather can change quickly - bring layers

Would you like me to customize this itinerary based on your specific interests or travel style?`;
        }
      } else if (duration === "10 days" || duration === "2 weeks") {
        return `## ${duration} Sweden Itinerary

<img src="https://images.unsplash.com/photo-1509356843151-3e7d96241e11" alt="Northern Lights over Swedish Lapland" style="width:100%;border-radius:8px;margin:8px 0;" />

### Days 1-3: Stockholm
* **Day 1:** Arrive, explore Gamla Stan (Old Town)
* **Day 2:** Vasa Museum, Royal Palace, Nobel Museum
* **Day 3:** Drottningholm Palace, Södermalm district

### Days 4-5: Uppsala & Dalarna
* **Day 4:** Day trip to Uppsala (cathedral, university)
* **Day 5:** Drive to Dalarna region, see Lake Siljan and traditional red cottages

### Days 6-7: Gothenburg & West Coast
* **Day 6:** Train to Gothenburg, explore city center
* **Day 7:** Gothenburg archipelago, Liseberg amusement park

### Days 8-9: Malmö & South
* **Day 8:** Train to Malmö, explore city center
* **Day 9:** Day trip to Lund university town or Ystad (Wallander settings)

### Day 10: Return to Stockholm
* Morning train from Malmö
* Afternoon/evening in Stockholm

${duration === "2 weeks" ? `
### Days 11-13: Swedish Lapland
* **Day 11:** Fly to Kiruna in Swedish Lapland
* **Day 12:** Visit Ice Hotel, dog sledding or northern lights tour (season dependent)
* **Day 13:** Abisko National Park

### Day 14: Return Home
* Fly from Kiruna to Stockholm
* Connect to international flight home
` : ''}

### Highlights:
* Historic capital city with incredible museums
* Charming university towns
* West coast maritime heritage
* Southern Sweden's rolling landscapes
${duration === "2 weeks" ? '* Arctic wilderness and culture' : ''}

### Practical Information:
* Consider a Swedish Rail Pass for train travel between cities
* Domestic flights save time for longer distances
* Weather varies dramatically between regions
* Book accommodations in advance, especially in summer
* Consider car rental for exploring countryside

Would you like me to focus the itinerary more on certain interests like history, nature, or family activities?`;
      }
    }
    
    // Photo gallery and visual attractions
    if (lowerCaseInput.includes('photo') || 
        lowerCaseInput.includes('picture') || 
        lowerCaseInput.includes('image') ||
        lowerCaseInput.includes('gallery') ||
        lowerCaseInput.includes('instagram')) {
      
      return `## Most Photogenic Spots in Sweden

<img src="https://images.unsplash.com/photo-1589118949245-7d38baf380d6" alt="Colorful sunset over Stockholm waterfront" style="width:100%;border-radius:8px;margin:8px 0;" />

### Stockholm's Best Photo Spots:
* **Monteliusvägen:** Panoramic city viewpoint overlooking Gamla Stan
* **Stockholm City Hall:** Iconic red brick building with tower views
* **Stortorget:** Colorful historic buildings in Old Town
* **Drottningholm Palace:** "Sweden's Versailles" with stunning gardens
* **Stockholm Subway Stations:** World's longest art gallery underground

### Natural Wonders for Photography:
* **Abisko National Park:** Northern Lights and midnight sun
* **Gotland's Sea Stacks:** Unique limestone formations
* **Sarek National Park:** Untouched wilderness and mountains
* **High Coast:** UNESCO site with dramatic coastline
* **Kosterhavet:** Sweden's first marine national park

### Unique Instagram-Worthy Spots:
* **Ystad Sandskog Beach:** Colorful beach huts
* **ICEHOTEL:** Artistic ice sculptures and rooms
* **Treehotel:** Architectural wonders in the forest
* **Turning Torso (Malmö):** Twisting skyscraper
* **Ales Stenar:** Sweden's "Stonehenge" on dramatic cliffs

### Seasonal Photo Opportunities:
* **Spring:** Cherry blossoms at Kungsträdgården in Stockholm
* **Summer:** Red cottages beside blue lakes in Dalarna
* **Autumn:** Fall foliage in national parks
* **Winter:** Snow-covered landscapes and northern lights

Would you like me to recommend photography tours or equipment rental options in Sweden?`;
    }
    
    // Reviews and experiences
    if (lowerCaseInput.includes('review') || 
        lowerCaseInput.includes('experience') || 
        lowerCaseInput.includes('what people say') ||
        lowerCaseInput.includes('testimonial')) {
      
      return `## Traveler Experiences in Sweden

### Stockholm Highlights:
"The Vasa Museum blew me away - seeing a nearly perfect 400-year-old ship was incredible. Don't miss it!"
- James, UK

"Taking the archipelago cruise was the highlight of our trip. We chose the 3-hour option and saw so many beautiful islands."
- Maria, Spain

"Stockholm's subway art tours are a hidden gem. For just the cost of a metro ticket, you get access to the world's longest art gallery!"
- Akiko, Japan

### Nature Experiences:
"Seeing the Northern Lights in Abisko was a life-changing experience. We visited in February and saw them dance for hours."
- Michael, Canada

"Hiking the Kungsleden trail was challenging but rewarding. The mountain huts system makes it accessible even for moderately experienced hikers."
- Sophie, France

"The midnight sun phenomenon in northern Sweden is surreal. We couldn't sleep but didn't want to - the golden light at 2am was magical."
- David, Australia

### Cultural Insights:
"Participating in a traditional fika coffee break helped us understand Swedish culture. It's not just coffee - it's a philosophy!"
- Carlos, Mexico

"We stayed at a traditional red cottage in Dalarna and experienced true Swedish countryside life - sauna, lake swimming, and picking berries."
- Emma, Germany

### Travel Tips From Visitors:
* Book accommodation well in advance for summer travel
* Don't be afraid to try local specialties like surströmming (fermented herring) - or maybe just watch the locals eat it!
* Learn basic Swedish phrases - locals appreciate the effort even though most speak perfect English
* The Stockholm Pass is worth it if you plan to visit several attractions

Would you like to hear more about experiences in a specific region or activity?`;
    }
    
    // Language and phrases
    if (lowerCaseInput.includes('language') || 
        lowerCaseInput.includes('speak') || 
        lowerCaseInput.includes('phrase') ||
        lowerCaseInput.includes('translate') ||
        lowerCaseInput.includes('swedish word')) {
      
      return `## Essential Swedish Phrases for Travelers

<img src="https://images.unsplash.com/photo-1585647347384-2feb5bee2364" alt="Open book with text" style="width:100%;border-radius:8px;margin:8px 0;" />

### Basic Greetings & Phrases:
* **Hello:** Hej (hey)
* **Good morning:** God morgon (good mor-gon)
* **Good evening:** God kväll (good kvel)
* **Goodbye:** Hej då (hey doh)
* **Please:** Tack (tack)
* **Thank you:** Tack or Tack så mycket (tack so myk-et)
* **You're welcome:** Varsågod (var-so-good)
* **Excuse me/Sorry:** Ursäkta (ur-shek-ta)
* **Yes:** Ja (ya)
* **No:** Nej (ney)

### Dining Phrases:
* **The bill, please:** Notan, tack
* **A table for two, please:** Ett bord för två, tack
* **Cheers!:** Skål! (skol)
* **Delicious:** Läckert (lek-ert)
* **I'm vegetarian:** Jag är vegetarian
* **Water, please:** Vatten, tack

### Getting Around:
* **Where is...?:** Var är...?
* **How much does it cost?:** Hur mycket kostar det?
* **I don't understand:** Jag förstår inte
* **Do you speak English?:** Pratar du engelska?
* **Help!:** Hjälp!
* **Train station:** Järnvägsstation
* **Bus stop:** Busshållplats

### Cultural Note:
While most Swedes speak excellent English and are happy to help tourists, learning a few basic phrases shows respect for the local culture. The simple greeting "Hej" goes a long way!

Would you like to learn phrases for specific situations or see a pronunciation guide?`;
    }
    
    // Cultural etiquette
    if (lowerCaseInput.includes('etiquette') || 
        lowerCaseInput.includes('custom') || 
        lowerCaseInput.includes('dos and donts') ||
        lowerCaseInput.includes("do's and don'ts") ||
        lowerCaseInput.includes('behavior') ||
        lowerCaseInput.includes('manners')) {
      
      return `## Swedish Cultural Etiquette: Do's and Don'ts

<img src="https://images.unsplash.com/photo-1515669097368-22e68427d265" alt="Swedish fika coffee tradition" style="width:100%;border-radius:8px;margin:8px 0;" />

### Social Etiquette:

**Do:**
* Remove your shoes when entering someone's home
* Be punctual - Swedes value timeliness highly
* Wait in line patiently - queue jumping is frowned upon
* Maintain personal space - Swedes appreciate around an arm's length
* Participate in "fika" (coffee break) when invited - it's an important social custom

**Don't:**
* Talk loudly in public places - Swedes tend to be quiet and reserved
* Interrupt others during conversation
* Ask personal questions about salary or relationship status when first meeting
* Sit next to a stranger on public transport if other seats are available
* Expect small talk with strangers - it's not common practice

### Dining Etiquette:

**Do:**
* Wait for the host to say "Smaklig måltid" (enjoy your meal) before starting
* Keep your hands visible on the table, not in your lap
* Say "Tack för maten" (thanks for the food) after a meal in someone's home
* Offer to help clear the table after dining in a home

**Don't:**
* Begin eating before everyone is served
* Leave food on your plate if dining in someone's home
* Expect tap water to automatically come with restaurant meals (though it's free if you ask)
* Tip excessively - service is included, though rounding up is appreciated

### Business & General Customs:

**Do:**
* Address people by their first name - even in professional settings
* Recycle properly - Swedes take environmental responsibility seriously
* Stand in line for everything (shops, banks, public transport)
* Respect quiet hours in residential buildings (typically after 10 PM)

**Don't:**
* Show up to a home empty-handed when invited for dinner (bring flowers, wine, or chocolates)
* Boast or show off - humility and "lagom" (moderation) are valued
* Be overly emotional or confrontational in discussions
* Rush business decisions - consensus is important in Swedish culture

Would you like more specific information about etiquette in certain situations?`;
    }
    
    // Holidays and festivals
    if (lowerCaseInput.includes('holiday') || 
        lowerCaseInput.includes('festival') || 
        lowerCaseInput.includes('celebration') ||
        lowerCaseInput.includes('event')) {
      
      return `## Swedish Holidays and Festivals

<img src="https://images.unsplash.com/photo-1563199553-93a4483b0811" alt="Swedish Midsummer celebration with maypole and flowers" style="width:100%;border-radius:8px;margin:8px 0;" />

### Major Swedish Celebrations:

* **Midsummer (Midsommar)** - June (Friday between June 19-25)
  * Most important holiday after Christmas
  * Maypole dancing, flower wreaths, traditional foods
  * Best experienced in the countryside
  * Extended daylight with sun barely setting

* **Christmas (Jul)** - December 24-26
  * Main celebration on Christmas Eve (Dec 24)
  * "Julbord" (Christmas buffet) with special foods
  * Lucia celebrations earlier in December (Dec 13)
  * Christmas markets throughout December

* **Walpurgis Night (Valborgsmässoafton)** - April 30
  * Bonfires welcome spring
  * Choral singing performances
  * University towns like Uppsala have major celebrations

* **National Day (Nationaldagen)** - June 6
  * Relatively modest celebration
  * Flag ceremonies and outdoor events
  * Became an official holiday in 2005

* **Crayfish Parties (Kräftskiva)** - August
  * Not an official holiday but important tradition
  * Eating crayfish, singing songs, schnapps
  * Colorful paper lanterns and bibs

### Regional Festivals:

* **Medieval Week (Medeltidsveckan)** - Gotland, early August
* **Stockholm Pride** - Late July/early August
* **Gothenburg Film Festival** - January/February
* **Jokkmokk Winter Market** - First weekend of February (Sami culture)
* **Malmö Festival** - August

### Public Holidays (stores/attractions may be closed):
* New Year's Day (Jan 1)
* Epiphany (Jan 6)
* Good Friday and Easter Monday (March/April)
* May Day (May 1)
* Ascension Day (40 days after Easter)
* National Day (June 6)
* Midsummer Day
* All Saints' Day (First Saturday in November)
* Christmas Day and Boxing Day (Dec 25-26)

Would you like more information about a specific holiday or festival that might coincide with your travel dates?`;
    }
    
    // Real-time notifications
    if (lowerCaseInput.includes('notification') || 
        lowerCaseInput.includes('alert') || 
        lowerCaseInput.includes('update') ||
        lowerCaseInput.includes('news')) {
      
      return `## Stay Updated During Your Swedish Trip

### Travel Alerts and Notifications:
* **SL (Stockholm Public Transport):** Download the SL app for real-time updates on public transport
* **Swedish Transport Administration:** Trafikverket app for train delays and traffic information
* **SMHI Weather Service:** Official weather app with alerts for severe conditions
* **Krisinformation:** Emergency information from Swedish authorities (available in English)

### Current Events:
* **Sweden.se:** Official information portal with updates on significant events
* **The Local Sweden:** News in English with local updates
* **Swedish Radio (Sveriges Radio):** News in multiple languages including English

### Attraction Updates:
* Major museums and attractions post operational changes on their official websites
* Tourism offices in each city provide up-to-date information on openings/closings
* Many attractions use social media to announce last-minute changes

### Safety Information:
* Register with your country's embassy for travel advisories
* Follow official COVID-19 guidelines from the Public Health Agency (Folkhälsomyndigheten)
* For emergencies, call 112 (operators speak English)

### Real-Time Services:
* Most public transport has real-time tracking
* Major cities have traffic webcams accessible online
* Weather radar available through multiple apps
* Queue time information for popular attractions often available online

Would you like me to recommend specific apps to download for your trip to Sweden?`;
    }
    
    // Travel documentation
    if (lowerCaseInput.includes('document') || 
        lowerCaseInput.includes('passport') || 
        lowerCaseInput.includes('visa') ||
        lowerCaseInput.includes('require')) {
      
      return `## Travel Documentation for Sweden

### Entry Requirements:

**EU Citizens:**
* Valid national ID card or passport
* No visa required
* No specific duration limitations (right of residence)

**US, Canadian, Australian, New Zealand Citizens:**
* Valid passport (valid for at least 3 months beyond planned departure)
* No visa required for stays under 90 days within a 180-day period
* Return/onward ticket may be requested

**UK Citizens (Post-Brexit):**
* Valid passport (valid for at least 3 months beyond planned departure)
* No visa required for stays under 90 days within a 180-day period
* Passport must be less than 10 years old

**Other Nationalities:**
* Check with the Swedish embassy or consulate in your country
* Visa requirements vary by nationality
* Schengen visa applications typically required

### Health Documentation:
* European Health Insurance Card (EHIC) for EU citizens
* Travel insurance highly recommended for everyone
* International COVID-19 requirements may apply (check current regulations)
* No mandatory vaccinations for entry

### Driving Documentation:
* Valid driver's license from home country
* International Driving Permit recommended for non-EU licenses
* Vehicle insurance and registration if bringing own vehicle
* Green Card (International Motor Insurance Certificate) may be required

### Other Useful Documents:
* Travel insurance policy with coverage details
* Booking confirmations for accommodations
* Student ID for discounts (if applicable)
* Prescription documentation for any medications

### Important Notes:
* Keep digital and physical copies of important documents
* Register valuable items with customs if bringing professional equipment
* Check current requirements before travel as regulations change
* Border controls may be in effect even within Schengen area

Would you like more specific information about visa requirements for your nationality or other documentation details?`;
    }
    
    // Improved estimation logic - prioritize this check to make sure it captures estimation requests
    if (lowerCaseInput.includes('estimation') || lowerCaseInput.includes('estimate') || 
        lowerCaseInput.includes('cost') || lowerCaseInput.includes('price') || 
        lowerCaseInput.includes('budget') || lowerCaseInput.includes('how much') ||
        (lowerCaseInput.includes('people') && (lowerCaseInput.includes('month') || lowerCaseInput.includes('week') || lowerCaseInput.includes('day')))) {
      
      // Parse the query for people information
      const peopleMatch = userInput.match(/(\d+)\s*people/i);
      const adultsMatch = userInput.match(/(\d+)\s*adults?/i);
      const kidsMatch = userInput.match(/(\d+)\s*kids?/i);
      const elderlyMatch = userInput.match(/(\d+)\s*elderly/i);
      
      // Default values
      let totalPeople = 0;
      let adults = adultsMatch ? parseInt(adultsMatch[1]) : 0;
      let kids = kidsMatch ? parseInt(kidsMatch[1]) : 0;
      let elderly = elderlyMatch ? parseInt(elderlyMatch[1]) : 0;
      
      // If total people is mentioned but not broken down
      if (peopleMatch) {
        totalPeople = parseInt(peopleMatch[1]);
        // If no breakdown is provided, assume all adults
        if (adults === 0 && kids === 0 && elderly === 0) {
          adults = totalPeople;
        }
      } else {
        totalPeople = adults + kids + elderly;
      }
      
      // If still no people found, assume at least one adult
      if (totalPeople === 0) {
        adults = 1;
        totalPeople = 1;
      }
      
      // Parse duration
      const monthMatch = userInput.match(/(\d+)\s*months?/i);
      const weekMatch = userInput.match(/(\d+)\s*weeks?/i);
      const dayMatch = userInput.match(/(\d+)\s*days?/i);
      
      const months = monthMatch ? parseInt(monthMatch[1]) : 0;
      const weeks = weekMatch ? parseInt(weekMatch[1]) : 0;
      const days = dayMatch ? parseInt(dayMatch[1]) : 0;
      
      // Calculate total days
      let totalDays = (months * 30) + (weeks * 7) + days;
      
      // If no duration mentioned, assume one week
      if (totalDays === 0) {
        totalDays = 7;
      }
      
      // Parse location
      let location = 'Sweden';
      if (lowerCaseInput.includes('norrland')) location = 'Norrland';
      else if (lowerCaseInput.includes('svealand')) location = 'Svealand';
      else if (lowerCaseInput.includes('gotaland') || lowerCaseInput.includes('götaland')) location = 'Götaland';
      else if (lowerCaseInput.includes('stockholm')) location = 'Stockholm';
      else if (lowerCaseInput.includes('gothenburg')) location = 'Gothenburg';
      else if (lowerCaseInput.includes('malmö') || lowerCaseInput.includes('malmo')) location = 'Malmö';
      
      // Calculate estimate
      // Base rates per person per day (in SEK)
      const adultRate = 2000;
      const kidRate = 1000;
      const elderlyRate = 1500;
      
      // Location modifier
      let locationModifier = 1;
      if (location === 'Norrland') locationModifier = 1.2;
      else if (location === 'Svealand') locationModifier = 1.1;
      else if (location === 'Stockholm') locationModifier = 1.3;
      
      // Calculate total
      const totalCost = ((adults * adultRate) + (kids * kidRate) + (elderly * elderlyRate)) * totalDays * locationModifier;
      
      // Format the response
      let response = `Based on your request, I estimate that for `;
      
      // Format people information
      if (totalPeople === 1) {
        response += `1 person `;
      } else {
        response += `${totalPeople} people `;
        if (adults > 0) response += `(${adults} adults${kids > 0 || elderly > 0 ? ', ' : ''}`; 
        if (kids > 0) response += `${kids} kids${elderly > 0 ? ', ' : ''}`; 
        if (elderly > 0) response += `${elderly} elderly`;
        if (adults > 0) response += `) `;
      }
      
      // Format duration
      response += `staying in ${location} for `;
      if (months > 0) {
        response += `${months} month${months > 1 ? 's' : ''}`;
        if (weeks > 0 || days > 0) response += ', ';
      }
      if (weeks > 0) {
        response += `${weeks} week${weeks > 1 ? 's' : ''}`;
        if (days > 0) response += ', ';
      }
      if (days > 0) {
        response += `${days} day${days > 1 ? 's' : ''}`;
      }
      
      response += `, the estimated cost would be around **${totalCost.toLocaleString()} SEK**.

This estimate includes:
- Accommodation: ~${Math.round(totalCost * 0.4).toLocaleString()} SEK
- Food and dining: ~${Math.round(totalCost * 0.3).toLocaleString()} SEK
- Activities and transportation: ~${Math.round(totalCost * 0.2).toLocaleString()} SEK
- Miscellaneous expenses: ~${Math.round(totalCost * 0.1).toLocaleString()} SEK

Would you like me to suggest some hotels for your stay in ${location}? I can show you options for different budgets.`;
      
      return response;
    }
    
    // Check for specific location inquiries
    if (lowerCaseInput.includes('norrland') || lowerCaseInput.includes('northern')) {
      return "Norrland is Sweden's northernmost region, known for the Northern Lights, vast wilderness, and winter activities. Popular destinations include Kiruna, Abisko National Park, and the Ice Hotel.\n\nWould you like specific recommendations for Norrland? I can suggest hotels, activities, or travel routes.";
    }
    
    // Check for hotel inquiries
    if (lowerCaseInput.includes('hotel') || lowerCaseInput.includes('stay') || lowerCaseInput.includes('accommodation')) {
      // If they've requested accommodations, provide specific hotel options with links
      let hotelOptions = "Here are some accommodation options I can recommend:\n\n";
      
      if (lowerCaseInput.includes('luxury') || lowerCaseInput.includes('high end') || lowerCaseInput.includes('expensive')) {
        hotelOptions += "**Luxury Options:**\n";
        hotelOptions += "- [Grand Hôtel Stockholm](https://www.grandhotel.se/en/) - Historic 5-star hotel with waterfront views\n";
        hotelOptions += "- [Hotel Diplomat](https://diplomathotel.com/en/) - Elegant Art Nouveau hotel in central Stockholm\n";
        hotelOptions += "- [Arctic Bath](https://arcticbath.se/) - Floating hotel and spa in Lapland\n\n";
      } else if (lowerCaseInput.includes('budget') || lowerCaseInput.includes('cheap') || lowerCaseInput.includes('affordable')) {
        hotelOptions += "**Budget-Friendly Options:**\n";
        hotelOptions += "- [STF Hostels](https://www.swedishtouristassociation.com/accommodation/) - Affordable hostels throughout Sweden\n";
        hotelOptions += "- [Comfort Hotel](https://www.nordicchoicehotels.com/comfort/) - Good value chain hotels in city centers\n";
        hotelOptions += "- [Ibis Stockholm](https://all.accor.com/hotel/9232/index.en.shtml) - Budget hotel with good location\n\n";
      } else {
        hotelOptions += "**Popular Mid-Range Options:**\n";
        hotelOptions += "- [Scandic Hotels](https://www.scandichotels.com/) - Sweden's largest hotel chain with locations everywhere\n";
        hotelOptions += "- [Elite Hotels](https://elite.se/en/) - Quality hotels in historic buildings\n";
        hotelOptions += "- [Treehotel](https://www.treehotel.se/) - Unique treetop rooms in Lapland\n\n";
      }
      
      hotelOptions += "Would you like me to filter these by a specific region or price range? Or would you prefer unique stays like cabins or treehouses?";
      return hotelOptions;
    }
    
    // Check for food inquiries
    if (lowerCaseInput.includes('food') || lowerCaseInput.includes('eat') || lowerCaseInput.includes('restaurant')) {
      return "Swedish cuisine offers many delights! You should try traditional dishes like köttbullar (meatballs), gravlax (cured salmon), and kanelbullar (cinnamon buns).\n\nPopular restaurants to check out:\n- [Oaxen Krog](https://oaxen.com/en/) in Stockholm (fine dining)\n- [Fäviken](https://favikenmagasinet.se/) in northern Sweden (award-winning)\n- [Kalf & Hansen](https://www.kalfochhansen.se/) for organic Swedish fast food\n\nWould you like restaurant recommendations for a specific area or budget?";
    }
    
    // Check for activity inquiries  
    if (lowerCaseInput.includes('activities') || lowerCaseInput.includes('things to do') || lowerCaseInput.includes('attractions')) {
      return "Sweden offers many activities year-round!\n\n**Summer activities:**\n- Hiking in national parks like Abisko or Sarek\n- Kayaking through Stockholm's archipelago\n- Midnight sun experiences in the north\n- Visiting historic sites like Gamla Stan\n\n**Winter activities:**\n- Northern Lights tours\n- Dog sledding and snowmobiling\n- Skiing at resorts like Åre\n- The Ice Hotel in Jukkasjärvi\n\nCheck out the [Visit Sweden website](https://visitsweden.com/) for seasonal events.\n\nWhat season are you planning to visit?";
    }
    
    // Default responses to keep conversation going
    const defaultResponses = [
      "That's interesting! Would you like to know more about specific destinations in Sweden? I can help with recommendations for Stockholm, Gothenburg, Malmö, or natural areas like Lapland.",
      "I can help with that. Would you like information about travel costs, accommodations, or activities? I can provide estimates for different budgets and group sizes.",
      "Great question! Is there a specific region of Sweden you're most interested in visiting? Each region has its own unique attractions and character.",
      "I'd be happy to assist with your travel plans. Are you looking for family-friendly destinations or something else? Sweden has great options for all types of travelers.",
      "Sweden has so much to offer! Are you interested in nature experiences, cultural attractions, or city life? I can tailor my recommendations to your interests."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={handleToggleChat}
          className="rounded-full h-12 w-12 bg-earth-forest hover:bg-earth-moss shadow-lg"
        >
          <MessageSquare className="text-white" />
        </Button>
      ) : (
        <div className="w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200">
          <div className="bg-earth-forest text-white p-3 flex justify-between items-center rounded-t-lg">
            <h3 className="font-medium">Sverige Travel Assistant</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-earth-moss rounded-full p-1"
                onClick={handleToggleChat}
              >
                <MinimizeIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-earth-moss rounded-full p-1"
                onClick={handleToggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-2 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-earth-forest text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-2">
                <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-earth-forest hover:bg-earth-moss"
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              onClick={contactRealAgent}
              className="bg-red-500 hover:bg-red-600"
              title="Contact an agent via email"
              disabled={isSendingEmail}
            >
              <Mail className={`h-4 w-4 ${isSendingEmail ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
