/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_DropUpDown--------------------------------------*/
(function($){
    $.fn.AKjs_DropUpDown = function(setting) {
        var option = $.extend({
                curDisplay: "",
                active_toggle: "",
                up_ico: "",
                down_ico: "",
                callback:function(){}
            },
            setting);
        function DropDown(el) {
            this.DropUpDown = el;
            this.initEvents();
        }
        DropDown.prototype = {
            initEvents: function() {
                var obj = this;
                var drop = obj.DropUpDown.children("dl").children("dd:last-child");
                if (option.curDisplay) {
                    var ele_display = obj.DropUpDown.eq(option.curDisplay-1);
                    ele_display.addClass("ak-is_active");
                    ele_display.children("dl").addClass(option.active_toggle);
                    ele_display.children("dl").find("dd").last().children("i").removeClass(option.down_ico).addClass(option.up_ico);
                }
                drop.each(function () {
                    var alldrop = $(this).parent("dl").parent("li");
                    var alldropsub = alldrop.children("dl").next();
                    if (alldrop.hasClass("ak-is_active")) {
                        alldropsub.show();
                    } else {
                        alldropsub.hide();
                    }
                    alldropsub.find("li").addClass("ml_3");
                    alldrop.children("dl").find("dd").last().unbind("click");
                    alldrop.children("dl").find("dd").last().click(function () {
                        alldrop.toggleClass("ak-is_active");
                        if (alldrop.children("dl").next().length > 0) {
                            alldrop.children("dl").toggleClass(option.active_toggle);
                        }
                        alldrop.children("dl").find("dd").last().children("i").toggleClass(option.up_ico + " " + option.down_ico);
                        if (alldrop.hasClass("ak-is_active")) {
                            alldropsub.slideDown(300);
                            option.callback(alldropsub);
                        } else {
                            alldropsub.slideUp(300);
                        }
                    });
                });
            }
        };
        var drop = new DropDown($(this).children("li"));
    };
}(jQuery));