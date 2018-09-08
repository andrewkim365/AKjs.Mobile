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
    pluginPath: "./plugin/", //功能插件文件所在的目录设置
    pluginClear: { //定期清理功能插件的缓存 【days=天数, hours=小时, minutes=分钟，seconds=秒数 （当前提供的四个参数中任意抽选一个设置时间清理功能插件的缓存。四个参数不能同时设置）】
        /*使用帮助：项目开发阶段建议使用秒数间隔清理缓存，项目正式上线后不经常改动插件所以建议使用天数间隔清理缓存。*/
        /*注意：清理缓存时按需引入的功能插件将重新网络请求所以会影响到页面加载速度。*/
        minutes: 10, //分钟
    }
});

/******JS插件按需引入（注意：插件名称和插件文件名需要保持一致，而且插件文件必须要放到plugin目录里面，否则会出错！）******/
/*
参数说明：AKjs_Plugin("插件名称或插件的js文件名","该插件是否存在相关css文件？存在写css，不存在设为空。");
* 做项目时不必要的插件可以注释处理。
* 注：调用插件的地方在router目录里的相关html文件中的最底部。
*/

/*-----------------------------------------------AKjs_Loader 使用方法-------------------------------------------*/
if (AKjs_Params(1) != "start") { //通过AKjs_Params获取hash的第一个值后不执行下面loading效果

    /*-----------------------------------------------AKjs_Plugin 插件按需引入区域-------------------------------------------*/
    AKjs_Plugin("AKjs_Loader","css"); //Loading效果功能

    $(function() {
        AKjs_Loader({
            //ele: $("#ak-scrollview"), //是否使用局部遮挡层，使用请设置指定的局部元素 （不设置任何参数代表使用全部遮挡层）
            autoMode: true, //是否开启指定的时间后自动消失功能 (开启 true, 关闭 false）
            timeToHide: 1000, //毫秒时间设置 (automode必须开启才能有效)
            iconColor: "#ffffff", //图标颜色设置
            maskBG: false, //是否开启遮挡背景 (开启 true, 关闭 false）
            Loader: "load_2" //loading效果选择（load_1~7）
        });
    });
    setTimeout(function() { //页面加载完5秒后执行
        if($(".ak-Loader").css('display') == 'none'){
            //AKjs_Loader("destroy"); //关闭loading窗
        }
    },2000);
}

