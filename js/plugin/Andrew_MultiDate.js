/*
Modification Date: 2018-07-13
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------Andrew_MultiDate-------------------------------------------*/
(function($){
    var jet = {},
        regymdzz = "YYYY|MM|DD|hh|mm|ss|zz", gr = /\-/g,
        parseInt = function (n) { return window.parseInt(n, 10);},
        config = {
            skinCell:"",
            language:{},
            range:false,
            onClose:false,
            trigger:"click",
            format:"YYYY-MM-DD", //日期格式
            minDate:"1900-01-01", //最小日期
            maxDate:"2099-12-31" //最大日期
        };
    $.fn.Andrew_MultiDate = function(options){
        return new Andrew_MultiDate($(this),options||{});
    };
    $.extend({
        Andrew_MultiDate:function(elem, options){
            return new Andrew_MultiDate($(elem),options||{});
        }
    });
    jet.isObj = function (obj){
        for(var i in obj){return true;}
        return false;
    };
    jet.reMatch = function (str) {
        return str.match(/\w+|d+/g);
    };
    jet.docScroll = function(type) {
        type = type ? "scrollLeft" :"scrollTop";
        return document.body[type] | document.documentElement[type];
    };
    jet.docArea = function(type) {
        return document.documentElement[type ? "clientWidth" :"clientHeight"];
    };
    //判断是否闰年
    jet.isLeap = function(y) {
        return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
    };
    //补齐数位
    jet.digit = function(num) {
        return num < 10 ? "0" + (num | 0) :num;
    };
    //判断是否为数字
    jet.isNum = function(value){
        return /^[+-]?\d*\.?\d*$/.test(value) ? true : false;
    };
    //获取本月的总天数
    jet.getDaysNum = function(y, m) {
        var num = 31;
        switch (parseInt(m)) {
            case 2: num = jet.isLeap(y) ? 29 : 28; break;
            case 4: case 6: case 9: case 11: num = 30; break;
        }
        return num;
    };
    //获取月与年
    jet.getYM = function(y, m, n) {
        var nd = new Date(y, m - 1);
        nd.setMonth(m - 1 + n);
        return {
            y: nd.getFullYear(),
            m: nd.getMonth() + 1
        };
    };
    //获取上个月
    jet.prevMonth = function(y, m, n) {
        return jet.getYM(y, m, 0 - (n || 1));
    };
    //获取下个月
    jet.nextMonth = function(y, m, n) {
        return jet.getYM(y, m, n || 1);
    };
    //转换日期格式
    jet.parse = function(ymdhms, format) {
        return format.replace(new RegExp(regymdzz,"g"), function(str, index) {
            return str == "zz" ? "00":jet.digit(ymdhms[str]);
        });
    };
    jet.isparmat = function(format) {
        var remat = jet.reMatch(format), mat = regymdzz.split("|"), tmpArr = [];
        $.each(mat,function (m,mval) {
            $.each(remat,function (r,rval) {
                if (mval == rval) tmpArr.push(rval);
            });
        });
        return tmpArr.join("-");
    };

    jet.parseOld = function(ymd, hms, format) {
        ymd = ymd.concat(hms);
        var ymdObj = {}, mat = regymdzz.split("|"),
            remat = jet.reMatch(format);
        $.each(ymd,function (i,val) {
            ymdObj[remat[i]] = parseInt(val);
        });
        return format.replace(new RegExp(regymdzz,"g"), function(str, index) {
            return str == "zz" ? "00":jet.digit(ymdObj[str]);
        });
    };
    //验证日期格式
    jet.checkFormat = function(format) {
        var ymdhms = [];
        format.replace(new RegExp(regymdzz,"g"), function(str, index) {
            ymdhms.push(str);
        });
        return ymdhms.join("-");
    };
    jet.splMatch = function(str) {
        var timeArr = str.split(" ");
        return jet.reMatch(timeArr[0]);
    };
    jet.mlen = function (format) {
        var matlen = format.match(/\w+|d+/g).length,
            mathh = (format.substring(0, 2) == "hh"),
            lens = mathh&&matlen<=3 ? 7 : matlen;
        return lens;
    };
    //验证日期
    jet.checkDate = function (date) {
        var dateArr = jet.reMatch(date);
        if (isNaN(dateArr[0]) || isNaN(dateArr[1]) || isNaN(dateArr[2])) return false;
        if (dateArr[1] > 12 || dateArr[1] < 1) return false;
        if (dateArr[2] < 1 || dateArr[2] > 31) return false;
        if ((dateArr[1] == 4 || dateArr[1] == 6 || dateArr[1] == 9 || dateArr[1] == 11) && dateArr[2] > 30) return false;
        if (dateArr[1] == 2) {
            if (dateArr[2] > 29) return false;
            if ((dateArr[0] % 100 == 0 && dateArr[0] % 400 != 0 || dateArr[0] % 4 != 0) && dateArr[2] > 28) return false;
        }
        return true;
    };
    //返回日期
    function DateTime() {
        var ND = new Date(), that = this;
        //返回一个数值相同的新GetDateTime对象
        that.reDate = function () {
            return new DateTime();
        };
        //返回此实例的Date值
        that.GetValue = function () {
            return ND;
        };
        //获取此实例所表示日期的年份部分。
        that.GetFullYear = function () {
            return ND.getFullYear();
        };
        //获取此实例所表示日期的月份部分。
        that.GetMonth = function () {
            return ND.getMonth() + 1;
        };
        //获取此实例所表示日期的小时部分。
        that.GetHours = function () {
            return ND.getHours();
        };
        //获取此实例所表示的日期为该月中的第几天。
        that.GetDate = function () {
            return ND.getDate();
        };
        //获取此实例所表示日期的分钟部分。
        that.GetMinutes = function () {
            return ND.getMinutes();
        };
        //获取此实例所表示日期的秒部分。
        that.GetSeconds = function () {
            return ND.getSeconds();
        };
    }
    //获取返回的日期
    jet.GetDateTime = function (obj,format) {
        format = format || 'YYYY-MM-DD';
        var objVal = $.extend({YYYY:null,MM:null,DD:null},obj),
            matArr = {YYYY:"FullYear",MM:"Month",DD:"Date"};

        var result = new DateTime().reDate();
        $.each(["DD","MM","YYYY"],function (i,mat) {
            if (!jet.isNum(parseInt(objVal[mat]))) return null;
            var reVal = result.GetValue();
            if (parseInt(objVal[mat]) || parseInt(objVal[mat]) == 0){
                reVal["set"+matArr[mat]](result["Get"+matArr[mat]]() + (mat == "MM" ? -1 : 0) + parseInt(objVal[mat]));
            }
        });
        //获取格式化后的日期
        var reParse = jet.parse({
            YYYY:result.GetFullYear(), MM:result.GetMonth(), DD:result.GetDate(),
            hh:result.GetHours(), mm:result.GetMinutes(), ss:result.GetSeconds()
        }, format);
        return reParse;
    };

    //判断元素类型
    jet.isValHtml = function(elem) {
        return /textarea|input/.test(elem[0].tagName.toLocaleLowerCase());
    };
    jet.isBool = function(obj){  return (obj == undefined || obj == true ?  true : false); };
    var searandom = function (){
        var str = "",arr = [1,2,3,4,5,6,7,8,9,0];
        for(var i=0; i<8; i++) str += arr[Math.round(Math.random() * (arr.length-1))];
        return str;
    };
    function Andrew_MultiDate(elem, opts){
        this.opts = opts;
        this.valCell = elem;
        this.format = this.opts.format;
        this.initdates();
    }
    var jedfn = Andrew_MultiDate.prototype, jefix = "jefixed",matArr = jet.reMatch(regymdzz);
    jedfn.initdates = function(){
        var that = this, opts = that.opts, newDate = new Date(),
            jetrigger = opts.trigger != undefined ? opts.trigger : config.trigger,
            zIndex = opts.zIndex == undefined ? 20 : opts.zIndex,
            isinitVal = (opts.isinitVal == undefined || opts.isinitVal == false) ? false : true;
        var randomCell = "#ak-MultiDate"+searandom(),isShow = jet.isBool(opts.isShow);
        that.areaVal = [];
        opts.range = opts.range || config.range;
        opts.onClose = opts.onClose || config.onClose;
        that.fixed = jet.isBool(opts.fixed);
        var formatDate = function (cls,boxcell) {
            var dateDiv = $("<div/>",{"id":boxcell.replace(/\#/g,""),"class":"ak-MultiDate" +(opts.skinCell || config.skinCell)}),
                reabsfix = !isShow ? "relative" : (that.fixed == true ? "fixed" :"absolute");
            dateDiv.css({
                "z-index": boxcell != "#ak-MultiDate" ? "" : zIndex ,
                "position":reabsfix,
                "width": "100%"
            });
            if(boxcell != "#ak-MultiDate") dateDiv.attr({"jeformat":opts.format || config.format,"jefixed":randomCell});
            var min = config.minDate.split(" "), max = config.maxDate.split(" ");
            jet.minDate = (!/\-/g.test(opts.minDate)&&opts.minDate!=undefined ? min[0]+" "+opts.minDate : opts.minDate) || config.minDate;
            jet.maxDate = (!/\-/g.test(opts.maxDate)&&opts.maxDate!=undefined ? max[0]+" "+opts.maxDate : opts.maxDate) || config.maxDate;
            jet.boxelem = !isShow ? boxcell : "#ak-MultiDate";
            that.format = !isShow ? dateDiv.attr("jeformat") : (opts.format || config.format);
            var vals = that.getValue({});
            $(cls).append(dateDiv);
            document.activeElement.blur();//隐藏键盘
            if ($("#multi_mask").length < 1) {
                $("body").append('<div id="multi_mask" class="ak-mask"></div>');
                $('#multi_mask').show();
            }
            $('#ak-MultiDate').bind({
                touchmove: function (e) {
                    e.preventDefault();
                }
            });
            $('#multi_mask').bind({
                touchmove: function (e) {
                    e.preventDefault();
                }
            });
            that.renderHtml(vals[0].YYYY, vals[0].MM,vals[0].DD, opts,jet.boxelem);
        };
        //为开启初始化的时间设置值
        if (isinitVal && jetrigger) {
            //opts.range = undefined;
            var ndate = opts.initDate || [], reVal;
            if (ndate[1]){
                var addval = jet.reMatch(jet.GetDateTime(ndate[0]));
                reVal = [{YYYY:addval[0], MM:jet.digit(addval[1]), DD:jet.digit(addval[2]) , hh:jet.digit(addval[3]), mm:jet.digit(addval[4]), ss:jet.digit(addval[5]) }];
            }else {
                reVal = that.getValue(jet.isObj(ndate[0]) ? ndate[0] : {});
            }
            that.setValue(reVal[0],opts.format || config.format);
        }
        //判断固定元素是否存在
        if(!isShow){
            formatDate(that.valCell,randomCell);
        }else {
            //insTrigger的值为true时内部默认点击事件
            var jd = ["body","#ak-MultiDate"];
            if (jetrigger) {
                /*that.valCell.on(jetrigger, function (ev) {
                    ev.stopPropagation();
                    if ($(jd[1]).length > 0) return;
                    formatDate(jd[0],jd[1]);
                });*/
                that.valCell.on(jetrigger, function (ev) {
                    ev.stopPropagation();
                    if ($(jd[1]).length > 0) return;
                    formatDate(jd[0],jd[1]);
                    $(jd[1]).slideDown();
                });
            }else {
                if ($(jd[1]).length > 0) return;
                formatDate(jd[0],jd[1]);
                //console.log(that);
                $(jd[1]).slideDown();
            }
        }
    };
    jedfn.parseFormat = function(ymdhms,format) {
        return jet.parse(ymdhms,format);
    };
    //转换日期值
    jedfn.parseValue = function (fnStr,matStr) {
        var that = this, valArr=[],opts = that.opts, setVal = "",elm = $(jet.boxelem),
            formats = matStr == undefined ? ($(elm.attr(jefix)).length > 0 ? elm.attr("jeformat") : that.format) : matStr,
            dateStr = $.isFunction(fnStr) ? fnStr() : fnStr;
        if (dateStr != "" || dateStr.length > 0 ){
            var unrange = opts.range != false,
                rangeArr = new Array(unrange ? 2 : 1);
            $.each(rangeArr,function (i) {
                var rangLen = rangeArr.length == 2,ymdObj = {},parmat = jet.reMatch(formats),
                    ranArr = rangLen ? dateStr.split(opts.range) : dateStr;
                if (rangLen){
                    $.each(jet.reMatch(ranArr[i]),function (r,val) {
                        ymdObj[jet.mlen(that.format) == 7 ? parmat[r] : matArr[r]] = val;
                    });
                }
                valArr.push(that.parseFormat((rangLen ? ymdObj : ranArr), formats));
                ymdObj = {};
            });
            setVal = valArr.join(unrange ? opts.range : "");
        }
        return setVal;
    };
    //设置日期值
    jedfn.setValue = function (fnStr,matStr,bool) {
        var that = this, elCell = that.valCell,strVal;
        if((typeof fnStr=='string')&&fnStr!=''&&that.opts.range == false){
            var reVal = jet.reMatch(fnStr), inObj={};
            $.each(jet.reMatch(that.format),function (r,val) {
                inObj[val] = parseInt(reVal[r]);
            });
            strVal = inObj;
        }else {
            strVal = fnStr;
        }
        var type = jet.isValHtml(elCell) ? "val" : "text",
            vals = that.parseValue(strVal,matStr);
        that.valCell.next("label").hide();
        if (bool != false) elCell[type](vals);
        return vals;
    };
    //获取日期值
    jedfn.getValue = function (valobj) {
        var that = this, objCell = that.valCell,
            opts = that.opts, reObj, result = new DateTime().reDate(),
            dateY = result.GetFullYear(),dateM = result.GetMonth(),dateD = result.GetDate();
        if (valobj == undefined && jet.isBool(opts.isShow)){
            var type = jet.isValHtml(objCell) ? "val" : "text";
            reObj = objCell[type]();
        }else {
            var isValShow = jet.isBool(opts.isShow) ? (that.getValue() == "") : !jet.isBool(opts.isShow),
                objarr = $.extend({YYYY:null,MM:null,DD:null},valobj||{}),
                ranMat = [],newArr = new Array(2),unObj = function (obj) {
                    return [(objarr[obj] == undefined || objarr[obj] == null),objarr[obj]]
                }, defObj = [{ YYYY:dateY,MM:dateM,DD:dateD},
                    { YYYY:dateY,MM:dateM,DD:dateD}];
            if (isValShow) {
                //目标为空值则获取当前日期时间
                $.each(newArr,function (i) {
                    var inObj = {};
                    $.each(matArr, function (r, val) {
                        inObj[val] = parseInt(unObj(val)[0] ? defObj[i][val] : unObj(val)[1]);
                    });
                    ranMat.push($.extend(defObj[i], inObj));
                });
            } else {
                var isunRange = opts.range != false, initVal = that.getValue(),
                    spVal = initVal.split(opts.range), reMat = jet.reMatch(that.format);
                $.each(newArr,function (i) {
                    var inObj = {}, reVal = isunRange ? jet.reMatch(spVal[i]) : jet.reMatch(initVal);
                    $.each(reMat,function (r,val) {
                        inObj[val] = parseInt(reVal[r]);
                    });
                    var exVal = $.extend(inObj,valobj||{});
                    ranMat.push($.extend(defObj[i],exVal));
                });
            }
            reObj = ranMat;
        }
        return reObj;
    };
    //布局控件骨架
    jedfn.renderHtml = function(ys, ms, ds, opts,boxcls){
        var that = this, boxCell = $(boxcls),
            isShow = jet.isBool(opts.isShow);
        var allvals = that.getValue({YYYY:ys,MM:ms,DD:ds}),
            vals = allvals[0], valx = allvals[1];
        that.format = isShow ? that.format : boxCell.attr("jeformat");
        var mlens = jet.mlen(that.format), testhh = /\hh/.test(that.format);
        var headcon = "<div class='arthead bg_title'></div><div class='artcont'></div>",
            artcont = $("<div/>",{"class":"maincont"}),
            footer = $("<div/>",{"class":"mainfoot"}),
            daycon = $("<div/>",{"class":"daybox"}).append(headcon),
            ymscon = $("<div/>",{"class":"ymsbox"}).append(headcon);
        artcont.append(ymscon).append(daycon);
        boxCell.empty().append(artcont.children().hide()).append(footer);
        boxCell.append($("<div/>",{"class":"ak-MultiDate-tips"}).hide());
        that.maincon = function (elem,is) { return boxCell.find(elem+" > "+(is == 0 ? ".arthead":".artcont")); };
        //根据日期格式进行对应的日期时间显示
        if(mlens == 7){
            that.eachHms(opts,boxCell);
        }else if(mlens>=3 && mlens<=6){
            that.maincon(".daybox",0).append('<button class="yearprev yprev bg_title"></button><button class="monthprev mprev bg_title"></button><button class="monthnext mnext bg_title"></button><button class="yearnext ynext bg_title"></button>');
            boxCell.find(".daybox").show();
            that.eachDays(vals.YYYY, vals.MM, vals.DD, opts, boxCell);
            //判断日期格式中是否包含hh（时）
            //将所有子元素用一个生成的div将所有段落包裹起来
            that.maincon(".ymsbox",0).append('<button class="yearprev yprev bg_title"></button><button class="yearnext ynext bg_title"></button><button class="close bg_title"></button>').addClass("ymfix");
            //将生成的年月插入到元素中
            that.eachYM(vals.YYYY, vals.MM, opts, boxCell,".fixcon");
        }
        //为年月的情况下执行
        if(mlens==1 || mlens==2){
            that.maincon(".ymsbox",0).append('<button class="yearprev yprev bg_title"></button><button class="yearnext ynext bg_title"></button>');
            boxCell.find(".ymsbox").show();
            that.eachYM(vals.YYYY, vals.MM, opts, boxCell,".ak-MultiDate-cont");
        }
        if(!isShow) footer.find(".today").hide();
        //绑定各个事件
        that.eventsDate(opts,boxCell);
        setTimeout(function () {
            opts.success && opts.success(boxCell);
        }, 50);
    };
    jedfn.createYMHtml = function(ys, ms, opts){
        var year = parseInt(ys),
            month = parseInt(ms),
            headCls = this.maincon(".daybox",0);
        if (month < 10) {
            var month = "0"+month;
        }
        var ymCls = $("<p class='dis_block ovh w_100 h_in'/>").css({"width":jet.isBool(opts.multiPane) ? '':'50%'}),
            ymText = "<button type='button' class='ymbtn bg_title'>"+year+"-"+month+"</button>";
        headCls.append(ymCls.html(ymText));
        return year+"-"+month;
    };
    //循环生成年或月
    jedfn.eachYM = function(y, m,opts,boxCell,clsCell) {
        var that = this, yearArr = new Array(15), date = new Date(),
            lang = opts.language || config.language, ymscon = that.maincon(".ymsbox",1),
            multiPane = jet.isBool(opts.multiPane), mlens = jet.mlen(that.format),
            ymarr = that.getValue({}),testhh = /\hh/.test(that.format),
            formatYY = mlens == 1;

        if(ymscon.find(".ymcon").length > 0) ymscon.find(".ymcon").remove();
        $.each(new Array(multiPane ? 1 : 2),function (s) {
            var retSetCls = function (sym,gym,eym) {
                var sval = sym.replace(gr,""), gval = gym.replace(gr,""), eval = eym.replace(gr,"");
                if (/YYYY-MM-DD/g.test(jet.isparmat(that.format))){
                    return (parseInt(sval) == parseInt(gval)) ? (s == 0 ? "actdate bg_title" : "") : "";
                }else {
                    if (parseInt(sval) == parseInt(gval)) {
                        if (!testhh) {
                            that.areaVal.push(sym);
                            that.areaStart = true;
                        }
                        return "actdate bg_title";
                    } else if (parseInt(sval) > parseInt(gval) && parseInt(sval) < parseInt(eval)) {
                        return "contain";
                    } else if (parseInt(sval) == parseInt(eval)) {
                        if (!testhh) {
                            that.areaVal.push(sym);
                            that.areaStart = true;
                        }
                        return "actdate bg_title";
                    } else {
                        return "";
                    }
                }
            };
            var ymDiv = $("<div/>",{"class":"ymcon"}).addClass(s==1 ? "spaer":""),ymArr=[];
            $.each(formatYY ? yearArr : lang.month, function (n, val) {
                var ym = s==1 ? y + (formatYY ? yearArr.length : 1) : y,seCls;
                n = s==1 ? (formatYY ? 15+n : 12+n) : n;
                if (formatYY) {
                    var minArr = jet.splMatch(jet.minDate), maxArr = jet.splMatch(jet.maxDate),
                        minY = minArr[0], maxY = maxArr[0], year = (ym - 7 + n),
                        getyear = (that.getValue() == "" && jet.isBool(opts.isShow)) ? date.getFullYear() : that.getValue();
                    //判断是否在有效期内
                    if (year < minY || year > maxY) {
                        ymArr.push({style:"disabled",ym: year,idx:n});
                    } else {
                        seCls = retSetCls(year.toString(),getyear.toString(),ymarr[1].YYYY.toString());
                        ymArr.push({style:seCls,ym: year,idx:n});
                    }
                } else {
                    var minArr = jet.splMatch(jet.minDate), maxArr = jet.splMatch(jet.maxDate),
                        thisDate = parseInt(ym+""+jet.digit(val)+""+"01"),
                        minTime = parseInt(minArr[0]+""+jet.digit(minArr[1])+""+jet.digit(minArr[2])),
                        maxTime = parseInt(maxArr[0]+""+jet.digit(maxArr[1])+""+jet.digit(maxArr[2]));
                    //判断是否在有效期内
                    if (thisDate < minTime || thisDate > maxTime) {
                        ymArr.push({style:"disabled",ym: ym + "-" + jet.digit(val),idx:n});
                    } else {
                        var ymVal = ym + "-" + jet.digit(val),ymmVal = ymarr[0].YYYY+ "-" + jet.digit(ymarr[0].MM);
                        seCls = retSetCls(ymVal,ymmVal,(ymarr[1].YYYY+ "-" + jet.digit(ymarr[1].MM)));
                        ymArr.push({style:seCls,ym: ym + "-" + jet.digit(val),idx:n});
                    }
                }

            });
            var table = $('<table/>',{"class":formatYY ?"yul":"ymul"});
            //生成表格主体
            $.each(new Array(formatYY ? 5:4), function(i){
                var tr = $('<tr/>');
                $.each(new Array(3), function(){
                    var td = $("<td/>");
                    table.append(tr.append(td));
                })
            });
            //为表格赋值年月
            $.each(ymArr,function (i,val) {
                table.find("td").eq(i).addClass(val.style).attr({idx:val.idx,"je-val":val.ym}).html(val.ym)
            });
            ymscon.append(ymDiv.append(table));

        });
        var contd = ymscon.find("td"),ymstit = that.maincon(".ymsbox",0),
            eqNum = formatYY ? (multiPane ? 15-1:15*2-1):(multiPane ? 12-1:12*2-1),
            sval = contd.eq(0).text(), eval = contd.eq(eqNum).text();
        var mnx = [(formatYY ? sval:sval.substring(0,4)),(formatYY ? eval:eval.substring(0,4))];
        ymstit.find("p").remove();
        ymstit.append("<p>"+sval+" ~ "+eval+"</p>").attr({min:mnx[0],max:mnx[1]});
    };
    //初始验证正则
    jedfn.dateRegExp = function(valArr) {
        var enval = valArr.split(",")||[], re = "";
        var doExp = function (val) {
            var arr, tmpEval, re = /#?\{(.*?)\}/;
            val = val + "";
            while ((arr = re.exec(val)) != null) {
                arr.lastIndex = arr.index + arr[1].length + arr[0].length - arr[1].length - 1;
                tmpEval = parseInt(eval(arr[1]));
                if (tmpEval < 0) tmpEval = "9700" + -tmpEval;
                val = val.substring(0, arr.index) + tmpEval + val.substring(arr.lastIndex + 1);
            }
            return val;
        };
        if (enval && enval.length > 0) {
            for (var i = 0; i < enval.length; i++) {
                re += doExp(enval[i]);
                if (i != enval.length - 1) re += "|";
            }
            re = re ? new RegExp("(?:" + re + ")") : null;
        } else {
            re = null;
        }
        //re = new RegExp((re + "").replace(/^\/\(\?:(.*)\)\/.*/, "$1"));
        return re;
    };
    //循环生成日
    jedfn.eachDays = function(ys, ms,ds, opts, boxCell){
        var that = this, isShow = jet.isBool(opts.isShow);
        var year = parseInt(ys), month = parseInt(ms), objCell = that.valCell,
            lang = opts.language || config.language, endval = opts.valiDate||[],
            minArr = jet.reMatch(jet.minDate), minNum = parseInt(minArr[0]+""+jet.digit(minArr[1])+""+jet.digit(minArr[2])),
            maxArr = jet.reMatch(jet.maxDate), maxNum = parseInt(maxArr[0]+""+jet.digit(maxArr[1])+""+jet.digit(maxArr[2]));
        var multiPane = jet.isBool(opts.multiPane),  ymdarr = that.getValue(!isShow ? {YYYY:ys,MM:ms,DD:ds}:{}),
            valrange = ((objCell.val() || objCell.text()) != "") && opts.range != false,
            ymdDate = parseInt(ymdarr[0].YYYY+""+jet.digit(ymdarr[0].MM)+""+jet.digit(ymdarr[0].DD));
        //设置时间标注
        var setMark = function (my, mm, md) {
            var Marks = opts.marks, contains = function(arr, obj) {
                var len = arr.length;
                while (len--) {
                    if (arr[len] === obj) return true;
                }
                return false;
            };
            return $.isArray(Marks) && Marks.length > 0 && contains(Marks, my + "-" + jet.digit(mm) + "-" + jet.digit(md)) ? '<i class="marks"></i>' :"";
        };
        //是否显示节日
        var isfestival = function(y, m ,d) {
            var festivalStr;
            if(opts.festival == true && lang.name == "cn"){
                var lunar = that.jeLunar(y, m - 1, d), feslunar = (lunar.solarFestival || lunar.lunarFestival),
                    lunartext = (feslunar && lunar.jieqi) != "" ? feslunar : (lunar.jieqi || lunar.showInLunar);
                festivalStr = '<p><span class="solar">' + d + '</span><span class="lunar">' + lunartext + '</span></p>';
            }else{
                festivalStr = '<p class="nolunar">' + d + '</p>';
            }
            return festivalStr;
        };
        //判断是否在限制的日期之中
        var dateLimit = function(Y, M, D, isMonth){
            var thatNum = parseInt(Y + "" + jet.digit(M) + "" + jet.digit(D));
            if(isMonth){
                if (thatNum >= minNum && thatNum <= maxNum) return true;
            }else {
                if (minNum > thatNum || maxNum < thatNum) return true;
            }
        };

        var eachDays = function (yd,md) {
            var count = 0, daysArr = [],
                firstWeek = new Date(yd, md - 1, 1).getDay() || 7,
                daysNum = jet.getDaysNum(yd, md), didx = 0,
                prevM = jet.prevMonth(yd, md),
                prevDaysNum = jet.getDaysNum(yd, prevM.m),
                nextM = jet.nextMonth(yd, md);
            //上一月剩余天数
            for (var p = prevDaysNum - firstWeek + 1; p <= prevDaysNum; p++, count++) {
                var pmark = setMark(prevM.y,prevM.m,p);
                var cls = dateLimit(prevM.y, prevM.m, p, false) ? "disabled" : "other";
                daysArr.push({style:cls,ymd:prevM.y+'-'+prevM.m+'-'+p,day:p,d:(isfestival(prevM.y,prevM.m,p) + pmark),idx:didx++});
            }
            //本月的天数
            for(var b = 1; b <= daysNum; b++, count++){
                var bmark = setMark(yd,md,b), cls = "";
                var dateval = parseInt(yd+""+jet.digit(md)+""+jet.digit(b)),
                    rangval = parseInt(ymdarr[1].YYYY+""+jet.digit(ymdarr[1].MM)+""+jet.digit(ymdarr[1].DD)),
                    parsdate = dateval > ymdDate, rangdate = dateval < rangval;
                if(dateLimit(yd, md, b, true)){
                    if(dateval == ymdDate){
                        cls = "actdate bg_title";
                        that.areaVal.push(yd+'-'+jet.digit(md)+'-'+jet.digit(b));
                        that.areaStart = true;
                    }else if(parsdate&&rangdate&&valrange){
                        cls = "contain";
                    }else if((dateval == rangval)&&valrange){
                        cls = "actdate bg_title";
                        that.areaVal.push(yd+'-'+jet.digit(md)+'-'+jet.digit(b));
                        that.areaEnd = true;
                    }else {
                        cls = "";
                    }
                }else {
                    cls = "disabled";
                }
                daysArr.push({style:cls,ymd:yd+'-'+md+'-'+b,day:b,d:(isfestival(yd,md,b) + bmark),idx:didx++});
            }
            //下一月开始天数
            for(var n = 1, nlen = 42 - count; n <= nlen; n++){
                var nmark = setMark(nextM.y,nextM.m,n);
                var cls = dateLimit(nextM.y, nextM.m, n, false) ? "disabled" : "other";
                daysArr.push({style:cls,ymd:nextM.y+'-'+nextM.m+'-'+n,day:n,d:(isfestival(nextM.y,nextM.m,n) + nmark),idx:didx++});
            }
            //将星期与日期拼接起来
            return daysArr;
        };
        var valdigit = function (val) {
            var spval = jet.reMatch(val) , rearr = [];
            $.each(spval,function (i,v) {
                rearr.push(jet.digit(v));
            });
            return rearr.join("-");
        };
        var moreArr = new Array(multiPane ? 1 : 2), isDec = (month + 1 > 12),ymarr = [];
        $.each(moreArr,function (d,val) {
            var table = $('<table/>',{"class":"daysul"}) ,thead = $('<thead/>'),
                tbody = $('<tbody/>'), t= d == 1 ? 42:0;
            table.append(thead).append(tbody);
            //生成表格主体
            $.each(new Array(7), function(i){
                var tr = $('<tr/>');
                $.each(new Array(7), function(){
                    var th = $("<th/>"), td = $("<td/>");
                    tr.append(i == 0 ? th : td.attr("idx",t++));
                    i == 0 ? thead.append(tr) : tbody.append(tr);
                })
            });
            var nian = (isDec && d == 1) ? year+1 : year,
                yue = (isDec && d == 1) ? 1 : (d == 1 ? month+1 : month);
            var arrDay = eachDays(nian,yue);
            var moreCls = $("<div/>",{'class':'contlist'});
            //赋值星期
            $.each(lang.weeks,function (i,val) {
                table.find("th").eq(i).text(val);
            });
            ymarr.push(that.createYMHtml(nian,yue, opts));
            $.each(arrDay,function (i,val) {
                var clsVal = val.style;
                if(endval.length > 0 && endval[0]!=""){
                    if(/\%/g.test(endval[0])){
                        var reval = endval[0].replace(/\%/g,"").split(","), enArr = [];
                        $.each(reval,function (r,rel) {
                            enArr.push(jet.digit(parseInt(rel)));
                        });
                        var isfind = $.inArray(jet.digit(val.day), enArr) == -1;
                        clsVal = jet.isBool(endval[1]) ? (isfind ? "disabled" :clsVal) : (isfind ? clsVal :"disabled");
                    }else {
                        var valreg = that.dateRegExp(endval[0]), regday = valreg.test(jet.digit(val.day));
                        clsVal = jet.isBool(endval[1]) ? (regday ? "disabled" : val.style) : (regday ? val.style : "disabled")
                    }
                }
                table.find("td").eq(i).addClass(clsVal).attr("je-val",valdigit(val.ymd)).html(val.d);
            });
            that.maincon(".daybox",1).append(moreCls.append(table)).addClass(d == 1 ? "spaer" : "");
        });
        that.maincon(".daybox",0).attr("je-ym",ymarr.join(","));
    };
    //为日期绑定各类事件
    jedfn.eventsDate = function(opts,boxCell) {
        var that = this, multiPane = jet.isBool(opts.multiPane);
        //上下月事件
        that.clickYM(opts,boxCell);
        //点击天事件
        that.clickDays(opts,boxCell);
        //自适应定位,值在isShow为true的情况下有效
        if(jet.isBool(opts.isShow)){
            var datepos = opts.position||[];
            if (datepos.length > 0){
                boxCell.css({
                    "top":datepos[0],
                    "left":datepos[1]
                });
            }else {
                that.dateOrien(boxCell, that.valCell);
                $(window).on("resize", function(){
                    that.dateOrien(boxCell, that.valCell);
                })
            }
        }
        //点击空白处隐藏
        $("#multi_mask").unbind("click");
        $("#multi_mask").on("click",function () {
            if (jet.boxelem == "#ak-MultiDate"){
                var box = $(jet.boxelem);
                if (box.length > 0) {
                    $(jet.boxelem).slideUp();
                    setTimeout(function() {
                            that.dateClose();
                        },
                        500);
                }
                /*if (box && box.css("display") !== "none")  that.dateClose();*/
                if($("#ak-MultiDate_tipscon").length > 0) $("#ak-MultiDate_tipscon").remove();
                delete that.areaStart;
                delete that.areaEnd;
                that.areaVal = [];
            }
        });
    };
    //切换年月并重新生成日历
    jedfn.clickYM = function (opts,boxCell) {
        var that = this, ymhead = that.maincon(".ymsbox",0),elemCell = that.valCell,
            yPre = ymhead.find(".yprev"),
            yNext = ymhead.find(".ynext"),
            ymdhead = that.maincon(".daybox",0),
            isShow = jet.isBool(opts.isShow),
            ydPre = ymdhead.find(".yprev"),
            ydNext = ymdhead.find(".ynext"),
            mdPre = ymdhead.find(".mprev"),
            mdNext = ymdhead.find(".mnext"),
            mlens = jet.mlen(that.format),
            isYYMM = mlens == 2,
            isYY = mlens == 1;
        var carr = ["actdate","contain"],
            ymDate = new Date();
        var clickYmSelected = function () {
            var ulCell = that.maincon(".ymsbox",1).find(".ymcon"), tdCell = ulCell.find("td");
            tdCell.unbind("click");
            tdCell.on("click",function () {
                var lithis = $(this), thisdate = lithis.attr("je-val");
                if (lithis.hasClass("disabled")) return;
                if(opts.range == false){
                    tdCell.removeClass(carr[0]);
                    lithis.addClass(carr[0]);
                    that.maincon(".ymsbox",0).attr("data-val",lithis.text());
                }else {
                    //判断是否存在选择的开始与结束日期
                    if (that.areaStart && that.areaEnd == undefined){
                        lithis.addClass(carr[0]);
                        that.areaEnd = true;
                        //添加当前选中的到数组中
                        that.areaVal.push(thisdate);
                        //遍历元素，并在范围中查找同时着色
                        tdCell.each(function () {
                            var sefl = $(this),seVals = sefl.attr("je-val").replace(gr,""),
                                rearea = [that.areaVal[0].replace(gr,""),that.areaVal[1].replace(gr,"")],
                                minVal = Math.min.apply(null, rearea), maxVal = Math.max.apply(null, rearea);
                            if (!sefl.hasClass("other")){
                                var contrast = parseInt(seVals) > parseInt(minVal) && parseInt(seVals) < parseInt(maxVal);
                                if(contrast){
                                    sefl.addClass(carr[1]);
                                }
                            }
                        });
                    }else if (that.areaStart && that.areaEnd){
                        //如果已经选择了一个范围，就清除属性
                        that.delAreaAttr();
                        tdCell.removeClass(carr[0]).removeClass(carr[1]);
                        lithis.addClass(carr[0]);
                        that.areaVal.push(thisdate);
                        that.areaStart = true;
                    }

                }
            });
        };
        if(isYYMM || isYY){
            clickYmSelected();
            //年或年月情况下的变化
            $.each([yPre, yNext], function (ym, cls) {
                cls.unbind("click");
                cls.on("click", function (ev) {
                    var cthat = $(this), ymMonth = ymDate.getMonth()+1,
                        ymMin = parseInt(cthat.parent().attr("min")), ymMax = parseInt(cthat.parent().attr("max"));
                    var ymYear =isYY ? (ym == 0 ? ymMin : ymMax) : (ym == 0 ? --ymMin : ++ymMax);
                    that.renderHtml(ymYear, ymMonth, null, opts, boxCell);
                    if (opts.range == false) {
                        var ymobj = isYY ? {YYYY: ymYear} : {YYYY: ymYear, MM: ymMonth};
                        var value = that.parseValue(ymobj),
                            date = {
                                YYYY: ymYear, MM: ymMonth, DD: ymDate.getDate(),
                                hh: ymDate.getHours(), mm: ymDate.getMinutes(), ss: ymDate.getSeconds()
                            };
                        if ($.isFunction(opts.toggle)) opts.toggle(elemCell,value,date);
                    }
                })
            })
        }else {
            //切换年
            $.each([ydPre, ydNext], function (y, cls) {
                cls.unbind("click");
                cls.on("click", function (ev) {
                    ev.stopPropagation();
                    var gym = jet.reMatch($(this).parent().attr("je-ym"));
                    var year = parseInt(gym[0]), month = parseInt(gym[1]),
                        pnYear = y == 0 ? --year : ++year;
                    that.renderHtml(pnYear, month, null, opts, boxCell);
                    if (opts.range == false) {
                        var gv = that.getValue({})[0];
                        var value = that.parseValue({YYYY: pnYear, MM: month, DD: gv.DD}),
                            dateobj = {
                                YYYY: pnYear, MM: month, DD: ymDate.getDate(),
                                hh: ymDate.getHours(), mm: ymDate.getMinutes(), ss: ymDate.getSeconds()
                            };
                        if ($.isFunction(opts.toggle)) opts.toggle({elem:elemCell,val:value,date:dateobj});
                    }
                });
            });
            //切换月
            $.each([mdPre, mdNext], function (m, cls) {
                cls.unbind("click");
                cls.on("click", function (ev) {
                    ev.stopPropagation();
                    var gym = jet.reMatch($(this).parent().attr("je-ym"));
                    var year = parseInt(gym[0]), month = parseInt(gym[1]),
                        PrevYM = jet.prevMonth(year, month), NextYM = jet.nextMonth(year, month);
                    m == 0 ? that.renderHtml(PrevYM.y, PrevYM.m, null, opts, boxCell) : that.renderHtml(NextYM.y, NextYM.m, null, opts, boxCell);
                    var yearVal = m == 0 ? PrevYM.y : NextYM.y, monthVal = m == 0 ? PrevYM.m : NextYM.m;
                    if (opts.range == false) {
                        var gv = that.getValue({})[0];
                        var value = that.parseValue({YYYY: yearVal, MM: monthVal, DD: gv.DD}),
                            dateobj = {
                                YYYY: yearVal, MM: monthVal, DD: ymDate.getDate(),
                                hh: ymDate.getHours(), mm: ymDate.getMinutes(), ss: ymDate.getSeconds()
                            };
                        if ($.isFunction(opts.toggle)) opts.toggle({elem:elemCell,val:value,date:dateobj});
                    }
                    //console.log("jinru"+ymDate)
                });
            });
        }
        if(mlens >= 3 && mlens <= 6){
            that.maincon(".daybox",0).on("click",".ymbtn", function (ev) {
                boxCell.children(".ymsbox").show();
                boxCell.children(".daybox").hide();
                if (isShow) that.dateOrien(boxCell, that.valCell);
            });
            var aloneSelym = function () {
                var ulCell = boxCell.find(".ymcon"), tdCell = ulCell.find("td");
                tdCell.unbind("click");
                tdCell.on("click",function () {
                    var sefl = $(this), seval = jet.reMatch(sefl.attr("je-val"));
                    tdCell.removeClass(carr[0]);
                    sefl.addClass(carr[0]);
                    boxCell.children(".ak-MultiDate-contfix").show();
                    boxCell.children(".ak-MultiDate-ak-MultiDatewrap").hide();
                    that.renderHtml(seval[0], seval[1],null, opts,boxCell);
                })
            };
            $.each([yPre, yNext], function (ym, cls) {
                cls.unbind("click");
                cls.on("click", function (ev) {
                    var ymMonth = ymDate.getMonth()+1,
                        ymMin = parseInt($(this).parent().attr("min")), ymMax = parseInt($(this).parent().attr("max"));
                    var ymYear =isYY ? (ym == 0 ? ymMin : ymMax) : (ym == 0 ? --ymMin : ++ymMax);
                    that.eachYM(ymYear, ymMonth, opts, boxCell,".ak-MultiDate-contfix");
                    aloneSelym();
                    if (isShow) that.dateOrien(boxCell, that.valCell);
                    if ($.isFunction(opts.toggle)) opts.toggle();
                })
            });
            ymhead.find(".close").unbind("click");
            ymhead.on("click",".close", function (ev) {
                boxCell.children(".daybox").show();
                boxCell.children(".ymsbox").hide();
                if (isShow) that.dateOrien(boxCell, that.valCell);
            });
            aloneSelym();
        }

    };
    //绑定天的事件
    jedfn.clickDays = function (opts,boxCell) {
        var that = this, elemCell = that.valCell,valStr = "je-val",
            ulCls = boxCell.find(".daysul"), tdCls = ulCls.find("td"),
            lang = opts.language || config.language,
            carr = ["actdate bg_title","contain"];

        //点击绑定日期事件
        tdCls.unbind("click");
        tdCls.on("click", function(ev) {
            var lithis = $(this), thisdate = lithis.attr(valStr),
                ymdArr = jet.reMatch(thisdate), dayArr = [];
            if (lithis.hasClass("disabled")) return;
            ev.stopPropagation();
            //单独选择
            var aloneSelected = function () {
                $.each(ymdArr,function (i,val) {
                    dayArr.push(parseInt(val));
                });
                if($(boxCell.attr(jefix)).length > 0 ){
                    that.renderHtml(dayArr[0], dayArr[1],dayArr[2], opts,boxCell);
                }else {
                    //判断是否为点击后关闭弹层
                    if(jet.isBool(opts.onClose)){
                        tdCls.removeClass(carr[0]);
                        lithis.addClass(carr[0]);
                    }else {
                        var ymdObj = {}, spval = jet.reMatch(lithis.attr(valStr));
                        //获取时分秒的集合
                        $.each(spval,function (i,val) {
                            ymdObj[matArr[i]] = val;
                        });
                        var objs = /\hh/.test(that.format) ? $.extend(ymdObj,that.gethmsVal(boxCell)) : ymdObj;
                        var vals = that.setValue(objs);
                        var box = $(jet.boxelem);
                        if (box.length > 0) {
                            $(jet.boxelem).slideUp();
                            setTimeout(function() {
                                    that.dateClose();
                                },
                                500);
                        }
                        if ($.isFunction(opts.okfun) || opts.okfun != null){
                            opts.okfun && opts.okfun({elem:elemCell,val:vals,date:objs});
                        }
                    }
                }
            };
            //区域选择
            var areaSelected = function () {
                //判断是否只选中一个
                if (that.areaStart && that.areaEnd == undefined){
                    lithis.addClass(carr[0]);
                    that.areaEnd = true;
                    //添加当前选中的到数组中
                    that.areaVal.push(thisdate);
                    //遍历元素，并在范围中查找同时着色
                    tdCls.each(function () {
                        var sefl = $(this),seVals = sefl.attr("je-val").replace(gr,""),
                            rearea = [that.areaVal[0].replace(gr,""),that.areaVal[1].replace(gr,"")],
                            minVal = Math.min.apply(null, rearea), maxVal = Math.max.apply(null, rearea);
                        if (!sefl.hasClass("other") && !sefl.hasClass("disabled")){
                            var contrast = parseInt(seVals) > parseInt(minVal) && parseInt(seVals) < parseInt(maxVal);
                            if(contrast){
                                sefl.addClass(carr[1]);
                            }
                        }
                    });
                }else if (that.areaStart && that.areaEnd){
                    //如果已经选择了一个范围，就清除属性
                    that.delAreaAttr();
                    tdCls.removeClass(carr[0]).removeClass(carr[1]);
                    lithis.addClass(carr[0]);
                    that.areaVal.push(thisdate);
                    that.areaStart = true;
                }
            };
            //判断是否要进行日期区域选择
            opts.range == false ? aloneSelected() : areaSelected();
        });
    };
    //计算当前选中的滚动条位置
    jedfn.locateScroll = function (cell) {
        $.each(cell, function() {
            var hmsCls = $(this), achmsCls = hmsCls.find(".action");
            var acNUm = (achmsCls.length > 0) ? (achmsCls[0].offsetTop - 114):0;
            hmsCls[0].scrollTop = acNUm;
        });
    };
    //辨别控件的方位
    jedfn.dateOrien = function(boxCls, valCls) {
        boxCls.css({"bottom":0,"left":0});
    };
    jedfn.tips = function (text, time) {
        var that = this, tipCls = $(jet.boxelem).find(".ak-MultiDate-tips");
        tipCls.html("").html(text||"").show();
        clearTimeout(that.tipTime);
        that.tipTime = setTimeout(function(){
            tipCls.html("").hide();
        }, (time||2.5)*1000);
    };
    //关闭层
    jedfn.dateClose = function() {
        if($($(jet.boxelem).attr(jefix)).length == 0) $(jet.boxelem).remove();
        $('#multi_mask').remove();
    };
    //日期大小比较
    jedfn.dateContrast = function (ac, bc) {
        var sarr = ac.split("-"), earr = bc.split("-"),
            start = parseInt(sarr[0]+""+jet.digit(parseInt(sarr[1])-1)+""+jet.digit(sarr[2]||"01")),
            end = parseInt(earr[0]+""+jet.digit(parseInt(earr[1])-1)+""+jet.digit(sarr[2]||"01"));
        return (start >= end) ? false : true;
    };
    //删除区域属性
    jedfn.delAreaAttr = function () {
        delete this.areaStart;
        delete this.areaEnd;
        this.areaVal = [];
    };
    //返回指定日期
    $.nowDate = function (str,format) {
        format = format || 'YYYY-MM-DD hh:mm:ss';
        if (typeof(str) === 'number') {
            str = {DD: str};
        }
        return jet.GetDateTime(str, format);
    };
    //分解日期时间
    $.splitDate = function (str) {
        var sdate = str.match(/\w+|d+/g);
        return {
            YYYY:parseInt(sdate[0]),MM:parseInt(sdate[1])||0,DD:parseInt(sdate[2])||0,
            hh:parseInt(sdate[3])||0,mm:parseInt(sdate[4])||0,ss:parseInt(sdate[5])||0
        };
    };
    //获取年月日星期
    $.getLunar = function(date,format){
        var that = this;
        format = format || 'YYYY-MM-DD hh:mm:ss';
        if(/YYYY-MM-DD/g.test(jet.isparmat(format))){
            //如果为数字类型的日期对获取到日期的进行替换
            var charDate = date.substr(0,4).replace(/^(\d{4})/g,"$1,") + date.substr(4).replace(/(.{2})/g,"$1,"),
                reArr = jet.isNum(date) ? jet.reMatch(charDate) : jet.reMatch(date),
                lunars = that.jeLunar(reArr[0], reArr[1] - 1, reArr[2]);
            return{
                nMonth: lunars.lnongMonth,             //农历月
                nDays: lunars.lnongDate,               //农历日
                yYear: parseInt(lunars.solarYear),     //阳历年
                yMonth: parseInt(lunars.solarMonth),   //阳历月
                yDays: parseInt(lunars.solarDate),     //阳历日
                cWeek: lunars.inWeekDays,              //汉字星期几
                nWeek: lunars.solarWeekDay             //数字星期几
            };
        }
    };
    return Andrew_MultiDate;
}(jQuery));