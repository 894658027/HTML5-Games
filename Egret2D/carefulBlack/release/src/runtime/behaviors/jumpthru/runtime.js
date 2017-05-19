var ls;
(function (ls) {
    var JumpthruBehavior = (function (_super) {
        __extends(JumpthruBehavior, _super);
        function JumpthruBehavior() {
            _super.apply(this, arguments);
        }
        var d = __define,c=JumpthruBehavior,p=c.prototype;
        p.onCreate = function () {
            if (this.inst != null && this.enabled)
                this.inst.jumpthruEnabled = true;
            else
                this.inst.jumpthruEnabled = false;
        };
        p.isJumpthruEnabled = function ($event) {
            return { instances: [this.inst], status: false };
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
        return JumpthruBehavior;
    }(ls.BaseBehavior));
    ls.JumpthruBehavior = JumpthruBehavior;
    egret.registerClass(JumpthruBehavior,'ls.JumpthruBehavior');
    var JumpThruIsJumpThruEnabledEvent = (function (_super) {
        __extends(JumpThruIsJumpThruEnabledEvent, _super);
        function JumpThruIsJumpThruEnabledEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=JumpThruIsJumpThruEnabledEvent,p=c.prototype;
        return JumpThruIsJumpThruEnabledEvent;
    }(ls.BaseEvent));
    ls.JumpThruIsJumpThruEnabledEvent = JumpThruIsJumpThruEnabledEvent;
    egret.registerClass(JumpThruIsJumpThruEnabledEvent,'ls.JumpThruIsJumpThruEnabledEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map