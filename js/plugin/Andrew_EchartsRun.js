/*
Modification Date: 2018-08-06
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_EchartsRun--------------------------------------*/
(function($){
    $.fn.Andrew_EchartsRun = function(setting) {
        var opt = $.extend({
                width: 0,
                height: 0,
                option:{},
                callback:function(){}
            },
            setting);
        function Echarts(el) {
            var _this = this;
            _this.elem = el;
            _this.initEvents();
        }
        Echarts.prototype = {
            initEvents: function() {
                var obj = this;
                $(this.elem).css({
                    "width": opt.width,
                    "height": opt.height
                });
                var myChart = echarts.init(obj.elem.get(0));
                var option = opt.option;
                opt.callback(myChart,option);
            }
        };
        new Echarts($(this));
    };
}(jQuery));