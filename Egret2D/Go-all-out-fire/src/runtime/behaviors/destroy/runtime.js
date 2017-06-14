var ls;
(function (ls) {
    var DestoryOutsideLayoutBehaivor = (function (_super) {
        __extends(DestoryOutsideLayoutBehaivor, _super);
        function DestoryOutsideLayoutBehaivor() {
            _super.apply(this, arguments);
            this.type = 1;
        }
        var d = __define,c=DestoryOutsideLayoutBehaivor,p=c.prototype;
        p.onCreate = function () {
            this.type = ls.eval_e(this.type);
        };
        p.tick = function () {
            if (this.inst.exsitOnScreen === undefined && this.inst.isOnScreen)
                this.inst.exsitOnScreen = true;
            if (!this.inst.isOnScreen) {
                switch (this.type) {
                    case 1:
                        this.inst.destory();
                        break;
                    case 2:
                        if (this.inst.exsitOnScreen)
                            this.inst.destory();
                        break;
                }
            }
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.type = this.type;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.type = o.type;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.type = this.type;
            return bh;
        };
        return DestoryOutsideLayoutBehaivor;
    }(ls.BaseBehavior));
    ls.DestoryOutsideLayoutBehaivor = DestoryOutsideLayoutBehaivor;
    egret.registerClass(DestoryOutsideLayoutBehaivor,'ls.DestoryOutsideLayoutBehaivor');
})(ls || (ls = {}));
