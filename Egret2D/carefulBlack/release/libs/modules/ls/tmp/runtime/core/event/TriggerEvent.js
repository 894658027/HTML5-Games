var ls;
(function (ls) {
    var TriggerEvent = (function (_super) {
        __extends(TriggerEvent, _super);
        function TriggerEvent(type, triggerCondtion, triggerData, bubbles, cancelable) {
            if (triggerData === void 0) { triggerData = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            this.triggerTargets = [];
            this.triggerCondition = triggerCondtion;
            this.triggerData = triggerData;
        }
        var d = __define,c=TriggerEvent,p=c.prototype;
        TriggerEvent.TRIGGER = "TRIGGER";
        return TriggerEvent;
    }(egret.Event));
    ls.TriggerEvent = TriggerEvent;
    egret.registerClass(TriggerEvent,'ls.TriggerEvent');
})(ls || (ls = {}));
//# sourceMappingURL=TriggerEvent.js.map