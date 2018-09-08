/*! jquery.AKjs.Mobile by Mobile Web App Plugin v1.4.3 Stable --- Copyright Andrew.Kim | (c) 20170808 ~ 20180908 AKjs.Mobile license */
/*! Coding by Andrew.Kim (E-mail: andrewkim365@qq.com) https://github.com/andrewkim365/AKjs.Mobile */

if ("undefined" == typeof jQuery) throw new Error("AKjs.Mobile Plugin's JavaScript requires jQuery");

/*-----------------------------------------------AKjs_Config------------------------------------------*/
function AKjs_Config(setting) {
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
            animation: true,
            pluginPath: "js/plugin/",
            pluginClear: {days: 0, hours: 0, minutes: 0, seconds: 0}
        },
        setting);
    AKjs_UserAgent();
    AKjs_RegsInput();
    AKjs_RegularExp();
    if(option.MaskStyle) {
        $("body").addClass("ak-mask_" + option.MaskStyle[0]+" ak-mask_"+option.MaskStyle[1]);
    }
    if(!option.Responsive) {
        $("body").addClass("ak-screen");
    }
    if(option.Topdblclick == true) {
        var touchtime = new Date().getTime();
        if (IsMobile) {
            var delegate = "touchstart";
        } else {
            var delegate = "click";
        }
        $("header h1").bind(delegate, function (ak) {
            ak.preventDefault();
            if( new Date().getTime() - touchtime < 500 ){
                $("#ak-scrollview").animate({scrollTop:0},1000);
            }else{
                touchtime = new Date().getTime();
            }
        });
    }
    if(option.pluginClear) {
        if (option.pluginClear.days != undefined && option.pluginClear.days != 0) {
            localStorage.setItem("pluginClear_days", option.pluginClear.days);
        } else if (option.pluginClear.hours != undefined && option.pluginClear.hours != 0) {
            localStorage.setItem("pluginClear_hours", option.pluginClear.hours);
        } else if (option.pluginClear.minutes != undefined && option.pluginClear.minutes != 0) {
            localStorage.setItem("pluginClear_minutes", option.pluginClear.minutes);
        } else if (option.pluginClear.seconds != undefined && option.pluginClear.seconds != 0) {
            localStorage.setItem("pluginClear_seconds", option.pluginClear.seconds);
        }
    }
    if(option.Orientation== true) {
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
            if (window.orientation === 180 || window.orientation === 0) {
                $("#ak-scrollview").addClass("scrolling_touch");
                $(".ak-landscape").hide().remove();
            } else if (window.orientation === 90 || window.orientation === -90 ){
                $("input").blur();
                $("textarea").blur();
                $("#ak-scrollview").removeClass("scrolling_touch");
                $("body").append("<div class=\"ak-landscape\">"+option.Prompt+"</div>");
            }
        }, false);
    }
    if(option.touchstart== true) {
        document.body.addEventListener('touchstart', function () {
        });
        $("#ak-scrollview").addClass("scrolling_touch");
    } else {
        $("*").removeClass("touchstart");
    }
    if(option.WechatHeader== true) {
        if(IsWechat) {
            $("header").not("aside header").addClass("dis_none_im").removeClass("dis_block_im");
            $("main").not("aside main").addClass("mt_0");
            if ($("footer").not("aside footer").hasClass("dis_none_im") || $("header").not("aside header").length === 0) {
                var footer_h = 0;
            } else {
                var footer_h = $("footer").not("aside footer").outerHeight();
            }
            $("main").not("aside main").css({
                "height": $(window).height() - footer_h
            });
        } else {
            $("main").not("aside main").removeClass("mt_0");
        }
    }
    if(option.ButtonLink== true) {
        if (!$("html").attr("data-router")) {
            AKjs_HashSharp();
        }
    } else {
        $("*").removeAttr("data-href");
    }
    if(option.animation) {
        AKjs_Animation();
    } else {
        $("*").removeAttr("data-animation");
    }
    if(option.fixedBar== true) {
        AKjs_InputFocus();
    }
    if (!$("html").attr("data-router")) {
        AKjs_mainHeight();
    }
    $(window).resize(function(){
        AKjs_mainHeight();
    });
    if(option.pluginPath) {
        akPath = option.pluginPath.charAt(option.pluginPath.length - 1);
        if (akPath === "/") {
            plugPath = option.pluginPath.substring(0, option.pluginPath.length-1);
        } else {
            plugPath = option.pluginPath;
        }
        localStorage.AKjsPath = plugPath;
    }
    if (IsIE6) {
        $("html").addClass("akjs_ie6");
        AKjs_placeholder();
        AKjs_InputLineHeight();
    } else if (IsIE7) {
        $("html").addClass("akjs_ie7");
        AKjs_placeholder();
        AKjs_InputLineHeight();
    } else if (IsIE8) {
        $("html").addClass("akjs_ie8");
        AKjs_placeholder();
        AKjs_InputLineHeight();
    } else if (IsIE) {
        $("html").addClass("akjs_ie");
    }
}

