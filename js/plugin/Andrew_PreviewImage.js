/*-----------------------------------------------Andrew_PreviewImage---------------------------------------*/
(function($){
    var option = {};
    $.fn.Andrew_PreviewImage = function(setting) {
        var op = $.extend({
                uploadNum:0,//用于计算图片上传数量
                webToast: "",
                messege: "",
                btn_ok: "",
                btn_cancel: "",
                box_title: new Array(),
                delbtnClass: "",
                box_icon: new Array(),
                Class:"",
                Del_icon:"",
                length_title:"",
                errorTip:"",
                addCallbak: function() {},
                delCallbak: function() {}
            },
            setting);
        option = op;
        var pimg = $(this);
        pimg.addClass("ak-previewImage");
        $(option.delbtnClass).hide();
        pimg.find("input[type=file]").attr("accept","image/*");
        pimg.children("i").addClass(option.box_icon[0]);
        pimg.each(function(){
            $(option.delbtnClass).unbind("click");
            $(option.delbtnClass).click(function(e){
                if ($(option.delbtnClass).hasClass("ak-is_active")) {
                    $(option.delbtnClass).parents("ul").find("li span").hide();
                    $(option.delbtnClass).removeClass("ak-is_active");
                } else {
                    $(option.delbtnClass).parents("ul").find("li span").show();
                    $(option.delbtnClass).addClass("ak-is_active");
                }
            });
        });
        pimg.bind('change', function() {
            if(option.uploadNum == op.length){
                ak_webToast(op.length_title +""+ op.length+"","middle","mask",10000);
                return false;
            }
            var tempData = $(this).children('input')[0];
            if((option.uploadNum + tempData.files.length) > op.length){
                ak_webToast(op.length_title +""+ op.length+"","middle","mask",10000);
            }
            var tempFiles = [];
            for(var i=0;i<(op.length-option.uploadNum);i++){
                tempFiles.push(tempData.files[i])
            }
            file_prvid(tempData, tempFiles, op);
        });
        var figure_wh = $(this).outerWidth();
        var figure_m = $(this).outerWidth() / 3;
        pimg.children("figure").css({
            "width": figure_wh - figure_m,
            "height": figure_wh - figure_m,
            "line-height": figure_wh - figure_m+"px",
            "margin-top": (figure_m / 2)-2
        });
    };
    function file_prvid(file,files,op) {
        var tip = op.errorTip; // 设定提示信息
        var filters = {
            "jpeg": "/9j/4",
            "gif": "R0lGOD",
            "png": "iVBORw"
        };
        if (window.FileReader) { // html5方案
            for (var i = 0,f; f = files[i];i++) {
                //console.log(i);
                var fr = new FileReader();
                fr.onload = function(e) {
                    var src = e.target.result;
                    if (!Andrew_ValidateImg(src)) {
                        $ak.alert(tip, {
                            icon: "error",
                            button_ok: op.btn_ok,
                            button_cancel: op.btn_cancel,
                            title: op.box_title[1]
                        });
                        return false;
                    } else {
                        showPrvImg(src, file);
                        op.uploadNum ++;
                    }
                };
                fr.readAsDataURL(f);
            }
        } else { // 降级处理
            if (!/\.jpg$|\.png$|\.gif$/i.test(file.value)) {
                $ak.alert(tip, {
                    icon: "error",
                    button_ok: op.btn_ok,
                    button_cancel: op.btn_cancel,
                    title: op.box_title[1]
                });
                return false;
            } else {
                showPrvImg(file.value, file);
                op.uploadNum ++;
            }
        }
        function Andrew_ValidateImg(data) {
            var pos = data.indexOf(",") + 1;
            for (var e in filters) {
                if (data.indexOf(filters[e]) === pos) {
                    return e;
                }
            }
            return null;
        }
        function showPrvImg(src, id) {
            //上传图片后继续生成图片
            var imgList = "<li class='rel fl mb_5'>" +
                "<figure class='img_auto "+option.Class+"' style='background-color: #eeeeee !important;'>" +
                "<img src=" + src + " />" +
                "</figure>" +
                "<span class='pointer top_0 abs wh_12em line_h_12em text_14em text_al_c bor_rad_50 c_white "+option.Del_icon+"' style='background-color: rgba(255,0,0,1); z-index: 1'>" +
                "</span>" +
                "</li>";
            $(id).parents("li").before(imgList);
            $(option.delbtnClass).show(); //显示删除按钮
            var showPrvImg_li = $(id).parents("li");

            option.addCallbak(showPrvImg_li.parent());

            var delbtn = showPrvImg_li.parent().find("li").find("span");
            delbtn.hide().css({
                "margin-top": "-" + delbtn.height() / 3 + "px",
                "left": showPrvImg_li.parent().find("figure").width() - (delbtn.width() / 2)
            });

            delbtn.unbind("click");
            delbtn.click(function(){
                var image = $(this);
                $ak.confirm(option.messege, {
                    icon: "question",
                    button_ok: option.btn_ok,
                    button_cancel: option.btn_cancel,
                    title: option.box_title[0], //弹窗标题
                    onSubmit:function(res){
                        option.delCallbak(image.parent("li"));
                        option.uploadNum--;
                        if (option.uploadNum < 1) {
                            $(option.delbtnClass).hide(); //隐藏删除按钮
                        }
                        ak_webToast(option.webToast,"bottom",1000); //(提示文字，显示位置，耗时)
                    }
                });
            });
        }


    }

}(jQuery));
