/*
Modification Date: 2018-10-10
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Dialog------------------------------------------*/
(function($) {
    var ak = {};
    var AKjs_Dialog = {};
    ak.opening = false;
    ak.defaults = {
        title: false,
        animateIn: "bounceInDown",
        animateOut: "bounceOutUp",
        onSubmit: false,
        onCancel: false,
        required: false,
        icon: false,
        inputbox: false,
        inputType: "",
        inputClass: "",
        placeholder: "",
        button_ok: "OK",
        button_cancel: "CANCEL"
    };
    ak.tplBase = '<div class="ak-dialog">';
    ak.tplBase += '<div class="ak-dialog_container">';
    ak.tplBase += "{{header}}";
    ak.tplBase += '<div class="ak-dialog_content"><p>{{message}}</p>{{input}}</div>';
    ak.tplBase += '<div class="ak-dialog_footer">{{button_cancel}} <button type="button" class="ak_btn bg_white button_ok c_title">{{btn_ok}}</button></div>';
    ak.tplBase += "</div>";
    ak.tplBase += "</div>";
    ak.tplHeader = '<div class="ak-dialog_header bor_bottom_dashed bor_gray_ddd {{icon}}"><h3 class="ml_05em">{{title}}</h3></div>';
    ak.tplInput = '<div class="ak-dialog_field">{{inputbox}}</div>';
    ak.getTeplate = function(type, message, option) {
        var template = ak.tplBase;
        if (type !== "alert") {
            template = template.replace("{{button_cancel}}", '<button type="button" class="ak_btn bg_white button_cancel bor_right bor_gray_ddd">{{btn_cancel}}</button>')
        } else {
            template = template.replace("{{button_cancel}}", "")
        }
        if (type == "prompt") {
            template = template.replace("{{input}}", ak.tplInput)
        } else {
            template = template.replace("{{input}}", "")
        }
        if (option.title) {
            template = template.replace("{{header}}", ak.tplHeader.replace("{{title}}", option.title))
        } else {
            template = template.replace("{{header}}", "")
        }
        if (option.inputbox == "textarea") {
            template = template.replace("{{inputbox}}", "<textarea />")
        } else {
            if (option.inputbox == "input") {
                if (option.inputType) {
                    template = template.replace("{{inputbox}}", "<input type='" + option.inputType + "' />")
                } else {
                    template = template.replace("{{inputbox}}", "<input type='text' />")
                }
            }
        }
        template = template.replace("{{icon}}", option.icon);
        template = template.replace("{{btn_ok}}", option.button_ok);
        template = template.replace("{{btn_cancel}}", option.button_cancel);
        template = template.replace("{{message}}", message);
        return template
    };
    ak.clear = function() {
        $("#alert_mask").length ? $("#alert_mask").remove() : "";
        $(".ak-dialog").length ? $(".ak-dialog").remove() : ""
    };
    ak.Dialog = function() {
        var that = this;
        that.close = function() {
            $("#ak-scrollview").addClass("scrolling_touch");
            if (that.option.animateOut) {
                if (that.option.animateIn) {
                    that.container.find(".ak-dialog_container").removeClass(that.option.animateIn)
                }
                that.container.find(".ak-dialog_container").addClass("animated " + that.option.animateOut);
                setTimeout(function() {
                        that.container.removeClass("is-active");
                        that.container.remove();
                        ak.opening = false;
                        $("#alert_mask").remove()
                    },
                    800)
            } else {
                that.container.remove();
                ak.opening = false;
                $("#alert_mask").remove()
            }
        };
        that.addEvents = function() {
            that.btnOk.unbind("click");
            that.btnOk.on("click",
                function(e) {
                    e.preventDefault();
                    var res = false;
                    if (that.field.length) {
                        if (that.option.required == true && !that.field.val().length) {
                            that.field.addClass("is-invalid");
                            return false
                        } else {
                            that.field.removeClass("is-invalid");
                            res = that.field.val()
                        }
                    } else {
                        res = true
                    }
                    if (typeof that.option.onSubmit == "function") {
                        that.option.onSubmit(res)
                    }
                    that.close()
                });
            that.btnCancel.unbind("click");
            that.btnCancel.on("click",
                function(e) {
                    e.preventDefault();
                    var res = false;
                    if (that.field.length && that.field.val().length !== 0) {
                        res = that.field.val()
                    }
                    if (typeof that.option.onCancel == "function") {
                        that.option.onCancel(res)
                    }
                    that.close()
                })
        };
        this.init = function(type, message, option, defaultValue) {
            if (ak.opening) {
                $("#alert_mask, .ak-dialog").remove()
            }
            ak.clear();
            that.option = ak.getOptions(option);
            $("body").append(ak.getTeplate(type, message, that.option) + "<div id='alert_mask' class=\"ak-mask\"></div> ");
            that.container = $("body").find(".ak-dialog");
            $("#alert_mask").bind({
                touchmove: function(e) {
                    e.preventDefault()
                }
            });
            that.container.bind({
                touchmove: function(e) {
                    e.preventDefault()
                }
            });
            $("#ak-scrollview").removeClass("scrolling_touch");
            that.btnOk = that.container.find(".button_ok");
            that.btnCancel = that.container.find(".button_cancel");
            if (option.inputbox == "textarea") {
                that.field = that.container.find("textarea")
            } else {
                that.field = that.container.find("input")
            }
            if (option.placeholder) {
                that.field.attr("placeholder", option.placeholder);
                var placeholder_tmps = "";
                that.field.focus(function() {
                    placeholder_tmps = $(this).attr("placeholder");
                    if ($(this)[0].type != "search") {
                        $(this).removeAttr("placeholder")
                    }
                    $(this).blur(function() {
                        $(this).attr("placeholder", placeholder_tmps)
                    })
                })
            }
            that.field.parents(".ak-dialog_content").children("p").addClass("ak-input_title");
            that.field.addClass(option.inputClass);
            if (defaultValue && that.field.length) {
                that.field.val(defaultValue)
            }
            that.container.addClass("ak-is_active").css({
                "top": ($(window).height() / 2) - (that.container.height() / 2)
            });
            if (that.option.animateIn) {
                that.container.find(".ak-dialog_container").addClass("animated " + that.option.animateIn)
            }
            ak.opening = true;
            that.addEvents()
        }
    };
    ak.getOptions = function(option) {
        var o = $.extend({}, ak.defaults);
        if (typeof option == "object") {
            $.each(option, function(key, val) {
                o[key] !== undefined ? o[key] = val: console.error('The option "' + key + '" not exist.')
            });
        }
        return o
    };
    var isIE = function() {
        var U = navigator.userAgent,
            IsIE = U.indexOf("MSIE") > -1,
            a = IsIE ? /\d+/.exec(U.split(";")[1]) : "no ie";
        return a <= 8
    } ();
    if (!isIE) {
        alert = function(message, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("alert", message, userOptions)
        };
        confirm = function(message, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("confirm", message, userOptions)
        };
        prompt = function(message, defaultValue, userOptions) {
            var message = message || "";
            var userOptions = userOptions || {};
            var dialog = new ak.Dialog;
            dialog.init("prompt", message, userOptions, defaultValue)
        }
    }
    AKjs_Dialog.alert = function(message, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("alert", message, userOptions)
    };
    AKjs_Dialog.confirm = function(message, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("confirm", message, userOptions)
    };
    AKjs_Dialog.prompt = function(message, defaultValue, userOptions) {
        var message = message || "";
        var userOptions = userOptions || {};
        var dialog = new ak.Dialog;
        dialog.init("prompt", message, userOptions, defaultValue)
    };
    AKjs_Dialog.config = function(option) {
        if (typeof option !== "object") {
            return false
        }
        $.each(option, function(key, val) {
            ak.defaults[key] !== undefined ? ak.defaults[key] = val: console.error('The option "' + key + '" not exist.')
        });
    };
    $ak = AKjs_Dialog;
} (jQuery));