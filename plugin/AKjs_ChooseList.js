/*
Modification Date: 2018-09-14
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ChooseList--------------------------------------*/
(function($){
    var defaults = {
        itemWidth: null,
        multi: false,
        btnClass: "",
        btnIcon: true,
        active: '',
        full: false,
        dataKey: 'dataKey',
        change: null,
        click: null
    };
    $.fn.AKjs_ChooseList = function(options) {
        var _this = $(this),
            _num = _this.length;
        /* 当要实例的对象只有一个时，直接实例化返回对象；*/
        if (_num === 1) {
            return new ak_Choose(_this, options);
        }
        /* 当要实例的对象有多个时，循环实例化，不返回对象；*/
        if (_num > 1) {
            _this.each(function(index, el) {
                new ak_Choose($(el), options);
            })
        }
        /* 当元素个数为0时，不执行实例化。*/
    };
    /**
     * @param {[jQuery]} el  [jQuery选择后的对象，此处传入的为单个元素]
     * @param {[object]} opt [设置的参数]
     */
    function ak_Choose(el, opt) {
        this.el = el;
        this._tag = this.el.prop('tagName').toLowerCase();
        this._opt = $.extend({}, defaults, opt);

        return this._init();
    }
    /* 原型链扩展。*/
    ak_Choose.prototype = {
        /* init初始化;*/
        _init: function() {
            var _data = this.el.data(this._opt.dataKey);
            /* 如果已经实例化了，则直接返回*/
            if (_data)
                return _data;
            else
                this.el.data(this._opt.dataKey, this);

            /* 设置是否多选*/
            this.multi = this.el.attr('data-multiple') ? !!this.el.attr('data-multiple') : this._opt.multi;

            /* 根据不同的标签进行不同的元素组建*/
            var _setFunc = this['_setHtml_btn'];
            if (_setFunc) {
                _setFunc.call(this);
            }
            var option = this._opt;
            this._items.each(function() {
                var _this = this;
                var _self = $(this);
                if (option.btnIcon) {
                    if (_self.children("i").length < 1) {
                        _self.append("<i class=\"c_in abs minus_bottom_03em minus_right_01em line_h_no text_18em icon-im_xuanze_b dis_none_im\"></i>");
                        if (_self.attr("data-checked")) {
                            _self.children("i").removeClass("dis_none_im");
                        } else {
                            _self.children("i").addClass("dis_none_im");
                        }
                    }
                }
                _self.attr("type","button").addClass(option.btnClass);
                if (_self.attr("data-checked")) {
                    _self.addClass(option.active);
                } else {
                    _self.removeClass(option.active);
                }
            });
            this._bindEvent(); /* 绑定事件*/
        },
        /* 组建并获取相关的dom元素-btn;*/
        _setHtml_btn: function() {
            this._wrap = this.el;
            this._items = this.el.children('button');
            if (this._opt.itemWidth) {
                this._items.css('width', this._opt.itemWidth);
            }
        },
        /* 绑定事件；*/
        _bindEvent: function() {
            var _this = this;
            this._items.unbind("click");
            _this._wrap.on('click', 'button', function() {
                var _self = $(this);
                if (_self.hasClass('disabled'))
                    return;
                if (!_this.multi) { /* single Choose*/
                    var _val = _self.attr('data-value') || _self.index();
                    _this.val(_val);
                    _this._triggerClick(_val, _self);
                    _this._items.each(function(el) {
                        var _el = $(this);
                        if (_el.hasClass(_this._opt.active)) {
                            _el.children("i").removeClass("dis_none_im");
                        } else {
                            _el.children("i").addClass("dis_none_im");
                        }
                    });
                } else { /* multiple*/
                    _self.toggleClass(_this._opt.active);
                    var _val = [];
                    _this._items.each(function(index, el) {
                        var _el = $(this);
                        if (_el.hasClass(_this._opt.active)) {
                            _el.attr("data-checked","true");
                            var _valOrIndex = _el.index();
                            _val.push(_valOrIndex);
                            _el.children("i").removeClass("dis_none_im");
                        } else {
                            _el.children("i").addClass("dis_none_im");
                        }
                    });
                    _this.val(_val);
                    _this._triggerClick(_val, _self);
                }
            });
            return _this;
        },

        /* change 触发；value：值 ；*/
        _triggerChange: function(value, item) {
            item = item || this._wrap;
            this.change(value, item);
            if (typeof this._opt.change == 'function')
                this._opt.change.call(this, value, item);
        },

        /* click 触发；value：值 ；item：选中的option；*/
        _triggerClick: function(value, item) {
            this.click(value, item);
            if (typeof this._opt.click == 'function')
                this._opt.click.call(this, value, item);
        },

        /* 获取或设置值:btn*/
        _val_btn: function(index) {
            /* getValue*/
            if (arguments.length === 0) {
                var _oActive = this._wrap.children('button.' + this._opt.active);
                if (!this.multi) { /* single Choose*/
                    return _oActive.index() == -1 ? null : _oActive.index();
                } else { /* single Choose*/
                    if (_oActive.length == 0) {
                        return null;
                    }
                    var _this = this,
                        _val = [];
                    _oActive.each(function(index, el) {
                        var _el = $(el);
                        if (_el.hasClass(_this._opt.active)) {
                            _el.attr("data-checked","true");
                            _val.push(_el.index());
                        }
                    });
                    return _val;
                }
            }
            /* setValue*/
            var _oIndex = this._val_btn();
            if (!this.multi) { /* single Choose*/
                var _ChooseItem = this._wrap.children('button').eq(index);
                if (!_ChooseItem.length)
                    return this;
                _ChooseItem.addClass(this._opt.active).siblings('button').removeClass(this._opt.active);
                _ChooseItem.attr("data-checked","true").siblings('button').removeAttr("data-checked");
                if (index !== _oIndex) {
                    this._triggerChange(index, _ChooseItem);
                }
            } else { /* multiple Choose*/
                if (index == null || index == '' || index == []) {
                    this._items.removeClass(this._opt.active);
                    this._items.removeAttr("data-checked");
                } else {
                    index = typeof index == 'object' ? index : [index];
                    this._items.removeClass(this._opt.active);
                    this._items.removeAttr("data-checked");
                    for (var i in index) {
                        var _no = index[i];
                        this._wrap.children('button').eq(_no).addClass(this._opt.active);
                        this._wrap.children('button').eq(_no).attr("data-checked","true");
                    }
                }
                if (index !== _oIndex) {
                    this._triggerChange(index);
                }
            }
            /* multiple*/
            return this;
        },

        /* 获取或设置值*/
        val: function() {
            return this['_val_btn'].apply(this, arguments);
        },

        /* 值改变事件；*/
        change: function(value, item) {},

        /* 点击事件；*/
        click: function(value, item) {},

        /* 隐藏*/
        hide: function() {
            this._wrap.hide();
            return this;
        },

        /* 显示*/
        show: function() {
            this._wrap.show();
            return this;
        }
    };
}(jQuery));