var utils={titles:{common:"Popcorn Time Online",itemTitle:"Popcorn Time - Watch {{item_name}} instantly for free!"},setMetas:function(t){var e;t.title&&(e=t.title,$("title").html(e),$("meta[property='og:title']").attr("content",e),$("meta[name='twitter:title']").attr("content",e)),t.url&&($("meta[property='og:url']").attr("content",t.url),$("meta[name='twitter:url']").attr("content",t.url)),window.history.pushState({html:JSON.stringify(t),pageTitle:t.url},"https://popcorntimeonline.xyz",t.url),t.image&&$("meta[property='og:image']").attr("content",t.image)},load_script:function(t,e){var n,r=document.createElement("script");r.setAttribute("src",t),e&&(r.onreadystatechange=r.onload=function(){n||e(),n=!0}),document.getElementsByTagName("head")[0].appendChild(r)},tokenizer:function(e,t){return t.replace(/\[##([^#]+)##\]/g,function(){var t={toolbox_html:$("#watch_toolbox").html()};return e[arguments[1]]||t[arguments[1]]||""})},movie:{rateToStars:function(t){if(!t)return['<span class="icon star_empty"></span>','<span class="icon star_empty"></span>','<span class="icon star_empty"></span>','<span class="icon star_empty"></span>','<span class="icon star_empty"></span>'].join("");for(var e=Math.round(t.toFixed(1))/2,n="",r=1;r<=Math.floor(e);r++)n+='<span class="icon star"></span>';0<e%1&&(n+='<span class="icon star_half"></span>');for(r=Math.ceil(e);r<5;r++)n+='<span class="icon star_empty"></span>';return n}},msgbox:function(t){$("#msg div").html(t),$("#msg").show(),setTimeout(function(){$("#msg").hide()},5500)},url_response:{},url_request:function(t,e){utils.url_response[t]=e;try{hostApp.url_request(t)}catch(t){}},calculateTorrentHealth:function(t,e){e-=t,e=0<e?t/e:t;return t<100?"bad":100<=t&&t<200?5<e?"good":3<e?"medium":"bad":200<=t?5<e?"excellent":3<e?"good":2<e?"medium":"bad":void 0},popupwindow:function(t,e,n,r){var a=screen.width/2-n/2,o=screen.height/2-r/2;return window.open(t,e,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+n+", height="+r+", top="+o+", left="+a)}},resource={genres:["all","action","adventure","animation","comedy","crime","documentary","drama","family","fantasy","history","horror","music","mystery","romance","sci-fi","thriller","war","western"],lang2code:{af:"za",sq:"al",ar:"sa",hy:"am",cy:"uz",lt:"uz",eu:"es",be:"by",bg:"bg",bs:"bs",ca:"es",zh:"cn",hr:"hr",cs:"cz",da:"dk",nl:"nl",en:"us",et:"ee",fo:"fo",fa:"ir",fi:"fi",fr:"fr",gl:"es",de:"de",el:"gr",gu:"in",he:"il",hi:"in",hu:"hu",is:"is",id:"id",it:"it",ja:"jp",kn:"in",kk:"kz",kok:"in",ko:"kr",ky:"kz",lv:"lv",mk:"mk",ms:"my",mr:"in",mn:"mn",nb:"no",nn:"no",no:"no",pl:"pl",pt:"pt",pa:"in",ro:"ro",ru:"ru",sa:"in",sk:"sk",sl:"si",es:"es",sw:"ke",sv:"se",sr:"sr",syr:"sy",ta:"in",tt:"ru",te:"in",th:"th",tr:"tr",uk:"ua",ur:"pk",vi:"vn"}};