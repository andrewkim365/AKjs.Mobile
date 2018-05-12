/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Checkbox--------------------------------------*/
(function($){
    /**
     * 复选框
     * @param settings 用户设置参数
     */
    $.fn.Andrew_Checkbox = function(settings) {
        /* 默认参数 */
        var _defaults = {
            checkedClass: "bg_title bor_title c_white",
            disabledClass: "bg_gray_ccc bor_gray_ccc c_white",
            // 选中状态类名
            onChange: function(element) {} // onchange回调，返回当前选中项DOM元素组
        };

        var options = $.extend(_defaults, settings || {});
        if (!this.parent("label").hasClass("ak-Checkbox")) {
            this.wrap("<label />");
        }
        var checkboxes = this.parent("label");
        checkboxes.addClass("ak-Checkbox");
        checkboxes.attr("data-name",this.attr("name"));
        checkboxes.css("margin-top", (checkboxes.parent().height() - checkboxes.height()) / 2);
        checkboxes.find('input[type="checkbox"]').css("margin-top", "-" + (checkboxes.parent().height() - checkboxes.height()) / 2 -1 + "px");
        $(window).resize(function(){
            checkboxes.css("margin-top", (checkboxes.parent().height() - checkboxes.height()) / 2);
            checkboxes.find('input[type="checkbox"]').css("margin-top", "-" + (checkboxes.parent().height() - checkboxes.height()) / 2 -1 + "px");
        });
        checkboxes.each(function(ev) {
            if ($(this).find('input[type="checkbox"]').attr("multiple")) {
                var $checkbox = $(ev.target);
            } else {
                var $checkbox = $(this);
            }
            /*---- 初始化 ----*/
            // 是否选中以input:checkbox的选中状态为准
            if ($checkbox.find('input[type="checkbox"]').attr("checked")) {
                $checkbox.addClass(options.checkedClass);
                $checkbox.find('input[type="checkbox"]').attr("checked","checked");
            } else if ($checkbox.find('input[type="checkbox"]').is(':disabled')) {
                $checkbox.addClass(options.disabledClass);
                $checkbox.find('input[type="checkbox"]').attr("checked","checked");
            } else {
                $checkbox.removeClass(options.checkedClass).removeClass(options.disabledClass);
                $checkbox.find('input[type="checkbox"]').removeAttr("checked");
            }

            /*---- 添加事件 ----*/
            $checkbox.unbind();
            $checkbox.on("change", function() {
                if ($checkbox.find('input[type="checkbox"]').attr("checked")) {
                    $checkbox.find('input[type="checkbox"]').removeAttr("checked");
                    $checkbox.removeClass(options.checkedClass)
                } else {
                    $checkbox.find('input[type="checkbox"]').attr("checked","checked");
                    $checkbox.addClass(options.checkedClass);
                }
                options.onChange($(this).children()[0].checked); // 回调
            });
        });
    };
}(jQuery));