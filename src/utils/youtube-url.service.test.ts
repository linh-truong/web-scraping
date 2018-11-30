import {
  isPlaylistUrl,
  isVideoUrl,
  normalizePlaylistUrl,
  getVideoId
} from "./youtube-url.service";

describe("Test isPlaylistUrl", () => {
  it("should return true for valid url", () => {
    const playlistUrls = [
      "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
      "https://www.youtube.com/playlist?list=PLFgquLnL59ak5gmnz28ZiMd59ryeTPXjT",
      "https://www.youtube.com/watch?v=EEhZAHZQyf4&start_radio=1&list=RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs",
      "https://www.youtube.com/watch?v=W16bk86xIY0&start_radio=1&list=RDCLAK5uy_lBGRuQnsG37Akr1CY4SxL0VWFbPrbO4gs",
      "https://www.youtube.com/watch?v=3SHJ5OywydA&start_radio=1&list=RDCLAK5uy_lOAAW-PX5XUed76iQefCxkOXd6m6ZvyiM",
      "https://www.youtube.com/watch?v=WP7duqy60h8&start_radio=1&list=RDCLAK5uy_kLWIr9gv1XLlPbaDS965-Db4TrBoUTxQ8",
      "https://www.youtube.com/watch?v=9LgLcDg15SM&start_radio=1&list=RDCLAK5uy_k5vcGRXixxemtzK1eKDS7BeHys7mvYOdk",
      "https://www.youtube.com/watch?v=GcvBnhq0lFA&start_radio=1&list=RDCLAK5uy_kuEc3lB_I49bqnoy24kbjutvsiOi9ZQe0",
      "https://www.youtube.com/watch?v=acbcKrnnJAk&start_radio=1&list=RDCLAK5uy_mU14EejSbDsfLuPc9KpNzoC0o-YQvi6I4",
      "https://www.youtube.com/watch?v=WNtzg6P_Hj0&start_radio=1&list=RDCLAK5uy_n64_P7t3MmbTu7jziSk48DL-oRWO98CPE",
      "https://www.youtube.com/watch?v=wLoYIBEZEfw&start_radio=1&list=RDCLAK5uy_mk6AmqcHgCRhyJuYsQz5CCVdCF4SRGivs"
    ];
    playlistUrls.forEach(url => {
      expect(isPlaylistUrl(url)).toBeTruthy();
    });
  });
  it("should return false for invalid url", () => {
    const playlistUrls = [
      undefined,
      "",
      "https://www.npmjs.com/package/url-parse",
      "https://www.youtube.com/playlist",
      "https://www.youtube.com/watch",
      "https://www.youtube.com?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth"
    ];
    playlistUrls.forEach(url => {
      expect(isPlaylistUrl(url)).toBeFalsy();
    });
  });
});

describe("Test isVideoUrl", () => {
  it("should return true for valid url", () => {
    const playlistUrls = [
      "https://www.youtube.com/watch?v=EEhZAHZQyf4&start_radio=1&list=RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs",
      "https://www.youtube.com/watch?v=W16bk86xIY0&start_radio=1&list=RDCLAK5uy_lBGRuQnsG37Akr1CY4SxL0VWFbPrbO4gs",
      "https://www.youtube.com/watch?v=3SHJ5OywydA&start_radio=1&list=RDCLAK5uy_lOAAW-PX5XUed76iQefCxkOXd6m6ZvyiM",
      "https://www.youtube.com/watch?v=WP7duqy60h8&start_radio=1&list=RDCLAK5uy_kLWIr9gv1XLlPbaDS965-Db4TrBoUTxQ8",
      "https://www.youtube.com/watch?v=9LgLcDg15SM&start_radio=1&list=RDCLAK5uy_k5vcGRXixxemtzK1eKDS7BeHys7mvYOdk",
      "https://www.youtube.com/watch?v=GcvBnhq0lFA&start_radio=1&list=RDCLAK5uy_kuEc3lB_I49bqnoy24kbjutvsiOi9ZQe0",
      "https://www.youtube.com/watch?v=acbcKrnnJAk&start_radio=1&list=RDCLAK5uy_mU14EejSbDsfLuPc9KpNzoC0o-YQvi6I4",
      "https://www.youtube.com/watch?v=WNtzg6P_Hj0&start_radio=1&list=RDCLAK5uy_n64_P7t3MmbTu7jziSk48DL-oRWO98CPE",
      "https://www.youtube.com/watch?v=wLoYIBEZEfw&start_radio=1&list=RDCLAK5uy_mk6AmqcHgCRhyJuYsQz5CCVdCF4SRGivs"
    ];
    playlistUrls.forEach(url => {
      expect(isVideoUrl(url)).toBeTruthy();
    });
  });
  it("should return false for invalid url", () => {
    const playlistUrls = [
      undefined,
      "",
      "https://www.npmjs.com/package/url-parse",
      "https://www.youtube.com/playlist",
      "https://www.youtube.com/watch",
      "https://www.youtube.com?v=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth"
    ];
    playlistUrls.forEach(url => {
      expect(isVideoUrl(url)).toBeFalsy();
    });
  });
});

describe("Test normalizePlaylistUrl", () => {
  it("should normalize playlist url", () => {
    expect(normalizePlaylistUrl(undefined)).toEqual(undefined);
    expect(
      normalizePlaylistUrl(
        "https://www.youtube.com/playlist?list=plfgqulnl59alw3xmyiwraoz0om3h17lth"
      )
    ).toEqual(
      "https://www.youtube.com/playlist?list=plfgqulnl59alw3xmyiwraoz0om3h17lth"
    );
    expect(
      normalizePlaylistUrl(
        "https://www.youtube.com/watch?v=eehzahzqyf4&start_radio=1&list=plfgqulnl59alw3xmyiwraoz0om3h17lth"
      )
    ).toEqual(
      "https://www.youtube.com/playlist?list=plfgqulnl59alw3xmyiwraoz0om3h17lth"
    );
  });
});

describe("Test getVideoId", () => {
  it("should return video id", () => {
    expect(undefined).toEqual(undefined);
    expect(getVideoId("https://www.youtube.com/watch?v=eehzahzqyf4")).toEqual(
      "eehzahzqyf4"
    );
    expect(
      getVideoId(
        "https://www.youtube.com/watch?v=eehzahzqyf4&start_radio=1&list=plfgqulnl59alw3xmyiwraoz0om3h17lth"
      )
    ).toEqual("eehzahzqyf4");
  });
});
