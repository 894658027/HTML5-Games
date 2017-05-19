var ls;
(function (ls) {
    var TimerBehavior = (function (_super) {
        __extends(TimerBehavior, _super);
        function TimerBehavior() {
            _super.call(this);
        }
        var d = __define,c=TimerBehavior,p=c.prototype;
        p.onCreate = function () {
            this._timers = {};
        };
        p.tick = function () {
            for (var key in this._timers) {
                var timer = this._timers[key];
                if (timer.isRunning) {
                    var currentTime = egret.getTimer();
                    if (currentTime - timer.oldtime > timer.duration) {
                        if (timer.repeatCount == 0 || timer.runtimes < timer.repeatCount) {
                            timer.runtimes++;
                        }
                        else {
                            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTimerComplete, key));
                            delete this._timers[timer.tag];
                        }
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTimer, key));
                        timer.oldtime = currentTime;
                    }
                }
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.onTimer = function ($event) {
            return { instances: [this.inst], status: true };
        };
        p.onTimerComplete = function ($event) {
            return { instances: [this.inst], status: true };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.startTimer = function (duration, repeatCount, tag) {
            if (!tag)
                ls.assert(true, "计时器标签名不能为空！！！！");
            duration = ls.eval_e(duration);
            repeatCount = ls.eval_e(repeatCount);
            var timer = this._timers[tag];
            if (!timer) {
                timer = { tag: tag, duration: duration, repeatCount: repeatCount, runtimes: 0, oldtime: egret.getTimer(), isRunning: true };
                this._timers[tag] = timer;
            }
        };
        p.stopTimer = function (tag) {
            if (!tag)
                ls.assert(true, "计时器标签名不能为空！！！！");
            var timer = this._timers[tag];
            if (timer) {
                timer.runtimes = 0;
                timer.isRunning = true;
                timer.oldtime = Number.MIN_VALUE;
                delete this._timers[tag];
            }
        };
        p.resetTimer = function (tag) {
            if (!tag)
                ls.assert(true, "计时器标签名不能为空！！！！");
            var timer = this._timers[tag];
            if (timer) {
                timer.runtimes = 0;
                timer.isRunning = true;
                timer.oldtime = Number.MIN_VALUE;
            }
        };
        p.parseTimer = function (tag) {
            if (!tag)
                ls.assert(true, "计时器标签名不能为空！！！！");
            var timer = this._timers[tag];
            if (timer) {
                timer.isRunning = false;
            }
        };
        p.resumeTimer = function (tag) {
            if (!tag)
                ls.assert(true, "计时器标签名不能为空！！！！");
            var timer = this._timers[tag];
            if (timer) {
                timer.isRunning = true;
            }
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            return bh;
        };
        return TimerBehavior;
    }(ls.BaseBehavior));
    ls.TimerBehavior = TimerBehavior;
    egret.registerClass(TimerBehavior,'ls.TimerBehavior');
    var TimerOnTimerEvent = (function (_super) {
        __extends(TimerOnTimerEvent, _super);
        function TimerOnTimerEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=TimerOnTimerEvent,p=c.prototype;
        return TimerOnTimerEvent;
    }(ls.BaseEvent));
    ls.TimerOnTimerEvent = TimerOnTimerEvent;
    egret.registerClass(TimerOnTimerEvent,'ls.TimerOnTimerEvent');
    var TimerOnTimerCompleteEvent = (function (_super) {
        __extends(TimerOnTimerCompleteEvent, _super);
        function TimerOnTimerCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=TimerOnTimerCompleteEvent,p=c.prototype;
        return TimerOnTimerCompleteEvent;
    }(ls.BaseEvent));
    ls.TimerOnTimerCompleteEvent = TimerOnTimerCompleteEvent;
    egret.registerClass(TimerOnTimerCompleteEvent,'ls.TimerOnTimerCompleteEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map