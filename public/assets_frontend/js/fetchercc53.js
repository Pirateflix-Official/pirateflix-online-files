var fetcher={scrappers:{imdb:{tv_idx:0,movies_idx:0,subtitles_idx:0,movies:["t4p_movies"],tv:["tmdb_tv"],subtitles:["ysubs"]},anime:{tv_idx:0,movies_idx:0,subtitles_idx:0,movies:["anime_movies"],tv:["anime_tv"],subtitles:[]},cartoons:{tv_idx:0,movies_idx:0,subtitles_idx:0,movies:["cartoons_movies"],tv:["cartoons_tv"],subtitles:[]}},fetch:{items:function(t,i,s,r){var o=app.config.fetcher.mode,e=fetcher.scrappers[o][t+"_idx"],p=fetcher.scrappers[o][t][e];"string"==typeof p?"function"==typeof(e=fetcher.scrappers[p])?e(i,s,null,function(e){e?(fetcher.scrappers[o][t+"_idx"]=0,r(!1,e)):(fetcher.scrappers[o][t+"_idx"]++,fetcher.fetch.items(t,i,s,r))}):(logger.log("error_no_scrapper_function_"+p),fetcher.scrappers[o][t+"_idx"]++,fetcher.fetch.items(t,i,s,r)):(fetcher.scrappers[o][t+"_idx"]=0,r("end_of_scrappers_movies"))},tv_show:function(t,i){var s={imdb:"https://api.themoviedb.org/3/tv/",anime:"https://api.themoviedb.org/3/tv/"};$.get({imdb:"https://api.themoviedb.org/3/tv/",anime:"https://api.themoviedb.org/3/tv/"}[app.config.fetcher.mode]+t+"?api_key="+app.config.api_keys.tmdb,function(e){e?i(0,e):$.get(s[app.config.fetcher.mode]+t+"?api_key="+app.config.api_keys.tmdb,function(e){e?i(0,e):i("error_t4p_tv_not_responding")},"json")},"json").fail(function(){$.get(s[app.config.fetcher.mode]+t+"?api_key="+app.config.api_keys.tmdb,function(e){e?i(0,e):i("error_t4p_tv_not_responding")},"json")})},subtitles:function(t,i){var s=app.config.fetcher.mode,e=fetcher.scrappers[s].subtitles_idx,r=fetcher.scrappers[s].subtitles[e];"string"==typeof r?"function"==typeof(e=fetcher.scrappers[r])?e(t,function(e){e&&e.length?i(e):(fetcher.scrappers[s].subtitles_idx++,fetcher.fetch.subtitles(t))}):(logger.log("error_no_scrapper_function_"+r),fetcher.scrappers[s].subtitles_idx++,fetcher.fetch.subtitles(t)):fetcher.scrappers.subtitles_idx=0}}};