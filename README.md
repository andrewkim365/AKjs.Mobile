# andrew.mobile.plugin
AKjs移动端插件是一个基于JQuery的的一套构建用户界面的前端框架;插件里包含着移动端常用的功能效果以及简单明亮的CSS样式库;对IOS和安卓系统的微站兼容性很完美。


预览效果 http://118.244.206.115:8080/ak/

AKjs前端技术交流QQ群：724501394

# 更新时间：2018/4/13 下午16:46

# 更新说明：

Andrew_Progress功能插件修改bug；

Andrew_Loader功能插件增加局部遮参数；

andrew.mobile.plugin.js需要替换（修改路由路径设置的bug）；

andrew.mobile.style.css需要替换 （增加阴影去掉的class属性，.shadow_none）；

style.css样式中增加渐变效果样式 （可参考以下 .gradient_blue-green 和 .gradient_red-orange）；



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

特别声明：使用jQuery的版本必须3.0以上才能效果完美；


# 主要目录和主要文件说明：

demo.html --- 未开启路由模式的DEMO页面

index.html --- 走路由模式的DEMO页面 （可查看页面切换效果）

js/plugin/ --- 功能插件目录，里面的css目录是相关功能插件的样式文件；

js/andrew.router.js --- 路由管理器（该功能切换页面时无刷新跳页的功能）

js/data.js --- Json数据文件

js/plugin.js --- 按需引入功能插件（按需引入功能插件时后面带css的意思是相关插件有对应的css文件）

layout/main.html --- 整个界面的布局；（该文件夹和文件名可以在路由管理器文件中配置）

router/ --- 通过路由访问的html界面，该文件夹也在路由管理器文件中配置（里面的所有html文件中最底部都调用功能插件的方法）

css/iconfont --- 图标库 (AK图标库地址：http://www.iconfont.cn/collections/detail?cid=8740)

css/andrew.mobile.style.css --- 全局公共样式库（初始使用本插件的开发者们尽量都看看里面的class命名）

css/theme.default.css --- 所有颜色相关的样式文件

css/style.css --- 自定义样式文件（引入第三方插件时通过该css文件进行覆盖样式）
