/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Switch--------------------------------------*/
(function($){
    /**
     * 开关按钮
     * @param settings 用户设置参数
     */
    $.fn.AKjs_Switch = function(settings) {
        /* 默认参数 */
        var _defaults = {
            checkedClass: "bg_title",
            disabledClass: "dis_opa_05",
            // 选中状态类名
            onChange: function(element) {} // onchange回调，返回当前选中项DOM元素组
        };

        var options = $.extend(_defaults, settings || {});

        var Switchs = this;
        Switchs.addClass("ak-Switch");
        if (Switchs.parent().children("label").length < 1) {
            Switchs.parent().append("<label />");
        }
        Switchs.next("label").attr("data-name",this.attr("name"));
        Switchs.each(function() {
            var $switch = $(this);
            $switch.next("label").css("margin-top", ($switch.next("label").parent().height() - Switchs.next("label").height()) / 2);
            $(window).resize(function(){
                $switch.next("label").css("margin-top", ($switch.next("label").parent().height() - Switchs.next("label").height()) / 2);
            });
            /*---- 初始化 ----*/
            // 是否选中以input:checkbox的选中状态为准
            if ($switch.is(':checked') && !$switch.is(':disabled')) {
                $switch.next("label").addClass(options.checkedClass).removeClass(options.disabledClass);
            } else if (!$switch.is(':checked') && $switch.is(':disabled'))  {
                $switch.next("label").removeClass(options.checkedClass).addClass(options.disabledClass);
            } else if ($switch.is(':disabled') || $switch.is(':checked')) {
                $switch.next("label").addClass(options.disabledClass).addClass(options.checkedClass);
            } else if (!$switch.is(':checked') && !$switch.is(':disabled'))  {
                $switch.next("label").removeClass(options.checkedClass).removeClass(options.disabledClass);
            }

            /*---- 添加事件 ----*/
            $switch.unbind();
            $switch.on("change", function() {
                $(this).next("label").toggleClass(options.checkedClass);
                options.onChange($(this)[0].checked); // 回调
            });
        });
    };
}(jQuery));