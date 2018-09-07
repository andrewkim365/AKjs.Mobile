/*
Modification Date: 2018-09-07
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_MobileChat--------------------------------------------*/
(function($){
    $.fn.AKjs_MobileChat = function(setting) {
        var option = $.extend({
                chat_view: "",
                chat_optDom: "",
                chat_optHeight: "8em",
                callback: function() {},
                chatcallback: function() {},
                btncallback: function() {},
                optcallback: function() {}
            },
            setting);
        var $chat_plugin = $(this);
        if ($chat_plugin.find("button[type='submit']").length < 1) {
            $chat_plugin.find("button[type='button']").before("<button class=\"dis_none_im\" type=\"submit\" />");
        }
        $(option.chat_view).addClass("ak-chat");
        var container = $(option.chat_view).children("ul");
        var scrollHeight = $("#ak-scrollview").prop("scrollHeight");
        option.callback($chat_plugin,container,scrollHeight);
        $chat_plugin.find("input").on("input propertychange", function(e){
            e.preventDefault();
            if ($(this).prop("value").length > 0) {
                //console.log($(this).prop("value")) //实时监听输入框值的变化
                option.chatcallback($chat_plugin,$(this).prop("value"))
            }
            $(document).keyup(function (event) {
                var keycode = event.which;
                if (keycode == 13) {
                    $chat_plugin.find("button[type='submit']").click();
                }
            });
        });
        $("#ak-scrollview").click(function () {
            ChatOption_hide();//隐藏更多功能
        });
        $chat_plugin.find("button[type='button']").click(function () {
            if ($(option.chat_optDom).hasClass("dis_none")) {
                ChatOption_show();//展开更多功能
            } else {
                ChatOption_hide();//隐藏更多功能
            }
        });
        $chat_plugin.find("button[type='submit']").click(function (e) {
            e.preventDefault();
            if ($(this).prev("input").prop("value").length > 0) {
                var chat_str = $(this).prev("input").prop("value"); //获取实时的输入的消息
                var scrollHeight = $("#ak-scrollview").prop("scrollHeight"); //获取实时变化的main元素的高度
                option.btncallback(chat_str,container,scrollHeight);
                $(this).prev("input").val(""); //发送消息后输入框的文字自动清空
            }
        });

        function ChatOption_show() { //展开更多功能的方法
            $("footer").children().addClass("h_au");
            $(option.chat_optDom).removeClass("dis_none").animate({
                "height": option.chat_optHeight
            },200);
            setTimeout(function() {
                ChatCssSetting();
            },200);
            $(function() {
                option.optcallback($(option.chat_optDom),true);
                $chat_plugin.find("input").on('focus', function() {
                    ChatOption_hide();
                });
            });
        }

        function ChatOption_hide() { //隐藏更多功能的方法
            $(option.chat_optDom).animate({
                "height": 0
            },200);
            setTimeout(function() {
                ChatCssSetting();
            },200);
            $(function() {
                $("footer").children().removeClass("h_au");
                $(option.chat_optDom).addClass("dis_none");
                option.optcallback($(option.chat_optDom),false);
            });
        }
        function ChatCssSetting() {
            if ($("header").not("aside header").hasClass("dis_none_im") || $("header").not("aside header").length === 0) {
                var header_h = 0;
            } else {
                var header_h = $("header").prop("clientHeight");
            }
            if ($("footer").not("aside footer").hasClass("dis_none_im") || $("footer").not("aside footer").length === 0) {
                var footer_h = 0;
            } else {
                var footer_h = $("footer").children().prop("clientHeight");
            }
            $("main").css({
                "height": $(window).height() - header_h - footer_h,
                "margin-bottom": footer_h
            });
            $("#ak-scrollview").css({
                "height": $(window).height() - $("#ak-scrollview").offset().top - footer_h
            });
            var scrollHeight = $("#ak-scrollview").prop("scrollHeight");
            $("#ak-scrollview").scrollTop(scrollHeight);
        }
    };
}(jQuery));