/*! jquery.AKjs.Mobile by Mobile Web App Plugin v1.1.7 Stable --- Copyright Andrew.Kim | (c) 20170808 ~ 20180605 AKjs.Mobile license */
/*! Coding by Andrew.Kim (E-mail: andrewkim365@qq.com) https://github.com/andrewkim365/AKjs.Mobile */

if ("undefined" == typeof jQuery) throw new Error("AKjs.Mobile Plugin's JavaScript requires jQuery");
if (window.location.protocol == "file:") throw new Error("AKjs.Mobile Plugin's Local Ajax requests are not supported");

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
    if(!option.Responsive) {
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
            $("header").addClass("dis_none_im").removeClass("dis_block_im");
            $("main").addClass("mt_0");
        } else {
            $("main").removeClass("mt_0");
        }
    }
    if(option.ButtonLink== true) {
        Andrew_HashSharp(false,false);
    } else {
        $("*").removeAttr("data-href");
    }
    if(option.animation) {
        Andrew_Animation();
    } else {
        $("*").removeAttr("data-animation");
    }
    setTimeout(function() {
        Andrew_mainHeight();
        if(option.fixedBar== true) {
            Andrew_InputFocus();
        }
    },100);
    $(window).resize(function(){
        Andrew_mainHeight();
        if(option.fixedBar== true) {
            Andrew_InputFocus();
        }
    });
}

