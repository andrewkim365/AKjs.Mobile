/*
Modification Date: 2018-09-14
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_TimeAxis------------------------------------*/
(function($){
    $.fn.AKjs_TimeAxis = function(setting) {
        var option = $.extend({
                firstbox: "",
                boxsize: "",
                textstyle: "",
                data:[],
                callback:function(){
                }
            },
            setting);
        function TimeAxis(el) {
            this.el = el;
            this.initEvents();
        }
        TimeAxis.prototype = {
            initEvents : function() {
                var obj = this;
                obj.el.each(function() {
                    $(this).addClass("ak-TimeAxis");
                    $(this).html("<cite><strong></strong></cite><ul></ul>");
                    var datalist = $(this).children("ul");
                    /*Json获取数据信息*/
                    var tmp = "";
                    for(var i = 0; i < option.data.length; i++){
                        tmp += '<li>';
                        tmp += '    <section>';
                        tmp += '        <h6>'+option.data[i].time+'</h6>';
                        tmp += '    </section>';
                        tmp += '    <locator>';
                        tmp += '        <span></span>';
                        tmp += '    </locator>';
                        tmp += '    <article>';
                        tmp += '        <p>'+option.data[i].value+'</p>';
                        tmp += '    </article>';
                        tmp += '</li>';
                    }
                    datalist.html(tmp);
                    datalist.children("li").eq(0).children("section").addClass(option.firstbox);
                    datalist.find("section h6").addClass(option.textstyle);
                    $(this).children("cite").css({
                        "width": option.boxsize
                    });
                    datalist.find("section").css({
                        "width": option.boxsize,
                        "height": option.boxsize,
                        "line-height": option.boxsize,
                        "left": "-"+option.boxsize
                    });
                    datalist.find("locator").css({
                        "left": "-"+option.boxsize
                    });
                    datalist.find("article").css({
                        "margin-left": "-"+option.boxsize
                    });
                    option.callback($(this));
                });
            }
        };
        var el = new TimeAxis($(this));
    };
}(jQuery));
