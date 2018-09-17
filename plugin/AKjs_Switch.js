/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Switch--------------------------------------*/
(function($) {
    $.fn.AKjs_Switch = function(settings) {
        var _defaults = {
            checkedClass: "bg_title",
            disabledClass: "dis_opa_05",
            onChange: function(element) {}
        };
        var options = $.extend(_defaults, settings || {});
        var Switchs = this;
        Switchs.addClass("ak-Switch");
        if (Switchs.parent().children("label").length < 1) {
            Switchs.parent().append("<label />")
        }
        Switchs.next("label").attr("data-name", this.attr("name"));
        Switchs.each(function() {
            var $switch = $(this);
            $switch.next("label").css("margin-top", ($switch.next("label").parent().height() - Switchs.next("label").height()) / 2);
            $(window).resize(function() {
                $switch.next("label").css("margin-top", ($switch.next("label").parent().height() - Switchs.next("label").height()) / 2)
            });
            if ($switch.is(":checked") && !$switch.is(":disabled")) {
                $switch.next("label").addClass(options.checkedClass).removeClass(options.disabledClass)
            } else {
                if (!$switch.is(":checked") && $switch.is(":disabled")) {
                    $switch.next("label").removeClass(options.checkedClass).addClass(options.disabledClass)
                } else {
                    if ($switch.is(":disabled") || $switch.is(":checked")) {
                        $switch.next("label").addClass(options.disabledClass).addClass(options.checkedClass)
                    } else {
                        if (!$switch.is(":checked") && !$switch.is(":disabled")) {
                            $switch.next("label").removeClass(options.checkedClass).removeClass(options.disabledClass)
                        }
                    }
                }
            }
            $switch.unbind();
            $switch.on("change",
                function() {
                    $(this).next("label").toggleClass(options.checkedClass);
                    options.onChange($(this)[0].checked)
                })
        })
    }
} (jQuery));