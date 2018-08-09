/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_lightSlider---------------------------------------*/
(function($){
    var defaults = {
        item: 3,
        autoWidth: false,
        slideMove: 1,
        slideMargin: 10,
        activeClass: '',
        dotClass: new Array(),
        useCSS: true,
        speed: 400,
        auto: false,
        loop: false,
        pause: 2000,
        pager: false,
        freeMove: true,
        swipeThreshold: 40,
        responsive: [],
        onSliderClick: function ($el, num) {},
        onSliderLoad: function ($el) {}
    };
    $.fn.AKjs_lightSlider = function (options) {
        if (this.length === 0) {
            return this;
        }
        if (this.length > 1) {
            this.each(function () {
                $(this).AKjs_lightSlider(options);
            });
            return this;
        }
        var plugin = {},
            settings = $.extend(true, {}, defaults, options),
            settingsTemp = {},
            $el = this;
        plugin.$el = this;
        var $children = $el.children(),
            windowW = $(window).width(),
            breakpoint = null,
            resposiveObj = null,
            length = 0,
            w = 0,
            on = false,
            elSize = 0,
            $slide = '',
            scene = 0,
            property = 'width',
            gutter = 'margin-right',
            slideValue = 0,
            slideWidth = 0,
            interval = null,
            isTouch = ('ontouchstart' in document.documentElement);
        var refresh = {};
        refresh.chbreakpoint = function () {
            windowW = $(window).width();
            if (settings.responsive.length) {
                var item;
                if (settings.autoWidth === false) {
                    item = settings.item;
                }
                if (windowW < settings.responsive[0].breakpoint) {
                    for (var i = 0; i < settings.responsive.length; i++) {
                        if (windowW < settings.responsive[i].breakpoint) {
                            breakpoint = settings.responsive[i].breakpoint;
                            resposiveObj = settings.responsive[i];
                        }
                    }
                }
                if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
                    for (var j in resposiveObj.settings) {
                        if (resposiveObj.settings.hasOwnProperty(j)) {
                            if (typeof settingsTemp[j] === 'undefined' || settingsTemp[j] === null) {
                                settingsTemp[j] = settings[j];
                            }
                            settings[j] = resposiveObj.settings[j];
                        }
                    }
                }
                if (!$.isEmptyObject(settingsTemp) && windowW > settings.responsive[0].breakpoint) {
                    for (var k in settingsTemp) {
                        if (settingsTemp.hasOwnProperty(k)) {
                            settings[k] = settingsTemp[k];
                        }
                    }
                }
                if (settings.autoWidth === false) {
                    if (slideValue > 0 && slideWidth > 0) {
                        if (item !== settings.item) {
                            scene = Math.round(slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove));
                        }
                    }
                }
            }
        };
        refresh.calSW = function () {
            if (settings.autoWidth === false) {
                slideWidth = (elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
            }
        };
        refresh.calWidth = function (cln) {
            var ln = cln === true ? $slide.find('.ak-lslide').length : $children.length;
            if (settings.autoWidth === false) {
                w = ln * (slideWidth + settings.slideMargin);
            } else {
                w = 0;
                for (var i = 0; i < ln; i++) {
                    w += (parseInt($children.eq(i).width()) + settings.slideMargin);
                }
            }
            return w;
        };
        plugin = {
            doCss: function () {
                var support = function () {
                    var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                    var root = document.documentElement;
                    for (var i = 0; i < transition.length; i++) {
                        if (transition[i] in root.style) {
                            return true;
                        }
                    }
                };
                if (settings.useCSS && support()) {
                    return true;
                }
                return false;
            },
            initialStyle: function () {
                var $this = this;
                if (settings.autoWidth) {
                    settings.slideMove = 1;
                    settings.item = 1;
                }
                if (settings.loop) {
                    settings.slideMove = 1;
                    settings.freeMove = false;
                }
                refresh.chbreakpoint();
                $el.addClass('ak-lightSlider').wrap('<div class="ak-lSSlideOuter"><div class="ak-lSSlideWrapper"></div></div>');
                $slide = $el.parent('.ak-lSSlideWrapper');
                elSize = $el.outerWidth();
                $children.addClass('ak-lslide');
                if (settings.loop === true) {
                    refresh.calSW();
                    refresh.clone = function () {
                        if (refresh.calWidth(true) > elSize) {
                            /**/
                            var tWr = 0,
                                tI = 0;
                            for (var k = 0; k < $children.length; k++) {
                                tWr += (parseInt($el.find('.ak-lslide').eq(k).width()) + settings.slideMargin);
                                tI++;
                                if (tWr >= (elSize + settings.slideMargin)) {
                                    break;
                                }
                            }
                            var tItem = settings.autoWidth === true ? tI : settings.item;

                            /**/
                            if (tItem < $el.find('.ak-lSSclone.ak-lSSleft').length) {
                                for (var i = 0; i < $el.find('.ak-lSSclone.ak-lSSleft').length - tItem; i++) {
                                    $children.eq(i).remove();
                                }
                            }
                            if (tItem < $el.find('.ak-lSSclone.ak-lSSright').length) {
                                for (var j = $children.length - 1; j > ($children.length - 1 - $el.find('.ak-lSSclone.ak-lSSright').length); j--) {
                                    scene--;
                                    $children.eq(j).remove();
                                }
                            }
                            /**/
                            for (var n = $el.find('.ak-lSSclone.ak-lSSright').length; n < tItem; n++) {
                                $el.find('.ak-lslide').eq(n).clone().removeClass('ak-lslide').addClass('ak-lSSclone ak-lSSright').appendTo($el);
                                scene++;
                            }
                            for (var m = $el.find('.ak-lslide').length - $el.find('.ak-lSSclone.ak-lSSleft').length; m > ($el.find('.ak-lslide').length - tItem); m--) {
                                $el.find('.ak-lslide').eq(m - 1).clone().removeClass('ak-lslide').addClass('ak-lSSclone ak-lSSleft').prependTo($el);
                            }
                            $children = $el.children();
                        } else {
                            if ($children.hasClass('ak-lSSclone')) {
                                $el.find('.ak-lSSclone').remove();
                                $this.move($el, 0);
                            }
                        }
                    };
                    refresh.clone();
                }
                var index = 0;
                $children.on('click', function () {
                    var le_length = $el.find(".ak-lSSclone.ak-lSSleft").length;
                    var mi_length = $el.find(".ak-lslide").length;
                    var al_length = $children.length;
                    var i = $(this).index();
                    index = i;
                    if (i >= mi_length + le_length) {
                        if(i != al_length-1){
                            index = i - mi_length;
                        }

                    }
                    if (i < le_length ) {
                        index = i + mi_length;
                    }
                    var num = index-le_length+1;
                    settings.onSliderClick($(this),num);
                    $(this).addClass('ak-is_active '+settings.activeClass).siblings($children).removeClass('ak-is_active '+settings.activeClass);
                });
                refresh.sSW = function () {
                    length = $children.length;
                    if (settings.autoWidth === false) {
                        $children.css(property, slideWidth + 'px');
                    }
                    $children.css(gutter, settings.slideMargin + 'px');
                    w = refresh.calWidth(false);
                    $el.css(property, w + 'px');
                    if (settings.loop === true) {
                        if (on === false) {
                            scene = $el.find('.ak-lSSclone.ak-lSSleft').length;
                        }
                    }
                };
                refresh.calL = function () {
                    $children = $el.children();
                    length = $children.length;
                };
                if (this.doCss()) {
                    $slide.addClass('ak-usingCss');
                }
                refresh.calL();
                refresh.calSW();
                refresh.sSW();
                if (settings.loop === true) {
                    slideValue = $this.slideValue();
                    this.move($el, slideValue);
                }
                this.setHeight($el, false);
                if (settings.loop === true) {
                    $children.eq(scene).addClass('ak-is_active '+settings.activeClass);
                } else {
                    $children.first().addClass('ak-is_active '+settings.activeClass);
                }
            },
            pager: function () {
                var $this = this;
                refresh.createPager = function () {
                    var $children = $slide.find('.ak-lslide');
                    var length = $slide.find('.ak-lslide').length;
                    var i = 0,
                        pagers = '',
                        v = 0;
                    for (i = 0; i < length; i++) {
                        // calculate scene * slide value
                        if (!settings.autoWidth) {
                            v = i * ((slideWidth + settings.slideMargin) * settings.slideMove);
                        } else {
                            v += ((parseInt($children.eq(i).width()) + settings.slideMargin) * settings.slideMove);
                        }
                        pagers += '<li>' + (i + 1) + '</li>';
                        if ((v) >= w - elSize - settings.slideMargin) {
                            i = i + 1;
                            var minPgr = 2;
                            if (settings.autoWidth) {
                                pagers += '<li>' + (i + 1) + '</li>';
                                minPgr = 1;
                            }
                            if (i < minPgr) {
                                pagers = null;
                                $slide.parent().addClass('ak-noPager');
                            } else {
                                $slide.parent().removeClass('ak-noPager');
                            }
                            break;
                        }
                    }
                    var $cSouter = $slide.parent();
                    $cSouter.find('.ak-lSPager').html(pagers);
                    var $pager = $cSouter.find('.ak-lSPager').find('li');
                    $pager.addClass(settings.dotClass[0]);
                    $pager.first().addClass('active '+settings.dotClass[1]);
                    $pager.on('click', function () {
                        if (settings.loop === true) {
                            scene = scene + ($pager.index(this) - $cSouter.find('.ak-lSPager').find('li.ak-is_active').index());
                        } else {
                            scene = $pager.index(this);
                        }
                        $el.mode(false);
                        return false;
                    });
                };
                if (settings.pager) {
                    var cl = 'ak-lSpg';
                    $slide.after('<ul class="ak-lSPager ' + cl + '"></ul>');
                    refresh.createPager();
                }

                setTimeout(function () {
                    refresh.init();
                }, 0);
            },
            setHeight: function (ob) {
                var obj = null,
                    $this = this;
                if (settings.loop) {
                    obj = ob.children('.ak-lslide ').first();
                } else {
                    obj = ob.children().first();
                }
                var setCss = function () {
                    var tH = obj.outerHeight(),
                        tP = 0,
                        tHT = tH;
                    ob.css({
                        'height': tH+2 + 'px',
                        'padding-bottom': tP + '%'
                    });
                };
                setCss();
                if (obj.length) {
                    if ( obj[0].complete) {
                        setCss();
                        if (!interval) {
                            $this.auto();
                        }
                    }
                    /*else{
                        obj.load(function () {
                            setTimeout(function () {
                                setCss();
                                if (!interval) {
                                    $this.auto();
                                }
                            }, 100);
                        });
                    }*/
                }else{
                    if (!interval) {
                        $this.auto();
                    }
                }
            },
            active: function (ob, t) {
                var sc = 0;
                if (scene * settings.slideMove < length) {
                    ob.removeClass('active '+settings.dotClass[1]);
                    if (t === true) {
                        sc = scene;
                    } else {
                        sc = scene * settings.slideMove;
                    }
                    //t === true ? sc = scene : sc = scene * settings.slideMove;
                    var l, nl;
                    if (t === true) {
                        l = ob.length;
                        nl = l - 1;
                        if (sc + 1 >= l) {
                            sc = nl;
                        }
                    }
                    if (settings.loop === true) {
                        if (t === true) {
                            sc = scene - $el.find('.ak-lSSclone.ak-lSSleft').length;
                        } else {
                            sc = scene * settings.slideMove;
                        }
                        if (t === true) {
                            l = ob.length;
                            nl = l - 1;
                            if (sc + 1 === l) {
                                sc = nl;
                            } else if (sc + 1 > l) {
                                sc = 0;
                            }
                        }
                    }
                    ob.eq(sc).addClass('active '+settings.dotClass[1]);
                } else {
                    ob.removeClass('active '+settings.dotClass[1]);
                    ob.eq(ob.length - 1).addClass('active '+settings.dotClass[1]);
                }
            },
            move: function (ob, v) {
                if (this.doCss()) {
                    ob.css({
                        'transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                        '-webkit-transform': 'translate3d(' + (-v) + 'px, 0px, 0px)',
                    });
                } else {
                    ob.css('position', 'relative').animate({
                        left: -v + 'px'
                    }, settings.speed, 'linear');
                }
            },
            slide: function () {
                var $this = this;
                refresh.calSlide = function () {
                    if (w > elSize) {
                        slideValue = $this.slideValue();
                        if ((slideValue) > w - elSize - settings.slideMargin) {
                            slideValue = w - elSize - settings.slideMargin;
                        } else if (slideValue < 0) {
                            slideValue = 0;
                        }
                        $this.move($el, slideValue);
                        if (settings.loop === true) {
                            if (scene >= (length - ($el.find('.ak-lSSclone.ak-lSSleft').length / settings.slideMove))) {
                                $this.resetSlide($el.find('.ak-lSSclone.ak-lSSleft').length);
                            }
                            if (scene === 0) {
                                $this.resetSlide($slide.find('.ak-lslide').length);
                            }
                        }
                    }
                };
                refresh.calSlide();
            },
            resetSlide: function (s) {
                var $this = this;
                setTimeout(function () {
                    scene = s;
                    $slide.css('transition-duration', '0ms');
                    slideValue = $this.slideValue();
                    plugin.move($el, slideValue);
                    setTimeout(function () {
                        $slide.css('transition-duration', settings.speed + 'ms');
                    }, 50);
                }, settings.speed + 100);
            },
            slideValue: function () {
                var _sV = 0;
                if (settings.autoWidth === false) {
                    _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove);
                } else {
                    _sV = 0;
                    for (var i = 0; i < scene; i++) {
                        _sV += (parseInt($children.eq(i).width()) + settings.slideMargin);
                    }
                }
                return _sV;
            },
            auto: function () {
                if (settings.auto) {
                    clearInterval(interval);
                    interval = setInterval(function () {
                        $el.goToNextSlide();
                    }, settings.pause);
                }
            },
            touchMove: function (endCoords, startCoords) {
                $slide.css('transition-duration', '0ms');
                var distance = endCoords - startCoords;
                var swipeVal = slideValue - distance;
                if ((swipeVal) >= w - elSize - settings.slideMargin) {
                    if (settings.freeMove === false) {
                        swipeVal = w - elSize - settings.slideMargin;
                    } else {
                        var swipeValT = w - elSize - settings.slideMargin;
                        swipeVal = swipeValT + ((swipeVal - swipeValT) / 5);

                    }
                } else if (swipeVal < 0) {
                    if (settings.freeMove === false) {
                        swipeVal = 0;
                    } else {
                        swipeVal = swipeVal / 5;
                    }
                }
                this.move($el, swipeVal);
            },
            touchEnd: function (distance) {
                $slide.css('transition-duration', '500ms');
                var mxVal = false;
                var _next = true;
                slideValue = slideValue - distance;
                if ((slideValue) > w - elSize - settings.slideMargin) {
                    slideValue = w - elSize - settings.slideMargin;
                    if (settings.autoWidth === false) {
                        mxVal = true;
                    }
                } else if (slideValue < 0) {
                    slideValue = 0;
                }
                var gC = function (next) {
                    var ad = 0;
                    if (!mxVal) {
                        if (next) {
                            ad = 1;
                        }
                    }
                    if (!settings.autoWidth) {
                        var num = slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove);
                        scene = parseInt(num) + ad;
                        if (slideValue >= (w - elSize - settings.slideMargin)) {
                            if (num % 1 !== 0) {
                                scene++;
                            }
                        }
                    } else {
                        var tW = 0;
                        for (var i = 0; i < $children.length; i++) {
                            tW += (parseInt($children.eq(i).width()) + settings.slideMargin);
                            scene = i + ad;
                            if (tW >= slideValue) {
                                break;
                            }
                        }
                    }
                };
                if (distance >= settings.swipeThreshold) {
                    gC(false);
                    _next = false;
                } else if (distance <= -settings.swipeThreshold) {
                    gC(true);
                    _next = false;
                }
                $el.mode(_next);
            },
            enableDrag: function () {
                var $this = this;
                if (!isTouch) {
                    var startCoords = 0,
                        endCoords = 0,
                        isDraging = false;
                    $slide.on('mousedown', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        if ($(e.target).attr('class') !== ('ak-lSPrev') && $(e.target).attr('class') !== ('ak-lSNext')) {
                            startCoords = e.pageX;
                            isDraging = true;
                            if (e.preventDefault) {
                                e.preventDefault();
                            } else {
                                e.returnValue = false;
                            }
                            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                            $slide.scrollLeft += 1;
                            $slide.scrollLeft -= 1;
                            // *
                            clearInterval(interval);
                        }
                    });
                    $(window).on('mousemove', function (e) {
                        if (isDraging) {
                            endCoords = e.pageX;
                            $this.touchMove(endCoords, startCoords);
                        }
                    });
                    $(window).on('mouseup', function (e) {
                        if (isDraging) {
                            isDraging = false;
                            endCoords = e.pageX;
                            var distance = endCoords - startCoords;
                            if (Math.abs(distance) >= settings.swipeThreshold) {
                                $(window).on('click.ls', function (e) {
                                    if (e.preventDefault) {
                                        e.preventDefault();
                                    } else {
                                        e.returnValue = false;
                                    }
                                    e.stopImmediatePropagation();
                                    e.stopPropagation();
                                    $(window).off('click.ls');
                                });
                            }
                            $this.touchEnd(distance);
                        }
                    });
                }
            },
            enableTouch: function () {
                var $this = this;
                if (isTouch) {
                    var startCoords = {},
                        endCoords = {};
                    $slide.on('touchstart', function (e) {
                        endCoords = e.originalEvent.targetTouches[0];
                        startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                        startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
                        clearInterval(interval);
                    });
                    $slide.on('touchmove', function (e) {
                        if (w < elSize) {
                            if (w !== 0) {
                                return false;
                            }
                        }
                        var orig = e.originalEvent;
                        endCoords = orig.targetTouches[0];
                        var xMovement = Math.abs(endCoords.pageX - startCoords.pageX);
                        var yMovement = Math.abs(endCoords.pageY - startCoords.pageY);
                        if ((xMovement * 3) > yMovement) {
                            e.preventDefault();
                        }
                        $this.touchMove(endCoords.pageX, startCoords.pageX);
                    });
                    $slide.on('touchend', function () {
                        if (w < elSize) {
                            if (w !== 0) {
                                /*return false;*/
                            }
                        }
                        var distance;
                        distance = endCoords.pageX - startCoords.pageX;
                        $this.touchEnd(distance);
                    });
                }
            },
            build: function () {
                var $this = this;
                $this.initialStyle();
                if (this.doCss()) {
                    $this.enableTouch();
                    $this.enableDrag();
                }
                $(window).on('focus', function(){
                    $this.auto();
                });
                $(window).on('blur', function(){
                    clearInterval(interval);
                });
                $this.pager();
            }
        };
        setTimeout(function() {
            plugin.build();
        },100);
        refresh.init = function () {
            refresh.chbreakpoint();
            elSize = $slide.outerWidth();
            if (settings.loop === true) {
                refresh.clone();
            }
            refresh.calL();
            $el.removeClass('ak-lSSlide');
            refresh.calSW();
            refresh.sSW();
            setTimeout(function () {
                $el.addClass('ak-lSSlide');
            }, 1000);
            if (settings.pager) {
                refresh.createPager();
            }
            plugin.setHeight($el, false);
            plugin.slide();
        };
        $el.goToPrevSlide = function () {
            if (scene > 0) {
                scene--;
                $el.mode(false);
            } else {
                if (settings.loop === true) {
                    $el.mode(false);
                }
            }
        };
        $el.goToNextSlide = function () {
            var nextI = true;
            var _slideValue = plugin.slideValue();
            nextI = _slideValue < w - elSize - settings.slideMargin;
            if (((scene * settings.slideMove) < length - settings.slideMove) && nextI) {
                scene++;
                $el.mode(false);
            } else {
                if (settings.loop === true) {
                    scene = 0;
                    $el.mode(false);
                }
            }
        };
        $el.mode = function (_touch) {
            if (on === false) {
                if (plugin.doCss()) {
                    $el.addClass('ak-lSSlide');
                    if (settings.speed !== '') {
                        $slide.css('transition-duration', settings.speed + 'ms');
                    }
                    $slide.css('transition-timing-function', 'ease');
                }
            }
            plugin.slide();
            if (!$slide.hasClass('ak-lshover')) {
                plugin.auto();
            }
            on = true;
        };
        $el.play = function () {
            $el.goToNextSlide();
            settings.auto = true;
            plugin.auto();
        };
        $el.pause = function () {
            settings.auto = false;
            clearInterval(interval);
        };
        $el.refresh = function () {
            refresh.init();
        };
        $el.getCurrentSlideCount = function () {
            var sc = scene;
            if (settings.loop) {
                var ln = $slide.find('.ak-lslide').length,
                    cl = $el.find('.ak-lSSclone.ak-lSSleft').length;
                if (scene <= cl - 1) {
                    sc = ln + (scene - cl);
                } else if (scene >= (ln + cl)) {
                    sc = scene - ln - cl;
                } else {
                    sc = scene - cl;
                }
            }
            return sc + 1;
        };
        $el.getTotalSlideCount = function () {
            return $slide.find('.ak-lslide').length;
        };
        $el.goToSlide = function (s) {
            if (settings.loop) {
                scene = (s + $el.find('.ak-lSSclone.ak-lSSleft').length - 1);
            } else {
                scene = s;
            }
            $el.mode(false);
        };
        $el.destroy = function () {
            if ($el.AKjs_lightSlider) {
                $el.goToPrevSlide = function(){};
                $el.goToNextSlide = function(){};
                $el.mode = function(){};
                $el.play = function(){};
                $el.pause = function(){};
                $el.refresh = function(){};
                $el.getCurrentSlideCount = function(){};
                $el.getTotalSlideCount = function(){};
                $el.goToSlide = function(){};
                $el.AKjs_lightSlider = null;
                refresh = {
                    init : function(){}
                };
                $el.parent().parent().find('.ak-lSPager').remove();
                $el.removeClass('ak-lightSlider ak-lSSlide ak-lSSright').removeAttr('style').unwrap().unwrap();
                $el.children().removeAttr('style');
                $children.removeClass('ak-lslide active');
                $el.find('.ak-lSSclone').remove();
                $children = null;
                interval = null;
                on = false;
                scene = 0;
            }

        };
        setTimeout(function () {
            settings.onSliderLoad.call(this, $el);
        }, 100);
        $(window).on('resize orientationchange', function (e) {
            setTimeout(function () {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                refresh.init();
            }, 200);
        });
        return this;
    };
}(jQuery));
