/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ReadMore-------------------------------------------*/
(function($) {
    var readmore = 'AKjs_ReadMore',
        defaults = {
            speed: 100,
            maxHeight: 200,
            heightMargin: 16,
            moreLink: '',
            lessLink: '',
            startOpen: false,
            beforeToggle: function(){},
            afterToggle: function(){}
        };
    function Readmore( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options);
        $(this.element).data('max-height', this.options.maxHeight);
        $(this.element).data('height-margin', this.options.heightMargin);
        delete(this.options.maxHeight);
        this.init();
    }
    Readmore.prototype = {
        init: function() {
            var $this = this;
            $(this.element).each(function() {
                var current = $(this),
                    maxHeight = (current.css('max-height').replace(/[^-\d\.]/g, '') > current.data('max-height')) ? current.css('max-height').replace(/[^-\d\.]/g, '') : current.data('max-height'),
                    heightMargin = current.data('height-margin');
                if(current.css('max-height') != 'none') {
                    current.css('max-height', 'none');
                }
                $this.setBoxHeight(current);
                if(current.outerHeight(true) <= maxHeight + heightMargin) {
                    return true;
                }
                else {
                    current.data('collapsedHeight', maxHeight);
                    var useLink = $this.options.startOpen ? $this.options.lessLink : $this.options.moreLink;
                    current.after($(useLink).on('click', function(event) {
                        $this.toggleSlider(this, current, event)
                    }));
                    if(!$this.options.startOpen) {
                        current.css({
                            height: maxHeight,
                            display: "block"
                        });
                        current.removeClass("dis_none_im").removeClass("dis_none");
                    }
                }
            });
        },
        toggleSlider: function(trigger, element, event) {
            event.preventDefault();
            var $this = this,
                newHeight = newLink = sectionClass = '',
                expanded = false,
                collapsedHeight = $(element).data('collapsedHeight');

            if ($(element).height() <= collapsedHeight + $(trigger).height()) {
                newHeight = $(element).data('expandedHeight');
                newLink = 'lessLink';
                expanded = true;
            }
            else {
                newHeight = collapsedHeight;
                newLink = 'moreLink';
                expanded = false;
            }
            $this.options.beforeToggle(trigger, element, expanded);
            $(element).animate({
                'height': newHeight
            }, {duration: $this.options.speed, complete: function() {
                    $this.options.afterToggle(trigger, element, expanded);
                    $(trigger).replaceWith($($this.options[newLink]).on('click', function(event) {
                        $this.toggleSlider(this, element, event)
                    }));
                }
            });
        },

        setBoxHeight: function(element) {
            var el = element.clone().css({
                    'height': 'auto',
                    'width': element.width(),
                    'overflow': 'hidden'
            }).insertAfter(element),
                height = el.outerHeight();
            el.remove();
            element.data('expandedHeight', height);
        }
    };

    $.fn[readmore] = function( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                $.data(this, 'plugin_' + readmore, new Readmore( this, options ));
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + readmore);
                if (instance instanceof Readmore && typeof instance[options] === 'function') {
                    instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });
        }
    }
})(jQuery);