/*-----------------------------------------------AKjs_Router------------------------------------------*/
function AKjs_Router(setting) {
    var option = $.extend({
            Router: false,
            FileFormat: ".html",
            Parameter: false,
            Animate:"",
            ErrorMsg: "Current Page loading failure!",
            RouterPath:[],
            startPage: "",
            success:function () {
            },
            error:function () {
            },
            changePage:function () {
            }
        },
        setting);
    if(option.Router== true) {
        layout = $.ajax({
            url: option.RouterPath[1],
            async: false,
            cache: false
        });
        $(document).ready(function(){
            if (option.Animate) {
                $("body").html("<animation id='ak-animation'>"+layout.responseText+"</animation><aside id='ak-aside' class='fix_full' />");
            } else {
                $("body").html(layout.responseText);
            }
            Router_Ajax(option);
            AKjs_mainHeight();
            if (!document.location.hash.substring(1) && option.startPage) {
                AKjs_Location(option.startPage);
            }
            option.changePage(document.location.hash.substring(1),false);
        });
        $(window).bind('hashchange', function () {
            var page = "hashchange";
            var PrevScrollTop = $("#ak-scrollview").scrollTop();
            Router_Ajax(option,page);
            AKjs_mainHeight();
            option.changePage(document.location.hash.substring(1),true);
            if (option.Animate) {
                $(function () {
                    var asideEle = $("#ak-aside");
                    var aside_record = localStorage.getItem("aside_Retrieve").replace(/id=/g, "data-id=").replace(/plug_/g, "akjs_plug_");
                    var asideRecord = $(aside_record);
                    var animationEle = {};
                    for (var i = 0; i < asideRecord.length; i++) {
                        if ($(asideRecord[i]).prop("tagName") == "animation" || $(asideRecord[i]).prop("tagName") == "ANIMATION") {
                            animationEle = $(asideRecord[i]);
                        }
                    }
                    if ($("#ak-animation").prop("dataset").router == "slideLeft") {
                        asideEle.html($(animationEle).html()).addClass("animated slideOutRight ani_delay_01s ani_05s zindex_10");
                        $("#ak-animation").addClass("filter_brig_096");
                    } else if ($("#ak-animation").prop("dataset").router == "slideRight") {
                        asideEle.html($(animationEle).html()).addClass("filter_brig_096");
                        $("#ak-animation").addClass("animated slideInRight ani_delay_01s ani_05s zindex_10");
                    } else {
                        asideEle.html("");
                        $("#ak-animation").removeClass();
                    }
                    asideEle.find("scrollview").scrollTop(PrevScrollTop);
                    asideEle.find('[class^="defer_"]').addClass("defer_none");
                    asideEle.find('[class*=" defer_"]').addClass("defer_none");
                    asideEle.find("footer").addClass("dis_opa_0");
                    asideEle.find(".animated").removeClass("animated");
                    asideEle.find(".dis_opa_0").removeClass("dis_opa_0");
                    asideEle.find("#ak-main-record").addClass("rel ova");
                    $("header, footer").not("aside header, aside footer").css({
                        "left": 0,
                        "right": 0
                    });
                    $("header").not("aside header").css({
                        "top": 0,
                        "bottom":"auto",
                    });
                    $("footer").not("aside footer").css({
                        "top": "auto",
                        "bottom": 0,
                    });
                    $("footer").not("aside footer").find(".h_au").removeClass("h_au");
                    setTimeout(function () {
                        $("header, footer").not("aside header, aside footer").removeAttr("style");
                        asideEle.find("footer").removeClass("dis_opa_0");
                        asideEle.removeClass().addClass("fix_full");
                        asideEle.html("");
                        $("#ak-animation").removeClass();
                        $("#ak-animation").attr("data-router","");
                    }, 1000);
                });
            } else {
                $("header, main, footer").css({
                    "left": 0,
                    "right": 0
                });
            }
        });
        function Router_Ajax(option,page) {
            AKjs_UserAgent();
            AKjs_RegsInput();
            AKjs_RegularExp();
            if (document.location.hash.substring(1) != "") {
                $("#ak-animation").find("img").hide().show();
                if (page == "hashchange") {
                    $("#ak-scrollview").animate({"scrollTop": 0}, 100);
                    $("body").children("div").remove();
                    setTimeout(function () {
                        $("main .ak-mask").not("aside main .ak-mask").remove();
                    }, 500);
                }
                var Router_path = "./";
                if (option.RouterPath[0]) {
                    if (document.location.hash.substring(1).substr(0, 1) != "/") {
                        Router_path = option.RouterPath[0] + "/";
                    } else {
                        Router_path = option.RouterPath[0];
                    }
                }
                var hash_dot = new RegExp("\\.");
                var hash_question = new RegExp("\\?");
                if (hash_dot.test(Router_path + document.location.hash.substring(1))) {
                    var ak_url = Router_path + document.location.hash.substring(1)
                } else {
                    if (hash_question.test(Router_path + document.location.hash.substring(1))) {
                        var ak_hash = Router_path + document.location.hash.substring(1).replace("?", option.FileFormat + "?");
                    } else {
                        var ak_hash = Router_path + document.location.hash.substring(1) + option.FileFormat;
                    }
                    var ak_url = ak_hash.replace("/" + option.FileFormat, "/index" + option.FileFormat);
                }
                htmlobj = $.ajax({
                    url: ak_url,
                    async: false,
                    cache: false,
                    success: function () {
                        $("html").attr("data-router","akjs");
                        $(function () {
                            option.success(document.location.hash.substring(1));
                        });
                    },
                    error: function () {
                        $("html").attr("data-router","error");
                        $("header, aside, footer").removeClass("dis_block_im").addClass("dis_none_im");
                        $(".ak-ErrorPage").remove();
                        $("body").append('<div class="ak-ErrorPage"><i>&Chi;</i>'+option.ErrorMsg+'</div>');
                        AKjs_mainHeight();
                        $(function () {
                            option.error(document.location.hash.substring(1));
                        });
                    }
                });
                var htmlobj_text = $(htmlobj.responseText);

                if (htmlobj_text.prop("tagName") == "template" || htmlobj_text.prop("tagName") == "TEMPLATE") {
                    main_tmpl = htmlobj_text.html().replace(/class=/g, 'data-temp='+new Date().getTime()+' class=');
                    var tmpl_scrollview = new RegExp("\\<ak-scrollview");
                    if (tmpl_scrollview.test(main_tmpl)) {
                        main_tmpl = htmlobj_text.html().replace('<ak-scrollview', '<scrollview id="ak-scrollview"').replace('</ak-scrollview>', '</scrollview>').replace('<ak-main', '<div id="ak-main"').replace('</ak-main>', '</div>');
                    } else {
                        main_tmpl = htmlobj_text.html().replace('<ak-main', '<div id="ak-main"><scrollview id="ak-scrollview"').replace('</ak-main>', '</scrollview></div>');
                    }

                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem("Retrieve", $("body").html());
                        record = localStorage.getItem("Retrieve");
                        if (option.Animate) {
                            localStorage.setItem("aside_Retrieve", $("body").html().replace('<main', '<container id="ak-main-record"').replace('</main>', '</container>'));
                        }
                    }
                    main_tmpl = main_tmpl.replace(/class=/g,"data-temp="+new Date().getTime()+" class=");

                    $("main").not("aside main").html(main_tmpl);

                    if ($("#ak-main").parentsUntil("main").length > 0) {
                        $("#ak-main").remove();
                        throw new Error("Sorry! The outer layer of the \"<ak-main></ak-main>\" element can not have other elements!");
                    }
                } else {
                    if ($("html").attr("data-router") != "error") {
                        throw new Error("Sorry! The lack of \"<template></template>\" elements!");
                    }
                }

                if ($(htmlobj_text).next().length > 0 && $(htmlobj_text).next().next().length < 1) {
                    if ($(htmlobj_text).next().prop("tagName") == "script") {
                        var jsText = $(htmlobj_text).next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "style") {
                        var cssText = $(htmlobj_text).next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "SCRIPT") {
                        var jsText = $(htmlobj_text).next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "STYLE") {
                        var cssText = $(htmlobj_text).next().html();
                    }
                } else if ($(htmlobj_text).next().length > 0 && $(htmlobj_text).next().next().length > 0) {
                    if ($(htmlobj_text).next().prop("tagName") == "script" && $(htmlobj_text).next().next().prop("tagName") == "style") {
                        var jsText = $(htmlobj_text).next().html();
                        var cssText = $(htmlobj_text).next().next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "style" && $(htmlobj_text).next().next().prop("tagName") == "script") {
                        var cssText = $(htmlobj_text).next().html();
                        var jsText = $(htmlobj_text).next().next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "SCRIPT" && $(htmlobj_text).next().next().prop("tagName") == "STYLE") {
                        var jsText = $(htmlobj_text).next().html();
                        var cssText = $(htmlobj_text).next().next().html();
                    } else if ($(htmlobj_text).next().prop("tagName") == "STYLE" && $(htmlobj_text).next().next().prop("tagName") == "SCRIPT") {
                        var cssText = $(htmlobj_text).next().html();
                        var jsText = $(htmlobj_text).next().next().html();
                    }
                    $(htmlobj_text).next().next().nextAll().remove();
                }
                $("html").children("script").html("").remove();
                $("html").children("style").html("").remove();

                $(function () {
                    Router_Settings();
                    setTimeout(function() {
                        if (jsText != undefined) {
                            $("<script id='akjs_script' data-temp='"+new Date().getTime()+"' type=\"text/javascript\">"+jsText+"</script>").appendTo($("html"));
                        }
                        if (cssText != undefined) {
                            $("<style id='akjs_style' data-temp='"+new Date().getTime()+"' type=\"text/css\">"+cssText+"</style>").appendTo($("html"));
                        }
                        if (option.Parameter) {
                            localStorage.HashSharp = true;
                            AKjs_HashSharp();
                        } else {
                            localStorage.HashSharp = false;
                            AKjs_HashSharp();
                        }
                    },1000);
                });
            }
        }
        function Router_Settings() {
            AKjs_Animation();
            $("form").each(function(){
                if ($(this).attr("data-submit") != "true") {
                    $(this).attr("onsubmit","return false");
                } else {
                    $(this).removeAttr("onsubmit");
                }
                $(this).removeAttr("data-submit");
            });
            if ($("footer").not("aside footer").find("dfn").length == 0) {
                $("footer").not("aside footer").children().before("<dfn />");
                $("footer").not("aside footer").children("dfn").addClass("dis_none_im").removeClass("dis_block_im");
            }
            if ($("ak-header").length > 0) {
                if ($("ak-header").attr("data-display") == "false") {
                    $("main").not("aside main").css({
                        "height": $(window).height() - $("footer").not("aside footer").outerHeight()
                    });
                    $("header").not("aside header").addClass("dis_none_im").removeClass("dis_block_im");
                } else {
                    if ($("ak-header").children().length > 0) {
                        $("header").not("aside header").html($("ak-header").html());
                    } else {
                        $("header").not("aside header").html("<h1 class='text_al_c'>"+$("title").text()+"</h1>");
                    }
                    $("header").not("aside header").removeClass("dis_none_im").addClass("dis_block_im");
                }
                $("ak-header").remove();
            } else {
                $("main").not("aside main").css({
                    "height": $(window).height() - $("footer").not("aside footer").outerHeight()
                });
                $("header").not("aside header").addClass("dis_none_im").removeClass("dis_block_im");
            }
            if ($("ak-footer").length > 0) {
                if ($("ak-footer").attr("data-display") == "false") {
                    $("main").not("aside main").css({
                        "height": $(window).height() - $("header").not("aside header").outerHeight()
                    });
                    $("footer").not("aside footer").addClass("dis_none_im").removeClass("dis_block_im");
                } else {
                    if ($("ak-footer").children().length > 0) {
                        $("footer").not("aside footer").children("dfn").html($("ak-footer").html());
                        $("footer").not("aside footer").children("dfn").removeClass("dis_none_im").addClass("dis_block_im");
                        $("footer").not("aside footer").children("menu").addClass("dis_none_im");
                    } else {
                        $("footer").not("aside footer").children("dfn").addClass("dis_none_im").removeClass("dis_block_im").remove();
                        $("footer").not("aside footer").children("menu").removeClass("dis_none_im");
                    }
                    $("footer").not("aside footer").removeClass("dis_none_im").addClass("dis_block_im");
                }
                $("ak-footer").remove();
            } else {
                $("footer").not("aside footer").children("dfn").addClass("dis_none_im").removeClass("dis_block_im").remove();
                $("main").not("aside main").css({
                    "height": $(window).height() - $("header").not("aside header").outerHeight()
                });
                $("footer").not("aside footer").addClass("dis_none_im").removeClass("dis_block_im");
            }
        }
        $("html").attr("data-router","akjs");
    } else {
        $("html").removeAttr("data-router");
    }
}

