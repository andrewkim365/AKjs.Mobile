/*
Modification Date: 2018-07-11
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_Range-------------------------------------------*/
(function($) {
    var Andrew_Range = function() {
        return this.init.apply(this, arguments)
    };
    Andrew_Range.prototype = {
        defaults: {
            onstatechange: function() {},
            isRange: false,
            showLabels: true,
            showScale: true,
            step: 1,
            format: "%s",
            width: 300,
            disable: false
        },
        template: '<div class="ak-range">' +
        '   <ul>' +
        '       <li class="ak-SelectedBar bg_title"></li>' +
        '       <li class="ak-Pointer low"></li>' +
        '       <li class="ak-label"></li>' +
        '       <li class="ak-Pointer high"></li>' +
        '       <li class="ak-label"></li>' +
        '       <li class="ak-Clickable"></li>' +
        '   </ul>' +
        '   <div class="ak-scale"></div>' +
        '</div>',
        init: function(node, options) {
            this.options = $.extend({},
                this.defaults, options);
            this.inputNode = $(node);
            this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + "," + this.options.from: this.options.from);
            this.domNode = $(this.template);
            this.inputNode.after(this.domNode);
            this.domNode.on("change", this.onChange);
            this.pointers = $(".ak-Pointer", this.domNode);
            this.lowPointer = this.pointers.first();
            this.highPointer = this.pointers.last();
            this.labels = $(".ak-label", this.domNode);
            this.lowLabel = this.labels.first();
            this.highLabel = this.labels.last();
            this.scale = $(".ak-scale", this.domNode);
            this.bar = $(".ak-SelectedBar", this.domNode);
            this.clickableBar = this.domNode.find(".ak-Clickable");
            this.interval = this.options.to - this.options.from;
            this.render();
        },
        render: function() {
            if (this.inputNode.prop("disabled")) {
                this.domNode.addClass("ak-readonly");
                this.options.disable = true;
                this.isReadonly();
            } else {
                this.options.disable = false;
                this.isReadonly();
            }
            if (this.inputNode.width() === 0 && !this.options.width) {
                console.log("Andrew_Range : no width found, returning");
                return
            } else {
                this.domNode.width(this.options.width || this.inputNode.width());
                this.inputNode.hide()
            }
            if (this.isSingle()) {
                this.lowPointer.hide();
                this.lowLabel.hide()
            }
            if (!this.options.showLabels) {
                this.labels.hide()
            }
            this.attachEvents();
            if (this.options.showScale) {
                this.renderScale()
            }
            this.setValue(this.options.value)
        },
        isSingle: function() {
            if (typeof(this.options.value) === "number") {
                return true
            }
            return (this.options.value.indexOf(",") !== -1 || this.options.isRange) ? false: true
        },
        attachEvents: function() {
            this.clickableBar.click($.proxy(this.barClicked, this));
            this.pointers.on("mousedown touchstart", $.proxy(this.onDragStart, this));
            this.pointers.bind("dragstart",
                function(event) {
                    event.preventDefault()
                })
        },
        onDragStart: function(e) {
            if (this.options.disable || (e.type === "mousedown" && e.which !== 1)) {
                return
            }
            e.stopPropagation();
            e.preventDefault();
            var pointer = $(e.target);
            this.pointers.removeClass("zindex_3");
            pointer.addClass("ak-Focused zindex_3");
            this[(pointer.hasClass("low") ? "low": "high") + "Label"].addClass("ak-Focused");
            $(document).on("mousemove.ak-RangeSlider touchmove.ak-RangeSlider", $.proxy(this.onDrag, this, pointer));
            $(document).on("mouseup.ak-RangeSlider touchend.ak-RangeSlider touchcancel.ak-RangeSlider", $.proxy(this.onDragEnd, this))
        },
        onDrag: function(pointer, e) {
            e.stopPropagation();
            e.preventDefault();
            if (e.originalEvent.touches && e.originalEvent.touches.length) {
                e = e.originalEvent.touches[0]
            } else {
                if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                    e = e.originalEvent.changedTouches[0]
                }
            }
            var position = e.clientX - this.domNode.offset().left;
            this.domNode.trigger("change", [this, pointer, position])
        },
        onDragEnd: function(e) {
            this.pointers.removeClass("ak-Focused");
            this.labels.removeClass("ak-Focused");
            $(document).off(".ak-RangeSlider")
        },
        barClicked: function(e) {
            if (this.options.disable) {
                return
            }
            var x = e.pageX - this.clickableBar.offset().left;
            if (this.isSingle()) {
                this.setPosition(this.pointers.last(), x, true, true)
            } else {
                var pointer = Math.abs(parseInt(this.pointers.first().css("left"), 10) - x + this.pointers.first().width() / 2) < Math.abs(parseInt(this.pointers.last().css("left"), 10) - x + this.pointers.first().width() / 2) ? this.pointers.first() : this.pointers.last();
                this.setPosition(pointer, x, true, true)
            }
        },
        onChange: function(e, self, pointer, position) {
            var min, max;
            if (self.isSingle()) {
                min = 0;
                max = self.domNode.width()
            } else {
                min = pointer.hasClass("high") ? self.lowPointer.position().left + self.lowPointer.width() / 2 : 0;
                max = pointer.hasClass("low") ? self.highPointer.position().left + self.highPointer.width() / 2 : self.domNode.width()
            }
            var value = Math.min(Math.max(position, min), max);
            self.setPosition(pointer, value, true)
        },
        setPosition: function(pointer, position, isPx, animate) {
            var leftPos, lowPos = this.lowPointer.position().left,
                highPos = this.highPointer.position().left,
                circleWidth = this.highPointer.width() / 2;
            if (!isPx) {
                position = this.prcToPx(position)
            }
            if (pointer[0] === this.highPointer[0]) {
                highPos = Math.round(position - circleWidth)
            } else {
                lowPos = Math.round(position - circleWidth)
            }
            pointer[animate ? "animate": "css"]({
                "left": Math.round(position - circleWidth)
            });
            if (this.isSingle()) {
                leftPos = 0
            } else {
                leftPos = lowPos + circleWidth
            }
            this.bar[animate ? "animate": "css"]({
                "width": Math.round(highPos + circleWidth - leftPos),
                "left": leftPos
            });
            this.showPointerValue(pointer, position, animate);
            this.isReadonly()
        },
        setValue: function(value) {
            var values = value.toString().split(",");
            this.options.value = value;
            var prc = this.valuesToPrc(values.length === 2 ? values: [0, values[0]]);
            if (this.isSingle()) {
                this.setPosition(this.highPointer, prc[1])
            } else {
                this.setPosition(this.lowPointer, prc[0]);
                this.setPosition(this.highPointer, prc[1])
            }
        },
        renderScale: function() {
            var s = this.options.scale || [this.options.from, this.options.to];
            var prc = Math.round((100 / (s.length - 1)) * 10) / 10;
            var str = "";
            for (var i = 0; i < s.length; i++) {
                str += '<span style="left: ' + i * prc + '%">' + (s[i] != "|" ? "<ins>" + s[i] + "</ins>": "") + "</span>"
            }
            this.scale.html(str);
            $("ins", this.scale).each(function() {
                $(this).css({
                    marginLeft: -$(this).outerWidth() / 2
                })
            })
        },
        getBarWidth: function() {
            var values = this.options.value.split(",");
            if (values.length > 1) {
                return parseInt(values[1], 10) - parseInt(values[0], 10)
            } else {
                return parseInt(values[0], 10)
            }
        },
        showPointerValue: function(pointer, position, animate) {
            var label = $(".ak-label", this.domNode)[pointer.hasClass("low") ? "first": "last"]();
            var text;
            var value = this.positionToValue(position);
            if ($.isFunction(this.options.format)) {
                var type = this.isSingle() ? undefined: (pointer.hasClass("low") ? "low": "high");
                text = this.options.format(value, type)
            } else {
                text = this.options.format.replace("%s", value)
            }
            var width = label.html(text).width(),
                left = position - width / 2;
            left = Math.min(Math.max(left, 0), this.options.width - width);
            label[animate ? "animate": "css"]({
                left: left
            });
            this.setInputValue(pointer, value)
        },
        valuesToPrc: function(values) {
            var lowPrc = ((values[0] - this.options.from) * 100 / this.interval),
                highPrc = ((values[1] - this.options.from) * 100 / this.interval);
            return [lowPrc, highPrc]
        },
        prcToPx: function(prc) {
            return (this.domNode.width() * prc) / 100
        },
        positionToValue: function(pos) {
            var value = (pos / this.domNode.width()) * this.interval;
            value = value + this.options.from;
            return Math.round(value / this.options.step) * this.options.step
        },
        setInputValue: function(pointer, v) {
            if (this.isSingle()) {
                this.options.value = v.toString()
            } else {
                var values = this.options.value.split(",");
                if (pointer.hasClass("low")) {
                    this.options.value = v + "," + values[1]
                } else {
                    this.options.value = values[0] + "," + v
                }
            }
            if (this.inputNode.val() !== this.options.value) {
                this.inputNode.val(this.options.value);
                this.options.onstatechange(this, this.options.value)
            }
        },
        getValue: function() {
            return this.options.value
        },
        isReadonly: function() {
            this.domNode.toggleClass("ak-readonly", this.options.disable)
        },
        disable: function() {
            this.options.disable = true;
            this.isReadonly()
        },
        enable: function() {
            this.options.disable = false;
            this.isReadonly()
        },
        toggleDisable: function() {
            this.options.disable = !this.options.disable;
            this.isReadonly()
        }
    };
    var pluginName = "Andrew_Range";
    $.fn[pluginName] = function(option) {
        var args = arguments,
            result;
        var range = this;
        setTimeout(function() {
                range.each(function() {
                    var $this = $(this),
                        data = $.data(this, "plugin_" + pluginName),
                        options = typeof option === "object" && option;
                    if (!data) {
                        $this.data("plugin_" + pluginName, (data = new Andrew_Range(this, options)));
                        $(window).resize(function() {
                            data.setValue(data.getValue())
                        })
                    }
                    if (typeof option === "string") {
                        result = data[option].apply(data, Array.prototype.slice.call(args, 1))
                    }
                    if (typeof option === 'number') {
                        data.setValue(option);
                    }
                })
            },
            100);
        return result || this
    };
})(jQuery);