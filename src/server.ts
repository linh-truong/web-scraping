import { scrapePlaylistPage, scrapeResultsPage } from "./utils/youtube-scraper";

(async () => {
  const playlistUrl =
    "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth";
  const playlist = await scrapePlaylistPage(playlistUrl);

  const searchQuery = "Pop";
  const videos = await scrapeResultsPage(searchQuery);

  process.exit();
})();
