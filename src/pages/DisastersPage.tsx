
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import DisasterCard, { DisasterType } from '@/components/DisasterCard';
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
import { getAllDisasters } from '@/services/disasterService';

const DisastersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<DisasterType | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const { data: disasters = [], isLoading, error } = useQuery({
    queryKey: ['disasters'], 
    queryFn: getAllDisasters
  });

  const filteredDisasters = disasters.filter((disaster) => {
    const matchesSearch = 
      disaster.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disaster.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disaster.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || disaster.type === selectedType;
    const matchesSeverity = selectedSeverity === 'all' || disaster.severity === selectedSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <p>Loading disasters...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-destructive/10 p-4 rounded-md text-destructive border border-destructive/20">
            <h2 className="font-semibold mb-2">Error Loading Disasters</h2>
            <p>There was a problem loading the disaster information. Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {disasters.find(d => d.severity === 'critical' && d.type === 'hurricane') && (
        <AlertBanner 
          level="warning" 
          message="Hurricane warning in effect for the Gulf Coast. Stay informed and prepared." 
          detailsLink={`/disasters/${disasters.find(d => d.type === 'hurricane')?.id}`} 
        />
      )}
      
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
