/*! jquery.AKjs.Mobile by Mobile Web App Plugin v1.0.7 Stable --- Copyright Andrew.Kim | (c) 20170808 ~ 20180426 AKjs.Mobile license */
/*! Coding by Andrew.Kim (E-mail: andrewkim365@qq.com) https://github.com/andrewkim365/AKjs.Mobile */

if ("undefined" == typeof jQuery) throw new Error("AKjs.Mobile Plugin's JavaScript requires jQuery");

/*-----------------------------------------------Andrew_Config------------------------------------------*/
function Andrew_Config(setting){
    var option = $.extend({
            MaskStyle: [],
            Responsive: true,
            touchstart: true,
            ButtonLink: true,
            fixedBar: true,
            WechatHeader: false,
            Orientation: true,
            Prompt: "",
            Topdblclick: true,
            animation: true
        },
        setting);
    Andrew_sUserAgent();
    if(option.MaskStyle) {
        $("body").addClass("ak-mask_" + option.MaskStyle[0]+" ak-mask_"+option.MaskStyle[1]);
    }
    if(option.Responsive) {
        $("body").addClass("ak-screen");
    }
    if(option.Topdblclick== true) {
        $("header h1").bind("touchstart", function() {
            $('main').animate({scrollTop:0},500);
            return false;
        });
        $("header h1").bind("dblclick", function() {
            $('main').animate({scrollTop:0},500);
            return false;
        });
    }
    if(option.Orientation== true) {
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
            if (window.orientation === 180 || window.orientation === 0) {
                $(".ak-landscape").remove();
                $("main").addClass("scrolling");
            }
            if (window.orientation === 90 || window.orientation === -90 ){
                $("input").blur();
                $("textarea").blur();
                $("body").append("<div class=\"ak-landscape\">"+option.Prompt+"</div>");
                $("main").removeClass("scrolling");
            }
        }, false);
    }
    if(option.touchstart== true) {
        document.body.addEventListener('touchstart', function () {
        });
        $("main").addClass("scrolling");
    } else {
        $("*").removeClass("touchstart");
    }
    if(option.WechatHeader== true) {
        if(IsWechat) {
            $("header").hide().remove();
            $("main").css({
                "height": "auto",
                "position": "relative",
                "margin-top": 0
            });
            if ($("footer").hasClass("dis_none_im")) {
                $("main").css({
                    "padding-bottom": 0
                });
            } else {
                $("main").css({
                    "padding-bottom": $("footer").outerHeight()
                });
            }
        } else {
            Andrew_mainHeight();
        }
    } else {
        Andrew_mainHeight();
    }
    if(option.fixedBar== true) {
        Andrew_InputFocus();
    }
    if(option.ButtonLink== true) {
        Andrew_HashSharp(false);
    } else {
        $("*").removeAttr("data-href");
    }
    if(option.animation) {
        Andrew_Animation();
    } else {
        $("*").removeAttr("data-animation");
    }
}

/*-----------------------------------------------Andrew_Plugin------------------------------------------*/
function Andrew_Plugin(setting,css){
    var scripts = document.getElementsByTagName("script");
    var script = scripts[scripts.length - 1];
    strJsPath = document.querySelector ? script.src : script.getAttribute("src", 4);
    var index = strJsPath .lastIndexOf("\/");
    Path = strJsPath .substring(0, index + 1);

    var jssrcs = setting.split("|");

    for(var i=0;i<jssrcs.length;i++){
        $.ajax({
            type:'GET',
            url: Path+"plugin/"+setting+".js",
            async:false,
            dataType:'script'
        });
    }
    if (css) {
        for(var i=0;i<jssrcs.length;i++){
            var css_url = "'" + Path + "plugin/css/" + setting + ".css'";
            $("head").find("link:first").before("<link rel='stylesheet' type='text/css' href=" + css_url + " />");
        }
    }
}

