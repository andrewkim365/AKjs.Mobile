/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Progress-------------------------------------------*/
(function($){
    $.fn.extend({
        AKjs_Progress: function(options) {
            var defaults = {
                goalAmount: 100,
                currentAmount: 50,
                speed: 1000,
                ColorStyle: "",
                textBefore: '',
                textAfter: '',
                milestoneNumber: 70,
                milestoneClass: '',
                callback: function() {}
            };
            var options = $.extend(defaults, options);
            return this.each(function(){
                var obj = $(this);
                var goalAmountParsed = parseInt(defaults.goalAmount);
                if (obj.attr("data-to")) {
                    var currentAmountParsed = parseInt(obj.attr("data-to"));
                } else {
                    var currentAmountParsed = parseInt(defaults.currentAmount);
                }

                var percentage = (currentAmountParsed / goalAmountParsed) * 100;
                var milestoneNumberClass = (percentage > defaults.milestoneNumber) ? ' ' + defaults.milestoneClass : ''
                if (defaults.textAfter) {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + '<em>'+currentAmountParsed+'</em>' + defaults.textAfter + '</span></li>';
                } else {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + '</span></li>';
                }
                var progressBarWrapped = '<ol class="bg_in h_in dis_block_im ovh">' + progressBar + '</ol>';
                obj.html(progressBarWrapped);
                var rendered = obj.children("ol").children("li");
                rendered.each(function() {
                    obj.find(".ak-progressBar").addClass(defaults.ColorStyle);
                    $(this).html($(this).html().replace(/\s/g, ' '));
                    setTimeout(function() {
                        rendered.find('span').show().css({
                            "line-height": rendered.height()+2+"px"
                        });
                        obj.css("margin-top", (obj.parent().height() - obj.height()) / 2);
                    }, 100);
                    $(window).resize(function(){
                        rendered.find('span').show().css({
                            "line-height": rendered.height()+2+"px"
                        });
                        obj.css("margin-top", (obj.parent().height() - obj.height()) / 2);
                    });
                });
                rendered.animate({
                    width: percentage +'%'
                },{
                    duration:defaults.speed,
                    step:function(now,fx){
                        /*console.log("返回的CSS属性是："+fx.prop);
                        console.log("属性初始值："+fx.start);
                        console.log("属性结束值："+fx.end);
                        console.log("属性当前值："+fx.now);*/
                        if (obj.attr("data-from")) {
                            fx.start = parseInt(obj.attr("data-from"));
                        } else {
                            fx.start = 0;
                        }
                        rendered.find("em").text(parseInt(fx.now));
                    }
                });
                /*if (rendered.length > 1) {
                    setTimeout(function() {
                        rendered.find("em").text(percentage);
                    }, defaults.speed+500);
                }*/
                setTimeout(function() {
                    $(rendered).parent().addClass(milestoneNumberClass);
                }, defaults.speed);
                defaults.callback.call($(this));
            });
        }
    });
}(jQuery));