/*-----------------------------------------------AKjs_Menu--------------------------------------------*/
function AKjs_Menu(setting) {
    var option = $.extend({
            active_color: "",
            menu_icon: new Array(),
            menu_icon_active: new Array(),
            Callback: function() {
            }
        },
        setting);
    var ak_menu = $("footer").not("aside footer").children("menu");
    var ak_menu_btn = $("footer").not("aside footer").children("menu").find("button");
    if (ak_menu_btn.length > 5) {
        ak_menu_btn.last().remove();
        ak_menu.addClass("length5");
    } else {
        ak_menu.addClass("length"+ak_menu_btn.length);
    }
    $(function () {
        ak_menu_setting();
    });
    $(window).bind('hashchange', function () {
        ak_menu_setting();
    });
    function ak_menu_setting() {
        ak_menu_btn.each(function () {
            var ak_hash = document.location.hash;
            var index = $(this).index();
            if ($(this).attr("data-href")) {
                var data_href = $(this).attr("data-href").split("?")[0];
            }
            $(this).children().eq(0).addClass(option.menu_icon[index]);
            $(this).children().removeClass(option.active_color);
            if (ak_hash.indexOf(data_href) != -1 || ak_hash.substring(1).split("?")[0].indexOf(data_href) != -1 || ak_hash.substring(1).split("?")[0].indexOf(data_href.substring(1)) != -1) {
                ak_menu_btn.children().eq(1).removeClass(option.active_color);
                $(this).children().eq(0).removeClass(option.menu_icon[index]);
                $(this).children().eq(0).addClass(option.menu_icon_active[index]).addClass(option.active_color);
                $(this).children().eq(1).addClass(option.active_color);
                option.Callback($(this),index+1);
            } else if (ak_hash.substring(1).split("?")[0].indexOf(data_href) == -1 || ak_hash.substring(1).split("?")[0].indexOf(data_href.substring(1)) == -1) {
                $(this).children().eq(0).removeClass(option.menu_icon_active[index]).addClass(option.menu_icon[index]).removeClass(option.active_color);
                $(this).children().eq(1).removeClass(option.active_color);
            } else if (ak_hash.substring(1).split("?")[0] == "") {
                ak_menu_btn.eq(0).children().eq(0).removeClass(option.menu_icon[0]).addClass(option.menu_icon_active[0]).addClass(option.active_color);
                ak_menu_btn.eq(0).children().eq(1).addClass(option.active_color);
            }
        });
    }
}

