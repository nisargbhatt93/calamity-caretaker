
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmergencyContactInfo {
  id: string;
  name: string;
  phone: string;
  category: 'police' | 'fire' | 'medical' | 'disaster' | 'other';
  location?: string;
  hours?: string;
  description?: string;
}

interface EmergencyContactCardProps {
  contact: EmergencyContactInfo;
  className?: string;
}

const EmergencyContactCard = ({ contact, className }: EmergencyContactCardProps) => {
  const categoryIcons = {
    police: '👮‍♂️',
    fire: '🚒',
    medical: '🏥',
    disaster: '🆘',
    other: '📞',
  };

  const categoryNames = {
    police: 'Police',
    fire: 'Fire Department',
    medical: 'Medical',
    disaster: 'Disaster Response',
    other: 'Other',
  };

  const categoryColors = {
    police: 'bg-blue-100 text-blue-800 border-blue-200',
    fire: 'bg-red-100 text-red-800 border-red-200',
    medical: 'bg-green-100 text-green-800 border-green-200',
    disaster: 'bg-orange-100 text-orange-800 border-orange-200',
    other: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={categoryColors[contact.category]}>
            {categoryNames[contact.category]}
          </Badge>
          <span className="text-xl" aria-hidden="true">{categoryIcons[contact.category]}</span>
        </div>
        <CardTitle className="text-xl mt-2">{contact.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contact.description && (
          <p className="text-sm text-muted-foreground">
            {contact.description}
          </p>
        )}
        <div className="space-y-2">
          {contact.location && (
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{contact.location}</span>
            </div>
          )}
          {contact.hours && (
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{contact.hours}</span>
            </div>
          )}
          <div className="flex flex-col gap-2 mt-4">
            <Button asChild>
              <a href={`tel:${contact.phone}`} className="flex items-center justify-center">
                <Phone className="mr-2 h-4 w-4" />
                {contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactCard;
