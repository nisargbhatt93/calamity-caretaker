
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type DisasterType = 'earthquake' | 'flood' | 'wildfire' | 'hurricane' | 'tornado' | 'other';

export interface DisasterInfo {
  id: string;
  type: DisasterType;
  title: string;
  location: string;
  date: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

interface DisasterCardProps {
  disaster: DisasterInfo;
  className?: string;
}

const DisasterCard = ({ disaster, className }: DisasterCardProps) => {
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
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <div className={cn("h-2", {
        "bg-success": disaster.severity === "low",
        "bg-warning": disaster.severity === "medium",
        "bg-danger": disaster.severity === "high",
        "bg-destructive": disaster.severity === "critical",
      })} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={severityColors[disaster.severity]}>
            <AlertCircle className="mr-1 h-3 w-3" />
            {disaster.severity.charAt(0).toUpperCase() + disaster.severity.slice(1)}
          </Badge>
          <span className="text-xl" aria-hidden="true">{typeIcons[disaster.type]}</span>
        </div>
        <CardTitle className="text-xl mt-2">{disaster.title}</CardTitle>
        <CardDescription className="flex flex-col gap-1 mt-1">
          <span className="flex items-center text-sm">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            {disaster.location}
          </span>
          <span className="flex items-center text-sm">
            <Clock className="mr-1 h-3.5 w-3.5" />
            {disaster.date}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {disaster.description}
        </p>
      </CardContent>
      <CardFooter>
        <Link to={`/disasters/${disaster.id}`} className="w-full">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DisasterCard;
