/*
Modification Date: 2018-09-21
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ScrollFixed-------------------------------------*/
(function($){
    $.fn.AKjs_ScrollFixed = function(setting) {
        var option = $.extend({
                ScrollFixed: true,
                scrollDom:"",
                scrollTop: 0,
                callback:function(){
                },
                scrollback:function(){
                }
            },
            setting);
        var Scroll_ele = $(this);
        if (option.ScrollFixed == true) {
            $(function() {
                scrollbar_fun();
            });
            $(window).resize(function () {
                scrollbar_fun();
            });
            function scrollbar_fun() {
                AKjs_UserAgent();
                option.callback(Scroll_ele);
                if (option.scrollDom) {
                    var $scrollbar = option.scrollDom;
                } else {
                    var $scrollbar = $("body");
                }
                $scrollbar.scroll(function(){
                    option.scrollback(Scroll_ele, $scrollbar.scrollTop(), option.scrollTop);
                });
            }
        }
    };
}(jQuery));