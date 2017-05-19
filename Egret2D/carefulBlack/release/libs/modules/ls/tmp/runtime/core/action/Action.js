var ls;
(function (ls) {
    var loopSelections = (function () {
        function loopSelections() {
        }
        var d = __define,c=loopSelections,p=c.prototype;
        return loopSelections;
    }());
    ls.loopSelections = loopSelections;
    egret.registerClass(loopSelections,'ls.loopSelections');
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.call(this);
            //动作索引
            this.index = 0;
            this.instances = {};
        }
        var d = __define,c=Action,p=c.prototype;
        return Action;
    }(ls.BaseClass));
    ls.Action = Action;
    egret.registerClass(Action,'ls.Action');
})(ls || (ls = {}));
//# sourceMappingURL=Action.js.map