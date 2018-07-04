/*
Modification Date: 2018-07-04
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Waterfall-------------------------------------------*/
(function($) {
    var pluginName = 'Andrew_Waterfall',
        defaults = {
            spacingWidth: 5,
            spacingHeight: 5,
            minColCount: 2,
            itemAlign: "center",
            isFadeIn: true,
            ajaxCallback: null
        };

    function Andrew_Waterfall(element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, defaults, options);
        this.ajaxLoading = false;
        this.colHeightArray = [];
        this._init();
    }

    Andrew_Waterfall.prototype = {
        constructor: Andrew_Waterfall,
        _init: function () {
            var $this = this;
            setTimeout(function() {
                $this._positionAll();
            },100);
            $(window).resize(function(){
                $this._positionAll();
            });
            this._doScroll();
        },
        _getColumnCount: function () {
            var eleWidth = this.$element.width(),
                $item = this.$element.children(),
                itemWidth = $item.eq(0).outerWidth(),
                iCol = Math.floor(eleWidth / (itemWidth + this.options.spacingWidth)),
                realWidth = 0,
                leftOffset = 0;
            iCol = iCol > this.options.minColCount ? iCol : this.options.minColCount;
            realWidth = iCol * itemWidth;
            if(eleWidth > realWidth) {
                leftOffset = Math.floor((eleWidth - realWidth - iCol * this.options.spacingWidth) / 2);
            }
            this.itemWidth = itemWidth;
            this.cols = iCol;
            this.leftOffset = this.options.itemAlign == "center" ? leftOffset : 0;
        },
        _positionAll: function () {
            var $this = this,
                $item = $this.$element.children(),
                minHeight,
                minIndex;
            this.colHeightArray = [];
            this.$element.addClass("ak-waterfall");
            this._getColumnCount();
            $item.each(function(index) {
                    if(index < $this.cols) {
                        $(this).css("top", 0);
                        console.log($this.leftOffset + index * $this.itemWidth + index * $this.options.spacingWidth);
                        $(this).css("left", $this.leftOffset + index * $this.itemWidth + index * $this.options.spacingWidth);
                        $this.colHeightArray.push($(this).outerHeight());
                    } else {
                        minHeight = Math.min.apply(null, $this.colHeightArray);
                        minIndex = $.inArray(minHeight, $this.colHeightArray);
                        $(this).css("top", minHeight + $this.options.spacingHeight);
                        $(this).css("left", $item.eq(minIndex).offset().left - $this.$element.offset().left);
                        $this.colHeightArray[minIndex] += $(this).outerHeight() + $this.options.spacingHeight;
                    }
                    if($this.options.isFadeIn) {
                        $(this).animate({
                            "opacity": 1
                        }, 1000);
                    }
                });
            this.$element.css("height", Math.max.apply(null, $this.colHeightArray));
        },
        _doScroll: function () {
            var $this = this,
                scrollTimer;
            var $container = $("main");
            $container.on('scroll', function (andrew) {
                andrew.preventDefault();
                if(scrollTimer) {
                    clearTimeout(scrollTimer);
                }
                scrollTimer = setTimeout(function() {
                    var $last = $this.$element.children().last(),
                        scrollTop = $container.scrollTop() + $container.height();
                    if(!$this.ajaxLoading && scrollTop > $last.offset().top + $last.outerHeight() / 2) {
                        $this.ajaxLoading = true;
                        $this.options.ajaxCallback && $this.options.ajaxCallback(
                            $this.$element,
                            function() {
                                $this._positionAll();
                            },
                            function() {
                                $this.ajaxLoading = false;
                            }
                        );
                    }
                }, 100);
            });
        }
    };
    $.fn[pluginName] = function (options) {
        this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Andrew_Waterfall(this, options));
            }
        });
        return this;
    }
})(jQuery);
