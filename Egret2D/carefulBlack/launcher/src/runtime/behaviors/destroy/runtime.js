var ls;
(function (ls) {
    var DestoryOutsideLayoutBehaivor = (function (_super) {
        __extends(DestoryOutsideLayoutBehaivor, _super);
        function DestoryOutsideLayoutBehaivor() {
            _super.apply(this, arguments);
        }
        var d = __define,c=DestoryOutsideLayoutBehaivor,p=c.prototype;
        p.tick = function () {
            if (!this.inst)
                return;
            //检测是否存在过场景，如果存在过，再出去才会有资格销毁
            if (this.inst.isOnScreen)
                this.inst.inExistOnScreen = true;
            if (!this.inst.isOnScreen && this.inst.inExistOnScreen) {
                this.inst.destory();
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
        return DestoryOutsideLayoutBehaivor;
    }(ls.BaseBehavior));
    ls.DestoryOutsideLayoutBehaivor = DestoryOutsideLayoutBehaivor;
    egret.registerClass(DestoryOutsideLayoutBehaivor,'ls.DestoryOutsideLayoutBehaivor');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map