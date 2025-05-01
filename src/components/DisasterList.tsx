
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllDisasters } from '@/services/disasterService';
import { DisasterType } from '@/components/DisasterCard';

const DisasterList = () => {
  const navigate = useNavigate();
  const { data: disasters = [], isLoading, error } = useQuery({
    queryKey: ['disasters'],
    queryFn: getAllDisasters
  });

  // Show only the top 3 disasters on the homepage
  const recentDisasters = disasters.slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-destructive h-5 w-5" />
          <h3 className="font-medium">Error loading disasters</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          There was a problem loading disaster information. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Recent Disasters</h2>
        <Button variant="outline" onClick={() => navigate('/disasters')}>
          View All
        </Button>
      </div>
      
      {recentDisasters.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No active disasters reported.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentDisasters.map((disaster) => (
            <Card key={disaster.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge 
                    variant={disaster.severity === 'critical' ? 'destructive' : 'outline'}
                    className="mb-2"
                  >
                    {disaster.severity.charAt(0).toUpperCase() + disaster.severity.slice(1)}
                  </Badge>
                  <Badge variant="outline">{disaster.type as DisasterType}</Badge>
                </div>
                <CardTitle className="line-clamp-1">{disaster.title}</CardTitle>
                <CardDescription>{disaster.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-2">{disaster.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0" onClick={() => navigate(`/disasters/${disaster.id}`)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisasterList;
