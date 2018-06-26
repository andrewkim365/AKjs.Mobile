# AKjs.Mobile v 1.2.5
AKjs前端框架是Andrew.Kim和他的团队一起研发的基于jQuery的一个轻量级前端框架。它是只要懂jQuery的语法很容易上手的框架。该框架里面现在发布了很多移动端常用的功能效果；开发者们使用过程中功能插件也可以自己扩展增加。另一方面，它是相当于一个丰富的组件化UI框架，优点是开发要前后端分离，项目开发过程中后端通过ajax调用数据的机制。

AKjs是一个基于jQuery的一套构建用户界面的前端框架，插件里包含着移动端常用的功能效果以及简单明了的CSS样式库，对IOS和安卓系统的兼容性很完美。支持前后端分离开发和路由模式跳页方式。它与其他重量级框架不同的是AKjs采用了按需引入插件功能以及所有的UI布局中可以让用户自行发挥写页面，因为它提供的CSS库模块化的很细分，让开发者们可以轻松的解决前端的烦恼。

注：开发正式项目的时候不要用demo.html里的内容，该文件只是静态演示版用的文件。为了更好的体验效果开发项目的时候请使用index.html。

* AKjs仅支持http或https协议访问！不支持直接打开本地文件的方式访问！通过本地配置服务器访问或者使用WebStorm软件打开访问即可！


预览效果 http://118.244.206.115:8080/ak/

AKjs前端技术支持QQ群：724501394

# 更新时间：2018/06/26 下午 22:40

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.5版本；

演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）

-- 解决上一个版本出现的项目文件夹名中带特殊符号时页面报错的问题；

-- 演示版的Andrew_DropLoad插件中注释数据加载失败时加的me.resetload()方法（为了避免死循环的问题）;

-- 新增<dialog>元素，让所有弹窗元素不使用div元素可代替dialog（演示版中已使用请参考）。


# 更新时间：2018/06/25 下午 22:15

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.4版本；

修改 js/plugin/Andrew_Slider.js 功能插件bug(解决欢迎页滑动时有时候出现卡顿的问题)；

增加 js/plugin/Andrew_Loader.js Loading效果插件bug （解决loading效果被其它元素遮挡的问题）；

修改演示版中的router/start.html文件（解决滑屏时卡顿的问题）。

修改演示版中的/router/page3.html文件(解决左侧菜单中的点击事件bug)。

-- 主要解决使用路由功能的项目只能放到根目录使用的bug;

-- 修改Andrew_Include 引入文件时路径正则表达式有误的bug;

-- 解决通过微信浏览器访问时url带参数时无法识别项目的正确目录的问题；

# 更新时间：2018/06/23 下午 18:55

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.3版本；

修改Andrew_Include的不断生成js文件的bug；

修改 css/style.css 样式文件；

修改演示版中的几个路由模式的demo文件。（/router/page1 ~ page5）

# 更新时间：2018/06/21 下午 17:40

# 更新说明：

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


# 更新时间：2018/06/20 下午 17:40

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.1版本；

css目录中 akjs.animate.css 发布 1.0.3版本；

修改 css/style.css 样式文件；

修改 js/router.js 路由管理文件；

增加 js/plugin/Andrew_Waterfall.js 瀑布流功能插件bug；

增加 js/plugin/Andrew_ReadMore.js 查看更多功能插件bug；

修改 js/plugin/Andrew_ScrollFixed.js 功能插件bug；

修改 js/plugin/Andrew_Popupwin.js 功能插件bug；

修改 js/plugin/Andrew_Lazyload.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）

# 更新时间：2018/06/15 下午 15:35

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.2.0版本；

--上一个版本Andrew_Config中增加的ImgLoadStyle参数已删除，该功能移动到Andrew_Loader功能插件；

-- 这次版本主要优化性能以及对动画功能进行强化了一些；

-- 优化路由加载的性能问题以及增加图片懒加载功能；

修改 js/Andrew_Loader 功能插件以及增加更多的参数；

修改 css/style.css 样式文件；

修改 js/router.js 路由管理文件；

