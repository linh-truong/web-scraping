export interface YoutubeVideo {
  title: string;
  youtubeVideoId: string;
  thumbnailUrl: string;
  channelTitle: string;
}

export interface YoutubePlaylist {
  title: string;
  videos: YoutubeVideo[];
}
