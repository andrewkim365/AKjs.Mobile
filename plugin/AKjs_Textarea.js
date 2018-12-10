/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Textarea----------------------------------------*/
(function($){
    $.fn.AKjs_Textarea = function(setting) {
        var opm = $.extend({
                maxlength: 300,
                rows: 6,
                onTextVal: function() {}
            },
            setting);
        var txt =$(this);
        if (txt.length > 0) {
            txt.each(function(){
                $(this).after('<span class="dis_block_im ovh abs center text_al_r text_12px">' +
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
                    var textareaVal = ($(this).val().replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/\n/gi,"|");
                    var entLen = textareaVal.split('|').length-1;
                    var strLen = textareaVal.split('|').join('').length;
                    $(this).attr('maxlength',opm.maxlength+(entLen*2));
                    len = strLen;
                    if( len >= opm.maxlength ){
                        len = opm.maxlength;
                    }
                    $(this).next("span").children("var").eq(0).html(len);
                    var data = $(this).val();

                    if (strLen > 0) {
                        opm.onTextVal(data);
                    }
                }
            });
        }
    };
}(jQuery));