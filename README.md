# AKjs.Mobile v 1.5.8 (20190611)

AKjs前端框架是Andrew.Kim和他的团队一起研发的基于jQuery的一个轻量级前端框架。它是只要懂jQuery的语法很容易上手的框架。该框架里面现在发布了很多移动端常用的功能效果；开发者们使用过程中功能插件也可以自己扩展增加。另一方面，它是相当于一个丰富的组件化UI框架，优点是开发要前后端分离，项目开发过程中后端通过ajax调用数据的机制。

AKjs是一个基于jQuery的一套构建用户界面的前端框架，插件里包含着移动端常用的功能效果以及简单明了的CSS样式库，对IOS和安卓系统的兼容性很完美。支持前后端分离开发和路由模式跳页方式。它与其他重量级框架不同的是AKjs采用了按需引入插件功能以及所有的UI布局中可以让用户自行发挥写页面，因为它提供的CSS库模块化的很细分，让开发者们可以轻松的解决前端的烦恼。

#### 主要目录和主要文件说明：

```shell

index.html --- 走路由模式的DEMO页面 （可查看页面切换效果）

html/demo.html --- 未开启路由模式的DEMO页面

layout/main.html --- 路由模式中整个界面的布局；（该文件夹和文件名可以在路由管理器文件中配置）

router/ --- 通过路由访问的html界面，该文件夹也在路由管理器文件中配置（里面的所有html文件中最底部都调用功能插件的方法）

js/router.js --- 路由管理器（该功能切换页面时无刷新跳页的功能，不使用路由功能时可删除该文件。）

html/ --- 该目录是未开启路由模式的演示版文件；

html/js/common.js --- 未开启路由模式全局方法设置以及功能插件按需引入

js/plugin.js --- 走路由模式的全局方法设置以及功能插件按需引入

js/data.js --- Json数据文件

compress/ --- 功能插件目录，里面的css目录是相关功能插件的样式文件（该路径可在AKjs_Config方法中参数设置）

js/akjs.mobile.js --- AKjs手机端主插件（在项目中建议使用压缩版akjs.mobile.min.js）

css/iconfont --- 图标库 (AK图标库地址：http://www.iconfont.cn/collections/detail?cid=8740)

css/akjs.mobile.css --- AKjs全局公共样式库（初始使用本插件的开发者们尽量都看看里面的class命名）

css/akjs.animate.css --- AKjs动画库（在animated.css基础上增加了更多的动画效果）

css/theme.default.css --- 所有颜色相关的样式文件

css/style.css --- 自定义样式文件（引入第三方插件时通过该css文件进行覆盖样式）
```

* 注：开发正式项目的时候不要用demo.html里的内容，该文件只是静态演示版用的文件。为了更好的体验效果开发项目的时候请使用index.html。

* AKjs仅支持http或https协议访问！不支持直接打开本地文件的方式访问！通过本地配置服务器访问或者使用WebStorm软件打开访问即可！

* 演示版地址：https://andrewkim365.gitee.io/akjs.mobile/

* AKjs前端技术支持QQ群：724501394

-----------------------------------------------------------------------------------------------------------------------

#### 更新时间：2019/06/11 下午 16:55

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.5.8版本；

1.compress文件夹里的文件需要全部覆盖。

2.akjs.mobile相关的js文件和css需要全部替换。

3.主要修改原先版本使用的em单位全部替换为rem单位。样式的class名中原来使用的em改为rem即可。

4.最后主题颜色的class名称有变更，原先用的class名中带着_title的代表主题颜色，新版本更名为_theme来使用主题色。


#### 更新时间：2019/01/21 下午 15:46

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.5.7版本；

解决H5微信页面开发 IOS系统 input输入框失去焦点，软键盘关闭后，被撑起的页面无法回退到原来正常的位置，导致弹框里的按钮响应区域错位的问题；

解决路由页面切换时绑定事件重复的问题；


#### 更新时间：2018/12/13 下午 15:45

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.5.6版本；

上个版本中的plugin目录以及里面所有功能插件相关文件已全部删除。并且整个插件压缩为AKjs_plugin.mobile.js文件后移动到compress目录下。

