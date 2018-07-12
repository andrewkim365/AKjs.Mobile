/*
Modification Date: 2018-07-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Textarea----------------------------------------*/
(function($){
    $.fn.Andrew_Textarea = function(setting) {
        var opm = $.extend({
                maxlength: 300,
                rows: 6,
                topButton: "",
                onTextVal: function() {},
                TopbtnOK: function() {}
            },
            setting);
        var txt =$(this);
        if (txt.length > 0) {
            txt.each(function(){ //input元素加maxlength属性后控制自定义字数
                $(this).after('<span class="dis_block_im ovh abs center text_al_r text_08em">' +
                    '<var class="text_08em" style="color: #f16a6a;">0</var>' +
                    '/' +
                    '<var class="text_08em mr_03em">'+opm.maxlength+'</var>' +
                    '</span>');
                $(this).next("span").css({
                    "width": $(this).width(),
                    "left": ($(window).width() - $(this).width()) /2
                });
                $(this).attr("rows",opm.rows).attr("maxlength",opm.maxlength);
                $(this).parent().css({
                    "padding-bottom": $(this).next("span").height() * 1.2+"px"
                })
            });
            var len = 0;
            txt.on("input propertychange",function(e){
                if( len >= opm.maxlength && e.keyCode == 8 ){
                    return;
                }else{
                    // 取出回车字符
                    var textareaVal = ($(this).val().replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/\n/gi,"|");
                    // 回车数量
                    var entLen = textareaVal.split('|').length-1;
                    // 不包含回车的数量
                    var strLen = textareaVal.split('|').join('').length;
                    $(this).attr('maxlength',opm.maxlength+(entLen*2));
                    len = strLen;
                    if( len >= opm.maxlength ){
                        len = opm.maxlength;
                    }
                    $(this).next("span").children("var").eq(0).html(len);
                    var data = $(this).val();
                    opm.onTextVal(data);

                    if (opm.topButton !="") {
                        if(len>0 && len<=opm.maxlength){
                            if ($("header").length === 0 && !$("header").hasClass("dis_none_im")) {
                                $(this).parents("form").find(":submit").addClass("dis_none_im");
                            }
                            if ($("header").children("button.ak-txtbutton").length == 0) {
                                var btn_text = txt.parents("form").find(":submit").text();
                                $("header").append('<button type="button" class="ak-txtbutton press text_12em pr_3 text_al_r">'+btn_text+'</button>');
                                $("header").children("button.ak-txtbutton").addClass(opm.topButton);
                                $("header").children("button.ak-txtbutton").css({
                                    "position": "absolute",
                                    "right": "0",
                                    "z-index": "2"
                                });
                            }
                            $("button.ak-txtbutton").prev("button").addClass("dis_none_im");
                            $("header").children("button.ak-txtbutton").unbind("click");
                            $("header").children("button.ak-txtbutton").on("click",function(e) {
                                e.stopPropagation();
                                $("header").children("button.ak-txtbutton").show();
                                opm.TopbtnOK(data);
                            });
                        } else {
                            $("button.ak-txtbutton").prev("button").removeClass("dis_none_im");
                            $(this).parents("form").find(":submit").removeClass("dis_none_im");
                            $("header").children("button.ak-txtbutton").remove();
                        }
                    }
                }
            });
        }
    };
}(jQuery));