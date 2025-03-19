
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AdminDropdown } from '@/components/AdminDropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
      scrolled ? 'glass py-3' : 'bg-transparent py-5'
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <AlertTriangle size={24} className="text-danger transition-all group-hover:rotate-12" />
          <span className="text-xl font-semibold">DisasterGuard</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          <NavLinks />
          <AdminDropdown />
          <Link to="/emergency">
            <Button variant="destructive" className="shadow-md hover:shadow-lg transition-all">
              Emergency
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMenu} 
          className="md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={cn(
        'md:hidden absolute w-full bg-background/95 backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden shadow-lg',
        isOpen ? 'max-h-screen py-6' : 'max-h-0'
      )}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <MobileNavLinks toggleMenu={toggleMenu} />
          <div className="py-2">
            <AdminDropdown isMobile={true} toggleMenu={toggleMenu} />
          </div>
          <Link to="/emergency" onClick={toggleMenu}>
            <Button variant="destructive" className="w-full shadow-md">
              Emergency
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link to="/" className="hover:text-primary/80 transition-colors">Home</Link>
      <Link to="/disasters" className="hover:text-primary/80 transition-colors">Disasters</Link>
      <Link to="/resources" className="hover:text-primary/80 transition-colors">Resources</Link>
      <Link to="/about" className="hover:text-primary/80 transition-colors">About</Link>
    </>
  );
};

const MobileNavLinks = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <>
      <Link 
        to="/" 
        className="py-2 hover:text-primary/80 transition-colors" 
        onClick={toggleMenu}
      >
        Home
      </Link>
      <Link 
        to="/disasters" 
        className="py-2 hover:text-primary/80 transition-colors" 
        onClick={toggleMenu}
      >
        Disasters
      </Link>
      <Link 
        to="/resources" 
        className="py-2 hover:text-primary/80 transition-colors" 
        onClick={toggleMenu}
      >
        Resources
      </Link>
      <Link 
        to="/about" 
        className="py-2 hover:text-primary/80 transition-colors" 
        onClick={toggleMenu}
      >
        About
      </Link>
    </>
  );
};

export default Navbar;
