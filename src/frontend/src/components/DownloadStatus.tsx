import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface DownloadStatusProps {
  error?: string;
  success?: boolean;
  onReset: () => void;
}

export default function DownloadStatus({ error, success, onReset }: DownloadStatusProps) {
  if (success) {
    return (
      <Alert className="border-green-500/50 bg-green-500/10">
        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-900 dark:text-green-100">Download Started!</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          Your video download has been initiated. Check your downloads folder.
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-5 w-5" />
        <AlertTitle>Download Failed</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="mt-2"
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
