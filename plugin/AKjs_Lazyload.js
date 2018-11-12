/*
Modification Date: 2018-11-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Lazyload-------------------------------------------*/
(function($){
    $.fn.AKjs_Lazyload = function(setting) {
        var option = $.extend({
                scroll: $(window),
                scrollTop: "",
                Img_Effect: "",
                Img_LoadStyle: "",
                Img_Error: "",
                Callback: function() {},
                Scrollback: function() {}
            },
            setting);
            AKjs_UserAgent();
            var ele = $(this).not("#ak-aside img").not(".lazy_none");
            var view_h = parseInt(window.screen.height);
            var png_regexp = new RegExp("\\.png");
            var gif_regexp = new RegExp("\\.gif");
            $(function () {
                option.Callback(ele);
                if (ele.prop('tagName') == "img" || ele.prop('tagName') == "IMG") {
                    if (option.Img_LoadStyle) {
                        ele.each(function () {
                            var view_img = $(this);
                            if (view_img.length > 0) {
                                if (view_img.parent().prop('tagName') != "figure" && view_img.parent().prop('tagName') != "FIGURE") {
                                    view_img.wrap("<figure />");
                                }
                            }
                            if (png_regexp.test(view_img.attr("src")) || gif_regexp.test(view_img.attr("src"))) {
                                view_img.parents("figure").addClass("bg_none ak_img_" + option.Img_LoadStyle);
                            } else {
                                view_img.parents("figure").addClass("ak_img_" + option.Img_LoadStyle);
                            }
                            if (IsMobile) {
                                setTimeout(function () {
                                    if (view_img.hasClass("dis_none") || view_img.hasClass("dis_none_im") || view_img.hasClass("dis_opa_0")) {
                                        view_img.wrap("<label class='wh_in img_thumb'></label>");
                                        view_img.parent(".img_thumb").css({
                                            "background-image": 'url("' + view_img.attr("src") + '")'
                                        });
                                        view_img.remove();
                                    } else {
                                        if (view_img.offset().top < view_h) {
                                            view_img.attr("data-src", view_img.attr("src"));
                                            view_img.attr("src",TransparentImage);
                                            view_img.attr("src", view_img.data("src"));
                                            if (option.Img_Effect) {
                                                view_img.addClass("animated "+option.Img_Effect);
                                            }
                                        } else {
                                            view_img.attr("data-src", view_img.attr("src"));
                                            view_img.attr("src",TransparentImage);
                                            if (option.Img_Effect) {
                                                view_img.removeClass("animated "+option.Img_Effect);
                                            }
                                        }
                                    }
                                },500);
                            } else {
                                setTimeout(function () {
                                    if (view_img.hasClass("dis_none") || view_img.hasClass("dis_none_im") || view_img.hasClass("dis_opa_0")) {
                                        view_img.wrap("<label class='wh_in img_thumb'></label>");
                                        view_img.parent(".img_thumb").css({
                                            "background-image": 'url("' + view_img.attr("src") + '")'
                                        });
                                        view_img.remove();
                                    } else {
                                        if (view_img.offset().top < view_h) {
                                            if (option.scrollTop) {
                                                var offset_top = option.scrollTop;
                                            } else {
                                                var offset_top = view_img.offset().top - view_h;
                                            }
                                            if (view_img.offset().top < view_h) {
                                                if (offset_top >= option.scroll.scrollTop()) {
                                                    $(function () {
                                                        view_img.addClass("animated "+option.Img_Effect);
                                                        view_img.attr("src", view_img.data("src"));
                                                    });
                                                }
                                            } else {
                                                if (offset_top <= option.scroll.scrollTop()) {
                                                    $(function () {
                                                        view_img.addClass("animated "+option.Img_Effect);
                                                        view_img.attr("src", view_img.data("src"));
                                                    });
                                                }
                                            }
                                        } else {
                                            if (view_img.offset().top > option.scroll.scrollTop()+view_h) {
                                                view_img.attr("data-src", view_img.attr("src"));
                                                view_img.attr("src",TransparentImage);
                                            }
                                            if (option.Img_Effect) {
                                                view_img.removeClass("animated "+option.Img_Effect);
                                            }
                                        }
                                    }
                                },500);
                            }
                        });
                    }
                    if (option.Img_Error) {
                        ele.on("error",function(){
                            if ($(this).attr("src") != "" || $(this).attr("onerror")==="") {
                                $(this).replaceWith("<img src=" + option.Img_Error + " class='ak-noimage' />");
                            }
                        });
                    }
                } else if (ele.attr("data-animation")){
                    ele.each(function () {
                        var view_ani = $(this);
                        var animated = view_ani.attr("data-animation");
                        aniJson = eval("(" + animated + ")");
                        if (view_ani.offset().top > view_h) {
                            setTimeout(function () {
                                view_ani.removeClass("animated "+aniJson.name);
                            }, 1000);
                        } else {
                            setTimeout(function () {
                                view_ani.addClass("animated "+aniJson.name);
                            }, 1000);
                        }
                    });
                }

                option.scroll.on('scroll', function (ak) {
                    ak.preventDefault();
                    var scroll_ele = $(this);
                    var clientHeight = scroll_ele.scrollTop() + scroll_ele.prop('clientHeight');
                    var scrollTop = scroll_ele.scrollTop();
                    var arr = new Array();
                    for(var i = 0; i < ele.length; i++) {
                        arr[i] = ele.eq(i).offset().top + scrollTop + (ele.eq(i).prop('offsetHeight') / 2);
                        if(arr[i] >= scrollTop && arr[i] <= clientHeight){
                            if (ele.eq(i).prop('tagName') == "img" || ele.eq(i).prop('tagName') == "IMG") {
                                ele.eq(i).attr("src", ele.eq(i).data("src"));
                                ele.eq(i).addClass("animated " + option.Img_Effect);
                            } else if (ele.eq(i).attr("data-animation")){
                                var ele_ani_s = new RegExp("s");
                                var animated = ele.eq(i).attr("data-animation");
                                aniJson = eval("(" + animated + ")");
                                if (aniJson.name) {
                                    ele.eq(i).addClass("animated "+aniJson.name);
                                }
                                if (aniJson.duration) {
                                    if (ele_ani_s.test(aniJson.duration)) {
                                        ele.eq(i).css({
                                            "animation-duration" : parseInt(aniJson.duration)
                                        });
                                    } else {
                                        ele.eq(i).css({
                                            "animation-duration" : parseInt(aniJson.duration)+"s"
                                        });
                                    }
                                }
                                if (aniJson.delay) {
                                    if (ele_ani_s.test(aniJson.delay)) {
                                        ele.eq(i).css({
                                            "animation-delay" : parseInt(aniJson.delay)
                                        });
                                    } else {
                                        ele.eq(i).css({
                                            "animation-delay" : parseInt(aniJson.delay)+"s"
                                        });
                                    }
                                }
                            }
                        }
                    }
                    option.Scrollback(ele,scrollTop);
                    ele.each(function () {
                        var view_ele = $(this);
                        if (IsMobile) {
                            if (view_ele.prop('tagName') == "img" || view_ele.prop('tagName') == "IMG") {
                                if (view_ele.offset().top < view_h) {
                                    if (option.scrollTop >= scrollTop) {
                                        $(function () {
                                            view_ele.addClass("animated "+option.Img_Effect);
                                            view_ele.attr("src", view_ele.data("src"));
                                        });
                                    }
                                } else {
                                    if (option.scrollTop >= scrollTop) {
                                        view_ele.attr("src",TransparentImage);
                                        view_ele.removeClass("animated "+option.Img_Effect);
                                    }
                                }
                            } else {
                                if (option.scrollTop >= scrollTop) {
                                    view_ele.removeClass("animated "+aniJson.name);
                                }
                            }
                        } else {
                            if (view_ele.prop('tagName') == "img" || view_ele.prop('tagName') == "IMG") {
                                if (option.scrollTop) {
                                    var offset_top = option.scrollTop;
                                } else {
                                    var offset_top = view_ele.offset().top - view_h;
                                }
                                if (view_ele.offset().top < view_h) {
                                    if (offset_top >= scrollTop) {
                                        $(function () {
                                            view_ele.addClass("animated "+option.Img_Effect);
                                            view_ele.attr("src", view_ele.data("src"));
                                        });
                                    }
                                } else {
                                    if (offset_top <= scrollTop) {
                                        $(function () {
                                            view_ele.addClass("animated "+option.Img_Effect);
                                            view_ele.attr("src", view_ele.data("src"));
                                        });
                                    }
                                }
                            } else {
                                if (offset_top >= scrollTop) {
                                    view_ele.removeClass("animated "+aniJson.name);
                                }
                            }
                        }

                    });
                });
                var TransparentImage ="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYwMkY5NUExNkVBRjExRThCOEE5RjZEMjg3OUQzMUIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYwMkY5NUEyNkVBRjExRThCOEE5RjZEMjg3OUQzMUIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjAyRjk1OUY2RUFGMTFFOEI4QTlGNkQyODc5RDMxQjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjAyRjk1QTA2RUFGMTFFOEI4QTlGNkQyODc5RDMxQjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAAAQABAAACAkQBADs=";
            });
        };
}(jQuery));