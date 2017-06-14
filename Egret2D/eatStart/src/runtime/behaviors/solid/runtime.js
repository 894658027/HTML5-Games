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
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
            }
        };
        p.clone = function () {
            var bh = new SolidBehaivor();
            bh.enabled = this.enabled;
            bh.name = this.name;
            bh.paramInstances = this.paramInstances;
            return bh;
        };
        return SolidBehaivor;
    }(ls.BaseBehavior));
    ls.SolidBehaivor = SolidBehaivor;
    egret.registerClass(SolidBehaivor,'ls.SolidBehaivor');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map