修改 js/plugin/Andrew_Viewer.js 功能插件bug；

修改 js/plugin/Andrew_Tabs.js 功能插件bug；

修改 js/plugin/Andrew_TouchDelete.js 功能插件bug；

修改 js/plugin/Andrew_Slider.js 功能插件bug；

修改 js/plugin/Andrew_ScrollFixed.js 功能插件bug；

修改 js/plugin/Andrew_Lazyload.js 功能插件bug；

修改 js/plugin/Andrew_Loader.js 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）

# 更新时间：2018/06/09 下午 19:03

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.9版本；

--Andrew_Config中增加了ImgLoadStyle参数设置让图片加载时有loading效果（共5个效果）

--Andrew_Router中增加了Animate参数设置让页面切换时有动画效果 （引入akjs.animate.css动画库里的效果）

-- 这次版本主要优化性能以及对动画功能进行强化了一些；

修改 js/router.js 路由管理文件；

修改 css/style.css 样式文件；

修改 js/plugin/Andrew_Slider.js（包含对应的css） 功能插件bug；

修改演示版中的几个demo文件。（demo.html ~ demo5.html /router/page1 ~ page5）

# 更新时间：2018/06/07 下午 17:15

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.8版本；

--主要解决安卓机输入框兼容性问题；

修改 css/style.css 样式文件；

修改 js/plugin/Andrew_TouchDelete.js 功能插件bug；

修改 js/plugin/css/Andrew_WebToast.css 样式文件；

# 更新时间：2018/06/06 下午 12:10

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.7版本；

修改 css/style.css 样式文件；

修改 js/plugin/Andrew_DropLoad.js 功能插件bug；

修改 js/plugin/Andrew_ScrollFixed.js 功能插件bug；

修改 js/plugin/Andrew_PreviewImage.js 功能插件中增加上传文件大小限制参数；

修改 js/plugin/Andrew_Dialog.js（包含对应的css） 功能插件bug；

修改 js/plugin/Andrew_Tabs.js 功能插件bug；

修改 js/plugin/Andrew_SnInput.js 功能插件bug；

修改演示版的router/page1.html和router/page4.html；

# 更新时间：2018/5/31 上午 11:35

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.6版本；

增加系统语言、系统设备、浏览器等判断功能；

增加判断窗口大小实时变化的功能；

增加常用数据校验功能；

以上功能的使用方法是Andrew_sUserAgent, Andrew_Responsive, Andrew_RegsInput;

原先在router中用的通过.tail样式布局固定到页面底部的方法已取消。现在是直接写到ak-footer里即可用布局固定的方法。

# 更新时间：2018/5/29 下午 15:55

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.5版本；

增加 Andrew_Params功能；该功能是获取router的参数。

比如url地址是/#/home/page时通过Andrew_Params(1),Andrew_Params(2)获取home和page；

增加 data-href="./"当前路径跳页的方法；

# 更新时间：2018/5/28 下午 15:30

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.4版本；

修改data-href参数关闭时出现js报错的问题；

# 更新时间：2018/5/24 下午 17:25

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.3版本；

#1.1.3的版本中增加了路由模式的url中的akjs参数开关功能以及文件格式设置功能；

修改 js/plugin/Andrew_Loader.js 功能插件bug；

修改 js/plugin/Andrew_QRcode.js 功能插件bug；

修改底部菜单的选中和不选中的图标一样时图标消失的bug；

akjs.mobile.css 中 增加了 grbg_black和grbg_white 开头的渐变背景颜色；


# 更新时间：2018/5/23 下午 16:22

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.2版本；

主要解决让路由延迟加载后把有些功能插件无法正常运行的问题。

功能插件按需引入只能在plugin.js文件中引入的方法修改成可引入到当前需要的页面里。

# 更新时间：2018/5/14 下午 14:55

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.1版本；

当前版本改动的文件比较多所以把js/plugin/ 文件夹里面的所有文件都全部替换后使用；

1、解决jQuery低版本不支持的问题。当前版本是支持jQuery的所有版本；

2、解决二维码插件在微信环境中长按无法识别二维码的问题；

