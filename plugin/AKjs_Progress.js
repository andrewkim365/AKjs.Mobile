/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Progress-------------------------------------------*/
(function($) {
    $.fn.extend({
        AKjs_Progress: function(options) {
            var defaults = {
                goalAmount: 100,
                currentAmount: 50,
                speed: 1000,
                ColorStyle: "",
                textBefore: "",
                textAfter: "",
                milestoneNumber: 70,
                milestoneClass: "",
                callback: function() {}
            };
            var options = $.extend(defaults, options);
            return this.each(function() {
                var obj = $(this);
                var goalAmountParsed = parseInt(defaults.goalAmount);
                if (obj.attr("data-to")) {
                    var currentAmountParsed = parseInt(obj.attr("data-to"))
                } else {
                    var currentAmountParsed = parseInt(defaults.currentAmount)
                }
                var percentage = (currentAmountParsed / goalAmountParsed) * 100;
                var milestoneNumberClass = (percentage > defaults.milestoneNumber) ? " " + defaults.milestoneClass: "";
                if (defaults.textAfter) {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + "<em>" + currentAmountParsed + "</em>" + defaults.textAfter + "</span></li>"
                } else {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + "</span></li>"
                }
                var progressBarWrapped = '<ol class="bg_in h_in dis_block_im ovh">' + progressBar + "</ol>";
                obj.html(progressBarWrapped);
                var rendered = obj.children("ol").children("li");
                rendered.each(function() {
                    obj.find(".ak-progressBar").addClass(defaults.ColorStyle);
                    $(this).html($(this).html().replace(/\s/g, " "));
                    setTimeout(function() {
                            rendered.find("span").show().css({
                                "line-height": rendered.height() + 2 + "px"
                            });
                            obj.css("margin-top", (obj.parent().height() - obj.height()) / 2)
                        },
                        300);
                    $(window).resize(function() {
                        rendered.find("span").show().css({
                            "line-height": rendered.height() + 2 + "px"
                        });
                        obj.css("margin-top", (obj.parent().height() - obj.height()) / 2)
                    })
                });
                rendered.animate({
                        width: percentage + "%"
                    },
                    {
                        duration: defaults.speed,
                        step: function(now, fx) {
                            if (obj.attr("data-from")) {
                                fx.start = parseInt(obj.attr("data-from"))
                            } else {
                                fx.start = 0
                            }
                            rendered.find("em").text(parseInt(fx.now))
                        }
                    });
                setTimeout(function() {
                        $(rendered).parent().addClass(milestoneNumberClass)
                    },
                    defaults.speed);
                defaults.callback.call($(this))
            })
        }
    })
} (jQuery));