/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_WebToast-------------------------------------------*/
function ak_webToast(){
    var dcfg = {
        message: "",
        position: "bottom",
        mask: "mask",
        time: ""
    };
    var AKjs_WebToast = ".ak-webtoast";
    var sub_AKjs_WebToast = AKjs_WebToast.substring(1,AKjs_WebToast.length);
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
        var ret = "<div class='"+sub_AKjs_WebToast+" animated fadeIn'><div class='ak-mask'></div><h3>" + dcfg.message + "</h3></div>";
    } else {
        var ret = "<div class='"+sub_AKjs_WebToast+" animated fadeIn'><h3>" + dcfg.message + "</h3></div>";
    }
    if ($(AKjs_WebToast).length <= 0) {
        $("body").append(ret);
    } else {
        $(AKjs_WebToast).css("left", "");
        if ("mask" == arg2) {
            ret = "<div class='ak-mask'></div><h3>" + dcfg.message + "</h3>";
        } else {
            ret = "<h3>" + dcfg.message + "</h3>";
        }
        $(AKjs_WebToast).html(ret);
    }
    setTimeout(function () {
        $(AKjs_WebToast).fadeIn();
        ToastSetting();
    }, 100);

    $(window).resize(function(){
        ToastSetting();
    });
    function ToastSetting() {
        var w = $(AKjs_WebToast).children("h3").width(),
            ww = $(window).width();
        $(AKjs_WebToast).children("h3").css("left", (ww - w) / 2);
        if ("bottom" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", 50);
            $(AKjs_WebToast).children("h3").css("top", "");
        } else if ("top" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", "");
            $(AKjs_WebToast).children("h3").css("top", 50);
        } else if ("middle" == dcfg.position) {
            $(AKjs_WebToast).children("h3").css("bottom", "");
            $(AKjs_WebToast).children("h3").css("top", "");
            var h = $(AKjs_WebToast).children("h3").height(),
                hh = $(window).height();
            $(AKjs_WebToast).children("h3").css("bottom", (hh - h) / 2 - 20);
        }
    }
    if (dcfg.message==="destroy") {
        $(AKjs_WebToast).fadeOut().remove();
    }
    if (dcfg.time) {
        setTimeout(function() {
            $(AKjs_WebToast).fadeOut().remove();
        }, dcfg.time);
    }
}
