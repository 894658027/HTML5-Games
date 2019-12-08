var ls;
(function (ls) {
    var AITouch = (function (_super) {
        __extends(AITouch, _super);
        function AITouch() {
            _super.call(this);
            if (AITouch._instance != null)
                throw new Error("AITouch为单例！！！");
            this.name = "Touch";
            AITouch._instance = this;
            this.initilize();
        }
        var d = __define,c=AITouch,p=c.prototype;
        p.initilize = function () {
            ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouchEvent, this);
            ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouchEvent, this);
            ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEvent, this);
            ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchEvent, this);
            ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStageTouchEvent, this);
        };
        p.onStageTouchEvent = function (event) {
            this._touchX = event.stageX;
            this._touchY = event.stageY;
            this._touchPointID = event.touchPointID;
            this._isTouchDown = event.touchDown;
            var localPos = ls.GameUILayer.renderContainer.globalToLocal(this._touchX, this._touchY);
            this._touchSceneX = localPos.x;
            this._touchSceneY = localPos.y;
            switch (event.type) {
                case egret.TouchEvent.TOUCH_TAP:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTouchTap));
                    break;
                case egret.TouchEvent.TOUCH_BEGIN:
                    this._touchDownX = event.stageX;
                    this._touchDownY = event.stageY;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTouchBegin));
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this._touchUpX = event.stageX;
                    this._touchUpY = event.stageY;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTouchEnd));
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTouchMove));
                    break;
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTouchReleaseOutside));
                    break;
            }
        };
        d(AITouch, "instance"
            ,function () {
                if (this._instance == null)
                    this._instance = new AITouch();
                return this._instance;
            }
        );
        d(p, "touchX"
            ,function () {
                return this._touchX;
            }
        );
        d(p, "touchY"
            ,function () {
                return this._touchY;
            }
        );
        d(p, "touchSceneX"
            ,function () {
                return this._touchSceneX;
            }
        );
        d(p, "touchSceneY"
            ,function () {
                return this._touchSceneY;
            }
        );
        d(p, "touchDownX"
            ,function () {
                return this._touchDownX;
            }
        );
        d(p, "touchDownY"
            ,function () {
                return this._touchDownY;
            }
        );
        d(p, "touchUpX"
            ,function () {
                return this._touchUpX;
            }
        );
        d(p, "touchUpY"
            ,function () {
                return this._touchUpY;
            }
        );
        d(p, "touchPointID"
            ,function () {
                return this._touchPointID;
            }
        );
        //方向支持
        p.orientationSupported = function () {
            return { instances: [this], status: (typeof window["DeviceOrientationEvent"] !== "undefined") };
        };
        p.motionSupported = function () {
            return { instances: [this], status: (typeof window["DeviceMotionEvent"] !== "undefined") };
        };
        p.isTouchDown = function ($isTouchDownEvent) {
            return { instances: [this], status: this._isTouchDown };
        };
        p.onTouchTap = function ($onTouchTapEvent) {
            return { instances: [this], status: true };
        };
        p.onTouchBegin = function ($onTouchBeginEvent) {
            return { instances: [this], status: true };
        };
        p.onTouchEnd = function ($onTouchEnd) {
            return { instances: [this], status: true };
        };
        p.onTouchMove = function ($onTouchMoveEvent) {
            return { instances: [this], status: true };
        };
        p.onTouchReleaseOutside = function ($onTouchReleaseOutside) {
            return { instances: [this], status: true };
        };
        //比较方向
        p.compareOrientation = function () {
            return { instances: [this], status: true };
        };
        //比较加速度
        p.compareAcceleration = function () {
            return { instances: [this], status: true };
        };
        p.loadFromJSON = function (o) {
        };
        //数据保存
        p.saveToJSON = function () {
        };
        return AITouch;
    }(ls.AIObject));
    ls.AITouch = AITouch;
    egret.registerClass(AITouch,'ls.AITouch');
    var IsTouchDownEvent = (function (_super) {
        __extends(IsTouchDownEvent, _super);
        function IsTouchDownEvent() {
            _super.call(this);
        }
        var d = __define,c=IsTouchDownEvent,p=c.prototype;
        return IsTouchDownEvent;
    }(ls.BaseEvent));
    ls.IsTouchDownEvent = IsTouchDownEvent;
    egret.registerClass(IsTouchDownEvent,'ls.IsTouchDownEvent');
    var OnTouchTapEvent = (function (_super) {
        __extends(OnTouchTapEvent, _super);
        function OnTouchTapEvent() {
            _super.call(this);
        }
        var d = __define,c=OnTouchTapEvent,p=c.prototype;
        return OnTouchTapEvent;
    }(ls.BaseEvent));
    ls.OnTouchTapEvent = OnTouchTapEvent;
    egret.registerClass(OnTouchTapEvent,'ls.OnTouchTapEvent');
    var OnTouchBeginEvent = (function (_super) {
        __extends(OnTouchBeginEvent, _super);
        function OnTouchBeginEvent() {
            _super.call(this);
        }
        var d = __define,c=OnTouchBeginEvent,p=c.prototype;
        return OnTouchBeginEvent;
    }(ls.BaseEvent));
    ls.OnTouchBeginEvent = OnTouchBeginEvent;
    egret.registerClass(OnTouchBeginEvent,'ls.OnTouchBeginEvent');
    var OnTouchEndEvent = (function (_super) {
        __extends(OnTouchEndEvent, _super);
        function OnTouchEndEvent() {
            _super.call(this);
        }
        var d = __define,c=OnTouchEndEvent,p=c.prototype;
        return OnTouchEndEvent;
    }(ls.BaseEvent));
    ls.OnTouchEndEvent = OnTouchEndEvent;
    egret.registerClass(OnTouchEndEvent,'ls.OnTouchEndEvent');
    var OnTouchMoveEvent = (function (_super) {
        __extends(OnTouchMoveEvent, _super);
        function OnTouchMoveEvent() {
            _super.call(this);
        }
        var d = __define,c=OnTouchMoveEvent,p=c.prototype;
        return OnTouchMoveEvent;
    }(ls.BaseEvent));
    ls.OnTouchMoveEvent = OnTouchMoveEvent;
    egret.registerClass(OnTouchMoveEvent,'ls.OnTouchMoveEvent');
    var OnTouchReleaseOutsideEvent = (function (_super) {
        __extends(OnTouchReleaseOutsideEvent, _super);
        function OnTouchReleaseOutsideEvent() {
            _super.call(this);
        }
        var d = __define,c=OnTouchReleaseOutsideEvent,p=c.prototype;
        return OnTouchReleaseOutsideEvent;
    }(ls.BaseEvent));
    ls.OnTouchReleaseOutsideEvent = OnTouchReleaseOutsideEvent;
    egret.registerClass(OnTouchReleaseOutsideEvent,'ls.OnTouchReleaseOutsideEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map