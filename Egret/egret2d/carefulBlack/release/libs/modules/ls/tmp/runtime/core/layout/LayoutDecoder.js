var ls;
(function (ls) {
    var Layout = (function () {
        function Layout() {
        }
        var d = __define,c=Layout,p=c.prototype;
        return Layout;
    }());
    ls.Layout = Layout;
    egret.registerClass(Layout,'ls.Layout');
    var LayoutDecoder = (function () {
        function LayoutDecoder() {
        }
        var d = __define,c=LayoutDecoder,p=c.prototype;
        LayoutDecoder.getTexture = function (name) {
            for (var resName in this.spriteSheets) {
                var spriteSheet = this.spriteSheets[resName];
                var texture = spriteSheet.getTexture(name);
                if (texture != undefined) {
                    return texture;
                }
            }
            return null;
        };
        LayoutDecoder.saveLayout = function (layoutName) {
            var layout = ls.Config.sceneInfo.layoutData;
            var layoutVo = new Layout();
            layoutVo.layoutName = layoutName;
            layoutVo.nextLayoutName = layout["$next"];
            layoutVo.prevLayoutName = layout["$previous"];
            layoutVo.eventSheetName = layout["$eventSheet"];
            var version = layout["$version"];
            layoutVo.version = version ? version : "1.1.1";
            this.layouts[layoutName] = layoutVo;
        };
        LayoutDecoder.start = function (layoutName) {
            ls.assert(layoutName == null || layoutName == "", "layout canot null!");
            var layout = ls.Config.sceneInfo.layoutData;
            ls.assert(layout == null, "can not find" + layoutName);
            var sceneSize = layout["$sceneSize"].split(",");
            this.sceneWidth = +(sceneSize[0]);
            this.sceneHeight = +(sceneSize[1]);
            this.currentLayoutName = layoutName;
            this.saveLayout(layoutName);
            var layoutDataList = layout.children;
            if (layoutDataList) {
                //初始化场景实例
                var sorts = [];
                for (var i = 0, itemlen = layoutDataList.length; i < itemlen; i++) {
                    var data = layoutDataList[i];
                    if (data.localName != "layer") {
                        var instance = this.decodeInstance(data);
                        if (instance && instance["index"] !== undefined) {
                            instance.index = data["$index"] ? (+data["$index"]) : i;
                            sorts.push(instance);
                        }
                    }
                    else {
                        if (this.layers[+data["$index"]] == null) {
                            var layerVo = this.decodeLayers(data);
                            this.layers[layerVo.index] = layerVo;
                        }
                    }
                }
                sorts = sorts.concat(LayoutDecoder.globalInstances);
                sorts.sort(function (a, b) {
                    if (a.index > b.index)
                        return 1;
                    else if (a.index < b.index)
                        return -1;
                    else
                        return 0;
                });
                for (var i = 0; i < sorts.length; i++) {
                    var instance = sorts[i];
                    ls.World.getInstance().addChild(instance);
                }
            }
            //为了在事件表中可以直接引用，必须先实体化非场景实例
            if (ls.internalData) {
                for (var i = 0; i < ls.internalData.length; i++) {
                    var _name = ls.internalData[i].name;
                    ls.getInstanceByPluginClassName(_name, true);
                }
            }
            //注册模板实例，这样，就可以根据实例名来引用实例了
            for (var uid in this.curSceneInstances) {
                ls.registerObject(this.curSceneInstances[uid].name, this.curSceneInstances[uid]);
            }
        };
        LayoutDecoder.decodeInstances = function (datas) {
            var instances = [];
            if (datas) {
                var children = datas.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var item = children[i];
                        if (item.localName == "layer") {
                            if (this.layers[+item["$index"]] == null) {
                                var layerVo = this.decodeLayers(item);
                                this.layers[layerVo.index] = layerVo;
                            }
                        }
                        else {
                            var instance = this.decodeInstance(item);
                            if (instance && instance["index"] !== undefined)
                                instance.index = +item["$index"];
                            if (instance)
                                instances.push(instance);
                        }
                    }
                }
            }
            return instances;
        };
        //解析图层数据        
        LayoutDecoder.decodeLayers = function (data) {
            var layerVo = new ls.LayerVo();
            layerVo.index = +data["$index"];
            layerVo.parallaxX = +data["$parallaxX"];
            layerVo.parallaxY = +data["$parallaxY"];
            layerVo.layerAlpha = +data["$layerAlpha"];
            layerVo.layerVisible = data["$index"] != "false";
            layerVo.layerScaleX = +data["$layerScaleX"];
            layerVo.layerScaleY = +data["$layerScaleY"];
            return layerVo;
        };
        //解析实例列表
        LayoutDecoder.decodeInstance = function (data) {
            if (data.localName == "spritesheets")
                return;
            var UID = +data["$UID"];
            var plugin = data["$plugin"];
            var instanceName = data["$name"];
            var isVisual = data["$isVisual"] == "true";
            //为了兼容性，这里过滤掉单例
            if (ls.isInternal(instanceName))
                return null;
            //判断当前是否存在这个实例
            var instance = this.curSceneInstances[UID];
            if (instance == undefined) {
                instance = ls.getInstanceByPluginClassName(plugin);
            }
            else {
                return instance;
            }
            instance.isModel = true;
            instance.name = instanceName;
            instance.id = UID;
            instance.parallaxX = +data["$parallaxX"];
            instance.parallaxY = +data["$parallaxY"];
            if (data.children == null)
                return;
            if (this.instanceNames[instanceName] == null)
                this.instanceNames[instanceName] = instanceName;
            var isHasLayer = false;
            //临时存储属性列表
            var properties = {};
            //解析属性
            var behaviorPropertyItem;
            for (var j = 0, propertylen = data.children.length; j < propertylen; j++) {
                var propertyItem = data.children[j];
                var propertyName = propertyItem["$name"];
                var propertyValue = propertyItem["$value"];
                var propertyValueType = propertyItem["$valueDataType"];
                switch (propertyName) {
                    case "layer":
                        isHasLayer = true;
                        instance[propertyName] = +propertyValue;
                        break;
                    case "actions":
                        instance["setData"](propertyItem.children);
                        break;
                    case "behaviors":
                        behaviorPropertyItem = propertyItem;
                        break;
                    default:
                        switch (propertyValueType) {
                            case "number":
                                properties[propertyName] = +propertyValue;
                                break;
                            case "string":
                                properties[propertyName] = decodeURIComponent(propertyValue);
                                //解析碰撞数据
                                if (propertyName == "collisionData") {
                                    instance.collisionVectorData = this.decodeCollision(instance, properties[propertyName]);
                                    instance.collisionSourceVectorData = this.decodeCollision(instance, decodeURIComponent(propertyItem["$sourceValue"]));
                                }
                                break;
                            case "boolean":
                                properties[propertyName] = (propertyValue == "true");
                                break;
                            case "any":
                                properties[propertyName] = ls.eval_e(decodeURIComponent(propertyValue));
                                break;
                        }
                        break;
                }
            }
            if (properties.hasOwnProperty("width"))
                instance["width"] = properties["width"];
            if (properties.hasOwnProperty("height"))
                instance["height"] = properties["height"];
            for (var prop in properties) {
                instance[prop] = properties[prop];
            }
            if (behaviorPropertyItem) {
            }
            //这里假定不设置layer属性，那么，这里默认设置其图层为1
            if (!isHasLayer)
                instance["layer"] = 0;
            //所有的扩展组件进行初始化
            if (instance)
                instance.initialize();
            if (this.curSceneInstances[UID] == null)
                this.curSceneInstances[UID] = instance;
            return instance;
        };
        //解析碰撞数据
        LayoutDecoder.decodeCollision = function (inst, data) {
            var bindData;
            if (inst && data) {
                if (data == "")
                    inst.collisionType - 1;
                else {
                    var spData = data.split('/n');
                    if (spData.length == 2) {
                        inst.collisionType = +spData[0];
                        switch (inst.collisionType) {
                            case 0:
                                //先分隔下划线
                                //检测是否存在下划线
                                bindData = [];
                                var isExistUnderline = spData[1].indexOf("_");
                                if (isExistUnderline != -1) {
                                    var underlineSplit = spData[1].split('_');
                                    for (var i = 0; i < underlineSplit.length; i++) {
                                        var undrelineItem = underlineSplit[i];
                                        var vdSplit = undrelineItem.split(',');
                                        var polyData = [];
                                        for (var j = 0; j < vdSplit.length; j++) {
                                            var pointSplit = vdSplit[j].split('|');
                                            var v = new ls.Vector2D(+pointSplit[0], +pointSplit[1]);
                                            polyData[j] = v;
                                        }
                                        bindData[i] = polyData;
                                    }
                                }
                                else {
                                    var vdSplit = spData[1].split(',');
                                    var polyData = [];
                                    for (var i = 0; i < vdSplit.length; i++) {
                                        var pointSplit = vdSplit[i].split('|');
                                        var v = new ls.Vector2D(+pointSplit[0], +pointSplit[1]);
                                        polyData[i] = v;
                                    }
                                    bindData[0] = polyData;
                                }
                                break;
                            case 1:
                                var circleData = spData[1].split("|"); //x,y,r;
                                var circle = new ls.Circle();
                                circle.center = new ls.Vector2D(+circleData[0], +circleData[1]);
                                circle.radius = +circleData[2];
                                bindData = circle;
                                break;
                            case 2:
                                var dotData = spData[1].split("|"); //x，y;
                                bindData = new ls.Vector2D(+dotData[0], +dotData[1]);
                                break;
                        }
                    }
                }
            }
            return bindData;
        };
        //解析行为列表
        LayoutDecoder.decodeBehaviors = function (instance, datas) {
            if (instance && datas) {
                // if (!instance.global)
                //     return;
                var children = datas.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var data = children[i];
                        //注意完全限定类名中都要加Behavior扩展关键字以便好识别
                        var _behaivorType = data["$behaviorType"];
                        var _behaivor = ls.getInstanceByPluginClassName(_behaivorType);
                        _behaivor.name = data["$name"];
                        //行为数据
                        var _behaivorDatas = data.children;
                        if (_behaivorDatas) {
                            var _behaivorDatalen = _behaivorDatas.length;
                            for (var k = 0; k < _behaivorDatalen; k++) {
                                var _propertyItem = _behaivorDatas[k];
                                var _propertyName = _propertyItem["$name"];
                                var _propertyValue = decodeURIComponent(_propertyItem["$value"]);
                                var _propertyValueType = _propertyItem["$valueDataType"];
                                switch (_propertyValueType) {
                                    case "number":
                                        _behaivor[_propertyName] = +_propertyValue;
                                        break;
                                    case "string":
                                        _behaivor[_propertyName] = _propertyValue + "";
                                        break;
                                    case "any":
                                        _behaivor[_propertyName] = _propertyValue;
                                        break;
                                    case "boolean":
                                        _behaivor[_propertyName] = Boolean(ls.eval_e(_propertyValue));
                                        break;
                                }
                            }
                        }
                        if (instance instanceof ls.AIDisplayObject)
                            instance.addBehavior(_behaivor);
                        else
                            ls.assert(true, instance + "must instance of AIDisplayObject for have Behaviors");
                        //添加行为列表
                        _behaivor.onCreate();
                        _behaivor.isCreated = true;
                    }
                }
            }
        };
        /**
         * 销毁实例
         */
        LayoutDecoder.destory = function () {
            //this.curSceneInstances      = {};
            //非全局变量都删除
            for (var UID in this.curSceneInstances) {
                var instance = this.curSceneInstances[UID];
                if (!instance.global) {
                    if (instance instanceof ls.AIDisplayObject)
                        instance.removeAllBehaviors();
                    delete this.curSceneInstances[UID];
                }
            }
            this.instanceNames = {};
            this.layers = {};
        };
        LayoutDecoder.curSceneInstances = {};
        LayoutDecoder.instanceNames = {}; //根据名字存储对象
        LayoutDecoder.layouts = {};
        LayoutDecoder.spriteSheets = {};
        LayoutDecoder.spriteSheetDatas = {};
        LayoutDecoder.globalInstances = []; //全局实例
        LayoutDecoder.layers = {}; //图层数据
        return LayoutDecoder;
    }());
    ls.LayoutDecoder = LayoutDecoder;
    egret.registerClass(LayoutDecoder,'ls.LayoutDecoder');
})(ls || (ls = {}));
//# sourceMappingURL=LayoutDecoder.js.map