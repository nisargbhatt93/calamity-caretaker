
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DisasterInfo } from '@/components/DisasterCard';
import { disasters } from '@/data/disasters';

const DisasterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const disaster = disasters.find(d => d.id === id);
  
  if (!disaster) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Disaster Not Found</h1>
          <p className="mb-6">The disaster information you are looking for could not be found.</p>
          <Button onClick={() => navigate('/disasters')}>
            <ChevronLeft className="mr-1" />
            Back to Disasters
          </Button>
        </div>
      </Layout>
    );
  }
  
  const severityColors = {
    low: "bg-success/10 text-success border-success/30",
    medium: "bg-warning/10 text-warning border-warning/30",
    high: "bg-danger/10 text-danger border-danger/30",
    critical: "bg-destructive/10 text-destructive border-destructive/30",
  };
  
  const typeIcons = {
    earthquake: "🌋",
    flood: "🌊",
    wildfire: "🔥",
    hurricane: "🌀",
    tornado: "🌪️",
    other: "⚠️",
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-6" 
          onClick={() => navigate('/disasters')}
        >
          <ChevronLeft className="mr-1" />
          Back to Disasters
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl" aria-hidden="true">{typeIcons[disaster.type]}</span>
              <Badge variant="outline" className={severityColors[disaster.severity]}>
                <AlertCircle className="mr-1 h-3 w-3" />
                {disaster.severity.charAt(0).toUpperCase() + disaster.severity.slice(1)} Severity
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{disaster.title}</h1>
            
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{disaster.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>{disaster.date}</span>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-base leading-relaxed">{disaster.description}</p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Safety Advice</h2>
              <p className="text-base leading-relaxed">
                {disaster.type === 'earthquake' && "Stay away from buildings and find open ground. Drop, cover, and hold on if you're indoors."}
                {disaster.type === 'flood' && "Move to higher ground immediately. Avoid walking or driving through flood waters."}
                {disaster.type === 'wildfire' && "Follow evacuation orders promptly. Keep windows and doors closed to prevent smoke inhalation."}
                {disaster.type === 'hurricane' && "Stay indoors away from windows. Follow evacuation orders if issued for your area."}
                {disaster.type === 'tornado' && "Seek shelter in the lowest level of a building, away from windows and exterior walls."}
                {disaster.type === 'other' && "Follow instructions from local authorities and emergency services."}
              </p>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
              <ul className="space-y-3">
                <li className="flex flex-col">
                  <span className="font-medium">Local Emergency:</span>
                  <a href="tel:911" className="text-primary hover:underline">911</a>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Disaster Response Team:</span>
                  <a href="tel:555-123-4567" className="text-primary hover:underline">555-123-4567</a>
                </li>
                <li className="flex flex-col">
                  <span className="font-medium">Emergency Relief:</span>
                  <a href="tel:555-987-6543" className="text-primary hover:underline">555-987-6543</a>
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-primary hover:underline flex items-center">
                    <span>Evacuation Routes</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline flex items-center">
                    <span>Emergency Shelters</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline flex items-center">
                    <span>First Aid Information</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DisasterDetailPage;
