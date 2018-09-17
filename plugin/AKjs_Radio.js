/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Radio--------------------------------------*/
(function($) {
    $.fn.AKjs_Radio = function(settings) {
        var _defaults = {
            boxSize: "2.6em",
            checkedClass: "bor_title border8",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        if (!this.parent("label").hasClass("ak-Radio")) {
            this.wrap("<label />")
        }
        var radios = this.parent("label");
        radios.addClass("ak-Radio");
        AKjs_UserAgent();
        if (!IsMobile) {
            if (options.boxSize) {
                radios.css({
                    "width": options.boxSize,
                    "height": options.boxSize,
                    "line-height": options.boxSize
                })
            }
            radios.addClass("rel text_al_c")
        } else {
            radios.removeClass("rel text_al_c").removeAttr("style")
        }
        $(window).resize(function() {
            if (!IsMobile) {
                if (options.boxSize) {
                    radios.css({
                        "width": options.boxSize,
                        "height": options.boxSize,
                        "line-height": options.boxSize
                    })
                }
                radios.addClass("rel text_al_c")
            } else {
                radios.removeClass("rel text_al_c").removeAttr("style")
            }
        });
        radios.attr("data-name", this.attr("name"));
        radios.each(function() {
            var $radio = $(this);
            var _name = $(this).data("name");
            if ($radio.find('input[type="radio"]').is(":checked")) {
                var $otherRadios = radios.filter("[data-name='" + _name + "']").not($radio);
                $radio.addClass(options.checkedClass);
                $otherRadios.removeClass(options.checkedClass);
                $otherRadios.find('input[type="radio"]').removeAttr("checked")
            }
            $radio.unbind();
            $radio.on("change",
                function() {
                    if (!$(this).hasClass(options.checkedClass)) {
                        $(this).addClass(options.checkedClass);
                        $(this).children('input[type="radio"]').attr("checked", "checked");
                        radios.filter("[data-name='" + _name + "']").not($(this)).removeClass(options.checkedClass);
                        radios.filter("[data-name='" + _name + "']").not($(this)).children('input[type="radio"]').removeAttr("checked")
                    }
                    options.onChange($(this).children())
                })
        })
    }
} (jQuery));