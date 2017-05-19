var ls;
(function (ls) {
    var SolidBehaivor = (function (_super) {
        __extends(SolidBehaivor, _super);
        function SolidBehaivor() {
            _super.call(this);
        }
        var d = __define,c=SolidBehaivor,p=c.prototype;
        p.onCreate = function () {
            if (this.inst != null && this.enabled)
                this.inst.solidEnabeld = true;
            else
                this.inst.solidEnabeld = false;
        };
        p.isSolidEnabled = function ($event) {
            return null;
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
        return SolidBehaivor;
    }(ls.BaseBehavior));
    ls.SolidBehaivor = SolidBehaivor;
    egret.registerClass(SolidBehaivor,'ls.SolidBehaivor');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map