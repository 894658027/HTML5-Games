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
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.x = this.x;
            o.y = this.y;
            o.width = this.width;
            o.height = this.height;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.x = o.x;
                this.y = o.y;
                this.width = o.width;
                this.height = o.height;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.x = this.x;
            bh.y = this.y;
            bh.width = this.width;
            bh.height = this.height;
            return bh;
        };
        return BoundsOfRectBehaivor;
    }(ls.BaseBehavior));
    ls.BoundsOfRectBehaivor = BoundsOfRectBehaivor;
    egret.registerClass(BoundsOfRectBehaivor,'ls.BoundsOfRectBehaivor');
})(ls || (ls = {}));
//# sourceMappingURL=rumtime.js.map