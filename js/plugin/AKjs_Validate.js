/*
Modification Date: 2018-08-09（本插件已停用：被AKjs_Form合并）
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Validate----------------------------------------*/
(function($){
    $.fn.AKjs_Validate = function(setting) {
        var option = $.extend({
                opacity: 0,
                callback: function() {}
            },
            setting);
        var vld = $(this);
    };
}(jQuery));