/*-----------------------------------------------Andrew_ScrollFixed-------------------------------------*/
(function($){
    $.fn.Andrew_ScrollFixed = function(setting) {
        var option = $.extend({
                ScrollFixed: false,
                zPosition: "1",
                animated: "slideInDown ani_05s",
                top: 0
            },
            setting);
        var Scroll_ele = $(this);
        if (option.ScrollFixed == true) {
            scrollbar_fun();
            $(window).resize(function(){
                scrollbar_fun();
            });
            function scrollbar_fun() {
                Andrew_sUserAgent();
                if(IsWechat) {
                    var $scrollbar = $(window);
                } else {
                    if($("header").length != 0 && $("footer").length != 0) {
                        var $scrollbar = $("main");
                        var Scroll_ele_h = $("header").outerHeight();
                    } else {
                        var $scrollbar = $(window);
                        var Scroll_ele_h = 0;
                    }
                }
                if (Scroll_ele.length > 0) {
                    var Scroll_ele_offset = Scroll_ele.offset().top
                }
                $scrollbar.scroll(function(){
                    if ($("header").length > 0) {
                        var scrolltop= $(this).scrollTop() + $("header").outerHeight();
                    } else {
                        var scrolltop = $(this).scrollTop();
                    }
                    if(scrolltop > Scroll_ele_offset){
                        Scroll_ele.addClass("fix w_100 top_0 animated "+option.animated);
                        Scroll_ele.css({
                            "margin-top": Scroll_ele_h + option.top,
                            "z-index": option.zPosition
                        });
                        if ($("header").hasClass("dis_none_im")) {
                            Scroll_ele.css({
                                "margin-top": 0
                            });
                        }
                    } else{
                        Scroll_ele.removeClass("fix w_100 top_0 animated "+option.animated);
                        Scroll_ele.removeAttr("style");
                    }
                });
                $('input[type="text"], input[type="password"], input[type="number"], input[type="tel"], input[type="email"]').focus(function () {
                    if (Scroll_ele.hasClass("fix")) {
                        Scroll_ele.addClass("dis_none");
                    }
                });
                $('input[type="text"], input[type="password"], input[type="number"], input[type="tel"], input[type="email"]').blur(function(){
                    Scroll_ele.removeClass("dis_none");
                });
                $('textarea').focus(function(){
                    if (Scroll_ele.hasClass("fix")) {
                        Scroll_ele.addClass("dis_none");
                    }
                });
                $('textarea').blur(function(){
                    Scroll_ele.removeClass("dis_none");
                });
            }
        }
    };
}(jQuery));