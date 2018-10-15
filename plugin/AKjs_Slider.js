/*
Modification Date: 2018-10-15
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Slider------------------------------------------*/
(function($){
    var AKjs_Slider = function(ele, opt) {
        var self = this;
        self.$element = ele;
        self.defaults = {
            fullpage: false,
            UpDown: false,
            start: 1,
            SlideAni: false,
            speed: 500,
            interval: 5000,
            touchPlay: true,
            autoPlay: false,
            HoverPause: true,
            loopPlay: true,
            dotShow: true,
            arrShow: true,
            dotClass:"",
            arrClass:"",
            CustomHeight: false,
            ActiveClass: "bg_title",
            afterSlider: function() {}
        };
        self.clickable = true;
        self.options = $.extend({}, self.defaults, opt);
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
                        var arrElement = '<button type="button" class="ak-arr_prev">&and;</button><button type="button" class="ak-arr_next">&or;</button>';
                    } else {
                        var arrElement = '<button type="button" class="ak-arr_prev">&lt;</button><button type="button" class="ak-arr_next">&gt;</button>';
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
                            $(ele).children("ol").addClass("bottom_au right_0 mr_1em");
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
                        if (self.clickable) {
                            if (index >= SliderSize) {
                                index = 1;
                            } else {
                                index += 1;
                            }
                            self.moveTo(index, "ak-arr_next");
                        }
                    });
                ele.find(".ak-arr_prev").unbind("click");
                ele.find(".ak-arr_prev").on("click",
                    function(event) {
                        event.preventDefault();
                        if (self.clickable) {
                            if (index == 1) {
                                index = SliderSize;
                            } else {
                                index -= 1;
                            }
                            self.moveTo(index, "ak-arr_prev");
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
                if (self.options.HoverPause) {
                    ele.hover(function () {
                            timer = clearInterval(timer)
                        },
                        function () {
                            timer = setInterval(play, self.options.interval)
                        });
                }
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
            if (self.options.touchPlay) {
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
                if (self.options.SlideAni) {
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
                } else {
                    sliderInder.children(".dis_block_im").stop().animate({
                            left: 0
                        }, self.options.speed,
                        function() {
                            var _this = $(this);
                            setTimeout(function () {
                                _this.removeClass("dis_block_im zindex_2");
                            },self.options.speed);
                        });
                    SliderLi.eq(index - 1).addClass("dis_block_im zindex_2").stop().animate({
                            left: 0
                        },self.options.speed,
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
                self.options.afterSlider(index,SliderLi.eq(index - 1));
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
}(jQuery));