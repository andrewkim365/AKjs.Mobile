# AKjs.Mobile v 1.3.6

AKjs前端框架是Andrew.Kim和他的团队一起研发的基于jQuery的一个轻量级前端框架。它是只要懂jQuery的语法很容易上手的框架。该框架里面现在发布了很多移动端常用的功能效果；开发者们使用过程中功能插件也可以自己扩展增加。另一方面，它是相当于一个丰富的组件化UI框架，优点是开发要前后端分离，项目开发过程中后端通过ajax调用数据的机制。

AKjs是一个基于jQuery的一套构建用户界面的前端框架，插件里包含着移动端常用的功能效果以及简单明了的CSS样式库，对IOS和安卓系统的兼容性很完美。支持前后端分离开发和路由模式跳页方式。它与其他重量级框架不同的是AKjs采用了按需引入插件功能以及所有的UI布局中可以让用户自行发挥写页面，因为它提供的CSS库模块化的很细分，让开发者们可以轻松的解决前端的烦恼。

#### 主要目录和主要文件说明：

```shell
index.html --- 走路由模式的DEMO页面 （可查看页面切换效果）

demo.html --- 未开启路由模式的DEMO页面

layout/main.html --- 整个界面的布局；（该文件夹和文件名可以在路由管理器文件中配置）

router/ --- 通过路由访问的html界面，该文件夹也在路由管理器文件中配置（里面的所有html文件中最底部都调用功能插件的方法）

js/akjs.mobile.js --- AKjs手机端主插件（在项目中建议使用压缩版akjs.mobile.min.js）

js/router.js --- 路由管理器（该功能切换页面时无刷新跳页的功能，不使用路由功能时可删除该文件。）

js/plugin.js --- 按需引入功能插件（按需引入功能插件时后面带css的意思是相关插件有对应的css文件）

js/plugin/ --- 功能插件目录，里面的css目录是相关功能插件的样式文件

js/data.js --- Json数据文件

css/iconfont --- 图标库 (AK图标库地址：http://www.iconfont.cn/collections/detail?cid=8740)

css/akjs.mobile.css --- AKjs全局公共样式库（初始使用本插件的开发者们尽量都看看里面的class命名）

css/akjs.animate.css --- AKjs动画库（在animated.css基础上增加了更多的动画效果）

css/theme.default.css --- 所有颜色相关的样式文件

css/style.css --- 自定义样式文件（引入第三方插件时通过该css文件进行覆盖样式）
```

* 注：开发正式项目的时候不要用demo.html里的内容，该文件只是静态演示版用的文件。为了更好的体验效果开发项目的时候请使用index.html。

* AKjs仅支持http或https协议访问！不支持直接打开本地文件的方式访问！通过本地配置服务器访问或者使用WebStorm软件打开访问即可！

* 演示版地址：http://118.244.206.115:8080/ak/

* AKjs前端技术支持QQ群：724501394

-----------------------------------------------------------------------------------------------------------------------
#### 更新时间：2018/07/30 下午 22:45

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.6版本；

修改 js/plugin.js文件中按需引入Andrew_ButtonSubmit功能插件；

修改根目录中的index.html文件（修改cdn引入部分代码）。

新增了元素放大缩小的class名zoom_* （*可设置05~5）；

解决akjs样式库在NodeJs环境中渐变样式无法编译的问题；

新增 js/plugin/Andrew_ButtonSubmit.js以及对应的css文件（防止重复提交功能）；

修改 js/plugin/Andrew_Form.js以及对应的css 功能插件 （停用Andrew_Validate插件，跟Andrew_Form合并到一起）；

修改 js/plugin/Andrew_Tabs.js 功能插件bug（增加change事件的回调）；

修改 js/plugin/Andrew_Textarea.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）


#### 更新时间：2018/07/25 上午 11:32

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.5版本；

修改 js目录中的router.js文件内容；

修改Andrew_Location跳转方法（详情router.js文件中的102行代码）；

解决打包APP时路由路径不对的问题；

解决当点击手机物理返回键时可识别是返回页面，以下是使用方法；

Andrew_Back.listen(function(){
    //您点击了物理返回按键
});


#### 更新时间：2018/07/24 下午 17:22

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.4版本；

解决在移动端设备中的页面缓存问题；

修改 js/plugin/Andrew_Loader.js以及对应的css 功能插件bug；

修改 js/plugin/Andrew_WebToast.js以及对应的css 功能插件bug；

修改 js/plugin/Andrew_Lazyload.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html 和 /router/page1）


#### 更新时间：2018/07/22 上午 11:11

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.3版本；

修改 js目录中的router.js文件内容 （Andrew_Router功能中增加了ErrorMsg参数）；

新增了元素延迟显示的class名defer_* （*是延迟毫秒，可设置01~10）；

新增了button元素中data-href指定路径时通过data-back="true"属性判断该按钮是不是返回按钮（判断页面切换效果）

修改 js/plugin/Andrew_Loader.js以及对应的css 功能插件bug；

修改 js/plugin/Andrew_Waterfall.js以及对应的css 功能插件bug；

