interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateInstagramUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return {
      isValid: false,
      error: 'Please enter an Instagram URL',
    };
  }

  // Check if it's a valid Instagram URL pattern
  const instagramPattern = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[a-zA-Z0-9_-]+\/?/;
  
  if (!instagramPattern.test(url)) {
    return {
      isValid: false,
      error: 'Invalid Instagram URL. Please use format: https://www.instagram.com/p/POST_ID/',
    };
  }

  return { isValid: true };
}

export function validateFacebookUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return {
      isValid: false,
      error: 'Please enter a Facebook URL',
    };
  }

  // Check if it's a valid Facebook URL pattern
  const facebookPattern = /^https?:\/\/(www\.)?(facebook|fb)\.com\/(watch|video|.*\/videos)\//;
  const facebookVideoParam = /[?&]v=\d+/;
  
  if (!facebookPattern.test(url) && !facebookVideoParam.test(url)) {
    return {
      isValid: false,
      error: 'Invalid Facebook URL. Please use a valid Facebook video link.',
    };
  }

  return { isValid: true };
}
