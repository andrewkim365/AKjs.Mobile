# AKjs.Mobile v 1.2.7

[![Build Status][travis-image]][travis-url]
[![Bower Status][bower-image]][bower-url]

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

#### AKjs介绍

AKjs前端框架是Andrew.Kim和他的团队一起研发的基于jQuery的一个轻量级前端框架。它是只要懂jQuery的语法很容易上手的框架。该框架里面现在发布了很多移动端常用的功能效果；开发者们使用过程中功能插件也可以自己扩展增加。另一方面，它是相当于一个丰富的组件化UI框架，优点是开发要前后端分离，项目开发过程中后端通过ajax调用数据的机制。

AKjs是一个基于jQuery的一套构建用户界面的前端框架，插件里包含着移动端常用的功能效果以及简单明了的CSS样式库，对IOS和安卓系统的兼容性很完美。支持前后端分离开发和路由模式跳页方式。它与其他重量级框架不同的是AKjs采用了按需引入插件功能以及所有的UI布局中可以让用户自行发挥写页面，因为它提供的CSS库模块化的很细分，让开发者们可以轻松的解决前端的烦恼。

注：开发正式项目的时候不要用demo.html里的内容，该文件只是静态演示版用的文件。为了更好的体验效果开发项目的时候请使用index.html。

* AKjs仅支持http或https协议访问！不支持直接打开本地文件的方式访问！通过本地配置服务器访问或者使用WebStorm软件打开访问即可！


预览效果 http://118.244.206.115:8080/ak/

AKjs前端技术支持QQ群：724501394

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

#### 更新时间：2018/06/29 下午 16:55

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.6版本；

--- input输入框增加正则表达式控制的data-type属性（number，number_symbol，alpha，alpha_number，sino，sino_alpha）

--- 解决当键盘按键Ctrl+F5强制刷新时页面有时加载不出来的bug;

修改 js/plugin/Andrew_SnInput.js 功能插件bug；

修改 js/plugin/Andrew_Circliful.js 功能插件bug；

修改 js/plugin/Andrew_IntlTelInput.js 功能插件bug；

修改 js/plugin/Andrew_ScrollFixed.js 功能插件bug；

修改 js/plugin/Andrew_QRcode.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）

#### 更新时间：2018/06/26 下午 22:40

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.5版本；

修改 js/plugin/Andrew_Popupwin.js 功能插件 (为了解决绑定事件重复的问题增加leaveback页面离开时的回调)；

修改 js/plugin/Andrew_Favorite.js 功能插件 

修改 js/plugin/Andrew_Progress.js 功能插件 

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）

-- 解决上一个版本出现的项目文件夹名中带特殊符号时页面报错的问题；

-- 演示版的Andrew_DropLoad插件中注释数据加载失败时加的me.resetload()方法（为了避免死循环的问题）;

-- 新增<dialog>元素，让所有弹窗元素不使用div元素可代替dialog（演示版中已使用该元素可参考）。


#### 更新时间：2018/06/25 下午 22:15

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.4版本；

修改 js/plugin/Andrew_Slider.js 功能插件bug(解决欢迎页滑动时有时候出现卡顿的问题)；

增加 js/plugin/Andrew_Loader.js Loading效果插件bug （解决loading效果被其它元素遮挡的问题）；

修改演示版中的router/start.html文件（解决滑屏时卡顿的问题）。

修改演示版中的/router/page3.html文件(解决左侧菜单中的点击事件bug)。

-- 主要解决使用路由功能的项目只能放到根目录使用的bug;

-- 修改Andrew_Include 引入文件时路径正则表达式有误的bug;

-- 解决通过微信浏览器访问时url带参数时无法识别项目的正确目录的问题；

#### 更新时间：2018/06/23 下午 18:55

#### 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.3版本；

修改Andrew_Include的不断生成js文件的bug；

修改 css/style.css 样式文件；

修改演示版中的几个路由模式的demo文件。（/router/page1 ~ page5）

#### 更新时间：2018/06/21 下午 17:40

#### 更新说明：

js目录中 akjs.mobile.js 发布 1.2.2版本；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）

---为了提高性能使用路由的页面最外层必须要套template元素后使用

//注：template，ak-header，ak-footer，script，style等这些元素在页面中不能多个使用否则代码无效；

router目录中的所有文件布局结构使用方法（必须用以下的结构使用）：

&lt;template&gt;

  &lt;ak-header&gt;&lt;/ak-header&gt;
    
  &lt;div&gt;&lt;/div&gt;
    
  &lt;ak-footer&gt;&lt;/ak-header&gt;
    
&lt;/template&gt;

&lt;script&gt;

&lt;/script&gt;

&lt;style&gt;

&lt;/style&gt;

