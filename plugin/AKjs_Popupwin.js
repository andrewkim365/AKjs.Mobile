/*
Modification Date: 2018-09-21
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
        scrollback :function () {},
        leaveback :function () {}
    },setting);
    if (option.dom) {
        $(option.dom).css({
            "position": "fixed",
            "background": "transparent",
            "z-index": parseInt(option.maskPosition)+1
        });
        setPopupStyle();
        $(window).resize(function(){
            setPopupStyle();
        });
    }
    if (option.position === 'offset') {
        var main_scroll = $("#ak-scrollview").scrollTop() + $(option.dom).outerHeight();
        $("#ak-scrollview").scroll(function(sc){
            sc.preventDefault();
            var scrolltop = $(this).scrollTop();
            if(scrolltop < main_scroll) {
                if ($(option.OneButton).hasClass("ak-is_active")) {
                    ClickHideModal();
                    $(option.dom).removeClass("dis_none");
                } else {
                    $(option.dom).removeAttr("style");
                }
            } else if(scrolltop > main_scroll) {
                if ($(option.OneButton).hasClass("ak-is_active")) {
                    ClickHideModal();
                    $(option.dom).removeClass("dis_none");
                } else {
                    $(option.dom).removeAttr("style");
                }
            }
            option.scrollback($(option));
        });
    }
    $(window).bind('hashchange', function () {
        if (option.leaveback !=  undefined) {
            option.leaveback($(option),false);
        }
        return false;
    });
    if (option.OneButton) {
        $(option.closeBtn).unbind("click");
        $(option.closeBtn).on('click', function() {
            option.callback($(option),false);
            ClickHideModal();
        });
        AKjs_UserAgent();
        $(option.OneButton).toggleClass("ak-is_active");
        if ($(option.OneButton).hasClass("ak-is_active")) {
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
                        var oth = $(option.OneButton).offset().top + $(option.OneButton).outerHeight() - $("#ak-scrollview").offset().top;
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
            },100);
            option.callback($(option),true);
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
            ClickHideModal();
        });
    }
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
        var dw = $(option.dom).outerWidth();
        var dh = $(option.dom).outerHeight();

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
        setTimeout(function() {
            $("#ak-scrollview").addClass("scrolling_touch");
            $(option.OneButton).removeClass("ak-is_active");
            $('#popup_mask').fadeOut().remove();
            $(option.dom).addClass("dis_none").removeAttr("style");
        },700);
    }
}