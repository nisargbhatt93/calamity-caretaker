
import Layout from '@/components/Layout';
import EmergencyContactCard, { EmergencyContactInfo } from '@/components/EmergencyContactCard';
import { Phone, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AlertBanner from '@/components/AlertBanner';

const emergencyContacts: EmergencyContactInfo[] = [
  {
    id: '1',
    name: 'Emergency Services',
    phone: '911',
    category: 'other',
    description: 'For immediate emergency assistance. Call only for life-threatening situations or crimes in progress.',
    hours: '24/7',
  },
  {
    id: '2',
    name: 'Police Department',
    phone: '555-123-4567',
    category: 'police',
    location: 'City Police Headquarters',
    hours: '24/7',
    description: 'For non-emergency police assistance and reporting.',
  },
  {
    id: '3',
    name: 'Fire Department',
    phone: '555-789-1234',
    category: 'fire',
    location: 'Central Fire Station',
    hours: '24/7',
    description: 'For fire emergencies and fire safety information.',
  },
  {
    id: '4',
    name: 'Medical Emergency',
    phone: '555-456-7890',
    category: 'medical',
    location: 'City General Hospital',
    hours: '24/7',
    description: 'For medical emergencies and health consultation.',
  },
  {
    id: '5',
    name: 'Disaster Response Team',
    phone: '555-234-5678',
    category: 'disaster',
    location: 'Emergency Operations Center',
    hours: '24/7 during active disasters',
    description: 'Specialized team for coordinating disaster response efforts.',
  },
  {
    id: '6',
    name: 'Poison Control',
    phone: '800-222-1222',
    category: 'medical',
    hours: '24/7',
    description: 'For poison emergencies and information.',
  },
  {
    id: '7',
    name: 'Coast Guard',
    phone: '555-876-5432',
    category: 'other',
    location: 'Coastal Station',
    hours: '24/7',
    description: 'For maritime emergencies and water rescue.',
  },
  {
    id: '8',
    name: 'Red Cross Disaster Relief',
    phone: '555-345-6789',
    category: 'disaster',
    location: 'Local Chapter Office',
    hours: '8:00 AM - 8:00 PM, extended during disasters',
    description: 'Provides disaster relief, shelter, and resources for affected individuals.',
  },
];

const EmergencyPage = () => {
  return (
    <Layout>
      <AlertBanner 
        level="critical" 
        message="In case of immediate danger, call 911 immediately." 
        dismissible={false} 
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-danger/10 rounded-full flex items-center justify-center">
                <Phone className="h-8 w-8 text-danger" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Emergency Contacts</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick access to emergency services and resources during crisis situations.
              Always call 911 first for immediate life-threatening emergencies.
            </p>
          </div>

          {/* Emergency Instructions Card */}
          <Card className="mb-12 border-danger animate-fade-in">
            <CardHeader className="bg-danger/5 border-b border-danger/20">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-danger" />
                <CardTitle>Emergency Instructions</CardTitle>
              </div>
              <CardDescription>
                Follow these steps during an emergency situation
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ol className="space-y-4 list-decimal list-inside">
                <li className="pl-2">
                  <span className="font-medium">Stay calm and assess the situation.</span>
                  <p className="text-muted-foreground ml-6 mt-1">Take deep breaths and evaluate the immediate dangers.</p>
                </li>
                <li className="pl-2">
                  <span className="font-medium">Call emergency services if needed (911).</span>
                  <p className="text-muted-foreground ml-6 mt-1">Provide clear, concise information about your emergency.</p>
                </li>
                <li className="pl-2">
                  <span className="font-medium">Move to a safe location if necessary.</span>
                  <p className="text-muted-foreground ml-6 mt-1">Follow evacuation routes and safety protocols.</p>
                </li>
                <li className="pl-2">
                  <span className="font-medium">Follow official instructions and alerts.</span>
                  <p className="text-muted-foreground ml-6 mt-1">Monitor emergency broadcasts for updates and guidance.</p>
                </li>
                <li className="pl-2">
                  <span className="font-medium">Help others if it's safe to do so.</span>
                  <p className="text-muted-foreground ml-6 mt-1">Assist vulnerable individuals like children, elderly, or disabled persons.</p>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Primary Emergency Button */}
          <div className="mb-12 text-center">
            <Button size="lg" variant="destructive" className="text-lg py-6 px-8 animate-pulse">
              <Phone className="mr-2 h-5 w-5" />
              Call 911 for Immediate Emergency
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              For life-threatening emergencies only
            </p>
          </div>

          {/* Emergency Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <EmergencyContactCard 
                key={contact.id} 
                contact={contact}
                className={`animate-fade-up animate-delay-${index % 4 * 100}`}
              />
            ))}
          </div>

          {/* Safety Tips */}
          <Card className="mt-12 bg-secondary/40 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>General Safety Tips</CardTitle>
              </div>
              <CardDescription>
                Important safety guidelines for various situations
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Home Safety</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Install and maintain smoke detectors and carbon monoxide alarms</li>
                    <li>Create and practice a family emergency evacuation plan</li>
                    <li>Keep a fire extinguisher accessible and know how to use it</li>
                    <li>Store emergency supplies including water, food, and medications</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Outdoor Safety</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Monitor weather alerts before outdoor activities</li>
                    <li>Seek shelter immediately during lightning or severe weather</li>
                    <li>Stay hydrated and protected from extreme temperatures</li>
                    <li>Be aware of your surroundings and potential hazards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyPage;
