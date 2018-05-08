/*-----------------------------------------------Andrew_Vticker--------------------------------------*/
(function($) {
    $.fn.Andrew_Vticker = function(c) {
        c = $.extend({
                speed: 500,
                pause: 3000,
                showItems: 3,
                mousePause: true,
                isPaused: false,
                direction: "up",
                height: 0
            }, c);
        moveUp = function(a, d, b) {
            if (!b.isPaused) {
                a = a.children();
                var f = a.children("li:first").clone(true);
                if (b.height > 0) d = a.children("li:first").outerHeight();
                a.animate({
                        top: "-=" + d
                    },
                    b.speed,
                    function() {
                        $(this).children("li:first").remove();
                        $(this).css("top", "0")
                    });
                f.appendTo(a)
            }
        };
        moveDown = function(a, d, b) {
            if (!b.isPaused) {
                a = a.children();
                var f = a.children("li:last").clone(true);
                if (b.height > 0) d = a.children("li:first").outerHeight();
                a.css("top", "-" + d).prepend(f);
                a.animate({
                        top: 0
                    },
                    b.speed,
                    function() {
                        $(this).children("li:last").remove()
                    });
            }
        };
        return this.each(function() {
            var a = $(this),
                d = 0;
            a.css({
                overflow: "hidden",
                position: "relative"
            }).children().css({
                position: "absolute"
            });
            if (c.height == 0) {
                a.children().children("li").each(function() {
                    if ($(this).outerHeight() > d) d = $(this).outerHeight()
                });
                a.children().children("li").each(function() {
                    $(this).height(d)
                });
                a.height(d * c.showItems)
            } else a.height(c.height);
            setInterval(function() {
                    c.direction == "up" ? moveUp(a, d, c) : moveDown(a, d, c)
                },
                c.pause);
            c.mousePause && a.bind("mouseenter",
                function() {
                    c.isPaused = true
                }).bind("mouseleave",
                function() {
                    c.isPaused = false
                })
        })
    }
})(jQuery);