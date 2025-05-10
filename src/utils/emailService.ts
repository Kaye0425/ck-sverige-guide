
import emailjs from 'emailjs-com';

// Initialize EmailJS with your service ID, template ID, and user ID
const SERVICE_ID = 'service_v0jr1qz';  // Replace with your actual EmailJS service ID
const TEMPLATE_ID = 'template_j6gfnlk';  // Replace with your actual EmailJS template ID
const USER_ID = 'hgIJYlZF9LFv3qyYe';  // Replace with your actual EmailJS user ID

interface EmailParams {
  to_email: string;
  from_name: string;
  from_email: string;
  message: string;
  subject: string;
  [key: string]: unknown; // Add index signature to make it compatible with Record<string, unknown>
}

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      params,
      USER_ID
    );
    
    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export const contactAgent = async (
  userEmail: string, 
  userName: string = 'Traveler',
  message: string = 'I need assistance with my travel plans.',
  chatHistory: string[] = []
): Promise<boolean> => {
  const agentEmail = 'khayevillafuerte@gmail.com';
  const fullMessage = `
Message from user: ${message}

Chat History:
${chatHistory.join('\n')}
  `;
  
  return sendEmail({
    to_email: agentEmail,
    from_name: userName,
    from_email: userEmail,
    message: fullMessage,
    subject: 'Customer Assistance Request - Sverige Guide'
  });
};
