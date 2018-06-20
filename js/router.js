/*
                       _oo0oo_
                      o8888888o
                      88" . "88
                      (| -_- |)
                      0\  =  /0
                    ___/`---'\___
                  .' \\|     |// '.
                 / \\|||  :  |||// \
                / _||||| -:- |||||- \
               |   | \\\  -  /// |   |
               | \_|  ''\---/''  |_/ |
               \  .-\__  '-'  ___/-. /
             ___'. .'  /--.--\  `. .'___
          ."" '<  `.___\_<|>_/___.' >' "".
         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
         \  \ `_.   \_ __\ /__ _/   .-` /  /
     =====`-.____`.___ \_____/___.-`___.-'=====
                       `=---='
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
/*-----------------------------------------------Andrew_Router (路由全局设置）使用方法-------------------------------------------*/
$(document).ready(function(){
    Andrew_Include("css/theme.default.css"); //颜色相关样式文件引入（Andrew_Include是js文件中引入另一个js或css文件的功能）
    Andrew_Include("js/data.js"); //Json数据文件引入（Andrew_Include是js文件中引入另一个js或css文件的功能）
    Andrew_Include("js/plugin.js"); //功能插件按需引入（Andrew_Include是js文件中引入另一个js或css文件的功能）
    Andrew_Router({ //路由配置管理
        Router: true, //是否开启路由（开启路由URL中带#的路径访问页面不刷新页面形式跳转 (开启 true, 停用 false）
        FileFormat: ".html", //路由目录中的文件格式设置,该参数设置后data-href值里可以不写文件格式 （可设置html,php,aspx,jsp...等程序的文件名）
        Parameter: false, //是否开启URL的akjs参数，启用该功能可以解决浏览器缓存问题 （开启 true, 停用 false）
        Animate:"fadeIn ani_05s", //切换页面时的动画效果设置（输入动画库样式中的动画名称以及动画毫秒的样式名，社为空值无动画效果）
        RouterPath:["router","layout/main.html"], //路由目录和界面布局文件设置（第1个参数是路由目录文件夹名，第2个参数是指定整个界面布局的文件）
        changePage: function (hash) { //路由初始化调用和页面变化时的回调（公共插件引入的区域）
            if (!hash) { //首次访问的界面或者界面加载失败后您要跳转到哪个URL？
                Andrew_Location("/start"); //location.replace 跳转模式
            }
            /*-----------------------------------------------Andrew_Config (全局设置）使用方法-------------------------------------------*/
            Andrew_Config({ //环境配置管理
                MaskStyle: ["style3","opacity05"], //1.所有弹窗背景图案选择（样式style1~8）、2.遮挡层背景的透明度（opacity01~09）
                Responsive: true, //是否开启文字大小按屏幕尺寸自适应变化，考虑到兼容平板电脑建议开启 (开启 true, 停用 false）
                touchstart: true, //是否开启移动端active效果, 建议开启 （元素的class里加touchstart即可用）(使用 true,不使用 false）
                ButtonLink: true, //通过元素中加data-href属性的方式跳转界面。(使用超链接 true,不使用超链接 false）
                WechatHeader: true, //是否通过微信浏览器访问时自动隐藏应用的头部区域, 可以通用建议开启 (使用隐藏 true, 不使用隐藏 false）
                Topdblclick: true, //是否开启点击应用的头部让页面回头顶部 (开启 true, 停用 false）
                fixedBar: true, //输入信息时应用的头部绝对固定在屏幕最上方，底部有输入框时不被虚拟键盘遮挡 (开启 true, 停用 false）
                animation: true, //是否开启元素里加动画参数的功能？（例：data-animation="{name: 'zoomIn', duration:1, delay: 0}"） 动画库：andrew.animate.css
                Orientation: true, //是否开启应用只允许竖屏浏览 (使用 true, 不使用 false）
                Prompt: "为了更好的视觉体验，请在竖屏下进行操作。" //应用横屏是提示文字 (必须开启Orientation的选项才能生效)
            });

            /*-----------------------------------------------Andrew_Loader 使用方法-------------------------------------------*/
            if (Andrew_Params(1) != "start") { //通过Andrew_Params获取hash的第一个值后不执行下面loading效果
                Andrew_Loader({
                    //ele: $("main"), //是否使用局部遮挡层，使用请设置指定的局部元素 （不设置任何参数代表使用全部遮挡层）
                    autoMode: true, //是否开启指定的时间后自动消失功能 (开启 true, 关闭 false）
                    timeToHide: 1000, //毫秒时间设置 (automode必须开启才能有效)
                    iconColor:"#ffffff", //图标颜色设置
                    maskBG: false, //是否开启遮挡背景 (开启 true, 关闭 false）
                    Loader:"load_2" //loading效果选择（load_1~7）
                });
            }
        },
        success:function (hash) { //请求加载页面成功后的回调
            setTimeout(function() { //页面加载完5秒后执行
                if($(".ak-Loader").css('display') == 'none'){
                    //Andrew_Loader("destroy"); //关闭loading窗
                }
            },2000);

            /*-----------------------------------------------Andrew_Menu (底部菜单图标设置）使用方法-------------------------------------------*/
            Andrew_Menu({ //底部菜单的图标以及文字样式变化设置
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
                Callback: function(ele,index) { //回调入口
                    console.log(ele, index);
                }
            });

            /*-----------------------------------------------Andrew_Responsive 使用方法-------------------------------------------*/
            Andrew_Responsive({ //实时监听窗口大小变化的功能
                resizeCallback: function (deviceW,deviceH,viewportW,viewportH) {
                    //console.log("屏幕宽度: "+deviceW);
                    //console.log("屏幕高度: "+deviceH);
                    //console.log("实时窗口宽度: "+viewportW);
                    //console.log("实时窗口高度: "+viewportH);
                }
            });

            /*
                Andrew_Location 使用方法：
                Andrew_Location("/start.html","href"); //location.href 跳转模式
                Andrew_Location("/","reload") //location.reload() 刷新当前页
                Andrew_Location(-1,"history") //history.back(-1) 跳转返回上一页,也可以设置0，-2 等数值

                Andrew_getUrlParam &  Andrew_changeURLArg 使用方法：
                console.log("GET_ak: "+Andrew_getUrlParam('ak')); //获取URL中的参数值
                console.log(Andrew_changeURLArg(location.hash,"ak","change"+Andrew_getUrlParam('ak'))); //更改URL中的参数值

                Andrew_Unicode 使用方法：
                console.log(Andrew_Unicode("中文字符"));

                Andrew_setCookie & Andrew_getCookie & Andrew_delCookie 使用方法：
                Andrew_setCookie("username", user, 365); //设置cookie
                var user = Andrew_getCookie("username"); //获取cookie
                Andrew_delCookie(name) //删除cookie

                Andrew_htmlEncode & Andrew_htmlDecode 使用方法：
                Andrew_htmlEncode(str); //把TEXT转换HTML
                Andrew_htmlDecode(str); //把HTML转换TEXT

                Andrew_DateFormat & Andrew_FileFormat 使用方法：
                console.log(Andrew_DateFormat("2018/03/30 17:50","yyyy-MM-dd HH:mm"));
                console.log(Andrew_DateFormat(new Date(),"yyyy-MM-dd HH:mm"));
                Andrew_FileFormat(filename) //获取文件的扩展名
            */
        },
        error:function (hash) { //请求加载页面失败后的回调
            if (hash) { //获取hash的参数值，当前的判断是hash有值的情况
                ak_webToast("您访问的界面加载失败,请稍后再试!","middle",9999); //(提示文字，显示位置 [top ，middle ，bottom ]，遮挡背景[加mask即可用]，耗时)
            }
        }
    });
});
