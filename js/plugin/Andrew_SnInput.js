/*-----------------------------------------------Andrew_SnInput-------------------------------------------*/
(function($){
    $.fn.Andrew_SnInput = function(setting) {
        var option = $.extend({
                default_active: false,
                input_length: 1,
                callback:function(){
                }
            },
            setting);
        var ele = $(this).find("input");
        $(this).css({
            "display": "block",
            "overflow": "hidden",
            "position": "relative"
        });
        ele.each(function() {
            ele.css({
                "display": "block",
                "overflow": "hidden",
                "position": "relative",
                "float": "left",
                "text-align": "center"
            });
            if (option.default_active == true) {
                ele.first().focus();
            }
            ele.attr("maxlength",option.input_length);
            ele.focus(function() {
                $(this).addClass("bor_title bg_white");
            });
            ele.blur(function() {
                $(this).removeClass("bor_title bg_white");
            });
            $(this).keyup(function(e) {
                e = window.event || e;
                var k = e.keyCode || e.which;
                if (k == 8) { //8是空格键
                    if ($(this).val().length < 1) {
                        $(this).prev().focus();
                        $(this).prev().focus(function() {
                            var obj = e.srcElement ? e.srcElement: e.target;
                            if (obj.createTextRange) { //IE浏览器
                                var range = obj.createTextRange();
                                range.moveStart("character", option.input_length);
                                range.collapse(true);
                                range.select();
                            }
                        });
                    }
                } else {
                    if ($(this).val().length > parseInt(option.input_length)-1) {
                        $(this).next().focus();
                    }
                }
                this.value=this.value.replace(/[^a-z0-9]/i,''); //只允许输入字母和数字
                this.value=this.value.toUpperCase(); //英文字母转换为大写
            })
        });
        ele.bind('keyup',function() {
            var f = true;
            var str = "";
            if (ele.val() >= 1) {
                $(this).addClass("c_black");
            } else {
                $(this).addClass("c_black");
            }
            for(var i = 0;i < ele.length; i++){
                if(""==ele.eq(i).val()){
                    f = false;
                }
            }
            if(f){
                for(var i = 0;i < ele.length; i++){
                    str += ele.eq(i).val();
                }
                if(str.length==(parseInt(option.input_length)*ele.length)){
                    option.callback(str)
                }
            }else{
                option.callback("");
            }
        });
    };
}(jQuery));