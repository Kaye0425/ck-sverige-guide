import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MinimizeIcon, MessageSquare, Mic, Hotel, Phone, Mail } from 'lucide-react';
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

  const contactRealAgent = () => {
    // Changed to use email instead of phone number
    const agentEmail = "khayevillafuerte@gmail.com";
    
    // Show notification that an email has been sent to an agent
    toast("Contacting an agent via email...", {
      description: "An agent will contact you at their earliest convenience.",
      duration: 5000,
    });
    
    // In a real app, this would make an API call to send an email
    const messageToSend = `Customer requesting assistance on Sverige Guide website.`;
    
    // For demonstration, show the message details that would be sent
    console.log("Sending message to agent:", messageToSend);
    console.log("Agent email:", agentEmail);
    
    // Add confirmation message in chat
    const botMessage: Message = {
      id: Date.now().toString(),
      content: "I've notified our travel specialist via email. They'll contact you shortly. In the meantime, is there anything else I can help you with?",
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, botMessage]);
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
      return "I understand you'd like to speak with a real person. I'm emailing one of our travel specialists now.";
    }
    
    // Check for estimation questions
    if (lowerCaseInput.includes('estimation') || lowerCaseInput.includes('estimate') || 
        lowerCaseInput.includes('cost') || lowerCaseInput.includes('price')) {
      
      // Parse the query for people information
      const adultsMatch = userInput.match(/(\d+)\s*adults?/i);
      const kidsMatch = userInput.match(/(\d+)\s*kids?/i);
      const elderlyMatch = userInput.match(/(\d+)\s*elderly/i);
      
      const adults = adultsMatch ? parseInt(adultsMatch[1]) : 0;
      const kids = kidsMatch ? parseInt(kidsMatch[1]) : 0;
      const elderly = elderlyMatch ? parseInt(elderlyMatch[1]) : 0;
      
      // Parse duration
      const weekMatch = userInput.match(/(\d+)\s*weeks?/i);
      const dayMatch = userInput.match(/(\d+)\s*days?/i);
      
      const weeks = weekMatch ? parseInt(weekMatch[1]) : 0;
      const days = dayMatch ? parseInt(dayMatch[1]) : 0;
      
      // Parse location
      let location = 'Sweden';
      if (lowerCaseInput.includes('norrland')) location = 'Norrland';
      else if (lowerCaseInput.includes('svealand')) location = 'Svealand';
      else if (lowerCaseInput.includes('gotaland') || lowerCaseInput.includes('götaland')) location = 'Götaland';
      
      // Calculate estimate
      const totalPeople = adults + kids + elderly;
      const totalDays = (weeks * 7) + days;
      
      if (totalPeople > 0 && totalDays > 0) {
        // Base rates per person per day (in SEK)
        const adultRate = 2000;
        const kidRate = 1000;
        const elderlyRate = 1500;
        
        // Location modifier
        let locationModifier = 1;
        if (location === 'Norrland') locationModifier = 1.2;
        else if (location === 'Svealand') locationModifier = 1.1;
        
        // Calculate total
        const totalCost = ((adults * adultRate) + (kids * kidRate) + (elderly * elderlyRate)) * totalDays * locationModifier;
        
        return `For ${totalPeople} people (${adults} adults, ${kids} kids, ${elderly} elderly) staying in ${location} for ${totalDays} days, I estimate costs around ${totalCost.toLocaleString()} SEK. This includes accommodation, food, and some activities.\n\nWould you like me to suggest some hotels for your stay in ${location}? I can show you options for different budgets.`;
      }
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
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