重点升级：根目录中增加了compress目录。该目录是原先的plugin目录中的所有功能插件压缩为一个文件，目的是为了减少文件请求次数让网页的打开速度提升。

1. 打开plugin.js 文件后里面所有的AKjs_Plugin方法的代码全部注释。

2. AKjs_Config 方法中把pluginPath中的plugin目录修改为compress目录。

3. 在plugin.js文件里加一行代码 （建议使用带min的第二个方法）

AKjs_Plugin("AKjs_plugin.mobile","css"); //引入全部功能插件

AKjs_Plugin("AKjs_plugin.mobile.min","css"); //引入压缩版的全部功能插件


#### 更新时间：2018/11/02 下午 16:19

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.5.5版本；

解决微信端兼容问题以及正则表达式部分的小bug。

AKjs_Config中的WechatHeader参数已停用。


#### 更新时间：2018/09/29 下午 13:20

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.5.3版本；

解决路由模式中几个小细节问题；

css目录中的iconfont文件夹需要全部替换,新增了几个图标；

修改 plugin/AKjs_Spinner.js 文件；（解决bug）

修改 plugin/AKjs_SelectOption.js 文件；（解决bug）

修改 plugin/AKjs_Popupwin.js 文件；（解决bug）

修改 plugin/AKjs_Loader.js 文件；（解决bug）

修改 plugin/AKjs_Radio.js 文件；（兼容到PC模式）

修改 plugin/AKjs_IntlTelInput.js 文件；（兼容到PC模式）

修改 plugin/AKjs_Typeahead.js 文件；（兼容到PC模式）


#### 更新时间：2018/09/20 下午 14:40

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.5.2版本；

修改 plugin/AKjs_Spinner.js 文件；（解决bug）

修改 plugin/AKjs_PortraitImage.js 文件；（解决bug）

修改 plugin/AKjs_PreviewImage.js 文件；（解决bug）

修改 plugin/AKjs_Tabs.js 文件；（解决bug）

修改 plugin/AKjs_Slider.js 文件；（解决bug）

修改 plugin/AKjs_TouchDelete.js 文件；（解决bug）

修改 plugin/AKjs_Typeahead.js 文件；（解决bug）

修改 plugin/AKjs_Popupwin.js 文件；（解决bug）

修改 plugin/AKjs_Keyboard.js 文件；（解决该插件的css样式问题）

修改 plugin/AKjs_WebToast.js 文件；

《整个项目目录在webstorm软件中打开后键盘中按Ctrl+Shift+R进行路径中替换关键词。
（所有的 ak_webToast 字符全部替换为 AKjs_WebToast 即可。》


#### 更新时间：2018/09/17 下午 13:10

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.5.1版本；

需要全部替换plugin目录中的所有文件（css代码压缩以及js代码性能优化）；


#### 更新时间：2018/09/11 下午 13:25

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.5.0版本；

css目录中的iconfont文件夹需要全部替换；

根目录中的无路由模式的演示版demo.html~demo5.html 等文件移动到html目录中，并且该文件夹中增加了js/common.js文件；

router目录中tab_test开头的几个文件移动到router/ajax/文件夹，并且重名为tab_ajax开头的文件名；

修改 plugin/AKjs_Spinner.js 文件；（解决bug）

修改 plugin/AKjs_Form.js 文件；（解决bug）

修改 plugin/AKjs_MobileChat.js 文件；（解决bug）

修改 plugin/AKjs_MultiDate.js 文件；（解决bug）

修改 plugin/AKjs_Checkbox.js 文件；（解决IE兼容性问题）

修改 plugin/AKjs_Radio.js 文件；（解决IE兼容性问题）

修改 plugin/AKjs_Template.js 文件；（解决bug）

-----------------------------------------------------------------------------------------------------------------------
#### 更新时间：2018/09/08 下午 18:25

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.4.3版本；

AKjs_Config增加pluginClearn参数定期清理功能插件的缓存问题；

AKjs_Router增加startPage参数，指定首次访问后的页面；

请替换router目录中的所有演示版文件；

修改js目录中的router.js文件（把AKjs_Config方法转移到plugin.js文件中）；

修改 plugin/AKjs_Lazyload.js 文件；（解决bug）

