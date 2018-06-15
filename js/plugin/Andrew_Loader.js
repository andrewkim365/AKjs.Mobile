/*
Modification Date: 2018-06-15
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Loader------------------------------------------*/
function Andrew_Loader(setting){
    var option = $.extend({
            ele:"",
            autoMode: true,
            maskBG: false,
            iconColor:"#ffffff",
            timeToHide:0,
            Loader: ""
        },
        setting);
    var load_1 = '<div class="ak-loading ak-Loader1 zindex_22">' +
        '<div class="ak-Loader-double-bounce1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-double-bounce2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_2 = '<div class="ak-loading ak-Loader2 zindex_22">' +
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
    var load_3 = '<div class="ak-loading ak-Loader3 zindex_22">' +
        '<div class="ak-Loader-dot1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-dot2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_4 = '<div class="ak-loading ak-Loader4 zindex_22" style="background-color:'+option.iconColor+'"></div>';
    var load_5 = '<div class="ak-loading ak-Loader5 zindex_22">' +
        '<div class="ak-Loader-cube1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-cube2" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_6 = '<div class="ak-loading ak-Loader6 zindex_22">' +
        '<div class="ak-Loader-rect1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect4" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-rect5" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    var load_7 = '<div class="ak-loading ak-Loader7 zindex_22">' +
        '<div class="ak-Loader-circ1" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ2" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ3" style="background-color:'+option.iconColor+'"></div>' +
        '<div class="ak-Loader-circ4" style="background-color:'+option.iconColor+'"></div>' +
        '</div>';
    setTimeout(function() {
        $(".ak-Loader").remove();
        if (option.ele) {
            $(option.ele).append("<div class='ak-Loader press abs top_0 left_0 w_100 h_100 zindex_0'></div>");
        } else {
            $("body").append("<div class='ak-Loader press fix top_0 left_0 w_100 h_100 zindex_0'></div>");
        }
        var load_ele = $(".ak-Loader");
        if (option.maskBG == true) {
            load_ele.addClass("ak-mask");
        }
        $("main").removeClass("scrolling");
        load_ele.each(function() {
            var op = option.Loader;
            switch (op) {
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
        if (option.ele) {
            var ww = $(option.ele).width();
            var wh = $(option.ele).height();
        } else {
            var ww = $(window).width();
            var wh = $(window).height();
        }
        var lw = loading.outerWidth();
        var lh = loading.outerHeight();
        var yy = {
            position: "absolute",
            left: (ww / 2) - (lw / 2),
            top: (wh / 2) - (lh / 2)
        };
        loading.css(yy);
        if (option.autoMode) {
            setTimeout(function () {
                ak_closeLayer();
            }, option.timeToHide);
        }
        function ak_closeLayer() {
            $(load_ele).fadeOut();
            $("main").addClass("scrolling");
        }
    }, 100);
}
