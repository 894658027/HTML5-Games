var ls;
(function (ls) {
    var GameUILayer = (function (_super) {
        __extends(GameUILayer, _super);
        function GameUILayer() {
            _super.call(this);
        }
        var d = __define,c=GameUILayer,p=c.prototype;
        GameUILayer.init = function ($stage) {
            if ($stage) {
                this.stage = $stage;
                if (this.renderContainer == null) {
                    this.renderContainer = new egret.Sprite();
                    this.renderContainer.name = "renderContainer";
                    $stage.addChild(this.renderContainer);
                }
                if (this.debugContainer == null) {
                    this.debugContainer = new egret.Sprite();
                    this.debugContainer.name = "debugContainer";
                    $stage.addChild(this.debugContainer);
                }
                if (this.testContainer == null) {
                    this.testContainer = new egret.Sprite();
                    this.testContainer.name = "testContainer";
                    $stage.addChild(this.testContainer);
                }
                if (this.preContainer == null) {
                    this.preContainer = new egret.Sprite();
                    this.preContainer.name = "preContainer";
                    $stage.addChild(this.preContainer);
                }
                if (this.loadingContainer == null) {
                    this.loadingContainer = new egret.Sprite();
                    this.loadingContainer.name = "loadingContainer";
                    $stage.addChild(this.loadingContainer);
                }
                if (this.drawContainer == null) {
                    this.drawContainer = new egret.Sprite();
                    this.drawContainer.name = "drawContainer";
                    $stage.addChild(this.drawContainer);
                }
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouchEvent, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouchEvent, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEvent, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchEvent, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStageTouchEvent, this);
            }
        };
        GameUILayer.onStageTouchEvent = function (event) {
            this.touchX = event.stageX;
            this.touchY = event.stageY;
        };
        GameUILayer.touchX = 0;
        GameUILayer.touchY = 0;
        return GameUILayer;
    }(egret.DisplayObjectContainer));
    ls.GameUILayer = GameUILayer;
    egret.registerClass(GameUILayer,'ls.GameUILayer');
})(ls || (ls = {}));
//# sourceMappingURL=GameUILayer.js.map