/*
Modification Date: 2018-09-20
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_PreviewImage---------------------------------------*/
(function($) {
    var option = {};
    $.fn.AKjs_PreviewImage = function(setting) {
        var op = $.extend({
                uploadNum: 0,
                webToast: "",
                messege: "",
                btn_ok: "",
                btn_cancel: "",
                box_title: new Array(),
                delbtnClass: "",
                box_icon: new Array(),
                Class: "",
                Del_icon: "",
                length: 4,
                length_title: "",
                size: 5,
                size_title: "",
                errorTip: "",
                addCallbak: function() {},
                delCallbak: function() {}
            },
            setting);
        option = op;
        var pimg = $(this);
        if (sessionStorage.getItem("AKjs_WebToast_js") === null || sessionStorage.getItem("AKjs_WebToast_js").trim() == "") {
            AKjs_Plugin("AKjs_WebToast", "css");
        }
        if (sessionStorage.getItem("AKjs_Dialog_js") === null || sessionStorage.getItem("AKjs_Dialog_js").trim() == "") {
            AKjs_Plugin("AKjs_Dialog", "css");
        }
        pimg.addClass("ak-previewImage");
        $(option.delbtnClass).hide();
        pimg.find("input[type=file]").attr("accept", "image/*");
        pimg.children("i").addClass(option.box_icon[0]);
        pimg.each(function() {
            $(option.delbtnClass).unbind("click");
            $(option.delbtnClass).click(function(e) {
                if ($(option.delbtnClass).hasClass("ak-is_active")) {
                    $(option.delbtnClass).parents("ul").find("li span").hide();
                    $(option.delbtnClass).removeClass("ak-is_active")
                } else {
                    $(option.delbtnClass).parents("ul").find("li span").show();
                    $(option.delbtnClass).addClass("ak-is_active")
                }
            })
        });
        pimg.bind("change",
            function() {
                if (option.uploadNum == op.length) {
                    AKjs_WebToast(op.length_title + "" + op.length + "", "middle", "mask", 3000);
                    return false
                }
                var tempData = $(this).children("input")[0];
                if ((option.uploadNum + tempData.files.length) > op.length) {
                    AKjs_WebToast(op.length_title + "" + op.length + "", "middle", "mask", 3000)
                }
                var tempFiles = [];
                for (var i = 0; i < (op.length - option.uploadNum); i++) {
                    if (tempData.files[i] != null && tempData.files[i] != undefined) {
                        if (tempData.files[i].size > op.size * 1024 * 1024) {
                            AKjs_WebToast(op.size_title + op.size + "MB", "middle", "mask", 3000);
                            return false
                        }
                    }
                    tempFiles.push(tempData.files[i])
                }
                file_prvid(tempData, tempFiles, op)
            });
        var figure_wh = $(this).outerWidth();
        var figure_m = $(this).outerWidth() / 3;
        pimg.children("figure").css({
            "width": figure_wh - figure_m,
            "height": figure_wh - figure_m,
            "line-height": figure_wh - figure_m + "px",
            "margin-top": (figure_m / 2) - 2
        })
    };
    function file_prvid(file, files, op) {
        var tip = op.errorTip;
        var filters = {
            "jpeg": "/9j/4",
            "gif": "R0lGOD",
            "png": "iVBORw"
        };
        if (window.FileReader) {
            for (var i = 0,
                     f; f = files[i]; i++) {
                var fr = new FileReader();
                fr.onload = function(e) {
                    var src = e.target.result;
                    if (!ak_ValidateImg(src)) {
                        $ak.alert(tip, {
                            icon: "error",
                            button_ok: op.btn_ok,
                            button_cancel: op.btn_cancel,
                            title: op.box_title[1]
                        });
                        return false
                    } else {
                        showPrvImg(src, file);
                        op.uploadNum++
                    }
                };
                fr.readAsDataURL(f)
            }
        } else {
            if (!/\.jpg$|\.png$|\.gif$/i.test(file.value)) {
                $ak.alert(tip, {
                    icon: "error",
                    button_ok: op.btn_ok,
                    button_cancel: op.btn_cancel,
                    title: op.box_title[1]
                });
                return false
            } else {
                showPrvImg(file.value, file);
                op.uploadNum++
            }
        }
        function ak_ValidateImg(data) {
            var pos = data.indexOf(",") + 1;
            for (var e in filters) {
                if (data.indexOf(filters[e]) === pos) {
                    return e
                }
            }
            return null
        }
        function showPrvImg(src, id) {
            var imgList = "<li class='rel fl mb_5'>" + "<figure class='img_auto " + option.Class + "' style='background-color: #eeeeee !important;'>" + "<img src=" + src + " />" + "</figure>" + "<span class='pointer top_0 abs wh_12em line_h_12em text_14em text_al_c bor_rad_50 c_white " + option.Del_icon + "' style='background-color: rgba(255,0,0,1); z-index: 1'>" + "</span>" + "</li>";
            $(id).parents("li").before(imgList);
            $(option.delbtnClass).show();
            var showPrvImg_li = $(id).parents("li");
            option.addCallbak(showPrvImg_li.parent());
            var delbtn = showPrvImg_li.parent().find("li").find("span");
            delbtn.hide().css({
                "margin-top": "-" + delbtn.height() / 3 + "px",
                "left": showPrvImg_li.parent().find("figure").width() - (delbtn.width() / 2)
            });
            delbtn.unbind("click");
            delbtn.click(function() {
                var image = $(this);
                $ak.confirm(option.messege, {
                    icon: "question",
                    button_ok: option.btn_ok,
                    button_cancel: option.btn_cancel,
                    title: option.box_title[0],
                    onSubmit: function(res) {
                        option.delCallbak(image.parent("li"));
                        option.uploadNum--;
                        if (option.uploadNum < 1) {
                            $(option.delbtnClass).hide();
                        }
                        AKjs_WebToast(option.webToast, "bottom", 1000)
                    }
                })
            })
        }
    }
} (jQuery));
