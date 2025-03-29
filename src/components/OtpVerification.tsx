
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyUserOtp, updateUserOtp } from "@/utils/mongoDb";
import { generateOtp, sendOtpEmail } from "@/utils/emailUtils";
import { Mail } from "lucide-react";

interface OtpVerificationProps {
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const OtpVerification = ({ email, onSuccess, onCancel }: OtpVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const verified = await verifyUserOtp(email, otp);
      
      if (verified) {
        toast({
          title: "Verification Successful",
          description: "Your email has been verified successfully.",
        });
        onSuccess();
      } else {
        toast({
          title: "Verification Failed",
          description: "Invalid or expired OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setResendingOtp(true);
    try {
      // Generate a new OTP
      const newOtp = generateOtp();
      
      // Update the user's OTP in the database
      await updateUserOtp(email, newOtp);
      
      // Send the new OTP via email
      await sendOtpEmail(email, newOtp);
      
      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast({
        title: "Failed to Resend OTP",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setResendingOtp(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="bg-primary/10 p-4 rounded-full">
        <Mail className="h-8 w-8 text-primary" />
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Email Verification</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="flex justify-center w-full my-4">
        <InputOTP 
          maxLength={6} 
          value={otp} 
          onChange={setOtp}
          placeholder=""
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        onClick={handleVerify}
        className="w-full"
        disabled={otp.length !== 6 || isVerifying}
      >
        {isVerifying ? "Verifying..." : "Verify Email"}
      </Button>
      
      <div className="flex flex-col items-center space-y-2 w-full">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResendOtp}
          disabled={resendingOtp}
          className="text-sm"
        >
          {resendingOtp ? "Sending..." : "Resend Code"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="text-sm"
          disabled={isVerifying || resendingOtp}
        >
          Back to Signup
        </Button>
      </div>
    </div>
  );
};

export default OtpVerification;
