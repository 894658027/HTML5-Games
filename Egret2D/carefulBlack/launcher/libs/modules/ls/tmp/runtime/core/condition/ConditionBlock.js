var ls;
(function (ls) {
    //条件块，条件块中包含1个逻辑列表的条件
    var ConditionBlock = (function () {
        function ConditionBlock() {
            //条件块当前的条件状态
            this.status = false;
            //当前条件所保存的数据，在执行动作的时候可以获取
            //一般情况下这个数据为空，像Array的forEachElement里就有
            this.loopDatas = [];
            //循环层数
            this.loopLayers = 0;
        }
        var d = __define,c=ConditionBlock,p=c.prototype;
        d(p, "loop"
            //获取这个条件块是否是循环模式
            ,function () {
                if (this.conditions == null)
                    return false;
                for (var i = 0; i < this.conditions.length; i++) {
                    var condition = this.conditions[i];
                    if (condition.loop)
                        return true;
                }
                return false;
            }
        );
        //执行动作
        //这里有个规则，父事件中过滤的目标参与到子事件中运算，而不是只是子事件中单独运算
        //@param searchInstances 查找的实例列表，有true,也有false
        p.execActions = function (searchInstances) {
            if (this.actions == null)
                return;
            // var instances: Array<AIObject> = [];
            // for (var key in searchInstances) {
            //     var _instance: AIObject = searchInstances[key];
            //     instances.push(searchInstances[key]);
            // }
            var instances = searchInstances;
            //每次执行动作的时候重置上次选择的列表
            this.lastActionResults = [];
            for (var i = 0; i < this.actions.length; i++) {
                var action = this.actions[i];
                action.lastLoopSelectInstances = [];
            }
            if (this.loopDatas && this.loopDatas.length > 0) {
                if (this.loopDatas.length > 3) {
                    ls.assert(true, "不支持三层以上循环！！！");
                }
                else {
                    var layer0Data = this.loopDatas[0];
                    var layer1Data = this.loopDatas[1];
                    var layer2Data = this.loopDatas[2];
                    //判断是否有for each循环，如果有的话，排序
                    if (layer0Data && layer0Data instanceof ls.ForEachOrderEvent)
                        instances = this.execForEach(layer0Data, instances);
                    if (layer1Data && layer1Data instanceof ls.ForEachOrderEvent)
                        instances = this.execForEach(layer1Data, instances);
                    if (layer2Data && layer2Data instanceof ls.ForEachOrderEvent)
                        instances = this.execForEach(layer2Data, instances);
                    if (layer0Data && layer0Data instanceof ls.ForEvent) {
                        var startIndex0 = +ls.eval_e(layer0Data.startIndex);
                        var endIndex0 = +ls.eval_e(layer0Data.endIndex);
                        var ikey = layer0Data.name;
                        for (var i = startIndex0; ((startIndex0 >= endIndex0) ? i >= endIndex0 : i <= endIndex0); ((startIndex0 <= endIndex0) ? i++ : i--)) {
                            ls.loopIndex[ikey] = i;
                            if (layer1Data && layer1Data instanceof ls.ForEvent) {
                                var startIndex1 = +ls.eval_e(layer1Data.startIndex);
                                var endIndex1 = +ls.eval_e(layer1Data.endIndex);
                                var jkey = layer1Data.name;
                                for (var j = startIndex1; ((startIndex1 >= endIndex1) ? j >= endIndex1 : j <= endIndex1); ((startIndex1 <= endIndex1) ? j++ : j--)) {
                                    ls.loopIndex[jkey] = j;
                                    if (layer2Data && layer2Data instanceof ls.ForEvent) {
                                        var startIndex2 = +ls.eval_e(layer2Data.startIndex);
                                        var endIndex2 = +ls.eval_e(layer2Data.endIndex);
                                        var kkey = layer2Data.name;
                                        for (var k = startIndex2; ((startIndex2 >= endIndex2) ? k >= endIndex2 : k <= endIndex2); ((startIndex2 <= endIndex2) ? k++ : k--)) {
                                            ls.loopIndex[kkey] = k;
                                            this.execLoopAction(true, instances, k);
                                        }
                                    }
                                    else {
                                        this.execLoopAction(true, instances, j);
                                    }
                                }
                            }
                            else {
                                this.execLoopAction(true, instances, i);
                            }
                        }
                    }
                    else if (layer0Data && layer0Data instanceof ls.OnForEachArrayElementEvent) {
                        //遍历元素
                        var arrayElementEvent = layer0Data;
                        var array = arrayElementEvent.array;
                        if (array) {
                            var dims = ls.eval_e(arrayElementEvent.xyzDimention);
                            switch (dims) {
                                case 1:
                                    for (var i = 0; i < array.width; i++) {
                                        array.curX = i;
                                        this.execLoopAction(true, instances, i);
                                        array.curValue = array.at(i, 0, 0);
                                    }
                                    break;
                                case 2:
                                    for (var i = 0; i < array.width; i++) {
                                        for (var j = 0; j < array.height; j++) {
                                            array.curX = i;
                                            array.curY = j;
                                            this.execLoopAction(true, instances, i);
                                            array.curValue = array.at(i, j, 0);
                                        }
                                    }
                                    break;
                                case 3:
                                    for (var i = 0; i < array.width; i++) {
                                        for (var j = 0; j < array.height; j++) {
                                            for (var k = 0; k < array.depth; k++) {
                                                array.curX = i;
                                                array.curY = j;
                                                array.curZ = k;
                                                this.execLoopAction(true, instances, i);
                                                array.curValue = array.at(i, j, k);
                                            }
                                        }
                                    }
                                    break;
                                default:
                                    ls.assert(true, "无法解析当前数组维数：" + dims);
                                    break;
                            }
                        }
                    }
                }
            }
            else {
                this.execLoopAction(false, instances, 0);
            }
        };
        p.execForEach = function (data, instances) {
            var object = data.object;
            var order = ls.eval_e(data.order);
            var list = ls.World.getInstance().objectHash[object.name];
            var computedResults = [];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var computeInstance = list[i];
                    if (this.instancesStatus[computeInstance.u_id] && this.instancesStatus[computeInstance.u_id].status)
                        computedResults.push(computeInstance);
                }
                //如果求目标的表达式不是循环列表中的。那么，不进行排序
                var searchIndex = -1;
                for (var i = 0; i < computedResults.length; i++) {
                    var name = computedResults[i].name;
                    searchIndex = data.expression.indexOf(name);
                    if (searchIndex != -1) {
                        break;
                    }
                }
                if (searchIndex != -1) {
                    //进行排序
                    computedResults.sort(function (a, b) {
                        ls.lakeshoreInst()[a.name] = a;
                        var valueA = +(ls.eval_e(data.expression));
                        valueA = valueA || 0;
                        ls.lakeshoreInst()[b.name] = b;
                        var valueB = +(ls.eval_e(data.expression));
                        valueB = valueB || 0;
                        if (order === 0) {
                            if (valueA > valueB)
                                return 1;
                            else if (valueA < valueB)
                                return -1;
                            else
                                return 0;
                        }
                        else {
                            if (valueA > valueB)
                                return -1;
                            else if (valueA < valueB)
                                return 1;
                            else
                                return 0;
                        }
                    });
                }
                //将instances中含有该名字的对象删除
                for (var i = 0; i < instances.length; i++) {
                    var __instance = instances[i];
                    if (__instance.name == object.name)
                        instances.splice(i, 1);
                }
                //将新的结果加入进来
                instances = instances.concat(computedResults);
            }
            return instances;
        };
        //instances为所有条件成立的实例
        p.execLoopAction = function (isloop, instances, loopIndex) {
            if (loopIndex === void 0) { loopIndex = 0; }
            this.event.execActionIndex = 0;
            if (this.actions.length > 0)
                this.execLoopNextAction(this.actions[this.event.execActionIndex], isloop, instances, loopIndex);
        };
        /** 执行下一个动作 */
        p.execLoopNextAction = function (action, isloop, instances, loopIndex) {
            if (loopIndex === void 0) { loopIndex = 0; }
            if (this.event.execActionIndex >= this.actions.length) {
                return;
            }
            var world = ls.World.getInstance();
            var callTarget = action.callTarget; //目标有可能是实例，有可能是行为实例
            var targetName = callTarget.name;
            var callParams = ls.EventSheetDecoder.decodeActionParams(action).params;
            var callHanlderName = action.callHanlderName;
            var actionResult = false;
            if (callHanlderName == "wait") {
                var time = ls.eval_e(callParams[0]);
                if (typeof time != "number") {
                    time = 0;
                }
                egret.setTimeout(function (isloop, instances) {
                    this.event.execActionIndex++;
                    this.execLoopNextAction(this.actions[this.event.execActionIndex], isloop, instances);
                }, this, time * 1000, isloop, instances);
                return;
            }
            //注册过滤的目标给windows
            for (var m = 0; m < instances.length; m++) {
                ls.lakeshoreInst()[instances[m].name] = instances[m];
            }
            //动作参数列表中可能有需要选取的实例，这里通过传递过来的过滤目标来进一步过滤
            var paramTargetInstances = [];
            for (var j = 0; j < callParams.length; j++) {
                var param = callParams[j];
                if (param instanceof ls.AIObject) {
                    for (var k = 0; k < instances.length; k++) {
                        var instance = instances[k];
                        if (instance.name == param.name) {
                            //注册给windows
                            ls.lakeshoreInst()[instance.name] = instance;
                            paramTargetInstances.push(instance);
                            break;
                        }
                    }
                }
            }
            //行为实例
            if (callTarget instanceof ls.BaseBehavior)
                targetName = action.targetName;
            var needComputedInstances = [];
            if (ls.isSingleInst(targetName)) {
                needComputedInstances = [ls.getInstanceByInstanceName(targetName)];
            }
            else {
                //查找前面的条件列表中是否有与当前目标名字相同并且状态为真的对象，如果有，则取条件列表中的对象，否则取目标列表中的对象
                if (action.isFamily) {
                    //过滤之后与组内实例进行比较
                    var familys = ls.EventSheetDecoder.curFamilys[action.callTarget];
                    for (var j = 0; j < instances.length; j++) {
                        var instance = instances[j];
                        ls.lakeshoreInst()[instance.name] = instance;
                        for (var i = 0; i < familys.insts.length; i++) {
                            var familyInstance = familys.insts[i];
                            if (familyInstance.name == instance.name) {
                                needComputedInstances.push(instance);
                            }
                        }
                    }
                    //如果在条件列表中没有查到符合要求的对象，则取组内列表中的对象
                    if (needComputedInstances.length === 0) {
                        for (var m = 0; m < familys.insts.length; m++) {
                            var familyInstance = familys.insts[m];
                            var list = world.objectHash[familyInstance.name];
                            for (var n = 0; n < list.length; n++) {
                                var _instance_ = list[n];
                                //if (_instance_.selfStatus)
                                needComputedInstances.push(_instance_);
                            }
                        }
                    }
                }
                else {
                    //将目标进行过滤
                    for (var j = 0; j < instances.length; j++) {
                        var instance = instances[j];
                        if (instance.name == targetName) {
                            //注册过滤出来的目标列表
                            ls.lakeshoreInst()[instance.name] = instance;
                            needComputedInstances.push(instance);
                        }
                    }
                    //如果在条件列表中没有查到符合要求的对象，且在当前事件中没有被计算过，则取目标全局列表中同名且状态为真的对象
                    if (needComputedInstances.length === 0) {
                        if (!this.event.computeTargets[targetName]) {
                            var list = world.objectHash[targetName];
                            if (list) {
                                for (var j = 0; j < list.length; j++) {
                                    var _instance_ = list[j];
                                    needComputedInstances.push(_instance_);
                                }
                            }
                            else {
                                console.error("没有查到目标【" + targetName + "】实例列表！！");
                            }
                        }
                    }
                }
            }
            //如果找到了上一次的,再查找在需要计算的实例列表中是否有
            var isSeachLast = false;
            if (this.lastActionResults && this.lastActionResults.length > 0) {
                for (var j = 0; j < needComputedInstances.length; j++) {
                    var needInstance = needComputedInstances[j];
                    for (var k = this.lastActionResults.length - 1; k >= 0; k--) {
                        var actionInstance = this.lastActionResults[k];
                        if (needInstance == actionInstance) {
                            isSeachLast = true;
                            break;
                        }
                    }
                }
                if (isSeachLast)
                    needComputedInstances = this.lastActionResults;
            }
            //执行动作
            if (needComputedInstances.length > 0) {
                //检测当前条件块中是否有循环数据
                var actionComputeResults = this.execSingleAction(action, needComputedInstances, loopIndex);
                if (actionComputeResults && actionComputeResults.length > 0)
                    this.lastActionResults = actionComputeResults;
                else
                    this.lastActionResults = [];
            }
            this.event.execActionIndex++;
            //执一个动作完毕之后，执行下一个动作
            this.execLoopNextAction(this.actions[this.event.execActionIndex], isloop, instances, loopIndex);
        };
        /**执行单独的动作 */
        p.execSingleAction = function (action, computedInstances, loopIndex) {
            if (loopIndex === void 0) { loopIndex = 0; }
            var callTarget = action.callTarget; //目标有可能是实例，有可能是行为实例
            var targetName = callTarget.name;
            var callHanlderName = action.callHanlderName;
            var actionParams = ls.EventSheetDecoder.decodeActionParams(action);
            var callParams = actionParams.params;
            var isFamilys = actionParams.isFamilys;
            for (var i = 0; i < computedInstances.length; i++) {
                var instance = computedInstances[i];
                if (instance.isDead)
                    continue;
                //保存应用动作函数的实例，可能是普通实例，也可能是行为实例
                var execActionInstance;
                //行为
                if (callTarget instanceof ls.BaseBehavior) {
                    var behaviors = instance.behaviors;
                    for (var j = 0; j < behaviors.length; j++) {
                        var behavior = behaviors[j];
                        if (behavior.name == callTarget.name) {
                            execActionInstance = behavior;
                            break;
                        }
                    }
                }
                else {
                    execActionInstance = instance;
                }
                //请求调用的行为方法
                var callHanlder = execActionInstance[callHanlderName];
                if (callHanlder) {
                    //重新给windows注册一遍
                    //特殊情况不能注册，否则，与系统api冲突
                    //只有显示对象才注册
                    if (callTarget instanceof ls.AIObject) {
                        if (execActionInstance.name != "WebSocket")
                            ls.lakeshoreInst()[execActionInstance.name] = execActionInstance;
                    }
                    if (actionParams.hasFamily) {
                        //为了满足常用需求，组动作里随机执行
                        for (var n = 0; n < callParams.length; n++) {
                            var _isFamily = isFamilys[n];
                            if (_isFamily) {
                                var familyName = callParams[n];
                                var curFamilyVo = ls.EventSheetDecoder.curFamilys[familyName];
                                callParams[n] = curFamilyVo.insts[Math.floor(curFamilyVo.insts.length * Math.random())];
                            }
                        }
                        var results = callHanlder.apply(execActionInstance, callParams);
                    }
                    else {
                        var results = callHanlder.apply(execActionInstance, callParams);
                    }
                    if (results != undefined)
                        action.lastLoopSelectInstances[loopIndex] = results;
                    else
                        action.lastLoopSelectInstances[loopIndex] = [];
                }
            }
            return action.lastLoopSelectInstances[loopIndex];
        };
        return ConditionBlock;
    }());
    ls.ConditionBlock = ConditionBlock;
    egret.registerClass(ConditionBlock,'ls.ConditionBlock');
})(ls || (ls = {}));
//# sourceMappingURL=ConditionBlock.js.map