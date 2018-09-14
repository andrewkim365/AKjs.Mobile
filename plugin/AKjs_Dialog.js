/*
Modification Date: 2018-09-14
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Dialog------------------------------------------*/
(function($){
    var m = {};
    var g = {};
    m.opening = false;
    m._options = {
        title: false,
        animateIn : "bounceInDown",
        animateOut : "bounceOutUp",
        onSubmit : false,
        onCancel : false,
        required: false,
        icon: false,
        inputbox: false,
        inputType: "",
        inputClass: "",
        placeholder:"",
        button_ok: "OK",
        button_cancel: "CANCEL"
    };

    m.tplBase = "<div class=\"ak-dialog\">";
    m.tplBase += "<div class=\"ak-dialog_container\">";
    m.tplBase += "{{header}}";
    m.tplBase += "<div class=\"ak-dialog_content\"><p>{{message}}</p>{{input}}</div>";
    m.tplBase += "<div class=\"ak-dialog_footer\">{{button_cancel}} <button type=\"button\" class=\"ak_btn bg_white button_ok c_title\">{{btn_ok}}</button></div>";
    m.tplBase += "</div>";
    m.tplBase += "</div>";

    m.tplHeader = "<div class=\"ak-dialog_header bor_bottom_dashed bor_gray_ddd {{icon}}\"><h3 class=\"ml_05em\">{{title}}</h3></div>";
    m.tplInput = "<div class=\"ak-dialog_field\">{{inputbox}}</div>";

    m.getTeplate = function(type, message, options){
        var t = m.tplBase;

        if( type !== 'alert' ){
            t = t.replace("{{button_cancel}}", "<button type=\"button\" class=\"ak_btn bg_white button_cancel bor_right bor_gray_ddd\">{{btn_cancel}}</button>");
        } else {
            t = t.replace("{{button_cancel}}", "");
        }
        if( type == 'prompt' ){
            t = t.replace("{{input}}", m.tplInput);
        } else {
            t = t.replace("{{input}}", "");
        }
        if( options.title ){
            t = t.replace("{{header}}", m.tplHeader.replace("{{title}}", options.title) );
        } else {
            t = t.replace("{{header}}", "");
        }
        if (options.inputbox == 'textarea') {
            t = t.replace("{{inputbox}}", "<textarea />");
        } else if (options.inputbox == 'input') {
            if (options.inputType) {
                t = t.replace("{{inputbox}}", "<input type='"+options.inputType+"' />");
            } else {
                t = t.replace("{{inputbox}}", "<input type='text' />");
            }
        }
        t = t.replace("{{icon}}", options.icon);
        t = t.replace("{{btn_ok}}", options.button_ok);
        t = t.replace("{{btn_cancel}}", options.button_cancel);
        t = t.replace("{{message}}", message );
        return t;
    };

    m.clear = function() {
        $('#alert_mask').length ? $('#alert_mask').remove() : '';
        $('.ak-dialog').length ? $('.ak-dialog').remove() : '';
    };

    m.Dialog = function() {
        var that = this;
        that.close = function() {
            $("#ak-scrollview").addClass("scrolling_touch");;
            if (that.options.animateOut) {
                if (that.options.animateIn) {
                    that.container.find('.ak-dialog_container').removeClass(that.options.animateIn)
                }
                that.container.find('.ak-dialog_container').addClass('animated ' + that.options.animateOut);
                setTimeout(function() {
                        that.container.removeClass('is-active');
                        that.container.remove();
                        m.opening = false;
                        $('#alert_mask').remove();
                    },
                    800);
            } else {
                that.container.remove();
                m.opening = false;
                $('#alert_mask').remove();
            }
        };

        that.addEvents = function(){
            that.btnOk.unbind("click");
            that.btnOk.on("click", function(e){
                e.preventDefault();
                var res = false;
                if( that.field.length ){
                    if( that.options.required == true && !that.field.val().length ){
                        that.field.addClass('is-invalid');
                        return false;
                    } else {
                        that.field.removeClass('is-invalid');
                        res = that.field.val();
                    }
                } else {
                    res = true;
                }
                if( typeof that.options.onSubmit == 'function' ){
                    that.options.onSubmit(res);
                }
                that.close();
            });
            that.btnCancel.unbind("click");
            that.btnCancel.on("click", function(e){
                e.preventDefault();
                var res = false;
                if( that.field.length && that.field.val().length !== 0 ){
                    res = that.field.val();
                }
                if( typeof that.options.onCancel == 'function' ){
                    that.options.onCancel(res);
                }
                that.close();
            });
        };

        this.init = function(type, message, options, defaultValue){
            if (m.opening) {
                $('#alert_mask, .ak-dialog').remove();
            }
            m.clear();

            that.options = m.getOptions(options);
            $('body').append(m.getTeplate(type, message, that.options) + "<div id='alert_mask' class=\"ak-mask\"></div> ");
            that.container = $('body').find('.ak-dialog');
            $("#alert_mask").bind({
                touchmove: function (e) {
                    e.preventDefault();
                }
            });
            that.container.bind({
                touchmove: function (e) {
                    e.preventDefault();
                }
            });
            $("#ak-scrollview").removeClass("scrolling_touch");
            that.btnOk = that.container.find('.button_ok');
            that.btnCancel = that.container.find('.button_cancel');

            if (options.inputbox == 'textarea') {
                that.field = that.container.find('textarea');
            } else {
                that.field = that.container.find('input');
            }
            if (options.placeholder) {
                that.field.attr("placeholder", options.placeholder);
                var placeholder_tmps ="";
                that.field.focus(function() {
                    placeholder_tmps = $(this).attr("placeholder");
                    if ($(this)[0].type !="search") {
                        $(this).removeAttr('placeholder');
                    }
                    $(this).blur(function() {
                        $(this).attr("placeholder",placeholder_tmps);
                    });
                });
            }
            that.field.parents('.ak-dialog_content').children("p").addClass("ak-input_title");
            that.field.addClass(options.inputClass);
            if( defaultValue && that.field.length ){
                that.field.val(defaultValue);
            }
            that.container.addClass('ak-is_active').css({
                "top": ($(window).height() / 2) - (that.container.height() / 2)
            });
            if( that.options.animateIn ){
                that.container.find('.ak-dialog_container').addClass('animated '+that.options.animateIn);
            }
            m.opening = true;

            that.addEvents();
        };
    };

    m.getOptions = function(options){
        var o = $.extend({}, m._options);
        if( typeof options == 'object' ){
            $.each(options, function(key, val){
                o[key] !== undefined ? o[key] = val : console.error("The option \""+key+"\" not exist.");
            });
        }
        return o;
    };

    /*global functions*/
    var isIE = function () {
        var U = navigator.userAgent,
            IsIE = U.indexOf('MSIE') > -1,
            a = IsIE ? /\d+/.exec(U.split(';')[1]) : 'no ie';return a <= 8;
    }();
    if(!isIE){
        alert = function (message, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new m.Dialog;
            dialog.init('alert', message, userOptions);
        };
        confirm = function (message, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new m.Dialog;
            dialog.init('confirm', message, userOptions);
        };
        prompt = function (message, defaultValue, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new m.Dialog;
            dialog.init('prompt', message, userOptions, defaultValue);
        };
    }
    g.alert = function(message, userOptions){ /*解决微信不支持问题*/
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new m.Dialog;
        dialog.init('alert', message, userOptions);
    };
    g.confirm = function(message, userOptions){ /*解决微信不支持问题*/
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new m.Dialog;
        dialog.init('confirm', message, userOptions);
    };
    g.prompt = function(message, defaultValue, userOptions){ /*解决微信不支持问题*/
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new m.Dialog;
        dialog.init('prompt', message, userOptions, defaultValue);
    };
    g.config = function(options){
        if( typeof options !== 'object' ){ return false; }
        $.each(options, function(key, val){
            m._options[key] !== undefined ? m._options[key] = val : console.error("The option \""+key+"\" not exist.");
        });
    };
    $ak = g;
}(jQuery));
