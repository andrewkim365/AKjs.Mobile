/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ChangeIcon--------------------------------------*/
(function($){
    $.fn.AKjs_ChangeIcon = function(setting) {
        var option = $.extend({
                multi_icon: false,
                text_color: new Array(),
                Change_icon: new Array(),
                clickBack: function () {
                }
            },
            setting);
        var $ChangeIcon = $(this);
        $ChangeIcon.unbind("click");
        $ChangeIcon.click(function () {
            var icon_ele = $(this);
            if (option.multi_icon == true) {
                icon_ele.children().eq(0).addClass(option.text_color[1]);
                icon_ele.children().eq(1).toggleClass(option.text_color[1] + " " + option.text_color[0]);
                if (icon_ele.children().eq(1).hasClass(option.text_color[1])) {
                    icon_ele.children().find("i").eq(0).addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    icon_ele.children().find("i").eq(1).removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    option.clickBack("up",option, icon_ele)
                } else {
                    icon_ele.children().find("i").eq(0).removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    icon_ele.children().find("i").eq(1).addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    option.clickBack("down",option, icon_ele)
                }
            } else {
                icon_ele.children().toggleClass(option.text_color[1] + " " + option.text_color[0]);
                var flag = false;
                if (icon_ele.children().hasClass(option.text_color[1])) {
                    icon_ele.children().addClass(option.text_color[1]).removeClass(option.text_color[0]);
                    icon_ele.children().find("i").addClass(option.Change_icon[1]).removeClass(option.Change_icon[0]);
                    option.clickBack(true,option, icon_ele);
                    flag = true;
                } else {
                    icon_ele.children().removeClass(option.text_color[1]).addClass(option.text_color[0]);
                    icon_ele.children().find("i").removeClass(option.Change_icon[1]).addClass(option.Change_icon[0]);
                    option.clickBack(false,option, icon_ele);
                    flag = false;
                }
                if (flag == true) {
                    icon_ele.children().addClass(option.text_color[1]);
                    icon_ele.children().find("i").addClass(option.text_color[1]);
                } else {
                    icon_ele.children().removeClass(option.text_color[1]);
                    icon_ele.children().find("i").removeClass(option.text_color[1]);
                }
            }
        });
    };
}(jQuery));