(function($) {
    $.fn.infinitescroll = function(options, callback) {
		
        function debug() {
            if (opts.debug) {
                window.console && console.log.call(console, arguments);
            }
        }
        function areSelectorsValid(opts) {
            for (var key in opts) {
                if (key.indexOf && key.indexOf("Selector") > -1 && $(opts[key]).length === 0) {
                    debug("Your " + key + " found no elements.");
                    return false
                }
                return true
            }
        }
        function determinePath(path) {
            if (path.match(/^(.*?page=)\d(.*)/)) {
				path = path.match(/^(.*?page=)\d(.*)/).slice(1);
				return path;
			}
			if ($.isFunction(opts.pathParse)) {
				return [path];
			} else {
				props.isInvalidPage = true;
			}
            return path;
        }
        function filterNav() {
            opts.isFiltered = true;
            return $(window).trigger("error.infscr." + opts.infid, [302]);
        }
        function isNearBottom() {
			
            var pixelsFromWindowBottomToBottom = 0 + $(document).height() - ($(props.container).scrollTop() || $(props.container.ownerDocument.body).scrollTop()) - $(window).height();
            debug("math:", pixelsFromWindowBottomToBottom/2, opts.pixelsFromNavToBottom);
            return (pixelsFromWindowBottomToBottom/2 - opts.bufferPx < opts.pixelsFromNavToBottom);
        }
        function showDoneMsg() {
            props.loadingMsg.find("img").hide();
			props.loadingMsg.find(".infscr-loading").html(opts.donetext).animate({
                opacity: 1
            },
            2000,
            function() {
                $(this).parent().fadeOut("normal");
            });
            opts.errorCallback();
        }
        function infscrSetup() {
            if (opts.isDuringAjax || opts.isInvalidPage || opts.isDone || opts.isFiltered || opts.isPaused) {
                return
            }
            if (!isNearBottom(opts, props)) {
                return
            }
            $(document).trigger("retrieve.infscr." + opts.infid);
        }
        function kickOffAjax() {
             opts.isDuringAjax = true;
			$(opts.navSelector).after(props.loadingMsg);
            props.loadingMsg.show(opts.loadingMsgRevealSpeed,
            function() {
                $(opts.navSelector).hide();
                opts.currPage++;
                debug("heading into ajax", path);
                box = $(opts.contentSelector).is("table") ? $("<tbody/>") : $("<div/>");
                frag = document.createDocumentFragment();
				if(opts.searchflag){
					if(!opts.desturl){
						opts.desturl = path.join(opts.currPage);
					}
					box.load(opts.desturl + " " + opts.itemSelector, null, loadCallback);
				}else{
					if ($.isFunction(opts.pathParse)) {
					   desturl = opts.pathParse(path.join("2"), opts.currPage);
					} else {
					   desturl = path.join(opts.currPage);
					}
					box.load(desturl + " " + opts.itemSelector, null, loadCallback);
				}
                
            });
			
        }
        function loadCallback() {
            if (opts.isDone) {
                showDoneMsg();
                return false
            } else {
                var children = box.children();
                if (children.length == 0 || children.hasClass("error404")) {
                    return $(window).trigger("error.infscr." + opts.infid, [404]);
                }
                while (box[0].firstChild) {
                    frag.appendChild(box[0].firstChild);
                }
				
				
                $(opts.contentSelector)[0].appendChild(frag);
                props.loadingMsg.fadeOut("normal");
                if (opts.animate) {
                    var scrollTo = $(window).scrollTop() + $("#infscr-loading").height() + opts.extraScrollPx + "px";
                    $("html,body").animate({
                        scrollTop: scrollTo
                    },
                    800,
                    function() {
                        opts.isDuringAjax = false;
                    })
                }
                callback.call($(opts.contentSelector)[0], children.get());
                if (!opts.animate) {
                    opts.isDuringAjax = false;
                }
				if(opts.searchflag){
					opts.desturl = $($(children.get()).find(".rowitem").prevObject[0]).attr("data-page");
				}
            }
			opts.bindCallBck();
        }
        function initPause(pauseValue) {
            if (pauseValue == "pause") {
                opts.isPaused = true;
            } else {
                if (pauseValue == "resume") {
                    opts.isPaused = false;
                } else {
                    opts.isPaused = !opts.isPaused;
                }
            }
            debug("Paused: " + opts.isPaused);
            return false
        }
        function infscrError(xhr) {
            if (!opts.isDone && xhr == 404) {
                debug("Page not found. Self-destructing...");
                showDoneMsg();
                opts.isDone = true;
                opts.currPage = 1;
                $(window).unbind("scroll.infscr." + opts.infid);
                $(document).unbind("retrieve.infscr." + opts.infid);
            }
            if (opts.isFiltered && xhr == 302) {
                debug("Filtered. Going to next instance...");
                opts.isDone = true;
                opts.currPage = 1;
                opts.isPaused = false;
                $(window).unbind("scroll.infscr." + opts.infid, infscrSetup).unbind("pause.infscr." + opts.infid).unbind("filter.infscr." + opts.infid).unbind("error.infscr." + opts.infid);
                $(document).unbind("retrieve.infscr." + opts.infid, kickOffAjax);
            }
        }
        $.browser.ie6 = $.browser.msie && $.browser.version < 7;
        var opts = $.extend({},$.infinitescroll.defaults, options),
        props = $.infinitescroll,
        box,
        frag,
        desturl,
        thisPause,
        errorStatus;
        callback = callback ||
        function() {};
        if (!areSelectorsValid(opts)) {
            return false;
        }
        props.container = document.documentElement;
        opts.contentSelector = opts.contentSelector || this;
        opts.loadMsgSelector = opts.loadMsgSelector || opts.contentSelector;
        var relurl = /(.*?\/\/).*?(\/.*)/,
        path = $(opts.nextSelector).attr("href");
        if (!path) {
            debug("Navigation selector not found");
            return
        }
        path = determinePath(path);
        props.pixelsFromNavToBottom = $(document).height() + (props.container == document.documentElement ? 0 : $(props.container).offset().top) - $(opts.navSelector).offset().top + opts.pixelsFromNavToBottom;
        props.loadingMsg = $('<div class="rel data-loading" style="display:none"><div class="infscr-loading" style="text-align:center"><img alt="Loading..." src="' + opts.loadingImg + '" /></div></div>"');
		(new Image()).src = opts.loadingImg;
        $(window).bind("scroll.infscr." + opts.infid, infscrSetup).bind("filter.infscr." + opts.infid, filterNav).bind("error.infscr." + opts.infid,
        function(event, errorStatus) {
            infscrError(errorStatus);
        }).bind("pause.infscr." + opts.infid,
        function(event, thisPause) {
            initPause(thisPause);
        }).trigger("scroll.infscr." + opts.infid);
        $(document).bind("retrieve.infscr." + opts.infid, kickOffAjax);
        return this;
    };
    $.infinitescroll = {
        defaults: {
            debug: false,
            preload: false,
            nextSelector: "div.navigation a:first",
            loadingImg: static_url+"/images/loading.gif",
            loadingText: "<em>Loading the next set of posts...</em>",
            donetext: "<em>Congratulations, you've reached the end of the internet.</em>",
            navSelector: "div.navigation",
            contentSelector: null,
            loadMsgSelector: null,
            loadingMsgRevealSpeed: "fast",
            extraScrollPx: 150,
			extraScrollBottom:150,
            itemSelector: "div.post",
            animate: false,
            pathParse: undefined,
            bufferPx: 40,
            errorCallback: function() {},
			desturl:'',
			searchflag:false,
            infid: 1,
            currPage: 1,
            isDuringAjax: false,
            isInvalidPage: false,
            isFiltered: false,
            isDone: false,
            isPaused: false,
			bindCallBck:function(){}
        },
        loadingImg: undefined,
        loadingMsg: undefined,
        container: undefined,
        currDOMChunk: null
    };
})(jQuery);