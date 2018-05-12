/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_CountDown---------------------------------------*/
function Andrew_CountDown(ele,setting){
    var option = $.extend({
            wait: 10,
            Start_text: "",
            End_Text: "",
            callback:function(){
            }
        },
        setting);
    var waits = option.wait;
    if (waits == 0) {
        ele.removeAttr("disabled");
        ele.html(option.End_Text);
        waits = option.wait;
        option.callback(waits);
    }
    else {
        ele.attr("disabled", "disabled");
        ele.html(waits + option.Start_text);
        waits--;
        setTimeout(function() {
                Andrew_CountDown(ele,{
                    wait: waits,
                    Start_text: option.Start_text,
                    End_Text: option.End_Text,
                    callback:function(waits){
                        option.callback(waits);
                    }
                })
            },
            1000)
    }
}