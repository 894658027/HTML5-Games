var ls;
(function (ls) {
    var Condition = (function (_super) {
        __extends(Condition, _super);
        function Condition() {
            _super.call(this);
            //是否是触发条件
            this.isTrigger = false;
            //是否是反转条件
            this.isInvert = false;
            //操作符类型(包括0：逻辑与（&&），1：逻辑或（||）)
            //注意，第1个条件的操作符类型会忽略
            this.operatorType = 0;
        }
        var d = __define,c=Condition,p=c.prototype;
        d(p, "isFirstCondition"
            //是否是第1个条件
            ,function () {
                return this.index === 0;
            }
        );
        return Condition;
    }(ls.BaseClass));
    ls.Condition = Condition;
    egret.registerClass(Condition,'ls.Condition');
})(ls || (ls = {}));
//# sourceMappingURL=Condition.js.map