/******JS插件按需引入（注意：插件名称和插件文件名需要保持一致，而且插件文件必须要放到plugin目录里面，否则会出错！）******/
/*
参数说明：ak_include("插件名称或插件的js文件名","该插件是否存在相关css文件？存在写css，不存在设为空。");
* 做项目时不必要的插件可以注释处理。
* 注：调用插件的地方在router目录里的相关html文件中的最底部。
*/
var scripts = document.getElementsByTagName("script")
var script = scripts[scripts.length - 1];
strJsPath = document.querySelector ? script.src : script.getAttribute("src", 4)//IE8直接.src
console.log(strJsPath);//显示当前正在执行js文件的地址

ak_include("Andrew_AllChecked"); //全选功能
ak_include("Andrew_ChangeIcon"); //图标切换功能
ak_include("Andrew_ChangeInput"); //输入框值互换功能
ak_include("Andrew_Checkbox","css"); //复选框美化
ak_include("Andrew_ChooseList"); //按钮模式复选和单选功能
ak_include("Andrew_Codeval","css"); //图片验证功能
ak_include("Andrew_CountDown"); //倒计时功能
ak_include("Andrew_CountTo"); //数字动画效果
ak_include("Andrew_DateTime","css"); //日期和时间插件
ak_include("Andrew_Dialog","css"); //alert，confirm，prompt等弹出层功能
ak_include("Andrew_DropLoad","css"); //上拉刷新和下拉加载更多功能
ak_include("Andrew_DropUpDown"); //列表展开和收起功能
ak_include("Andrew_Favorite"); //点赞或收藏功能
ak_include("Andrew_Form"); //表单提交相关效果
ak_include("Andrew_GetVerifyCode"); //手机短信验证码认证功能
ak_include("Andrew_IntlTelInput","css"); //国际区号选择功能
ak_include("Andrew_Lazyload"); //图片加载时有动画效果
ak_include("Andrew_lightSlider","css"); //图片列表左右滑动功能
ak_include("Andrew_Loader","css"); //Loading效果功能
ak_include("Andrew_MultiDate","css"); //多功能日期和时间插件
ak_include("Andrew_NowTime"); //获取当前时间的功能
ak_include("Andrew_Popupwin"); //弹窗功能
ak_include("Andrew_PortraitImage","css"); //头像上传功能
ak_include("Andrew_PreviewImage","css"); //同时上传多个图片的功能
ak_include("Andrew_Progress","css"); //进度条插件
ak_include("Andrew_Radio","css"); //单选框美化
ak_include("Andrew_Ratyli"); //星级评价功能
ak_include("Andrew_ScrollFixed"); //当屏幕滑动时把指定元素固定到页面顶部的功能
ak_include("Andrew_Select","css"); //下拉菜单功能
ak_include("Andrew_Slider","css"); //联播图功能
ak_include("Andrew_SnInput"); //输入支付密码功能
ak_include("Andrew_Spinner"); //数量控制功能
ak_include("Andrew_StepOrder"); //步骤插件
ak_include("Andrew_Substring"); //输入框里输入的数字强行转换为人民币格式的插件
ak_include("Andrew_Switch","css"); //开关按钮美化
ak_include("Andrew_Tabs"); //TABS切换内容功能
ak_include("Andrew_Textarea"); //多行输入框实时查询字符数的功能
ak_include("Andrew_TouchDelete","css"); //列表滑动删除功能
ak_include("Andrew_TouchSwipe"); //引导页专用联播图功能
ak_include("Andrew_Typeahead","css"); //模糊搜索功能
ak_include("Andrew_Validate"); //表单验证功能
ak_include("Andrew_Viewer","css"); //图片放大预览功能
ak_include("Andrew_WebToast","css"); //提示框效果
