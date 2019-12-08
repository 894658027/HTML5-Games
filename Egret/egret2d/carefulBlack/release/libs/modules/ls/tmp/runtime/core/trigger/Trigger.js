var ls;
(function (ls) {
    var Trigger = (function () {
        function Trigger() {
        }
        var d = __define,c=Trigger,p=c.prototype;
        Trigger.register = function (target) {
            target.addEventListener(ls.TriggerEvent.TRIGGER, this.onTrigger, this);
        };
        Trigger.removeTrigger = function (target) {
            target.removeEventListener(ls.TriggerEvent.TRIGGER, this.onTrigger, this);
        };
        Trigger.removeAllTriggers = function () {
            for (var i = 0, len = ls.World.getInstance().objectList.length; i < len; i++)
                this.removeTrigger(ls.World.getInstance().objectList[i]);
        };
        Trigger.onTrigger = function (event) {
            var disableDataEvents = ls.AISystem.instance.disableDataEvents;
            //检测是否屏蔽触发事件
            //时间复杂度O(n),以前的时间复杂度为O(n3)
            var triggerConditions = ls.EventSheetDecoder.triggerConditions;
            //通知触发条件执行的目标（可能是普通实例，也可能是行为实例）
            var target = event.target;
            var isBehaviorInstance = target instanceof ls.BaseBehavior;
            for (var i = 0; i < triggerConditions.length; i++) {
                //可能存在多个同名的条件，因为不同的事件及条件块中可能会编辑同样的名字的条件
                //每个条件都有自己独立的计算
                var condition = triggerConditions[i];
                if (disableDataEvents[condition.event.index + 1] == undefined) {
                    if (condition.callCondition == event.triggerCondition) {
                        //这里先分类成family与普通
                        if (condition.isFamily) {
                            if (isBehaviorInstance) {
                                var searchInst = null;
                                var targets = ls.EventSheetDecoder.curFamilys[condition.targetName].insts;
                                if (targets) {
                                    for (var s = 0; s < targets.length; s++) {
                                        var si = targets[s];
                                        if (si.name == target.inst.name) {
                                            searchInst = si;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    ls.assert(true, "组触发条件目标查找失败,组名：" + condition.targetName);
                                }
                                //组行为
                                if (searchInst) {
                                    var familyVo = ls.EventSheetDecoder.curFamilys[condition.targetName];
                                    if (event.triggerData) {
                                        //比较触发条件的参数是否一致，只有一致，才会执行触发
                                        var paramsInstance = condition.paramsInstance;
                                        var data = paramsInstance.data;
                                        var childrens = data.children;
                                        var isFind = false;
                                        if (childrens && childrens.length > 0) {
                                            for (var j = 0; j < childrens.length; j++) {
                                                var o = childrens[j];
                                                if (event.triggerData == o["$value"]) {
                                                    isFind = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (isFind) {
                                            var triggerInfo = { triggerTargets: [searchInst], behaviorTarget: target, compareCondition: condition, familyVo: familyVo };
                                            ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                        }
                                    }
                                    else {
                                        var triggerInfo = { triggerTargets: [searchInst], behaviorTarget: target, compareCondition: condition, familyVo: familyVo };
                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                    }
                                }
                            }
                            else {
                                var searchInst = null;
                                var targets = ls.EventSheetDecoder.curFamilys[condition.targetName].insts;
                                if (targets) {
                                    for (var s = 0; s < targets.length; s++) {
                                        var si = targets[s];
                                        if (si.name == target.name) {
                                            searchInst = si;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    ls.assert(true, "组触发条件目标查找失败,组名：" + condition.targetName);
                                }
                                if (searchInst) {
                                    if (event.triggerData) {
                                        //比较触发条件的参数是否一致，只有一致，才会执行触发
                                        var paramsInstance = condition.paramsInstance;
                                        var data = paramsInstance.data;
                                        var childrens = data.children;
                                        var isFind = false;
                                        if (childrens && childrens.length > 0) {
                                            for (var j = 0; j < childrens.length; j++) {
                                                var o = childrens[j];
                                                if (condition.callConditionName == "onCollisionWithOtherObject") {
                                                    if (event.triggerData.name == o["$value"]) {
                                                        isFind = true;
                                                        var triggerInfo = { triggerTargets: [searchInst, event.triggerData], compareCondition: condition };
                                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                        break;
                                                    }
                                                }
                                                else {
                                                    if (event.triggerData == o["$value"]) {
                                                        isFind = true;
                                                        var triggerInfo = { triggerTargets: [searchInst], compareCondition: condition };
                                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        var triggerInfo = { triggerTargets: [searchInst], compareCondition: condition };
                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                    }
                                }
                            }
                        }
                        else {
                            if (isBehaviorInstance) {
                                if (condition.callTarget.name == target.name && condition.targetName == target.inst.name) {
                                    if (event.triggerData) {
                                        //比较触发条件的参数是否一致，只有一致，才会执行触发
                                        var paramsInstance = condition.paramsInstance;
                                        var data = paramsInstance.data;
                                        var childrens = data.children;
                                        var isFind = false;
                                        if (childrens && childrens.length > 0) {
                                            for (var j = 0; j < childrens.length; j++) {
                                                var o = childrens[j];
                                                if (event.triggerData == o["$value"]) {
                                                    isFind = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (isFind) {
                                            var triggerInfo = { triggerTargets: [target.inst], compareCondition: condition, behaviorTarget: target };
                                            ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                        }
                                    }
                                    else {
                                        var triggerInfo = { triggerTargets: [target.inst], compareCondition: condition, behaviorTarget: target };
                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                    }
                                }
                            }
                            else {
                                var searchInst = null;
                                if (condition.targetName == target.name)
                                    searchInst = target;
                                if (searchInst) {
                                    if (event.triggerData) {
                                        //比较触发条件的参数是否一致，只有一致，才会执行触发
                                        var paramsInstance = condition.paramsInstance;
                                        //事件也可能为family，因此，需要作特殊处理
                                        var data = paramsInstance.data;
                                        var childrens = data.children;
                                        var isFind = false;
                                        if (childrens && childrens.length > 0) {
                                            for (var j = 0; j < childrens.length; j++) {
                                                var o = childrens[j];
                                                if (condition.callConditionName == "onCollisionWithOtherObject") {
                                                    if (paramsInstance.isFamily) {
                                                        var familyVo = ls.EventSheetDecoder.curFamilys[o["$value"]];
                                                        if (familyVo.insts) {
                                                            for (var fk = 0; fk < familyVo.insts.length; fk++) {
                                                                if (event.triggerData.name == familyVo.insts[fk].name) {
                                                                    isFind = true;
                                                                    var triggerInfo = { triggerTargets: [searchInst, event.triggerData], compareCondition: condition };
                                                                    ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (event.triggerData.name == o["$value"]) {
                                                            isFind = true;
                                                            var triggerInfo = { triggerTargets: [searchInst, event.triggerData], compareCondition: condition };
                                                            ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                            break;
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (event.triggerData == o["$value"]) {
                                                        isFind = true;
                                                        var triggerInfo = { triggerTargets: [searchInst], compareCondition: condition };
                                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        var triggerInfo = { triggerTargets: [searchInst], compareCondition: condition };
                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        return Trigger;
    }());
    ls.Trigger = Trigger;
    egret.registerClass(Trigger,'ls.Trigger');
})(ls || (ls = {}));
//# sourceMappingURL=Trigger.js.map