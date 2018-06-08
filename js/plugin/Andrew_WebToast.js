/*
Modification Date: 2018-06-08
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_WebToast-------------------------------------------*/
function ak_webToast(){
    var dcfg = {
        message: "",
        position: "bottom",
        mask: "mask",
        time: 1000
    };
    var Andrew_WebToast = ".ak-webtoast";
    var sub_Andrew_WebToast = Andrew_WebToast.substring(1,Andrew_WebToast.length);
    var len = arguments.length;

    if (len > 0) {
        var arg0 = arguments[0]; //message
        var arg1 = arguments[1]; //position
        var arg2 = arguments[2]; //mask
        var arg3 = arguments[3]; //time
        var regx = /(bottom|top|middle)/i;
        var regy = /(mask)/i;
        var numRegx = /[1-9]\d*/;
        //debugger;
        //console.log(regy.test(arg2))
        if (arg0) {
            dcfg.message = arg0;
        }
        if (regx.test(arg1)) {
            dcfg.position = arg1;
        }
        if (regy.test(arg2) || arg2=="") {
            dcfg.mask = arg2;
            if (numRegx.test(arg3)) {
                dcfg.time = arg3;
            }
        } else {
            dcfg.time = arg2;
        }

    }
    if ("mask" == arg2) {
        var ret = "<div class='"+sub_Andrew_WebToast+" animated fadeIn'><div class='ak-mask'></div><h3>" + dcfg.message + "</h3></div>";
    } else {
        var ret = "<div class='"+sub_Andrew_WebToast+" animated fadeIn'><h3>" + dcfg.message + "</h3></div>";
    }
    if ($(Andrew_WebToast).length <= 0) {
        $("body").append(ret);
    } else {
        $(Andrew_WebToast).css("left", "");
        if ("mask" == arg2) {
            ret = "<div class='ak-mask'></div><h3>" + dcfg.message + "</h3>";
        } else {
            ret = "<h3>" + dcfg.message + "</h3>";
        }
        $(Andrew_WebToast).html(ret);
    }
    $(Andrew_WebToast).fadeIn();
    ToastSetting();
    $(window).resize(function(){
        ToastSetting();
    });
    function ToastSetting() {
        var w = $(Andrew_WebToast).width(),
            ww = $(window).width();
        $(Andrew_WebToast).css("left", (ww - w) / 2 - 20);
        if ("bottom" == dcfg.position) {
            $(Andrew_WebToast).css("bottom", 50);
            $(Andrew_WebToast).css("top", "");
        } else if ("top" == dcfg.position) {
            $(Andrew_WebToast).css("bottom", "");
            $(Andrew_WebToast).css("top", 50);
        } else if ("middle" == dcfg.position) {
            $(Andrew_WebToast).css("bottom", "");
            $(Andrew_WebToast).css("top", "");
            var h = $(Andrew_WebToast).height(),
                hh = $(window).height();
            $(Andrew_WebToast).css("bottom", (hh - h) / 2 - 20);
        }
    }
    setTimeout(function() {
            $(Andrew_WebToast).fadeOut().remove();
        },
        dcfg.time);
}
