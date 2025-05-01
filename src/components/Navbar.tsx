
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavbarAuth from './NavbarAuth';

export function Navbar() {
  return (
    <div className="border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">Disaster Management</span>
        </Link>
        
        <div className="flex-1">
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/disasters" className="text-sm font-medium transition-colors hover:text-primary">
              Disasters
            </Link>
            <Link to="/resources" className="text-sm font-medium transition-colors hover:text-primary">
              Resources
            </Link>
            <Link to="/emergency" className="text-sm font-medium transition-colors hover:text-primary">
              Emergency
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          <NavbarAuth />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
