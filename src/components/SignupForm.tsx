
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { addUser, getUserByEmail, updateUserOtp } from "@/utils/mongoDb";
import { generateOtp, sendOtpEmail } from "@/utils/emailUtils";
import OtpVerification from "./OtpVerification";
import { initGoogleAuth, renderGoogleButton } from "@/utils/authUtils";
import { useEffect, useRef } from "react";

interface SignupFormProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSignup, onSwitchToLogin }: SignupFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const googleSignInButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Auth
    const loadGoogleAuth = async () => {
      try {
        await initGoogleAuth();
        if (googleSignInButtonRef.current) {
          renderGoogleButton("google-signin-button-signup");
        }
      } catch (error) {
        console.error("Error initializing Google Auth:", error);
      }
    };

    loadGoogleAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if user already exists
      const existingUser = await getUserByEmail(email);
      
      if (existingUser) {
        toast({
          title: "User Exists",
          description: "An account with this email already exists",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Generate OTP
      const otp = generateOtp();
      
      // Create user with unverified status
      await addUser({
        name,
        email,
        password, // In a real application, you would hash this password
        otp,
        otpCreatedAt: new Date(),
        verified: false,
        createdAt: new Date(),
      });
      
      // Send OTP email
      await sendOtpEmail(email, otp);
      
      // Show OTP verification screen
      setShowOtpVerification(true);
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSuccess = () => {
    toast({
      title: "Signup Successful",
      description: "Your account has been created and verified successfully.",
    });
    onSignup();
  };

  if (showOtpVerification) {
    return (
      <OtpVerification
        email={email}
        onSuccess={handleOtpSuccess}
        onCancel={() => setShowOtpVerification(false)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Create an Account</h2>
        <p className="text-sm text-muted-foreground">
          Enter your details to create a new account
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <div className="grid gap-2">
        <div id="google-signin-button-signup" ref={googleSignInButtonRef} className="flex justify-center"></div>
      </div>
      
      <div className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          className="underline underline-offset-4 hover:text-primary"
          onClick={onSwitchToLogin}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
