import { useState } from 'react';
import { SiInstagram, SiFacebook } from 'react-icons/si';
import { Download, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { validateInstagramUrl, validateFacebookUrl } from '@/lib/urlValidator';
import { useVideoDownload } from '@/hooks/useVideoDownload';
import DownloadStatus from './DownloadStatus';

export default function VideoDownloader() {
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramError, setInstagramError] = useState('');
  const [facebookError, setFacebookError] = useState('');
  const [activeTab, setActiveTab] = useState('instagram');

  const { downloadVideo, isLoading, error, success, reset } = useVideoDownload();

  const handleInstagramDownload = async () => {
    setInstagramError('');
    const validation = validateInstagramUrl(instagramUrl);
    
    if (!validation.isValid) {
      setInstagramError(validation.error || 'Invalid URL');
      return;
    }

    await downloadVideo('instagram', instagramUrl);
  };

  const handleFacebookDownload = async () => {
    setFacebookError('');
    const validation = validateFacebookUrl(facebookUrl);
    
    if (!validation.isValid) {
      setFacebookError(validation.error || 'Invalid URL');
      return;
    }

    await downloadVideo('facebook', facebookUrl);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    reset();
    setInstagramError('');
    setFacebookError('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg border-2">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl md:text-3xl">Download Your Video</CardTitle>
          <CardDescription className="text-base">
            Choose your platform and paste the video URL below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="instagram" className="flex items-center gap-2">
                <SiInstagram className="w-4 h-4" />
                <span>Instagram</span>
              </TabsTrigger>
              <TabsTrigger value="facebook" className="flex items-center gap-2">
                <SiFacebook className="w-4 h-4" />
                <span>Facebook</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="instagram" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram-url" className="text-base">
                  Instagram Video URL
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="instagram-url"
                    type="text"
                    placeholder="https://www.instagram.com/p/..."
                    value={instagramUrl}
                    onChange={(e) => {
                      setInstagramUrl(e.target.value);
                      setInstagramError('');
                      reset();
                    }}
                    className="pl-10 h-12"
                    disabled={isLoading}
                  />
                </div>
                {instagramError && (
                  <p className="text-sm text-destructive">{instagramError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Example: https://www.instagram.com/p/ABC123/
                </p>
              </div>

              <Button
                onClick={handleInstagramDownload}
                disabled={!instagramUrl || isLoading}
                className="w-full h-12 text-base"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="facebook" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook-url" className="text-base">
                  Facebook Video URL
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="facebook-url"
                    type="text"
                    placeholder="https://www.facebook.com/..."
                    value={facebookUrl}
                    onChange={(e) => {
                      setFacebookUrl(e.target.value);
                      setFacebookError('');
                      reset();
                    }}
                    className="pl-10 h-12"
                    disabled={isLoading}
                  />
                </div>
                {facebookError && (
                  <p className="text-sm text-destructive">{facebookError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Example: https://www.facebook.com/watch/?v=123456789
                </p>
              </div>

              <Button
                onClick={handleFacebookDownload}
                disabled={!facebookUrl || isLoading}
                className="w-full h-12 text-base"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>

          {(error || success) && (
            <div className="mt-6">
              <DownloadStatus error={error} success={success} onReset={reset} />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <SiInstagram className="w-5 h-5" />
            <span>Instagram Supported</span>
          </div>
          <div className="flex items-center gap-2">
            <SiFacebook className="w-5 h-5" />
            <span>Facebook Supported</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          Note: Only publicly accessible videos can be downloaded. Private or restricted content cannot be processed.
        </p>
      </div>
    </div>
  );
}
