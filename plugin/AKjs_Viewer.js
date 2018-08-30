/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Viewer-------------------------------------------*/
(function($){
    function aL(a) {
        return "string" == typeof a
    }
    function a1(a) {
        return "number" == typeof a && !isNaN(a)
    }
    function aM(a) {
        return "undefined" == typeof a
    }
    function aR(b, a) {
        var c = [];
        return a1(a) && c.push(a),
            c.slice.apply(b, c)
    }
    function aQ(b, a) {
        var c = aR(arguments, 2);
        return function() {
            return b.apply(a, c.concat(aR(arguments)))
        }
    }
    function a5(b) {
        var a = [],
            c = b.rotate,
            e = b.scaleX,
            d = b.scaleY;
        return a1(c) && a.push("rotate(" + c + "deg)"),
        a1(e) && a1(d) && a.push("scale(" + e + "," + d + ")"),
            a.length ? a.join(" ") : "none"
    }
    function aX(a) {
        return a.offsetWidth
    }
    function aN(a) {
        return aL(a) ? a.replace(/^.*\//, "").replace(/[\?&#].*$/, "") : ""
    }
    function aT(b, a) {
        var c;
        return b.naturalWidth ? a(b.naturalWidth, b.naturalHeight) : (c = document.createElement("img"), c.onload = function() {
            a(this.width, this.height)
        },
            void(c.src = b.src))
    }
    function a2(a) {
        var c = a.length,
            b = 0,
            d = 0;
        return c && ($.each(a,
            function(f, e) {
                b += e.pageX,
                    d += e.pageY
            }), b /= c, d /= c),
            {
                pageX: b,
                pageY: d
            }
    }
    function a3(a) {
        switch (a) {
            case 2:
                return aH;
            case 3:
                return aD;
            case 4:
                return az
        }
    }
    function aK(a, b) {
        this.$element = $(a),
            this.options = $.extend({},
                aK.defaults, $.isPlainObject(b) && b),
            this.isImg = !1,
            this.isBuilt = !1,
            this.isShown = !1,
            this.isViewed = !1,
            this.isFulled = !1,
            this.isPlayed = !1,
            this.wheeling = !1,
            this.playing = !1,
            this.fading = !1,
            this.tooltiping = !1,
            this.transitioning = !1,
            this.action = !1,
            this.target = !1,
            this.timeout = !1,
            this.index = 0,
            this.length = 0,
            this.init()
    }
    var aS = $(window),
        aJ = $(document),
        aZ = "viewer",
        aY = document.createElement(aZ),
        aI = "fix",
        aP = "scrolling_touch",
        a4 = "dis_block_im",
        aG = "dis_none_im",
        aH = "ak-viewer-hide-xs-down",
        aD = "ak-viewer-hide-sm-down",
        az = "ak-viewer-hide-md-down",
        aF = "ak-viewer-fade",
        aw = "ak-viewer-in",
        ac = "ak-viewer-move",
        aU = "ak-viewer-active",
        at = "ak-viewer-invisible",
        ad = "ak-viewer-transition",
        al = "ak-viewer-fullscreen",
        ah = "ak-viewer-fullscreen-exit",
        af = "ak-viewer-close",
        ax = "img",
        ai = "mousedown touchstart pointerdown MSPointerDown",
        ay = "mousemove touchmove pointermove MSPointerMove",
        ap = "mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",
        aO = "wheel mousewheel DOMMouseScroll",
        aj = "transitionend",
        ao = "load." + aZ,
        ae = "keydown." + aZ,
        a6 = "click." + aZ,
        aV = "resize." + aZ,
        aB = "build." + aZ,
        aA = "built." + aZ,
        au = "show." + aZ,
        ag = "shown." + aZ,
        an = "hide." + aZ,
        am = "hidden." + aZ,
        ab = "view." + aZ,
        aq = "viewed." + aZ,
        ak = "undefined" != typeof aY.style.transition,
        av = Math.round,
        ar = Math.sqrt,
        aE = Math.abs,
        aa = Math.min,
        a0 = Math.max,
        aC = Number;
    aK.prototype = {
        constructor: aK,
        init: function() {
            var c = this.options,
                f = this.$element,
                d = f.is(ax),
                h = d ? f: f.find(ax),
                g = h.length,
                b = $.proxy(this.ready, this);
            g && ($.isFunction(c.build) && f.one(aB, c.build), this.trigger(aB).isDefaultPrevented() || (ak || (c.transition = !1), this.isImg = d, this.length = g, this.count = 0, this.$images = h, this.$body = $("main"), c.inline ? (f.one(aA, $.proxy(function() {
                    this.view()
                },
                this)), h.each(function() {
                this.complete ? b() : $(this).one(ao, b)
            })) : f.on(a6, $.proxy(this.start, this))))
        },
        ready: function() {
            this.count++,
            this.count === this.length && this.build()
        },
        build: function() {
            var c, j, f, l, k, b, d = this.options,
                g = this.$element;
            this.isBuilt || (this.$parent = c = g.parent(), this.$viewer = j = $(aK.template), this.$canvas = j.find(".ak-viewer-canvas"), this.$footer = j.find(".ak-viewer-footer"), this.$title = f = j.find(".ak-viewer-title"), this.$toolbar = l = j.find(".ak-viewer-toolbar"), this.$navbar = k = j.find(".ak-viewer-navbar"), this.$button = b = j.find(".ak-viewer-button"), this.$tooltip = j.find(".ak-viewer-tooltip"), this.$player = j.find(".ak-viewer-player"), this.$list = j.find(".ak-viewer-list"), f.addClass(d.title ? a3(d.title) : aG), l.addClass(d.toolbar ? a3(d.toolbar) : aG), l.find("li[class*=zoom]").toggleClass(at, !d.zoomable), l.find("li[class*=flip]").toggleClass(at, !d.scalable), d.rotatable || l.find("li[class*=rotate]").addClass(at).appendTo(l), k.addClass(d.navbar ? a3(d.navbar) : aG), d.inline ? (b.addClass(al), j.css("z-index", d.zIndexInline), "static" === c.css("position") && c.css("position", "relative")) : (b.addClass(af), j.css("z-index", d.zIndex).addClass([aI, aF, aG].join(" "))), $("body").append(j), d.inline && (this.render(), this.bind(), this.isShown = !0), this.isBuilt = !0, $.isFunction(d.built) && g.one(aA, d.built), this.trigger(aA))
        },
        unbuild: function() {
            var b = this.options,
                a = this.$element;
            this.isBuilt && (b.inline && a.removeClass(aG), this.$viewer.remove())
        },
        bind: function() {
            var a = this.options,
                b = this.$element;
            $.isFunction(a.view) && b.on(ab, a.view),
            $.isFunction(a.viewed) && b.on(aq, a.viewed),
                this.$viewer.on(a6, $.proxy(this.click, this)).on(aO, $.proxy(this.wheel, this)),
                this.$canvas.on(ai, $.proxy(this.mousedown, this)),
                aJ.on(ay, this._mousemove = aQ(this.mousemove, this)).on(ap, this._mouseup = aQ(this.mouseup, this)).on(ae, this._keydown = aQ(this.keydown, this)),
                aS.on(aV, this._resize = aQ(this.resize, this))
        },
        unbind: function() {
            var a = this.options,
                b = this.$element;
            $.isFunction(a.view) && b.off(ab, a.view),
            $.isFunction(a.viewed) && b.off(aq, a.viewed),
                this.$viewer.off(a6, this.click).off(aO, this.wheel),
                this.$canvas.off(ai, this.mousedown),
                aJ.off(ay, this._mousemove).off(ap, this._mouseup).off(ae, this._keydown),
                aS.off(aV, this._resize)
        },
        render: function() {
            this.initContainer(),
                this.initViewer(),
                this.initList(),
                this.renderViewer()
        },
        initContainer: function() {
            this.container = {
                width: aS.innerWidth(),
                height: aS.innerHeight()
            }
        },
        initViewer: function() {
            var a, c = this.options,
                b = this.$parent;
            c.inline && (this.parent = a = {
                width: a0(b.width(), c.minWidth),
                height: a0(b.height(), c.minHeight)
            }),
            (this.isFulled || !a) && (a = this.container),
                this.viewer = $.extend({},
                    a)
        },
        renderViewer: function() {
            this.options.inline && !this.isFulled && this.$viewer.css(this.viewer)
        },
        initList: function() {
            var b = this.options,
                a = this.$element,
                d = this.$list,
                c = [];
            this.$images.each(function(g) {
                var j = this.src,
                    e = this.alt || aN(j),
                    f = b.url;
                j && (aL(f) ? f = this.getAttribute(f) : $.isFunction(f) && (f = f.call(this, this)), c.push('<li><img src="' + j + '" data-action="view" data-index="' + g + '" data-url="' + (f || j) + '" alt="' + e + '"></li>'))
            }),
                d.html(c.join("")).find(ax).one(ao, {
                        filled: !0
                    },
                    $.proxy(this.loadImage, this)),
                this.$items = d.children(),
            b.transition && a.one(aq,
                function() {
                    d.addClass(ad)
                })
        },
        renderList: function(b) {
            var a = b || this.index,
                d = this.$items.eq(a).width(),
                c = d + 1;
            this.$list.css({
                width: c * (this.length + 1),
                marginLeft: (this.viewer.width - d) / 2 - c * a
            })
        },
        resetList: function() {
            this.$list.empty().removeClass(ad).css("margin-left", 0)
        },
        initImage: function(c) {
            var j = this.options,
                f = this.$image,
                l = this.viewer,
                k = this.$footer.height(),
                b = l.width,
                d = a0(l.height - k, k),
                g = this.image || {};
            aT(f[0], $.proxy(function(h, r) {
                    var p, a, m = h / r,
                        q = b,
                        e = d;
                    d * m > b ? e = b / m: q = d * m,
                        q = aa(0.9 * q, h),
                        e = aa(0.9 * e, r),
                        a = {
                            naturalWidth: h,
                            naturalHeight: r,
                            aspectRatio: m,
                            ratio: q / h,
                            width: q,
                            height: e,
                            left: (b - q) / 2,
                            top: (d - e) / 2
                        },
                        p = $.extend({},
                            a),
                    j.rotatable && (a.rotate = g.rotate || 0, p.rotate = 0),
                    j.scalable && (a.scaleX = g.scaleX || 1, a.scaleY = g.scaleY || 1, p.scaleX = 1, p.scaleY = 1),
                        this.image = a,
                        this.initialImage = p,
                    $.isFunction(c) && c()
                },
                this))
        },
        renderImage: function(a) {
            var c = this.image,
                b = this.$image;
            b.css({
                width: c.width,
                height: c.height,
                marginLeft: c.left,
                marginTop: c.top,
                transform: a5(c)
            });
            $.isFunction(a) && (this.transitioning ? b.one(aj, a) : a())
        },
        resetImage: function() {
            this.$image.remove();
            this.$image = null
        },
        start: function(a) {
            var b = a.target;
            $(b).is("img") && (this.target = b, this.show())
        },
        click: function(a) {
            var c = $(a.target),
                b = c.data("action"),
                d = this.image;
            switch (b) {
                case "mix":
                    this.isPlayed ? this.stop() : this.options.inline ? this.isFulled ? this.exit() : this.full() : this.hide();
                    break;
                case "view":
                    this.view(c.data("index"));
                    break;
                case "zoom-in":
                    this.zoom(0.1, !0);
                    break;
                case "zoom-out":
                    this.zoom( - 0.1, !0);
                    break;
                case "one-to-one":
                    this.toggle();
                    break;
                case "reset":
                    this.reset();
                    break;
                case "prev":
                    this.prev();
                    break;
                case "play":
                    this.play();
                    break;
                case "next":
                    this.next();
                    break;
                case "rotate-left":
                    this.rotate( - 90);
                    break;
                case "rotate-right":
                    this.rotate(90);
                    break;
                case "flip-horizontal":
                    this.scaleX( - d.scaleX || -1);
                    break;
                case "flip-vertical":
                    this.scaleY( - d.scaleY || -1);
                    break;
                default:
                    this.isPlayed && this.stop()
            }
        },
        load: function() {
            var a = this.options,
                c = this.viewer,
                b = this.$image;
            this.timeout && (clearTimeout(this.timeout), this.timeout = !1),
                b.removeClass(at).css("cssText", "width:0;height:0;margin-left:" + c.width / 2 + "px;margin-top:" + c.height / 2 + "px;max-width:none!important;visibility:visible;"),
                this.initImage($.proxy(function() {
                        b.toggleClass(ad, a.transition).toggleClass(ac, a.movable),
                            this.renderImage($.proxy(function() {
                                    this.isViewed = !0,
                                        this.trigger(aq)
                                },
                                this))
                    },
                    this))
        },
        loadImage: function(c) {
            var g = c.target,
                f = $(g),
                k = f.parent(),
                j = k.width(),
                b = k.height(),
                d = c.data && c.data.filled;
            aT(g,
                function(h, a) {
                    var m = h / a,
                        o = j,
                        l = b;
                    b * m > j ? d ? o = b * m: l = j / m: d ? l = j / m: o = b * m,
                        f.css({
                            width: o,
                            height: l,
                            marginLeft: (j - o) / 2,
                            marginTop: (b - l) / 2
                        })
                })
        },
        resize: function() {
            this.initContainer(),
                this.initViewer(),
                this.renderViewer(),
                this.renderList(),
                this.initImage($.proxy(function() {
                        this.renderImage()
                    },
                    this)),
            this.isPlayed && this.$player.find(ax).one(ao, $.proxy(this.loadImage, this)).trigger(ao)
        },
        wheel: function(a) {
            var c = a.originalEvent || a,
                b = aC(this.options.zoomRatio) || 0.1,
                d = 1;
            this.isViewed && (a.preventDefault(), this.wheeling || (this.wheeling = !0, setTimeout($.proxy(function() {
                    this.wheeling = !1
                },
                this), 50), c.deltaY ? d = c.deltaY > 0 ? 1 : -1 : c.wheelDelta ? d = -c.wheelDelta / 120 : c.detail && (d = c.detail > 0 ? 1 : -1), this.zoom( - d * b, !0, a)))
        },
        keydown: function(b) {
            var a = this.options,
                c = b.which;
            if (this.isFulled && a.keyboard) {
                switch (c) {
                    case 27:
                        this.isPlayed ? this.stop() : a.inline ? this.isFulled && this.exit() : this.hide();
                        break;
                    case 32:
                        this.isPlayed && this.stop();
                        break;
                    case 37:
                        this.prev();
                        break;
                    case 38:
                        b.preventDefault(),
                            this.zoom(a.zoomRatio, !0);
                        break;
                    case 39:
                        this.next();
                        break;
                    case 40:
                        b.preventDefault(),
                            this.zoom( - a.zoomRatio, !0);
                        break;
                    case 48:
                    case 49:
                        (b.ctrlKey || b.shiftKey) && (b.preventDefault(), this.toggle())
                }
            }
        },
        mousedown: function(d) {
            var c, g = this.options,
                f = d.originalEvent,
                j = f && f.touches,
                h = d,
                b = g.movable ? "move": !1;
            if (this.isViewed) {
                if (j) {
                    if (c = j.length, c > 1) {
                        if (!g.zoomable || 2 !== c) {
                            return
                        }
                        h = j[1],
                            this.startX2 = h.pageX,
                            this.startY2 = h.pageY,
                            b = "zoom"
                    } else {
                        this.isSwitchable() && (b = "switch")
                    }
                    h = j[0]
                }
                b && (d.preventDefault(), this.action = b, this.startX = h.pageX || f && f.pageX, this.startY = h.pageY || f && f.pageY)
            }
        },
        mousemove: function(d) {
            var c, j = this.options,
                g = this.action,
                l = this.$image,
                k = d.originalEvent,
                b = k && k.touches,
                f = d;
            if (this.isViewed) {
                if (b) {
                    if (c = b.length, c > 1) {
                        if (!j.zoomable || 2 !== c) {
                            return
                        }
                        f = b[1],
                            this.endX2 = f.pageX,
                            this.endY2 = f.pageY
                    }
                    f = b[0]
                }
                g && (d.preventDefault(), "move" === g && j.transition && l.hasClass(ad) && l.removeClass(ad), this.endX = f.pageX || k && k.pageX, this.endY = f.pageY || k && k.pageY, this.change(d))
            }
        },
        mouseup: function(b) {
            var a = this.action;
            a && (b.preventDefault(), "move" === a && this.options.transition && this.$image.addClass(ad), this.action = !1)
        },
        show: function() {
            var a, b = this.options;
            b.inline || this.transitioning || (this.isBuilt || this.build(), $.isFunction(b.show) && this.$element.one(au, b.show), this.trigger(au).isDefaultPrevented() || (this.$body.removeClass(aP), a = this.$viewer.removeClass(aG), this.$element.one(ag, $.proxy(function() {
                    this.view(this.target ? this.$images.index(this.target) : this.index),
                        this.target = !1
                },
                this)), b.transition ? (this.transitioning = !0, a.addClass(ad), aX(a[0]), a.one(aj, $.proxy(this.shown, this)).addClass(aw)) : (a.addClass(aw), this.shown())))
        },
        hide: function() {
            var a = this.options,
                b = this.$viewer;
            a.inline || this.transitioning || !this.isShown || ($.isFunction(a.hide) && this.$element.one(an, a.hide), this.trigger(an).isDefaultPrevented() || (this.isViewed && a.transition ? (this.transitioning = !0, this.$image.one(aj, $.proxy(function() {
                    b.one(aj, $.proxy(this.hidden, this)).removeClass(aw)
                },
                this)), this.zoomTo(0, !1, !1, !0)) : (b.removeClass(aw), this.hidden())))
        },
        view: function(c) {
            var g, f, k, j, b, d = this.$title;
            c = Number(c) || 0,
            !this.isShown || this.isPlayed || 0 > c || c >= this.length || this.isViewed && c === this.index || this.trigger(ab).isDefaultPrevented() || (f = this.$items.eq(c), k = f.find(ax), j = k.data("url"), b = k.attr("alt"), this.$image = g = $('<img src="' + j + '" alt="' + b + '">'), this.isViewed && this.$items.eq(this.index).removeClass(aU), f.addClass(aU), this.isViewed = !1, this.index = c, this.image = null, this.$canvas.html(g.addClass(at)), this.renderList(), d.empty(), this.$element.one(aq, $.proxy(function() {
                    var h = this.image,
                        a = h.naturalWidth,
                        l = h.naturalHeight;
                    d.html(b + " (" + a + " &times; " + l + ")")
                },
                this)), g[0].complete ? this.load() : (g.one(ao, $.proxy(this.load, this)), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout($.proxy(function() {
                    g.removeClass(at),
                        this.timeout = !1
                },
                this), 1000)))
        },
        prev: function() {
            this.view(a0(this.index - 1, 0))
        },
        next: function() {
            this.view(aa(this.index + 1, this.length - 1))
        },
        move: function(b, a) {
            var c = this.image;
            this.moveTo(aM(b) ? b: c.left + aC(b), aM(a) ? a: c.top + aC(a))
        },
        moveTo: function(b, a) {
            var d = this.image,
                c = !1;
            aM(a) && (a = b),
                b = aC(b),
                a = aC(a),
            this.isViewed && !this.isPlayed && this.options.movable && (a1(b) && (d.left = b, c = !0), a1(a) && (d.top = a, c = !0), c && this.renderImage())
        },
        zoom: function(b, a, d) {
            var c = this.image;
            b = aC(b),
                b = 0 > b ? 1 / (1 - b) : 1 + b,
                this.zoomTo(c.width * b / c.naturalWidth, a, d)
        },
        zoomTo: function(p, C, D, e) {
            var d, z, q, b, k, y = this.options,
                B = 0.01,
                j = 100,
                A = this.image,
                x = A.width,
                w = A.height;
            p = a0(0, p),
            a1(p) && this.isViewed && !this.isPlayed && (e || y.zoomable) && (e || (B = a0(B, y.minZoomRatio), j = aa(j, y.maxZoomRatio), p = aa(a0(p, B), j)), p > 0.95 && 1.05 > p && (p = 1), z = A.naturalWidth * p, q = A.naturalHeight * p, D && (d = D.originalEvent) ? (b = this.$viewer.offset(), k = d.touches ? a2(d.touches) : {
                pageX: D.pageX || d.pageX || 0,
                pageY: D.pageY || d.pageY || 0
            },
                A.left -= (z - x) * ((k.pageX - b.left - A.left) / x), A.top -= (q - w) * ((k.pageY - b.top - A.top) / w)) : (A.left -= (z - x) / 2, A.top -= (q - w) / 2), A.width = z, A.height = q, A.ratio = p, this.renderImage(), C && this.tooltip())
        },
        rotate: function(a) {
            this.rotateTo((this.image.rotate || 0) + aC(a))
        },
        rotateTo: function(b) {
            var a = this.image;
            b = aC(b),
            a1(b) && this.isViewed && !this.isPlayed && this.options.rotatable && (a.rotate = b, this.renderImage())
        },
        scale: function(b, a) {
            var d = this.image,
                c = !1;
            aM(a) && (a = b),
                b = aC(b),
                a = aC(a),
            this.isViewed && !this.isPlayed && this.options.scalable && (a1(b) && (d.scaleX = b, c = !0), a1(a) && (d.scaleY = a, c = !0), c && this.renderImage())
        },
        scaleX: function(a) {
            this.scale(a, this.image.scaleY)
        },
        scaleY: function(a) {
            this.scale(this.image.scaleX, a)
        },
        play: function() {
            var c, e = this.options,
                j = this.$player,
                g = $.proxy(this.loadImage, this),
                b = [],
                d = 0,
                f = 0;
            this.isShown && !this.isPlayed && (e.fullscreen && this.requestFullscreen(), this.isPlayed = !0, j.addClass(a4), this.$items.each(function(h) {
                var k = $(this),
                    a = k.find(ax),
                    m = $('<img src="' + a.data("url") + '" alt="' + a.attr("alt") + '">');
                d++,
                    m.addClass(aF).toggleClass(ad, e.transition),
                k.hasClass(aU) && (m.addClass(aw), f = h),
                    b.push(m),
                    m.one(ao, {
                            filled: !1
                        },
                        g),
                    j.append(m)
            }), a1(e.interval) && e.interval > 0 && (c = $.proxy(function() {
                    this.playing = setTimeout(function() {
                            b[f].removeClass(aw),
                                f++,
                                f = d > f ? f: 0,
                                b[f].addClass(aw),
                                c()
                        },
                        e.interval)
                },
                this), d > 1 && c()))
        },
        stop: function() {
            this.isPlayed && (this.options.fullscreen && this.exitFullscreen(), this.isPlayed = !1, clearTimeout(this.playing), this.$player.removeClass(a4).empty())
        },
        full: function() {
            var a = this.options,
                c = this.$image,
                b = this.$list;
            this.isShown && !this.isPlayed && !this.isFulled && a.inline && (this.isFulled = !0, this.$body.removeClass(aP), this.$button.addClass(ah), a.transition && (c.removeClass(ad), b.removeClass(ad)), this.$viewer.addClass(aI).removeAttr("style").css("z-index", a.zIndex), this.initContainer(), this.viewer = $.extend({},
                this.container), this.renderList(), this.initImage($.proxy(function() {
                    this.renderImage(function() {
                        a.transition && setTimeout(function() {
                                c.addClass(ad),
                                    b.addClass(ad)
                            },
                            0)
                    })
                },
                this)))
        },
        exit: function() {
            var a = this.options,
                c = this.$image,
                b = this.$list;
            this.isFulled && (this.isFulled = !1, this.$body.removeClass(aP), this.$button.removeClass(ah), a.transition && (c.removeClass(ad), b.removeClass(ad)), this.$viewer.removeClass(aI).css("z-index", a.zIndexInline), this.viewer = $.extend({},
                this.parent), this.renderViewer(), this.renderList(), this.initImage($.proxy(function() {
                    this.renderImage(function() {
                        a.transition && setTimeout(function() {
                                c.addClass(ad),
                                    b.addClass(ad)
                            },
                            0)
                    })
                },
                this)))
        },
        tooltip: function() {
            var a = this.options,
                c = this.$tooltip,
                b = this.image,
                d = [a4, aF, ad].join(" ");
            this.isViewed && !this.isPlayed && a.tooltip && (c.text(av(100 * b.ratio) + "%"), this.tooltiping ? clearTimeout(this.tooltiping) : a.transition ? (this.fading && c.trigger(aj), c.addClass(d), aX(c[0]), c.addClass(aw)) : c.addClass(a4), this.tooltiping = setTimeout($.proxy(function() {
                    a.transition ? (c.one(aj, $.proxy(function() {
                            c.removeClass(d),
                                this.fading = !1
                        },
                        this)).removeClass(aw), this.fading = !0) : c.removeClass(a4),
                        this.tooltiping = !1
                },
                this), 1000))
        },
        toggle: function() {
            1 === this.image.ratio ? this.zoomTo(this.initialImage.ratio, !0) : this.zoomTo(1, !0)
        },
        reset: function() {
            this.isViewed && !this.isPlayed && (this.image = $.extend({},
                this.initialImage), this.renderImage())
        },
        update: function() {
            var a, c = this.$element,
                b = this.$images,
                d = [];
            if (this.isImg) {
                if (!c.parent().length) {
                    return this.destroy()
                }
            } else {
                this.$images = b = c.find(ax),
                    this.length = b.length
            }
            this.isBuilt && ($.each(this.$items,
                function(f) {
                    var g = $(this).find("img")[0],
                        h = b[f];
                    h ? h.src !== g.src && d.push(f) : d.push(f)
                }), this.$list.width("auto"), this.initList(), this.isShown && (this.length ? this.isViewed && (a = $.inArray(this.index, d), a >= 0 ? (this.isViewed = !1, this.view(a0(this.index - (a + 1), 0))) : this.$items.eq(this.index).addClass(aU)) : (this.$image = null, this.isViewed = !1, this.index = 0, this.image = null, this.$canvas.empty(), this.$title.empty())))
        },
        destroy: function() {
            var a = this.$element;
            this.options.inline ? this.unbind() : (this.isShown && this.unbind(), a.off(a6, this.start)),
                this.unbuild(),
                a.removeData(aZ)
        },
        trigger: function(a, c) {
            var b = $.Event(a, c);
            return this.$element.trigger(b),
                b
        },
        shown: function() {
            var a = this.options;
            this.transitioning = !1,
                this.isFulled = !0,
                this.isShown = !0,
                this.isVisible = !0,
                this.render(),
                this.bind(),
            $.isFunction(a.shown) && this.$element.one(ag, a.shown),
                this.trigger(ag)
        },
        hidden: function() {
            var a = this.options;
            this.transitioning = !1,
                this.isViewed = !1,
                this.isFulled = !1,
                this.isShown = !1,
                this.isVisible = !1,
                this.unbind(),
                this.$body.addClass(aP),
                this.$viewer.addClass(aG),
                this.resetList(),
                this.resetImage(),
            $.isFunction(a.hidden) && this.$element.one(am, a.hidden),
                this.trigger(am)
        },
        requestFullscreen: function() {
            var a = document.documentElement; ! this.isFulled || document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || (a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT))
        },
        exitFullscreen: function() {
            this.isFulled && (document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen())
        },
        change: function(b) {
            var a = this.endX - this.startX,
                c = this.endY - this.startY;
            switch (this.action) {
                case "move":
                    this.move(a, c);
                    break;
                case "zoom":
                    this.zoom(function(f, d, h, g) {
                        var k = ar(f * f + d * d),
                            j = ar(h * h + g * g);
                        return (j - k) / k
                    } (aE(this.startX - this.startX2), aE(this.startY - this.startY2), aE(this.endX - this.endX2), aE(this.endY - this.endY2)), !1, b),
                        this.startX2 = this.endX2,
                        this.startY2 = this.endY2;
                    break;
                case "switch":
                    this.action = "switched",
                    aE(a) > aE(c) && (a > 1 ? this.prev() : -1 > a && this.next())
            }
            this.startX = this.endX,
                this.startY = this.endY
        },
        isSwitchable: function() {
            var b = this.image,
                a = this.viewer;
            return b.left >= 0 && b.top >= 0 && b.width <= a.width && b.height <= a.height
        }
    };
    aK.defaults = {
        inline: !1,
        button: !0,
        navbar: !0,
        title: !0,
        toolbar: !0,
        tooltip: !0,
        movable: !0,
        zoomable: !0,
        rotatable: !0,
        scalable: !0,
        transition: !0,
        fullscreen: !0,
        keyboard: !0,
        interval: 5000,
        minWidth: 200,
        minHeight: 100,
        zoomRatio: 0.1,
        minZoomRatio: 0.01,
        maxZoomRatio: 100,
        zIndex: 99,
        zIndexInline: 0,
        url: "data-url",
        build: null,
        built: null,
        show: null,
        shown: null,
        hide: null,
        hidden: null,
        view: null,
        viewed: null
    };
    aK.template = '<div class="ak-viewer-container">' + '<div class="ak-viewer-canvas"></div>' + '<div class="ak-viewer-footer animated slideInUp h_10em bg_black07">' + '<div class="ak-viewer-title"></div>' + '<ul class="ak-viewer-toolbar">' + '<li class="ak-viewer-one-to-one bg_black07" data-action="one-to-one"></li>' + '<li class="ak-viewer-zoom-in bg_black07" data-action="zoom-in"></li>' + '<li class="ak-viewer-zoom-out bg_black07" data-action="zoom-out"></li>' + '<li class="ak-viewer-prev bg_black07" data-action="prev"></li>' + '<li class="ak-viewer-next bg_black07" data-action="next"></li>' + '<li class="ak-viewer-rotate-left bg_black07" data-action="rotate-left"></li>' + '<li class="ak-viewer-rotate-right bg_black07" data-action="rotate-right"></li>' + '<li class="ak-viewer-flip-horizontal bg_black07" data-action="flip-horizontal"></li>' + '<li class="ak-viewer-flip-vertical bg_black07" data-action="flip-vertical"></li>' + '<li class="ak-viewer-reset bg_black07" data-action="reset"></li>' + "</ul>" + '<div class="ak-viewer-navbar bg_black04">' + '<ul class="ak-viewer-list"></ul>' + "</div>" + "</div>" + '<div class="ak-viewer-tooltip"></div>' + '<button type="button" class="ak-viewer-button bg_black07" data-action="mix"></button>' + '<div class="ak-mask"></div>' + "</div>";
    aK.other = $.fn.AKjs_Viewer;
    $.fn.AKjs_Viewer = function(c) {
        var d, b = aR(arguments, 1);
        return this.each(function() {
            var e, f = $(this),
                a = f.data(aZ);
            if (!a) {
                if (/destroy|hide|exit|stop|reset/.test(c)) {
                    return
                }
                f.data(aZ, a = new aK(this, c))
            }
            aL(c) && $.isFunction(e = a[c]) && (d = e.apply(a, b))
        }),
            aM(d) ? this: d
    };
    $.fn.AKjs_Viewer.Constructor = aK;
    $.fn.AKjs_Viewer.setDefaults = aK.setDefaults,
        $.fn.AKjs_Viewer.noConflict = function() {
            return $.fn.AKjs_Viewer = aK.other,
                this
        }
}(jQuery));