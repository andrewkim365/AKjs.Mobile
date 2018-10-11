/*
Modification Date: 2018-10-10
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Circliful-------------------------------------------*/
(function($) {
    $.fn.AKjs_Circliful = function(setting) {
        var option = $.extend({
                prog_color: "",
                bg_color: "",
                fill_color: false,
                width: 15,
                dimension: 200,
                font_size: 15,
                font_color: "#333333",
                percent: 50,
                animationStep: 1
            }, setting);
        return this.each(function() {
            var $dimension = "";
            var $ele_text = "";
            var $ele_info = "";
            var $width = "";
            var $font_size = 0;
            var $font_color = "";
            var $percents = 0;
            var $percent = 100;
            var $prog_color = "";
            var $bg_color = "";
            var $icon = "";
            var $animationStep = 0;
            var ele = $(this);
            ele.html("<section />");
            var section = ele.children("section");
            if (ele.data("dimension") != undefined) {
                $dimension = ele.data("dimension")
            } else {
                $dimension = option.dimension
            }
            if (ele.data("width") != undefined) {
                $width = ele.data("width")
            } else {
                $width = option.width
            }
            if (ele.data("font_size") != undefined) {
                $font_size = ele.data("font_size")
            } else {
                $font_size = option.font_size
            }
            if (ele.data("font_color") != undefined) {
                $font_color = ele.data("font_color")
            } else {
                $font_color = option.font_color
            }
            if (ele.data("percent") != undefined) {
                $percents = ele.data("percent") / 100;
                $percent = ele.data("percent")
            } else {
                $percents = option.percent / 100
            }
            if (ele.data("prog_color") != undefined) {
                $prog_color = ele.data("prog_color")
            } else {
                $prog_color = option.prog_color
            }
            if (ele.data("bg_color") != undefined) {
                $bg_color = ele.data("bg_color")
            } else {
                $bg_color = option.bg_color
            }
            if (ele.data("animationStep") != undefined) {
                $animationStep = parseFloat(ele.data("animationStep"))
            } else {
                $animationStep = option.animationStep
            }
            if (ele.data("text") != undefined) {
                $ele_text = ele.data("text");
                if (ele.data("type") != undefined) {
                    $ele_type = ele.data("type");
                    if ($ele_type == "half") {
                        section.append('<span class="ak-text-half w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                        css_text_half();
                    } else {
                        section.append('<span class="ak-text w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                        css_text();
                    }
                } else {
                    section.append('<span class="ak-text w_100 abs text_al_c dis_inbl">' + $icon + $ele_text + "</span>");
                    css_text();
                }
            }
            if (ele.data("info") != undefined) {
                $ele_info = ele.data("info");
                if (ele.data("type") != undefined) {
                    $ele_type = ele.data("type");
                    if ($ele_type == "half") {
                        section.append('<span class="ak-info-half w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info_half();
                    } else if ($ele_type == "spacing") {
                        section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info();
                        section.append("<div class='top_0 left_0 abs bor_rad_50' />");
                        var val = ele.data("width");
                        AKjs_UserAgent();
                        if (IsMobile) {
                            switch (true) {
                                case val <= '5':
                                    var wh =($dimension - ($width*2))-($width/0.2);
                                    break;
                                case val <= '10':
                                    var wh =($dimension - ($width*2))-($width/0.4);
                                    break;
                                case val <= '15':
                                    var wh =($dimension - ($width*2))-($width/0.6);
                                    break;
                                case val > '15':
                                    var wh =($dimension - ($width*2))-($width/1.2);
                                    break;
                            }
                        } else {
                            switch (true) {
                                case val <= '5':
                                    var wh =($dimension - ($width*2))-($width/0.1);
                                    break;
                                case val <= '10':
                                    var wh =($dimension - ($width*2))-($width/0.3);
                                    break;
                                case val <= '15':
                                    var wh =($dimension - ($width*2))-($width/0.4);
                                    break;
                                case val <= '20':
                                    var wh =($dimension - ($width*2))-($width/0.6);
                                    break;
                                case val <= '25':
                                    var wh =($dimension - ($width*2))-($width/0.8);
                                    break;
                                case val <= '30':
                                    var wh =($dimension - ($width*2))-($width/1.2);
                                    break;
                                case val > '30':
                                    var wh =($dimension - ($width*2))-($width/2);
                                    break;
                            }
                        }
                        var div = ele.find("div");
                        div.css({
                            "width": wh + "px",
                            "height": wh + "px"
                        });
                        div.css({
                            "margin": $dimension/2 - (div.outerWidth()/2) + "px"
                        });
                        if (ele.data("spacing_color") != undefined) {
                            div.css({
                                "background-color": ele.data("spacing_color")
                            });
                        }
                    }else {
                        section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                        css_info();
                    }
                } else {
                    section.append('<span class="ak-info w_100 abs text_al_c dis_inbl">' + $ele_info + "</span>");
                    css_info();
                }
            }
            function css_text() {
                ele.find(".ak-text").css({
                    "line-height": $dimension - 20 + "px",
                    "font-size": $font_size,
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_info() {
                ele.find(".ak-info").css({
                    "line-height": ($dimension * 1.25) + "px",
                    "font-size": "0.6em",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_text_half() {
                ele.find(".ak-text-half").css({
                    "line-height": $dimension/2*1.25 + "px",
                    "font-weight": "bold",
                    "font-size": "1.2em",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            function css_info_half() {
                ele.find(".ak-info-half").css({
                    "line-height": ($dimension * 0.86) + "px",
                    "color": $font_color,
                    "z-index": 2
                })
            }
            ele.width($dimension + "px");
            var $canvas = $("<canvas></canvas>").attr({
                width: $dimension,
                height: $dimension
            }).appendTo(section).get(0);
            section.addClass("rel ovh");
            var context = $canvas.getContext("2d");
            var $canvas_width = $canvas.width / 2;
            var $canvas_height = $canvas.height / 2;
            var radius = $canvas.width / 2.5;
            var startAngle = 2.3 * Math.PI;
            var endAngle = 0;
            var curPerc = $animationStep === 0 ? $percent: 0;
            var curStep = Math.max($animationStep, 0);
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var $ele_type = "";
            var $fill_color = false;
            if (ele.data("type") != undefined) {
                $ele_type = ele.data("type");
                if ($ele_type == "half") {
                    var startAngle = 2 * Math.PI;
                    var endAngle = 3.13;
                    var circ = Math.PI * 1;
                    var quart = Math.PI / 0.996
                }
            }
            if (ele.data("fill_color") != undefined) {
                $fill_color = ele.data("fill_color");
            } else {
                $fill_color = option.fill_color;
            }
            function k(x) {
                context.clearRect(0, 0, $canvas.width, $canvas.height);
                context.beginPath();
                context.arc($canvas_width, $canvas_height, radius, endAngle, startAngle, false);
                context.lineWidth = $width - 1;
                context.strokeStyle = $bg_color;
                context.stroke();
                if ($fill_color) {
                    context.fillStyle = $fill_color;
                    context.fill();
                }
                context.beginPath();
                context.arc($canvas_width, $canvas_height, radius, -(quart), ((circ) * x) - quart, false);
                context.lineWidth = $width;
                context.strokeStyle = $prog_color;
                context.stroke();
                if (curPerc < $percent) {
                    curPerc += curStep;
                    requestAnimationFrame(function() {
                        k(Math.min(curPerc, $percent) / 100)
                    })
                }
            }
            k(curPerc / 100)
        })
    }
} (jQuery));
