/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_TouchDelete-------------------------------------*/
(function($){
    var Andrew_TouchDelete = function(ele, opt) {
        var self = this;
        self.$element = ele;
        self.defaults = {
            UpDownTouch: false,
            DelText: "",
            DelClass: "",
            ClickDelete: function() {},
            UpTouch: function() {},
            DownTouch: function() {}
        };
        self.options = $.extend({},
            self.defaults, opt);
        this.init = this.options.init || this.init;
        this.touch = this.options.touch || this.touch;
    };
    Andrew_TouchDelete.prototype = {
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
                touchStartX = 0;
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
                    if (self.options.UpDownTouch == true) {
                        if (Math.abs(xDiff) < Math.abs(yDiff)) {
                            if (yDiff > 5) {
                                self.options.UpTouch($(this).parent());
                                self.init();
                            } else {
                                self.options.DownTouch($(this).parent());
                                self.init();
                            }
                        }
                    }
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
                    if (self.options.UpDownTouch == true) {
                        e.preventDefault();
                    } else {
                        if (Math.abs(xDiff) > Math.abs(yDiff)) {
                            e.preventDefault()
                        }
                    }
                },
                mousedown: function(e) {
                    touchStartY = e.originalEvent.clientY;
                    touchStartX = e.originalEvent.clientX;
                    $(this).children("button").unbind("click");
                    $(this).children("button").on('click', function (event) {
                        event.preventDefault();
                        self.options.ClickDelete($(this),$(this).parent(),$(this).parent().index());
                    });
                },
                mouseup: function(e) {
                    var touchEndY = e.originalEvent.screenY,
                        touchEndX = e.originalEvent.screenX,
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
                mousemove: function(e) {
                    e.preventDefault();
                }
            })
        }
    };
    $.fn.Andrew_TouchDelete = function(options) {
        var ak_TouchDelete = new Andrew_TouchDelete(this, options);
        return this.each(function() {
            ak_TouchDelete.init();
        })
    }
}(jQuery));