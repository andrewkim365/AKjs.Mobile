# andrew.mobile.plugin
AKjs移动端插件是一个基于JQuery的的一套构建用户界面的前端框架;插件里包含着移动端常用的功能效果以及简单明亮的CSS样式库;对IOS和安卓系统的微站兼容性很完美。


插件要求：
jquery版本：3.0以上
本地访问：不支持 （必须http协议访问）
浏览器要求：兼容所有移动端常用的浏览器

预览效果 https://andrewkim365.github.io/andrew.mobile.plugin/index.html

# 更新时间：2018/3/30 下午4:12:50

# 更新说明：

AK插件优化（功能插件分离后可按需引入）；增加下拉加载更多功能；全部替换为iconfont图标库；

# 主要目录和主要文件说明：

demo.html --- 未开启路由模式的DEMO预览

index.html --- 开启路由模式的DEMO （可查看页面切换效果）

js/plugin/  --- 功能插件目录，里面的css目录是相关功能插件的样式文件；

js/andrew.router.js --- 路由管理器

js/data.js --- Json数据

js/plugin.js  --- 按需引入功能插件

layout/main.html  --- 整个界面的布局；

router/  --- 通过路由访问的html界面

css/iconfont  --- 图标库 (AK图标库地址：http://www.iconfont.cn/collections/detail?cid=8740)

css/andrew.mobile.style.css  --- 全局公共样式库

css/theme.default.css  --- 所有颜色相关的样式文件
