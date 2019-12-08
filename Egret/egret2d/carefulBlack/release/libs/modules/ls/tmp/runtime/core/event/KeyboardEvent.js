var ls;
(function (ls) {
    var KeyboardEvent = (function (_super) {
        __extends(KeyboardEvent, _super);
        function KeyboardEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=KeyboardEvent,p=c.prototype;
        KeyboardEvent.KEY_DOWN = "keyDown";
        KeyboardEvent.KEY_UP = "keyUp";
        return KeyboardEvent;
    }(egret.Event));
    ls.KeyboardEvent = KeyboardEvent;
    egret.registerClass(KeyboardEvent,'ls.KeyboardEvent');
})(ls || (ls = {}));
//# sourceMappingURL=KeyboardEvent.js.map