export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (
  query: string = 'programming',
  maxResults: number = 20,
  pageToken?: string
): Promise<YouTubeSearchResponse> => {
  if (!API_KEY) {
    throw new Error('YouTube API key is not configured. Please set REACT_APP_YOUTUBE_API_KEY in your .env file');
  }

  // Security check: Ensure we're not using placeholder key
  if (API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('Please replace YOUR_API_KEY_HERE with your actual YouTube API key in the .env file');
  }

  const params = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    q: query,
    key: API_KEY,
    maxResults: maxResults.toString(),
  });

  if (pageToken) {
    params.append('pageToken', pageToken);
  }

  // Security: Never log the full URL with API key
  console.log(`🔍 Fetching videos for query: "${query}" (${maxResults} results)`);

  const response = await fetch(`${BASE_URL}/search?${params}`);
  
  if (!response.ok) {
    // Security: Don't expose API key in error messages
    throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const formatPublishedDate = (publishedAt: string): string => {
  const date = new Date(publishedAt);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};