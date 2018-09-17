/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_DateTime-------------------------------------------*/
(function($) {
    $.fn.AKjs_DateTime = function(opt) {
        function cPlugin(o, emlnum) {
            var sjObj = o;
            sjObj.defaults = {
                type: "time",
                Format: "yyyy-mm-dd",
                timeFormat: "h:m:s",
                width: 60,
                height: 40,
                Year: true,
                Month: true,
                Day: true,
                Hour: true,
                Minute: true,
                Seconds: false,
                yyArr: [],
                mmArr: [],
                ddArr: [],
                hArr: [],
                mArr: [],
                sArr: [],
                yyyy: "2000",
                mm: "01",
                dd: "01",
                h: "01",
                m: "01",
                s: "01",
                val: null,
                yearText: "Y",
                monthText: "M",
                dayText: "D",
                hourText: "H",
                minuteText: "M",
                secondsText: "S",
                okText: "OK",
                cancelText: "CANCEL",
                thisElm: null,
                showNowTime: true,
                alwaysShow: false,
                timeElm: null,
                isparseInt: false,
                finalshow: true,
                boxClassName: "",
                onfun: function(sjObj) {},
                okfun: function(sjObj) {},
                t_box: null,
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
                    for (var i = 0; i < 61; i++) {
                        if (i < 12) {
                            this.mmArr[i] = (i + 1)
                        }
                        if (i < 31) {
                            this.ddArr[i] = (i + 1)
                        }
                        if (i < 24) {
                            this.hArr[i] = i
                        }
                        if (i < 60) {
                            this.mArr[i] = i;
                            this.sArr[i] = i
                        }
                        if (i < 61 && !sjObj.opt.Year && !sjObj.opt.Month && !sjObj.opt.Day && !sjObj.opt.Hour) {
                            this.mArr[i] = i
                        }
                    }
                },
                y: 10,
                nowTime: new Date(),
                startYear: null,
                endYear: null,
                ampmText: null,
                dataNum: 0,
                strStart: function(text, c) {
                    var df = this;
                    var str;
                    var text = text || "";
                    if (df.width) {
                        str = '<div class="jdt_class">' + text + '</div><div class="jdt_item " style="height:' + (df.height * 5 - 1) + "px;min-width:" + df.width + 'px"><ul class="jdt_ul" data-class=' + c + ">"
                    } else {
                        str = '<div class="jdt_class">' + text + '</div><div class="jdt_item " style="height:' + (df.height * 5 - 1) + 'px"><ul class="jdt_ul" data-class=' + c + ">"
                    }
                    sjObj.opt.dataNum++;
                    return str
                },
                strEnd: function() {
                    var df = this;
                    return "</ul><div class='jdt_bg'><div class='jdt_top' style='height:" + (df.height * 2) + "px'></div><div class='jdt_mid' style='height:" + df.height + "px'></div><div class='jdt_btm' style='height:" + (df.height * 2) + "px'></div></div></div>"
                },
                fillZero: function(x) {
                    if (x < 10) {
                        return x = "0" + x
                    } else {
                        return "" + x
                    }
                },
                getYear: function() {
                    if (!this.startYear) {
                        var y = sjObj.opt.y || 10;
                        var nowTime = new Date();
                        for (var x = this.y,
                                 i = 0; x != 0; y > 0 ? x--:x++, i++) {
                            if (y < 0) {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + x + 1
                            } else {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + i
                            }
                        }
                        sjObj.opt.getArr()
                    } else {
                        if (sjObj.opt.yyArr.length > 1) {
                            return
                        }
                        var endYear = this.endYear || parseInt(sjObj.opt.y) + parseInt(this.startYear);
                        var y = -(endYear - parseInt(this.startYear));
                        nowTime = new Date(endYear + "/01/01");
                        for (var x = y,
                                 i = 0; y > 0 ? x != 0 : x < 1; y > 0 ? x--:x++, i++) {
                            if (y < 0) {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + x
                            } else {
                                sjObj.opt.yyArr[i] = nowTime.getFullYear() + i
                            }
                        }
                        sjObj.opt.getArr()
                    }
                },
                setCenter: function() {
                    var wid = $(window).width();
                    var tabWid = null;
                    var mWid = 0;
                    $(".jdt_wrap table").each(function() {
                        tabWid += parseFloat($(this).width())
                    });
                    if (tabWid > wid) {
                        $(".jdt_wrap table").each(function() {
                            mWid = parseFloat($(this).width()) > mWid ? parseFloat($(this).width()) : mWid
                        });
                        $(".jdt_box").width(mWid)
                    } else {
                        $(".jdt_box").width(tabWid + 10)
                    }
                },
                buildArrStr: function(Arr, txt, c) {
                    var str = this.strStart(txt, c);
                    $.each(Arr,
                        function() {
                            str += '<li class="jdt_li jdt_show"  data-val=' + sjObj.opt.fillZero(this) + ' style="line-height:' + sjObj.opt.height + "px;height:" + sjObj.opt.height + 'px">' + sjObj.opt.fillZero(this) + "</li>"
                        });
                    str += sjObj.opt.strEnd();
                    return str
                },
                buildHTml: function() {
                    var wrap = sjObj.opt.df_wrap();
                    sjObj.opt.t_box = sjObj.opt.df_box();
                    var main = sjObj.opt.df_main();
                    var persp = sjObj.opt.df_persp();
                    if (sjObj.opt.alwaysShow) {
                        sjObj.opt.timeElm = eval(sjObj.opt.timeElm);
                        sjObj.opt.timeElm.append(sjObj.opt.t_box.append(main.append(wrap)))
                    } else {
                        sjObj.opt.timeElm = $("<div class='ak-datetime'><div class='ak-mask'></div>");
                        sjObj.opt.timeElm.append(sjObj.opt.t_box.append(sjObj.opt.finalshow ? sjObj.opt.df_final: "").append(main.append(wrap)).append(sjObj.opt.df_btn));
                        $("body").append(sjObj.opt.timeElm);
                        document.activeElement.blur();
                        $("#ak-scrollview").removeClass("scrolling_touch");
                        sjObj.opt.timeElm.find(".ak-mask").bind({
                            touchmove: function(e) {
                                e.preventDefault()
                            }
                        })
                    }
                    if (sjObj.opt.ampmText) {
                        main.append("<div class='jdt_wrap'><table><tbody><tr><td>" + sjObj.opt.buildAmPmStr() + "</tr></tbody></table></div>")
                    }
                    if (sjObj.opt.Format == "dd-mm-yyyy") {
                        if (sjObj.opt.Day) {
                            $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>")
                        }
                        if (sjObj.opt.Month) {
                            $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>")
                        }
                        if (sjObj.opt.Year) {
                            $(sjObj.opt.timeElm.find("jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                        }
                    } else {
                        if (sjObj.opt.Format == "mm-dd-yyyy") {
                            if (sjObj.opt.Month) {
                                $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>")
                            }
                            if (sjObj.opt.Day) {
                                $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>")
                            }
                            if (sjObj.opt.Year) {
                                $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                            }
                        } else {
                            if (sjObj.opt.Format == "yyyy-mm") {
                                if (sjObj.opt.Year) {
                                    $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                                }
                                if (sjObj.opt.Month) {
                                    $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>")
                                }
                            } else {
                                if (sjObj.opt.Format == "yyyy") {
                                    if (sjObj.opt.Year) {
                                        $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                                    }
                                } else {
                                    if (sjObj.opt.Year) {
                                        $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.yyArr, sjObj.opt.yearText, "yyyy") + "</td>")
                                    }
                                    if (sjObj.opt.Month) {
                                        $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mmArr, sjObj.opt.monthText, "mm") + "</td>")
                                    }
                                    if (sjObj.opt.Day) {
                                        $(sjObj.opt.timeElm.find(".jdt_wrap")[0]).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.ddArr, sjObj.opt.dayText, "dd") + "</td>")
                                    }
                                }
                            }
                        }
                    }
                    if (sjObj.opt.Hour || sjObj.opt.Minute || sjObj.opt.Seconds) {
                        var eml = sjObj.opt.df_wrap();
                        main.append(eml)
                    }
                    if (sjObj.opt.Hour) {
                        $(eml).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.hArr, sjObj.opt.hourText, "h") + "</td>")
                    }
                    if (sjObj.opt.Minute) {
                        $(eml).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.mArr, sjObj.opt.minuteText, "m") + "</td>")
                    }
                    if (sjObj.opt.Seconds) {
                        $(eml).find("tr").append("<td>" + sjObj.opt.buildArrStr(sjObj.opt.sArr, sjObj.opt.secondsText, "s") + "</td>")
                    }
                    if (sjObj.opt.showNowTime) {
                        if (emlnum) {
                            var val = sjObj.value,
                                sjeml = sjObj
                        } else {
                            var val = sjObj[0].value,
                                sjeml = sjObj[0]
                        }
                        if (val) {
                            if (val.indexOf("/") != -1) {
                                val = val.replace(/\//g, "-")
                            }
                            if (val.indexOf(" ") != -1) {
                                var valarr = val.split(" ")
                            } else {
                                var valarr = [val]
                            }
                            var nyr, sfm;
                            var str = "";
                            if (valarr.length == 2) {
                                nyr = valarr[0];
                                sfm = valarr[1];
                                str += getnyrstr(nyr) + " " + getsfmstr(sfm)
                            } else {
                                if (valarr.length == 1 && (valarr.indexOf("-") != -1 || valarr.indexOf("/") != -1)) {
                                    str += getnyrstr(valarr[0]) + " " + getsfmstr("")
                                } else {
                                    if (sjObj.opt.Year || sjObj.opt.Month || sjObj.opt.Day) {
                                        str += getnyrstr(valarr[0]) + " " + getsfmstr("")
                                    } else {
                                        str += getnyrstr("") + " " + getsfmstr(valarr[0])
                                    }
                                }
                            }
                            data = new Date(str.replace(/-/g, "/"))
                        } else {
                            var data = new Date()
                        }
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
                        if (sjObj.opt.Year) {
                            sjObj.opt.timeElm.find("[data-class='yyyy'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(year)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Month) {
                            sjObj.opt.timeElm.find("[data-class='mm'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(month)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Day) {
                            sjObj.opt.timeElm.find("[data-class='dd'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(day)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Hour) {
                            sjObj.opt.timeElm.find("[data-class='h'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(hours)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Minute) {
                            sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(Minutes)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Seconds) {
                            sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(Seconds)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                    } else {
                        if (sjObj.opt.Year) {
                            sjObj.opt.timeElm.find("[data-class='yyyy'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.yyyy)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Month) {
                            sjObj.opt.timeElm.find("[data-class='mm'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.mm)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Day) {
                            sjObj.opt.timeElm.find("[data-class='dd'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.dd)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Hour) {
                            sjObj.opt.timeElm.find("[data-class='h'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.h)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Minute) {
                            sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.m)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                        if (sjObj.opt.Seconds) {
                            sjObj.opt.timeElm.find("[data-class='m'] .jdt_li").each(function() {
                                if (parseInt($(this).attr("data-val")) == parseInt(sjObj.opt.s)) {
                                    var pY = -($(this).index() - 2) * sjObj.opt.height;
                                    $(this).parent().css({
                                        "transform": "translate(0," + pY + "px)"
                                    })
                                }
                            })
                        }
                    }
                    sjObj.opt.fillData();
                    sjObj.opt.setCenter();
                    sjObj.opt.bindFun()
                },
                bindFun: function() {
                    sjObj.opt.timeElm.find(".jdt_no").unbind("click");
                    sjObj.opt.timeElm.find(".jdt_no").on("click",
                        function() {
                            $(this).parent().parent().parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove()
                                },
                                500);
                            sjObj.opt.onfun(sjObj);
                            $("#ak-scrollview").addClass("scrolling_touch")
                        });
                    sjObj.opt.timeElm.find(".ak-mask").unbind("click");
                    sjObj.opt.timeElm.find(".ak-mask").on("click",
                        function() {
                            $(this).parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove()
                                },
                                500);
                            sjObj.opt.onfun(sjObj);
                            $("#ak-scrollview").addClass("scrolling_touch")
                        });
                    sjObj.opt.timeElm.find(".jdt_ok").unbind("click");
                    sjObj.opt.timeElm.find(".jdt_ok").on("click",
                        function() {
                            var str = "";
                            if (sjObj.opt.Year) {
                                str = sjObj.opt.Format.replace("yyyy", sjObj.opt.yyyy)
                            }
                            if (sjObj.opt.Month) {
                                str = str.replace("mm", sjObj.opt.mm)
                            } else {
                                str = str.replace("-mm", "")
                            }
                            if (sjObj.opt.Day) {
                                str = str.replace("dd", sjObj.opt.dd)
                            } else {
                                str = str.replace("-dd", "")
                            }
                            if (sjObj.opt.Day && sjObj.opt.Hour) {
                                str += " "
                            }
                            if (sjObj.opt.Hour) {
                                str += sjObj.opt.h
                            }
                            if (sjObj.opt.Minute && sjObj.opt.Hour) {
                                str += ":"
                            }
                            if (sjObj.opt.Minute) {
                                str += sjObj.opt.m
                            }
                            if (sjObj.opt.Minute && sjObj.opt.Seconds) {
                                str += ":"
                            }
                            if (sjObj.opt.Seconds) {
                                str += sjObj.opt.s
                            }
                            sjObj.opt.val = sjObj.opt.isparseInt ? parseInt(str) : str;
                            $(sjObj.opt.thisElm).next("label").hide();
                            $(sjObj.opt.thisElm).val(sjObj.opt.val);
                            $(this).parent().parent().parent().find(".jdt_box").addClass("animated slideOutDown");
                            setTimeout(function() {
                                    sjObj.opt.timeElm.remove()
                                },
                                500);
                            sjObj.opt.okfun(sjObj);
                            $("#ak-scrollview").addClass("scrolling_touch")
                        });
                    sjObj.opt.moveElm(sjObj.opt.timeElm.find(".jdt_bg"))
                },
                fillData: function() {
                    var str = "";
                    if (sjObj.opt.Year) {
                        str += sjObj.opt.yyyy
                    }
                    if (sjObj.opt.Month) {
                        str += "-" + sjObj.opt.mm
                    }
                    if (sjObj.opt.Day) {
                        str += "-" + sjObj.opt.dd
                    }
                    if (sjObj.opt.Hour) {
                        str += " " + sjObj.opt.h
                    }
                    if (sjObj.opt.Minute) {
                        str += ":" + sjObj.opt.m
                    }
                    if (sjObj.opt.Seconds) {
                        str += sjObj.opt.s
                    }
                    if (!sjObj.opt.alwaysShow) {
                        if (sjObj.opt.isparseInt) {
                            sjObj.opt.timeElm.find(".jdt_final").html(parseInt(str))
                        } else {
                            sjObj.opt.timeElm.find(".jdt_final").html(str)
                        }
                    } else {
                        $(sjObj.opt.thisElm).html(str).val(str)
                    }
                },
                vardata: function(name, val) {
                    if (!val) {
                        return
                    }
                    if (sjObj.opt[name] != val) {
                        sjObj.opt[name] = val;
                        sjObj.opt.fillData()
                    }
                },
                getFinal: function() {
                    var currentY = 0;
                    var str = "";
                    if (sjObj.opt.showNowTime) {
                        sjObj.opt.timeElm.find(".jdt_ul").each(function() {
                            currentY = getTranslateY(this);
                            var dataClass = $(this).attr("data-class");
                            var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                            sjObj.opt.vardata(dataClass, val);
                            $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd",
                                function() {
                                    currentY = getTranslateY(this);
                                    var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                                    dataClass = $(this).attr("data-class");
                                    sjObj.opt.vardata(dataClass, val);
                                    sjObj.opt.daysJudge(dataClass)
                                })
                        })
                    } else {
                        sjObj.opt.timeElm.find(".jdt_ul").each(function() {
                            currentY = getTranslateY(this);
                            var dataClass = $(this).attr("data-class");
                            var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                            sjObj.opt.vardata(dataClass, val);
                            $(this).unbind("webkitTransitionEnd").on("webkitTransitionEnd",
                                function() {
                                    currentY = getTranslateY(this);
                                    var val = $($(this).find(".jdt_li")[Math.round(currentY / sjObj.opt.height) + 2]).attr("data-val");
                                    dataClass = $(this).attr("data-class");
                                    sjObj.opt.vardata(dataClass, val);
                                    sjObj.opt.daysJudge(dataClass)
                                })
                        })
                    }
                },
                daysJudge: function(name) {
                    if (name == "mm" || name == "yyyy") {
                        var day = new Date(sjObj.opt.yyyy, sjObj.opt.mm, 0).getDate();
                        var l = sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_show").length;
                        var mubiao = day - l;
                        if (mubiao > 0) {
                            for (var i = 0; i < mubiao; i++) {
                                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_li")[l + i]).removeClass("jdt_hide").addClass("jdt_show")
                            }
                        } else {
                            var naomovey = getTranslateY(sjObj.opt.timeElm.find('[data-class="dd"]'));
                            for (var i = 0; i > mubiao; i--) {
                                $(sjObj.opt.timeElm.find('[data-class="dd"]').find(".jdt_li")[l - 1 + i]).removeClass("jdt_show").addClass("jdt_hide")
                            }
                            if (naomovey > (day - 1 - 2) * sjObj.opt.height) {
                                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                                    "transition": "all .5s"
                                });
                                sjObj.opt.timeElm.find('[data-class="dd"]').css({
                                    "transform": "translate(0," + -(day - 1 - 2) * sjObj.opt.height + "px)"
                                })
                            }
                        }
                    }
                },
                moveElm: function(eml) {
                    return $(eml).each(function() {
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
                            nY = 0,
                            drt = null,
                            nowElm = null,
                            canStart = true,
                            canMove = false,
                            canEnd = false,
                            emlLang = null,
                            maxY = null,
                            minY = null,
                            lastY = null,
                            nowY = null,
                            moveY = null,
                            stopInertiaMove = false,
                            SE = null,
                            ME = null,
                            EE = null,
                            moveCy = 0;
                        var stop = function(e) {
                            if (e.preventDefault) {
                                e.preventDefault()
                            }
                            e.returnValue = false
                        };
                        var moveStart = function(e) {
                            stop(e);
                            if (!canStart) {
                                return
                            }
                            if (e.originalEvent.touches) {
                                SE = e.originalEvent.targetTouches[0]
                            } else {
                                SE = e
                            }
                            sX = SE.pageX;
                            sY = SE.pageY;
                            nowElm = $(this).prev(".jdt_ul");
                            emlLang = nowElm.find(".jdt_show").length;
                            lastY = sY;
                            nY = getTranslateY(nowElm);
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
                                        e.preventDefault()
                                    }
                                })
                        };
                        var moveing = function(e) {
                            stop(e);
                            if (e.originalEvent.touches) {
                                ME = e.originalEvent.targetTouches[0]
                            } else {
                                ME = e
                            }
                            mTime = new Date().getTime();
                            mX = ME.pageX;
                            mY = ME.pageY;
                            drt = GetSlideDirection(sX, sY, mX, mY);
                            if ((drt == 1 || drt == 2) && !canStart) {
                                canMove = true;
                                canEnd = true;
                                stopInertiaMove = true
                            }
                            if (canMove) {
                                nowElm.css({
                                    "transition": "none"
                                });
                                nowElm.css({
                                    "transform": "translate(0," + -(nY - (mY - sY)) + "px)"
                                });
                                sjObj.opt.getFinal()
                            }
                            if (mTime - sTime > 300) {
                                sTime = mTime;
                                lastY = mY
                            }
                        };
                        var moveEnd = function(e) {
                            stop(e);
                            if (e.originalEvent.touches) {
                                EE = e.originalEvent.changedTouches[0]
                            } else {
                                EE = e
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
                                if (nY > maxY) {
                                    nowElm.css({
                                        "transition": "all .5s"
                                    });
                                    nowElm.css({
                                        "transform": "translate(0," + maxY + "px)"
                                    })
                                } else {
                                    if (nY < minY) {
                                        nowElm.css({
                                            "transition": "all .5s"
                                        });
                                        nowElm.css({
                                            "transform": "translate(0," + minY + "px)"
                                        })
                                    } else {
                                        eTime = new Date().getTime();
                                        var speed = ((nowY - lastY) / (eTime - sTime));
                                        stopInertiaMove = false; (function(v, startTime, contentY) {
                                            var dir = v > 0 ? -1 : 1;
                                            var deceleration = dir * 0.001;
                                            function inertiaMove() {
                                                if (stopInertiaMove) {
                                                    return
                                                }
                                                var nowTime = new Date().getTime();
                                                var t = nowTime - startTime;
                                                var nowV = v + t * deceleration;
                                                var moveY = (v + nowV) / 2 * t;
                                                if (dir * nowV > 0) {
                                                    if (moveCy > sjObj.opt.maxY) {
                                                        nowElm.css({
                                                            "transition": "all .5s"
                                                        });
                                                        sjObj.opt.nowElm.css({
                                                            "transform": "translate(0," + sjObj.opt.maxY + "px)"
                                                        })
                                                    } else {
                                                        if (moveCy < sjObj.opt.minY) {
                                                            nowElm.css({
                                                                "transition": "all .5s"
                                                            });
                                                            nowElm.css({
                                                                "transform": "translate(0," + sjObj.opt.minY + "px)"
                                                            })
                                                        } else {
                                                            var MC = Math.round(moveCy / sjObj.opt.height);
                                                            if (MC > 2) {
                                                                MC = 2
                                                            } else {
                                                                if (MC < -(emlLang - 1) + 2) {
                                                                    MC = -(emlLang - 1) + 2
                                                                }
                                                            }
                                                            nowElm.css({
                                                                "transition": "all .4s"
                                                            });
                                                            nowElm.css({
                                                                "transform": "translate(0," + sjObj.opt.height * MC + "px)"
                                                            })
                                                        }
                                                    }
                                                    sjObj.opt.getFinal();
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
                                                } else {
                                                    if (moveCy < (minY - (sjObj.opt.height * 2))) {
                                                        nowElm.css({
                                                            "transition": "all .5s"
                                                        });
                                                        nowElm.css({
                                                            "transform": "translate(0," + minY + "px)"
                                                        });
                                                        return
                                                    }
                                                }
                                                nowElm.css({
                                                    "transform": "translate(0," + moveCy + "px)"
                                                });
                                                sjObj.opt.getFinal();
                                                var timers = setTimeout(inertiaMove, 10)
                                            }
                                            inertiaMove()
                                        })(speed, eTime, nY)
                                    }
                                }
                            }
                        };
                        $(this).unbind("touchstart mousedown").on("touchstart mousedown", moveStart);
                        $(this).unbind("touchmove").on("touchmove", moveing);
                        $(this).unbind("touchend").on("touchend", moveEnd);
                        $(document).on("mousemove", moveing);
                        $(document).on("mouseup", moveEnd)
                    })
                }
            };
            sjObj.opt = $.extend({},
                sjObj.defaults, opt);
            var GetSlideAngle = function(dx, dy) {
                return Math.atan2(dy, dx) * 180 / Math.PI
            };
            function getnyrstr(str) {
                var r = sjObj.opt.Format;
                var valarr = str.split("-");
                if (valarr.length == 3) {
                    r = r.replace("yyyy", valarr[0]);
                    r = r.replace("mm", valarr[1]);
                    r = r.replace("dd", valarr[2])
                } else {
                    if (valarr.length == 2) {
                        if (sjObj.opt.Year && !sjObj.opt.Month) {
                            r = r.replace("yyyy", valarr[0]);
                            r = r.replace("mm", sjObj.opt.mm);
                            r = r.replace("dd", valarr[1])
                        } else {
                            if (sjObj.opt.Year && !sjObj.opt.Day) {
                                r = r.replace("yyyy", valarr[0]);
                                r = r.replace("mm", valarr[1]);
                                r = r.replace("dd", sjObj.opt.dd)
                            } else {
                                if (!sjObj.opt.Year) {
                                    r = r.replace("yyyy", sjObj.opt.yyyy);
                                    r = r.replace("mm", valarr[0]);
                                    r = r.replace("dd", valarr[1])
                                }
                            }
                        }
                    } else {
                        if (valarr.length == 1) {
                            if (sjObj.opt.Year) {
                                r = r.replace("yyyy", valarr[0]);
                                r = r.replace("mm", sjObj.opt.mm);
                                r = r.replace("dd", sjObj.opt.dd)
                            } else {
                                if (sjObj.opt.Month) {
                                    r = r.replace("yyyy", sjObj.opt.yyyy);
                                    r = r.replace("mm", valarr[0]);
                                    r = r.replace("dd", sjObj.opt.dd)
                                } else {
                                    if (sjObj.opt.Day) {
                                        r = r.replace("yyyy", sjObj.opt.yyyy);
                                        r = r.replace("mm", sjObj.opt.mm);
                                        r = r.replace("dd", valarr[0])
                                    } else {
                                        r = r.replace("yyyy", sjObj.opt.yyyy);
                                        r = r.replace("mm", sjObj.opt.mm);
                                        r = r.replace("dd", sjObj.opt.dd)
                                    }
                                }
                            }
                        }
                    }
                }
                return r
            }
            function getsfmstr(str) {
                var r = sjObj.opt.timeFormat;
                var valarr = str.split(":");
                if (valarr.length == 3) {
                    r = r.replace("h", valarr[0]);
                    r = r.replace("m", valarr[1]);
                    r = r.replace("s", valarr[2])
                } else {
                    if (valarr.length == 2) {
                        if (sjObj.opt.Hour && !sjObj.opt.Minute) {
                            r = r.replace("h", valarr[0]);
                            r = r.replace("m", sjObj.opt.m);
                            r = r.replace("s", valarr[1])
                        } else {
                            if (sjObj.opt.Hour && !sjObj.opt.Seconds) {
                                r = r.replace("h", valarr[0]);
                                r = r.replace("m", valarr[1]);
                                r = r.replace("s", sjObj.opt.s)
                            } else {
                                if (!sjObj.opt.Hour) {
                                    r = r.replace("h", sjObj.opt.h);
                                    r = r.replace("m", valarr[0]);
                                    r = r.replace("s", valarr[1])
                                }
                            }
                        }
                    } else {
                        if (valarr.length == 1) {
                            if (sjObj.opt.Hour) {
                                r = r.replace("h", valarr[0]);
                                r = r.replace("m", sjObj.opt.m);
                                r = r.replace("s", sjObj.opt.s)
                            } else {
                                if (sjObj.opt.Minute) {
                                    r = r.replace("h", sjObj.opt.h);
                                    r = r.replace("m", valarr[0]);
                                    r = r.replace("s", sjObj.opt.s)
                                } else {
                                    if (sjObj.opt.Hour) {
                                        r = r.replace("h", sjObj.opt.h);
                                        r = r.replace("m", sjObj.opt.m);
                                        r = r.replace("s", valarr[0])
                                    } else {
                                        r = r.replace("h", sjObj.opt.h);
                                        r = r.replace("m", sjObj.opt.m);
                                        r = r.replace("s", sjObj.opt.s)
                                    }
                                }
                            }
                        }
                    }
                }
                return r
            }
            var GetSlideDirection = function(startX, startY, endX, endY) {
                var dy = startY - endY;
                var dx = endX - startX;
                var result = 0;
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result
                }
                var angle = GetSlideAngle(dx, dy);
                if (angle >= -45 && angle < 45) {
                    result = 4
                } else {
                    if (angle >= 45 && angle < 135) {
                        result = 1
                    } else {
                        if (angle >= -135 && angle < -45) {
                            result = 2
                        } else {
                            if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                                result = 3
                            }
                        }
                    }
                }
                return result
            };
            var getTranslateY = function(eml) {
                var matrix = $(eml).css("transform");
                var T;
                if (matrix == "none") {
                    T = 0
                } else {
                    var arr = matrix.split(",");
                    T = -(arr[5].split(")")[0])
                }
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
                                    $(this).blur();
                                    sjObj.opt.getYear();
                                    sjObj.opt.buildHTml();
                                    sjObj.opt.getFinal();
                                    break
                            }
                        })
                } else {
                    sjObj.opt.thisElm = this;
                    sjObj.opt.getYear();
                    sjObj.opt.buildHTml()
                }
                $(window).on("resize",
                    function() {
                        sjObj.opt.setCenter()
                    })
            };
            sjObj.innt();
            return sjObj
        }
        if (this.length > 1) {
            var arr = [];
            $.each(this,
                function() {
                    arr.push(cPlugin(this, true))
                });
            return arr
        } else {
            var obj = cPlugin(this);
            return obj
        }
    };
    function fillZero(x) {
        if (x < 10) {
            return x = "0" + x
        } else {
            return "" + x
        }
    }
} (jQuery));