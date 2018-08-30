/*-----------------------------------------------AKjs_Config (全局设置）使用方法-------------------------------------------*/
AKjs_Config({ //环境配置管理
    MaskStyle: ["style3", "opacity05"], //1.所有弹窗背景图案选择（样式style1~8）、2.遮挡层背景的透明度（opacity01~09）
    Responsive: true, //是否开启文字大小按屏幕尺寸自适应变化，考虑到兼容平板电脑建议开启 (开启 true, 停用 false）
    touchstart: true, //是否开启移动端active效果, 建议开启 （元素的class里加touchstart即可用）(使用 true,不使用 false）
    ButtonLink: true, //通过元素中加data-href属性的方式跳转界面。(使用超链接 true,不使用超链接 false）
    WechatHeader: true, //是否通过微信浏览器访问时自动隐藏应用的头部区域, 可以通用建议开启 (使用隐藏 true, 不使用隐藏 false）
    Topdblclick: true, //是否开启点击应用的头部让页面回头顶部 (开启 true, 停用 false）
    fixedBar: true, //输入信息时应用的头部绝对固定在屏幕最上方，底部有输入框时不被虚拟键盘遮挡 (开启 true, 停用 false）
    animation: true, //是否开启元素里加动画参数的功能？（例：data-animation="{name: 'zoomIn', duration:1, delay: 0}"） 动画库：akjs.animate.css
    Orientation: true, //是否开启应用只允许竖屏浏览 (使用 true, 不使用 false）
    Prompt: "为了更好的视觉体验，请在竖屏下进行操作。", //应用横屏是提示文字 (必须开启Orientation的选项才能生效)
    pluginPath: "./js/plugin/" //功能插件文件所在的目录设置
});

/******JS插件按需引入（注意：插件名称和插件文件名需要保持一致，而且插件文件必须要放到plugin目录里面，否则会出错！）******/
/*
参数说明：AKjs_Plugin("插件名称或插件的js文件名","该插件是否存在相关css文件？存在写css，不存在设为空。");
* 做项目时不必要的插件可以注释处理。
* 注：调用插件的地方在router目录里的相关html文件中的最底部。
*/

/*-----------------------------------------------AKjs_Plugin 插件按需引入区域-------------------------------------------*/
AKjs_Plugin("AKjs_Loader","css"); //Loading效果功能

/*-----------------------------------------------AKjs_Loader 使用方法-------------------------------------------*/
if (AKjs_Params(1) != "start") { //通过AKjs_Params获取hash的第一个值后不执行下面loading效果
    AKjs_Loader({
        //ele: $("#ak-scrollview"), //是否使用局部遮挡层，使用请设置指定的局部元素 （不设置任何参数代表使用全部遮挡层）
        autoMode: true, //是否开启指定的时间后自动消失功能 (开启 true, 关闭 false）
        timeToHide: 1000, //毫秒时间设置 (automode必须开启才能有效)
        iconColor: "#ffffff", //图标颜色设置
        maskBG: false, //是否开启遮挡背景 (开启 true, 关闭 false）
        Loader: "load_2" //loading效果选择（load_1~7）
    });
}
setTimeout(function() { //页面加载完5秒后执行
    if($(".ak-Loader").css('display') == 'none'){
        //AKjs_Loader("destroy"); //关闭loading窗
    }
},2000);