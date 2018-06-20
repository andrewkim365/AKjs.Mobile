/*
Modification Date: 2018-06-20
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_DropLoad------------------------------------------*/
(function($){
    var _absMoveY = 0;
    var win = window;
    var doc = document;
    var $win = $(win);
    var $doc = $(doc);
    $.fn.Andrew_DropLoad = function(options){
        return new ak_DropLoad(this, options);
    };
    var ak_DropLoad = function(element, options){
        var me = this;
        me.$element = element;
        // 上方是否插入DOM
        me.upInsertDOM = false;
        // loading状态
        me.loading = false;
        // 是否锁定
        me.isLockUp = false;
        me.isLockDown = false;
        // 是否有数据
        me.isData = true;
        me._scrollTop = 0;
        me._threshold = 0;
        me.init(options);
    };

    // 初始化
    ak_DropLoad.prototype.init = function(options){

        var me = this;
        me.opts = $.extend(true, {}, {
            scrollArea : me.$element,// 滑动区域
            domUp : {// 上方DOM
                domClass   : 'ak-dropload-up',
                domRefresh : '↓ refresh',
                domUpdate  : '↑ update',
                domLoad    : 'loading...'
            },
            domDown : {// 下方DOM
                domClass   : 'ak-dropload-down',
                domRefresh : '↑ refresh',
                domLoad    : 'loading...',
                domNoData  : 'noData'
            },
            autoLoad : true,// 自动加载
            distance : 50,// 拉动距离
            threshold : '',// 提前加载距离
            loadUpFn : '',// 上方function
            loadDownFn : ''// 下方function
        }, options);
        setTimeout(function() {
            $("main").removeClass("ak-scrollbar");
            $("main").unbind('touchmove');
        },500);
        // 如果加载下方，事先在下方插入DOM
        if(me.opts.loadDownFn != ''){
            $("."+ me.opts.domDown.domClass).remove();
            me.$element.append('<div class="'+me.opts.domDown.domClass+'"><div class="ak-dropload-refresh">'+me.opts.domDown.domRefresh+'</div></div>');
            me.$domDown = $('.'+me.opts.domDown.domClass);
        }

        // 计算提前加载距离
        if(!!me.$domDown && me.opts.threshold === ''){
            // 默认滑到加载区2/3处时加载
            me._threshold = Math.floor(me.$domDown.height()*1/3);
        }else{
            me._threshold = me.opts.threshold;
        }
        //console.log("me.$domDown.height()*1/3-->"+me.$domDown.height()*1/3);
        //console.log("me.opts.threshold-->"+me.opts.threshold);
        // 判断滚动区域
        if(me.opts.scrollArea == win){
            me.$scrollArea = $win;
            // 获取文档高度
            // me._scrollContentHeight = $doc.height();
            me._scrollContentHeight = me.$element[0].scrollHeight;
            // 获取win显示区高度  —— 这里有坑
            me._scrollWindowHeight = doc.documentElement.clientHeight;

        }else{
            me.$scrollArea = me.opts.scrollArea;
            me._scrollContentHeight = me.$element[0].scrollHeight;
            me._scrollWindowHeight = me.$element.height();

        }
        //console.log("123212132121321me._scrollContentHeight--> "+me._scrollContentHeight);
        //console.log("123212132121321me._scrollWindowHeight--> "+me._scrollWindowHeight);
        fnAutoLoad(me);

        // 窗口调整
        $win.on('resize',function(){
            if(me.opts.scrollArea == win){
                // 重新获取win显示区高度
                me._scrollWindowHeight = win.innerHeight;
            }else{
                me._scrollWindowHeight = me.$element.height();
            }
        });

        // 绑定触摸
        me.$element.on('touchstart',function(e){
            if(!me.loading){
                fnTouches(e);
                fnTouchstart(e, me);
            }
        });
        me.$element.on('touchmove',function(e){
            if(!me.loading){
                fnTouches(e, me);
                fnTouchmove(e, me);
            }
        });
        me.$element.on('touchend',function(){
            if(!me.loading){
                fnTouchend(me);
            }
        });

        // 加载下方
        me.$element.on('scroll',function(){
            me._scrollTop = me.$scrollArea.scrollTop();
            //console.log("me.loading-->"+me.loading)
            //console.log("me.isLockDown-->"+me.isLockDown)
            //console.log((me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop))
            // 滚动页面触发加载数据
            if(me.opts.loadDownFn != '' && !me.loading && !me.isLockDown && (me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop)){
                loadDown(me);
            }
        });
    };

    // touches
    function fnTouches(e){
        if(!e.touches){
            e.touches = e.originalEvent.touches;
        }
    }

    // touchstart
    function fnTouchstart(e, me){
        me._startY = e.touches[0].pageY;
        // 记住触摸时的scrolltop值
        me.touchScrollTop = me.$scrollArea.scrollTop();
    }

    // touchmove
    function fnTouchmove(e, me){
        me._curY = e.touches[0].pageY;
        me._moveY = me._curY - me._startY;

        if(me._moveY > 0){
            me.direction = 'down';
        }else if(me._moveY < 0){
            me.direction = 'up';
        }

        _absMoveY =  Math.abs(me._moveY);
        if(me.$element.offset().top >=0){
            // 加载上方
            if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp){
                //e.preventDefault();

                me.$domUp = $('.'+me.opts.domUp.domClass);
                // 如果加载区没有DOM
                if(!me.upInsertDOM){
                    $("."+me.opts.domUp.domClass).remove();
                    me.$element.prepend('<div class="'+me.opts.domUp.domClass+'"></div>');
                    me.upInsertDOM = true;
                }

                fnTransition(me.$domUp,0);


                // 下拉
                if(_absMoveY <= me.opts.distance){
                    me._offsetY = _absMoveY;
                    //todo：move时会不断清空、增加dom，有可能影响性能，下同
                    me.$domUp.html('<div class="ak-dropload-refresh">'+me.opts.domUp.domRefresh+'</div>');
                    // 指定距离 < 下拉距离 < 指定距离*2
                }else if(_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance*2){
                    me._offsetY = me.opts.distance+(_absMoveY-me.opts.distance)*0.5;
                    me.$domUp.html('<div class="ak-dropload-update">'+me.opts.domUp.domUpdate+'</div>');
                    // 下拉距离 > 指定距离*2
                }else{
                    me._offsetY = me.opts.distance+me.opts.distance*0.5+(_absMoveY-me.opts.distance*2)*0.2;
                }

                me.$domUp.css({'height': me._offsetY});
            }
        }
    }

    // touchend
    function fnTouchend(me){
        var _absMoveY = Math.abs(me._moveY);

        if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down' && !me.isLockUp){
            if(me.$element.offset().top >=0){
                fnTransition(me.$domUp,300);
                if(_absMoveY > me.opts.distance){
                    me.$domUp.css({'height':me.$domUp.children().height()});
                    me.$domUp.html('<div class="ak-dropload-load"><span class="loading"></span>'+me.opts.domUp.domLoad+'</div>');
                    me.loading = true;
                    me.opts.loadUpFn(me);
                }else{
                    me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
                        me.upInsertDOM = false;
                        $(this).remove();
                    });

                }
                me._moveY = 0;
            }

        }else{
            //me.opts.loadDownFn(me);
            me._scrollTop = me.$scrollArea.scrollTop();
            //console.log("me.loading-->"+me.loading)
            //console.log("me.isLockDown-->"+me.isLockDown)
            //console.log("me.$element.offset().top-->"+me.$element.offset().top)
            //console.log("me._scrollContentHeight---->>>++++"+me._scrollContentHeight);
            //console.log("me._threshold---->>>****"+(me._threshold));
            //console.log("---->>>++++"+(me._scrollContentHeight + me.$element.offset().top - me._threshold));
            //console.log("---->>>****"+(me._scrollWindowHeight + me._scrollTop));

            //当窗口高度大于（滚动区域减去窗口上部）的区域时，加载新一页数据
            if(me.opts.loadDownFn != '' && !me.loading && !me.isLockDown && (me._scrollWindowHeight + me._scrollTop) >= (me._scrollContentHeight + me.$element.offset().top - me._threshold)){
                loadDown(me);
            }
            // 滚动页面触发加载数据
//            if(me.opts.loadDownFn != '' && !me.loading && !me.isLockDown && (me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop)){
//                loadDown(me);
//            }
        }
    }

    // 如果文档高度不大于窗口高度，数据较少，自动加载下方数据
    function fnAutoLoad(me){
        //console.log("me.opts.autoLoad:"+me.opts.autoLoad)
        //console.log("me._scrollWindowHeight:"+me._scrollWindowHeight)
        //console.log("me._scrollContentHeight - me._threshold"+(me._scrollContentHeight - me._threshold))
        if(me.opts.autoLoad){
            if((me._scrollContentHeight - me._threshold) <= me._scrollWindowHeight){

                loadDown(me);
            }
        }
    }

    // 重新获取文档高度
    function fnRecoverContentHeight(me){
        me._scrollContentHeight = me.$element[0].scrollHeight - _absMoveY;
        //console.log("-----end me.$element.offset().top:"+me.$element.offset().top);
        //console.log("end:me._scrollContentHeight:---->>>>"+me._scrollContentHeight);
    }

    // 加载下方
    function loadDown(me){
        me.direction = 'up';
        if (me.$domDown) {
            me.$domDown.html('<div class="ak-dropload-load"><span class="loading"></span>'+me.opts.domDown.domLoad+'</div>');
            me.loading = true;
            me.opts.loadDownFn(me);
        }
    }

    // 锁定
    ak_DropLoad.prototype.lock = function(direction){
        var me = this;
        // 如果不指定方向
        if(direction === undefined){
            // 如果操作方向向上
            if(me.direction == 'up'){
                me.isLockDown = true;
                // 如果操作方向向下
            }else if(me.direction == 'down'){
                me.isLockUp = true;
            }else{
                me.isLockUp = true;
                me.isLockDown = true;
            }
            // 如果指定锁上方
        }else if(direction == 'up'){
            me.isLockUp = true;
            // 如果指定锁下方
        }else if(direction == 'down'){
            me.isLockDown = true;
            // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
            me.direction = 'up';
        }
    };

    // 解锁
    ak_DropLoad.prototype.unlock = function(){
        var me = this;
        // 简单粗暴解锁
        me.isLockUp = false;
        me.isLockDown = false;
        // 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
        me.direction = 'up';
    };

    // 无数据
    ak_DropLoad.prototype.noData = function(flag){
        var me = this;
        if(flag === undefined || flag == true){
            me.isData = false;
        }else if(flag == false){
            me.isData = true;
        }
    };

    // 重置
    ak_DropLoad.prototype.resetload = function(){
        var me = this;
        if(me.direction == 'down' && me.upInsertDOM){
            me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
                me.loading = false;
                me.upInsertDOM = false;
                $(this).remove();
            });
            fnRecoverContentHeight(me);

            fnAutoLoad(me);
        }else if(me.direction == 'up'){
            me.loading = false;
            // 如果有数据
            if(me.isData){
                // 加载区修改样式
                me.$domDown.html('<div class="ak-dropload-refresh">'+me.opts.domDown.domRefresh+'</div>');
                fnRecoverContentHeight(me);
                fnAutoLoad(me);
            }else{
                // 如果没数据
                me.$domDown.html('<div class="ak-dropload-noData">'+me.opts.domDown.domNoData+'</div>');
            }
        }
    };

    // css过渡
    function fnTransition(dom,num){
        dom.css({
            '-webkit-transition':'all '+num+'ms',
            'transition':'all '+num+'ms'
        });
    }
}(jQuery));
