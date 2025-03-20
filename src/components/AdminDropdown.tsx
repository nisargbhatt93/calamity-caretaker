
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type AdminDropdownProps = {
  isMobile?: boolean;
  toggleMenu?: () => void;
};

export const AdminDropdown = ({ isMobile, toggleMenu }: AdminDropdownProps = {}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    navigate('/admin');
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
    navigate('/admin');
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
    navigate('/admin');
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
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGoogleAuth}
                className="w-full"
              >
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
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGoogleAuth}
                className="w-full"
              >
                Google
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
