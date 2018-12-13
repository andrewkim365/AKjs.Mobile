/*
Modification Date: 2018-12-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Popupwin----------------------------------------*/
function AKjs_Popupwin (setting){
    option = $.extend({
        dom: "",
        position: "",
        effectIn: "",
        effectOut: "",
        hasMask: true,
        closeBtn: "",
        OneButton: "",
        maskPosition: "",
        toggleIcon: "",
        callback :function () {},
        scrollback :function () {}
    },setting);
    setPopupStyle();
    $(window).resize(function(){
        setPopupStyle();
    });
    var setTimes = 100;
    if (option.OneButton) {
        $(option.closeBtn).unbind("click");
        $(option.closeBtn).on('click', function() {
            option.callback($(option),false);
            ClickHideModal();
        });
        AKjs_UserAgent();
        $(option.OneButton).toggleClass("ak-is_active");
        if ($(option.OneButton).hasClass("ak-is_active")) {
            setPopupStyle();
            setTimeout(function() {
                if (option.hasMask) {
                    addModalMask();
                    $("#ak-scrollview").removeClass("scrolling_touch");
                }
                if (option.position === 'offset') {
                    if (IsMobile) {
                        var oth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight();
                        olw = 0;
                    } else {
                        var isOth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight() - $("#ak-scrollview").offset().top + $("#ak-scrollview").scrollTop();
                        if (isOth > $("#ak-scrollview").outerHeight()) {
                            var oth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight();
                        } else {
                            var oth = isOth;
                        }
                        olw = $(option.OneButton).offset().left + $(option.OneButton).outerWidth() - $("#ak-scrollview").offset().left;
                        if ($(window).width() - olw > 0) {
                            olw = $(option.OneButton).offset().left + $(option.OneButton).outerWidth() - $("#ak-scrollview").offset().left - $(option.dom).outerWidth();
                        }
                    }
                    $(option.dom).css({
                        "top": oth,
                        "left": olw
                    });
                    $(window).resize(function(){
                        $(option.dom).addClass("dis_none");
                        ClickHideModal();
                    });
                }
                if (option.effectIn || option.effectOut) {
                    $(option.dom).removeClass("animated " + option.effectOut).addClass("animated " + option.effectIn).removeClass("dis_none");
                }
                if (option.toggleIcon) {
                    if (option.position != 'offset') {
                        $(option.OneButton).find("i").attr("data-icon",$(option.OneButton).find("i").attr("class"));
                        $(option.OneButton).find("i").removeClass($(option.OneButton).find("i").attr("class")).addClass(option.toggleIcon);
                    }
                }
                option.callback($(option),true);
            },setTimes);
        } else {
            option.callback($(option),false);
            ClickHideModal();
        }
    } else {
        if (option.effectIn || option.effectOut) {
            $(option.dom).removeClass("animated " + option.effectOut).addClass("animated " + option.effectIn).removeClass("dis_none");
        }
        if (option.hasMask) {
            addModalMask();
            $("#ak-scrollview").removeClass("scrolling_touch");
        }
        option.callback($(option),true);
        $(option.closeBtn).unbind("click");
        $(option.closeBtn).on('click', function(ec) {
            ec.preventDefault();
            option.callback($(option),false);
            ClickHideModal();
        });
    }
    $("#ak-scrollview").scroll(function(sc){
        sc.preventDefault();
        option.scrollback($(option));
        $('#popup_mask').fadeOut().remove();
        if (option.OneButton) {
            var scrollHeight = $("#ak-scrollview").prop("scrollHeight");
            $(option.dom).css({
                top: scrollHeight
            });
            $(option.OneButton).removeClass("ak-is_active");
        }
    });
    function addModalMask() {
        $('#popup_mask').remove();
        if ($("#popup_mask").length < 1) {
            $("main").append('<div id="popup_mask" class="ak-mask"></div>');
            $('#popup_mask').show();
            $("#popup_mask").unbind("click");
            $("#popup_mask").on('click', function() {
                option.callback($(option),false);
                ClickHideModal();
            });
            $('#popup_mask').bind({
                touchmove: function (e) {
                    e.preventDefault();
                }
            });
            if (option.maskPosition) {
                $('#popup_mask').css({
                    "z-index": option.maskPosition
                });
                if (option.position === 'offset') {
                    var otm = $(option.OneButton).offset().top;
                    var ohm = $(option.OneButton).outerHeight();
                    $('#popup_mask').css({
                        "top": otm + ohm
                    });
                }
            }
        }
    }
    function setPopupStyle() {
        var ww = $(window).width();
        var wh = $(window).height();
        if (option.dom) {
            var dw = $(option.dom).outerWidth();
            var dh = $(option.dom).outerHeight();
            $(option.dom).css({
                "position": "fixed",
                "background": "transparent",
                "z-index": parseInt(option.maskPosition) + 1
            });
            if (option.position === 'top') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "top": 0
                });
            } else if (option.position === 'bottom') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "bottom": 0
                });
            } else if (option.position === 'left') {
                $(option.dom).css({
                    "left": 0,
                    "top": 0
                });
            } else if (option.position === 'right') {
                $(option.dom).css({
                    "right": 0,
                    "top": 0
                });
            } else if (option.position === 'middle') {
                $(option.dom).css({
                    "left": (ww / 2) - (dw / 2),
                    "top": (wh / 2) - (dh / 2)
                });
            }
        }
    }
    function ClickHideModal(){
        if (option.OneButton) {
            if (option.effectIn || option.effectOut) {
                $(option.dom).removeClass("animated " + option.effectIn).addClass("animated " + option.effectOut);
            }
            $(option.OneButton).find("i").removeClass(option.toggleIcon).addClass($(option.OneButton).find("i").attr("data-icon"));
        } else {
            if (option.effectIn || option.effectOut) {
                $(option.dom).removeClass("animated " + option.effectIn).addClass("animated " + option.effectOut);
            }
        }
        var effectTime = option.effectOut;
        effectStr = effectTime.substring(effectTime.indexOf('ani_')+3,effectTime.lastIndexOf('s'));
        if (effectStr.indexOf("_0") != -1) {
            effectStr = effectStr.replace("_0","_0.");
        }
        effectStr = effectStr.substr(1);
        var ani_css = new RegExp("ani_");
        if(ani_css.test(effectTime)) {
            var setTimeouts = effectStr*1000+setTimes;
        } else {
            var setTimeouts = 1000;
        }
        setTimeout(function() {
            $("#ak-scrollview").addClass("scrolling_touch");
            $(option.OneButton).removeClass("ak-is_active");
            $('#popup_mask').fadeOut().remove();
            $(option.dom).addClass("dis_none");
        },setTimeouts);
    }
}