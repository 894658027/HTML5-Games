var ls;
(function (ls) {
    var FadeBehavior = (function (_super) {
        __extends(FadeBehavior, _super);
        function FadeBehavior() {
            _super.call(this);
            //0：不激活 1：激活
            this.activeAtStartType = 1;
            this.fadeInTime = 0;
            this.fadeOutTime = 1;
            this.waitTime = 0;
            this.loopTimes = 1; //循环次数
            this.destoryType = 0;
            this._currentLoopTimes = 0;
        }
        var d = __define,c=FadeBehavior,p=c.prototype;
        p.onCreate = function () {
            this.activeAtStartType = ls.eval_e(this.activeAtStartType);
            this.fadeInTime = ls.eval_e(this.fadeInTime);
            this.fadeOutTime = ls.eval_e(this.fadeOutTime);
            this.waitTime = ls.eval_e(this.waitTime);
            this.loopTimes = ls.eval_e(this.loopTimes);
            this.loopTimes = (this.loopTimes <= 0) ? Number.MAX_VALUE : this.loopTimes;
            this.destoryType = ls.eval_e(this.destoryType);
            this._oldTime = egret.getTimer();
            this._state = this.destoryType === 1 ? 0 : 3;
            if (this.activeAtStartType == 1) {
                if (this.fadeInTime === 0) {
                    this._state = 1;
                    if (this.waitTime === 0)
                        this._state = 2;
                }
                else {
                    if (this.inst)
                        this.inst.alpha = 0;
                }
            }
            if (this.fadeInTime !== 0 && this.inst && this.activeAtStartType) {
                this.inst.alpha = 0;
            }
        };
        p.tick = function () {
            if (this.activeAtStartType == 0)
                return;
            this._currentTime = egret.getTimer();
            //fade in
            if (this._state === 0) {
                if (this.fadeInTime > 0)
                    this.inst.alpha += this.inst.dt / this.fadeInTime;
                else
                    this.inst.alpha = 1;
                //fade-in completed
                if (this.inst.alpha >= 1) {
                    this.inst.alpha = 1;
                    this._state = 1;
                    this._oldTime = egret.getTimer();
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onFadeInFinished));
                }
            }
            //wait
            if (this._state === 1) {
                this._currentTime = egret.getTimer();
                //wait completed
                if (this._currentTime - this._oldTime >= this.waitTime * 1000) {
                    this._oldTime = this._currentTime;
                    this._state = 2;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onWaitFinished));
                }
            }
            //fade out
            if (this._state === 2) {
                if (this.fadeOutTime !== 0) {
                    this.inst.alpha -= this.inst.dt / this.fadeOutTime;
                    if (this.inst.alpha <= 0) {
                        this.inst.alpha = 0;
                        this._oldTime = egret.getTimer();
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onFadeOutFinished));
                        this._currentLoopTimes++;
                        if (this._currentLoopTimes >= this.loopTimes) {
                            if (this.destoryType === 1)
                                this.inst.destory();
                            this._state = 3; //done;
                        }
                        else {
                            this._state = 0; //重置;
                            this.inst.alpha = 0;
                        }
                    }
                }
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.onFadeInFinished = function ($event) {
            return { instances: [this.inst], status: true };
        };
        p.onFadeOutFinished = function ($event) {
            return { instances: [this.inst], status: true };
        };
        p.onWaitFinished = function ($event) {
            return { instances: [this.inst], status: true };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.startFade = function () {
            if (this._state === 3)
                this.doStart();
        };
        p.restartFade = function () {
            this.doStart();
        };
        p.setWaitTime = function (time) {
            time = ls.eval_e(time);
            time = (time < 0) ? 0 : time;
            this.waitTime = time;
        };
        p.setFadeInTime = function (time) {
            time = ls.eval_e(time);
            time = (time < 0) ? 0 : time;
            this.fadeInTime = time;
        };
        p.setFadeOutTime = function (time) {
            time = ls.eval_e(time);
            time = (time < 0) ? 0 : time;
            this.fadeOutTime = time;
        };
        p.setActiveAtStartType = function (activeType) {
            this.activeAtStartType = ls.eval_e(activeType);
        };
        p.doStart = function () {
            this._state = 0;
            this._oldTime = egret.getTimer();
            if (this.fadeInTime === 0) {
                this._state = 1;
                //skip wait
                if (this.waitTime === 0)
                    this._state = 2;
            }
            else {
                this.inst.alpha = 0;
            }
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.fadeInTime = this.fadeInTime;
            o.fadeOutTime = this.fadeOutTime;
            o.waitTime = this.waitTime;
            o.loopTimes = this.loopTimes;
            o.destoryType = this.destoryType;
            o.activeAtStartType = this.activeAtStartType;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.fadeInTime = o.fadeInTime;
                this.fadeOutTime = o.fadeOutTime;
                this.waitTime = o.waitTime;
                this.loopTimes = o.loopTimes;
                this.destoryType = o.destoryType;
                this.activeAtStartType = o.activeAtStartType;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.fadeInTime = this.fadeInTime;
            bh.fadeOutTime = this.fadeOutTime;
            bh.waitTime = this.waitTime;
            bh.loopTimes = this.loopTimes;
            bh.destoryType = this.destoryType;
            bh.activeAtStartType = this.activeAtStartType;
            return bh;
        };
        return FadeBehavior;
    }(ls.BaseBehavior));
    ls.FadeBehavior = FadeBehavior;
    egret.registerClass(FadeBehavior,'ls.FadeBehavior');
    var FadeOnFadeInFinishedEvent = (function (_super) {
        __extends(FadeOnFadeInFinishedEvent, _super);
        function FadeOnFadeInFinishedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=FadeOnFadeInFinishedEvent,p=c.prototype;
        return FadeOnFadeInFinishedEvent;
    }(ls.BaseEvent));
    ls.FadeOnFadeInFinishedEvent = FadeOnFadeInFinishedEvent;
    egret.registerClass(FadeOnFadeInFinishedEvent,'ls.FadeOnFadeInFinishedEvent');
    var FadeOnFadeOutFinishedEvent = (function (_super) {
        __extends(FadeOnFadeOutFinishedEvent, _super);
        function FadeOnFadeOutFinishedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=FadeOnFadeOutFinishedEvent,p=c.prototype;
        return FadeOnFadeOutFinishedEvent;
    }(ls.BaseEvent));
    ls.FadeOnFadeOutFinishedEvent = FadeOnFadeOutFinishedEvent;
    egret.registerClass(FadeOnFadeOutFinishedEvent,'ls.FadeOnFadeOutFinishedEvent');
    var FadeOnFadeWaitFinishedEvent = (function (_super) {
        __extends(FadeOnFadeWaitFinishedEvent, _super);
        function FadeOnFadeWaitFinishedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=FadeOnFadeWaitFinishedEvent,p=c.prototype;
        return FadeOnFadeWaitFinishedEvent;
    }(ls.BaseEvent));
    ls.FadeOnFadeWaitFinishedEvent = FadeOnFadeWaitFinishedEvent;
    egret.registerClass(FadeOnFadeWaitFinishedEvent,'ls.FadeOnFadeWaitFinishedEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map