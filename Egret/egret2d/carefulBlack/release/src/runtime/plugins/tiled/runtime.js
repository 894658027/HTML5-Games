var ls;
(function (ls) {
    var AITiledMap = (function (_super) {
        __extends(AITiledMap, _super);
        function AITiledMap() {
            _super.call(this);
            this["tilemap"] = true;
        }
        var d = __define,c=AITiledMap,p=c.prototype;
        p.initialize = function () {
            this.url = ls.eval_e(this.url);
            this.solid = ls.eval_e(this.solid);
            if (this.url) {
                RES.getResByUrl(this.url, function (data) {
                    if (data) {
                        this.tiledMap = new tiled.TMXTilemap(ls.LayoutDecoder.sceneWidth, ls.LayoutDecoder.sceneHeight, data, this.url);
                        this.tiledMap.render();
                        this.container.addChild(this.tiledMap);
                        this.dispatchEvent(new egret.Event("tiledInitialize"));
                    }
                }, this, RES.ResourceItem.TYPE_XML);
            }
        };
        p.getCollisionRects = function () {
            var collision_rects = [];
            if (this.tiledMap) {
                var solidLayer;
                var layers = this.tiledMap.getLayers();
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    if (layer.name == this.solid) {
                        solidLayer = layer;
                        break;
                    }
                }
                if (solidLayer) {
                    var cur_rect = null;
                    var layerDatas = solidLayer.layerData;
                    if (layerDatas) {
                        //////////////////////列计算完成//////////////////////////
                        //水平方向扫描
                        for (var i = 0; i < layerDatas.length; i++) {
                            //垂直方向扫描
                            for (var j = 0; j < layerDatas[i].length; j++) {
                                var tile = layerDatas[i][j];
                                if (!(tile && tile.gid)) {
                                    if (cur_rect) {
                                        collision_rects.push(cur_rect);
                                        cur_rect = null;
                                    }
                                    continue;
                                }
                                if (!cur_rect) {
                                    if (cur_rect) {
                                        collision_rects.push(cur_rect);
                                        cur_rect = null;
                                    }
                                    cur_rect = new egret.Rectangle();
                                    cur_rect.left = i * this.tiledMap.tilewidth;
                                    cur_rect.top = j * this.tiledMap.tileheight;
                                    cur_rect.right = cur_rect.left + this.tiledMap.tilewidth;
                                    cur_rect.bottom = cur_rect.top + this.tiledMap.tileheight;
                                }
                                else {
                                    cur_rect.bottom += this.tiledMap.tileheight;
                                }
                            }
                            if (cur_rect) {
                                collision_rects.push(cur_rect);
                                cur_rect = null;
                            }
                        }
                        //合并碰撞矩形
                        var len = collision_rects.length;
                        for (var m = 0; m < len; m++) {
                            var q = collision_rects[m];
                            for (var n = m + 1; n < len; n++) {
                                var p = collision_rects[n];
                                if (p.left < q.right)
                                    continue;
                                if (p.left > q.right)
                                    break;
                                if (p.bottom > q.bottom || p.top > q.top)
                                    break;
                                if (p.top === q.top && p.bottom === q.bottom) {
                                    collision_rects.splice(n, 1);
                                    --len;
                                    q.right += this.tiledMap.tilewidth;
                                    --n;
                                }
                            }
                        }
                    }
                }
            }
            return collision_rects;
        };
        p.destory = function () {
            if (this.tiledMap && this.tiledMap.parent) {
                this.tiledMap.parent.removeChild(this.tiledMap);
                this.tiledMap.destory();
            }
            _super.prototype.destory.call(this);
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["url"] = this.url;
            o["solid"] = this.solid;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this.url = o["url"];
                this.solid = o["solid"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.url = this.url;
            cl.solid = this.solid;
            //创建显示对象
            cl.initialize();
            return cl;
        };
        //存储所用到的a星
        AITiledMap.aStars = {};
        return AITiledMap;
    }(ls.AIDisplayObject));
    ls.AITiledMap = AITiledMap;
    egret.registerClass(AITiledMap,'ls.AITiledMap');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map