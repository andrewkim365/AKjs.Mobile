/*
Modification Date: 2018-09-20
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_DropLoad------------------------------------------*/
(function($) {
    var _absMoveY = 0;
    var win = window;
    var doc = document;
    var $win = $(win);
    var $doc = $(doc);
    $.fn.AKjs_DropLoad = function(options) {
        return new ak_DropLoad(this, options)
    };
    var ak_DropLoad = function(element, options) {
        var ak = this;
        ak.$element = element;
        ak.upInsertDOM = false;
        ak.loading = false;
        ak.isLockUp = false;
        ak.isLockDown = false;
        ak.isData = true;
        ak._scrollTop = 0;
        ak._threshold = 0;
        ak.init(options)
    };
    ak_DropLoad.prototype.init = function(options) {
        var ak = this;
        ak.opts = $.extend(true, {}, {
            scrollArea: ak.$element,
            domUp: {
                domClass: "ak-dropload-up",
                domRefresh: "↓ refresh",
                domUpdate: "↑ update",
                domLoad: "loading..."
            },
            domDown: {
                domClass: "ak-dropload-down",
                domRefresh: "↑ refresh",
                domLoad: "loading...",
                domNoData: "noData"
            },
            autoLoad: true,
            distance: 50,
            threshold: "",
            loadUpFn: "",
            loadDownFn: ""
        }, options);
        setTimeout(function() {
            $("main").removeClass("ak-scrollbar");
            $("main").unbind("touchmove");
        }, 500);
        if (ak.opts.loadDownFn != "") {
            $("." + ak.opts.domDown.domClass).remove();
            ak.$element.append('<div class="' + ak.opts.domDown.domClass + '"><div class="ak-dropload-refresh defer_03">' + ak.opts.domDown.domRefresh + "</div></div>");
            ak.$domDown = $("." + ak.opts.domDown.domClass);
        }
        if ( !! ak.$domDown && ak.opts.threshold === "") {
            ak._threshold = Math.floor(ak.$domDown.height() * 1 / 3);
        } else {
            ak._threshold = ak.opts.threshold;
        }
        if (ak.opts.scrollArea == win) {
            ak.$scrollArea = $win;
            ak._scrollContentHeight = ak.$element[0].scrollHeight;
            ak._scrollWindowHeight = doc.documentElement.clientHeight;
        } else {
            ak.$scrollArea = ak.opts.scrollArea;
            ak._scrollContentHeight = ak.$element[0].scrollHeight;
            ak._scrollWindowHeight = ak.$element.height();
        }
        fnAutoLoad(ak);
        $win.on("resize",
            function() {
                if (ak.opts.scrollArea == win) {
                    ak._scrollWindowHeight = win.innerHeight;
                } else {
                    ak._scrollWindowHeight = ak.$element.height();
                }
            });
        ak.$element.on("touchstart",
            function(e) {
                if (!ak.loading) {
                    fnTouches(e);
                    fnTouchstart(e, ak);
                }
            });
        ak.$element.on("touchmove",
            function(e) {
                if (!ak.loading) {
                    fnTouches(e, ak);
                    fnTouchmove(e, ak);
                }
            });
        ak.$element.on("touchend",
            function() {
                if (!ak.loading) {
                    fnTouchend(ak);
                }
            });
        ak.$element.on("scroll",
            function() {
                ak._scrollTop = ak.$scrollArea.scrollTop();
                if (ak.opts.loadDownFn != "" && !ak.loading && !ak.isLockDown && (ak._scrollContentHeight - ak._threshold) <= (ak._scrollWindowHeight + ak._scrollTop)) {
                    loadDown(ak);
                }
            })
    };
    function fnTouches(e) {
        if (!e.touches) {
            e.touches = e.originalEvent.touches;
        }
    }
    function fnTouchstart(e, ak) {
        ak._startY = e.touches[0].pageY;
        ak.touchScrollTop = ak.$scrollArea.scrollTop();
    }
    function fnTouchmove(e, ak) {
        ak._curY = e.touches[0].pageY;
        ak._moveY = ak._curY - ak._startY;
        if (ak._moveY > 0) {
            ak.direction = "down";
        } else {
            if (ak._moveY < 0) {
                ak.direction = "up";
            }
        }
        _absMoveY = Math.abs(ak._moveY);
        if (ak.$element.offset().top >= 0) {
            if (ak.opts.loadUpFn != "" && ak.touchScrollTop <= 0 && ak.direction == "down" && !ak.isLockUp) {
                //e.preventDefault();
                ak.$domUp = $("." + ak.opts.domUp.domClass);
                if (!ak.upInsertDOM) {
                    $("." + ak.opts.domUp.domClass).remove();
                    ak.$element.prepend('<div class="' + ak.opts.domUp.domClass + '"></div>');
                    ak.upInsertDOM = true;
                }
                fnTransition(ak.$domUp, 0);
                if (_absMoveY <= ak.opts.distance) {
                    ak._offsetY = _absMoveY;
                    ak.$domUp.html('<div class="ak-dropload-refresh defer_03">' + ak.opts.domUp.domRefresh + "</div>")
                } else {
                    if (_absMoveY > ak.opts.distance && _absMoveY <= ak.opts.distance * 2) {
                        ak._offsetY = ak.opts.distance + (_absMoveY - ak.opts.distance) * 0.5;
                        ak.$domUp.html('<div class="ak-dropload-update defer_03">' + ak.opts.domUp.domUpdate + "</div>");
                    } else {
                        ak._offsetY = ak.opts.distance + ak.opts.distance * 0.5 + (_absMoveY - ak.opts.distance * 2) * 0.2;
                    }
                }
                ak.$domUp.css({
                    "height": ak._offsetY
                })
            }
        }
    }
    function fnTouchend(ak) {
        var _absMoveY = Math.abs(ak._moveY);
        if (ak.opts.loadUpFn != "" && ak.touchScrollTop <= 0 && ak.direction == "down" && !ak.isLockUp) {
            if (ak.$element.offset().top >= 0) {
                fnTransition(ak.$domUp, 300);
                if (_absMoveY > ak.opts.distance) {
                    ak.$domUp.css({
                        "height": ak.$domUp.children().height()
                    });
                    ak.$domUp.html('<div class="ak-dropload-load defer_03"><span class="loading"></span>' + ak.opts.domUp.domLoad + "</div>");
                    ak.loading = true;
                    ak.opts.loadUpFn(ak);
                } else {
                    ak.$domUp.css({
                        "height": "0"
                    }).on("webkitTransitionEnd mozTransitionEnd transitionend",
                        function() {
                            ak.upInsertDOM = false;
                            $(this).remove();
                        })
                }
                ak._moveY = 0
            }
        } else {
            ak._scrollTop = ak.$scrollArea.scrollTop();
            if (ak.opts.loadDownFn != "" && !ak.loading && !ak.isLockDown && (ak._scrollWindowHeight + ak._scrollTop) >= (ak._scrollContentHeight + ak.$element.offset().top - ak._threshold)) {
                loadDown(ak);
            }
        }
    }
    function fnAutoLoad(ak) {
        if (ak.opts.autoLoad) {
            if ((ak._scrollContentHeight - ak._threshold) <= ak._scrollWindowHeight) {
                loadDown(ak);
            }
        }
    }
    function fnRecoverContentHeight(ak) {
        ak._scrollContentHeight = ak.$element[0].scrollHeight - _absMoveY;
    }
    function loadDown(ak) {
        ak.direction = "up";
        if (ak.$domDown) {
            ak.$domDown.html('<div class="ak-dropload-load defer_03"><span class="loading"></span>' + ak.opts.domDown.domLoad + "</div>");
            ak.loading = true;
            ak.opts.loadDownFn(ak);
        }
    }
    ak_DropLoad.prototype.lock = function(direction) {
        var ak = this;
        if (direction === undefined) {
            if (ak.direction == "up") {
                ak.isLockDown = true;
            } else {
                if (ak.direction == "down") {
                    ak.isLockUp = true;
                } else {
                    ak.isLockUp = true;
                    ak.isLockDown = true;
                }
            }
        } else {
            if (direction == "up") {
                ak.isLockUp = true
            } else {
                if (direction == "down") {
                    ak.isLockDown = true;
                    ak.direction = "up";
                }
            }
        }
    };
    ak_DropLoad.prototype.unlock = function() {
        var ak = this;
        ak.isLockUp = false;
        ak.isLockDown = false;
        ak.direction = "up";
    };
    ak_DropLoad.prototype.noData = function(flag) {
        var ak = this;
        if (flag === undefined || flag == true) {
            ak.isData = false;
        } else {
            if (flag == false) {
                ak.isData = true;
            }
        }
    };
    ak_DropLoad.prototype.resetload = function() {
        var ak = this;
        if (ak.direction == "down" && ak.upInsertDOM) {
            ak.$domUp.css({
                "height": "0"
            }).on("webkitTransitionEnd mozTransitionEnd transitionend",
                function() {
                    ak.loading = false;
                    ak.upInsertDOM = false;
                    $(this).remove();
                });
            fnRecoverContentHeight(ak);
            fnAutoLoad(ak);
        } else {
            if (ak.direction == "up") {
                ak.loading = false;
                if (ak.isData) {
                    ak.$domDown.html('<div class="ak-dropload-refresh defer_03">' + ak.opts.domDown.domRefresh + "</div>");
                    fnRecoverContentHeight(ak);
                    fnAutoLoad(ak);
                } else {
                    ak.$domDown.html('<div class="ak-dropload-noData defer_03">' + ak.opts.domDown.domNoData + "</div>");
                }
            }
        }
    };
    function fnTransition(dom, num) {
        if (dom != undefined) {
            dom.css({
                "-webkit-transition": "all " + num + "ms",
                "transition": "all " + num + "ms"
            });
        }
    }
} (jQuery));
