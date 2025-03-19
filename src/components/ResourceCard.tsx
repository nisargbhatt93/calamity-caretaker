
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResourceCategory = 'guide' | 'tool' | 'education' | 'training' | 'report';

export interface ResourceInfo {
  id: string;
  title: string;
  category: ResourceCategory;
  description: string;
  fileType?: 'pdf' | 'video' | 'link' | 'app';
  downloadable?: boolean;
  url: string;
}

interface ResourceCardProps {
  resource: ResourceInfo;
  className?: string;
}

const ResourceCard = ({ resource, className }: ResourceCardProps) => {
  const categoryColors = {
    guide: "bg-blue-100 text-blue-800 border-blue-200",
    tool: "bg-purple-100 text-purple-800 border-purple-200",
    education: "bg-green-100 text-green-800 border-green-200",
    training: "bg-orange-100 text-orange-800 border-orange-200",
    report: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const fileTypeIcons = {
    pdf: <FileText className="h-4 w-4" />,
    video: <FileText className="h-4 w-4" />,
    link: <ExternalLink className="h-4 w-4" />,
    app: <Download className="h-4 w-4" />,
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={categoryColors[resource.category]}>
            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
          </Badge>
          {resource.fileType && (
            <span className="text-muted-foreground">
              {fileTypeIcons[resource.fileType]}
            </span>
          )}
        </div>
        <CardTitle className="text-xl mt-2">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {resource.description}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            {resource.fileType === 'link' ? 'Visit' : 'View'}
          </a>
        </Button>
        {resource.downloadable && (
          <Button variant="outline" asChild>
            <a href={resource.url} download>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
