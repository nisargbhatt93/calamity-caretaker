
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 bg-danger/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-danger" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 title-gradient">404</h1>
        <p className="text-xl mb-6">Oops! We couldn't find that page</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" />
              Go to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
