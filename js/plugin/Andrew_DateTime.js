/*
Modification Date: 2018-05-12
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_DateTime-------------------------------------------*/
(function($){
    // 补0;
    function fillZero(x) {
        if (x < 10) {
            return x = "0" + x;
        } else {
            return "" + x;
        }
    }
    $.fn.Andrew_DateTime = function(opt) {
        function cPlugin(o, emlnum) {
            var sjObj = o;
            //默认参数
            sjObj.defaults = {
                type: "time",
                Format: "yyyy-mm-dd",
                //显示日期格式//yyyy表示年份 ，mm月份 ，dd天数
                timeFormat: "h:m:s",
                //显示时间格式//h小时，m分 s秒
                width: 60,
                //px
                height: 40,
                //px
                Year: true,
                //是否显示年//
                Month: true,
                //是否显示月//
                Day: true,
                //是否显示日//
                Hour: true,
                //是否显示小时
                Minute: true,
                //是否显示分钟
                Seconds: false,
                //是否显示秒
                yyArr: [],
                //年份数组
                mmArr: [],
                //月份数组
                ddArr: [],
                //天数数组
                hArr: [],
                //小时数组
                mArr: [],
                //分钟数组
                sArr: [],
                //分钟数组
                yyyy: "2000",
                //当前显示年
                mm: "01",
                //当前显示月
                dd: "01",
                //当前显示日
                h: "01",
                //当前显示小时
                m: "01",
                //当前显示分
                s: "01",
                //当前显示秒
                val: null,
                //最终显示时间
                yearText: "Y",
                //顶部时间 年单位 文字
                monthText: "M",
                //顶部时间 月单位 文字
                dayText: 'D',
                //顶部时间 日单位 文字
                hourText: 'H',
                //顶部时间 时单位 文字
                minuteText: 'M',
                //顶部时间 分单位 文字
                secondsText: 'S',
                //顶部时间 秒单位 文字
                okText: "OK",
                //按钮确认键文字
                cancelText: "CANCEL",
                //按钮取消键文字
                thisElm: null,
                //当前控制的dom
                showNowTime: true,
                //是否默认显示当前时间
                alwaysShow: false,
                //是否默认直接显示插件
                timeElm: null,
                //放时间插件的box
                isparseInt: false,
                //单独显示一个时间是否为正整数
                finalshow: true,
                boxClassName: "",
                onfun: function(sjObj) { //取消改变时间时候执行事件
                },
                okfun: function(sjObj) { //确认时间时候执行事件
                },
                t_box: null,
                //保存生产元素盒子
                df_persp: function() {
                    return $("<div class='ak-datetime'><div class='ak-mask'></div>")
                },
                df_box: function() {
                    return $("</div><div class='jdt_box animated slideInUp " + (sjObj.opt.alwaysShow ? "alwaysShow": "") + " " + sjObj.opt.boxClassName + "' style='line-height:" + sjObj.opt.height + "px;'></div>")
                },
                df_main: function() {
                    return $("<div class='jdt_main'>")
                },
                df_btn: function() {
                    if (sjObj.opt.alwaysShow) {
                        return
                    }
                    return $("<div class='jdt_btn'><button type='button' class='jdt_no bg_white c_gray_777'>" + sjObj.opt.cancelText + "</button><button type='button' class='jdt_ok bg_white c_title'>" + sjObj.opt.okText + "</button></div>")
                },
                df_wrap: function() {
                    return $("<div class='jdt_wrap'><table><tbody><tr></tr></tbody></table><div class='jdt_active' style='height:" + sjObj.opt.height + "px; margin-top:-" + sjObj.opt.height * 3 + "px;'></div></div>")
                },
                df_final: function() {
                    return $("<div class='jdt_final c_title'></div>")
                },
                getArr: function() {
                    //按时间生成分钟，小时，月天数，月份
                    for (var i = 0; i < 61; i++) {
                        if (i < 12) {
                            this.mmArr[i] = (i + 1);
                        }
                        if (i < 31) {
                            this.ddArr[i] = (i + 1);
                        }
                        if (i < 24) {
                            this.hArr[i] = i;
                        }
                        if (i < 60) {
                            this.mArr[i] = i;
                            this.sArr[i] = i;
                        }
                        if (i < 61 && !sjObj.opt.Year && !sjObj.opt.Month && !sjObj.opt.Day && !sjObj.opt.Hour) {
                            this.mArr[i] = i;
                        }
                    }
                },
                y: 10,
                nowTime: new Date(),
                startYear: null,
                //自定义开始年份
                endYear: null,
                //自定义结束年份
                ampmText: null,
                //上午下午
                //结构字符串生成
                dataNum: 0,

                strStart: function(text, c) {
                    var df = this;
                    var str;
                    var text = text || "";
                    //console.log(this);
                    if (df.width) {
                        str = '<div class="jdt_class">' + text + '</div><div class="jdt_item " style="height:' + (df.height * 5 - 1) + 'px;min-width:' + df.width + 'px"><ul class="jdt_ul" data-class=' + c + '>';
                    } else {
                        str = '<div class="jdt_class">' + text + '</div><div class="jdt_item " style="height:' + (df.height * 5 - 1) + 'px"><ul class="jdt_ul" data-class=' + c + '>';
                    }
                    sjObj.opt.dataNum++;
                    return str;
                },
                //拼接字符串结尾
                strEnd: function() {
                    var df = this;
                    return "</ul><div class='jdt_bg'><div class='jdt_top' style='height:" + (df.height * 2) + "px'></div><div class='jdt_mid' style='height:" + df.height + "px'></div><div class='jdt_btm' style='height:" + (df.height * 2) + "px'></div></div></div>"
                },
                //数字小于10 就在字前面+一个0
                fillZero: function(x) {
                    if (x < 10) {
                        return x = "0" + x;
                    } else {
                        return "" + x;
                    }
                },
                //获取年份
                getYear: function() {
                    if (!this.startYear) {
                        var y = sjObj.opt.y || 10;
                        var nowTime = new Date();
                        for (var x = this.y,
                                 i = 0; x != 0; y > 0 ? x--:x++, i++) {
                            if (y < 0) {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + x + 1;
                            } else {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + i;
                            }
                        }
                        sjObj.opt.getArr()
                        //console.log(this.yyArr);
                        //console.log(this.mmArr);
                        //console.log(this.ddArr);
                        //console.log(this.hArr);
                        //console.log(this.mArr);
                    } else {
                        if (sjObj.opt.yyArr.length > 1) {
                            //console.log("年份",sjObj.opt.yyArr);
                            return;
                        }
                        var endYear = this.endYear || parseInt(sjObj.opt.y) + parseInt(this.startYear);
                        var y = -(endYear - parseInt(this.startYear));
                        nowTime = new Date(endYear + "/01/01");
                        //console.log("自定义起始年份",endYear,y,nowTime);
                        for (var x = y,
                                 i = 0; y > 0 ? x != 0 : x < 1; y > 0 ? x--:x++, i++) {
                            if (y < 0) {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + x;
                                //console.log(x, sjObj.opt.yyArr[i]);
                            } else {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + i;
                            }
                        }
                        sjObj.opt.getArr()
                    }
                },
                //核心内容居中
                setCenter: function() {
                    var wid = $(window).width();
                    var tabWid = null;
                    var mWid = 0;
                    $(".jdt_wrap table").each(function() {
                        tabWid += parseFloat($(this).width());
                    });
                    if (tabWid > wid) {
                        $(".jdt_wrap table").each(function() {
                            mWid = parseFloat($(this).width()) > mWid ? parseFloat($(this).width()) : mWid;
                        });
                        $('.jdt_box').width(mWid);
                    } else {
                        $('.jdt_box').width(tabWid + 10)
                    }
                },
                //返回数组组成的html字符串
                buildArrStr: function(Arr, txt, c) {
                    var str = this.strStart(txt, c);
                    $.each(Arr,
                        function() {
                            str += '<li class="jdt_li jdt_show"  data-val=' + sjObj.opt.fillZero(this) + ' style="line-height:' + sjObj.opt.height + 'px;height:' + sjObj.opt.height + 'px">' + sjObj.opt.fillZero(this) + '</li>'
                        });
                    //console.log(Arr)
                    str += sjObj.opt.strEnd();
                    return str;
                },
                //创建html
                buildHTml: function() {
                    var wrap = sjObj.opt.df_wrap();
                    sjObj.opt.t_box = sjObj.opt.df_box();
                    var main = sjObj.opt.df_main();
                    var persp = sjObj.opt.df_persp();
                    //console.log(sjObj.opt.t_box);
                    if (sjObj.opt.alwaysShow) {
                        //  if(){
                        // sjObj.opt.timeElm.append(persp.append(sjObj.opt.t_box.append(sjObj.opt.df_final).append(main.append(wrap)).append(sjObj.opt.df_btn)));
                        //  }else{
                        sjObj.opt.timeElm = eval(sjObj.opt.timeElm);
                        //console.log(sjObj.opt.timeElm)
                        sjObj.opt.timeElm.append(sjObj.opt.t_box.append(main.append(wrap)));
                        //  }
                    } else {
                        sjObj.opt.timeElm = $("<div class='ak-datetime'><div class='ak-mask'></div>");
                        sjObj.opt.timeElm.append(sjObj.opt.t_box.append(sjObj.opt.finalshow ? sjObj.opt.df_final: "").append(main.append(wrap)).append(sjObj.opt.df_btn));
                        $('body').append(sjObj.opt.timeElm);
                        document.activeElement.blur();//隐藏键盘
                        $("main").removeClass("scrolling");
                        sjObj.opt.timeElm.find(".ak-mask").bind({
                            touchmove: function (e) {
                                e.preventDefault();
                            }
                        });
                        // $('body').append(persp.append(sjObj.opt.t_box.append(sjObj.opt.df_final).append(main.append(wrap)).append(sjObj.opt.df_btn)));
                    }
                    if (sjObj.opt.ampmText) {
                        main.append("<div class='jdt_wrap'><table><tbody><tr><td>" + sjObj.opt.buildAmPmStr() + "</tr></tbody></table></div>")
                    }
                    if (sjObj.opt.Format == "dd-mm-yyyy") {
                        if (sjObj.opt.Day) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>");
                        if (sjObj.opt.Month) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>");
                        if (sjObj.opt.Year) $(sjObj.opt.timeElm.find('jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>");
                    } else if (sjObj.opt.Format == "mm-dd-yyyy") {
                        if (sjObj.opt.Month) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>");
                        if (sjObj.opt.Day) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>");
                        if (sjObj.opt.Year) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>");
                    } else if (sjObj.opt.Format == "yyyy-mm") {
                        if (sjObj.opt.Year) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>");
                        if (sjObj.opt.Month) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>");
                    } else if (sjObj.opt.Format == "yyyy") {
                        if (sjObj.opt.Year) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>");
                    } else {
                        if (sjObj.opt.Year) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>");
                        if (sjObj.opt.Month) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>");
                        if (sjObj.opt.Day) $(sjObj.opt.timeElm.find('.jdt_wrap')[0]).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>");
                    }
                    if (sjObj.opt.Hour || sjObj.opt.Minute || sjObj.opt.Seconds) {
                        var eml = sjObj.opt.df_wrap();
                        main.append(eml);
                    }
                    if (sjObj.opt.Hour) {
                        $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.hArr, sjObj.opt.hourText, "h") + "</td>")
                    }
                    if (sjObj.opt.Minute) {
                        $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mArr, sjObj.opt.minuteText, "m") + "</td>");
                    }
                    if (sjObj.opt.Seconds) {
                        $(eml).find('tr').append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.sArr, sjObj.opt.secondsText, "s") + "</td>");
                    }
                    if (sjObj.opt.showNowTime) {
                        if (emlnum) {
                            var val = sjObj.value,
                                sjeml = sjObj;
                        } else {
                            var val = sjObj[0].value,
                                sjeml = sjObj[0];
                        }
                        if (val) {
                            //console.log("input中有值",val);
                            //console.log(val.indexOf(" "));
                            if (val.indexOf("/") != -1) {
                                val = val.replace(/\//g, "-")
                            }
                            if (val.indexOf(" ") != -1) {
                                var valarr = val.split(" ");
                            } else {
                                var valarr = [val];
                            }
                            //console.log("拆分后",valarr);
                            var nyr, sfm;
                            var str = "";
                            if (valarr.length == 2) {
                                nyr = valarr[0];
                                sfm = valarr[1];
                                str += getnyrstr(nyr) + " " + getsfmstr(sfm);
                            } else if (valarr.length == 1 && (valarr.indexOf("-") != -1 || valarr.indexOf("/") != -1)) {
                                str += getnyrstr(valarr[0]) + " " + getsfmstr("")
                                //console.log("组合 2");
                            } else {
                                if (sjObj.opt.Year || sjObj.opt.Month || sjObj.opt.Day) {
                                    str += getnyrstr(valarr[0]) + " " + getsfmstr("")
                                } else {
                                    str += getnyrstr("") + " " + getsfmstr(valarr[0])
                                }
                                //console.log("组合 3");
                            }
                            //console.log("合成字符串",str)
                            data = new Date(str.replace(/-/g, "/"));
                        } else {
                            var data = new Date();
                        }
                        //console.log(data);
                        var year = data.getFullYear();
                        var month = data.getMonth() + 1;
                        var day = data.getDate();
                        var hours = data.getHours();
                        var Minutes = data.getMinutes();
                        var Seconds = data.getSeconds();
                        sjObj.opt.yyyy = fillZero(year);
                        sjObj.opt.mm = fillZero(month);
                        sjObj.opt.dd = fillZero(day);
                        sjObj.opt.h = fillZero(hours);
                        sjObj.opt.m = fillZero(Minutes);
                        sjObj.opt.s = fillZero(Seconds);
                        //console.log(year,month,day,hours,Minutes);
                        //console.log("是否显示年",sjObj.opt.Year)
                        if (sjObj.opt.Year) sjObj.opt.timeElm.find("[data-class='yyyy'] .jdt_li").each(function() {
                            //console.log(parseInt($(this).attr("data-val")),parseInt(year))
                            if (parseInt($(this).attr("data-val")) == parseInt(year)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY,year)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Month) sjObj.opt.timeElm.find("[data-class='mm'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(month)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY,month)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Day) sjObj.opt.timeElm.find("[data-class='dd'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(day)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(day)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Hour) sjObj.opt.timeElm.find("[data-class='h'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(hours)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY,Hour)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Minute) sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(Minutes)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY,Minutes,$(this).index(),this)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Seconds) sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(Seconds)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                    } else {
                        //console.log("使用自定义时间")
                        if (sjObj.opt.Year) sjObj.opt.timeElm.find("[data-class='yyyy'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.yyyy)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Month) sjObj.opt.timeElm.find("[data-class='mm'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.mm)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Day) sjObj.opt.timeElm.find("[data-class='dd'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.dd)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Hour) sjObj.opt.timeElm.find("[data-class='h'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.h)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY, sjObj.opt.h, $(this).index());
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Minute) sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.m)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY, sjObj.opt.m, $(this).index());
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        });
                        if (sjObj.opt.Seconds) sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                            if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.s)) {
                                var pY = -($(this).index() - 2) * sjObj.opt.height;
                                //console.log(pY)
                                $(this).parent().css({
                                    "transform": "translate(0," + pY + "px)"
                                })
                            }
                        })
                        //console.log("设置默认时间")
                    }
                    sjObj.opt.fillData();
                    sjObj.opt.setCenter();
                    sjObj.opt.bindFun();
                },
                //绑定事件
                bindFun: function() {
                    //关闭事件
                    sjObj.opt.timeElm.find(".jdt_no").unbind("click");
                    sjObj.opt.timeElm.find(".jdt_no").on("click",
                        function() {
                            $(this).parent().parent().parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove();
                                },
                                500);
                            sjObj.opt.onfun(sjObj);
                            $("main").addClass("scrolling");
                            //$("html").removeClass("ovh");
                        });
                    sjObj.opt.timeElm.find(".ak-mask").unbind("click");
                    sjObj.opt.timeElm.find(".ak-mask").on("click",
                        function() {
                            $(this).parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove();
                                },
                                500);
                            sjObj.opt.onfun(sjObj);
                            $("main").addClass("scrolling");
                            //$("html").removeClass("ovh");
                        });
                    sjObj.opt.timeElm.find(".jdt_ok").unbind("click");
                    sjObj.opt.timeElm.find(".jdt_ok").on("click",
                        function() {
                            var str = "";
                            if (sjObj.opt.Year) {
                                str = sjObj.opt.Format.replace("yyyy", sjObj.opt.yyyy)
                            }
                            if (sjObj.opt.Month) {
                                str = str.replace("mm", sjObj.opt.mm);
                            } else {
                                str = str.replace("-mm", "");
                            }
                            if (sjObj.opt.Day) {
                                str = str.replace("dd", sjObj.opt.dd)
                            } else {
                                str = str.replace("-dd", "");
                            }
                            if (sjObj.opt.Day && sjObj.opt.Hour) {
                                str += " ";
                            }
                            if (sjObj.opt.Hour) {
                                str += sjObj.opt.h
                            }
                            if (sjObj.opt.Minute && sjObj.opt.Hour) {
                                str += ":"
                            }
                            if (sjObj.opt.Minute) {
                                str += sjObj.opt.m;
                            }
                            if (sjObj.opt.Minute && sjObj.opt.Seconds) {
                                str += ":"
                            }
                            if (sjObj.opt.Seconds) {
                                str += sjObj.opt.s;
                            }
                            sjObj.opt.val = sjObj.opt.isparseInt ? parseInt(str) : str;
                            //console.log("我执行了没")
                            $(sjObj.opt.thisElm).next("label").hide();
                            $(sjObj.opt.thisElm).val(sjObj.opt.val);
                            //$(this).parent().parent().parent().remove();
                            $(this).parent().parent().parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove();
                                },
                                500);
                            sjObj.opt.okfun(sjObj);
                            $("main").addClass("scrolling");
                            //$("html").removeClass("ovh");
                        });
                    //滚动事件
                    sjObj.opt.moveElm(sjObj.opt.timeElm.find(".jdt_bg"))
                },
                //将时间放入dom中
                fillData: function() {
                    var str = "";
                    if (sjObj.opt.Year) {
                        str += sjObj.opt.yyyy;
                    }
                    if (sjObj.opt.Month) {
                        str += '-' + sjObj.opt.mm;
                    }
                    if (sjObj.opt.Day) {
                        str += '-' + sjObj.opt.dd;
                    }
                    if (sjObj.opt.Hour) {
                        str += ' ' + sjObj.opt.h;
                    }
                    if (sjObj.opt.Minute) {
                        str += ":" + sjObj.opt.m;
                    }
                    if (sjObj.opt.Seconds) {
                        str += sjObj.opt.s;
                    }
                    if (!sjObj.opt.alwaysShow) {
                        //console.log("直接显示？",sjObj.opt.timeElm.find(".jdt_final"));
                        if (sjObj.opt.isparseInt) {
                            sjObj.opt.timeElm.find(".jdt_final").html(parseInt(str));
                        } else {
                            sjObj.opt.timeElm.find(".jdt_final").html(str);
                        }
                    } else {
                        //console.log("啊哈哈哈哈啊？",sjObj.opt.timeElm.find(".jdt_final"))
                        //console.log($(sjObj.opt.thisElm));
                        $(sjObj.opt.thisElm).html(str).val(str);
                    }
                },
                //变量赋值监听
                vardata: function(name, val) {
                    if (!val) {
                        return;
                    }
                    if (sjObj.opt[name] != val) {
                        sjObj.opt[name] = val;
                        sjObj.opt.fillData();
                    }
                },
                //获取当前日期
                getFinal: function() {
                    var currentY = 0;
                    var str = "";
                    if (sjObj.opt.showNowTime) {
                        sjObj.opt.timeElm.find(".jdt_ul").each(function() {
                            currentY = getTranslateY(this);
                            var dataClass = $(this).attr("data-class");
                            var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                            sjObj.opt.vardata(dataClass, val);
                            //console.log(dataClass,val)
                            $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd",
                                function() {
                                    currentY = getTranslateY(this);
                                    var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                                    dataClass = $(this).attr("data-class");
                                    sjObj.opt.vardata(dataClass, val);
                                    sjObj.opt.daysJudge(dataClass);
                                })
                        })
                    } else {
                        sjObj.opt.timeElm.find(".jdt_ul").each(function() {
                            currentY = getTranslateY(this);
                            var dataClass = $(this).attr("data-class");
                            var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                            sjObj.opt.vardata(dataClass, val);
                            //console.log(dataClass,val)
                            $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd",
                                function() {
                                    currentY = getTranslateY(this);
                                    var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                                    dataClass = $(this).attr("data-class");
                                    sjObj.opt.vardata(dataClass, val);
                                    sjObj.opt.daysJudge(dataClass);
                                })
                        })
                    }
                },
                //根据时间判断当月天数
                daysJudge: function(name) {
                    if (name == 'mm' || name == "yyyy") { //在选择年份获取天数时
                        var day = new Date(sjObj.opt.yyyy, sjObj.opt.mm, 0).getDate();
                        var l = sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_show").length
                        //console.log("dd长度",l,$('[data-class="dd"]'));
                        var mubiao = day - l;
                        if (mubiao > 0) {
                            //console.log("大于");
                            for (var i = 0; i < mubiao; i++) {
                                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_li")[l + i]).removeClass("jdt_hide").addClass("jdt_show")
                                //console.log($($('[data-class="dd"]').find(".jdt_li")[l-1+i]))
                            }
                        } else {
                            //console.log("小于");
                            var naomovey = getTranslateY(sjObj.opt.timeElm.find('[data-class="dd"]'));
                            for (var i = 0; i > mubiao; i--) {
                                //console.log($($('[data-class="dd"]').find(".jdt_li")[l-1+i]),l-1+i)
                                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_li")[l - 1 + i]).removeClass("jdt_show").addClass("jdt_hide")
                            }
                            //console.log("当前y",naomovey,"目标y",(day-1-2)*sjObj.opt.height)
                            if (naomovey > (day - 1 - 2) * sjObj.opt.height) {
                                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                                    "transition": "all .5s"
                                });
                                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                                    "transform": "translate(0," + -(day - 1 - 2) * sjObj.opt.height + "px)"
                                })
                            }
                        }
                        //console.log("当月天数",day);
                    }
                },
                //滚动事件绑定
                moveElm: function(eml) {
                    //console.log("进入",eml)
                    return $(eml).each(function() {
                        //移动事件变量
                        //console.log("进入",$(this))
                        var sX = null,
                            sY = null,
                            mX = null,
                            mY = null,
                            eX = null,
                            eY = null,
                            sTime = null,
                            eTime = null,
                            mTime = null,
                            nTime = null,
                            //开始时间，结束时间，移动时的时间，开始到现在花费的时间
                            nY = 0,
                            drt = null,
                            nowElm = null,
                            //现在的Y位置。方向，当前元素
                            canStart = true,
                            canMove = false,
                            canEnd = false,
                            //移动事件条件。。
                            emlLang = null,
                            //子元素长度
                            maxY = null,
                            minY = null,
                            //最大距离和最小距离
                            lastY = null,
                            nowY = null,
                            moveY = null,
                            stopInertiaMove = false,
                            //是否停止惯性滚
                            SE = null,
                            ME = null,
                            EE = null,
                            moveCy = 0;
                        var stop = function(e) {
                            //Opera/Chrome/FF
                            if (e.preventDefault) e.preventDefault();
                            //IE
                            e.returnValue = false;
                        }
                        //移动事件开始
                        var moveStart = function(e) {
                            //console.log(e);
                            stop(e);
                            if (!canStart) {
                                return
                            }
                            if (e.originalEvent.touches) {
                                SE = e.originalEvent.targetTouches[0]
                            } else {
                                SE = e;
                            }
                            sX = SE.pageX;
                            sY = SE.pageY;
                            nowElm = $(this).prev(".jdt_ul");
                            emlLang = nowElm.find(".jdt_show").length;
                            lastY = sY;
                            nY = getTranslateY(nowElm);
                            //console.log("移动开始时",e);
                            sTime = new Date().getTime();
                            if (!canMove && canEnd) {
                                return false
                            }
                            canStart = false;
                            canMove = false;
                            stopInertiaMove = true;
                            $(window).on("touchmove",
                                function(e) {
                                    if (stopInertiaMove) {
                                        e.preventDefault();
                                    }
                                })

                        };
                        var moveing = function(e) {
                            stop(e);
                            if (e.originalEvent.touches) {
                                ME = e.originalEvent.targetTouches[0]
                            } else {
                                ME = e;
                            }
                            //console.log("移动中",ME,sjObj.opt.nY)
                            mTime = new Date().getTime();
                            mX = ME.pageX;
                            mY = ME.pageY;
                            drt = GetSlideDirection(sX, sY, mX, mY);
                            if ((drt == 1 || drt == 2) && !canStart) {
                                //console.log("条件允许移动")
                                canMove = true;
                                canEnd = true;
                                stopInertiaMove = true;
                            }
                            if (canMove) {
                                nowElm.css({
                                    "transition": "none"
                                });
                                //console.log(sjObj.opt.nowElm,-(sjObj.opt.nY-(sjObj.opt.mY-sjObj.opt.sY)),sjObj.opt.mX,sjObj.opt.sX,sjObj.opt.nY)
                                nowElm.css({
                                    "transform": "translate(0," + -(nY - (mY - sY)) + "px)"
                                });
                                sjObj.opt.getFinal(); //获取当前值
                            }
                            if (mTime - sTime > 300) {
                                //console.log("移动后加速")
                                sTime = mTime;
                                lastY = mY;
                            }
                        };

                        var moveEnd = function(e) {
                            stop(e);
                            if (e.originalEvent.touches) {
                                EE = e.originalEvent.changedTouches[0]
                            } else {
                                EE = e;
                            }
                            eX = EE.pageX;
                            eY = EE.pageY;
                            maxY = sjObj.opt.height * 2;
                            minY = -(emlLang - 3) * sjObj.opt.height;
                            if (canEnd) {
                                canMove = false;
                                canEnd = false;
                                canStart = true;
                                nY = -(nY - (mY - sY));
                                nowY = eY;
                                //console.log(lastY,nowY,"结束时")
                                //console.log(sjObj.opt.nY,-(sjObj.opt.emlLang-2)*sjObj.opt.height)
                                if (nY > maxY) {
                                    nowElm.css({
                                        "transition": "all .5s"
                                    });
                                    nowElm.css({
                                        "transform": "translate(0," + maxY + "px)"
                                    })
                                } else if (nY < minY) {
                                    nowElm.css({
                                        "transition": "all .5s"
                                    });
                                    nowElm.css({
                                        "transform": "translate(0," + minY + "px)"
                                    })
                                } else {
                                    eTime = new Date().getTime();
                                    var speed = ((nowY - lastY) / (eTime - sTime));
                                    //console.log("移动距离",(nowY-lastY))
                                    //console.log("移动时间",(eTime-sTime),sTime,eTime)
                                    //console.log('移动速度',speed);
                                    stopInertiaMove = false;
                                    //惯性滚动函数
                                    (function(v, startTime, contentY) {
                                        var dir = v > 0 ? -1 : 1;
                                        //加速度方向
                                        var deceleration = dir * 0.001; //0.001 为减速时间
                                        //console.log("移动方向",dir);
                                        //console.log("减速率",deceleration);
                                        function inertiaMove() {
                                            if (stopInertiaMove) return;
                                            var nowTime = new Date().getTime();
                                            var t = nowTime - startTime;
                                            var nowV = v + t * deceleration;
                                            //console.log("当期速度",nowV);
                                            var moveY = (v + nowV) / 2 * t;
                                            //console.log("当期移动距离",(contentY+moveY));
                                            //console.log("当期停止条件",dir * nowV,dir,nowV);
                                            if (dir * nowV > 0) { //大于0是减速停止
                                                //console.log("移动结束，总距离",moveCy)
                                                //console.log("移动结束，总距离除以高度",(moveCy/sjObj.opt.height))
                                                //console.log("移动结束，总距离%高度",moveCy%sjObj.opt.height)
                                                if (moveCy > sjObj.opt.maxY) {
                                                    nowElm.css({
                                                        "transition": "all .5s"
                                                    });
                                                    sjObj.opt.nowElm.css({
                                                        "transform": "translate(0," + sjObj.opt.maxY + "px)"
                                                    })
                                                } else if (moveCy < sjObj.opt.minY) {
                                                    nowElm.css({
                                                        "transition": "all .5s"
                                                    });
                                                    nowElm.css({
                                                        "transform": "translate(0," + sjObj.opt.minY + "px)"
                                                    })
                                                } else {
                                                    var MC = Math.round(moveCy / sjObj.opt.height)
                                                    //		console.log(MC)
                                                    if (MC > 2) {
                                                        //			console.log("大于长度")
                                                        MC = 2
                                                    } else if (MC < -(emlLang - 1) + 2) {
                                                        //			console.log("小于长度+显示个数")
                                                        MC = -(emlLang - 1) + 2
                                                    }
                                                    nowElm.css({
                                                        "transition": "all .4s"
                                                    });
                                                    nowElm.css({
                                                        "transform": "translate(0," + sjObj.opt.height * MC + "px)"
                                                    })
                                                }
                                                sjObj.opt.getFinal();
                                                //sjObj.opt.daysJudge();
                                                return
                                            }
                                            moveCy = (contentY + moveY);
                                            if (moveCy > (maxY + (sjObj.opt.height * 2))) {
                                                nowElm.css({
                                                    "transition": "all .5s"
                                                });
                                                nowElm.css({
                                                    "transform": "translate(0," + maxY + "px)"
                                                });
                                                return
                                            } else if (moveCy < (minY - (sjObj.opt.height * 2))) {
                                                nowElm.css({
                                                    "transition": "all .5s"
                                                });
                                                nowElm.css({
                                                    "transform": "translate(0," + minY + "px)"
                                                });
                                                return
                                            }
                                            nowElm.css({
                                                "transform": "translate(0," + moveCy + "px)"
                                            });
                                            sjObj.opt.getFinal();
                                            var timers = setTimeout(inertiaMove, 10);
                                        }
                                        inertiaMove();
                                    })(speed, eTime, nY);
                                }
                                //console.log("移动结束",EE)
                            }
                        };
                        //console.log("开始绑定事件",$(this))
                        $(this).unbind("touchstart mousedown").on("touchstart mousedown", moveStart) //触摸起始//鼠标按下
                        $(this).unbind("touchmove").on("touchmove", moveing) //触摸移动
                        $(this).unbind("touchend").on("touchend", moveEnd) //触摸结束
                        $(document).on("mousemove", moveing) //鼠标按下后移动中
                        $(document).on("mouseup", moveEnd) //鼠标松开
                    })
                }
            };
            sjObj.opt = $.extend({},
                sjObj.defaults, opt);
            var GetSlideAngle = function(dx, dy) { //判断角度
                return Math.atan2(dy, dx) * 180 / Math.PI;
            };
            function getnyrstr(str) {
                var r = sjObj.opt.Format; //yyyy-mm-dd;
                var valarr = str.split("-");
                //console.log(valarr,str);
                if (valarr.length == 3) {
                    r = r.replace("yyyy", valarr[0]);
                    r = r.replace("mm", valarr[1]);
                    r = r.replace("dd", valarr[2]);
                } else if (valarr.length == 2) {
                    if (sjObj.opt.Year && !sjObj.opt.Month) {
                        r = r.replace("yyyy", valarr[0]);
                        r = r.replace("mm", sjObj.opt.mm);
                        r = r.replace("dd", valarr[1]);
                    } else if (sjObj.opt.Year && !sjObj.opt.Day) {
                        r = r.replace("yyyy", valarr[0]);
                        r = r.replace("mm", valarr[1]);
                        r = r.replace("dd", sjObj.opt.dd);
                    } else if (!sjObj.opt.Year) {
                        r = r.replace("yyyy", sjObj.opt.yyyy);
                        r = r.replace("mm", valarr[0]);
                        r = r.replace("dd", valarr[1]);
                    }

                } else if (valarr.length == 1) {
                    if (sjObj.opt.Year) {
                        r = r.replace("yyyy", valarr[0]);
                        r = r.replace("mm", sjObj.opt.mm);
                        r = r.replace("dd", sjObj.opt.dd);
                    } else if (sjObj.opt.Month) {
                        r = r.replace("yyyy", sjObj.opt.yyyy);
                        r = r.replace("mm", valarr[0]);
                        r = r.replace("dd", sjObj.opt.dd);
                    } else if (sjObj.opt.Day) {
                        r = r.replace("yyyy", sjObj.opt.yyyy);
                        r = r.replace("mm", sjObj.opt.mm);
                        r = r.replace("dd", valarr[0]);
                    } else {
                        r = r.replace("yyyy", sjObj.opt.yyyy);
                        r = r.replace("mm", sjObj.opt.mm);
                        r = r.replace("dd", sjObj.opt.dd);
                    }
                }
                //console.log("返回年月日", r);
                return r;
            }
            function getsfmstr(str) {
                var r = sjObj.opt.timeFormat; //yyyy-mm-dd;
                //console.log(r);
                var valarr = str.split(":");
                if (valarr.length == 3) {
                    r = r.replace("h", valarr[0]);
                    r = r.replace("m", valarr[1]);
                    r = r.replace("s", valarr[2]);
                } else if (valarr.length == 2) {
                    if (sjObj.opt.Hour && !sjObj.opt.Minute) {
                        r = r.replace("h", valarr[0]);
                        r = r.replace("m", sjObj.opt.m);
                        r = r.replace("s", valarr[1]);
                    } else if (sjObj.opt.Hour && !sjObj.opt.Seconds) {
                        r = r.replace("h", valarr[0]);
                        r = r.replace("m", valarr[1]);
                        r = r.replace("s", sjObj.opt.s);
                    } else if (!sjObj.opt.Hour) {
                        r = r.replace("h", sjObj.opt.h);
                        r = r.replace("m", valarr[0]);
                        r = r.replace("s", valarr[1]);
                    }

                } else if (valarr.length == 1) {
                    if (sjObj.opt.Hour) {
                        r = r.replace("h", valarr[0]);
                        r = r.replace("m", sjObj.opt.m);
                        r = r.replace("s", sjObj.opt.s);
                    } else if (sjObj.opt.Minute) {
                        r = r.replace("h", sjObj.opt.h);
                        r = r.replace("m", valarr[0]);
                        r = r.replace("s", sjObj.opt.s);
                    } else if (sjObj.opt.Hour) {
                        r = r.replace("h", sjObj.opt.h);
                        r = r.replace("m", sjObj.opt.m);
                        r = r.replace("s", valarr[0]);
                    } else {
                        r = r.replace("h", sjObj.opt.h);
                        r = r.replace("m", sjObj.opt.m);
                        r = r.replace("s", sjObj.opt.s);
                    }
                }
                //console.log("返回时分秒", r);
                return r;
            }
            var GetSlideDirection = function(startX, startY, endX, endY) { //判读手指滑动方向
                var dy = startY - endY;
                var dx = endX - startX;
                var result = 0;
                //如果滑动距离太短
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result;
                }
                var angle = GetSlideAngle(dx, dy);
                if (angle >= -45 && angle < 45) {
                    result = 4; //右
                } else if (angle >= 45 && angle < 135) {
                    result = 1; //上
                } else if (angle >= -135 && angle < -45) {
                    result = 2; //下
                } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                    result = 3; //左
                }
                return result;
            };
            var getTranslateY = function(eml) {
                var matrix = $(eml).css("transform");
                //console.log("获取到的transform",matrix)
                var T;
                if (matrix == "none") {
                    T = 0;
                } else {
                    var arr = matrix.split(",");
                    T = -(arr[5].split(")")[0]);
                }
                //console.log("返回的transform",T)
                return T
            };
            sjObj.innt = function() {
                if (!sjObj.opt.alwaysShow) {
                    $(this).unbind("click");
                    $(this).on("click",
                        function(e) {
                            e.stopPropagation();
                            sjObj.opt.thisElm = this;
                            switch (sjObj.opt.type) {
                                case "time":
                                    //$("html").addClass("ovh");
                                    $(this).blur(); //失去焦点
                                    sjObj.opt.getYear(); //获取年份
                                    sjObj.opt.buildHTml();
                                    sjObj.opt.getFinal();
                                    break;
                            }
                        })
                    //$(this).val(sjObj.opt.time)
                } else {
                    sjObj.opt.thisElm = this;
                    //console.log("直接显示")
                    sjObj.opt.getYear(); //获取年份
                    sjObj.opt.buildHTml();
                }
                $(window).on("resize", function() {
                    //console.log("窗口大小改变")
                    sjObj.opt.setCenter()
                });
            }
            sjObj.innt();
            return sjObj
        }
        if (this.length > 1) {
            //console.log("多个")
            var arr = [];
            $.each(this,
                function() {
                    arr.push(cPlugin(this, true))
                });
            return arr
        } else {
            //console.log("一个")
            var obj = cPlugin(this);
            //console.log("一个时间对象",obj);
            return obj
        }
    }
}(jQuery));