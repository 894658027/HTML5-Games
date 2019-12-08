/**
 * create by masterLi 2016/11/10
 */
var BotllePackage = (function (_super) {
    __extends(BotllePackage, _super);
    function BotllePackage() {
        _super.call(this);
        /**package收集的数量 */
        this._sum = 0;
        /**是否正在打包若是 就不在放入瓶子 */
        this.isPacking = false;
    }
    var d = __define,c=BotllePackage,p=c.prototype;
    p.createChildren = function () {
        var str = 'bottle' + this.pak_type + '_0_png';
        // this.log(str);
        this.img_body.source = RES.getRes(str);
    };
    d(p, "pak_type"
        ,function () {
            return this._pak_type;
        }
        ,function (v) {
            this._pak_type = v;
        }
    );
    d(p, "sum"
        ,function () {
            return this._sum;
        }
        ,function (v) {
            this._sum = v;
            this.log;
            // 改变瓶子的数量时 更改package的皮肤
            var str = "bottle" + this.pak_type + "_" + v + "_png";
            // this.log(str);
            this.img_body.source = RES.getRes(str);
        }
    );
    /**收集瓶子 */
    p.addBottle = function (bottle) {
        this.sum += 1;
        if (this.sum >= 6) {
            this.packing();
            return true;
        }
        return false;
    };
    /**显示打包动画 */
    p.packing = function () {
        this.isPacking = true;
        var that = this;
        var frameTween = egret.Tween.get(this.img_body);
        for (var i = 7; i < 24; i++) {
            frameTween.wait(100).set({
                'source': RES.getRes("bottle" + this.pak_type + '_' + i + '_png')
            });
        }
        frameTween.call(this.packageOver, this);
    };
    /** 打包完后初始化参数*/
    p.packageOver = function () {
        this.sum = 0;
        this.isPacking = false;
    };
    /**清空包裹 */
    p.cleanPackage = function () {
        this.sum = 0;
    };
    return BotllePackage;
}(ComController));
egret.registerClass(BotllePackage,'BotllePackage');
//# sourceMappingURL=BotllePackage.js.map