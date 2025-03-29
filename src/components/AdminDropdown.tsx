
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { initGoogleAuth, renderGoogleButton } from '@/utils/authUtils';

type AdminDropdownProps = {
  isMobile?: boolean;
  toggleMenu?: () => void;
};

export const AdminDropdown = ({ isMobile, toggleMenu }: AdminDropdownProps = {}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [googleInitialized, setGoogleInitialized] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const loginGoogleButtonRef = useRef<HTMLDivElement>(null);
  const signupGoogleButtonRef = useRef<HTMLDivElement>(null);

  // Initialize Google Auth
  useEffect(() => {
    const loadGoogleAuth = async () => {
      try {
        await initGoogleAuth();
        setGoogleInitialized(true);
      } catch (error) {
        console.error('Error initializing Google Auth:', error);
      }
    };

    loadGoogleAuth();
  }, []);

  // Render Google buttons when dialog opens
  useEffect(() => {
    if (googleInitialized && isLoginDialogOpen && loginGoogleButtonRef.current) {
      renderGoogleButton('login-google-button');
    }
  }, [googleInitialized, isLoginDialogOpen]);

  useEffect(() => {
    if (googleInitialized && isSignupDialogOpen && signupGoogleButtonRef.current) {
      renderGoogleButton('signup-google-button');
    }
  }, [googleInitialized, isSignupDialogOpen]);

  // Set up Google callback
  useEffect(() => {
    // This adds the callback to window to make it accessible from the Google Auth response
    window.handleGoogleSignIn = (response: any) => {
      const tokenPayload = JSON.parse(atob(response.credential.split('.')[1]));
      
      // Log the user in
      setIsLoggedIn(true);
      setIsLoginDialogOpen(false);
      setIsSignupDialogOpen(false);
      
      toast({
        title: "Google authentication successful",
        description: `Logged in as ${tokenPayload.email}`,
      });
      
      // Redirect to admin page after Google auth
      setTimeout(() => navigate('/admin'), 100);
    };

    return () => {
      delete window.handleGoogleSignIn;
    };
  }, [toast, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setIsLoggedIn(true);
    setIsLoginDialogOpen(false);
    
    toast({
      title: "Logged in successfully",
      description: "Welcome back, admin!",
    });
    
    // Redirect to admin page after login
    setTimeout(() => navigate('/admin'), 100);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    setIsLoggedIn(true);
    setIsSignupDialogOpen(false);
    
    toast({
      title: "Account created successfully",
      description: "You're now logged in as an admin.",
    });
    
    // Redirect to admin page after signup
    setTimeout(() => navigate('/admin'), 100);
  };

  const handleGoogleAuth = () => {
    // Simulate Google auth
    setIsLoggedIn(true);
    setIsLoginDialogOpen(false);
    setIsSignupDialogOpen(false);
    
    toast({
      title: "Google authentication successful",
      description: "You're now logged in as an admin.",
    });
    
    // Redirect to admin page after Google auth
    setTimeout(() => navigate('/admin'), 100);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    
    toast({
      title: "Logged out successfully",
      description: "You've been logged out of your admin account.",
    });
  };

  // Navigate to admin panel
  const navigateToAdmin = () => {
    if (toggleMenu) toggleMenu();
    navigate('/admin');
  };

  // Different display for mobile vs desktop
  const Trigger = isMobile ? (
    <Button 
      variant="outline" 
      className="w-full flex justify-center items-center gap-2"
      onClick={isLoggedIn ? navigateToAdmin : undefined}
    >
      <Shield className="h-4 w-4" />
      {isLoggedIn ? "Admin Panel" : "Admin Access"}
    </Button>
  ) : (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2"
      onClick={isLoggedIn ? navigateToAdmin : undefined}
    >
      <Shield className="h-4 w-4" />
      {isLoggedIn ? "Admin Panel" : "Admin"}
    </Button>
  );

  // For direct navigation on mobile when logged in
  if (isMobile && isLoggedIn) {
    return Trigger;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {Trigger}
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          {isLoggedIn ? (
            <>
              <DropdownMenuItem onClick={navigateToAdmin}>
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onSelect={() => setIsLoginDialogOpen(true)}>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsSignupDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Sign Up</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Login Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>
              Please login to access the admin panel
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">Login</Button>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div id="login-google-button" ref={loginGoogleButtonRef} className="flex justify-center"></div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Google
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Sign Up</DialogTitle>
            <DialogDescription>
              Create an admin account to manage disaster information
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSignup} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input id="signup-name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" required />
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">Sign Up</Button>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div id="signup-google-button" ref={signupGoogleButtonRef} className="flex justify-center"></div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Google
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Add this for TypeScript to recognize the global function
declare global {
  interface Window {
    handleGoogleSignIn: (response: any) => void;
  }
}
