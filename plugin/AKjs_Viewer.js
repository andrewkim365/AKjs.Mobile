/*
Modification Date: 2018-11-16
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Viewer-------------------------------------------*/
(function($){
    function isString(s) {
        return typeof s === 'string';
    }
    function isNumber(n) {
        return typeof n === 'number' && !isNaN(n);
    }
    function isUndefined(u) {
        return typeof u === 'undefined';
    }
    function toArray(obj, offset) {
        var args = [];
        if (isNumber(offset)) {
            args.push(offset);
        }
        return args.slice.apply(obj, args);
    }
    function proxy(fn, context) {
        var args = toArray(arguments, 2);
        return function () {
            return fn.apply(context, args.concat(toArray(arguments)));
        };
    }
    function getTransform(options) {
        var transforms = [];
        var rotate = options.rotate;
        var scaleX = options.scaleX;
        var scaleY = options.scaleY;
        if (isNumber(rotate)) {
            transforms.push('rotate(' + rotate + 'deg)');
        }
        if (isNumber(scaleX) && isNumber(scaleY)) {
            transforms.push('scale(' + scaleX + ',' + scaleY + ')');
        }
        return transforms.length ? transforms.join(' ') : 'none';
    }
    function forceReflow(element) {
        return element.offsetWidth;
    }
    function getImageName(url) {
        return isString(url) ? url.replace(/^.*\//, '').replace(/[\?&#].*$/, '') : '';
    }
    function getImageSize(image, callback) {
        var newImage;
        if (image.naturalWidth) {
            return callback(image.naturalWidth, image.naturalHeight);
        }
        newImage = document.createElement('img');

        newImage.onload = function () {
            callback(this.width, this.height);
        };
        newImage.src = image.src;
    }
    function getTouchesCenter(touches) {
        var length = touches.length;
        var pageX = 0;
        var pageY = 0;

        if (length) {
            $.each(touches, function (i, touch) {
                pageX += touch.pageX;
                pageY += touch.pageY;
            });

            pageX /= length;
            pageY /= length;
        }

        return {
            pageX: pageX,
            pageY: pageY
        };
    }
    function getResponsiveClass(option) {
        switch (option) {
            case 2:
                return $class_hide_xs_down;
            case 3:
                return $class_hide_sm_down;
            case 4:
                return $class_hide_md_down;
        }
    }
    function ak_Viewer(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, ak_Viewer.defaults, $.isPlainObject(options) && options);
        this.isImg = false;
        this.isBuilt = false;
        this.isShown = false;
        this.isViewed = false;
        this.isFulled = false;
        this.isPlayed = false;
        this.wheeling = false;
        this.playing = false;
        this.fading = false;
        this.tooltiping = false;
        this.transitioning = false;
        this.action = false;
        this.target = false;
        this.timeout = false;
        this.index = 0;
        this.length = 0;
        this.init();
    }
    var $window = $(window),
        $document = $(document),
        $namespace = "viewer",
        $element_viewer = document.createElement($namespace),
        $class_fixed = "fix",
        $class_open = "scrolling_touch",
        $class_show = "dis_block_im",
        $class_hide = "dis_none_im",
        $class_hide_xs_down = "ak-viewer-hide-xs-down",
        $class_hide_sm_down = "ak-viewer-hide-sm-down",
        $class_hide_md_down = "ak-viewer-hide-md-down",
        $class_fade = "ak-viewer-fade",
        $class_in = "ak-viewer-in",
        $class_move = "ak-viewer-move",
        $class_active = "ak-viewer-active",
        $class_invisible = "ak-viewer-invisible",
        $class_transition = "ak-viewer-transition",
        $class_fullscreen = "ak-viewer-fullscreen",
        $class_fullscreen_exit = "ak-viewer-fullscreen-exit",
        $class_close = "ak-viewer-close",
        $selector_img = "img",
        $event_mousedown = "mousedown touchstart pointerdown MSPointerDown",
        $event_mousemove = "mousemove touchmove pointermove MSPointerMove",
        $event_mouseup = "mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",
        $event_wheel = "wheel mousewheel DOMMouseScroll",
        $event_transitionend = "transitionend",
        $event_load = "load." + $namespace,
        $event_keydown = "keydown." + $namespace,
        $event_click = "click." + $namespace,
        $event_resize = "resize." + $namespace,
        $event_build = "build." + $namespace,
        $event_built = "built." + $namespace,
        $event_show = "show." + $namespace,
        $event_shown = "shown." + $namespace,
        $event_hide = "hide." + $namespace,
        $event_hidden = "hidden." + $namespace,
        $event_view = "view." + $namespace,
        $event_viewed = "viewed." + $namespace,
        $support_transition = "undefined" != typeof $element_viewer.style.transition,
        round = Math.round,
        sqrt = Math.sqrt,
        abs = Math.abs,
        min = Math.min,
        max = Math.max,
        num = Number;
    ak_Viewer.prototype = {
        constructor: ak_Viewer,
        init: function() {
            var options = this.options,
                $this = this.$element,
                isImg = $this.is($selector_img),
                $images = isImg ? $this: $this.find($selector_img),
                length = $images.length,
                ready = $.proxy(this.ready, this);
            length && ($.isFunction(options.build) && $this.one($event_build, options.build),
            this.trigger($event_build).isDefaultPrevented() || ($support_transition || (options.transition = !1),
                this.isImg = isImg,
                this.length = length,
                this.count = 0,
                this.$images = $images,
                this.$body = $("main"),
                options.inline ? ($this.one($event_built, $.proxy(function() {
                    this.view();
                },
                this)),
                $images.each(function() {
                this.complete ? ready() : $(this).one($event_load, ready)
            })) : $this.on($event_click, $.proxy(this.start, this))))
        },
        ready: function() {
            this.count++,
            this.count === this.length && this.build()
        },
        build: function() {
            var $parent, $viewer, $title, $toolbar, $navbar, $button, options = this.options,
                $this = this.$element;
            this.isBuilt || (
                this.$parent = $parent = $this.parent(),
                    this.$viewer = $viewer = $(ak_Viewer.template),
                    this.$canvas = $viewer.find(".ak-viewer-canvas"),
                    this.$footer = $viewer.find(".ak-viewer-footer"),
                    this.$title = $title = $viewer.find(".ak-viewer-title"),
                    this.$toolbar = $toolbar = $viewer.find(".ak-viewer-toolbar"),
                    this.$navbar = $navbar = $viewer.find(".ak-viewer-navbar"),
                    this.$button = $button = $viewer.find(".ak-viewer-button"),
                    this.$tooltip = $viewer.find(".ak-viewer-tooltip"),
                    this.$player = $viewer.find(".ak-viewer-player"),
                    this.$list = $viewer.find(".ak-viewer-list"),
                    $title.addClass(options.title ? getResponsiveClass(options.title) : $class_hide),
                    $toolbar.addClass(options.toolbar ? getResponsiveClass(options.toolbar) : $class_hide),
                    $toolbar.find("li[class*=zoom]").toggleClass($class_invisible, !options.zoomable),
                    $toolbar.find("li[class*=flip]").toggleClass($class_invisible, !options.scalable),
                options.rotatable || $toolbar.find("li[class*=rotate]").addClass($class_invisible).appendTo($toolbar),
                    $navbar.addClass(options.navbar ? getResponsiveClass(options.navbar) : $class_hide),
                    options.inline ? ($button.addClass($class_fullscreen),
                        $viewer.css("z-index", options.zIndexInline),
                    "static" === $parent.css("position") && $parent.css("position", "relative")) : ($button.addClass($class_close),
                        $viewer.css("z-index", options.zIndex).addClass([$class_fixed, $class_fade, $class_hide].join(" "))),
                    $("body").append($viewer),
                options.inline && (this.render(), this.bind(), this.isShown = !0),
                    this.isBuilt = !0, $.isFunction(options.built) && $this.one($event_built, options.built),
                    this.trigger($event_built));
        },
        unbuild: function() {
            var options = this.options,
                $this = this.$element;
            this.isBuilt && (options.inline && $this.removeClass($class_hide), this.$viewer.remove())
        },
        bind: function() {
            var options = this.options,
                $this = this.$element;
            $.isFunction(options.view) && $this.on($event_view, options.view),
            $.isFunction(options.viewed) && $this.on($event_viewed, options.viewed),
                this.$viewer.on($event_click, $.proxy(this.click, this)).on($event_wheel, $.proxy(this.wheel, this)),
                this.$canvas.on($event_mousedown, $.proxy(this.mousedown, this)),
                $document.on($event_mousemove, this._mousemove = proxy(this.mousemove, this)).on($event_mouseup, this._mouseup = proxy(this.mouseup, this)).on($event_keydown, this._keydown = proxy(this.keydown, this)),
                $window.on($event_resize, this._resize = proxy(this.resize, this))
        },
        unbind: function() {
            var options = this.options,
                $this = this.$element;
            $.isFunction(options.view) && $this.off($event_view, options.view),
            $.isFunction(options.viewed) && $this.off($event_viewed, options.viewed),
                this.$viewer.off($event_click, this.click).off($event_wheel, this.wheel),
                this.$canvas.off($event_mousedown, this.mousedown),
                $document.off($event_mousemove, this._mousemove).off($event_mouseup, this._mouseup).off($event_keydown, this._keydown),
                $window.off($event_resize, this._resize)
        },
        render: function() {
            this.initContainer();
            this.initViewer();
            this.initList();
            this.renderViewer();
        },
        initContainer: function() {
            this.container = {
                width: $window.innerWidth(),
                height: $window.innerHeight()
            }
        },
        initViewer: function() {
            var viewer,
                options = this.options,
                $parent = this.$parent;
            options.inline && (this.parent = viewer = {
                width: max($parent.width(), options.minWidth),
                height: max($parent.height(), options.minHeight)
            }),
            (this.isFulled || !viewer) && (viewer = this.container),
                this.viewer = $.extend({}, viewer);
        },
        renderViewer: function() {
            this.options.inline && !this.isFulled && this.$viewer.css(this.viewer)
        },
        initList: function() {
            var options = this.options,
                $this = this.$element,
                $list = this.$list,
                list = [];
            this.$images.each(function(g) {
                var j = this.src,
                    e = this.alt || getImageName(j),
                    f = options.url;
                j && (isString(f) ? f = this.getAttribute(f) : $.isFunction(f) && (f = f.call(this, this)), list.push('<li><img src="' + j + '" data-action="view" data-index="' + g + '" data-url="' + (f || j) + '" alt="' + e + '"></li>'))
            }),
                $list.html(list.join("")).find($selector_img).one($event_load, {
                        filled: !0
                    },
                    $.proxy(this.loadImage, this)),
                this.$items = $list.children(),
            options.transition && $this.one($event_viewed,
                function() {
                    $list.addClass($class_transition);
                });
        },
        renderList: function(index) {
            var i = index || this.index,
                width = this.$items.eq(i).width(),
                outerWidth = width + 1;
            this.$list.css({
                width: outerWidth * (this.length + 10),
                marginLeft: (this.viewer.width - width) / 2 - outerWidth * i
            });
        },
        resetList: function() {
            this.$list.empty().removeClass($class_transition).css("margin-left", 0);
        },
        initImage: function(callback) {
            var options = this.options,
                $image = this.$image,
                viewer = this.viewer,
                footerHeight = this.$footer.height(),
                viewerWidth = viewer.width,
                viewerHeight = max(viewer.height - footerHeight, footerHeight),
                oldImage = this.image || {};
            getImageSize($image[0], $.proxy(function(naturalWidth, naturalHeight) {
                    var initialImage, image, aspectRatio = naturalWidth / naturalHeight,
                        width = viewerWidth,
                        height = viewerHeight;
                    viewerHeight * aspectRatio > viewerWidth ? height = viewerWidth / aspectRatio: width = viewerHeight * aspectRatio,
                        width = min(0.9 * width, naturalWidth),
                        height = min(0.9 * height, naturalHeight),
                        image = {
                            naturalWidth: naturalWidth,
                            naturalHeight: naturalHeight,
                            aspectRatio: aspectRatio,
                            ratio: width / naturalWidth,
                            width: width,
                            height: height,
                            left: (viewerWidth - width) / 2,
                            top: (viewerHeight - height) / 2
                        },
                        initialImage = $.extend({},
                            image),
                    options.rotatable && (image.rotate = oldImage.rotate || 0, initialImage.rotate = 0),
                    options.scalable && (image.scaleX = oldImage.scaleX || 1, image.scaleY = oldImage.scaleY || 1, initialImage.scaleX = 1, initialImage.scaleY = 1),
                        this.image = image,
                        this.initialImage = initialImage,
                    $.isFunction(callback) && callback()
                },
                this))
        },
        renderImage: function(a) {
            var image = this.image,
                $image = this.$image;
            $image.css({
                width: image.width,
                height: image.height,
                marginLeft: image.left,
                marginTop: image.top,
                transform: getTransform(image)
            });
            $.isFunction(a) && (this.transitioning ? $image.one($event_transitionend, a) : a())
        },
        resetImage: function() {
            this.$image.remove();
            this.$image = null
        },
        start: function(a) {
            var target = a.target;
            $(target).is("img") && (this.target = target, this.show())
        },
        click: function(a) {
            var $target = $(a.target),
                action = $target.data("action"),
                image = this.image;
            switch (action) {
                case "mix":
                    this.isPlayed ? this.stop() : this.options.inline ? this.isFulled ? this.exit() : this.full() : this.hide();
                    break;
                case "view":
                    this.view($target.data("index"));
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
                    this.scaleX( - image.scaleX || -1);
                    break;
                case "flip-vertical":
                    this.scaleY( - image.scaleY || -1);
                    break;
                default:
                    this.isPlayed && this.stop()
            }
        },
        load: function() {
            var options = this.options,
                viewer = this.viewer,
                $image = this.$image;
            this.timeout && (clearTimeout(this.timeout), this.timeout = !1),
                $image.removeClass($class_invisible).css("cssText", "width:0;height:0;margin-left:" + viewer.width / 2 + "px;margin-top:" + viewer.height / 2 + "px;max-width:none!important;visibility:visible;"),
                this.initImage($.proxy(function() {
                    $image.toggleClass($class_transition, options.transition).toggleClass($class_move, options.movable),
                        this.renderImage($.proxy(function() {
                            this.isViewed = !0, this.trigger($event_viewed)
                        }, this))
                    }, this));
        },
        loadImage: function(e) {
            var image = e.target,
                $image = $(image),
                $parent = $image.parent(),
                parentWidth = $parent.width(),
                parentHeight = $parent.height(),
                filled = e.data && e.data.filled;
            getImageSize(image, function(naturalWidth, naturalHeight) {
                    var aspectRatio = naturalWidth / naturalHeight,
                        width = parentWidth,
                        height = parentHeight;
                    parentHeight * aspectRatio > parentWidth ? filled ? width = parentHeight * aspectRatio: height = parentWidth / aspectRatio: filled ? height = parentWidth / aspectRatio: width = parentHeight * aspectRatio,
                        $image.css({
                            width: width,
                            height: height,
                            marginLeft: (parentWidth - width) / 2,
                            marginTop: (parentHeight - height) / 2
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
            this.isPlayed && this.$player.find($selector_img).one($event_load, $.proxy(this.loadImage, this)).trigger($event_load)
        },
        wheel: function(event) {
            var e = event.originalEvent || event,
                ratio = num(this.options.zoomRatio) || 0.1,
                delta = 1;
            this.isViewed && (event.preventDefault(), this.wheeling || (this.wheeling = !0, setTimeout($.proxy(function() {
                    this.wheeling = !1
                },
                this), 50), e.deltaY ? delta = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? delta = -e.wheelDelta / 120 : e.detail && (delta = e.detail > 0 ? 1 : -1), this.zoom( - delta * ratio, !0, event)))
        },
        keydown: function(e) {
            var options = this.options,
                which = e.which;
            if (this.isFulled && options.keyboard) {
                switch (which) {
                    case 27:
                        this.isPlayed ? this.stop() : options.inline ? this.isFulled && this.exit() : this.hide();
                        break;
                    case 32:
                        this.isPlayed && this.stop();
                        break;
                    case 37:
                        this.prev();
                        break;
                    case 38:
                        e.preventDefault(),
                            this.zoom(options.zoomRatio, !0);
                        break;
                    case 39:
                        this.next();
                        break;
                    case 40:
                        e.preventDefault(),
                            this.zoom( - options.zoomRatio, !0);
                        break;
                    case 48:
                    case 49:
                        (e.ctrlKey || e.shiftKey) && (e.preventDefault(), this.toggle())
                }
            }
        },
        mousedown: function(event) {
            var touchesLength,
                options = this.options,
                originalEvent = event.originalEvent,
                touches = originalEvent && originalEvent.touches,
                e = event,
                action = options.movable ? "move": !1;
            if (this.isViewed) {
                if (touches) {
                    if (touchesLength = touches.length, touchesLength > 1) {
                        if (!options.zoomable || 2 !== touchesLength) {
                            return
                        }
                        e = touches[1],
                            this.startX2 = e.pageX,
                            this.startY2 = e.pageY,
                            action = "zoom"
                    } else {
                        this.isSwitchable() && (action = "switch")
                    }
                    e = touches[0]
                }
                action && (event.preventDefault(), this.action = action, this.startX = e.pageX || originalEvent && originalEvent.pageX, this.startY = e.pageY || originalEvent && originalEvent.pageY)
            }
        },
        mousemove: function(event) {
            var touchesLength,
                options = this.options,
                action = this.action,
                $image = this.$image,
                originalEvent = event.originalEvent,
                touches = originalEvent && originalEvent.touches,
                e = event;
            if (this.isViewed) {
                if (touches) {
                    if (touchesLength = touches.length, touchesLength > 1) {
                        if (!options.zoomable || 2 !== touchesLength) {
                            return
                        }
                        e = touches[1],
                            this.endX2 = e.pageX,
                            this.endY2 = e.pageY
                    }
                    e = touches[0]
                }
                action && (event.preventDefault(), "move" === action && options.transition && $image.hasClass($class_transition) && $image.removeClass($class_transition), this.endX = e.pageX || originalEvent && originalEvent.pageX, this.endY = e.pageY || originalEvent && originalEvent.pageY, this.change(event))
            }
        },
        mouseup: function(event) {
            var action = this.action;
            action && (event.preventDefault(), "move" === action && this.options.transition && this.$image.addClass($class_transition), this.action = !1)
        },
        show: function() {
            var $viewer,
                options = this.options;
            options.inline || this.transitioning || (this.isBuilt || this.build(), $.isFunction(options.show) && this.$element.one($event_show, options.show), this.trigger($event_show).isDefaultPrevented() || (this.$body.removeClass($class_open), $viewer = this.$viewer.removeClass($class_hide), this.$element.one($event_shown, $.proxy(function() {
                    this.view(this.target ? this.$images.index(this.target) : this.index),
                        this.target = !1
                },
                this)), options.transition ? (this.transitioning = !0, $viewer.addClass($class_transition), forceReflow($viewer[0]), $viewer.one($event_transitionend, $.proxy(this.shown, this)).addClass($class_in)) : ($viewer.addClass($class_in), this.shown())))
        },
        hide: function() {
            var options = this.options,
                $viewer = this.$viewer;
            options.inline || this.transitioning || !this.isShown || ($.isFunction(options.hide) && this.$element.one($event_hide, options.hide), this.trigger($event_hide).isDefaultPrevented() || (this.isViewed && options.transition ? (this.transitioning = !0, this.$image.one($event_transitionend, $.proxy(function() {
                    $viewer.one($event_transitionend, $.proxy(this.hidden, this)).removeClass($class_in)
                },
                this)), this.zoomTo(0, !1, !1, !0)) : ($viewer.removeClass($class_in), this.hidden())))
        },
        view: function(index) {
            var $image,
                $item,
                $img,
                url,
                alt,
                $title = this.$title;
            index = Number(index) || 0,
            !this.isShown || this.isPlayed || 0 > index || index >= this.length || this.isViewed && index === this.index || this.trigger($event_view).isDefaultPrevented() || ($item = this.$items.eq(index), $img = $item.find($selector_img), url = $img.data("url"), alt = $img.attr("alt"), this.$image = $image = $('<img src="' + url + '" alt="' + alt + '">'), this.isViewed && this.$items.eq(this.index).removeClass($class_active), $item.addClass($class_active), this.isViewed = !1, this.index = index, this.image = null, this.$canvas.html($image.addClass($class_invisible)), this.renderList(), $title.empty(), this.$element.one($event_viewed, $.proxy(function() {
                    var image = this.image,
                        width = image.naturalWidth,
                        height = image.naturalHeight;
                    $title.html(alt + " (" + width + " &times; " + height + ")")
                },
                this)), $image[0].complete ? this.load() : ($image.one($event_load, $.proxy(this.load, this)), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout($.proxy(function() {
                    $image.removeClass($class_invisible),
                        this.timeout = !1
                },
                this), 1000)))
        },
        prev: function() {
            this.view(max(this.index - 1, 0))
        },
        next: function() {
            this.view(min(this.index + 1, this.length - 1))
        },
        move: function(offsetX, offsetY) {
            var image = this.image;
            this.moveTo(isUndefined(offsetX) ? offsetX: image.left + num(offsetX), isUndefined(offsetY) ? offsetY: image.top + num(offsetY))
        },
        moveTo: function(x, y) {
            var image = this.image,
                changed = !1;
            isUndefined(y) && (y = x),
                x = num(x),
                y = num(y),
            this.isViewed && !this.isPlayed && this.options.movable && (isNumber(x) && (image.left = x, changed = !0), isNumber(y) && (image.top = y, changed = !0), changed && this.renderImage())
        },
        zoom: function(ratio, hasTooltip, _event) {
            var image = this.image;
            ratio = num(ratio),
                ratio = 0 > ratio ? 1 / (1 - ratio) : 1 + ratio,
                this.zoomTo(image.width * ratio / image.naturalWidth, hasTooltip, _event)
        },
        zoomTo: function(ratio, hasTooltip, _event, _zoomable) {
            var originalEvent, newWidth, newHeight, offset, center, options = this.options,
                minZoomRatio = 0.01,
                maxZoomRatio = 100,
                image = this.image,
                width = image.width,
                height = image.height;
            ratio = max(0, ratio),
            isNumber(ratio) && this.isViewed && !this.isPlayed && (_zoomable || options.zoomable) && (_zoomable || (minZoomRatio = max(minZoomRatio, options.minZoomRatio), maxZoomRatio = min(maxZoomRatio, options.maxZoomRatio), ratio = min(max(ratio, minZoomRatio), maxZoomRatio)), ratio > 0.95 && 1.05 > ratio && (ratio = 1), newWidth = image.naturalWidth * ratio, newHeight = image.naturalHeight * ratio, _event && (originalEvent = _event.originalEvent) ? (offset = this.$viewer.offset(), center = originalEvent.touches ? getTouchesCenter(originalEvent.touches) : {
                pageX: _event.pageX || originalEvent.pageX || 0,
                pageY: _event.pageY || originalEvent.pageY || 0
            },
                image.left -= (newWidth - width) * ((center.pageX - offset.left - image.left) / width), image.top -= (newHeight - height) * ((center.pageY - offset.top - image.top) / height)) : (image.left -= (newWidth - width) / 2, image.top -= (newHeight - height) / 2), image.width = newWidth, image.height = newHeight, image.ratio = ratio, this.renderImage(), hasTooltip && this.tooltip())
        },
        rotate: function(a) {
            this.rotateTo((this.image.rotate || 0) + num(a))
        },
        rotateTo: function(degree) {
            var image = this.image;
            degree = num(degree),
            isNumber(degree) && this.isViewed && !this.isPlayed && this.options.rotatable && (image.rotate = degree, this.renderImage())
        },
        scale: function(scaleX, scaleY) {
            var image = this.image,
                changed = !1;
            isUndefined(scaleY) && (scaleY = scaleX),
                scaleX = num(scaleX),
                scaleY = num(scaleY),
            this.isViewed && !this.isPlayed && this.options.scalable && (isNumber(scaleX) && (image.scaleX = scaleX, changed = !0), isNumber(scaleY) && (image.scaleY = scaleY, changed = !0), changed && this.renderImage())
        },
        scaleX: function(scaleX) {
            this.scale(scaleX, this.image.scaleY)
        },
        scaleY: function(scaleY) {
            this.scale(this.image.scaleX, scaleY)
        },
        stop: function() {
            this.isPlayed && (this.options.fullscreen && this.exitFullscreen(), this.isPlayed = !1, clearTimeout(this.playing), this.$player.removeClass($class_show).empty())
        },
        full: function() {
            var options = this.options,
                $image = this.$image,
                $list = this.$list;
            this.isShown && !this.isPlayed && !this.isFulled && options.inline && (this.isFulled = !0, this.$body.removeClass($class_open), this.$button.addClass($class_fullscreen_exit), options.transition && ($image.removeClass($class_transition), $list.removeClass($class_transition)), this.$viewer.addClass($class_fixed).removeAttr("style").css("z-index", options.zIndex), this.initContainer(), this.viewer = $.extend({},
                this.container), this.renderList(), this.initImage($.proxy(function() {
                    this.renderImage(function() {
                        options.transition && setTimeout(function() {
                                $image.addClass($class_transition),
                                    $list.addClass($class_transition)
                            },
                            0)
                    })
                },
                this)))
        },
        exit: function() {
            var options = this.options,
                $image = this.$image,
                $list = this.$list;
            this.isFulled && (this.isFulled = !1, this.$body.removeClass($class_open), this.$button.removeClass($class_fullscreen_exit), options.transition && ($image.removeClass($class_transition), $list.removeClass($class_transition)), this.$viewer.removeClass($class_fixed).css("z-index", options.zIndexInline), this.viewer = $.extend({},
                this.parent), this.renderViewer(), this.renderList(), this.initImage($.proxy(function() {
                    this.renderImage(function() {
                        options.transition && setTimeout(function() {
                                $image.addClass($class_transition),
                                    $list.addClass($class_transition)
                            },
                            0)
                    })
                },
                this)))
        },
        tooltip: function() {
            var options = this.options,
                $tooltip = this.$tooltip,
                image = this.image,
                classes = [$class_show, $class_fade, $class_transition].join(" ");
            this.isViewed && !this.isPlayed && options.tooltip && ($tooltip.text(round(100 * image.ratio) + "%"), this.tooltiping ? clearTimeout(this.tooltiping) : options.transition ? (this.fading && $tooltip.trigger($event_transitionend), $tooltip.addClass(classes), forceReflow($tooltip[0]), $tooltip.addClass($class_in)) : $tooltip.addClass($class_show), this.tooltiping = setTimeout($.proxy(function() {
                    options.transition ? ($tooltip.one($event_transitionend, $.proxy(function() {
                            $tooltip.removeClass(classes),
                                this.fading = !1
                        },
                        this)).removeClass($class_in), this.fading = !0) : $tooltip.removeClass($class_show),
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
            var index,
                $this = this.$element,
                $images = this.$images,
                indexes = [];
            if (this.isImg) {
                if (!$this.parent().length) {
                    return this.destroy()
                }
            } else {
                this.$images = $images = $this.find($selector_img),
                    this.length = $images.length
            }
            this.isBuilt && ($.each(this.$items,
                function(f) {
                    var g = $(this).find("img")[0],
                        h = $images[f];
                    h ? h.src !== g.src && indexes.push(f) : indexes.push(f)
                }), this.$list.width("auto"), this.initList(), this.isShown && (this.length ? this.isViewed && (index = $.inArray(this.index, indexes), index >= 0 ? (this.isViewed = !1, this.view(max(this.index - (index + 1), 0))) : this.$items.eq(this.index).addClass($class_active)) : (this.$image = null, this.isViewed = !1, this.index = 0, this.image = null, this.$canvas.empty(), this.$title.empty())))
        },
        destroy: function() {
            var $this = this.$element;
            this.options.inline ? this.unbind() : (this.isShown && this.unbind(), $this.off($event_click, this.start)),
                this.unbuild(),
                $this.removeData($namespace)
        },
        trigger: function(type, data) {
            var e = $.Event(type, data);
            return this.$element.trigger(e), e
        },
        shown: function() {
            var options = this.options;
            this.transitioning = !1,
                this.isFulled = !0,
                this.isShown = !0,
                this.isVisible = !0,
                this.render(),
                this.bind(),
            $.isFunction(options.shown) && this.$element.one($event_shown, options.shown),
                this.trigger($event_shown)
        },
        hidden: function() {
            var options = this.options;
            this.transitioning = !1,
                this.isViewed = !1,
                this.isFulled = !1,
                this.isShown = !1,
                this.isVisible = !1,
                this.unbind(),
                this.$body.addClass($class_open),
                this.$viewer.addClass($class_hide),
                this.resetList(),
                this.resetImage(),
            $.isFunction(options.hidden) && this.$element.one($event_hidden, options.hidden),
                this.trigger($event_hidden)
        },
        requestFullscreen: function() {
            var documentElement = document.documentElement; ! this.isFulled || document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || (documentElement.requestFullscreen ? documentElement.requestFullscreen() : documentElement.msRequestFullscreen ? documentElement.msRequestFullscreen() : documentElement.mozRequestFullScreen ? documentElement.mozRequestFullScreen() : documentElement.webkitRequestFullscreen && documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT))
        },
        exitFullscreen: function() {
            this.isFulled && (document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen())
        },
        change: function(event) {
            var offsetX = this.endX - this.startX,
                offsetY = this.endY - this.startY;
            switch (this.action) {
                case "move":
                    this.move(offsetX, offsetY);
                    break;
                case "zoom":
                    this.zoom(function(f, d, h, g) {
                        var k = sqrt(f * f + d * d),
                            j = sqrt(h * h + g * g);
                        return (j - k) / k
                    } (abs(this.startX - this.startX2), abs(this.startY - this.startY2), abs(this.endX - this.endX2), abs(this.endY - this.endY2)), !1, event),
                        this.startX2 = this.endX2,
                        this.startY2 = this.endY2;
                    break;
                case "switch":
                    this.action = "switched",
                    abs(offsetX) > abs(offsetY) && (offsetX > 1 ? this.prev() : -1 > offsetX && this.next())
            }
            this.startX = this.endX,
                this.startY = this.endY
        },
        isSwitchable: function() {
            var image = this.image,
                viewer = this.viewer;
            return image.left >= 0 && image.top >= 0 && image.width <= viewer.width && image.height <= viewer.height
        }
    };
    ak_Viewer.defaults = {
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
    ak_Viewer.template =
        '<div class="ak-viewer-container">' +
            '<div class="ak-viewer-canvas"></div>' +
            '<div class="ak-viewer-footer animated slideInUp h_10em bg_black07">' +
                '<div class="ak-viewer-title"></div>' +
                '<ul class="ak-viewer-toolbar">' +
                    '<li class="ak-viewer-one-to-one bg_black07" data-action="one-to-one"></li>' +
                    '<li class="ak-viewer-zoom-in bg_black07" data-action="zoom-in"></li>' +
                    '<li class="ak-viewer-zoom-out bg_black07" data-action="zoom-out"></li>' +
                    '<li class="ak-viewer-prev bg_black07" data-action="prev"></li>' +
                    '<li class="ak-viewer-next bg_black07" data-action="next"></li>' +
                    '<li class="ak-viewer-rotate-left bg_black07" data-action="rotate-left"></li>' +
                    '<li class="ak-viewer-rotate-right bg_black07" data-action="rotate-right"></li>' +
                    '<li class="ak-viewer-flip-horizontal bg_black07" data-action="flip-horizontal"></li>' +
                    '<li class="ak-viewer-flip-vertical bg_black07" data-action="flip-vertical"></li>' +
                    '<li class="ak-viewer-reset bg_black07" data-action="reset"></li>' +
                "</ul>" +
                '<div class="ak-viewer-navbar bg_black04">' +
                    '<ul class="ak-viewer-list"></ul>' +
                "</div>" +
            "</div>" +
            '<div class="ak-viewer-tooltip"></div>' +
            '<button type="button" class="ak-viewer-button bg_black07" data-action="mix"></button>' +
            '<div class="ak-mask"></div>' +
        "</div>";
    ak_Viewer.other = $.fn.AKjs_Viewer;
    $.fn.AKjs_Viewer = function(options) {
        var result, args = toArray(arguments, 1);
        return this.each(function() {
            var fn, $this = $(this),
                data = $this.data($namespace);
            if (!data) {
                if (/destroy|hide|exit|stop|reset/.test(options)) {
                    return
                }
                $this.data($namespace, data = new ak_Viewer(this, options));
            }
            isString(options) && $.isFunction(fn = data[options]) && (result = fn.apply(data, args));
        }),isUndefined(result) ? this: result;
    };
    $.fn.AKjs_Viewer.Constructor = ak_Viewer;
    $.fn.AKjs_Viewer.setDefaults = ak_Viewer.setDefaults,
        $.fn.AKjs_Viewer.noConflict = function() {
            return $.fn.AKjs_Viewer = ak_Viewer.other, this;
        }
}(jQuery));