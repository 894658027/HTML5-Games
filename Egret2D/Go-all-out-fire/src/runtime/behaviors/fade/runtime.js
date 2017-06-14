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
            this.destoryType = 0;
        }
        var d = __define,c=FadeBehavior,p=c.prototype;
        p.onCreate = function () {
            this.activeAtStartType = ls.eval_e(this.activeAtStartType);
            this.fadeInTime = ls.eval_e(this.fadeInTime);
            this.fadeOutTime = ls.eval_e(this.fadeOutTime);
            this.waitTime = ls.eval_e(this.waitTime);
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
                this.inst.alpha += this.inst.dt / this.fadeInTime;
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
                        this._state = 3; //done;
                        this._oldTime = egret.getTimer();
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onFadeOutFinished));
                        if (this.destoryType === 1)
                            this.inst.destory();
                    }
                }
            }
        };
        p.saveToJSON = function () {
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances,
                "fadeInTime": this.fadeInTime,
                "fadeOutTime": this.fadeOutTime,
                "waitTime": this.waitTime,
                "destoryType": this.destoryType,
                "activeAtStartType": this.activeAtStartType,
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
                this.fadeInTime = o["fadeInTime"];
                this.fadeOutTime = o["fadeOutTime"];
                this.waitTime = o["waitTime"];
                this.destoryType = o["destoryType"];
                this.activeAtStartType = o["activeAtStartType"];
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
        p.clone = function () {
            var bh = new FadeBehavior();
            bh.enabled = this.enabled;
            bh.name = this.name;
            bh.paramInstances = this.paramInstances;
            bh.fadeInTime = this.fadeInTime;
            bh.fadeOutTime = this.fadeOutTime;
            bh.waitTime = this.waitTime;
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