$(function () {
    if (AKjs_Params(1) === "start") { //通过AKjs_Params获取hash的第一个值, AKjs_Pathname获取路径的文件名

        AKjs_Plugin("AKjs_Slider", "css"); //欢迎页和联播图功能

    } else if (AKjs_Params(1) === "page1" || AKjs_Pathname() === "demo.html") { //通过AKjs_Params获取hash的第一个值, AKjs_Pathname获取路径的文件名

        AKjs_Plugin("AKjs_AllChecked"); //全选功能
        AKjs_Plugin("AKjs_ButtonSubmit", "css"); //防止重复提交功能
        AKjs_Plugin("AKjs_ChangeIcon"); //图标切换功能
        AKjs_Plugin("AKjs_ChangeInput"); //输入框值互换功能
        AKjs_Plugin("AKjs_Checkbox", "css"); //复选框美化
        AKjs_Plugin("AKjs_ChooseList"); //按钮模式复选和单选功能
        AKjs_Plugin("AKjs_Codeval", "css"); //图片验证功能
        AKjs_Plugin("AKjs_CountDown"); //倒计时功能
        AKjs_Plugin("AKjs_CountTo"); //数字动画效果
        AKjs_Plugin("AKjs_DateTime", "css"); //日期和时间插件
        AKjs_Plugin("AKjs_Dialog", "css"); //alert，confirm，prompt等弹出层功能
        AKjs_Plugin("AKjs_DropLoad", "css"); //上拉刷新和下拉加载更多功能
        AKjs_Plugin("AKjs_DropUpDown"); //列表展开和收起功能
        AKjs_Plugin("AKjs_Favorite"); //点赞或收藏功能
        AKjs_Plugin("AKjs_Form"); //表单提交相关效果
        AKjs_Plugin("AKjs_GetVerifyCode"); //手机短信验证码认证功能
        AKjs_Plugin("AKjs_IntlTelInput", "css"); //国际区号选择功能
        AKjs_Plugin("AKjs_Lazyload"); //图片加载时有动画效果
        AKjs_Plugin("AKjs_lightSlider", "css"); //图片列表左右滑动功能
        AKjs_Plugin("AKjs_MultiDate", "css"); //多功能日期和时间插件
        AKjs_Plugin("AKjs_NowTime"); //获取当前时间的功能
        AKjs_Plugin("AKjs_Popupwin"); //弹窗功能
        AKjs_Plugin("AKjs_PortraitImage", "css"); //头像上传功能
        AKjs_Plugin("AKjs_PreviewImage", "css"); //同时上传多个图片的功能
        AKjs_Plugin("AKjs_Progress", "css"); //进度条插件
        AKjs_Plugin("AKjs_Radio", "css"); //单选框美化
        AKjs_Plugin("AKjs_Range", "css"); //滑块功能插件
        AKjs_Plugin("AKjs_Ratyli"); //星级评价功能
        AKjs_Plugin("AKjs_Select", "css"); //移动端专用下拉菜单功能
        AKjs_Plugin("AKjs_Slider", "css"); //欢迎页和联播图功能
        AKjs_Plugin("AKjs_Spinner"); //数量控制功能
        AKjs_Plugin("AKjs_StepOrder"); //步骤插件
        AKjs_Plugin("AKjs_Substring"); //输入框里输入的数字强行转换为人民币格式的插件
        AKjs_Plugin("AKjs_Switch", "css"); //开关按钮美化
        AKjs_Plugin("AKjs_Tabs"); //TABS切换内容功能
        AKjs_Plugin("AKjs_Textarea"); //多行输入框实时查询字符数的功能
        AKjs_Plugin("AKjs_TouchDelete", "css"); //列表滑动删除功能
        AKjs_Plugin("AKjs_Typeahead", "css"); //模糊搜索功能
        AKjs_Plugin("AKjs_Viewer", "css"); //图片放大预览功能
        AKjs_Plugin("AKjs_WebToast", "css"); //提示框效果

    } else if (AKjs_Params(1) === "page2" || AKjs_Pathname() === "demo2.html") { //通过AKjs_Params获取hash的第一个值, AKjs_Pathname获取路径的文件名

        AKjs_Plugin("AKjs_Popupwin"); //弹窗功能
        AKjs_Plugin("AKjs_MobileChat", "css"); //移动端聊天功能插件

    } else if (AKjs_Params(1) === "page3" || AKjs_Pathname() === "demo3.html") { //通过AKjs_Params获取hash的第一个值, AKjs_Pathname获取路径的文件名

        AKjs_Plugin("AKjs_Popupwin"); //弹窗功能
        AKjs_Plugin("AKjs_Waterfall", "css"); //瀑布流展示功能

    } else if (AKjs_Params(1) === "page4" || AKjs_Pathname() === "demo4.html") { //通过AKjs_Params获取hash的第一个值, AKjs_Pathname获取路径的文件名

        AKjs_Plugin("AKjs_Lazyload"); //图片加载时有动画效果
        AKjs_Plugin("AKjs_Popupwin"); //弹窗功能
        AKjs_Plugin("AKjs_SelectOption","css"); //pc端专用select下拉框插件
        AKjs_Plugin("AKjs_Paginator","css"); //分页插件
        AKjs_Plugin("AKjs_ReadMore"); //查看更多插件
        AKjs_Plugin("AKjs_Vticker"); //列表垂直滚动插件
        AKjs_Plugin("AKjs_TypeIt","css"); //文字打字效果
        AKjs_Plugin("AKjs_Template"); //模板引擎插件
        AKjs_Plugin("AKjs_Marquee","css"); //上下左右滚动插件
        AKjs_Plugin("AKjs_QRcode"); //二维码生成插件
        AKjs_Plugin("AKjs_NavScroll"); //导航滑动功能（今日头条）
        AKjs_Plugin("AKjs_Circliful"); //圆形统计插件
        AKjs_Plugin("AKjs_TimeAxis","css"); //时间轴展示功能
        AKjs_Plugin("AKjs_EchartsRun"); //百度Echarts运行功能
        AKjs_Plugin("AKjs_Print"); //局部打印插件

    } else if (AKjs_Params(1) === "page5" || AKjs_Pathname() === "demo5.html") { //通过AKjs_Params获取hash的第一个值, AKjs_Pathname获取路径的文件名

        AKjs_Plugin("AKjs_GoTop"); //返回页面顶部插件
        AKjs_Plugin("AKjs_Keyboard", "css"); //安全键盘
        AKjs_Plugin("AKjs_DropLoad", "css"); //上拉刷新和下拉加载更多功能
        AKjs_Plugin("AKjs_WebToast", "css"); //提示框效果

    }
});

