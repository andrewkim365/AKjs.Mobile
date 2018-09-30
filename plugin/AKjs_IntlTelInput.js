/*
Modification Date: 2018-09-30
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_IntlTelInput------------------------------------*/
(function($) {
    $.fn.AKjs_IntlTelInput = function(setting) {
        var option = $.extend({
                Title_Text: "",
                Close_btn: "",
                Close_Text: "",
                Close_Icon: "",
                list_Class: "",
                Nav_active: "",
                show_color: "",
                data: [],
                boxsize: ["20em","30em"],
                showBack: function() {},
                clickBack: function() {}
            },
            setting);
        function TelInput(el) {
            this.el = el;
            this.initEvents()
        }
        TelInput.prototype = {
            initEvents: function() {
                var obj = this;
                AKjs_UserAgent();
                $(function() {
                    obj.el.each(function() {
                        $(".ak-IntlTel").remove();
                        $("body").append("<div class='ak-IntlTel'><datalist></datalist></div>");
                        var objsub = $(".ak-IntlTel");
                        var datalist = objsub.children("datalist");
                        datalist.before("<h6></h6>");
                        var str = "<ol>\n";
                        for (var k = 0; k < option.data.length; k++) {
                            str += "<li>" + option.data[k].value + "</li>\n"
                        }
                        str += "</ol>";
                        datalist.before(str);
                        var tmp = "";
                        for (var i = 0; i < option.data.length; i++) {
                            tmp += "<dl>";
                            tmp += '<dt data-id="' + option.data[i].id + '">' + option.data[i].value + "</dt>";
                            for (var j = 0; j < option.data[i].child.length; j++) {
                                tmp += '<dd data-country="' + option.data[i].child[j].country + '" data-number="' + option.data[i].child[j].number + '" data-id="' + option.data[i].child[j].id + '">' + option.data[i].child[j].country + " " + option.data[i].child[j].number + "</dd>"
                            }
                            tmp += "</dl>";
                        }
                        datalist.html(tmp);
                        var objsub_title = objsub.find("h6");
                        var objsub_ol = objsub.find("ol");
                        var objsub_dl = objsub.find("dl");
                        AKjs_UserAgent();
                        objsub.append("<div class='ak-IntlTel_head'>" + "<button type='button' class='" + option.Close_btn + "'><i class='" + option.Close_Icon + "'></i>" + option.Close_Text + "</button>\n" + "<h1>" + option.Title_Text + "</h1>" + "</div>");
                        var IntlTel_head = "bg_gray_f9f bor_bottom bor_gray_ddd";
                        if (IsMobile) {
                            if ($("header").length > 0) {
                                var headStyle = $("header").attr("class");
                                objsub.find(".ak-IntlTel_head").addClass(headStyle);
                            } else {
                                objsub.find(".ak-IntlTel_head").addClass(IntlTel_head);
                            }
                            objsub.find(".ak-IntlTel_head").removeClass("dis_none_im");
                            objsub.addClass("bor_none");
                        } else {
                            objsub.find(".ak-IntlTel_head").addClass("dis_none_im");
                        }
                        objsub_title.addClass(option.show_color).css({
                            "height": $(window).height()
                        });
                        datalist.addClass("scrolling_touch press").css({
                            "margin-top": $(".ak-IntlTel_head").outerHeight(),
                            "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                        });
                        if (IsMobile) {
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10,
                                "margin-right": 0
                            })
                        } else {
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10,
                                "margin-right": "1%"
                            })
                        }
                        $(window).resize(function() {
                            objsub_title.addClass(option.show_color).css({
                                "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                            });
                            datalist.addClass("scrolling_touch press").css({
                                "margin-top": $(".ak-IntlTel_head").outerHeight(),
                                "height": $(window).height() - $(".ak-IntlTel_head").outerHeight()
                            });
                            objsub_ol.css({
                                "top": $(".ak-IntlTel_head").outerHeight() + 10
                            })
                        });
                        objsub_dl.find("dd").addClass(option.list_Class);
                        var this_h = 0;
                        datalist.scroll(function() {
                            var letter_position = [];
                            datalist.each(function() {
                                for (var i = 0; i < $(this).find("dl").length; i++) {
                                    letter_position.push($(this).find("dl")[i].offsetTop);
                                }
                            });
                            if ($(".ak-IntlTel_head").length > 0) {
                                scrolltop = datalist.scrollTop() + $(".ak-IntlTel_head").outerHeight();
                            } else {
                                scrolltop = datalist.scrollTop();
                            }
                            for (var j = 0; j < letter_position.length; j++) {
                                if (scrolltop >= letter_position[j]) {
                                    objsub_ol.find("li").removeClass(option.Nav_active);
                                    objsub_ol.find("li").eq(j).addClass(option.Nav_active);
                                }
                            }
                            this_h = datalist.scrollTop();
                        });
                        objsub_ol.find("li").unbind("click");
                        objsub_ol.find("li").on("click", function(event) {
                            if (IsMobile) {
                                this_h += objsub_dl.eq($(this).index()).offset().top - $(".ak-IntlTel_head").outerHeight() + 2;
                            } else {
                                this_h += objsub_dl.eq($(this).index()).offset().top - objsub.offset().top + 2;
                            }
                            event.stopPropagation();
                            objsub.show();
                            objsub_title.fadeIn();
                            setTimeout(function() {
                                objsub_title.fadeOut();
                            }, 800);
                            objsub_title.text($(this).text());
                            datalist.animate({
                                scrollTop: this_h
                            }, 500);
                        });
                        objsub_dl.find("dd").unbind("click");
                        objsub_dl.find("dd").on("click", function() {
                            var val = this;
                            obj.el.children("input").val($(this).attr("data-number"));
                            objsub.hide();
                            obj.el.removeClass("ak-is_active");
                            option.clickBack(val);
                        });
                        $(this).unbind("click");
                        $(this).on("click",
                            function(event) {
                                $(this).toggleClass("ak-is_active");
                                if ($(this).hasClass("ak-is_active")) {
                                    if (IsMobile) {
                                        objsub.show();
                                    } else {
                                        objsub.find(".ak-IntlTel_head").addClass("dis_none_im");
                                        objsub.addClass("abs").css({
                                            "width": option.boxsize[0],
                                            "left": $(this).offset().left
                                        });
                                        objsub.children("ol").addClass("abs top_0 mt_1em mr_16em");
                                        datalist.addClass("mt_0 scrollbar").css({
                                            "height": option.boxsize[1]
                                        });
                                        if ($(this).offset().top + $(this).innerHeight()+ objsub.innerHeight() > $(window).height()) {
                                            objsub.css({
                                                "top": "auto",
                                                "bottom": $("#ak-scrollview").outerHeight() - ($(this).offset().top + $(this).outerHeight()) + $("#ak-scrollview").offset().top + $(this).innerHeight()*2-4
                                            });
                                        } else {
                                            objsub.addClass("abs").css({
                                                "top": $(this).offset().top + $(this).outerHeight(),
                                                "bottom": "auto",
                                            });
                                        }
                                        objsub.slideDown();
                                    }
                                    option.showBack(objsub);
                                    $("body").unbind("click");
                                    $("body").click(function () {
                                        objsub.slideUp();
                                        obj.el.removeClass("ak-is_active");
                                    });
                                    if ($('#ak-scrollview').length > 0) {
                                        var $scrollbar = $("#ak-scrollview");
                                    } else {
                                        var $scrollbar = $("main");
                                    }
                                    $scrollbar.scroll(function(){
                                        objsub.hide();
                                        obj.el.removeClass("ak-is_active");
                                    });
                                } else {
                                    if (IsMobile) {
                                        objsub.hide();
                                    } else {
                                        objsub.slideUp();
                                    }
                                }
                                event.stopPropagation();
                            });
                        $(".ak-IntlTel_head").children("button").unbind("click");
                        $(".ak-IntlTel_head").children("button").click(function() {
                            obj.el.removeClass("ak-is_active");
                            objsub.hide();
                        })
                    })
                })
            }
        };
        var el = new TelInput($(this));
    }
} (jQuery));
