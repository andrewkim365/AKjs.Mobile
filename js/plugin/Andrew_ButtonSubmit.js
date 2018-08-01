/*
Modification Date: 2018-08-01
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
            if (option.click) {
                btn.click(function(){
                    var _this = $(this);
                    if (!_this.attr("data-text")) {
                        _this.attr("data-text",_this.text());
                    }
                    if (!_this.attr("disabled")) {
                        submit_setting(_this);
                    }
                });
            } else {
                btn.each(function(){
                    var _this = $(this);
                    if (!_this.attr("data-text")) {
                        _this.attr("data-text",_this.text());
                    }
                    if (!_this.attr("disabled")) {
                        submit_setting(_this);
                    }
                });
            }
            function submit_setting(_this) {
                if (msg) {
                    _this.html(msg);
                }
                option.callback(_this, ak_disabled);
                function ak_disabled(state) {
                    if (state) {
                        _this.addClass("disabled").attr("disabled", "disabled").html("<em class='ak-submit-loading'><i></i><span>" + msg + "</span></em>");
                        _this.find(".ak-submit-loading").css({
                            'border-color': option.icon[1]
                        });
                        _this.find(".ak-submit-loading i").css({
                            'width': option.icon[0],
                            'height': option.icon[0]
                        });
                    } else {
                        _this.removeClass("disabled").removeAttr("disabled").html(_this.attr("data-text"));
                    }
                }
            }
        }
    };
}(jQuery));
