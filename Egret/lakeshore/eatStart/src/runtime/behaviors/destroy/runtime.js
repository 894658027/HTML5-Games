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
            //检测是否存在过界面内
            if (this.inst.isOnScreen && !this.inst.inExistOnScreen && this.inst.container && this.inst.container.parent)
                this.inst.inExistOnScreen = true;
            if (!this.inst.isModel && !this.inst.isOnScreen && this.inst.inExistOnScreen) {
                this.inst.destory();
            }
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
            var bh = new DestoryOutsideLayoutBehaivor();
            bh.enabled = this.enabled;
            bh.name = this.name;
            bh.paramInstances = this.paramInstances;
            if (this.rect)
                bh.rect = this.rect.clone();
            return bh;
        };
        return DestoryOutsideLayoutBehaivor;
    }(ls.BaseBehavior));
    ls.DestoryOutsideLayoutBehaivor = DestoryOutsideLayoutBehaivor;
    egret.registerClass(DestoryOutsideLayoutBehaivor,'ls.DestoryOutsideLayoutBehaivor');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map