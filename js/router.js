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
    Andrew_Include("js/setting.js"); //PC端布局和页面参数设置（Andrew_Include是js文件中引入另一个js或css文件的功能）
    Andrew_Include("http://libs.baidu.com/html5shiv/3.7/html5shiv.min.js"); //引入html5shiv插件（Andrew_Include是js文件中引入另一个js或css文件的功能）
    Andrew_Router({ //路由配置管理
        Router: true, //是否开启路由（开启路由URL中带#的路径访问页面不刷新页面形式跳转 (开启 true, 停用 false）
        FileFormat: ".html", //路由目录中的文件格式设置,该参数设置后data-href值里可以不写文件格式 （可设置html,php,aspx,jsp...等程序的文件名）
        Parameter: false, //是否开启URL的akjs参数，启用该功能可以解决浏览器缓存问题 （开启 true, 停用 false）
        Animate:"fadeIn ani_05s", //切换页面时的动画效果设置（输入动画库样式中的动画名称以及动画毫秒的样式名，社为空值无动画效果）
        RouterPath:["router","layout/main.html"], //路由目录和界面布局文件设置（第1个参数是路由目录文件夹名，第2个参数是指定整个界面布局的文件）
        changePage:function (hash,record) {  //路由初始化调用和页面变化时的回调（公共插件引入的区域）
            //console.log(record) /*获取上一个页面的HTML代码（在路由hash模式跳页后才能有效）*/
            if (!hash) { //首次访问的界面或者界面加载失败后您要跳转到哪个URL？
                if (IsMobile) { //判断是否通过移动设备访问的
                    Andrew_Location("/"); //location.replace 跳转模式
                } else {
                    Andrew_Location("/"); //location.replace 跳转模式
                }
            }
            /*-----------------------------------------------Andrew_Config (全局设置）使用方法-------------------------------------------*/
            Andrew_Config({ //环境配置管理
                MaskStyle: ["style3", "opacity07"], //1.所有弹窗背景图案选择（样式style1~8）、2.遮挡层背景的透明度（opacity01~09）
                Responsive: true, //是否开启文字大小按屏幕尺寸自适应变化，考虑到兼容平板电脑建议开启 (开启 true, 停用 false）
                ButtonLink: true, //通过元素中加data-href属性的方式跳转界面, 建议开启路由功能后使用。(使用button超链接 true,不使用button超链接 false）
                animation: true //是否开启元素里加动画参数的功能？（例：data-animation="{name: 'zoomIn', duration:1, delay: 0}"） 动画库：andrew.animate.css
            });

            /*-----------------------------------------------Andrew_Loader 使用方法-------------------------------------------*/
            if (location.hash.substring(1).split("?")[0] != "/") {
                Andrew_Loader({
                    ele: $("main"), //是否使用局部遮挡层，使用请设置指定的局部元素 （不设置任何参数代表使用全部遮挡层）
                    autoMode: true, //是否开启指定的时间后自动消失功能 (开启 true, 关闭 false）
                    timeToHide: 1000, //毫秒时间设置 (automode必须开启才能有效)
                    iconColor:"#ffffff", //图标颜色设置
                    maskBG: false, //是否开启遮挡背景 (开启 true, 关闭 false）
                    Loader:"load_2" //loading效果选择（load_1~7）
                });
            }
            /*-----------------------------------------------Andrew_Tabs 使用方法-------------------------------------------*/
            $(".plug_tabs_code").Andrew_Tabs({
                curDisplay: 1, //当前显示哪张
                autoPlay: false, //自动播放 (true/false)
                playDelay: 2000, //切换Tabs延迟时间
                boxheight: false, //切换内容区域的高度设置px；建议vertical方式时使用 （不使用高度：false）
                navlength: 4, //切换导航的数量设置（文字屏幕对齐）
                fullclass: "bor_bottom2 bor_title c_title minus_mt_1px", //被选中状态的class
                emptyclass: "bor_bottom bor_gray_ddd", //未选中状态的class
                mouse: "click", //鼠标事件 (click/hover)
                touchmode: false, //是否开启触屏滑动切换功能 (true/false)
                changeMethod: "horizontal", //切换方式 (default/vertical/horizontal/opacity)
                callback: function (ele, index) { //通过回调获取当前显示的元素
                    ak_PluginTest();
                }
            });
            /*-----------------------------------------------Andrew_Scrollbar 使用方法-------------------------------------------*/
            setTimeout(function () { //需要延迟加载，ak_Aside_Include页面加载完后执行该插件；
                $("aside").Andrew_Scrollbar({
                    children: ".plug_scroll",
                    speed: 25,
                    barOffTop: 2,
                    barOffBottom: 2,
                    barOffRight: 2,
                    boxWidth: 8,
                    barWidth: 8,
                    barColor: "rgba(0,0,0,0.3)",
                    barMDColor: "rgba(0,0,0,0.5)",
                    boxColor: "rgba(0,0,0,1)",
                    isMaxHeight: true,
                    isBar: false,
                    callback: function (barele, bartop) { //通过回调获取当前滚动条的元素和实时变化的位置
                        //console.log(barele) /*滚动条的元素*/
                        //console.log(bartop) /*滚动条的位置*/
                    }
                });
            }, 500);
            /*-----------------------------------------------Andrew_ScrollFixed 使用方法-------------------------------------------*/
            $(".plug_scroll").children("nav.wp_94").Andrew_ScrollFixed({
                ScrollFixed: true, //是否开启指定的元素区域固定在屏幕的上方位置 (开启 true, 关闭 false）
                zPosition: "2", //浮动元素的z-index数值
                animated: "slideInDown ani_05s", //滚动后的显示的动画效果 (css动画库：andrew.animate.css)
                top: 0, //屏幕上方和滑动后的元素固定的上下间距
                scroll: function (ele, scrolltop, offsetTop) { //滚动条执行后的回调
                    //console.log(scrolltop) /*获取实时的滚动条位置*/
                    //console.log(offsetTop) /*获取指定元素的位置*/
                    if (scrolltop > offsetTop) {
                        ele.children().addClass("minus_ml_9px");
                    } else {
                        ele.children().removeClass("minus_ml_9px");
                    }
                }
            });
            /*-----------------------------------------------Andrew_NavMenu 使用方法-------------------------------------------*/
            $(".plug_menu").Andrew_NavMenu({
                curDisplay: 1, //当前被选中哪个？
                activeText: "c_white", //被选中或鼠标经过时的文字颜色
                LinePosition: "", //被滑动框或线条位置（线条方法：top, bottom ; 参数设为空代表使用滑动框）
                LineClass: "bg_white03 bor_rad_05em", //LinePosition的class样式设置
                BoxPadding: 10, //滑动框的内间距设置(只输入数字并且识别为px)
                LineHeight: "0.3em", //线条高度 (只允许LinePosition的参数设为top或者bottom的情况下使用)
                Callback: function (ele, index) { //初始化和鼠标离开时的回调
                    if (router_url == "/"+Andrew_Params(1)+"/components.html" || router_url == "/"+Andrew_Params(1)+"/components" || $("ak-page-code").text() == "components") {
                        ele.parents("ul").find("li").removeClass("ak_navCur");
                        ele.parents("ul").find("li").eq(1).addClass("ak_navCur");
                        setTimeout(function () {
                            $("ak-page-code").remove();
                        }, 500);
                    } else if (router_url == "/"+Andrew_Params(1)+"/guide.html" || router_url == "/"+Andrew_Params(1)+"/guide") {
                        ele.parents("ul").find("li").removeClass("ak_navCur");
                        ele.parents("ul").find("li").eq(2).addClass("ak_navCur");
                    } else if (router_url == "/"+Andrew_Params(1)+"/api.html" || router_url == "/"+Andrew_Params(1)+"/api") {
                        ele.parents("ul").find("li").removeClass("ak_navCur");
                        ele.parents("ul").find("li").eq(3).addClass("ak_navCur");
                    } else if (router_url == "/"+Andrew_Params(1)+"/download.html" || router_url == "/"+Andrew_Params(1)+"/download") {
                        ele.parents("ul").find("li").removeClass("ak_navCur");
                        ele.parents("ul").find("li").eq(4).addClass("ak_navCur");
                    } else if (router_url == "/"+Andrew_Params(1)+"/about.html" || router_url == "/"+Andrew_Params(1)+"/about") {
                        ele.parents("ul").find("li").removeClass("ak_navCur");
                        ele.parents("ul").find("li").eq(5).addClass("ak_navCur");
                    }
                },
                Hover: function (ele, index) { //鼠标滑动时的回调
                    console.log(index)
                }
            });

            /*-----------------------------------------------Andrew_Menu (菜单控制插件）使用方法-------------------------------------------*/
            ak_Aside_Include(); //加载引入左侧导航区域 (引入 setting.js 文件内容)
            setTimeout(function () { //需要延迟加载，ak_Aside_Include页面加载完后执行该插件；
                $(".plug_nav li").Andrew_Menu({ //底部菜单的图标以及文字样式变化设置
                    icon_text: ["dt i", "dt span"], //设置需要控制的菜单图标和文字元素
                    btn_color: "hover_gray_222", //未选中的文字和图标的颜色
                    active_color: "pointer bg_title", //被选中的文字和图标的颜色
                    Callback: function (ele, index) {
                        console.log(ele, index);
                    }
                });
            }, 100);

            /*-----------------------------------------------Andrew_Lazyload 使用方法-------------------------------------------*/
            $(function () {
                $("*[data-animation]").Andrew_Lazyload({ //对所有带data-animation属性的元素进行懒加载，让滚动条位置到达该元素区域时动画播放；
                    scroll: $("main"), //滚动区域的容器
                    scrollTop: 100, //设置初始化滚动条位置（当滚动条滚动到当前设置的位置时所有效果将进行初始化）
                    Callback: function (ele) { //初始化回调入口
                        //console.log(ele);
                    },
                    Scrollback: function (ele, scroll) { //页面滚动后的回调
                        //console.log(scroll);
                    }
                });
            });

            /*-----------------------------------------------Andrew_GoTop (全局) 使用方法-------------------------------------------*/
            Andrew_GoTop({
                dom: $("main"), // 滑动区域 （可设置的dom元素：$(window), $(document), $("main"), $("body"), $("html")）
                hide: true, //当页面不滚动时是否隐藏(true,false)
                url: "./img/gotop.png", //图片路径
                icon: "", //图标的Class
                state: "bottom", //出现的位置(center, bottom)
                height: "auto", //高 默认40px
                width: "40px", //宽 默认40px
                scrollTop: 500, //滚到什么位置出现 px
                time: 500, //返回顶部多长时间 ms 默认500ms
                aimation: "animated bounceInDown", //出场动画 默认show（没有出场动画） 这个可以自定义
                toTop: function () { //返回最顶部后的回调
                    //console.log("toTop");
                },
                toShow: function () { //按钮显示后的回调
                    //console.log("toShow");
                },
                toHide: function () { //按钮隐藏后的回调
                    //console.log("toHide");
                },
                toClick: function () { //按钮点击后的回调
                    //console.log("toClick");
                }
            });

            /*-----------------------------------------------Andrew_Responsive 使用方法-------------------------------------------*/
            Andrew_Responsive({ //实时监听窗口大小变化的功能
                resizeCallback: function (deviceW, deviceH, viewportW, viewportH) {
                    //console.log("屏幕宽度: "+deviceW);
                    //console.log("屏幕高度: "+deviceH);
                    //console.log("实时窗口宽度: "+viewportW);
                    //console.log("实时窗口高度: "+viewportH);
                }
            });

            /*-----------------------------------------------Andrew_ToolTip 使用方法-------------------------------------------*/
            /*$("*[title]").Andrew_ToolTip({
                background: "#000000", //背景颜色
                color: "#79c34a", //文字颜色
                opacity: "0.9" //背景透明度
            });*/

            /*----------------------------------------ak_other---------------------------------------------------*/
            ak_mainHeight(); //重新设置main元素的高度 (引入 setting.js 文件内容)
            ak_HideShow(); //元素的显示和隐藏控制 (引入 setting.js 文件内容)
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
                ak_webToast("您访问的界面加载失败,请稍后再试!","middle",3000); //(提示文字，显示位置 [top ，middle ，bottom ]，遮挡背景[加mask即可用]，耗时)
                setTimeout(function () {
                    Andrew_Location("/"); //location.replace 跳转模式
                }, 3000);
            }
        }
    });
});