
// Define types for our destination data structure
interface LanguageText {
  en: string;
  sv: string;
}

interface TimeNeeded {
  days: number;
  hours: number;
}

export interface Destination {
  id: string | number;
  name: LanguageText;
  region: LanguageText;
  location: LanguageText;
  description: LanguageText;
  imageUrl: string;
  image: string;
  attractions: string[];
  bestTimeToVisit: string;
  whyVisit: LanguageText;
  timeNeeded: TimeNeeded;
  expenses: LanguageText;
  shopping: LanguageText;
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: {
      en: "Stockholm",
      sv: "Stockholm"
    },
    region: {
      en: "Svealand",
      sv: "Svealand"
    },
    location: {
      en: "Central Sweden",
      sv: "Centrala Sverige"
    },
    description: {
      en: "The capital of Sweden, known for its beautiful archipelago, historic old town (Gamla Stan), and cultural attractions.",
      sv: "Sveriges huvudstad, känd för sin vackra skärgård, historiska gamla stan och kulturella sevärdheter."
    },
    imageUrl: "https://images.unsplash.com/photo-1601127607683-f5ed45128142?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    image: "https://images.unsplash.com/photo-1601127607683-f5ed45128142?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    attractions: ["Vasa Museum", "Gamla Stan", "Skansen", "Royal Palace", "City Hall"],
    bestTimeToVisit: "May to September",
    whyVisit: {
      en: "Stockholm offers a perfect blend of history, culture, and natural beauty. The city is built on 14 islands, offering stunning water views at every turn. You can explore medieval streets in Gamla Stan, world-class museums, and enjoy the lively atmosphere of this Nordic capital.",
      sv: "Stockholm erbjuder en perfekt blandning av historia, kultur och naturskönhet. Staden är byggd på 14 öar, vilket ger vackra vattenvyer i varje sväng. Du kan utforska medeltida gator i Gamla Stan, världsklassmuseer och njuta av den livliga atmosfären i denna nordiska huvudstad."
    },
    timeNeeded: {
      days: 3,
      hours: 0
    },
    expenses: {
      en: "€100-200 per day",
      sv: "1000-2000 SEK per dag"
    },
    shopping: {
      en: "Designer boutiques in Östermalm, unique gifts in Gamla Stan, and modern Swedish design shops throughout the city.",
      sv: "Designbutiker i Östermalm, unika presenter i Gamla Stan och moderna svenska designbutiker runt om i staden."
    }
  },
  {
    id: 2,
    name: {
      en: "Gothenburg",
      sv: "Göteborg"
    },
    region: {
      en: "Götaland",
      sv: "Götaland"
    },
    location: {
      en: "Western Sweden",
      sv: "Västra Sverige"
    },
    description: {
      en: "Sweden's second-largest city with a vibrant cultural scene, beautiful parks, and a charming canal system.",
      sv: "Sveriges näst största stad med en livlig kulturscen, vackra parker och ett charmigt kanalsystem."
    },
    imageUrl: "https://images.unsplash.com/photo-1599931246789-ea22d2ffb8d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    image: "https://images.unsplash.com/photo-1599931246789-ea22d2ffb8d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    attractions: ["Liseberg Amusement Park", "Gothenburg Archipelago", "Universeum", "Botanical Garden", "Haga District"],
    bestTimeToVisit: "June to August",
    whyVisit: {
      en: "Gothenburg offers a more relaxed alternative to Stockholm, with a charming mix of historical architecture and modern attractions. Known for its friendly locals, excellent seafood, and beautiful coastal location, it's a perfect destination for a laid-back urban experience.",
      sv: "Göteborg erbjuder ett mer avslappnat alternativ till Stockholm, med en charmig blandning av historisk arkitektur och moderna sevärdheter. Känd för sina vänliga lokalbefolkning, utmärkta skaldjur och vackra kustläge, är det ett perfekt resmål för en avslappnad urban upplevelse."
    },
    timeNeeded: {
      days: 2,
      hours: 0
    },
    expenses: {
      en: "€80-150 per day",
      sv: "800-1500 SEK per dag"
    },
    shopping: {
      en: "Trendy boutiques in Haga, shopping centers like Nordstan, and local design shops.",
      sv: "Trendiga butiker i Haga, köpcentrum som Nordstan och lokala designbutiker."
    }
  },
  {
    id: 3,
    name: {
      en: "Malmö",
      sv: "Malmö"
    },
    region: {
      en: "Götaland",
      sv: "Götaland"
    },
    location: {
      en: "Southern Sweden",
      sv: "Södra Sverige"
    },
    description: {
      en: "Located in southern Sweden, connected to Copenhagen, Denmark by the Öresund Bridge and known for its modern architecture.",
      sv: "Beläget i södra Sverige, anslutet till Köpenhamn, Danmark via Öresundsbron och känt för sin moderna arkitektur."
    },
    imageUrl: "https://images.unsplash.com/photo-1603070450407-1a9548e3df8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    image: "https://images.unsplash.com/photo-1603070450407-1a9548e3df8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    attractions: ["Turning Torso", "Malmö Castle", "Folkets Park", "Malmö Live", "Ribersborg Beach"],
    bestTimeToVisit: "May to September",
    whyVisit: {
      en: "Malmö is a multicultural hub with innovative architecture and a thriving food scene. Its proximity to Copenhagen makes it an ideal base for exploring both Swedish and Danish cultures.",
      sv: "Malmö är ett multikulturellt nav med innovativ arkitektur och en blomstrande matscen. Dess närhet till Köpenhamn gör det till en idealisk bas för att utforska både svensk och dansk kultur."
    },
    timeNeeded: {
      days: 1,
      hours: 0
    },
    expenses: {
      en: "€70-130 per day",
      sv: "700-1300 SEK per dag"
    },
    shopping: {
      en: "Modern shopping centers like Emporia, design stores, and international brands.",
      sv: "Moderna köpcentrum som Emporia, designbutiker och internationella varumärken."
    }
  },
  {
    id: 4,
    name: {
      en: "Uppsala",
      sv: "Uppsala"
    },
    region: {
      en: "Svealand",
      sv: "Svealand"
    },
    location: {
      en: "Eastern Sweden",
      sv: "Östra Sverige"
    },
    description: {
      en: "A university city with a rich history, beautiful cathedral, and vibrant student life.",
      sv: "En universitetsstad med rik historia, vacker katedral och livligt studentliv."
    },
    imageUrl: "https://images.unsplash.com/photo-1558697698-9300a84a6a99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    image: "https://images.unsplash.com/photo-1558697698-9300a84a6a99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    attractions: ["Uppsala Cathedral", "Uppsala University", "Uppsala Castle", "Botanical Garden", "Gamla Uppsala"],
    bestTimeToVisit: "May to September",
    whyVisit: {
      en: "Uppsala combines academic excellence with historic charm. Home to Scandinavia's oldest university, this city offers beautiful architecture, literary heritage, and a youthful atmosphere.",
      sv: "Uppsala kombinerar akademisk excellens med historisk charm. Hem för Skandinaviens äldsta universitet, erbjuder denna stad vacker arkitektur, litterärt arv och en ungdomlig atmosfär."
    },
    timeNeeded: {
      days: 1,
      hours: 0
    },
    expenses: {
      en: "€70-120 per day",
      sv: "700-1200 SEK per dag"
    },
    shopping: {
      en: "Bookstores, university merchandise, and local crafts shops.",
      sv: "Bokhandlar, universitetsvaror och lokala hantverksbutiker."
    }
  },
  {
    id: 5,
    name: {
      en: "Kiruna",
      sv: "Kiruna"
    },
    region: {
      en: "Norrland",
      sv: "Norrland"
    },
    location: {
      en: "Northern Sweden",
      sv: "Norra Sverige"
    },
    description: {
      en: "Sweden's northernmost city, known for the Northern Lights, midnight sun, and the famous Ice Hotel.",
      sv: "Sveriges nordligaste stad, känd för norrskenet, midnattssolen och det berömda ishotellet."
    },
    imageUrl: "https://images.unsplash.com/photo-1613507093663-170d82b3460a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    image: "https://images.unsplash.com/photo-1613507093663-170d82b3460a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    attractions: ["Ice Hotel", "Abisko National Park", "Northern Lights", "Kebnekaise Mountain", "Kiruna Church"],
    bestTimeToVisit: "December to March for Northern Lights, June for Midnight Sun",
    whyVisit: {
      en: "Kiruna offers a truly unique Arctic experience. Visit in winter to witness the magical Northern Lights or in summer to experience the phenomenon of the midnight sun. The landscape is breathtaking, and activities range from dog sledding to ice fishing.",
      sv: "Kiruna erbjuder en verkligt unik arktisk upplevelse. Besök på vintern för att bevittna det magiska norrskenet eller på sommaren för att uppleva fenomenet midnattssol. Landskapet är fantastiskt, och aktiviteterna sträcker sig från hundspann till isfiske."
    },
    timeNeeded: {
      days: 3,
      hours: 0
    },
    expenses: {
      en: "€150-300 per day",
      sv: "1500-3000 SEK per dag"
    },
    shopping: {
      en: "Sami handicrafts, winter clothing, and unique Arctic souvenirs.",
      sv: "Samiska hantverk, vinterkläder och unika arktiska souvenirer."
    }
  },
  {
    id: 6,
    name: {
      en: "Visby",
      sv: "Visby"
    },
    region: {
      en: "Götaland",
      sv: "Götaland"
    },
    location: {
      en: "Gotland Island",
      sv: "Gotland"
    },
    description: {
      en: "A UNESCO World Heritage site on Gotland island with well-preserved medieval city walls and buildings.",
      sv: "Ett UNESCO-världsarv på Gotland med välbevarade medeltida stadsmurar och byggnader."
    },
    imageUrl: "https://images.unsplash.com/photo-1662421387484-94f2821a8ecc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    image: "https://images.unsplash.com/photo-1662421387484-94f2821a8ecc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    attractions: ["Visby City Wall", "Gotland Museum", "St. Mary's Cathedral", "Almedalen Park", "Botanical Garden"],
    bestTimeToVisit: "June to August",
    whyVisit: {
      en: "Visby is like stepping back in time with its incredibly preserved medieval architecture. The walled town offers cobblestone streets, rose-covered cottages, and ancient ruins that transport visitors to another era.",
      sv: "Visby är som att kliva tillbaka i tiden med sin otroligt bevarade medeltida arkitektur. Den muromgärdade staden erbjuder kullerstensgator, rosatäckta stugor och antika ruiner som transporterar besökare till en annan era."
    },
    timeNeeded: {
      days: 2,
      hours: 0
    },
    expenses: {
      en: "€90-170 per day",
      sv: "900-1700 SEK per dag"
    },
    shopping: {
      en: "Local crafts, handmade jewelry, and medieval-inspired souvenirs.",
      sv: "Lokalt hantverk, handgjorda smycken och medeltidsinspirerade souvenirer."
    }
  },
  {
    id: 7,
    name: {
      en: "Åre",
      sv: "Åre"
    },
    region: {
      en: "Norrland",
      sv: "Norrland"
    },
    location: {
      en: "Jämtland",
      sv: "Jämtland"
    },
    description: {
      en: "Sweden's premier ski resort with beautiful mountain scenery and outdoor activities all year round.",
      sv: "Sveriges främsta skidort med vackert bergslandskap och utomhusaktiviteter året runt."
    },
    imageUrl: "https://images.unsplash.com/photo-1607490040458-65a49073f5d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    image: "https://images.unsplash.com/photo-1607490040458-65a49073f5d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    attractions: ["Åre Ski Resort", "Åreskutan Mountain", "Tännforsen Waterfall", "Zipline Adventures", "Mountain Biking Trails"],
    bestTimeToVisit: "December to April for skiing, June to August for summer activities",
    whyVisit: {
      en: "Åre is Sweden's premier mountain destination, offering world-class skiing in winter and hiking, biking and adventure sports in summer. The stunning mountain scenery provides a backdrop for outdoor activities year-round.",
      sv: "Åre är Sveriges främsta bergsdestination och erbjuder skidåkning i världsklass på vintern samt vandring, cykling och äventyrssporter på sommaren. Det fantastiska bergslandskapet ger en bakgrund för utomhusaktiviteter året runt."
    },
    timeNeeded: {
      days: 4,
      hours: 0
    },
    expenses: {
      en: "€120-250 per day",
      sv: "1200-2500 SEK per dag"
    },
    shopping: {
      en: "Outdoor gear, sports equipment, and local food specialties.",
      sv: "Friluftsutrustning, sportutrustning och lokala matspecialiteter."
    }
  },
  {
    id: 8,
    name: {
      en: "Lund",
      sv: "Lund"
    },
    region: {
      en: "Götaland",
      sv: "Götaland"
    },
    location: {
      en: "Skåne",
      sv: "Skåne"
    },
    description: {
      en: "A charming university town with cobblestone streets, historic buildings, and a vibrant academic atmosphere.",
      sv: "En charmig universitetsstad med kullerstensgator, historiska byggnader och en livfull akademisk atmosfär."
    },
    imageUrl: "https://images.unsplash.com/photo-1630649984885-be4a38c41b9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    image: "https://images.unsplash.com/photo-1630649984885-be4a38c41b9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    attractions: ["Lund Cathedral", "Lund University", "Botanical Garden", "Kulturen Open-Air Museum", "Skissernas Museum"],
    bestTimeToVisit: "May to September",
    whyVisit: {
      en: "Lund offers a perfect combination of history and youthful energy. This university town features beautiful medieval architecture, cultural attractions, and the vibrant atmosphere that comes with being one of Sweden's oldest academic centers.",
      sv: "Lund erbjuder en perfekt kombination av historia och ungdomlig energi. Denna universitetsstad har vacker medeltida arkitektur, kulturella sevärdheter och den livliga atmosfären som kommer med att vara ett av Sveriges äldsta akademiska centrum."
    },
    timeNeeded: {
      days: 1,
      hours: 0
    },
    expenses: {
      en: "€70-120 per day",
      sv: "700-1200 SEK per dag"
    },
    shopping: {
      en: "University merchandise, bookshops, and local design items.",
      sv: "Universitetsvaror, bokhandlar och lokala designprodukter."
    }
  },
  {
    id: 9,
    name: {
      en: "Öresund Bridge",
      sv: "Öresundsbron"
    },
    region: {
      en: "Götaland",
      sv: "Götaland"
    },
    location: {
      en: "Between Malmö and Copenhagen",
      sv: "Mellan Malmö och Köpenhamn"
    },
    description: {
      en: "An engineering marvel connecting Sweden and Denmark across the Öresund Strait.",
      sv: "Ett tekniskt mästerverk som förbinder Sverige och Danmark över Öresund."
    },
    imageUrl: "https://images.unsplash.com/photo-1549985798-6fc5211aaff8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    image: "https://images.unsplash.com/photo-1549985798-6fc5211aaff8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    attractions: ["Bridge Experience Center", "Lernacken Viewpoint", "Malmö-Copenhagen Connection"],
    bestTimeToVisit: "Year-round",
    whyVisit: {
      en: "The Öresund Bridge is both an architectural wonder and a symbol of connection between Sweden and Denmark. The journey across the bridge offers spectacular views of the strait and connects two vibrant cities.",
      sv: "Öresundsbron är både ett arkitektoniskt under och en symbol för förbindelsen mellan Sverige och Danmark. Resan över bron erbjuder spektakulära vyer över sundet och förbinder två livfulla städer."
    },
    timeNeeded: {
      days: 0,
      hours: 3
    },
    expenses: {
      en: "€30-50 for transportation",
      sv: "300-500 SEK för transport"
    },
    shopping: {
      en: "None specifically at the bridge, but nearby in Malmö and Copenhagen.",
      sv: "Ingen specifikt vid bron, men i närheten i Malmö och Köpenhamn."
    }
  },
  {
    id: 10,
    name: {
      en: "Gamla Stan",
      sv: "Gamla Stan"
    },
    region: {
      en: "Svealand",
      sv: "Svealand"
    },
    location: {
      en: "Stockholm",
      sv: "Stockholm"
    },
    description: {
      en: "The historic old town of Stockholm with medieval streets, colorful buildings, and historic landmarks.",
      sv: "Stockholms historiska gamla stad med medeltida gator, färgglada byggnader och historiska landmärken."
    },
    imageUrl: "https://images.unsplash.com/photo-1552750069-a412269e2f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    image: "https://images.unsplash.com/photo-1552750069-a412269e2f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    attractions: ["Royal Palace", "Stockholm Cathedral", "Nobel Museum", "Stortorget Square", "Mårten Trotzigs Gränd"],
    bestTimeToVisit: "May to September",
    whyVisit: {
      en: "Gamla Stan is one of Europe's most well-preserved medieval city centers. Walking through its narrow, winding streets feels like traveling back in time, with centuries-old buildings, hidden courtyards, and charming cafes at every turn.",
      sv: "Gamla Stan är en av Europas mest välbevarade medeltida stadskärnor. Att vandra genom dess smala, slingrande gator känns som att resa tillbaka i tiden, med århundraden gamla byggnader, dolda innergårdar och charmiga caféer i varje hörn."
    },
    timeNeeded: {
      days: 0,
      hours: 6
    },
    expenses: {
      en: "€40-100 per day",
      sv: "400-1000 SEK per dag"
    },
    shopping: {
      en: "Souvenir shops, antiques, Swedish design, and traditional crafts.",
      sv: "Souvenirbutiker, antikviteter, svensk design och traditionellt hantverk."
    }
  }
];
