import { useState } from 'react';
import { useActor } from './useActor';

type Platform = 'instagram' | 'facebook';

export function useVideoDownload() {
  const { actor } = useActor();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const extractVideoId = (url: string, platform: Platform): string => {
    if (platform === 'instagram') {
      // Extract post ID from Instagram URL
      // Example: https://www.instagram.com/p/ABC123/ -> ABC123
      const match = url.match(/\/p\/([^/?]+)/);
      return match ? match[1] : url;
    } else {
      // Extract video ID from Facebook URL
      // Example: https://www.facebook.com/watch/?v=123456789 -> 123456789
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) return match[1];
      
      // Alternative format: https://www.facebook.com/video.php?v=123456789
      const altMatch = url.match(/video\.php\?v=([^&]+)/);
      if (altMatch) return altMatch[1];
      
      // Try to extract from path
      const pathMatch = url.match(/\/videos\/(\d+)/);
      return pathMatch ? pathMatch[1] : url;
    }
  };

  const downloadVideo = async (platform: Platform, url: string) => {
    if (!actor) {
      setError('Backend connection not available. Please refresh the page.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const videoId = extractVideoId(url, platform);
      let downloadUrl: string;

      if (platform === 'instagram') {
        downloadUrl = await actor.getInstagramDownloadLink(videoId);
      } else {
        downloadUrl = await actor.getFacebookDownloadLink(videoId);
      }

      // Parse the response to extract the actual video URL
      // The backend returns the raw HTTP response as text
      if (!downloadUrl || downloadUrl.trim() === '') {
        throw new Error('No download link received from server');
      }

      // Try to parse as JSON to extract video URL
      try {
        const jsonResponse = JSON.parse(downloadUrl);
        
        // For Instagram, look for video_url in various possible locations
        if (platform === 'instagram') {
          const videoUrl = jsonResponse?.graphql?.shortcode_media?.video_url ||
                          jsonResponse?.items?.[0]?.video_versions?.[0]?.url ||
                          jsonResponse?.video_url;
          
          if (videoUrl) {
            initiateDownload(videoUrl, `instagram-video-${videoId}.mp4`);
            setSuccess(true);
            return;
          }
        }
        
        // For Facebook, look for source field
        if (platform === 'facebook') {
          const videoUrl = jsonResponse?.source || jsonResponse?.data?.source;
          
          if (videoUrl) {
            initiateDownload(videoUrl, `facebook-video-${videoId}.mp4`);
            setSuccess(true);
            return;
          }
        }
      } catch (parseError) {
        // If not JSON, treat as direct URL
        if (downloadUrl.startsWith('http')) {
          initiateDownload(downloadUrl, `${platform}-video-${videoId}.mp4`);
          setSuccess(true);
          return;
        }
      }

      throw new Error('Could not extract video URL from response. The video may be private or unavailable.');
    } catch (err) {
      console.error('Download error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to download video';
      
      if (errorMessage.includes('private') || errorMessage.includes('unavailable')) {
        setError('This video is private or unavailable. Only public videos can be downloaded.');
      } else if (errorMessage.includes('not found')) {
        setError('Video not found. Please check the URL and try again.');
      } else {
        setError('Failed to download video. Please check the URL and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const initiateDownload = (url: string, filename: string) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setError('');
    setSuccess(false);
  };

  return {
    downloadVideo,
    isLoading,
    error,
    success,
    reset,
  };
}
