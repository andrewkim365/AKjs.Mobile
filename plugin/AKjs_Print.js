/*
Modification Date: 2018-09-06
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_Print-------------------------------------------*/
(function($) {
    $.AKjs_Print = $.fn.AKjs_Print = function() {
        var options, $this, self = this;
        if (self instanceof $) {
            self = self.get(0);
        }
        if (PrintIsNode(self)) {
            $this = $(self);
            if (arguments.length > 0) {
                options = arguments[0];
            }
        } else {
            if (arguments.length > 0) {
                $this = $(arguments[0]);
                if (PrintIsNode($this[0])) {
                    if (arguments.length > 1) {
                        options = arguments[1];
                    }
                } else {
                    options = arguments[0];
                    $this = $("html");
                }
            } else {
                $this = $("html");
            }
        }
        var defaults = {
            iframe: false,
            noPrint: "",
            deferred: $.Deferred()
        };
        options = $.extend({},
            defaults, (options || {}));
        var $styles = $("style, link, meta, title, script");
        var copy = $this.clone();
        copy = $("<span/>").append(copy);
        copy.find(options.noPrint).remove();
        $(".ak-Loader").remove();
        $(".ak-mask").remove();
        copy.append($styles.clone());
        var content = copy.html();
        copy.remove();
        if (options.iframe) {
            try {
                var $iframe = $(options.iframe + "");
                var iframeCount = $iframe.length;
                if (iframeCount === 0) {
                    $iframe = $('<iframe height="0" width="0" frameborder="0" name="Opaque"/>').prependTo('body').css({
                        "position": "absolute",
                        "top": -999,
                        "left": -999
                    });
                }
                var w, wdoc;
                w = $iframe.get(0);
                w = w.contentWindow || w.contentDocument || w;
                wdoc = w.document || w.contentDocument || w;
                wdoc.open();
                wdoc.write(content);
                wdoc.close();
                PrintFrame(w).done(function() {
                    setTimeout(function() {
                        if (iframeCount === 0) {
                            $iframe.remove();
                        }
                    }, 100);
                }).fail(function(err) {
                    console.error("Failed to print from iframe", err);
                    PrintContentInNewWindow(content);
                }).always(function() {
                    try {
                        options.deferred.resolve();
                    } catch(err) {
                        console.warn('Error notifying deferred', err);
                    }
                });
            } catch(e) {
                console.error("Failed to print from iframe", e.stack, e.message);
                PrintContentInNewWindow(content).always(function() {
                    try {
                        options.deferred.resolve();
                    } catch(err) {
                        console.warn('Error notifying deferred', err);
                    }
                });
            }
        } else {
            PrintContentInNewWindow(content).always(function() {
                try {
                    options.deferred.resolve();
                } catch(err) {
                    console.warn('Error notifying deferred', err);
                }
            });
        }
        return this;
    };
    function PrintFrame(frameWindow) {
        var def = $.Deferred();
        try {
            setTimeout(function() {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand('AKjs_Print', false, null)) {
                        frameWindow.print();
                    }
                } catch(e) {
                    frameWindow.print();
                }
                frameWindow.close();
                def.resolve();
            }, 250);
        } catch(err) {
            def.reject(err);
        }
        return def;
    }
    function PrintContentInNewWindow(content) {
        var w = window.open();
        w.document.write(content);
        w.document.close();
        return PrintFrame(w);
    }
    function PrintIsNode(o) {
        return !! (typeof Node === "object" ? o instanceof Node: o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }
})(jQuery);