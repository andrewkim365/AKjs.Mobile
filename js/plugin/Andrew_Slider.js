/*-----------------------------------------------Andrew_Slider------------------------------------------*/
(function($){
    var Andrew_Slider = function(ele, opt) {
        var self = this;
        self.$element = ele,
            self.defaults = {
                start: 1,
                speed: 500,
                interval: 5000,
                autoPlay: false,
                loopPlay: true,
                dotShow: true,
                arrShow: true,
                dotClass:"",
                arrClass:"",
                ActiveClass: "bg_title",
                afterSlider: function() {}
            },
            self.clickable = true,
            self.options = $.extend({},
                self.defaults, opt)
    };
    Andrew_Slider.prototype = {
        init: function() {
            var self = this,
                ele = self.$element;
            var sliderInder = ele.children("ul");
            var SliderLi = sliderInder.children("li");
            var SliderSize = SliderLi.length;
            var index = self.options.start;
            var touchStartY = 0,
                touchStartX = 0;
            if (self.options.arrShow) {
                var arrElement = '<button type="button" class="ak-arr_prev">&lt;</button><button type="button" class="ak-arr_next">&gt;</button>';
                ele.append(arrElement);
                ele.find("button").addClass(self.options.arrClass);
                ele.find("button.ak-arr_prev").css({
                    "left": ele.find("button.ak-arr_prev").outerWidth()/2
                });
                ele.find("button.ak-arr_next").css({
                    "right": ele.find("button.ak-arr_next").outerWidth()/2
                });
            }
            for (i = 1; i <= SliderSize; i++) {
                if (index == i) {
                    SliderLi.eq(index - 1).addClass("dis_block_im")
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
                ele.append(dotElement);
            }
            var resize = function() {
                ele.addClass("ak-Slider");
                if (self.options.arrShow) {
                    var arrOffset = (ele.outerHeight() - ele.find("button").outerHeight()) / 2;
                    ele.find("button").css("top", arrOffset + "px");
                }
                if (self.options.dotShow) {
                    var dots = ele.children("ol");
                    dots.find("li").addClass(self.options.dotClass);
                    var dotWidth = (SliderSize+1) * dots.find("li").eq(0).outerWidth();
                    var dotOffset = (ele.outerWidth() - dotWidth) / 2;
                    dots.css({
                        "left": dotOffset + "px"
                    });
                }
            };
            resize();
            $(window).resize(function() {
                resize()
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
                ele.hover(function() {
                        timer = clearInterval(timer)
                    },
                    function() {
                        timer = setInterval(play, self.options.interval)
                    })
            }
            SliderLi.on({
                touchstart: function(e) {
                    touchStartY = e.originalEvent.touches[0].clientY;
                    touchStartX = e.originalEvent.touches[0].clientX;
                },
                touchend: function(e) {
                    var touchEndY = e.originalEvent.changedTouches[0].clientY,
                        touchEndX = e.originalEvent.changedTouches[0].clientX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;
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
                    if (Math.abs(xDiff) < Math.abs(yDiff)) {
                        if (yDiff > 5) {
                            e.preventDefault();
                        } else {
                            e.preventDefault();
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
                    if (self.options.loopPlay) {
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            e.preventDefault()
                        }
                    } else {
                        if (Math.abs(xDiff) < Math.abs(yDiff)) {
                            e.preventDefault()
                        }
                    }
                },
                mousedown: function(e) {
                    touchStartY = e.originalEvent.clientY;
                    touchStartX = e.originalEvent.clientX;
                },
                mouseup: function(e) {
                    var touchEndY = e.originalEvent.screenY,
                        touchEndX = e.originalEvent.screenX,
                        yDiff = touchStartY - touchEndY,
                        xDiff = touchStartX - touchEndX;
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
                    touchStartY = null;
                    touchStartX = null
                },
                mousemove: function(e) {
                    e.preventDefault();
                }
            })
        },
        moveTo: function(index, dir) {
            var self = this,
                ele = self.$element;
            var clickable = self.clickable;
            var dots_li = ele.children("ol").find("li");
            var sliderInder = ele.children("ul");
            var SliderLi = sliderInder.children("li");
            if (clickable) {
                self.clickable = false;
                var offset = ele.width();
                if (dir == "ak-arr_prev") {
                    offset = -1 * offset
                }
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
                self.options.afterSlider(index);
                dots_li.removeClass(self.options.ActiveClass);
                dots_li.eq(index - 1).addClass(self.options.ActiveClass);
            } else {
                return false
            }
        }
    };
    $.fn.Andrew_Slider = function(options) {
        var ak_Slider = new Andrew_Slider(this, options);
        return this.each(function() {
            ak_Slider.init()
        })
    }
}(jQuery));