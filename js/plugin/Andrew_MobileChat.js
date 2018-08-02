/*
Modification Date: 2018-08-02
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_MobileChat--------------------------------------------*/
(function($){
    $.fn.Andrew_MobileChat = function(setting) {
        var option = $.extend({
                chat_optDom: "",
                chat_optHeight: "8em",
                chat_auto: "",
                chat_portrait_me: "",
                chat_portrait_you: "",
                chat_name_me: "",
                chat_name_you: "",
                chatcallback: function() {},
                optcallback: function() {}
            },
            setting);
        var $chat_plugin = $(this);
        if ($chat_plugin.find("button[type='submit']").length < 1) {
            $chat_plugin.find("button[type='button']").before("<button class=\"dis_none_im\" type=\"submit\" />");
        }
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
            if ($chat_plugin.next().hasClass("dis_none")) {
                ChatOption_show();//展开更多功能
            } else {
                ChatOption_hide();//隐藏更多功能
            }
        });
        $chat_plugin.find("button[type='submit']").click(function (e) {
            e.preventDefault();
            if ($(this).prev("input").prop("value").length > 0) {
                var chat_str = $(this).prev("input").prop("value"); //获取实时的输入的消息

                //您的聊天元素设置
                var chat_view_me = "<li class=\"ovh mt_1em\">\n" +
                    "            <dl class=\"ak-chat_right\">\n" +
                    "                <dt>\n" +
                    "                    <figure class=\"wh_3em bg_gray_f5f bor_rad_50 border bor_gray_ddd img_auto\"><img src="+option.chat_portrait_me+" class=\"defer_none\"></figure>\n" +
                    "                    <span class=\"center text_08em c_gray_777 text_al_c\">"+option.chat_name_me+"</span>\n" +
                    "                </dt>\n" +
                    "                <dd class=\"border bg_title bor_title c_white\">"+chat_str+"</dd>\n" +
                    "            </dl>\n" +
                    "        </li>";

                //对方的聊天元素设置
                var chat_view_you = "<li class=\"ovh mt_1em\">\n" +
                    "            <dl class=\"ak-chat_left\">\n" +
                    "                <dt>\n" +
                    "                    <figure class=\"wh_3em bg_gray_f5f bor_rad_50 border bor_gray_ddd img_auto\"><img src="+option.chat_portrait_you+" class=\"defer_none\"></figure>\n" +
                    "                    <span class=\"center text_08em c_gray_777 text_al_c\">"+option.chat_name_you+"</span>\n" +
                    "                </dt>\n" +
                    "                <dd>"+option.chat_auto+"</dd>\n" +
                    "            </dl>\n" +
                    "        </li>";

                var scrollHeight = $("#ak-main").prop("scrollHeight"); //获取实时变化的main元素的高度

                $(chat_view_me).appendTo($chat_plugin.children("ul")); //生成您的聊天元素
                $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部

                setTimeout(function() { //对方的聊天内容延迟执行
                    $(chat_view_you).appendTo($chat_plugin.children("ul")); //生成对方的聊天元素
                    $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                },100);

                $(this).prev("input").val(""); //发送消息后输入框的文字自动清空
            }
        });

        function ChatOption_show() { //展开更多功能的方法
            $("footer").children().addClass("h_au");
            $chat_plugin.next().removeClass("dis_none").animate({
                "height": option.chat_optHeight
            },200);
            setTimeout(function() {
                $("main").css({
                    "height": $(window).height() - $("header").outerHeight() - $("footer").outerHeight(),
                    "margin-bottom": $("footer").outerHeight()
                });
                var scrollHeight = $("#ak-main").prop("scrollHeight");
                $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                setTimeout(function() {
                    $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                },100);
                option.optcallback($(option.chat_optDom),true);
            },200);
        }

        function ChatOption_hide() { //隐藏更多功能的方法
            $chat_plugin.next().animate({
                "height": 0
            },200);
            setTimeout(function() {
                $("footer").children().removeClass("h_au");
                $chat_plugin.next().addClass("dis_none");
                $("main").css({
                    "height": $(window).height() - $("header").outerHeight() - $("footer").outerHeight(),
                    "margin-bottom": $("footer").outerHeight()
                });
                var scrollHeight = $("#ak-main").prop("scrollHeight");
                $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                setTimeout(function() {
                    $("#ak-main").scrollTop(scrollHeight); //发送消息后让滚动调自动滚到最底部
                },100);
                option.optcallback($(option.chat_optDom),false);
            },200);
        }
    };
}(jQuery));
