var ls;
(function (ls) {
    var World = (function () {
        function World() {
            this._objectList = [];
            this._collisionObjectList = [];
            this._objectHash = {};
            this._updateCamera = true;
            this._childCaches = {};
            if (World._instance)
                throw new Error(this["constructor"] + "为单例！");
            World._instance = this;
            this._sceneCamera = new ls.SceneCamera(this);
        }
        var d = __define,c=World,p=c.prototype;
        World.getInstance = function () {
            if (this._instance == null)
                this._instance = new World();
            return this._instance;
        };
        d(p, "sceneCamera"
            ,function () {
                return this._sceneCamera;
            }
        );
        d(p, "collisionObjectList"
            ,function () {
                return this._collisionObjectList;
            }
        );
        d(p, "objectList"
            /**获取世界中的AI对象列*/
            ,function () {
                return this._objectList;
            }
        );
        d(p, "objectHash"
            /**获取世界中的AI Hash结构列表*/
            ,function () {
                return this._objectHash;
            }
        );
        //锁定到目标
        p.scrollToTarget = function (inst) {
            this._sceneCamera.lookAtChar(inst);
        };
        p.scrollToXY = function (x, y) {
            this._sceneCamera.lookAtPoint(new egret.Point(x, y));
        };
        p.scrollToX = function (x) {
            this._sceneCamera.lookAtX(x);
        };
        p.scrollToY = function (y) {
            this._sceneCamera.lookAtY(y);
        };
        //这里移动的不是整个sceneContainer,而是遍历的对象
        p.render = function () {
            var stageWidth = ls.GameUILayer.stage.stageWidth;
            var stageHeight = ls.GameUILayer.stage.stageHeight;
            var sortChilds = [];
            for (var layer in this._childCaches) {
                var childData = this._childCaches[layer];
                sortChilds.push(childData);
            }
            sortChilds.sort(function (a, b) {
                if (a.layer > b.layer)
                    return 1;
                else if (a.layer < b.layer)
                    return -1;
                return 0;
            });
            for (var j = 0; j < sortChilds.length; j++) {
                var childData = sortChilds[j];
                var children = childData.instances;
                var layerContainer = childData.parent;
                //
                for (var i = 0; i < children.length; i++) {
                    var _child = children[i];
                    var gpos = new egret.Point(ls.GameUILayer.renderContainer.x + layerContainer.x + _child.x, ls.GameUILayer.renderContainer.y + layerContainer.y + _child.y);
                    var isOnScreen = ls.CollisionUtils.isCollsionWithRect(gpos.x - _child.anchorOffsetX, gpos.y - _child.anchorOffsetY, _child.width, _child.height, 0, 0, ls.GameUILayer.stage.stageWidth, ls.GameUILayer.stage.stageHeight);
                    var _container = _child.container;
                    if (isOnScreen) {
                        layerContainer.addChild(_container);
                    }
                    else {
                        if (_container.parent) {
                            _container.parent.removeChild(_container);
                        }
                    }
                }
            }
        };
        /**根据唯一id查找对象*/
        p.getChildByUID = function ($uid) {
            if ($uid === void 0) { $uid = 0; }
            for (var i = 0, len = this._objectList.length; i < len; i++) {
                var object = this._objectList[i];
                if (object.id == $uid)
                    return object;
            }
            return null;
        };
        /**根据名字查找AiObject对象列表，一般情况下，多个名称列表都是表示关联复制生成的，而不是直接创建生成的*/
        p.getChildByName = function ($name) {
            var findAiObjects = [];
            if ($name == null || $name == "")
                return findAiObjects;
            for (var i = 0, len = this._objectList.length; i < len; i++) {
                var object = this._objectList[i];
                if (object.name == $name)
                    findAiObjects.push(object);
            }
            return findAiObjects;
        };
        p.addChild = function ($child, $parent) {
            if ($parent === void 0) { $parent = null; }
            if ($child) {
                this._objectList.push($child);
                var container = $child["container"];
                var layer = $child.layer;
                //这里维护层级结构
                var layerContainer = ls.LayerManager.getLayerByIndex($child, layer);
                //添加到显示列表
                if (container && container.parent == null) {
                    if (this._childCaches[layer] == null) {
                        this._childCaches[layer] = { instances: [], parent: layerContainer, layer: layer };
                    }
                    this._childCaches[layer].instances.push($child);
                }
                layerContainer["parallaxX"] = $child.parallaxX;
                layerContainer["parallaxX"] = $child.parallaxY;
                $child["helpParent"] = layerContainer;
                //维护一份hash数组
                var name = $child.name;
                if (!this._objectHash.hasOwnProperty(name))
                    this._objectHash[name] = [];
                this._objectHash[name].push($child);
                if ($child instanceof ls.AIDisplayObject) {
                    //碰撞检测
                    if ($child.collision) {
                        this._collisionObjectList.push($child);
                    }
                }
                //触发注册
                ls.Trigger.register($child);
            }
        };
        p.removeChild = function ($child) {
            if ($child) {
                var _index = this.objectList.indexOf($child);
                if (_index != -1) {
                    this._objectList.splice(_index, 1);
                }
                var container = $child["container"];
                if (container && container.parent != null)
                    container.parent.removeChild(container);
                //删除对象hash
                if (this._objectHash.hasOwnProperty(name)) {
                    var list = this._objectHash[name];
                    var searchIndex = list.indexOf($child);
                    if (searchIndex != -1)
                        list.splice(searchIndex, 1);
                }
                if ($child instanceof ls.AIDisplayObject) {
                    //碰撞检测
                    var _collisionIndex = this._collisionObjectList.indexOf($child);
                    if (_collisionIndex != -1)
                        this._collisionObjectList.splice(_collisionIndex, 1);
                }
                var dio = $child;
                if (dio) {
                    if (this._childCaches[dio.layer]) {
                        var layerInstances = this._childCaches[dio.layer].instances;
                        if (layerInstances) {
                            var layerIndex = layerInstances.indexOf(dio);
                            if (layerIndex != -1) {
                                layerInstances.splice(layerIndex, 1);
                            }
                            if (layerInstances.length == 0)
                                delete this._childCaches[dio.layer];
                        }
                    }
                }
                ls.Trigger.removeTrigger($child);
            }
        };
        //移除所有的角色(全局实例只保存实例本身，不保存其事件表中的内容)
        p.removeAllChildrens = function () {
            ls.Trigger.removeAllTriggers();
            for (var name in this._objectHash) {
                var data = this._objectHash[name];
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        var instance = data[i];
                        if (!instance.global) {
                            instance.destoryOnChangeScene();
                            delete this._objectHash[name];
                        }
                    }
                }
            }
            var newCollistionObjectList = [];
            for (var i = 0; i < this._collisionObjectList.length; i++) {
                var instance = this._collisionObjectList[i];
                if (instance.global)
                    newCollistionObjectList.push(instance);
            }
            this._collisionObjectList = newCollistionObjectList;
        };
        //destory all
        p.destory = function () {
            this._sceneCamera.lookAtPoint(new egret.Point(0, 0));
            if (World.onWorldDestory != null) {
                World.onWorldDestory();
            }
            ls.LayoutDecoder.destory();
            ls.EventSheetDecoder.destory();
            this._sceneCamera.resetCamera();
            this.removeAllChildrens();
        };
        World.renderFirst = true;
        return World;
    }());
    ls.World = World;
    egret.registerClass(World,'ls.World');
})(ls || (ls = {}));
//# sourceMappingURL=World.js.map