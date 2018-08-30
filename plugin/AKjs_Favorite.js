/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Favorite-------------------------------------------*/
(function($){
    $.fn.AKjs_Favorite = function(setting) {
        var options = $.extend({
                likeMode: true, //是否开启点赞模式 （设置false为收藏模式）
                str: "+1",  //字符串，要显示的内容;也可以传一段html
                icon_defaultClass: '', //default 类样式定义
                icon_changeClass: '', //change 类样式定义
                textClass: "c_white text_12em ml_02em mr_02em", //文字样式
                text_default: "Favorite", //默认显示的文字
                text_change: "Cancel", //点击后显示的文字
                startSize: "12px",  //动画开始的文字大小
                endSize: "30px",    //动画结束的文字大小
                interval: 600,  //动画时间间隔
                color: "red",    //文字颜色
                callback: function () { } //回调函数
            },
            setting);
        var that = $(this);
        that.each(function(){
            $(this).children("i").css({
                "*display":"inline",
                "*zoom":"1"
            });
            if (options.likeMode == true) {
                $(this).append('<i></i><span></span>(<em></em>)');
                $(this).children("i").addClass(options.icon_defaultClass);
                $(this).children("span").addClass(options.textClass).text(options.text_default);
                $(this).children("em").text($(this).attr("data-value"));
                if(typeof($(this).attr("favorite"))!="undefined"){
                    if($(this).attr("favorite")==1){
                        $(this).children("i").removeClass(options.icon_defaultClass);
                        $(this).children("i").addClass(options.icon_changeClass);
                    }
                }
            } else {
                $(this).append('<i></i><span></span>');
                $(this).children("i").addClass(options.icon_defaultClass);
                $(this).children("span").addClass(options.textClass).text(options.text_default);
                if(typeof($(this).attr("favorite"))!="undefined"){
                    if($(this).attr("favorite")==1){
                        $(this).children("span").text(options.text_change);
                        $(this).children("i").removeClass(options.icon_defaultClass);
                        $(this).children("i").addClass(options.icon_changeClass);
                    }
                }
            }
        });
        that.unbind("click");
        that.on("click", function(e){
            e.preventDefault();
            var ele = $(this);
            if (options.likeMode == true) {
                if(typeof($(this).attr("favorite"))!="undefined"){
                    if($(this).attr("favorite")==1){
                        return false;
                    }
                    $(this).attr("favorite",1);
                }
                var count = parseInt($(this).attr("data-value"))+1;
                $(this).attr("data-value",count);
                $(this).find("em").text(count);
                $(this).children("i").removeClass(options.icon_defaultClass);
                $(this).children("i").addClass(options.icon_changeClass);
                $("body").append("<span class='ak-NumLength press'>" + options.str + "</span>");
                var box = $(".ak-NumLength");
                $(window).resize(function(){
                    left = that.offset().left + that.width() / 2;
                    top = that.offset().top - 10;
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
                }, options.interval, function () {
                    box.remove();
                    options.callback(count,ele);
                });
            } else {
                if ($(this).children("i").hasClass(options.icon_changeClass)) {
                    var count = parseInt($(this).attr("data-value"))-1;
                } else {
                    var count = parseInt($(this).attr("data-value"))+1;
                }
                if ($(this).children("span").text() == options.text_default ) {
                    $(this).children("span").text(options.text_change);
                } else {
                    $(this).children("span").text(options.text_default);
                }
                $(this).attr("data-value",count);
                $(this).children("i").toggleClass(options.icon_defaultClass+" "+options.icon_changeClass);
                options.callback(count,ele);
            }
        });
    };
}(jQuery));