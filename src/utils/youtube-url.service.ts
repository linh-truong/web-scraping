import Url from "url-parse";

import {
  YOUTUBE_HOSTNAME,
  YOUTUBE_PLAYLIST_ID_PARAM,
  YOUTUBE_PLAYLIST_URL_PREFIX,
  YOUTUBE_PLAYLIST_PATHNAME,
  YOUTUBE_WATCH_PATHNAME,
  YOUTUBE_VIDEO_ID_PARAM
} from "../constants";

export const isPlaylistUrl = (playlistUrl: string) => {
  if (!playlistUrl) {
    return false;
  }
  const { hostname, pathname, query } = parseUrl(playlistUrl, false);
  return (
    hostname === YOUTUBE_HOSTNAME &&
    (pathname === YOUTUBE_PLAYLIST_PATHNAME ||
      pathname === YOUTUBE_WATCH_PATHNAME) &&
    !!query[YOUTUBE_PLAYLIST_ID_PARAM]
  );
};

export const isVideoUrl = (videoUrl: string) => {
  if (!videoUrl) {
    return false;
  }
  const { hostname, pathname, query } = parseUrl(videoUrl, false);
  return (
    hostname === YOUTUBE_HOSTNAME &&
    pathname === YOUTUBE_WATCH_PATHNAME &&
    !!query[YOUTUBE_VIDEO_ID_PARAM]
  );
};

export const normalizePlaylistUrl = (playlistUrl: string) => {
  const playlistId = getPlaylistId(playlistUrl);
  if (!playlistId) {
    return undefined;
  }
  return `${YOUTUBE_PLAYLIST_URL_PREFIX}${playlistId}`;
};

const getPlaylistId = (playlistUrl: string) => {
  if (!isPlaylistUrl(playlistUrl)) {
    return undefined;
  }
  const { query } = parseUrl(playlistUrl);
  const playlistIdKey = Object.keys(query).find(
    key => key.toLowerCase() === YOUTUBE_PLAYLIST_ID_PARAM
  );
  return query[playlistIdKey];
};

export const getVideoId = (videoUrl: string) => {
  if (!isVideoUrl(videoUrl)) {
    return undefined;
  }
  const { query } = parseUrl(videoUrl);
  const videoIdKey = Object.keys(query).find(
    key => key.toLowerCase() === YOUTUBE_VIDEO_ID_PARAM
  );
  return query[videoIdKey];
};

const parseUrl = (sourceUrl: string, isCaseSensitive: boolean = true): Url =>
  new Url(
    isCaseSensitive ? sourceUrl.trim() : sourceUrl.trim().toLowerCase(),
    "",
    true
  );
