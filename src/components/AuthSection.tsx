
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuthSection = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">Welcome, {user.user_metadata?.name || "User"}!</h3>
        <p className="text-muted-foreground mb-4">
          You're logged in and have access to all disaster management features.
        </p>
        <Button asChild>
          <Link to="/admin">Go to Admin Panel</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-muted border rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-2">Log in to Manage Disasters</h3>
      <p className="text-muted-foreground mb-4">
        Sign in or create an account to access the admin panel and contribute disaster information.
      </p>
      <Button asChild>
        <Link to="/auth">Sign In / Register</Link>
      </Button>
    </div>
  );
};

export default AuthSection;
