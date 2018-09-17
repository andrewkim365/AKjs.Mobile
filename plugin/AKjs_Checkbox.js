/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Checkbox--------------------------------------*/
(function($) {
    $.fn.AKjs_Checkbox = function(settings) {
        var _defaults = {
            boxSize: "",
            checkedClass: "bg_title bor_title c_white",
            disabledClass: "bg_gray_ccc bor_gray_ccc c_white",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        var self = this;
        if (!self.parent("label").hasClass("ak-Checkbox")) {
            self.wrap("<label />");
        }
        var checkboxes = self.parent("label");
        checkboxes.addClass("ak-Checkbox");
        if (options.boxSize) {
            checkboxes.css({
                "width": options.boxSize,
                "height": options.boxSize,
                "line-height": options.boxSize
            })
        }
        AKjs_UserAgent();
        if (IsMobile) {
            checkboxes.addClass("sta");
            checkboxes.find('input[type="checkbox"]').addClass("top_0");
            checkboxes.removeClass("bor_rad_0");
        } else {
            checkboxes.addClass("bor_rad_0");
            checkboxes.removeClass("sta");
            checkboxes.find('input[type="checkbox"]').removeClass("top_0")
        }
        $(window).resize(function() {
            if (IsMobile) {
                checkboxes.addClass("sta");
                checkboxes.find('input[type="checkbox"]').addClass("top_0");
                checkboxes.removeClass("bor_rad_0")
            } else {
                checkboxes.addClass("bor_rad_0");
                checkboxes.removeClass("sta");
                checkboxes.find('input[type="checkbox"]').removeClass("top_0");
            }
        });
        checkboxes.attr("data-name", self.attr("name"));
        checkboxes.each(function(ev) {
            if ($(this).find('input[type="checkbox"]').attr("multiple")) {
                var $checkbox = $(ev.target);
            } else {
                var $checkbox = $(this);
            }
            if ($(this).find('input[type="checkbox"]').attr("checked")) {
                $(this).addClass(options.checkedClass);
                $(this).find('input[type="checkbox"]').attr("checked", "checked");
            } else {
                if ($(this).find('input[type="checkbox"]').is(":disabled")) {
                    $(this).addClass(options.disabledClass);
                    $(this).find('input[type="checkbox"]').attr("checked", "checked");
                } else {
                    $(this).removeClass(options.checkedClass).removeClass(options.disabledClass);
                    $(this).find('input[type="checkbox"]').removeAttr("checked");
                }
            }
            $checkbox.on("change", function() {
                if ($checkbox.find('input[type="checkbox"]').attr("checked")) {
                    $checkbox.find('input[type="checkbox"]').removeAttr("checked");
                    $checkbox.removeClass(options.checkedClass);
                } else {
                    $checkbox.find('input[type="checkbox"]').attr("checked", "checked");
                    $checkbox.addClass(options.checkedClass);
                }
                options.onChange($($(this).children()[0]));
            });
        })
    }
} (jQuery));