/*-----------------------------------------------Andrew_Router------------------------------------------*/
function Andrew_Router(setting){
    var option = $.extend({
            Router: false,
            FileFormat: ".html",
            Parameter: false,
            RouterPath:[],
            success:function () {
            },
            error:function () {
            },
            changePage:function () {
            }
        },
        setting);
    if(option.Router== true) {
        if (window.location.protocol != "file:") {
            layout = $.ajax({
                url: option.RouterPath[1],
                async: false,
                cache: false
            });
            $("body").html(layout.responseText);
        }
        Andrew_sUserAgent();
        var Router_path = "./";
        if (option.RouterPath[0]) {
            Router_path = option.RouterPath[0]+"/";
        }
        setTimeout(function() {
            var hash_dot = new RegExp("\\.");
            var hash_question =  new RegExp("\\?");
            $(window).each(function () {
                if (document.location.hash.substring(1) != "") {
                    if (window.location.protocol != "file:") {
                        if (hash_dot.test(Router_path + document.location.hash.substring(1))) {
                            var ak_url = Router_path + document.location.hash.substring(1)
                        } else {
                            if (hash_question.test(Router_path + document.location.hash.substring(1))) {
                                var ak_hash = Router_path + document.location.hash.substring(1).replace("?",option.FileFormat+"?");
                            } else {
                                var ak_hash = Router_path + document.location.hash.substring(1) + option.FileFormat;
                            }
                            var ak_url = ak_hash.replace("/"+option.FileFormat,"/index"+option.FileFormat);
                        }
                        htmlobj = $.ajax({
                            url: ak_url,
                            async: false,
                            cache: false,
                            success: function () {
                                hash = ak_url;
                                option.success(hash);
                                $("main").show();
                            },
                            error: function () {
                                hash = ak_url;
                                option.error(hash);
                                $("main").hide();
                            }
                        });
                        $("main").html(htmlobj.responseText);
                    }
                    Router_Settings();
                    ErrorPage_403();
                }
                option.changePage(document.location.hash.substring(1),IsMobile);
            });
            $(window).bind('hashchange', function () {
                var ak_menu_btn = $("footer").children("menu").find("button");
                ak_menu_btn.each(function () {
                    if (document.location.hash == $(this).attr("data-href") || document.location.hash.substring(1) == $(this).attr("data-href")) {
                        $("footer").removeClass("dis_none_im");
                    }
                });
                if (document.location.hash.substring(1) != "") {
                    if (window.location.protocol != "file:") {
                        if (hash_dot.test(Router_path + document.location.hash.substring(1))) {
                            var ak_url = Router_path + document.location.hash.substring(1)
                        } else {
                            if (hash_question.test(Router_path + document.location.hash.substring(1))) {
                                var ak_hash = Router_path + document.location.hash.substring(1).replace("?",option.FileFormat+"?");
                            } else {
                                var ak_hash = Router_path + document.location.hash.substring(1) + option.FileFormat;
                            }
                            var ak_url = ak_hash.replace("/"+option.FileFormat,"/index"+option.FileFormat);
                        }
                        htmlobj = $.ajax({
                            url: ak_url,
                            async: false,
                            cache: false,
                            success: function () {
                                hash = ak_url;
                                option.success(hash);
                                $("main").show();
                            },
                            error: function () {
                                hash = ak_url;
                                option.error(hash);
                                $("main").hide();
                            }
                        });
                        $("main").html(htmlobj.responseText);
                    }
                    Router_Settings();
                    ErrorPage_403();
                    $('main').animate({"scrollTop":0},100);
                    $('body').children("div").remove();
                    $('body').find(".ak-mask").remove();
                } else {
                    document.location.reload();
                }
                option.changePage(document.location.hash.substring(1),IsMobile);
            });
        },100);

        function Router_Settings() {
            if ($("footer").find("dfn").length == 0) {
                $("footer").children().before("<dfn />");
                $("footer").children("dfn").addClass("dis_none_im").removeClass("dis_block_im");
            }
            if ($("ak-header").length > 0) {
                if ($("ak-header").attr("data-display") == "false") {
                    $("header").addClass("dis_none_im").removeClass("dis_block_im");
                } else {
                    if ($("ak-header").children().length > 0) {
                        $("header").html($("ak-header").html());
                    } else {
                        $("header").html("<h1 class='text_al_c'>"+$("title").text()+"</h1>");
                    }
                    $("header").removeClass("dis_none_im").addClass("dis_block_im");
                }
                $("ak-header").remove();
            } else {
                $("header").addClass("dis_none_im").removeClass("dis_block_im");
            }
            if ($("ak-footer").length > 0) {
                if ($("ak-footer").attr("data-display") == "false") {
                    $("footer").addClass("dis_none_im").removeClass("dis_block_im");
                } else {
                    if ($("ak-footer").children().length > 0) {
                        $("footer").children("dfn").html($("ak-footer").html());
                        $("footer").children("dfn").removeClass("dis_none_im").addClass("dis_block_im");
                        $("footer").children("menu").addClass("dis_none_im");
                    } else {
                        $("footer").children("dfn").addClass("dis_none_im").removeClass("dis_block_im").remove();
                        $("footer").children("menu").removeClass("dis_none_im");
                    }
                    $("footer").removeClass("dis_none_im").addClass("dis_block_im");
                }
                $("ak-footer").remove();
            } else {
                $("footer").children("dfn").addClass("dis_none_im").removeClass("dis_block_im").remove();
                $("footer").addClass("dis_none_im").removeClass("dis_block_im");
            }
            setTimeout(function() {
                if (option.Parameter) {
                    Andrew_HashSharp(true,true);
                } else {
                    Andrew_HashSharp(true,false);
                }
            },100);
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
            menu_icon_active: new Array(),
            Callback: function() {
            }
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
        if ($(this).attr("data-href")) {
            var data_href = $(this).attr("data-href").split("?")[0];
        }
        $(this).children().eq(0).addClass(option.menu_icon[index]);
        $(this).children().removeClass(option.active_color);
        if (document.location.hash.indexOf(data_href) != -1 || document.location.hash.substring(1).split("?")[0].indexOf(data_href) != -1) {
            ak_menu_btn.children().eq(1).removeClass(option.active_color);
            $(this).children().eq(0).removeClass(option.menu_icon[index]);
            $(this).children().eq(0).addClass(option.menu_icon_active[index]).addClass(option.active_color);
            $(this).children().eq(1).addClass(option.active_color);
            option.Callback($(this),index+1);
        } else if (document.location.hash.substring(1).split("?")[0] == "") {
            ak_menu_btn.eq(0).children().eq(0).removeClass(option.menu_icon[0]).addClass(option.menu_icon_active[0]).addClass(option.active_color);
            ak_menu_btn.eq(0).children().eq(1).addClass(option.active_color);
        }
    });
    $(window).bind('hashchange', function () {
        ak_menu_btn.each(function () {
            var index = $(this).index();
            if ($(this).attr("data-href")) {
                var data_href = $(this).attr("data-href").split("?")[0];
            }
            if (document.location.hash.substring(1).split("?")[0].indexOf(data_href) == -1) {
                $(this).children().eq(0).removeClass(option.menu_icon_active[index]).addClass(option.menu_icon[index]);
                $(this).children().eq(1).removeClass(option.active_color);
            }
        });
    });
}

