/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_ChooseList--------------------------------------*/
(function($) {
    var defaults = {
        itemWidth: null,
        multi: false,
        btnClass: "",
        btnIcon: true,
        active: "",
        full: false,
        dataKey: "dataKey",
        change: null,
        click: null
    };
    $.fn.AKjs_ChooseList = function(options) {
        var _this = $(this),
            _num = _this.length;
        if (_num === 1) {
            return new ak_Choose(_this, options)
        }
        if (_num > 1) {
            _this.each(function(index, el) {
                new ak_Choose($(el), options)
            })
        }
    };
    function ak_Choose(el, opt) {
        this.el = el;
        this._tag = this.el.prop("tagName").toLowerCase();
        this._opt = $.extend({},
            defaults, opt);
        return this._init()
    }
    ak_Choose.prototype = {
        _init: function() {
            var _data = this.el.data(this._opt.dataKey);
            if (_data) {
                return _data
            } else {
                this.el.data(this._opt.dataKey, this)
            }
            this.multi = this.el.attr("data-multiple") ? !!this.el.attr("data-multiple") : this._opt.multi;
            var _setFunc = this["_setHtml_btn"];
            if (_setFunc) {
                _setFunc.call(this)
            }
            var option = this._opt;
            this._items.each(function() {
                var _this = this;
                var _self = $(this);
                if (option.btnIcon) {
                    if (_self.children("i").length < 1) {
                        _self.append('<i class="c_in abs minus_bottom_03em minus_right_01em line_h_no text_18em icon-im_xuanze_b dis_none_im"></i>');
                        if (_self.attr("data-checked")) {
                            _self.children("i").removeClass("dis_none_im")
                        } else {
                            _self.children("i").addClass("dis_none_im")
                        }
                    }
                }
                _self.attr("type", "button").addClass(option.btnClass);
                if (_self.attr("data-checked")) {
                    _self.addClass(option.active)
                } else {
                    _self.removeClass(option.active)
                }
            });
            this._bindEvent()
        },
        _setHtml_btn: function() {
            this._wrap = this.el;
            this._items = this.el.children("button");
            if (this._opt.itemWidth) {
                this._items.css("width", this._opt.itemWidth)
            }
        },
        _bindEvent: function() {
            var _this = this;
            this._items.unbind("click");
            _this._wrap.on("click", "button",
                function() {
                    var _self = $(this);
                    if (_self.hasClass("disabled")) {
                        return
                    }
                    if (!_this.multi) {
                        var _val = _self.attr("data-value") || _self.index();
                        _this.val(_val);
                        _this._triggerClick(_val, _self);
                        _this._items.each(function(el) {
                            var _el = $(this);
                            if (_el.hasClass(_this._opt.active)) {
                                _el.children("i").removeClass("dis_none_im")
                            } else {
                                _el.children("i").addClass("dis_none_im")
                            }
                        })
                    } else {
                        _self.toggleClass(_this._opt.active);
                        var _val = [];
                        _this._items.each(function(index, el) {
                            var _el = $(this);
                            if (_el.hasClass(_this._opt.active)) {
                                _el.attr("data-checked", "true");
                                var _valOrIndex = _el.index();
                                _val.push(_valOrIndex);
                                _el.children("i").removeClass("dis_none_im")
                            } else {
                                _el.children("i").addClass("dis_none_im")
                            }
                        });
                        _this.val(_val);
                        _this._triggerClick(_val, _self)
                    }
                });
            return _this
        },
        _triggerChange: function(value, item) {
            item = item || this._wrap;
            this.change(value, item);
            if (typeof this._opt.change == "function") {
                this._opt.change.call(this, value, item)
            }
        },
        _triggerClick: function(value, item) {
            this.click(value, item);
            if (typeof this._opt.click == "function") {
                this._opt.click.call(this, value, item)
            }
        },
        _val_btn: function(index) {
            if (arguments.length === 0) {
                var _oActive = this._wrap.children("button." + this._opt.active);
                if (!this.multi) {
                    return _oActive.index() == -1 ? null: _oActive.index()
                } else {
                    if (_oActive.length == 0) {
                        return null
                    }
                    var _this = this,
                        _val = [];
                    _oActive.each(function(index, el) {
                        var _el = $(el);
                        if (_el.hasClass(_this._opt.active)) {
                            _el.attr("data-checked", "true");
                            _val.push(_el.index())
                        }
                    });
                    return _val
                }
            }
            var _oIndex = this._val_btn();
            if (!this.multi) {
                var _ChooseItem = this._wrap.children("button").eq(index);
                if (!_ChooseItem.length) {
                    return this
                }
                _ChooseItem.addClass(this._opt.active).siblings("button").removeClass(this._opt.active);
                _ChooseItem.attr("data-checked", "true").siblings("button").removeAttr("data-checked");
                if (index !== _oIndex) {
                    this._triggerChange(index, _ChooseItem)
                }
            } else {
                if (index == null || index == "" || index == []) {
                    this._items.removeClass(this._opt.active);
                    this._items.removeAttr("data-checked")
                } else {
                    index = typeof index == "object" ? index: [index];
                    this._items.removeClass(this._opt.active);
                    this._items.removeAttr("data-checked");
                    for (var i in index) {
                        var _no = index[i];
                        this._wrap.children("button").eq(_no).addClass(this._opt.active);
                        this._wrap.children("button").eq(_no).attr("data-checked", "true")
                    }
                }
                if (index !== _oIndex) {
                    this._triggerChange(index)
                }
            }
            return this
        },
        val: function() {
            return this["_val_btn"].apply(this, arguments)
        },
        change: function(value, item) {},
        click: function(value, item) {},
        hide: function() {
            this._wrap.hide();
            return this
        },
        show: function() {
            this._wrap.show();
            return this
        }
    }
} (jQuery));