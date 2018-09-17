/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Loader------------------------------------------*/
function AKjs_Loader(setting){
    var option = $.extend({
            ele:"",
            autoMode: true,
            maskBG: false,
            iconColor:"#ffffff",
            timeToHide:0,
            Loader: "",
            text: "",
            boxsize: "",
            class: "animated fadeIn fix",
            callback: function() {}
        },
        setting);
    var load_1 = '<div class="ak-loading ak-Loader1">' +
        '<div class="ak-Loader-double-bounce1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-double-bounce2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_2 = '<div class="ak-loading ak-Loader2">' +
        '<div class="ak-Loader-container ak-Loader-container1">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '<div class="ak-Loader-container ak-Loader-container2">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '<div class="ak-Loader-container ak-Loader-container3">' +
        '<div class="ak-Loader-circle1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circle4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>' +
        '</div>';
    var load_3 = '<div class="ak-loading ak-Loader3">' +
        '<div class="ak-Loader-dot1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-dot2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_4 = '<div class="ak-loading ak-Loader4" style="background-color:'+option.iconColor+'"></div>';
    var load_5 = '<div class="ak-loading ak-Loader5">' +
        '<div class="ak-Loader-cube1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-cube2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_6 = '<div class="ak-loading ak-Loader6">' +
        '<div class="ak-Loader-rect1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect4" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect5" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_7 = '<div class="ak-loading ak-Loader7">' +
        '<div class="ak-Loader-circ1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    AKjs_UserAgent();
    $(function() {
        if ($(".ak-Loader").length < 1) {
            if (option.ele) {
                $(option.ele).append("<div class='ak-Loader'></div>");
            } else {
                $("body").append("<div class='ak-Loader'></div>");
            }
        }
        var load_ele = $(".ak-Loader").addClass(option.class);
        if (IsMobile) {
            load_ele.attr("style",$("main").attr("style"));
            load_ele.bind({
                touchmove: function (ak) {
                    ak.preventDefault();
                    ak.stopPropagation();
                }
            });
        }
        $("#ak-scrollview").removeClass("scrolling_touch");
        load_ele.each(function() {
            var op = option.Loader;
            switch (op) {
                case "load_0":
                    var loadImage ="data:image/gif;base64,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";
                    load_ele.html("<figure class=\"ak-loading bg_ab_none bg_white08 img_auto\"><img src='"+loadImage+"'></figure>");
                    break;
                case "load_1":
                    load_ele.html(load_1);
                    break;
                case "load_2":
                    load_ele.html(load_2);
                    break;
                case "load_3":
                    load_ele.html(load_3);
                    break;
                case "load_4":
                    load_ele.html(load_4);
                    break;
                case "load_5":
                    load_ele.html(load_5);
                    break;
                case "load_6":
                    load_ele.html(load_6);
                    break;
                case "load_7":
                    load_ele.html(load_7);
                    break;
            }
        });
        var loading = load_ele.find(".ak-loading");
        if (option.maskBG == true) {
            $("<div class='ak-mask' id='#ak-loadingmask' />").appendTo(load_ele);
            loading.addClass("bg_ab_none");
        } else {
            load_ele.find("#ak-loadingmask").remove();
            if (option.boxsize) {
                loading.css({
                    "width": option.boxsize,
                    "height": option.boxsize
                })
            }
        }
        if (option.ele) {
            var ww = $(option.ele).width();
            var wh = $(option.ele).height();
        } else {
            var ww = $(window).width();
            var wh = $(window).height();
        }
        var lw = loading.outerWidth();
        var lh = loading.outerHeight();
        if (IsMobile) {
            if ($("header").not("aside header").hasClass("dis_none_im") || $("header").length === 0) {
                var heh = 0;
            } else {
                var heh = $("header").outerHeight();
            }
            if ($("footer").not("aside footer").hasClass("dis_none_im") || $("footer").length === 0) {
                var foh = 0;
            } else {
                var foh = $("footer").outerHeight();
            }
            var yy = {
                position: "absolute",
                left: (ww / 2) - (lw / 2),
                top: (wh / 2) - (lh / 2) - heh - foh
            };
        } else {
            var yy = {
                position: "absolute",
                left: (ww / 2) - (lw / 2),
                top: (wh / 2) - (lh / 2)
            };
        }
        loading.css(yy);
        if (option.text) {
            load_ele.append("<span>"+option.text+"</span>");
            load_ele.children("span").css({
                top: (wh / 2) + load_ele.children("span").outerHeight()/2
            });
        }
        $(window).resize(function () {
            if (option.ele) {
                var ww = $(option.ele).width();
                var wh = $(option.ele).height();
            } else {
                var ww = $(window).width();
                var wh = $(window).height();
            }
            var lw = loading.outerWidth();
            var lh = loading.outerHeight();
            if (IsMobile) {
                var yy = {
                    position: "absolute",
                    left: (ww / 2) - (lw / 2),
                    top: (wh / 2) - (lh / 2) - heh - foh
                };
            } else {
                var yy = {
                    position: "absolute",
                    left: (ww / 2) - (lw / 2),
                    top: (wh / 2) - (lh / 2)
                };
            }
            loading.css(yy);
            if (option.text) {
                load_ele.children("span").css({
                    top: (wh / 2) + load_ele.children("span").outerHeight()/2
                });
            }
        });

        option.callback(load_ele);
        if (option.autoMode) {
            setTimeout(function () {
                ak_closeLayer();
            }, option.timeToHide);
        }
        function ak_closeLayer() {
            $(load_ele).fadeOut();
            $("#ak-scrollview").addClass("scrolling_touch");
        }
    });
}