/*-----------------------------------------------Andrew_sUserAgent------------------------------------------*/
function Andrew_sUserAgent() {
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
    IsIE = !!document.all;
    IsIE6 = !!document.all && !window.XMLHttpRequest;
    IsIE7 = !!document.all && /msie 7.0/gi.test(explorer);
    IsIE8 = !!document.all && /msie 8.0/gi.test(explorer);
    Oslanguage = (navigator.browserLanguage || navigator.language).toLowerCase();
}

/*-----------------------------------------------Andrew_RegsInput------------------------------------------*/
function Andrew_RegsInput() {
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
                            "margin-top": $("body").scrollTop()
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
                focus.scrollIntoView(true);
                //focus.scrollIntoViewIfNeeded();
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

/*-----------------------------------------------Andrew_Responsive------------------------------------------*/
function Andrew_Responsive(setting) {
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

/*-----------------------------------------------Andrew_mainHeight--------------------------------------*/
function Andrew_mainHeight() {
    Andrew_sUserAgent();
    $("body, header, footer").bind({
        touchmove: function (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    $("main").bind({
        touchstart: function () {
            $("body").unbind('touchmove');
        }
    });
    setTimeout(function() {
        var scrollHeight = $("main").prop('scrollHeight');
        var clientHeight = $("main").prop('clientHeight');
        if (scrollHeight > clientHeight) {
            $("main").removeClass("ak-scrollbar");
            $("main").unbind('touchmove');
        } else {
            $("main").addClass("ak-scrollbar");
            $(".ak-scrollbar").bind({
                touchmove: function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    },100);
    if (IsMobile) {
        $("main").removeClass("scrollbar");
        $(".bar_hide").removeClass("scrollbar_hide");
    } else {
        $("main").addClass("scrollbar");
        $(".bar_hide").addClass("scrollbar_hide");
    }
    setTimeout(function() {
        if ($("header").hasClass("dis_none_im") && $("footer").hasClass("dis_none_im")) {
            $("main").css({
                "margin-top": 0,
                "margin-bottom": 0,
                "height": $(window).height()
            });
        } else if ($("header").hasClass("dis_none_im") && !$("footer").hasClass("dis_none_im")) {
            $("main").css({
                "margin-top": 0,
                "margin-bottom": $("footer").outerHeight(),
                "height": $(window).height() - $("footer").outerHeight()
            });
        } else if (!$("header").hasClass("dis_none_im") && $("footer").hasClass("dis_none_im")) {
            $("main").css({
                "margin-top": $("header").outerHeight(),
                "margin-bottom": 0,
                "height": $(window).height() - $("header").outerHeight()
            });
        } else if (!$("header").hasClass("dis_none_im") && !$("footer").hasClass("dis_none_im")) {
            $("main").css({
                "margin-top": $("header").outerHeight(),
                "margin-bottom": $("footer").outerHeight(),
                "height": $(window).height() - ($("header").outerHeight() + $("footer").outerHeight())
            });
        }
        if ($("header").length === 0 && $("footer").length > 0) {
            $("main").css({
                "height": $(window).height() - $("footer").outerHeight()
            });
        } else if ($("header").length > 0 && $("footer").length === 0) {
            $("main").css({
                "height": $(window).height() - $("header").outerHeight()
            });
        } else if ($("header").length === 0 && $("footer").length === 0) {
            $("main").css({
                "height": $(window).height()
            });
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
    }, 100);
}

/*-----------------------------------------------Andrew_Ajax--------------------------------------------*/
function Andrew_Ajax(setting){
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
    if (window.location.protocol != "file:") {
        htmlobj = $.ajax({
            type: option.type,
            url: option.url,
            data: option.data,
            async: option.async,
            cache: option.cache,
            success: function (result) {
                option.success(result);
                if ($(option.to)) {
                    $(option.to).html(htmlobj.responseText);
                }
                Andrew_HashSharp(true,false);
                Andrew_Animation();
            },
            error: function (error) {
                if ($(option.to)) {
                    $(option.to).html(htmlobj.responseText);
                }
                option.error(error);
            }
        });
    }
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
function Andrew_HashSharp(form,key) {
    $('*[data-href]').unbind("click");
    var hash_sharp = new RegExp("#");
    var hash_dot = new RegExp("./");
    var hash_sharps = new RegExp("\\?#");
    var hash_script = new RegExp("javascript");
    var question_mark =  new RegExp("\\?");
    var akTime =  new RegExp("akjs=");
    if (Andrew_getUrlParam('akjs') != null || hash_sharp.test(document.location.hash)) {
        $('*[data-href]').click(function () {
            if (hash_sharp.test($(this).attr("data-href"))) {
                if(question_mark.test($(this).attr("data-href"))){
                    if(akTime.test($(this).attr("data-href"))){
                        if (key) {
                            document.location.href=Andrew_changeURLArg($(this).attr("data-href"),"akjs",new Date().getTime());
                        } else {
                            document.location.href=$(this).attr("data-href");
                        }
                    }else{
                        if (key) {
                            document.location.href=$(this).attr("data-href") + '&akjs=' + new Date().getTime();
                        } else {
                            document.location.href=$(this).attr("data-href");
                        }
                    }
                }else{
                    if (key) {
                        document.location.href=$(this).attr("data-href") + '?akjs=' + new Date().getTime();
                    } else {
                        document.location.href=$(this).attr("data-href");
                    }
                }
                $(this).attr("data-href",$(this).attr("data-href").replace("#",""));
            } else if (hash_script.test($(this).attr("data-href"))){
                document.location.replace($(this).attr("data-href"));
            } else if (hash_sharps.test(document.location.href)) {
                document.location.replace(document.location.href.replace("?#", "#"));
            } else {
                if(question_mark.test($(this).attr("data-href"))){
                    if(akTime.test($(this).attr("data-href"))){
                        if (key) {
                            document.location.href=Andrew_changeURLArg("#"+$(this).attr("data-href"),"akjs",new Date().getTime());
                        } else {
                            document.location.href="#"+$(this).attr("data-href");
                        }
                    }else{
                        if (key) {
                            document.location.href="#"+$(this).attr("data-href") + '&akjs=' + new Date().getTime();
                        } else {
                            document.location.href="#"+$(this).attr("data-href");
                        }
                    }
                } else if (hash_dot.test($(this).attr("data-href"))) {
                    var str = document.location.hash;
                    var index = str.lastIndexOf("\/");
                    str = str.substring(0,index)+"/";
                    str = str.replace("#","");
                    if (key) {
                        document.location.href="#"+$(this).attr("data-href").replace("./", str) + '?akjs=' + new Date().getTime();
                    } else {
                        document.location.href="#"+$(this).attr("data-href").replace("./", str);
                    }
                } else {
                    if (key) {
                        document.location.href="#"+$(this).attr("data-href") + '?akjs=' + new Date().getTime();
                    } else {
                        document.location.href="#"+$(this).attr("data-href");
                    }
                }
            }
        });
    } else {
        $('*[data-href]').click(function () {
            document.location.href= $(this).attr("data-href");
        });
    }
    if (form == true) {
        $('form[action]').each(function () {
            var hash_sharp = new RegExp("#");
            if (Andrew_getUrlParam('akjs') && hash_sharp.test(document.location.hash)) {
                if (!hash_sharp.test($(this).attr("action"))) {
                    if (key) {
                        $(this).attr("action", "#/" + $(this).attr("action") + '?akjs=' + new Date().getTime());
                    } else {
                        $(this).attr("action", "#/" + $(this).attr("action"));
                    }
                }
            }
        });
    }
}

/*-----------------------------------------------Andrew_Include------------------------------------------*/
function Andrew_Include(url){
    Andrew_pathURL();
    var type_js = new RegExp(".js");
    var type_css = new RegExp(".css");
    var type_remote = new RegExp("http");
    if(type_js.test(url)){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        if (type_remote.test(url)) {
            fileref.setAttribute("src",url);
        } else {
            fileref.setAttribute("src",realPath+"/"+url+"?akjs="+new Date().getTime());
        }
    }else if(type_css.test(url)){
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        if (type_remote.test(url)) {
            fileref.setAttribute("src",url);
        } else {
            fileref.setAttribute("href",realPath+"/"+url+"?akjs="+new Date().getTime());
        }
    }
    if(typeof fileref != "undefined"){
        $("head").find("script").each(function(){
            if ($(this).attr("src")==url) {
                $(this).remove();
            }
            $(fileref).appendTo($("head"));
        });
    }else{
        console.info("load include {"+url+"} file method error!");
    }
}

/*-----------------------------------------------Andrew_Location-------------------------------------------*/
function Andrew_Location(url,option) {
    Andrew_sUserAgent();
    if (IsIphone || IsIpad) {
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

/*-----------------------------------------------Andrew_Params------------------------------------------*/
function Andrew_Params(number){
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
    return params[0][number];
}

/*-----------------------------------------------Andrew_pathURL------------------------------------------*/
function Andrew_pathURL() {
    wwwPath = window.document.location.href;
    pathName = window.document.location.pathname;
    pathPos = wwwPath.indexOf(pathName);
    localhostPath = wwwPath.substring(0,pathPos);
    projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    realPath = localhostPath+projectName;
}

/*-----------------------------------------------Andrew_setCookie------------------------------------------*/
function Andrew_setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    //Andrew_setCookie("username", user, 365);
}

/*-----------------------------------------------Andrew_getCookie------------------------------------------*/
function Andrew_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
    //var user = Andrew_getCookie("username");
}

/*-----------------------------------------------Andrew_delCookie------------------------------------------*/
function Andrew_delCookie(name) {
    Andrew_setCookie(name, "", -1);
}

/*-----------------------------------------------Andrew_Unicode------------------------------------------*/
function Andrew_Unicode(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}

/*-----------------------------------------------Andrew_htmlEncode------------------------------------------*/
function Andrew_htmlEncode(str) {
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

/*-----------------------------------------------Andrew_htmlDecode------------------------------------------*/
function Andrew_htmlDecode(str) {
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

/*-----------------------------------------------Andrew_FileFormat------------------------------------------*/
function Andrew_FileFormat(filename) {
    var d=/\.[^\.]+$/.exec(filename);
    var ext = new String(d);
    var s = ext.toLowerCase();
    return s;
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

/*-----------------------------------------------Andrew_Plugin------------------------------------------*/
function Andrew_Plugin(setting,css){
    var jssrcs = setting.split("|");
    if (window.location.protocol != "file:") {
        for(var i=0;i<jssrcs.length;i++){
            $.ajax({
                type:'GET',
                url: js_folder+"plugin/"+setting+".js?akjs="+new Date().getTime(),
                async: false,
                cache: false,
                dataType:'script'
            });
        }
        if (css) {
            for(var i=0;i<jssrcs.length;i++){
                var css_url = "'" + js_folder + "plugin/css/" + setting + ".css?akjs="+new Date().getTime()+"'";
                $("head").find("link").filter("#"+setting).remove();
                $("head").find("link:first").before("<link rel='stylesheet' type='text/css' id='"+setting+"' href=" + css_url + " />");
            }
        }
    }
}
var scripts = document.scripts;
js_folder = scripts[scripts.length - 1].src.substring(0, scripts[scripts.length - 1].src.lastIndexOf("/") + 1);