/*-----------------------------------------------Andrew_Router------------------------------------------*/
function Andrew_Router(setting){
    var option = $.extend({
            Router: false,
            RouterPath:[],
            tailClass: "",
            success:function () {
            },
            error:function () {
            },
            changePage:function () {
            }
        },
        setting);
    layout = $.ajax({
        url: option.RouterPath[1],
        async: false
    });
    $("body").html(layout.responseText);
    if(option.Router== true) {
        var Router_path = "./";
        if (option.RouterPath[0]) {
            Router_path = option.RouterPath[0]+"/";
        }
        $(window).each(function () {
            if (document.location.hash.substring(1) != "") {
                htmlobj = $.ajax({
                    url: Router_path+document.location.hash.substring(1),
                    async: false,
                    success:function () {
                        hash = Router_path+document.location.hash.substring(1);
                        option.success(hash);
                        $("main").show();
                    },
                    error:function () {
                        hash = Router_path+document.location.hash.substring(1);
                        option.error(hash);
                        $("main").hide();
                    }
                });
                $("main").html(htmlobj.responseText);
                Router_Settings();
                Andrew_InputFocus();
                ErrorPage_403();
            }
            $(window).resize(function(){
                Andrew_RouterResize(option);
                Andrew_InputFocus();
                ErrorPage_403();
            });
            option.changePage(document.location.hash.substring(1));
        });
        $(window).bind('hashchange', function () {
            var ak_menu_btn = $("footer").children("menu").find("button");
            ak_menu_btn.each(function () {
                if (document.location.hash == $(this).attr("data-href") || document.location.hash.substring(1) == $(this).attr("data-href")) {
                    $("footer").removeClass("dis_none_im");
                }
            });
            if (document.location.hash.substring(1) != "") {
                htmlobj = $.ajax({
                    url: Router_path+document.location.hash.substring(1),
                    async: false,
                    success:function () {
                        hash = document.location.hash.substring(1);
                        option.success(hash);
                        $("main").show();
                        Andrew_InputFocus();
                    },
                    error:function () {
                        hash = document.location.hash.substring(1);
                        option.error(hash);
                        $("main").hide();
                    }
                });
                $("main").html(htmlobj.responseText);
                Router_Settings();
                Andrew_InputFocus();
                $('main').animate({"scrollTop":0},100);
                $('body').children("div").remove();
                $('body').find(".ak-mask").remove();
            } else {
                document.location.reload();
            }
            option.changePage(document.location.hash.substring(1));
        });
        function Router_Settings() {
            if ($("footer").find("dfn").length == 0) {
                $("footer").children().before("<dfn />");
                $("footer").children("dfn").addClass("dis_none_im");
            }
            if ($("ak-header").length > 0) {
                if ($("ak-header").attr("data-display") == "false") {
                    $("header").addClass("dis_none_im");
                } else {
                    if ($("ak-header").children().length > 0) {
                        $("header").html($("ak-header").children().clone());
                    }
                    $("header").removeClass("dis_none_im");
                }
                $("ak-header").remove();
            } else {
                $("header").addClass("dis_none_im");
            }
            if ($("ak-footer").length > 0) {
                if ($("ak-footer").attr("data-display") == "false") {
                    $("footer").addClass("dis_none_im");
                } else {
                    if ($("ak-footer").children().length > 0) {
                        $("footer").children("dfn").html($("ak-footer").children().clone());
                        $("footer").children("dfn").removeClass("dis_none_im");
                    } else {
                        $("footer").children("dfn").addClass("dis_none_im");
                    }
                    $("footer").removeClass("dis_none_im");
                }
                $("ak-footer").remove();
            } else {
                $("footer").children("dfn").addClass("dis_none_im");
                $("footer").addClass("dis_none_im");
            }
            Andrew_RouterResize(option);
            Andrew_HashSharp(true);
            Andrew_Animation();
        }
        function ErrorPage_403() {
            if ($("main").find("title").length > 0) {
                document.location.replace("./");
            }
        }
    }
}

