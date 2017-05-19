var ls;
(function (ls) {
    var SceneCamera = (function () {
        function SceneCamera(scene) {
            this.oldSceneX = 0;
            this.oldSceneY = 0;
            this.newSceneX = 0;
            this.newSceneY = 0;
            this.updateCamera = false;
            this.scene = scene;
        }
        var d = __define,c=SceneCamera,p=c.prototype;
        p.resetCamera = function () {
            ls.GameUILayer.renderContainer.x = ls.GameUILayer.renderContainer.y = 0;
            this.oldSceneX = this.oldSceneY = 0;
            this.newSceneX = this.newSceneY = 0;
        };
        p.lookAtPoint = function (pos) {
            if (this.pos != pos) {
                this.pos = pos;
                this._scrollX = this.pos.x;
                this._scrollY = this.pos.y;
                this.updateCamera = true;
            }
        };
        p.lookAtX = function (x) {
            if (this._scrollX != x) {
                this.updateCamera = true;
                this._scrollX = x;
            }
        };
        p.lookAtY = function (y) {
            if (this._scrollY != y) {
                this.updateCamera = true;
                this._scrollY = y;
            }
        };
        p.lookAtChar = function (target) {
            this.lookAtTarget = target;
            if (this._scrollX != this.lookAtTarget.x || this._scrollY != this.lookAtTarget.y) {
                this.updateCamera = true;
                this._scrollX = this.lookAtTarget.x;
                this._scrollY = this.lookAtTarget.y;
            }
        };
        p.render = function () {
            if (!this.updateCamera)
                return;
            this.updateCamera = false;
            var sceneWidth = ls.LayoutDecoder.sceneWidth;
            var sceneHeight = ls.LayoutDecoder.sceneHeight;
            var stageWidth = ls.GameUILayer.stage.stageWidth;
            var stageHeight = ls.GameUILayer.stage.stageHeight;
            var objects = ls.World.getInstance().objectList;
            //新的坐标
            if (this._scrollX > stageWidth / 2 && this._scrollX < sceneWidth - stageWidth / 2) {
                this.newSceneX = stageWidth / 2 - this._scrollX;
            }
            else if (this._scrollX <= ls.GameUILayer.stage.stageWidth / 2)
                this.newSceneX = 0;
            else if (this._scrollX > sceneWidth - stageWidth / 2)
                this.newSceneX = stageWidth - sceneWidth;
            //垂直方向坐标更新
            if (this._scrollY > stageHeight / 2 && this._scrollY < sceneHeight - stageHeight / 2) {
                this.newSceneY = stageHeight / 2 - this._scrollY;
            }
            else if (this._scrollY <= stageHeight / 2)
                this.newSceneY = 0;
            else if (this._scrollY > sceneHeight - stageHeight / 2)
                this.newSceneY = stageHeight - sceneHeight;
            // var nums: number = GameUILayer.renderContainer.numChildren;
            // for (var i: number = 0; i < nums; i++){
            //     var childContainer: egret.Sprite = <egret.Sprite>GameUILayer.renderContainer.getChildAt(i);
            //     if (!isNaN(this.oldSceneX) && !isNaN(this.oldSceneY)) {
            //         //增量
            //         childContainer.x += -((this.newSceneX - this.oldSceneX) * (100 - childContainer["parallaxX"]) / 100);
            //         childContainer.y += -((this.newSceneY - this.oldSceneY) * (100 - childContainer["parallaxY"]) / 100);
            //     }
            // }
            for (var i = 0; i < objects.length; i++) {
                var instance = objects[i];
                if (!instance.isHasCamera) {
                    if (!isNaN(this.oldSceneX) && !isNaN(this.oldSceneY)) {
                        //增量
                        instance.x += -((this.newSceneX - this.oldSceneX) * (100 - instance.parallaxX) / 100);
                        instance.y += -((this.newSceneY - this.oldSceneY) * (100 - instance.parallaxY) / 100);
                    }
                }
            }
            this._oldSceneX_ = this.oldSceneX;
            this._oldSceneY_ = this.oldSceneY;
            this.oldSceneX = this.newSceneX;
            this.oldSceneY = this.newSceneY;
        };
        p.renderContainer = function () {
            var sceneContainer = ls.GameUILayer.renderContainer;
            if (!isNaN(this._oldSceneX_) && !isNaN(this._oldSceneY_)) {
                sceneContainer.x += (this.newSceneX - this._oldSceneX_);
                sceneContainer.y += (this.newSceneY - this._oldSceneY_);
            }
        };
        return SceneCamera;
    }());
    ls.SceneCamera = SceneCamera;
    egret.registerClass(SceneCamera,'ls.SceneCamera');
})(ls || (ls = {}));
//# sourceMappingURL=SceneCamera.js.map