3、完善了模仿今日头条TAB功能插件；

4、为了兼容低版本jQuery把所有的功能插件js代码全部优化完毕；

5、js/plugin/Andrew_WebToast.js 修改bug； （2015-5-15）



# 更新时间：2018/5/09 下午 16:36

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.1.0版本；

修改不走路由功能时界面加载失败的bug以及聊天界面的输入框焦点时头部区域漂浮的问题。

增加以下几个功能

Andrew_setCookie & Andrew_getCookie & Andrew_delCookie 使用方法：

Andrew_setCookie("username", user, 365); //设置cookie

var user = Andrew_getCookie("username"); //获取cookie

Andrew_delCookie(name) //删除cookie

Andrew_htmlEncode & Andrew_htmlDecode 使用方法：

Andrew_htmlEncode(str); //把TEXT转换HTML

Andrew_htmlDecode(str); //把HTML转换TEXT


# 更新时间：2018/5/08 下午 16:30

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.0.9版本；

解决页面刷新时布局有变形的bug以及Andrew_Unicode的函数，把中文转换Unicode。

增加以及修改几个功能插件：

增加 js/plugin/Andrew_QRcode.js //二维码生成插件

增加 js/plugin/Andrew_Marquee.js //上下左右滚动插件

增加 js/plugin/Andrew_TypeIt.js //文字打字效果插件

增加 js/plugin/Andrew_Vticker.js //列表垂直滚动插件

修改 js/plugin/Andrew_Tabs.js //修改tabs功能中的回调函数

修改 js/plugin/Andrew_Select.js //解决界面先后加载顺序问题

修改 js/plugin/Andrew_Form.js //解决界面先后加载顺序问题

修改 js/plugin/Andrew_DropLoad.js //解决有些设备下拉滑动时卡顿的问题

修改 js/plugin/Andrew_NavScroll.js //导航滑动时增加弹性效果

最后请把js目录中的plugin.js文件进行替换。


# 更新时间：2018/5/02 下午 14:35

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.0.8版本；

解决通过安卓端微信浏览器访问时页面白屏的bug；

演示版的引导页增加动画效果；请替换router/start.html 即可。

修改js/plugin/Andrew_Slider.js功能插件，增加循环设置参数（loopPlay）。


# 更新时间：2018/4/26 下午 13:20

# 更新说明：

js目录和css目中 akjs.mobile.js 和 akjs.mobile.css 发布 1.0.7版本；

--这次升级是主要解决混合开发APP的时候IOS版本不兼容window.location.href方法跳页的问题，所以这次版本中封装了 Andrew_Location 功能解决兼容问题。

--还有为了后台开发方便封装了Andrew_getUrlParam 获取URL中的参数值的方法和Andrew_changeURLArg更改URL中的参数值的方法。

以上三个功能的使用方法在打开router.js文件中的第63行代码部分即可。

1.0.7版本中增加了Andrew_Include功能；是js文件中引入另一个js文件的功能。也可以在js文件中引入css样式。

Andrew_Include使用方法(在js代码中使用)： 

js引入 - Andrew_Include("file.js","js"); 或者 Andrew_Include("file.js");

css引入 - Andrew_Include("file.css","css");

原先data.js文件在router.js文件中通过Andrew_Include的方法引入到演示版项目中。


# 更新时间：2018/4/25 下午13:00

# 更新说明：

增加 js/plugin/Andrew_Circliful.js 圆形统计插件。

打开 js/plugin.js 文件 插入 Andrew_Plugin("Andrew_Circliful"); 即可用。调用方法在page4.html文件中的最底部。


# 更新时间：2018/4/24 下午15:20

# 更新说明：

发布 AKjs1.0.6版本，并且个别的文件名更改。

andrew.mobile.plugin.js 文件名更改为 akjs.mobile.js

andrew.mobile.style.css 文件名更改为 akjs.mobile.css

andrew.animate.css 文件名更改为 akjs.animate.css

andrew.router.js 文件名更改为 router.js

css/style.css 文件需要替换；

akjs.mobile.js 里新增了Andrew_DateFormat的功能函数；

