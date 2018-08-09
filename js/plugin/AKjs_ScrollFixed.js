/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ScrollFixed-------------------------------------*/
(function($){
    $.fn.AKjs_ScrollFixed = function(setting) {
        var option = $.extend({
                ScrollFixed: false,
                zPosition: "",
                animated: "",
                top: 0,
                callback:function(){
                },
                exitback:function(){
                },
                scroll:function(){
                }
            },
            setting);
        var Scroll_ele = $(this);
        if (option.ScrollFixed == true) {
            setTimeout(function() {
                scrollbar_fun();
            },100);
            $(window).bind('hashchange', function () {
                option.exitback(Scroll_ele);
            });
            function scrollbar_fun() {
                AKjs_UserAgent();
                var $scrollbar = $("#ak-scrollview");
                if($("header").length != 0) {
                    var Scroll_ele_h = $("header").outerHeight();
                } else {
                    var Scroll_ele_h = 0;
                }
                if (Scroll_ele.length > 0) {
                    var Scroll_ele_offset = Scroll_ele.offset().top
                }
                option.callback(Scroll_ele);
                var topValue = 0,
                    interval = null;
                $scrollbar.scroll(function(){
                    option.scroll(Scroll_ele, $scrollbar.scrollTop(), Scroll_ele_offset);
                    if(interval == null) {
                        interval = setInterval(function() {
                            if($scrollbar.scrollTop() == topValue) {
                                option.callback(Scroll_ele);
                                clearInterval(interval);
                                interval = null;
                            } else {
                                if ($("header").length > 0) {
                                    var scrolltop= $scrollbar.scrollTop() + $("header").outerHeight();
                                } else {
                                    var scrolltop = $scrollbar.scrollTop();
                                }
                                if (option.animated) {
                                    if (scrolltop > Scroll_ele_offset) {
                                        Scroll_ele.addClass("fix w_100 top_0 animated " + option.animated);
                                        Scroll_ele.css({
                                            "margin-top": Scroll_ele_h + option.top,
                                            "z-index": option.zPosition
                                        });
                                        if ($("header").hasClass("dis_none_im")) {
                                            Scroll_ele.css({
                                                "margin-top": 0
                                            });
                                        }
                                    } else {
                                        Scroll_ele.removeClass("fix w_100 top_0 animated " + option.animated);
                                        Scroll_ele.removeAttr("style");
                                    }
                                }
                            }
                        }, 1000);
                    }
                    topValue = $scrollbar.scrollTop();
                });

                if (IsMobile) {
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
        }
    };
}(jQuery));