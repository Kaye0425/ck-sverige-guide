
// Defines response patterns for different types of user inputs
export type ResponseCategory = 'greeting' | 'compliment' | 'inappropriate' | 'unknown';

interface ResponsePattern {
  pattern: RegExp;
  category: ResponseCategory;
}

// Patterns to identify different types of messages
export const messagePatterns: ResponsePattern[] = [
  // Greetings
  { pattern: /^(hi|hello|hey|howdy|hej|hejsan|good morning|good afternoon|good evening)/i, category: 'greeting' },
  
  // Compliments
  { pattern: /(love|great|amazing|awesome|excellent|fantastic|wonderful|beautiful|smart|intelligent|helpful|kind|nice|good|cool|neat)/i, category: 'compliment' },
  
  // Inappropriate language - common curse words and variants
  { pattern: /(fuck|shit|damn|bitch|ass|asshole|crap|wtf|stfu|bull\*|f\*\*\*|s\*\*\*|b\*\*\*\*)/i, category: 'inappropriate' }
];

// Generate responses based on message category
export function generateResponse(message: string, language: string): string {
  // Identify the category of the message
  const category = categorizeMessage(message);
  
  // Return a response based on the category and language
  return getResponseByCategory(category, language);
}

// Categorize incoming message
function categorizeMessage(message: string): ResponseCategory {
  for (const pattern of messagePatterns) {
    if (pattern.pattern.test(message)) {
      return pattern.category;
    }
  }
  return 'unknown';
}

// Get response based on category and language
function getResponseByCategory(category: ResponseCategory, language: string): string {
  const isSwedish = language === 'sv';
  
  switch (category) {
    case 'greeting':
      return isSwedish 
        ? "Hej! Vad kan jag hjälpa dig med idag angående ditt besök i Sverige?" 
        : "Hello there! How can I help you plan your visit to Sweden today?";
      
    case 'compliment':
      return isSwedish 
        ? "Tack, det värmer! Jag finns här för att göra din upplevelse så bra som möjligt. Hur kan jag hjälpa dig med dina reseplaner?" 
        : "Thank you, that's very kind! I'm here to make your experience as wonderful as possible. How can I assist with your travel plans?";
      
    case 'inappropriate':
      return isSwedish 
        ? "Jag förstår att resplanering kan vara frustrerande ibland. Dina känslor är giltiga. Hur kan jag bättre hjälpa dig att planera din resa?" 
        : "I understand that travel planning can be frustrating sometimes. Your feelings are valid. How can I better help you plan your journey?";
      
    default:
      return isSwedish 
        ? "Hur kan jag hjälpa dig med din resa till Sverige?" 
        : "How can I help you with your trip to Sweden?";
  }
}
