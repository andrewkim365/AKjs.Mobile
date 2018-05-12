/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_WebToast-------------------------------------------*/
function ak_webToast(){
    var dcfg = {
        msg: "",
        postion: "bottom",
        time: 1000
    };
    var Andrew_WebToast = ".ak-webtoast";
    var sub_Andrew_WebToast = Andrew_WebToast.substring(1,Andrew_WebToast.length);
    var len = arguments.length;
    var arg0 = arguments[0];
    if (arguments.length > 0) {
        dcfg.msg = arguments[0];
        dcfg.msg = arg0;

        var arg1 = arguments[1];
        var regx = /(bottom|top|middle)/i;
        var regy = /()/i;
        var numRegx = /[1-9]\d*/;
        if (regx.test(arg1)) {
            dcfg.postion = arg1;
        } else if (regy.test(arg1)) {
            dcfg.mask = arg1;
        } else if (numRegx.test(arg1)) {
            dcfg.time = arg1;
        }

        var arg2 = arguments[2];
        var numRegx = /[1-9]\d*/;
        if (numRegx.test(arg2)) {
            dcfg.time = arg2;
        }
        if (regy.test(arg2)) {
            dcfg.mask = arg2;
        }
    }
    if ("mask" == dcfg.mask) {
        var ret = "<div class='"+sub_Andrew_WebToast+" animated fadeIn'><div class='ak-mask'></div><h3>" + dcfg.msg + "</h3></div>";
    } else {
        var ret = "<div class='"+sub_Andrew_WebToast+" animated fadeIn'><h3>" + dcfg.msg + "</h3></div>";
    }
    if ($(Andrew_WebToast).length <= 0) {
        $("body").append(ret);
    } else {
        $(Andrew_WebToast).css("left", "");
        if ("mask" == dcfg.mask) {
            ret = "<div class='ak-mask'></div><h3>" + dcfg.msg + "</h3>";
        } else {
            ret = "<h3>" + dcfg.msg + "</h3>";
        }
        $(Andrew_WebToast).html(ret);
    }
    var w = $(Andrew_WebToast).width(),
        ww = $(window).width();
    $(Andrew_WebToast).fadeIn();
    $(Andrew_WebToast).css("left", (ww - w) / 2 - 20);
    if ("bottom" == dcfg.postion) {
        $(Andrew_WebToast).css("bottom", 50);
        $(Andrew_WebToast).css("top", "");
    } else if ("top" == dcfg.postion) {
        $(Andrew_WebToast).css("bottom", "");
        $(Andrew_WebToast).css("top", 50);
    } else if ("middle" == dcfg.postion) {
        $(Andrew_WebToast).css("bottom", "");
        $(Andrew_WebToast).css("top", "");
        var h = $(Andrew_WebToast).height(),
            hh = $(window).height();
        $(Andrew_WebToast).css("bottom", (hh - h) / 2 - 20);
    }
    setTimeout(function() {
            $(Andrew_WebToast).fadeOut().remove();
        },
        dcfg.time);
}