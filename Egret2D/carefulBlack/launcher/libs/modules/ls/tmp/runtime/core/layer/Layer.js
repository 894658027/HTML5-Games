var ls;
(function (ls) {
    var LayerManager = (function () {
        function LayerManager() {
        }
        var d = __define,c=LayerManager,p=c.prototype;
        LayerManager.getLayerByIndex = function (target, index) {
            var layer = this.layers[index];
            if (layer == null) {
                layer = new egret.Sprite();
                layer["layerIndex"] = index;
                this.layers.push(layer);
                //排序
                this.layers.sort(function (x, y) {
                    if (x.layerIndex > y.layerIndex)
                        return 1;
                    else if (x.layerIndex < y.layerIndex)
                        return -1;
                    else
                        return 0;
                });
                //背景颜色
                var layerVo = ls.LayoutDecoder.layers[index];
                layer.scaleX = layerVo.layerScaleX / 100;
                layer.scaleY = layerVo.layerScaleY / 100;
                layer.alpha = layerVo.layerAlpha;
                layer.visible = layerVo.layerVisible;
                for (var i = 0, layerlen = this.layers.length; i < layerlen; i++) {
                    layer = this.layers[i];
                    ls.GameUILayer.renderContainer.addChild(layer);
                }
            }
            return layer;
        };
        LayerManager.getIndexByLayer = function ($layer) {
            if ($layer)
                return this.layers.indexOf($layer);
            return -1;
        };
        LayerManager.getLayer = function ($index) {
            for (var i = 0; i < this.layers.length; i++) {
                var s = this.layers[i];
                if (s["layerIndex"] == $index) {
                    return s;
                }
            }
            return null;
        };
        LayerManager.layers = [];
        return LayerManager;
    }());
    ls.LayerManager = LayerManager;
    egret.registerClass(LayerManager,'ls.LayerManager');
})(ls || (ls = {}));
//# sourceMappingURL=Layer.js.map