var ls;
(function (ls) {
    var TurretBehaivor = (function (_super) {
        __extends(TurretBehaivor, _super);
        function TurretBehaivor() {
            _super.call(this);
            this.range = 300;
            //发射的频率(几秒钟发射1次)
            this.rateOfFire = 1;
            this.rotateSpeed = 1;
            //首先进入视野的对象0（First In range） 最近的（Nearest)1  群发（All In range)2 自定义优先级3，
            this.targetMode = 1;
            this.turretTargets = {};
            this.lastCheckTime = 0;
            this.firstTickWidhTarget = false;
            this.oldTargetX = 0;
            this.oldTargetY = 0;
            this.sortMode = 1; //1：升序排列，2：降序排列
        }
        var d = __define,c=TurretBehaivor,p=c.prototype;
        //先clone，再创建
        p.onCreate = function () {
            this.currentTarget = null;
            this.range = ls.eval_e(this.range);
            this.rateOfFire = ls.eval_e(this.rateOfFire);
            this.rotateSpeed = ls.eval_e(this.rotateSpeed);
            this.targetMode = ls.eval_e(this.targetMode);
            this.sortMode = ls.eval_e(this.sortMode);
            ls.assert(typeof this.range !== "number" || typeof this.rateOfFire !== "number" || typeof this.rotateSpeed !== "number", "TurretBehaivor parameter type incorrect!!");
        };
        p.tick = function () {
            if (this.turretTargets == null)
                return;
            if (this.currentTarget && this.currentTarget.isDead) {
                this.currentTarget = null;
                return;
            }
            if (this.currentTarget && !this.isInRange(this.inst, this.currentTarget)) {
                this.currentTarget = null;
                return;
            }
            var nowTime = egret.getTimer();
            if (nowTime - this.lastCheckTime >= 0.1) {
                this.lastCheckTime = nowTime;
                //第1次进入视野的对象
                if (this.targetMode == 0 && !this.currentTarget) {
                    this.lookForFirstTarget();
                    //如果发现了目标，那么，执行触发
                    if (this.currentTarget) {
                        this.firstTickWidhTarget = true;
                        this.oldTargetX = this.currentTarget.x;
                        this.oldTargetY = this.currentTarget.y;
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTargetAcquired));
                    }
                }
                else if (this.targetMode == 1) {
                    //如果有更近的目标，那么替换
                    var oldTarget = this.currentTarget;
                    this.lookForNearestTarget();
                    //逻辑类似TabBar切换
                    if (this.currentTarget != oldTarget && this.currentTarget) {
                        this.firstTickWidhTarget = true;
                        this.oldTargetX = this.currentTarget.x;
                        this.oldTargetY = this.currentTarget.y;
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTargetAcquired));
                    }
                }
                else if (this.targetMode == 2) {
                }
                else if (this.targetMode == 3) {
                    this.lookForCustomTarget();
                    //如果发现了目标，那么，执行触发
                    if (this.currentTarget) {
                        this.firstTickWidhTarget = true;
                        this.oldTargetX = this.currentTarget.x;
                        this.oldTargetY = this.currentTarget.y;
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTargetAcquired));
                    }
                }
                //开始旋转
                if (this.targetMode == 2) {
                    //寻找视野范围内的所有目标列表
                    //取平均角度
                    var targets = this.lookForAllTarget();
                    if (targets.length > 0) {
                        var angles = 0;
                        for (var i = 0, len = targets.length; i < len; i++) {
                            var inst = targets[i];
                            angles += ls.MathUtils.toAngle(Math.atan2(inst.y - this.inst.y, inst.x - this.inst.x));
                        }
                        var newAngle = angles / targets.length;
                        if (isNaN(newAngle))
                            return;
                        if (this.inst.angle != newAngle) {
                            this.inst.angle = newAngle;
                        }
                    }
                }
                else {
                    if (this.currentTarget) {
                        var targetAngle = ls.MathUtils.angleTo(this.inst.x, this.inst.y, this.currentTarget.x, this.currentTarget.y);
                        var newAngle = ls.MathUtils.angleRotate(this.inst.angle, targetAngle, this.rotateSpeed);
                        if (isNaN(newAngle))
                            return;
                        if (this.inst.angle != newAngle) {
                            this.inst.angle = newAngle;
                        }
                    }
                }
                //根据发射频率执行
                if (this.inst["oldTurretTime"] == undefined)
                    this.inst["oldTurretTime"] = 0;
                if (nowTime - this.inst["oldTurretTime"] >= this.rateOfFire * 1000) {
                    if (this.targetMode != 2) {
                        if (this.currentTarget) {
                            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onShoot));
                        }
                    }
                    else {
                        for (var j = 0; j < targets.length; j++) {
                            var inst = targets[j];
                            inst.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onShoot));
                        }
                    }
                    this.inst["oldTurretTime"] = nowTime;
                }
            }
        };
        p.isInRange = function (inst, $obj) {
            var dx = $obj.x - inst.x;
            var dy = $obj.y - inst.y;
            return (dx * dx + dy * dy < this.range * this.range) ? [this] : null;
        };
        //寻找第1个目标
        p.lookForFirstTarget = function () {
            //暂时采用遍历全部目标来算
            for (var targetKey in this.turretTargets) {
                var objectList = ls.World.getInstance().objectHash[this.turretTargets[targetKey].name];
                for (var key in objectList) {
                    var inst = objectList[key];
                    if (inst.isDead)
                        continue;
                    if (this.isInRange(this.inst, inst) && inst != this.inst) {
                        this.currentTarget = inst;
                        return;
                    }
                }
            }
        };
        //寻找最近的目标
        p.lookForNearestTarget = function () {
            //暂时采用遍历全部目标来算
            var nearest = Number.MAX_VALUE;
            for (var targetKey in this.turretTargets) {
                var objectList = ls.World.getInstance().objectHash[this.turretTargets[targetKey].name];
                //检测所有的对象，并渲染其行为
                var closestDis = this.range * this.range;
                for (var key in objectList) {
                    var inst = objectList[key];
                    if (this.inst == inst)
                        continue;
                    if (inst.isDead)
                        continue;
                    var dx = this.inst.x - inst.x;
                    var dy = this.inst.y - inst.y;
                    var dist = dx * dx + dy * dy;
                    if (dist < closestDis) {
                        if (nearest >= dist) {
                            closestDis = dist;
                            this.currentTarget = inst;
                            nearest = dist;
                        }
                    }
                }
            }
        };
        //寻找自定义优先级目标
        p.lookForCustomTarget = function () {
            //暂时采用遍历全部目标来算
            var allList = [];
            for (var targetKey in this.turretTargets) {
                var objectList = ls.World.getInstance().objectHash[this.turretTargets[targetKey].name];
                allList = allList.concat(objectList);
            }
            if (allList.length > 0) {
                //排除掉不在范围的对象
                var inRangeList = [];
                var closestDis = this.range * this.range;
                for (var i = 0; i < allList.length; i++) {
                    if (this.isInRange(this.inst, allList[i]) && !allList[i].isDead) {
                        inRangeList.push(allList[i]);
                    }
                }
                if (inRangeList.length == 0) {
                    this.currentTarget = null;
                    return;
                }
                if (inRangeList[0][this.compareInstanceVariables] != undefined) {
                    //升序排列
                    inRangeList.sort(function (a, b) {
                        var aValue = a[this.compareInstanceVariables];
                        var bValue = b[this.compareInstanceVariables];
                        if (aValue > bValue)
                            return 1;
                        else if (aValue < bValue)
                            return -1;
                        else
                            return 0;
                    });
                    this.currentTarget = (this.sortMode == 1) ? inRangeList[0] : inRangeList.reverse()[0];
                }
            }
        };
        //寻找所有的目标
        p.lookForAllTarget = function () {
            //暂时采用遍历全部目标来算
            for (var targetKey in this.turretTargets) {
                var objectList = ls.World.getInstance().objectHash[this.turretTargets[targetKey].name];
                var allTargets = [];
                for (var key in objectList) {
                    var inst = objectList[key];
                    if (this.isInRange(this.inst, inst) && inst != this.inst) {
                        allTargets.push(inst);
                    }
                }
                this.currentTargets = allTargets;
                return allTargets;
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.hasTarget = function ($hasTargetEvent) {
            if (this.targetMode != 2) {
                if (this.currentTarget)
                    return { instances: [this.currentTarget, this.inst], status: !!this.currentTarget };
                else
                    return { instances: [this.inst], status: false };
            }
            else {
                if (this.currentTargets)
                    return { instances: this.currentTargets, status: this.currentTargets.length != 0 };
                else
                    return { instances: [this.inst], status: false };
            }
        };
        //once tigger
        p.onShoot = function ($turretOnShootEvent) {
            if (this.targetMode != 2) {
                if (this.currentTarget == null) {
                    return { instances: [this.inst], status: false };
                }
                return { instances: [this.inst, this.currentTarget], status: true };
            }
            else {
                if (this.currentTargets)
                    return { instances: this.currentTargets, status: true };
                else
                    return { instances: [this.inst], status: false };
            }
        };
        //获取发射目标时触发
        p.onTargetAcquired = function ($onTargetAcquiredEvent) {
            return { instances: [this.inst], status: true };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.acquireTarget = function () {
        };
        p.addTarget = function ($target) {
            if ($target == null)
                return;
            if (this.turretTargets[$target.u_id] == null) {
                this.turretTargets[$target.u_id] = $target;
            }
        };
        p.clearTarget = function ($target) {
            if ($target == null)
                return;
            delete this.turretTargets[$target.u_id];
        };
        p.clearAllTargets = function () {
            this.turretTargets = {};
        };
        p.unacquireTarget = function () {
        };
        p.setRange = function ($range) {
            this.range = ls.eval_e($range);
            ls.assert(typeof this.range !== "number", "TurretBehaivor setRange parameter type incorrect!!");
        };
        p.setRateOfFire = function ($rateOfFire) {
            this.rateOfFire = ls.eval_e($rateOfFire);
            ls.assert(typeof this.rateOfFire !== "number", "TurretBehaivor setRateOfFire parameter type incorrect!!");
        };
        p.setRotateSpeed = function ($rotateSpeed) {
            this.rotateSpeed = ls.eval_e($rotateSpeed);
            ls.assert(typeof this.rotateSpeed !== "number", "TurretBehaivor setRotateSpeed parameter type incorrect!!");
        };
        p.setTargetMode = function ($targetMode, $instanceVariables) {
            if ($instanceVariables === void 0) { $instanceVariables = ""; }
            this.targetMode = ls.eval_e($targetMode);
            ls.assert(typeof this.targetMode !== "number", "TurretBehaivor setTargetMode parameter type incorrect!!");
            this.compareInstanceVariables = $instanceVariables;
            ls.assert($targetMode == 3 && ($instanceVariables == null || $instanceVariables == ""), "TurretBehaivor setTargetMode $instanceVariables not null!");
        };
        p.setSortMode = function ($sortMode) {
            this.sortMode = ls.eval_e($sortMode);
            ls.assert(typeof this.sortMode !== "number", "TurretBehaivor setSortMode parameter type incorrect!!");
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.range = this.range;
            o.rateOfFire = this.rateOfFire;
            o.rotateSpeed = this.rotateSpeed;
            o.targetMode = this.targetMode;
            o.useCollisionCells = this.useCollisionCells;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.range = o.range;
                this.rateOfFire = o.rateOfFire;
                this.rotateSpeed = o.rotateSpeed;
                this.targetMode = o.targetMode;
                this.useCollisionCells = o.useCollisionCells;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.range = this.range;
            bh.rateOfFire = this.rateOfFire;
            bh.rotateSpeed = this.rotateSpeed;
            bh.targetMode = this.targetMode;
            bh.useCollisionCells = this.useCollisionCells;
            return bh;
        };
        return TurretBehaivor;
    }(ls.BaseBehavior));
    ls.TurretBehaivor = TurretBehaivor;
    egret.registerClass(TurretBehaivor,'ls.TurretBehaivor');
    var B_Turret_hasTargetEvent = (function (_super) {
        __extends(B_Turret_hasTargetEvent, _super);
        function B_Turret_hasTargetEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=B_Turret_hasTargetEvent,p=c.prototype;
        return B_Turret_hasTargetEvent;
    }(ls.BaseEvent));
    ls.B_Turret_hasTargetEvent = B_Turret_hasTargetEvent;
    egret.registerClass(B_Turret_hasTargetEvent,'ls.B_Turret_hasTargetEvent');
    var B_Turret_OnShootEvent = (function (_super) {
        __extends(B_Turret_OnShootEvent, _super);
        function B_Turret_OnShootEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=B_Turret_OnShootEvent,p=c.prototype;
        return B_Turret_OnShootEvent;
    }(ls.BaseEvent));
    ls.B_Turret_OnShootEvent = B_Turret_OnShootEvent;
    egret.registerClass(B_Turret_OnShootEvent,'ls.B_Turret_OnShootEvent');
    var B_Turret_OnTargetAcquiredEvent = (function (_super) {
        __extends(B_Turret_OnTargetAcquiredEvent, _super);
        function B_Turret_OnTargetAcquiredEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=B_Turret_OnTargetAcquiredEvent,p=c.prototype;
        return B_Turret_OnTargetAcquiredEvent;
    }(ls.BaseEvent));
    ls.B_Turret_OnTargetAcquiredEvent = B_Turret_OnTargetAcquiredEvent;
    egret.registerClass(B_Turret_OnTargetAcquiredEvent,'ls.B_Turret_OnTargetAcquiredEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map