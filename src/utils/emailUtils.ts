
import { toast } from "@/components/ui/use-toast";

// This is a mock email function for demo purposes
// In a real application, you would use a service like SendGrid, Mailgun, etc.
export const sendOtpEmail = async (email: string, otp: string): Promise<boolean> => {
  // For demo purposes, we'll just log the OTP to the console
  console.log(`OTP sent to ${email}: ${otp}`);
  
  // In a real application, you would use an API call to send the email
  // Simulate a successful email send
  return new Promise((resolve) => {
    setTimeout(() => {
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${email}. Please check your inbox.`,
      });
      resolve(true);
    }, 1000);
  });
};

// Function to generate a 6-digit OTP
export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
