(function ($, window, document, undefined) {
    var pluginName = "modalBox",
        defaults = {
            effect: "slideUp",
            skin: "default",
            keyboardNav: true,
            clickImgToClose: false,
            clickOverlayToClose: true,
            onInit: function () {},
            beforeShowModal: function () {},
            afterShowModal: function (modal) {},
            beforeHideModal: function () {},
            afterHideModal: function () {},
            beforePrev: function (element) {},
            onPrev: function (element) {},
            beforeNext: function (element) {},
            onNext: function (element) {},
            errorMessage: "The requested content cannot be loaded. Please try again later.",
        };
    function showModal(element, options) {
        this.el = element;
        this.$el = $(this.el);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    showModal.prototype = {
        init: function () {
            var $this = this;
            if (!$("html").hasClass("modal-notouch")) $("html").addClass("modal-notouch");
            if ("ontouchstart" in document) $("html").removeClass("modal-notouch");
            this.$el.on("click", function (e) {
                $this.showModal(e);
            });
            if (this.options.keyboardNav) {
                $("body")
                    .off("keyup")
                    .on("keyup", function (e) {
                        var code = e.keyCode ? e.keyCode : e.which;
                        if (code == 27) $this.destructModal();
                        if (code == 37) $(".modal-prev").trigger("click");
                        if (code == 39) $(".modal-next").trigger("click");
                    });
            }
            this.options.onInit.call(this);
        },
        showModal: function (e) {
            var $this = this,
                currentLink = this.$el;
            var check = this.checkContent(currentLink);
            if (!check) return;
            e.preventDefault();
            this.options.beforeShowModal.call(this);
            var modal = this.constructModal();
            if (!modal) return;
            var content = modal.find(".modal-content");
            if (!content) return;
            $("body").addClass("modal-body-effect-" + this.options.effect);
            this.processContent(content, currentLink);
            if (this.$el.attr("data-modal-movie")) {
                var movieItems = $('[data-modal-movie="' + this.$el.attr("data-modal-movie") + '"]');
                $(".modal-nav").show();
                $(".modal-prev, #quality-button > div > label.hd")
                    .off("click")
                    .on("click", function (e) {
                        e.preventDefault();
                        $("#quality-button .switch input[type=checkbox]").trigger("click");
                        var index = movieItems.index(currentLink);
                        currentLink = movieItems.eq(index - 1);
                        if (!$(currentLink).length) currentLink = movieItems.last();
                        $.when($this.options.beforePrev.call(this, [currentLink])).done(function () {
                            $this.processContent(content, currentLink);
                            $this.options.onPrev.call(this, [currentLink]);
                        });
                    });
                $(".modal-next, #quality-button > div > label.fullhd")
                    .off("click")
                    .on("click", function (e) {
                        e.preventDefault();
                        $("#quality-button .switch input[type=checkbox]").trigger("click");
                        var index = movieItems.index(currentLink);
                        currentLink = movieItems.eq(index + 1);
                        if (!$(currentLink).length) currentLink = movieItems.first();
                        $.when($this.options.beforeNext.call(this, [currentLink])).done(function () {
                            $this.processContent(content, currentLink);
                            $this.options.onNext.call(this, [currentLink]);
                        });
                    });
            }
            setTimeout(function () {
                modal.addClass("modal-open");
                $this.options.afterShowModal.call(this, [modal]);
            }, 1);
        },
        checkContent: function (link) {
            var $this = this,
                href = link.attr("href"),
                video = href.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            if (href.match(/\.(jpeg|jpg|gif|png)$/i) !== null) {
                return true;
            } else if (video) {
                return true;
            } else if (link.attr("data-modal-type") == "ajax") {
                return true;
            } else if (href.substring(0, 1) == "#" && link.attr("data-modal-type") == "inline") {
                return true;
            } else if (link.attr("data-modal-type") == "iframe") {
                return true;
            }
            return false;
        },
        processContent: function (content, link) {
            var $this = this,
                href = link.attr("href"),
                video = href.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);
            content.html("").addClass("modal-loading");
            if (this.isHidpi() && link.attr("data-modal-hidpi")) {
                href = link.attr("data-modal-hidpi");
            }
            if (href.match(/\.(jpeg|jpg|gif|png)$/i) !== null) {
                var img = $("<img>", { src: href, class: "modal-image-display" });
                img.one("load", function () {
                    var wrap = $('<div class="modal-image" />');
                    wrap.append(img);
                    content.html(wrap).removeClass("modal-loading");
                    wrap.css({ "line-height": $(".modal-content").height() + "px", height: $(".modal-content").height() + "px" });
                    $(window).resize(function () {
                        wrap.css({ "line-height": $(".modal-content").height() + "px", height: $(".modal-content").height() + "px" });
                    });
                }).each(function () {
                    if (this.complete) $(this).load();
                });
                img.error(function () {
                    var wrap = $('<div class="modal-error"><p>' + $this.options.errorMessage + "</p></div>");
                    content.html(wrap).removeClass("modal-loading");
                });
            } else if (video) {
                var src = "",
                    classTerm = "modal-video";
                if (video[1] == "youtube") {
                    src = "//www.youtube.com/embed/" + video[4];
                    classTerm = "modal-youtube";
                }
                if (video[1] == "youtube-nocookie") {
                    src = href;
                    classTerm = "modal-youtube";
                }
                if (video[1] == "youtu") {
                    src = "//www.youtube.com/embed/" + video[3];
                    classTerm = "modal-youtube";
                }
                if (video[1] == "vimeo") {
                    src = "//player.vimeo.com/video/" + video[3];
                    classTerm = "modal-vimeo";
                }
                if (src) {
                    var iframeVideo = $("<iframe>", { src: src, class: classTerm, frameborder: 0, allowfullscreen: true, vspace: 0, hspace: 0, scrolling: "no" });
                    content.html(iframeVideo);
                    iframeVideo.load(function () {
                        content.removeClass("modal-loading");
                    });
                }
            } else if (link.attr("data-modal-type") == "ajax") {
                $.ajax({
                    url: href,
                    cache: false,
                    success: function (data) {
                        var wrap = $('<div class="modal-ajax" />');
                        wrap.append(data);
                        content.html(wrap).removeClass("modal-loading");
                        if (wrap.outerHeight() < content.height()) {
                            wrap.css({ position: "relative", top: "50%", "margin-top": -(wrap.outerHeight() / 2) + "px" });
                        }
                        $(window).resize(function () {
                            if (wrap.outerHeight() < content.height()) {
                                wrap.css({ position: "relative", top: "50%", "margin-top": -(wrap.outerHeight() / 2) + "px" });
                            }
                        });
                    },
                    error: function () {
                        var wrap = $('<div class="modal-error"><p>' + $this.options.errorMessage + "</p></div>");
                        content.html(wrap).removeClass("modal-loading");
                    },
                });
            } else if (href.substring(0, 1) == "#" && link.attr("data-modal-type") == "inline") {
                if ($(href).length) {
                    var wrap = $('<div class="modal-inline" />');
                    wrap.append($(href).clone().show());
                    content.html(wrap).removeClass("modal-loading");
                    if (wrap.outerHeight() < content.height()) {
                        wrap.css({ position: "relative", top: "50%", "margin-top": -(wrap.outerHeight() / 2) + "px" });
                    }
                    $(window).resize(function () {
                        if (wrap.outerHeight() < content.height()) {
                            wrap.css({ position: "relative", top: "50%", "margin-top": -(wrap.outerHeight() / 2) + "px" });
                        }
                    });
                } else {
                    var wrapError = $('<div class="modal-error"><p>' + $this.options.errorMessage + "</p></div>");
                    content.html(wrapError).removeClass("modal-loading");
                }
            } else if (link.attr("data-modal-type") == "iframe") {
                var iframe = $("<iframe>", { src: href, class: "modal-item", frameborder: 0, allowfullscreen: true, vspace: 0, hspace: 0, scrolling: "auto" });
                content.html(iframe);
                iframe.load(function () {
                    content.removeClass("modal-loading");
                });
            } else {
                return false;
            }
            if (link.attr("title")) {
                var resolution = link.attr("title");
                var titleWrap = $("<span>", { class: "modal-title" });
                titleWrap.append(resolution);
                $(".modal-title-wrap").html(titleWrap);
            } else {
                $(".modal-title-wrap").html("");
            }
        },
        constructModal: function () {
            if ($(".modal-overlay").length) return $(".modal-overlay");
            var overlay = $("<div>", { class: "modal-overlay modal-skin-" + this.options.skin + " modal-effect-" + this.options.effect });
            var wrap = $("<div>", { class: "modal-wrap" });
            var content = $("<div>", { class: "modal-content" });
            var nav = $('<a href="#" class="modal-nav modal-prev">Previous</a><a href="#" class="modal-nav modal-next">Next</a>');
            var close = $('<a href="#" class="modal-close" title="Close">Close</a>');
            var title = $("<div>", { class: "modal-title-wrap" });
            var isMSIE = /*@cc_on!@*/ 0;
            if (isMSIE) overlay.addClass("modal-ie");
            wrap.append(content);
            wrap.append(title);
            overlay.append(wrap);
            overlay.append(nav);
            overlay.append(close);
            $("body").append(overlay);
            var $this = this;
            if ($this.options.clickOverlayToClose) {
                overlay.on("click", function (e) {
                    if (e.target === this || $(e.target).hasClass("modal-content") || $(e.target).hasClass("modal-image")) {
                        $this.destructModal();
                    }
                });
            }
            if ($this.options.clickImgToClose) {
                overlay.on("click", function (e) {
                    if (e.target === this || $(e.target).hasClass("modal-image-display")) {
                        $this.destructModal();
                    }
                });
                }
            close.on("click", function (e) {
                e.preventDefault();
                $this.destructModal();
            });
            return overlay;
        },
        destructModal: function () {
            var $this = this;
            this.options.beforeHideModal.call(this);
            $(".modal-overlay").removeClass("modal-open");
            $(".modal-nav").hide();
            $("body").removeClass("modal-body-effect-" + $this.options.effect);
            var isMSIE = /*@cc_on!@*/ 0;
            if (isMSIE) {
                $(".modal-overlay iframe").attr("src", " ");
                $(".modal-overlay iframe").remove();
            }
            $(".modal-prev, a.modal-prev img").off("click");
            $(".modal-next, a.modal-next img").off("click");
            $(".modal-content").empty();
            this.options.afterHideModal.call(this);
        },
        isHidpi: function () {
            var mediaQuery =
                "(-webkit-min-device-pixel-ratio: 1.5),\
                              (min--moz-device-pixel-ratio: 1.5),\
                              (-o-min-device-pixel-ratio: 3/2),\
                              (min-resolution: 1.5dppx)";
            if (window.devicePixelRatio > 1) return true;
            if (window.matchMedia && window.matchMedia(mediaQuery).matches) return true;
            return false;
        },
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new showModal(this, options));
            }
        });
    };
})(jQuery, window, document),
    jQuery(document).ready(function ($) {
        $(document).on("ready" + modalVar.custom_events, function () {
            if ("venobox" === modalVar.script) {
                $.each($('a[rel*="' + modalVar.selector + '"]'), function () {
                    var frontObj = $(this)
                        .attr("rel")
                        .match(new RegExp(modalVar.selector + "\\[(movie\\-(?:[\\da-z]{1,4}))\\]", "ig"));
                    if (null !== frontObj) {
                        $(this).attr("data-gall", frontObj[0]);
                    }
                });
                $('a[rel*="' + modalVar.selector + '"]').venobox();
            } else {
                if ("modal_box" === modalVar.script) {
                    $.each($('a[rel*="' + modalVar.selector + '"]'), function () {
                        var frontObj = $(this)
                            .attr("rel")
                            .match(new RegExp(modalVar.selector + "\\[(movie\\-(?:[\\da-z]{1,4}))\\]", "ig"));
                        if (null !== frontObj) {
                            $(this).attr("data-modal-movie", frontObj[0]);
                        }
                    });
                    $('a[rel*="' + modalVar.selector + '"]').modalBox();
                }
            }
        });
        function switchVisible() {
            document.getElementById("videoplayer1") &&
                ("none" == document.getElementById("videoplayer1").style.display
                    ? ((document.getElementById("videoplayer1").style.display = "block"), (document.getElementById("videoplayer2").style.display = "none"))
                    : ((document.getElementById("videoplayer1").style.display = "none"), (document.getElementById("videoplayer2").style.display = "block")));
        }
        var checkbox = $("#quality-button .switch input");
        $("#quality-switch").on("change", function () {
            console.log("changed");
            var e = $(this).is("checked");
            e ? ($(".modal-content > iframe").attr("src", videolinkhd), switchVisible()) : ($(".modal-content > iframe").attr("src", videolink), switchVisible());
        }),
            $("#videoplayer1").click(function () {
                $(".modal-content > iframe").attr("src", videolink);
            }),
            $("#videoplayer2").click(function () {
                $(".modal-content > iframe").attr("src", videolinkhd);
            });
    });
