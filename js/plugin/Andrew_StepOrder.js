/*-----------------------------------------------Andrew_StepOrder---------------------------------------*/
(function($){
    $.fn.Andrew_StepOrder = function(setting) {
        var option = $.extend({
                stepNum: "",
                stepClass:  new Array(),
                dashed_line: "bor_white bor_bottom_dashed2",
                progress: "bor_white bor_bottom2",
                callback: function() {}
            },
            setting);
        var step = $(this);
        step.addClass("rel ovh");
        step.children().addClass("rel ovh");
        step.children().before("<cite /><cite />");
        step.children("cite").eq(0).addClass("dis_block rel w_100 "+option.dashed_line);
        step.children("cite").eq(1).addClass("dis_block rel "+option.progress);
        var step_li = step.children().children("li");
        var num_box = step.children().children("li").eq(0).children().eq(0);
        var step_line_h = step.children("cite").eq(0).outerHeight();
        step_li.each(function(){
            step.fadeIn();
            var num_boxs = $(this).children().eq(0);
            $(this).addClass("fl text_al_c");
            if($(this).index() <= option.stepNum-1){
                $(this).addClass("ak-is_active");
            }
            if ($(this).hasClass("ak-is_active")) {
                $(this).children().eq(0).addClass(option.stepClass[0]);
                $(this).children().eq(1).addClass(option.stepClass[1]);
            } else {
                num_boxs.removeClass(option.stepClass[0]);
                num_boxs.next().removeClass(option.stepClass[1]);
            }
            num_boxs.addClass("dis_block center text_al_c");
            step.children("cite").eq(0).css({
                "top": num_box.outerHeight()/2+step_line_h
            });
            step.children("cite").eq(1).css({
                "top": num_box.outerHeight()/2-step_line_h-2,
                "width": 0
            }).animate({
                "width": step.find(".ak-is_active").last().children().eq(0).offset().left
            });
            $(window).resize(function(){
                step.children("cite").eq(0).css({
                    "top": num_box.outerHeight()/2+step_line_h
                });
                step.children("cite").eq(1).css({
                    "top": num_box.outerHeight()/2-step_line_h+step_line_h,
                    "width": 0
                }).animate({
                    "width": step.find(".ak-is_active").last().children().eq(0).offset().left
                });
            });
        });
        option.callback(step);
    };
}(jQuery));