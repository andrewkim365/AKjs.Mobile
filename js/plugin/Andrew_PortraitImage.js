/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_PortraitImage--------------------------------------*/
(function($){
    var option = {};
    $.fn.Andrew_PortraitImage = function(setting) {
        var op = $.extend({
                errorTip: "",
                btn_ok: "",
                box_title: "",
                addCallbak: function() {}
            },
            setting);
        option = op;
        var pimg = $(this);
        setTimeout(function() {
            pimg.each(function(){
                $(this).addClass("ak-PortraitImage");
                $(this).find("input[type=file]").attr("accept","image/*");
                $(this).bind('change',
                    function() {
                        ak_PortraitFilePrvid($(this).children('input')[0],op);
                    });
                $(this).children("figure").css({
                    "margin-top": (pimg.outerWidth() / 3 / 2)
                });
            });
        }, 100);

        $(window).resize(function(){
            pimg.children("figure").css({
                "margin-top": (pimg.outerWidth() / 3 / 2)
            });
        });
    };
    function ak_PortraitFilePrvid(file,op) {
        var tip = op.errorTip; // 设定提示信息
        var filters = {
            "jpeg": "/9j/4",
            "gif": "R0lGOD",
            "png": "iVBORw"
        };
        if (window.FileReader) { // html5方案
            for (var i = 0,
                     f; f = file.files[i]; i++) {
                var fr = new FileReader();
                fr.onload = function(e) {
                    var src = e.target.result;
                    if (!ak_PortraitValidateImg(src)) {
                        $ak.alert(tip, {
                            icon: "error",
                            button_ok: op.btn_ok,
                            title: op.box_title
                        });
                    } else {
                        ak_PortraitShowImg(src, file);
                    }
                };
                fr.readAsDataURL(f);
            }
        } else { // 降级处理
            if (!/\.jpg$|\.png$|\.gif$/i.test(file.value)) {
                $ak.alert(tip, {
                    icon: "error",
                    button_ok: op.btn_ok,
                    title: op.box_title
                });
            } else {
                ak_PortraitShowImg(file.value, file);
            }
        }
        function ak_PortraitValidateImg(data) {
            var pos = data.indexOf(",") + 1;
            for (var e in filters) {
                if (data.indexOf(filters[e]) === pos) {
                    return e;
                }
            }
            return null;
        }
        function ak_PortraitShowImg(src, id) {
            //上传图片后替换原先的图
            var figure = "<img src=" + src + ">";
            $(id).next().remove("i");
            $(id).next().html(figure);
            $(id).unbind("click");
            $(id).click(function() {
                $(id).parent().children("img").attr("src", src);
            });
            option.addCallbak($(id).next().find("img"));
        }
    }
}(jQuery));