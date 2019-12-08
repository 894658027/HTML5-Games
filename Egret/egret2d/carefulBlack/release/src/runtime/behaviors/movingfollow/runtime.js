var ls;
(function (ls) {
    var MovingFollowOnMouseBehaivor = (function (_super) {
        __extends(MovingFollowOnMouseBehaivor, _super);
        function MovingFollowOnMouseBehaivor() {
            _super.apply(this, arguments);
        }
        var d = __define,c=MovingFollowOnMouseBehaivor,p=c.prototype;
        p.onCreate = function () {
            if (this.inst) {
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchEvent, this);
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEvent, this);
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEvent, this);
            }
        };
        p.onTouchEvent = function (event) {
            this.inst.x = event.stageX;
            this.inst.y = event.stageY;
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
        return MovingFollowOnMouseBehaivor;
    }(ls.BaseBehavior));
    ls.MovingFollowOnMouseBehaivor = MovingFollowOnMouseBehaivor;
    egret.registerClass(MovingFollowOnMouseBehaivor,'ls.MovingFollowOnMouseBehaivor');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map