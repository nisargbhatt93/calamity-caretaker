
import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type AlertLevel = 'info' | 'warning' | 'critical';

interface AlertBannerProps {
  level: AlertLevel;
  message: string;
  detailsLink?: string;
  className?: string;
  dismissible?: boolean;
}

const AlertBanner = ({
  level,
  message,
  detailsLink,
  className,
  dismissible = true,
}: AlertBannerProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  const levelStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-warning/10 border-warning/20 text-black',
    critical: 'bg-danger/10 border-danger/20 text-danger-foreground',
  };

  return (
    <div 
      className={cn(
        'border px-4 py-3 flex items-center justify-between',
        levelStyles[level],
        className
      )}
    >
      <div className="flex items-center gap-3">
        <AlertTriangle 
          className={cn({
            'text-blue-500': level === 'info',
            'text-warning': level === 'warning',
            'text-danger': level === 'critical',
          })} 
        />
        <span>{message}</span>
      </div>
      <div className="flex items-center gap-2">
        {detailsLink && (
          <a 
            href={detailsLink}
            className="text-sm font-medium underline underline-offset-4"
          >
            Details
          </a>
        )}
        {dismissible && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setDismissed(true)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;
