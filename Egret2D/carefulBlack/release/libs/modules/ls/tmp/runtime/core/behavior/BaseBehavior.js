var ls;
(function (ls) {
    var BaseBehavior = (function (_super) {
        __extends(BaseBehavior, _super);
        function BaseBehavior() {
            _super.call(this);
            this.enabled = 1;
            this.isCreated = false;
            this.renderEnabled = true;
            ls.Trigger.register(this);
        }
        var d = __define,c=BaseBehavior,p=c.prototype;
        //当实例创建时
        p.onCreate = function () {
        };
        //帧循环
        p.tick = function () {
        };
        //保存成json        
        p.saveToJSON = function () {
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances
            };
        };
        //加载数据
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
            }
        };
        //销毁
        p.destory = function () {
        };
        p.clone = function () {
            return new BaseBehavior();
        };
        return BaseBehavior;
    }(egret.EventDispatcher));
    ls.BaseBehavior = BaseBehavior;
    egret.registerClass(BaseBehavior,'ls.BaseBehavior');
})(ls || (ls = {}));
//# sourceMappingURL=BaseBehavior.js.map