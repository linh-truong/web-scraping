import { scrapePlaylistPage, scrapeResultsPage } from "./youtube-scraper";

describe("Test scrapePlaylistPage", () => {
  it("should return playlist data", async () => {
    const url1 =
      "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth";
    const url2 =
      "https://www.youtube.com/playlist?list=PLFgquLnL59ak5gmnz28ZiMd59ryeTPXjT";

    const playlist1 = await scrapePlaylistPage(url1);
    const playlist2 = await scrapePlaylistPage(url2);

    expect(playlist1.title).toBeTruthy();
    expect(playlist1.videos.length).toBeTruthy();
    expect(
      playlist1.videos.every(
        item => item.youtubeVideoId && item.thumbnailUrl && !!item.title
      )
    ).toBeTruthy();
    expect(playlist2.title).toBeTruthy();
    expect(playlist2.videos.length).toBeTruthy();
    expect(
      playlist2.videos.every(
        item => item.youtubeVideoId && item.thumbnailUrl && !!item.title
      )
    ).toBeTruthy();
  }, 60000);
});

describe("Test scrapeResultsPage", () => {
  it("should return videos", async () => {
    const searchQuery1 = "LOL";
    const searchQuery2 = "";

    const videos1 = await scrapeResultsPage(searchQuery1);
    const videos2 = await scrapeResultsPage(searchQuery2);

    expect(videos1.length).toBeTruthy();
    expect(
      videos1.every(
        item => item.youtubeVideoId && item.thumbnailUrl && !!item.title
      )
    ).toBeTruthy();
    expect(videos2.length).toBeTruthy();
    expect(
      videos2.every(
        item => item.youtubeVideoId && item.thumbnailUrl && !!item.title
      )
    ).toBeTruthy();
  }, 60000);
});