/*-----------------------------------------------AKjs_UserAgent------------------------------------------*/
function AKjs_UserAgent() {
    var terminal = navigator.userAgent.toLowerCase();
    var browser = window.navigator.userAgent;
    var explorer = window.navigator.appVersion;
    IsMobile = terminal.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    IsIpad = terminal.match(/ipad/i) == "ipad";
    IsIphone = terminal.match(/iphone os/i) == "iphone os";
    IsAndroid = terminal.match(/android/i) == "android";
    IsWindows = terminal.match(/windows/i) == "windows";
    IsImac = terminal.match(/macintosh/i) == "Imac";
    IsWechat = terminal.match(/MicroMessenger/i)=="micromessenger";
    IsQQ = terminal.match(/QQ/i)=="qq";
    IsUc7 = terminal.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    IsUc = terminal.match(/ucweb/i) == "ucweb";
    IsWM = terminal.match(/windows mobile/i) == "windows mobile";
    IsChrome = /Chrom/gi.test(browser);
    IsFirefox = /firefox/gi.test(browser);
    IsOpera = /opera/gi.test(browser);
    isEdge = browser.indexOf("Edge") > -1;
    IsIE6 = !!document.all && !window.XMLHttpRequest;
    IsIE7 = !!document.all && /msie 7.0/gi.test(explorer);
    IsIE8 = !!document.all && /msie 8.0/gi.test(explorer);
    IsIE9 = !!document.all && /msie 9.0/gi.test(explorer);
    IsIE = IsIE6 || IsIE7 || IsIE8;
    Oslanguage = (navigator.browserLanguage || navigator.language).toLowerCase();
}
/*-----------------------------------------------AKjs_RegsInput------------------------------------------*/
function AKjs_RegsInput() {
    Regs_email = /^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/;
    Regs_mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))\d{8})$/;
    Regs_url = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    Regs_idCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    Regs_postal = /^[1-9]\d{5}(?!\d)$/;
    Regs_date = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
    Regs_qq = /^[1-9][0-9]{4,9}$/;
    Regs_numAll = /"^\d+$/;
    Regs_userBefit = /^[a-z0-9]+$/i;
    Regs_pwdBefit = /^\w+$/;
}

/*-----------------------------------------------AKjs_InputLineHeight--------------------------------------*/
function AKjs_InputLineHeight() {
    AKjs_UserAgent();
    $("input").each(function(){
        var inputs = $(this);
        inputs.css({
            "line-height": inputs.outerHeight()+"px"
        });
    });
}

/*-----------------------------------------------AKjs_InputFocus--------------------------------------*/
function AKjs_InputFocus() {
    AKjs_UserAgent();
    $('main input[type="text"],main input[type="password"],main input[type="number"], main input[type="tel"], main input[type="email"],main textarea').on('focus', function() {
        var focus = this;
        header_scrollIntoView(focus);
    });
    $('main input[type="text"],main input[type="password"],main input[type="number"], main input[type="tel"], main input[type="email"],main textarea').on('blur', function() {
        Input_BlurScrollTop();
    });
    $("footer input").focus(function (ak) {
        ak.preventDefault();
        $("header, footer").bind({
            touchmove: function (ak) {
                ak.preventDefault();
                ak.stopPropagation();
            }
        });
        if (IsIphone || IsIpad) {
            $("main").not("aside main").on({
                touchmove: function() {
                    document.activeElement.blur();
                    if ($("header").not("aside header").length > 0) {
                        $("header").not("aside header").css({
                            "margin-top": 0
                        });
                    }
                }
            });
            if ($("header").not("aside header").length > 0) {
                setTimeout(function () {
                    if ($("body").scrollTop() > 0) {
                        $("header").not("aside header").animate({
                            "margin-top": $("body").scrollTop()
                        });
                    } else {
                        $("header").not("aside header").css({
                            "margin-top": 0
                        });
                    }
                }, 200);
            }
            if ($("footer").not("aside footer").length > 0) {
                $("footer").not("aside footer").css({
                    "margin-bottom": AKjs_GetScrollTop()
                });
            }
        }
    });
    $('footer input').on('blur', function() {
        $("main").not("aside main").unbind('touchstart');
        $("main").not("aside main").unbind('touchmove');
        if (IsIphone || IsIpad) {
            if ($("header").not("aside header").length > 0) {
                $("header").not("aside header").css({
                    "margin-top": 0
                });
            }
        }
    });
    function Input_BlurScrollTop(){
        $("main").not("aside main").unbind('touchstart');
        $("main").not("aside main").unbind('touchmove');
        if ($("header").not("aside header").length > 0) {
            $("header").not("aside header").css({
                "margin-top": 0
            });
        }
        if (IsIphone || IsIpad) {
            $("footer").not("aside footer").removeClass("dis_opa_0");
            $("main").not("aside main").removeClass("h_100 mb_0");
            $("#ak-animation").removeClass("abs w_100 ovh").removeAttr("style");
            focus_Setting_mainHeight();
        }
    }
    function header_scrollIntoView(focus) {
        if (IsIphone || IsIpad) {
            $("#ak-scrollview").animate({
                scrollTop: $('#ak-scrollview').scrollTop()
            },100);
            if ($("header").not("aside header").length > 0) {
                setTimeout(function () {
                    $("header").not("aside header").animate({
                        "margin-top": AKjs_GetScrollTop()
                    });
                }, 300);
                $("main").not("aside main").on({
                    touchmove: function() {
                        $("header").not("aside header").css({
                            "margin-top": 0
                        });
                    }
                });
            }
            $("footer").not("aside footer").addClass("dis_opa_0");
            $("main").not("aside main").addClass("h_100 mb_0");
            $("#ak-animation").addClass("abs w_100 ovh").css({
                height: $("#ak-scrollview").height() *2
            });
            focus_Setting_mainHeight();
        } else if (IsAndroid) {
            if ($("header").not("aside header").length > 0) {
                $("header").not("aside header").css({
                    "margin-top": 0
                });
            }
            $(function () {
                focus.scrollIntoView(true);
                //focus.scrollIntoViewIfNeeded();
            });
        }
    }
    function focus_Setting_mainHeight() {
        if ($("footer").not("aside footer").hasClass("dis_opa_0") || $("footer").not("aside footer").hasClass("dis_none_im") || $("footer").not("aside footer").length === 0) {
            var footer_h = 0;
        } else {
            var footer_h = $("footer").not("aside footer").outerHeight();
        }
        $(function() {
            $("#ak-scrollview").css({
                "height": $(window).height() - $("#ak-scrollview").offset().top - footer_h
            });
        });
    }
}

/*-----------------------------------------------AKjs_GetScrollTop--------------------------------------*/
function AKjs_GetScrollTop() {
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}

/*-----------------------------------------------AKjs_Responsive------------------------------------------*/
function AKjs_Responsive(setting) {
    var option = $.extend({
            resizeCallback: function () {
            }
        },
        setting);
    function ak_WindowSize() {
        var device_width = window.screen.width;
        var device_height = window.screen.height;
        if (window.innerWidth)
            viewport_width = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            viewport_width = document.body.clientWidth;
        if (window.innerHeight)
            viewport_height = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            viewport_height = document.body.clientHeight;
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            viewport_height = document.documentElement.clientHeight;
            viewport_width = document.documentElement.clientWidth;
        }
        option.resizeCallback(device_width,device_height,viewport_width,viewport_height);
    }
    window.onresize = function() {
        ak_WindowSize();
    };
}

