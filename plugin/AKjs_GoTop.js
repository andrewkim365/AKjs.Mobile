/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_GoTop--------------------------------------*/
function AKjs_GoTop (setting){
    option = $.extend({
        dom: $(window),
        hide: false,
        url: "",
        icon: "",
        state: "bottom",
        height: "40px",
        width: "auto",
        time: 500,
        scrollTop: 400,
        aimation: "show",
        hidetime: 2000,
        toTop :function () {},
        toShow :function () {},
        toHide :function () {},
        toClick :function () {}
    },setting);
    var sate,
        timer=null;
    AKjs_UserAgent();
    $(function() {
        if(option.state=='center'){
            sate='top:50%';
        }
        else if(option.state=='bottom'){
            sate= 'bottom:10%';
        }
        if(!option.icon || option.url) {
            var dom = '<div class="ak-GoTopBox" style="width:' + option.width + ';height:' + option.height + ';display:none;position:fixed;cursor:pointer;right:2em;z-index:999;' + sate + '">' +
                '<img src=' + option.url + ' style="width:100%" />' +
                '</div>';
        } else {
            var dom = '<div class="ak-GoTopBox ' + option.icon + '" style="width:' + option.width + ';height:' + option.height + ';display:none;position:fixed;cursor:pointer;right:2em;z-index:999;' + sate + '">' +
                '</div>';
        }
        $('.ak-GoTopBox').remove();
        $("body").append(dom);
        var GoTopBox = $('.ak-GoTopBox');
        option.dom.on('scroll',throttle(scroll,50));
        function scroll(){
            if(option.dom.scrollTop()>=option.scrollTop){
                GoTopBox.addClass(option.aimation).fadeIn();
                if(option.hide){
                    clearTimeout(timer);
                    if (!IsMobile) {
                        timer = setTimeout(function () {
                            GoTopBox.fadeOut();
                            option.toHide && option.toHide();
                        }, option.hidetime);
                    }
                }
                option.toShow&&option.toShow();
            }else{
                if(GoTopBox.css('display')=='block'){
                    option.toHide&&option.toHide();
                }
                GoTopBox.hide().removeClass(option.aimation);
            }
            if(option.dom.scrollTop()<=5){
                option.toTop&&option.toTop();
                if(option.state=='center'){
                    GoTopBox.animate({
                        top: "50%",
                        width: option.width
                    });
                }
                else if(option.state=='bottom'){
                    GoTopBox.animate({
                        bottom: "10%",
                        width: option.width
                    });
                }
            }
        }
        GoTopBox.on('click',function(){
            option.dom.animate({
                scrollTop:0
            },option.time,function(){
                option.toTop&&option.toTop();
            });
            if(option.state=='center'){
                GoTopBox.animate({
                    top: "100%",
                    width: 0
                });
            }
            else if(option.state=='bottom'){
                GoTopBox.animate({
                    bottom: "100%",
                    width: 0
                });
            }
            option.toClick&&option.toClick();
        });
        option.dom.on('load',function(){
            if(option.dom.scrollTop()==0){
                return;
            }
            scroll();
        });
        GoTopBox.on('mouseenter',function(){
            clearTimeout(timer);
            GoTopBox.fadeIn();
        });
        GoTopBox.on('mouseleave',function(){
            if (!IsMobile) {
                timer = setTimeout(function () {
                    GoTopBox.fadeOut();
                    option.toHide && option.toHide();
                }, option.hidetime);
            }
        });
        function throttle(fn,time){
            var timer=null;
            return function(){
                var ctx=this,arg=arguments;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn.apply(ctx,arg);
                },time);
            }
        }
    });
}