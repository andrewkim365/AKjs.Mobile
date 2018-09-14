/*
Modification Date: 2018-09-14
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_AllChecked--------------------------------------*/
(function($){
    $.fn.AKjs_AllChecked = function(settings){
        var ele = $(this);
        var allCheck = ele.children().eq(0).children("dl").find(':checkbox');
        var checks = ele.children().eq(0).children("dl").next().children().children("dl").find(':checkbox');
        var defaults = {
            toggleClass:"",
            callback :function(){}
        };
        var option = $.extend(defaults,settings);

        /*所有checkbox初始化*/
        allCheck.prop("checked",false);
        allCheck.parent("label").removeClass(option.toggleClass);
        /*全选/反选*/
        allCheck.unbind("click");
        allCheck.click(function(){
            var set = $(this).parents("dl").next().find(':checkbox');
            if($(this).prop("checked")){
                $.each(set,function(i,v){
                    $(v).prop("checked",true);
                    $(v).parent("label").addClass(option.toggleClass);
                    option.callback($(v));
                });
                allCheck.prop('checked',true);
                allCheck.parent("label").addClass(option.toggleClass);
            }else{
                $.each(set,function(i,v){
                    $(v).prop("checked",false);
                    $(v).parent("label").removeClass(option.toggleClass);
                    option.callback($(v));
                });
                allCheck.prop("checked",false);
                allCheck.parent("label").removeClass(option.toggleClass);
            }
        });

        /* 监听全选事件 */
        checks.unbind("click");
        checks.click(function(){
            var leng = $(this).parents("dl").parent().parent().find(':checkbox:checked').length;
            /*勾选后该行active*/
            if($(this).prop('checked')){
                $(this).parent("label").addClass(option.toggleClass);
            }else{
                $(this).parent("label").removeClass(option.toggleClass);
            }
            if(leng == checks.length){
                allCheck.prop('checked',true);
                allCheck.parent("label").addClass(option.toggleClass);
            }else{
                allCheck.prop("checked",false);
                allCheck.parent("label").removeClass(option.toggleClass);

            }
            option.callback(checks);
        });
    }
}(jQuery));