/*-----------------------------------------------AKjs_placeholder--------------------------------------*/
function AKjs_placeholder() {
    $("input[placeholder]").each(function(){
        var place = $(this);
        if (place.attr("placeholder") && place.val()=='') {
            if (place.parent().prop('tagName') != "LABEL") {
                place.wrap("<label class='dis_block ovh rel h_in c_gray_ccc'></label>");
                place.parent("label").append("<span>" + place.attr('placeholder') + "</span>");
            }
            place.parent("label").children("span").css({
                "display": "block",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "width": "100%",
                "height": place.outerHeight(),
                "line-height": place.outerHeight()+"px",
                "text-indent": "1em"
            });
            $(window).resize(function(){
                place.parent("label").children("span").css({
                    "display": "block",
                    "position": "absolute",
                    "top": 0,
                    "left": 0,
                    "width": "100%",
                    "height": place.outerHeight(),
                    "line-height": place.outerHeight()+"px",
                    "text-indent": "1em"
                });
            });
            place.on('focus', function() {
                $(this).parent("label").children("span").addClass("dis_none_im");
            });
            place.on('blur', function() {
                if ($(this).val() == "") {
                    $(this).parent("label").children("span").removeClass("dis_none_im");
                }
            });
            place.keyup(function() {
                if ($(this).val() != "") {
                    $(this).parent("label").children("span").addClass("dis_none_im");
                } else {
                    $(this).parent("label").children("span").removeClass("dis_none_im");
                }
            });
        }
    });
}

/*-----------------------------------------------AKjs_mainHeight--------------------------------------*/
function AKjs_mainHeight() {
    $(function() {
        AKjs_UserAgent();
        AKjs_stopElastic();
        $("form").each(function(){
            if ($(this).attr("data-submit") == "false") {
                $(this).attr("onsubmit","return false");
            }
            $(this).removeAttr("data-submit");
        });
        if ($("main").not("aside main").children("#ak-main").length === 0) {
            $("main").not("aside main").children().not("dialog").wrapAll("<div id=\"ak-main\"><scrollview id=\"ak-scrollview\"></scrollview></div>");
        } else {
            if ($("#ak-scrollview").length < 1) {
                $("main").not("aside main").children("#ak-main").children().wrapAll("<scrollview id=\"ak-scrollview\"></scrollview>");
            }
        }
        if ($("#ak-scrollview").length > 0) {
            if ($("header").not("aside header").hasClass("dis_none_im") || $("header").not("aside header").length === 0) {
                var header_h = 0;
            } else {
                var header_h = $("header").not("aside header").outerHeight();
            }
            if ($("footer").not("aside footer").hasClass("dis_none_im") || $("footer").not("aside footer").length === 0) {
                var footer_h = 0;
            } else {
                var footer_h = $("footer").not("aside footer").outerHeight();
            }
            $(function () {
                $("#ak-scrollview").css({
                    "height": $(window).height() - $("#ak-scrollview").offset().top - footer_h
                });
            });
        }
        if (IsMobile) {
            $("#ak-scrollview, textarea").removeClass("scrollbar");
            $(".bar_hide").removeClass("scrollbar_hide");
            $("body").addClass("fix_full");
            document.oncontextmenu = function(){
                event.returnValue = false;
                return false;
            };
        } else {
            $("#ak-scrollview, textarea").addClass("scrollbar");
            $(".bar_hide").addClass("scrollbar_hide");
            $("body").removeClass("fix_full");
            document.oncontextmenu = function(){
                event.returnValue = true;
                return true;
            };
        }
        $("*[data-bounce=true]").on({
            touchstart: function (ak) {
                touchStartY = ak.originalEvent.touches[0].clientY;
                touchStartX = ak.originalEvent.touches[0].clientX;
            },
            touchmove: function (ak) {
                var touchEndY = ak.originalEvent.changedTouches[0].clientY,
                    touchEndX = ak.originalEvent.changedTouches[0].clientX,
                    yDiff = touchStartY - touchEndY,
                    xDiff = touchStartX - touchEndX;
                if (Math.abs(xDiff) < Math.abs(yDiff)) {
                    if ($(this).scrollTop() === 0) {
                        if (yDiff < 5) {
                            $(this).css({
                                "transform": "translate3d(0," + Math.abs(yDiff) / 4 + "px,0)"
                            });
                        }
                    } else if ($(this).scrollTop() === $(this).prop("scrollHeight") - $(this).height()) {
                        if (yDiff > 5) {
                            $(this).css({
                                "transform": "translate3d(0,-" + Math.abs(yDiff) / 4 + "px,0)"
                            });
                        }
                    }
                }
            },
            touchend: function (ak) {
                $(this).css({
                    "transform": "translate3d(0,0,0)"
                });
            }
        });
        if ($("header").not("aside header").hasClass("dis_none_im") && $("footer").not("aside footer").hasClass("dis_none_im")) {
            $("main").not("aside main").css({
                "margin-top": 0,
                "margin-bottom": 0,
                "height": $(window).height()
            });
        } else if ($("header").not("aside header").hasClass("dis_none_im") && !$("footer").not("aside footer").hasClass("dis_none_im")) {
            $("main").not("aside main").css({
                "margin-top": 0,
                "margin-bottom": $("footer").not("aside footer").outerHeight(),
                "height": $(window).height() - $("footer").not("aside footer").outerHeight()
            });
        } else if (!$("header").not("aside header").hasClass("dis_none_im") && $("footer").not("aside footer").hasClass("dis_none_im")) {
            $("main").not("aside main").css({
                "margin-top": $("header").not("aside header").outerHeight(),
                "margin-bottom": 0,
                "height": $(window).height() - $("header").not("aside header").outerHeight()
            });
        } else if (!$("header").not("aside header").hasClass("dis_none_im") && !$("footer").not("aside footer").hasClass("dis_none_im")) {
            $("main").not("aside main").css({
                "margin-top": $("header").not("aside header").outerHeight(),
                "margin-bottom": $("footer").not("aside footer").outerHeight(),
                "height": $(window).height() - ($("header").not("aside header").outerHeight() + $("footer").not("aside footer").outerHeight())
            });
        }
        if ($("header").not("aside header").length === 0 && $("footer").not("aside footer").length > 0) {
            $("main").not("aside main").css({
                "margin-top": 0,
                "margin-bottom": $("footer").not("aside footer").outerHeight(),
                "height": $(window).height() - $("footer").not("aside footer").outerHeight()
            });
        } else if ($("header").not("aside header").length > 0 && $("footer").not("aside footer").length === 0) {
            $("main").not("aside main").css({
                "margin-top": $("header").not("aside header").outerHeight(),
                "margin-bottom": 0,
                "height": $(window).height() - $("header").not("aside header").outerHeight()
            });
        } else if ($("header").not("aside header").length === 0 && $("footer").not("aside footer").length === 0) {
            $("main").not("aside main").css({
                "margin-top": 0,
                "margin-bottom": 0,
                "height": $(window).height()
            });
        }
        $(".h_fill").css({
            "height": $(window).height()
        });
        $(".ud_text_c").wrap("<text />");
    });
    function AKjs_stopElastic() {
        $(document).not("#ak-scrollview").on('scroll.elasticity', function (ak) {
            ak.preventDefault();
        }).on('touchmove.elasticity', function (ak) {
            ak.preventDefault();
        });
        var lastY;
        $("#ak-scrollview").on('touchstart', function (ak) {
            lastY = ak.originalEvent.changedTouches[0].clientY;
        });
        $("#ak-scrollview").on('touchmove', function (ak) {
            var y = ak.originalEvent.changedTouches[0].clientY;
            var st = $(this).scrollTop();
            if (y >= lastY && st <= 10) {
                lastY = y;
                ak.preventDefault();
            }
            lastY = y;
        });
    }
}

