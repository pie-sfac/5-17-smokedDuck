export interface YoutubeVideo {
  title: string;
  thumbnailUrl: string;
  description: string;
}

export interface YoutubeVideoMetadata {
  snippet: {
    title: string;
    thumbnails?: {
      default?: {
        url: string;
      };
    };
    description: string;
  };
}

export function getYoutubeVideoFromMetadata(
  youtubeVideoMetadata: YoutubeVideoMetadata
): YoutubeVideo {
  return {
    title: youtubeVideoMetadata.snippet.title,
    thumbnailUrl: youtubeVideoMetadata.snippet.thumbnails?.default?.url || '',
    description: youtubeVideoMetadata.snippet.description.slice(0, 500),
  };
}
