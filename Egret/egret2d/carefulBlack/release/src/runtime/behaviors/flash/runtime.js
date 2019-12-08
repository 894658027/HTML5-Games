var ls;
(function (ls) {
    var FlashBehavior = (function (_super) {
        __extends(FlashBehavior, _super);
        function FlashBehavior() {
            _super.call(this);
            this._start = false;
        }
        var d = __define,c=FlashBehavior,p=c.prototype;
        p.onCreate = function () {
            this._ontime = ls.eval_e(this["onTime"]);
            this._offtime = ls.eval_e(this["offTime"]);
            this._timesLeft = ls.eval_e(this["times"]);
            this._timesLeft = (this._timesLeft <= 0) ? Number.MAX_VALUE : this._timesLeft;
            this._start = (ls.eval_e(this["enabled"]) == 1);
            this._state = 0; //0=on,1=off
            if (this._start) {
                this.inst.visible = true;
                this._onOldTime = egret.getTimer();
                this._offOldTime = egret.getTimer();
                if (this._ontime < 0)
                    this._ontime = 0;
                if (this._offtime <= 0)
                    this._offtime = 0;
            }
        };
        p.tick = function () {
            if (!this._start)
                return;
            var dt = this.inst.dt;
            if (this._timesLeft <= 0 && this._start) {
                this._timesLeft = 0;
                this.inst.visible = true;
                this._start = false;
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onFlashEnded));
                return;
            }
            var currentTime = egret.getTimer();
            if (this._state === 0) {
                if (currentTime - this._onOldTime >= this._ontime * 1000) {
                    this._offOldTime = currentTime;
                    this._state = 1;
                }
                this.inst.visible = true;
            }
            else if (this._state === 1) {
                this.inst.visible = false;
                if (currentTime - this._offOldTime >= this._offtime * 1000) {
                    this._onOldTime = currentTime;
                    this._state = 0;
                    this._timesLeft--;
                    if (this._start)
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onFlashLoopOnceComplete));
                }
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.isFlashing = function ($event) {
            return { instances: [this.inst], status: this._timesLeft > 0 && this._start };
        };
        //Trigger
        p.onFlashEnded = function ($event) {
            return { instances: [this.inst], status: true };
        };
        //循环一次完成
        p.onFlashLoopOnceComplete = function ($event) {
            return { instances: [this.inst], status: true };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.startFlash = function (onTime, offTime, times) {
            this._ontime = ls.eval_e(onTime);
            this._offtime = ls.eval_e(offTime);
            this._state = 0; //从on开始
            this._timesLeft = ls.eval_e(times); //持续次数，如果数字为零，那么，一直持续
            this._timesLeft = (this._timesLeft <= 0) ? Number.MAX_VALUE : this._timesLeft;
            this.inst.visible = true;
            this._onOldTime = egret.getTimer();
            this._offOldTime = egret.getTimer();
            this._start = true;
            if (this._ontime < 0)
                this._ontime = 0;
            if (this._offtime <= 0)
                this._offtime = 0;
        };
        p.stopFlashing = function () {
            this._start = false;
            this._timesLeft = 0;
            this.inst.visible = true;
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["onTime"] = this["onTime"];
            o["offTime"] = this["offTime"];
            o["times"] = this["times"];
            o["enabled"] = this["enabled"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this["onTime"] = o["onTime"];
                this["offTime"] = o["offTime"];
                this["times"] = o["times"];
                this["enabled"] = o["enabled"];
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh["onTime"] = this["onTime"];
            bh["offTime"] = this["offTime"];
            bh["times"] = this["times"];
            bh["enabled"] = this["enabled"];
            return bh;
        };
        return FlashBehavior;
    }(ls.BaseBehavior));
    ls.FlashBehavior = FlashBehavior;
    egret.registerClass(FlashBehavior,'ls.FlashBehavior');
    var FlashIsFlashingEvent = (function (_super) {
        __extends(FlashIsFlashingEvent, _super);
        function FlashIsFlashingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=FlashIsFlashingEvent,p=c.prototype;
        return FlashIsFlashingEvent;
    }(ls.BaseEvent));
    ls.FlashIsFlashingEvent = FlashIsFlashingEvent;
    egret.registerClass(FlashIsFlashingEvent,'ls.FlashIsFlashingEvent');
    var FlashOnFlashEndedEvent = (function (_super) {
        __extends(FlashOnFlashEndedEvent, _super);
        function FlashOnFlashEndedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=FlashOnFlashEndedEvent,p=c.prototype;
        return FlashOnFlashEndedEvent;
    }(ls.BaseEvent));
    ls.FlashOnFlashEndedEvent = FlashOnFlashEndedEvent;
    egret.registerClass(FlashOnFlashEndedEvent,'ls.FlashOnFlashEndedEvent');
    var FlashonFlashLoopOnceCompleteEvent = (function (_super) {
        __extends(FlashonFlashLoopOnceCompleteEvent, _super);
        function FlashonFlashLoopOnceCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=FlashonFlashLoopOnceCompleteEvent,p=c.prototype;
        return FlashonFlashLoopOnceCompleteEvent;
    }(ls.BaseEvent));
    ls.FlashonFlashLoopOnceCompleteEvent = FlashonFlashLoopOnceCompleteEvent;
    egret.registerClass(FlashonFlashLoopOnceCompleteEvent,'ls.FlashonFlashLoopOnceCompleteEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map