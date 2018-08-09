/*
Modification Date: 2018-08-09
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
(function($, undefined) {
    var oldManip = $.fn.domManip, AKjs_TemplateItmAtt = "_Template_Item",
        newTemplate_Items = {}, wrappedItems = {}, appendToTemplate_Items, topTemplate_Item = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];
    var regex = {
        sq_escape: /([\\'])/g,
        sq_unescape: /\\'/g,
        dq_unescape: /\\\\/g,
        nl_strip: /[\r\t\n]/g,
        shortcut_replace: /\$\{([^\}]*)\}/g,
        lang_parse: /\{\%(\/?)(\w+|.)(?:\(((?:[^\%]|\%(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\%]|\%(?!\}))*?)\))?\s*\%\}/g,
        old_lang_parse: /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
        template_anotate: /(<\w+)(?=[\s>])(?![^>]*_Template_Item)([^>]*)/g,
        text_only_template: /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
        html_expr: /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! |\{\%! /,
        last_word: /\w$/
    };

    function newTemplate_Item(options, parentItem, fn, data) {
        var newItem = {
            data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
            _wrap: parentItem ? parentItem._wrap : null,
            AKjs_Template: null,
            parent: parentItem || null,
            nodes: [],
            calls: tiCalls,
            nest: tiNest,
            wrap: tiWrap,
            html: tiHtml,
            update: tiUpdate
        };
        if(options) {
            $.extend(newItem, options, { nodes: [], parent: parentItem });
        }
        if(fn) {
            newItem.AKjs_Template = fn;
            newItem._ctnt = newItem._ctnt || $.isFunction(newItem.AKjs_Template) && newItem.AKjs_Template($, newItem) || fn;
            newItem.key = ++itemKey;
            (stack.length ? wrappedItems : newTemplate_Items)[itemKey] = newItem;
        }
        return newItem;
    }
    $.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        $.fn[ name ] = function(selector) {
            var ret = [], insert = $(selector), elems, i, l, Template_Items,
                parent = this.length === 1 && this[0].parentNode;

            appendToTemplate_Items = newTemplate_Items || {};
            if(parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[ original ](this[0]);
                ret = this;
            } else {
                for(i = 0,l = insert.length; i < l; i++) {
                    cloneIndex = i;
                    elems = (i > 0 ? this.clone(true) : this).get();
                    $(insert[i])[ original ](elems);
                    ret = ret.concat(elems);
                }
                cloneIndex = 0;
                ret = this.pushStack(ret, name, insert.selector);
            }
            Template_Items = appendToTemplate_Items;
            appendToTemplate_Items = null;
            $.AKjs_Template.complete(Template_Items);
            return ret;
        };
    });

    $.fn.extend({
        AKjs_Template: function(data, options, parentItem) {
            var ele = $(this[0]);
            ele.addClass("ak-for");
            var ret = $.AKjs_Template(this[0], data, options, parentItem).appendTo($(this[0]));
            setTimeout(function() {
                ele.removeClass("ak-for");
                $(ret).eq(0).prev().remove();
            },100);
            return ret
        },
        Template_Item: function() {
            var ret = $.Template_Item(this[0]);
            return ret;
        },
        template: function(name) {
            var ret = $.template(name, this[0]);
            return ret;
        },

        domManip: function(args, table, callback, options) {
            if(args[0] && $.isArray(args[0])) {
                var dmArgs = $.makeArray(arguments), elems = args[0], elemsLength = elems.length, i = 0, Template_Item;
                while(i < elemsLength && !(Template_Item = $.data(elems[i++], "Template_Item"))) {
                }
                if(Template_Item && cloneIndex) {
                    dmArgs[2] = function(fragClone) {
                        $.AKjs_Template.afterManip(this, fragClone, callback);
                    };
                }
                oldManip.apply(this, dmArgs);
            } else {
                oldManip.apply(this, arguments);
            }
            cloneIndex = 0;
            if(!appendToTemplate_Items) {
                $.AKjs_Template.complete(newTemplate_Items);
            }
            return this;
        }
    });

    $.extend({
        AKjs_Template: function(AKjs_Template, data, options, parentItem) {
            var ret, topLevel = !parentItem;
            if(topLevel) {
                parentItem = topTemplate_Item;
                AKjs_Template = $.template[AKjs_Template] || $.template(null, AKjs_Template);
                wrappedItems = {};
            } else if(!AKjs_Template) {
                AKjs_Template = parentItem.AKjs_Template;
                newTemplate_Items[parentItem.key] = parentItem;
                parentItem.nodes = [];
                if(parentItem.wrapped) {
                    updateWrapped(parentItem, parentItem.wrapped);
                }
                return $(build(parentItem, null, parentItem.AKjs_Template($, parentItem)));
            }
            if(!AKjs_Template) {
                return [];
            }
            if(typeof data === "function") {
                data = data.call(parentItem || {});
            }
            if(options && options.wrapped) {
                updateWrapped(options, options.wrapped);
            }
            ret = $.isArray(data) ?
                $.map(data, function(dataItem) {
                    return dataItem ? newTemplate_Item(options, parentItem, AKjs_Template, dataItem) : null;
                }) :
                [ newTemplate_Item(options, parentItem, AKjs_Template, data) ];
            return topLevel ? $(build(parentItem, null, ret)) : ret;
        },
        Template_Item: function(elem) {
            var Template_Item;
            if(elem instanceof $) {
                elem = elem[0];
            }
            while(elem && elem.nodeType === 1 && !(Template_Item = $.data(elem,
                "Template_Item")) && (elem = elem.parentNode)) {
            }
            return Template_Item || topTemplate_Item;
        },
        template: function(name, AKjs_Template) {
            if(AKjs_Template) {
                if(typeof AKjs_Template === "string") {
                    AKjs_Template = buildAKjs_TemplateFn(AKjs_Template)
                } else if(AKjs_Template instanceof $) {
                    AKjs_Template = AKjs_Template[0] || {};
                }
                if(AKjs_Template.nodeType) {
                    AKjs_Template = $.data(AKjs_Template, "AKjs_Template") || $.data(AKjs_Template, "AKjs_Template", buildAKjs_TemplateFn(AKjs_Template.innerHTML));
                }
                return typeof name === "string" ? ($.template[name] = AKjs_Template) : AKjs_Template;
            }
            return name ? (typeof name !== "string" ? $.template(null, name) :
                ($.template[name] || $.template(null, name))) : null;
        },

        encode: function(text) {
            return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
        }
    });

    $.extend($.AKjs_Template, {
        tag: {
            "AKjs_Template": {
                _default: { $2: "null" },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            "wrap": {
                _default: { $2: "null" },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            "each": {
                _default: { $2: "$index, $value" },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                open: "}else{"
            },
            "elif": {
                open: "}else if(($notnull_1) && $1a){"
            },
            "elseif": {
                open: "}else if(($notnull_1) && $1a){"
            },
            "html": {
                open: "if($notnull_1){__.push($1a);}"
            },
            "=": {
                _default: { $1: "$data" },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function(items) {
            newTemplate_Items = {};
        },
        afterManip: function afterManip(elem, fragClone, callback) {
            var content = fragClone.nodeType === 11 ?
                $.makeArray(fragClone.childNodes) :
                fragClone.nodeType === 1 ? [fragClone] : [];
            callback.call(elem, fragClone);
            storeTemplate_Items(content);
            cloneIndex++;
        }
    });
    function build(Template_Item, nested, content) {
        var frag, ret = content ? $.map(content, function(item) {
            return (typeof item === "string") ? (Template_Item.key ? item.replace(regex.template_anotate, "$1 " + AKjs_TemplateItmAtt + "=\"" + Template_Item.key + "\" $2") : item) : build(item, Template_Item, item._ctnt);
        }) : Template_Item;
        if(nested) {
            return ret;
        }
        ret = ret.join("");
        ret.replace(regex.text_only_template, function(all, before, middle, after) {
            frag = $(middle).get();

            storeTemplate_Items(frag);
            if(before) {
                frag = unencode(before).concat(frag);
            }
            if(after) {
                frag = frag.concat(unencode(after));
            }
        });
        return frag ? frag : unencode(ret);
    }

    function unencode(text) {
        var el = document.createElement("div");
        el.innerHTML = text;
        return $.makeArray(el.childNodes);
    }
    function buildAKjs_TemplateFn(markup) {
        var parse_tag = function(all, slash, type, fnargs, target, parens, args) {
            if(!type) {
                return "');__.push('";
            }

            var tag = $.AKjs_Template.tag[ type ], def, expr, exprAutoFnDetect;
            if(!tag && window.console && console.group) {
                //console.group("Exception");
                //console.error(markup);
                //console.error('Unknown tag: ', type);
                //console.error(all);
                //console.groupEnd("Exception");
            }
            if(!tag) {
                return "');__.push('";
            }
            def = tag._default || [];
            if(parens && !regex.last_word.test(target)) {
                target += parens;
                parens = "";
            }
            if(target) {
                target = unescape(target);
                args = args ? ("," + unescape(args) + ")") : (parens ? ")" : "");
                expr = parens ? (target.indexOf(".") > -1 ? target + unescape(parens) : ("(" + target + ").call($item" + args)) : target;
                exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
            } else {
                exprAutoFnDetect = expr = def.$1 || "null";
            }
            fnargs = unescape(fnargs);
            return "');" +
                tag[ slash ? "close" : "open" ]
                    .split("$notnull_1").join(target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true")
                    .split("$1a").join(exprAutoFnDetect)
                    .split("$1").join(expr)
                    .split("$2").join(fnargs || def.$2 || "") +
                "__.push('";
        };

        var depreciated_parse = function() {
            if($.AKjs_Template.tag[arguments[2]]) {
                //console.group("Depreciated");
                //console.info(markup);
                //console.info('Markup has old style indicators, use {% %} instead of {{ }}');
                //console.info(arguments[0]);
                //console.groupEnd("Depreciated");
                return parse_tag.apply(this, arguments);
            } else {
                return "');__.push('{{" + arguments[2] + "}}');__.push('";
            }
        };
        var parsed_markup_data = "var $=$,call,__=[],$data=$item.data; with($data){__.push('";
        var parsed_markup = $.trim(markup);
        parsed_markup = parsed_markup.replace(regex.sq_escape, "\\$1");
        parsed_markup = parsed_markup.replace(regex.nl_strip, " ");
        parsed_markup = parsed_markup.replace(regex.shortcut_replace, "{%= $1%}");
        parsed_markup = parsed_markup.replace(regex.lang_parse,  parse_tag);
        parsed_markup = parsed_markup.replace(regex.old_lang_parse, depreciated_parse);
        parsed_markup_data += parsed_markup;
        parsed_markup_data += "');}return __;";
        return new Function("$", "$item", parsed_markup_data);
    }
    function updateWrapped(options, wrapped) {
        options._wrap = build(options, true,
            $.isArray(wrapped) ? wrapped : [regex.html_expr.test(wrapped) ? wrapped : $(wrapped).html()]
        ).join("");
    }
    function unescape(args) {
        return args ? args.replace(regex.sq_unescape, "'").replace(regex.dq_unescape, "\\") : null;
    }
    function outerHtml(elem) {
        var div = document.createElement("div");
        div.appendChild(elem.cloneNode(true));
        return div.innerHTML;
    }
    function storeTemplate_Items(content) {
        var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
        for(i = 0,l = content.length; i < l; i++) {
            if((elem = content[i]).nodeType !== 1) {
                continue;
            }
            elems = elem.getElementsByTagName("*");
            for(m = elems.length - 1; m >= 0; m--) {
                processItemKey(elems[m]);
            }
            processItemKey(elem);
        }
        function processItemKey(el) {
            var pntKey, pntNode = el, pntItem, Template_Item, key;
            if((key = el.getAttribute(AKjs_TemplateItmAtt))) {
                while(pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute(AKjs_TemplateItmAtt))) {
                }
                if(pntKey !== key) {
                    pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute(AKjs_TemplateItmAtt) || 0)) : 0;
                    if(!(Template_Item = newTemplate_Items[key])) {
                        Template_Item = wrappedItems[key];
                        Template_Item = newTemplate_Item(Template_Item, newTemplate_Items[pntNode] || wrappedItems[pntNode]);
                        Template_Item.key = ++itemKey;
                        newTemplate_Items[itemKey] = Template_Item;
                    }
                    if(cloneIndex) {
                        cloneTemplate_Item(key);
                    }
                }
                el.removeAttribute(AKjs_TemplateItmAtt);
            } else if(cloneIndex && (Template_Item = $.data(el, "Template_Item"))) {
                cloneTemplate_Item(Template_Item.key);
                newTemplate_Items[Template_Item.key] = Template_Item;
                pntNode = $.data(el.parentNode, "Template_Item");
                pntNode = pntNode ? pntNode.key : 0;
            }
            if(Template_Item) {
                pntItem = Template_Item;
                while(pntItem && pntItem.key != pntNode) {
                    pntItem.nodes.push(el);
                    pntItem = pntItem.parent;
                }
                delete Template_Item._ctnt;
                delete Template_Item._wrap;
                $.data(el, "Template_Item", Template_Item);
            }
            function cloneTemplate_Item(key) {
                key = key + keySuffix;
                Template_Item = newClonedItems[key] =
                    (newClonedItems[key] || newTemplate_Item(Template_Item,
                        newTemplate_Items[Template_Item.parent.key + keySuffix] || Template_Item.parent));
            }
        }
    }

    function tiCalls(content, AKjs_Template, data, options) {
        if(!content) {
            return stack.pop();
        }
        stack.push({ _: content, AKjs_Template: AKjs_Template, item:this, data: data, options: options });
    }

    function tiNest(AKjs_Template, data, options) {
        return $.AKjs_Template($.template(AKjs_Template), data, options, this);
    }

    function tiWrap(call, wrapped) {
        var options = call.options || {};
        options.wrapped = wrapped;
        return $.AKjs_Template($.template(call.AKjs_Template), call.data, options, call.item);
    }

    function tiHtml(filter, textOnly) {
        var wrapped = this._wrap;
        return $.map(
            $($.isArray(wrapped) ? wrapped.join("") : wrapped).filter(filter || "*"),
            function(e) {
                return textOnly ?
                    e.innerText || e.textContent :
                    e.outerHTML || outerHtml(e);
            });
    }

    function tiUpdate() {
        var coll = this.nodes;
        $.AKjs_Template(null, null, null, this).insertBefore(coll[0]);
        $(coll).remove();
    }
})(jQuery);