修改 plugin/AKjs_MobileChat.js 文件；（解决bug）

修改 plugin/AKjs_Print.js 文件；（解决bug）

修改 plugin/AKjs_Spinner.js 文件；（解决bug）


#### 更新时间：2018/09/05 下午 16:55

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.4.2版本；

AKjs_Config增加pluginPath参数让功能插件目录可自行设置；

演示版的js/plugin/文件夹移动到根目录，而且plugin目录中的文件需要全部替换更新。

解决功能插件按需引入时网络请求过多导致加载速度很慢的问题；

解决AKjs_Unicode方法的bug;

为了解决刚打开页面时加载很慢的问题，对plugin.js文件进行优化；

请替换router目录中的所有演示版文件；

修改js目录中的router.js文件（把AKjs_Config方法转移到plugin.js文件中）；

修改 plugin/AKjs_Loader.js 文件；（解决bug）

修改 plugin/AKjs_Template.js 文件；（解决bug）

修改 plugin/AKjs_DropLoad.js 文件；（解决bug）

修改 plugin/AKjs_Lazyload.js 文件；（解决bug）


#### 更新时间：2018/08/23 下午 08:35

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.4.1版本；

修改 js/plugin/AKjs_Form.js 文件；（解决bug）

修改 js/plugin/AKjs_ButtonSubmit.js 文件；（解决bug）

修改 js/plugin/AKjs_Popupwin.js 文件；（解决bug）

修改 js/plugin/AKjs_Lazyload.js 文件；（解决bug）

修改 js/plugin/AKjs_MultiDate.js 文件；（解决bug）

修改 js/plugin/AKjs_Spinner.js 文件；（解决bug）


#### 更新时间：2018/08/21 下午 16:35

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.4.0版本；

-- 主要解决input焦点时在IOS计算屏幕高度有误的bug;

修改 js/plugin/AKjs_MultiDate.js 以及对应的css文件；（优化代码以及修改UI）

修改 js/plugin/AKjs_Spinner.js 文件；（增加手动输入后的回调以及解决元素重复的问题）

修改 js/plugin/AKjs_Tabs.js 文件；（解决Tabs切换后输入框的焦点bug）


#### 更新时间：2018/08/09 下午 17:17

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.9版本；

这次最新版提升了很多性能以及对很多功能插件进行优化。

《本次版本开始告别所有Andrew_开头的插件名，新版本全部更改为AKjs_开头。

这次版本是对框架的结构进行大改革，所以大家更新这次新版本的时候按照下面的教程一步步进行操作吧。》

* 从akjs 1.3.8 升级到akjs 1.3.9版本的流程说明：

1.首先把js目录中的plugin文件夹删除，包括里面的所有文件。然后下载最新版的plugin文件夹放到js目录中即可。

2.在GitHub下载最新版后js目录中的router.js、akjs.mobile.js 等文件进行替换最新版。

3.css目录中的akjs.mobile.css文件进行替换最新版。

4.最后一步把整个项目目录在webstorm软件中打开后键盘中按Ctrl+Shift+R进行路径中替换关键词。（所有的 Andrew_ 字符全部替换为 AKjs_ 即可。）


* 新版的router页面代码结构说明：

ak-header和ak-footer元素的data-display值是隐藏和显示APP的头部区域和底部菜单区域 (true / false)；

ak-main和ak-scrollview元素的data-bounce值是滚动区域是否开启ios弹性效果的功能 (true / false)；

button元素的data-back="true"值是识别为该按钮是返回键的意思

//注：template，ak-header，ak-footer，script，style等这些元素在页面中不能多个使用否则代码无效；


路由页面的布局结构使用方法（必须用以下的结构使用）：

```shell
<template>
    <ak-header>头部区域</ak-header> 
    <ak-main>    
    //ak-main元素是内容区域的容器,ak-main元素的外面不建议写任何代码。
        <ak-scrollview>      
         //main元素里面的ak-scrollview是用于屏幕的滚动条，不使用当前元素时ak-main自动识别为屏幕的滚动条。
         弹窗或固定元素的代码在ak-scrollview的外面写才能不飘动。     
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
```
