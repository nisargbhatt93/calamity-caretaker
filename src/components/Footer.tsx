
import { AlertTriangle, Github, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border mt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <AlertTriangle size={20} className="text-danger transition-all group-hover:rotate-12" />
              <span className="text-lg font-semibold">DisasterGuard</span>
            </div>
            <p className="text-muted-foreground">
              Providing essential disaster management tools and resources to help communities prepare, respond, and recover from natural and man-made disasters.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/disasters" className="text-muted-foreground hover:text-foreground transition-colors">Disasters</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Preparedness Guides</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Emergency Kits</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Educational Materials</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-muted-foreground" />
                <a href="mailto:contact@disasterguard.org" className="text-muted-foreground hover:text-foreground transition-colors">contact@disasterguard.org</a>
              </li>
              <li className="flex items-center gap-2">
                <Twitter size={16} className="text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">@DisasterGuard</a>
              </li>
              <li className="flex items-center gap-2">
                <Github size={16} className="text-muted-foreground" />
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} DisasterGuard. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
