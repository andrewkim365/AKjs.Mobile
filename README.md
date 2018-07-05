# AKjs.Mobile v 1.2.7

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

#### - AKjs介绍

AKjs前端框架是Andrew.Kim和他的团队一起研发的基于jQuery的一个轻量级前端框架。它是只要懂jQuery的语法很容易上手的框架。该框架里面现在发布了很多移动端常用的功能效果；开发者们使用过程中功能插件也可以自己扩展增加。另一方面，它是相当于一个丰富的组件化UI框架，优点是开发要前后端分离，项目开发过程中后端通过ajax调用数据的机制。

AKjs是一个基于jQuery的一套构建用户界面的前端框架，插件里包含着移动端常用的功能效果以及简单明了的CSS样式库，对IOS和安卓系统的兼容性很完美。支持前后端分离开发和路由模式跳页方式。它与其他重量级框架不同的是AKjs采用了按需引入插件功能以及所有的UI布局中可以让用户自行发挥写页面，因为它提供的CSS库模块化的很细分，让开发者们可以轻松的解决前端的烦恼。

* 注：开发正式项目的时候不要用demo.html里的内容，该文件只是静态演示版用的文件。为了更好的体验效果开发项目的时候请使用index.html。

* AKjs仅支持http或https协议访问！不支持直接打开本地文件的方式访问！通过本地配置服务器访问或者使用WebStorm软件打开访问即可！


* 演示版地址：http://118.244.206.115:8080/ak/

* AKjs前端技术支持QQ群：724501394

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
