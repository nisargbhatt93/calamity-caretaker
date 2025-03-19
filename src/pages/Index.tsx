
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import AlertBanner from '@/components/AlertBanner';
import DisasterCard, { DisasterInfo } from '@/components/DisasterCard';
import { AlertTriangle, ArrowRight, Shield, BookOpen, MapPin, Phone } from 'lucide-react';

const recentDisasters: DisasterInfo[] = [
  {
    id: '1',
    type: 'earthquake',
    title: 'Magnitude 6.5 Earthquake',
    location: 'Northern California',
    date: 'May 12, 2023',
    severity: 'high',
    description: 'A strong earthquake struck Northern California, causing significant damage to buildings and infrastructure. Several communities have reported power outages and road closures.',
  },
  {
    id: '2',
    type: 'flood',
    title: 'Coastal Flooding',
    location: 'Miami, Florida',
    date: 'April 28, 2023',
    severity: 'medium',
    description: 'Rising sea levels combined with heavy rainfall have resulted in coastal flooding throughout Miami. Evacuation orders have been issued for low-lying areas.',
  },
  {
    id: '3',
    type: 'wildfire',
    title: 'Mountain Ridge Wildfire',
    location: 'Colorado Springs, CO',
    date: 'June 3, 2023',
    severity: 'critical',
    description: 'A fast-moving wildfire has consumed over 15,000 acres of forest near Colorado Springs. Mandatory evacuations are in effect for several communities.',
  },
];

const Index = () => {
  return (
    <Layout>
      <AlertBanner 
        level="warning" 
        message="Hurricane warning in effect for the Gulf Coast. Stay informed and prepared." 
        detailsLink="/disasters/hurricane-delta" 
        className="animate-fade-in"
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-fade-in">
              Disaster Management System
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 title-gradient animate-fade-in">
              Prepare, Respond, Recover
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-100">
              A comprehensive platform providing real-time disaster information, resources, and tools to help communities 
              before, during, and after disaster events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
              <Link to="/disasters">
                <Button size="lg" className="gap-2">
                  Current Disasters
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/resources">
                <Button variant="outline" size="lg">
                  Preparedness Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How We Help</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides essential tools and resources for all phases of disaster management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-all animate-fade-up">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Early Warnings</h3>
              <p className="text-muted-foreground">
                Receive timely alerts about potential disasters in your area.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-all animate-fade-up animate-delay-100">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Preparedness</h3>
              <p className="text-muted-foreground">
                Access guides and tools to prepare yourself and your community.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-all animate-fade-up animate-delay-200">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Disaster Tracking</h3>
              <p className="text-muted-foreground">
                Monitor active disasters with real-time updates and mapping.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-all animate-fade-up animate-delay-300">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Educational Resources</h3>
              <p className="text-muted-foreground">
                Learn about different types of disasters and how to respond effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Disasters */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Disasters</h2>
              <p className="text-muted-foreground">Stay informed about recent disaster events</p>
            </div>
            <Link to="/disasters" className="text-primary flex items-center hover:underline">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDisasters.map((disaster, index) => (
              <DisasterCard 
                key={disaster.id} 
                disaster={disaster} 
                className={`animate-fade-up animate-delay-${index * 100}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Are You Ready for an Emergency?
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/80">
                Take the first step in protecting yourself, your loved ones, and your community by accessing our emergency preparedness resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/resources">
                  <Button variant="secondary" size="lg" className="gap-2">
                    Access Resources
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/emergency">
                  <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white/10 gap-2">
                    Emergency Contact
                    <Phone className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
