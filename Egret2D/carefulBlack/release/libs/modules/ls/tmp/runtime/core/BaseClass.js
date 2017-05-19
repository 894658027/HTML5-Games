var ls;
(function (ls) {
    var BaseClass = (function (_super) {
        __extends(BaseClass, _super);
        function BaseClass() {
            _super.call(this);
            this._sid = 0;
            BaseClass.UID++;
            this._sid = BaseClass.UID;
        }
        var d = __define,c=BaseClass,p=c.prototype;
        d(p, "sid"
            ,function () {
                return this._sid;
            }
        );
        d(p, "className"
            ,function () {
                return egret.getQualifiedClassName(this);
            }
        );
        p.getClass = function () {
            return this["constructor"];
        };
        p.clone = function () {
            return new BaseClass();
        };
        BaseClass.UID = 0;
        return BaseClass;
    }(egret.EventDispatcher));
    ls.BaseClass = BaseClass;
    egret.registerClass(BaseClass,'ls.BaseClass');
})(ls || (ls = {}));
//# sourceMappingURL=BaseClass.js.map