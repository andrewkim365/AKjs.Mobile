/*-----------------------------------------------Andrew_Template-------------------------------------------*/
(function($) {
    function c(B, A, D, E) {
        var C = {
            data: E || (E === 0 || E === false) ? E: (A ? A.data: {}),
            _wrap: A ? A._wrap: null,
            tmpl: null,
            parent: A || null,
            nodes: [],
            calls: e,
            nest: d,
            wrap: n,
            html: r,
            update: z
        };
        if (B) {
            $.extend(C, B, {
                nodes: [],
                parent: A
            })
        }
        if (D) {
            C.Andrew_Template = D;
            C._ctnt = C._ctnt || $.isFunction(C.Andrew_Template) && C.Andrew_Template($, C) || D;
            C.key = ++x; (j.length ? h: y)[x] = C
        }
        return C
    }
    $.fn.extend({
        Andrew_Template: function(D, C, A) {
            var ele = $(this[0]);
            ele.addClass("ak-for");
            var B = $.Andrew_Template(this[0], D, C, A).appendTo($(this[0]));
            setTimeout(function() {
                ele.removeClass("ak-for");
                $(B).eq(0).prev().remove();
            },100);
            return B
        },
        Template_Item: function() {
            var A = $.Template_Item(this[0]);
            return A
        },
        template: function(B) {
            var A = $.template(B, this[0]);
            return A
        },
        domManip: function(D, H, G, I) {
            if (D[0] && $.isArray(D[0])) {
                var B = $.makeArray(arguments),
                    A = D[0],
                    F = A.length,
                    C = 0,
                    E;
                while (C < F && !(E = $.data(A[C++], "Template_Item"))) {}
                if (E && q) {
                    B[2] = function(J) {
                        $.Andrew_Template.afterManip(this, J, G)
                    }
                }
                v.apply(this, B)
            } else {
                v.apply(this, arguments)
            }
            q = 0;
            if (!o) {
                $.Andrew_Template.complete(y)
            }
            return this
        }
    });
    $.extend({
        Andrew_Template: function(F, E, D, B) {
            var C, A = !B;
            if (A) {
                B = p;
                F = $.template[F] || $.template(null, F);
                h = {}
            } else {
                if (!F) {
                    F = B.Andrew_Template;
                    y[B.key] = B;
                    B.nodes = [];
                    if (B.wrapped) {
                        t(B, B.wrapped)
                    }
                    return $(m(B, null, B.Andrew_Template($, B)))
                }
            }
            if (!F) {
                return []
            }
            if (typeof E === "function") {
                E = E.call(B || {})
            }
            if (D && D.wrapped) {
                t(D, D.wrapped)
            }
            C = $.isArray(E) ? $.map(E,
                function(G) {
                    return G ? c(D, B, F, G) : null
                }) : [c(D, B, F, E)];
            return A ? $(m(B, null, C)) : C
        },
        Template_Item: function(B) {
            var A;
            if (B instanceof $) {
                B = B[0]
            }
            while (B && B.nodeType === 1 && !(A = $.data(B, "Template_Item")) && (B = B.parentNode)) {}
            return A || p
        },
        template: function(A, B) {
            if (B) {
                if (typeof B === "string") {
                    B = k(B)
                } else {
                    if (B instanceof $) {
                        B = B[0] || {}
                    }
                }
                if (B.nodeType) {
                    B = $.data(B, "Andrew_Template") || $.data(B, "Andrew_Template", k(B.innerHTML))
                }
                return typeof A === "string" ? ($.template[A] = B) : B
            }
            return A ? (typeof A !== "string" ? $.template(null, A) : ($.template[A] || $.template(null, A))) : null
        },
        encode: function(A) {
            return ("" + A).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    });
    $.extend($.Andrew_Template, {
        tag: {
            "tmpl": {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
            },
            "wrap": {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(__,$1,$2);__=[];",
                close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
            },
            "each": {
                _default: {
                    $2: "$index, $value"
                },
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
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){__.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function(A) {
            y = {}
        },
        afterManip: function w(C, A, D) {
            var B = A.nodeType === 11 ? $.makeArray(A.childNodes) : A.nodeType === 1 ? [A] : [];
            D.call(C, A);
            s(B);
            q++
        }
    });
    var v = $.fn.domManip,
        u = "",
        y = {},
        h = {},
        o, p = {
            key: 0,
            data: {}
        },
        x = 0,
        q = 0,
        j = [];
    var b = {
        sq_escape: /([\\'])/g,
        sq_unescape: /\\'/g,
        dq_unescape: /\\\\/g,
        nl_strip: /[\r\t\n]/g,
        shortcut_replace: /\$\{([^\}]*)\}/g,
        lang_parse: /\{\%(\/?)(\w+|.)(?:\(((?:[^\%]|\%(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\%]|\%(?!\}))*?)\))?\s*\%\}/g,
        old_lang_parse: /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
        template_anotate: /(<\w+)(?=[\s>])(?![^>]*Template_item)([^>]*)/g,
        text_only_template: /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
        html_expr: /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! |\{\%! /,
        last_word: /\w$/
    };
    function m(A, E, C) {
        var u = "ak-for";
        var D, B = C ? $.map(C,
            function(F) {
                return (typeof F === "string") ? (A.key ? F.replace(b.template_anotate, "$1 " + u + '="' + A.key + '" $2') : F) : m(F, A, F._ctnt)
            }) : A;
        if (E) {
            return B
        }
        B = B.join("");
        B.replace(b.text_only_template,
            function(G, H, F, I) {
                D = $(F).get();
                s(D);
                if (H) {
                    D = a(H).concat(D)
                }
                if (I) {
                    D = D.concat(a(I))
                }
            });
        return D ? D: a(B)
    }
    function k(C) {
        var B = function(M, G, K, H, I, N, J) {
            if (!K) {
                return "');__.push('"
            }
            var P = $.Andrew_Template.tag[K],
                F,
                L,
                O;
            if (!P) {
                return "');__.push('"
            }
            F = P._default || [];
            if (N && !b.last_word.test(I)) {
                I += N;
                N = ""
            }
            if (I) {
                I = l(I);
                J = J ? ("," + l(J) + ")") : (N ? ")": "");
                L = N ? (I.indexOf(".") > -1 ? I + l(N) : ("(" + I + ").call($item" + J)) : I;
                O = N ? L: "(typeof(" + I + ")==='function'?(" + I + ").call($item):(" + I + "))"
            } else {
                O = L = F.$1 || "null"
            }
            H = l(H);
            return "');" + P[G ? "close": "open"].split("$notnull_1").join(I ? "typeof(" + I + ")!=='undefined' && (" + I + ")!=null": "true").split("$1a").join(O).split("$1").join(L).split("$2").join(H || F.$2 || "") + "__.push('"
        };
        var D = function() {
            if ($.Andrew_Template.tag[arguments[2]]) {
                return B.apply(this, arguments)
            } else {
                return "');__.push('{{" + arguments[2] + "}}');__.push('"
            }
        };
        var A = "var $=$,call,__=[],$data=$item.data; with($data){__.push('";
        var E = $.trim(C);
        E = E.replace(b.sq_escape, "\\$1");
        E = E.replace(b.nl_strip, " ");
        E = E.replace(b.shortcut_replace, "{%= $1%}");
        E = E.replace(b.lang_parse, B);
        E = E.replace(b.old_lang_parse, D);
        A += E;
        A += "');}return __;";
        return new Function("$", "$item", A)
    }
    function l(A) {
        return A ? A.replace(b.sq_unescape, "'").replace(b.dq_unescape, "\\") : null
    }
    function s(G) {
        function H(O) {
            var L, N = O,
                M, J, K;
            if ((K = O.getAttribute(u))) {
                while (N.parentNode && (N = N.parentNode).nodeType === 1 && !(L = N.getAttribute(u))) {}
                if (L !== K) {
                    N = N.parentNode ? (N.nodeType === 11 ? 0 : (N.getAttribute(u) || 0)) : 0;
                    if (! (J = y[K])) {
                        J = h[K];
                        J = c(J, y[N] || h[N]);
                        J.key = ++x;
                        y[x] = J
                    }
                    if (q) {
                        P(K)
                    }
                }
                O.removeAttribute(u)
            } else {
                if (q && (J = $.data(O, "Template_Item"))) {
                    P(J.key);
                    y[J.key] = J;
                    N = $.data(O.parentNode, "Template_Item");
                    N = N ? N.key: 0
                }
            }
            if (J) {
                M = J;
                while (M && M.key != N) {
                    M.nodes.push(O);
                    M = M.parent
                }
                delete J._ctnt;
                delete J._wrap;
                $.data(O, "Template_Item", J)
            }
            function P(Q) {
                Q = Q + I;
                J = E[Q] = (E[Q] || c(J, y[J.parent.key + I] || J.parent))
            }
        }
    }
    function e(B, D, C, A) {
        if (!B) {
            return j.pop()
        }
        j.push({
            _: B,
            Andrew_Template: D,
            item: this,
            data: C,
            options: A
        })
    }
    function d(C, B, A) {
        return $.Andrew_Template($.template(C), B, A, this)
    }
    function n(C, A) {
        var B = C.options || {};
        B.wrapped = A;
        return $.Andrew_Template($.template(C.Andrew_Template), C.data, B, C.item)
    }
    function r(B, C) {
        var A = this._wrap;
        return $.map($($.isArray(A) ? A.join("") : A).filter(B || "*"),
            function(D) {
                return C ? D.innerText || D.textContent: D.outerHTML || f(D)
            })
    }
    function z() {
        var A = this.nodes;
    }
})(jQuery);