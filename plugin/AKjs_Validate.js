/*
Modification Date: 2018-09-25
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Validate--------------------------------------*/
(function($) {
    $.fn.AKjs_Validate = function(setting) {
        var option = $.extend({
                valid: "",
                VerifyClass: "c_red",
                focusBack: function() {},
                clickBack: function() {}
            },
            setting);
        var form = $(this);
        var ctrls = form.find('[data-valid]');
        var isDiy = false;
        $.each(option.valid, function(key, val) {
            if (option.valid[key].hasOwnProperty('success')) {
                return ! (isDiy = true);
            }
        });
        $.each(ctrls, function(index, ele) {
            var key = $(ele).attr('data-valid');
            $(ele).parent().find("sub").remove();
            $(ele).parent().append("<sub class='dis_none_im' style='white-space: pre;line-height: "+$(ele).outerHeight()+"px;' data-error='"+key+"' />");
            $(ele).on('change', function() {
                if (!test(ele, key)) {
                    $(ele).focus();
                    option.focusBack($(ele),index,false);
                } else {
                    option.focusBack($(ele),index,true);
                }
            });
        });
        form.find(":submit").on("click", function(ev) {
            if (form.find('[type="submit"]').disabled()) {
                ev.preventDefault();
            }
            var vResult = true;
            var isFocus = true;
            $.each(ctrls, function(index, ele) {
                var key = $(ele).attr('data-valid');
                if (!test(ele, key)) {
                    if (isFocus) {
                        $(ele).focus();
                        option.focusBack($(ele),index,false);
                        isFocus = false;
                    }
                    vResult = false;
                    if (!isDiy) {
                        return false;
                    }
                }
            });
            if (option.clickBack && option.clickBack.constructor === Function) {
                ev.preventDefault();
                if (vResult) {
                    option.clickBack($(this), form);
                }
            } else {
                if (!vResult) {
                    ev.preventDefault();
                }
            }
        });
        function test(ele, key) {
            var va = option.valid[key];
            var errDom = isDiy ? null: form.find('[data-error="' + key + '"]');
            if ($(ele).prop('type') == 'radio' || $(ele).prop('type') == 'checkbox') {
                return $.inRange(form.find('[data-valid="' + key + '"]:checked').length, va.norm) ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.error);
            } else if (va.norm.context) {
                return $(ele).val() == va.norm.val() && $(ele).val().length > 0 ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.error);
            } else {
                return va.norm.test($(ele).val()) ? fnSuccess($(ele), va, errDom) : fnError($(ele), va, errDom, va.error);
            }
        }
        function fnError(ts, va, errDom, error) {
            if (isDiy) {
                va.error(ts);
            } else {
                errDom.removeClass("dis_none_im").addClass('abs ml_05em '+option.VerifyClass).html("* "+error);
            }
            return false;
        }
        function fnSuccess(ts, va, errDom) {
            if (isDiy) {
                va.success(ts);
            } else {
                setTimeout(function() {
                    errDom.addClass("dis_none_im").removeClass('abs ml_05em '+option.VerifyClass).html('');
                }, 200);
            }
            return true;
        }
    };
    $.fn.disabled = function(status) {
        var _ts = $(this);
        if (status == true) {
            _ts.addClass('disabled');
            _ts.attr('disabled', true);
        }
        if (status == false) {
            _ts.removeClass('disabled');
            _ts.attr('disabled', false);
        }
        return _ts.hasClass('disabled') || typeof _ts.attr('disabled') != 'undefined';
    };
    $.inRange = function(num, range) {
        if (typeof range == 'string') {
            range = range.replace(/ /g, '');
        }
        if (!/^\(|\)|\[|\]$/.test(range)) {
            return num == parseFloat(range);
        } else if (/^\(\d*\.?\d*,[\)\]]$/.test(range)) {
            return num > parseFloat(range.replace(/\(|,|\)/g, ''));
        } else if (/^[\[\(],\d*\.?\d*\)$/.test(range)) {
            return num < parseFloat(range.replace(/\(|,|\)/g, ''));
        } else if (/^\(\d*\.?\d*,\d*\.?\d*\)$/.test(range)) {
            var arr = range.replace(/\(|\)/g, '').split(',');
            return num > parseFloat(arr[0]) && num < parseFloat(arr[1]);
        } else if (/^\[\d*\.?\d*,[\)\]]$/.test(range)) {
            return num >= parseFloat(range.replace(/\[|,|\)/g, ''));
        } else if (/^[\[\(],\d*\.?\d*\]$/.test(range)) {
            return num <= parseFloat(range.replace(/\(|,|\]/g, ''));
        } else if (/^\[\d*\.?\d*,\d*\.?\d*\]$/.test(range)) {
            var arr = range.replace(/\[|\]/g, '').split(',');
            return num >= parseFloat(arr[0]) && num <= parseFloat(arr[1]);
        } else if (/^\(\d*\.?\d*,\d*\.?\d*\]$/.test(range)) {
            var arr = range.replace(/\(|\]/g, '').split(',');
            return num > parseFloat(arr[0]) && num <= parseFloat(arr[1]);
        } else if (/^\[\d*\.?\d*,\d*\.?\d*\)$/.test(range)) {
            var arr = range.replace(/\[|\)/g, '').split(',');
            return num >= parseFloat(arr[0]) && num < parseFloat(arr[1]);
        } else {
            return false;
        }
    }
}(jQuery));