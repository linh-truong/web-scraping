import puppeteer from "puppeteer";
import cheerio from "cheerio";

import { YoutubePlaylist, YoutubeVideo } from "../types";

import {
  YOUTUBE_URL,
  YOUTUBE_FEED_TRENDING_URL,
  YOUTUBE_RESULTS_URL_PREFIX
} from "../constants";
import { getVideoId } from "../utils/youtube-url.service";

const PUPPETEER_LAUNCH_OPTIONS = {
  args: ["--lang=en-US", "--no-sandbox", "--disable-setuid-sandbox"]
};
const PUPPETEER_PAGE_VIEWPORT = { width: 1280, height: 2000 };
const MAX_OF_PLAYLIST_VIDEOS = 10;
const MAX_OF_RESULTS_VIDEOS = 10;

const getPageHTML = async (pageUrl: string) => {
  const browser = await puppeteer.launch(PUPPETEER_LAUNCH_OPTIONS);
  const page = await browser.newPage();
  await page.setViewport(PUPPETEER_PAGE_VIEWPORT);
  await page.goto(pageUrl);
  const pageHTML = await page.content();
  await browser.close();
  return pageHTML;
};

export const scrapePlaylistPage = async (
  pageUrl: string
): Promise<YoutubePlaylist> => {
  const pageHTML = await getPageHTML(pageUrl);
  const playlist = extractPlaylistPageData(pageHTML);
  return playlist;
};

const extractPlaylistPageData = (pageHTML: string): YoutubePlaylist => {
  const pageHandler = cheerio.load(pageHTML);

  const playlistTitleElement = pageHandler(
    "ytd-playlist-sidebar-renderer #title"
  );
  const playlistTitle = playlistTitleElement.text();

  const playlistVideos: YoutubeVideo[] = [];
  const videoElements = pageHandler(
    "ytd-playlist-video-list-renderer ytd-playlist-video-renderer"
  );
  videoElements.each((videoIndex, videoElement) => {
    if (videoIndex >= MAX_OF_PLAYLIST_VIDEOS) {
      return false;
    }
    playlistVideos.push(extractVideoFromPlaylistPage(videoElement));
  });

  return {
    title: playlistTitle,
    videos: playlistVideos
  };
};

const extractVideoFromPlaylistPage = (
  videoElement: CheerioElement
): YoutubeVideo => {
  const videoElementHandler = cheerio.load(videoElement);

  const videoId = getVideoId(
    `${YOUTUBE_URL}${videoElementHandler("#content a#thumbnail").attr("href")}`
  );
  const videoThumbnailUrl = videoElementHandler(
    "#content a#thumbnail img#img"
  ).attr("src");

  const videoTitleElement = videoElementHandler("#content #meta #video-title");
  const videoTitle =
    videoTitleElement.attr("title") || videoTitleElement.text();

  const channelElement = videoElementHandler(
    "#content #meta #metadata #byline-container #byline a"
  ).first();
  const channelTitle = channelElement.attr("title") || channelElement.text();

  return {
    title: videoTitle,
    youtubeVideoId: videoId,
    thumbnailUrl: videoThumbnailUrl,
    channelTitle
  };
};

export const scrapeResultsPage = async (
  searchQuery: string
): Promise<YoutubeVideo[]> => {
  const normalizedSearchQuery = searchQuery
    ? searchQuery.trim().toLowerCase()
    : "";
  const pageUrl = normalizedSearchQuery
    ? `${YOUTUBE_RESULTS_URL_PREFIX}${encodeURIComponent(
        normalizedSearchQuery
      )}`
    : YOUTUBE_FEED_TRENDING_URL;
  const browser = await puppeteer.launch(PUPPETEER_LAUNCH_OPTIONS);
  const page = await browser.newPage();
  await page.setViewport(PUPPETEER_PAGE_VIEWPORT);
  await page.goto(pageUrl);
  const pageHTML = await page.content();
  await browser.close();

  const videos = extractResultsPageData(pageHTML);
  return videos;
};

const extractResultsPageData = (pageHTML: string): YoutubeVideo[] => {
  const pageHandler = cheerio.load(pageHTML);
  const videoElements = pageHandler("ytd-video-renderer");
  const videos: YoutubeVideo[] = [];
  videoElements.each((videoIndex, videoElement) => {
    if (videoIndex >= MAX_OF_RESULTS_VIDEOS) {
      return false;
    }
    videos.push(extractVideoFromResultsPage(videoElement));
  });
  return videos;
};

const extractVideoFromResultsPage = (
  videoElement: CheerioElement
): YoutubeVideo => {
  const videoElementHandler = cheerio.load(videoElement);

  const videoId = getVideoId(
    `${YOUTUBE_URL}${videoElementHandler("ytd-thumbnail #thumbnail").attr(
      "href"
    )}`
  );
  const videoThumbnailUrl = videoElementHandler(
    "ytd-thumbnail #thumbnail #img"
  ).attr("src");

  const videoTitleElement = videoElementHandler("#meta #video-title");
  const videoTitle =
    videoTitleElement.attr("title") || videoTitleElement.text();

  const channelElement = videoElementHandler(
    "ytd-video-meta-block #metadata #byline-container #byline a"
  ).first();
  const channelTitle = channelElement.attr("title") || channelElement.text();

  return {
    title: videoTitle,
    youtubeVideoId: videoId,
    thumbnailUrl: videoThumbnailUrl,
    channelTitle
  };
};
