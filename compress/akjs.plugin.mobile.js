/*! jQuery.AKjs.Mobile by Mobile Web App Plugin v1.5.8 Stable --- Copyright Andrew.Kim | (c) 20170808 ~ 20191118 AKjs.Mobile license */
/*! Coding by Andrew.Kim (E-mail: andrewkim365@qq.com) https://github.com/andrewkim365/AKjs.Mobile */

/*-----------------------------------------------AKjs_Vticker (2019-06-11)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Vticker = function(setting) {
        var option = $.extend({
            speed: 500,
            pause: 3000,
            showItems: 3,
            mousePause: true,
            isPaused: false,
            direction: "up",
            height: 0,
            CallBack: function() {}
        }, setting);
        moveUp = function(ele, LiHeight, option) {
            if (!option.isPaused) {
                ele_children = ele.children();
                var datas = ele_children.children("li:first").clone(true);
                if (option.height > 0) LiHeight = ele_children.children("li:first").outerHeight();
                ele_children.animate({
                        top: "-=" + LiHeight
                    },
                    option.speed,
                    function() {
                        $(this).children("li:first").remove();
                        $(this).css("top", "0")
                    });
                datas.appendTo(ele_children)
            }
        };
        moveDown = function(ele, LiHeight, option) {
            if (!option.isPaused) {
                ele_children = ele.children();
                var datas = ele_children.children("li:last").clone(true);
                if (option.height > 0) LiHeight = ele_children.children("li:first").outerHeight();
                ele_children.css("top", "-" + LiHeight).prepend(datas);
                ele_children.animate({
                        top: 0
                    },
                    option.speed,
                    function() {
                        $(this).children("li:last").remove()
                    });
            }
        };
        var _this = $(this);
        $(window).resize(function() {
            _this.each(function () {
                var ele = $(this),
                    LiHeight = $(this).children().children("li").outerHeight();
                if (option.height) {
                    ele.height(option.height);
                    ele.children().children("li").height(option.height / option.showItems);
                } else {
                    ele.height(LiHeight * option.showItems)
                }
            });
        });
        _this.each(function() {
            var ele = $(this),
                LiHeight = $(this).children().children("li").outerHeight();
            ele.css({
                overflow: "hidden",
                position: "relative"
            }).children().css({
                position: "absolute"
            });
            if (option.height) {
                ele.height(option.height);
                ele.children().children("li").height(option.height / option.showItems);
            } else {
                ele.height(LiHeight * option.showItems)
            }
            setInterval(function() {
                    option.direction == "up" ? moveUp(ele, LiHeight, option) : moveDown(ele, LiHeight, option);
                    option.CallBack(ele);
                },
                option.pause);
            option.mousePause && ele.bind("mouseenter",
                function() {
                    option.isPaused = true
                }).bind("mouseleave",
                function() {
                    option.isPaused = false
                })
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_NowTime (2019-06-11)--------------------------------------------*/
(function($) {
    $.fn.AKjs_NowTime = function(setting) {
        var option = $.extend({
                dateStyle: 'yyyy-MM-dd hh:mm:ss',
                CallBack: function() {}
            },
            setting);
        var time = this;
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        setInterval(function(){
            var date_text = new Date().Format(option.dateStyle);
            time.html(date_text);
            option.CallBack(date_text);
        },1000);
    };
} (jQuery));

/*-----------------------------------------------AKjs_Popupwin (2018-12-20)--------------------------------------------*/
function AKjs_Popupwin (setting) {
    option = $.extend({
        dom: "",
        position: "",
        effectIn: "",
        effectOut: "",
        hasMask: true,
        closeBtn: "",
        OneButton: "",
        maskPosition: "",
        toggleIcon: "",
        callback :function () {},
        scrollback :function () {}
    },setting);
    setPopupStyle();
    $(window).resize(function(){
        setPopupStyle();
    });
    var setTimes = 100;
    if (option.OneButton) {
        $(option.closeBtn).unbind("click");
        $(option.closeBtn).on('click', function() {
            option.callback($(option),false,option);
            ClickHideModal();
        });
        AKjs_UserAgent();
        $(option.OneButton).toggleClass("ak-is_active");
        if ($(option.OneButton).hasClass("ak-is_active")) {
            setPopupStyle();
            setTimeout(function() {
                if (option.hasMask) {
                    addModalMask();
                    $("#ak-scrollview").removeClass("scrolling_touch");
                }
                if (option.position === 'offset') {
                    if (IsMobile) {
                        var oth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight();
                        olw = 0;
                    } else {
                        var isOth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight() - $("#ak-scrollview").offset().top + $("#ak-scrollview").scrollTop();
                        if (isOth > $("#ak-scrollview").outerHeight()) {
                            var oth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight();
                        } else {
                            var oth = isOth;
                        }
                        olw = $(option.OneButton).offset().left + $(option.OneButton).outerWidth() - $("#ak-scrollview").offset().left;
                        if ($(window).width() - olw > 0) {
                            olw = $(option.OneButton).offset().left + $(option.OneButton).outerWidth() - $("#ak-scrollview").offset().left - $(option.dom).outerWidth();
                        }
                    }
                    $(option.dom).css({
                        "top": oth,
                        "left": olw
                    });
                    $(window).resize(function(){
                        $(option.dom).addClass("dis_none");
                        ClickHideModal();
                    });
                }
                if (option.effectIn || option.effectOut) {
                    $(option.dom).removeClass("animated " + option.effectOut).addClass("animated " + option.effectIn).removeClass("dis_none");
                }
                if (option.toggleIcon) {
                    if (option.position != 'offset') {
                        $(option.OneButton).find("i").attr("data-icon",$(option.OneButton).find("i").attr("class"));
                        $(option.OneButton).find("i").removeClass($(option.OneButton).find("i").attr("class")).addClass(option.toggleIcon);
                    }
                }
                option.callback($(option),true,option);
            },setTimes);
        } else {
            option.callback($(option),false,option);
            ClickHideModal();
        }
    } else {
        if (option.effectIn || option.effectOut) {
            $(option.dom).removeClass("animated " + option.effectOut).addClass("animated " + option.effectIn).removeClass("dis_none");
        }
        if (option.hasMask) {
            addModalMask();
            $("#ak-scrollview").removeClass("scrolling_touch");
        }
        option.callback($(option),true,option);
        $(option.closeBtn).unbind("click");
        $(option.closeBtn).on('click', function(ec) {
            ec.preventDefault();
            option.callback($(option),false,option);
            ClickHideModal();
        });
    }
    $("#ak-scrollview").scroll(function(sc){
        sc.preventDefault();
        option.scrollback($(option));
        $('#popup_mask').fadeOut().remove();
        if (option.OneButton) {
            var scrollHeight = $("#ak-scrollview").prop("scrollHeight");
            $(option.dom).css({
                top: scrollHeight
            });
            $(option.OneButton).removeClass("ak-is_active");
        }
    });
    function addModalMask() {
        $('#popup_mask').remove();
        if ($("#popup_mask").length < 1) {
            $("main").append('<div id="popup_mask" class="ak-mask"></div>');
            $('#popup_mask').show();
            $("#popup_mask").unbind("click");
            $("#popup_mask").on('click', function() {
                option.callback($(option),false,option);
                ClickHideModal();
            });
            $('#popup_mask').bind({
                touchmove: function (e) {
                    e.preventDefault();
                }
            });
            if (option.maskPosition) {
                $('#popup_mask').css({
                    "z-index": option.maskPosition
                });
                if (option.position === 'offset') {
                    var otm = $(option.OneButton).offset().top;
                    var ohm = $(option.OneButton).outerHeight();
                    $('#popup_mask').css({
                        "top": otm + ohm
                    });
                }
            }
        }
    }
    function setPopupStyle() {
        var ww = $(window).width();
        var wh = $(window).height();
        if (option.dom) {
            var dw = $(option.dom).outerWidth();
            var dh = $(option.dom).outerHeight();
            $(option.dom).css({
                "position": "fixed",
                "background": "transparent",
                "z-index": parseInt(option.maskPosition) + 1
            });
            if (option.position === 'top') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "top": 0
                });
            } else if (option.position === 'bottom') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "bottom": 0
                });
            } else if (option.position === 'left') {
                $(option.dom).css({
                    "left": 0,
                    "top": 0
                });
            } else if (option.position === 'right') {
                $(option.dom).css({
                    "right": 0,
                    "top": 0
                });
            } else if (option.position === 'middle') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "top": (wh / 2) - (dh / 2)
                });
            }
        }
    }
    function ClickHideModal(){
        if (option.OneButton) {
            if (option.effectIn || option.effectOut) {
                $(option.dom).removeClass("animated " + option.effectIn).addClass("animated " + option.effectOut);
            }
            $(option.OneButton).find("i").removeClass(option.toggleIcon).addClass($(option.OneButton).find("i").attr("data-icon"));
        } else {
            if (option.effectIn || option.effectOut) {
                $(option.dom).removeClass("animated " + option.effectIn).addClass("animated " + option.effectOut);
            }
        }
        var effectTime = option.effectOut;
        effectStr = effectTime.substring(effectTime.indexOf('ani_')+3,effectTime.lastIndexOf('s'));
        if (effectStr.indexOf("_0") != -1) {
            effectStr = effectStr.replace("_0","_0.");
        }
        effectStr = effectStr.substr(1);
        var ani_css = new RegExp("ani_");
        if(ani_css.test(effectTime)) {
            var setTimeouts = effectStr*1000+setTimes;
        } else {
            var setTimeouts = 1000;
        }
        setTimeout(function() {
            $("#ak-scrollview").addClass("scrolling_touch");
            $(option.OneButton).removeClass("ak-is_active");
            $('#popup_mask').fadeOut().remove();
            $(option.dom).addClass("dis_none");
        },setTimeouts);
    }
}

/*-----------------------------------------------AKjs_Slider (2018-12-17)--------------------------------------------*/
(function($) {
    var AKjs_Slider = function(ele, opt) {
        var self = this;
        self.$element = ele,
            self.defaults = {
                fullpage: false,
                UpDown: false,
                start: 1,
                speed: 500,
                interval: 5000,
                autoPlay: false,
                loopPlay: true,
                dotShow: true,
                arrShow: true,
                dotClass:"",
                arrClass:"",
                arrIcon: [],
                CustomHeight: false,
                ActiveClass: "bg_theme",
                callback: function() {},
                afterSlider: function() {}
            },
            self.clickable = true,
            self.options = $.extend({},
                self.defaults, opt)
    };
    AKjs_Slider.prototype = {
        init: function() {
            var self = this,
                ele = self.$element;
            var touchStartY = 0,
                touchStartX = 0,
                mouseStartY = 0,
                mouseStartX = 0;
            var sliderInder = ele.children("ul");
            var SliderLi = sliderInder.children("li");
            var SliderSize = SliderLi.length;
            var index = self.options.start;
            var styleSetting = function() {
                if (self.options.arrShow) {
                    if (self.options.UpDown) {
                        if (self.options.arrIcon) {
                            var arrElement = '<button type="button" class="ak-arr_prev">'+self.options.arrIcon[0]+'</button><button type="button" class="ak-arr_next">'+self.options.arrIcon[1]+'</button>';
                        } else {
                            var arrElement = '<button type="button" class="ak-arr_prev">&and;</button><button type="button" class="ak-arr_next">&or;</button>';
                        }
                    } else {
                        if (self.options.arrIcon) {
                            var arrElement = '<button type="button" class="ak-arr_prev">'+self.options.arrIcon[0]+'</button><button type="button" class="ak-arr_next">'+self.options.arrIcon[1]+'</button>';
                        } else {
                            var arrElement = '<button type="button" class="ak-arr_prev">&lt;</button><button type="button" class="ak-arr_next">&gt;</button>';
                        }
                    }
                    if ($(ele).children("button").length < 1) {
                        ele.append(arrElement);
                    }
                    ele.find("button").addClass(self.options.arrClass);
                    if (self.options.UpDown) {
                        ele.find("button.ak-arr_prev").css({
                            "top": ele.find("button.ak-arr_prev").outerWidth()/2
                        });
                        ele.find("button.ak-arr_next").css({
                            "bottom": ele.find("button.ak-arr_next").outerWidth()/2
                        });
                    } else {
                        ele.find("button.ak-arr_prev").css({
                            "left": ele.find("button.ak-arr_prev").outerWidth()/2
                        });
                        ele.find("button.ak-arr_next").css({
                            "right": ele.find("button.ak-arr_next").outerWidth()/2
                        });
                    }
                    self.options.callback(ele);
                }
                for (i = 1; i <= SliderSize; i++) {
                    if (index == i) {
                        SliderLi.eq(index - 1).addClass("dis_block_im");
                        if (self.options.CustomHeight) {
                            setTimeout(function () {
                                if (SliderLi.eq(index - 1).find("img").hasClass("dis_none") || SliderLi.eq(index - 1).find("img").hasClass("dis_none_im")) {
                                } else {
                                    var custom_h = SliderLi.eq(index - 1).find("*[data-height=true]").prop("height");
                                    SliderLi.eq(index - 1).css({"height": custom_h});
                                    SliderLi.eq(index - 1).find("*").css({"height": custom_h});
                                    sliderInder.css({"height": SliderLi.eq(index - 1).outerHeight()});
                                    ele.css({"height": SliderLi.eq(index - 1).outerHeight()});
                                }
                            }, 200);
                        }
                    }
                }
                if (self.options.dotShow) {
                    var dot = "";
                    for (i = 1; i <= SliderSize; i++) {
                        if (index == i) {
                            dot += '<li data-index="' + i + '" class="'+self.options.ActiveClass+'"></li>'
                        } else {
                            dot += '<li data-index="' + i + '"></li>'
                        }
                    }
                    var dotElement = '<ol>' + dot + "</ol>";
                    if ($(ele).children("ol").length < 1) {
                        ele.append(dotElement);
                        if (self.options.UpDown) {
                            $(ele).children("ol").addClass("bottom_au right_0 mr_1rem");
                        } else {
                            $(ele).children("ol").find("li").addClass("fl");
                        }
                    }
                }
                ele.addClass("ak-Slider");
                setTimeout(function () {
                    if (self.options.arrShow) {
                        if (self.options.UpDown) {
                            var arrOffset = (ele.outerWidth() - ele.find("button").outerWidth()) / 2;
                            ele.find("button").css("left", arrOffset + "px");
                        } else {
                            var arrOffset = (ele.outerHeight() - ele.find("button").outerHeight()) / 2;
                            if (ele.hasClass("h_fill")) {
                                ele.find("button").css("top", $(window).height()/2 - ele.find("button").outerHeight() / 2+ "px");
                            } else {
                                ele.find("button").css("top", arrOffset + "px");
                            }
                        }
                    }
                    if (self.options.dotShow) {
                        var dots = ele.children("ol");
                        if (self.options.UpDown) {
                            dots.find("li").addClass(self.options.dotClass).removeClass("fl");
                            var dotHeight = (SliderSize + 1) * dots.find("li").eq(0).outerHeight();
                            var dotOffset = (ele.outerHeight() - dotHeight) / 2;
                            dots.css({
                                "top": dotOffset + "px"
                            });
                        } else {
                            dots.find("li").addClass(self.options.dotClass);
                            var dotWidth = (SliderSize + 1) * dots.find("li").eq(0).outerWidth();
                            var dotOffset = (ele.outerWidth() - dotWidth) / 2;
                            dots.css({
                                "left": dotOffset + "px"
                            });
                        }
                    }
                }, 200);
            };
            styleSetting();
            $(window).resize(function() {
                styleSetting();
            });
            if (self.options.arrShow) {
                ele.find(".ak-arr_next").unbind("click");
                ele.find(".ak-arr_next").on("click",
                    function(event) {
                        event.preventDefault();
                        var $_this = $(this);
                        $_this.attr("disabled","disabled");
                        if (self.clickable) {
                            if (index >= SliderSize) {
                                index = 1;
                            } else {
                                index += 1;
                            }
                            self.moveTo(index, "ak-arr_next");
                            setTimeout(function () {
                                $_this.removeAttr("disabled");
                            },self.options.speed);
                        }
                    });
                ele.find(".ak-arr_prev").unbind("click");
                ele.find(".ak-arr_prev").on("click",
                    function(event) {
                        event.preventDefault();
                        var $_this = $(this);
                        $_this.attr("disabled","disabled");
                        if (self.clickable) {
                            if (index == 1) {
                                index = SliderSize;
                            } else {
                                index -= 1;
                            }
                            self.moveTo(index, "ak-arr_prev");
                            setTimeout(function () {
                                $_this.removeAttr("disabled");
                            },self.options.speed);
                        }
                    })
            }
            if (self.options.dotShow) {
                ele.find("ol li").unbind("click");
                ele.find("ol li").on("click",
                    function(event) {
                        event.preventDefault();
                        if (self.clickable) {
                            var dotIndex = $(this).data("index");
                            if (dotIndex > index) {
                                dir = "ak-arr_next"
                            } else {
                                dir = "ak-arr_prev"
                            }
                            if (dotIndex != index) {
                                index = dotIndex;
                                self.moveTo(index, dir)
                            }
                        }
                    })
            }
            if (self.options.autoPlay) {
                var timer;
                var play = function() {
                    index++;
                    if (index > SliderSize) {
                        index = 1
                    }
                    self.moveTo(index, "ak-arr_next");
                };
                timer = setInterval(play, self.options.interval);
                ele.hover(function() {
                        timer = clearInterval(timer)
                    },
                    function() {
                        timer = setInterval(play, self.options.interval)
                    })
            }
            if (self.options.fullpage) {
                ele.on({
                    touchmove: function (es) {
                        es.preventDefault();
                        return false;
                    }
                });
                var win_h = $(window).height();
                SliderLi.css({"height": win_h});
                sliderInder.css({"height": win_h});
                ele.css({"height": win_h});
            }
            AKjs_UserAgent();
            SliderLi.on({
                touchstart: function(es) {
                    touchStartY = es.originalEvent.touches[0].clientY;
                    touchStartX = es.originalEvent.touches[0].clientX;
                },
                touchend: function(es) {
                    var touchEndY = es.originalEvent.changedTouches[0].clientY,
                        touchEndX = es.originalEvent.changedTouches[0].clientX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;
                    if (self.options.UpDown) {
                        if (Math.abs(xDiff) < Math.abs(yDiff)) {
                            if (yDiff > 10) {
                                if (index >= SliderSize) {
                                    if (self.options.loopPlay) {
                                        index = 1;
                                        self.moveTo(index, "ak-arr_next");
                                    }
                                } else {
                                    index += 1;
                                    self.moveTo(index, "ak-arr_next");
                                }
                            } else {
                                if (index == 1) {
                                    if (self.options.loopPlay) {
                                        index = SliderSize;
                                        self.moveTo(index, "ak-arr_prev");
                                    }
                                } else {
                                    index -= 1;
                                    self.moveTo(index, "ak-arr_prev");
                                }
                            }
                        }
                    } else {
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            if (xDiff > 10) {
                                if (index >= SliderSize) {
                                    if (self.options.loopPlay) {
                                        index = 1;
                                        self.moveTo(index, "ak-arr_next");
                                    }
                                } else {
                                    index += 1;
                                    self.moveTo(index, "ak-arr_next");
                                }
                            } else {
                                if (index == 1) {
                                    if (self.options.loopPlay) {
                                        index = SliderSize;
                                        self.moveTo(index, "ak-arr_prev");
                                    }
                                } else {
                                    index -= 1;
                                    self.moveTo(index, "ak-arr_prev");
                                }
                            }
                        }
                    }
                    touchStartY = null;
                    touchStartX = null
                },
                touchmove: function(es) {
                    var touchEndY = es.originalEvent.changedTouches[0].clientY,
                        touchEndX = es.originalEvent.changedTouches[0].clientX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;
                    if (self.options.UpDown) {
                        es.preventDefault();
                    }
                }
            });
            if (!IsMobile) {
                SliderLi.on({
                    mousedown: function(es) {
                        mouseStartY = es.clientY;
                        mouseStartX = es.clientX;
                    },
                    mouseup: function(es) {
                        var mouseEndY = es.screenY,
                            mouseEndX = es.screenX,
                            yDiff = mouseStartY - mouseEndY,
                            xDiff = mouseStartX - mouseEndX;
                        if (self.options.UpDown) {
                            if (Math.abs(xDiff) < Math.abs(yDiff)) {
                                if (yDiff > 10) {
                                    if (index >= SliderSize) {
                                        if (self.options.loopPlay) {
                                            index = 1;
                                            self.moveTo(index, "ak-arr_next");
                                        }
                                    } else {
                                        index += 1;
                                        self.moveTo(index, "ak-arr_next");
                                    }
                                } else {
                                    if (index == 1) {
                                        if (self.options.loopPlay) {
                                            index = SliderSize;
                                            self.moveTo(index, "ak-arr_prev");
                                        }
                                    } else {
                                        index -= 1;
                                        self.moveTo(index, "ak-arr_prev");
                                    }
                                }
                            }
                        } else {
                            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                                if (xDiff > 10) {
                                    if (index >= SliderSize) {
                                        if (self.options.loopPlay) {
                                            index = 1;
                                            self.moveTo(index, "ak-arr_next");
                                        }
                                    } else {
                                        index += 1;
                                        self.moveTo(index, "ak-arr_next");
                                    }
                                } else {
                                    if (index == 1) {
                                        if (self.options.loopPlay) {
                                            index = SliderSize;
                                            self.moveTo(index, "ak-arr_prev");
                                        }
                                    } else {
                                        index -= 1;
                                        self.moveTo(index, "ak-arr_prev");
                                    }
                                }
                            }
                        }
                        mouseStartY = null;
                        mouseStartX = null
                    }
                });
            }
        },
        moveTo: function(index, dir) {
            var self = this,
                ele = self.$element;
            var clickable = self.clickable;
            var dots_li = ele.children("ol").find("li");
            var sliderInder = ele.children("ul");
            var SliderLi = sliderInder.children("li");
            if (clickable) {
                if (self.options.UpDown) {
                    var offset = ele.height();
                } else {
                    var offset = ele.width();
                }
                if (dir == "ak-arr_prev") {
                    offset = -1 * offset
                }
                if (self.options.UpDown) {
                    sliderInder.children(".dis_block_im").stop().animate({
                            top: -offset
                        },
                        self.options.speed,
                        function() {
                            $(this).removeClass("dis_block_im")
                        });
                    SliderLi.eq(index - 1).css("top", offset + "px").addClass("dis_block_im").stop().animate({
                            top: 0
                        },
                        self.options.speed,
                        function() {
                            self.clickable = true
                        });
                } else {
                    sliderInder.children(".dis_block_im").stop().animate({
                            left: -offset
                        },
                        self.options.speed,
                        function() {
                            $(this).removeClass("dis_block_im")
                        });
                    SliderLi.eq(index - 1).css("left", offset + "px").addClass("dis_block_im").stop().animate({
                            left: 0
                        },
                        self.options.speed,
                        function() {
                            self.clickable = true
                        });
                }
                if (self.options.CustomHeight) {
                    if (SliderLi.eq(index - 1).find("img").hasClass("dis_none") || SliderLi.eq(index - 1).find("img").hasClass("dis_none_im")) {
                    } else {
                        var custom_h = SliderLi.eq(index - 1).find("*[data-height=true]").prop("height");
                        SliderLi.eq(index - 1).css({"height": custom_h});
                        SliderLi.eq(index - 1).find("*").css({"height": custom_h});
                        sliderInder.css({"height": SliderLi.eq(index - 1).outerHeight()});
                        ele.css({"height": SliderLi.eq(index - 1).outerHeight()});
                    }
                }
                self.options.afterSlider(index,dots_li.eq(index - 1));
                dots_li.removeClass(self.options.ActiveClass);
                dots_li.eq(index - 1).addClass(self.options.ActiveClass);
            } else {
                self.clickable = false;
                return false
            }
        }
    };
    $.fn.AKjs_Slider = function(options) {
        var ak_Slider = new AKjs_Slider(this, options);
        return this.each(function() {
            ak_Slider.init()
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_StepOrder (2018-12-16)--------------------------------------------*/
(function($) {
    $.fn.AKjs_StepOrder = function(setting) {
        var option = $.extend({
                stepNum: "",
                clickType: false,
                stepClass:  new Array(),
                dashed_line: "bor_white bor_bottom_dashed2",
                progress: "bor_white bor_bottom2",
                callback: function() {},
                clickback: function() {}
            },
            setting);
        var step = $(this);
        step.addClass("rel ovh");
        step.children().removeClass().addClass("rel ovh length"+step.children().children("li").length);
        step.children().before("<cite /><cite />");
        step.children("cite").eq(0).addClass("dis_block rel w_100 "+option.dashed_line);
        step.children("cite").eq(1).addClass("dis_block rel "+option.progress);
        var step_li = step.children().children("li");
        var num_box = step.children().children("li").eq(0).children().eq(0);
        var step_line_h = step.children("cite").eq(0).outerHeight();
        step_li.each(function(){
            step.fadeIn();
            var num_boxs = $(this).children().eq(0);
            $(this).addClass("fl text_al_c");
            if($(this).index() <= option.stepNum-1){
                $(this).addClass("ak-is_active");
            }
            if ($(this).hasClass("ak-is_active")) {
                $(this).children().eq(0).addClass(option.stepClass[0]);
                $(this).children().eq(1).addClass(option.stepClass[1]);
            } else {
                num_boxs.removeClass(option.stepClass[0]);
                num_boxs.next().removeClass(option.stepClass[1]);
            }
            num_boxs.addClass("dis_block center text_al_c");
            if (step_li.last().hasClass("ak-is_active")) {
                var active_w = step.find(".ak-is_active").outerWidth() * step.find(".ak-is_active").length;
            } else {
                var active_w = step.find(".ak-is_active").outerWidth() * step.find(".ak-is_active").length - (step.find(".ak-is_active").last().outerWidth()/2);
            }
            step.children("cite").eq(0).css({
                "top": num_box.outerHeight()/2+step_line_h
            });
            step.children("cite").eq(1).css({
                "top": num_box.outerHeight()/2-step_line_h+step_line_h,
                "width": 0
            }).animate({
                "width": active_w
            });
            $(window).resize(function(){
                if (step_li.last().hasClass("ak-is_active")) {
                    var re_active_w = step.find(".ak-is_active").outerWidth() * step.find(".ak-is_active").length;
                } else {
                    var re_active_w = step.find(".ak-is_active").outerWidth() * step.find(".ak-is_active").length - (step.find(".ak-is_active").last().outerWidth()/2);
                }
                step.children("cite").eq(0).css({
                    "top": num_box.outerHeight()/2+step_line_h
                });
                step.children("cite").eq(1).css({
                    "top": num_box.outerHeight()/2-step_line_h+step_line_h,
                    "width": step.children("cite").eq(1).outerWidth()
                }).animate({
                    "width": re_active_w
                });
            });
        });
        option.callback(step,step.find(".ak-is_active").length);
        if (option.clickType) {
            step_li.addClass("pointer");
            step_li.click(function () {
                var _self = $(this);
                var _length = _self.index()+1;
                _self.addClass("ak-is_active");
                _self.prevAll("li").addClass("ak-is_active");
                _self.nextAll("li").removeClass("ak-is_active");
                step_li.each(function(){
                    if ($(this).hasClass("ak-is_active")) {
                        $(this).children().eq(0).addClass(option.stepClass[0]);
                        $(this).children().eq(1).addClass(option.stepClass[1]);
                    } else {
                        $(this).children().eq(0).removeClass(option.stepClass[0]);
                        $(this).children().eq(1).removeClass(option.stepClass[1]);
                    }
                });
                if (step_li.last().hasClass("ak-is_active")) {
                    var click_active_w = step_li.last().outerWidth() * _length;
                } else {
                    var click_active_w = step_li.last().outerWidth() * _length - (step_li.last().outerWidth()/2);
                }
                step.children("cite").eq(1).css({
                    "width": step.children("cite").eq(1).outerWidth()
                }).animate({
                    "width": click_active_w
                },100);
                option.clickback(step,step.find(".ak-is_active").length,_self);
            });
        }
    };
} (jQuery));

/*-----------------------------------------------AKjs_Lazyload (2018-12-15)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Lazyload = function(setting) {
        var option = $.extend({
                scroll: $(window),
                scrollTop: "",
                Img_Effect: "",
                Img_LoadStyle: "",
                Img_Error: "",
                Callback: function() {},
                Scrollback: function() {}
            },
            setting);
        AKjs_UserAgent();
        var ele = $(this).not("#ak-aside img").not(".lazy_none");
        var view_h = parseInt(window.screen.height);
        var png_regexp = new RegExp("\\.png");
        var gif_regexp = new RegExp("\\.gif");
        $(function () {
            option.Callback(ele);
            if (ele.prop('tagName') == "img" || ele.prop('tagName') == "IMG") {
                if (option.Img_LoadStyle) {
                    ele.each(function () {
                        var view_img = $(this);
                        if (view_img.length > 0) {
                            if (view_img.parent().prop('tagName') != "figure" && view_img.parent().prop('tagName') != "FIGURE" && view_img.parent().parent().prop('tagName') != "figure" && view_img.parent().parent().prop('tagName') != "FIGURE") {
                                view_img.wrap("<figure />");
                            }
                        }
                        if (png_regexp.test(view_img.attr("src")) || gif_regexp.test(view_img.attr("src"))) {
                            view_img.parents("figure").addClass("bg_none ak_img_" + option.Img_LoadStyle);
                        } else {
                            view_img.parents("figure").addClass("ak_img_" + option.Img_LoadStyle);
                        }
                        if (IsMobile) {
                            setTimeout(function () {
                                if (view_img.hasClass("dis_none") || view_img.hasClass("dis_none_im") || view_img.hasClass("dis_opa_0")) {
                                    view_img.wrap("<label class='wh_in img_thumb'></label>");
                                    view_img.parent(".img_thumb").css({
                                        "background-image": 'url("' + view_img.attr("src") + '")'
                                    });
                                    view_img.remove();
                                } else {
                                    if (view_img.offset().top < view_h) {
                                        view_img.attr("data-src", view_img.attr("src"));
                                        view_img.attr("src",TransparentImage);
                                        view_img.attr("src", view_img.data("src"));
                                        if (option.Img_Effect) {
                                            view_img.addClass("animated "+option.Img_Effect);
                                        }
                                    } else {
                                        view_img.attr("data-src", view_img.attr("src"));
                                        view_img.attr("src",TransparentImage);
                                        if (option.Img_Effect) {
                                            view_img.removeClass("animated "+option.Img_Effect);
                                        }
                                    }
                                }
                            },500);
                        } else {
                            setTimeout(function () {
                                if (view_img.hasClass("dis_none") || view_img.hasClass("dis_none_im") || view_img.hasClass("dis_opa_0")) {
                                    view_img.wrap("<label class='wh_in img_thumb'></label>");
                                    view_img.parent(".img_thumb").css({
                                        "background-image": 'url("' + view_img.attr("src") + '")'
                                    });
                                    view_img.remove();
                                } else {
                                    if (view_img.offset().top < view_h) {
                                        if (option.scrollTop) {
                                            var offset_top = option.scrollTop;
                                        } else {
                                            var offset_top = view_img.offset().top - view_h;
                                        }
                                        if (view_img.offset().top < view_h) {
                                            if (offset_top >= option.scroll.scrollTop()) {
                                                $(function () {
                                                    view_img.addClass("animated "+option.Img_Effect);
                                                    view_img.attr("src", view_img.data("src"));
                                                });
                                            }
                                        } else {
                                            if (offset_top <= option.scroll.scrollTop()) {
                                                $(function () {
                                                    view_img.addClass("animated "+option.Img_Effect);
                                                    view_img.attr("src", view_img.data("src"));
                                                });
                                            }
                                        }
                                    } else {
                                        if (view_img.offset().top > option.scroll.scrollTop()+view_h) {
                                            view_img.attr("data-src", view_img.attr("src"));
                                            view_img.attr("src",TransparentImage);
                                        }
                                        if (option.Img_Effect) {
                                            view_img.removeClass("animated "+option.Img_Effect);
                                        }
                                    }
                                }
                            },500);
                        }
                    });
                }
                if (option.Img_Error) {
                    ele.on("error",function(){
                        if ($(this).attr("src") != "" || $(this).attr("onerror")==="") {
                            $(this).replaceWith("<img src=" + option.Img_Error + " class='ak-noimage' />");
                        }
                    });
                }
            }
            option.scroll.on('scroll', function (ak) {
                ak.preventDefault();
                var scroll_ele = $(this);
                var clientHeight = scroll_ele.scrollTop() + scroll_ele.prop('clientHeight');
                var scrollTop = scroll_ele.scrollTop();
                var arr = new Array();
                for(var i = 0; i < ele.length; i++) {
                    arr[i] = ele.eq(i).offset().top + scrollTop + (ele.eq(i).prop('offsetHeight') / 2);
                    if(arr[i] >= scrollTop && arr[i] <= clientHeight){
                        if (ele.eq(i).prop('tagName') == "img" || ele.eq(i).prop('tagName') == "IMG") {
                            ele.eq(i).attr("src", ele.eq(i).data("src"));
                            ele.eq(i).addClass("animated " + option.Img_Effect);
                        }
                    }
                }
                option.Scrollback(ele,scrollTop);
                ele.each(function () {
                    var view_ele = $(this);
                    if (IsMobile) {
                        if (view_ele.prop('tagName') == "img" || view_ele.prop('tagName') == "IMG") {
                            if (view_ele.offset().top < view_h) {
                                if (option.scrollTop >= scrollTop) {
                                    $(function () {
                                        view_ele.addClass("animated "+option.Img_Effect);
                                        view_ele.attr("src", view_ele.data("src"));
                                    });
                                }
                            } else {
                                if (option.scrollTop >= scrollTop) {
                                    view_ele.attr("src",TransparentImage);
                                    view_ele.removeClass("animated "+option.Img_Effect);
                                }
                            }
                        }
                    } else {
                        if (view_ele.prop('tagName') == "img" || view_ele.prop('tagName') == "IMG") {
                            if (option.scrollTop) {
                                var offset_top = option.scrollTop;
                            } else {
                                var offset_top = view_ele.offset().top - view_h;
                            }
                            if (view_ele.offset().top < view_h) {
                                if (offset_top >= scrollTop) {
                                    $(function () {
                                        view_ele.addClass("animated "+option.Img_Effect);
                                        view_ele.attr("src", view_ele.data("src"));
                                    });
                                }
                            } else {
                                if (offset_top <= scrollTop) {
                                    $(function () {
                                        view_ele.addClass("animated "+option.Img_Effect);
                                        view_ele.attr("src", view_ele.data("src"));
                                    });
                                }
                            }
                        }
                    }

                });
            });
            var TransparentImage ="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYwMkY5NUExNkVBRjExRThCOEE5RjZEMjg3OUQzMUIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwMkY5NUEyNkVBRjExRThCOEE5RjZEMjg3OUQzMUIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjAyRjk1OUY2RUFGMTFFOEI4QTlGNkQyODc5RDMxQjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjAyRjk1QTA2RUFGMTFFOEI4QTlGNkQyODc5RDMxQjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAAAQABAAACAkQBADs=";
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_AllChecked (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_AllChecked = function(settings) {
        var ele = $(this);
        var allCheck = ele.children().eq(0).children("dl").find(":checkbox");
        var checks = ele.children().eq(0).children("dl").next().children().children("dl").find(":checkbox");
        var defaults = {
            toggleClass: "",
            callback: function() {}
        };
        var option = $.extend(defaults, settings);
        allCheck.prop("checked", false);
        allCheck.parent("label").removeClass(option.toggleClass);
        allCheck.unbind("click");
        allCheck.click(function() {
            var set = $(this).parents("dl").next().find(":checkbox");
            if ($(this).prop("checked")) {
                $.each(set,
                    function(i, v) {
                        $(v).prop("checked", true);
                        $(v).parent("label").addClass(option.toggleClass);
                        option.callback($(v))
                    });
                allCheck.prop("checked", true);
                allCheck.parent("label").addClass(option.toggleClass);
            } else {
                $.each(set,
                    function(i, v) {
                        $(v).prop("checked", false);
                        $(v).parent("label").removeClass(option.toggleClass);
                        option.callback($(v));
                    });
                allCheck.prop("checked", false);
                allCheck.parent("label").removeClass(option.toggleClass);
            }
        });
        checks.unbind("click");
        checks.click(function() {
            var leng = $(this).parents("dl").parent().parent().find(":checkbox:checked").length;
            if ($(this).prop("checked")) {
                $(this).parent("label").addClass(option.toggleClass);
            } else {
                $(this).parent("label").removeClass(option.toggleClass);
            }
            if (leng == checks.length) {
                allCheck.prop("checked", true);
                allCheck.parent("label").addClass(option.toggleClass);
            } else {
                allCheck.prop("checked", false);
                allCheck.parent("label").removeClass(option.toggleClass);
            }
            option.callback(checks);
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_ButtonSubmit (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ButtonSubmit = function(msg, setting) {
        var option = $.extend({
                click: false,
                icon: ["1.2rem", "#ffffff"],
                callback: function() {}
            },
            setting);
        var btn = $(this);
        if (btn.prop("tagName") == "button" || btn.prop("tagName") == "BUTTON") {
            if (option.click) {
                btn.click(function() {
                    var _this = $(this);
                    if (!_this.attr("data-text")) {
                        _this.attr("data-text", _this.text());
                    }
                    if (!_this.attr("disabled")) {
                        submit_setting(_this);
                    }
                    document.activeElement.blur();
                })
            } else {
                btn.each(function() {
                    var _this = $(this);
                    if (!_this.attr("data-text")) {
                        _this.attr("data-text", _this.text());
                    }
                    if (!_this.attr("disabled")) {
                        submit_setting(_this);
                    }
                })
            }
            function submit_setting(_this) {
                if (msg) {
                    _this.html(msg);
                }
                option.callback(_this, ak_disabled);
                function ak_disabled(state) {
                    AKjs_UserAgent();
                    if (state) {
                        _this.addClass("disabled").attr("disabled", "disabled").html("<em class='ak-submit-loading'><i></i><span>" + msg + "</span></em>");
                        _this.find(".ak-submit-loading").css({
                            "border-color": option.icon[1]
                        });
                        _this.find(".ak-submit-loading i").css({
                            "width": option.icon[0],
                            "height": option.icon[0]
                        });
                        if (IsIE8 || IsIE7 || IsIE6) {
                            _this.find(".ak-submit-loading i").hide();
                        }
                    } else {
                        _this.removeClass("disabled").removeAttr("disabled").html(_this.attr("data-text"));
                    }
                }
            }
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_ChangeIcon (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ChangeIcon = function(setting) {
        var option = $.extend({
                multi_icon: false,
                text_color: new Array(),
                Change_icon: new Array(),
                clickBack: function () {
                }
            },
            setting);
        var $ChangeIcon = $(this);
        $ChangeIcon.unbind("click");
        $ChangeIcon.click(function () {
            var icon_ele = $(this);
            if (option.multi_icon == true) {
                icon_ele.children().eq(0).addClass(option.text_color[1]);
                icon_ele.children().eq(1).toggleClass(option.text_color[1] + " " + option.text_color[0]);
                if (icon_ele.children().eq(1).hasClass(option.text_color[1])) {
                    icon_ele.children().find("i").eq(0).addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    icon_ele.children().find("i").eq(1).removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    option.clickBack("up",option, icon_ele);
                } else {
                    icon_ele.children().find("i").eq(0).removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    icon_ele.children().find("i").eq(1).addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    option.clickBack("down",option, icon_ele);
                }
            } else {
                icon_ele.children().toggleClass(option.text_color[1] + " " + option.text_color[0]);
                var flag = false;
                if (icon_ele.children().hasClass(option.text_color[1])) {
                    icon_ele.children().addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    icon_ele.children().find("i").addClass(option.Change_icon[1]).removeClass(option.Change_icon[0]);
                    option.clickBack(true,option, icon_ele);
                    flag = true;
                } else {
                    icon_ele.children().removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    icon_ele.children().find("i").removeClass(option.Change_icon[1]).addClass(option.Change_icon[0]);
                    option.clickBack(false,option, icon_ele);
                    flag = false;
                }
                if (flag == true) {
                    icon_ele.children().addClass(option.text_color[1]);
                    icon_ele.children().find("i").addClass(option.text_color[1]);
                } else {
                    icon_ele.children().removeClass(option.text_color[1]);
                    icon_ele.children().find("i").removeClass(option.text_color[1]);
                }
            }
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_ChangeInput (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_ChangeInput = function(setting) {
        var option = $.extend({
                text_input: new Array(),
                onChange:function(){}
            },
            setting);
        var $ChangeInput = $(this);
        $ChangeInput.unbind("click");
        $ChangeInput.click(function() {
            var left_input = $(option.text_input[0]);
            var right_input = $(option.text_input[1]);
            var tmp ="";
            var left_input_value = left_input.val();
            var right_input_value = right_input.val();
            tmp = left_input_value;
            left_input.val(right_input_value);
            right_input.val(tmp);
            option.onChange(right_input_value,tmp);
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_Checkbox (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Checkbox = function(settings) {
        var _defaults = {
            boxSize: "",
            checkedClass: "bg_theme bor_theme c_white",
            disabledClass: "bg_gray_ccc bor_gray_ccc c_white",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        var self = this;
        if (!self.parent("label").hasClass("ak-Checkbox")) {
            self.wrap("<label />");
        }
        var checkboxes = self.parent("label");
        checkboxes.addClass("ak-Checkbox");
        if (options.boxSize) {
            checkboxes.css({
                "width": options.boxSize,
                "height": options.boxSize,
                "line-height": options.boxSize
            })
        }
        AKjs_UserAgent();
        if (IsMobile) {
            checkboxes.addClass("sta");
            checkboxes.find('input[type="checkbox"]').addClass("top_0");
            checkboxes.removeClass("bor_rad_0");
        } else {
            checkboxes.addClass("bor_rad_0");
            checkboxes.removeClass("sta");
            checkboxes.find('input[type="checkbox"]').removeClass("top_0")
        }
        $(window).resize(function() {
            if (IsMobile) {
                checkboxes.addClass("sta");
                checkboxes.find('input[type="checkbox"]').addClass("top_0");
                checkboxes.removeClass("bor_rad_0")
            } else {
                checkboxes.addClass("bor_rad_0");
                checkboxes.removeClass("sta");
                checkboxes.find('input[type="checkbox"]').removeClass("top_0");
            }
        });
        checkboxes.attr("data-name", self.attr("name"));
        checkboxes.each(function(ev) {
            if ($(this).find('input[type="checkbox"]').attr("multiple")) {
                var $checkbox = $(ev.target);
            } else {
                var $checkbox = $(this);
            }
            if ($(this).find('input[type="checkbox"]').attr("checked")) {
                $(this).addClass(options.checkedClass);
                $(this).find('input[type="checkbox"]').attr("checked", "checked");
            } else {
                if ($(this).find('input[type="checkbox"]').is(":disabled")) {
                    $(this).addClass(options.disabledClass);
                    $(this).find('input[type="checkbox"]').attr("checked", "checked");
                } else {
                    $(this).removeClass(options.checkedClass).removeClass(options.disabledClass);
                    $(this).find('input[type="checkbox"]').removeAttr("checked");
                }
            }
            $checkbox.on("change", function() {
                if ($checkbox.find('input[type="checkbox"]').attr("checked")) {
                    $checkbox.find('input[type="checkbox"]').removeAttr("checked");
                    $checkbox.removeClass(options.checkedClass);
                } else {
                    $checkbox.find('input[type="checkbox"]').attr("checked", "checked");
                    $checkbox.addClass(options.checkedClass);
                }
                options.onChange($($(this).children()[0]));
            });
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_ChooseList (2018-12-13)--------------------------------------------*/
(function($) {
    var defaults = {
        itemWidth: null,
        multi: false,
        btnClass: "",
        btnIcon: true,
        active: "",
        full: false,
        dataKey: "dataKey",
        change: null,
        click: null
    };
    $.fn.AKjs_ChooseList = function(options) {
        var _this = $(this),
            _num = _this.length;
        if (_num === 1) {
            return new ak_Choose(_this, options)
        }
        if (_num > 1) {
            _this.each(function(index, el) {
                new ak_Choose($(el), options)
            })
        }
    };
    function ak_Choose(el, opt) {
        this.el = el;
        this._tag = this.el.prop("tagName").toLowerCase();
        this._opt = $.extend({},
            defaults, opt);
        return this._init()
    }
    ak_Choose.prototype = {
        _init: function() {
            var _data = this.el.data(this._opt.dataKey);
            if (_data) {
                return _data
            } else {
                this.el.data(this._opt.dataKey, this)
            }
            this.multi = this.el.attr("data-multiple") ? !!this.el.attr("data-multiple") : this._opt.multi;
            var _setFunc = this["_setHtml_btn"];
            if (_setFunc) {
                _setFunc.call(this)
            }
            var option = this._opt;
            this._items.each(function() {
                var _this = this;
                var _self = $(this);
                if (option.btnIcon) {
                    if (_self.children("i").length < 1) {
                        _self.append('<i class="c_in abs minus_bottom_03rem minus_right_01rem line_h_no text_18rem icon-im_xuanze_b dis_none_im"></i>');
                        if (_self.attr("data-checked")) {
                            _self.children("i").removeClass("dis_none_im")
                        } else {
                            _self.children("i").addClass("dis_none_im")
                        }
                    }
                }
                _self.attr("type", "button").addClass(option.btnClass);
                if (_self.attr("data-checked")) {
                    _self.addClass(option.active)
                } else {
                    _self.removeClass(option.active)
                }
            });
            this._bindEvent()
        },
        _setHtml_btn: function() {
            this._wrap = this.el;
            this._items = this.el.children("button");
            if (this._opt.itemWidth) {
                this._items.css("width", this._opt.itemWidth)
            }
        },
        _bindEvent: function() {
            var _this = this;
            this._items.unbind("click");
            _this._wrap.on("click", "button",
                function() {
                    var _self = $(this);
                    if (_self.hasClass("disabled")) {
                        return
                    }
                    if (!_this.multi) {
                        var _val = _self.attr("data-value") || _self.index();
                        _this.val(_val);
                        _this._triggerClick(_val, _self);
                        _this._items.each(function(el) {
                            var _el = $(this);
                            if (_el.hasClass(_this._opt.active)) {
                                _el.children("i").removeClass("dis_none_im")
                            } else {
                                _el.children("i").addClass("dis_none_im")
                            }
                        })
                    } else {
                        _self.toggleClass(_this._opt.active);
                        var _val = [];
                        _this._items.each(function(index, el) {
                            var _el = $(this);
                            if (_el.hasClass(_this._opt.active)) {
                                _el.attr("data-checked", "true");
                                var _valOrIndex = _el.index();
                                _val.push(_valOrIndex);
                                _el.children("i").removeClass("dis_none_im")
                            } else {
                                _el.children("i").addClass("dis_none_im")
                            }
                        });
                        _this.val(_val);
                        _this._triggerClick(_val, _self)
                    }
                });
            return _this
        },
        _triggerChange: function(value, item) {
            item = item || this._wrap;
            this.change(value, item);
            if (typeof this._opt.change == "function") {
                this._opt.change.call(this, value, item)
            }
        },
        _triggerClick: function(value, item) {
            this.click(value, item);
            if (typeof this._opt.click == "function") {
                this._opt.click.call(this, value, item)
            }
        },
        _val_btn: function(index) {
            if (arguments.length === 0) {
                var _oActive = this._wrap.children("button." + this._opt.active);
                if (!this.multi) {
                    return _oActive.index() == -1 ? null: _oActive.index()
                } else {
                    if (_oActive.length == 0) {
                        return null
                    }
                    var _this = this,
                        _val = [];
                    _oActive.each(function(index, el) {
                        var _el = $(el);
                        if (_el.hasClass(_this._opt.active)) {
                            _el.attr("data-checked", "true");
                            _val.push(_el.index())
                        }
                    });
                    return _val
                }
            }
            var _oIndex = this._val_btn();
            if (!this.multi) {
                var _ChooseItem = this._wrap.children("button").eq(index);
                if (!_ChooseItem.length) {
                    return this
                }
                _ChooseItem.addClass(this._opt.active).siblings("button").removeClass(this._opt.active);
                _ChooseItem.attr("data-checked", "true").siblings("button").removeAttr("data-checked");
                if (index !== _oIndex) {
                    this._triggerChange(index, _ChooseItem)
                }
            } else {
                if (index == null || index == "" || index == []) {
                    this._items.removeClass(this._opt.active);
                    this._items.removeAttr("data-checked")
                } else {
                    index = typeof index == "object" ? index: [index];
                    this._items.removeClass(this._opt.active);
                    this._items.removeAttr("data-checked");
                    for (var i in index) {
                        var _no = index[i];
                        this._wrap.children("button").eq(_no).addClass(this._opt.active);
                        this._wrap.children("button").eq(_no).attr("data-checked", "true")
                    }
                }
                if (index !== _oIndex) {
                    this._triggerChange(index)
                }
            }
            return this
        },
        val: function() {
            return this["_val_btn"].apply(this, arguments)
        },
        change: function(value, item) {},
        click: function(value, item) {},
        hide: function() {
            this._wrap.hide();
            return this
        },
        show: function() {
            this._wrap.show();
            return this
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Circliful (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Circliful = function(setting) {
        var option = $.extend({
            prog_color: "",
            bg_color: "",
            fill_color: false,
            width: 15,
            dimension: 200,
            font_size: 15,
            font_color: "#333333",
            percent: 50,
            animationStep: 1
        }, setting);
        return this.each(function() {
            var $dimension = "";
            var $ele_text = "";
            var $ele_info = "";
            var $width = "";
            var $font_size = 0;
            var $font_color = "";
            var $percents = 0;
            var $percent = 100;
            var $prog_color = "";
            var $bg_color = "";
            var $icon = "";
            var $animationStep = 0;
            var ele = $(this);
            ele.html("<section />");
            var section = ele.children("section");
            if (ele.data("dimension") != undefined) {
                $dimension = ele.data("dimension")
            } else {
                $dimension = option.dimension
            }
            if (ele.data("width") != undefined) {
                $width = ele.data("width")
            } else {
                $width = option.width
            }
            if (ele.data("font_size") != undefined) {
                $font_size = ele.data("font_size")
            } else {
                $font_size = option.font_size
            }
            if (ele.data("font_color") != undefined) {
                $font_color = ele.data("font_color")
            } else {
                $font_color = option.font_color
            }
            if (ele.data("percent") != undefined) {
                $percents = ele.data("percent") / 100;
                $percent = ele.data("percent")
            } else {
                $percents = option.percent / 100
            }
            if (ele.data("prog_color") != undefined) {
                $prog_color = ele.data("prog_color")
            } else {
                $prog_color = option.prog_color
            }
            if (ele.data("bg_color") != undefined) {
                $bg_color = ele.data("bg_color")
            } else {
                $bg_color = option.bg_color
            }
            if (ele.data("animationStep") != undefined) {
                $animationStep = parseFloat(ele.data("animationStep"))
            } else {
                $animationStep = option.animationStep
            }
            if (ele.data("text") != undefined) {
                $ele_text = ele.data("text");
                if (ele.data("type") != undefined) {
                    $ele_type = ele.data("type");
                    if ($ele_type == "half") {
                        section.append('<span class="ak-text-half w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                        css_text_half();
                    } else {
                        section.append('<span class="ak-text w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                        css_text();
                    }
                } else {
                    section.append('<span class="ak-text w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                    css_text();
                }
            }
            if (ele.data("info") != undefined) {
                $ele_info = ele.data("info");
                if (ele.data("type") != undefined) {
                    $ele_type = ele.data("type");
                    if ($ele_type == "half") {
                        section.append('<span class="ak-info-half w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info_half();
                    } else if ($ele_type == "spacing") {
                        section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info();
                        section.append("<div class='top_0 left_0 abs bor_rad_50' />");
                        var val = ele.data("width");
                        AKjs_UserAgent();
                        if (IsMobile) {
                            switch (true) {
                                case val <= '5':
                                    var wh =($dimension - ($width*2))-($width/0.2);
                                    break;
                                case val <= '10':
                                    var wh =($dimension - ($width*2))-($width/0.4);
                                    break;
                                case val <= '15':
                                    var wh =($dimension - ($width*2))-($width/0.6);
                                    break;
                                case val > '15':
                                    var wh =($dimension - ($width*2))-($width/1.2);
                                    break;
                            }
                        } else {
                            switch (true) {
                                case val <= '5':
                                    var wh =($dimension - ($width*2))-($width/0.1);
                                    break;
                                case val <= '10':
                                    var wh =($dimension - ($width*2))-($width/0.3);
                                    break;
                                case val <= '15':
                                    var wh =($dimension - ($width*2))-($width/0.4);
                                    break;
                                case val <= '20':
                                    var wh =($dimension - ($width*2))-($width/0.6);
                                    break;
                                case val <= '25':
                                    var wh =($dimension - ($width*2))-($width/0.8);
                                    break;
                                case val <= '30':
                                    var wh =($dimension - ($width*2))-($width/1.2);
                                    break;
                                case val > '30':
                                    var wh =($dimension - ($width*2))-($width/2);
                                    break;
                            }
                        }
                        var div = ele.find("div");
                        div.css({
                            "width": wh + "px",
                            "height": wh + "px"
                        });
                        div.css({
                            "margin": $dimension/2 - (div.outerWidth()/2) + "px"
                        });
                        if (ele.data("spacing_color") != undefined) {
                            div.css({
                                "background-color": ele.data("spacing_color")
                            });
                        }
                    }else {
                        section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info();
                    }
                } else {
                    section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                    css_info();
                }
            }
            function css_text() {
                ele.find(".ak-text").css({
                    "line-height": $dimension - 20 + "px",
                    "font-size": $font_size,
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_info() {
                ele.find(".ak-info").css({
                    "line-height": ($dimension * 1.25) + "px",
                    "font-size": "0.6rem",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_text_half() {
                ele.find(".ak-text-half").css({
                    "line-height": $dimension/2*1.25 + "px",
                    "font-weight": "bold",
                    "font-size": "1.2rem",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_info_half() {
                ele.find(".ak-info-half").css({
                    "line-height": ($dimension * 0.86) + "px",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            ele.width($dimension + "px");
            var $canvas = $("<canvas></canvas>").attr({
                width: $dimension,
                height: $dimension
            }).appendTo(section).get(0);
            section.addClass("rel ovh");
            var context = $canvas.getContext("2d");
            var $canvas_width = $canvas.width / 2;
            var $canvas_height = $canvas.height / 2;
            var radius = $canvas.width / 2.5;
            var startAngle = 2.3 * Math.PI;
            var endAngle = 0;
            var curPerc = $animationStep === 0 ? $percent: 0;
            var curStep = Math.max($animationStep, 0);
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var $ele_type = "";
            var $fill_color = false;
            if (ele.data("type") != undefined) {
                $ele_type = ele.data("type");
                if ($ele_type == "half") {
                    var startAngle = 2 * Math.PI;
                    var endAngle = 3.13;
                    var circ = Math.PI * 1;
                    var quart = Math.PI / 0.996
                }
            }
            if (ele.data("fill_color") != undefined) {
                $fill_color = ele.data("fill_color");
            } else {
                $fill_color = option.fill_color;
            }
            function k(x) {
                context.clearRect(0, 0, $canvas.width, $canvas.height);
                context.beginPath();
                context.arc($canvas_width, $canvas_height, radius, endAngle, startAngle, false);
                context.lineWidth = $width - 1;
                context.strokeStyle = $bg_color;
                context.stroke();
                if ($fill_color) {
                    context.fillStyle = $fill_color;
                    context.fill();
                }
                context.beginPath();
                context.arc($canvas_width, $canvas_height, radius, -(quart), ((circ) * x) - quart, false);
                context.lineWidth = $width;
                context.strokeStyle = $prog_color;
                context.stroke();
                if (curPerc < $percent) {
                    curPerc += curStep;
                    requestAnimationFrame(function() {
                        k(Math.min(curPerc, $percent) / 100)
                    })
                }
            }
            k(curPerc / 100)
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Codeval (2018-12-13)--------------------------------------------*/
(function($) {
    var settings = {
        codeView: "",
        codeLength: "4",
        inputEle: ""
    };
    var _set = {
        storeLable: "codeval",
        codeval: ".ak-codeval"
    };
    $.AKjs_Codeval = {
        ak_getCode: function(option) {
            _commSetting(option);
            return _storeData(_set.storeLable, null)
        },
        ak_setCode: function(option) {
            _commSetting(option);
            _setCodeStyle(settings.codeView, settings.codeLength)
        },
        ak_validateCode: function(option) {
            _commSetting(option);
            var inputV;
            inputV = $(settings.inputEle).val();
            if (inputV.toUpperCase() == _storeData(_set.storeLable, null).toUpperCase()) {
                return true
            } else {
                _setCodeStyle(settings.codeView, settings.codeLength);
                return false
            }
        }
    };
    function _commSetting(option) {
        $.extend(settings, option);
    }
    function _storeData(dataLabel, data) {
        var store = $(_set.codeval).get(0);
        if (data) {
            $.data(store, dataLabel, data);
        } else {
            return $.data(store, dataLabel);
        }
    }
    function _setCodeStyle(eid, codeLength) {
        var codeObj = _createCode(settings.codeLength);
        var htmlCode = "";
        htmlCode += '<ol class="' + _set.codeval.substring(1) + '" id="' + _set.codeval.substring(1) + '" onclick="$.AKjs_Codeval.ak_setCode()">' + _setStyle(codeObj) + "</ol>";
        $(eid).html(htmlCode);
        $(function() {
            $(eid).css({
                "margin-top": ($(settings.inputEle).outerHeight() - $(eid).outerHeight()) / 2
            })
        });
        $(window).resize(function() {
            $(eid).css({
                "margin-top": ($(settings.inputEle).outerHeight() - $(eid).outerHeight()) / 2
            })
        });
        $(settings.inputEle).attr("maxlength", settings.codeLength);
        _storeData(_set.storeLable, codeObj);
    }
    function _setStyle(codeObj) {
        var fnCodeObj = new Array();
        var col = new Array("#BF0C43", "#E69A2A", "#707F02", "#18975F", "#BC3087", "#73C841", "#780320", "#90719B", "#1F72D8", "#D6A03C", "#6B486E", "#243F5F", "#16BDB5");
        var charIndex;
        for (var i = 0; i < codeObj.length; i++) {
            charIndex = Math.floor(Math.random() * col.length);
            fnCodeObj.push('<li style="color:' + col[charIndex] + ';">' + codeObj.charAt(i) + "</li>")
        }
        return fnCodeObj.join("")
    }
    function _createCode(codeLength) {
        var codeObj;
        codeObj = _createCodeFollow(codeLength);
        return codeObj
    }
    function _createCodeFollow(codeLength) {
        var code = "";
        var selectChar = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * selectChar.length);
            if (charIndex % 2 == 0) {
                code += selectChar[charIndex].toLowerCase();
            } else {
                code += selectChar[charIndex];
            }
        }
        return code
    }
} (jQuery));

/*-----------------------------------------------AKjs_CountDown (2018-12-13)--------------------------------------------*/
function AKjs_CountDown(ele,setting) {
    var option = $.extend({
            wait: 10,
            Start_text: "",
            End_Text: "",
            callback:function(){
            }
        },
        setting);
    var waits = option.wait;
    if (waits == 0) {
        ele.removeAttr("disabled");
        ele.html(option.End_Text);
        waits = option.wait;
        option.callback(waits);
    }
    else {
        ele.attr("disabled", "disabled");
        ele.html(waits + option.Start_text);
        waits--;
        setTimeout(function() {
            AKjs_CountDown(ele,{
                wait: waits,
                Start_text: option.Start_text,
                End_Text: option.End_Text,
                callback:function(waits){
                    option.callback(waits);
                }
            })
        }, 1000);
    }
}

/*-----------------------------------------------AKjs_CountTo (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_CountTo = function(options) {
        options = options || {};
        return $(this).each(function() {
            var settings = $.extend({},
                $.fn.AKjs_CountTo.defaults, {
                    from: $(this).data("from"),
                    to: $(this).data("to"),
                    speed: $(this).data("speed"),
                    refreshInterval: $(this).data("refresh-interval"),
                    decimals: $(this).data("decimals")
                },
                options);
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data("AKjs_CountTo") || {};
            $self.data("AKjs_CountTo", data);
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            render(value);
            function updateTimer() {
                value += increment;
                loopCount++;
                render(value);
                if (typeof(settings.onUpdate) == "function") {
                    settings.onUpdate.call(self, value);
                }
                if (loopCount >= loops) {
                    $self.removeData("AKjs_CountTo");
                    clearInterval(data.interval);
                    value = settings.to;
                    if (typeof(settings.onComplete) == "function") {
                        settings.onComplete.call(self, value);
                    }
                }
            }
            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        })
    };
    $.fn.AKjs_CountTo.defaults = {
        from: 0,
        to: 0,
        speed: 1000,
        refreshInterval: 100,
        decimals: 0,
        formatter: formatter,
        onUpdate: null,
        onComplete: null
    };
    function formatter(value, settings) {
        return value.toFixed(settings.decimals)
    }
} (jQuery));

/*-----------------------------------------------AKjs_DateTime (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_DateTime = function(opt) {
        function cPlugin(o, emlnum) {
            var sjObj = o;
            sjObj.defaults = {
                type: "time",
                Format: "yyyy-mm-dd",
                timeFormat: "h:m:s",
                width: 60,
                height: 40,
                Year: true,
                Month: true,
                Day: true,
                Hour: true,
                Minute: true,
                Seconds: false,
                yyArr: [],
                mmArr: [],
                ddArr: [],
                hArr: [],
                mArr: [],
                sArr: [],
                yyyy: "2000",
                mm: "01",
                dd: "01",
                h: "01",
                m: "01",
                s: "01",
                val: null,
                yearText: "Y",
                monthText: "M",
                dayText: "D",
                hourText: "H",
                minuteText: "M",
                secondsText: "S",
                okText: "OK",
                cancelText: "CANCEL",
                thisElm: null,
                showNowTime: true,
                alwaysShow: false,
                timeElm: null,
                isparseInt: false,
                finalshow: true,
                boxClassName: "",
                onfun: function(sjObj) {},
                okfun: function(sjObj) {},
                t_box: null,
                df_persp: function() {
                    return $("<div class='ak-datetime'><div class='ak-mask'></div>")
                },
                df_box: function() {
                    return $("</div><div class='jdt_box animated slideInUp " + (sjObj.opt.alwaysShow ? "alwaysShow": "") + " " + sjObj.opt.boxClassName + "' style='line-height:" + sjObj.opt.height + "px;'></div>")
                },
                df_main: function() {
                    return $("<div class='jdt_main'>")
                },
                df_btn: function() {
                    if (sjObj.opt.alwaysShow) {
                        return
                    }
                    return $("<div class='jdt_btn'><button type='button' class='jdt_no bg_white c_gray_777'>" + sjObj.opt.cancelText + "</button><button type='button' class='jdt_ok bg_white c_theme'>" + sjObj.opt.okText + "</button></div>")
                },
                df_wrap: function() {
                    return $("<div class='jdt_wrap'><table><tbody><tr></tr></tbody></table><div class='jdt_active' style='height:" + sjObj.opt.height + "px; margin-top:-" + sjObj.opt.height * 3 + "px;'></div></div>")
                },
                df_final: function() {
                    return $("<div class='jdt_final c_theme'></div>")
                },
                getArr: function() {
                    for (var i = 0; i < 61; i++) {
                        if (i < 12) {
                            this.mmArr[i] = (i + 1)
                        }
                        if (i < 31) {
                            this.ddArr[i] = (i + 1)
                        }
                        if (i < 24) {
                            this.hArr[i] = i
                        }
                        if (i < 60) {
                            this.mArr[i] = i;
                            this.sArr[i] = i
                        }
                        if (i < 61 && !sjObj.opt.Year && !sjObj.opt.Month && !sjObj.opt.Day && !sjObj.opt.Hour) {
                            this.mArr[i] = i
                        }
                    }
                },
                y: 10,
                nowTime: new Date(),
                startYear: null,
                endYear: null,
                ampmText: null,
                dataNum: 0,
                strStart: function(text, c) {
                    var df = this;
                    var str;
                    var text = text || "";
                    if (df.width) {
                        str = '<div class="jdt_class">' + text + '</div><div class="jdt_item " style="height:' + (df.height * 5 - 1) + "px;min-width:" + df.width + 'px"><ul class="jdt_ul" data-class=' + c + ">"
                    } else {
                        str = '<div class="jdt_class">' + text + '</div><div class="jdt_item " style="height:' + (df.height * 5 - 1) + 'px"><ul class="jdt_ul" data-class=' + c + ">"
                    }
                    sjObj.opt.dataNum++;
                    return str
                },
                strEnd: function() {
                    var df = this;
                    return "</ul><div class='jdt_bg'><div class='jdt_top' style='height:" + (df.height * 2) + "px'></div><div class='jdt_mid' style='height:" + df.height + "px'></div><div class='jdt_btm' style='height:" + (df.height * 2) + "px'></div></div></div>"
                },
                fillZero: function(x) {
                    if (x < 10) {
                        return x = "0" + x
                    } else {
                        return "" + x
                    }
                },
                getYear: function() {
                    if (!this.startYear) {
                        var y = sjObj.opt.y || 10;
                        var nowTime = new Date();
                        for (var x = this.y,
                                 i = 0; x != 0; y > 0 ? x--:x++, i++) {
                            if (y < 0) {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + x + 1
                            } else {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + i
                            }
                        }
                        sjObj.opt.getArr()
                    } else {
                        if (sjObj.opt.yyArr.length > 1) {
                            return
                        }
                        var endYear = this.endYear || parseInt(sjObj.opt.y) + parseInt(this.startYear);
                        var y = -(endYear - parseInt(this.startYear));
                        nowTime = new Date(endYear + "/01/01");
                        for (var x = y,
                                 i = 0; y > 0 ? x != 0 : x < 1; y > 0 ? x--:x++, i++) {
                            if (y < 0) {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + x
                            } else {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + i
                            }
                        }
                        sjObj.opt.getArr()
                    }
                },
                setCenter: function() {
                    var wid = $(window).width();
                    var tabWid = null;
                    var mWid = 0;
                    $(".jdt_wrap table").each(function() {
                        tabWid += parseFloat($(this).width())
                    });
                    if (tabWid > wid) {
                        $(".jdt_wrap table").each(function() {
                            mWid = parseFloat($(this).width()) > mWid ? parseFloat($(this).width()) : mWid
                        });
                        $(".jdt_box").width(mWid)
                    } else {
                        $(".jdt_box").width(tabWid + 10)
                    }
                },
                buildArrStr: function(Arr, txt, c) {
                    var str = this.strStart(txt, c);
                    $.each(Arr,
                        function() {
                            str += '<li class="jdt_li jdt_show"  data-val=' + sjObj.opt.fillZero(this) + ' style="line-height:' + sjObj.opt.height + "px;height:" + sjObj.opt.height + 'px">' + sjObj.opt.fillZero(this) + "</li>"
                        });
                    str += sjObj.opt.strEnd();
                    return str
                },
                buildHTml: function() {
                    var wrap = sjObj.opt.df_wrap();
                    sjObj.opt.t_box = sjObj.opt.df_box();
                    var main = sjObj.opt.df_main();
                    var persp = sjObj.opt.df_persp();
                    if (sjObj.opt.alwaysShow) {
                        sjObj.opt.timeElm = eval(sjObj.opt.timeElm);
                        sjObj.opt.timeElm.append(sjObj.opt.t_box.append(main.append(wrap)))
                    } else {
                        sjObj.opt.timeElm = $("<div class='ak-datetime'><div class='ak-mask'></div>");
                        sjObj.opt.timeElm.append(sjObj.opt.t_box.append(sjObj.opt.finalshow ? sjObj.opt.df_final: "").append(main.append(wrap)).append(sjObj.opt.df_btn));
                        $("body").append(sjObj.opt.timeElm);
                        document.activeElement.blur();
                        $("#ak-scrollview").removeClass("scrolling_touch");
                        sjObj.opt.timeElm.find(".ak-mask").bind({
                            touchmove: function(e) {
                                e.preventDefault()
                            }
                        })
                    }
                    if (sjObj.opt.ampmText) {
                        main.append("<div class='jdt_wrap'><table><tbody><tr><td>" + sjObj.opt.buildAmPmStr() + "</tr></tbody></table></div>")
                    }
                    if (sjObj.opt.Format == "dd-mm-yyyy") {
                        if (sjObj.opt.Day) {
                            $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>")
                        }
                        if (sjObj.opt.Month) {
                            $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>")
                        }
                        if (sjObj.opt.Year) {
                            $(sjObj.opt.timeElm.find("jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                        }
                    } else {
                        if (sjObj.opt.Format == "mm-dd-yyyy") {
                            if (sjObj.opt.Month) {
                                $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>")
                            }
                            if (sjObj.opt.Day) {
                                $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>")
                            }
                            if (sjObj.opt.Year) {
                                $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                            }
                        } else {
                            if (sjObj.opt.Format == "yyyy-mm") {
                                if (sjObj.opt.Year) {
                                    $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                                }
                                if (sjObj.opt.Month) {
                                    $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>")
                                }
                            } else {
                                if (sjObj.opt.Format == "yyyy") {
                                    if (sjObj.opt.Year) {
                                        $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                                    }
                                } else {
                                    if (sjObj.opt.Year) {
                                        $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                                    }
                                    if (sjObj.opt.Month) {
                                        $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>")
                                    }
                                    if (sjObj.opt.Day) {
                                        $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>")
                                    }
                                }
                            }
                        }
                    }
                    if (sjObj.opt.Hour || sjObj.opt.Minute || sjObj.opt.Seconds) {
                        var eml = sjObj.opt.df_wrap();
                        main.append(eml)
                    }
                    if (sjObj.opt.Hour) {
                        $(eml).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.hArr, sjObj.opt.hourText, "h") + "</td>")
                    }
                    if (sjObj.opt.Minute) {
                        $(eml).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mArr, sjObj.opt.minuteText, "m") + "</td>")
                    }
                    if (sjObj.opt.Seconds) {
                        $(eml).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.sArr, sjObj.opt.secondsText, "s") + "</td>")
                    }
                    if (sjObj.opt.showNowTime) {
                        if (emlnum) {
                            var val = sjObj.value,
                                sjeml = sjObj
                        } else {
                            var val = sjObj[0].value,
                                sjeml = sjObj[0]
                        }
                        if (val) {
                            if (val.indexOf("/") != -1) {
                                val = val.replace(/\//g, "-")
                            }
                            if (val.indexOf(" ") != -1) {
                                var valarr = val.split(" ")
                            } else {
                                var valarr = [val]
                            }
                            var nyr, sfm;
                            var str = "";
                            if (valarr.length == 2) {
                                nyr = valarr[0];
                                sfm = valarr[1];
                                str += getnyrstr(nyr) + " " + getsfmstr(sfm)
                            } else {
                                if (valarr.length == 1 && (valarr.indexOf("-") != -1 || valarr.indexOf("/") != -1)) {
                                    str += getnyrstr(valarr[0]) + " " + getsfmstr("")
                                } else {
                                    if (sjObj.opt.Year || sjObj.opt.Month || sjObj.opt.Day) {
                                        str += getnyrstr(valarr[0]) + " " + getsfmstr("")
                                    } else {
                                        str += getnyrstr("") + " " + getsfmstr(valarr[0])
                                    }
                                }
                            }
                            data = new Date(str.replace(/-/g, "/"))
                        } else {
                            var data = new Date()
                        }
                        var year = data.getFullYear();
                        var month = data.getMonth() + 1;
                        var day = data.getDate();
                        var hours = data.getHours();
                        var Minutes = data.getMinutes();
                        var Seconds = data.getSeconds();
                        sjObj.opt.yyyy = fillZero(year);
                        sjObj.opt.mm = fillZero(month);
                        sjObj.opt.dd = fillZero(day);
                        sjObj.opt.h = fillZero(hours);
                        sjObj.opt.m = fillZero(Minutes);
                        sjObj.opt.s = fillZero(Seconds);
                        if (sjObj.opt.Year) {
                            sjObj.opt.timeElm.find("[data-class='yyyy'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(year)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Month) {
                            sjObj.opt.timeElm.find("[data-class='mm'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(month)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Day) {
                            sjObj.opt.timeElm.find("[data-class='dd'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(day)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Hour) {
                            sjObj.opt.timeElm.find("[data-class='h'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(hours)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Minute) {
                            sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(Minutes)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Seconds) {
                            sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(Seconds)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                    } else {
                        if (sjObj.opt.Year) {
                            sjObj.opt.timeElm.find("[data-class='yyyy'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.yyyy)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Month) {
                            sjObj.opt.timeElm.find("[data-class='mm'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.mm)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Day) {
                            sjObj.opt.timeElm.find("[data-class='dd'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.dd)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Hour) {
                            sjObj.opt.timeElm.find("[data-class='h'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.h)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Minute) {
                            sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.m)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Seconds) {
                            sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.s)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                    }
                    sjObj.opt.fillData();
                    sjObj.opt.setCenter();
                    sjObj.opt.bindFun()
                },
                bindFun: function() {
                    sjObj.opt.timeElm.find(".jdt_no").unbind("click");
                    sjObj.opt.timeElm.find(".jdt_no").on("click",
                        function() {
                            $(this).parent().parent().parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove()
                                },
                                500);
                            sjObj.opt.onfun(sjObj);
                            $("#ak-scrollview").addClass("scrolling_touch")
                        });
                    sjObj.opt.timeElm.find(".ak-mask").unbind("click");
                    sjObj.opt.timeElm.find(".ak-mask").on("click",
                        function() {
                            $(this).parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove()
                                },
                                500);
                            sjObj.opt.onfun(sjObj);
                            $("#ak-scrollview").addClass("scrolling_touch")
                        });
                    sjObj.opt.timeElm.find(".jdt_ok").unbind("click");
                    sjObj.opt.timeElm.find(".jdt_ok").on("click",
                        function() {
                            var str = "";
                            if (sjObj.opt.Year) {
                                str = sjObj.opt.Format.replace("yyyy", sjObj.opt.yyyy)
                            }
                            if (sjObj.opt.Month) {
                                str = str.replace("mm", sjObj.opt.mm)
                            } else {
                                str = str.replace("-mm", "")
                            }
                            if (sjObj.opt.Day) {
                                str = str.replace("dd", sjObj.opt.dd)
                            } else {
                                str = str.replace("-dd", "")
                            }
                            if (sjObj.opt.Day && sjObj.opt.Hour) {
                                str += " "
                            }
                            if (sjObj.opt.Hour) {
                                str += sjObj.opt.h
                            }
                            if (sjObj.opt.Minute && sjObj.opt.Hour) {
                                str += ":"
                            }
                            if (sjObj.opt.Minute) {
                                str += sjObj.opt.m
                            }
                            if (sjObj.opt.Minute && sjObj.opt.Seconds) {
                                str += ":"
                            }
                            if (sjObj.opt.Seconds) {
                                str += sjObj.opt.s
                            }
                            sjObj.opt.val = sjObj.opt.isparseInt ? parseInt(str) : str;
                            $(sjObj.opt.thisElm).next("label").hide();
                            $(sjObj.opt.thisElm).val(sjObj.opt.val);
                            $(this).parent().parent().parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove()
                                },
                                500);
                            sjObj.opt.okfun(sjObj);
                            $("#ak-scrollview").addClass("scrolling_touch")
                        });
                    sjObj.opt.moveElm(sjObj.opt.timeElm.find(".jdt_bg"))
                },
                fillData: function() {
                    var str = "";
                    if (sjObj.opt.Year) {
                        str += sjObj.opt.yyyy
                    }
                    if (sjObj.opt.Month) {
                        str += "-" + sjObj.opt.mm
                    }
                    if (sjObj.opt.Day) {
                        str += "-" + sjObj.opt.dd
                    }
                    if (sjObj.opt.Hour) {
                        str += " " + sjObj.opt.h
                    }
                    if (sjObj.opt.Minute) {
                        str += ":" + sjObj.opt.m
                    }
                    if (sjObj.opt.Seconds) {
                        str += sjObj.opt.s
                    }
                    if (!sjObj.opt.alwaysShow) {
                        if (sjObj.opt.isparseInt) {
                            sjObj.opt.timeElm.find(".jdt_final").html(parseInt(str))
                        } else {
                            sjObj.opt.timeElm.find(".jdt_final").html(str)
                        }
                    } else {
                        $(sjObj.opt.thisElm).html(str).val(str)
                    }
                },
                vardata: function(name, val) {
                    if (!val) {
                        return
                    }
                    if (sjObj.opt[name] != val) {
                        sjObj.opt[name] = val;
                        sjObj.opt.fillData()
                    }
                },
                getFinal: function() {
                    var currentY = 0;
                    var str = "";
                    if (sjObj.opt.showNowTime) {
                        sjObj.opt.timeElm.find(".jdt_ul").each(function() {
                            currentY = getTranslateY(this);
                            var dataClass = $(this).attr("data-class");
                            var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                            sjObj.opt.vardata(dataClass, val);
                            $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd",
                                function() {
                                    currentY = getTranslateY(this);
                                    var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                                    dataClass = $(this).attr("data-class");
                                    sjObj.opt.vardata(dataClass, val);
                                    sjObj.opt.daysJudge(dataClass)
                                })
                        })
                    } else {
                        sjObj.opt.timeElm.find(".jdt_ul").each(function() {
                            currentY = getTranslateY(this);
                            var dataClass = $(this).attr("data-class");
                            var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                            sjObj.opt.vardata(dataClass, val);
                            $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd",
                                function() {
                                    currentY = getTranslateY(this);
                                    var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                                    dataClass = $(this).attr("data-class");
                                    sjObj.opt.vardata(dataClass, val);
                                    sjObj.opt.daysJudge(dataClass)
                                })
                        })
                    }
                },
                daysJudge: function(name) {
                    if (name == "mm" || name == "yyyy") {
                        var day = new Date(sjObj.opt.yyyy, sjObj.opt.mm, 0).getDate();
                        var l = sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_show").length;
                        var mubiao = day - l;
                        if (mubiao > 0) {
                            for (var i = 0; i < mubiao; i++) {
                                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_li")[l + i]).removeClass("jdt_hide").addClass("jdt_show")
                            }
                        } else {
                            var naomovey = getTranslateY(sjObj.opt.timeElm.find('[data-class="dd"]'));
                            for (var i = 0; i > mubiao; i--) {
                                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_li")[l - 1 + i]).removeClass("jdt_show").addClass("jdt_hide")
                            }
                            if (naomovey > (day - 1 - 2) * sjObj.opt.height) {
                                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                                    "transition": "all .5s"
                                });
                                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                                    "transform": "translate(0," + -(day - 1 - 2) * sjObj.opt.height + "px)"
                                })
                            }
                        }
                    }
                },
                moveElm: function(eml) {
                    return $(eml).each(function() {
                        var sX = null,
                            sY = null,
                            mX = null,
                            mY = null,
                            eX = null,
                            eY = null,
                            sTime = null,
                            eTime = null,
                            mTime = null,
                            nTime = null,
                            nY = 0,
                            drt = null,
                            nowElm = null,
                            canStart = true,
                            canMove = false,
                            canEnd = false,
                            emlLang = null,
                            maxY = null,
                            minY = null,
                            lastY = null,
                            nowY = null,
                            moveY = null,
                            stopInertiaMove = false,
                            SE = null,
                            ME = null,
                            EE = null,
                            moveCy = 0;
                        var stop = function(e) {
                            if (e.preventDefault) {
                                e.preventDefault()
                            }
                            e.returnValue = false
                        };
                        var moveStart = function(e) {
                            stop(e);
                            if (!canStart) {
                                return
                            }
                            if (e.originalEvent.touches) {
                                SE = e.originalEvent.targetTouches[0]
                            } else {
                                SE = e
                            }
                            sX = SE.pageX;
                            sY = SE.pageY;
                            nowElm = $(this).prev(".jdt_ul");
                            emlLang = nowElm.find(".jdt_show").length;
                            lastY = sY;
                            nY = getTranslateY(nowElm);
                            sTime = new Date().getTime();
                            if (!canMove && canEnd) {
                                return false
                            }
                            canStart = false;
                            canMove = false;
                            stopInertiaMove = true;
                            $(window).on("touchmove",
                                function(e) {
                                    if (stopInertiaMove) {
                                        e.preventDefault()
                                    }
                                })
                        };
                        var moveing = function(e) {
                            stop(e);
                            if (e.originalEvent.touches) {
                                ME = e.originalEvent.targetTouches[0]
                            } else {
                                ME = e
                            }
                            mTime = new Date().getTime();
                            mX = ME.pageX;
                            mY = ME.pageY;
                            drt = GetSlideDirection(sX, sY, mX, mY);
                            if ((drt == 1 || drt == 2) && !canStart) {
                                canMove = true;
                                canEnd = true;
                                stopInertiaMove = true
                            }
                            if (canMove) {
                                nowElm.css({
                                    "transition": "none"
                                });
                                nowElm.css({
                                    "transform": "translate(0," + -(nY - (mY - sY)) + "px)"
                                });
                                sjObj.opt.getFinal()
                            }
                            if (mTime - sTime > 300) {
                                sTime = mTime;
                                lastY = mY
                            }
                        };
                        var moveEnd = function(e) {
                            stop(e);
                            if (e.originalEvent.touches) {
                                EE = e.originalEvent.changedTouches[0]
                            } else {
                                EE = e
                            }
                            eX = EE.pageX;
                            eY = EE.pageY;
                            maxY = sjObj.opt.height * 2;
                            minY = -(emlLang - 3) * sjObj.opt.height;
                            if (canEnd) {
                                canMove = false;
                                canEnd = false;
                                canStart = true;
                                nY = -(nY - (mY - sY));
                                nowY = eY;
                                if (nY > maxY) {
                                    nowElm.css({
                                        "transition": "all .5s"
                                    });
                                    nowElm.css({
                                        "transform": "translate(0," + maxY + "px)"
                                    })
                                } else {
                                    if (nY < minY) {
                                        nowElm.css({
                                            "transition": "all .5s"
                                        });
                                        nowElm.css({
                                            "transform": "translate(0," + minY + "px)"
                                        })
                                    } else {
                                        eTime = new Date().getTime();
                                        var speed = ((nowY - lastY) / (eTime - sTime));
                                        stopInertiaMove = false; (function(v, startTime, contentY) {
                                            var dir = v > 0 ? -1 : 1;
                                            var deceleration = dir * 0.001;
                                            function inertiaMove() {
                                                if (stopInertiaMove) {
                                                    return
                                                }
                                                var nowTime = new Date().getTime();
                                                var t = nowTime - startTime;
                                                var nowV = v + t * deceleration;
                                                var moveY = (v + nowV) / 2 * t;
                                                if (dir * nowV > 0) {
                                                    if (moveCy > sjObj.opt.maxY) {
                                                        nowElm.css({
                                                            "transition": "all .5s"
                                                        });
                                                        sjObj.opt.nowElm.css({
                                                            "transform": "translate(0," + sjObj.opt.maxY + "px)"
                                                        })
                                                    } else {
                                                        if (moveCy < sjObj.opt.minY) {
                                                            nowElm.css({
                                                                "transition": "all .5s"
                                                            });
                                                            nowElm.css({
                                                                "transform": "translate(0," + sjObj.opt.minY + "px)"
                                                            })
                                                        } else {
                                                            var MC = Math.round(moveCy / sjObj.opt.height);
                                                            if (MC > 2) {
                                                                MC = 2
                                                            } else {
                                                                if (MC < -(emlLang - 1) + 2) {
                                                                    MC = -(emlLang - 1) + 2
                                                                }
                                                            }
                                                            nowElm.css({
                                                                "transition": "all .4s"
                                                            });
                                                            nowElm.css({
                                                                "transform": "translate(0," + sjObj.opt.height * MC + "px)"
                                                            })
                                                        }
                                                    }
                                                    sjObj.opt.getFinal();
                                                    return
                                                }
                                                moveCy = (contentY + moveY);
                                                if (moveCy > (maxY + (sjObj.opt.height * 2))) {
                                                    nowElm.css({
                                                        "transition": "all .5s"
                                                    });
                                                    nowElm.css({
                                                        "transform": "translate(0," + maxY + "px)"
                                                    });
                                                    return
                                                } else {
                                                    if (moveCy < (minY - (sjObj.opt.height * 2))) {
                                                        nowElm.css({
                                                            "transition": "all .5s"
                                                        });
                                                        nowElm.css({
                                                            "transform": "translate(0," + minY + "px)"
                                                        });
                                                        return
                                                    }
                                                }
                                                nowElm.css({
                                                    "transform": "translate(0," + moveCy + "px)"
                                                });
                                                sjObj.opt.getFinal();
                                                var timers = setTimeout(inertiaMove, 10)
                                            }
                                            inertiaMove()
                                        })(speed, eTime, nY)
                                    }
                                }
                            }
                        };
                        $(this).unbind("touchstart mousedown").on("touchstart mousedown", moveStart);
                        $(this).unbind("touchmove").on("touchmove", moveing);
                        $(this).unbind("touchend").on("touchend", moveEnd);
                        $(document).on("mousemove", moveing);
                        $(document).on("mouseup", moveEnd)
                    })
                }
            };
            sjObj.opt = $.extend({},
                sjObj.defaults, opt);
            var GetSlideAngle = function(dx, dy) {
                return Math.atan2(dy, dx) * 180 / Math.PI
            };
            function getnyrstr(str) {
                var r = sjObj.opt.Format;
                var valarr = str.split("-");
                if (valarr.length == 3) {
                    r = r.replace("yyyy", valarr[0]);
                    r = r.replace("mm", valarr[1]);
                    r = r.replace("dd", valarr[2])
                } else {
                    if (valarr.length == 2) {
                        if (sjObj.opt.Year && !sjObj.opt.Month) {
                            r = r.replace("yyyy", valarr[0]);
                            r = r.replace("mm", sjObj.opt.mm);
                            r = r.replace("dd", valarr[1])
                        } else {
                            if (sjObj.opt.Year && !sjObj.opt.Day) {
                                r = r.replace("yyyy", valarr[0]);
                                r = r.replace("mm", valarr[1]);
                                r = r.replace("dd", sjObj.opt.dd)
                            } else {
                                if (!sjObj.opt.Year) {
                                    r = r.replace("yyyy", sjObj.opt.yyyy);
                                    r = r.replace("mm", valarr[0]);
                                    r = r.replace("dd", valarr[1])
                                }
                            }
                        }
                    } else {
                        if (valarr.length == 1) {
                            if (sjObj.opt.Year) {
                                r = r.replace("yyyy", valarr[0]);
                                r = r.replace("mm", sjObj.opt.mm);
                                r = r.replace("dd", sjObj.opt.dd)
                            } else {
                                if (sjObj.opt.Month) {
                                    r = r.replace("yyyy", sjObj.opt.yyyy);
                                    r = r.replace("mm", valarr[0]);
                                    r = r.replace("dd", sjObj.opt.dd)
                                } else {
                                    if (sjObj.opt.Day) {
                                        r = r.replace("yyyy", sjObj.opt.yyyy);
                                        r = r.replace("mm", sjObj.opt.mm);
                                        r = r.replace("dd", valarr[0])
                                    } else {
                                        r = r.replace("yyyy", sjObj.opt.yyyy);
                                        r = r.replace("mm", sjObj.opt.mm);
                                        r = r.replace("dd", sjObj.opt.dd)
                                    }
                                }
                            }
                        }
                    }
                }
                return r
            }
            function getsfmstr(str) {
                var r = sjObj.opt.timeFormat;
                var valarr = str.split(":");
                if (valarr.length == 3) {
                    r = r.replace("h", valarr[0]);
                    r = r.replace("m", valarr[1]);
                    r = r.replace("s", valarr[2])
                } else {
                    if (valarr.length == 2) {
                        if (sjObj.opt.Hour && !sjObj.opt.Minute) {
                            r = r.replace("h", valarr[0]);
                            r = r.replace("m", sjObj.opt.m);
                            r = r.replace("s", valarr[1])
                        } else {
                            if (sjObj.opt.Hour && !sjObj.opt.Seconds) {
                                r = r.replace("h", valarr[0]);
                                r = r.replace("m", valarr[1]);
                                r = r.replace("s", sjObj.opt.s)
                            } else {
                                if (!sjObj.opt.Hour) {
                                    r = r.replace("h", sjObj.opt.h);
                                    r = r.replace("m", valarr[0]);
                                    r = r.replace("s", valarr[1])
                                }
                            }
                        }
                    } else {
                        if (valarr.length == 1) {
                            if (sjObj.opt.Hour) {
                                r = r.replace("h", valarr[0]);
                                r = r.replace("m", sjObj.opt.m);
                                r = r.replace("s", sjObj.opt.s)
                            } else {
                                if (sjObj.opt.Minute) {
                                    r = r.replace("h", sjObj.opt.h);
                                    r = r.replace("m", valarr[0]);
                                    r = r.replace("s", sjObj.opt.s)
                                } else {
                                    if (sjObj.opt.Hour) {
                                        r = r.replace("h", sjObj.opt.h);
                                        r = r.replace("m", sjObj.opt.m);
                                        r = r.replace("s", valarr[0])
                                    } else {
                                        r = r.replace("h", sjObj.opt.h);
                                        r = r.replace("m", sjObj.opt.m);
                                        r = r.replace("s", sjObj.opt.s)
                                    }
                                }
                            }
                        }
                    }
                }
                return r
            }
            var GetSlideDirection = function(startX, startY, endX, endY) {
                var dy = startY - endY;
                var dx = endX - startX;
                var result = 0;
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result
                }
                var angle = GetSlideAngle(dx, dy);
                if (angle >= -45 && angle < 45) {
                    result = 4
                } else {
                    if (angle >= 45 && angle < 135) {
                        result = 1
                    } else {
                        if (angle >= -135 && angle < -45) {
                            result = 2
                        } else {
                            if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                                result = 3
                            }
                        }
                    }
                }
                return result
            };
            var getTranslateY = function(eml) {
                var matrix = $(eml).css("transform");
                var T;
                if (matrix == "none") {
                    T = 0
                } else {
                    var arr = matrix.split(",");
                    T = -(arr[5].split(")")[0])
                }
                return T
            };
            sjObj.innt = function() {
                if (!sjObj.opt.alwaysShow) {
                    $(this).unbind("click");
                    $(this).on("click",
                        function(e) {
                            e.stopPropagation();
                            sjObj.opt.thisElm = this;
                            switch (sjObj.opt.type) {
                                case "time":
                                    $(this).blur();
                                    sjObj.opt.getYear();
                                    sjObj.opt.buildHTml();
                                    sjObj.opt.getFinal();
                                    break
                            }
                        })
                } else {
                    sjObj.opt.thisElm = this;
                    sjObj.opt.getYear();
                    sjObj.opt.buildHTml()
                }
                $(window).on("resize",
                    function() {
                        sjObj.opt.setCenter()
                    })
            };
            sjObj.innt();
            return sjObj
        }
        if (this.length > 1) {
            var arr = [];
            $.each(this,
                function() {
                    arr.push(cPlugin(this, true))
                });
            return arr
        } else {
            var obj = cPlugin(this);
            return obj
        }
    };
    function fillZero(x) {
        if (x < 10) {
            return x = "0" + x
        } else {
            return "" + x
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Dialog (2018-12-13)--------------------------------------------*/
(function($) {
    var ak = {};
    var AKjs_Dialog = {};
    ak.opening = false;
    ak.defaults = {
        title: false,
        animateIn: "bounceInDown",
        animateOut: "bounceOutUp",
        onSubmit: false,
        onCancel: false,
        required: false,
        icon: false,
        inputbox: false,
        inputType: "",
        inputClass: "",
        placeholder: "",
        button_ok: "OK",
        button_cancel: "CANCEL"
    };
    ak.tplBase = '<div class="ak-dialog">';
    ak.tplBase += '<div class="ak-dialog_container">';
    ak.tplBase += "{{header}}";
    ak.tplBase += '<div class="ak-dialog_content"><p>{{message}}</p>{{input}}</div>';
    ak.tplBase += '<div class="ak-dialog_footer">{{button_cancel}} <button type="button" class="ak_btn bg_white button_ok c_theme">{{btn_ok}}</button></div>';
    ak.tplBase += "</div>";
    ak.tplBase += "</div>";
    ak.tplHeader = '<div class="ak-dialog_header bor_bottom_dashed bor_gray_ddd {{icon}}"><h3 class="ml_05rem">{{title}}</h3></div>';
    ak.tplInput = '<div class="ak-dialog_field">{{inputbox}}</div>';
    ak.getTeplate = function(type, message, option) {
        var template = ak.tplBase;
        if (type !== "alert") {
            template = template.replace("{{button_cancel}}", '<button type="button" class="ak_btn bg_white button_cancel bor_right bor_gray_ddd">{{btn_cancel}}</button>')
        } else {
            template = template.replace("{{button_cancel}}", "")
        }
        if (type == "prompt") {
            template = template.replace("{{input}}", ak.tplInput)
        } else {
            template = template.replace("{{input}}", "")
        }
        if (option.title) {
            template = template.replace("{{header}}", ak.tplHeader.replace("{{title}}", option.title))
        } else {
            template = template.replace("{{header}}", "")
        }
        if (option.inputbox == "textarea") {
            template = template.replace("{{inputbox}}", "<textarea />")
        } else {
            if (option.inputbox == "input") {
                if (option.inputType) {
                    template = template.replace("{{inputbox}}", "<input type='" + option.inputType + "' />")
                } else {
                    template = template.replace("{{inputbox}}", "<input type='text' />")
                }
            }
        }
        template = template.replace("{{icon}}", option.icon);
        template = template.replace("{{btn_ok}}", option.button_ok);
        template = template.replace("{{btn_cancel}}", option.button_cancel);
        template = template.replace("{{message}}", message);
        return template
    };
    ak.clear = function() {
        $("#alert_mask").length ? $("#alert_mask").remove() : "";
        $(".ak-dialog").length ? $(".ak-dialog").remove() : ""
    };
    ak.Dialog = function() {
        var that = this;
        that.close = function() {
            $("#ak-scrollview").addClass("scrolling_touch");
            if (that.option.animateOut) {
                if (that.option.animateIn) {
                    that.container.find(".ak-dialog_container").removeClass(that.option.animateIn)
                }
                that.container.find(".ak-dialog_container").addClass("animated " + that.option.animateOut);
                setTimeout(function() {
                        that.container.removeClass("is-active");
                        that.container.remove();
                        ak.opening = false;
                        $("#alert_mask").remove()
                    },
                    800)
            } else {
                that.container.remove();
                ak.opening = false;
                $("#alert_mask").remove()
            }
        };
        that.addEvents = function() {
            that.btnOk.unbind("click");
            that.btnOk.on("click",
                function(e) {
                    e.preventDefault();
                    var res = false;
                    if (that.field.length) {
                        if (that.option.required == true && !that.field.val().length) {
                            that.field.addClass("is-invalid");
                            return false
                        } else {
                            that.field.removeClass("is-invalid");
                            res = that.field.val()
                        }
                    } else {
                        res = true
                    }
                    if (typeof that.option.onSubmit == "function") {
                        that.option.onSubmit(res)
                    }
                    that.close()
                });
            that.btnCancel.unbind("click");
            that.btnCancel.on("click",
                function(e) {
                    e.preventDefault();
                    var res = false;
                    if (that.field.length && that.field.val().length !== 0) {
                        res = that.field.val()
                    }
                    if (typeof that.option.onCancel == "function") {
                        that.option.onCancel(res)
                    }
                    that.close()
                })
        };
        this.init = function(type, message, option, defaultValue) {
            if (ak.opening) {
                $("#alert_mask, .ak-dialog").remove()
            }
            ak.clear();
            that.option = ak.getOptions(option);
            $("body").append(ak.getTeplate(type, message, that.option) + "<div id='alert_mask' class=\"ak-mask\"></div> ");
            that.container = $("body").find(".ak-dialog");
            $("#alert_mask").bind({
                touchmove: function(e) {
                    e.preventDefault()
                }
            });
            that.container.bind({
                touchmove: function(e) {
                    e.preventDefault()
                }
            });
            $("#ak-scrollview").removeClass("scrolling_touch");
            that.btnOk = that.container.find(".button_ok");
            that.btnCancel = that.container.find(".button_cancel");
            if (option.inputbox == "textarea") {
                that.field = that.container.find("textarea")
            } else {
                that.field = that.container.find("input")
            }
            if (option.placeholder) {
                that.field.attr("placeholder", option.placeholder);
                var placeholder_tmps = "";
                that.field.focus(function() {
                    placeholder_tmps = $(this).attr("placeholder");
                    if ($(this)[0].type != "search") {
                        $(this).removeAttr("placeholder")
                    }
                    $(this).blur(function() {
                        $(this).attr("placeholder", placeholder_tmps)
                    })
                })
            }
            that.field.parents(".ak-dialog_content").children("p").addClass("ak-input_title");
            that.field.addClass(option.inputClass);
            if (defaultValue && that.field.length) {
                that.field.val(defaultValue)
            }
            that.container.addClass("ak-is_active").css({
                "top": ($(window).height() / 2) - (that.container.height() / 2)
            });
            if (that.option.animateIn) {
                that.container.find(".ak-dialog_container").addClass("animated " + that.option.animateIn)
            }
            ak.opening = true;
            that.addEvents()
        }
    };
    ak.getOptions = function(option) {
        var o = $.extend({}, ak.defaults);
        if (typeof option == "object") {
            $.each(option, function(key, val) {
                o[key] !== undefined ? o[key] = val: console.error('The option "' + key + '" not exist.')
            });
        }
        return o
    };
    var isIE = function() {
        var U = navigator.userAgent,
            IsIE = U.indexOf("MSIE") > -1,
            a = IsIE ? /\d+/.exec(U.split(";")[1]) : "no ie";
        return a <= 8
    } ();
    if (!isIE) {
        alert = function(message, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("alert", message, userOptions)
        };
        confirm = function(message, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("confirm", message, userOptions)
        };
        prompt = function(message, defaultValue, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("prompt", message, userOptions, defaultValue)
        }
    }
    AKjs_Dialog.alert = function(message, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("alert", message, userOptions)
    };
    AKjs_Dialog.confirm = function(message, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("confirm", message, userOptions)
    };
    AKjs_Dialog.prompt = function(message, defaultValue, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("prompt", message, userOptions, defaultValue)
    };
    AKjs_Dialog.config = function(option) {
        if (typeof option !== "object") {
            return false
        }
        $.each(option, function(key, val) {
            ak.defaults[key] !== undefined ? ak.defaults[key] = val: console.error('The option "' + key + '" not exist.')
        });
    };
    $ak = AKjs_Dialog;
} (jQuery));

/*-----------------------------------------------AKjs_DropLoad (2018-12-13)--------------------------------------------*/
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
                e.preventDefault();
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

/*-----------------------------------------------AKjs_DropUpDown (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_DropUpDown = function(setting) {
        var option = $.extend({
                curDisplay: "",
                active_toggle: "",
                up_ico: "",
                down_ico: "",
                callback:function(){}
            },
            setting);
        function DropDown(el) {
            this.DropUpDown = el;
            this.initEvents();
        }
        DropDown.prototype = {
            initEvents: function() {
                var obj = this;
                var drop = obj.DropUpDown.children("dl").children("dd:last-child");
                if (option.curDisplay) {
                    var ele_display = obj.DropUpDown.eq(option.curDisplay-1);
                    ele_display.addClass("ak-is_active");
                    ele_display.children("dl").addClass(option.active_toggle);
                    ele_display.children("dl").find("dd").last().children("i").removeClass(option.down_ico).addClass(option.up_ico);
                }
                drop.each(function () {
                    var alldrop = $(this).parent("dl").parent("li");
                    var alldropsub = alldrop.children("dl").next();
                    if (alldrop.hasClass("ak-is_active")) {
                        alldropsub.show();
                    } else {
                        alldropsub.hide();
                    }
                    alldropsub.find("li").addClass("ml_3");
                    alldrop.children("dl").find("dd").last().unbind("click");
                    alldrop.children("dl").find("dd").last().click(function () {
                        alldrop.toggleClass("ak-is_active");
                        if (alldrop.children("dl").next().length > 0) {
                            alldrop.children("dl").toggleClass(option.active_toggle);
                        }
                        alldrop.children("dl").find("dd").last().children("i").toggleClass(option.up_ico + " " + option.down_ico);
                        if (alldrop.hasClass("ak-is_active")) {
                            alldropsub.slideDown(300);
                            option.callback(alldropsub);
                        } else {
                            alldropsub.slideUp(300);
                        }
                    });
                });
            }
        };
        var drop = new DropDown($(this).children("li"));
    };
} (jQuery));

/*-----------------------------------------------AKjs_EchartsRun (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_EchartsRun = function(setting) {
        var opt = $.extend({
                width: 0,
                height: 0,
                option:{},
                callback:function(){}
            },
            setting);
        function Echarts(el) {
            var _this = this;
            _this.elem = el;
            _this.initEvents();
        }
        Echarts.prototype = {
            initEvents: function() {
                var obj = this;
                $(this.elem).css({
                    "width": opt.width,
                    "height": opt.height
                });
                var myChart = echarts.init(obj.elem.get(0));
                var option = opt.option;
                opt.callback(myChart,option);
            }
        };
        new Echarts($(this));
    };
} (jQuery));

/*-----------------------------------------------AKjs_Favorite (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Favorite = function(setting) {
        var options = $.extend({
                likeMode: true,
                str: "+1",
                icon_defaultClass: "",
                icon_changeClass: "",
                textClass: "c_white text_12rem ml_02rem mr_02rem",
                text_default: "Favorite",
                text_change: "Cancel",
                startSize: "12px",
                endSize: "30px",
                interval: 600,
                color: "red",
                callback: function() {}
            },
            setting);
        var that = $(this);
        that.each(function() {
            $(this).children("i").css({
                "*display": "inline",
                "*zoom": "1"
            });
            if (options.likeMode == true) {
                $(this).append("<i></i><span></span>(<em></em>)");
                $(this).children("i").addClass(options.icon_defaultClass);
                $(this).children("span").addClass(options.textClass).text(options.text_default);
                $(this).children("em").text($(this).attr("data-value"));
                if (typeof($(this).attr("favorite")) != "undefined") {
                    if ($(this).attr("favorite") == 1) {
                        $(this).children("i").removeClass(options.icon_defaultClass);
                        $(this).children("i").addClass(options.icon_changeClass);
                    }
                }
            } else {
                $(this).append("<i></i><span></span>");
                $(this).children("i").addClass(options.icon_defaultClass);
                $(this).children("span").addClass(options.textClass).text(options.text_default);
                if (typeof($(this).attr("favorite")) != "undefined") {
                    if ($(this).attr("favorite") == 1) {
                        $(this).children("span").text(options.text_change);
                        $(this).children("i").removeClass(options.icon_defaultClass);
                        $(this).children("i").addClass(options.icon_changeClass);
                    }
                }
            }
        });
        that.unbind("click");
        that.on("click",
            function(e) {
                e.preventDefault();
                var ele = $(this);
                if (options.likeMode == true) {
                    if (typeof($(this).attr("favorite")) != "undefined") {
                        if ($(this).attr("favorite") == 1) {
                            return false;
                        }
                        $(this).attr("favorite", 1);
                    }
                    var count = parseInt($(this).attr("data-value")) + 1;
                    $(this).attr("data-value", count);
                    $(this).find("em").text(count);
                    $(this).children("i").removeClass(options.icon_defaultClass);
                    $(this).children("i").addClass(options.icon_changeClass);
                    $("body").append("<span class='ak-NumLength press'>" + options.str + "</span>");
                    var box = $(".ak-NumLength");
                    $(window).resize(function() {
                        left = ele.offset().left + ele.width() / 2;
                        top = ele.offset().top - 10
                    });
                    var left = ele.offset().left + ele.width() / 2;
                    var top = ele.offset().top - 10;
                    box.css({
                        "position": "absolute",
                        "left": left,
                        "top": top,
                        "z-index": 9999,
                        "font-size": options.startSize,
                        "line-height": options.endSize,
                        "color": options.color
                    });
                    box.animate({
                            "font-size": options.endSize,
                            "opacity": "0",
                            "top": top - parseInt(options.endSize)
                        },
                        options.interval,
                        function() {
                            box.remove();
                            options.callback(count, ele);
                        })
                } else {
                    if ($(this).children("i").hasClass(options.icon_changeClass)) {
                        var count = parseInt($(this).attr("data-value")) - 1;
                    } else {
                        var count = parseInt($(this).attr("data-value")) + 1;
                    }
                    if ($(this).children("span").text() == options.text_default) {
                        $(this).children("span").text(options.text_change);
                        options.callback(true, ele);
                    } else {
                        $(this).children("span").text(options.text_default);
                        options.callback(false, ele);
                    }
                    $(this).attr("data-value", count);
                    $(this).children("i").toggleClass(options.icon_defaultClass + " " + options.icon_changeClass);
                }
            })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Form (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Form = function(setting) {
        var option = $.extend({
                btn_delete: "",
                btn_delete_ico: "",
                btn_password: "",
                btn_password_ico_hide: "",
                btn_password_ico_show: "",
                placeholder: true,
                keyboard: true,
                PassCheck: "",
                validate: true,
                valCallback: function() {},
                passCallback: function() {},
                butCallback: function() {}
            },
            setting);
        var mbf = $(this);
        if (option.validate == true) {
            mbf.find(":submit").addClass("disabled").attr("disabled", "disabled")
        }
        var password = mbf.find(option.PassCheck);
        mbf.find(":submit").addClass("mb_5");
        mbf.find(":submit").unbind("click");
        mbf.find(":submit").click(function() {
            if (option.PassCheck) {
                if (password.length > 1) {
                    if (password[0].value != password[1].value) {
                        if (mbf.find(option.PassCheck).length > 0) {
                            option.passCallback();
                            return false;
                        }
                    }
                }
            }
            option.butCallback(mbf, false);
            document.activeElement.blur();
            if (mbf.find(":submit").parents("form").attr("onsubmit") == "return false") {
                return false;
            } else {
                return true;
            }
        });
        mbf.keyup(function(event) {
            event.preventDefault();
            if (option.validate == true) {
                var inputs = $(this).find("input[required]");
                var submits = $(this).find(":submit");
                if (mbf.find("textarea[required]").length > 0) {
                    var textareaVal = (mbf.find("textarea[required]").val().replace(/<(.+?)>/gi, "&lt;$1&gt;")).replace(/\n/gi, "|");
                    var strLen = textareaVal.split("|").join("").length;
                } else {
                    var strLen = 2;
                }
                var arr = [];
                for (var i = 0; i < inputs.length; i++) {
                    var tmpFlag = inputs[i].value == "" ? false: true;
                    arr.push(tmpFlag);
                }
                var flag = false;
                if (arr.length == 1) {
                    flag = arr[0];
                } else {
                    if (arr.length > 1) {
                        flag = arr[0];
                        for (var i = 1; i < arr.length; i++) {
                            flag = flag && arr[i];
                        }
                    } else {
                        flag = true;
                    }
                }
                if (!mbf.find(":submit").hasClass("disabled") || strLen > 0) {
                    if (!flag) {
                        submits.addClass("disabled");
                        submits.attr("disabled", "disabled");
                        option.valCallback(flag);
                    } else {
                        submits.removeClass("disabled");
                        submits.removeAttr("disabled");
                        option.valCallback(flag);
                    }
                }
            }
            var keycode = event.which;
            if (keycode == 13) {
                option.butCallback(mbf, true);
            }
        });
        var btn_password = mbf.find(option.btn_password);
        btn_password.each(function() {
            var pass_btn = $(this);
            pass_btn.parent().append('<button type="button" class="press top_0 right_0 abs text_al_r text_18rem c_gray_ccc"></button>');
            pass_btn.parent().children("button").addClass(option.btn_password_ico_hide);
            pass_btn.parent().children("button").css({
                "height": pass_btn.outerHeight(),
                "margin-left": pass_btn.width() - pass_btn.parent().children("button").width()
            });
            $(window).resize(function() {
                pass_btn.parent().children("button").css({
                    "height": pass_btn.outerHeight(),
                    "margin-left": pass_btn.width() - pass_btn.parent().children("button").width()
                })
            });
            pass_btn.parent().children("button").unbind("click");
            pass_btn.parent().children("button").click(function() {
                $(this).toggleClass(option.btn_password_ico_hide + " " + option.btn_password_ico_show);
                if ($(this).hasClass(option.btn_password_ico_show)) {
                    $(this).parent().children("input").attr("type", "text");
                } else {
                    $(this).parent().children("input").attr("type", "password");
                }
            })
        });
        var btn_delete = mbf.find(option.btn_delete);
        btn_delete.keyup(function() {
            var del_btn = $(this);
            if ($(this).val().length > 0) {
                if ($(this).next("button[type=reset]").length < 1) {
                    $(this).after("<button type=\"reset\" class='press top_0 right_0 abs text_al_r text_18rem c_gray_ccc'></button>");
                    $(this).next("button[type=reset]").css({
                        "height": del_btn.outerHeight(),
                        "margin-left": del_btn.width() - del_btn.next("button").width()
                    });
                    $(window).resize(function() {
                        del_btn.next("button[type=reset]").css({
                            "height": del_btn.outerHeight(),
                            "margin-left": del_btn.width() - del_btn.next("button").width()
                        })
                    });
                    $(this).next("button[type=reset]").addClass(option.btn_delete_ico);
                }
                $(this).next("button[type=reset]").unbind("click");
                $(this).next("button[type=reset]").click(function() {
                    if ($(this).prev("input").attr("required")) {
                        flag = false;
                        $(this).prev("input").val("");
                        mbf.find(":submit").addClass("disabled");
                        mbf.find(":submit").attr("disabled", "disabled");
                        option.valCallback(flag);
                    }
                    $(this).remove();
                })
            } else {
                $(this).next("button[type=reset]").remove();
            }
        });
        if (option.placeholder == true) {
            var placeholder_tmp = "";
            mbf.find("*[placeholder]").focus(function() {
                placeholder_tmp = $(this).attr("placeholder");
                if ($(this)[0].type != "search") {
                    $(this).removeAttr("placeholder");
                }
                $(this).blur(function() {
                    $(this).attr("placeholder", placeholder_tmp);
                })
            });
            $("input[type=button]").each(function() {
                var place = $(this);
                if ($(this).attr("placeholder") && $(this).val() == "") {
                    $(this).parent().append("<label class='top_0  abs c_gray_ccc'></label>");
                    $(this).next("label").html($(this).attr("placeholder"));
                    place.next("label").css({
                        "width": place.outerWidth(),
                        "min-width": "100%",
                        "height": place.outerHeight(),
                        "line-height": place.outerHeight() + "px"
                    });
                    $(window).resize(function() {
                        place.next("label").css({
                            "width": place.outerWidth(),
                            "min-width": "100%",
                            "height": place.outerHeight(),
                            "line-height": place.outerHeight() + "px"
                        })
                    });
                    $(this).next("label").unbind("click");
                    $(this).next("label").click(function() {
                        $(this).prev("input[type=button]").click();
                    })
                }
            })
        }
        if (option.keyboard == true) {
            mbf.find("*[readonly]").focus(function() {
                document.activeElement.blur();
            });
            mbf.find("*[maxlength]").each(function() {
                $(this).attr("oninput", "if(value.length>" + $(this).attr("maxlength") + ")value=value.slice(0," + $(this).attr("maxlength") + ")");
                $(this).on("input", function() {
                    var maxlength = $(this).val();
                    if (maxlength.length == $(this).attr("maxlength")) {
                        document.activeElement.blur();
                    }
                })
            })
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_GetVerifyCode (2018-12-13)--------------------------------------------*/
(function($) {
    function AKjs_GetVerifyCode() {}
    AKjs_GetVerifyCode.prototype.SecondCountDown = function(options) {
        var countDown = {};
        countDown.options = {
            time: 60,
            progress: function() {},
            started: function() {},
            breaked: function() {},
            end: function() {}
        };
        for (var i in options) {
            countDown.options[i] = options[i];
        }
        countDown.timer = null;
        countDown.time = 0;
        countDown._continueRun = true;
        countDown.start = function() {
            var that = this,
                time = that.options.time || 60,
                count = 0,
                interval = 1000,
                start = new Date().getTime(),
                targetTime = that.options.time * 1000;
            clearTimeout(that.timer);
            if (that.options.started && (({}).toString.call(that.options.started) == "[object Function]")) {
                that.options.started(time);
            }
            this._continueRun = true;
            that.timer = setTimeout(function() {
                    if (that._continueRun) {
                        var wucha = 0,
                            nextRunTime = interval,
                            currentFn = arguments.callee;
                        count++;
                        wucha = new Date().getTime() - (start + count * interval);
                        wucha = (wucha <= 0) ? 0 : wucha;
                        nextRunTime = interval - wucha;
                        nextRunTime = (nextRunTime <= 0) ? 0 : nextRunTime;
                        time--;
                        if (that.options.progress && (({}).toString.call(that.options.progress) == "[object Function]")) {
                            that.options.progress(time);
                        }
                        that.time = time;
                        that.timer = setTimeout(currentFn, nextRunTime);
                        if ((targetTime -= interval) <= 0) {
                            clearTimeout(that.timer);
                            if (that.options.end && (({}).toString.call(that.options.end) == "[object Function]")) {
                                that.options.end(time);
                            }
                            that.time = time;
                            return
                        }
                    } else {
                        clearTimeout(that.timer);
                    }
                },
                interval)
        };
        countDown.abort = function() {
            this._continueRun = false;
            clearTimeout(this.timer);
            this.time--;
            if (this.options.breaked && (({}).toString.call(this.options.breaked) == "[object Function]")) {
                this.options.breaked(this.time);
            }
        };
        return countDown
    };
    AKjs_GetVerifyCode.prototype.verify = function(eles, options) {
        eles = $(eles);
        if (eles.length > 0) {
            var self = this,
                timedown = {},
                verifyObj = {},
                _options = {
                    time: 60,
                    event: "click",
                    phone: "",
                    ableClass: "c_theme",
                    unableClass: "c_gray_999",
                    condition: function() {},
                    progress: function() {},
                    timeUp: function() {},
                    abort: function() {},
                    eventFn: function() {}
                };
            $.extend(_options, options);
            eles.on(_options.event,
                function() {
                    if (this.unabled) {
                        return
                    }
                    var canRun = true,
                        phone = _options.phone;
                    if ($.isFunction(_options.condition)) {
                        canRun = _options.condition.call(this, phone);
                    } else {
                        canRun = _options.condition(phone);
                    }
                    if (!canRun) {
                        return
                    }
                    var that = this,
                        $this = $(that);
                    timedown = self.SecondCountDown({
                        time: _options.time,
                        progress: function(time) {
                            _options.progress.call(that, time, phone);
                        },
                        end: function(time) {
                            that.unabled = false;
                            $this.removeClass(_options.unableClass);
                            $this.addClass(_options.ableClass);
                            _options.timeUp.call(that, time, phone);
                        },
                        breaked: function(time) {
                            that.unabled = false;
                            $this.removeClass(_options.unableClass);
                            $this.addClass(_options.ableClass);
                            _options.abort.call(that, time, phone);
                        }
                    });
                    timedown.start();
                    this.timedown = timedown;
                    that.unabled = true;
                    $this.removeClass(_options.ableClass);
                    $this.addClass(_options.unableClass);
                    _options.eventFn.call(this, phone);
                })
        }
    };
    window.AKjs_GetVerifyCode = new AKjs_GetVerifyCode()
} (jQuery));

/*-----------------------------------------------AKjs_GoTop (2018-12-13)--------------------------------------------*/
function AKjs_GoTop (setting) {
    option = $.extend({
        dom: $(window),
        hide: false,
        url: "",
        icon: "",
        state: "bottom",
        height: "40px",
        width: "auto",
        time: 500,
        scrollTop: 400,
        aimation: "show",
        hidetime: 2000,
        toTop :function () {},
        toShow :function () {},
        toHide :function () {},
        toClick :function () {}
    },setting);
    var sate,
        timer=null;
    AKjs_UserAgent();
    $(function() {
        if(option.state=='center'){
            sate='top:50%';
        }
        else if(option.state=='bottom'){
            sate= 'bottom:10%';
        }
        if(!option.icon || option.url) {
            var dom = '<div class="ak-GoTopBox" style="width:' + option.width + ';height:' + option.height + ';display:none;position:fixed;cursor:pointer;right:2rem;z-index:999;' + sate + '">' +
                '<img src=' + option.url + ' style="width:100%" />' +
                '</div>';
        } else {
            var dom = '<div class="ak-GoTopBox ' + option.icon + '" style="width:' + option.width + ';height:' + option.height + ';display:none;position:fixed;cursor:pointer;right:2rem;z-index:999;' + sate + '">' +
                '</div>';
        }
        $('.ak-GoTopBox').remove();
        $("body").append(dom);
        var GoTopBox = $('.ak-GoTopBox');
        option.dom.on('scroll',throttle(scroll,50));
        function scroll(){
            if(option.dom.scrollTop()>=option.scrollTop){
                GoTopBox.addClass(option.aimation).fadeIn();
                if(option.hide){
                    clearTimeout(timer);
                    if (!IsMobile) {
                        timer = setTimeout(function () {
                            GoTopBox.fadeOut();
                            option.toHide && option.toHide();
                        }, option.hidetime);
                    }
                }
                option.toShow&&option.toShow();
            }else{
                if(GoTopBox.css('display')=='block'){
                    option.toHide&&option.toHide();
                }
                GoTopBox.hide().removeClass(option.aimation);
            }
            if(option.dom.scrollTop()<=5){
                option.toTop&&option.toTop();
                if(option.state=='center'){
                    GoTopBox.animate({
                        top: "50%",
                        width: option.width
                    });
                }
                else if(option.state=='bottom'){
                    GoTopBox.animate({
                        bottom: "10%",
                        width: option.width
                    });
                }
            }
        }
        GoTopBox.on('click',function(){
            option.dom.animate({
                scrollTop:0
            },option.time,function(){
                option.toTop&&option.toTop();
            });
            if(option.state=='center'){
                GoTopBox.animate({
                    top: "100%",
                    width: 0
                });
            }
            else if(option.state=='bottom'){
                GoTopBox.animate({
                    bottom: "100%",
                    width: 0
                });
            }
            option.toClick&&option.toClick();
        });
        option.dom.on('load',function(){
            if(option.dom.scrollTop()==0){
                return;
            }
            scroll();
        });
        GoTopBox.on('mouseenter',function(){
            clearTimeout(timer);
            GoTopBox.fadeIn();
        });
        GoTopBox.on('mouseleave',function(){
            if (!IsMobile) {
                timer = setTimeout(function () {
                    GoTopBox.fadeOut();
                    option.toHide && option.toHide();
                }, option.hidetime);
            }
        });
        function throttle(fn,time){
            var timer=null;
            return function(){
                var ctx=this,arg=arguments;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn.apply(ctx,arg);
                },time);
            }
        }
    });
}

/*-----------------------------------------------AKjs_IntlTelInput (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_IntlTelInput = function(setting) {
        var option = $.extend({
                Title_Text: "",
                Close_btn: "",
                Close_Text: "",
                Close_Icon: "",
                list_Class: "",
                Nav_active: "",
                show_color: "",
                data: [],
                boxsize: ["20rem","30rem"],
                showBack: function() {},
                clickBack: function() {}
            },
            setting);
        function TelInput(el) {
            this.el = el;
            this.initEvents()
        }
        TelInput.prototype = {
            initEvents: function() {
                var obj = this;
                AKjs_UserAgent();
                $(function() {
                    obj.el.each(function() {
                        $(".ak-IntlTel").remove();
                        $("body").append("<div class='ak-IntlTel'><datalist></datalist></div>");
                        var objsub = $(".ak-IntlTel");
                        var datalist = objsub.children("datalist");
                        datalist.before("<h6></h6>");
                        var str = "<ol>\n";
                        for (var k = 0; k < option.data.length; k++) {
                            str += "<li>" + option.data[k].value + "</li>\n"
                        }
                        str += "</ol>";
                        datalist.before(str);
                        var tmp = "";
                        for (var i = 0; i < option.data.length; i++) {
                            tmp += "<dl>";
                            tmp += '<dt data-id="' + option.data[i].id + '">' + option.data[i].value + "</dt>";
                            for (var j = 0; j < option.data[i].child.length; j++) {
                                tmp += '<dd data-country="' + option.data[i].child[j].country + '" data-number="' + option.data[i].child[j].number + '" data-id="' + option.data[i].child[j].id + '">' + option.data[i].child[j].country + " " + option.data[i].child[j].number + "</dd>"
                            }
                            tmp += "</dl>";
                        }
                        datalist.html(tmp);
                        var objsub_title = objsub.find("h6");
                        var objsub_ol = objsub.find("ol");
                        var objsub_dl = objsub.find("dl");
                        AKjs_UserAgent();
                        objsub.append("<div class='ak-IntlTel_head'>" + "<button type='button' class='" + option.Close_btn + "'><i class='" + option.Close_Icon + "'></i>" + option.Close_Text + "</button>\n" + "<h1>" + option.Title_Text + "</h1>" + "</div>");
                        var IntlTel_head = "bg_gray_f9f bor_bottom bor_gray_ddd";
                        if (IsMobile) {
                            if ($("header").length > 0) {
                                var headStyle = $("header").attr("class");
                                objsub.find(".ak-IntlTel_head").addClass(headStyle);
                            } else {
                                objsub.find(".ak-IntlTel_head").addClass(IntlTel_head);
                            }
                            objsub.find(".ak-IntlTel_head").removeClass("dis_none_im");
                            objsub.addClass("bor_none");
                        } else {
                            objsub.find(".ak-IntlTel_head").addClass("dis_none_im");
                        }
                        objsub_title.addClass(option.show_color).css({
                            "height": $(window).height()
                        });
                        datalist.addClass("scrolling_touch press").css({
                            "margin-top": $(".ak-IntlTel_head").outerHeight(),
                            "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                        });
                        if (IsMobile) {
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10,
                                "margin-right": 0
                            })
                        } else {
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10,
                                "margin-right": "1%"
                            })
                        }
                        $(window).resize(function() {
                            objsub_title.addClass(option.show_color).css({
                                "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                            });
                            datalist.addClass("scrolling_touch press").css({
                                "margin-top": $(".ak-IntlTel_head").outerHeight(),
                                "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                            });
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10
                            })
                        });
                        objsub_dl.find("dd").addClass(option.list_Class);
                        var this_h = 0;
                        datalist.scroll(function() {
                            var letter_position = [];
                            datalist.each(function() {
                                for (var i = 0; i < $(this).find("dl").length; i++) {
                                    letter_position.push($(this).find("dl")[i].offsetTop);
                                }
                            });
                            if ($(".ak-IntlTel_head").length > 0) {
                                scrolltop = datalist.scrollTop() + $(".ak-IntlTel_head").outerHeight();
                            } else {
                                scrolltop = datalist.scrollTop();
                            }
                            for (var j = 0; j < letter_position.length; j++) {
                                if (scrolltop >= letter_position[j]) {
                                    objsub_ol.find("li").removeClass(option.Nav_active);
                                    objsub_ol.find("li").eq(j).addClass(option.Nav_active);
                                }
                            }
                            this_h = datalist.scrollTop();
                        });
                        objsub_ol.find("li").unbind("click");
                        objsub_ol.find("li").on("click", function(event) {
                            if (IsMobile) {
                                this_h += objsub_dl.eq($(this).index()).offset().top - $(".ak-IntlTel_head").outerHeight() + 2;
                            } else {
                                this_h += objsub_dl.eq($(this).index()).offset().top - objsub.offset().top + 2;
                            }
                            event.stopPropagation();
                            objsub.show();
                            objsub_title.fadeIn();
                            setTimeout(function() {
                                objsub_title.fadeOut();
                            }, 800);
                            objsub_title.text($(this).text());
                            datalist.animate({
                                scrollTop: this_h
                            }, 500);
                        });
                        objsub_dl.find("dd").unbind("click");
                        objsub_dl.find("dd").on("click", function() {
                            var val = this;
                            obj.el.children("input").val($(this).attr("data-number"));
                            objsub.hide();
                            obj.el.removeClass("ak-is_active");
                            option.clickBack(val);
                        });
                        $(this).unbind("click");
                        $(this).on("click",
                            function(event) {
                                var _this = $(this);
                                $(this).toggleClass("ak-is_active");
                                if ($(this).hasClass("ak-is_active")) {
                                    if (IsMobile) {
                                        objsub.show();
                                    } else {
                                        objsub.find(".ak-IntlTel_head").addClass("dis_none_im");
                                        objsub.addClass("abs").css({
                                            "width": option.boxsize[0],
                                            "left": $(this).offset().left
                                        });
                                        objsub.children("ol").addClass("abs top_0 mt_1rem mr_16rem");
                                        datalist.addClass("mt_0 scrollbar").css({
                                            "height": option.boxsize[1]
                                        });
                                        if ($(this).offset().top + $(this).innerHeight()+ objsub.innerHeight() > $(window).height()) {
                                            objsub.css({
                                                "top": "auto",
                                                "bottom": $("#ak-scrollview").outerHeight() - ($(this).offset().top + $(this).outerHeight()) + $("#ak-scrollview").offset().top + $(this).innerHeight()*2-4
                                            });
                                        } else {
                                            objsub.addClass("abs").css({
                                                "top": $(this).offset().top + $(this).outerHeight(),
                                                "bottom": "auto",
                                            });
                                        }
                                        objsub.slideDown();
                                    }
                                    option.showBack(objsub);
                                    $("body").unbind("click");
                                    $(document).on("mousedown", function(e) {
                                        if ($(e.target).closest(_this).length === 0) {
                                            objsub.slideUp();
                                            obj.el.removeClass("ak-is_active");
                                        }
                                    });
                                    if ($('#ak-scrollview').length > 0) {
                                        var $scrollbar = $("#ak-scrollview");
                                    } else {
                                        var $scrollbar = $("main");
                                    }
                                    $scrollbar.scroll(function(){
                                        objsub.hide();
                                        obj.el.removeClass("ak-is_active");
                                    });
                                } else {
                                    if (IsMobile) {
                                        objsub.hide();
                                    } else {
                                        objsub.slideUp();
                                    }
                                }
                                event.stopPropagation();
                            });
                        $(".ak-IntlTel_head").children("button").unbind("click");
                        $(".ak-IntlTel_head").children("button").click(function() {
                            obj.el.removeClass("ak-is_active");
                            objsub.hide();
                        })
                    })
                })
            }
        };
        var el = new TelInput($(this));
    }
} (jQuery));

/*-----------------------------------------------AKjs_Keyboard (2018-12-13)--------------------------------------------*/
(function($) {
    $.AKjs_Keyboard = function(options) {
        var defaults = {
            num: 6,
            title: "",
            msg: "",
            cancel: "",
            callback: function(data) {}
        };
        var val = $.extend(defaults, options);
        function fn(n) {
            var array = new Array();
            for(var i= 0; i<n; i++) {
                var rnd = Math.floor(Math.random()* (10));
                if(isIncluded(rnd, array)) {
                    i--;
                } else {
                    array.push(rnd);
                }
            }
            return array;
        }
        function isIncluded(element, array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if(array[i] == element) {
                    return true;
                }
            }
            return false;
        }
        var html  = "<div class='ak-keyboard'>";
        html += "	<div class='ak-mask'></div>";
        html += "	<section>";
        html += "	    <h3><i class='c_theme icon-mn_dunpai_fill'></i>" + val.title + "</h3>";
        html += "       <ul>";
        for (i = 0; i < val.num; i++) {
            html += "	        <li><span></span></li>";
        }
        html += "	    </ul>";
        html += "	    <blockquote></blockquote>";
        html += "		<ol>";
        html += "           <li class='cancel'>" + val.cancel + "</li>" +
            "           <li class='delete'><i class='icon-im_huige text_14rem line_h_22rem'></i></li>";
        html += "		</ol>";
        html += "	</section>";
        html += "	<figure></figure>";
        html += "</div>";
        var obj = {};
        var dom = $(html);
        var nowNo = 0;
        var calldata = [];
        obj.akjs_showKeyBoard = function() {
            document.activeElement.blur();
            dom.bind({
                touchmove: function (andrew) {
                    andrew.preventDefault();
                    andrew.stopPropagation();
                }
            });
            if ($(".ak-keyboard").length == 0) {
                $("body").append(dom);
            }
            dom.find("figure").html("<p><span><img src='data:image/gif;base64,R0lGODlhgACAAPICAN3d3bu7u////5mZmf///wAAAAAAAAAAACH5BAUFAAQAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAgACAAAAD/ki63P4wykmrvTjrzbv/oCaMQmieaEaSaeu66/rOdBezda5P97j/wEWvFCzmhsbkDKlsEgBQwIfZGVgHTk006qFurtfsZbu19argsJhC5nK8mbR6LWm7Reev3Eqf2O8YcBZ7c30Qf1J4N3p7hmx/ijEahFiOfpAqeRiUlo92mYubhJ2enxeCEpSVpHWYFqgRnKyXrhSwD6qzpWSnmhSyurRtr76po8G7ZRW3DcDIraY8xRDOzxGIiRLMCrnWyYAQ2wTV3oeI0qGx5OUP5+g4xo10AfQBIe7a8OryH2Af9fVA4AuxLk6aDgATfqgF4hgafhkSSuzAsB9EgwUpSNzI/mFYCjkcVBXCsJHjBmUt/DESibDkRHbURI7U4NIkTG4yZ3Ko+bJcTp0eeCr09pOPC6EAkRVdNQNpQFJLfzil1ylqkKmOijZBmlXmGp5dMyapGfbivJ6GzDpKChXozbdw48qdS7eu3bt48+rdy7cv36XdfAJ2yGBw4GeGqyU+rGuxM8eEG0MGuWAyZaWWVeLMbBQzZ6bjOAvOjMsyTNJ+U6tezbq169ewY8ueTbv2DM2WcFe9nJZ3H8ZigDth2VsskJxljdfQWtxrEKvJieuAnps5DeqssJ/QLvnnR+tEwXvgHt77ePNzxYtyPsmtxc4YpcdXHlM3wYMr6ZfWvx+/0onI6wE4iIAB2neeb+2pNaCB8zEYEoEFgpaghPk5WJl7myG40m8QXmhhhv7VJVxhCnpY4k3KdQjih6OduCJ89blYnoYOqPgijG/pZ+ONFLKjo4w8ysXfjkHmOCSQPPboGY0xskgiktUReWOETkbJZJMY1iglh1CaWOWTV+7W5ZQNZtlciBds6eWXWYw4gZpJLolmmmOuaWZwddqp5C95GgGnng/N2RabWob5pqDZ3bkPonTiqNqftpEZ6YSETiqppY0yiimWjm4aj6KemhjqqJ4mAAAh+QQFBQAEACwKAAIAVwAwAAAD/ki63P4wPkCBvDjrPSvlYChKnjeeKFdWaet26yu/6zffZ23hPKj3o4AwkPqhBEhBazhEGUfJJIrJzNVO0eiJ2hw9Q1lpkCv0XkVhsYjc9Z1BafWaLfpu4soUm+iOweMueyF2GXgvgipvGoaHiBqEEnh5jWSJfouAM3t8GZAQkjiOGJ4PjKF0nYqRmTyiJKoRpq2oF6QMsrO0EbYKoEAKrjAlGLg9m7WwDb6/wLoQl7GsEAPUA4HOwsTSD9XVS9hH2w3d5HqVMuLj5OVjXDPpDOvy7W3oWRjy83NlPFoZ+fqYCQQYUOAvgusMMkPITiEQht0cHoRITWIPihUt8sCoFPEiw44PCYIMmW/kxIYmSVpLqSEBACH5BAUFAAQALB8AAgBXADAAAAP+SLrc/ivIAKu9OOs25/5gqHWdaJ4i6aFsW6mSK88ETNH4aed8uPeigXDA+p0ASEBrOEQZRckkisnUwY5RqYnaND1BWW2QK/ReoWHkidwFfTVp8ZicOoPjS7bPvokr83RufHB4LmxEH28XfjOHiCODi4yNehuKFZOUlRmXD35/NIeWkZiFOaKcpJ6mp5sXnQ2ZPKivqrGss7QvtgufQAu6ELAKskCOtSqSuMauwiQYxb8EwQ8lymEuAtoCGNQo0SHb292BMssg4ukXzSznGunw5FU42CLw9xnzOVEm9/jS0vz9A9hD4ECCOAzGQ8hDoTqGCR2Og0hD4kSKMyxqw1gV0SLHiAo/5ggpcqTAkgUXoky50UQCACH5BAUFAAQALDwAAgBCAEIAAAP+SDQ8+jDKSaudrd3Ne82ZJ44WqJFoajJpO66OK2/wbH/rrUe1G/yB3aOXAgKFi1zReNwRScym7imKSm/UjvVqy3K2QaH3AkYmTdCteVwpr5VaN5I9kc/hG3D4jY5bzUN4FnZ8IH5RgIF9ZGqJCnQKeo6PgnWNk5CSk5QhjH+bijGDly4ApgA7hCinpzqkq6ysN68isbauTCm2u6lcHru8oBvAwcIVxMXGEsi3yhTMsc4T0LLSEdSt1tfYqNoQ3N7L0OHTyOTPxOfHzerrpu3w8fLz9PX29/j5+voC/f7/AAMCNCawoMF/oA4qNLhpocOBkx5KFNBwosOEFg8SzCgDUEECACH5BAUFAAQALE4ACgAwAFcAAAPsSLq886PJSSuF0Op9cebg5n1hKY2kqaKpWrKRu7KyC9fmjYdwvHO6nygotBCLHRRyqFxWjk5GL5ocUSfTawN65aoC4ICRtguHn82aeV3FqNfsts8Er48fsrqdqt87+35IgHB8g2ZRhod/iWCFjI6GWolaCoOUC4CXDIGalWedoKGio6SlpqeoqaoqAK2ur7CxsDWytbavLre6tqy7vrgmv8IAvcO7uca3tMmyq87P0NHS09TVMgLYAqXZ3KLc39qd4N/i4+SU5uPo6eBa7O3u793x8tj09ev14Vf6+/z4+diVSxeKoLdzo+ZRSAAAIfkEBQUABAAsTgAfADAAVwAAA+lIutz+bsgBq71tTsw70aAnRmA4jmV6iqm6Yq37VrE8k7V207m+4z3KLxOUDIG9IzGoRLaajxwUUpvyTNarMMvter/gsHhMLpvP3IB6zW6727O3fM5e0e/zE34PH/H/AXqAe3aDdHGGb2iLjI2Oj5CRkpMKAJYAZpeaY5qdmGCenaChol2koaannlyqq6ytm6+wlrKzqbOfWbi5EAK+Ai+4Fb+/wbC9xMXGp8jJwDfMD87K0KXS0887scPYYti+3t1h39lf32Pn4+Lq0+Hr5u9e5O7O6PFd6ez1+vtg+f7t6BEj088euCkJAAAh+QQFBQAEACw8ADwAQgBCAAAD+Ui63P5QjUmrvTbqHbH/FSdyYPmN6GOuWepKbPy+sTy7tXnP+bn/wKBwSCwaj8ikcslsOp/QqHRKCFgD1Nd1mx1tv9iuBvwVR8hgswNNVjPYbXcVXpbP6Vf7HR928/N2f1Z6gkYAhwA3f0SIiIp4Q42NO3SRkodAbJaXiZl1EQKhAhycmEFcGqKipKVPqqobpaZMr6uxrU21oay4S7qjvJe5uiOytMQixr7Iyb1Ivyiync/MzZxK0NHKR9na19S1L9tF3d7C3NXmkujh4uNC5SnvQfHy30T16o7k6S7n/O12TGL3So+DfHYQylHohqEahw8LGnwAa2KDBAAh+QQFBQAEACwfAE4AVwAwAAAD/ki63P4wyjfqmDjrzYn9XSiOzWdeZKpKp7m+sNe6cR3Ora1reL7/kN4JSHQIacXkEZQsLi1N5RMVBU41gqzgF+gGRk+MVqvzesHHyXhcM5tJQvU623Z3VTjJnByzn/FIEHt0EwCGABh+dytMEYNbhYeGiYpRj5ARkpITiotFjxiah5R+SZehooicnZ+DGamqq6VAoK+pGqw/taiiuJU7u7yaG7k1pxqwxMUwwcKbyrPMzZG90NEr09TDHMsp2drP3L8q3xLJHd0i5ea3Iekcxx3n6O9YriLz9Ncd9/jtIuNC9AuRT58bb2tSFDToiQQbhf9GvKnibBTFKAsv/sioFFEHx441PoKEIXLki2omiYRLqSABACH5BAUFAAQALAoATgBXADAAAAP+SLrcLlC4Sau9OLfItf/gx41SaJ4hOaJsS6mkK7ewOt9gbeM8pse94OS3EhoXxM5xmYwsj03IE9qcUokngBYgHHgHmWR2q+19vz4dikzGnc+XWou9db+9aSWLXr/d0XFOLnxlFwGHARh/eFYEhFyGiIeKi1aPkBWSkheLjEuPGJqIlH9Pl6GiiZydn4QZqaqrpUagr6karEK1qKK4lUG7vJoeuTinGrDExTPBwpvKs8zNkb3Q0YOuH8kfy3vZ2rcg3WN8Idvcv97l5uHi6SbHIOfo7yDTyO3u1/brJvP6b9b0Y1fNRD1+bVD8A+hJYCGF+QwCakRtGEUrCy8KyagTsQfHjjg+gpwhcqSMgiaNPOORAAAh+QQFBQAEACwCADwAQgBCAAAD9Ugk3P7wqUmrvZjGzV3+4NWNXGiCZCqdrKW+QitPsDrf9Xjv+bb/wKBwSCwaj8ikcslsOp/QqHRKPQGugKoMy9WauOCsNxMGjy/l8JmSLq8Jbfc6rj7TzfY79q3f5/t8gIF3OwGGAUZ6hYeGRXQ/jIxEbUGRh454QJaXmFdDm40gA6MDUqCIoqSjUKeoGaqqT6chsKROrbS1pU2zubW8oCe6u0u9vrBMxsexSrjCusXBLMPNysu2SdbXq0ja28RG3qm/R+LjyOHmH9TpmzvsRdI38ETyM/T1kUD4+aE//G8mAAxIYGBAg28QrlF4hmFDdAQxMEsAACH5BAUFAAQALAIACgAwAGwAAAP+SLrc/ktIAau9bU7Mu9KaJ1bgNp5MaaKnurKiS8GtS4/yjdt6J889TC4oHBItxiOJp4Qkm44nNCKdEqrTnzXKhAC+gB6WAAbrsOX0rctIu2HshXvOKlXmdFTIgs9P+35QgG9/g2VbhodWiWaFjIiPkINbcoCUlXiXbYSam1+doKGio6SlpqeoqToBrK2ur7CvMLG0ta4otrm1J7q9siO+wQG8wr24xbazyLGqzc7P0NHS09TPA9cDo9jboNve2Zff3pTi31bl4lDo6U3r5kru4/Dx2Or01+334PP0U/cs3Cr0Q/HugTsY5SCgu5FQoTwaCwXW0xExXEOLF8ll3LIqrlNFjew0feS48dxIkyFBpiS5remVBjC9ZxnQ5019JmhM9tlSJT1tOCwkAACH5BAkFAAQALAAAAAABAAEAAAMCSAkAOw=='><em>" + val.msg + "</em></span></p>");
            dom.find("ol").find(".number").remove();
            num_arry = fn(10);
            for(var i= 0; i<num_arry.length; i++) {
                dom.find("ol").append("<li class='number'>"+num_arry[i]+"</li>");
            }
            dom.find("ul").find("li").css({
                'width': 'calc(100% / ' + val.num + ')'
            });
            dom.children(".ak-mask").fadeIn();
            dom.children("section").animate({
                    'bottom': '0'
                },
                150);
            nowNo = 0;
            dom.find("ul").find("span").text(' ');
            dom.children(".ak-mask").click(function() {
                if (nowNo <= val.num) {
                    obj.akjs_hideKeyBoard();
                }
            });
            dom.find("li").click(function() {
                if (nowNo <= val.num && nowNo > -1) {
                    if ($(this).hasClass('cancel')) {
                        obj.akjs_hideKeyBoard();
                    } else if ($(this).hasClass('delete')) {
                        if (nowNo > 0) {
                            nowNo--;
                            dom.find("ul").find("span").eq(nowNo).text("");
                            calldata.pop();
                        }
                    } else if ($(this).hasClass("number")) {
                        dom.find('blockquote').text('');
                        dom.find("ul").find("span").eq(nowNo).text("●");
                        calldata.push($(this).text());
                        nowNo++;
                        if (nowNo == val.num) {
                            dom.children('figure').css({
                                "display": "table"
                            });
                            val.callback(calldata,dom);
                        }
                    }
                } else {
                    return false;
                }
            });
        };
        obj.akjs_reset = function(msg) {
            nowNo = 0;
            dom.find("ul").find("span").text("");
            dom.children('figure').css({
                "display": "none"
            });
            if (msg) {
                dom.find("blockquote").text(msg);
            } else {
                dom.find("blockquote").text('');
            }
            calldata = [];
        };
        obj.akjs_hideKeyBoard = function() {
            dom.children("section").animate({
                    'bottom': '-360px'
                },
                150);
            dom.children(".ak-mask").fadeOut(function() {
                dom.remove();
            });
            setTimeout(function() {
                obj.akjs_reset();
            }, 1000);
        };
        return obj;
    };
} (jQuery));

/*-----------------------------------------------AKjs_lightSlider (2018-12-13)--------------------------------------------*/
(function($) {
    var defaults = {
        item: 3,
        autoWidth: false,
        slideMove: 1,
        slideMargin: 10,
        activeClass: "",
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
        onSliderClick: function($el, num) {},
        onSliderLoad: function($el) {}
    };
    $.fn.AKjs_lightSlider = function(options) {
        if (this.length === 0) {
            return this
        }
        if (this.length > 1) {
            this.each(function() {
                $(this).AKjs_lightSlider(options)
            });
            return this
        }
        var plugin = {},
            settings = $.extend(true, {},
                defaults, options),
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
            $slide = "",
            scene = 0,
            property = "width",
            gutter = "margin-right",
            slideValue = 0,
            slideWidth = 0,
            interval = null,
            isTouch = ("ontouchstart" in document.documentElement);
        var refresh = {};
        refresh.chbreakpoint = function() {
            windowW = $(window).width();
            if (settings.responsive.length) {
                var item;
                if (settings.autoWidth === false) {
                    item = settings.item
                }
                if (windowW < settings.responsive[0].breakpoint) {
                    for (var i = 0; i < settings.responsive.length; i++) {
                        if (windowW < settings.responsive[i].breakpoint) {
                            breakpoint = settings.responsive[i].breakpoint;
                            resposiveObj = settings.responsive[i];
                        }
                    }
                }
                if (typeof resposiveObj !== "undefined" && resposiveObj !== null) {
                    for (var j in resposiveObj.settings) {
                        if (resposiveObj.settings.hasOwnProperty(j)) {
                            if (typeof settingsTemp[j] === "undefined" || settingsTemp[j] === null) {
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
                            scene = Math.round(slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove))
                        }
                    }
                }
            }
        };
        refresh.calSW = function() {
            if (settings.autoWidth === false) {
                slideWidth = (elSize - ((settings.item * (settings.slideMargin)) - settings.slideMargin)) / settings.item;
            }
        };
        refresh.calWidth = function(cln) {
            var ln = cln === true ? $slide.find(".ak-lslide").length: $children.length;
            if (settings.autoWidth === false) {
                w = ln * (slideWidth + settings.slideMargin);
            } else {
                w = 0;
                for (var i = 0; i < ln; i++) {
                    w += (parseInt($children.eq(i).width()) + settings.slideMargin);
                }
            }
            return w
        };
        plugin = {
            doCss: function() {
                var support = function() {
                    var transition = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"];
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
            initialStyle: function() {
                var $this = this;
                if (settings.autoWidth) {
                    settings.slideMove = 1;
                    settings.item = 1
                }
                if (settings.loop) {
                    settings.slideMove = 1;
                    settings.freeMove = false
                }
                refresh.chbreakpoint();
                $el.addClass("ak-lightSlider").wrap('<div class="ak-lSSlideOuter"><div class="ak-lSSlideWrapper"></div></div>');
                $slide = $el.parent(".ak-lSSlideWrapper");
                elSize = $el.outerWidth();
                $children.addClass("ak-lslide");
                if (settings.loop === true) {
                    refresh.calSW();
                    refresh.clone = function() {
                        if (refresh.calWidth(true) > elSize) {
                            var tWr = 0,
                                tI = 0;
                            for (var k = 0; k < $children.length; k++) {
                                tWr += (parseInt($el.find(".ak-lslide").eq(k).width()) + settings.slideMargin);
                                tI++;
                                if (tWr >= (elSize + settings.slideMargin)) {
                                    break
                                }
                            }
                            var tItem = settings.autoWidth === true ? tI: settings.item;
                            if (tItem < $el.find(".ak-lSSclone.ak-lSSleft").length) {
                                for (var i = 0; i < $el.find(".ak-lSSclone.ak-lSSleft").length - tItem; i++) {
                                    $children.eq(i).remove()
                                }
                            }
                            if (tItem < $el.find(".ak-lSSclone.ak-lSSright").length) {
                                for (var j = $children.length - 1; j > ($children.length - 1 - $el.find(".ak-lSSclone.ak-lSSright").length); j--) {
                                    scene--;
                                    $children.eq(j).remove()
                                }
                            }
                            for (var n = $el.find(".ak-lSSclone.ak-lSSright").length; n < tItem; n++) {
                                $el.find(".ak-lslide").eq(n).clone().removeClass("ak-lslide").addClass("ak-lSSclone ak-lSSright").appendTo($el);
                                scene++
                            }
                            for (var m = $el.find(".ak-lslide").length - $el.find(".ak-lSSclone.ak-lSSleft").length; m > ($el.find(".ak-lslide").length - tItem); m--) {
                                $el.find(".ak-lslide").eq(m - 1).clone().removeClass("ak-lslide").addClass("ak-lSSclone ak-lSSleft").prependTo($el)
                            }
                            $children = $el.children()
                        } else {
                            if ($children.hasClass("ak-lSSclone")) {
                                $el.find(".ak-lSSclone").remove();
                                $this.move($el, 0)
                            }
                        }
                    };
                    refresh.clone()
                }
                var index = 0;
                $children.on("click",
                    function() {
                        var le_length = $el.find(".ak-lSSclone.ak-lSSleft").length;
                        var mi_length = $el.find(".ak-lslide").length;
                        var al_length = $children.length;
                        var i = $(this).index();
                        index = i;
                        if (i >= mi_length + le_length) {
                            if (i != al_length - 1) {
                                index = i - mi_length
                            }
                        }
                        if (i < le_length) {
                            index = i + mi_length
                        }
                        var num = index - le_length + 1;
                        settings.onSliderClick($(this), num);
                        $(this).addClass("ak-is_active " + settings.activeClass).siblings($children).removeClass("ak-is_active " + settings.activeClass)
                    });
                refresh.sSW = function() {
                    length = $children.length;
                    if (settings.autoWidth === false) {
                        $children.css(property, slideWidth + "px")
                    }
                    $children.css(gutter, settings.slideMargin + "px");
                    w = refresh.calWidth(false);
                    $el.css(property, w + "px");
                    if (settings.loop === true) {
                        if (on === false) {
                            scene = $el.find(".ak-lSSclone.ak-lSSleft").length
                        }
                    }
                };
                refresh.calL = function() {
                    $children = $el.children();
                    length = $children.length
                };
                if (this.doCss()) {
                    $slide.addClass("ak-usingCss")
                }
                refresh.calL();
                refresh.calSW();
                refresh.sSW();
                if (settings.loop === true) {
                    slideValue = $this.slideValue();
                    this.move($el, slideValue)
                }
                this.setHeight($el, false);
                if (settings.loop === true) {
                    $children.eq(scene).addClass("ak-is_active " + settings.activeClass)
                } else {
                    $children.first().addClass("ak-is_active " + settings.activeClass)
                }
            },
            pager: function() {
                var $this = this;
                refresh.createPager = function() {
                    var $children = $slide.find(".ak-lslide");
                    var length = $slide.find(".ak-lslide").length;
                    var i = 0,
                        pagers = "",
                        v = 0;
                    for (i = 0; i < length; i++) {
                        if (!settings.autoWidth) {
                            v = i * ((slideWidth + settings.slideMargin) * settings.slideMove)
                        } else {
                            v += ((parseInt($children.eq(i).width()) + settings.slideMargin) * settings.slideMove)
                        }
                        pagers += "<li>" + (i + 1) + "</li>";
                        if ((v) >= w - elSize - settings.slideMargin) {
                            i = i + 1;
                            var minPgr = 2;
                            if (settings.autoWidth) {
                                pagers += "<li>" + (i + 1) + "</li>";
                                minPgr = 1
                            }
                            if (i < minPgr) {
                                pagers = null;
                                $slide.parent().addClass("ak-noPager")
                            } else {
                                $slide.parent().removeClass("ak-noPager")
                            }
                            break
                        }
                    }
                    var $cSouter = $slide.parent();
                    $cSouter.find(".ak-lSPager").html(pagers);
                    var $pager = $cSouter.find(".ak-lSPager").find("li");
                    $pager.addClass(settings.dotClass[0]);
                    $pager.first().addClass("active " + settings.dotClass[1]);
                    $pager.on("click",
                        function() {
                            if (settings.loop === true) {
                                scene = scene + ($pager.index(this) - $cSouter.find(".ak-lSPager").find("li.ak-is_active").index())
                            } else {
                                scene = $pager.index(this)
                            }
                            $el.mode(false);
                            return false
                        })
                };
                if (settings.pager) {
                    var cl = "ak-lSpg";
                    $slide.after('<ul class="ak-lSPager ' + cl + '"></ul>');
                    refresh.createPager()
                }
                setTimeout(function() {
                        refresh.init()
                    },
                    0)
            },
            setHeight: function(ob) {
                var obj = null,
                    $this = this;
                if (settings.loop) {
                    obj = ob.children(".ak-lslide ").first()
                } else {
                    obj = ob.children().first()
                }
                var setCss = function() {
                    var tH = obj.outerHeight(),
                        tP = 0,
                        tHT = tH;
                    ob.css({
                        "height": tH + 2 + "px",
                        "padding-bottom": tP + "%"
                    })
                };
                setCss();
                if (obj.length) {
                    if (obj[0].complete) {
                        setCss();
                        if (!interval) {
                            $this.auto()
                        }
                    }
                } else {
                    if (!interval) {
                        $this.auto()
                    }
                }
            },
            active: function(ob, t) {
                var sc = 0;
                if (scene * settings.slideMove < length) {
                    ob.removeClass("active " + settings.dotClass[1]);
                    if (t === true) {
                        sc = scene
                    } else {
                        sc = scene * settings.slideMove
                    }
                    var l, nl;
                    if (t === true) {
                        l = ob.length;
                        nl = l - 1;
                        if (sc + 1 >= l) {
                            sc = nl
                        }
                    }
                    if (settings.loop === true) {
                        if (t === true) {
                            sc = scene - $el.find(".ak-lSSclone.ak-lSSleft").length
                        } else {
                            sc = scene * settings.slideMove
                        }
                        if (t === true) {
                            l = ob.length;
                            nl = l - 1;
                            if (sc + 1 === l) {
                                sc = nl
                            } else {
                                if (sc + 1 > l) {
                                    sc = 0
                                }
                            }
                        }
                    }
                    ob.eq(sc).addClass("active " + settings.dotClass[1])
                } else {
                    ob.removeClass("active " + settings.dotClass[1]);
                    ob.eq(ob.length - 1).addClass("active " + settings.dotClass[1])
                }
            },
            move: function(ob, v) {
                if (this.doCss()) {
                    ob.css({
                        "transform": "translate3d(" + ( - v) + "px, 0px, 0px)",
                        "-webkit-transform": "translate3d(" + ( - v) + "px, 0px, 0px)",
                    })
                } else {
                    ob.css("position", "relative").animate({
                            left: -v + "px"
                        },
                        settings.speed, "linear")
                }
            },
            slide: function() {
                var $this = this;
                refresh.calSlide = function() {
                    if (w > elSize) {
                        slideValue = $this.slideValue();
                        if ((slideValue) > w - elSize - settings.slideMargin) {
                            slideValue = w - elSize - settings.slideMargin
                        } else {
                            if (slideValue < 0) {
                                slideValue = 0
                            }
                        }
                        $this.move($el, slideValue);
                        if (settings.loop === true) {
                            if (scene >= (length - ($el.find(".ak-lSSclone.ak-lSSleft").length / settings.slideMove))) {
                                $this.resetSlide($el.find(".ak-lSSclone.ak-lSSleft").length)
                            }
                            if (scene === 0) {
                                $this.resetSlide($slide.find(".ak-lslide").length)
                            }
                        }
                    }
                };
                refresh.calSlide()
            },
            resetSlide: function(s) {
                var $this = this;
                setTimeout(function() {
                        scene = s;
                        $slide.css("transition-duration", "0ms");
                        slideValue = $this.slideValue();
                        plugin.move($el, slideValue);
                        setTimeout(function() {
                                $slide.css("transition-duration", settings.speed + "ms")
                            },
                            50)
                    },
                    settings.speed + 100)
            },
            slideValue: function() {
                var _sV = 0;
                if (settings.autoWidth === false) {
                    _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove)
                } else {
                    _sV = 0;
                    for (var i = 0; i < scene; i++) {
                        _sV += (parseInt($children.eq(i).width()) + settings.slideMargin)
                    }
                }
                return _sV
            },
            auto: function() {
                if (settings.auto) {
                    clearInterval(interval);
                    interval = setInterval(function() {
                            $el.goToNextSlide()
                        },
                        settings.pause)
                }
            },
            touchMove: function(endCoords, startCoords) {
                $slide.css("transition-duration", "0ms");
                var distance = endCoords - startCoords;
                var swipeVal = slideValue - distance;
                if ((swipeVal) >= w - elSize - settings.slideMargin) {
                    if (settings.freeMove === false) {
                        swipeVal = w - elSize - settings.slideMargin
                    } else {
                        var swipeValT = w - elSize - settings.slideMargin;
                        swipeVal = swipeValT + ((swipeVal - swipeValT) / 5)
                    }
                } else {
                    if (swipeVal < 0) {
                        if (settings.freeMove === false) {
                            swipeVal = 0
                        } else {
                            swipeVal = swipeVal / 5
                        }
                    }
                }
                this.move($el, swipeVal)
            },
            touchEnd: function(distance) {
                $slide.css("transition-duration", "500ms");
                var mxVal = false;
                var _next = true;
                slideValue = slideValue - distance;
                if ((slideValue) > w - elSize - settings.slideMargin) {
                    slideValue = w - elSize - settings.slideMargin;
                    if (settings.autoWidth === false) {
                        mxVal = true
                    }
                } else {
                    if (slideValue < 0) {
                        slideValue = 0
                    }
                }
                var gC = function(next) {
                    var ad = 0;
                    if (!mxVal) {
                        if (next) {
                            ad = 1
                        }
                    }
                    if (!settings.autoWidth) {
                        var num = slideValue / ((slideWidth + settings.slideMargin) * settings.slideMove);
                        scene = parseInt(num) + ad;
                        if (slideValue >= (w - elSize - settings.slideMargin)) {
                            if (num % 1 !== 0) {
                                scene++
                            }
                        }
                    } else {
                        var tW = 0;
                        for (var i = 0; i < $children.length; i++) {
                            tW += (parseInt($children.eq(i).width()) + settings.slideMargin);
                            scene = i + ad;
                            if (tW >= slideValue) {
                                break
                            }
                        }
                    }
                };
                if (distance >= settings.swipeThreshold) {
                    gC(false);
                    _next = false
                } else {
                    if (distance <= -settings.swipeThreshold) {
                        gC(true);
                        _next = false
                    }
                }
                $el.mode(_next)
            },
            enableDrag: function() {
                var $this = this;
                if (!isTouch) {
                    var startCoords = 0,
                        endCoords = 0,
                        isDraging = false;
                    $slide.on("mousedown",
                        function(e) {
                            if (w < elSize) {
                                if (w !== 0) {
                                    return false
                                }
                            }
                            if ($(e.target).attr("class") !== ("ak-lSPrev") && $(e.target).attr("class") !== ("ak-lSNext")) {
                                startCoords = e.pageX;
                                isDraging = true;
                                if (e.preventDefault) {
                                    e.preventDefault()
                                } else {
                                    e.returnValue = false
                                }
                                $slide.scrollLeft += 1;
                                $slide.scrollLeft -= 1;
                                clearInterval(interval)
                            }
                        });
                    $(window).on("mousemove",
                        function(e) {
                            if (isDraging) {
                                endCoords = e.pageX;
                                $this.touchMove(endCoords, startCoords)
                            }
                        });
                    $(window).on("mouseup",
                        function(e) {
                            if (isDraging) {
                                isDraging = false;
                                endCoords = e.pageX;
                                var distance = endCoords - startCoords;
                                if (Math.abs(distance) >= settings.swipeThreshold) {
                                    $(window).on("click.ls",
                                        function(e) {
                                            if (e.preventDefault) {
                                                e.preventDefault()
                                            } else {
                                                e.returnValue = false
                                            }
                                            e.stopImmediatePropagation();
                                            e.stopPropagation();
                                            $(window).off("click.ls")
                                        })
                                }
                                $this.touchEnd(distance)
                            }
                        })
                }
            },
            enableTouch: function() {
                var $this = this;
                if (isTouch) {
                    var startCoords = {},
                        endCoords = {};
                    $slide.on("touchstart",
                        function(e) {
                            endCoords = e.originalEvent.targetTouches[0];
                            startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                            startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
                            clearInterval(interval)
                        });
                    $slide.on("touchmove",
                        function(e) {
                            if (w < elSize) {
                                if (w !== 0) {
                                    return false
                                }
                            }
                            var orig = e.originalEvent;
                            endCoords = orig.targetTouches[0];
                            var xMovement = Math.abs(endCoords.pageX - startCoords.pageX);
                            var yMovement = Math.abs(endCoords.pageY - startCoords.pageY);
                            if ((xMovement * 3) > yMovement) {
                                e.preventDefault()
                            }
                            $this.touchMove(endCoords.pageX, startCoords.pageX)
                        });
                    $slide.on("touchend",
                        function() {
                            if (w < elSize) {
                                if (w !== 0) {}
                            }
                            var distance;
                            distance = endCoords.pageX - startCoords.pageX;
                            $this.touchEnd(distance)
                        })
                }
            },
            build: function() {
                var $this = this;
                $this.initialStyle();
                if (this.doCss()) {
                    $this.enableTouch();
                    $this.enableDrag()
                }
                $(window).on("focus",
                    function() {
                        $this.auto()
                    });
                $(window).on("blur",
                    function() {
                        clearInterval(interval)
                    });
                $this.pager()
            }
        };
        $(function() {
            plugin.build()
        });
        refresh.init = function() {
            refresh.chbreakpoint();
            elSize = $slide.outerWidth();
            if (settings.loop === true) {
                refresh.clone()
            }
            refresh.calL();
            $el.removeClass("ak-lSSlide");
            refresh.calSW();
            refresh.sSW();
            setTimeout(function() {
                    $el.addClass("ak-lSSlide")
                },
                1000);
            if (settings.pager) {
                refresh.createPager()
            }
            plugin.setHeight($el, false);
            plugin.slide()
        };
        $el.goToPrevSlide = function() {
            if (scene > 0) {
                scene--;
                $el.mode(false)
            } else {
                if (settings.loop === true) {
                    $el.mode(false)
                }
            }
        };
        $el.goToNextSlide = function() {
            var nextI = true;
            var _slideValue = plugin.slideValue();
            nextI = _slideValue < w - elSize - settings.slideMargin;
            if (((scene * settings.slideMove) < length - settings.slideMove) && nextI) {
                scene++;
                $el.mode(false)
            } else {
                if (settings.loop === true) {
                    scene = 0;
                    $el.mode(false)
                }
            }
        };
        $el.mode = function(_touch) {
            if (on === false) {
                if (plugin.doCss()) {
                    $el.addClass("ak-lSSlide");
                    if (settings.speed !== "") {
                        $slide.css("transition-duration", settings.speed + "ms")
                    }
                    $slide.css("transition-timing-function", "ease")
                }
            }
            plugin.slide();
            if (!$slide.hasClass("ak-lshover")) {
                plugin.auto()
            }
            on = true
        };
        $el.play = function() {
            $el.goToNextSlide();
            settings.auto = true;
            plugin.auto()
        };
        $el.pause = function() {
            settings.auto = false;
            clearInterval(interval)
        };
        $el.refresh = function() {
            refresh.init()
        };
        $el.getCurrentSlideCount = function() {
            var sc = scene;
            if (settings.loop) {
                var ln = $slide.find(".ak-lslide").length,
                    cl = $el.find(".ak-lSSclone.ak-lSSleft").length;
                if (scene <= cl - 1) {
                    sc = ln + (scene - cl)
                } else {
                    if (scene >= (ln + cl)) {
                        sc = scene - ln - cl
                    } else {
                        sc = scene - cl
                    }
                }
            }
            return sc + 1
        };
        $el.getTotalSlideCount = function() {
            return $slide.find(".ak-lslide").length
        };
        $el.goToSlide = function(s) {
            if (settings.loop) {
                scene = (s + $el.find(".ak-lSSclone.ak-lSSleft").length - 1)
            } else {
                scene = s
            }
            $el.mode(false)
        };
        $el.destroy = function() {
            if ($el.AKjs_lightSlider) {
                $el.goToPrevSlide = function() {};
                $el.goToNextSlide = function() {};
                $el.mode = function() {};
                $el.play = function() {};
                $el.pause = function() {};
                $el.refresh = function() {};
                $el.getCurrentSlideCount = function() {};
                $el.getTotalSlideCount = function() {};
                $el.goToSlide = function() {};
                $el.AKjs_lightSlider = null;
                refresh = {
                    init: function() {}
                };
                $el.parent().parent().find(".ak-lSPager").remove();
                $el.removeClass("ak-lightSlider ak-lSSlide ak-lSSright").removeAttr("style").unwrap().unwrap();
                $el.children().removeAttr("style");
                $children.removeClass("ak-lslide active");
                $el.find(".ak-lSSclone").remove();
                $children = null;
                interval = null;
                on = false;
                scene = 0
            }
        };
        setTimeout(function() {
                settings.onSliderLoad.call(this, $el)
            },
            100);
        $(window).on("resize orientationchange",
            function(e) {
                setTimeout(function() {
                        if (e.preventDefault) {
                            e.preventDefault()
                        } else {
                            e.returnValue = false
                        }
                        refresh.init()
                    },
                    200)
            });
        return this
    }
} (jQuery));

/*-----------------------------------------------AKjs_Loader (2018-12-13)--------------------------------------------*/
function AKjs_Loader(setting) {
    var option = $.extend({
            ele: "",
            autoMode: true,
            maskBG: false,
            iconColor:"#ffffff",
            timeToHide:0,
            Loader: "",
            text: "",
            boxsize: "",
            eleclass: "animated fadeIn fix",
            callback: function() {}
        },
        setting);
    var load_1 = '<div class="ak-loading ak-Loader1">' +
        '<div class="ak-Loader-double-bounce1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-double-bounce2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_2 = '<div class="ak-loading ak-Loader2">' +
        '<div class="ak-Loader-container ak-Loader-container1">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '<div class="ak-Loader-container ak-Loader-container2">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '<div class="ak-Loader-container ak-Loader-container3">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '</div>';
    var load_3 = '<div class="ak-loading ak-Loader3">' +
        '<div class="ak-Loader-dot1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-dot2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_4 = '<div class="ak-loading ak-Loader4" style="background-color:'+option.iconColor+'"></div>';
    var load_5 = '<div class="ak-loading ak-Loader5">' +
        '<div class="ak-Loader-cube1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-cube2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_6 = '<div class="ak-loading ak-Loader6">' +
        '<div class="ak-Loader-rect1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect4" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect5" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_7 = '<div class="ak-loading ak-Loader7">' +
        '<div class="ak-Loader-circ1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    AKjs_UserAgent();
    $(function() {
        if ($(".ak-Loader").length < 1) {
            $("body").append("<div class='ak-Loader'></div>");
        }
        var load_ele = $(".ak-Loader");
        if ($(option.ele).length > 0) {
            load_ele.addClass(option.eleclass).css({
                "left": $(option.ele).offset().left,
                "top": $(option.ele).offset().top,
                "width": $(option.ele).outerWidth(),
                "height": $(option.ele).outerHeight()
            });
        }
        if (IsMobile) {
            load_ele.attr("style",$("main").attr("style"));
            load_ele.bind({
                touchmove: function (ak) {
                    ak.preventDefault();
                    ak.stopPropagation();
                }
            });
        }
        $("#ak-scrollview").removeClass("scrolling_touch");
        load_ele.each(function() {
            var op = option.Loader;
            switch (op) {
                case "load_0":
                    var loadImage ="data:image/gif;base64,R0lGODlhIAAgALMAAP///7Ozs/v7+9bW1uHh4fLy8rq6uoGBgTQ0NAEBARsbG8TExJeXl/39/VRUVAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAAACwAAAAAIAAgAAAE5xDISSlLrOrNp0pKNRCdFhxVolJLEJQUoSgOpSYT4RowNSsvyW1icA16k8MMMRkCBjskBTFDAZyuAEkqCfxIQ2hgQRFvAQEEIjNxVDW6XNE4YagRjuBCwe60smQUDnd4Rz1ZAQZnFAGDd0hihh12CEE9kjAEVlycXIg7BAsMB6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YEvpJivxNaGmLHT0VnOgGYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHQjYKhKP1oZmADdEAAAh+QQFBQAAACwAAAAAGAAXAAAEchDISasKNeuJFKoHs4mUYlJIkmjIV54Soypsa0wmLSnqoTEtBw52mG0AjhYpBxioEqRNy8V0qFzNw+GGwlJki4lBqx1IBgjMkRIghwjrzcDti2/Gh7D9qN774wQGAYOEfwCChIV/gYmDho+QkZKTR3p7EQAh+QQFBQAAACwBAAAAHQAOAAAEchDISWdANesNHHJZwE2DUSEo5SjKKB2HOKGYFLD1CB/DnEoIlkti2PlyuKGEATMBaAACSyGbEDYD4zN1YIEmh0SCQQgYehNmTNNaKsQJXmBuuEYPi9ECAU/UFnNzeUp9VBQEBoFOLmFxWHNoQw6RWEocEQAh+QQFBQAAACwHAAAAGQARAAAEaRDICdZZNOvNDsvfBhBDdpwZgohBgE3nQaki0AYEjEqOGmqDlkEnAzBUjhrA0CoBYhLVSkm4SaAAWkahCFAWTU0A4RxzFWJnzXFWJJWb9pTihRu5dvghl+/7NQmBggo/fYKHCX8AiAmEEQAh+QQFBQAAACwOAAAAEgAYAAAEZXCwAaq9ODAMDOUAI17McYDhWA3mCYpb1RooXBktmsbt944BU6zCQCBQiwPB4jAihiCK86irTB20qvWp7Xq/FYV4TNWNz4oqWoEIgL0HX/eQSLi69boCikTkE2VVDAp5d1p0CW4RACH5BAUFAAAALA4AAAASAB4AAASAkBgCqr3YBIMXvkEIMsxXhcFFpiZqBaTXisBClibgAnd+ijYGq2I4HAamwXBgNHJ8BEbzgPNNjz7LwpnFDLvgLGJMdnw/5DRCrHaE3xbKm6FQwOt1xDnpwCvcJgcJMgEIeCYOCQlrF4YmBIoJVV2CCXZvCooHbwGRcAiKcmFUJhEAIfkEBQUAAAAsDwABABEAHwAABHsQyAkGoRivELInnOFlBjeM1BCiFBdcbMUtKQdTN0CUJru5NJQrYMh5VIFTTKJcOj2HqJQRhEqvqGuU+uw6AwgEwxkOO55lxIihoDjKY8pBoThPxmpAYi+hKzoeewkTdHkZghMIdCOIhIuHfBMOjxiNLR4KCW1ODAlxSxEAIfkEBQUAAAAsCAAOABgAEgAABGwQyEkrCDgbYvvMoOF5ILaNaIoGKroch9hacD3MFMHUBzMHiBtgwJMBFolDB4GoGGBCACKRcAAUWAmzOWJQExysQsJgWj0KqvKalTiYPhp1LBFTtp10Is6mT5gdVFx1bRN8FTsVCAqDOB9+KhEAIfkEBQUAAAAsAgASAB0ADgAABHgQyEmrBePS4bQdQZBdR5IcHmWEgUFQgWKaKbWwwSIhc4LonsXhBSCsQoOSScGQDJiWwOHQnAxWBIYJNXEoFCiEWDI9jCzESey7GwMM5doEwW4jJoypQQ743u1WcTV0CgFzbhJ5XClfHYd/EwZnHoYVDgiOfHKQNREAIfkEBQUAAAAsAAAPABkAEQAABGeQqUQruDjrW3vaYCZ5X2ie6EkcKaooTAsi7ytnTq046BBsNcTvItz4AotMwKZBIC6H6CVAJaCcT0CUBTgaTg5nTCu9GKiDEMPJg5YBBOpwlnVzLwtqyKnZagZWahoMB2M3GgsHSRsRACH5BAUFAAAALAEACAARABgAAARcMKR0gL34npkUyyCAcAmyhBijkGi2UW02VHFt33iu7yiDIDaD4/erEYGDlu/nuBAOJ9Dvc2EcDgFAYIuaXS3bbOh6MIC5IAP5Eh5fk2exC4tpgwZyiyFgvhEMBBEAIfkEBQUAAAAsAAACAA4AHQAABHMQyAnYoViSlFDGXBJ808Ep5KRwV8qEg+pRCOeoioKMwJK0Ekcu54h9AoghKgXIMZgAApQZcCCu2Ax2O6NUud2pmJcyHA4L0uDM/ljYDCnGfGakJQE5YH0wUBYBAUYfBIFkHwaBgxkDgX5lgXpHAXcpBIsRADs=";
                    load_ele.html("<figure class=\"ak-loading bg_ab_none bg_white08 img_auto\"><img src='"+loadImage+"'></figure>");
                    break;
                case "load_1":
                    load_ele.html(load_1);
                    break;
                case "load_2":
                    load_ele.html(load_2);
                    break;
                case "load_3":
                    load_ele.html(load_3);
                    break;
                case "load_4":
                    load_ele.html(load_4);
                    break;
                case "load_5":
                    load_ele.html(load_5);
                    break;
                case "load_6":
                    load_ele.html(load_6);
                    break;
                case "load_7":
                    load_ele.html(load_7);
                    break;
            }
        });
        var loading = load_ele.find(".ak-loading");
        if (option.maskBG == true) {
            $("<div class='ak-mask' id='#ak-loadingmask' />").appendTo(load_ele);
            loading.addClass("bg_ab_none");
        } else {
            load_ele.find("#ak-loadingmask").remove();
            if (option.boxsize) {
                loading.css({
                    "width": option.boxsize,
                    "height": option.boxsize
                })
            }
        }
        if (option.ele) {
            var ww = $(option.ele).width();
            var wh = $(option.ele).height();
        } else {
            var ww = $(window).width();
            var wh = $(window).height();
        }
        var lw = loading.outerWidth();
        var lh = loading.outerHeight();
        if (IsMobile) {
            if ($("header").not("aside header").hasClass("dis_none_im") || $("header").length === 0) {
                var heh = 0;
            } else {
                var heh = $("header").outerHeight();
            }
            if ($("footer").not("aside footer").hasClass("dis_none_im") || $("footer").length === 0) {
                var foh = 0;
            } else {
                var foh = $("footer").outerHeight();
            }
            var yy = {
                position: "absolute",
                left: (ww / 2) - (lw / 2),
                top: (wh / 2) - (lh / 2) - heh - foh
            };
        } else {
            var yy = {
                position: "absolute",
                left: (ww / 2) - (lw / 2),
                top: (wh / 2) - (lh / 2)
            };
        }
        loading.css(yy);
        if (option.text) {
            load_ele.append("<span><em class='dis_inbl pl_1rem pr_1rem'>"+option.text+"</em></span>");
            if (option.maskBG == true) {
                load_ele.children("span").children("em").removeClass("bg_white08");
            } else {
                load_ele.children("span").children("em").addClass("bg_white08");
            }
            load_ele.children("span").css({
                top: loading.offset().top - load_ele.offset().top + load_ele.children("span").outerHeight()*2
            });
            if (IsIE) {
                load_ele.children("span").addClass("mt_07rem");
            }
        }
        $(window).resize(function () {
            if (option.ele) {
                var ww = $(option.ele).width();
                var wh = $(option.ele).height();
            } else {
                var ww = $(window).width();
                var wh = $(window).height();
            }
            if ($(option.ele).length > 0) {
                load_ele.addClass(option.eleclass).css({
                    "left": $(option.ele).offset().left,
                    "top": $(option.ele).offset().top,
                    "width": $(option.ele).outerWidth(),
                    "height": $(option.ele).outerHeight()
                });
            }
            var lw = loading.outerWidth();
            var lh = loading.outerHeight();
            if (IsMobile) {
                var yy = {
                    position: "absolute",
                    left: (ww / 2) - (lw / 2),
                    top: (wh / 2) - (lh / 2) - heh - foh
                };
            } else {
                var yy = {
                    position: "absolute",
                    left: (ww / 2) - (lw / 2),
                    top: (wh / 2) - (lh / 2)
                };
            }
            loading.css(yy);
            if (option.text) {
                load_ele.children("span").css({
                    top: loading.offset().top - load_ele.offset().top + load_ele.children("span").outerHeight()*2
                });
            }
        });

        option.callback(load_ele,ak_closeLayer);
        if (option.autoMode) {
            setTimeout(function () {
                ak_closeLayer(true);
            }, option.timeToHide);
        }
        function ak_closeLayer(state) {
            if (state === true) {
                $(load_ele).fadeOut();
                $("#ak-scrollview").addClass("scrolling_touch");
            } else {
                $(load_ele).fadeIn();
                $("#ak-scrollview").removeClass("scrolling_touch");
            }
        }
    });
}

/*-----------------------------------------------AKjs_Marquee (2018-12-13)--------------------------------------------*/
(function($) {
    var methods = {
        init: function(setting) {
            var option = {
                direction: "left",
                loop: -1,
                scrolldelay: 0,
                scrollamount: 50,
                circular: true,
                drag: true,
                runshort: true,
                hoverstop: true,
                inverthover: false,
                xml: false
            };
            if (setting) {
                $.extend(option, setting)
            }
            return this.each(function() {
                var enterEvent = "mouseenter";
                var leaveEvent = "mouseleave";
                if (option.inverthover) {
                    enterEvent = "mouseleave";
                    leaveEvent = "mouseenter"
                }
                var loop = option.loop,
                    strWrap = $(this).addClass("ak-marquee_wrap").data({
                        scrollamount: option.scrollamount
                    }),
                    fMove = false;
                var strWrapStyle = strWrap.attr("style");
                if (strWrapStyle) {
                    var wrapStyleArr = strWrapStyle.split(";");
                    var startHeight = false;
                    for (var i = 0; i < wrapStyleArr.length; i++) {
                        var str = $.trim(wrapStyleArr[i]);
                        var tested = str.search(/^height/g);
                        if (tested != -1) {
                            startHeight = parseFloat(strWrap.css("height"))
                        }
                    }
                }
                var code = function() {
                    strWrap.off("mouseleave");
                    strWrap.off("mouseenter");
                    strWrap.off("mousemove");
                    strWrap.off("mousedown");
                    strWrap.off("mouseup");
                    if (!$(".ak-marquee_move", strWrap).length) {
                        strWrap.wrapInner($("<div>").addClass("ak-marquee_move"))
                    }
                    var strMove = $(".ak-marquee_move", strWrap).addClass("ak-marquee_origin"),
                        strMoveClone = strMove.clone().removeClass("ak-marquee_origin").addClass("ak-marquee_move_clone"),
                        time = 0;
                    if (!option.hoverstop) {
                        strWrap.addClass("noStop")
                    }
                    var circCloneHor = function() {
                        strMoveClone.clone().css({
                            left: "100%",
                            right: "auto",
                            width: strMove.width()
                        }).appendTo(strMove);
                        strMoveClone.css({
                            right: "100%",
                            left: "auto",
                            width: strMove.width()
                        }).appendTo(strMove)
                    };
                    var circCloneVert = function() {
                        strMoveClone.clone().css({
                            top: "100%",
                            bottom: "auto",
                            height: strMove.height()
                        }).appendTo(strMove);
                        strMoveClone.css({
                            bottom: "100%",
                            top: "auto",
                            height: strMove.height()
                        }).appendTo(strMove)
                    };
                    if (option.direction == "left") {
                        strWrap.height(strMove.outerHeight());
                        if (strMove.width() > strWrap.width()) {
                            var leftPos = -strMove.width();
                            if (option.circular) {
                                if (!option.xml) {
                                    circCloneHor();
                                    leftPos = -(strMove.width() + (strMove.width() - strWrap.width()))
                                }
                            }
                            if (option.xml) {
                                strMove.css({
                                    left: strWrap.width()
                                })
                            }
                            var strMoveLeft = strWrap.width(),
                                k1 = 0,
                                timeFunc1 = function() {
                                    var fullS = Math.abs(leftPos),
                                        time = (fullS / strWrap.data("scrollamount")) * 1000;
                                    if (parseFloat(strMove.css("left")) != 0) {
                                        fullS = (fullS + strWrap.width());
                                        time = (fullS - (strWrap.width() - parseFloat(strMove.css("left")))) / strWrap.data("scrollamount") * 1000
                                    }
                                    return time
                                },
                                moveFuncId1 = false,
                                moveFunc1 = function() {
                                    if (loop != 0) {
                                        strMove.stop(true).animate({
                                                left: leftPos
                                            },
                                            timeFunc1(), "linear",
                                            function() {
                                                $(this).css({
                                                    left: strWrap.width()
                                                });
                                                if (loop == -1) {
                                                    moveFuncId1 = setTimeout(moveFunc1, option.scrolldelay)
                                                } else {
                                                    loop--;
                                                    moveFuncId1 = setTimeout(moveFunc1, option.scrolldelay)
                                                }
                                            })
                                    }
                                };
                            strWrap.data({
                                moveId: moveFuncId1,
                                moveF: moveFunc1
                            });
                            if (!option.inverthover) {
                                moveFunc1()
                            }
                            if (option.hoverstop) {
                                strWrap.on(enterEvent,
                                    function() {
                                        $(this).addClass("ak-marquee_active");
                                        clearTimeout(moveFuncId1);
                                        strMove.stop(true)
                                    }).on(leaveEvent,
                                    function() {
                                        $(this).removeClass("ak-marquee_active");
                                        $(this).off("mousemove");
                                        moveFunc1()
                                    });
                                if (option.drag) {
                                    strWrap.on("mousedown",
                                        function(e) {
                                            if (option.inverthover) {
                                                strMove.stop(true)
                                            }
                                            var dragLeft;
                                            var dir = 1;
                                            var newX;
                                            var oldX = e.clientX;
                                            strMoveLeft = strMove.position().left;
                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
                                            $(this).on("mousemove",
                                                function(e) {
                                                    fMove = true;
                                                    newX = e.clientX;
                                                    if (newX > oldX) {
                                                        dir = 1
                                                    } else {
                                                        dir = -1
                                                    }
                                                    oldX = newX;
                                                    dragLeft = k1 + (e.clientX - strWrap.offset().left);
                                                    if (!option.circular) {
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = strWrap.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > strWrap.width() && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                    } else {
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = 0;
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > 0 && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                    }
                                                    strMove.stop(true).css({
                                                        left: dragLeft
                                                    })
                                                }).on("mouseup",
                                                function() {
                                                    $(this).off("mousemove");
                                                    if (option.inverthover) {
                                                        strMove.trigger("mouseenter")
                                                    }
                                                    setTimeout(function() {
                                                            fMove = false
                                                        },
                                                        50)
                                                });
                                            return false
                                        }).on("click",
                                        function() {
                                            if (fMove) {
                                                return false
                                            }
                                        })
                                } else {
                                    strWrap.addClass("no_drag")
                                }
                            }
                        } else {
                            if (option.runshort) {
                                strMove.css({
                                    left: strWrap.width()
                                });
                                var strMoveLeft = strWrap.width(),
                                    k1 = 0,
                                    timeFunc = function() {
                                        time = (strMove.width() + strMove.position().left) / strWrap.data("scrollamount") * 1000;
                                        return time
                                    };
                                var moveFunc = function() {
                                    var leftPos = -strMove.width();
                                    strMove.animate({
                                            left: leftPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                left: strWrap.width()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                };
                                strWrap.data({
                                    moveF: moveFunc
                                });
                                if (!option.inverthover) {
                                    moveFunc()
                                }
                                if (option.hoverstop) {
                                    strWrap.on(enterEvent,
                                        function() {
                                            $(this).addClass("ak-marquee_active");
                                            strMove.stop(true)
                                        }).on(leaveEvent,
                                        function() {
                                            $(this).removeClass("ak-marquee_active");
                                            $(this).off("mousemove");
                                            moveFunc()
                                        });
                                    if (option.drag) {
                                        strWrap.on("mousedown",
                                            function(e) {
                                                if (option.inverthover) {
                                                    strMove.stop(true)
                                                }
                                                var dragLeft;
                                                var dir = 1;
                                                var newX;
                                                var oldX = e.clientX;
                                                strMoveLeft = strMove.position().left;
                                                k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
                                                $(this).on("mousemove",
                                                    function(e) {
                                                        fMove = true;
                                                        newX = e.clientX;
                                                        if (newX > oldX) {
                                                            dir = 1
                                                        } else {
                                                            dir = -1
                                                        }
                                                        oldX = newX;
                                                        dragLeft = k1 + (e.clientX - strWrap.offset().left);
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = strWrap.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > strWrap.width() && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k1 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        strMove.stop(true).css({
                                                            left: dragLeft
                                                        })
                                                    }).on("mouseup",
                                                    function() {
                                                        if (option.inverthover) {
                                                            strMove.trigger("mouseenter")
                                                        }
                                                        $(this).off("mousemove");
                                                        setTimeout(function() {
                                                                fMove = false
                                                            },
                                                            50)
                                                    });
                                                return false
                                            }).on("click",
                                            function() {
                                                if (fMove) {
                                                    return false
                                                }
                                            })
                                    } else {
                                        strWrap.addClass("no_drag")
                                    }
                                }
                            } else {
                                strWrap.addClass("ak-marquee_static")
                            }
                        }
                    }
                    if (option.direction == "right") {
                        strWrap.height(strMove.outerHeight());
                        strWrap.addClass("ak-marquee_right");
                        strMove.css({
                            left: -strMove.width(),
                            right: "auto"
                        });
                        if (strMove.width() > strWrap.width()) {
                            var leftPos = strWrap.width();
                            strMove.css({
                                left: 0
                            });
                            if (option.circular) {
                                if (!option.xml) {
                                    circCloneHor();
                                    leftPos = strMove.width()
                                }
                            }
                            var k2 = 0;
                            timeFunc = function() {
                                var fullS = strWrap.width(),
                                    time = (fullS / strWrap.data("scrollamount")) * 1000;
                                if (parseFloat(strMove.css("left")) != 0) {
                                    fullS = (strMove.width() + strWrap.width());
                                    time = (fullS - (strMove.width() + parseFloat(strMove.css("left")))) / strWrap.data("scrollamount") * 1000
                                }
                                return time
                            };
                            var moveFunc = function() {
                                if (loop != 0) {
                                    strMove.animate({
                                            left: leftPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                left: -strMove.width()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                }
                            };
                            strWrap.data({
                                moveF: moveFunc
                            });
                            if (!option.inverthover) {
                                moveFunc()
                            }
                            if (option.hoverstop) {
                                strWrap.on(enterEvent,
                                    function() {
                                        $(this).addClass("ak-marquee_active");
                                        strMove.stop(true)
                                    }).on(leaveEvent,
                                    function() {
                                        $(this).removeClass("ak-marquee_active");
                                        $(this).off("mousemove");
                                        moveFunc()
                                    });
                                if (option.drag) {
                                    strWrap.on("mousedown",
                                        function(e) {
                                            if (option.inverthover) {
                                                strMove.stop(true)
                                            }
                                            var dragLeft;
                                            var dir = 1;
                                            var newX;
                                            var oldX = e.clientX;
                                            strMoveLeft = strMove.position().left;
                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
                                            $(this).on("mousemove",
                                                function(e) {
                                                    fMove = true;
                                                    newX = e.clientX;
                                                    if (newX > oldX) {
                                                        dir = 1
                                                    } else {
                                                        dir = -1
                                                    }
                                                    oldX = newX;
                                                    dragLeft = k2 + (e.clientX - strWrap.offset().left);
                                                    if (!option.circular) {
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = strWrap.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > strWrap.width() && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                    } else {
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = 0;
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > 0 && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                    }
                                                    strMove.stop(true).css({
                                                        left: dragLeft
                                                    })
                                                }).on("mouseup",
                                                function() {
                                                    if (option.inverthover) {
                                                        strMove.trigger("mouseenter")
                                                    }
                                                    $(this).off("mousemove");
                                                    setTimeout(function() {
                                                            fMove = false
                                                        },
                                                        50)
                                                });
                                            return false
                                        }).on("click",
                                        function() {
                                            if (fMove) {
                                                return false
                                            }
                                        })
                                } else {
                                    strWrap.addClass("no_drag")
                                }
                            }
                        } else {
                            if (option.runshort) {
                                var k2 = 0;
                                var timeFunc = function() {
                                    time = (strWrap.width() - strMove.position().left) / strWrap.data("scrollamount") * 1000;
                                    return time
                                };
                                var moveFunc = function() {
                                    var leftPos = strWrap.width();
                                    strMove.animate({
                                            left: leftPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                left: -strMove.width()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                };
                                strWrap.data({
                                    moveF: moveFunc
                                });
                                if (!option.inverthover) {
                                    moveFunc()
                                }
                                if (option.hoverstop) {
                                    strWrap.on(enterEvent,
                                        function() {
                                            $(this).addClass("ak-marquee_active");
                                            strMove.stop(true)
                                        }).on(leaveEvent,
                                        function() {
                                            $(this).removeClass("ak-marquee_active");
                                            $(this).off("mousemove");
                                            moveFunc()
                                        });
                                    if (option.drag) {
                                        strWrap.on("mousedown",
                                            function(e) {
                                                if (option.inverthover) {
                                                    strMove.stop(true)
                                                }
                                                var dragLeft;
                                                var dir = 1;
                                                var newX;
                                                var oldX = e.clientX;
                                                strMoveLeft = strMove.position().left;
                                                k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
                                                $(this).on("mousemove",
                                                    function(e) {
                                                        fMove = true;
                                                        newX = e.clientX;
                                                        if (newX > oldX) {
                                                            dir = 1
                                                        } else {
                                                            dir = -1
                                                        }
                                                        oldX = newX;
                                                        dragLeft = k2 + (e.clientX - strWrap.offset().left);
                                                        if (dragLeft < -strMove.width() && dir < 0) {
                                                            dragLeft = strWrap.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        if (dragLeft > strWrap.width() && dir > 0) {
                                                            dragLeft = -strMove.width();
                                                            strMoveLeft = strMove.position().left;
                                                            k2 = strMoveLeft - (e.clientX - strWrap.offset().left)
                                                        }
                                                        strMove.stop(true).css({
                                                            left: dragLeft
                                                        })
                                                    }).on("mouseup",
                                                    function() {
                                                        if (option.inverthover) {
                                                            strMove.trigger("mouseenter")
                                                        }
                                                        $(this).off("mousemove");
                                                        setTimeout(function() {
                                                                fMove = false
                                                            },
                                                            50)
                                                    });
                                                return false
                                            }).on("click",
                                            function() {
                                                if (fMove) {
                                                    return false
                                                }
                                            })
                                    } else {
                                        strWrap.addClass("no_drag")
                                    }
                                }
                            } else {
                                strWrap.addClass("ak-marquee_static")
                            }
                        }
                    }
                    if (option.direction == "up") {
                        strWrap.addClass("ak-marquee_vertical");
                        if (strMove.height() > strWrap.height()) {
                            var topPos = -strMove.height();
                            if (option.circular) {
                                if (!option.xml) {
                                    circCloneVert();
                                    topPos = -(strMove.height() + (strMove.height() - strWrap.height()))
                                }
                            }
                            if (option.xml) {
                                strMove.css({
                                    top: strWrap.height()
                                })
                            }
                            var k2 = 0;
                            timeFunc = function() {
                                var fullS = Math.abs(topPos),
                                    time = (fullS / strWrap.data("scrollamount")) * 1000;
                                if (parseFloat(strMove.css("top")) != 0) {
                                    fullS = (fullS + strWrap.height());
                                    time = (fullS - (strWrap.height() - parseFloat(strMove.css("top")))) / strWrap.data("scrollamount") * 1000
                                }
                                return time
                            };
                            var moveFunc = function() {
                                if (loop != 0) {
                                    strMove.animate({
                                            top: topPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                top: strWrap.height()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                }
                            };
                            strWrap.data({
                                moveF: moveFunc
                            });
                            if (!option.inverthover) {
                                moveFunc()
                            }
                            if (option.hoverstop) {
                                strWrap.on(enterEvent,
                                    function() {
                                        $(this).addClass("ak-marquee_active");
                                        strMove.stop(true)
                                    }).on(leaveEvent,
                                    function() {
                                        $(this).removeClass("ak-marquee_active");
                                        $(this).off("mousemove");
                                        moveFunc()
                                    });
                                if (option.drag) {
                                    strWrap.on("mousedown",
                                        function(e) {
                                            if (option.inverthover) {
                                                strMove.stop(true)
                                            }
                                            var dragTop;
                                            var dir = 1;
                                            var newY;
                                            var oldY = e.clientY;
                                            strMoveTop = strMove.position().top;
                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top);
                                            $(this).on("mousemove",
                                                function(e) {
                                                    fMove = true;
                                                    newY = e.clientY;
                                                    if (newY > oldY) {
                                                        dir = 1
                                                    } else {
                                                        if (newY < oldY) {
                                                            dir = -1
                                                        }
                                                    }
                                                    oldY = newY;
                                                    dragTop = k2 + e.clientY - strWrap.offset().top;
                                                    if (!option.circular) {
                                                        if (dragTop < -strMove.height() && dir < 0) {
                                                            dragTop = strWrap.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                        if (dragTop > strWrap.height() && dir > 0) {
                                                            dragTop = -strMove.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                    } else {
                                                        if (dragTop < -strMove.height() && dir < 0) {
                                                            dragTop = 0;
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                        if (dragTop > 0 && dir > 0) {
                                                            dragTop = -strMove.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                    }
                                                    strMove.stop(true).css({
                                                        top: dragTop
                                                    })
                                                }).on("mouseup",
                                                function() {
                                                    if (option.inverthover) {
                                                        strMove.trigger("mouseenter")
                                                    }
                                                    $(this).off("mousemove");
                                                    setTimeout(function() {
                                                            fMove = false
                                                        },
                                                        50)
                                                });
                                            return false
                                        }).on("click",
                                        function() {
                                            if (fMove) {
                                                return false
                                            }
                                        })
                                } else {
                                    strWrap.addClass("no_drag")
                                }
                            }
                        } else {
                            if (option.runshort) {
                                strMove.css({
                                    top: strWrap.height()
                                });
                                var k2 = 0;
                                var timeFunc = function() {
                                    time = (strMove.height() + strMove.position().top) / strWrap.data("scrollamount") * 1000;
                                    return time
                                };
                                var moveFunc = function() {
                                    var topPos = -strMove.height();
                                    strMove.animate({
                                            top: topPos
                                        },
                                        timeFunc(), "linear",
                                        function() {
                                            $(this).css({
                                                top: strWrap.height()
                                            });
                                            if (loop == -1) {
                                                setTimeout(moveFunc, option.scrolldelay)
                                            } else {
                                                loop--;
                                                setTimeout(moveFunc, option.scrolldelay)
                                            }
                                        })
                                };
                                strWrap.data({
                                    moveF: moveFunc
                                });
                                if (!option.inverthover) {
                                    moveFunc()
                                }
                                if (option.hoverstop) {
                                    strWrap.on(enterEvent,
                                        function() {
                                            $(this).addClass("ak-marquee_active");
                                            strMove.stop(true)
                                        }).on(leaveEvent,
                                        function() {
                                            $(this).removeClass("ak-marquee_active");
                                            $(this).off("mousemove");
                                            moveFunc()
                                        });
                                    if (option.drag) {
                                        strWrap.on("mousedown",
                                            function(e) {
                                                if (option.inverthover) {
                                                    strMove.stop(true)
                                                }
                                                var dragTop;
                                                var dir = 1;
                                                var newY;
                                                var oldY = e.clientY;
                                                strMoveTop = strMove.position().top;
                                                k2 = strMoveTop - (e.clientY - strWrap.offset().top);
                                                $(this).on("mousemove",
                                                    function(e) {
                                                        fMove = true;
                                                        newY = e.clientY;
                                                        if (newY > oldY) {
                                                            dir = 1
                                                        } else {
                                                            if (newY < oldY) {
                                                                dir = -1
                                                            }
                                                        }
                                                        oldY = newY;
                                                        dragTop = k2 + e.clientY - strWrap.offset().top;
                                                        if (dragTop < -strMove.height() && dir < 0) {
                                                            dragTop = strWrap.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                        if (dragTop > strWrap.height() && dir > 0) {
                                                            dragTop = -strMove.height();
                                                            strMoveTop = strMove.position().top;
                                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                        }
                                                        strMove.stop(true).css({
                                                            top: dragTop
                                                        })
                                                    }).on("mouseup",
                                                    function() {
                                                        if (option.inverthover) {
                                                            strMove.trigger("mouseenter")
                                                        }
                                                        $(this).off("mousemove");
                                                        setTimeout(function() {
                                                                fMove = false
                                                            },
                                                            50)
                                                    });
                                                return false
                                            }).on("click",
                                            function() {
                                                if (fMove) {
                                                    return false
                                                }
                                            })
                                    } else {
                                        strWrap.addClass("no_drag")
                                    }
                                }
                            } else {
                                strWrap.addClass("ak-marquee_static")
                            }
                        }
                    }
                    if (option.direction == "down") {
                        strWrap.addClass("ak-marquee_vertical").addClass("ak-marquee_down");
                        strMove.css({
                            top: -strMove.height(),
                            bottom: "auto"
                        });
                        if (strMove.height() > strWrap.height()) {
                            var topPos = strWrap.height();
                            if (option.circular) {
                                if (!option.xml) {
                                    circCloneVert();
                                    topPos = strMove.height()
                                }
                            }
                            if (option.xml) {
                                strMove.css({
                                    top: -strMove.height()
                                })
                            }
                            var k2 = 0;
                            timeFunc = function() {
                                var fullS = strWrap.height(),
                                    time = (fullS / strWrap.data("scrollamount")) * 1000;
                                if (parseFloat(strMove.css("top")) != 0) {
                                    fullS = (strMove.height() + strWrap.height());
                                    time = (fullS - (strMove.height() + parseFloat(strMove.css("top")))) / strWrap.data("scrollamount") * 1000
                                }
                                return time
                            };
                            var moveFunc = function() {
                                if (loop != 0) {
                                    strMove.animate({
                                        top: topPos
                                    }, timeFunc(), "linear", function() {
                                        $(this).css({
                                            top: -strMove.height()
                                        });
                                        if (loop == -1) {
                                            setTimeout(moveFunc, option.scrolldelay);
                                        } else {
                                            loop--;
                                            setTimeout(moveFunc, option.scrolldelay);
                                        }
                                    });
                                }
                            };
                            strWrap.data({
                                moveF: moveFunc
                            });
                            if (!option.inverthover) {
                                moveFunc();
                            }
                            if (option.hoverstop) {
                                strWrap.on(enterEvent, function() {
                                    $(this).addClass("ak-marquee_active");
                                    strMove.stop(true);
                                }).on(leaveEvent, function() {
                                    $(this).removeClass("ak-marquee_active");
                                    $(this).off("mousemove");
                                    moveFunc();
                                });
                                if (option.drag) {
                                    strWrap.on("mousedown", function(e) {
                                        if (option.inverthover) {
                                            strMove.stop(true)
                                        }
                                        var dragTop;
                                        var dir = 1;
                                        var newY;
                                        var oldY = e.clientY;
                                        strMoveTop = strMove.position().top;
                                        k2 = strMoveTop - (e.clientY - strWrap.offset().top);
                                        $(this).on("mousemove", function(e) {
                                            fMove = true;
                                            newY = e.clientY;
                                            if (newY > oldY) {
                                                dir = 1
                                            } else {
                                                if (newY < oldY) {
                                                    dir = -1
                                                }
                                            }
                                            oldY = newY;
                                            dragTop = k2 + e.clientY - strWrap.offset().top;
                                            if (!option.circular) {
                                                if (dragTop < -strMove.height() && dir < 0) {
                                                    dragTop = strWrap.height();
                                                    strMoveTop = strMove.position().top;
                                                    k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                }
                                                if (dragTop > strWrap.height() && dir > 0) {
                                                    dragTop = -strMove.height();
                                                    strMoveTop = strMove.position().top;
                                                    k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                }
                                            } else {
                                                if (dragTop < -strMove.height() && dir < 0) {
                                                    dragTop = 0;
                                                    strMoveTop = strMove.position().top;
                                                    k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                }
                                                if (dragTop > 0 && dir > 0) {
                                                    dragTop = -strMove.height();
                                                    strMoveTop = strMove.position().top;
                                                    k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                }
                                            }
                                            strMove.stop(true).css({
                                                top: dragTop
                                            })
                                        }).on("mouseup", function() {
                                            if (option.inverthover) {
                                                strMove.trigger("mouseenter")
                                            }
                                            $(this).off("mousemove");
                                            setTimeout(function() {
                                                fMove = false
                                            }, 50);
                                        });
                                        return false
                                    }).on("click", function() {
                                        if (fMove) {
                                            return false
                                        }
                                    });
                                } else {
                                    strWrap.addClass("no_drag")
                                }
                            }
                        } else {
                            if (option.runshort) {
                                var k2 = 0;
                                var timeFunc = function() {
                                    time = (strWrap.height() - strMove.position().top) / strWrap.data("scrollamount") * 1000;
                                    return time
                                };
                                var moveFunc = function() {
                                    var topPos = strWrap.height();
                                    strMove.animate({
                                        top: topPos
                                    }, timeFunc(), "linear", function() {
                                        $(this).css({
                                            top: -strMove.height()
                                        });
                                        if (loop == -1) {
                                            setTimeout(moveFunc, option.scrolldelay)
                                        } else {
                                            loop--;
                                            setTimeout(moveFunc, option.scrolldelay)
                                        }
                                    });
                                };
                                strWrap.data({
                                    moveF: moveFunc
                                });
                                if (!option.inverthover) {
                                    moveFunc();
                                }
                                if (option.hoverstop) {
                                    strWrap.on(enterEvent,
                                        function() {
                                            $(this).addClass("ak-marquee_active");
                                            strMove.stop(true)
                                        }).on(leaveEvent,
                                        function() {
                                            $(this).removeClass("ak-marquee_active");
                                            $(this).off("mousemove");
                                            moveFunc();
                                        });
                                    if (option.drag) {
                                        strWrap.on("mousedown", function(e) {
                                            if (option.inverthover) {
                                                strMove.stop(true);
                                            }
                                            var dragTop;
                                            var dir = 1;
                                            var newY;
                                            var oldY = e.clientY;
                                            strMoveTop = strMove.position().top;
                                            k2 = strMoveTop - (e.clientY - strWrap.offset().top);
                                            $(this).on("mousemove", function(e) {
                                                fMove = true;
                                                newY = e.clientY;
                                                if (newY > oldY) {
                                                    dir = 1;
                                                } else {
                                                    if (newY < oldY) {
                                                        dir = -1;
                                                    }
                                                }
                                                oldY = newY;
                                                dragTop = k2 + e.clientY - strWrap.offset().top;
                                                if (dragTop < -strMove.height() && dir < 0) {
                                                    dragTop = strWrap.height();
                                                    strMoveTop = strMove.position().top;
                                                    k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                }
                                                if (dragTop > strWrap.height() && dir > 0) {
                                                    dragTop = -strMove.height();
                                                    strMoveTop = strMove.position().top;
                                                    k2 = strMoveTop - (e.clientY - strWrap.offset().top)
                                                }
                                                strMove.stop(true).css({
                                                    top: dragTop
                                                });
                                            }).on("mouseup", function() {
                                                if (option.inverthover) {
                                                    strMove.trigger("mouseenter")
                                                }
                                                $(this).off("mousemove");
                                                setTimeout(function() {
                                                    fMove = false
                                                }, 50);
                                            });
                                            return false;
                                        }).on("click", function() {
                                            if (fMove) {
                                                return false;
                                            }
                                        });
                                    } else {
                                        strWrap.addClass("no_drag");
                                    }
                                }
                            } else {
                                strWrap.addClass("ak-marquee_static");
                            }
                        }
                    }
                };
                if (option.xml) {
                    $.ajax({
                        url: option.xml,
                        dataType: "xml",
                        success: function(xml) {
                            var xmlTextEl = $(xml).find("text");
                            var xmlTextLength = xmlTextEl.length;
                            for (var i = 0; i < xmlTextLength; i++) {
                                var xmlElActive = xmlTextEl.eq(i);
                                var xmlElContent = xmlElActive.text();
                                var xmlItemEl = $("<span>").text(xmlElContent).appendTo(strWrap);
                                if (option.direction == "left" || option.direction == "right") {
                                    xmlItemEl.css({
                                        display: "inline-block",
                                        textAlign: "right"
                                    });
                                    if (i > 0) {
                                        xmlItemEl.css({
                                            width: strWrap.width() + xmlItemEl.width()
                                        });
                                    }
                                }
                                if (option.direction == "down" || option.direction == "up") {
                                    xmlItemEl.css({
                                        display: "block",
                                        textAlign: "left"
                                    });
                                    if (i > 0) {
                                        xmlItemEl.css({
                                            paddingTop: strWrap.height()
                                        });
                                    }
                                }
                            }
                            code();
                        }
                    })
                } else {
                    code();
                }
                strWrap.data({
                    ini: code,
                    startheight: startHeight
                })
            })
        },
        update: function() {
            var el = $(this);
            var ak_marquee_origin = $(".ak-marquee_origin", el);
            var ak_marquee_move_clone = $(".ak-marquee_move_clone", el);
            ak_marquee_origin.stop(true);
            ak_marquee_move_clone.remove();
            el.data("ini")();
        },
        destroy: function() {
            var el = $(this);
            var elMove = $(".ak-marquee_move", el);
            var startHeight = el.data("startheight");
            $(".ak-marquee_move_clone", el).remove();
            el.off("mouseenter");
            el.off("mousedown");
            el.off("mouseup");
            el.off("mouseleave");
            el.off("mousemove");
            el.removeClass("noStop").removeClass("ak-marquee_vertical").removeClass("ak-marquee_active").removeClass("no_drag").removeClass("ak-marquee_static").removeClass("ak-marquee_right").removeClass("ak-marquee_down");
            var elStyle = el.attr("style");
            if (elStyle) {
                var styleArr = elStyle.split(";");
                for (var i = 0; i < styleArr.length; i++) {
                    var str = $.trim(styleArr[i]);
                    var tested = str.search(/^height/g);
                    if (tested != -1) {
                        styleArr[i] = "";
                    }
                }
                var newArr = styleArr.join(";");
                var newStyle = newArr.replace(/;+/g, ";");
                if (newStyle == ";") {
                    el.removeAttr("style");
                } else {
                    el.attr("style", newStyle);
                }
                if (startHeight) {
                    el.css({
                        height: startHeight
                    })
                }
            }
            elMove.stop(true);
            if (elMove.length) {
                var context = elMove.html();
                elMove.remove();
                el.html(context);
            }
        },
        pause: function() {
            var el = $(this);
            var elMove = $(".ak-marquee_move", el);
            elMove.stop(true);
        },
        play: function() {
            var el = $(this);
            $(this).off("mousemove");
            el.data("moveF")();
        }
    };
    $.fn.AKjs_Marquee = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === "object" || !method) {
                return methods.init.apply(this, arguments);
            }
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_MobileChat (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_MobileChat = function(setting) {
        var option = $.extend({
                chat_view: "",
                chat_optDom: "",
                chat_optHeight: "8rem",
                callback: function() {},
                chatcallback: function() {},
                btncallback: function() {},
                optcallback: function() {}
            },
            setting);
        var $chat_plugin = $(this);
        if ($chat_plugin.find("button[type='submit']").length < 1) {
            $chat_plugin.find("button[type='button']").before('<button class="dis_none_im" type="submit" />')
        }
        $(option.chat_view).addClass("ak-chat");
        var container = $(option.chat_view).children("ul");
        var scrollHeight = $("#ak-scrollview").prop("scrollHeight");
        option.callback($chat_plugin, container, scrollHeight);
        $chat_plugin.find("input").keyup(function() {
            if ($(this).prop("value").length > 0) {
                option.chatcallback($chat_plugin, $(this).prop("value"));
            }
            $(document).keyup(function(event) {
                var keycode = event.which;
                if (keycode == 13) {
                    $chat_plugin.find("button[type='submit']").click();
                }
            })
        });
        $("#ak-scrollview").click(function() {
            ChatOption_hide();
        });
        $chat_plugin.find("button[type='button']").click(function() {
            if ($(option.chat_optDom).hasClass("dis_none")) {
                ChatOption_show();
            } else {
                ChatOption_hide();
            }
        });
        $chat_plugin.find("button[type='submit']").click(function(e) {
            e.preventDefault();
            if ($(this).prev("input").prop("value").length > 0) {
                var chat_str = $(this).prev("input").prop("value");
                var scrollHeight = $("#ak-scrollview").prop("scrollHeight");
                option.btncallback(chat_str, container, scrollHeight);
                $(this).prev("input").val("");
            }
        });
        function ChatOption_show() {
            $("footer").children().addClass("h_au");
            $(option.chat_optDom).removeClass("dis_none").animate({
                "height": option.chat_optHeight
            }, 200);
            setTimeout(function() {
                ChatCssSetting();
            }, 200);
            $(function() {
                option.optcallback($(option.chat_optDom), true);
                $chat_plugin.find("input").on("focus", function() {
                    ChatOption_hide();
                });
            })
        }
        function ChatOption_hide() {
            $(option.chat_optDom).animate({
                "height": 0
            }, 200);
            setTimeout(function() {
                ChatCssSetting();
            }, 200);
            $(function() {
                $("footer").children().removeClass("h_au");
                $(option.chat_optDom).addClass("dis_none");
                option.optcallback($(option.chat_optDom), false);
            })
        }
        function ChatCssSetting() {
            if ($("header").not("aside header").hasClass("dis_none_im") || $("header").not("aside header").length === 0) {
                var header_h = 0;
            } else {
                var header_h = $("header").prop("clientHeight");
            }
            if ($("footer").not("aside footer").hasClass("dis_none_im") || $("footer").not("aside footer").length === 0) {
                var footer_h = 0;
            } else {
                var footer_h = $("footer").children().prop("clientHeight");
            }
            $("main").css({
                "height": $(window).height() - header_h - footer_h,
                "margin-bottom": footer_h
            });
            $("#ak-scrollview").css({
                "height": $(window).height() - $("#ak-scrollview").offset().top - footer_h
            });
            var scrollHeight = $("#ak-scrollview").prop("scrollHeight");
            $("#ak-scrollview").scrollTop(scrollHeight);
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_MultiDate (2018-12-13)--------------------------------------------*/
(function($) {
    var ak_MultiDate = function(element, options) {
        var that = this;
        AKjs_UserAgent();
        this.element = $(element);
        this.autoShow = options.autoShow || true;
        this.closeBtn = options.closeBtn;
        this.language = options.language || {
            month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        };
        this.format = DateTimeGlobal.parseFormat(options.format || this.element.data("date-format") || this.language.format || "mm/dd/yyyy");
        this.isInline = options.isInline || false;
        this.isMask = options.isMask || false;
        this.isInput = this.element.is("input");
        if (!this.isInput && this.element.find("input").length < 1) {
            $("<input type='text' class='ak-multiDate-input' />").appendTo(this.element);
            this.element.addClass("ak-multiDate-parent")
        }
        this.component = this.element ? this.element.find("input") : false;
        this.hasInput = this.component && this.element.find("input").length;
        this.disableDblClickSelection = options.disableDblClickSelection;
        this.onRender = options.onRender ||
            function() {};
        this.success = options.success ||
            function() {};
        this.okfun = options.okfun ||
            function() {};
        if (this.component && this.component.length === 0) {
            this.component = false
        }
        if (IsMobile) {
            this.appendTo = "body"
        } else {
            this.appendTo = "#ak-scrollview"
        }
        this.linkField = options.linkField || this.element.data("link-field") || false;
        this.linkFormat = DateTimeGlobal.parseFormat(options.linkFormat || this.element.data("link-format") || "yyyy-mm-dd hh:ii:ss");
        this.minuteStep = options.minuteStep || this.element.data("minute-step") || 5;
        this.pickerPosition = options.pickerPosition || this.element.data("picker-position") || "bottom-right";
        this.initialDate = options.initialDate || null;
        this._attachEvents();
        this.minView = 0;
        if ("minView" in options) {
            this.minView = options.minView
        } else {
            if ("minView" in this.element.data()) {
                this.minView = this.element.data("min-view")
            }
        }
        this.minView = DateTimeGlobal.convertViewMode(this.minView);
        this.maxView = DateTimeGlobal.modes.length - 1;
        if ("maxView" in options) {
            this.maxView = options.maxView
        } else {
            if ("maxView" in this.element.data()) {
                this.maxView = this.element.data("max-view")
            }
        }
        this.maxView = DateTimeGlobal.convertViewMode(this.maxView);
        this.startViewMode = "month";
        if ("startView" in options) {
            this.startViewMode = options.startView
        } else {
            if ("startView" in this.element.data()) {
                this.startViewMode = this.element.data("start-view")
            }
        }
        this.startViewMode = DateTimeGlobal.convertViewMode(this.startViewMode);
        this.viewMode = this.startViewMode;
        if (! ("minView" in options) && !("maxView" in options) && !(this.element.data("min-view") && !(this.element.data("max-view")))) {
            this.pickTime = false;
            if ("pickTime" in options) {
                this.pickTime = options.pickTime
            }
            if (this.pickTime == true) {
                this.minView = 0;
                this.maxView = 4
            } else {
                this.minView = 2;
                this.maxView = 4
            }
        }
        this.forceParse = true;
        if ("forceParse" in options) {
            this.forceParse = options.forceParse
        } else {
            if ("dateForceParse" in this.element.data()) {
                this.forceParse = this.element.data("date-force-parse")
            }
        }
        this.picker = $(DateTimeGlobal.template).appendTo(this.isInline ? this.element: this.appendTo).on({
            click: $.proxy(this.click, this),
            mousedown: $.proxy(this.mousedown, this)
        });
        if (this.closeBtn) {
            this.picker.find(".close").addClass("dis_block_im").text(this.closeBtn)
        } else {
            this.picker.find(".close").removeClass("dis_block_im").remove()
        }
        if (this.isInline) {
            this.picker.addClass("dis_block_im")
        }
        $(document).on("mousedown",
            function(e) {
                if ($(e.target).closest(".ak-MultiDate").length === 0) {
                    that.hide()
                }
            });
        this.autoclose = true;
        if ("autoclose" in options) {
            this.autoclose = options.autoclose
        } else {
            if ("dateAutoclose" in this.element.data()) {
                this.autoclose = this.element.data("date-autoclose")
            }
        }
        this.keyboardNavigation = true;
        if ("keyboardNavigation" in options) {
            this.keyboardNavigation = options.keyboardNavigation
        } else {
            if ("dateKeyboardNavigation" in this.element.data()) {
                this.keyboardNavigation = this.element.data("date-keyboard-navigation")
            }
        }
        this.todayBtn = (options.todayBtn || this.element.data("date-today-btn") || false);
        this.todayHighlight = (options.todayHighlight || this.element.data("date-today-highlight") || false);
        this.calendarWeeks = false;
        if ("calendarWeeks" in options) {
            this.calendarWeeks = options.calendarWeeks
        } else {
            if ("dateCalendarWeeks" in this.element.data()) {
                this.calendarWeeks = this.element.data("date-calendar-weeks")
            }
        }
        if (this.calendarWeeks) {
            this.picker.find("tfoot .today").attr("colspan",
                function(i, val) {
                    return parseInt(val) + 1
                })
        }
        this.weekStart = ((options.weekStart || this.element.data("date-weekstart") || this.language.weekStart || 0) % 7);
        this.weekEnd = ((this.weekStart + 6) % 7);
        this.startDate = -Infinity;
        this.endDate = Infinity;
        this.daysOfWeekDisabled = [];
        this.setStartDate(options.startDate || this.element.data("date-startdate"));
        this.setEndDate(options.endDate || this.element.data("date-enddate"));
        this.setDaysOfWeekDisabled(options.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled"));
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
        if (this.isInline) {
            this.show()
        }
        if (!this.closeBtn && !this.todayBtn) {
            this.picker.find("tfoot").hide()
        }
    };
    ak_MultiDate.prototype = {
        constructor: ak_MultiDate,
        _events: [],
        _attachEvents: function() {
            this._detachEvents();
            if (this.isInput) {
                this._events = [[this.element, {
                    click: (this.autoShow) ? $.proxy(this.show, this) : function() {},
                    keyup: $.proxy(this.update, this),
                    keydown: $.proxy(this.keydown, this)
                }]]
            } else {
                if (this.component && this.hasInput) {
                    this._events = [[this.element.find("input"), {
                        click: (this.autoShow) ? $.proxy(this.show, this) : function() {},
                        keyup: $.proxy(this.update, this),
                        keydown: $.proxy(this.keydown, this)
                    }]]
                }
            }
            if (this.disableDblClickSelection) {
                this._events[this._events.length] = [this.element, {
                    dblclick: function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).blur()
                    }
                }]
            }
            for (var i = 0,
                     el, ev; i < this._events.length; i++) {
                el = this._events[i][0];
                ev = this._events[i][1];
                el.on(ev)
            }
        },
        _detachEvents: function() {
            for (var i = 0,
                     el, ev; i < this._events.length; i++) {
                el = this._events[i][0];
                ev = this._events[i][1];
                el.off(ev)
            }
            this._events = []
        },
        show: function(e) {
            this.picker.toggleClass("ShowHide");
            if (this.picker.hasClass("ShowHide")) {
                this.picker.slideDown();
                $("#multi_mask").show();
                this.success(this.element);
                this.picker.bind({
                    touchmove: function(e) {
                        e.preventDefault()
                    }
                })
            }
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.update();
            this.place();
            $(window).on("resize", $.proxy(this.place, this));
            if (e) {
                e.stopPropagation();
                e.preventDefault()
            }
            this.element.trigger({
                type: "show",
                date: this.date
            })
        },
        hide: function(e) {
            if (this.isInline) {
                return
            }
            if (!this.picker.is(":visible")) {
                return
            }
            this.picker.slideUp();
            setTimeout(function() {
                    $(".ak-MultiDate").removeClass("ShowHide");
                    $("#multi_mask").hide()
                },
                500);
            $(window).off("resize", this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                $(document).off("mousedown", this.hide)
            }
            if (this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val())) {
                this.setValue()
            }
            this.element.trigger({
                type: "hide",
                date: this.date
            })
        },
        remove: function() {
            this._detachEvents();
            this.picker.remove();
            delete this.element.data().multiDate
        },
        getDate: function() {
            var d = this.getUTCDate();
            return new Date(d.getTime() + (d.getTimezoneOffset() * 60000))
        },
        getUTCDate: function() {
            return this.date
        },
        setDate: function(d) {
            this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset() * 60000)))
        },
        setUTCDate: function(d) {
            this.date = d;
            this.setValue()
        },
        setValue: function() {
            var formatted = this.getFormattedDate();
            if (!this.isInput) {
                if (this.component) {
                    this.element.find("input").val(formatted);
                    this.element.find("input").next("label").hide()
                }
                this.element.data("date", formatted)
            } else {
                this.element.val(formatted);
                this.element.next("label").hide()
            }
            this.okfun(formatted, this.element)
        },
        getFormattedDate: function(format) {
            if (format === undefined) {
                format = this.format
            }
            return DateTimeGlobal.formatDate(this.date, format, this.language)
        },
        setStartDate: function(startDate) {
            this.startDate = startDate || -Infinity;
            if (this.startDate !== -Infinity) {
                this.startDate = DateTimeGlobal.parseDate(this.startDate, this.format, this.language)
            }
            this.update();
            this.updateNavArrows()
        },
        setEndDate: function(endDate) {
            this.endDate = endDate || Infinity;
            if (this.endDate !== Infinity) {
                this.endDate = DateTimeGlobal.parseDate(this.endDate, this.format, this.language)
            }
            this.update();
            this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
            this.daysOfWeekDisabled = daysOfWeekDisabled || [];
            if (!$.isArray(this.daysOfWeekDisabled)) {
                this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)
            }
            this.daysOfWeekDisabled = $.map(this.daysOfWeekDisabled,
                function(d) {
                    return parseInt(d, 10)
                });
            this.update();
            this.updateNavArrows()
        },
        place: function() {
            if (this.isInline) {
                return
            }
            var zIndex = parseInt(this.element.parents().filter(function() {
                return $(this).css("z-index") != "auto"
            }).first().css("z-index")) + 10;
            var textbox = this.component ? this.component: this.element;
            var offset = textbox.offset();
            var height = textbox.outerHeight() + parseInt(textbox.css("margin-top"));
            var width = textbox.outerWidth() + parseInt(textbox.css("margin-left"));
            if (IsMobile) {
                this.picker.removeClass("dis_none").addClass("ak-isMobile").css({
                    bottom: 0,
                    top: "auto",
                    left: 0,
                    zIndex: zIndex
                });
                if (this.isMask) {
                    if ($("#multi_mask").length == 0) {
                        this.picker.after('<div id="multi_mask" class="ak-mask"></div>')
                    }
                    if (this.picker.hasClass("ShowHide")) {
                        $("#multi_mask").show();
                        var that = this;
                        $("#multi_mask").on("click",
                            function(e) {
                                that.hide()
                            })
                    }
                    $("#multi_mask").bind({
                        touchmove: function(e) {
                            e.preventDefault()
                        }
                    })
                }
            } else {
                if (offset.left + this.picker.width() > $(window).width()) {
                    offsetLeft = offset.left - $("#ak-scrollview").offset().left - this.picker.width() + width
                } else {
                    offsetLeft = offset.left - $("#ak-scrollview").offset().left
                }
                if ($("#ak-scrollview").scrollTop() > 0) {
                    fullOffsetTop = offset.top + height - $("#ak-scrollview").offset().top + $("#ak-scrollview").scrollTop()
                } else {
                    fullOffsetTop = offset.top + height - $("#ak-scrollview").offset().top
                }
                var fullOffsetBottom = "auto";
                this.picker.removeClass("ak-isMobile").css({
                    bottom: fullOffsetBottom,
                    top: fullOffsetTop,
                    left: offsetLeft,
                    zIndex: zIndex
                });
                $("#multi_mask").remove()
            }
        },
        update: function() {
            var date, fromArgs = false;
            var currentVal = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val();
            if (arguments && arguments.length && (typeof arguments[0] === "string" || arguments[0] instanceof Date)) {
                date = arguments[0];
                fromArgs = true
            } else {
                if (!currentVal && this.initialDate != null) {
                    date = this.initialDate
                } else {
                    date = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val()
                }
            }
            this.date = DateTimeGlobal.parseDate(date, this.format, this.language);
            if (fromArgs || this.initialDate != null) {
                this.setValue()
            }
            if (this.date < this.startDate) {
                this.viewDate = new Date(this.startDate.valueOf())
            } else {
                if (this.date > this.endDate) {
                    this.viewDate = new Date(this.endDate.valueOf())
                } else {
                    this.viewDate = new Date(this.date.valueOf())
                }
            }
            this.fill()
        },
        fillDow: function() {
            var dowCnt = this.weekStart,
                html = "<tr>";
            if (this.calendarWeeks) {
                var cell = "<th>&nbsp;</th>";
                html += cell;
                this.picker.find(".days thead tr:first-child").prepend(cell)
            }
            while (dowCnt < this.weekStart + 7) {
                html += '<th class="dow">' + this.language.weeks[(dowCnt++) % 7] + "</th>"
            }
            html += "</tr>";
            this.picker.find(".days thead").append(html)
        },
        fillMonths: function() {
            var html = "",
                i = 0;
            while (i < 12) {
                html += '<span class="month">' + this.language.month[i++] + "</span>"
            }
            this.picker.find(".month td").html(html)
        },
        fill: function() {
            if (this.date == null || this.viewDate == null) {
                return
            }
            var d = new Date(this.viewDate.valueOf()),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                dayMonth = d.getUTCDate(),
                hours = d.getUTCHours(),
                minutes = d.getUTCMinutes(),
                startYear = this.startDate !== -Infinity ? this.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.startDate !== -Infinity ? this.startDate.getUTCMonth() : -Infinity,
                endYear = this.endDate !== Infinity ? this.endDate.getUTCFullYear() : Infinity,
                endMonth = this.endDate !== Infinity ? this.endDate.getUTCMonth() : Infinity,
                currentDate = this.date && this.date.valueOf(),
                today = new Date(),
                titleFormat = this.language.titleFormat;
            this.picker.find(".days thead th:eq(1)").text(year + " / " + this.language.month[month]);
            this.picker.find(".hours thead th:eq(1)").text(year + " / " + this.language.month[month] + " / " + dayMonth);
            this.picker.find(".minutes thead th:eq(1)").text(year + " / " + this.language.month[month] + " / " + dayMonth);
            if (this.todayBtn) {
                this.picker.find("tfoot .today").addClass("dis_block_im").text(this.todayBtn)
            } else {
                this.picker.find("tfoot .today").removeClass("dis_block_im").remove()
            }
            this.updateNavArrows();
            this.fillMonths();
            var prevMonth = ak_UTCDate(year, month - 1, 28, 0, 0, 0, 0),
                day = DateTimeGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
            prevMonth.setUTCDate(day);
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth.valueOf());
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName;
            while (prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getUTCDay() == this.weekStart) {
                    html.push("<tr>");
                    if (this.calendarWeeks) {
                        var a = new Date(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth(), prevMonth.getUTCDate() - prevMonth.getDay() + 10 - (this.weekStart && this.weekStart % 7 < 5 && 7)),
                            b = new Date(a.getFullYear(), 0, 4),
                            calWeek = ~~ ((a - b) / 86400000 / 7 + 1.5);
                        html.push("<td>" + calWeek + "</td>")
                    }
                }
                var nowTemp = new Date();
                var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
                clsName = " " + this.onRender(prevMonth, now) + " ";
                if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month)) {
                    clsName += " c_gray_ccc"
                } else {
                    if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month)) {
                        clsName += " c_gray_999"
                    }
                }
                if (this.todayHighlight && prevMonth.getUTCFullYear() == today.getFullYear() && prevMonth.getUTCMonth() == today.getMonth() && prevMonth.getUTCDate() == today.getDate()) {
                    clsName += " today"
                }
                if (currentDate && prevMonth.valueOf() == currentDate) {
                    clsName += " bg_theme c_white"
                }
                if (prevMonth.valueOf() < this.startDate || prevMonth.valueOf() > this.endDate || $.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1) {
                    clsName += " disabled"
                }
                html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + "</td>");
                if (prevMonth.getUTCDay() == this.weekEnd) {
                    html.push("</tr>")
                }
                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1)
            }
            this.picker.find(".days tbody").empty().append(html.join(""));
            html = [];
            for (var i = 0; i < 24; i++) {
                var actual = ak_UTCDate(year, month, dayMonth, i);
                clsName = "";
                if ((actual.valueOf() + 3600000) < this.startDate || actual.valueOf() > this.endDate) {
                    clsName += " disabled"
                } else {
                    if (hours == i) {
                        clsName += " bg_theme c_white"
                    }
                }
                html.push('<span class="hour' + clsName + '">' + i + ":00</span>")
            }
            this.picker.find(".hours td").html(html.join(""));
            html = [];
            for (var i = 0; i < 60; i += this.minuteStep) {
                var actual = ak_UTCDate(year, month, dayMonth, hours, i);
                clsName = "";
                if (actual.valueOf() < this.startDate || actual.valueOf() > this.endDate) {
                    clsName += " disabled"
                } else {
                    if (Math.floor(minutes / this.minuteStep) == Math.floor(i / this.minuteStep)) {
                        clsName += " bg_theme c_white"
                    }
                }
                html.push('<span class="minute' + clsName + '">' + hours + ":" + (i < 10 ? "0" + i: i) + "</span>")
            }
            this.picker.find(".minutes td").html(html.join(""));
            var currentYear = this.date && this.date.getUTCFullYear();
            var month = this.picker.find(".month").find("th:eq(1)").text(year).end().find("span").removeClass("bg_theme c_white");
            if (currentYear && currentYear == year) {
                month.eq(this.date.getUTCMonth()).addClass("bg_theme c_white")
            }
            if (year < startYear || year > endYear) {
                month.addClass("disabled")
            }
            if (year == startYear) {
                month.slice(0, startMonth).addClass("disabled")
            }
            if (year == endYear) {
                month.slice(endMonth + 1).addClass("disabled")
            }
            html = "";
            year = parseInt(year / 10, 10) * 10;
            var yearCont = this.picker.find(".years").find("th:eq(1)").addClass("press").text(year + "-" + (year + 9)).end().find("td");
            year -= 1;
            for (var i = -1; i < 11; i++) {
                html += '<span class="year' + (i == -1 || i == 10 ? " c_gray_ccc": "") + (currentYear == year ? " bg_theme c_white": "") + (year < startYear || year > endYear ? " disabled": "") + '">' + year + "</span>";
                year += 1
            }
            yearCont.html(html)
        },
        updateNavArrows: function() {
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                day = d.getUTCDate(),
                hour = d.getUTCHours();
            switch (this.viewMode) {
                case 0:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth() && day <= this.startDate.getUTCDate() && hour <= this.startDate.getUTCHours()) {
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".prev").css({
                            visibility: "visible"
                        })
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth() && day >= this.endDate.getUTCDate() && hour >= this.endDate.getUTCHours()) {
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".next").css({
                            visibility: "visible"
                        })
                    }
                    break;
                case 1:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth() && day <= this.startDate.getUTCDate()) {
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".prev").css({
                            visibility: "visible"
                        })
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth() && day >= this.endDate.getUTCDate()) {
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".next").css({
                            visibility: "visible"
                        })
                    }
                    break;
                case 2:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear() && month <= this.startDate.getUTCMonth()) {
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".prev").css({
                            visibility: "visible"
                        })
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear() && month >= this.endDate.getUTCMonth()) {
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".next").css({
                            visibility: "visible"
                        })
                    }
                    break;
                case 3:
                case 4:
                    if (this.startDate !== -Infinity && year <= this.startDate.getUTCFullYear()) {
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".prev").css({
                            visibility: "visible"
                        })
                    }
                    if (this.endDate !== Infinity && year >= this.endDate.getUTCFullYear()) {
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        })
                    } else {
                        this.picker.find(".next").css({
                            visibility: "visible"
                        })
                    }
                    break
            }
        },
        click: function(e) {
            e.stopPropagation();
            e.preventDefault();
            if ($(e.target).hasClass("close") || $(e.target).parent().hasClass("close")) {
                this.hide()
            }
            if ($(e.target).hasClass("today") || $(e.target).parent().hasClass("today")) {
                var date = new Date();
                date = ak_UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                this.viewMode = this.startViewMode;
                this.showMode(0);
                this._setDate(date);
                this.hide()
            }
            var target = $(e.target).closest("span, td, th");
            if (target.length == 1) {
                if (target.is(".disabled")) {
                    this.element.trigger({
                        type: "outOfRange",
                        date: this.viewDate,
                        startDate: this.startDate,
                        endDate: this.endDate
                    });
                    return
                }
                switch (target[0].nodeName.toLowerCase()) {
                    case "th":
                        switch (target[0].className) {
                            case "c_theme":
                                this.showMode(1);
                                break;
                            case "prev":
                            case "next":
                                var dir = DateTimeGlobal.modes[this.viewMode].navStep * (target[0].className == "prev" ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveHour(this.viewDate, dir);
                                        break;
                                    case 1:
                                        this.viewDate = this.moveDate(this.viewDate, dir);
                                        break;
                                    case 2:
                                        this.viewDate = this.moveMonth(this.viewDate, dir);
                                        break;
                                    case 3:
                                    case 4:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break
                                }
                                this.fill();
                                break
                        }
                        break;
                    case "span":
                        if (!target.is(".disabled")) {
                            if (target.is(".month")) {
                                if (this.minView === 3) {
                                    var month = target.parent().find("span").index(target) || 0;
                                    var year = this.viewDate.getUTCFullYear(),
                                        day = 1,
                                        hours = this.viewDate.getUTCHours(),
                                        minutes = this.viewDate.getUTCMinutes(),
                                        seconds = this.viewDate.getUTCSeconds();
                                    this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                                } else {
                                    this.viewDate.setUTCDate(1);
                                    var month = target.parent().find("span").index(target);
                                    this.viewDate.setUTCMonth(month);
                                    this.element.trigger({
                                        type: "changeMonth",
                                        date: this.viewDate
                                    })
                                }
                            } else {
                                if (target.is(".year")) {
                                    if (this.minView === 4) {
                                        var year = parseInt(target.text(), 10) || 0;
                                        var month = 0,
                                            day = 1,
                                            hours = this.viewDate.getUTCHours(),
                                            minutes = this.viewDate.getUTCMinutes(),
                                            seconds = this.viewDate.getUTCSeconds();
                                        this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                                    } else {
                                        this.viewDate.setUTCDate(1);
                                        var year = parseInt(target.text(), 10) || 0;
                                        this.viewDate.setUTCFullYear(year);
                                        this.element.trigger({
                                            type: "changeYear",
                                            date: this.viewDate
                                        })
                                    }
                                } else {
                                    if (target.is(".hour")) {
                                        var hours = parseInt(target.text(), 10) || 0;
                                        var year = this.viewDate.getUTCFullYear(),
                                            month = this.viewDate.getUTCMonth(),
                                            day = this.viewDate.getUTCDate(),
                                            minutes = this.viewDate.getUTCMinutes(),
                                            seconds = this.viewDate.getUTCSeconds();
                                        this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                                    } else {
                                        if (target.is(".minute")) {
                                            var minutes = parseInt(target.text().substr(target.text().indexOf(":") + 1), 10) || 0;
                                            var year = this.viewDate.getUTCFullYear(),
                                                month = this.viewDate.getUTCMonth(),
                                                day = this.viewDate.getUTCDate(),
                                                hours = this.viewDate.getUTCHours(),
                                                seconds = this.viewDate.getUTCSeconds();
                                            this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                                        }
                                    }
                                }
                            }
                            if (this.viewMode != 0) {
                                var oldViewMode = this.viewMode;
                                this.showMode( - 1);
                                this.fill();
                                if (oldViewMode == this.viewMode && this.autoclose) {
                                    this.hide()
                                }
                            } else {
                                this.fill();
                                if (this.autoclose) {
                                    this.hide()
                                }
                            }
                        }
                        break;
                    case "td":
                        if (target.is(".day") && !target.is(".disabled")) {
                            var day = parseInt(target.text(), 10) || 1;
                            var year = this.viewDate.getUTCFullYear(),
                                month = this.viewDate.getUTCMonth(),
                                hours = this.viewDate.getUTCHours(),
                                minutes = this.viewDate.getUTCMinutes(),
                                seconds = this.viewDate.getUTCSeconds();
                            if (target.is(".c_gray_ccc")) {
                                if (month === 0) {
                                    month = 11;
                                    year -= 1
                                } else {
                                    month -= 1
                                }
                            } else {
                                if (target.is(".c_gray_999")) {
                                    if (month == 11) {
                                        month = 0;
                                        year += 1
                                    } else {
                                        month += 1
                                    }
                                }
                            }
                            this._setDate(ak_UTCDate(year, month, day, hours, minutes, seconds, 0))
                        }
                        var oldViewMode = this.viewMode;
                        this.showMode( - 1);
                        this.fill();
                        if (oldViewMode == this.viewMode && this.autoclose) {
                            this.hide()
                        }
                        break
                }
            }
        },
        _setDate: function(date, which) {
            if (!which || which == "date") {
                this.date = date
            }
            if (!which || which == "view") {
                this.viewDate = date
            }
            this.fill();
            this.setValue();
            this.element.trigger({
                type: "changeDate",
                date: this.date
            });
            var element;
            if (this.isInput) {
                element = this.element
            } else {
                if (this.component) {
                    element = this.element.find("input")
                }
            }
            if (element) {
                element.change();
                if (this.autoclose && (!which || which == "date")) {}
            }
        },
        moveHour: function(date, dir) {
            if (!dir) {
                return date
            }
            var new_date = new Date(date.valueOf());
            dir = dir > 0 ? 1 : -1;
            new_date.setUTCHours(new_date.getUTCHours() + dir);
            return new_date
        },
        moveDate: function(date, dir) {
            if (!dir) {
                return date
            }
            var new_date = new Date(date.valueOf());
            dir = dir > 0 ? 1 : -1;
            new_date.setUTCDate(new_date.getUTCDate() + dir);
            return new_date
        },
        moveMonth: function(date, dir) {
            if (!dir) {
                return date
            }
            var new_date = new Date(date.valueOf()),
                day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(),
                mag = Math.abs(dir),
                new_month,
                test;
            dir = dir > 0 ? 1 : -1;
            if (mag == 1) {
                test = dir == -1 ?
                    function() {
                        return new_date.getUTCMonth() == month
                    }: function() {
                        return new_date.getUTCMonth() != new_month
                    };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                if (new_month < 0 || new_month > 11) {
                    new_month = (new_month + 12) % 12
                }
            } else {
                for (var i = 0; i < mag; i++) {
                    new_date = this.moveMonth(new_date, dir)
                }
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function() {
                    return new_month != new_date.getUTCMonth()
                }
            }
            while (test()) {
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month)
            }
            return new_date
        },
        moveYear: function(date, dir) {
            return this.moveMonth(date, dir * 12)
        },
        dateWithinRange: function(date) {
            return date >= this.startDate && date <= this.endDate
        },
        keydown: function(e) {
            if (this.picker.is(":not(:visible)")) {
                if (e.keyCode == 27) {
                    this.show()
                }
                return
            }
            var dateChanged = false,
                dir, day, month, newDate, newViewDate;
            switch (e.keyCode) {
                case 27:
                    this.hide();
                    e.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.keyboardNavigation) {
                        break
                    }
                    dir = e.keyCode == 37 ? -1 : 1;
                    if (e.ctrlKey) {
                        newDate = this.moveYear(this.date, dir);
                        newViewDate = this.moveYear(this.viewDate, dir)
                    } else {
                        if (e.shiftKey) {
                            newDate = this.moveMonth(this.date, dir);
                            newViewDate = this.moveMonth(this.viewDate, dir)
                        } else {
                            newDate = new Date(this.date.valueOf());
                            newDate.setUTCDate(this.date.getUTCDate() + dir);
                            newViewDate = new Date(this.viewDate.valueOf());
                            newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir)
                        }
                    }
                    if (this.dateWithinRange(newDate)) {
                        this.date = newDate;
                        this.viewDate = newViewDate;
                        this.setValue();
                        this.update();
                        e.preventDefault();
                        dateChanged = true
                    }
                    break;
                case 38:
                case 40:
                    if (!this.keyboardNavigation) {
                        break
                    }
                    dir = e.keyCode == 38 ? -1 : 1;
                    if (e.ctrlKey) {
                        newDate = this.moveYear(this.date, dir);
                        newViewDate = this.moveYear(this.viewDate, dir)
                    } else {
                        if (e.shiftKey) {
                            newDate = this.moveMonth(this.date, dir);
                            newViewDate = this.moveMonth(this.viewDate, dir)
                        } else {
                            newDate = new Date(this.date.valueOf());
                            newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
                            newViewDate = new Date(this.viewDate.valueOf());
                            newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7)
                        }
                    }
                    if (this.dateWithinRange(newDate)) {
                        this.date = newDate;
                        this.viewDate = newViewDate;
                        this.setValue();
                        this.update();
                        e.preventDefault();
                        dateChanged = true
                    }
                    break;
                case 13:
                    this.hide();
                    e.preventDefault();
                    break;
                case 9:
                    this.hide();
                    break
            }
            if (dateChanged) {
                this.element.trigger({
                    type:
                        "changeDate",
                    date: this.date
                });
                var element;
                if (this.isInput) {
                    element = this.element
                } else {
                    if (this.component) {
                        element = this.element.find("input")
                    }
                }
                if (element) {
                    element.change()
                }
            }
        },
        showMode: function(dir) {
            if (dir) {
                var newViewMode = Math.max(0, Math.min(DateTimeGlobal.modes.length - 1, this.viewMode + dir));
                if (newViewMode >= this.minView && newViewMode <= this.maxView) {
                    this.viewMode = newViewMode
                }
            }
            this.picker.find(">div").removeClass("dis_block_im").filter("." + DateTimeGlobal.modes[this.viewMode].clsName).addClass("dis_block_im");
            if (this.picker.children(".dis_block_im").find("tfoot button").length > 1) {
                this.picker.children(".dis_block_im").find("tfoot button").addClass("w_50");
                this.picker.children(".dis_block_im").find("tfoot button").eq(0).addClass("bor_right")
            } else {
                this.picker.children(".dis_block_im").find("tfoot button").removeClass("w_50");
                this.picker.children(".dis_block_im").find("tfoot button").eq(0).removeClass("bor_right")
            }
            this.updateNavArrows()
        },
        reset: function(e) {
            this._setDate(null, "date")
        }
    };
    $.fn.AKjs_MultiDate = function(option) {
        var args = Array.apply(null, arguments);
        args.shift();
        return this.each(function() {
            var $this = $(this),
                data = $this.data("multiDate"),
                options = typeof option == "object" && option;
            if (!data) {
                $this.data("multiDate", (data = new ak_MultiDate(this, $.extend({},
                    $.fn.AKjs_MultiDate.defaults, options))))
            }
            if (typeof option == "string" && typeof data[option] == "function") {
                data[option].apply(data, args)
            }
        })
    };
    $.fn.AKjs_MultiDate.defaults = {
        onRender: function(date, now) {
            return ""
        },
        success: function(ele) {},
        okfun: function(val, ele) {}
    };
    $.fn.AKjs_MultiDate.Constructor = ak_MultiDate;
    function ak_UTCDate() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    var DateTimeGlobal = {
        modes: [{
            clsName: "minutes",
            navFnc: "Hours",
            navStep: 1
        },
            {
                clsName: "hours",
                navFnc: "Date",
                navStep: 1
            },
            {
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            },
            {
                clsName: "month",
                navFnc: "FullYear",
                navStep: 1
            },
            {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
        isLeapYear: function(year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
        },
        getDaysInMonth: function(year, month) {
            return [31, (DateTimeGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        },
        validParts: /hh?|ii?|ss?|dd?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function(format) {
            var separators = format.replace(this.validParts, "\0").split("\0"),
                parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || parts.length === 0) {
                throw new Error("Invalid date format.")
            }
            return {
                separators: separators,
                parts: parts
            }
        },
        parseDate: function(date, format, language) {
            if (date instanceof Date) {
                return new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
                format = this.parseFormat("yyyy-mm-dd")
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
                format = this.parseFormat("yyyy-mm-dd hh:ii")
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
                format = this.parseFormat("yyyy-mm-dd hh:ii:ss")
            }
            if (/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(date)) {
                var part_re = /([-+]\d+)([dmwy])/,
                    parts = date.match(/([-+]\d+)([dmwy])/g),
                    part,
                    dir;
                date = new Date();
                for (var i = 0; i < parts.length; i++) {
                    part = part_re.exec(parts[i]);
                    dir = parseInt(part[1]);
                    switch (part[2]) {
                        case "d":
                            date.setUTCDate(date.getUTCDate() + dir);
                            break;
                        case "m":
                            date = ak_MultiDate.prototype.moveMonth.call(ak_MultiDate.prototype, date, dir);
                            break;
                        case "w":
                            date.setUTCDate(date.getUTCDate() + dir * 7);
                            break;
                        case "y":
                            date = ak_MultiDate.prototype.moveYear.call(ak_MultiDate.prototype, date, dir);
                            break
                    }
                }
                return ak_UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
            }
            var parts = date && date.match(this.nonpunctuation) || [],
                date = new Date(),
                parsed = {},
                setters_order = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                setters_map = {
                    hh: function(d, v) {
                        return d.setUTCHours(v)
                    },
                    h: function(d, v) {
                        return d.setUTCHours(v)
                    },
                    ii: function(d, v) {
                        return d.setUTCMinutes(v)
                    },
                    i: function(d, v) {
                        return d.setUTCMinutes(v)
                    },
                    ss: function(d, v) {
                        return d.setUTCSeconds(v)
                    },
                    s: function(d, v) {
                        return d.setUTCSeconds(v)
                    },
                    yyyy: function(d, v) {
                        return d.setUTCFullYear(v)
                    },
                    yy: function(d, v) {
                        return d.setUTCFullYear(2000 + v)
                    },
                    m: function(d, v) {
                        v -= 1;
                        while (v < 0) {
                            v += 12
                        }
                        v %= 12;
                        d.setUTCMonth(v);
                        while (d.getUTCMonth() != v) {
                            d.setUTCDate(d.getUTCDate() - 1)
                        }
                        return d
                    },
                    d: function(d, v) {
                        return d.setUTCDate(v)
                    }
                },
                val,
                filtered,
                part;
            setters_map["M"] = setters_map["MM"] = setters_map["mm"] = setters_map["m"];
            setters_map["dd"] = setters_map["d"];
            date = ak_UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            if (parts.length == format.parts.length) {
                for (var i = 0,
                         cnt = format.parts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10);
                    part = format.parts[i];
                    if (isNaN(val)) {
                        switch (part) {
                            case "MM":
                                filtered = $(language.month).filter(function() {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p
                                });
                                val = $.inArray(filtered[0], language.month) + 1;
                                break;
                            case "M":
                                filtered = $(language.month).filter(function() {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p
                                });
                                val = $.inArray(filtered[0], language.month) + 1;
                                break
                        }
                    }
                    parsed[part] = val
                }
                for (var i = 0,
                         s; i < setters_order.length; i++) {
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s])) {
                        setters_map[s](date, parsed[s])
                    }
                }
            }
            return date
        },
        formatDate: function(date, format, language) {
            if (date == null) {
                return ""
            }
            var val = {
                h: date.getUTCHours(),
                i: date.getUTCMinutes(),
                s: date.getUTCSeconds(),
                d: date.getUTCDate(),
                m: date.getUTCMonth() + 1,
                M: language.month[date.getUTCMonth()],
                MM: language.month[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.hh = (val.h < 10 ? "0": "") + val.h;
            val.ii = (val.i < 10 ? "0": "") + val.i;
            val.ss = (val.s < 10 ? "0": "") + val.s;
            val.dd = (val.d < 10 ? "0": "") + val.d;
            val.mm = (val.m < 10 ? "0": "") + val.m;
            var date = [],
                seps = $.extend([], format.separators);
            for (var i = 0,
                     cnt = format.parts.length; i < cnt; i++) {
                if (seps.length) {
                    date.push(seps.shift())
                }
                date.push(val[format.parts[i]])
            }
            return date.join("")
        },
        convertViewMode: function(viewMode) {
            switch (viewMode) {
                case 4:
                case "decade":
                    viewMode = 4;
                    break;
                case 3:
                case "year":
                    viewMode = 3;
                    break;
                case 2:
                case "month":
                    viewMode = 2;
                    break;
                case 1:
                case "day":
                    viewMode = 1;
                    break;
                case 0:
                case "hour":
                    viewMode = 0;
                    break
            }
            return viewMode
        },
        headTemplate: "<thead>" + "<tr>" + '<th class="prev"><i class="icon-ln_fanhui_a"/></th>' + '<th colspan="5" class="c_theme"></th>' + '<th class="next"><i class="icon-ln_qianjin_a"/></th>' + "</tr>" + "</thead>",
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7"><fieldset><button type="button" class="fl close c_gray_777"></button><button type="button" class="fr today c_theme"></button></fieldset></th></tr></tfoot>'
    };
    DateTimeGlobal.template = '<div class="ak-MultiDate dis_none">' + '<div class="minutes">' + "<table>" + DateTimeGlobal.headTemplate + DateTimeGlobal.contTemplate + DateTimeGlobal.footTemplate + "</table>" + "</div>" + '<div class="hours">' + "<table>" + DateTimeGlobal.headTemplate + DateTimeGlobal.contTemplate + DateTimeGlobal.footTemplate + "</table>" + "</div>" + '<div class="days">' + "<table>" + DateTimeGlobal.headTemplate + "<tbody></tbody>" + DateTimeGlobal.footTemplate + "</table>" + "</div>" + '<div class="month">' + "<table>" + DateTimeGlobal.headTemplate + DateTimeGlobal.contTemplate + DateTimeGlobal.footTemplate + "</table>" + "</div>" + '<div class="years">' + "<table>" + DateTimeGlobal.headTemplate + DateTimeGlobal.contTemplate + DateTimeGlobal.footTemplate + "</table>" + "</div>" + "</div>";
    $.fn.AKjs_MultiDate.DateTimeGlobal = DateTimeGlobal
} (jQuery));

/*-----------------------------------------------AKjs_NavScroll (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_NavScroll = function(setting) {
        var option = $.extend({
                content_dom: "",
                line_style: "dis_block abs bor_top2 bor_theme",
                active_corlor: "c_theme",
                ClickCallback: function() {}
            },
            setting);
        var ele = $(this);
        var ele_list = ele.children().first().children();
        if (option.content_dom) {
            var ele_content = $(option.content_dom);
        } else {
            var ele_content = ele.children().last();
        }
        if (ele_list.children("sub").length < 1) {
            ele_list.append("<sub></sub>");
        }
        var ele_list_line = ele_list.children("sub");
        ele_list.css({
            "left": "0",
            "transform": "translate3d(0px, 0px, 0px)",
            "transition-duration": "0s"
        });
        ele_list.find("li").each(function(){
            ele_list_line.addClass(option.line_style).css({
                "left": "0"
            });
            ele_list.children().eq(0).addClass(option.active_corlor).siblings().removeClass(option.active_corlor);
        });
        var nav_w = ele_list.children().eq(0).width();
        ele_list_line.css({
            "width": nav_w,
            "top": ele_list.outerHeight()-3
        });
        ele_list.find("li").on('click', function(){
            nav_w=$(this).width();
            ele_list_line.stop(true);
            ele_list_line.animate({
                "left":$(this).position().left
            },300);
            ele_list_line.animate({
                "width": nav_w
            });
            $(this).addClass(option.active_corlor).siblings().removeClass(option.active_corlor);
            var fn_w = (ele.width() - nav_w) / 2;
            var fnl_l;
            var fnl_x = parseInt($(this).position().left);
            if (fnl_x <= fn_w) {
                fnl_l = 0;
            } else if (fn_w - fnl_x <= flb_w - fl_w) {
                fnl_l = flb_w - fl_w;
            } else {
                fnl_l = fn_w - fnl_x;
            }
            ele_list.animate({
                "left" : fnl_l
            }, 300);
            ele_content.animate({
                "left" : "-"+flb_w * $(this).index()
            }, 300);
            option.ClickCallback($(this),$(this).index());
        });
        $(function() {
            ak_SetStyle();
        });

        $(window).resize(function(){
            ak_SetStyle();
        });

        function ak_SetStyle() {
            fl_w = ele_list.width();
            flb_w = ele.width();
            ele_content.removeClass("dis_none");
            ele_content.children().css({"width": flb_w});
            ele_content.css({"width": ele_content.children().width() * ele_content.children().length});
        }

        ele_list.on('touchstart', function (e) {
            var touch1 = e.originalEvent.targetTouches[0];
            x1 = touch1.pageX;
            y1 = touch1.pageY;
            ty_left = parseInt($(this).css("left"));
        });
        ele_list.on('touchmove', function (e) {
            var touch2 = e.originalEvent.targetTouches[0];
            var x2 = touch2.pageX;
            var y2 = touch2.pageY;
            if(ty_left + x2 - x1>=0){
                $(this).css({
                    "left": "0",
                    "transform": "translate3d("+x2/4+"px, 0px, 0px)",
                    "transition-duration": "0s"
                });
            }else if(ty_left + x2 - x1<=flb_w-fl_w){
                $(this).css({
                    "left": flb_w-fl_w,
                    "transform": "translate3d(-"+x1/4+"px, 0px, 0px)",
                    "transition-duration": "0.2s"
                });
            }else{
                $(this).css({
                    "left": ty_left + x2 - x1
                });
            }
            if(Math.abs(y2-y1)>0){
                e.preventDefault();
            }
        });
        ele_list.on('touchend', function (e) {
            $(this).css({
                "transform": "translate3d(0px, 0px, 0px)",
                "transition-duration": "0s"
            });
        });
    };
} (jQuery));

/*-----------------------------------------------AKjs_Paginator (2018-12-13)--------------------------------------------*/
(function($) {
    $.AKjs_Paginator = function (el, options) {
        if(!(this instanceof $.AKjs_Paginator)){
            return new $.AKjs_Paginator(el, options);
        }
        var self = this;
        self.$container = $(el);
        self.$container.data('AKjs_Paginator', self);
        self.init = function () {
            self.$container.addClass("ak-pagination");
            if (options.first_text) {
                var first_text = '<li class="ak_first">'+options.first_text+'</li>';
            }
            if (options.prev_text) {
                var prev_text = '<li class="ak_prev">'+options.prev_text+'</li>';
            }
            if (options.next_text) {
                var next_text = '<li class="ak_next">'+options.next_text+'</li>';
            }
            if (options.last_text) {
                var last_text = '<li class="ak_last">'+options.last_text+'</li>';
            }
            self.options = $.extend({}, {
                ak_first: first_text,
                ak_prev: prev_text,
                ak_next: next_text,
                ak_last: last_text,
                ak_page: '<li class="ak_page">{{ak_page}}</li>'
            }, options);
            self.verify();
            self.extendJquery();
            self.render();
            self.fireEvent(this.options.currentPage, 'init');
        };
        self.verify = function () {
            var opts = self.options;
            if (!self.isNumber(opts.totalPages)) {
                throw new Error('[AKjs_Paginator] type error: totalPages');
            }
            if (!self.isNumber(opts.totalCounts)) {
                throw new Error('[AKjs_Paginator] type error: totalCounts');
            }
            if (!self.isNumber(opts.pageSize)) {
                throw new Error('[AKjs_Paginator] type error: pageSize');
            }
            if (!self.isNumber(opts.currentPage)) {
                throw new Error('[AKjs_Paginator] type error: currentPage');
            }
            if (!self.isNumber(opts.visiblePages)) {
                throw new Error('[AKjs_Paginator] type error: visiblePages');
            }
            if (!opts.totalPages && !opts.totalCounts) {
                throw new Error('[AKjs_Paginator] totalCounts or totalPages is required');
            }
            if (!opts.totalPages && opts.totalCounts && !opts.pageSize) {
                throw new Error('[AKjs_Paginator] pageSize is required');
            }
            if (opts.totalCounts && opts.pageSize) {
                opts.totalPages = Math.ceil(opts.totalCounts / opts.pageSize);
            }
            if (opts.currentPage < 1 || opts.currentPage > opts.totalPages) {
                throw new Error('[AKjs_Paginator] currentPage is incorrect');
            }
            if (opts.totalPages < 1) {
                throw new Error('[AKjs_Paginator] totalPages cannot be less currentPage');
            }
        };
        self.extendJquery = function () {
            $.fn.AKjs_PaginatorHTML = function (s) {
                return s ? this.before(s).remove() : $('<p>').append(this.eq(0).clone()).html();
            };
        };
        self.render = function () {
            self.renderHtml();
            self.setStatus();
            self.bindEvents();
        };
        self.renderHtml = function () {
            var html = [];
            var pages = self.getPages();
            for (var i = 0, j = pages.length; i < j; i++) {
                html.push(self.buildItem('ak_page', pages[i]));
            }
            self.isEnable('ak_prev') && html.unshift(self.buildItem('ak_prev', self.options.currentPage - 1));
            self.isEnable('ak_first') && html.unshift(self.buildItem('ak_first', 1));
            self.isEnable('statistics') && html.unshift(self.buildItem('statistics'));
            self.isEnable('ak_next') && html.push(self.buildItem('ak_next', self.options.currentPage + 1));
            self.isEnable('ak_last') && html.push(self.buildItem('ak_last', self.options.totalPages));
            self.$container.html(html.join(''));
        };
        self.buildItem = function (type, pageData) {
            var html = self.options[type]
                .replace(/{{ak_page}}/g, pageData)
                .replace(/{{totalPages}}/g, self.options.totalPages)
                .replace(/{{totalCounts}}/g, self.options.totalCounts);
            return $(html).attr({
                'data-role': type,
                'data-index': pageData
            }).AKjs_PaginatorHTML();
        };
        self.setStatus = function () {
            var options = self.options;
            if (!self.isEnable('ak_first') || options.currentPage === 1) {
                $('[data-role=ak_first]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_prev') || options.currentPage === 1) {
                $('[data-role=ak_prev]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_next') || options.currentPage >= options.totalPages) {
                $('[data-role=ak_next]', self.$container).addClass(options.disableClass);
            }
            if (!self.isEnable('ak_last') || options.currentPage >= options.totalPages) {
                $('[data-role=ak_last]', self.$container).addClass(options.disableClass);
            }
            $('[data-role=ak_page]', self.$container).removeClass(options.activeClass);
            $('[data-role=ak_page][data-index=' + options.currentPage + ']', self.$container).addClass(options.activeClass);
        };
        self.getPages = function () {
            var pages = [],
                visiblePages = self.options.visiblePages,
                currentPage = self.options.currentPage,
                totalPages = self.options.totalPages;
            if (visiblePages > totalPages) {
                visiblePages = totalPages;
            }
            var half = Math.floor(visiblePages / 2);
            var start = currentPage - half + 1 - visiblePages % 2;
            var end = currentPage + half;
            if (start < 1) {
                start = 1;
                end = visiblePages;
            }
            if (end > totalPages) {
                end = totalPages;
                start = 1 + totalPages - visiblePages;
            }
            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }
            return pages;
        };
        self.isNumber = function (value) {
            var type = typeof value;
            return type === 'number' || type === 'undefined';
        };
        self.isEnable = function (type) {
            return self.options[type] && typeof self.options[type] === 'string';
        };
        self.switchPage = function (pageIndex) {
            self.options.currentPage = pageIndex;
            self.render();
        };
        self.fireEvent = function (pageIndex, type) {
            return (typeof self.options.onPageChange !== 'function') || (self.options.onPageChange(pageIndex, type, self.$container) !== false);
        };
        self.callMethod = function (method, options) {
            switch (method) {
                case 'option':
                    self.options = $.extend({}, self.options, options);
                    self.verify();
                    self.render();
                    break;
                case 'destroy':
                    self.$container.empty();
                    self.$container.removeData('AKjs_Paginator');
                    break;
                default :
                    throw new Error('[AKjs_Paginator] method "' + method + '" does not exist');
            }
            return self.$container;
        };
        self.bindEvents = function () {
            var opts = self.options;
            self.$container.off();
            self.$container.on('click', '[data-role]', function () {
                var $el = $(this);
                if ($el.hasClass(opts.disableClass) || $el.hasClass(opts.activeClass)) {
                    return;
                }
                var pageIndex = +$el.attr('data-index');
                if (self.fireEvent(pageIndex, 'change')) {
                    self.switchPage(pageIndex);
                }
            });
        };
        self.init();
        return self.$container;
    };
    $.AKjs_Paginator.defaultOptions = {
        first_text: 'First',
        prev_text: 'Previous',
        next_text: 'Next',
        last_text: 'Last',
        totalPages: 0,
        totalCounts: 0,
        pageSize: 0,
        currentPage: 1,
        visiblePages: 4,
        disableClass: 'disabled',
        activeClass: 'active',
        onPageChange: null
    };
    $.fn.AKjs_Paginator = function () {
        var self = this,
            args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === 'string') {
            var $instance = $(self).data('AKjs_Paginator');
            if (!$instance) {
                throw new Error('[AKjs_Paginator] the element is not instantiated');
            } else {
                return $instance.callMethod(args[0], args[1]);
            }
        } else {
            return new $.AKjs_Paginator(this, args[0]);
        }
    };

} (jQuery));

/*-----------------------------------------------AKjs_PortraitImage (2018-12-13)--------------------------------------------*/
(function($) {
    var option = {};
    $.fn.AKjs_PortraitImage = function(setting) {
        var op = $.extend({
                errorTip: "",
                btn_ok: "",
                box_title: "",
                addCallbak: function() {}
            },
            setting);
        option = op;
        var pimg = $(this);
        setTimeout(function() {
                pimg.each(function() {
                    $(this).addClass("ak-PortraitImage");
                    $(this).find("input[type=file]").attr("accept", "image/*");
                    $(this).bind("change",
                        function() {
                            ak_PortraitFilePrvid($(this).children("input")[0], op)
                        });
                    $(this).children("figure").css({
                        "margin-top": (pimg.outerWidth() / 3 / 2)
                    })
                })
            },
            200);
        $(window).resize(function() {
            pimg.children("figure").css({
                "margin-top": (pimg.outerWidth() / 3 / 2)
            })
        })
    };
    function ak_PortraitFilePrvid(file, op) {
        var tip = op.errorTip;
        var filters = {
            "jpeg": "/9j/4",
            "gif": "R0lGOD",
            "png": "iVBORw"
        };
        if (window.FileReader) {
            for (var i = 0,
                     f; f = file.files[i]; i++) {
                var fr = new FileReader();
                fr.onload = function(e) {
                    var src = e.target.result;
                    if (!ak_PortraitValidateImg(src)) {
                        $ak.alert(tip, {
                            icon: "error",
                            button_ok: op.btn_ok,
                            title: op.box_title
                        })
                    } else {
                        ak_PortraitShowImg(src, file)
                    }
                };
                fr.readAsDataURL(f)
            }
        } else {
            if (!/\.jpg$|\.png$|\.gif$/i.test(file.value)) {
                $ak.alert(tip, {
                    icon: "error",
                    button_ok: op.btn_ok,
                    title: op.box_title
                })
            } else {
                ak_PortraitShowImg(file.value, file)
            }
        }
        function ak_PortraitValidateImg(data) {
            var pos = data.indexOf(",") + 1;
            for (var e in filters) {
                if (data.indexOf(filters[e]) === pos) {
                    return e
                }
            }
            return null
        }
        function ak_PortraitShowImg(src, id) {
            var figure = "<img src=" + src + ">";
            $(id).next().remove("i");
            $(id).next().html(figure);
            $(id).unbind("click");
            $(id).click(function() {
                $(id).parent().children("img").attr("src", src)
            });
            option.addCallbak($(id).next().find("img"));
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_PreviewImage (2018-12-13)--------------------------------------------*/
(function($) {
    var option = {};
    $.fn.AKjs_PreviewImage = function(setting) {
        var op = $.extend({
                uploadNum: 0,
                webToast: "",
                messege: "",
                btn_ok: "",
                btn_cancel: "",
                box_title: new Array(),
                delbtnClass: "",
                box_icon: new Array(),
                Class: "",
                Del_icon: "",
                length: 4,
                length_title: "",
                size: 5,
                size_title: "",
                errorTip: "",
                addCallbak: function() {},
                delCallbak: function() {}
            },
            setting);
        option = op;
        var pimg = $(this);
        pimg.addClass("ak-previewImage");
        $(option.delbtnClass).hide();
        pimg.find("input[type=file]").attr("accept", "image/*");
        pimg.children("i").addClass(option.box_icon[0]);
        pimg.each(function() {
            $(option.delbtnClass).unbind("click");
            $(option.delbtnClass).click(function(e) {
                if ($(option.delbtnClass).hasClass("ak-is_active")) {
                    $(option.delbtnClass).parents("ul").find("li span").hide();
                    $(option.delbtnClass).removeClass("ak-is_active")
                } else {
                    $(option.delbtnClass).parents("ul").find("li span").show();
                    $(option.delbtnClass).addClass("ak-is_active")
                }
            })
        });
        pimg.bind("change",
            function() {
                if (option.uploadNum == op.length) {
                    AKjs_WebToast(op.length_title + "" + op.length + "", "middle", "mask", 3000);
                    return false
                }
                var tempData = $(this).children("input")[0];
                if ((option.uploadNum + tempData.files.length) > op.length) {
                    AKjs_WebToast(op.length_title + "" + op.length + "", "middle", "mask", 3000)
                }
                var tempFiles = [];
                for (var i = 0; i < (op.length - option.uploadNum); i++) {
                    if (tempData.files[i] != null && tempData.files[i] != undefined) {
                        if (tempData.files[i].size > op.size * 1024 * 1024) {
                            AKjs_WebToast(op.size_title + op.size + "MB", "middle", "mask", 3000);
                            return false
                        }
                    }
                    tempFiles.push(tempData.files[i])
                }
                file_prvid(tempData, tempFiles, op)
            });
        var figure_wh = $(this).outerWidth();
        var figure_m = $(this).outerWidth() / 3;
        pimg.children("figure").css({
            "width": figure_wh - figure_m,
            "height": figure_wh - figure_m,
            "line-height": figure_wh - figure_m + "px",
            "margin-top": (figure_m / 2) - 2
        })
    };
    function file_prvid(file, files, op) {
        var tip = op.errorTip;
        var filters = {
            "jpeg": "/9j/4",
            "gif": "R0lGOD",
            "png": "iVBORw"
        };
        if (window.FileReader) {
            for (var i = 0,
                     f; f = files[i]; i++) {
                var fr = new FileReader();
                fr.onload = function(e) {
                    var src = e.target.result;
                    if (!ak_ValidateImg(src)) {
                        $ak.alert(tip, {
                            icon: "error",
                            button_ok: op.btn_ok,
                            button_cancel: op.btn_cancel,
                            title: op.box_title[1]
                        });
                        return false
                    } else {
                        showPrvImg(src, file);
                        op.uploadNum++
                    }
                };
                fr.readAsDataURL(f)
            }
        } else {
            if (!/\.jpg$|\.png$|\.gif$/i.test(file.value)) {
                $ak.alert(tip, {
                    icon: "error",
                    button_ok: op.btn_ok,
                    button_cancel: op.btn_cancel,
                    title: op.box_title[1]
                });
                return false
            } else {
                showPrvImg(file.value, file);
                op.uploadNum++
            }
        }
        function ak_ValidateImg(data) {
            var pos = data.indexOf(",") + 1;
            for (var e in filters) {
                if (data.indexOf(filters[e]) === pos) {
                    return e
                }
            }
            return null
        }
        function showPrvImg(src, id) {
            var imgList = "<li class='rel fl mb_5'>" + "<figure class='img_auto " + option.Class + "' style='background-color: #eeeeee !important;'>" + "<img src=" + src + " />" + "</figure>" + "<span class='pointer top_0 abs wh_12rem line_h_12rem text_14rem text_al_c bor_rad_50 c_white " + option.Del_icon + "' style='background-color: rgba(255,0,0,1); z-index: 1'>" + "</span>" + "</li>";
            $(id).parents("li").before(imgList);
            $(option.delbtnClass).show();
            var showPrvImg_li = $(id).parents("li");
            option.addCallbak(showPrvImg_li.parent());
            var delbtn = showPrvImg_li.parent().find("li").find("span");
            delbtn.hide().css({
                "margin-top": "-" + delbtn.height() / 3 + "px",
                "left": showPrvImg_li.parent().find("figure").width() - (delbtn.width() / 2)
            });
            delbtn.unbind("click");
            delbtn.click(function() {
                var image = $(this);
                $ak.confirm(option.messege, {
                    icon: "question",
                    button_ok: option.btn_ok,
                    button_cancel: option.btn_cancel,
                    title: option.box_title[0],
                    onSubmit: function(res) {
                        option.delCallbak(image.parent("li"));
                        option.uploadNum--;
                        if (option.uploadNum < 1) {
                            $(option.delbtnClass).hide();
                        }
                        AKjs_WebToast(option.webToast, "bottom", 1000)
                    }
                })
            })
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Print (2018-12-13)--------------------------------------------*/
(function($) {
    $.AKjs_Print = $.fn.AKjs_Print = function() {
        var options, $this, self = this;
        if (self instanceof $) {
            self = self.get(0);
        }
        if (PrintIsNode(self)) {
            $this = $(self);
            if (arguments.length > 0) {
                options = arguments[0];
            }
        } else {
            if (arguments.length > 0) {
                $this = $(arguments[0]);
                if (PrintIsNode($this[0])) {
                    if (arguments.length > 1) {
                        options = arguments[1];
                    }
                } else {
                    options = arguments[0];
                    $this = $("html");
                }
            } else {
                $this = $("html");
            }
        }
        var defaults = {
            iframe: false,
            noPrint: "",
            callback: function() {},
            deferred: $.Deferred()
        };
        options = $.extend({},
            defaults, (options || {}));
        var $styles = $("style, link, meta, title");
        var copy = $this.clone();
        copy = $("<span/>").append(copy);
        copy.find(options.noPrint).remove();
        options.callback(copy);
        copy.append($styles.clone());
        var content = copy.html();
        copy.remove();
        if (options.iframe) {
            try {
                var $iframe = $(options.iframe + "");
                var iframeCount = $iframe.length;
                if (iframeCount === 0) {
                    $iframe = $('<iframe height="0" width="0" frameborder="0" name="Opaque"/>').prependTo('body').css({
                        "position": "absolute",
                        "top": -999,
                        "left": -999
                    });
                }
                var w, wdoc;
                w = $iframe.get(0);
                w = w.contentWindow || w.contentDocument || w;
                wdoc = w.document || w.contentDocument || w;
                wdoc.open();
                wdoc.write(content);
                wdoc.close();
                PrintFrame(w).done(function() {
                    setTimeout(function() {
                        if (iframeCount === 0) {
                            $iframe.remove();
                        }
                    }, 100);
                }).fail(function(err) {
                    console.error("Failed to print from iframe", err);
                    PrintContentInNewWindow(content);
                }).always(function() {
                    try {
                        options.deferred.resolve();
                    } catch(err) {
                        console.warn('Error notifying deferred', err);
                    }
                });
            } catch(e) {
                console.error("Failed to print from iframe", e.stack, e.message);
                PrintContentInNewWindow(content).always(function() {
                    try {
                        options.deferred.resolve();
                    } catch(err) {
                        console.warn('Error notifying deferred', err);
                    }
                });
            }
        } else {
            PrintContentInNewWindow(content).always(function() {
                try {
                    options.deferred.resolve();
                } catch(err) {
                    console.warn('Error notifying deferred', err);
                }
            });
        }
        return this;
    };
    function PrintFrame(frameWindow) {
        var def = $.Deferred();
        try {
            setTimeout(function() {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand('AKjs_Print', false, null)) {
                        frameWindow.print();
                    }
                } catch(e) {
                    frameWindow.print();
                }
                frameWindow.close();
                def.resolve();
            }, 250);
        } catch(err) {
            def.reject(err);
        }
        return def;
    }
    function PrintContentInNewWindow(content) {
        var w = window.open();
        w.document.write(content);
        w.document.close();
        return PrintFrame(w);
    }
    function PrintIsNode(o) {
        return !! (typeof Node === "object" ? o instanceof Node: o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }
} (jQuery));

/*-----------------------------------------------AKjs_Progress (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.extend({
        AKjs_Progress: function(options) {
            var defaults = {
                goalAmount: 100,
                currentAmount: 50,
                speed: 1000,
                ColorStyle: "",
                textBefore: "",
                textAfter: "",
                milestoneNumber: 70,
                milestoneClass: "",
                callback: function() {}
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var obj = $(this);
                var goalAmountParsed = parseInt(defaults.goalAmount);
                if (obj.attr("data-to")) {
                    var currentAmountParsed = parseInt(obj.attr("data-to"))
                } else {
                    var currentAmountParsed = parseInt(defaults.currentAmount)
                }
                var percentage = (currentAmountParsed / goalAmountParsed) * 100;
                var milestoneNumberClass = (percentage > defaults.milestoneNumber) ? " " + defaults.milestoneClass: "";
                if (defaults.textAfter) {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + "<em>" + currentAmountParsed + "</em>" + defaults.textAfter + "</span></li>"
                } else {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + "</span></li>"
                }
                var progressBarWrapped = '<ol class="bg_in h_in dis_block_im ovh">' + progressBar + "</ol>";
                obj.html(progressBarWrapped);
                var rendered = obj.children("ol").children("li");
                rendered.each(function() {
                    obj.find(".ak-progressBar").addClass(defaults.ColorStyle);
                    $(this).html($(this).html().replace(/\s/g, " "));
                    setTimeout(function() {
                            rendered.find("span").show().css({
                                "line-height": rendered.height() + 2 + "px"
                            });
                            obj.css("margin-top", (obj.parent().height() - obj.height()) / 2)
                        },
                        300);
                    $(window).resize(function() {
                        rendered.find("span").show().css({
                            "line-height": rendered.height() + 2 + "px"
                        });
                        obj.css("margin-top", (obj.parent().height() - obj.height()) / 2)
                    })
                });
                rendered.animate({
                        width: percentage + "%"
                    },
                    {
                        duration: defaults.speed,
                        step: function(now, fx) {
                            if (obj.attr("data-from")) {
                                fx.start = parseInt(obj.attr("data-from"))
                            } else {
                                fx.start = 0
                            }
                            rendered.find("em").text(parseInt(fx.now))
                        }
                    });
                setTimeout(function() {
                        $(rendered).parent().addClass(milestoneNumberClass)
                    },
                    defaults.speed);
                defaults.callback.call($(this))
            })
        }
    })
} (jQuery));

/*-----------------------------------------------AKjs_QRcode (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_QRcode = function(options) {
        var QRMode;
        function QR8bitByte(data) {
            this.mode = QRMode;
            this.data = data
        }
        function QRCode(typeNumber, errorCorrectLevel) {
            this.typeNumber = typeNumber;
            this.errorCorrectLevel = errorCorrectLevel;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = []
        }
        function QRPolynomial(num, shift) {
            if (void 0 == num.length) throw Error(num.length + "/" + shift);
            for (var offset = 0; offset < num.length && 0 == num[offset];) offset++;
            this.num = Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset]
        }
        function QRRSBlock(totalCount, dataCount) {
            this.totalCount = totalCount;
            this.dataCount  = dataCount;
        }
        function QRBitBuffer() {
            this.buffer = [];
            this.length = 0
        }
        QR8bitByte.prototype = {
            getLength: function() {
                return this.data.length
            },
            write: function(buffer) {
                for (var i = 0; i < this.data.length; i++) buffer.put(this.data.charCodeAt(i), 8)
            }
        };
        QRCode.prototype = {
            addData: function(data) {
                this.dataList.push(new QR8bitByte(data));
                this.dataCache = null
            },
            isDark: function(row, col) {
                if (0 > row || this.moduleCount <= row || 0 > col || this.moduleCount <= col) throw Error(row + "," + col);
                return this.modules[row][col]
            },
            getModuleCount: function() {
                return this.moduleCount
            },
            make: function() {
                if (1 > this.typeNumber) {
                    for (var typeNumber = 1,
                             typeNumber = 1; 40 > typeNumber; typeNumber++) {
                        for (var data = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel), buffer = new QRBitBuffer, totalDataCount = 0, rsBlocks = 0; rsBlocks < data.length; rsBlocks++) totalDataCount += data[rsBlocks].dataCount;
                        for (i = 0; i < this.dataList.length; i++) data = this.dataList[i],
                            buffer.put(data.mode, 4),
                            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber)),
                            data.write(buffer);
                        if (buffer.getLengthInBits() <= 8 * totalDataCount) break
                    }
                    this.typeNumber = typeNumber
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function(test, maskPattern) {
                this.moduleCount = 4 * this.typeNumber + 17;
                this.modules = Array(this.moduleCount);
                for (var row = 0; row < this.moduleCount; row++) {
                    this.modules[row] = Array(this.moduleCount);
                    for (var col = 0; col < this.moduleCount; col++) this.modules[row][col] = null
                }
                this.setupPositionProbePattern(0, 0);
                this.setupPositionProbePattern(this.moduleCount - 7, 0);
                this.setupPositionProbePattern(0, this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(test, maskPattern);
                7 <= this.typeNumber && this.setupTypeNumber(test);
                null == this.dataCache && (this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
                this.mapData(this.dataCache, maskPattern)
            },
            setupPositionProbePattern: function(row, col) {
                for (var r = -1; 7 >= r; r++) if (! ( - 1 >= row + r || this.moduleCount <= row + r)) for (var b = -1; 7 >= b; b++) - 1 >= col + b || this.moduleCount <= col + b || (this.modules[row + r][col + b] = 0 <= r && 6 >= r && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == r || 6 == r) || 2 <= r && 4 >= r && 2 <= b && 4 >= b ? !0 : !1)
            },
            getBestMaskPattern: function() {
                for (var minLostPoint = 0,
                         pattern = 0,
                         i = 0; 8 > i; i++) {
                    this.makeImpl(!0, i);
                    var lostPoint = QRUtil.getLostPoint(this);
                    if (0 == i || minLostPoint > lostPoint) minLostPoint = lostPoint,
                        pattern = i
                }
                return pattern
            },
            createMovieClip: function(target_mc, instance_name, depth) {
                var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
                var cs = 1;
                this.make();
                for (var row = 0; row < this.modules.length; row++)
                    for (
                        var y = cs * row,
                            col = 0; col < this.modules[row].length; col++) {
                        var x = cs * col;
                        this.modules[row][col] && (qr_mc.beginFill(0, 100), qr_mc.moveTo(x, y), qr_mc.lineTo(x + cs, y), qr_mc.lineTo(x + cs, y + cs), qr_mc.lineTo(x, y + cs), qr_mc.endFill())
                    }
                return qr_mc
            },
            setupTimingPattern: function() {
                for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
                for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
            },
            setupPositionAdjustPattern: function() {
                for (var pos = QRUtil.getPatternPosition(this.typeNumber), c = 0; c < pos.length; c++) for (var d = 0; d < pos.length; d++) {
                    var row = pos[c],
                        col = pos[d];
                    if (null == this.modules[row][col]) for (var f = -2; 2 >= f; f++) for (var i = -2; 2 >= i; i++) this.modules[row + f][col + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
                }
            },
            setupTypeNumber: function(test) {
                for (var bits = QRUtil.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
                    var mod = !test && 1 == (bits >> d & 1);
                    this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = mod
                }
                for (d = 0; 18 > d; d++) mod = !test && 1 == (bits >> d & 1),
                    this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = mod
            },
            setupTypeInfo: function(test, maskPattern) {
                for (var data = QRUtil.getBCHTypeInfo(this.errorCorrectLevel << 3 | maskPattern), i = 0; 15 > i; i++) {
                    var mod = !test && 1 == (data >> i & 1);
                    6 > i ? this.modules[i][8] = mod: 8 > i ? this.modules[i + 1][8] = mod: this.modules[this.moduleCount - 15 + i][8] = mod
                }
                for (i = 0; 15 > i; i++) mod = !test && 1 == (data >> i & 1),
                    8 > i ? this.modules[8][this.moduleCount - i - 1] = mod: 9 > i ? this.modules[8][15 - i - 1 + 1] = mod: this.modules[8][15 - i - 1] = mod;
                this.modules[this.moduleCount - 8][8] = !test
            },
            mapData: function(data, maskPattern) {
                for (var inc = -1,
                         row = this.moduleCount - 1,
                         bitIndex = 7,
                         byteIndex = 0,
                         col = this.moduleCount - 1; 0 < col; col -= 2) for (6 == col && col--;;) {
                    for (var g = 0; 2 > g; g++) if (null == this.modules[row][col - g]) {
                        var dark = !1;
                        byteIndex < data.length && (dark = 1 == (data[byteIndex] >>> bitIndex & 1));
                        QRUtil.getMask(maskPattern, row, col - g) && (dark = !dark);
                        this.modules[row][col - g] = dark;
                        bitIndex--; - 1 == bitIndex && (byteIndex++, bitIndex = 7)
                    }
                    row += inc;
                    if (0 > row || this.moduleCount <= row) {
                        row -= inc;
                        inc = -inc;
                        break
                    }
                }
            }
        };
        QRCode.PAD0 = 236;
        QRCode.PAD1 = 17;
        QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
            for (var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel), buffer = new QRBitBuffer, e = 0; e < dataList.length; e++) {
                var data = dataList[e];
                buffer.put(data.mode, 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
                data.write(buffer)
            }
            for (e = typeNumber = 0; e < rsBlocks.length; e++) typeNumber += rsBlocks[e].dataCount;
            if (buffer.getLengthInBits() > 8 * typeNumber) throw Error("code length overflow. (" + buffer.getLengthInBits() + ">" + 8 * typeNumber + ")");
            for (buffer.getLengthInBits() + 4 <= 8 * typeNumber && buffer.put(0, 4); 0 != buffer.getLengthInBits() % 8;) buffer.putBit(!1);
            for (; ! (buffer.getLengthInBits() >= 8 * typeNumber);) {
                buffer.put(QRCode.PAD0, 8);
                if (buffer.getLengthInBits() >= 8 * typeNumber) break;
                buffer.put(QRCode.PAD1, 8)
            }
            return QRCode.createBytes(buffer, rsBlocks)
        };
        QRCode.createBytes = function(buffer, rsBlocks) {
            for (var offset = 0,
                     maxDcCount = 0,
                     maxEcCount = 0,
                     dcdata = Array(rsBlocks.length),
                     ecdata = Array(rsBlocks.length),
                     g = 0; g < rsBlocks.length; g++) {
                var dcCount = rsBlocks[g].dataCount,
                    ecCount = rsBlocks[g].totalCount - dcCount,
                    maxDcCount = Math.max(maxDcCount, dcCount),
                    maxEcCount = Math.max(maxEcCount, ecCount);
                dcdata[g] = Array(dcCount);
                for (var rsPoly = 0; rsPoly < dcdata[g].length; rsPoly++) dcdata[g][rsPoly] = 255 & buffer.buffer[rsPoly + offset];
                offset += dcCount;
                rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                dcCount = (new QRPolynomial(dcdata[g], rsPoly.getLength() - 1)).mod(rsPoly);
                ecdata[g] = Array(rsPoly.getLength() - 1);
                for (rsPoly = 0; rsPoly < ecdata[g].length; rsPoly++) ecCount = rsPoly + dcCount.getLength() - ecdata[g].length,
                    ecdata[g][rsPoly] = 0 <= ecCount ? dcCount.get(ecCount) : 0
            }
            for (rsPoly = g = 0; rsPoly < rsBlocks.length; rsPoly++) g += rsBlocks[rsPoly].totalCount;
            offset = Array(g);
            for (rsPoly = dcCount = 0; rsPoly < maxDcCount; rsPoly++) for (g = 0; g < rsBlocks.length; g++) rsPoly < dcdata[g].length && (offset[dcCount++] = dcdata[g][rsPoly]);
            for (rsPoly = 0; rsPoly < maxEcCount; rsPoly++) for (g = 0; g < rsBlocks.length; g++) rsPoly < ecdata[g].length && (offset[dcCount++] = ecdata[g][rsPoly]);
            return offset
        };
        QRMode = 4;
        for (var QRUtil = {
                PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                G15: 1335,
                G18: 7973,
                G15_MASK: 21522,
                getBCHTypeInfo: function(data) {
                    for (var c = data << 10; 0 <= QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G15);) c ^= QRUtil.G15 << QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G15);
                    return (data << 10 | c) ^ QRUtil.G15_MASK
                },
                getBCHTypeNumber: function(data) {
                    for (var c = data << 12; 0 <= QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G18);) c ^= QRUtil.G18 << QRUtil.getBCHDigit(c) - QRUtil.getBCHDigit(QRUtil.G18);
                    return data << 12 | c
                },
                getBCHDigit: function(data) {
                    for (var digit = 0; 0 != data;) digit++,
                        data >>>= 1;
                    return digit
                },
                getPatternPosition: function(typeNumber) {
                    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1]
                },
                getMask: function(maskPattern, c, d) {
                    switch (maskPattern) {
                        case 0:
                            return 0 == (c + d) % 2;
                        case 1:
                            return 0 == c % 2;
                        case 2:
                            return 0 == d % 3;
                        case 3:
                            return 0 == (c + d) % 3;
                        case 4:
                            return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
                        case 5:
                            return 0 == c * d % 2 + c * d % 3;
                        case 6:
                            return 0 == (c * d % 2 + c * d % 3) % 2;
                        case 7:
                            return 0 == (c * d % 3 + (c + d) % 2) % 2;
                        default:
                            throw Error("bad maskPattern:" + maskPattern);
                    }
                },
                getErrorCorrectPolynomial: function(errorCorrectLength) {
                    for (var c = new QRPolynomial([1], 0), d = 0; d < errorCorrectLength; d++) c = c.multiply(new QRPolynomial([1, QRMath.gexp(d)], 0));
                    return c
                },
                getLengthInBits: function(mode, type) {
                    if (1 <= type && 10 > type) switch (mode) {
                        case 1:
                            return 10;
                        case 2:
                            return 9;
                        case 4:
                            return 8;
                        case 8:
                            return 8;
                        default:
                            throw Error("mode:" + mode);
                    } else if (27 > type) switch (mode) {
                        case 1:
                            return 12;
                        case 2:
                            return 11;
                        case 4:
                            return 16;
                        case 8:
                            return 10;
                        default:
                            throw Error("mode:" + mode);
                    } else if (41 > type) switch (mode) {
                        case 1:
                            return 14;
                        case 2:
                            return 13;
                        case 4:
                            return 16;
                        case 8:
                            return 12;
                        default:
                            throw Error("mode:" + mode);
                    } else throw Error("type:" + type);
                },
                getLostPoint: function(qrCode) {
                    for (var moduleCount = qrCode.getModuleCount(), d = 0, b = 0; b < moduleCount; b++) for (var e = 0; e < moduleCount; e++) {
                        for (var f = 0,
                                 i = qrCode.isDark(b, e), g = -1; 1 >= g; g++) if (! (0 > b + g || moduleCount <= b + g)) for (var h = -1; 1 >= h; h++) 0 > e + h || moduleCount <= e + h || 0 == g && 0 == h || i == qrCode.isDark(b + g, e + h) && f++;
                        5 < f && (d += 3 + f - 5)
                    }
                    for (b = 0; b < moduleCount - 1; b++) for (e = 0; e < moduleCount - 1; e++) if (f = 0, qrCode.isDark(b, e) && f++, qrCode.isDark(b + 1, e) && f++, qrCode.isDark(b, e + 1) && f++, qrCode.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) d += 3;
                    for (b = 0; b < moduleCount; b++) for (e = 0; e < moduleCount - 6; e++) qrCode.isDark(b, e) && !qrCode.isDark(b, e + 1) && qrCode.isDark(b, e + 2) && qrCode.isDark(b, e + 3) && qrCode.isDark(b, e + 4) && !qrCode.isDark(b, e + 5) && qrCode.isDark(b, e + 6) && (d += 40);
                    for (e = 0; e < moduleCount; e++) for (b = 0; b < moduleCount - 6; b++) qrCode.isDark(b, e) && !qrCode.isDark(b + 1, e) && qrCode.isDark(b + 2, e) && qrCode.isDark(b + 3, e) && qrCode.isDark(b + 4, e) && !qrCode.isDark(b + 5, e) && qrCode.isDark(b + 6, e) && (d += 40);
                    for (e = f = 0; e < moduleCount; e++) for (b = 0; b < moduleCount; b++) qrCode.isDark(b, e) && f++;
                    qrCode = Math.abs(100 * f / moduleCount / moduleCount - 50) / 5;
                    return d + 10 * qrCode
                }
            },
                 QRMath = {
                     glog: function(n) {
                         if (1 > n) throw Error("glog(" + n + ")");
                         return QRMath.LOG_TABLE[n]
                     },
                     gexp: function(n) {
                         for (; 0 > n;) n += 255;
                         for (; 256 <= n;) n -= 255;
                         return QRMath.EXP_TABLE[n]
                     },
                     EXP_TABLE: Array(256),
                     LOG_TABLE: Array(256)
                 },
                 m = 0; 8 > m; m++) QRMath.EXP_TABLE[m] = 1 << m;
        for (m = 8; 256 > m; m++) QRMath.EXP_TABLE[m] = QRMath.EXP_TABLE[m - 4] ^ QRMath.EXP_TABLE[m - 5] ^ QRMath.EXP_TABLE[m - 6] ^ QRMath.EXP_TABLE[m - 8];
        for (m = 0; 255 > m; m++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[m]] = m;
        QRPolynomial.prototype = {
            get: function(index) {
                return this.num[index]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(a) {
                for (var num = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++) for (var b = 0; b < a.getLength(); b++) num[d + b] ^= QRMath.gexp(QRMath.glog(this.get(d)) + QRMath.glog(a.get(b)));
                return new QRPolynomial(num, 0)
            },
            mod: function(a) {
                if (0 > this.getLength() - a.getLength()) return this;
                for (var c = QRMath.glog(this.get(0)) - QRMath.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++) d[b] = this.get(b);
                for (b = 0; b < a.getLength(); b++) d[b] ^= QRMath.gexp(QRMath.glog(a.get(b)) + c);
                return (new QRPolynomial(d, 0)).mod(a)
            }
        };
        QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
        QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
            var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
            if (void 0 == rsBlock) throw Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
            for (var length = rsBlock.length / 3,
                     list = [], f = 0; f < length; f++) for (var h = rsBlock[3 * f + 0], g = rsBlock[3 * f + 1], QRUtil = rsBlock[3 * f + 2], QRMath = 0; QRMath < h; QRMath++) list.push(new QRRSBlock(g, QRUtil));
            return list
        };
        QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
            switch (errorCorrectLevel) {
                case 1:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 0];
                case 0:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 1];
                case 3:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 2];
                case 2:
                    return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 3]
            }
        };
        QRBitBuffer.prototype = {
            get: function(index) {
                return 1 == (this.buffer[Math.floor(index / 8)] >>> 7 - index % 8 & 1)
            },
            put: function(num, length) {
                for (var d = 0; d < length; d++) this.putBit(1 == (num >>> length - d - 1 & 1))
            },
            getLengthInBits: function() {
                return this.length
            },
            putBit: function(bit) {
                var bufIndex = Math.floor(this.length / 8);
                this.buffer.length <= bufIndex && this.buffer.push(0);
                bit && (this.buffer[bufIndex] |= 128 >>> this.length % 8);
                this.length++
            }
        };
        "string" === typeof options && (options = {
            text: options
        });
        options = $.extend({},
            {
                width: 256,
                height: 256,
                typeNumber: -1,
                correctLevel: 2,
                background: "#ffffff",
                foreground: "#000000"
            },
            options);
        return this.each(function() {
            var element;
            element = new QRCode(options.typeNumber, options.correctLevel);
            element.addData(options.text);
            element.make();
            var createCanvas = document.createElement("canvas");
            var img_url = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5MzhGOTQyNTVCNTExRThCRDUxQ0NDNUUwRkQzODNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5MzhGOTQzNTVCNTExRThCRDUxQ0NDNUUwRkQzODNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDkzOEY5NDA1NUI1MTFFOEJENTFDQ0M1RTBGRDM4M0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDkzOEY5NDE1NUI1MTFFOEJENTFDQ0M1RTBGRDM4M0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAAAQABAAACAkQBADs=";
            createCanvas.width = options.width;
            createCanvas.height = options.height;
            for (var ctx = createCanvas.getContext("2d"), tileW = options.width / element.getModuleCount(), tileH = options.height / element.getModuleCount(), row = 0; row < element.getModuleCount(); row++) for (var i = 0; i < element.getModuleCount(); i++) {
                ctx.fillStyle = element.isDark(row, i) ? options.foreground: options.background;
                var g = Math.ceil((i + 1) * tileW) - Math.floor(i * tileW),
                    QRUtil = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                ctx.fillRect(Math.round(i * tileW), Math.round(row * tileH), g, QRUtil)
            }
            element = createCanvas;
            $(element).appendTo(this);
            AKjs_UserAgent();
            if (IsMobile) {
                $(this).addClass("rel ovh");
                $("<img src='"+img_url+"' class='dis_block left_0 top_0 zindex_2 abs wh_100' />").appendTo(this);
            }
            var resize = this;
            $(window).resize(function(){
                if (IsMobile == null) {
                    $(resize).removeClass("rel ovh");
                    $(resize).find("img").remove();
                } else {
                    $(resize).addClass("rel ovh");
                    if ($(resize).find("img").length < 1) {
                        $("<img src='"+img_url+"' class='dis_block left_0 top_0 zindex_2 abs wh_100' />").appendTo(resize);
                    }
                }
            });
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Radio (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Radio = function(settings) {
        var _defaults = {
            boxSize: "2.6rem",
            checkedClass: "bor_theme border8",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        if (!this.parent("label").hasClass("ak-Radio")) {
            this.wrap("<label />")
        }
        var radios = this.parent("label");
        radios.addClass("ak-Radio");
        AKjs_UserAgent();
        if (!IsMobile) {
            if (options.boxSize) {
                radios.css({
                    "width": options.boxSize,
                    "height": options.boxSize,
                    "line-height": options.boxSize
                })
            }
            radios.addClass("rel text_al_c dis_inbl_im fn");
        } else {
            radios.addClass("bor_none bor_rad_0");
            radios.removeClass("rel text_al_c").removeAttr("style")
        }
        $(window).resize(function() {
            if (!IsMobile) {
                if (options.boxSize) {
                    radios.css({
                        "width": options.boxSize,
                        "height": options.boxSize,
                        "line-height": options.boxSize
                    })
                }
                radios.addClass("rel text_al_c dis_inbl_im fn");
            } else {
                radios.addClass("bor_none bor_rad_0");
                radios.removeClass("rel text_al_c").removeAttr("style")
            }
        });
        radios.attr("data-name", this.attr("name"));
        radios.each(function() {
            var $radio = $(this);
            var _name = $(this).data("name");
            if ($radio.find('input[type="radio"]').is(":checked")) {
                var $otherRadios = radios.filter("[data-name='" + _name + "']").not($radio);
                $radio.addClass(options.checkedClass);
                $otherRadios.removeClass(options.checkedClass);
                $otherRadios.find('input[type="radio"]').removeAttr("checked")
            }
            $radio.unbind();
            $radio.on("change",
                function() {
                    if (!$(this).hasClass(options.checkedClass)) {
                        $(this).addClass(options.checkedClass);
                        $(this).children('input[type="radio"]').attr("checked", "checked");
                        radios.filter("[data-name='" + _name + "']").not($(this)).removeClass(options.checkedClass);
                        radios.filter("[data-name='" + _name + "']").not($(this)).children('input[type="radio"]').removeAttr("checked")
                    }
                    options.onChange($(this).children())
                })
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Range (2018-12-13)--------------------------------------------*/
(function($) {
    var AKjs_Range = function() {
        return this.init.apply(this, arguments)
    };
    AKjs_Range.prototype = {
        defaults: {
            onstatechange: function() {},
            isRange: false,
            showLabels: true,
            showScale: true,
            step: 1,
            format: "%s",
            width: "90%",
            ProgClass: "",
            disable: false
        },
        template: '<div class="ak-range">' +
            '   <ul>' +
            '       <li class="ak-SelectedBar"></li>' +
            '       <li class="ak-Pointer low"></li>' +
            '       <li class="ak-label"></li>' +
            '       <li class="ak-Pointer high"></li>' +
            '       <li class="ak-label"></li>' +
            '       <li class="ak-Clickable"></li>' +
            '   </ul>' +
            '   <div class="ak-scale"></div>' +
            '</div>',
        init: function(node, options) {
            this.options = $.extend({},
                this.defaults, options);
            this.inputNode = $(node);
            this.options.value = this.inputNode.prop("defaultValue") || (this.options.isRange ? this.options.from + "," + this.options.from: this.options.from);
            this.domNode = $(this.template);
            this.inputNode.after(this.domNode);
            this.domNode.on("change", this.onChange);
            this.pointers = $(".ak-Pointer", this.domNode);
            this.lowPointer = this.pointers.first();
            this.highPointer = this.pointers.last();
            this.labels = $(".ak-label", this.domNode);
            this.lowLabel = this.labels.first();
            this.highLabel = this.labels.last();
            this.scale = $(".ak-scale", this.domNode);
            this.bar = $(".ak-SelectedBar", this.domNode);
            this.clickableBar = this.domNode.find(".ak-Clickable");
            this.interval = this.options.to - this.options.from;
            this.render();
        },
        render: function() {
            if (this.inputNode.prop("disabled")) {
                this.domNode.addClass("ak-readonly");
                this.options.disable = true;
                this.isReadonly();
            } else {
                this.options.disable = false;
                this.isReadonly();
            }
            if (this.inputNode.width() === 0 && !this.options.width) {
                console.log("AKjs_Range : no width found, returning");
                return
            } else {
                this.domNode.width(this.options.width || this.inputNode.width());
                this.inputNode.hide()
            }
            if (this.isSingle()) {
                this.lowPointer.hide();
                this.lowLabel.hide()
            }
            if (!this.options.showLabels) {
                this.labels.hide()
            }
            this.attachEvents();
            if (this.options.showScale) {
                this.renderScale()
            }
            this.setValue(this.options.value);
            this.bar.addClass(this.options.ProgClass);
        },
        isSingle: function() {
            if (typeof(this.options.value) === "number") {
                return true
            }
            return (this.options.value.indexOf(",") !== -1 || this.options.isRange) ? false: true
        },
        attachEvents: function() {
            this.clickableBar.click($.proxy(this.barClicked, this));
            this.pointers.on("mousedown touchstart", $.proxy(this.onDragStart, this));
            this.pointers.bind("dragstart",
                function(event) {
                    event.preventDefault()
                })
        },
        onDragStart: function(e) {
            if (this.options.disable || (e.type === "mousedown" && e.which !== 1)) {
                return
            }
            e.stopPropagation();
            e.preventDefault();
            var pointer = $(e.target);
            this.pointers.removeClass("zindex_3");
            pointer.addClass("ak-Focused zindex_3");
            this[(pointer.hasClass("low") ? "low": "high") + "Label"].addClass("ak-Focused");
            $(document).on("mousemove.ak-RangeSlider touchmove.ak-RangeSlider", $.proxy(this.onDrag, this, pointer));
            $(document).on("mouseup.ak-RangeSlider touchend.ak-RangeSlider touchcancel.ak-RangeSlider", $.proxy(this.onDragEnd, this))
        },
        onDrag: function(pointer, e) {
            e.stopPropagation();
            e.preventDefault();
            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                e = e.originalEvent.touches[0]
            } else {
                if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                    e = e.originalEvent.changedTouches[0]
                }
            }
            var position = e.clientX - this.domNode.offset().left;
            this.domNode.trigger("change", [this, pointer, position])
        },
        onDragEnd: function(e) {
            this.pointers.removeClass("ak-Focused");
            this.labels.removeClass("ak-Focused");
            $(document).off(".ak-RangeSlider")
        },
        barClicked: function(e) {
            if (this.options.disable) {
                return
            }
            var x = e.pageX - this.clickableBar.offset().left;
            if (this.isSingle()) {
                this.setPosition(this.pointers.last(), x, true, true)
            } else {
                var pointer = Math.abs(parseInt(this.pointers.first().css("left"), 10) - x + this.pointers.first().width() / 2) < Math.abs(parseInt(this.pointers.last().css("left"), 10) - x + this.pointers.first().width() / 2) ? this.pointers.first() : this.pointers.last();
                this.setPosition(pointer, x, true, true)
            }
        },
        onChange: function(e, self, pointer, position) {
            var min, max;
            if (self.isSingle()) {
                min = 0;
                max = self.domNode.width()
            } else {
                min = pointer.hasClass("high") ? self.lowPointer.position().left + self.lowPointer.width() / 2 : 0;
                max = pointer.hasClass("low") ? self.highPointer.position().left + self.highPointer.width() / 2 : self.domNode.width()
            }
            var value = Math.min(Math.max(position, min), max);
            self.setPosition(pointer, value, true)
        },
        setPosition: function(pointer, position, isPx, animate) {
            var leftPos, lowPos = this.lowPointer.position().left,
                highPos = this.highPointer.position().left,
                circleWidth = this.highPointer.width() / 2;
            if (!isPx) {
                position = this.prcToPx(position)
            }
            if (pointer[0] === this.highPointer[0]) {
                highPos = Math.round(position - circleWidth)
            } else {
                lowPos = Math.round(position - circleWidth)
            }
            pointer[animate ? "animate": "css"]({
                "left": Math.round(position - circleWidth)
            });
            if (this.isSingle()) {
                leftPos = 0
            } else {
                leftPos = lowPos + circleWidth
            }
            this.bar[animate ? "animate": "css"]({
                "width": Math.round(highPos + circleWidth - leftPos),
                "left": leftPos
            });
            this.showPointerValue(pointer, position, animate);
            this.isReadonly()
        },
        setValue: function(value) {
            var values = value.toString().split(",");
            this.options.value = value;
            var prc = this.valuesToPrc(values.length === 2 ? values: [0, values[0]]);
            if (this.isSingle()) {
                this.setPosition(this.highPointer, prc[1])
            } else {
                this.setPosition(this.lowPointer, prc[0]);
                this.setPosition(this.highPointer, prc[1])
            }
        },
        renderScale: function() {
            var s = this.options.scale || [this.options.from, this.options.to];
            var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
            var str = "";
            for (var i = 0; i < s.length; i++) {
                str += '<span style="left: ' + i * prc + '%">' + (s[i] != "|" ? "<ins>" + s[i] + "</ins>": "") + "</span>"
            }
            this.scale.html(str);
            $("ins", this.scale).each(function() {
                $(this).css({
                    marginLeft: -$(this).outerWidth() / 2
                })
            })
        },
        getBarWidth: function() {
            var values = this.options.value.split(",");
            if (values.length > 1) {
                return parseInt(values[1], 10) - parseInt(values[0], 10)
            } else {
                return parseInt(values[0], 10)
            }
        },
        showPointerValue: function(pointer, position, animate) {
            var label = $(".ak-label", this.domNode)[pointer.hasClass("low") ? "first": "last"]();
            var text;
            var value = this.positionToValue(position);
            if ($.isFunction(this.options.format)) {
                var type = this.isSingle() ? undefined: (pointer.hasClass("low") ? "low": "high");
                text = this.options.format(value, type)
            } else {
                text = this.options.format.replace("%s", value)
            }
            var width = label.html(text).width(),
                left = position - width / 2;
            left = Math.min(Math.max(left, 0), this.domNode.width() - width);
            label[animate ? "animate": "css"]({
                left: left - label.width()/4
            });
            this.setInputValue(pointer, value)
        },
        valuesToPrc: function(values) {
            var lowPrc = ((values[0] - this.options.from) * 100 / this.interval),
                highPrc = ((values[1] - this.options.from) * 100 / this.interval);
            return [lowPrc, highPrc]
        },
        prcToPx: function(prc) {
            return (this.domNode.width() * prc) / 100
        },
        positionToValue: function(pos) {
            var value = (pos / this.domNode.width()) * this.interval;
            value = value + this.options.from;
            return Math.round(value / this.options.step) * this.options.step
        },
        setInputValue: function(pointer, v) {
            if (this.isSingle()) {
                this.options.value = v.toString()
            } else {
                var values = this.options.value.split(",");
                if (pointer.hasClass("low")) {
                    this.options.value = v + "," + values[1]
                } else {
                    this.options.value = values[0] + "," + v
                }
            }
            if (this.inputNode.val() !== this.options.value) {
                this.inputNode.val(this.options.value);
                this.options.onstatechange(this, this.options.value)
            }
        },
        getValue: function() {
            return this.options.value
        },
        isReadonly: function() {
            this.domNode.toggleClass("ak-readonly", this.options.disable)
        },
        disable: function() {
            this.options.disable = true;
            this.isReadonly()
        },
        enable: function() {
            this.options.disable = false;
            this.isReadonly()
        },
        toggleDisable: function() {
            this.options.disable = !this.options.disable;
            this.isReadonly()
        }
    };
    var pluginName = "AKjs_Range";
    $.fn[pluginName] = function(option) {
        var args = arguments,
            result;
        var range = this;
        setTimeout(function() {
                range.each(function() {
                    var $this = $(this),
                        data = $.data(this, "plugin_" + pluginName),
                        options = typeof option === "object" && option;
                    if (!data) {
                        $this.data("plugin_" + pluginName, (data = new AKjs_Range(this, options)));
                        $(window).resize(function() {
                            data.setValue(data.getValue())
                        })
                    }
                    if (typeof option === "string") {
                        result = data[option].apply(data, Array.prototype.slice.call(args, 1))
                    }
                    if (typeof option === 'number') {
                        data.setValue(option);
                    }
                })
            },
            500);
        return result || this
    };
} (jQuery));

/*-----------------------------------------------AKjs_Ratyli (2018-12-13)--------------------------------------------*/
(function($) {
    $.AKjs_Ratyli = function(el, options) {
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("AKjs_Ratyli", base);
        base.init = function() {
            base.options = $.extend({},
                $.AKjs_Ratyli.defaultOptions, options);
            base.options = $.extend({},
                base.options, base.$el.data());
            base.set(base.options.rate, true);
            base.$el.on("click", "> *",
                function(e) {
                    if (!base.options.disable) {
                        var target = e.target;
                        if (target.tagName != "span") {
                            target = target.parentNode
                        }
                        base.options.onSignClick.call(base, target);
                        var val = $(target).prevAll().length + 1;
                        base.set(val)
                    }
                });
            base.$el.on("mouseenter", "> *",
                function(e) {
                    var target = e.target;
                    if (target.tagName != "span") {
                        target = target.parentNode
                    }
                    if (!base.options.disable) {
                        $(target).addClass("rate-active");
                        $(target).prevAll().addClass("rate-active")
                    }
                    base.options.onSignEnter.apply(null, [base.options.rate, target])
                });
            base.$el.on("mouseleave", "> *",
                function(e) {
                    var target = e.target;
                    if (target.tagName != "span") {
                        target = target.parentNode
                    }
                    if (!base.options.disable) {
                        $(target).removeClass("rate-active");
                        $(target).prevAll().removeClass("rate-active")
                    }
                    base.options.onSignLeave.apply(null, [base.options.rate, target])
                })
        };
        base.set = function(val, init) {
            if (val < 0 || (val % 1 != 0) || val > base.options.ratemax) {
                val = 0
            }
            if (val == 1 && base.options.rate == 1 && base.options.unrateable == true && !init) {
                val = 0
            }
            base.options.rate = val;
            base.$el.html("");
            if (base.options.rate != 0) {
                base.$el.attr("data-rate", base.options.rate)
            }
            base.$el.attr("data-ratemax", base.options.ratemax);
            var i = 0;
            while (i < base.options.ratemax) {
                var tmp = "";
                if (i < base.options.rate) {
                    tmp = base.signTemplate("full")
                } else {
                    tmp = base.signTemplate("empty")
                }
                base.$el.append(tmp);
                i++
            }
            if (!init && !base.options.disable) {
                base.$el.attr("data-rate", val)
            }
            base.options.onRated.call(base, val, init);
            return base.options.rate
        };
        base.signTemplate = function(type) {
            return "<span>" + base.options[type] + "</span>"
        };
        base.init()
    };
    $.AKjs_Ratyli.defaultOptions = {
        disable: false,
        unrateable: false,
        full: "",
        empty: "",
        rate: 0,
        ratemax: 5,
        onSignEnter: function() {},
        onSignLeave: function() {},
        onSignClick: function() {},
        onRated: function() {}
    };
    $.fn.AKjs_Ratyli = function(options) {
        return this.each(function() { (new $.AKjs_Ratyli(this, options))
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_ReadMore (2018-12-13)--------------------------------------------*/
(function($) {
    var readmore = 'AKjs_ReadMore',
        defaults = {
            speed: 100,
            maxHeight: 200,
            heightMargin: 16,
            moreLink: '',
            lessLink: '',
            startOpen: false,
            beforeToggle: function(){},
            afterToggle: function(){}
        };
    function Readmore( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        $(this.element).data('max-height', this.options.maxHeight);
        $(this.element).data('height-margin', this.options.heightMargin);
        delete(this.options.maxHeight);
        this.init();
    }
    Readmore.prototype = {
        init: function() {
            var $this = this;
            $(this.element).each(function() {
                var current = $(this),
                    maxHeight = (current.css('max-height').replace(/[^-\d\.]/g, '') > current.data('max-height')) ? current.css('max-height').replace(/[^-\d\.]/g, '') : current.data('max-height'),
                    heightMargin = current.data('height-margin');
                if(current.css('max-height') != 'none') {
                    current.css('max-height', 'none');
                }
                $this.setBoxHeight(current);
                if(current.outerHeight(true) <= maxHeight + heightMargin) {
                    return true;
                }
                else {
                    current.data('collapsedHeight', maxHeight);
                    var useLink = $this.options.startOpen ? $this.options.lessLink : $this.options.moreLink;
                    current.after($(useLink).on('click', function(event) {
                        $this.toggleSlider(this, current, event)
                    }));
                    if(!$this.options.startOpen) {
                        current.css({
                            height: maxHeight,
                            display: "block"
                        });
                        current.removeClass("dis_none_im").removeClass("dis_none");
                    }
                }
            });
        },
        toggleSlider: function(trigger, element, event) {
            event.preventDefault();
            var $this = this,
                newHeight = newLink = sectionClass = '',
                expanded = false,
                collapsedHeight = $(element).data('collapsedHeight');

            if ($(element).height() <= collapsedHeight + $(trigger).height()) {
                newHeight = $(element).data('expandedHeight');
                newLink = 'lessLink';
                expanded = true;
            }
            else {
                newHeight = collapsedHeight;
                newLink = 'moreLink';
                expanded = false;
            }
            $this.options.beforeToggle(trigger, element, expanded);
            $(element).animate({
                'height': newHeight
            }, {duration: $this.options.speed, complete: function() {
                    $this.options.afterToggle(trigger, element, expanded);
                    $(trigger).replaceWith($($this.options[newLink]).on('click', function(event) {
                        $this.toggleSlider(this, element, event)
                    }));
                }
            });
        },

        setBoxHeight: function(element) {
            var el = element.clone().css({
                    'height': 'auto',
                    'width': element.width(),
                    'overflow': 'hidden'
                }).insertAfter(element),
                height = el.outerHeight();
            el.remove();
            element.data('expandedHeight', height);
        }
    };

    $.fn[readmore] = function( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                $.data(this, 'plugin_' + readmore, new Readmore( this, options ));
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + readmore);
                if (instance instanceof Readmore && typeof instance[options] === 'function') {
                    instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Select (2018-12-13)--------------------------------------------*/
(function($) {
    window.AKjs_Select = (function() {
        function getClass(dom, string) {
            return dom.getElementsByClassName(string)
        }
        function AKjs_Select(config) {
            this.AKjs_Select;
            this.wheelsData = config.wheels;
            this.jsonType = false;
            this.jsonData = [];
            this.checkDataType();
            this.renderWheels(this.wheelsData);
            this.displayJson = [];
            this.cascade = false;
            this.startY;
            this.moveEndY;
            this.moveY;
            this.oldMoveY;
            this.offset = 0;
            this.offsetSum = 0;
            this.oversizeBorder;
            this.curDistance = [];
            this.clickStatus = false;
            this.init(config)
        }
        AKjs_Select.prototype = {
            constructor: AKjs_Select,
            init: function(config) {
                var _this = this;
                _this.trigger = document.querySelector(config.trigger);
                if (_this.trigger == undefined || _this.trigger == null || _this.trigger == "") {
                    return
                }
                $(function() {
                    $("body").append(_this.AKjs_Select)
                });
                document.activeElement.blur();
                _this.wheel = getClass(_this.AKjs_Select, "wheel");
                _this.slider = getClass(_this.AKjs_Select, "selectContainer");
                _this.wheels = _this.AKjs_Select.querySelector(".wheels");
                _this.ensureBtn = _this.AKjs_Select.querySelector(".ensure");
                _this.closeBtn = _this.AKjs_Select.querySelector(".cancel");
                _this.grayLayer = _this.AKjs_Select.querySelector(".ak-mask");
                _this.popUp = _this.AKjs_Select.querySelector(".content");
                _this.callback = config.callback ? config.callback: function() {};
                _this.transitionEnd = config.transitionEnd ? config.transitionEnd: function() {};
                _this.initPosition = config.position ? config.position: [];
                $(function() {
                    _this.liHeight = _this.AKjs_Select.querySelector("li").offsetHeight;
                    _this.setCurDistance(_this.initPosition)
                });
                $(window).resize(function() {
                    _this.liHeight = _this.AKjs_Select.querySelector("li").offsetHeight;
                    _this.setCurDistance(_this.initPosition)
                });
                $(_this.grayLayer).bind({
                    touchmove: function(e) {
                        e.preventDefault()
                    }
                });
                _this.titleText = config.title ? config.title: "";
                _this.button_ensure = config.ensure ? config.ensure: "";
                _this.button_cancel = config.cancel ? config.cancel: "";
                _this.setTitle(_this.titleText);
                _this.setEnsure(_this.button_ensure);
                _this.setCancel(_this.button_cancel);
                _this.checkCascade();
                if (_this.cascade) {
                    _this.initCascade()
                }
                if (_this.initPosition.length == 0) {
                    for (var i = 0; i < _this.slider.length; i++) {
                        _this.initPosition.push(0)
                    }
                }
                _this.setCurDistance(_this.initPosition);
                _this.addListenerAll();
                _this.closeBtn.addEventListener("click",
                    function() {
                        $(_this.AKjs_Select).removeClass("ak-Select-show");
                        setTimeout(function() {
                                $(_this.grayLayer).addClass("dis_none_im");
                                $(_this.popUp).children().addClass("dis_opa_0")
                            },
                            500);
                        $("#ak-scrollview").addClass("scrolling_touch")
                    });
                _this.ensureBtn.addEventListener("click",
                    function() {
                        $(_this.AKjs_Select).removeClass("ak-Select-show");
                        setTimeout(function() {
                                $(_this.grayLayer).addClass("dis_none_im");
                                $(_this.popUp).children().addClass("dis_opa_0")
                            },
                            500);
                        $("#ak-scrollview").addClass("scrolling_touch");
                        var tempValue = "";
                        for (var i = 0; i < _this.wheel.length; i++) {
                            i == _this.wheel.length - 1 ? tempValue += _this.getValue(i) : tempValue += _this.getValue(i) + " "
                        }
                        $(_this.trigger).next("label").hide();
                        _this.trigger.value = tempValue;
                        _this.callback(_this.getJson(), _this.getIndexArr())
                    });
                $(_this.trigger).unbind("click");
                _this.trigger.addEventListener("click",
                    function() {
                        $(_this.grayLayer).removeClass("dis_none_im");
                        $(_this.AKjs_Select).addClass("ak-Select-show");
                        $("#ak-scrollview").removeClass("scrolling_touch");
                        if ($(_this.AKjs_Select).hasClass("ak-Select-show")) {
                            $(_this.popUp).children().removeClass("dis_opa_0")
                        }
                    });
                _this.grayLayer.addEventListener("click",
                    function() {
                        $(_this.AKjs_Select).removeClass("ak-Select-show");
                        setTimeout(function() {
                                $(_this.grayLayer).addClass("dis_none_im");
                                $(_this.popUp).children().addClass("dis_opa_0")
                            },
                            500);
                        $("#ak-scrollview").addClass("scrolling_touch")
                    });
                _this.popUp.addEventListener("click",
                    function(event) {
                        event.stopPropagation();
                        $("#ak-scrollview").addClass("scrolling_touch")
                    });
                _this.fixRowStyle()
            },
            setTitle: function(string) {
                var _this = this;
                _this.titleText = string;
                $(_this.AKjs_Select).find(".title").html(_this.titleText)
            },
            setEnsure: function(string) {
                var _this = this;
                _this.button_ensure = string;
                $(_this.AKjs_Select).find(".ensure").html(_this.button_ensure)
            },
            setCancel: function(string) {
                var _this = this;
                _this.button_cancel = string;
                $(_this.AKjs_Select).find(".cancel").html(_this.button_cancel)
            },
            renderWheels: function(wheelsData) {
                var _this = this;
                _this.AKjs_Select = document.createElement("div");
                $(_this.AKjs_Select).addClass("ak-Select");
                $(_this.AKjs_Select).html('<div id="select_mask" class="ak-mask dis_none_im"></div>' + '<div class="content">' + '<div class="panel dis_opa_0">' + '<div class="title c_theme"></div>' + '<div class="fixWidth">' + '<div class="wheels">' + "</div>" + '<div class="selectLine"></div>' + '<div class="shadowMask"></div>' + "</div>" + "</div>" + '<div class="btnBar dis_opa_0">' + '<div class="fixWidth">' + '<button type="button" class="cancel bg_white c_gray_777"></button>' + '<button type="button" class="ensure bg_white c_theme"></button>' + "</div>" + "</div>" + "</div>");
                var tempHTML = "";
                for (var i = 0; i < wheelsData.length; i++) {
                    tempHTML += '<div class="wheel"><ul class="selectContainer">';
                    if (_this.jsonType) {
                        for (var j = 0; j < wheelsData[i].data.length; j++) {
                            tempHTML += '<li data-id="' + wheelsData[i].data[j].id + '">' + wheelsData[i].data[j].value + "</li>"
                        }
                    } else {
                        for (var j = 0; j < wheelsData[i].data.length; j++) {
                            tempHTML += "<li>" + wheelsData[i].data[j] + "</li>"
                        }
                    }
                    tempHTML += "</ul></div>"
                }
                $(_this.AKjs_Select).find(".wheels").html(tempHTML)
            },
            addListenerAll: function() {
                var _this = this;
                for (var i = 0; i < _this.slider.length; i++) { (function(i) {
                    _this.addListenerWheel(_this.wheel[i], i);
                    _this.addListenerLi(i)
                })(i)
                }
            },
            addListenerWheel: function(theWheel, index, event) {
                var _this = this;
                theWheel.addEventListener("touchstart",
                    function() {
                        _this.touch(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("touchend",
                    function() {
                        _this.touch(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("touchmove",
                    function() {
                        _this.touch(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("mousedown",
                    function() {
                        _this.dragClick(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("mousemove",
                    function() {
                        _this.dragClick(event, this.firstChild, index)
                    },
                    false);
                theWheel.addEventListener("mouseup",
                    function() {
                        _this.dragClick(event, this.firstChild, index)
                    },
                    true)
            },
            addListenerLi: function(sliderIndex) {
                var _this = this;
                var curWheelLi = _this.slider[sliderIndex].getElementsByTagName("li");
                for (var j = 0; j < curWheelLi.length; j++) { (function(j) {
                    curWheelLi[j].addEventListener("click",
                        function() {
                            _this.singleClick(this, j, sliderIndex)
                        },
                        false)
                })(j)
                }
            },
            checkDataType: function() {
                var _this = this;
                if (typeof(_this.wheelsData[0].data[0]) == "object") {
                    _this.jsonType = true;
                    _this.jsonData = _this.wheelsData[0].data
                }
            },
            checkCascade: function() {
                var _this = this;
                if (_this.jsonType) {
                    var node = _this.wheelsData[0].data;
                    for (var i = 0; i < node.length; i++) {
                        if ("childs" in node[i] && node[i].childs.length > 0) {
                            _this.cascade = true;
                            break
                        }
                    }
                } else {
                    _this.cascade = false
                }
            },
            initCascade: function() {
                var _this = this;
                _this.displayJson.push(_this.generateArrData(_this.jsonData));
                _this.checkArrDeep(_this.jsonData[0]);
                _this.updateWheels()
            },
            generateArrData: function(targetArr) {
                var tempArr = [];
                for (var i = 0; i < targetArr.length; i++) {
                    tempArr.push({
                        "id": targetArr[i].id,
                        "value": targetArr[i].value
                    })
                }
                return tempArr
            },
            checkArrDeep: function(parent) {
                var _this = this;
                if ("childs" in parent && parent.childs.length > 0) {
                    _this.displayJson.push(_this.generateArrData(parent.childs));
                    _this.checkArrDeep(parent.childs[0])
                }
            },
            checkRange: function(index, posIndexArr) {
                var _this = this;
                var deleteNum = _this.displayJson.length - 1 - index;
                for (var i = 0; i < deleteNum; i++) {
                    _this.displayJson.pop()
                }
                var resultNode;
                for (var i = 0; i <= index; i++) {
                    if (i == 0) {
                        resultNode = _this.jsonData[posIndexArr[0]]
                    } else {
                        resultNode = resultNode.childs[posIndexArr[i]]
                    }
                }
                _this.checkArrDeep(resultNode);
                _this.updateWheels();
                _this.fixRowStyle();
                _this.setCurDistance(_this.resetPostion(index, posIndexArr))
            },
            resetPostion: function(index, posIndexArr) {
                var _this = this;
                var tempPosArr = posIndexArr;
                var tempCount;
                if (_this.slider.length > posIndexArr.length) {
                    tempCount = _this.slider.length - posIndexArr.length;
                    for (var i = 0; i < tempCount; i++) {
                        tempPosArr.push(0)
                    }
                } else {
                    if (_this.slider.length < posIndexArr.length) {
                        tempCount = posIndexArr.length - _this.slider.length;
                        for (var i = 0; i < tempCount; i++) {
                            tempPosArr.pop()
                        }
                    }
                }
                for (var i = index + 1; i < tempPosArr.length; i++) {
                    tempPosArr[i] = 0
                }
                return tempPosArr
            },
            updateWheels: function() {
                var _this = this;
                if (_this.wheel.length > _this.displayJson.length) {
                    var count = _this.wheel.length - _this.displayJson.length;
                    for (var i = 0; i < count; i++) {
                        _this.wheels.removeChild(_this.wheel[_this.wheel.length - 1])
                    }
                }
                for (var i = 0; i < _this.displayJson.length; i++) { (function(i) {
                    var tempHTML = "";
                    if (_this.wheel[i]) {
                        for (var j = 0; j < _this.displayJson[i].length; j++) {
                            tempHTML += '<li data-id="' + _this.displayJson[i][j].id + '">' + _this.displayJson[i][j].value + "</li>"
                        }
                        _this.slider[i].innerHTML = tempHTML
                    } else {
                        var tempWheel = document.createElement("div");
                        $(tempWheel).addClass("wheel");
                        tempHTML = '<ul class="selectContainer">';
                        for (var j = 0; j < _this.displayJson[i].length; j++) {
                            tempHTML += '<li data-id="' + _this.displayJson[i][j].id + '">' + _this.displayJson[i][j].value + "</li>"
                        }
                        tempHTML += "</ul>";
                        $(tempWheel).html(tempHTML);
                        _this.addListenerWheel(tempWheel, i);
                        _this.wheels.appendChild(tempWheel)
                    }
                    _this.addListenerLi(i)
                })(i)
                }
            },
            updateWheel: function(sliderIndex, data) {
                var _this = this;
                var tempHTML = "";
                for (var j = 0; j < data.length; j++) {
                    tempHTML += "<li>" + data[j] + "</li>"
                }
                _this.slider[sliderIndex].innerHTML = tempHTML;
                _this.addListenerLi(sliderIndex)
            },
            fixRowStyle: function() {
                var _this = this;
                var width = (100 / _this.wheel.length).toFixed(2);
                for (var i = 0; i < _this.wheel.length; i++) {
                    _this.wheel[i].style.width = width + "%"
                }
            },
            getIndex: function(distance) {
                return Math.round((2 * this.liHeight - distance) / this.liHeight)
            },
            getIndexArr: function() {
                var _this = this;
                var temp = [];
                for (var i = 0; i < _this.curDistance.length; i++) {
                    temp.push(_this.getIndex(_this.curDistance[i]))
                }
                return temp
            },
            getJson: function() {
                var _this = this;
                var temp = [];
                var positionArr = _this.getIndexArr();
                if (_this.cascade) {
                    for (var i = 0; i < _this.wheel.length; i++) {
                        temp.push(_this.displayJson[i][positionArr[i]])
                    }
                } else {
                    if (_this.jsonType) {
                        for (var i = 0; i < _this.curDistance.length; i++) {
                            temp.push(_this.wheelsData[i].data[_this.getIndex(_this.curDistance[i])])
                        }
                    } else {
                        for (var i = 0; i < _this.curDistance.length; i++) {
                            temp.push(_this.getValue(i))
                        }
                    }
                }
                return temp
            },
            calcDistance: function(index) {
                return 2 * this.liHeight - index * this.liHeight
            },
            setCurDistance: function(indexArr) {
                var _this = this;
                var temp = [];
                for (var i = 0; i < _this.slider.length; i++) {
                    temp.push(_this.calcDistance(indexArr[i]));
                    _this.movePosition(_this.slider[i], temp[i])
                }
                _this.curDistance = temp
            },
            fixPosition: function(distance) {
                return - (this.getIndex(distance) - 2) * this.liHeight
            },
            movePosition: function(theSlider, distance) {
                theSlider.style.webkitTransform = "translate3d(0," + distance + "px, 0)";
                theSlider.style.transform = "translate3d(0," + distance + "px, 0)"
            },
            locatePostion: function(index, posIndex) {
                this.curDistance[index] = this.calcDistance(posIndex);
                this.movePosition(this.slider[index], this.curDistance[index])
            },
            updateCurDistance: function(theSlider, index) {
                this.curDistance[index] = parseInt(theSlider.style.transform.split(",")[1])
            },
            getDistance: function(theSlider) {
                return parseInt(theSlider.style.transform.split(",")[1])
            },
            getValue: function(sliderIndex) {
                var _this = this;
                var index = _this.getIndex(_this.curDistance[sliderIndex]);
                return _this.slider[sliderIndex].getElementsByTagName("li")[index].innerHTML
            },
            touch: function(event, theSlider, index) {
                var _this = this;
                event = event || window.event;
                switch (event.type) {
                    case "touchstart":
                        _this.startY = event.touches[0].clientY;
                        _this.oldMoveY = _this.startY;
                        break;
                    case "touchend":
                        _this.moveEndY = event.changedTouches[0].clientY;
                        _this.offsetSum = _this.moveEndY - _this.startY;
                        _this.updateCurDistance(theSlider, index);
                        _this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
                        _this.movePosition(theSlider, _this.curDistance[index]);
                        _this.oversizeBorder = -(theSlider.getElementsByTagName("li").length - 3) * _this.liHeight;
                        if (_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
                            _this.curDistance[index] = 2 * _this.liHeight;
                            setTimeout(function() {
                                    _this.movePosition(theSlider, _this.curDistance[index])
                                },
                                100)
                        } else {
                            if (_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
                                _this.curDistance[index] = _this.oversizeBorder;
                                setTimeout(function() {
                                        _this.movePosition(theSlider, _this.curDistance[index])
                                    },
                                    100)
                            }
                        }
                        _this.transitionEnd(_this.getIndexArr(), _this.getJson());
                        if (_this.cascade) {
                            var tempPosArr = _this.getIndexArr();
                            tempPosArr[index] = _this.getIndex(_this.curDistance[index]);
                            _this.checkRange(index, tempPosArr)
                        }
                        break;
                    case "touchmove":
                        event.preventDefault();
                        _this.moveY = event.touches[0].clientY;
                        _this.offset = _this.moveY - _this.oldMoveY;
                        _this.updateCurDistance(theSlider, index);
                        _this.curDistance[index] = _this.curDistance[index] + _this.offset;
                        _this.movePosition(theSlider, _this.curDistance[index]);
                        _this.oldMoveY = _this.moveY;
                        break
                }
            },
            dragClick: function(event, theSlider, index) {
                var _this = this;
                event = event || window.event;
                if (typeof event !== "undefined") {
                    switch (event.type) {
                        case "mousedown":
                            _this.startY = event.clientY;
                            _this.oldMoveY = _this.startY;
                            _this.clickStatus = true;
                            break;
                        case "mouseup":
                            _this.moveEndY = event.clientY;
                            _this.offsetSum = _this.moveEndY - _this.startY;
                            _this.updateCurDistance(theSlider, index);
                            _this.curDistance[index] = _this.fixPosition(_this.curDistance[index]);
                            _this.movePosition(theSlider, _this.curDistance[index]);
                            _this.oversizeBorder = -(theSlider.getElementsByTagName("li").length - 3) * _this.liHeight;
                            if (_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
                                _this.curDistance[index] = 2 * _this.liHeight;
                                setTimeout(function() {
                                        _this.movePosition(theSlider, _this.curDistance[index])
                                    },
                                    100)
                            } else {
                                if (_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
                                    _this.curDistance[index] = _this.oversizeBorder;
                                    setTimeout(function() {
                                            _this.movePosition(theSlider, _this.curDistance[index])
                                        },
                                        100)
                                }
                            }
                            _this.clickStatus = false;
                            _this.transitionEnd(_this.getIndexArr(), _this.getJson());
                            if (_this.cascade) {
                                var tempPosArr = _this.getIndexArr();
                                tempPosArr[index] = _this.getIndex(_this.curDistance[index]);
                                _this.checkRange(index, tempPosArr)
                            }
                            break;
                        case "mousemove":
                            event.preventDefault();
                            if (_this.clickStatus) {
                                _this.moveY = event.clientY;
                                _this.offset = _this.moveY - _this.oldMoveY;
                                _this.updateCurDistance(theSlider, index);
                                _this.curDistance[index] = _this.curDistance[index] + _this.offset;
                                _this.movePosition(theSlider, _this.curDistance[index]);
                                _this.oldMoveY = _this.moveY
                            }
                            break
                    }
                }
            },
            singleClick: function(theLi, index, sliderIndex) {
                var _this = this;
                if (_this.cascade) {
                    var tempPosArr = _this.getIndexArr();
                    tempPosArr[sliderIndex] = index;
                    _this.checkRange(sliderIndex, tempPosArr)
                } else {
                    _this.curDistance[sliderIndex] = (2 - index) * _this.liHeight;
                    _this.movePosition(theLi.parentNode, _this.curDistance[sliderIndex])
                }
            }
        };
        return AKjs_Select
    })()
} (jQuery));

/*-----------------------------------------------AKjs_SelectOption (2018-12-13)--------------------------------------------*/
(function($) {
    var defaluts = {
        active: "",
        boxheight: 5,
        speed: 1000,
        callback: function() {},
        clickback: function() {}
    };
    $.fn.extend({
        "AKjs_SelectOption": function(options){
            var option = $.extend({
            }, defaluts, options);
            $(this).addClass("ak-SelectOpts");
            $(window).bind('hashchange', function () {
                $(".ak-SelectList").remove();
            });
            return this.each(function(){
                var $this = $(this);
                var _html = [];
                _html.push("<section class=\"" + $this.attr('class') + "\">");
                _html.push("<var>" + $this.find(":selected").text() + "</var>");
                _html.push("<cite class='ak-SelectList scrollbar'><ul>");
                $this.children("option").each(function () {
                    var opts = $(this);
                    _html.push("<li title='"+opts.text()+"' data-value=\"" + opts.val() + "\">" + opts.text() + "</li>");
                });
                _html.push("</ul>");
                _html.push("</cite>");
                _html.push("</section>");
                var select = $(_html.join(""));
                var select_text = select.find("var");
                var select_list = select.find("cite");
                $this.after(select);
                $this.nextAll("section.ak-SelectOpts").not($this.next("section.ak-SelectOpts")).remove();
                select_list.find("li").each(function () {
                    var list = $(this);
                    if (list.data("value") == $this.find(":selected").val()) {
                        if ($this.find(":selected").val() > 0) {
                            list.addClass(option.active);
                        }
                    }
                });
                option.callback(select,select_list,$this.find(":selected").val(),select_text.text());
                AKjs_UserAgent();
                select.unbind("click");
                select.click(function (andrew) {
                    var $this_ = $(this);
                    andrew.preventDefault();
                    $(".ak-SelectList").remove();
                    if ($('#ak-scrollview').length > 0) {
                        if (select.parents("dialog")[0] != undefined) {
                            $('main').append(select_list);
                        } else {
                            $('#ak-scrollview').append(select_list);
                        }
                    } else {
                        $('body').append(select_list);
                    }
                    if(select_list.css('display') == 'none'){
                        option.clickback(false,select,select_list);
                    }
                    select_list.find("li").unbind("click");
                    select_list.on("click", "li", function () {
                        var li = $(this);
                        if (li.data("value") === 0 || li.data("value") === "") {
                            var val = li.removeClass(option.active).siblings("li").removeClass(option.active).end().data("value");
                        } else {
                            var val = li.addClass(option.active).siblings("li").removeClass(option.active).end().data("value").toString();
                        }
                        select.removeClass("ak-open");
                        select_list.slideUp(option.speed);

                        if (li.data("value") != "0" || li.data("value") != "") {
                            if ($this.attr("data-type") == "router-link") {
                                document.location.href = "#/" + li.data("value");
                            } else if ($this.attr("data-type") == "link") {
                                document.location.href = li.data("value");
                            }
                        }
                        if (val !== $this.val()) {
                            select_text.text(li.text());
                            $this.val(val);
                            $this.attr("data-value",val);
                            $this.find("option[value!='"+val+"']").removeAttr("selected");
                            $this.find("option[value='"+val+"']").attr("selected","selected");
                            $this.change();
                            option.clickback(true,select,select_list,val,select_text.text());
                        }
                    });
                    $(this).toggleClass("ak-open");
                    select_list_css();
                    $(window).resize(function () {
                        select_list_css();
                    });
                    function select_list_css() {
                        var this_h = $this_.outerHeight();
                        if (option.boxheight) {
                            select_list.css({
                                "width": $this_.innerWidth(),
                                "max-height": $this_.outerHeight() * option.boxheight
                            });
                        } else {
                            select_list.css({
                                "width": $this_.innerWidth(),
                                "max-height": $this_.outerHeight() * 5
                            });
                        }
                        if ($this_.offset().top + $this_.innerHeight()+ select_list.innerHeight() > $(window).height()) {
                            select_list.css({
                                "top": "auto",
                                "bottom": $("#ak-scrollview").outerHeight() - ($this_.offset().top + $('#ak-scrollview').scrollTop()) + $this_.outerHeight() + $("#ak-scrollview").offset().top - this_h,
                                "left": $this_.offset().left - $("#ak-scrollview").offset().left
                            });
                        } else {
                            select_list.css({
                                "bottom": "auto",
                                "left": $this_.offset().left - $("#ak-scrollview").offset().left
                            });
                            if ($('#ak-scrollview').length > 0) {
                                if (select.parents("dialog")[0] != undefined) {
                                    select_list.css({
                                        "top": $this_.offset().top -$("#ak-scrollview").offset().top + this_h
                                    });
                                } else {
                                    select_list.css({
                                        "top": $this_.offset().top + $('#ak-scrollview').scrollTop() - $("#ak-scrollview").offset().top + this_h
                                    });
                                }
                            } else {
                                select_list.css({
                                    "top": $this_.offset().top + $this_.innerHeight() + 1
                                });
                            }
                        }
                        select_list.find("li").css({
                            "height": select.outerHeight()+"px",
                            "line-height": select.outerHeight()+"px"
                        });
                    }
                    if ($(this).hasClass("ak-open")) {
                        var _this = $(this);
                        $(".ak-SelectOpts").not(select).removeClass("ak-open");
                        $(".ak-SelectList").not(select_list).hide();
                        select_list.slideDown(option.speed);
                        select_list.animate({scrollTop:0},0);
                        $("body").unbind("click");
                        setTimeout(function() {
                            $(document).on("mousedown", function(e) {
                                if ($(e.target).closest(_this).length === 0) {
                                    $(".ak-SelectList").slideUp(option.speed);
                                    $(".ak-SelectOpts").removeClass("ak-open");
                                }
                            });
                            if ($('#ak-scrollview').length > 0) {
                                var $scrollbar = $("#ak-scrollview");
                            } else {
                                var $scrollbar = $("main");
                            }
                        },option.speed);
                    } else {
                        select_list.slideUp(option.speed);
                    }
                });
            });
        }
    });
} (jQuery));

/*-----------------------------------------------AKjs_SnInput (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_SnInput = function(setting) {
        var option = $.extend({
                default_active: false,
                input_length: 1,
                callback: function() {}
            },
            setting);
        var ele = $(this).find("input");
        $(this).css({
            "display": "block",
            "overflow": "hidden",
            "position": "relative"
        });
        ele.each(function() {
            ele.css({
                "display": "block",
                "overflow": "hidden",
                "position": "relative",
                "float": "left",
                "text-align": "center"
            });
            if (option.default_active == true) {
                ele.first().focus()
            }
            ele.attr("maxlength", option.input_length);
            ele.focus(function() {
                $(this).addClass("bor_theme bg_white")
            });
            ele.blur(function() {
                $(this).removeClass("bor_theme bg_white")
            });
            $(this).keyup(function(e) {
                e = window.event || e;
                var k = e.keyCode || e.which;
                if (k == 8) {
                    if ($(this).val().length < 1) {
                        $(this).prev().focus();
                        $(this).prev().focus(function() {
                            var obj = e.srcElement ? e.srcElement: e.target;
                            if (obj.createTextRange) {
                                var range = obj.createTextRange();
                                range.moveStart("character", option.input_length);
                                range.collapse(true);
                                range.select()
                            }
                        })
                    }
                } else {
                    if ($(this).val().length > parseInt(option.input_length) - 1) {
                        AKjs_UserAgent();
                        if (!IsQQ) {
                            $(this).next().focus()
                        }
                    }
                }
                this.value = this.value.replace(/[^a-z0-9]/i, "");
                this.value = this.value.toUpperCase()
            })
        });
        ele.bind("keyup",
            function() {
                var f = true;
                var str = "";
                if (ele.val() >= 1) {
                    $(this).addClass("c_black")
                } else {
                    $(this).addClass("c_black")
                }
                for (var i = 0; i < ele.length; i++) {
                    if ("" == ele.eq(i).val()) {
                        f = false
                    }
                }
                if (f) {
                    for (var i = 0; i < ele.length; i++) {
                        str += ele.eq(i).val()
                    }
                    if (str.length == (parseInt(option.input_length) * ele.length)) {
                        option.callback(str)
                    }
                } else {
                    option.callback("")
                }
            })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Spinner (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Spinner=function(setting) {
        var option = $.extend({
                input_width:"100%",
                btn_wrap: "",
                btn_left: "",
                btn_right: "",
                spacing: 1,
                maxNumber: "",
                changeBack: function() {},
                clickBack:function(){
                }
            },
            setting);
        var spt =$(this);
        $(function() {
            ak_sptFun();
        });
        $(window).resize(function(){
            spt.parent().find("input").css({
                "height": spt.parent().children("button").outerHeight()
            });
            spt.parent().css({
                "height": spt.parent().children("button").height()
            });
            spt.parent().css({
                "margin-top": (spt.parent().parent().outerHeight() - spt.parent().outerHeight())/2
            });
        });
        function ak_sptFun() {
            spt.each(function(i) {
                $(this).wrap('<div class="'+option.btn_wrap+'"></div>');
                $(this).before('<button type="button" class="minus '+option.btn_left+'"></button>');
                $(this).before('<button type="button" class="plus '+option.btn_right+'"></button>');
                $(this).parent().css({
                    "overflow": "hidden",
                    "width": option.input_width,
                    "height": spt.parent().children("button").height(),
                    "margin-top": (spt.parent().outerHeight() - spt.parent().children("button").outerHeight()) / 2-2
                });
                var it =$(this).parent().find("input");
                it.css({
                    "width": "100%",
                    "height": $(this).parent().children("button").outerHeight(),
                    "line-height": "100%",
                    "float": "inherit"
                });
                if (parseInt(it.val())<=1){
                    $(this).parent().children(".minus").attr("disabled",'disabled');
                }
                $(this).keyup(function() {
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber);
                    } else {
                        var maxNumber = parseInt(999999999);
                    }
                    var lengthNum = 1;
                    if (it.val() != '' && it.val() != null && it.val() != undefined) {
                        lengthNum = parseInt(it.val());
                    }
                    if (parseInt(it.val()) > 1) {
                        $(this).parent().children(".minus").removeAttr("disabled", 'disabled');
                        $(this).parent().children(".plus").removeAttr("disabled", 'disabled');
                    } else if (parseInt(it.val()) <= maxNumber) {
                        $(this).parent().children(".minus").attr("disabled", 'disabled');
                    }
                    if (lengthNum === 0) {
                        it.val(1);
                        $(this).parent().children(".plus").removeAttr("disabled", 'disabled');
                    }
                    if (parseInt(it.val()) >= parseInt(maxNumber)) {
                        it.val(parseInt(maxNumber));
                        $(this).parent().children(".plus").attr("disabled", 'disabled');
                    }
                    option.changeBack(it.val(),$(this));
                });
                $(this).parent().children(".plus").unbind("click");
                $(this).parent().children(".plus").on('click', function (e) {
                    e.preventDefault();
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber);
                    } else {
                        var maxNumber = parseInt(999999999);
                    }
                    var lengthNum= parseInt(it.val());
                    if (maxNumber > parseInt(it.val())) {
                        $(this).parent().children(".minus").removeAttr("disabled",'disabled');
                        it.val(lengthNum+parseInt(option.spacing));
                    } else if (maxNumber <= parseInt(it.val())) {
                        it.val(parseInt(maxNumber));
                        $(this).attr("disabled",'disabled');
                        it.parent().children(".minus").removeAttr("disabled",'disabled');
                    }
                    if (parseInt(it.val()) >= parseInt(maxNumber)) {
                        it.val(parseInt(maxNumber));
                        $(this).attr("disabled",'disabled');
                    }
                    option.clickBack(it.val(), $(this).parent().children("input"));
                });
                $(this).parent().children(".minus").unbind("click");
                $(this).parent().children(".minus").on('click', function (e) {
                    e.preventDefault();
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber);
                    } else {
                        var maxNumber = parseInt(999999999);
                    }
                    var lengthNum= parseInt(it.val());
                    if (maxNumber >= lengthNum){
                        $(this).parent().children(".plus").removeAttr("disabled",'disabled');
                        it.val(lengthNum-parseInt(option.spacing));
                    } else if (maxNumber <= lengthNum) {
                        it.val(parseInt(maxNumber));
                        $(this).attr("disabled",'disabled');
                        it.parent().children(".plus").removeAttr("disabled",'disabled');
                    }
                    if (parseInt(it.val())<=1){
                        it.val(parseInt(1));
                        $(this).attr("disabled",'disabled');
                    }
                    option.clickBack(it.val(), $(this).parent().children("input"));
                })
            });
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Substring (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Substring = function() {
        $(this).blur(function() {
            this.value = outputmoney(this.value)
        })
    };
    function outputdollars(number) {
        if (number.length <= 3) {
            return (number == "" ? "0": number)
        } else {
            var mod = number.length % 3;
            var output = (mod == 0 ? "": (number.substring(0, mod)));
            for (var i = 0; i < Math.floor(number.length / 3); i++) {
                if ((mod == 0) && (i == 0)) {
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3)
                } else {
                    output += "" + number.substring(mod + 3 * i, mod + 3 * i + 3)
                }
            }
            return (output)
        }
    }
    function outputcents(amount) {
        amount = Math.round(((amount) - Math.floor(amount)) * 100);
        return (amount < 10 ? ".0" + amount: "." + amount)
    }
    function outputmoney(number) {
        number = number.replace(/\,/g, "");
        if (isNaN(number) || number == "") {
            return ""
        }
        number = Math.round(number * 100) / 100;
        if (number < 0) {
            return "-" + outputdollars(Math.floor(Math.abs(number) - 0) + "") + outputcents(Math.abs(number) - 0)
        } else {
            return outputdollars(Math.floor(number - 0) + "") + outputcents(number - 0)
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Switch (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Switch = function(settings) {
        var _defaults = {
            checkedClass: "bg_theme",
            disabledClass: "dis_opa_05",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        var Switchs = this;
        Switchs.addClass("ak-Switch");
        if (Switchs.parent().children("label").length < 1) {
            Switchs.parent().append("<label />")
        }
        Switchs.next("label").attr("data-name", this.attr("name"));
        Switchs.each(function() {
            var $switch = $(this);
            $switch.next("label").css("margin-top", ($switch.next("label").parent().height() - Switchs.next("label").height()) / 2);
            $(window).resize(function() {
                $switch.next("label").css("margin-top", ($switch.next("label").parent().height() - Switchs.next("label").height()) / 2)
            });
            if ($switch.is(":checked") && !$switch.is(":disabled")) {
                $switch.next("label").addClass(options.checkedClass).removeClass(options.disabledClass)
            } else {
                if (!$switch.is(":checked") && $switch.is(":disabled")) {
                    $switch.next("label").removeClass(options.checkedClass).addClass(options.disabledClass)
                } else {
                    if ($switch.is(":disabled") || $switch.is(":checked")) {
                        $switch.next("label").addClass(options.disabledClass).addClass(options.checkedClass)
                    } else {
                        if (!$switch.is(":checked") && !$switch.is(":disabled")) {
                            $switch.next("label").removeClass(options.checkedClass).removeClass(options.disabledClass)
                        }
                    }
                }
            }
            $switch.unbind();
            $switch.on("change",
                function() {
                    $(this).next("label").toggleClass(options.checkedClass);
                    options.onChange($(this)[0].checked)
                })
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Tabs (2018-12-13)--------------------------------------------*/
(function($) {
    var Plugin = function(elem, options) {
        this.$wrapper = elem;
        this.timer = null;
        this.playTimer = null;
        this.iNow = 0;
        this.defaults = {
            curDisplay: 1,
            touchmode: false,
            mouse: "click",
            playDelay: 1000,
            content_dom: "",
            boxheight: false,
            navlength: false,
            fullclass: "bor_bottom2 bor_theme c_theme",
            emptyclass: "bor_bottom bor_gray_ddd",
            changeMethod: "default",
            autoPlay: false,
            callback: function() {},
            changeback: function() {}
        };
        this.opts = $.extend({},
            this.defaults, options)
    };
    Plugin.prototype = {
        inital: function() {
            var self = this;
            $(function() {
                self.setData();
                self.tabInital()
            });
            AKjs_UserAgent();
            if (!IsMobile) {
                $(window).resize(function() {
                    self.setData();
                })
            }
            this.$tab_list = this.$wrapper.children("nav").children("ul").children("li");
            if (this.opts.content_dom) {
                this.$tabCont_art = $(this.opts.content_dom)
            } else {
                this.$tabCont_art = this.$wrapper.children("article")
            }
            this.$tabCont_wrap = this.$tabCont_art.children("div");
            this.$tab_cont = this.$tabCont_wrap.find("section");
            if (this.opts.mouse === "click") {
                this.$tab_list.click(function() {
                    self.changeTab($(this).index());
                    self.iNow = $(this).index()
                })
            } else {
                if (this.opts.mouse === "hover") {
                    this.$tab_list.hover(function() {
                            var cur_obj = this;
                            clearTimeout(self.timer);
                            self.timer = setTimeout(function() {
                                    self.changeTab($(cur_obj).index())
                                },
                                30);
                            self.iNow = $(this).index()
                        },
                        function() {
                            clearTimeout(self.timer)
                        })
                } else {
                    this.$tab_list.click(function() {
                        self.changeTab($(this).index());
                        self.iNow = $(this).index()
                    })
                }
            }
            if (this.opts.autoPlay) {
                clearInterval(this.playTimer);
                this.playTimer = setInterval(function() {
                        self.autoPlay()
                    },
                    this.opts.playDelay);
                this.$wrapper.hover(function() {},
                    function() {
                        self.playTimer = setInterval(function() {
                                self.autoPlay()
                            },
                            this.opts.playDelay)
                    })
            }
            var tmp = this.opts.curDisplay;
            if (this.opts.touchmode) {
                var touchStartY = 0,
                    touchStartX = 0,
                    mouseStartY = 0,
                    mouseStartX = 0;
                this.$tab_cont.on({
                    touchstart: function(e) {
                        touchStartY = e.originalEvent.touches[0].clientY;
                        touchStartX = e.originalEvent.touches[0].clientX
                    },
                    touchend: function(e) {
                        var touchEndY = e.originalEvent.changedTouches[0].clientY,
                            touchEndX = e.originalEvent.changedTouches[0].clientX,
                            yDiff = touchStartY - touchEndY,
                            xDiff = touchStartX - touchEndX,
                            tabsize = self.$tab_list.length;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            if (xDiff > 5) {++tmp;
                                if (tmp > tabsize) {
                                    tmp = 1
                                }
                                self.$tab_list.eq(tmp - 1).click()
                            } else {--tmp;
                                if (tmp == 0) {
                                    tmp = tabsize
                                }
                                self.$tab_list.eq(tmp - 1).click()
                            }
                        }
                        touchStartY = null;
                        touchStartX = null
                    },
                    touchmove: function(e) {
                        var touchEndY = e.originalEvent.changedTouches[0].clientY,
                            touchEndX = e.originalEvent.changedTouches[0].clientX,
                            yDiff = touchStartY - touchEndY,
                            xDiff = touchStartX - touchEndX;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            e.preventDefault()
                        }
                    }
                });
                if (!IsMobile) {
                    this.$tab_cont.on({
                        mousedown: function(e) {
                            mouseStartY = e.originalEvent.clientY;
                            mouseStartX = e.originalEvent.clientX
                        },
                        mouseup: function(e) {
                            var mouseEndY = e.originalEvent.screenY,
                                mouseEndX = e.originalEvent.screenX,
                                yDiff = mouseStartY - mouseEndY,
                                xDiff = mouseStartX - mouseEndX,
                                tabsize = self.$tab_list.length;
                            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                                if (xDiff > 5) {++tmp;
                                    if (tmp > tabsize) {
                                        tmp = 1
                                    }
                                    self.$tab_list.eq(tmp - 1).click()
                                } else {--tmp;
                                    if (tmp == 0) {
                                        tmp = tabsize
                                    }
                                    self.$tab_list.eq(tmp - 1).click()
                                }
                            }
                            mouseStartY = null;
                            mouseStartX = null
                        },
                        mousemove: function(e) {
                            e.preventDefault()
                        }
                    });
                }
            }
        },
        setData: function() {
            if (this.$tab_list.length == this.opts.navlength) {
                this.$tab_list.removeClass("pl_1rem pr_1rem");
                this.$tab_list.parent("ul").removeClass("nav_line").addClass("nav_line_c");
                this.$tab_list.parent("ul").addClass("length" + this.$tab_list.length)
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
                })
            } else {
                this.$tabCont_wrap.parent().css({
                    "height": "auto"
                })
            }
            var tabCont_w = this.$tab_cont.width();
            var tabCont_h = this.$tab_cont.height();
            var tabCont_len = this.$tab_cont.length;
            switch (this.opts.changeMethod) {
                case "default":
                    this.$tab_cont.css({
                        display:
                            "none"
                    });
                    break;
                case "horizontal":
                    this.$tabCont_wrap.css({
                        width:
                            tabCont_w * tabCont_len
                    });
                    this.$tab_cont.addClass("fl");
                    break;
                case "vertical":
                    this.$tabCont_wrap.css({
                        height:
                            tabCont_h * tabCont_len
                    });
                    break;
                case "opacity":
                    this.$tab_cont.css({
                        display:
                            "block"
                    });
                    break;
                default:
                    this.$tab_cont.css({
                        display:
                            "none"
                    });
                    break
            }
        },
        tabInital: function() {
            var curNum = this.opts.curDisplay - 1;
            this.$tab_list.removeClass(this.opts.fullclass);
            this.$tab_list.eq(curNum).addClass(this.opts.fullclass);
            this.$tab_cont.eq(curNum).nextAll().addClass("dis_none_im");
            this.opts.callback(this.$tab_cont.eq(curNum), curNum);
            if (this.opts.changeMethod != "vertical") {
                this.$tab_cont.css({
                    "height": "0",
                    "margin-bottom": "1%"
                });
                this.$tab_cont.eq(curNum).css({
                    "height": "auto"
                })
            } else {
                if (!this.opts.boxheight) {
                    this.$tabCont_wrap.parent().css({
                        height: this.$tab_cont.eq(curNum).outerHeight()
                    })
                }
            }
            if (this.opts.changeMethod === "default" || this.opts.changeMethod === "opacity") {
                this.$tab_cont.eq(curNum).css({
                    display: "block"
                })
            } else {
                if (this.opts.changeMethod === "horizontal") {
                    this.$tabCont_wrap.css({
                        left: -curNum * this.$tab_cont.width()
                    })
                } else {
                    if (this.opts.changeMethod === "vertical") {
                        this.$tabCont_wrap.css({
                            top: -curNum * this.$tab_cont.height()
                        })
                    } else {
                        this.$tab_cont.eq(curNum).css({
                            display: "block"
                        })
                    }
                }
            }
            this.iNow = this.opts.curDisplay - 1
        },
        changeTab: function(index) {
            this.$tab_list.removeClass(this.opts.fullclass).addClass(this.opts.emptyclass).removeAttr("style");
            this.$tab_list.eq(index).removeClass(this.opts.emptyclass).addClass(this.opts.fullclass);
            this.$tab_cont.removeClass("dis_none_im");
            this.opts.changeback(this.$tab_cont.eq(index), index);
            if (this.opts.changeMethod != "vertical") {
                var that = this;
                setTimeout(function() {
                        that.$tab_cont.css({
                            "height": "0"
                        });
                        that.$tab_cont.eq(index).css({
                            "height": "auto"
                        })
                    },
                    500);
                this.$tab_cont.eq(index).css({
                    "height": "auto"
                })
            }
            switch (this.opts.changeMethod) {
                case "default":
                    this.$tab_cont.css({
                        display:
                            "none"
                    });
                    this.$tab_cont.eq(index).css({
                        display:
                            "block"
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height:
                            this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height:
                            this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height":
                                "auto"
                        })
                    }
                    break;
                case "horizontal":
                    this.$tabCont_wrap.stop().animate({
                        left:
                            this.$tab_cont.width() * -index
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        })
                    }
                    break;
                case "vertical":
                    this.$tabCont_wrap.stop().animate({
                        top:
                            this.$tab_cont.height() * -index
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height: this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height: this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height": "auto"
                        })
                    }
                    break;
                case "opacity":
                    this.$tab_cont.addClass("animated");
                    this.$tab_cont.removeClass("rel fadeIn zindex_2").addClass("abs fadeOut");
                    this.$tab_cont.eq(index).removeClass("abs fadeOut").addClass("rel fadeIn zindex_2");
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height:
                            this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height:
                            this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height":
                                "auto"
                        })
                    }
                    break;
                default:
                    this.$tab_cont.css({
                        display:
                            "none"
                    });
                    this.$tab_cont.eq(index).css({
                        display:
                            "block"
                    });
                    if (this.opts.boxheight) {
                        this.$tabCont_wrap.parent().css({
                            height:
                            this.opts.boxheight
                        });
                        this.$tab_cont.stop().animate({
                            height:
                            this.opts.boxheight
                        })
                    } else {
                        this.$tabCont_wrap.parent().stop().animate({
                            "height":
                                "auto"
                        })
                    }
                    break
            }
        },
        autoPlay: function() {
            if (this.iNow === this.$tab_list.length - 1) {
                this.iNow = 0
            } else {
                this.iNow++
            }
            this.changeTab(this.iNow)
        },
        constructor: Plugin
    };
    $.fn.AKjs_Tabs = function(options) {
        var plugin = new Plugin(this, options);
        return plugin.inital()
    }
} (jQuery));

/*-----------------------------------------------AKjs_Template (2018-12-13)--------------------------------------------*/
(function($, undefined) {
    var oldManip = $.fn.domManip,
        tmplItmAtt = "_tmplitem",
        newTmplItems = {},
        wrappedItems = {},
        appendToTmplItems,
        topTmplItem = {
            key: 0,
            data: {}
        },
        itemKey = 0,
        cloneIndex = 0,
        stack = [];
    var regex = {
        sq_escape: /([\\'])/g,
        sq_unescape: /\\'/g,
        dq_unescape: /\\\\/g,
        nl_strip: /[\r\t\n]/g,
        shortcut_replace: /\$\{([^\}]*)\}/g,
        lang_parse: /\{\%(\/?)(\w+|.)(?:\(((?:[^\%]|\%(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\%]|\%(?!\}))*?)\))?\s*\%\}/g,
        old_lang_parse: /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
        template_anotate: /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,
        text_only_template: /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
        html_expr: /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! |\{\%! /,
        last_word: /\w$/
    };

    function newTmplItem(options, parentItem, fn, data) {
        var newItem = {
            data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
            _wrap: parentItem ? parentItem._wrap : null,
            AKjs_Template: null,
            parent: parentItem || null,
            nodes: [],
            calls: tiCalls,
            nest: tiNest,
            wrap: tiWrap,
            html: tiHtml,
            update: tiUpdate
        };
        if(options) {
            $.extend(newItem, options, { nodes: [], parent: parentItem });
        }
        if(fn) {
            newItem.AKjs_Template = fn;
            newItem._ctnt = newItem._ctnt || $.isFunction(newItem.AKjs_Template) && newItem.AKjs_Template($, newItem) || fn;
            newItem.key = ++itemKey;
            (stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
        }
        return newItem;
    }
    $.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        $.fn[ name ] = function(selector) {
            var ret = [], insert = $(selector), elems, i, l, tmplItems,
                parent = this.length === 1 && this[0].parentNode;

            appendToTmplItems = newTmplItems || {};
            if(parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[ original ](this[0]);
                ret = this;
            } else {
                for(i = 0,l = insert.length; i < l; i++) {
                    cloneIndex = i;
                    elems = (i > 0 ? this.clone(true) : this).get();
                    $(insert[i])[ original ](elems);
                    ret = ret.concat(elems);
                }
                cloneIndex = 0;
                ret = this.pushStack(ret, name, insert.selector);
            }
            tmplItems = appendToTmplItems;
            appendToTmplItems = null;
            $.AKjs_Template.complete(tmplItems);
            return ret;
        };
    });

    $.fn.extend({
        AKjs_Template: function(data, options, parentItem) {
            var ele = $(this[0]);
            ele.addClass("ak-for");
            var ret = $.AKjs_Template(ele, data, options, parentItem);
            $(function() {
                ele.removeClass("ak-for");
                ele.find(".ak-for").removeClass("ak-for");
                ele.children().eq(0).remove();
                ele.empty();
                ret.appendTo(ele);
                if (options.callback != undefined) {
                    newTmplItem(options.callback(ele,ret));
                }
            });
            return ret;
        },
        tmplItem: function() {
            var ret = $.tmplItem(this[0]);
            return ret;
        },
        template: function(name) {
            var ret = $.template(name, this[0]);
            return ret;
        },

        domManip: function(args, table, callback, options) {
            if(args[0] && $.isArray(args[0])) {
                var dmArgs = $.makeArray(arguments), elems = args[0], elemsLength = elems.length, i = 0, tmplItem;
                while(i < elemsLength && !(tmplItem = $.data(elems[i++], "tmplItem"))) {
                }
                if(tmplItem && cloneIndex) {
                    dmArgs[2] = function(fragClone) {
                        $.AKjs_Template.afterManip(this, fragClone, callback);
                    };
                }
                oldManip.apply(this, dmArgs);
            } else {
                oldManip.apply(this, arguments);
            }
            cloneIndex = 0;
            if(!appendToTmplItems) {
                $.AKjs_Template.complete(newTmplItems);
            }
            return this;
        }
    });

    $.extend({
        AKjs_Template: function(AKjs_Template, data, options, parentItem) {
            var ret, topLevel = !parentItem;
            if(topLevel) {
                parentItem = topTmplItem;
                AKjs_Template = $.template[AKjs_Template] || $.template(null, AKjs_Template);
                wrappedItems = {};
            } else if(!AKjs_Template) {
                AKjs_Template = parentItem.AKjs_Template;
                newTmplItems[parentItem.key] = parentItem;
                parentItem.nodes = [];
                if(parentItem.wrapped) {
                    updateWrapped(parentItem, parentItem.wrapped);
                }
                return $(build(parentItem, null, parentItem.AKjs_Template($, parentItem)));
            }
            if(!AKjs_Template) {
                return [];
            }
            if(typeof data === "function") {
                data = data.call(parentItem || {});
            }
            if(options && options.wrapped) {
                updateWrapped(options, options.wrapped);
            }
            ret = $.isArray(data) ?
                $.map(data, function(dataItem) {
                    return dataItem ? newTmplItem(options, parentItem, AKjs_Template, dataItem) : null;
                }) :
                [ newTmplItem(options, parentItem, AKjs_Template, data) ];
            return topLevel ? $(build(parentItem, null, ret)) : ret;
        },
        tmplItem: function(elem) {
            var tmplItem;
            if(elem instanceof $) {
                elem = elem[0];
            }
            while(elem && elem.nodeType === 1 && !(tmplItem = $.data(elem,
                "tmplItem")) && (elem = elem.parentNode)) {
            }
            return tmplItem || topTmplItem;
        },
        template: function(name, AKjs_Template) {
            if(AKjs_Template) {
                if(typeof AKjs_Template === "string") {
                    AKjs_Template = buildTmplFn(AKjs_Template)
                } else if(AKjs_Template instanceof $) {
                    AKjs_Template = AKjs_Template[0] || {};
                }
                if(AKjs_Template.nodeType) {
                    AKjs_Template = $.data(AKjs_Template, "AKjs_Template") || $.data(AKjs_Template, "AKjs_Template", buildTmplFn(AKjs_Template.innerHTML));
                }
                return typeof name === "string" ? ($.template[name] = AKjs_Template) : AKjs_Template;
            }
            return name ? (typeof name !== "string" ? $.template(null, name) :
                ($.template[name] || $.template(null, name))) : null;
        },
        encode: function(text) {
            return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
        }
    });

    $.extend($.AKjs_Template, {
        tag: {
            "AKjs_Template": {
                _default: { $2: "null" },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            "wrap": {
                _default: { $2: "null" },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            "each": {
                _default: { $2: "$index, $value" },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                open: "}else{"
            },
            "elif": {
                open: "}else if(($notnull_1) && $1a){"
            },
            "elseif": {
                open: "}else if(($notnull_1) && $1a){"
            },
            "html": {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: { $1: "$data" },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function(items) {
            newTmplItems = {};
        },
        afterManip: function afterManip(elem, fragClone, callback) {
            var content = fragClone.nodeType === 11 ?
                $.makeArray(fragClone.childNodes) : fragClone.nodeType === 1 ? [fragClone] : [];
            callback.call(elem, fragClone);
            storeTmplItems(content);
            cloneIndex++;
        }
    });

    function build(tmplItem, nested, content) {
        var frag, ret = content ? $.map(content, function(item) {
            return (typeof item === "string") ?
                (tmplItem.key ? item.replace(regex.template_anotate, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2") : item) : build(item, tmplItem, item._ctnt);
        }) : tmplItem;
        if(nested) {
            return ret;
        }
        ret = ret.join("");
        ret.replace(regex.text_only_template, function(all, before, middle, after) {
            frag = $(middle).get();
            storeTmplItems(frag);
            if(before) {
                frag = unencode(before).concat(frag);
            }
            if(after) {
                frag = frag.concat(unencode(after));
            }
        });
        return frag ? frag : unencode(ret);
    }

    function unencode(text) {
        var el = document.createElement("div");
        el.innerHTML = text;
        return $.makeArray(el.childNodes);
    }
    function buildTmplFn(markup) {
        var parse_tag = function(all, slash, type, fnargs, target, parens, args) {
            if(!type) {
                return "');__.push('";
            }
            var tag = $.AKjs_Template.tag[ type ], def, expr, exprAutoFnDetect;
            if(!tag) {
                return "');__.push('";
            }
            def = tag._default || [];
            if(parens && !regex.last_word.test(target)) {
                target += parens;
                parens = "";
            }
            if(target) {
                target = unescape(target);
                args = args ? ("," + unescape(args) + ")") : (parens ? ")" : "");
                expr = parens ? (target.indexOf(".") > -1 ? target + unescape(parens) : ("(" + target + ").call($item" + args)) : target;
                exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
            } else {
                exprAutoFnDetect = expr = def.$1 || "null";
            }
            fnargs = unescape(fnargs);
            return "');" +
                tag[ slash ? "close" : "open" ]
                    .split("$notnull_1").join(target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true")
                    .split("$1a").join(exprAutoFnDetect)
                    .split("$1").join(expr)
                    .split("$2").join(fnargs || def.$2 || "") +
                "__.push('";
        };
        var depreciated_parse = function() {
            if($.AKjs_Template.tag[arguments[2]]) {
                return parse_tag.apply(this, arguments);
            } else {
                return "');__.push('{{" + arguments[2] + "}}');__.push('";
            }
        };
        var parsed_markup_data = "var $=$,call,__=[],$data=$item.data; with($data){__.push('";
        var parsed_markup = $.trim(markup);
        parsed_markup = parsed_markup.replace(regex.sq_escape, "\\$1");
        parsed_markup = parsed_markup.replace(regex.nl_strip, " ");
        parsed_markup = parsed_markup.replace(regex.shortcut_replace, "{%= $1%}");
        parsed_markup = parsed_markup.replace(regex.lang_parse,  parse_tag);
        parsed_markup = parsed_markup.replace(regex.old_lang_parse, depreciated_parse);
        parsed_markup_data += parsed_markup;
        parsed_markup_data += "');}return __;";
        return new Function("$", "$item", parsed_markup_data);
    }
    function updateWrapped(options, wrapped) {
        options._wrap = build(options, true, $.isArray(wrapped) ? wrapped : [regex.html_expr.test(wrapped) ? wrapped : $(wrapped).html()]
        ).join("");
    }
    function unescape(args) {
        return args ? args.replace(regex.sq_unescape, "'").replace(regex.dq_unescape, "\\") : null;
    }
    function outerHtml(elem) {
        var div = document.createElement("div");
        div.appendChild(elem.cloneNode(true));
        return div.innerHTML;
    }
    function storeTmplItems(content) {
        var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
        for(i = 0,l = content.length; i < l; i++) {
            if((elem = content[i]).nodeType !== 1) {
                continue;
            }
            elems = elem.getElementsByTagName("*");
            for(m = elems.length - 1; m >= 0; m--) {
                processItemKey(elems[m]);
            }
            processItemKey(elem);
        }
        function processItemKey(el) {
            var pntKey, pntNode = el, pntItem, tmplItem, key;
            if((key = el.getAttribute(tmplItmAtt))) {
                while(pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute(tmplItmAtt))) {
                }
                if(pntKey !== key) {
                    pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute(tmplItmAtt) || 0)) : 0;
                    if(!(tmplItem = newTmplItems[key])) {
                        tmplItem = wrappedItems[key];
                        tmplItem = newTmplItem(tmplItem, newTmplItems[pntNode] || wrappedItems[pntNode]);
                        tmplItem.key = ++itemKey;
                        newTmplItems[itemKey] = tmplItem;
                    }
                    if(cloneIndex) {
                        cloneTmplItem(key);
                    }
                }
                el.removeAttribute(tmplItmAtt);
            } else if(cloneIndex && (tmplItem = $.data(el, "tmplItem"))) {
                cloneTmplItem(tmplItem.key);
                newTmplItems[tmplItem.key] = tmplItem;
                pntNode = $.data(el.parentNode, "tmplItem");
                pntNode = pntNode ? pntNode.key : 0;
            }
            if(tmplItem) {
                pntItem = tmplItem;
                while(pntItem && pntItem.key != pntNode) {
                    pntItem.nodes.push(el);
                    pntItem = pntItem.parent;
                }
                delete tmplItem._ctnt;
                delete tmplItem._wrap;
                $.data(el, "tmplItem", tmplItem);
            }
            function cloneTmplItem(key) {
                key = key + keySuffix;
                tmplItem = newClonedItems[key] =
                    (newClonedItems[key] || newTmplItem(tmplItem,
                        newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent));
            }
        }
    }
    function tiCalls(content, AKjs_Template, data, options) {
        if(!content) {
            return stack.pop();
        }
        stack.push({ _: content, AKjs_Template: AKjs_Template, item:this, data: data, options: options });
    }
    function tiNest(AKjs_Template, data, options) {
        return $.AKjs_Template($.template(AKjs_Template), data, options, this);
    }
    function tiWrap(call, wrapped) {
        var options = call.options || {};
        options.wrapped = wrapped;
        return $.AKjs_Template($.template(call.AKjs_Template), call.data, options, call.item);
    }
    function tiHtml(filter, textOnly) {
        var wrapped = this._wrap;
        return $.map(
            $($.isArray(wrapped) ? wrapped.join("") : wrapped).filter(filter || "*"),
            function(e) {
                return textOnly ?
                    e.innerText || e.textContent :
                    e.outerHTML || outerHtml(e);
            });
    }
    function tiUpdate() {
        var coll = this.nodes;
        $.AKjs_Template(null, null, null, this).insertBefore(coll[0]);
        $(coll).remove();
    }
} (jQuery));

/*-----------------------------------------------AKjs_Textarea (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Textarea = function(setting) {
        var opm = $.extend({
                maxlength: 300,
                rows: 6,
                onTextVal: function() {}
            },
            setting);
        var txt =$(this);
        if (txt.length > 0) {
            txt.each(function(){
                $(this).after('<span class="dis_block_im ovh abs center text_al_r text_12px">' +
                    '<var class="text_08rem" style="color: #f16a6a;">0</var>' +
                    '/' +
                    '<var class="text_08rem mr_03rem">'+opm.maxlength+'</var>' +
                    '</span>');
                $(this).next("span").css({
                    "width": $(this).width(),
                    "left": ($(window).width() - $(this).width()) /2
                });
                $(this).attr("rows",opm.rows).attr("maxlength",opm.maxlength);
                $(this).parent().css({
                    "padding-bottom": $(this).next("span").height() * 1.2+"px"
                })
            });
            var len = 0;
            txt.on("input propertychange",function(e){
                if( len >= opm.maxlength && e.keyCode == 8 ){
                    return;
                }else{
                    var textareaVal = ($(this).val().replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/\n/gi,"|");
                    var entLen = textareaVal.split('|').length-1;
                    var strLen = textareaVal.split('|').join('').length;
                    $(this).attr('maxlength',opm.maxlength+(entLen*2));
                    len = strLen;
                    if( len >= opm.maxlength ){
                        len = opm.maxlength;
                    }
                    $(this).next("span").children("var").eq(0).html(len);
                    var data = $(this).val();

                    if (strLen > 0) {
                        opm.onTextVal(data);
                    }
                }
            });
        }
    };
} (jQuery));

/*-----------------------------------------------AKjs_TimeAxis (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_TimeAxis = function(setting) {
        var option = $.extend({
                firstbox: "",
                boxsize: "",
                textstyle: "",
                data:[],
                callback:function(){
                }
            },
            setting);
        function TimeAxis(el) {
            this.el = el;
            this.initEvents();
        }
        TimeAxis.prototype = {
            initEvents : function() {
                var obj = this;
                obj.el.each(function() {
                    $(this).addClass("ak-TimeAxis");
                    $(this).html("<cite><strong></strong></cite><ul></ul>");
                    var datalist = $(this).children("ul");
                    var tmp = "";
                    for(var i = 0; i < option.data.length; i++){
                        tmp += '<li>';
                        tmp += '    <section>';
                        tmp += '        <h6>'+option.data[i].time+'</h6>';
                        tmp += '    </section>';
                        tmp += '    <locator>';
                        tmp += '        <span></span>';
                        tmp += '    </locator>';
                        tmp += '    <article>';
                        tmp += '        <p>'+option.data[i].value+'</p>';
                        tmp += '    </article>';
                        tmp += '</li>';
                    }
                    datalist.html(tmp);
                    datalist.children("li").eq(0).children("section").addClass(option.firstbox);
                    datalist.find("section h6").addClass(option.textstyle);
                    $(this).children("cite").css({
                        "width": option.boxsize
                    });
                    datalist.find("section").css({
                        "width": option.boxsize,
                        "height": option.boxsize,
                        "line-height": option.boxsize,
                        "left": "-"+option.boxsize
                    });
                    datalist.find("locator").css({
                        "left": "-"+option.boxsize
                    });
                    datalist.find("article").css({
                        "margin-left": "-"+option.boxsize
                    });
                    option.callback($(this));
                });
            }
        };
        var el = new TimeAxis($(this));
    };
} (jQuery));

/*-----------------------------------------------AKjs_TouchDelete (2018-12-13)--------------------------------------------*/
(function($) {
    var AKjs_TouchDelete = function(ele, opt) {
        var self = this;
        self.$element = ele;
        self.defaults = {
            DelText: "",
            DelClass: "",
            ClickDelete: function() {},
            TouchCallback: function() {}
        };
        self.options = $.extend({},
            self.defaults, opt);
        this.init = this.options.init || this.init;
        this.touch = this.options.touch || this.touch;
    };
    AKjs_TouchDelete.prototype = {
        init: function() {
            var self = this,
                ele = self.$element;
            var DeleteLi = ele.find("li");
            DeleteLi.append("<button type='button' class='"+self.options.DelClass+"'></button>");
            DeleteLi.children("article").addClass("ak_delete_art").css({
                "left": "0",
                "position": "absolute"
            });
            DeleteLi.children("button").addClass("ak_delete_btn").html(self.options.DelText);
            DeleteLi.children("button").css({
                "right": "-"+DeleteLi.children("button").outerWidth()+"px"
            });
            self.touch();
        },
        touch: function () {
            var self = this,
                ele = self.$element;
            var DeleteLi = ele.find("li");
            var touchStartY = 0,
                touchStartX = 0,
                mouseStartY = 0,
                mouseStartX = 0;
            AKjs_UserAgent();
            DeleteLi.on({
                touchstart: function(e) {
                    touchStartY = e.originalEvent.touches[0].clientY;
                    touchStartX = e.originalEvent.touches[0].clientX;
                    $(this).children("button").on('touchstart', function (event) {
                        event.preventDefault();
                        self.options.ClickDelete($(this),$(this).parent(),$(this).parent().index());
                    });
                },
                touchend: function(e) {
                    var touchEndY = e.originalEvent.changedTouches[0].clientY,
                        touchEndX = e.originalEvent.changedTouches[0].clientX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;
                    if (Math.abs(xDiff) > Math.abs(yDiff)) {
                        if (xDiff > 5) {
                            DeleteLi.children("article").css({
                                "left": "0"
                            });
                            DeleteLi.children("button").css({
                                "right": "-"+DeleteLi.children("button").outerWidth()+"px"
                            });
                            $(this).children("article").css({
                                "left": "-"+$(this).children("button").outerWidth()+"px"
                            });
                            $(this).children("button").css({
                                "display": "block",
                                "right": "0"
                            });
                            self.options.TouchCallback($(this));
                        } else {
                            $(this).children("article").css({
                                "left": "0"
                            });
                            $(this).children("button").css({
                                "right": "-"+$(this).children("button").outerWidth()+"px"
                            });
                        }
                    }
                    touchStartY = null;
                    touchStartX = null
                },
                touchmove: function(e) {
                    var touchEndY = e.originalEvent.changedTouches[0].clientY,
                        touchEndX = e.originalEvent.changedTouches[0].clientX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;
                    if (Math.abs(xDiff) > Math.abs(yDiff)) {
                        e.preventDefault()
                    }
                }
            });
            if (!IsMobile) {
                DeleteLi.on({
                    mousedown: function(e) {
                        mouseStartY = e.originalEvent.clientY;
                        mouseStartX = e.originalEvent.clientX;
                        $(this).children("button").unbind("click");
                        $(this).children("button").on('click', function (event) {
                            event.preventDefault();
                            self.options.ClickDelete($(this),$(this).parent(),$(this).parent().index());
                        });
                    },
                    mouseup: function(e) {
                        var mouseEndY = e.originalEvent.screenY,
                            mouseEndX = e.originalEvent.screenX,
                            yDiff = mouseStartY - mouseEndY,
                            xDiff = mouseStartX - mouseEndX;
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            if (xDiff > 5) {
                                DeleteLi.children("article").css({
                                    "left": "0"
                                });
                                DeleteLi.children("button").css({
                                    "right": "-"+DeleteLi.children("button").outerWidth()+"px"
                                });
                                $(this).children("article").css({
                                    "left": "-"+$(this).children("button").outerWidth()+"px"
                                });
                                $(this).children("button").css({
                                    "display": "block",
                                    "right": "0"
                                });
                                self.options.TouchCallback($(this));
                            } else {
                                $(this).children("article").css({
                                    "left": "0"
                                });
                                $(this).children("button").css({
                                    "right": "-"+$(this).children("button").outerWidth()+"px"
                                });
                            }
                        }
                        mouseStartY = null;
                        mouseStartX = null
                    },
                    mousemove: function(e) {
                        e.preventDefault();
                    }
                });
            }
        }
    };
    $.fn.AKjs_TouchDelete = function(options) {
        var ak_TouchDelete = new AKjs_TouchDelete(this, options);
        return this.each(function() {
            ak_TouchDelete.init();
        })
    }
} (jQuery));

/*-----------------------------------------------AKjs_Typeahead (2018-12-13)--------------------------------------------*/
(function($) {
    var AKjs_Typeahead = function(element, options) {
        var _this = this;
        $(function() {
            _this.$element = $(element);
            _this.options = $.extend(true, {}, $.fn.AKjs_Typeahead.defaults, options);
            _this.$menu = $("<div class=\"ak-typeahead\"></div>").appendTo("body");
            _this.shown = false;
            _this.eventSupported = _this.options.eventSupported || _this.eventSupported;
            _this.grepper = _this.options.grepper || _this.grepper;
            _this.highlighter = _this.options.highlighter || _this.highlighter;
            _this.lookup = _this.options.lookup || _this.lookup;
            _this.matcher = _this.options.matcher || _this.matcher;
            _this.render = _this.options.render || _this.render;
            _this.init = _this.options.init || _this.init;
            _this.ele_show = _this.options.ele_show || _this.ele_show;
            _this.select = _this.options.select || _this.select;
            _this.sorter = _this.options.sorter || _this.sorter;
            _this.source = _this.options.source || _this.source;
            AKjs_UserAgent();
            if (!_this.source.length) {
                var ajax = _this.options.ajax;
                if (typeof ajax === "string") {
                    _this.ajax = $.extend({},
                        $.fn.AKjs_Typeahead.defaults.ajax, {
                            url: ajax
                        })
                } else {
                    _this.ajax = $.extend({},
                        $.fn.AKjs_Typeahead.defaults.ajax, ajax)
                }
                if (!_this.ajax.url) {
                    _this.ajax = null
                }
            }
            _this.init();
            _this.listen()
        });
    };
    AKjs_Typeahead.prototype = {
        constructor: AKjs_Typeahead,
        init: function() {
            var that = this;
            that.$element.bind("focus", function() {
                that.ele_show(1);
                if (that.$element.val().length === 0 && that.$menu.children("ul").find("li").length === 0 && that.$menu.outerHeight() < 10) {
                    that.$menu.children("ul").hide();
                    that.options.CallBack(true,$(this),that.$menu);
                } else {
                    that.$menu.children("ul").show();
                    that.options.CallBack(false,$(this),that.$menu);
                }
            });
            $(document).on("mousedown", function(e) {
                if ($(e.target).closest(that.$menu).length === 0 && $(e.target).closest(that.$element).length === 0) {
                    that.$menu.hide();
                    that.options.CallBack(false,$(this),that.$menu);
                }
            });
            that.$element.bind("input propertychange", function() {
                that.ele_show(1);
                that.options.CallBack(false,$(this),that.$menu);
                if (that.$element.val().length === 0 && that.$menu.children("ul").find("li").length === 0) {
                    that.$menu.children("ul").hide();
                } else {
                    that.$menu.children("ul").show();
                }
                if (that.$element.val().length == 0) {
                    that.$menu.children("ul").empty();
                }
            });
        },
        show: function() {
            var that = this;
            that.ele_show();
            this.$menu.bind("touchstart",
                function() {
                    document.activeElement.blur();
                });
            return this
        },
        ele_show: function(flag) {
            var that = this;
            if (flag) {
                that.$menu.on("touchmove",
                    function(event) {
                        event.preventDefault()
                    })
            } else {
                that.$menu.unbind("touchmove")
            }
            that.$menu.show();
            if (IsMobile) {
                that.$element.parent().parent().addClass("ak-is_search w_100 zindex_show fix top_0 left_0");
                that.$menu.css({
                    "top": that.$element.parent().parent().outerHeight()-1,
                    "left": "0",
                    "width": "100%"
                });
                that.$menu.children("ul").addClass("bor_none scrolling_touch scrollbar").css({
                    "overflow-y": "scroll",
                    "height": $(window).height()
                });
                $("header").addClass("dis_opa_0");
                $("main").addClass("mt_0");
                $("#ak-scrollview").removeClass("scrolling_touch").addClass("ovh_im");
            } else {
                that.$menu.children("ul").find("li:last").addClass("mb_0");
                that.$menu.addClass(that.options.boxClass);
                that.$menu.css({
                    "top": that.$element.offset().top + that.$element.outerHeight(),
                    "left": that.$element.offset().left,
                    "width": that.options.boxsize[0]
                });
                that.$menu.children("ul").addClass("scrolling_touch scrollbar").css({
                    "overflow-y": "scroll",
                    "max-height": that.options.boxsize[1]
                });
                $(window).resize(function () {
                    that.$menu.css({
                        "top": that.$element.offset().top + that.$element.outerHeight(),
                        "left": that.$element.offset().left
                    });
                });
                if ($('#ak-scrollview').length > 0) {
                    var $scrollbar = $("#ak-scrollview");
                } else {
                    var $scrollbar = $("main");
                }
                $scrollbar.scroll(function(){
                    that.$menu.hide();
                });
                $(window).scroll(function(){
                    that.$menu.hide();
                });
            }
            $(window).bind("hashchange", function() {
                that.$menu.remove();
                $("header").removeClass("dis_opa_0");
                if ($("header").not("aside header").hasClass("dis_none_im") || $("header").not("aside header").length === 0) {
                    $("main").addClass("mt_0");
                } else {
                    $("main").removeClass("mt_0");
                }
                $("#ak-scrollview").addClass("scrolling_touch");
            });
            that.options.showCallBack(that.$menu);
            that.shown = true
        },
        hide: function() {
            if (IsMobile) {
                this.$element.parent().parent().removeClass("ak-is_search w_100 zindex_show fix top_0 left_0");
                $("header").removeClass("dis_opa_0");
                if ($("header").not("aside header").hasClass("dis_none_im") || $("header").not("aside header").length === 0) {
                    $("main").addClass("mt_0");
                } else {
                    $("main").removeClass("mt_0");
                }
                $("#ak-scrollview").addClass("scrolling_touch").removeClass("ovh_im");
            }
            this.$menu.hide();
            this.shown = false;
            return this
        },
        eventSupported: function(eventName) {
            var isSupported = (eventName in this.$element);
            if (!isSupported) {
                this.$element.setAttribute(eventName, "return;");
                isSupported = typeof this.$element[eventName] === "function"
            }
            return isSupported
        },
        ajaxer: function() {
            var that = this,
                query = that.$element.val();
            if (query === that.query) {
                return that
            }
            that.query = query;
            if (that.ajax.timerId) {
                clearTimeout(that.ajax.timerId);
                that.ajax.timerId = null
            }
            if (!query || query.length < that.ajax.triggerLength) {
                if (that.ajax.xhr) {
                    that.ajax.xhr.abort();
                    that.ajax.xhr = null;
                    that.ajaxToggleLoadClass(false)
                }
                return that.shown ? that.hide() : that
            }
            that.ajax.timerId = setTimeout(function() {
                    $.proxy(that.ajaxExecute(query), that)
                },
                that.ajax.timeout);
            return that
        },
        ajaxExecute: function(query) {
            this.ajaxToggleLoadClass(true);
            if (this.ajax.xhr) {
                this.ajax.xhr.abort()
            }
            var params = this.ajax.preDispatch ? this.ajax.preDispatch(query) : {
                query: query
            };
            var jAjax = (this.ajax.method === "post") ? $.post: $.get;
            this.ajax.xhr = jAjax(this.ajax.url, params, $.proxy(this.ajaxLookup, this));
            this.ajax.timerId = null
        },
        ajaxLookup: function(data) {
            var items;
            this.ajaxToggleLoadClass(false);
            if (!this.ajax.xhr) {
                return
            }
            if (this.ajax.preProcess) {
                data = this.ajax.preProcess(data)
            }
            this.ajax.data = data;
            items = this.grepper(this.ajax.data);
            if (!items || !items.length) {
                return this.shown ? this.hide() : this
            }
            this.ajax.xhr = null;
            return this.render(items.slice(0, this.options.items)).show()
        },
        ajaxToggleLoadClass: function(enable) {
            if (!this.ajax.loadingClass) {
                return
            }
            this.$element.toggleClass(this.ajax.loadingClass, enable)
        },
        lookup: function(event) {
            var that = this,
                items;
            if (that.ajax) {
                that.ajaxer()
            } else {
                that.query = that.$element.val();
                if (!that.query) {
                    return that.shown ? that.hide() : that
                }
                items = that.grepper(that.source);
                if (!items || !items.length) {
                    return that.shown ? that.show() : that
                }
                return that.render(items.slice(0, that.options.items)).show()
            }
        },
        grepper: function(data) {
            var that = this,
                items;
            if (data && data.length && !data[0].hasOwnProperty(that.options.display)) {
                return null
            }
            items = $.grep(data,
                function(item) {
                    return that.matcher(item[that.options.display], item)
                });
            return this.sorter(items)
        },
        matcher: function(item) {
            return~item.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(items) {
            var that = this,
                beginswith = [],
                caseSensitive = [],
                caseInsensitive = [],
                item;
            while (item = items.shift()) {
                if (!item[that.options.display].toLowerCase().indexOf(this.query.toLowerCase())) {
                    beginswith.push(item)
                } else {
                    if (~item[that.options.display].indexOf(this.query)) {
                        caseSensitive.push(item)
                    } else {
                        caseInsensitive.push(item)
                    }
                }
            }
            return beginswith.concat(caseSensitive, caseInsensitive)
        },
        highlighter: function(item) {
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return item.replace(new RegExp("(" + query + ")", "ig"),
                function($1, match) {
                    return "<strong>" + match + "</strong>"
                })
        },
        render: function(items) {
            var that = this;
            this.$menu.html("<ul />");
            items = $(items).map(function(i, item) {
                i = $("<li class=\"touchstart\"></li>").attr("data-value", item[that.options.val]);
                if (item[that.options.custom] != undefined) {
                    i.html("<span class='fl'>"+that.highlighter(item[that.options.display], item)+"</span><span class='fr'>"+item[that.options.custom]+"</span>");
                } else {
                    i.html("<span class='fl'>"+that.highlighter(item[that.options.display], item)+"</span>");
                }
                return i[0]
            });
            items.first().addClass("ak-is_active");
            this.$menu.children("ul").html(items);
            return this
        },
        select: function() {
            var that = this;
            var $selectedItem = this.$menu.find(".ak-is_active").find("span.fl");
            setTimeout(function() {
                document.activeElement.blur();
                that.hide();
                that.$element.val($selectedItem.text()).change()
            }, 150);
            this.$menu.children("ul").empty();
            this.options.itemSelected($selectedItem, $selectedItem.parent().attr("data-value"), $selectedItem.text());
            return
        },
        next: function(event) {
            var active = this.$menu.find(".ak-is_active").removeClass("ak-is_active");
            var next = active.next();
            if (!next.length) {
                next = $(this.$menu.find("li")[0])
            }
            next.addClass("ak-is_active")
        },
        prev: function(event) {
            var active = this.$menu.find(".ak-is_active").removeClass("ak-is_active");
            var prev = active.prev();
            if (!prev.length) {
                prev = this.$menu.find("li").last()
            }
            prev.addClass("ak-is_active")
        },
        listen: function() {
            this.$element.on("blur", $.proxy(this.blur, this)).on("input propertychange", $.proxy(this.keyup, this));
            if (this.eventSupported("keydown")) {
                this.$element.on("keydown", $.proxy(this.keypress, this))
            } else {
                this.$element.on("keypress", $.proxy(this.keypress, this))
            }
            this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this))
        },
        keyup: function(e) {
            e.stopPropagation();
            e.preventDefault();
            switch (e.keyCode) {
                case 40:
                case 38:
                    break;
                case 9:
                case 13:
                    if (!this.shown) {
                        return
                    }
                    this.select();
                    break;
                case 27:
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
        },
        keypress: function(e) {
            e.stopPropagation();
            if (!this.shown) {
                return
            }
            switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    e.preventDefault();
                    this.prev();
                    break;
                case 40:
                    e.preventDefault();
                    this.next();
                    break
            }
        },
        blur: function(e) {
            var that = this;
            e.stopPropagation();
            e.preventDefault();
            if (that.$element.val().length == 0) {
                that.$menu.children("ul").hide();
            }
            setTimeout(function() {
                document.activeElement.blur();
            }, 150);
        },
        click: function(e) {
            var that = this;
            e.stopPropagation();
            e.preventDefault();
            if ($(e.target).closest(that.$menu.find("li")).length > 0) {
                that.select();
            }
        },
        mouseenter: function(e) {
            this.$menu.find(".ak-is_active").removeClass("ak-is_active");
            $(e.currentTarget).addClass("ak-is_active")
        }
    };
    $.fn.AKjs_Typeahead = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data("ak_typeahead"),
                options = typeof option === "object" && option;
            if (!data) {
                $this.data("ak_typeahead", (data = new AKjs_Typeahead(this, options)))
            }
            if (typeof option === "string") {
                data[option]()
            }
        })
    };
    $.fn.AKjs_Typeahead.defaults = {
        source: [],
        items: 20,
        display: "name",
        val: "id",
        custom: "text",
        boxsize: ["20rem","30rem"],
        boxClass: "",
        CallBack: function() {},
        showCallBack: function() {},
        itemSelected: function() {},
        ajax: {
            url: null,
            timeout: 300,
            method: "post",
            triggerLength: 3,
            loadingClass: null,
            displayField: null,
            preDispatch: null,
            preProcess: null
        }
    };
    $.fn.AKjs_Typeahead.Constructor = AKjs_Typeahead;
    $(function() {
        $("body").on("focus.ak_typeahead.data-api", '[data-provide="ak_typeahead"]',
            function(e) {
                var $this = $(this);
                if ($this.data("ak_typeahead")) {
                    return
                }
                e.preventDefault();
                $this.AKjs_Typeahead($this.data())
            })
    })
} (jQuery));

/*-----------------------------------------------AKjs_TypeIt (2018-12-13)--------------------------------------------*/
(function($) {
    var AKjs_TypeIt = function(el, options) {
        this.el = $(el);
        this.options = $.extend({}, $.fn.AKjs_TypeIt.defaults, options);
        this.isInput = this.el.is('input');
        this.attr = this.options.attr;
        this.showCursor = this.isInput ? false : this.options.showCursor;
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();
        this.contentType = this.options.contentType;
        this.typeSpeed = this.options.typeSpeed;
        this.startDelay = this.options.startDelay;
        this.backSpeed = this.options.backSpeed;
        this.backDelay = this.options.backDelay;
        this.stringsElement = this.options.stringsElement;
        this.strings = this.options.strings;
        this.strPos = 0;
        this.arrayPos = 0;
        this.stopNum = 0;
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;
        this.stop = false;
        this.cursorChar = this.options.cursorChar;
        this.shuffle = this.options.shuffle;
        this.sequence = [];
        this.build();
    };
    AKjs_TypeIt.prototype = {
        constructor: AKjs_TypeIt,
        init: function() {
            var self = this;
            self.timeout = setTimeout(function() {
                for (var i=0;i<self.strings.length;++i) self.sequence[i]=i;
                if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);
                self.typewrite(self.strings[self.sequence[self.arrayPos]], self.strPos);
            }, self.startDelay);
        },
        build: function() {
            var self = this;
            if (this.showCursor === true) {
                this.cursor = $("<span class=\"ak-TypeIt-cursor\">" + this.cursorChar + "</span>");
                this.el.after(this.cursor);
            }
            if (this.stringsElement) {
                this.strings = [];
                this.stringsElement.hide();
                console.log(this.stringsElement.children());
                var strings = this.stringsElement.children();
                $.each(strings, function(key, value){
                    self.strings.push($(value).html());
                });
            }
            this.init();
        },
        typewrite: function(curString, curStrPos) {
            if (this.stop === true) {
                return;
            }
            var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var self = this;
            self.timeout = setTimeout(function() {
                var charPause = 0;
                var substr = curString.substr(curStrPos);
                if (substr.charAt(0) === '^') {
                    var skip = 1;
                    if (/^\^\d+/.test(substr)) {
                        substr = /\d+/.exec(substr)[0];
                        skip += substr.length;
                        charPause = parseInt(substr);
                    }
                    curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
                }
                if (self.contentType === 'html') {
                    var curChar = curString.substr(curStrPos).charAt(0);
                    if (curChar === '<' || curChar === '&') {
                        var tag = '';
                        var endTag = '';
                        if (curChar === '<') {
                            endTag = '>'
                        }
                        else {
                            endTag = ';'
                        }
                        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
                            tag += curString.substr(curStrPos).charAt(0);
                            curStrPos++;
                            if (curStrPos + 1 > curString.length) { break; }
                        }
                        curStrPos++;
                        tag += endTag;
                    }
                }
                self.timeout = setTimeout(function() {
                    if (curStrPos === curString.length) {
                        self.options.onString(self.arrayPos);
                        if (self.arrayPos === self.strings.length - 1) {
                            self.options.callback(self);
                            self.curLoop++;
                            if (self.loop === false || self.curLoop === self.loopCount)
                                return;
                        }

                        self.timeout = setTimeout(function() {
                            self.backspace(curString, curStrPos);
                        }, self.backDelay);

                    } else {
                        if (curStrPos === 0) {
                            self.options.preString(self.arrayPos);
                        }
                        var nextString = curString.substr(0, curStrPos + 1);
                        if (self.attr) {
                            self.el.attr(self.attr, nextString);
                        } else {
                            if (self.isInput) {
                                self.el.val(nextString);
                            } else if (self.contentType === 'html') {
                                self.el.html(nextString);
                            } else {
                                self.el.text(nextString);
                            }
                        }
                        curStrPos++;
                        self.typewrite(curString, curStrPos);
                    }
                }, charPause);
            }, humanize);
        },
        backspace: function(curString, curStrPos) {
            if (this.stop === true) {
                return;
            }
            var humanize = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var self = this;
            self.timeout = setTimeout(function() {
                if (self.contentType === 'html') {
                    if (curString.substr(curStrPos).charAt(0) === '>') {
                        var tag = '';
                        while (curString.substr(curStrPos - 1).charAt(0) !== '<') {
                            tag -= curString.substr(curStrPos).charAt(0);
                            curStrPos--;
                            if (curStrPos < 0) { break; }
                        }
                        curStrPos--;
                        tag += '<';
                    }
                }
                var nextString = curString.substr(0, curStrPos);
                if (self.attr) {
                    self.el.attr(self.attr, nextString);
                } else {
                    if (self.isInput) {
                        self.el.val(nextString);
                    } else if (self.contentType === 'html') {
                        self.el.html(nextString);
                    } else {
                        self.el.text(nextString);
                    }
                }
                if (curStrPos > self.stopNum) {
                    curStrPos--;
                    self.backspace(curString, curStrPos);
                }
                else if (curStrPos <= self.stopNum) {
                    self.arrayPos++;

                    if (self.arrayPos === self.strings.length) {
                        self.arrayPos = 0;
                        if(self.shuffle) self.sequence = self.shuffleArray(self.sequence);
                        self.init();
                    } else
                        self.typewrite(self.strings[self.sequence[self.arrayPos]], curStrPos);
                }
            }, humanize);
        },
        shuffleArray: function(array) {
            var tmp, current, top = array.length;
            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
            return array;
        }
    };
    $.fn.AKjs_TypeIt = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('TypeIt'),
                options = typeof option == 'object' && option;
            $this.data('TypeIt', (data = new AKjs_TypeIt(this, options)));
            if (typeof option == 'string') data[option]();
        });
    };
    $.fn.AKjs_TypeIt.defaults = {
        strings: [],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: false,
        backDelay: 500,
        loop: false,
        loopCount: false,
        showCursor: true,
        cursorChar: "|",
        attr: null,
        contentType: 'html',
        callback: function() {},
        preString: function() {},
        onString: function() {}
    };
} (jQuery));

/*-----------------------------------------------AKjs_Validate (2018-12-13)--------------------------------------------*/
(function($) {
    $.fn.AKjs_Validate = function(setting) {
        var option = $.extend({
                valid: "",
                VerifyClass: "c_red",
                focusBack: function() {},
                clickBack: function() {}
            },
            setting);
        AKjs_RegsInput();
        var form = $(this);
        var ctrls = form.find('[data-valid]');
        var isDiy = false;
        $.each(option.valid, function(key, val) {
            if (option.valid[key].hasOwnProperty('success')) {
                return ! (isDiy = true);
            }
        });
        $.each(ctrls, function(index, ele) {
            var key = $(ele).attr('data-valid');
            $(ele).parent().find("sub").remove();
            $(ele).parent().append("<sub class='dis_none_im' style='white-space: pre;line-height: "+$(ele).outerHeight()+"px;' data-error='"+key+"' />");
            $(ele).on('change', function() {
                if (!test(ele, key)) {
                    $(ele).focus();
                    option.focusBack($(ele),index,false);
                } else {
                    option.focusBack($(ele),index,true);
                }
            });
        });
        form.find(":submit").on("click", function(ev) {
            if (form.find('[type="submit"]').disabled()) {
                ev.preventDefault();
            }
            var vResult = true;
            var isFocus = true;
            $.each(ctrls, function(index, ele) {
                var key = $(ele).attr('data-valid');
                if (!test(ele, key)) {
                    if (isFocus) {
                        $(ele).focus();
                        option.focusBack($(ele),index,false);
                        isFocus = false;
                    }
                    vResult = false;
                    if (!isDiy) {
                        return false;
                    }
                }
            });
            if (option.clickBack && option.clickBack.constructor === Function) {
                ev.preventDefault();
                if (vResult) {
                    option.clickBack($(this), form, true);
                } else {
                    option.clickBack($(this), form, false);
                }
            } else {
                if (!vResult) {
                    ev.preventDefault();
                }
            }
        });
        function test(ele, key) {
            var va = option.valid[key];
            var errDom = isDiy ? null: form.find('[data-error="' + key + '"]');
            if ($(ele).prop('type') == 'radio' || $(ele).prop('type') == 'checkbox') {
                return $.inRange(form.find('[data-valid="' + key + '"]:checked').length, va.norm) ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.empty, va.error);
            } else if (va.norm.context) {
                return $(ele).val() == va.norm.val() && $(ele).val().length > 0 ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.empty, va.error);
            } else {
                return va.norm.test($(ele).val()) ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.empty, va.error);
            }
        }
        function fnError(ts, va, errDom, empty, error) {
            if (ts.val().length < 1) {
                if (empty != undefined) {
                    errDom.removeClass("dis_none_im").addClass('abs ml_05rem '+option.VerifyClass).html("* "+empty);
                } else {
                    errDom.removeClass("dis_none_im").addClass('abs ml_05rem '+option.VerifyClass).html("* "+error);
                }
            } else {
                if (isDiy) {
                    va.error(ts);
                } else {
                    errDom.removeClass("dis_none_im").addClass('abs ml_05rem '+option.VerifyClass).html("* "+error);
                }
            }
            return false;
        }
        function fnSuccess(ts, va, errDom) {
            if (isDiy) {
                va.success(ts);
            } else {
                setTimeout(function() {
                    errDom.addClass("dis_none_im").removeClass('abs ml_05rem '+option.VerifyClass).html('');
                }, 200);
            }
            return true;
        }
        $.fn.message = function(status,str) {
            var _ts = $(this);
            if (status == true) {
                _ts.parent().children("text").remove();
                _ts.parent().children("sub").addClass("dis_none_im");
                if (typeof str != undefined && str !="" && str !=null) {
                    _ts.parent().append("<text style='white-space: pre;line-height: "+_ts.outerHeight()+"px;' />");
                    _ts.parent().children("text").addClass('abs ml_05rem '+option.VerifyClass).html("* "+str);
                }
                _ts.focus();
                $("button#ak-validateBtn").remove();
                form.find(":submit").parent().append("<button type='button' id='ak-validateBtn' class='"+form.find(":submit").attr("class")+"'>"+form.find(":submit").text()+"</button>");
                form.find(":submit").addClass("dis_none_im");
                $("button#ak-validateBtn").removeClass("dis_none_im");
                $("button#ak-validateBtn").on("click", function(ev) {
                    ev.preventDefault();
                    _ts.focus();
                });
            }
            if (status == false) {
                _ts.parent().children("text").removeClass('abs ml_05rem '+option.VerifyClass).html("").remove();
                form.find(":submit").removeClass("dis_none_im");
                $("button#ak-validateBtn").remove();
            }
            return _ts.hasClass('dis_none_im');
        };
    };
    $.fn.disabled = function(status) {
        var _ts = $(this);
        if (status == true) {
            _ts.addClass('disabled');
            _ts.attr('disabled', true);
        }
        if (status == false) {
            _ts.removeClass('disabled');
            _ts.attr('disabled', false);
        }
        return _ts.hasClass('disabled') || typeof _ts.attr('disabled') != 'undefined';
    };
    $.inRange = function(num, range) {
        if (typeof range == 'string') {
            range = range.replace(/ /g, '');
        }
        if (!/^\(|\)|\[|\]$/.test(range)) {
            return num == parseFloat(range);
        } else if (/^\(\d*\.?\d*,[\)\]]$/.test(range)) {
            return num > parseFloat(range.replace(/\(|,|\)/g, ''));
        } else if (/^[\[\(],\d*\.?\d*\)$/.test(range)) {
            return num < parseFloat(range.replace(/\(|,|\)/g, ''));
        } else if (/^\(\d*\.?\d*,\d*\.?\d*\)$/.test(range)) {
            var arr = range.replace(/\(|\)/g, '').split(',');
            return num > parseFloat(arr[0]) && num < parseFloat(arr[1]);
        } else if (/^\[\d*\.?\d*,[\)\]]$/.test(range)) {
            return num >= parseFloat(range.replace(/\[|,|\)/g, ''));
        } else if (/^[\[\(],\d*\.?\d*\]$/.test(range)) {
            return num <= parseFloat(range.replace(/\(|,|\]/g, ''));
        } else if (/^\[\d*\.?\d*,\d*\.?\d*\]$/.test(range)) {
            var arr = range.replace(/\[|\]/g, '').split(',');
            return num >= parseFloat(arr[0]) && num <= parseFloat(arr[1]);
        } else if (/^\(\d*\.?\d*,\d*\.?\d*\]$/.test(range)) {
            var arr = range.replace(/\(|\]/g, '').split(',');
            return num > parseFloat(arr[0]) && num <= parseFloat(arr[1]);
        } else if (/^\[\d*\.?\d*,\d*\.?\d*\)$/.test(range)) {
            var arr = range.replace(/\[|\)/g, '').split(',');
            return num >= parseFloat(arr[0]) && num < parseFloat(arr[1]);
        } else {
            return false;
        }
    }
} (jQuery));

/*-----------------------------------------------AKjs_Viewer (2018-12-13)--------------------------------------------*/
(function($) {
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
                    })) : $this.on($event_click, $.proxy(this.start, this))));
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
                case "canvas":
                    this.isPlayed ? this.stop() : this.options.inline ? this.isFulled ? this.exit() : this.full() : this.hide();
                    break;
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
            options.inline || this.transitioning || (this.isBuilt || this.build(),
            $.isFunction(options.show) && this.$element.one($event_show, options.show),
            this.trigger($event_show).isDefaultPrevented() || (this.$body.removeClass($class_open),
                $viewer = this.$viewer.removeClass($class_hide),
                this.$element.one($event_shown, $.proxy(function() {
                        this.view(this.target ? this.$images.index(this.target) : this.index),
                            this.target = !1
                    },
                    this)),
                options.transition ? (this.transitioning = !0, $viewer.addClass($class_transition),
                    forceReflow($viewer[0]),
                    $viewer.one($event_transitionend, $.proxy(this.shown, this)).addClass($class_in)) : ($viewer.addClass($class_in), this.shown())))
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
        '<div class="ak-viewer-canvas" data-action="canvas"></div>' +
        '<div class="ak-viewer-footer animated slideInUp h_10rem bg_black07">' +
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
} (jQuery));

/*-----------------------------------------------AKjs_Waterfall (2018-12-13)--------------------------------------------*/
(function($) {
    var pluginName = 'AKjs_Waterfall',
        defaults = {
            scrollDom:$(window),
            spacingWidth: 5,
            spacingHeight: 5,
            minColCount: 2,
            itemAlign: "center",
            isFadeIn: true,
            Callback: null,
            ajaxCallback: null
        };

    function AKjs_Waterfall(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, defaults, options);
        this.ajaxLoading = false;
        this.colHeightArray = [];
        this._init();
    }

    AKjs_Waterfall.prototype = {
        constructor: AKjs_Waterfall,
        _init: function () {
            var $this = this;
            this.options.Callback(this.$element);
            this.$element.addClass("dis_opa_0");
            setTimeout(function() {
                $this._positionAll();
                if (!$this.$element.hasClass("dis_opa_0")) {
                    $(".ak-waterfall-down").addClass("dis_none").removeClass("abs top_0 w_100").remove();
                }
            },1000);
            $(window).resize(function(){
                $this._positionAll();
            });
            this._doScroll();
        },
        _getColumnCount: function () {
            var eleWidth = this.$element.width(),
                $item = this.$element.children(),
                itemWidth = $item.eq(0).outerWidth(),
                iCol = Math.floor(eleWidth / (itemWidth + this.options.spacingWidth)),
                realWidth = 0,
                leftOffset = 0;
            iCol = iCol > this.options.minColCount ? iCol : this.options.minColCount;
            realWidth = iCol * itemWidth;
            if(eleWidth > realWidth) {
                leftOffset = Math.floor((eleWidth - realWidth - iCol * this.options.spacingWidth) / 2);
            }
            this.itemWidth = itemWidth;
            this.cols = iCol;
            this.leftOffset = this.options.itemAlign == "center" ? leftOffset : 0;
        },
        _positionAll: function () {
            var $this = this,
                $item = $this.$element.children(),
                minHeight,
                minIndex;
            this.colHeightArray = [];
            this.$element.addClass("ak-waterfall").removeClass("dis_opa_0");
            this._getColumnCount();
            $item.each(function(index) {
                if(index < $this.cols) {
                    $(this).css("top", 0);
                    $(this).css("left", $this.leftOffset + index * $this.itemWidth + index * $this.options.spacingWidth);
                    $this.colHeightArray.push($(this).outerHeight());
                } else {
                    minHeight = Math.min.apply(null, $this.colHeightArray);
                    minIndex = $.inArray(minHeight, $this.colHeightArray);
                    $(this).css("top", minHeight + $this.options.spacingHeight);
                    $(this).css("left", $item.eq(minIndex).offset().left - $this.$element.offset().left);
                    $this.colHeightArray[minIndex] += $(this).outerHeight() + $this.options.spacingHeight;
                }
                if($this.options.isFadeIn) {
                    $(this).animate({
                        "opacity": 1
                    }, 1000);
                }
            });
            this.$element.css("height", Math.max.apply(null, $this.colHeightArray));
        },
        _doScroll: function () {
            var $this = this,
                scrollTimer;
            var $container = $this.options.scrollDom;
            $container.on('scroll', function (andrew) {
                andrew.preventDefault();
                if(scrollTimer) {
                    clearTimeout(scrollTimer);
                }
                scrollTimer = setTimeout(function() {
                    var $first_top = $this.$element.children().first().offset().top,
                        scrollTop = $container.scrollTop() + $container.height();

                    if(!$this.ajaxLoading && scrollTop > Math.max.apply(null, $this.colHeightArray) + $first_top) {
                        $this.ajaxLoading = true;
                        $this.options.ajaxCallback && $this.options.ajaxCallback(
                            $this.$element,
                            function() {
                                $this._positionAll();
                            },
                            function() {
                                $this.ajaxLoading = false;
                            }
                        );
                    }
                }, 100);
            });
        }
    };
    $.fn[pluginName] = function (options) {
        this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new AKjs_Waterfall(this, options));
            }
        });
        return this;
    }
} (jQuery));

/*-----------------------------------------------AKjs_WebToast (2018-12-13)--------------------------------------------*/
function AKjs_WebToast() {
    var dcfg = {
        message: "",
        position: "bottom",
        mask: "mask",
        time: ""
    };
    var AKjs_WebToast = ".ak-webtoast";
    var sub_AKjs_WebToast = AKjs_WebToast.substring(1,AKjs_WebToast.length);
    var len = arguments.length;

    if (len > 0) {
        var arg0 = arguments[0]; /*message*/
        var arg1 = arguments[1]; /*position*/
        var arg2 = arguments[2]; /*mask*/
        var arg3 = arguments[3]; /*time*/
        var regx = /(bottom|top|middle)/i;
        var regy = /(mask)/i;
        var numRegx = /[1-9]\d*/;
        if (arg0) {
            dcfg.message = arg0;
        }
        if (regx.test(arg1)) {
            dcfg.position = arg1;
        }
        if (regy.test(arg2) || arg2=="") {
            dcfg.mask = arg2;
            if (numRegx.test(arg3)) {
                dcfg.time = arg3;
            }
        } else {
            dcfg.time = arg2;
        }

    }
    if ("mask" == arg2) {
        var ret = "<div class='"+sub_AKjs_WebToast+" animated fadeIn'><div class='ak-mask'></div><h3>" + dcfg.message + "</h3></div>";
    } else {
        var ret = "<div class='"+sub_AKjs_WebToast+" animated fadeIn'><h3>" + dcfg.message + "</h3></div>";
    }
    if ($(AKjs_WebToast).length <= 0) {
        $("body").append(ret);
    } else {
        $(AKjs_WebToast).css("left", "");
        if ("mask" == arg2) {
            ret = "<div class='ak-mask'></div><h3>" + dcfg.message + "</h3>";
        } else {
            ret = "<h3>" + dcfg.message + "</h3>";
        }
        $(AKjs_WebToast).html(ret);
    }
    setTimeout(function () {
        $(AKjs_WebToast).fadeIn();
        ToastSetting();
    }, 100);

    $(window).resize(function(){
        ToastSetting();
    });
    function ToastSetting() {
        var w = $(AKjs_WebToast).children("h3").width(),
            ww = $(window).width();
        $(AKjs_WebToast).children("h3").css("left", (ww - w) / 2);
        if ("bottom" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", 50);
            $(AKjs_WebToast).children("h3").css("top", "");
        } else if ("top" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", "");
            $(AKjs_WebToast).children("h3").css("top", 50);
        } else if ("middle" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", "");
            $(AKjs_WebToast).children("h3").css("top", "");
            var h = $(AKjs_WebToast).children("h3").height(),
                hh = $(window).height();
            $(AKjs_WebToast).children("h3").css("bottom", (hh - h) / 2 - 20);
        }
    }
    if (dcfg.message==="destroy") {
        $(AKjs_WebToast).fadeOut().remove();
    }
    if (dcfg.time) {
        setTimeout(function() {
            $(AKjs_WebToast).fadeOut().remove();
        }, dcfg.time);
    }
}