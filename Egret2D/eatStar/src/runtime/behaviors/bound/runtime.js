var ls;
(function (ls) {
    var BoundsOfRectBehaivor = (function (_super) {
        __extends(BoundsOfRectBehaivor, _super);
        function BoundsOfRectBehaivor() {
            _super.apply(this, arguments);
        }
        var d = __define,c=BoundsOfRectBehaivor,p=c.prototype;
        p.onCreate = function () {
            this.boundType = ls.eval_e(this.boundType);
            this.x = ls.eval_e(this.x) || 0;
            this.y = ls.eval_e(this.y) || 0;
            this.width = ls.eval_e(this.width) || ls.GameUILayer.stage.stageWidth;
            this.height = ls.eval_e(this.height) || ls.GameUILayer.stage.stageHeight;
        };
        p.tick = function () {
            switch (this.boundType) {
                case 0:
                    if (this.inst.x < this.x + this.inst.width * this.inst.anchorX)
                        this.inst.x = this.x + this.inst.width * this.inst.anchorX;
                    if (this.inst.x > this.x + this.width - this.inst.width * this.inst.anchorX)
                        this.inst.x = this.x + this.width - this.inst.width * this.inst.anchorX;
                    if (this.inst.y < this.y + this.inst.height * this.inst.anchorY)
                        this.inst.y = this.y + this.inst.height * this.inst.anchorY;
                    if (this.inst.y > this.y + this.height - this.inst.height * this.inst.anchorY)
                        this.inst.y = this.y + this.height - this.inst.height * this.inst.anchorY;
                    break;
                case 1:
                    if (this.inst.x < this.x)
                        this.inst.x = this.x;
                    if (this.inst.x > this.x + this.width)
                        this.inst.x = this.x + this.width;
                    if (this.inst.y < this.y)
                        this.inst.y = this.y;
                    if (this.inst.y > this.y + this.height)
                        this.inst.y = this.y + this.height;
                    break;
            }
        };
        p.saveToJSON = function () {
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances,
                "x": this.x,
                "y": this.y,
                "width": this.width,
                "height": this.height
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
                this.x = o["x"];
                this.y = o["y"];
                this.width = o["width"];
                this.height = o["height"];
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.setBoundsRect = function (boundType, x, y, width, height) {
            this.boundType = ls.eval_e(boundType);
            this.x = ls.eval_e(x) || 0;
            this.y = ls.eval_e(y) || 0;
            this.width = ls.eval_e(width) || ls.GameUILayer.stage.stageWidth;
            this.height = ls.eval_e(height) || ls.GameUILayer.stage.stageHeight;
        };
        /////////////////////////////////////////////////////////////////
        //                        expression
        /////////////////////////////////////////////////////////////////
        p.clone = function () {
            var bh = new BoundsOfRectBehaivor();
            bh.enabled = this.enabled;
            bh.x = this.x;
            bh.y = this.y;
            bh.width = this.width;
            bh.height = this.height;
            bh.name = this.name;
            bh.paramInstances = this.paramInstances;
            return bh;
        };
        return BoundsOfRectBehaivor;
    }(ls.BaseBehavior));
    ls.BoundsOfRectBehaivor = BoundsOfRectBehaivor;
    egret.registerClass(BoundsOfRectBehaivor,'ls.BoundsOfRectBehaivor');
})(ls || (ls = {}));
//# sourceMappingURL=rumtime.js.map