/*-----------------------------------------------AKjs_Ajax--------------------------------------------*/
function AKjs_Ajax(setting) {
    var option = $.extend({
            to: "",
            type: "POST",
            url: "",
            data:{},
            async:false,
            cache: false,
            success:function () {
            },
            error:function () {
            }
        },
        setting);
    htmlobj = $.ajax({
        type: option.type,
        url: option.url,
        data: option.data,
        async: option.async,
        cache: option.cache,
        success: function (result) {
            if ($(option.to)) {
                $(option.to).html(htmlobj.responseText);
            }
            option.success(result);
            AKjs_HashSharp();
            AKjs_Animation();
        },
        error: function (error) {
            option.error(error);
        }
    });
}

/*-----------------------------------------------AKjs_Animation------------------------------------------*/
function AKjs_Animation() {
    $('*[data-animation]').each(function(){
        var ani_ele = $(this);
        var ani_s = new RegExp("s");
        var animated_each = ani_ele.attr("data-animation");
        aniJson_each = eval("(" + animated_each + ")");
        if (aniJson_each.name) {
            ani_ele.removeClass("animated "+aniJson_each.name);
            ani_ele.addClass("animated "+aniJson_each.name);
        }
        if (aniJson_each.duration) {
            if (ani_s.test(aniJson_each.duration)) {
                ani_ele.css({
                    "animation-duration" : parseInt(aniJson_each.duration)
                });
            } else {
                ani_ele.css({
                    "animation-duration" : parseInt(aniJson_each.duration)+"s"
                });
            }
        }
        if (aniJson_each.delay) {
            if (ani_s.test(aniJson_each.delay)) {
                ani_ele.css({
                    "animation-delay" : parseInt(aniJson_each.delay)
                });
            } else {
                ani_ele.css({
                    "animation-delay" : parseInt(aniJson_each.delay)+"s"
                });
            }
        }
    });
}

/*-----------------------------------------------AKjs_HashSharp------------------------------------------*/
function AKjs_HashSharp() {
    var hash_sharp = new RegExp("#");
    var hash_dot = new RegExp("./");
    var hash_sharps = new RegExp("\\?#");
    var hash_script = new RegExp("javascript");
    var question_mark =  new RegExp("\\?");
    var akTime =  new RegExp("akjs=");
    var href_main = $("main *[data-href]");
    var href_not_main = $('*[data-href]').not("main *[data-href]");
    AKjs_UserAgent();
    $('*[data-href]').addClass("pointer");
    if (IsIphone || IsIpad) {
        href_not_main.unbind('touchstart');
        delegate = "touchstart";
    } else {
        href_not_main.unbind('click');
        delegate = "click";
    }
    href_main.bind("click", function (ak) {
        ak.preventDefault();
        var _this = $(this);
        var _HashSharp = localStorage.HashSharp;
        if (AKjs_getUrlParam('akjs') != null || hash_sharp.test(document.location.hash)) {
            data_href(_this,_HashSharp);
        } else {
            document.location.href= _this.attr("data-href");
        }
    });
    href_not_main.bind(delegate, function (ak) {
        ak.preventDefault();
        var _this = $(this);
        var _HashSharp = localStorage.HashSharp;
        if (AKjs_getUrlParam('akjs') != null || hash_sharp.test(document.location.hash)) {
            data_href(_this,_HashSharp);
        } else {
            document.location.href= _this.attr("data-href");
        }
    });
    function data_href(_this,_HashSharp) {
        var $this = _this;
        var akKey = _HashSharp;
        if ($("#ak-animation").length > 0) {
            $("#ak-animation").attr("data-router","");
            if (_this.parents("footer")[0] != undefined) {
                $("#ak-animation").attr("data-router","");
            } else if (_this.attr("data-back") === "true" || hash_script.test(_this.attr("data-href"))){
                $("#ak-animation").attr("data-router","slideLeft");
            } else {
                $("#ak-animation").attr("data-router","slideRight");
            }
        }
        if (hash_sharp.test($this.attr("data-href"))) {
            if(question_mark.test($this.attr("data-href"))){
                if(akTime.test($this.attr("data-href"))){
                    if (akKey === "true") {
                        document.location.href=AKjs_changeURLArg($this.attr("data-href"),"akjs",new Date().getTime());
                    } else {
                        document.location.href=$this.attr("data-href");
                    }
                }else{
                    if (akKey === "true") {
                        document.location.href=$this.attr("data-href") + '&akjs=' + new Date().getTime();
                    } else {
                        document.location.href=$this.attr("data-href");
                    }
                }
            }else{
                if (akKey === "true") {
                    document.location.href=$this.attr("data-href") + '?akjs=' + new Date().getTime();
                } else {
                    document.location.href=$this.attr("data-href");
                }
            }
            $this.attr("data-href",$this.attr("data-href").replace("#",""));
        } else if (hash_script.test($this.attr("data-href"))){
            document.location.replace($this.attr("data-href"));
        } else if (hash_sharps.test(document.location.href)) {
            document.location.replace(document.location.href.replace("?#", "#"));
        } else {
            if(question_mark.test($this.attr("data-href"))){
                if(akTime.test($this.attr("data-href"))){
                    if (akKey === "true") {
                        document.location.href=AKjs_changeURLArg("#"+$this.attr("data-href"),"akjs",new Date().getTime());
                    } else {
                        document.location.href="#"+$this.attr("data-href");
                    }
                }else{
                    if (akKey === "true") {
                        document.location.href="#"+$this.attr("data-href") + '&akjs=' + new Date().getTime();
                    } else {
                        document.location.href="#"+$this.attr("data-href");
                    }
                }
            } else if (hash_dot.test($this.attr("data-href"))) {
                var str = document.location.hash;
                var index = str.lastIndexOf("\/");
                str = str.substring(0,index)+"/";
                str = str.replace("#","");
                if (akKey === "true") {
                    document.location.href="#"+$this.attr("data-href").replace("./", str) + '?akjs=' + new Date().getTime();
                } else {
                    document.location.href="#"+$this.attr("data-href").replace("./", str);
                }
            } else {
                if (akKey === "true") {
                    document.location.href="#"+$this.attr("data-href") + '?akjs=' + new Date().getTime();
                } else {
                    document.location.href="#"+$this.attr("data-href");
                }
            }
        }
    }
    if ($("html").attr("data-router") == "akjs") {
        $('form[action]').each(function () {
            var akKey = localStorage.HashSharp;
            var hash_sharp = new RegExp("#");
            if (!hash_sharp.test($(this).attr("action"))) {
                if (akKey === "true") {
                    $(this).attr("action", "#/" + $(this).attr("action") + '?akjs=' + new Date().getTime());
                } else {
                    $(this).attr("action", "#/" + $(this).attr("action"));
                }
            }
        });
    }
}

