/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Validate----------------------------------------*/
(function($){
    $.fn.Andrew_Validate = function(setting) {
        var option = $.extend({
                opacity: "0.7",
                callback: function() {}
            },
            setting);
        var vld = $(this);
        vld.find(":submit").css("opacity", option.opacity).attr("disabled", "disabled");
        vld.keyup(function() {
            var inputs = $(this).find(":required");
            var submits = $(this).find(":submit");
            var arr = [];
            for (var i = 0; i < inputs.length; i++) {
                var tmpFlag = inputs[i].value == "" ? false: true;
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
            if (!flag) {
                submits.css("opacity", option.opacity);
                submits.attr("disabled", "disabled");
                option.callback(flag);
            } else {
                //$(this).find(":required").removeAttr("required");
                submits.css("opacity", "1");
                submits.removeAttr("disabled");
                option.callback(flag);
            }
        });
    };
}(jQuery));