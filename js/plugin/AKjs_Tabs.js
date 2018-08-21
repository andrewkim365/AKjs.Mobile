/*
Modification Date: 2018-08-21
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Tabs--------------------------------------------*/
(function($){
    var Plugin = function(elem, options) {
        this.$wrapper = elem;
        this.timer = null;
        this.playTimer = null;
        this.iNow = 0;
        this.defaults = {
            curDisplay: 1,
            touchmode: false,
            mouse: 'click',
            playDelay: 1000,
            content_dom: "",
            boxheight: false,
            navlength: false,
            fullclass: 'bor_bottom2 bor_title c_title',
            emptyclass: 'bor_bottom bor_gray_ddd',
            changeMethod: 'default',
            autoPlay: false,
            callback: function() {},
            changeback: function() {}
        };
        this.opts = $.extend({},
            this.defaults, options);
    };
    Plugin.prototype = {
        inital: function() {
            var self = this;

            setTimeout(function() {
                self.setData();
                self.tabInital();
            },100);
            AKjs_UserAgent();
            if (!IsMobile) {
                $(window).resize(function(){
                    self.setData();
                    self.tabInital();
                });
            }

            this.$tab_list = this.$wrapper.children('nav').children('ul').children('li');

            if (this.opts.content_dom) {
                this.$tabCont_art = $(this.opts.content_dom);
            } else {
                this.$tabCont_art = this.$wrapper.children("article");
            }
            this.$tabCont_wrap = this.$tabCont_art.children('div');

            this.$tab_cont = this.$tabCont_wrap.find('section');
            if (this.opts.mouse === 'click') {
                //this.$tab_list.unbind("click");
                this.$tab_list.click(function() {
                    self.changeTab($(this).index());
                    self.iNow = $(this).index();
                });
            } else if (this.opts.mouse === 'hover') {
                this.$tab_list.hover(function() {
                        var cur_obj = this;
                        clearTimeout(self.timer);
                        self.timer = setTimeout(function() {
                            self.changeTab($(cur_obj).index());
                        }, 30);
                        self.iNow = $(this).index();
                    },
                    function() {
                        clearTimeout(self.timer);
                    });
            } else {
                //this.$tab_list.unbind("click");
                this.$tab_list.click(function() {
                    self.changeTab($(this).index());
                    self.iNow = $(this).index();
                });
            }
            if (this.opts.autoPlay) {
                clearInterval(this.playTimer);
                this.playTimer = setInterval(function() {
                    self.autoPlay();
                }, this.opts.playDelay);

                this.$wrapper.hover(function() {
                        //clearInterval(self.playTimer); //鼠标滑动后自动播放将会停止
                    },
                    function() {
                        self.playTimer = setInterval(function() {
                            self.autoPlay();
                        }, this.opts.playDelay);
                    });
            }
            var tmp = this.opts.curDisplay;
            if (this.opts.touchmode) {
                this.$tab_cont.on({
                    touchstart: function (e) {
                        touchStartY = e.originalEvent.touches[0].clientY;
                        touchStartX = e.originalEvent.touches[0].clientX;
                    },
                    touchend: function (e) {
                        var touchEndY = e.originalEvent.changedTouches[0].clientY,
                            touchEndX = e.originalEvent.changedTouches[0].clientX,
                            yDiff = touchStartY - touchEndY,
                            xDiff = touchStartX - touchEndX,
                            tabsize = self.$tab_list.length;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            if (xDiff > 5) {
                                ++tmp;
                                if (tmp > tabsize) {
                                    tmp = 1
                                }
                                //console.log("right==="+tmp)
                                self.$tab_list.eq(tmp - 1).click();
                            } else {
                                --tmp;
                                //console.log("tmp==="+tmp)
                                if (tmp == 0) {
                                    tmp = tabsize
                                }
                                ///console.log("left==="+tmp)
                                self.$tab_list.eq(tmp - 1).click();
                            }
                        }
                        touchStartY = null;
                        touchStartX = null
                    },
                    touchmove: function (e) {
                        var touchEndY = e.originalEvent.changedTouches[0].clientY,
                            touchEndX = e.originalEvent.changedTouches[0].clientX,
                            yDiff = touchStartY - touchEndY,
                            xDiff = touchStartX - touchEndX;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            e.preventDefault()
                        }
                    },
                    mousedown: function (e) {
                        touchStartY = e.originalEvent.clientY;
                        touchStartX = e.originalEvent.clientX;
                    },
                    mouseup: function (e) {
                        var touchEndY = e.originalEvent.screenY,
                            touchEndX = e.originalEvent.screenX,
                            yDiff = touchStartY - touchEndY,
                            xDiff = touchStartX - touchEndX,
                            tabsize = self.$tab_list.length;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            if (xDiff > 5) {
                                ++tmp;
                                if (tmp > tabsize) {
                                    tmp = 1
                                }
                                //console.log("right==="+tmp)
                                self.$tab_list.eq(tmp - 1).click();
                            } else {
                                --tmp;
                                //console.log("tmp==="+tmp)
                                if (tmp == 0) {
                                    tmp = tabsize
                                }
                                ///console.log("left==="+tmp)
                                self.$tab_list.eq(tmp - 1).click();
                            }
                        }
                        touchStartY = null;
                        touchStartX = null
                    },
                    mousemove: function (e) {
                        e.preventDefault();
                    }
                });
            }
        },
        setData: function() { // 设置样式
            if (this.$tab_list.length == this.opts.navlength) {
                this.$tab_list.removeClass("pl_1em pr_1em");
                this.$tab_list.parent("ul").removeClass("nav_line").addClass("nav_line_c");
                this.$tab_list.parent("ul").addClass("length" + this.$tab_list.length);
            }
            this.$tab_cont.css({
                "width": this.$tabCont_art.width()
            });
            if (this.opts.boxheight) {
                this.$tabCont_wrap.parent().css({
                    height: this.opts.boxheight
                });
                this.$tab_cont.css({
                    height: this.opts.boxheight
                });
            } else {
                this.$tabCont_wrap.parent().css({
                    "height": "auto"
                });
            }

            var tabCont_w = this.$tab_cont.width();
            var tabCont_h = this.$tab_cont.height();
            var tabCont_len = this.$tab_cont.length;

            switch (this.opts.changeMethod) {
                case 'default':
                    this.$tab_cont.css({
                        display: 'none'
                    });
                    break;
                case 'horizontal':
                    this.$tabCont_wrap.css({
                        width: tabCont_w * tabCont_len
                    });
                    this.$tab_cont.addClass("fl");
                    break;
                case 'vertical':
                    this.$tabCont_wrap.css({
                        height: tabCont_h * tabCont_len
                    });
                    break;
                case 'opacity':
                    this.$tab_cont.css({
                        display: 'none'
                    });
                    break;
                default:
                    this.$tab_cont.css({
                        display: 'none'
                    });
                    break;
            }
        },
        tabInital: function() { // 初始化当前显示
            var curNum = this.opts.curDisplay - 1;
            this.$tab_list.removeClass(this.opts.fullclass);
            this.$tab_list.eq(curNum).addClass(this.opts.fullclass);
            this.opts.callback(this.$tab_cont.eq(curNum),curNum);
            if (this.opts.changeMethod != 'vertical') {
                this.$tab_cont.css({
                    "height": "0",
                    "margin-bottom": "1%"
                });
                this.$tab_cont.eq(curNum).css({
                    "height": "auto"
                });
            } else {
                if (!this.opts.boxheight) {
                    this.$tabCont_wrap.parent().css({
                        height: this.$tab_cont.eq(curNum).outerHeight()
                    });
                }
            }
            if (this.opts.changeMethod === 'default' || this.opts.changeMethod === 'opacity') {
                this.$tab_cont.eq(curNum).css({
                    display: 'block'
                });
            } else if (this.opts.changeMethod === 'horizontal') {
                this.$tabCont_wrap.css({
                    left: -curNum * this.$tab_cont.width()
                });
            } else if (this.opts.changeMethod === 'vertical') {
                this.$tabCont_wrap.css({
                    top: -curNum * this.$tab_cont.height()
                });
            } else {
                this.$tab_cont.eq(curNum).css({
                    display: 'block'
                });
            }
            this.iNow = this.opts.curDisplay - 1;
        },
        changeTab: function(index) {
            this.$tab_list.removeClass(this.opts.fullclass).addClass(this.opts.emptyclass).removeAttr("style");
            this.$tab_list.eq(index).removeClass(this.opts.emptyclass).addClass(this.opts.fullclass);
            this.opts.changeback(this.$tab_cont.eq(index),index);
            if (this.opts.changeMethod != 'vertical') {
                var that = this;
                setTimeout(function () {
                    that.$tab_cont.css({
                        "height": "0"
                    });
                    that.$tab_cont.eq(index).css({
                        "height": "auto"
                    });
                }, 500);
                this.$tab_cont.eq(index).css({
                    "height": "auto"
                });
            }
            switch (this.opts.changeMethod) {
                case 'default':
                    this.$tab_cont.css({
                        display: 'none'
                    });
                    this.$tab_cont.eq(index).css({
                        display: 'block'
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        });
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        });
                    }
                    break;
                case 'horizontal':
                    this.$tabCont_wrap.stop().animate({
                        left: this.$tab_cont.width() * -index
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        });
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        });
                    }
                    break;
                case 'vertical':
                    this.$tabCont_wrap.stop().animate({
                        top: this.$tab_cont.height() * -index
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        });
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        });
                    }
                    break;
                case 'opacity':
                    this.$tab_cont.removeClass("rel").addClass("abs");
                    this.$tab_cont.eq(index).removeClass("abs").addClass("rel");
                    this.$tab_cont.stop().fadeOut();
                    this.$tab_cont.eq(index).stop().fadeIn();

                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        });
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        });
                    }
                    break;
                default:
                    this.$tab_cont.css({
                        display: 'none'
                    });
                    this.$tab_cont.eq(index).css({
                        display: 'block'
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        });
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        });
                    }
                    break;
            }
        },
        autoPlay: function() { // 自动播放
            if (this.iNow === this.$tab_list.length - 1) {
                this.iNow = 0;
            } else {
                this.iNow++;
            }
            this.changeTab(this.iNow);
        },
        constructor: Plugin
    };
    $.fn.AKjs_Tabs = function(options) {
        var plugin = new Plugin(this, options);
        return plugin.inital();
    };
}(jQuery));
