var ls;
(function (ls) {
    var EventSheetVo = (function () {
        function EventSheetVo() {
        }
        var d = __define,c=EventSheetVo,p=c.prototype;
        return EventSheetVo;
    }());
    ls.EventSheetVo = EventSheetVo;
    egret.registerClass(EventSheetVo,'ls.EventSheetVo');
    var FamilyVo = (function () {
        function FamilyVo() {
        }
        var d = __define,c=FamilyVo,p=c.prototype;
        return FamilyVo;
    }());
    ls.FamilyVo = FamilyVo;
    egret.registerClass(FamilyVo,'ls.FamilyVo');
    var VariableVo = (function () {
        function VariableVo() {
        }
        var d = __define,c=VariableVo,p=c.prototype;
        return VariableVo;
    }());
    ls.VariableVo = VariableVo;
    egret.registerClass(VariableVo,'ls.VariableVo');
    var CollisionDataVo = (function () {
        function CollisionDataVo() {
        }
        var d = __define,c=CollisionDataVo,p=c.prototype;
        return CollisionDataVo;
    }());
    ls.CollisionDataVo = CollisionDataVo;
    egret.registerClass(CollisionDataVo,'ls.CollisionDataVo');
    var CollisionSearchVo = (function () {
        function CollisionSearchVo() {
            this.enemyNames = [];
        }
        var d = __define,c=CollisionSearchVo,p=c.prototype;
        return CollisionSearchVo;
    }());
    egret.registerClass(CollisionSearchVo,'CollisionSearchVo');
    var EventSheetDecoder = (function () {
        function EventSheetDecoder() {
        }
        var d = __define,c=EventSheetDecoder,p=c.prototype;
        EventSheetDecoder.saveEventSheetData = function (eventSheetName) {
            var eventSheet = ls.Config.sceneInfo.eventsheetData;
            this.eventsheetVo = new EventSheetVo();
            this.eventsheetVo.eventSheetName = eventSheetName;
            this.eventsheetVo.nextEventSheetName = eventSheet["$next"];
            this.eventsheetVo.prevEventSheetName = eventSheet["$previous"];
            this.eventsheetVo.layoutName = eventSheet["$layout"];
            var version = eventSheet["$version"];
            this.eventsheetVo.version = version ? (version) : "1.1.1";
            this.eventSheets[eventSheetName] = this.eventsheetVo;
        };
        EventSheetDecoder.start = function (eventSheetName) {
            ls.assert(eventSheetName == null || eventSheetName == "", eventSheetName + " can not null!");
            this.saveEventSheetData(eventSheetName);
            var eventSheet = ls.Config.sceneInfo.eventsheetData;
            ls.assert(eventSheet == null, "can not find " + eventSheetName);
            //GameUILayer.testContainer.addChild(this.testShape);
            this.curSceneInstancesData = [];
            this.curSceneEventsData = [];
            this.curSceneAiObjects = [];
            this.curSceneAiObjectsHash = {};
            this.curSceneEvents = [];
            var objectList = ls.World.getInstance().objectList;
            this.currentEventSheetName = eventSheetName;
            var _eventSheetDataList = eventSheet.children;
            if (_eventSheetDataList === undefined)
                return;
            for (var i = 0, itemlen = _eventSheetDataList.length; i < itemlen; i++) {
                var _data = _eventSheetDataList[i];
                var _type = _data["$type"];
                switch (_type) {
                    case "instance":
                        if (ls.LayoutDecoder.curSceneInstances[_data["$UID"]])
                            this.curSceneInstancesData.push(_data);
                        break;
                    case "family":
                        var familyVo = this.decodeFamily(_data);
                        this.curFamilys[familyVo.name] = familyVo;
                        //将familyVo里的实例添加行为
                        if (familyVo.insts && familyVo.behaviors) {
                            for (var fi = 0; fi < familyVo.insts.length; fi++) {
                                var finst = familyVo.insts[fi];
                                if (finst) {
                                    for (var bi = 0; bi < familyVo.behaviors.length; bi++) {
                                        var bh = familyVo.behaviors[bi];
                                        var cbh = fi == 0 ? bh : bh.clone();
                                        finst.addBehavior(cbh);
                                        cbh.onCreate();
                                        cbh.isCreated = true;
                                    }
                                }
                            }
                        }
                        break;
                    case "event":
                        this.curSceneEventsData.push(_data);
                        break;
                    case "variable":
                        //如果是全局变量，那么全部加入到System对象中
                        var v = this.decodeVaraible(_data);
                        if (ls.AISystem.instance[v.name] == undefined) {
                            switch (v.variableType) {
                                case "number":
                                    ls.AISystem.instance[v.name] = +v.initValue;
                                    break;
                                case "string":
                                    ls.AISystem.instance[v.name] = v.initValue + "";
                                    break;
                                case "any":
                                    ls.AISystem.instance[v.name] = v.initValue;
                                    break;
                                case "boolean":
                                    ls.AISystem.instance[v.name] = Boolean(ls.eval_e(v.initValue));
                                    break;
                            }
                        }
                        break;
                }
            }
            this.decode();
        };
        EventSheetDecoder.decode = function () {
            //解析属性
            this.decodePropertys();
            //解析事件
            this.decodeEvents();
            //发送场景初始化完成事件
            ls.AISystem.instance.sendSceneInitComplete();
            this.decodeExpressions();
            //开始渲染
            ls.GameUILayer.stage.addEventListener(egret.Event.ENTER_FRAME, this.eventsheetRender, this);
            //实例初始化完毕
            this.onInstancesCreate();
        };
        /**解析表达式 */
        EventSheetDecoder.decodeExpressions = function () {
            // var exps: any[][]       = ls["getObjectRefTabel"]();
            // this.expressionObject   = {};
            // for (var i: number = 0; i < exps.length; i++){
            //     var item: any[]     = exps[i];
            //     var key: string     = item[0];
            //     var value: any      = item[1];
            //     this.expressionObject[key] = value;
            // }
            // console.log(this.expressionObject);
        };
        //初始化aiObject
        EventSheetDecoder.decodePropertys = function () {
            //解析实例属性
            for (var i = 0, instancelen = this.curSceneInstancesData.length; i < instancelen; i++) {
                var _instanceData = this.curSceneInstancesData[i];
                var _targetType = _instanceData["$type"];
                var UID = +_instanceData["$UID"];
                var _instance = ls.LayoutDecoder.curSceneInstances[UID];
                if (_instance == null) {
                    ls.assert(true, "EventSheetDecoder UID:" + UID + " instance is null!");
                    continue;
                }
                this.curSceneAiObjectsHash[_instance.name] = _instance;
                this.curSceneAiObjects.push(_instance);
                //解析属性
                var _instanceItems = _instanceData.children;
                if (_instanceItems) {
                    var _instanceItemlen = _instanceItems.length;
                    for (var j = 0; j < _instanceItemlen; j++) {
                        var _instanceItem = _instanceItems[j];
                        this.decodeInstancePropertie(_instanceItem, _instance);
                    }
                }
            }
        };
        EventSheetDecoder.decodeFamily = function (data) {
            var _uids = data["$UID"];
            var uids = _uids == "" ? [] : _uids.split(',');
            var familyVo = new FamilyVo();
            familyVo.name = data["$target"];
            familyVo.UIDs = [];
            familyVo.insts = [];
            if (uids && uids.length) {
                for (var i = 0; i < uids.length; i++) {
                    familyVo.UIDs[i] = parseFloat(uids[i]);
                    familyVo.insts[i] = ls.LayoutDecoder.curSceneInstances[familyVo.UIDs[i]];
                }
            }
            //解析行为列表
            familyVo.behaviors = [];
            familyVo.variables = [];
            var familyChildrenData = data.children;
            for (var i = 0; i < familyChildrenData.length; i++) {
                var item = familyChildrenData[i];
                switch (item["$name"]) {
                    case "behaviors":
                        var behaviorDatas = item.children;
                        for (var i1 = 0; i1 < behaviorDatas.length; i1++) {
                            var behaviorVo = this.decodeBehavior(behaviorDatas[i1]);
                            familyVo.behaviors[i1] = behaviorVo;
                        }
                        break;
                    case "variables":
                        var variableDatas = item.children;
                        for (var i2 = 0; i2 < variableDatas.length; i2++) {
                            var variableVo = this.decodeVaraible(variableDatas[i2]);
                            familyVo.variables[i2] = variableVo;
                        }
                        break;
                }
            }
            //将组的变量绑定到对象实例上
            if (familyVo.insts && familyVo.variables) {
                for (var i = 0; i < familyVo.insts.length; i++) {
                    var inst = familyVo.insts[i];
                    for (var j = 0; j < familyVo.variables.length; j++) {
                        var v = familyVo.variables[j];
                        switch (v.variableType) {
                            case "number":
                                inst[v.name] = +v.initValue;
                                break;
                            case "string":
                                inst[v.name] = v.initValue + "";
                                break;
                            case "any":
                                inst[v.name] = v.initValue;
                                break;
                            case "boolean":
                                inst[v.name] = Boolean(ls.eval_e(v.initValue));
                                break;
                        }
                    }
                }
            }
            return familyVo;
        };
        EventSheetDecoder.decodeVaraible = function (data) {
            var v = new VariableVo();
            v.initValue = decodeURIComponent(data["$initValue"]);
            v.variableType = data["$variableType"];
            v.name = data["$variableName"];
            return v;
        };
        //解析事件数据
        EventSheetDecoder.decodeEvents = function () {
            //解析事件属性
            for (var i = 0; i < this.curSceneEventsData.length; i++) {
                var eventData = this.curSceneEventsData[i];
                var event = this.decodeEvent(eventData, i);
                if (event)
                    this.curSceneEvents.push(event);
            }
        };
        //解析事件
        EventSheetDecoder.decodeEvent = function (eventData, index) {
            var event = new ls.AIEvent();
            event.index = index;
            //【兼容1.11以前】,1.11以前版本有$conditionRelationShip,后面的将会取消，以operatorType替代
            var conditionRelationShip = eventData["$conditionRelationShip"];
            if (conditionRelationShip)
                event.conditionRelationShip = ls.eval_e(conditionRelationShip);
            //是否是一次性触发事件
            var triggerOnceWhileTrue = eventData["$triggerOnceWhileTrue"];
            if (triggerOnceWhileTrue)
                event.triggerOnceWhileTrue = ls.eval_e(triggerOnceWhileTrue);
            //条件列表
            var items = eventData.children;
            if (items == null)
                return;
            var prevConditionBlock;
            var nextConditionBlock;
            var eventlen = items.length;
            var conditionBlockIndex = 0;
            var conditionIndex = 0;
            var actionIndex = 0;
            //检测是否有conditionBlock元素
            var isHasConditionBlock = false;
            for (var i = 0; i < eventlen; i++) {
                if (items[i]["$type"] === "conditionBlock") {
                    isHasConditionBlock = true;
                    break;
                }
            }
            if (isHasConditionBlock) {
                var subEventIndex = 0;
                for (var j = 0; j < eventlen; j++) {
                    var childItem = items[j];
                    var childType = childItem["$type"];
                    var conditionBlock;
                    //1.2及以后的版本
                    //解析条件块
                    switch (childType) {
                        case "conditionBlock":
                            conditionBlock = this.decodeConditionBlock(childItem.children, conditionBlockIndex, event);
                            conditionBlock.event = event;
                            if (event.conditionBlocks == null)
                                event.conditionBlocks = [];
                            event.conditionBlocks.push(conditionBlock);
                            if (conditionBlockIndex === 0) {
                                prevConditionBlock = conditionBlock;
                            }
                            else {
                                //上一个
                                conditionBlock.prevConditionBlock = prevConditionBlock;
                                prevConditionBlock = conditionBlock;
                                //下一个
                                conditionBlock.prevConditionBlock.nextConditionBlock = conditionBlock;
                            }
                            conditionBlockIndex++;
                            break;
                        case "event":
                            if (event.children == null)
                                event.children = [];
                            var subEvent = this.decodeEvent(childItem, subEventIndex);
                            subEvent.parent = event;
                            event.children.push(subEvent);
                            subEventIndex++;
                            break;
                    }
                }
            }
            else {
                //1.11及以前的版本
                subEventIndex = 0;
                var version1_1_1Datas = [];
                for (var j = 0; j < eventlen; j++) {
                    var childItem = items[j];
                    var childType = childItem["$type"];
                    switch (childType) {
                        case "condition":
                        case "action":
                            version1_1_1Datas.push(childItem);
                            break;
                        case "event":
                            if (event.children == null)
                                event.children = [];
                            var subEvent = this.decodeEvent(childItem, subEventIndex);
                            subEvent.parent = event;
                            event.children.push(subEvent);
                            subEventIndex++;
                            break;
                    }
                }
                conditionBlock = this.decodeConditionBlock(version1_1_1Datas, 0, event);
                conditionBlock.event = event;
                if (event.conditionBlocks == null)
                    event.conditionBlocks = [];
                event.conditionBlocks.push(conditionBlock);
                if (conditionBlockIndex === 0) {
                    prevConditionBlock = conditionBlock;
                }
                else {
                    //上一个
                    conditionBlock.prevConditionBlock = prevConditionBlock;
                    prevConditionBlock = conditionBlock;
                    //下一个
                    conditionBlock.prevConditionBlock.nextConditionBlock = conditionBlock;
                }
                conditionBlockIndex++;
            }
            return event;
        };
        //解析实例属性数据
        EventSheetDecoder.decodeInstancePropertie = function (data, instance) {
            var _itemType = data["$type"];
            switch (_itemType) {
                case "behavior":
                    //如果global.xml解析过一次，那么，此时不需要解析了
                    if (instance.global)
                        break;
                    var _behavior = this.decodeBehavior(data);
                    if (instance instanceof ls.AIDisplayObject)
                        instance.addBehavior(_behavior);
                    else
                        ls.assert(true, instance + "must instance of AIDisplayObject for have Behaviors");
                    //添加行为列表
                    _behavior.onCreate();
                    _behavior.isCreated = true;
                    break;
                case "variable":
                    var variableName = data["$variableName"];
                    var variableValueType = data["$variableType"];
                    var initValue = decodeURIComponent(data["$initValue"]);
                    switch (variableValueType) {
                        case "number":
                            instance.addVariable(variableName, +initValue);
                            break;
                        case "string":
                            instance.addVariable(variableName, initValue + "");
                            break;
                        case "any":
                            instance.addVariable(variableName, initValue);
                            break;
                        case "boolean":
                            instance.addVariable(variableName, Boolean(ls.eval_e(initValue)));
                            break;
                    }
                    break;
            }
        };
        //解析行为列表
        EventSheetDecoder.decodeBehavior = function (data) {
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
            return _behaivor;
        };
        //解析条件块数据
        //为了兼容以前的1.1.1版本，data是个数组
        EventSheetDecoder.decodeConditionBlock = function (data, index, event) {
            var items = data;
            if (items) {
                var conditionBlock = new ls.ConditionBlock();
                conditionBlock.index = index;
                conditionBlock.conditions = [];
                conditionBlock.actions = [];
                var len = items.length;
                var conditionIndex = 0;
                var actionIndex = 0;
                var firstCondition;
                var prevCondition;
                var nextCondition;
                var firstAction;
                var prevAction;
                var nextAction;
                for (var i = 0; i < len; i++) {
                    var childItem = items[i];
                    var childType = childItem["$type"];
                    switch (childType) {
                        case "condition":
                            var condition = this.decodeCondition(childItem, conditionIndex, event);
                            condition.conditionBlock = conditionBlock;
                            condition.event = event;
                            if (condition.callCondition == undefined) {
                                if (!condition.isFamily)
                                    ls.assert(true, "目标：" + condition.callTarget + "没有" + condition.callConditionName + "方法！！！");
                                else
                                    ls.assert(true, "目标组没有" + condition.callConditionName + "方法！！！");
                            }
                            conditionBlock.conditions.push(condition);
                            if (conditionIndex === 0)
                                prevCondition = firstCondition = condition;
                            else {
                                condition.prevCondition = prevCondition;
                                prevCondition = condition;
                                condition.prevCondition.nextCondition = condition;
                            }
                            conditionIndex++;
                            break;
                        case "action":
                            var action = this.decodeAction(childItem, actionIndex, event);
                            action.conditionBlock = conditionBlock;
                            action.event = event;
                            conditionBlock.actions.push(action);
                            if (actionIndex === 0)
                                prevAction = firstAction = action;
                            else {
                                action.prevAction = prevAction;
                                prevAction = action;
                                action.prevAction.nextAction = action;
                            }
                            actionIndex++;
                            break;
                    }
                }
                return conditionBlock;
            }
            return null;
        };
        /**
         * 解析条件属性(条件属性要在运行时一直解析，否则，很多时候读取的值可能不是动态的，只是初始化的值)
         * 并且条件属性中可能会有组
         */
        EventSheetDecoder.decodeConditionProperties = function (eventIndex, conditionIndex, conditionInstance) {
            var key = eventIndex + "_" + conditionIndex;
            if (this.instancesConditions[key] == undefined) {
                var data = conditionInstance.data;
                var conditionPropsInfos = data.children;
                if (conditionPropsInfos) {
                    var conditionProplen = conditionPropsInfos.length;
                    for (var i = 0; i < conditionProplen; i++) {
                        var conditionPropItem = conditionPropsInfos[i];
                        var conditionPropType = conditionPropItem["$valueDataType"];
                        var conditionPropName = conditionPropItem["$name"];
                        var conditionPropValue = conditionPropItem["$value"];
                        var isVariable = conditionPropItem["$variable"] ? conditionPropItem["$variable"] === "true" : false;
                        var isFamily = conditionPropItem["$isFamily"] ? conditionPropItem["$isFamily"] === "true" : false;
                        conditionInstance.isFamily = isFamily;
                        switch (conditionPropType) {
                            case "number":
                                conditionInstance[conditionPropName] = +conditionPropValue;
                                break;
                            case "string":
                                var realValue = decodeURIComponent(conditionPropValue + "");
                                realValue = isVariable ? realValue : ls.getTransformationStr(realValue);
                                if (isVariable)
                                    conditionInstance[conditionPropName] = realValue;
                                else
                                    conditionInstance[conditionPropName] = ls.eval_e(realValue);
                                break;
                            case "any":
                                conditionInstance[conditionPropName] = isVariable ? decodeURIComponent(conditionPropItem["$value"]) : ls.getTransformationStr(decodeURIComponent(conditionPropItem["$value"]));
                                break;
                            case "boolean":
                                conditionInstance[conditionPropName] = Boolean(ls.eval_e(conditionPropValue));
                                break;
                        }
                    }
                }
                this.instancesConditions[key] = conditionInstance;
            }
            conditionInstance = this.instancesConditions[key];
            return conditionInstance;
        };
        EventSheetDecoder.decodeConditionFamilyProperties = function (conditionInstance, data) {
            var list = [];
            var conditionPropsInfos = data.children;
            if (conditionPropsInfos) {
                var conditionProplen = conditionPropsInfos.length;
                for (var i = 0; i < conditionProplen; i++) {
                    var conditionPropItem = conditionPropsInfos[i];
                    var isFamily = conditionPropItem["$isFamily"] ? conditionPropItem["$isFamily"] === "true" : false;
                    if (isFamily) {
                        var enemyName = conditionPropItem["$value"];
                        var familyVo = this.curFamilys[enemyName];
                        var familyInstances = familyVo.insts;
                        for (var j = 0; j < familyInstances.length; j++) {
                            if (list.indexOf(familyInstances[j].name) == -1) {
                                list.push(familyInstances[j].name);
                            }
                        }
                    }
                }
            }
            return list;
        };
        //解析条件数据
        EventSheetDecoder.decodeCondition = function (data, index, event) {
            var targetName = data["$target"]; //实例名
            var behaviorName = data["$behaviorName"]; //如果此值存在，那么，表示是执行该目标的行为方法，否则执行实例方法
            var conditionInstance = ls.getInstanceByPluginClassName(data["$paramsClass"]);
            var callName = data["$callName"]; //【目标，函数名，函数参数】
            var invert = false;
            //invert
            if (data["$invert"])
                invert = (data["$invert"] === "true");
            //loop
            var loop = false;
            if (data["$loop"])
                loop = (data["$loop"] === "true");
            var condition = new ls.Condition();
            condition.index = index;
            condition.firstCondition = (index == 0) ? condition : null;
            condition.targetName = targetName;
            condition.paramClassName = data["$paramsClass"];
            condition.isInvert = invert;
            condition.paramsInstance = conditionInstance;
            condition.callConditionName = callName;
            condition.isFamily = (data["$family"] == "true");
            condition.event = event;
            if (ls.Version.compareVersion(this.eventsheetVo.version, "1.1.1") === 1) {
                var operatorType = 0;
                if (data["$operatorType"])
                    operatorType = +data["$operatorType"];
                condition.operatorType = operatorType;
            }
            else {
                //【兼容1.1.1以前】为了兼容以前的版本，解析conditionRelationShip
                condition.operatorType = +(!event.conditionRelationShip);
            }
            if (conditionInstance) {
                conditionInstance.data = data;
                condition.isTrigger = Boolean(ls.eval_e(data["$isTrigger"]));
                //存储带触发条件的条件
                if (condition.isTrigger)
                    this.triggerConditions.push(condition);
            }
            //这里要优化碰撞检测查找目标，这里可能也需要组的操作,这里需要对组进行处理
            if (callName == "onCollisionWithOtherObject") {
                //主要是存储敌人
                var conditionPropsInfos = data.children;
                if (conditionPropsInfos) {
                    var enemyName = conditionPropsInfos[0]["$value"];
                    var enemy = ls.eval_e(ls.getTransformationStr(enemyName));
                    if (condition.isFamily) {
                        var familyVo = this.curFamilys[targetName];
                        if (familyVo.insts && familyVo.insts.length > 0) {
                            for (var fi = 0; fi < familyVo.insts.length; fi++) {
                                var _inst = familyVo.insts[fi];
                                if (this.collisionSearchs[_inst.name] == null) {
                                    var collisionVo = new CollisionSearchVo();
                                    collisionVo.owerName = _inst.name;
                                    if (enemy instanceof ls.AIDisplayObject)
                                        collisionVo.enemyNames.push(enemyName);
                                    this.collisionSearchs[_inst.name] = collisionVo;
                                }
                                else {
                                    collisionVo = this.collisionSearchs[_inst.name];
                                    if (enemy instanceof ls.AIDisplayObject)
                                        collisionVo.enemyNames.push(enemyName);
                                }
                            }
                        }
                    }
                    else {
                        var list = this.decodeConditionFamilyProperties(condition.paramsInstance, data);
                        if (this.collisionSearchs[targetName] == null) {
                            var collisionVo = new CollisionSearchVo();
                            collisionVo.owerName = targetName;
                            this.collisionSearchs[targetName] = collisionVo;
                        }
                        else {
                            collisionVo = this.collisionSearchs[targetName];
                        }
                        if (list.length > 0) {
                            //组
                            for (var m = 0; m < list.length; m++) {
                                collisionVo.enemyNames.push(list[m]);
                            }
                        }
                        else {
                            if (enemy instanceof ls.AIDisplayObject)
                                collisionVo.enemyNames.push(enemyName);
                        }
                    }
                }
            }
            if (callName == "onCollisionWithOtherObject") {
                var conditionPropsInfos = data.children;
                if (conditionPropsInfos) {
                    var collkey = event.index + "_" + condition.index;
                    if (this.collisionSearchs2[collkey] == null) {
                        var enemyName = conditionPropsInfos[0]["$value"];
                        this.collisionSearchs2[collkey] = [targetName, enemyName];
                    }
                }
            }
            if (ls.isSingleInst(targetName)) {
                condition.callTarget = ls.getInstanceByInstanceName(targetName);
                condition.callCondition = condition.callTarget[callName];
            }
            else {
                //查找目标的行为列表
                if (condition.isFamily) {
                    var callThisObject = null;
                    var familyVo = this.curFamilys[targetName];
                    var familyInstances = familyVo.insts;
                    if (familyInstances == undefined)
                        alert("当前场景中没有" + targetName + "的组！！！");
                    var callFamilyTargets = [];
                    for (var f = 0; f < familyInstances.length; f++) {
                        var fInstance = familyInstances[f];
                        var templateInstance = ls.World.getInstance().objectHash[fInstance.name][0];
                        //这里需要查找当前条件中用到的行为
                        if (behaviorName != null && behaviorName != "") {
                            if (templateInstance) {
                                var behaviors = familyVo.behaviors;
                                var _b;
                                for (var i = 0, len = behaviors.length; i < len; i++) {
                                    var behaivor = behaviors[i];
                                    if (behaivor.name == behaviorName) {
                                        _b = behaivor;
                                        break;
                                    }
                                }
                                callThisObject = (_b == null) ? templateInstance : _b;
                            }
                        }
                        else {
                            callThisObject = [];
                            callThisObject.push(templateInstance);
                        }
                    }
                    condition.callTarget = callThisObject;
                    if (callThisObject[0] == undefined)
                        condition.callCondition = callThisObject[callName];
                    else
                        condition.callCondition = callThisObject[0][callName];
                }
                else {
                    //取模板实例
                    var callThisObject = null;
                    if (ls.World.getInstance().objectHash[targetName] == undefined)
                        alert("当前场景中没有" + targetName + "实例对象！！！");
                    var templateInstance = ls.World.getInstance().objectHash[targetName][0];
                    if (behaviorName != null && behaviorName != "") {
                        if (templateInstance) {
                            var behaviors = templateInstance.behaviors;
                            for (var i = 0, len = behaviors.length; i < len; i++) {
                                var behaivor = behaviors[i];
                                if (behaivor.name == behaviorName) {
                                    callThisObject = behaivor;
                                    break;
                                }
                            }
                            callThisObject = (callThisObject == null) ? templateInstance : callThisObject;
                        }
                    }
                    else {
                        callThisObject = templateInstance;
                    }
                    condition.callTarget = callThisObject;
                    condition.callCondition = condition.callTarget[callName];
                }
                if (condition.callCondition === undefined)
                    ls.assert(true, "条件目标:" + condition.targetName + ",没有调用的方法名：" + callName);
            }
            return condition;
        };
        //解析动作数据
        EventSheetDecoder.decodeAction = function (data, index, event) {
            var targetName = data["$target"];
            var behaviorName = data["$behaviorName"]; //如果此值存在，那么，表示是执行该目标的行为方法，否则执行实例方法 
            var callName = data["$callName"];
            var isFamily = (data["$family"] == "true");
            //modified
            var callTarget;
            if (ls.isSingleInst(targetName)) {
                callTarget = ls.getInstanceByInstanceName(targetName);
            }
            else {
                if (this.curSceneAiObjects) {
                    for (var i = 0, len = this.curSceneAiObjects.length; i < len; i++) {
                        if (this.curSceneAiObjects[i].name == targetName) {
                            callTarget = this.curSceneAiObjects[i];
                            var callThisObject;
                            if (behaviorName != null && behaviorName != "") {
                                if (callTarget) {
                                    var behaviors = callTarget["behaviors"];
                                    if (behaviors) {
                                        for (var j = 0, slen = behaviors.length; j < slen; j++) {
                                            var behaivor = behaviors[j];
                                            if (behaivor.name == behaviorName) {
                                                callThisObject = behaivor;
                                                break;
                                            }
                                        }
                                        callTarget = callThisObject;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
            if (callTarget == undefined)
                callTarget = ls.eval_e(targetName);
            var callParams = [];
            var action = new ls.Action();
            action.index = index;
            action.targetName = targetName;
            action.isFamily = isFamily;
            action.callTarget = callTarget;
            action.paramData = data.children;
            action.callHanlderName = callName;
            return action;
        };
        /**解析动作参数 */
        EventSheetDecoder.decodeActionParams = function (action) {
            var actionParams = {};
            var params = [];
            var actionPropsInfos = action.paramData;
            var isFamilys = [];
            var hasFamily = false;
            if (actionPropsInfos && actionPropsInfos.length) {
                for (var i = 0, len = actionPropsInfos.length; i < len; i++) {
                    var _propertyItem = actionPropsInfos[i];
                    var _propertyValueType = _propertyItem["$valueDataType"];
                    var _propertyName = _propertyItem["$name"];
                    var _propertyValue = decodeURIComponent(_propertyItem["$value"]);
                    var _isVariable = _propertyItem["$variable"] ? _propertyItem["$variable"] === "true" : false;
                    var _isFamily = _propertyItem["$isFamily"] ? _propertyItem["$isFamily"] === "true" : false;
                    if (_isFamily) {
                        hasFamily = true;
                    }
                    var _value;
                    switch (_propertyValueType) {
                        case "number":
                            _value = +_propertyValue;
                            break;
                        case "string":
                            _propertyValue = _isVariable ? _propertyValue : ls.getTransformationStr(_propertyValue);
                            if (_isVariable)
                                _value = _propertyValue;
                            else
                                _value = ls.eval_e(_propertyValue + "");
                            break;
                        case "any":
                            _value = _isVariable ? _propertyValue : ls.getTransformationStr(_propertyValue);
                            break;
                        case "boolean":
                            _value = Boolean(ls.eval_e(_propertyValue));
                            break;
                    }
                    isFamilys[i] = _isFamily;
                    params.push(_value);
                }
            }
            actionParams.params = params;
            actionParams.isFamilys = isFamilys;
            actionParams.hasFamily = hasFamily;
            return actionParams;
        };
        EventSheetDecoder.tick = function () {
            return this._tick;
        };
        EventSheetDecoder.eventsheetRender = function (event) {
            var system = ls.AISystem.instance;
            var currentTime = egret.getTimer();
            if (this.lastTickTime !== 0) {
                this._tick = currentTime - this.lastTickTime;
                if (this._tick < 0)
                    this._tick = 0;
                system.dt1 = this._tick / 1000;
                //如果最小化了，或者切换了tab标签，那么，停止游戏
                if (system.dt1 > 0.5) {
                    system.dt1 = 0;
                }
                else if (system.dt1 > 1 / system.minimumFramerate) {
                    system.dt1 = 1 / system.minimumFramerate;
                }
                //渲染摄像机
                ls.World.getInstance().sceneCamera.render();
                ls.World.getInstance().sceneCamera.renderContainer();
                this.renderCamera();
                //渲染事件
                this.renderEvents();
                //渲染行为
                this.renderBehaviors();
                //渲染更新
                this.onRenderUpdate();
                //渲染更新
                if (this.onEventSheetTick != null)
                    this.onEventSheetTick();
                //碰撞检测
                this.checkCollistions();
            }
            this.lastTickTime = currentTime;
            system.dt = system.dt1 * system.timeScale;
        };
        EventSheetDecoder.onRenderUpdate = function () {
            var insts = ls.World.getInstance().objectList;
            for (var i = 0; i < insts.length; i++) {
                var inst = insts[i];
                var container = inst.container;
                if (container) {
                    //     if (container && container.parent && inst.alpha > 0 && inst.visible) {
                    container.x = inst.x;
                    container.y = inst.y;
                    container.width = inst.width;
                    container.height = inst.height;
                    if (inst.scaleContainer) {
                        container.scaleX = inst.scaleX;
                        container.scaleY = inst.scaleY;
                    }
                    container.rotation = inst.angle;
                    container.anchorOffsetX = inst.width * inst.anchorX;
                    container.anchorOffsetY = inst.height * inst.anchorY;
                    container.alpha = inst.alpha;
                    container.visible = inst.visible;
                    inst.update = false;
                }
            }
        };
        //渲染摄像机
        EventSheetDecoder.renderCamera = function () {
            ls.World.getInstance().render();
        };
        //实例初始化完毕
        EventSheetDecoder.onInstancesCreate = function () {
            for (var uid in ls.LayoutDecoder.curSceneInstances) {
                if (ls.LayoutDecoder.curSceneInstances[uid] instanceof ls.AIDisplayObject) {
                    ls.LayoutDecoder.curSceneInstances[uid].onCreate();
                }
            }
        };
        //渲染行为的列表
        EventSheetDecoder.renderBehaviors = function () {
            var objectList = ls.World.getInstance().objectList;
            //检测是否绑定了横轴跑酷行为，如果有，那么，让其行为最后执行
            //检测所有的对象，并渲染其行为 
            var platforms = [];
            for (var i = 0; i < objectList.length; i++) {
                var inst = objectList[i];
                //if (inst && !inst["hasPlatform"]) {
                inst.onTick();
                var behaviors = inst.behaviors;
                if (behaviors) {
                    for (var j = 0; j < behaviors.length; j++) {
                        var behaivor = behaviors[j];
                        if (behaivor.enabled && behaivor.inst && !(behaivor.inst.dt === 0 || behaivor.inst.dt > 1000000))
                            behaivor.tick();
                    }
                }
            }
            // for (var i: number = 0; i < platforms.length; i++){
            //     var inst: AIDisplayObject = platforms[i];
            //     if (inst.container) {
            //         inst.onTick();
            //         var behaviors: BaseBehavior[]       = inst.behaviors;
            //         if (behaviors) {
            //             for (var j: number = 0; j < behaviors.length; j++) {
            //                 var behaivor: BaseBehavior = behaviors[j];
            //                 if (behaivor.enabled && behaivor.inst && !(behaivor.inst.dt === 0 || behaivor.inst.dt > 1000000))
            //                     behaivor.tick();  
            //             }
            //         }
            //     }
            // }
        };
        EventSheetDecoder.renderEvents = function () {
            var disableDataEvents = ls.AISystem.instance.disableDataEvents;
            for (var i = 0; i < this.curSceneEvents.length; i++) {
                //序号从1开始
                if (disableDataEvents[i + 1] == undefined) {
                    var event = this.curSceneEvents[i];
                    this.execEvent(event);
                }
            }
        };
        //条件块是为if else 条件语句而生的
        EventSheetDecoder.execEvent = function (event, triggerInfo) {
            if (triggerInfo === void 0) { triggerInfo = null; }
            if (event.enabled) {
                //如果有父事件，判断父事件条件块状态，否则，直接判断
                var status = false;
                if (event.parent) {
                    if (event.parent.conditionBlocks[0].status)
                        status = true;
                }
                else {
                    status = true;
                }
                if (status) {
                    var cbs = event.conditionBlocks;
                    this.execConditionBlock(cbs[0], triggerInfo);
                }
            }
        };
        EventSheetDecoder.execConditionBlock = function (cb, triggerInfo) {
            if (cb) {
                cb.cs = {};
                cb.loopDatas = [];
                cb.loopLayers = 0;
                this.execNextCondition(cb.conditions[0], cb, triggerInfo, function () {
                    //如果所有的条件都进行完毕，那么，直接进行动作处理，这里将产生所有条件过滤出来的结果
                    var filterInstances = [];
                    //第一步，所有条件进行过滤
                    var cStatus;
                    for (var i = 0; i < cb.conditions.length; i++) {
                        var condition = cb.conditions[i];
                        if (i == 0) {
                            cStatus = condition.currentStatus;
                        }
                        else {
                            if (condition.operatorType == 1)
                                cStatus = cStatus || condition.currentStatus;
                            else
                                cStatus = cStatus && condition.currentStatus;
                        }
                    }
                    cb.status = cStatus;
                    if (cStatus) {
                        //如果是一次性触发条件，那么，将去掉禁止掉该事件的运行
                        if (cb.event.triggerOnceWhileTrue)
                            cb.event.enabled = false;
                        //所有的总的条件计算完毕，并成立后，再次计算所有目标所有条件的状态比较值
                        for (var uid in cb.cs.instanceStatus) {
                            var cs = cb.cs.instanceStatus[uid];
                            var _inst = cs.instance;
                            var _ccs = cs.ccs;
                            var _s;
                            var _computeIndex = 0;
                            for (var cindex in _ccs) {
                                var ccs = _ccs[cindex];
                                var c = ccs.c;
                                //首先总的条件要成立
                                if (_computeIndex == 0) {
                                    _s = ccs.status;
                                }
                                else {
                                    if (c.operatorType == 1)
                                        _s = (_s || ccs.status);
                                    else
                                        _s = (_s && ccs.status);
                                }
                                _computeIndex++;
                            }
                            if (_s) {
                                filterInstances.push(_inst);
                            }
                        }
                        //只有过滤的目标大于0，才会执行动作与子事件
                        if (filterInstances.length > 0) {
                            cb.execActions(filterInstances);
                            //解析子事件
                            var _event = cb.event;
                            if (_event.children) {
                                for (var m = 0; m < _event.children.length; m++) {
                                    var subevent = _event.children[m];
                                    if (subevent) {
                                        subevent.lastFilterTargets = filterInstances;
                                        EventSheetDecoder.execEvent(subevent);
                                    }
                                }
                            }
                        }
                    }
                });
                var nextBlock = cb.nextConditionBlock;
                if (nextBlock)
                    this.execConditionBlock(nextBlock, triggerInfo);
            }
        };
        /**
         * 执行下一个条件
         * c2做了特殊处理，触发条件产生的过滤与普通条件不一致
         */
        EventSheetDecoder.execNextCondition = function (c, cb, triggerInfo, onComplete) {
            if (onComplete === void 0) { onComplete = null; }
            if (c) {
                var condition = c;
                var targetName = condition.targetName; //实例名称
                var isFamily = condition.isFamily; //是否是组
                var callTarget = condition.callTarget; //可能为实例，也可能为行为（模板）
                var callCondition = condition.callCondition;
                var callConditionName = condition.callConditionName;
                var isInvert = condition.isInvert;
                var paramClassName = condition.paramClassName; //参数实例名称（模板）
                var paramsInstance = condition.paramsInstance; //参数实例类（模板）
                var conditionIsTrigger = condition.isTrigger; //当前条件是否是触发
                var objectlist;
                //检测所有的目标   
                //重置当前总的条件状态
                condition.currentStatus = false;
                if (!cb.cs.instanceStatus)
                    cb.cs.instanceStatus = {};
                if (isFamily) {
                    //如果是组，那么，选取组中所有的对象
                    objectlist = this.curFamilys[targetName].insts;
                }
                else {
                    //非组中可能会出现单例
                    if (ls.isSingleInst(targetName))
                        objectlist = [ls.getInstanceByInstanceName(targetName)];
                    else {
                        objectlist = ls.World.getInstance().objectHash[targetName];
                    }
                }
                //如果条件本身是触发条件
                if (conditionIsTrigger) {
                    for (var k = 0; k < objectlist.length; k++) {
                        var instance = objectlist[k];
                        if (!cb.cs.instanceStatus[instance.u_id])
                            cb.cs.instanceStatus[instance.u_id] = { instance: instance, ccs: {} };
                        cb.cs.instanceStatus[instance.u_id].ccs[condition.index] = { c: condition, status: false };
                    }
                    if (triggerInfo && condition == triggerInfo.compareCondition) {
                        condition.currentStatus = true;
                        var triggerTargets = triggerInfo.triggerTargets;
                        if (triggerTargets) {
                            for (var i = 0; i < triggerTargets.length; i++) {
                                var _inst = triggerTargets[i];
                                if (!cb.cs.instanceStatus[_inst.u_id])
                                    cb.cs.instanceStatus[_inst.u_id] = { instance: _inst, ccs: {} };
                                cb.cs.instanceStatus[_inst.u_id].ccs[condition.index] = { c: condition, status: true };
                            }
                        }
                    }
                    else {
                        condition.currentStatus = false;
                    }
                }
                else {
                    for (var i = 0; i < objectlist.length; i++) {
                        var instance = objectlist[i];
                        var searchBehavior;
                        //如果调用的目标是行为
                        if (callTarget instanceof ls.BaseBehavior) {
                            var behaviors;
                            if (isFamily) {
                                if (triggerInfo && triggerInfo.familyVo)
                                    behaviors = triggerInfo.familyVo.behaviors;
                            }
                            else
                                behaviors = instance.behaviors;
                            //如果是行为，查找同名行为，这也意味着1个实例只有存在着同一个种行为，不能添加多种行为
                            for (var j = 0; j < behaviors.length; j++) {
                                var bh = behaviors[j];
                                if (bh.name == callTarget.name) {
                                    searchBehavior = bh;
                                    break;
                                }
                            }
                        }
                        //解析条件属性
                        this.decodeConditionProperties(c.event.index, c.index, paramsInstance);
                        //求解条件结果，这里的条件有可能是实例的条件，也有可能是行为的条件
                        //求解结果需要将所有的条件中包包含的目标存起来进行比较，否则，逻辑不正确
                        var rs = callCondition.apply(searchBehavior ? searchBehavior : instance, [paramsInstance]);
                        rs.status = (isInvert) ? !rs.status : rs.status;
                        //记录for循环
                        if (rs.data && (rs.data instanceof ls.ForEvent || rs.data instanceof ls.ForEachOrderEvent || rs.data instanceof ls.OnForEachArrayElementEvent))
                            cb.loopDatas[cb.loopLayers++] = rs.data;
                        if (!cb.cs.instanceStatus[instance.u_id])
                            cb.cs.instanceStatus[instance.u_id] = { instance: instance, ccs: {} };
                        cb.cs.instanceStatus[instance.u_id].ccs[condition.index] = { c: condition, status: rs.status };
                        if (rs.status)
                            condition.currentStatus = rs.status;
                    }
                }
                //如果下一个条件为或，那么，继续检测
                var nc = c.nextCondition;
                if (nc) {
                    this.execNextCondition(nc, cb, triggerInfo, onComplete);
                }
                else {
                    if (onComplete)
                        onComplete();
                }
            }
        };
        EventSheetDecoder.checkCollistions = function () {
            var world = ls.World.getInstance();
            var objectList = world.objectList;
            var collisionGroups = {};
            for (var targetName in this.collisionSearchs) {
                var coVo = this.collisionSearchs[targetName];
                var owners = world.objectHash[coVo.owerName];
                for (var ownerKey in owners) {
                    var ownerObject = owners[ownerKey];
                    if (!ownerObject.container.stage)
                        continue;
                    if (ownerObject.isDead)
                        continue;
                    if (!ownerObject.collision)
                        continue;
                    for (var i = 0; i < coVo.enemyNames.length; i++) {
                        var enemyName = coVo.enemyNames[i];
                        var enemys = world.objectHash[enemyName];
                        for (var enemyKey in enemys) {
                            var enemyObject = enemys[enemyKey];
                            if (!enemyObject.container.stage)
                                continue;
                            if (!enemyObject.collision)
                                continue;
                            if (enemyObject.isDead)
                                continue;
                            var colliding = ls.Collision.checkCollision(ownerObject, enemyObject);
                            if (colliding) {
                                if (collisionGroups[ownerObject.u_id] == null) {
                                    collisionGroups[ownerObject.u_id] = [ownerObject, enemyObject];
                                }
                                if (collisionGroups[enemyObject.u_id] == null) {
                                    collisionGroups[enemyObject.u_id] = [enemyObject, ownerObject];
                                }
                            }
                        }
                    }
                }
            }
            var isExecCollision = {};
            for (var i2 = 0; i2 < objectList.length; i2++) {
                if (objectList[i2] instanceof ls.AIDisplayObject) {
                    var inst = objectList[i2];
                    var targets = collisionGroups[inst.u_id];
                    if (targets != null) {
                        var target = targets[1];
                        var insertNums = 0;
                        if (isExecCollision[inst.u_id] == null) {
                            insertNums++;
                            isExecCollision[inst.u_id] = inst;
                        }
                        if (isExecCollision[target.u_id] == null) {
                            insertNums++;
                            isExecCollision[target.u_id] = target;
                        }
                        if (insertNums != 2) {
                            inst.setIsColliding(true, target);
                        }
                    }
                    else {
                        inst.setIsColliding(false, null);
                    }
                }
            }
        };
        EventSheetDecoder.execScenePauseOrPlay = function (type) {
            if (type == 0)
                ls.StartUp.stage.frameRate = 0.001;
            else
                ls.StartUp.stage.frameRate = 60;
        };
        EventSheetDecoder.destory = function () {
            this.curSceneInstancesData = []; //重置当前场景的实例列表
            this.curSceneEventsData = [];
            this.curSceneAiObjects = [];
            this.curSceneAiObjectsHash = {};
            this.curSceneEvents = [];
            this.triggerConditions = [];
            this.curFamilys = {};
            this.instancesConditions = {};
            ls.AISystem.instance.disableDataEvents = {};
            //全局变量不要销毁，除非主动销毁
            ls.GameUILayer.stage.removeEventListener(egret.Event.ENTER_FRAME, this.eventsheetRender, this);
        };
        EventSheetDecoder.curSceneInstancesData = []; //当前场景的实例列表
        EventSheetDecoder.curSceneEventsData = []; //当前场景的事件数据
        EventSheetDecoder.curSceneAiObjects = []; //当前场景的对象列表
        EventSheetDecoder.curSceneAiObjectsHash = {}; //当前场景的对象列表(以实例名字存储)
        EventSheetDecoder.curSceneEvents = []; //当前场景的事件列表 
        EventSheetDecoder.curFamilys = {}; //当前场景组列表
        EventSheetDecoder.eventSheets = {};
        EventSheetDecoder.collisionSearchs = {};
        EventSheetDecoder.collisionSearchs2 = {};
        EventSheetDecoder.lastTickTime = 0;
        EventSheetDecoder._tick = 60;
        EventSheetDecoder.testShape = new egret.Sprite();
        //存储触发条件，这样就不用每次都要用查找了,提升运行效率
        EventSheetDecoder.triggerConditions = [];
        EventSheetDecoder.instancesConditions = {};
        return EventSheetDecoder;
    }());
    ls.EventSheetDecoder = EventSheetDecoder;
    egret.registerClass(EventSheetDecoder,'ls.EventSheetDecoder');
})(ls || (ls = {}));
//# sourceMappingURL=EventSheetDecoder.js.map