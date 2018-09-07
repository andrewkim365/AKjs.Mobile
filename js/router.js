$(document).ready(function(){
    /*-----------------------------------------------AKjs_Router (路由全局设置）使用方法-------------------------------------------*/
    AKjs_Router({ //路由配置管理
        Router: true, //是否开启路由（开启路由URL中带#的路径访问页面不刷新页面形式跳转 (开启 true, 停用 false）
        FileFormat: ".html", //路由目录中的文件格式设置,该参数设置后data-href值里可以不写文件格式 （可设置html,php,aspx,jsp...等程序的文件名）
        Parameter: false, //是否开启URL的akjs参数，启用该功能可以解决浏览器缓存问题 （开启 true, 停用 false）
        Animate: true, //是否开启切换页面时带动画效果。通过data-href跳页的方式识别（仿原生APP的页面切换效果）。 (开启 true, 停用 false）
        ErrorMsg: "很抱歉，您要访问的界面加载失败！请稍后再试。", //界面加载失败时提示的信息 （找不到相关页面或者网络环境不稳定时提示的信息）
        RouterPath: ["router","layout/main.html"], //路由目录和界面布局文件设置（第1个参数是路由目录文件夹名，第2个参数是指定整个界面布局的文件）
        startPage: "/start", //首次访问的界面您要跳转到哪个界面？
        changePage: function (hash,change) { //路由初始化调用和页面变化时的回调（公共插件引入的区域）
            if (!change) { //change是用于判断hash模式是否跳页
                AKjs_Include("js/data.js"); //Json数据文件引入（AKjs_Include是js文件中引入另一个js或css文件的功能）
                AKjs_Include("js/echarts.min.js"); //Echarts插件全局引入（AKjs_Include是js文件中引入另一个js或css文件的功能）
            }

            AKjs_Include("css/theme.default.css"); //颜色相关样式文件引入（AKjs_Include是js文件中引入另一个js或css文件的功能）
            AKjs_Include("js/plugin.js"); //功能插件按需引入（为了正常运行功能插件通过AKjs_Include方式引入）

            /*-----------------------------------------------AKjs_Menu (底部菜单图标设置Router专用）使用方法-------------------------------------------*/
            $(function() {
                AKjs_Menu({ //底部菜单的图标以及文字样式变化设置
                    active_color: "c_title", //被选中的文字和图标的颜色
                    menu_icon: new Array( //每个菜单的默认显示图标设置 （为了正常的显示布局最多设置5个）
                        "icon-mn_gongneng", //第1个按钮的图标
                        "icon-mn_hudong", //第2个按钮的图标
                        "icon-mn_huodong", //第3个按钮的图标
                        "icon-mn_kuangjia", //第4个按钮的图标
                        "icon-mn_kongjian" //第5个按钮的图标
                    ),
                    menu_icon_active: new Array( //每个菜单的被选中后的图标设置 （为了正常的显示布局最多设置5个）
                        "icon-mn_gongneng_fill", //第1个按钮的图标
                        "icon-mn_hudong_fill", //第2个按钮的图标
                        "icon-mn_huodong_fill", //第3个按钮的图标
                        "icon-mn_kuangjia_fill", //第4个按钮的图标
                        "icon-mn_kongjian_fill" //第5个按钮的图标
                    ),
                    Callback: function (ele, index) { //回调入口
                        //console.log(ele, index);
                    }
                });
            });
        },
        error:function (hash) { //请求加载页面失败后的回调
            if (hash) { //获取hash的参数值，当前的判断是hash有值的情况
                AKjs_Plugin("AKjs_WebToast", "css"); //提示框效果
                ak_webToast("您访问的界面加载失败,请稍后再试!","middle",3000); //(提示文字，显示位置 [top ，middle ，bottom ]，遮挡背景[加mask即可用]，耗时)
                AKjs_Location("/page1"); //location.replace 跳转模式
            }
        }
    });
});


/*
<!--
* ak-header和ak-footer元素的data-display值是隐藏和显示APP的头部区域和底部菜单区域 (true / false)；
ak-main和ak-scrollview元素的data-bounce值是滚动区域是否开启ios弹性效果的功能 (true / false)；
button元素的data-back="true"值是识别为该按钮是返回键的意思
//注：template，ak-header，ak-footer，script，style等这些元素在页面中不能多个使用否则代码无效；
路由页面的布局结构使用方法（必须用以下的结构使用）：
<template>
    <ak-header>头部区域</ak-header>
    <ak-main>
        <ak-scrollview>
            <div>中间内容</div>
        </ak-scrollview>
        <dialog>弹窗代码</dialog>
    </ak-main>
    <ak-footer>底部区域</ak-footer>
</template>
<script>
    //编写当前页面的脚本代码区域
</script>
<style>
    //覆盖当前界面的样式区域
</style>
-->
*/