修改 js/plugin/Andrew_Lazyload.js 功能插件bug；

修改 js/plugin/Andrew_GoTop.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5 , start.html）


#### 更新时间：2018/07/19 下午 17:15

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.2版本，akjs.animate.css发布1.0.5版本；

修改 css目录中的style.css文件和js目录中的router.js文件内容；

修改 js/plugin/Andrew_Loader.js以及对应的css 功能插件bug；

修改 js/plugin/Andrew_Waterfall.js以及对应的css 功能插件bug；

修改 js/plugin/Andrew_SelectOption.js 功能插件bug；

修改 js/plugin/Andrew_Popupwin.js 功能插件bug；

修改 js/plugin/Andrew_WebToast.js 功能插件bug；

修改 js/plugin/Andrew_GoTop.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）


#### 更新时间：2018/07/13 下午 23:36

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.1版本；

修改 js/plugin/Andrew_Typeahead.js 功能插件bug；

修改 js/plugin/Andrew_ScrollFixed.js 功能插件bug；

修改 js/plugin/Andrew_Textarea.js 功能插件bug；

修改 js/plugin/Andrew_Waterfall.js 功能插件bug；

修改 js/plugin/Andrew_Popupwin.js 功能插件bug；

修改 js/plugin/Andrew_SelectOption.js 功能插件bug；

修改 js/plugin/Andrew_Form.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）


#### 更新时间：2018/07/12 下午 23:35

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.0版本；

--- 主要解决路由切换页面时跟上一页的HTML代码冲突的问题；

修改 js/plugin.js文件中按需引入Andrew_GoTop功能插件；

增加 js/plugin/Andrew_GoTop.js 功能插件（返回顶部的功能）；

修改 js/plugin/Andrew_Loader.js 功能插件bug；

修改 js/plugin/Andrew_Textarea.js 功能插件bug；

修改 js/plugin/Andrew_Popupwin.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）


#### 更新时间：2018/07/12 下午 23:35

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.3.0版本；

--- 主要解决路由切换页面时跟上一页的HTML代码冲突的问题；

修改 js/plugin.js文件中按需引入Andrew_GoTop功能插件；

增加 js/plugin/Andrew_GoTop.js 功能插件（返回顶部的功能）；

修改 js/plugin/Andrew_Loader.js 功能插件bug；

修改 js/plugin/Andrew_Textarea.js 功能插件bug；

修改 js/plugin/Andrew_Popupwin.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）


#### 更新时间：2018/07/11 下午 16:15

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.9版本；

修改css/style.css和css/theme.default.css样式文件；删除style.css中的控制animation元素样式，在theme样式文件中增加active_title;

需要更新 css/iconfont/ 目录中的所有文件（新增几个图标）；

修改 js/plugin.js文件中按需引入了三个功能插件；（Andrew_Range，Andrew_Paginator，Andrew_Keyboard）

增加 js/plugin/Andrew_Range.js 功能插件（滑块功能：该插件在演示版中的page1）；

增加 js/plugin/Andrew_Paginator.js 功能插件（分页功能：该插件在演示版中的page4）；

增加 js/plugin/Andrew_Keyboard.js 功能插件（安全键盘功能：该插件在演示版中的page5）；

修改 js/plugin/Andrew_ChooseList 功能插件（增加选中后打钩符号）；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）


#### 更新时间：2018/07/07 下午 15:25

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.8版本；

修改css/style.css样式文件；增加animation元素的class样式设置（该样式用于页面切换效果）；

js/router.js文件中Andrew_Router方法里增加record回调；该回调用于记忆上一个页面的html代码；

js/router.js文件中Andrew_Router方法里Animate参数修正为true和false。该功能是启用和停用页面切换动画效果；

-主要增加路由功能中页面切换时仿造原生APP的slide效果；

（该功能的效果时智能识别slide效果：当点击返回按钮时左侧滑动；main原生里面的点击按钮都是右侧滑动，底部菜单的点击事件是fadein效果；）

修改 js/plugin/Andrew_Viewer.js和该插件的相关样式 （图片滑动时屏幕闪的bug）；

修改演示版中的几个demo文件。（/router/page1 ~ page5）-- 增加 <ak-main></ak-main>元素；


#### 更新时间：2018/07/04 下午 15:25

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.7版本；

修改 js/plugin/Andrew_Waterfall.js 功能插件bug （解决局部不能正常定位的问题）；

修改 js/plugin/Andrew_ChooseList.js 功能插件bug （原先用的li标签改成button）；

增加 js/plugin/Andrew_SelectOption.js 功能插件以及该插件的css文件（下拉框插件）；

修改 js/plugin/Andrew_ReadMore.js 功能插件bug （解决在安卓机不能展开的问题）；

修改 js/plugin/Andrew_Progress.js 功能插件以及该插件的css文件（微调布局样式）；

修改 js/plugin/Andrew_DropLoad.js 功能插件bug；

修改 js/plugin.js 全局按需引入功能插件文件（增加 Andrew_SelectOption）；

修改演示版中的几个demo文件。（demo.html ~ demo4.html /router/page1 ~ page4）