/*-----------------------------------------------AKjs_Responsive 使用方法-------------------------------------------*/
$(function() {
    AKjs_Responsive({ //实时监听窗口大小变化的功能
        resizeCallback: function (deviceW, deviceH, viewportW, viewportH) {
            //console.log("屏幕宽度: "+deviceW);
            //console.log("屏幕高度: "+deviceH);
            //console.log("实时窗口宽度: "+viewportW);
            //console.log("实时窗口高度: "+viewportH);
        }
    });
});

/*
AKjs_Location 使用方法：
//url=跳转路径，{type=跳转类型（href,history,reload），time=延迟时间，router=页面切换效果（left,right）}

AKjs_Location("url",{type:"", time: "", router:""}); //参数设置结构
AKjs_Location("/start"); //location.replace 跳转模式(第二个参数默认识别time参数)
AKjs_Location("/start",{type:"href"}); //location.href 跳转模式
AKjs_Location("/",{type:"reload"}); //location.reload() 刷新当前页
AKjs_Location("-1",{type:"history"}); //history.back(-1) 跳转返回上一页,也可以设置0，-2 等数值
AKjs_Location("/start",{time:1000}); //location.replace 跳转模式 (延迟1秒后跳转)
AKjs_Location("/start",{router:left}); //location.replace 跳转模式 (router参数是页面切换效果，left是左滑[返回效果]，right是右滑[进入效果])

AKjs_getUrlParam &  AKjs_changeURLArg 使用方法：
console.log("GET_ak: "+AKjs_getUrlParam('ak')); //获取URL中的参数值
console.log(AKjs_changeURLArg(location.hash,"ak","change"+AKjs_getUrlParam('ak'))); //更改URL中的参数值

AKjs_Unicode 使用方法：
console.log(AKjs_Unicode("中文字符"));

AKjs_setCookie & AKjs_getCookie & AKjs_delCookie 使用方法：
AKjs_setCookie("username", user, 365); //设置cookie
var user = AKjs_getCookie("username"); //获取cookie
AKjs_delCookie(name) //删除cookie

AKjs_htmlEncode & AKjs_htmlDecode 使用方法：
AKjs_htmlEncode(str); //把TEXT转换HTML
AKjs_htmlDecode(str); //把HTML转换TEXT

AKjs_DateFormat & AKjs_FileFormat 使用方法：
console.log(AKjs_DateFormat("2018/03/30 17:50","yyyy-MM-dd HH:mm"));
console.log(AKjs_DateFormat(new Date(),"yyyy-MM-dd HH:mm"));
AKjs_FileFormat(filename) //获取文件的扩展名
*/

/*
$(window).resize(function () {
    if ($(window).height() - $(this).height() > 140) {
        //安卓软键盘弹出
    } else {
        //安卓软键盘收起
    }
});

$(document).on('focusin', function () {
    //IOS软键盘弹出的事件处理
});

$(document).on('focusout', function () {
    //IOS软键盘收起的事件处理
});

document.activeElement.blur(); //强制隐藏软键盘
*/