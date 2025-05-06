
import { Destination } from '@/components/DestinationCard';

const destinations: Destination[] = [
  {
    id: 'gamla-stan',
    name: {
      sv: 'Gamla Stan',
      en: 'Old Town',
    },
    location: {
      sv: 'Stockholm',
      en: 'Stockholm',
    },
    timeNeeded: {
      hours: 4,
      days: 0,
    },
    image: 'https://images.unsplash.com/photo-1572973843894-825e041604d8?auto=format&fit=crop&w=800',
    region: {
      sv: 'Stockholms län',
      en: 'Stockholm County',
    },
    description: {
      sv: 'Gamla stan, Stockholms historiska centrum, är en av Europas bäst bevarade medeltida stadskärnor. Här kan du uppleva historisk charm med smala kullerstensgator, färgglada byggnader och Kungliga slottet.',
      en: "The Old Town, Stockholm's historic center, is one of Europe's best-preserved medieval city centers. Here you can experience historical charm with narrow cobblestone streets, colorful buildings, and the Royal Palace.",
    },
    expenses: {
      sv: '500-1000 SEK per person',
      en: '500-1000 SEK per person',
    },
    shopping: {
      sv: 'Souvenirer, konsthantverk, designobjekt, smycken, och traditionella svenska produkter. Butikerna i Gamla Stan erbjuder unika hantverk och lokala produkter.',
      en: 'Souvenirs, handicrafts, design objects, jewelry, and traditional Swedish products. The shops in the Old Town offer unique crafts and local products.',
    },
    whyVisit: {
      sv: 'Gamla Stan är själva hjärtat av Stockholm och ett levande museum. Här kan du uppleva äkta svensk historia, arkitektur och kultur samtidigt som du njuter av mysiga caféer och unika butiker.',
      en: 'The Old Town is the very heart of Stockholm and a living museum. Here you can experience authentic Swedish history, architecture, and culture while enjoying cozy cafes and unique shops.',
    },
  },
  {
    id: 'abisko',
    name: {
      sv: 'Abisko Nationalpark',
      en: 'Abisko National Park',
    },
    location: {
      sv: 'Norrbottens län',
      en: 'Norrbotten County',
    },
    timeNeeded: {
      hours: 0,
      days: 2,
    },
    image: 'https://images.unsplash.com/photo-1557546607-59c6989579d4?auto=format&fit=crop&w=800',
    region: {
      sv: 'Lappland',
      en: 'Lapland',
    },
    description: {
      sv: 'Abisko nationalpark är känd för sin oförstörda natur, vandringsleder och för att vara en av de bästa platserna i världen för att se norrsken. Parken erbjuder fantastiska upplevelser året runt.',
      en: 'Abisko National Park is known for its pristine nature, hiking trails and for being one of the best places in the world to see the Northern Lights. The park offers amazing experiences all year round.',
    },
    expenses: {
      sv: '1500-2500 SEK per person/dag',
      en: '1500-2500 SEK per person/day',
    },
    shopping: {
      sv: 'Samiskt hantverk (duodji), överlevnadsutrustning, souvenirer med norrskensmotiv och lokala livsmedel som hjortronprodukter och renkött.',
      en: 'Sami crafts (duodji), survival equipment, northern lights-themed souvenirs, and local foods like cloudberry products and reindeer meat.',
    },
    whyVisit: {
      sv: 'Abisko erbjuder en av världens bästa chanser att uppleva det magiska norrskenet samt en unik arktisk vildmark. Den hundraåriga nationalparken ger dig möjlighet att uppleva orörd natur och spektakulära utsikter över fjäll och sjöar.',
      en: 'Abisko offers one of the world\'s best chances to experience the magical Northern Lights and a unique Arctic wilderness. The hundred-year-old national park gives you the opportunity to experience untouched nature and spectacular views of mountains and lakes.',
    },
  },
  {
    id: 'gotland',
    name: {
      sv: 'Visby',
      en: 'Visby',
    },
    location: {
      sv: 'Gotland',
      en: 'Gotland',
    },
    timeNeeded: {
      hours: 0,
      days: 3,
    },
    image: 'https://images.unsplash.com/photo-1534009865594-4e9b1bc76719?auto=format&fit=crop&w=800',
    region: {
      sv: 'Gotlands län',
      en: 'Gotland County',
    },
    description: {
      sv: 'Visby, en UNESCO-världsarvsstad på Gotland, är känd för sin välbevarade medeltida ringmur, pittoreska gränder och ruiner. Under sommaren förvandlas staden när den årliga Medeltidsveckan äger rum.',
      en: 'Visby, a UNESCO World Heritage city on Gotland, is known for its well-preserved medieval city wall, picturesque alleys, and ruins. During summer, the city transforms when the annual Medieval Week takes place.',
    },
    expenses: {
      sv: '1200-2000 SEK per person/dag',
      en: '1200-2000 SEK per person/day',
    },
    shopping: {
      sv: 'Konsthantverk i kalksten, keramik, handgjorda smycken, lokala matprodukter som saffranspannkaka, och traditionella gotländska hantverk.',
      en: 'Limestone crafts, ceramics, handmade jewelry, local food products like saffron pancake, and traditional Gotland crafts.',
    },
    whyVisit: {
      sv: 'Visby är som en tidsresa till medeltiden med sin fantastiska stadsmur och smala kullerstensgator. Kombinationen av historia, vacker natur och strandliv gör Gotland till ett perfekt sommarresmål.',
      en: 'Visby is like a time travel to the Middle Ages with its amazing city wall and narrow cobblestone streets. The combination of history, beautiful nature and beach life makes Gotland a perfect summer destination.',
    },
  },
  {
    id: 'kebnekaise',
    name: {
      sv: 'Kebnekaise',
      en: 'Kebnekaise',
    },
    location: {
      sv: 'Kiruna',
      en: 'Kiruna',
    },
    timeNeeded: {
      hours: 0,
      days: 4,
    },
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800',
    region: {
      sv: 'Lappland',
      en: 'Lapland',
    },
    description: {
      sv: 'Kebnekaise är Sveriges högsta berg med sina 2096 meter över havet. Den erbjuder populära vandringsleder och bestigning för både nybörjare och erfarna bergsklättrare, med spektakulära vyer över glaciärer och den lappländska vildmarken.',
      en: 'Kebnekaise is Sweden\'s highest mountain at 2096 meters above sea level. It offers popular hiking trails and ascents for both beginners and experienced mountain climbers, with spectacular views of glaciers and the Lapland wilderness.',
    },
    expenses: {
      sv: '1500-3000 SEK per person/dag',
      en: '1500-3000 SEK per person/day',
    },
    shopping: {
      sv: 'Fjällutrustning, samiskt hantverk, överlevnadsverktyg, och lokala delikatesser som torkat renkött och hjortronsylt.',
      en: 'Mountain equipment, Sami crafts, survival tools, and local delicacies such as dried reindeer meat and cloudberry jam.',
    },
    whyVisit: {
      sv: 'Att bestiga Sveriges högsta berg är en mäktig upplevelse som erbjuder enastående naturupplevelser och en känsla av att ha uppnått något speciellt. Den orörda vildmarken, de fantastiska vyerna och den rena luften skapar minnen för livet.',
      en: 'Climbing Sweden\'s highest mountain is a mighty experience that offers outstanding nature experiences and a feeling of having achieved something special. The untouched wilderness, the fantastic views and the clean air create memories for life.',
    },
  },
  {
    id: 'oresundsbron',
    name: {
      sv: 'Öresundsbron',
      en: 'Øresund Bridge',
    },
    location: {
      sv: 'Malmö',
      en: 'Malmö',
    },
    timeNeeded: {
      hours: 2,
      days: 0,
    },
    image: 'https://images.unsplash.com/photo-1573799792866-3cfc308652dd?auto=format&fit=crop&w=800',
    region: {
      sv: 'Skåne län',
      en: 'Skåne County',
    },
    description: {
      sv: 'Öresundsbron är en 16 km lång förbindelse mellan Sverige och Danmark. Denna tekniska bedrift kombinerar en bro och en tunnel och erbjuder besökare möjligheten att bokstavligen stå med ena foten i Sverige och den andra i Danmark.',
      en: 'The Øresund Bridge is a 16 km connection between Sweden and Denmark. This technical achievement combines a bridge and a tunnel and offers visitors the opportunity to literally stand with one foot in Sweden and the other in Denmark.',
    },
    expenses: {
      sv: '300-500 SEK per person',
      en: '300-500 SEK per person',
    },
    shopping: {
      sv: 'Miniatyrer av bron, lokala skånska specialiteter, och skandinavisk design från både svenska och danska designers.',
      en: 'Miniatures of the bridge, local Skåne specialties, and Scandinavian design from both Swedish and Danish designers.',
    },
    whyVisit: {
      sv: 'Öresundsbron är en mäktig symbol för samarbetet mellan Sverige och Danmark, samtidigt som den är en imponerande teknisk konstruktion. Ett besök här ger fantastisk utsikt över Öresund och möjlighet att uppleva två länder på en och samma dag.',
      en: 'The Øresund Bridge is a powerful symbol of cooperation between Sweden and Denmark, while being an impressive technical construction. A visit here provides fantastic views of Öresund and the opportunity to experience two countries in one day.',
    },
  },
];

export default destinations;
