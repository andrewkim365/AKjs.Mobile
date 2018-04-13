/*
Modification Date: 2018-04-13
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Progress-------------------------------------------*/
(function($){
    $.fn.extend({
        Andrew_Progress: function(options) {
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
                // Collect and sanitize user input
                var goalAmountParsed = parseInt(defaults.goalAmount);
                var currentAmountParsed = parseInt(defaults.currentAmount);
                // Calculate size of the Andrew_Progress bar
                var percentage = (currentAmountParsed / goalAmountParsed) * 100;
                var milestoneNumberClass = (percentage > defaults.milestoneNumber) ? ' ' + defaults.milestoneClass : ''
                // Generate the HTML
                if (defaults.textAfter) {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + '<em>'+currentAmountParsed+'</em>' + defaults.textAfter + '</span></li>';
                } else {
                    var progressBar = '<li class="ak-progressBar"><span>' + defaults.textBefore + '</span></li>';
                }
                var progressBarWrapped = '<ol class="bg_in h_in dis_block_im ovh ' + milestoneNumberClass + '">' + progressBar + '</ol>';
                // Append to the target
                obj.append(progressBarWrapped);
                // Ready
                var rendered = obj.children("ol").children("li")
                // Remove Spaces
                rendered.each(function() {
                    obj.find(".ak-progressBar").addClass(defaults.ColorStyle);
                    $(this).html($(this).html().replace(/\s/g, ' '));
                    rendered.find('span').css({
                        "line-height": rendered.height()+"px"
                    });
                    obj.css("margin-top", (obj.parent().height() - obj.height()) / 2);
                    $(window).resize(function(){
                        rendered.find('span').css({
                            "line-height": rendered.height()+"px"
                        });
                        obj.css("margin-top", (obj.parent().height() - obj.height()) / 2);
                    });
                });
                // Animate!
                rendered.animate({width: percentage +'%'}, defaults.speed, defaults.callback);
                if(typeof callback == 'function') {
                    callback.call(this)
                }
            });
        }
    });
}(jQuery));