/*-----------------------------------------------AKjs_RegularExp------------------------------------------*/
function AKjs_RegularExp() {
    $('input[data-type]').each(function(){
        if ($(this).attr("data-type") == "number") {
            $(this).attr("pattern","[0-9]*");
            $(this).keyup(function() {
                this.value = this.value.replace(/\D/g, '');
            }).bind("paste", function () {
                this.value = this.value.replace(/\D/g, '');
            }).bind("blur", function () {
                this.value = this.value.replace(/\D/g, '');
            });
        } else if ($(this).attr("data-type") == "number_symbol") {
            $(this).attr("pattern","(\\d{5}([-]\\d{4})?)");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\0-9\.]/g,'');
            });
        } else if ($(this).attr("data-type") == "alpha") {
            $(this).attr("pattern","[a-zA-Z]{1}");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^a-zA-Z]/g,'');
            });
        } else if ($(this).attr("data-type") == "alpha_number") {
            $(this).attr("pattern","[a-zA-Z0-9_]{4,19}");
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\w\.\/]/ig,'');
            });
        } else if ($(this).attr("data-type") == "sino") {
            $(this).keyup(function() {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[^\u4E00-\u9FA5]/g,'');
            });
        } else if ($(this).attr("data-type") == "sino_alpha") {
            $(this).keyup(function() {
                this.value = this.value.replace(/[\d]/g,'');
            }).bind("paste", function () {
                this.value = this.value.replace(/[\d]/g,'');
            }).bind("blur", function () {
                this.value = this.value.replace(/[\d]/g,'');
            });
        }
    });
}

/*-----------------------------------------------AKjs_Include------------------------------------------*/
function AKjs_Include(url) {
    AKjs_UserAgent();
    var type_js = new RegExp(".js");
    var type_css = new RegExp(".css");
    if(type_js.test(url)) {
        $.ajax({
            type: 'GET',
            url: url + "?akjs=" + new Date().getTime(),
            async: false,
            cache: false,
            dataType: 'script'
        });
    } else if(type_css.test(url)) {
        var valarr = url.split(".css");
        valarr = valarr.join();
        valarr = valarr.substring(0, valarr.length-1);
        valarr = valarr.substring(valarr.lastIndexOf('/') + 1, valarr.length).replace(".","_");
        if ($("head").children("style").filter("#include_"+valarr).length == 0) {
            if (IsIE8 || IsIE7 || IsIE6) {
                $("head").append("<link rel='stylesheet' type='text/css' id='include_" + valarr + "' href='" + url + "?akjs=" + new Date().getTime() + "' />");
            } else {
                $("head").append("<style type='text/css' id='include_" + valarr + "'>@import url('" + url + "?akjs=" + new Date().getTime() + "');</style>");
            }
        }
    }
}

/*-----------------------------------------------AKjs_Location-------------------------------------------*/
function AKjs_Location(url,setting) {
    var option = $.extend({
            type: "",
            time: 0,
            router:""
        },
        setting);
    AKjs_UserAgent();
    function AniSetting() {
        if ($("#ak-animation").length > 0) {
            if (option.router === "right") {
                $("#ak-animation").attr("data-router","slideRight");
            } else if (option.router === "left") {
                $("#ak-animation").attr("data-router","slideLeft");
            }
        }
    }
    $(function () {
        if ($("html").attr("data-router")) {
            var ak_location = "#"+url;
        } else {
            var ak_location = url;
        }
        switch (option.type) {
            case 'href':
                if (option.time) {
                    setTimeout(function () {
                        AniSetting();
                        if (IsIphone || IsIpad) {
                            document.location.href = ak_location;
                        } else {
                            window.location.href = ak_location;
                        }
                    }, option.time);
                } else {
                    AniSetting();
                    if (IsIphone || IsIpad) {
                        document.location.href = ak_location;
                    } else {
                        window.location.href = ak_location;
                    }
                }
                break;
            case 'history':
                if (option.time) {
                    setTimeout(function () {
                        if ($("#ak-animation").length > 0) {
                            $("#ak-animation").attr("data-router", "slideLeft");
                        }
                        if (IsIphone || IsIpad) {
                            history.back(url);
                        } else {
                            window.back(url);
                        }
                    }, option.time);
                } else {
                    if ($("#ak-animation").length > 0) {
                        $("#ak-animation").attr("data-router", "slideLeft");
                    }
                    if (IsIphone || IsIpad) {
                        history.back(url);
                    } else {
                        window.back(url);
                    }
                }
                break;
            case 'reload':
                if (option.time) {
                    setTimeout(function () {
                        if (IsIphone || IsIpad) {
                            document.location.reload();
                        } else {
                            window.location.reload();
                        }
                    }, option.time);
                } else {
                    if (IsIphone || IsIpad) {
                        document.location.reload();
                    } else {
                        window.location.reload();
                    }
                }
                break;
            default:
                if (option.time) {
                    setTimeout(function () {
                        AniSetting();
                        if (IsIphone || IsIpad) {
                            document.location.replace(ak_location);
                        } else {
                            window.location.replace(ak_location);
                        }
                    }, option.time);
                } else {
                    AniSetting();
                    if (IsIphone || IsIpad) {
                        document.location.replace(ak_location);
                    } else {
                        window.location.replace("#"+url);
                    }
                }
                break;
        }
    });
}

