
import { useState } from 'react';
import Layout from '@/components/Layout';
import DisasterCard, { DisasterInfo, DisasterType } from '@/components/DisasterCard';
import { AlertTriangle, AlertCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AlertBanner from '@/components/AlertBanner';

const disasters: DisasterInfo[] = [
  {
    id: '1',
    type: 'earthquake',
    title: 'Magnitude 6.5 Earthquake',
    location: 'Northern California',
    date: 'May 12, 2023',
    severity: 'high',
    description: 'A strong earthquake struck Northern California, causing significant damage to buildings and infrastructure. Several communities have reported power outages and road closures. Emergency services are responding to affected areas.',
  },
  {
    id: '2',
    type: 'flood',
    title: 'Coastal Flooding',
    location: 'Miami, Florida',
    date: 'April 28, 2023',
    severity: 'medium',
    description: 'Rising sea levels combined with heavy rainfall have resulted in coastal flooding throughout Miami. Evacuation orders have been issued for low-lying areas. Temporary shelters have been established at local schools and community centers.',
  },
  {
    id: '3',
    type: 'wildfire',
    title: 'Mountain Ridge Wildfire',
    location: 'Colorado Springs, CO',
    date: 'June 3, 2023',
    severity: 'critical',
    description: 'A fast-moving wildfire has consumed over 15,000 acres of forest near Colorado Springs. Mandatory evacuations are in effect for several communities. Firefighters from multiple agencies are working to contain the blaze.',
  },
  {
    id: '4',
    type: 'hurricane',
    title: 'Hurricane Delta',
    location: 'Gulf Coast',
    date: 'June 10, 2023',
    severity: 'critical',
    description: 'Hurricane Delta is approaching the Gulf Coast with sustained winds of 120 mph. Storm surge warnings are in effect for coastal areas. Residents are advised to follow evacuation orders and seek shelter in designated facilities.',
  },
  {
    id: '5',
    type: 'tornado',
    title: 'Midwest Tornado Outbreak',
    location: 'Oklahoma City, OK',
    date: 'May 15, 2023',
    severity: 'high',
    description: 'A series of tornadoes touched down across the Midwest, causing severe damage to homes and businesses. Emergency response teams are conducting search and rescue operations in affected areas.',
  },
  {
    id: '6',
    type: 'other',
    title: 'Chemical Spill',
    location: 'Detroit, Michigan',
    date: 'June 2, 2023',
    severity: 'medium',
    description: 'A tanker truck accident has resulted in a chemical spill on Interstate 75. Hazardous materials teams are working to contain the spill. Nearby residents have been advised to shelter in place until the area is declared safe.',
  },
  {
    id: '7',
    type: 'flood',
    title: 'River Flooding',
    location: 'St. Louis, Missouri',
    date: 'May 5, 2023',
    severity: 'high',
    description: 'Heavy rainfall has caused the Mississippi River to overflow its banks, resulting in widespread flooding in the St. Louis area. Sandbagging efforts are underway to protect critical infrastructure and residential areas.',
  },
  {
    id: '8',
    type: 'wildfire',
    title: 'Canyon Wildfire',
    location: 'Los Angeles, California',
    date: 'June 8, 2023',
    severity: 'medium',
    description: 'A wildfire has erupted in a canyon area north of Los Angeles. Air and ground crews are responding to contain the fire. Residents in nearby areas should be prepared for possible evacuation orders.',
  },
  {
    id: '9',
    type: 'earthquake',
    title: 'Magnitude 5.2 Earthquake',
    location: 'Seattle, Washington',
    date: 'May 20, 2023',
    severity: 'low',
    description: 'A moderate earthquake was felt throughout the Seattle metropolitan area. No major damage has been reported, but authorities are conducting assessments of critical infrastructure and buildings.',
  },
];

const DisastersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<DisasterType | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredDisasters = disasters.filter((disaster) => {
    const matchesSearch = 
      disaster.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disaster.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disaster.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || disaster.type === selectedType;
    const matchesSeverity = selectedSeverity === 'all' || disaster.severity === selectedSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  return (
    <Layout>
      <AlertBanner 
        level="warning" 
        message="Hurricane warning in effect for the Gulf Coast. Stay informed and prepared." 
        detailsLink="/disasters/hurricane-delta" 
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <AlertTriangle className="mr-2 h-8 w-8 text-danger" />
                Active Disasters
              </h1>
              <p className="text-muted-foreground">
                Monitor ongoing disasters and access vital information
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Input
                placeholder="Search disasters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />

              {showFilters && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={selectedType} onValueChange={(value) => setSelectedType(value as DisasterType | 'all')}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Disaster Type</SelectLabel>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="earthquake">Earthquake</SelectItem>
                        <SelectItem value="flood">Flood</SelectItem>
                        <SelectItem value="wildfire">Wildfire</SelectItem>
                        <SelectItem value="hurricane">Hurricane</SelectItem>
                        <SelectItem value="tornado">Tornado</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Severity</SelectLabel>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Status Summary */}
          <Card className="mb-8 animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Disaster Status Overview</CardTitle>
              <CardDescription>
                Current summary of active disasters by severity level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="bg-success/10 text-success border-success/30 py-1.5">
                  <AlertCircle className="mr-1 h-3.5 w-3.5" />
                  Low: {disasters.filter(d => d.severity === 'low').length}
                </Badge>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 py-1.5">
                  <AlertCircle className="mr-1 h-3.5 w-3.5" />
                  Medium: {disasters.filter(d => d.severity === 'medium').length}
                </Badge>
                <Badge variant="outline" className="bg-danger/10 text-danger border-danger/30 py-1.5">
                  <AlertCircle className="mr-1 h-3.5 w-3.5" />
                  High: {disasters.filter(d => d.severity === 'high').length}
                </Badge>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 py-1.5">
                  <AlertCircle className="mr-1 h-3.5 w-3.5" />
                  Critical: {disasters.filter(d => d.severity === 'critical').length}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Disaster Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDisasters.length > 0 ? (
              filteredDisasters.map((disaster, index) => (
                <DisasterCard 
                  key={disaster.id} 
                  disaster={disaster} 
                  className={`animate-fade-up animate-delay-${index % 3 * 100}`}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No disasters found</h3>
                <p className="text-muted-foreground">
                  No disasters match your current search criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DisastersPage;
