/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Vticker--------------------------------------*/
(function($) {
    $.fn.AKjs_Vticker = function(setting) {
        var option = $.extend({
                speed: 500,
                pause: 3000,
                showItems: 3,
                mousePause: true,
                isPaused: false,
                direction: "up",
                height: 0
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
                    option.direction == "up" ? moveUp(ele, LiHeight, option) : moveDown(ele, LiHeight, option)
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
})(jQuery);