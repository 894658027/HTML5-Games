var ls;
(function (ls) {
    var AIKeyboard = (function (_super) {
        __extends(AIKeyboard, _super);
        function AIKeyboard() {
            _super.call(this);
            if (AIKeyboard._instance != null)
                throw new Error("AIKeyboard为单例！！");
            this.name = "Keyboard";
            AIKeyboard._instance = this;
            this.initilize();
        }
        var d = __define,c=AIKeyboard,p=c.prototype;
        d(AIKeyboard, "instance"
            ,function () {
                if (this._instance == null)
                    this._instance = new AIKeyboard();
                return this._instance;
            }
        );
        p.initilize = function () {
            window.addEventListener("keydown", this.onKeyEvent.bind(this), true);
            window.addEventListener("keyup", this.onKeyEvent.bind(this), true);
        };
        p.onKeyEvent = function (event) {
            this._isCtrl = event.ctrlKey;
            this._isShift = event.shiftKey;
            this._type = event.type;
            this._keyIdentifier = event.keyIdentifier;
            this._charCode = event.charCode;
            this._keyCode = event.keyCode;
            this._event = event;
            switch (event.type) {
                case "keydown":
                    this._isKeyDown = true;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onkeyDown));
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onAnykeyDown));
                    break;
                case "keyup":
                    this._isKeyDown = false;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onkeyReleased));
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onAnykeyReleased));
                    break;
            }
        };
        ///////////////////////////conditions/////////////////////////////////
        p.keyIsDown = function (event) {
            return { instances: [this], status: this._isKeyDown && ls.eval_e(event.key) == this._keyCode };
        };
        p.onkeyDown = function (event) {
            return { instances: [this], status: ls.eval_e(event.key) == this._keyCode };
        };
        p.onkeyReleased = function (event) {
            return { instances: [this], status: ls.eval_e(event.key) == this._keyCode };
        };
        p.onAnykeyDown = function (event) {
            return { instances: [this], status: true };
        };
        p.onAnykeyReleased = function (event) {
            return { instances: [this], status: true };
        };
        d(p, "keyCode"
            ///////////////////////////////////expressions//////////////////////////////        
            ,function () {
                return 'which' in this._event ? this._event.which : this._event.keyCode;
            }
        );
        d(p, "isCtrl"
            //暂时有bug
            // get charCode(): string{
            //     return String.fromCharCode(this._keyCode);
            // }
            ,function () {
                return this._isCtrl;
            }
        );
        d(p, "isShift"
            ,function () {
                return this._isShift;
            }
        );
        d(p, "isKeyDown"
            ,function () {
                return this._isKeyDown;
            }
        );
        d(p, "type"
            ,function () {
                return this._type;
            }
        );
        d(p, "keyIdentifier"
            ,function () {
                return this._keyIdentifier;
            }
        );
        return AIKeyboard;
    }(ls.AIObject));
    ls.AIKeyboard = AIKeyboard;
    egret.registerClass(AIKeyboard,'ls.AIKeyboard');
    var KeyIsDownEvent = (function (_super) {
        __extends(KeyIsDownEvent, _super);
        function KeyIsDownEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=KeyIsDownEvent,p=c.prototype;
        return KeyIsDownEvent;
    }(ls.BaseEvent));
    ls.KeyIsDownEvent = KeyIsDownEvent;
    egret.registerClass(KeyIsDownEvent,'ls.KeyIsDownEvent');
    var OnKeyDownEvent = (function (_super) {
        __extends(OnKeyDownEvent, _super);
        function OnKeyDownEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnKeyDownEvent,p=c.prototype;
        return OnKeyDownEvent;
    }(ls.BaseEvent));
    ls.OnKeyDownEvent = OnKeyDownEvent;
    egret.registerClass(OnKeyDownEvent,'ls.OnKeyDownEvent');
    var OnKeyReleasedEvent = (function (_super) {
        __extends(OnKeyReleasedEvent, _super);
        function OnKeyReleasedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnKeyReleasedEvent,p=c.prototype;
        return OnKeyReleasedEvent;
    }(ls.BaseEvent));
    ls.OnKeyReleasedEvent = OnKeyReleasedEvent;
    egret.registerClass(OnKeyReleasedEvent,'ls.OnKeyReleasedEvent');
    var OnAnyKeyDownEvent = (function (_super) {
        __extends(OnAnyKeyDownEvent, _super);
        function OnAnyKeyDownEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnAnyKeyDownEvent,p=c.prototype;
        return OnAnyKeyDownEvent;
    }(ls.BaseEvent));
    ls.OnAnyKeyDownEvent = OnAnyKeyDownEvent;
    egret.registerClass(OnAnyKeyDownEvent,'ls.OnAnyKeyDownEvent');
    var OnAnyKeyReleasedEvent = (function (_super) {
        __extends(OnAnyKeyReleasedEvent, _super);
        function OnAnyKeyReleasedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnAnyKeyReleasedEvent,p=c.prototype;
        return OnAnyKeyReleasedEvent;
    }(ls.BaseEvent));
    ls.OnAnyKeyReleasedEvent = OnAnyKeyReleasedEvent;
    egret.registerClass(OnAnyKeyReleasedEvent,'ls.OnAnyKeyReleasedEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map