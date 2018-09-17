/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Favorite-------------------------------------------*/
(function($) {
    $.fn.AKjs_Favorite = function(setting) {
        var options = $.extend({
                likeMode: true,
                str: "+1",
                icon_defaultClass: "",
                icon_changeClass: "",
                textClass: "c_white text_12em ml_02em mr_02em",
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
                        left = that.offset().left + that.width() / 2;
                        top = that.offset().top - 10
                    });
                    var left = that.offset().left + that.width() / 2;
                    var top = that.offset().top - 10;
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
                    } else {
                        $(this).children("span").text(options.text_default);
                    }
                    $(this).attr("data-value", count);
                    $(this).children("i").toggleClass(options.icon_defaultClass + " " + options.icon_changeClass);
                    options.callback(count, ele);
                }
            })
    }
} (jQuery));