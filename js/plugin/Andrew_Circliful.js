/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Circliful-------------------------------------------*/
(function($) {
    $.fn.Andrew_Circliful = function(b) {
        var c = $.extend({
                prog_color: "",
                bg_color: "",
                fill_color: false,
                width: 15,
                dimension: 200,
                font_size: 15,
                font_color: "#333333",
                percent: 50,
                animationStep: 1
            }, b);
        return this.each(function() {
            var F = "";
            var s = "";
            var E = "";
            var v = "";
            var t = 0;
            var tc = "";
            var e = 0;
            var l = 100;
            var B = "";
            var d = "";
            var D = "";
            var q = 0;
            var ele = $(this);
            ele.html("<section />");
            var section = ele.children("section");
            if (ele.data("dimension") != undefined) {
                F = ele.data("dimension")
            } else {
                F = c.dimension
            }
            if (ele.data("width") != undefined) {
                v = ele.data("width")
            } else {
                v = c.width
            }
            if (ele.data("font_size") != undefined) {
                t = ele.data("font_size")
            } else {
                t = c.font_size
            }
            if (ele.data("font_color") != undefined) {
                tc = ele.data("font_color")
            } else {
                tc = c.font_color
            }
            if (ele.data("percent") != undefined) {
                e = ele.data("percent") / 100;
                l = ele.data("percent")
            } else {
                e = c.percent / 100
            }
            if (ele.data("prog_color") != undefined) {
                B = ele.data("prog_color")
            } else {
                B = c.prog_color
            }
            if (ele.data("bg_color") != undefined) {
                d = ele.data("bg_color")
            } else {
                d = c.bg_color
            }
            if (ele.data("animationStep") != undefined) {
                q = parseFloat(ele.data("animationStep"))
            } else {
                q = c.animationStep
            }
            if (ele.data("text") != undefined) {
                s = ele.data("text");
                if (ele.data("type") != undefined) {
                    i = ele.data("type");
                    if (i == "half") {
                        section.append('<span class="ak-text-half w_100 abs text_al_c dis_inbl">' + D + s + "</span>");
                        css_text_half();
                    } else {
                        section.append('<span class="ak-text w_100 abs text_al_c dis_inbl">' + D + s + "</span>");
                        css_text();
                    }
                } else {
                    section.append('<span class="ak-text w_100 abs text_al_c dis_inbl">' + D + s + "</span>");
                    css_text();
                }
            }
            if (ele.data("info") != undefined) {
                E = ele.data("info");
                if (ele.data("type") != undefined) {
                    i = ele.data("type");
                    if (i == "half") {
                        section.append('<span class="ak-info-half w_100 abs text_al_c dis_inbl">' + E + "</span>");
                        css_info_half();
                    } else if (i == "spacing") {
                        section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + E + "</span>");
                        css_info();
                        section.append("<aside class='top_0 left_0 abs bor_rad_50' />");
                        var val = ele.data("width");
                        switch (true) {
                            case val <= '5':
                                var wh =(F - (v*2))-(v/0.2);
                                break;
                            case val <= '10':
                                var wh =(F - (v*2))-(v/0.4);
                                break;
                            case val <= '15':
                                var wh =(F - (v*2))-(v/0.6);
                                break;
                            case val > '15':
                                var wh =(F - (v*2))-(v/1.2);
                                break;
                        }
                        var aside = ele.find("aside");
                        aside.css({
                            "width": wh + "px",
                            "height": wh + "px"
                        });
                        aside.css({
                            "margin": F/2 - (aside.outerWidth()/2) + "px"
                        });
                        if (ele.data("spacing_color") != undefined) {
                            aside.css({
                                "background-color": ele.data("spacing_color")
                            });
                        }
                    }else {
                        section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + E + "</span>");
                        css_info();
                    }
                } else {
                    section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + E + "</span>");
                    css_info();
                }
            }
            function css_text() {
                ele.find(".ak-text").css({
                    "line-height": F - 20 + "px",
                    "font-size": t,
                    "color": tc,
                    "z-index": 2
                })
            }
            function css_info() {
                ele.find(".ak-info").css({
                    "line-height": (F * 1.25) + "px",
                    "font-size": "0.8em",
                    "color": tc,
                    "z-index": 2
                })
            }
            function css_text_half() {
                ele.find(".ak-text-half").css({
                    "line-height": F/2*1.25 + "px",
                    "font-weight": "bold",
                    "font-size": "1.2em",
                    "color": tc,
                    "z-index": 2
                })
            }
            function css_info_half() {
                ele.find(".ak-info-half").css({
                    "line-height": (F * 0.86) + "px",
                    "font-size": "0.8em",
                    "color": tc,
                    "z-index": 2
                })
            }
            ele.width(F + "px");
            var h = $("<canvas></canvas>").attr({
                width: F,
                height: F
            }).appendTo(section).get(0);
            section.addClass("rel ovh");
            var f = h.getContext("2d");
            var p = h.width / 2;
            var o = h.height / 2;
            var A = e * 360;
            var G = A * (Math.PI / 180);
            var j = h.width / 2.5;
            var z = 2.3 * Math.PI;
            var u = 0;
            var C = false;
            var m = q === 0 ? l: 0;
            var n = Math.max(q, 0);
            var r = Math.PI * 2;
            var g = Math.PI / 2;
            var i = "";
            var w = false;
            if (ele.data("type") != undefined) {
                i = ele.data("type");
                if (i == "half") {
                    var z = 2 * Math.PI;
                    var u = 3.13;
                    var r = Math.PI * 1;
                    var g = Math.PI / 0.996
                }
            }
            if (ele.data("fill_color") != undefined) {
                w = ele.data("fill_color");
            } else {
                w = c.fill_color;
            }
            function k(x) {
                f.clearRect(0, 0, h.width, h.height);
                f.beginPath();
                f.arc(p, o, j, u, z, false);
                f.lineWidth = v - 1;
                f.strokeStyle = d;
                f.stroke();
                if (w) {
                    f.fillStyle = w;
                    f.fill();
                }
                f.beginPath();
                f.arc(p, o, j, -(g), ((r) * x) - g, false);
                f.lineWidth = v;
                f.strokeStyle = B;
                f.stroke();
                if (m < l) {
                    m += n;
                    requestAnimationFrame(function() {
                        k(Math.min(m, l) / 100)
                    })
                }
            }
            k(m / 100)
        })
    }
} (jQuery));