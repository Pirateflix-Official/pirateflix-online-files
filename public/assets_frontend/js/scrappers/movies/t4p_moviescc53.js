fetcher.scrappers.t4p_movies = function (t, r, i, s, n) {
    "all" == t
        ? (t = !1)
        : "action" === t
        ? (t = "28")
        : "adventure" === t
        ? (t = "12")
        : "animation" === t
        ? (t = "16")
        : "comedy" === t
        ? (t = "35")
        : "crime" === t
        ? (t = "80")
        : "documentary" === t
        ? (t = "99")
        : "drama" === t
        ? (t = "18")
        : "family" === t
        ? (t = "10751")
        : "fantasy" === t
        ? (t = "14")
        : "history" === t
        ? (t = "36")
        : "horror" === t
        ? (t = "27")
        : "music" === t
        ? (t = "10402")
        : "mystery" === t
        ? (t = "9648")
        : "romance" === t
        ? (t = "10749")
        : "sci-fi" === t
        ? (t = "878")
        : "thriller" === t
        ? (t = "53")
        : "western" === t
        ? (t = "37")
        : "war" === t && (t = "10752");
    let e =
        ("top_rated" === app.config.fetcher.sortBy
            ? app.config.api_keys.tmdb_url + "discover/movie?api_key=" + app.config.api_keys.tmdb + "&sort_by=revenue.desc"
            : "now_playing" === app.config.fetcher.sortBy
            ? app.config.api_keys.tmdb_url + "movie/now_playing?api_key=" + app.config.api_keys.tmdb
            : app.config.api_keys.tmdb_url + "movie/popular?api_key=" + app.config.api_keys.tmdb) +
        "&include_adult=false&include_video=false&without_keywords=478,210024&with_original_language=en&page=" +
        ui.home.catalog.page;
    r &&
        (e =
            app.config.api_keys.tmdb_url +
            "search/movie?api_key=" +
            app.config.api_keys.tmdb +
            "&query=" +
            r +
            "&page=" +
            ui.home.catalog.page +
            "&include_adult=false&include_video=false&without_keywords=478,210024&with_original_language=en"),
        t && (e += "&with_genres=" + t),
        i && i.toString().match(/\d+/) && (e += "&page=" + i),
        $.ajax({
            url: e,
            dataType: "json",
            timeout: 9e3,
            error: function () {
                n ? s(!1) : fetcher.scrappers.t4p_movies(t, r, i, s, !0);
            },
            success: function (e) {
                const a = [],
                    o = {};
                t ? console.log(t) : r && console.log(r),
                    e.error || void 0 === e.results
                        ? n
                            ? s(!1)
                            : fetcher.scrappers.t4p_movies(t, r, i, s, !0)
                        : (e.results.forEach(function (e) {
                              let t, r;
                              if (typeof e.release_date == "undefined") {
                                  var release_date = "2022-12-07";
                              } else {
                                  var release_date = e.release_date;
                              }
                              null === e.poster_path
                                  ? console.log("no poster")
                                  : "" === e.poster_path ||
                                    null === release_date ||
                                    "" === release_date ||
                                    null === e.backdrop_path ||
                                    "" === e.backdrop_path ||
                                    0 === e.vote_average ||
                                    0 === e.vote_count ||
                                    ((t = {
                                        id: e.id,
                                        imdb: e.id,
                                        title: e.title,
                                        year: release_date.substring(0, 4) ? release_date.substring(0, 4) : "&nbsp;",
                                        runtime: "",
                                        synopsis: e.overview,
                                        voteAverage: parseFloat(e.vote_average),
                                        poster_small: app.config.api_keys.tmdb_src + "w185" + e.poster_path,
                                        poster_big: app.config.api_keys.tmdb_src + "w500" + e.poster_path,
                                        //streaming: "https://popcorntimeonline.xyz/player.php?video_id=" + e.id + "&tmdb=1",
                                        streaming: "https://vidsrc.to/embed/movie/" + e.id,
                                        quality: e.original_language,
                                        torrent: e.TorrentUrl,
                                        magnet: e.TorrentUrl,
                                        torrents: [
                                            {
                                                file: "Ex.Machina.2015.1080p.BluRay.x264.YIFY.mp4",
                                                id: "31FF6C7F8AF99BDBC2D5F022367BC6B85BD613EE",
                                                language: "",
                                                quality: e.original_language,
                                                size_bytes: e.SizeByte,
                                                subtitles: "",
                                                torrent_magnet: e.TorrentUrl,
                                                torrent_peers: e.TorrentPeers,
                                                torrent_seeds: e.TorrentSeeds,
                                                torrent_url: e.TorrentUrl,
                                                type: 0,
                                            },
                                        ],
                                        videos: {},
                                        seeders: e.TorrentSeeds,
                                        leechers: e.TorrentPeers,
                                        trailer: !!e.trailer && "https://www.youtube.com/embed/" + e.trailer + "?autoplay=1",
                                        stars: utils.movie.rateToStars(parseFloat(e.vote_average)),
                                        hasMetadata: !1,
                                        hasSubtitle: !1,
                                    }),
                                    void 0 === (r = o[e.id]) && (r = o[e.id] = t),
                                    r.quality !== t.quality && "720p" === t.quality && ((r.torrent = t.torrent), (r.quality = "720p")),
                                    (r.torrents[e.Quality] = e.TorrentUrl),
                                    -1 !== a.indexOf(r) || ui.home.catalog.items[e.id.toString()] || a.push(r));
                          }),
                          r && !a.length ? fetcher.scrappers.t4p_movies(t, encodeURIComponent($("#search_input").val()), i, s) : s(a));
            },
        });
};