--- 使用方法：Andrew_DateFormat(new Date(),"yyyy-MM-dd HH:mm") //后台开发时方便与日期格式化

这次新版还新增了 js/plugin/Andrew_Template.js 模板引擎功能插件；

--- 使用方法：$("元素").Andrew_Template(list_data); //该插件的使用方法在router/page4.html中展示了效果，可参考该文件。


# 更新时间：2018/4/20 下午17:05

# 更新说明：

css目中 andrew.animate.css 发布 1.0.2版本 （增加60多种动画效果）；

js目录和css目中 andrew.mobile.plugin.js 和 andrew.mobile.style.css 发布 1.0.5版本；

修改data-href=值带参数的时候无法识别被选中的状态bug；

增加animation参数跟数据结合的调用方式（数据请求的时候直接写Andrew_Animation();可以使用data-animation属性）；


# 更新时间：2018/4/19 下午13:00

# 更新说明：

更新css目录中的andrew.animate.css 文件；

js目中 andrew.mobile.plugin.js 发布 1.0.4版本 （增加 animation参数可方便制作动画效果）；

Andrew_Config功能中animation参数开启（例：元素里加 data-animation="{name: 'zoomIn', duration:1, delay: 0}"） 动画库：andrew.animate.css


# 更新时间：2018/4/18 下午12:30

# 更新说明：

演示版增加仿京东产品分类Tabs功能；

修改 Andrew_CountDown和Andrew_Progress功能插件的bug（在js/plugin/目录下找相关文件进行替换即可）；

css目中 andrew.mobile.style.css 发布 1.0.4版本 （增加 class名h_fill 可以把元素高度设定为屏幕高度）；

Andrew_Config功能中MaskStyle的参数可设置到 style8;


# 更新时间：2018/4/17 下午09:18

# 更新说明：

之前发布的版本中js/plugin.js按需引入有问题，所以该js文件需要重新替换；

Andrew_Progress功能插件增加文字动画效果（在js/plugin/文件中的Andrew_Progress.js和以及该目录中的css文件夹也需要一起替换）；


# 更新时间：2018/4/11 下午17:05

# 更新说明：

js目录和css目中 andrew.mobile.plugin.js 和 andrew.mobile.style.css 发布 1.0.3版本；

Andrew_Config 功能插件增加了 Responsive参数（该参数能设置按屏幕尺寸字体大小自适应变化；开启 true, 停用 false）

js/andrew.router.js 文件中找Andrew_Config功能增加Responsive参数即可。


# 更新时间：2018/4/10 下午16:10

# 更新说明：

增加Andrew_NavScroll功能插件；

演示版的布局界面中使用Andrew_NavScroll插件和分享功能的展示；

js目录和css目中 andrew.mobile.plugin.js 和 andrew.mobile.style.css 发布 1.0.2版本；

js/plugin.js中请加上Andrew_NavScroll的功能插件；

css/style.css文件需要替换（new_icon和footer区域样式有修改）；

底部菜单中增加最新消息图标（添加class名 new_icon）；

js/plugin/Andrew_StepOrder.js 需要替换；

引导页切换页面的过程中有闪屏的情况时，请替换jQuery3.2.1的版本；


# 更新时间：2018/4/03 下午16:50

# 更新说明：

js目录和css目中 andrew.mobile.plugin.js 和 andrew.mobile.style.css 发布 1.0.1版本；

解决上传图片功能插件删除图片时插件报错的bug（请替换一下Andrew_PreviewImage.js）

Andrew_PreviewImage的插件调用部分的参数修改成以下的方式；

webToast: "成功删除!", //删除图片后提示的文字

Del_icon:"icon-bt_quxiao_a", //图片删除图标样式


# 更新时间：2018/3/30 下午8:48

# 更新说明：

AK插件优化，改成轻量级插件（功能插件分离后可按需引入）；

增加下拉加载更多功能；

全部替换为iconfont图标库；

修改插件上拉刷新和下拉加载的数据调用时的bug；

修改底部菜单切换时图标不变的bug；


# 主要目录和主要文件说明：

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
