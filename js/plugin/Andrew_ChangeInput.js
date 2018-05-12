/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_ChangeInput-------------------------------------*/
(function($){
    $.fn.Andrew_ChangeInput = function(setting) {
        var option = $.extend({
                text_input: new Array(),
                onChange:function(){}
            },
            setting);
        var $ChangeInput = $(this);
        $ChangeInput.unbind("click");
        $ChangeInput.click(function() {
            var left_input = $(option.text_input[0]);
            var right_input = $(option.text_input[1]);
            var tmp ="";
            var left_input_value = left_input.val();
            var right_input_value = right_input.val();
            tmp = left_input_value;
            left_input.val(right_input_value);
            right_input.val(tmp);
            option.onChange(right_input_value,tmp);
        });
    };
}(jQuery));