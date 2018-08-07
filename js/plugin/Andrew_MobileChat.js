/*
Modification Date: 2018-08-07
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_MobileChat--------------------------------------------*/
(function($){
    $.fn.Andrew_MobileChat = function(setting) {
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
        var scrollHeight = $("#ak-main").prop("scrollHeight");
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
        $("#ak-main").click(function () {
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
                var scrollHeight = $("#ak-main").prop("scrollHeight"); //获取实时变化的main元素的高度
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
                $("main").css({
                    "height": $(window).height() - $("header").outerHeight() - $("footer").outerHeight(),
                    "margin-bottom": $("footer").outerHeight()
                });
                option.optcallback($(option.chat_optDom),true);
                var scrollHeight = $("#ak-main").prop("scrollHeight");
                $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                setTimeout(function() {
                    $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                },100);
                $chat_plugin.find("input").on('focus', function() {
                    ChatOption_hide();
                });
            },200);
        }

        function ChatOption_hide() { //隐藏更多功能的方法
            $(option.chat_optDom).animate({
                "height": 0
            },200);
            setTimeout(function() {
                $("footer").children().removeClass("h_au");
                $(option.chat_optDom).addClass("dis_none");
                $("main").css({
                    "height": $(window).height() - $("header").outerHeight() - $("footer").outerHeight(),
                    "margin-bottom": $("footer").outerHeight()
                });
                option.optcallback($(option.chat_optDom),false);
                var scrollHeight = $("#ak-main").prop("scrollHeight");
                $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                setTimeout(function() {
                    $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                },100);
            },200);
        }
    };
}(jQuery));