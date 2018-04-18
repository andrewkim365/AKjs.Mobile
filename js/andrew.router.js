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
    Andrew_Router({ //路由配置管理
        Router: true, //是否开启路由（开启路由URL中带#的路径访问页面不刷新页面形式跳转 (开启 true, 停用 false）
        RouterPath:["router","layout/main.html"], //路由目录和界面布局文件设置（第1个参数是路由目录文件夹名，第2个参数是指定整个界面布局的文件）
        tailClass: ".tail", //内页的底部区域通过设置Class名固定到底部（内页的底部固定区域建议不要使用footer元素）
        changePage: function (hash) { //路由初始化调用和页面变化时的回调
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
                )
            });
            /*-----------------------------------------------Andrew_Config (全局设置）使用方法-------------------------------------------*/
            $(function () {
                Andrew_Config({ //环境配置管理
                    MaskStyle: ["style3","opacity07"], //1.所有弹窗背景图案选择（样式style1~8）、2.遮挡层背景的透明度（opacity01~09）
                    Responsive: true, //是否开启文字大小按屏幕尺寸自适应变化，考虑到兼容平板电脑建议开启 (开启 true, 停用 false）
                    touchstart: true, //是否开启移动端active效果, 建议开启 （元素的class里加touchstart即可用）(使用 true,不使用 false）
                    ButtonLink: true, //通过元素中加data-href属性的方式跳转界面, 建议开启路由功能后使用。(使用button超链接 true,不使用button超链接 false）
                    WechatHeader: false, //是否通过微信浏览器访问时自动隐藏应用的头部区域, 可以通用建议开启 (使用隐藏 true, 不使用隐藏 false）
                    Topdblclick: true, //是否开启点击应用的头部让页面回头顶部 (开启 true, 停用 false）
                    fixedBar: true, //输入信息时应用的头部绝对固定在屏幕最上方，底部有输入框时不被虚拟键盘遮挡 （不通过微信访问才生效，开启WechatHeader的参数时请关闭该参数）
                    Orientation: true, //是否开启应用只允许竖屏浏览 (使用 true, 不使用 false）
                    Prompt: "为了更好的视觉体验，请在竖屏下进行操作。" //应用横屏是提示文字 (必须开启Orientation的选项才能生效)
                });
            });
            if (!hash) { //首次访问的页面您要跳转到哪个URL？（前面必须加#符号）
                location.replace("#/start.html");
            }
        },
        success:function (hash) { //请求加载页面成功后的回调
            if (hash) { //获取hash的参数值，当前的判断是hash有值的情况（公共插件引入的区域）
                /*-----------------------------------------------Andrew_Form (全局设置）使用方法-------------------------------------------*/
                $(function(){
                    $("form").Andrew_Form({ //输入框右侧加删除文字按钮
                        btn_delete: ".plug_Delete", //输入文字的删除按钮class名
                        btn_delete_ico: "icon-ln_quxiao", //输入文字的删除按钮的图标
                        btn_password: ".plug_Password", //输入的密码可显示和隐藏功能的按钮class名
                        btn_password_ico_hide: "icon-in_biyan_fill", //输入的密码可显示和隐藏功能的按钮(隐藏按钮图标)
                        btn_password_ico_show: "icon-in_zhengyan_fill", //输入的密码可显示和隐藏功能的按钮(显示按钮图标)
                        placeholder: true, //是否开启点击输入框后提示文字消失功能，建议开启 (开启 true, 停用 false）
                        keyboard: true, //是否输入框内设置的maxlength自定的限制字数后手机键盘自动消失或者input元素加readonly属性不显示键盘，建议开启 (开启 true, 停用 false）
                        PassCheck: ".plug_PassCheck", //两次输入密码确认时需要加的class名
                        passCallback: function() { //通过回调进入两次输入的密码不一致状态 （PassCheck的参数空值时不走当前的回调）
                            console.log("两次输入的密码不一致");
                            $ak.alert("两次输入的密码必须一致！", {
                                icon: "error", //图标类型（warning，error，info，question，success）
                                button_ok: "确定", //弹窗的确定按钮文字
                                title: "提示" //弹窗的标题文字
                            });
                        },
                        butCallback: function(form) { //点击提交按钮后的回调，获取当前表单的元素
                            console.log(form);
                        }
                    });
                });

                /*-----------------------------------------------Andrew_Textarea (全局设置）使用方法-------------------------------------------*/
                $(function () {
                    $(".plug_textarea").Andrew_Textarea({ //多行输入框设置
                        maxlength:200, //文字最多输入限制
                        rows:"6", //输入框的行高
                        topButton: "c_title", //提交按钮在头部显示后的样式 （设置为空，代表不使用该功能）
                        onTextVal:function(val){ //通过回调获取实时输入的值
                            console.log(val);
                        },
                        TopbtnOK:function(val){ //通过回调获取点击头部的提交按钮后的最终值
                            console.log(val);
                            webToast("提交成功！","middle",2000);
                        }
                    });
                });

                /*-----------------------------------------------Andrew_Lazyload (全局设置）使用方法-------------------------------------------*/
                $(function() {
                    $("img").Andrew_Lazyload({
                        effect: "fadeIn" //图片延迟加载效果
                    });
                });

                /*-----------------------------------------------Andrew_Loader 使用方法-------------------------------------------*/
                $(function () {
                    Andrew_Loader({
                        //ele: $("main"), //是否使用局部遮挡层，使用请设置指定的局部元素 （不设置任何参数代表使用全部遮挡层）
                        autoMode: true, //是否开启指定的时间后自动消失功能 (开启 true, 关闭 false）
                        timeToHide:500, //毫秒时间设置 (automode必须开启才能有效)
                        iconColor:"#ffffff", //图标颜色设置
                        maskBG: true, //是否开启遮挡背景 (开启 true, 关闭 false）
                        Loader:"load_2" //loading效果选择（load_1~7）
                    });
                    $(".ak-mask").on("click", function () {
                        Andrew_Loader("destroy"); //关闭loading窗
                    });
                });
            }
        }
    });
});
