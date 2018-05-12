/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Radio--------------------------------------*/
(function($){
    /**
     * 单选按钮 以data-name来标识分组
     * @param settings 用户设置参数
     */
    $.fn.Andrew_Radio = function(settings) {
        /* 默认参数 */
        var _defaults = {
            checkedClass: "bor_title border8",
            // 选中状态类名
            onChange: function(element) {} // onchange回调，返回当前选中项DOM元素
        };

        var options = $.extend(_defaults, settings || {});
        if (!this.parent("label").hasClass("ak-Radio")) {
            this.wrap("<label />");
        }
        var radios = this.parent("label");
        radios.addClass("ak-Radio");
        radios.attr("data-name",this.attr("name"));
        radios.each(function() {
            var $radio = $(this);
            var _name = $(this).data("name"); // 组name值
            /*---- 初始化 ----*/
            // 是否选中以input:radio的选中状态为准,多个选中的话以最后一个为准
            if ($radio.find('input[type="radio"]').is(':checked')) {
                var $otherRadios = radios.filter("[data-name='" + _name + "']").not($radio);
                $radio.addClass(options.checkedClass);
                $otherRadios.removeClass(options.checkedClass);
                $otherRadios.find('input[type="radio"]').removeAttr("checked");
            }

            /*---- 添加事件 ----*/
            $radio.unbind();
            $radio.on("change", function() {
                if (!$(this).hasClass(options.checkedClass)) {
                    $(this).addClass(options.checkedClass);
                    $(this).children('input[type="radio"]').attr("checked","checked");
                    radios.filter("[data-name='" + _name + "']").not($(this)).removeClass(options.checkedClass); // 切换class状态
                    radios.filter("[data-name='" + _name + "']").not($(this)).children('input[type="radio"]').removeAttr("checked"); // 切换input状态
                }
                options.onChange($(this).children()); // 回调
            });
        });
    };
}(jQuery));