/*-----------------------------------------------Andrew_Menu--------------------------------------------*/
function Andrew_Menu(setting){
    var option = $.extend({
            active_color: "",
            menu_icon: new Array(),
            menu_icon_active: new Array()
        },
        setting);
    var ak_menu = $("footer").find("menu");
    var ak_menu_btn = $("footer").find("menu").find("button");
    if (ak_menu_btn.length > 5) {
        ak_menu_btn.last().remove();
        ak_menu.addClass("length5");
    } else {
        ak_menu.addClass("length"+ak_menu_btn.length);
    }
    ak_menu_btn.each(function () {
        var index = $(this).index();
        var data_href = $(this).attr("data-href").split("?")[0];
        $(this).children().eq(0).addClass(option.menu_icon[index]);
        $(this).children().removeClass(option.active_color);
        if (document.location.hash == data_href || document.location.hash.substring(1).split("?")[0] == data_href) {
            ak_menu_btn.children().eq(1).removeClass(option.active_color);
            $(this).children().eq(0).removeClass(option.menu_icon[index]);
            $(this).children().eq(0).addClass(option.menu_icon_active[index]).addClass(option.active_color);
            $(this).children().eq(1).addClass(option.active_color);
        } else if (document.location.hash.substring(1).split("?ak")[0] == "") {
            ak_menu_btn.eq(0).children().eq(0).removeClass(option.menu_icon[0]).addClass(option.menu_icon_active[0]).addClass(option.active_color);
            ak_menu_btn.eq(0).children().eq(1).addClass(option.active_color);
        }
    });
    $(window).bind('hashchange', function () {
        ak_menu_btn.each(function () {
            var index = $(this).index();
            var data_href = $(this).attr("data-href").split("?")[0];
            if (document.location.hash.substring(1).split("?")[0] != data_href) {
                $(this).children().eq(0).removeClass(option.menu_icon_active[index]);
                $(this).children().eq(1).removeClass(option.active_color);
            }
        });
    });
}

/*-----------------------------------------------Andrew_sUserAgent------------------------------------------*/
function Andrew_sUserAgent() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    IsIpad = sUserAgent.match(/ipad/i) == "ipad";
    IsIphone = sUserAgent.match(/iphone os/i) == "iphone os";
    IsAndroid = sUserAgent.match(/android/i) == "android";
    IsWechat = sUserAgent.match(/MicroMessenger/i)=="micromessenger";
    IsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    IsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    IsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
}

