/*-----------------------------------------------Andrew_NowTime-----------------------------------------*/
(function($){
    $.fn.Andrew_NowTime = function(setting) {
        var option = $.extend({
                dateStyle: 'yyyy-MM-dd hh:mm:ss'
            },
            setting);
        var time = this;
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        setInterval(function(){
            time.html(new Date().Format(option.dateStyle));
        },1000);
    };
}(jQuery));