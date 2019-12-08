var ls;
(function (ls) {
    var Log = (function () {
        function Log() {
        }
        var d = __define,c=Log,p=c.prototype;
        Log.log = function (message) {
            if (!ls.Config.openLog)
                return;
            if (this.logText == null) {
                var testContainer = ls.GameUILayer.testContainer;
                testContainer.graphics.clear();
                testContainer.graphics.beginFill(0, 0.8);
                testContainer.graphics.drawRect(0, 0, 250, 250);
                testContainer.graphics.endFill();
                this.logText = new egret.TextField();
                this.logText.width = 250;
                this.logText.height = 250;
                this.logText.size = 14;
                this.logText.lineSpacing = 6;
                this.logText.fontFamily = "宋体";
                this.logText.textColor = 0x00c200;
                this.logText.x = 5;
                this.logText.y = 5;
                testContainer.addChild(this.logText);
            }
            if (this.logCache.length > 12) {
                this.logCache.shift();
            }
            message = (message == undefined) ? "" : message;
            this.logCache.push(message);
            var messages = "";
            for (var i = 0; i < this.logCache.length; i++) {
                messages += this.logCache[i] + "\n";
            }
            this.logText.text = messages;
            this.logText.scrollV = (this.logText.maxScrollV - 12 < 0) ? 0 : (this.logText.maxScrollV - 12);
        };
        Log.logCache = [];
        return Log;
    }());
    ls.Log = Log;
    egret.registerClass(Log,'ls.Log');
})(ls || (ls = {}));
//# sourceMappingURL=Log.js.map