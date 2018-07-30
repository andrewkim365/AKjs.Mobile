/*
Modification Date: 2018-07-30
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_ButtonSubmit--------------------------------------------*/
(function($){
    $.fn.Andrew_ButtonSubmit = function(msg,setting) {
        var option = $.extend({
            click: false,
            icon: ["1.2em","#ffffff"],
            callback: function() {}
        },
        setting);
        var btn = $(this);
        if (btn.prop("localName") == "button") {
            Andrew_UserAgent();
            if (IsMobile) {
                var delegate = "touchstart";
            } else {
                var delegate = "click";
            }
            btn.attr("data-text",btn.text());
            if (option.click) {
                btn.bind(delegate, function (andrew) {
                    andrew.preventDefault();
                    var _this = $(this);
                    if (msg) {
                        _this.html(msg);
                    }
                    option.callback(_this, ak_disabled);
                    function ak_disabled(state) {
                        if (state) {
                            _this.addClass("disabled").attr("disabled", "disabled").html("<i class=\"ak-submit-loading\"></i>" + msg);
                            _this.find(".ak-submit-loading").css({
                                'width': option.icon[0],
                                'height': option.icon[0],
                            }).wrap("<em style='border-color: " + option.icon[1] + "; vertical-align: text-top;' />");
                        } else {
                            _this.removeClass("disabled").removeAttr("disabled").html(_this.attr("data-text"));
                        }
                    }
                    return false;
                });
            } else {
                btn.each(function(){
                    var _this = $(this);
                    option.callback(_this, ak_disabled);
                    function ak_disabled(state) {
                        if (state) {
                            _this.addClass("disabled").attr("disabled", "disabled").html("<i class=\"ak-submit-loading\"></i>" + msg);
                            _this.find(".ak-submit-loading").css({
                                'width': option.icon[0],
                                'height': option.icon[0],
                            }).wrap("<em style='border-color: " + option.icon[1] + "' />");
                        } else {
                            _this.removeClass("disabled").removeAttr("disabled").html(_this.attr("data-text"));
                        }
                    }
                });
            }
        }
    };
}(jQuery));
