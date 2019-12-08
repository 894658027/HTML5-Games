var ls;
(function (ls) {
    var AISystem = (function (_super) {
        __extends(AISystem, _super);
        function AISystem() {
            _super.call(this);
            this._heading = 0;
            this._lastUpdate = 0;
            this._lastTime = 0;
            this.SHAKE_THRESHOLD = 1000;
            this.isShakeble = true;
            this.dt1 = 0.016;
            this.dt = 0.016;
            this.minimumFramerate = 30;
            this.disableDataEvents = {};
            if (AISystem._instance != null) {
                throw new Error("AISystem 为单例！！！");
            }
            this.name = "System";
            AISystem._instance = this;
            this.onDevice();
            this.onGetGeolocation();
            this.onDeviceMotion();
            this.onDeviceVibrate();
        }
        var d = __define,c=AISystem,p=c.prototype;
        p.onDevice = function () {
            this._orientation = new egret.DeviceOrientation();
            this._orientation.addEventListener(egret.OrientationEvent.CHANGE, this.onOrientation, this);
        };
        p.onOrientation = function (event) {
            this._alpha = event.alpha;
            this._beta = event.beta;
            this._gamma = event.gamma;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDeviceOrientationChanged));
        };
        p.onGetGeolocation = function () {
            this._gps = new egret.Geolocation();
            this._gps.addEventListener(egret.GeolocationEvent.CHANGE, this.onGeolocation, this);
            this._gps.addEventListener(egret.GeolocationEvent.PERMISSION_DENIED, this.onGeolocation, this);
            this._gps.addEventListener(egret.GeolocationEvent.UNAVAILABLE, this.onGeolocation, this);
        };
        p.onGeolocation = function (event) {
            switch (event.type) {
                case egret.GeolocationEvent.CHANGE:
                    this._latitude = event.latitude;
                    this._longitude = event.longitude;
                    this._altitude = event.altitude;
                    this._speed = event.speed;
                    this._heading = event.heading;
                    this._accuracy = event.accuracy;
                    this._altitudeAccuracy = event.altitudeAccuracy;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDevicePostionChanged));
                    break;
                case egret.GeolocationEvent.PERMISSION_DENIED:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onGeolocationPermissionDenied));
                    break;
                default:
                    this._geolocationErrorMessage = event.errorMessage;
                    this._geolocationErrorType = event.errorType;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onGeolocationFail));
                    break;
            }
        };
        p.onDeviceMotion = function () {
            if (window['DeviceMotionEvent'])
                window.addEventListener('devicemotion', this.ondeviceMotionHandler, false);
        };
        p.ondeviceMotionHandler = function (eventData) {
            var self = AISystem.instance;
            self._curTime = egret.getTimer();
            var diffTime = self._curTime - self._lastUpdate;
            if (diffTime > 100) {
                //重力加速度
                var accleration = eventData.accelerationIncludingGravity;
                self._lastUpdate = self._curTime;
                self._x = accleration.x;
                self._y = accleration.y;
                self._z = accleration.z;
                var _movespeed = Math.abs(self._x + self._y + self._z - self._lastX - self._lastY - self._lastZ) / diffTime * 10000;
                if (_movespeed > self.SHAKE_THRESHOLD && self._curTime - self._lastTime > 1100 && self.isShakeble) {
                    self._lastTime = self._curTime;
                    self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onDeviceShake));
                }
                self._lastX = self._x;
                self._lastY = self._y;
                self._lastZ = self._z;
            }
        };
        p.onDeviceVibrate = function () {
            var supportsVibrate = window.navigator["vibrate"];
        };
        d(AISystem, "instance"
            ,function () {
                if (this._instance == null)
                    this._instance = new AISystem();
                return this._instance;
            }
        );
        p.sendSceneInitComplete = function () {
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSceneInitComplete));
        };
        ////////////////////////////////////conditions///////////////////////////////////
        p.runOs = function (event) {
            var os = ls.eval_e(event.os);
            return { instances: [this], status: os == egret.Capabilities.os };
        };
        p.isMobile = function (event) {
            return { instances: [this], status: ls.eval_e(event.mobile) == egret.Capabilities.isMobile };
        };
        p.onRunTimeType = function (event) {
            return { instances: [this], status: ls.eval_e(event.runtimeType) == egret.Capabilities.runtimeType };
        };
        p.runLanguageType = function (event) {
            return { instances: [this], status: ls.eval_e(event.language) == egret.Capabilities.language };
        };
        p.onGeolocationPermissionDenied = function (event) {
            return { instances: [this], status: true };
        };
        p.onGeolocationFail = function (event) {
            return { instances: [this], status: true };
        };
        p.onDeviceShake = function (event) {
            return { instances: [this], status: true };
        };
        p.onDevicePostionChanged = function (event) {
            return { instances: [this], status: true };
        };
        p.onDeviceOrientationChanged = function (event) {
            return { instances: [this], status: true };
        };
        p.onGameDataLoadComplete = function (event) {
            return { instances: [this], status: true };
        };
        p.onGameDataSaveComplete = function (event) {
            return { instances: [this], status: true };
        };
        /**每帧都执行*/
        p.everyTick = function ($eventyTickEvent) {
            return { instances: [this], status: true };
        };
        /**每多少秒执行的事件，这得改为触发条件，不然条件这块用多个会有问题*/
        p.everyXSecondEvent = function ($everyXSecondEvent) {
            $everyXSecondEvent.curTime = egret.getTimer();
            if ($everyXSecondEvent.curTime - $everyXSecondEvent.oldTime >= ls.eval_e($everyXSecondEvent.interval) * 1000) {
                $everyXSecondEvent.oldTime = $everyXSecondEvent.curTime;
                return { instances: [this], status: true };
            }
            return { instances: [this], status: false };
        };
        /**当场景初始化完成Trigger*/
        p.onSceneInitComplete = function ($event) {
            return { instances: [this], status: true };
        };
        /**当退出场景时Trigger*/
        p.onSceneEndComplete = function ($event) {
            return { instances: [this], status: true };
        };
        /**是否是某个类型TODO*/
        p.isValueType = function ($isValueType) {
            return { instances: [this], status: true };
        };
        /**判断某个对象的UID是否存在*/
        p.ObjectUIDExist = function ($objectUIDExist) {
            return { instances: [this], status: ls.LayoutDecoder.curSceneInstances[ls.eval_e($objectUIDExist.UID)] != null };
        };
        /**获取任意实例*/
        p.pickRandomInstance = function ($pickRandomInstanceEvent) {
            var objects = ls.World.getInstance().objectHash[$pickRandomInstanceEvent.object.name];
            var randomObject = objects[Math.floor(Math.random() * (objects.length))];
            return { instances: [randomObject], status: objects && objects.length > 0, selectSingle: true };
        };
        /**获取所有实例*/
        p.pickAll = function ($event) {
            var objects = ls.World.getInstance().objectHash[$event.object.name];
            return { instances: objects, status: true };
        };
        /**基于判断条件获取实例列表*/
        p.pickInstanceByCondition = function ($event) {
            var results = [];
            var objects = ls.World.getInstance().objectHash[$event.object.name];
            if (objects) {
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    window[object.name] = object;
                    var result = ls.compare($event.expression, $event.operationType, $event.value);
                    if (result)
                        results.push(object);
                }
            }
            if (results.length > 0)
                return { instances: results, status: true };
            return { instances: [this], status: false };
        };
        //基于索引获取实例
        p.pickInstanceByIndex = function ($event) {
            var objects = ls.World.getInstance().objectHash[$event.object.name];
            if (objects) {
                var index = ls.eval_e($event.index);
                if (index < objects.length - 1 && index >= 0)
                    return { instances: [objects[index]], status: true };
            }
            return { instances: [this], status: false };
        };
        //基于鼠标与对象相交来获取实例列表
        p.pickInstanceOverlapping = function ($event) {
            var objects = ls.World.getInstance().objectHash[$event.object.name];
            if (objects) {
                var results = [];
                var x = ls.eval_e($event.x);
                var y = ls.eval_e($event.y);
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    var globalRect = object.getGlobalBounds();
                    if (globalRect.contains(x, y)) {
                        results.push(object);
                    }
                }
                if (results.length > 0) {
                    return { instances: results, status: true };
                }
            }
            return { instances: [this], status: false };
        };
        p.execFor = function (event) {
            return { instances: [this], status: true, data: event };
        };
        p.execForEachSort = function (event) {
            return { instances: [this], status: true, data: event };
        };
        /**比较变量值*/
        p.compareVariable = function ($event) {
            return { instances: [this], status: ls.compare(AISystem.instance[$event.variable], $event.operationType, $event.value) };
        };
        p.onLayerIsExist = function (event) {
            return { instances: [this], status: ls.LayerManager.getLayer(ls.eval_e(event.layer)) != null };
        };
        p.onLayerIsVisible = function (event) {
            var layerContainer = ls.LayerManager.getLayer(ls.eval_e(event.layer));
            if (layerContainer)
                return { instances: [this], status: layerContainer.visible == ls.eval_e(event.isVisible == 1) };
            return { instances: [this], status: false };
        };
        ////////////////////////////////////actions///////////////////////////////////
        /** 创建对象 */
        p.createObject = function ($object, $layer, $x, $y) {
            var layer = ls.eval_e($layer);
            var x = ls.eval_e($x);
            var y = ls.eval_e($y);
            ls.assert(typeof layer !== "number" || typeof x !== "number" || typeof y !== "number", "AISystem createObject parameter type incorrect!!");
            var clone = $object.clone();
            clone.layer = layer;
            clone.x = Math.round(x);
            clone.y = Math.round(y);
            ls.lakeshoreInst()[clone.name] = clone;
            ls.World.getInstance().addChild(clone);
            return [clone];
        };
        /**切换场景 */
        p.gotoScene = function ($layoutName) {
            //发送场景初始化完成事件
            egret.callLater(function () {
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSceneEndComplete));
                ls.World.getInstance().destory();
                $layoutName = $layoutName;
                ls.StartUp.onConfigLoad($layoutName);
            }, this);
        };
        //激活事件列表，用于优化大量的事件会一直存在时导致的性能消耗过高的问题
        p.disableEvents = function ($type, eventIDs) {
            var type = ls.eval_e($type);
            var eventIDs_ = eventIDs + "";
            var eventDataIDs;
            if (eventIDs_.length == 0)
                return;
            else if (eventIDs_.length == 1)
                eventDataIDs = [eventIDs_];
            else
                eventDataIDs = eventIDs_.split(",");
            for (var i = 0; i < eventDataIDs.length; i++) {
                var ids = +eventDataIDs[i];
                if (type == 1) {
                    delete this.disableDataEvents[ids]; //激活
                }
                else {
                    this.disableDataEvents[ids] = ids; //禁用
                }
            }
        };
        //显示加载logo
        p.showLoadingLogo = function (time) {
            var time = ls.eval_e(time);
            ls.GameUILayer.stage.addChild(ls.GameUILayer.preContainer);
            ls.GameUILayer.preContainer.alpha = 1;
            var tw = egret.Tween.get(ls.GameUILayer.preContainer);
            tw.wait(time * 1000 - 250);
            tw.to({ "alpha": 0 }, 250);
            setTimeout(function () {
                ls.GameUILayer.stage.removeChild(ls.GameUILayer.preContainer);
            }, time * 1000);
        };
        /** 暂停或者继续播放场景 */
        p.onScenePauseOrPlay = function (type) {
            var type = ls.eval_e(type);
            ls.EventSheetDecoder.execScenePauseOrPlay(type);
        };
        p.log = function (args) {
            ls.log(args);
        };
        p.addTo = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject addTo parameter type incorrect!!");
            AISystem.instance[$instanceVariables] += value;
        };
        p.setBoolean = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject setBoolean parameter type incorrect!!");
            AISystem.instance[$instanceVariables] = (value == 1);
        };
        p.setValue = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            AISystem.instance[$instanceVariables] = value;
        };
        p.subtractFrom = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject subtractFrom parameter type incorrect!!");
            AISystem.instance[$instanceVariables] -= value;
        };
        p.toogleBoolean = function ($instanceVariables) {
            this[$instanceVariables] = !this[$instanceVariables];
        };
        //停止循环
        p.stopLoop = function () {
        };
        p.load = function ($url) {
        };
        //resatart scene ,that all data is reset
        p.restartScene = function () {
            ls.assert(ls.LayoutDecoder.currentLayoutName == null, "current layout name is null!");
            this.gotoScene(ls.LayoutDecoder.currentLayoutName);
        };
        p.resetGlobalVariables = function () {
        };
        p.scrollToObject = function ($object) {
            var firstObject = $object.getFirstPicked();
            if (firstObject) {
                ls.World.getInstance().sceneCamera.lookAtChar(firstObject);
            }
        };
        p.scrollToPos = function ($x, $y) {
            var x = ls.eval_e($x);
            var y = ls.eval_e($y);
            ls.World.getInstance().sceneCamera.lookAtPoint(new egret.Point(x, y));
        };
        p.scrollToXPos = function ($x) {
            var x = ls.eval_e($x);
            ls.World.getInstance().sceneCamera.lookAtX(x);
        };
        p.scrollToYPos = function ($y) {
            var y = ls.eval_e($y);
            ls.World.getInstance().sceneCamera.lookAtY(y);
        };
        ///////////////////////////////////////// 图层 ///////////////////////////////////////////////////////
        p.setLayerAngle = function (layer, angle) {
            var layer = ls.eval_e(layer);
            var angle = ls.eval_e(angle);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer)
                layerContainer.rotation = angle;
        };
        p.setLayerBgColor = function (layer, bgColor) {
            var layer = ls.eval_e(layer);
            var bgColor = ls.eval_e(bgColor);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer) {
                //
                var nums = layerContainer.numChildren;
                if (nums > 0) {
                    var minX = Number.MAX_VALUE;
                    var minY = Number.MAX_VALUE;
                    for (var i = 0; i < nums; i++) {
                        var s = layerContainer.getChildAt(i);
                        if (s.x - s.anchorOffsetX < minX)
                            minX = s.x - s.anchorOffsetX;
                        if (s.y - s.anchorOffsetY < minY)
                            minY = s.y - s.anchorOffsetY;
                    }
                }
                layerContainer.graphics.clear();
                layerContainer.graphics.beginFill(bgColor);
                layerContainer.graphics.drawRect(minX, minY, layerContainer.width, layerContainer.height);
                layerContainer.graphics.endFill();
            }
        };
        p.setLayerAlpha = function (layer, alpha) {
            var layer = ls.eval_e(layer);
            var alpha = ls.eval_e(alpha);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer)
                layerContainer.alpha = alpha;
        };
        p.setLayerParallax = function (layer, parallaxX, parallaxY) {
            var layer = ls.eval_e(layer);
            var parallaxX = ls.eval_e(parallaxX);
            var parallaxY = ls.eval_e(parallaxY);
            var objects = ls.World.getInstance().objectList;
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                if (object.index == layer) {
                    object.parallaxX = parallaxX;
                    object.parallaxY = parallaxY;
                }
            }
        };
        p.setLayerScale = function (layer, scaleX, scaleY) {
            var layer = ls.eval_e(layer);
            var scaleX = ls.eval_e(scaleX);
            var scaleY = ls.eval_e(scaleY);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer) {
                layerContainer.scaleX = scaleX / 100;
                layerContainer.scaleY = scaleY / 100;
            }
        };
        p.setLayerVisible = function (layer, visible) {
            var layer = ls.eval_e(layer);
            var visible = ls.eval_e(visible);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer) {
                layerContainer.visible = (visible == 1);
            }
        };
        p.setObjectTimeScale = function (object, timeScale) {
            if (!object)
                return;
            timeScale = ls.eval_e(timeScale);
            if (timeScale < 0)
                timeScale = 0;
            var objects = ls.World.getInstance().objectHash[object.name];
            for (var i = 0; i < objects.length; i++) {
                objects[i].timeScale = timeScale;
            }
        };
        p.setTimeScale = function (timeScale) {
            this._timeScale = ls.eval_e(timeScale);
            if (this._timeScale < 0)
                this._timeScale = 0;
        };
        p.startDeviceOrientation = function (status) {
            var s = ls.eval_e(status);
            if (this._orientation) {
                if (s == 0)
                    this._orientation.stop();
                else
                    this._orientation.start();
            }
        };
        p.startDeviceGeolocation = function (status) {
            var s = ls.eval_e(status);
            if (this._gps) {
                if (s == 0)
                    this._gps.stop();
                else
                    this._gps.start(); //开始监听设备位置信息
            }
        };
        p.onLoadComplete = function () {
        };
        //获取数据        
        p.loadStorageFromJSON = function (key) {
            if (typeof localStorage === "undefined") {
                ls.assert(true, "当前浏览器不支持本地存储");
                return;
            }
            //检测键值为key是否有数据
            var key = ls.eval_e(key);
            var getData = localStorage.getItem(key);
            var getDataObject = JSON.parse(getData);
            var objects = ls.World.getInstance().objectList;
            //遍历一下当前保存的对象
            for (var uid in getDataObject) {
                var instanceInfo = getDataObject[uid];
                var existInstance = null;
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    if (object.u_id == parseFloat(uid)) {
                        existInstance = object;
                        break;
                    }
                }
                if (existInstance) {
                    existInstance.loadFromJSON(instanceInfo);
                }
                else {
                    //不存在，就创建对象
                    if (instanceInfo.plugin) {
                        var pluginName = instanceInfo.plugin.slice(3);
                        var newInstance = ls.getInstanceByPluginClassName(pluginName);
                        //应用行为
                        newInstance.loadFromJSON(instanceInfo);
                        newInstance.initialize();
                        ls.World.getInstance().addChild(newInstance);
                    }
                }
            }
            console.log("数据更新！！");
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onGameDataLoadComplete, key));
        };
        //数据保存
        p.saveStorageToJSON = function (key) {
            if (typeof localStorage === "undefined") {
                ls.assert(true, "当前浏览器不支持本地存储");
                return;
            }
            //检测键值为key是否有数据
            var key = ls.eval_e(key);
            var getData = localStorage.getItem(key);
            var dataObject = getData ? JSON.parse(getData) : {};
            var objects = ls.World.getInstance().objectList;
            if (objects) {
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    dataObject[object.u_id] = object.saveToJSON();
                }
            }
            var resultStr = JSON.stringify(dataObject);
            localStorage.setItem(key, resultStr);
            console.log(resultStr);
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onGameDataSaveComplete, key));
        };
        /**销毁*/
        p.destory = function () {
        };
        d(p, "alpha"
            ////////////////////////////////////expressions///////////////////////////////////
            /**表示设备绕 Z 轴的角度，单位是 角度 范围是 0 到 360 */
            ,function () {
                return this._alpha;
            }
        );
        d(p, "beta"
            /**表示设备绕 X 轴的角度，单位是 角度 范围是 -180 到 180.这个值表示设备从前向后的旋转状态 */
            ,function () {
                return this._beta;
            }
        );
        d(p, "gamma"
            /**表示设备绕 Y 轴的角度，单位是 角度 范围是 -90 到 90.这个值表示设备从左到右的旋转状态 */
            ,function () {
                return this._gamma;
            }
        );
        d(p, "latitude"
            /**表示设备所在的纬度信息 */
            ,function () {
                return this._latitude;
            }
        );
        d(p, "longitude"
            /**表示设备所在的经度信息 */
            ,function () {
                return this._longitude;
            }
        );
        d(p, "altitude"
            /**表示设备所在的海拔信息 */
            ,function () {
                return this._altitude;
            }
        );
        d(p, "speed"
            /**表示设备所在的速度信息 */
            ,function () {
                return this._speed;
            }
        );
        d(p, "heading"
            /**表示设备正在前进的方向，单位是度。heading 表示从正北开始顺时针旋转到当前方向的角度，
             *比如正东是 90 度，正西是 270 度，如果 speed 是 0，heading 为 NaN。 */
            ,function () {
                return this._heading;
            }
        );
        d(p, "accuracy"
            /**经纬度的准确性，单位是米 */
            ,function () {
                return this._accuracy;
            }
        );
        d(p, "altitudeAccuracy"
            /**该位置海拔信息的准确性，单位是米，这个值有可能为 null*/
            ,function () {
                return this._altitudeAccuracy;
            }
        );
        d(p, "geolocationErrorMessage"
            /** 获取位置信息错误的错误信息*/
            ,function () {
                return this._geolocationErrorMessage;
            }
        );
        d(p, "geolocationErrorType"
            /* 获取位置信息错误的错误类型*/
            ,function () {
                return this._geolocationErrorType;
            }
        );
        return AISystem;
    }(ls.AIObject));
    ls.AISystem = AISystem;
    egret.registerClass(AISystem,'ls.AISystem');
    var RunOsEvent = (function (_super) {
        __extends(RunOsEvent, _super);
        function RunOsEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=RunOsEvent,p=c.prototype;
        return RunOsEvent;
    }(ls.BaseEvent));
    ls.RunOsEvent = RunOsEvent;
    egret.registerClass(RunOsEvent,'ls.RunOsEvent');
    var IsMobileEvent = (function (_super) {
        __extends(IsMobileEvent, _super);
        function IsMobileEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsMobileEvent,p=c.prototype;
        return IsMobileEvent;
    }(ls.BaseEvent));
    ls.IsMobileEvent = IsMobileEvent;
    egret.registerClass(IsMobileEvent,'ls.IsMobileEvent');
    var RuntimeTypeEvent = (function (_super) {
        __extends(RuntimeTypeEvent, _super);
        function RuntimeTypeEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=RuntimeTypeEvent,p=c.prototype;
        return RuntimeTypeEvent;
    }(ls.BaseEvent));
    ls.RuntimeTypeEvent = RuntimeTypeEvent;
    egret.registerClass(RuntimeTypeEvent,'ls.RuntimeTypeEvent');
    var RunLanguageEvent = (function (_super) {
        __extends(RunLanguageEvent, _super);
        function RunLanguageEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=RunLanguageEvent,p=c.prototype;
        return RunLanguageEvent;
    }(ls.BaseEvent));
    ls.RunLanguageEvent = RunLanguageEvent;
    egret.registerClass(RunLanguageEvent,'ls.RunLanguageEvent');
    var OnGeolocationPermissionDeniedEvent = (function (_super) {
        __extends(OnGeolocationPermissionDeniedEvent, _super);
        function OnGeolocationPermissionDeniedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnGeolocationPermissionDeniedEvent,p=c.prototype;
        return OnGeolocationPermissionDeniedEvent;
    }(ls.BaseEvent));
    ls.OnGeolocationPermissionDeniedEvent = OnGeolocationPermissionDeniedEvent;
    egret.registerClass(OnGeolocationPermissionDeniedEvent,'ls.OnGeolocationPermissionDeniedEvent');
    var OnGeolocationFailEvent = (function (_super) {
        __extends(OnGeolocationFailEvent, _super);
        function OnGeolocationFailEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnGeolocationFailEvent,p=c.prototype;
        return OnGeolocationFailEvent;
    }(ls.BaseEvent));
    ls.OnGeolocationFailEvent = OnGeolocationFailEvent;
    egret.registerClass(OnGeolocationFailEvent,'ls.OnGeolocationFailEvent');
    var OnDeviceShakeEvent = (function (_super) {
        __extends(OnDeviceShakeEvent, _super);
        function OnDeviceShakeEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnDeviceShakeEvent,p=c.prototype;
        return OnDeviceShakeEvent;
    }(ls.BaseEvent));
    ls.OnDeviceShakeEvent = OnDeviceShakeEvent;
    egret.registerClass(OnDeviceShakeEvent,'ls.OnDeviceShakeEvent');
    var OnDevicePositionChangedEvent = (function (_super) {
        __extends(OnDevicePositionChangedEvent, _super);
        function OnDevicePositionChangedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnDevicePositionChangedEvent,p=c.prototype;
        return OnDevicePositionChangedEvent;
    }(ls.BaseEvent));
    ls.OnDevicePositionChangedEvent = OnDevicePositionChangedEvent;
    egret.registerClass(OnDevicePositionChangedEvent,'ls.OnDevicePositionChangedEvent');
    var onDeviceOrientationChangedEvent = (function (_super) {
        __extends(onDeviceOrientationChangedEvent, _super);
        function onDeviceOrientationChangedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=onDeviceOrientationChangedEvent,p=c.prototype;
        return onDeviceOrientationChangedEvent;
    }(ls.BaseEvent));
    ls.onDeviceOrientationChangedEvent = onDeviceOrientationChangedEvent;
    egret.registerClass(onDeviceOrientationChangedEvent,'ls.onDeviceOrientationChangedEvent');
    var EveryTickEvent = (function (_super) {
        __extends(EveryTickEvent, _super);
        function EveryTickEvent() {
            _super.call(this);
        }
        var d = __define,c=EveryTickEvent,p=c.prototype;
        return EveryTickEvent;
    }(ls.BaseEvent));
    ls.EveryTickEvent = EveryTickEvent;
    egret.registerClass(EveryTickEvent,'ls.EveryTickEvent');
    var EveryXSecondsEvent = (function (_super) {
        __extends(EveryXSecondsEvent, _super);
        function EveryXSecondsEvent() {
            _super.call(this);
            this.interval = 0;
            this.oldTime = 0;
            this.curTime = 0;
        }
        var d = __define,c=EveryXSecondsEvent,p=c.prototype;
        return EveryXSecondsEvent;
    }(ls.BaseEvent));
    ls.EveryXSecondsEvent = EveryXSecondsEvent;
    egret.registerClass(EveryXSecondsEvent,'ls.EveryXSecondsEvent');
    var OnSceneInitCompleteEvent = (function (_super) {
        __extends(OnSceneInitCompleteEvent, _super);
        function OnSceneInitCompleteEvent() {
            _super.call(this);
        }
        var d = __define,c=OnSceneInitCompleteEvent,p=c.prototype;
        return OnSceneInitCompleteEvent;
    }(ls.BaseEvent));
    ls.OnSceneInitCompleteEvent = OnSceneInitCompleteEvent;
    egret.registerClass(OnSceneInitCompleteEvent,'ls.OnSceneInitCompleteEvent');
    var OnSceneEndCompleteEvent = (function (_super) {
        __extends(OnSceneEndCompleteEvent, _super);
        function OnSceneEndCompleteEvent() {
            _super.call(this);
        }
        var d = __define,c=OnSceneEndCompleteEvent,p=c.prototype;
        return OnSceneEndCompleteEvent;
    }(ls.BaseEvent));
    ls.OnSceneEndCompleteEvent = OnSceneEndCompleteEvent;
    egret.registerClass(OnSceneEndCompleteEvent,'ls.OnSceneEndCompleteEvent');
    var IsValueTypeEvent = (function (_super) {
        __extends(IsValueTypeEvent, _super);
        function IsValueTypeEvent() {
            _super.call(this);
        }
        var d = __define,c=IsValueTypeEvent,p=c.prototype;
        return IsValueTypeEvent;
    }(ls.BaseEvent));
    ls.IsValueTypeEvent = IsValueTypeEvent;
    egret.registerClass(IsValueTypeEvent,'ls.IsValueTypeEvent');
    var ObjectUIDExistEvent = (function (_super) {
        __extends(ObjectUIDExistEvent, _super);
        function ObjectUIDExistEvent() {
            _super.call(this);
            this.UID = 0;
        }
        var d = __define,c=ObjectUIDExistEvent,p=c.prototype;
        return ObjectUIDExistEvent;
    }(ls.BaseEvent));
    ls.ObjectUIDExistEvent = ObjectUIDExistEvent;
    egret.registerClass(ObjectUIDExistEvent,'ls.ObjectUIDExistEvent');
    var PickRandomInstanceEvent = (function (_super) {
        __extends(PickRandomInstanceEvent, _super);
        function PickRandomInstanceEvent() {
            _super.call(this);
        }
        var d = __define,c=PickRandomInstanceEvent,p=c.prototype;
        return PickRandomInstanceEvent;
    }(ls.BaseEvent));
    ls.PickRandomInstanceEvent = PickRandomInstanceEvent;
    egret.registerClass(PickRandomInstanceEvent,'ls.PickRandomInstanceEvent');
    var PickAllEvent = (function (_super) {
        __extends(PickAllEvent, _super);
        function PickAllEvent() {
            _super.call(this);
        }
        var d = __define,c=PickAllEvent,p=c.prototype;
        return PickAllEvent;
    }(ls.BaseEvent));
    ls.PickAllEvent = PickAllEvent;
    egret.registerClass(PickAllEvent,'ls.PickAllEvent');
    var PickByComparisionEvent = (function (_super) {
        __extends(PickByComparisionEvent, _super);
        function PickByComparisionEvent() {
            _super.call(this);
        }
        var d = __define,c=PickByComparisionEvent,p=c.prototype;
        return PickByComparisionEvent;
    }(ls.BaseEvent));
    ls.PickByComparisionEvent = PickByComparisionEvent;
    egret.registerClass(PickByComparisionEvent,'ls.PickByComparisionEvent');
    var PickInstanceByIndexEvent = (function (_super) {
        __extends(PickInstanceByIndexEvent, _super);
        function PickInstanceByIndexEvent() {
            _super.call(this);
        }
        var d = __define,c=PickInstanceByIndexEvent,p=c.prototype;
        return PickInstanceByIndexEvent;
    }(ls.BaseEvent));
    ls.PickInstanceByIndexEvent = PickInstanceByIndexEvent;
    egret.registerClass(PickInstanceByIndexEvent,'ls.PickInstanceByIndexEvent');
    var PickInstanecOverlappingEvent = (function (_super) {
        __extends(PickInstanecOverlappingEvent, _super);
        function PickInstanecOverlappingEvent() {
            _super.call(this);
        }
        var d = __define,c=PickInstanecOverlappingEvent,p=c.prototype;
        return PickInstanecOverlappingEvent;
    }(ls.BaseEvent));
    ls.PickInstanecOverlappingEvent = PickInstanecOverlappingEvent;
    egret.registerClass(PickInstanecOverlappingEvent,'ls.PickInstanecOverlappingEvent');
    var CompareVariableEvent = (function (_super) {
        __extends(CompareVariableEvent, _super);
        function CompareVariableEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareVariableEvent,p=c.prototype;
        return CompareVariableEvent;
    }(ls.BaseEvent));
    ls.CompareVariableEvent = CompareVariableEvent;
    egret.registerClass(CompareVariableEvent,'ls.CompareVariableEvent');
    // export class E_loader_Config_Loader extends lionfw.ModuleEvent {
    //     layoutName: string;
    // }
    var ForEachOrderEvent = (function (_super) {
        __extends(ForEachOrderEvent, _super);
        function ForEachOrderEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=ForEachOrderEvent,p=c.prototype;
        return ForEachOrderEvent;
    }(ls.BaseEvent));
    ls.ForEachOrderEvent = ForEachOrderEvent;
    egret.registerClass(ForEachOrderEvent,'ls.ForEachOrderEvent');
    var ForEvent = (function (_super) {
        __extends(ForEvent, _super);
        function ForEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=ForEvent,p=c.prototype;
        return ForEvent;
    }(ls.BaseEvent));
    ls.ForEvent = ForEvent;
    egret.registerClass(ForEvent,'ls.ForEvent');
    //当读取存档中的游戏数据完成时    
    var OnGameDataLoadCompleteEvent = (function (_super) {
        __extends(OnGameDataLoadCompleteEvent, _super);
        function OnGameDataLoadCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnGameDataLoadCompleteEvent,p=c.prototype;
        return OnGameDataLoadCompleteEvent;
    }(ls.BaseEvent));
    ls.OnGameDataLoadCompleteEvent = OnGameDataLoadCompleteEvent;
    egret.registerClass(OnGameDataLoadCompleteEvent,'ls.OnGameDataLoadCompleteEvent');
    //当游戏数据保存完成时    
    var OnGameDataSaveCompleteEvent = (function (_super) {
        __extends(OnGameDataSaveCompleteEvent, _super);
        function OnGameDataSaveCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnGameDataSaveCompleteEvent,p=c.prototype;
        return OnGameDataSaveCompleteEvent;
    }(ls.BaseEvent));
    ls.OnGameDataSaveCompleteEvent = OnGameDataSaveCompleteEvent;
    egret.registerClass(OnGameDataSaveCompleteEvent,'ls.OnGameDataSaveCompleteEvent');
    var OnLayerIsExistEvent = (function (_super) {
        __extends(OnLayerIsExistEvent, _super);
        function OnLayerIsExistEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLayerIsExistEvent,p=c.prototype;
        return OnLayerIsExistEvent;
    }(ls.BaseEvent));
    ls.OnLayerIsExistEvent = OnLayerIsExistEvent;
    egret.registerClass(OnLayerIsExistEvent,'ls.OnLayerIsExistEvent');
    var OnLayerIsVisibleEvent = (function (_super) {
        __extends(OnLayerIsVisibleEvent, _super);
        function OnLayerIsVisibleEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLayerIsVisibleEvent,p=c.prototype;
        return OnLayerIsVisibleEvent;
    }(ls.BaseEvent));
    ls.OnLayerIsVisibleEvent = OnLayerIsVisibleEvent;
    egret.registerClass(OnLayerIsVisibleEvent,'ls.OnLayerIsVisibleEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AISystem.js.map