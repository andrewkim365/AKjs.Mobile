/*
Modification Date: 2018-09-20
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Spinner-------------------------------------------*/
(function($){
    $.fn.AKjs_Spinner=function(setting) {
        var option = $.extend({
                input_width:"100%",
                btn_wrap: "",
                btn_left: "",
                btn_right: "",
                spacing: 1,
                maxNumber: 999,
                changeBack: function() {},
                clickBack:function(){
                }
            },
            setting);
        var spt =$(this);
        $(function() {
            ak_sptFun();
        });
        $(window).resize(function(){
            spt.parent().find("input").css({
                "height": spt.parent().children("button").outerHeight()
            });
            spt.parent().css({
                "height": spt.parent().children("button").height()
            });
            spt.parent().css({
                "margin-top": (spt.parent().parent().outerHeight() - spt.parent().outerHeight())/2
            });
        });
        function ak_sptFun() {
            spt.each(function(i) {
                $(this).wrap('<div class="'+option.btn_wrap+'"></div>');
                $(this).before('<button type="button" class="minus '+option.btn_left+'"></button>');
                $(this).before('<button type="button" class="plus '+option.btn_right+'"></button>');
                $(this).parent().css({
                    "overflow": "hidden",
                    "width": option.input_width,
                    "height": spt.parent().children("button").height(),
                    "margin-top": (spt.parent().outerHeight() - spt.parent().children("button").outerHeight()) / 2-2
                });
                var it =$(this).parent().find("input");
                it.css({
                    "width": "100%",
                    "height": $(this).parent().children("button").outerHeight(),
                    "line-height": "100%",
                    "float": "inherit"
                });
                if (parseInt(it.val())<=1){
                    $(this).parent().children(".minus").attr("disabled",'disabled');
                }
                $(this).keyup(function() {
                    var lengthNum = 1;
                    var it_val=it.val();
                    it.val("").focus().val(it_val);
                    if(it.val()!=''&& it.val()!=null && it.val()!=undefined){
                        lengthNum = parseInt(it.val());
                    }
                    if (lengthNum > 1) {
                        $(this).parent().children(".minus").removeAttr("disabled",'disabled');
                    } else {
                        $(this).parent().children(".minus").attr("disabled",'disabled');
                    }
                    if (lengthNum === 0) {
                        it.val(1);
                    }
                    option.changeBack(lengthNum,$(this));
                });
                $(this).parent().children(".plus").unbind("click");
                $(this).parent().children(".plus").on('click', function (e) {
                    e.preventDefault();
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber-1);
                    } else {
                        var maxNumber = parseInt(999999);
                    }
                    var lengthNum= parseInt(it.val());
                    if (maxNumber > lengthNum) {
                        $(this).parent().children(".minus").removeAttr("disabled",'disabled');
                        it.val(lengthNum+parseInt(option.spacing));
                    } else if (maxNumber == lengthNum) {
                        $(this).attr("disabled", 'disabled');
                        it.val(lengthNum + parseInt(option.spacing));
                    } else if (maxNumber < lengthNum) {
                        it.parent().children(".minus").attr("disabled",'disabled');
                        it.parent().children(".plus").removeAttr("disabled",'disabled');
                        it.val(parseInt(1));
                    } else {
                        $(this).attr("disabled", 'disabled');
                    }
                    option.clickBack(lengthNum + parseInt(option.spacing), $(this).parent().children("input"));
                });
                $(this).parent().children(".minus").unbind("click");
                $(this).parent().children(".minus").on('click', function (e) {
                    e.preventDefault();
                    if (option.maxNumber) {
                        var maxNumber = parseInt(option.maxNumber);
                    } else {
                        var maxNumber = parseInt(999999);
                    }
                    var lengthNum= parseInt(it.val());
                    if (lengthNum < 10) {
                        var spacing = 1;
                    } else {
                        var spacing = lengthNum - parseInt(option.spacing)
                    }
                    if (maxNumber >= lengthNum){
                        $(this).parent().children(".plus").removeAttr("disabled",'disabled');
                        it.val(lengthNum-parseInt(option.spacing));
                    } else if (maxNumber < lengthNum) {
                        it.parent().children(".minus").attr("disabled",'disabled');
                        it.parent().children(".plus").removeAttr("disabled",'disabled');
                        it.val(parseInt(1));
                    } else {
                        $(this).attr("disabled", 'disabled');
                    }
                    if (parseInt(it.val())<=1){
                        it.val(parseInt(1));
                        $(this).attr("disabled",'disabled');
                    }
                    option.clickBack(spacing, $(this).parent().children("input"));
                })
            });
        }
    }
}(jQuery));