/*-----------------------------------------------AKjs_getUrlParam-------------------------------------------*/
function AKjs_getUrlParam(name) {
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

/*-----------------------------------------------AKjs_changeURLArg-------------------------------------------*/
function AKjs_changeURLArg(url,arg,val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + val;
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
    return url + '\n' + arg + '\n' + val;
}

/*-----------------------------------------------AKjs_Params------------------------------------------*/
function AKjs_Params(number) {
    var hash_question = new RegExp("\\?");
    var hash_sharp = new RegExp("\\#/");
    if (hash_sharp.test(document.location.hash)) {
        hash_arr = (location.hash || "").replace(/^\#/, '').split("&");
    } else {
        hash_arr = (location.hash || "").replace(/^\#/, '/').split("&");
    }
    var params = [];
    for(var i=0; i<hash_arr.length; i++){
        params.push(hash_arr[i].split("/"));
    }
    if (hash_question.test(params[0][number])) {
        var ak_params = params[0][number].split("?")[0];
    } else {
        var ak_params = params[0][number];
    }
    return ak_params;

}

/*-----------------------------------------------AKjs_Pathname------------------------------------------*/
function AKjs_Pathname() {
    var question = new RegExp("\\?");
    var strUrl=window.location.href;
    var arrUrl=strUrl.split("/");
    var strPage=arrUrl[arrUrl.length-1];
    if (question.test(strPage)) {
        var ak_strPage = strPage.split("?")[0];
    } else {
        var ak_strPage = strPage;
    }
    return ak_strPage;
}

/*-----------------------------------------------AKjs_setCookie------------------------------------------*/
function AKjs_setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/*-----------------------------------------------AKjs_getCookie------------------------------------------*/
function AKjs_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

/*-----------------------------------------------AKjs_delCookie------------------------------------------*/
function AKjs_delCookie(name) {
    AKjs_setCookie(name, "", -1);
}

/*-----------------------------------------------AKjs_Unicode------------------------------------------*/
function AKjs_Unicode(str) {
    var s = escape(str);
    var sa = s.split("%");
    var retV ="";
    if(sa[0] != "") {
        retV = sa[0];
    }
    for(var i = 1; i < sa.length; i ++) {
        if(sa[i].substring(0,1) == "u") {
            retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));
        }
        else retV += "%" + sa[i];
    }
    return retV;
    function Str2Hex(s) {
        var c = "";
        var n;
        var ss = "0123456789ABCDEF";
        var digS = "";
        for(var i = 0; i < s.length; i ++)
        {
            c = s.charAt(i);
            n = ss.indexOf(c);
            digS += Dec2Dig(eval(n));

        }
        //return value;
        return digS;
    }
    function Dec2Dig(n1) {
        var s = "";
        var n2 = 0;
        for(var i = 0; i < 4; i++)
        {
            n2 = Math.pow(2,3 - i);
            if(n1 >= n2)
            {
                s += '1';
                n1 = n1 - n2;
            }
            else
                s += '0';

        }
        return s;

    }
    function Dig2Dec(s) {
        var retV = 0;
        if(s.length == 4)
        {
            for(var i = 0; i < 4; i ++)
            {
                retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
            }
            return retV;
        }
        return -1;
    }
    function Hex2Utf8(s) {
        var retS = "";
        var tempS = "";
        var ss = "";
        if(s.length == 16)
        {
            tempS = "1110" + s.substring(0, 4);
            tempS += "10" + s.substring(4, 10);
            tempS += "10" + s.substring(10,16);
            var sss = "0123456789ABCDEF";
            for(var i = 0; i < 3; i ++)
            {
                retS += "%";
                ss = tempS.substring(i * 8, (eval(i)+1)*8);



                retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
                retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
            }
            return retS;
        }
        return "";
    }
}

/*-----------------------------------------------AKjs_htmlEncode------------------------------------------*/
function AKjs_htmlEncode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, ">");
    s = s.replace(/</g, "<");
    s = s.replace(/>/g, ">");
    s = s.replace(/ /g, " ");
    s = s.replace(/\'/g, "'");
    s = s.replace(/\"/g, '"');
    s = s.replace(/\n/g, "<br>");
    return s;
}

/*-----------------------------------------------AKjs_htmlDecode------------------------------------------*/
function AKjs_htmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/>/g, "&");
    s = s.replace(/</g, "<");
    s = s.replace(/>/g, ">");
    s = s.replace(/ /g, " ");
    s = s.replace(/'/g, "\'");
    s = s.replace(/"/g, '\"');
    s = s.replace(/<br>/g, "\n");
    return s;
}

/*-----------------------------------------------AKjs_FileFormat------------------------------------------*/
function AKjs_FileFormat(filename) {
    var d=/\.[^\.]+$/.exec(filename);
    var ext = new String(d);
    var s = ext.toLowerCase();
    return s;
}

/*-----------------------------------------------AKjs_DateFormat------------------------------------------*/
function AKjs_DateFormat(date,format) {
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

/*-----------------------------------------------AKjs_Plugin------------------------------------------*/
function AKjs_Plugin(setting,css) {
    AKjs_UserAgent();
    var AKjsPath = localStorage.AKjsPath;

    if (!IsIE8 && !IsIE7 && !IsIE6) {
        if (localStorage.getItem("pluginDate") === null) {
            var StartDate = new Date().getTime();
        } else {
            var StartDate = localStorage.getItem("pluginDate");
        }
        var EndDate = new Date().getTime() - StartDate;
        var leave1=EndDate%(24*3600*1000);
        var leave2=leave1%(3600*1000);
        var leave3=leave2%(60*1000);
        if (localStorage.getItem("pluginClear_days") != null && localStorage.getItem("pluginClear_days") != 0) {
            var plugTime = localStorage.getItem("pluginClear_days");
            var plugType = Math.floor(EndDate/(24*3600*1000));
        } else if (localStorage.getItem("pluginClear_hours") != null && localStorage.getItem("pluginClear_hours") != 0) {
            var plugTime = localStorage.getItem("pluginClear_hours");
            var plugType = Math.floor(leave1/(3600*1000));
        } else if (localStorage.getItem("pluginClear_minutes") != null && localStorage.getItem("pluginClear_minutes") != 0) {
            var plugTime = localStorage.getItem("pluginClear_minutes");
            var plugType = Math.floor(leave2/(60*1000));
        } else if (localStorage.getItem("pluginClear_seconds") != null && localStorage.getItem("pluginClear_seconds") != 0) {
            var plugTime = localStorage.getItem("pluginClear_seconds");
            var plugType = Math.round(leave3/1000);
        }
        if (plugType > plugTime) {
            sessionStorage.clear();
            js_css_Setting();
        } else {
            js_css_Setting();
        }
    } else {
        js_css_Setting();
    }
    function js_css_Setting() {
        if (css) {
            if ($("head").children("style").filter("#" + setting + "_css").length == 0) {
                if (IsIE8 || IsIE7 || IsIE6) {
                    $("head").append("<link rel='stylesheet' type='text/css'  id='" + setting + "_css' href='" + AKjsPath + "/css/" + setting + ".css?akjs=" + new Date().getTime() + "' />");
                } else {
                    if (sessionStorage.getItem(setting + "_css") === null) {
                        css_plugobj = $.ajax({
                            type: 'GET',
                            url: AKjsPath + "/css/" + setting + ".css?akjs=" + new Date().getTime(),
                            async: false,
                            cache: false,
                            dataType: 'text'
                        });
                        sessionStorage.setItem(setting + "_css", css_plugobj.responseText);

                    }
                    $("head").append("<style type='text/css' id='" + setting + "_css'>"+sessionStorage.getItem(setting+"_css")+"</style>");
                }
            }
        }
        if ($("head").children("script").filter("#"+setting+"_js").length == 0) {
            if (IsIE8 || IsIE7 || IsIE6) {
                $.ajax({
                    type: 'GET',
                    url: AKjsPath + "/" + setting + ".js?akjs=" + new Date().getTime(),
                    async: false,
                    cache: false,
                    dataType: 'script'
                });
            } else {
                if (sessionStorage.getItem(setting + "_js") === null) {
                    js_plugobj = $.ajax({
                        type: 'GET',
                        url: AKjsPath + "/" + setting + ".js?akjs=" + new Date().getTime(),
                        async: false,
                        cache: false,
                        dataType: 'text'
                    });
                    localStorage.setItem("pluginDate",new Date().getTime());
                    sessionStorage.setItem(setting + "_js", js_plugobj.responseText);
                }
                $("head").append("<script type='text/javascript' language='javascript' id='" + setting + "_js'>" + sessionStorage.getItem(setting + "_js") + "</script>");
            }
        }
    }
}