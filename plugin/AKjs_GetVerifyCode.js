/*
Modification Date: 2018-09-17
Coding by Andrew.Kim (E-mail: andrewkim365@qq.com)
*/
/*-----------------------------------------------AKjs_GetVerifyCode-----------------------------------*/
(function($) {
    function AKjs_GetVerifyCode() {}
    AKjs_GetVerifyCode.prototype.SecondCountDown = function(options) {
        var countDown = {};
        countDown.options = {
            time: 60,
            progress: function() {},
            started: function() {},
            breaked: function() {},
            end: function() {}
        };
        for (var i in options) {
            countDown.options[i] = options[i];
        }
        countDown.timer = null;
        countDown.time = 0;
        countDown._continueRun = true;
        countDown.start = function() {
            var that = this,
                time = that.options.time || 60,
                count = 0,
                interval = 1000,
                start = new Date().getTime(),
                targetTime = that.options.time * 1000;
            clearTimeout(that.timer);
            if (that.options.started && (({}).toString.call(that.options.started) == "[object Function]")) {
                that.options.started(time);
            }
            this._continueRun = true;
            that.timer = setTimeout(function() {
                    if (that._continueRun) {
                        var wucha = 0,
                            nextRunTime = interval,
                            currentFn = arguments.callee;
                        count++;
                        wucha = new Date().getTime() - (start + count * interval);
                        wucha = (wucha <= 0) ? 0 : wucha;
                        nextRunTime = interval - wucha;
                        nextRunTime = (nextRunTime <= 0) ? 0 : nextRunTime;
                        time--;
                        if (that.options.progress && (({}).toString.call(that.options.progress) == "[object Function]")) {
                            that.options.progress(time);
                        }
                        that.time = time;
                        that.timer = setTimeout(currentFn, nextRunTime);
                        if ((targetTime -= interval) <= 0) {
                            clearTimeout(that.timer);
                            if (that.options.end && (({}).toString.call(that.options.end) == "[object Function]")) {
                                that.options.end(time);
                            }
                            that.time = time;
                            return
                        }
                    } else {
                        clearTimeout(that.timer);
                    }
                },
                interval)
        };
        countDown.abort = function() {
            this._continueRun = false;
            clearTimeout(this.timer);
            this.time--;
            if (this.options.breaked && (({}).toString.call(this.options.breaked) == "[object Function]")) {
                this.options.breaked(this.time);
            }
        };
        return countDown
    };
    AKjs_GetVerifyCode.prototype.verify = function(eles, options) {
        eles = $(eles);
        if (eles.length > 0) {
            var self = this,
                timedown = {},
                verifyObj = {},
                _options = {
                    time: 60,
                    event: "click",
                    phone: "",
                    ableClass: "c_title",
                    unableClass: "c_gray_999",
                    condition: function() {},
                    progress: function() {},
                    timeUp: function() {},
                    abort: function() {},
                    eventFn: function() {}
                };
            $.extend(_options, options);
            eles.on(_options.event,
                function() {
                    if (this.unabled) {
                        return
                    }
                    var canRun = true,
                        phone = _options.phone;
                    if ($.isFunction(_options.condition)) {
                        canRun = _options.condition.call(this, phone);
                    } else {
                        canRun = _options.condition(phone);
                    }
                    if (!canRun) {
                        return
                    }
                    var that = this,
                        $this = $(that);
                    timedown = self.SecondCountDown({
                        time: _options.time,
                        progress: function(time) {
                            _options.progress.call(that, time, phone);
                        },
                        end: function(time) {
                            that.unabled = false;
                            $this.removeClass(_options.unableClass);
                            $this.addClass(_options.ableClass);
                            _options.timeUp.call(that, time, phone);
                        },
                        breaked: function(time) {
                            that.unabled = false;
                            $this.removeClass(_options.unableClass);
                            $this.addClass(_options.ableClass);
                            _options.abort.call(that, time, phone);
                        }
                    });
                    timedown.start();
                    this.timedown = timedown;
                    that.unabled = true;
                    $this.removeClass(_options.ableClass);
                    $this.addClass(_options.unableClass);
                    _options.eventFn.call(this, phone);
                })
        }
    };
    window.AKjs_GetVerifyCode = new AKjs_GetVerifyCode()
} (jQuery));