/*-----------------------------------------------Andrew_InputFocus--------------------------------------*/
function Andrew_InputFocus() {
    Andrew_sUserAgent();
    $('main input[type="text"],main input[type="number"], main input[type="tel"], main input[type="email"]').on('focus', function() {
        var focus = this;
        header_scrollIntoView(focus);
    });
    $('main input[type="password"]').not('main input[type="password"][multiple]').on('focus', function() {
        var focus = this;
        header_scrollIntoView(focus);
    });
    $('main input[type="password"][multiple]').on('focus', function(em) {
        em.preventDefault();
        if ($("main").scrollTop() > 0) {
            $("header").hide();
        }
        $("footer").addClass("dis_opa_0");
    });
    $('main textarea').focus(function () {
        var focus = this;
        header_scrollIntoView(focus);
    });
    $('main input[type="text"],main input[type="number"], main input[type="tel"], main input[type="email"]').on('blur', function() {
        Input_BlurScrollTop();
    });
    $('main input[type="password"]').not('main input[type="password"][multiple]').on('blur', function() {
        Input_BlurScrollTop();
    });
    $('main input[type="password"][multiple]').on('blur', function() {
        Input_BlurScrollTop();
        $("footer").removeClass("dis_opa_0");
    });
    $('main textarea').on('blur', function() {
        Input_BlurScrollTop();
    });
    $("footer input").focus(function (ev) {
        ev.preventDefault();
        $("header").on({
            touchmove: function(e) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        $("footer").on({
            touchmove: function(e) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        if (IsIphone || IsIpad) {
            var focus = this;
            $("main").on({
                touchmove: function() {
                    document.activeElement.blur();
                    if ($("header").length > 0) {
                        $("header").css({
                            "margin-top": 0
                        });
                    }
                }
            });
            if ($("header").length > 0) {
                setTimeout(function () {
                    if ($("body").scrollTop() > 0) {
                        $("header").animate({
                            "margin-top": $("body").scrollTop() - ($("header").height()/3)
                        });
                    } else {
                        $("header").css({
                            "margin-top": 0
                        });
                    }
                }, 200);
            }
            if ($("footer").length > 0) {
                $("footer").css({
                    "margin-bottom": Andrew_GetScrollTop()
                });
            }
        }
    });
    $('footer input').on('blur', function() {
        if (IsIphone || IsIpad) {
            if ($("header").length > 0) {
                $("header").css({
                    "margin-top": 0
                });
            }
        }
    });
    function Input_BlurScrollTop(){
        if (IsIphone || IsIpad) {
            $("main").removeClass("pb_100");
            $("footer").removeClass("minus_bottom_100");
        } else if (IsAndroid) {
            $("footer").removeClass("dis_opa_0");
        }
        if ($("header").length > 0) {
            $("header").css({
                "margin-top": 0
            });
        }
        $("header").show();
    }
    function header_scrollIntoView(focus) {
        if (IsIphone || IsIpad) {
            setTimeout(function () {
                $('main').animate({scrollTop:$('main').scrollTop()},100);
            }, 100);
            if ($("header").length > 0) {
                setTimeout(function () {
                    $("header").animate({
                        "margin-top": Andrew_GetScrollTop()-1
                    });
                }, 200);
                $("main").on({
                    touchmove: function() {
                        $("header").css({
                            "margin-top": 0
                        });
                    }
                });
            }
            $("main").addClass("pb_100");
            $("footer").addClass("minus_bottom_100");
        } else if (IsAndroid) {
            if ($("header").length > 0) {
                $("header").css({
                    "margin-top": 0
                });
            }
            setTimeout(function () {
                focus.scrollIntoViewIfNeeded();
            }, 100);
        }
    }
}

/*-----------------------------------------------Andrew_GetScrollTop--------------------------------------*/
function Andrew_GetScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

/*-----------------------------------------------Andrew_mainHeight--------------------------------------*/
function Andrew_mainHeight() {
    Andrew_sUserAgent();
    if ($("header").hasClass("dis_none_im") && !$("footer").hasClass("dis_none_im")) {
        $("main").css({
            "margin-top": 0,
            "margin-bottom": $("footer").outerHeight()
        });
        if (IsWechat && IsAndroid) {
            $("main").css({
                "height": "inherit"
            });
        } else {
            $("main").css({
                "height": $(window).height() - $("footer").outerHeight()
            });
        }
    }
    if (!$("header").hasClass("dis_none_im") && $("footer").hasClass("dis_none_im")) {
        $("main").css({
            "margin-top": $("header").outerHeight(),
            "margin-bottom": 0
        });
        if (IsWechat && IsAndroid) {
            $("main").css({
                "height": "inherit"
            });
        } else {
            $("main").css({
                "height": $(window).height() - $("header").outerHeight()
            });
        }
    }
    if ($("header").hasClass("dis_none_im") && $("footer").hasClass("dis_none_im")) {
        $("main").css({
            "margin-top": 0,
            "margin-bottom": 0
        });
        if (IsWechat && IsAndroid) {
            $("main").css({
                "height": "inherit"
            });
        } else {
            $("main").css({
                "height": $(window).height()
            });
        }
    }
    if (!$("header").hasClass("dis_none_im") && !$("footer").hasClass("dis_none_im")) {
        $("main").css({
            "margin-top": $("header").outerHeight(),
            "margin-bottom": $("footer").outerHeight()
        });
        if (IsWechat && IsAndroid) {
            $("main").css({
                "height": "inherit"
            });
        } else {
            $("main").css({
                "height": $(window).height() - ($("header").outerHeight() + $("footer").outerHeight())
            });
        }
    }
    $("main").css({
        "top": "0",
        "bottom": "0",
        "left": "0",
        "right": "0",
        "position": "relative"
    });
    $(".h_fill").css({
        "height": $(window).height()
    });
}

/*-----------------------------------------------Andrew_Ajax--------------------------------------------*/
function Andrew_Ajax(setting){
    var option = $.extend({
            to: "",
            type: "POST",
            url: "",
            data:{},
            async:false,
            success:function () {
            },
            error:function () {
            }
        },
        setting);
    htmlobj=$.ajax({
        type : option.type,
        url: option.url,
        data: option.data,
        async: option.async,
        success:function (result) {
            option.success(result);
            if($(option.to)){
                $(option.to).html(htmlobj.responseText);
            }
            Andrew_HashSharp(true);
            Andrew_Animation();
        },
        error:function (error) {
            if($(option.to)){
                $(option.to).html(htmlobj.responseText);
            }
            option.error(error);
        }
    });
}

/*-----------------------------------------------Andrew_Animation------------------------------------------*/
function Andrew_Animation() {
    $("*[data-animation]").each(function () {
        $(this).addClass("animated");
        var animated = $(this).attr("data-animation");
        var ani_s = new RegExp("s");
        aniJson = eval("(" + animated + ")");
        if (aniJson.name) {
            $(this).addClass(aniJson.name);
        }
        if (aniJson.duration) {
            if (ani_s.test(aniJson.duration)) {
                $(this).css({
                    "animation-duration" : aniJson.duration
                });
            } else {
                $(this).css({
                    "animation-duration" : aniJson.duration+"s"
                });
            }
        }
        if (aniJson.delay) {
            if (ani_s.test(aniJson.delay)) {
                $(this).css({
                    "animation-delay" : aniJson.delay
                });
            } else {
                $(this).css({
                    "animation-delay" : aniJson.delay+"s"
                });
            }
        }
    });
}

/*-----------------------------------------------Andrew_HashSharp------------------------------------------*/
function Andrew_HashSharp(form) {
    $('*[data-href]').unbind("click");
    $('*[data-href]').click(function () {
        var hash_sharp = new RegExp("#");
        var hash_script = new RegExp("javascript");
        var question_mark =  new RegExp("\\?");
        var akTime =  new RegExp("ak=");
        if (hash_sharp.test($(this).attr("data-href"))) {
            if(question_mark.test($(this).attr("data-href"))){
                if(akTime.test($(this).attr("data-href"))){
                    document.location.href=Andrew_changeURLArg($(this).attr("data-href"),"ak",new Date().getTime());
                }else{
                    document.location.href=$(this).attr("data-href") + '&ak=' + new Date().getTime();
                }
            }else{
                document.location.href=$(this).attr("data-href") + '?ak=' + new Date().getTime();
            }
        } else if (hash_script.test($(this).attr("data-href"))){
            document.location.replace($(this).attr("data-href"));
        } else {
            if(question_mark.test($(this).attr("data-href"))){
                if(akTime.test($(this).attr("data-href"))){
                    document.location.href=Andrew_changeURLArg("#"+$(this).attr("data-href"),"ak",new Date().getTime());
                }else{
                    document.location.href="#"+$(this).attr("data-href") + '&ak=' + new Date().getTime();
                }
            }else{
                document.location.href="#"+$(this).attr("data-href") + '?ak=' + new Date().getTime();
            }
        }
    });
    if (form == true) {
        $('form[action]').each(function () {
            var hash_sharp = new RegExp("#");
            if (!hash_sharp.test($(this).attr("action"))) {
                $(this).attr("action", "#" + $(this).attr("action")+'?ak='+new Date().getTime());
            }
        });
    }
    var hash_sharps = new RegExp("\\?#");
    if (hash_sharps.test(document.location.href)) {
        document.location.replace(document.location.href.replace("?#","#"));
    }
}

/*-----------------------------------------------Andrew_RouterResize------------------------------------------*/
function Andrew_RouterResize(option) {
    Andrew_sUserAgent();
    if ($(option.tailClass).length > 0) {
        $(option.tailClass).prev().css({
            "margin-bottom": $(option.tailClass).outerHeight() + $(option.tailClass).outerHeight()/2
        });
        $("footer").addClass("dis_opa_0");
        if(IsWechat) {
            $("body").removeClass("ovh");
            $("main").css({
                "padding-bottom": $(option.tailClass).outerHeight()
            });
            if ($("header").hasClass("dis_none_im")) {
                $("main").css({
                    "margin-top": 0
                });
            } else {
                $("main").css({
                    "margin-top": $("header").outerHeight()
                });
            }
        } else {
            $("body").addClass("ovh");
            $("main").css({
                "padding-bottom": $(option.tailClass).outerHeight()
            });
            if ($("header").hasClass("dis_none_im")) {
                $("main").css({
                    "margin-top": 0,
                    "height": $(window).height() - $(option.tailClass).outerHeight()
                });
            } else {
                $("main").css({
                    "margin-top": $("header").outerHeight(),
                    "height": $(window).height() - $("header").outerHeight() - $(option.tailClass).outerHeight()
                });
            }
        }
        $(option.tailClass).on({
            touchmove: function (e) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        if (IsIphone || IsIpad) {
            $('main input[type="text"],main input[type="number"], main input[type="tel"], main input[type="email"]').on('focus', function () {
                $(option.tailClass).addClass("dis_opa_0");
            });
            $('main input[type="password"]').not('main input[type="password"][multiple]').on('focus', function () {
                $(option.tailClass).addClass("dis_opa_0");
            });
            $('main input[type="password"][multiple]').on('focus', function () {
                $(option.tailClass).addClass("dis_opa_0");
            });
            $('main textarea').focus(function () {
                $(option.tailClass).addClass("dis_opa_0");
            });
            $('main input[type="text"],main input[type="number"], main input[type="tel"], main input[type="email"]').on('blur', function () {
                $(option.tailClass).removeClass("dis_opa_0");
            });
            $('main input[type="password"]').not('main input[type="password"][multiple]').on('blur', function () {
                $(option.tailClass).removeClass("dis_opa_0");
            });
            $('main input[type="password"][multiple]').on('blur', function () {
                $(option.tailClass).removeClass("dis_opa_0");
            });
            $('main textarea').on('blur', function () {
                $(option.tailClass).removeClass("dis_opa_0");
            });
        }
    } else {
        $("footer").removeClass("dis_opa_0");
        Andrew_mainHeight();
    }
}

/*-----------------------------------------------Andrew_Location-------------------------------------------*/
function Andrew_Location(url,option) {
    var u = navigator.userAgent;
    if (u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1) {
        switch (option) {
            case 'href':
                document.location.href="#"+url;
                break;
            case 'history':
                history.back(url);
                break;
            case 'reload':
                document.location.reload();
                break;
            default:
                document.location.replace("#"+url);
                break;
        }
    }else{
        switch (option) {
            case 'href':
                window.location.href="#"+url;
                break;
            case 'history':
                window.back(url);
                break;
            case 'reload':
                window.location.reload();
                break;
            default:
                window.location.replace("#"+url);
                break;
        }
    }
}

/*-----------------------------------------------Andrew_getUrlParam-------------------------------------------*/
function Andrew_getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var u = document.location.search.substr(1);
    //if(u == ''){
    var temp = document.location.hash.split('?');
    if(temp.length == 2){
        u = temp[1];
    }
    //}
    var r = u.match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*-----------------------------------------------Andrew_changeURLArg-------------------------------------------*/
function Andrew_changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}

/*-----------------------------------------------Andrew_DateFormat------------------------------------------*/
function Andrew_DateFormat(date,format) {
    if (date.constructor === Date) {
        var d = date;
    }else if (date.constructor === String) {
        var d = new Date(Date.parse(date.replace(/-/g,   "/")));
    }else{
        var d = new Date();
    }
    var ak_zeroize = function (value, length)
    {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++)
        {
            zeros += '0';
        }
        return zeros + value;
    };

    return format.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0)
    {
        switch ($0)
        {
            case 'd': return d.getDate();
            case 'dd': return ak_zeroize(d.getDate());
            case 'M': return d.getMonth() + 1;
            case 'MM': return ak_zeroize(d.getMonth() + 1);
            case 'yy': return String(d.getFullYear()).substr(2);
            case 'yyyy': return d.getFullYear();
            case 'h': return d.getHours() % 12 || 12;
            case 'hh': return ak_zeroize(d.getHours() % 12 || 12);
            case 'H': return d.getHours();
            case 'HH': return ak_zeroize(d.getHours());
            case 'm': return d.getMinutes();
            case 'mm': return ak_zeroize(d.getMinutes());
            case 's': return d.getSeconds();
            case 'ss': return ak_zeroize(d.getSeconds());
            case 'l': return ak_zeroize(d.getMilliseconds(), 3);
            case 'L': var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return ak_zeroize(m);
            case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z': return d.toUTCString().match(/[A-Z]+$/);
            default: return $0.substr(1, $0.length - 2);
        }
    });
}