/*
Modification Date: 2018-08-23
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Form--------------------------------------------*/
(function($){
    $.fn.AKjs_Form = function(setting) {
        var option = $.extend({
                btn_delete: "",
                btn_delete_ico: "",
                btn_password: "",
                btn_password_ico_hide: "",
                btn_password_ico_show: "",
                placeholder: true,
                keyboard: true,
                PassCheck: "",
                validate: true,
                valCallback: function() {},
                passCallback: function() {},
                butCallback: function() {}
            },
            setting);
        var mbf = $(this);
        if (option.validate == true) {
            mbf.find(":submit").addClass("disabled").attr("disabled", "disabled");
        }
        //对比两次输入的密码
        var password = mbf.find(option.PassCheck);
        mbf.find(":submit").addClass("mb_5");
        mbf.find(":submit").unbind("click");

        mbf.find(":submit").click(function () {
            if (option.PassCheck) {
                if(password.length > 1){
                    if (password[0].value != password[1].value){
                        if (mbf.find(option.PassCheck).length > 0) {
                            option.passCallback();
                            return false;
                        }
                    }
                }
            }
            option.butCallback(mbf,false);
            document.activeElement.blur();
            return false;
        });
        mbf.keyup(function (event) {
            event.preventDefault();
            if (option.validate == true) {
                var inputs = $(this).find("input[required]");
                var submits = $(this).find(":submit");
                if (mbf.find("textarea[required]").length > 0) {
                    // 取出回车字符
                    var textareaVal = (mbf.find("textarea[required]").val().replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/\n/gi,"|");
                    // 不包含回车的数量
                    var strLen = textareaVal.split('|').join('').length;
                } else {
                    var strLen =2;
                }
                var arr = [];
                for (var i = 0; i < inputs.length; i++) {
                    var tmpFlag = inputs[i].value == "" ? false : true;
                    arr.push(tmpFlag);
                }
                //console.log(arr);
                var flag = false;
                if (arr.length == 1) {
                    flag = arr[0];
                } else if (arr.length > 1) {
                    flag = arr[0];
                    for (var i = 1; i < arr.length; i++) {
                        flag = flag && arr[i];
                        //console.log("flag:"+flag);
                    }
                } else {
                    flag = true;
                }
                if (!mbf.find(":submit").hasClass("disabled") || strLen > 0) {
                    if (!flag) {
                        submits.addClass("disabled");
                        submits.attr("disabled", "disabled");
                        option.valCallback(flag);
                    } else {
                        //$(this).find(":required").removeAttr("required");
                        submits.removeClass("disabled");
                        submits.removeAttr("disabled");
                        option.valCallback(flag);
                    }
                }
            }
            var keycode = event.which;
            if (keycode == 13) {
                option.butCallback(mbf,true);
            }
        });
        //密码（显示/隐藏）
        var btn_password = mbf.find(option.btn_password);
        btn_password.each(function(){
            var pass_btn = $(this);
            pass_btn.parent().append("<button type=\"button\" class=\"press top_0 right_0 abs text_al_r text_18em c_gray_ccc\"></button>");
            pass_btn.parent().children("button").addClass(option.btn_password_ico_hide);
            pass_btn.parent().children("button").css({
                "height": pass_btn.outerHeight(),
                "margin-left": pass_btn.width() - pass_btn.parent().children("button").width()
            });
            $(window).resize(function(){
                pass_btn.parent().children("button").css({
                    "height": pass_btn.outerHeight(),
                    "margin-left": pass_btn.width() - pass_btn.parent().children("button").width()
                });
            });
            pass_btn.parent().children("button").unbind("click");
            pass_btn.parent().children("button").click(function() {
                $(this).toggleClass(option.btn_password_ico_hide+" "+option.btn_password_ico_show);
                if ($(this).hasClass(option.btn_password_ico_show)) {
                    $(this).parent().children("input").attr("type","text");
                } else {
                    $(this).parent().children("input").attr("type","password");
                }
            });
        });
        //输入的文字删除按钮
        var btn_delete = mbf.find(option.btn_delete);
        btn_delete.bind('input propertychange', function () {
            var del_btn = $(this);
            if ($(this).val() > 0) {
                if ($(this).next("button[type=reset]").length < 1) {
                    $(this).after("<button type=\"reset\" class='press top_0 right_0 abs text_al_r text_18em c_gray_ccc'></button>");
                    $(this).next("button[type=reset]").css({
                        "height": del_btn.outerHeight(),
                        "margin-left": del_btn.width() - del_btn.next("button").width()
                    });
                    $(window).resize(function () {
                        del_btn.next("button[type=reset]").css({
                            "height": del_btn.outerHeight(),
                            "margin-left": del_btn.width() - del_btn.next("button").width()
                        });
                    });
                    $(this).next("button[type=reset]").addClass(option.btn_delete_ico);
                }
                $(this).next("button[type=reset]").unbind("click");
                $(this).next("button[type=reset]").click(function () {
                    if ($(this).prev("input").attr("required")) {
                        flag = false;
                        $(this).prev("input").val("");
                        mbf.find(":submit").addClass("disabled");
                        mbf.find(":submit").attr("disabled", "disabled");
                        option.valCallback(flag);
                    }
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
                    place.next("label").css({
                        "width":place.outerWidth(),
                        "min-width": "100%",
                        "height": place.outerHeight(),
                        "line-height": place.outerHeight()+"px"
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
