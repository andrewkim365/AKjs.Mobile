/*
Modification Date: 2018-09-29
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_SelectOption-------------------------------------------*/
(function($){
    var defaluts = {
        active: "",
        boxheight: 5,
        speed: 1000,
        callback: function() {},
        clickback: function() {}
    };
    $.fn.extend({
        "AKjs_SelectOption": function(options){
            var option = $.extend({
            }, defaluts, options);
            $(this).addClass("ak-SelectOpts");
            $(window).bind('hashchange', function () {
                $(".ak-SelectList").remove();
            });
            return this.each(function(){
                var $this = $(this);
                var _html = [];
                _html.push("<section class=\"" + $this.attr('class') + "\">");
                _html.push("<var>" + $this.find(":selected").text() + "</var>");
                _html.push("<cite class='ak-SelectList scrollbar'><ul>");
                $this.children("option").each(function () {
                    var opts = $(this);
                    _html.push("<li title='"+opts.text()+"' data-value=\"" + opts.val() + "\">" + opts.text() + "</li>");
                });
                _html.push("</ul>");
                _html.push("</cite>");
                _html.push("</section>");
                var select = $(_html.join(""));
                var select_text = select.find("var");
                var select_list = select.find("cite");
                $this.after(select);
                $this.nextAll("section.ak-SelectOpts").not($this.next("section.ak-SelectOpts")).remove();
                select_list.find("li").each(function () {
                    var list = $(this);
                    if (list.data("value") == $this.find(":selected").val()) {
                        if ($this.find(":selected").val() > 0) {
                            list.addClass(option.active);
                        }
                    }
                });
                option.callback(select,select_list,$this.find(":selected").val(),select_text.text());
                AKjs_UserAgent();
                select.unbind("click");
                select.click(function (andrew) {
                    var $this_ = $(this);
                    andrew.preventDefault();
                    $(".ak-SelectList").remove();
                    if ($('#ak-scrollview').length > 0) {
                        if (select.parents("dialog")[0] != undefined) {
                            $('main').append(select_list);
                        } else {
                            $('#ak-scrollview').append(select_list);
                        }
                    } else {
                        $('body').append(select_list);
                    }
                    select_list.find("li").unbind("click");
                    select_list.on("click", "li", function () {
                        var li = $(this);
                        if (li.data("value") === 0 || li.data("value") === "") {
                            var val = li.removeClass(option.active).siblings("li").removeClass(option.active).end().data("value");
                        } else {
                            var val = li.addClass(option.active).siblings("li").removeClass(option.active).end().data("value").toString();
                        }
                        select.removeClass("ak-open");
                        select_list.slideUp(option.speed);

                        if (li.data("value") != "0" || li.data("value") != "") {
                            if ($this.attr("data-type") == "router-link") {
                                document.location.href = "#/" + li.data("value");
                            } else if ($this.attr("data-type") == "link") {
                                document.location.href = li.data("value");
                            }
                        }
                        if (val !== $this.val()) {
                            select_text.text(li.text());
                            $this.val(val);
                            $this.attr("data-value",val);
                            $this.find("option[value!='"+val+"']").removeAttr("selected");
                            $this.find("option[value='"+val+"']").attr("selected","selected");
                            $this.change();
                            option.clickback(select,select_list,val,select_text.text());
                        }
                    });
                    $(this).toggleClass("ak-open");
                    select_list_css();
                    $(window).resize(function () {
                        select_list_css();
                    });
                    function select_list_css() {
                        var this_h = $this_.outerHeight();
                        if (option.boxheight) {
                            select_list.css({
                                "width": $this_.innerWidth(),
                                "max-height": $this_.outerHeight() * option.boxheight
                            });
                        } else {
                            select_list.css({
                                "width": $this_.innerWidth(),
                                "max-height": $this_.outerHeight() * 5
                            });
                        }
                        if ($this_.offset().top + $this_.innerHeight()+ select_list.innerHeight() > $(window).height()) {
                            select_list.css({
                                "top": "auto",
                                "bottom": $("#ak-scrollview").outerHeight() - ($this_.offset().top + $('#ak-scrollview').scrollTop()) + $this_.outerHeight() + $("#ak-scrollview").offset().top - this_h -8,
                                "left": $this_.offset().left - $("#ak-scrollview").offset().left
                            });
                        } else {
                            select_list.css({
                                "bottom": "auto",
                                "left": $this_.offset().left - $("#ak-scrollview").offset().left
                            });
                            if ($('#ak-scrollview').length > 0) {
                                if (select.parents("dialog")[0] != undefined) {
                                    select_list.css({
                                        "top": $this_.offset().top -$("#ak-scrollview").offset().top + this_h
                                    });
                                } else {
                                    select_list.css({
                                        "top": $this_.offset().top + $('#ak-scrollview').scrollTop() - $("#ak-scrollview").offset().top + this_h
                                    });
                                }
                            } else {
                                select_list.css({
                                    "top": $this_.offset().top + $this_.innerHeight() + 1
                                });
                            }
                        }
                        select_list.find("li").css({
                            "height": select.outerHeight()+"px",
                            "line-height": select.outerHeight()+"px"
                        });
                    }
                    if ($(this).hasClass("ak-open")) {
                        $(".ak-SelectOpts").not(select).removeClass("ak-open");
                        $(".ak-SelectList").not(select_list).hide();
                        select_list.slideDown(option.speed);
                        select_list.animate({scrollTop:0},0);
                        $("body").unbind("click");
                        setTimeout(function() {
                            $("body").click(function () {
                                $(".ak-SelectList").slideUp(option.speed);
                                $(".ak-SelectOpts").removeClass("ak-open");
                            });
                            if ($('#ak-scrollview').length > 0) {
                                var $scrollbar = $("#ak-scrollview");
                            } else {
                                var $scrollbar = $("main");
                            }
                            $scrollbar.scroll(function(){
                                $(".ak-SelectList").slideUp(option.speed);
                                $(".ak-SelectOpts").removeClass("ak-open");
                            });
                        },option.speed);
                    } else {
                        select_list.slideUp(option.speed);
                    }
                });
            });
        }
    });
}(jQuery));