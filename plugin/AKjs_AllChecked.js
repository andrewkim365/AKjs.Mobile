/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_AllChecked--------------------------------------*/
(function($) {
    $.fn.AKjs_AllChecked = function(settings) {
        var ele = $(this);
        var allCheck = ele.children().eq(0).children("dl").find(":checkbox");
        var checks = ele.children().eq(0).children("dl").next().children().children("dl").find(":checkbox");
        var defaults = {
            toggleClass: "",
            callback: function() {}
        };
        var option = $.extend(defaults, settings);
        allCheck.prop("checked", false);
        allCheck.parent("label").removeClass(option.toggleClass);
        allCheck.unbind("click");
        allCheck.click(function() {
            var set = $(this).parents("dl").next().find(":checkbox");
            if ($(this).prop("checked")) {
                $.each(set,
                    function(i, v) {
                        $(v).prop("checked", true);
                        $(v).parent("label").addClass(option.toggleClass);
                        option.callback($(v))
                    });
                allCheck.prop("checked", true);
                allCheck.parent("label").addClass(option.toggleClass);
            } else {
                $.each(set,
                    function(i, v) {
                        $(v).prop("checked", false);
                        $(v).parent("label").removeClass(option.toggleClass);
                        option.callback($(v));
                    });
                allCheck.prop("checked", false);
                allCheck.parent("label").removeClass(option.toggleClass);
            }
        });
        checks.unbind("click");
        checks.click(function() {
            var leng = $(this).parents("dl").parent().parent().find(":checkbox:checked").length;
            if ($(this).prop("checked")) {
                $(this).parent("label").addClass(option.toggleClass);
            } else {
                $(this).parent("label").removeClass(option.toggleClass);
            }
            if (leng == checks.length) {
                allCheck.prop("checked", true);
                allCheck.parent("label").addClass(option.toggleClass);
            } else {
                allCheck.prop("checked", false);
                allCheck.parent("label").removeClass(option.toggleClass);
            }
            option.callback(checks);
        })
    }
} (jQuery));