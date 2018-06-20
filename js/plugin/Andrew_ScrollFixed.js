/*
Modification Date: 2018-06-20
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_ScrollFixed-------------------------------------*/
(function($){
    $.fn.Andrew_ScrollFixed = function(setting) {
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
                },
                ScrollUp: function () {
                },
                ScrollDown: function () {
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
                Andrew_sUserAgent();
                var $scrollbar = $("main");
                if($("header").length != 0) {
                    var Scroll_ele_h = $("header").outerHeight();
                } else {
                    var Scroll_ele_h = 0;
                }
                if (Scroll_ele.length > 0) {
                    var Scroll_ele_offset = Scroll_ele.offset().top
                }
                option.callback(Scroll_ele);
                $scrollbar.scroll(function(){
                    if ($("header").length > 0) {
                        var scrolltop= $scrollbar.scrollTop() + $("header").outerHeight();
                    } else {
                        var scrolltop = $scrollbar.scrollTop();
                    }
                    if (option.animated) {
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
                        option.scroll(Scroll_ele, scrolltop, Scroll_ele_offset);
                    } else {
                        var before = $(this).scrollTop();
                        $(this).scroll(function () {
                            var after = $(this).scrollTop();
                            if (before < after) {
                                option.ScrollDown(Scroll_ele, after, Scroll_ele_offset);
                                before = after;
                            }
                            if (before > after) {
                                option.ScrollUp(Scroll_ele, after, Scroll_ele_offset);
                                before = after;
                            }
                            option.scroll(Scroll_ele, after, Scroll_ele_offset);
                        });
                    }
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