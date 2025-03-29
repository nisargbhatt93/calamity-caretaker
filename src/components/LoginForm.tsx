
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getUserByEmail } from "@/utils/mongoDb";
import { initGoogleAuth, renderGoogleButton } from "@/utils/authUtils";

interface LoginFormProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

const LoginForm = ({ onLogin, onSwitchToSignup }: LoginFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const googleSignInButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Auth
    const loadGoogleAuth = async () => {
      try {
        await initGoogleAuth();
        if (googleSignInButtonRef.current) {
          renderGoogleButton("google-signin-button-login");
        }
      } catch (error) {
        console.error("Error initializing Google Auth:", error);
      }
    };

    loadGoogleAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if user exists
      const user = await getUserByEmail(email);
      
      if (!user) {
        toast({
          title: "Login Failed",
          description: "User does not exist",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // In a real app, you would compare hashed passwords
      if (user.password !== password) {
        toast({
          title: "Login Failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Check if user is verified
      if (!user.verified) {
        toast({
          title: "Account Not Verified",
          description: "Please verify your email before logging in",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      onLogin();
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Login</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
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
        <div id="google-signin-button-login" ref={googleSignInButtonRef} className="flex justify-center"></div>
      </div>
      
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          className="underline underline-offset-4 hover:text-primary"
          onClick={onSwitchToSignup}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
