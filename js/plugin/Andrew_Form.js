/*-----------------------------------------------Andrew_Form--------------------------------------------*/
(function($){
    $.fn.Andrew_Form = function(setting) {
        var option = $.extend({
                btn_delete: "",
                btn_delete_ico: "",
                btn_password: "",
                btn_password_ico_hide: "",
                btn_password_ico_show: "",
                placeholder: true,
                keyboard: true,
                PassCheck: "",
                passCallback: function() {},
                butCallback: function() {}
            },
            setting);
        var mbf = $(this);

        //对比两次输入的密码
        var password = mbf.find(option.PassCheck);
        mbf.find(":submit").addClass("mb_5");
        mbf.find(":submit").unbind("click");
        mbf.keyup(function (event) {
            event.preventDefault();
            var keycode = event.which;
            if (keycode == 13) {
                mbf.find(":submit").click();
            }
        });
        mbf.find(":submit").click(function () {
            if (option.PassCheck) {
                if(password.length > 1){
                    if (password[0].value != password[1].value){
                        if ($(this).parents("form").find(option.PassCheck).length > 0) {
                            option.passCallback();
                            return false;
                        }
                    }
                }
            }
            option.butCallback($(this).parents("form"));
        });
        //密码（显示/隐藏）
        var btn_password = mbf.find(option.btn_password);
        btn_password.each(function(){
            var pass_btn = $(this);
            if ($(this).next("button").length < 1) {
                $(this).after("<button type=\"button\" class=\"press top_0 right_0 abs text_al_r text_18em c_gray_ccc\"></button>");
                $(this).next("button").addClass(option.btn_password_ico_hide);
                $(this).next("button").css({
                    "height": pass_btn.outerHeight(),
                    "margin-left": pass_btn.width() - pass_btn.next("button").width()
                });
                $(window).resize(function(){
                    pass_btn.next("button").css({
                        "height": pass_btn.outerHeight(),
                        "margin-left": pass_btn.width() - pass_btn.next("button").width()
                    });
                });
            }
            $(this).next("button").unbind("click");
            $(this).next("button").click(function() {
                $(this).toggleClass(option.btn_password_ico_hide+" "+option.btn_password_ico_show);
                if ($(this).hasClass(option.btn_password_ico_show)) {
                    $(this).prev("input").attr("type","text");
                } else {
                    $(this).prev("input").attr("type","password");
                }
            });

        });
        //输入的文字删除按钮
        var btn_delete = mbf.find(option.btn_delete);
        btn_delete.bind('input propertychange', function() {
            var del_btn = $(this);
            if ($(this).val() > 0 ) {
                if ($(this).next("button[type=reset]").length < 1) {
                    $(this).after("<button type=\"reset\" class='top_0 right_0 abs press'><i class='fr bg_gray_ccc c_white bor_rad_50 wh_18em line_h_18em text_08em text_al_c text_18em'></i></button>");
                    $(this).next("button[type=reset]").css({
                        "height": $(this).prev("input").outerHeight(),
                        "margin-top": ($(this).height() - $(this).next("button[type=reset]").height()) / 2,
                        "margin-left": $(this).width() - $(this).next("button[type=reset]").width()
                    });
                    $(window).resize(function(){
                        del_btn.next("button[type=reset]").css({
                            "height": del_btn.prev("input").outerHeight(),
                            "margin-top": (del_btn.height() - del_btn.next("button[type=reset]").height()) / 2,
                            "margin-left": del_btn.width() - del_btn.next("button[type=reset]").width()
                        });
                    });
                    $(this).next("button[type=reset]").children("i").addClass(option.btn_delete_ico);
                }
                $(this).next("button[type=reset]").unbind("click");
                $(this).next("button[type=reset]").click(function() {
                    $(this).prev("input").val("");
                    $(this).remove();
                });
            } else {
                $(this).next("button[type=reset]").remove();
            }
        });

        if(option.placeholder== true) {
            var placeholder_tmp ="";
            mbf.find('*[placeholder]').focus(function() { //input元素加placeholder属性的文字点击后消失
                placeholder_tmp = $(this).attr("placeholder");
                if ($(this)[0].type !="search") {
                    $(this).removeAttr('placeholder');
                }
                $(this).blur(function() {
                    $(this).attr("placeholder",placeholder_tmp);
                });
            });
            $("input[type=button]").each(function(){//解决input的button不支持placeholder属性
                var place = $(this);
                if ($(this).attr("placeholder") && $(this).val()=='') {
                    $(this).parent().append("<label class='top_0  abs c_gray_ccc'></label>");
                    $(this).next("label").html($(this).attr('placeholder'));
                    $(this).next("label").css({
                        "width":$(this).outerWidth(),
                        "min-width": "100%",
                        "height": $(this).outerHeight(),
                        "line-height": $(this).outerHeight()+"px"
                    });
                    $(window).resize(function(){
                        place.next("label").css({
                            "width":place.outerWidth(),
                            "min-width": "100%",
                            "height": place.outerHeight(),
                            "line-height": place.outerHeight()+"px"
                        });
                    });
                    $(this).next("label").unbind("click");
                    $(this).next("label").click(function(){
                        $(this).prev("input[type=button]").click();
                    });
                }
            });
        }
        if(option.keyboard== true) {
            mbf.find("*[readonly]").focus(function(){ //input元素加readonly属性不显示键盘
                document.activeElement.blur();//隐藏键盘
            });
            mbf.find("*[maxlength]").each(function(){ //input元素加maxlength属性后控制自定义字数
                $(this).attr("oninput",'if(value.length>'+$(this).attr("maxlength")+')value=value.slice(0,'+$(this).attr("maxlength")+')');
                $(this).on('input',function(){
                    var maxlength = $(this).val();
                    if(maxlength.length == $(this).attr("maxlength")) { //输入自定的限制字数后手机键盘自动消失
                        document.activeElement.blur();//隐藏键盘
                    }
                });
            });
        }
    };
}(jQuery));
