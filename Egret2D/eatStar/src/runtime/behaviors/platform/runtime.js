var ls;
(function (ls) {
    var PlatformBehaivor = (function (_super) {
        __extends(PlatformBehaivor, _super);
        function PlatformBehaivor() {
            _super.call(this);
            this.ANIMMODE_STOPPED = 0; //停止移动
            this.ANIMMODE_MOVING = 1; //移动
            this.ANIMMODE_JUMPING = 2; //跳
            this.ANIMMODE_FALLING = 3; //下落
            this.leftkey = false; //左键是否按下
            this.rightkey = false; //右键是否按下
            this.jumpkey = false; //跳键（上键）是否按下
            this.jumped = false; //是否处于跳下
            this.doubleJumped = false; //是否处于二级跳
            this.canDoubleJump = false; //是否支持二级跳
            this.ignoreInput = false; //是否忽略输入
            this.simleft = false;
            this.simright = false;
            this.simjump = false;
            this.loadFloorObject = -1;
            this.lastFloorX = 0; //上一次碰到地板的水平坐标
            this.lastFloorY = 0; //上一次碰到地板的垂直坐标
            this.floorIsJumpthru = false; //是否穿透
            this.animMode = this.ANIMMODE_STOPPED;
            this.fallthrough = 0; //掉落穿透JumpThru，如果大于零，则不能穿透
            this.firstTick = true; //是否是第一次tick
            this.dx = 0; //水平移动像素
            this.dy = 0; //垂直移动像素
            this.moveDirStatus = Number.MAX_VALUE;
            this.isMove = false;
            this.maxspeed = 330; //最大速度
            this.acc = 1500; //加速度
            this.dec = 1500; //减速度
            this.jumpStrength = 650; //跳的力度
            this.g = 1500; //重力加速度
            this.maxFall = 1000; //最大下降速度
            this.enableDoubleJump = 0; //是否支持二级跳
            this.jumpSustain = 0; //维持跳的时间
            this.defaultControls = 1; //默认是否开启控制
            this.enabled = 1;
        }
        var d = __define,c=PlatformBehaivor,p=c.prototype;
        p.onCreate = function () {
            if (this.inst != null && this.enabled)
                this.inst.platformEnabled = true;
            else
                this.inst.platformEnabled = false;
            this.maxspeed = ls.eval_e(this.maxspeed);
            this.acc = ls.eval_e(this.acc);
            this.dec = ls.eval_e(this.dec);
            this.jumpStrength = ls.eval_e(this.jumpStrength);
            this.g = ls.eval_e(this.g);
            this.g1 = this.g;
            this.maxFall = ls.eval_e(this.maxFall);
            this.enableDoubleJump = ls.eval_e(this.enableDoubleJump) == 1;
            this.jumpSustain = ls.eval_e(this.jumpSustain);
            this.defaultControls = ls.eval_e(this.defaultControls) == 1;
            this.enabled = ls.eval_e(this.enabled) == 1;
            this.wasOnFloor = false;
            this.wasOverJumpthru = ls.CollisionUtils.testOverlapJumpThru(this.inst);
            this.loadOverJumpthru = -1;
            this.sustainTime = 0;
            this.simleft = false;
            this.simright = false;
            this.simjump = false;
            this.ga = Math.PI / 2;
            this.updateGravity();
            if (this.defaultControls) {
                window.addEventListener("keydown", this.onKeyDown.bind(this), true);
                window.addEventListener("keyup", this.onKeyUp.bind(this), true);
            }
        };
        p.tick = function () {
            if (!this.inst)
                return;
            var dt = this.inst.dt;
            if (!this.jumpkey && !this.simjump)
                this.jumped = false;
            var left = this.leftkey || this.simleft;
            var right = this.rightkey || this.simright;
            var jumpkey = this.jumpkey || this.simjump;
            var jump = jumpkey && !this.jumped;
            this.simleft = false;
            this.simright = false;
            this.simjump = false;
            if (!this.enabled)
                return;
            //忽略所有的键盘操作
            if (this.ignoreInput) {
                left = false;
                right = false;
                jumpkey = false;
                jump = false;
            }
            if (!jumpkey)
                this.sustainTime = 0;
            var lastFloor = this.lastFloorObject;
            var floor_moved = false;
            //检测第一次tick的时候，如果检测有与绑定Solid的对象碰撞，或者检测到与绑定穿透行为的对象有碰撞，那么，将对象像上移动4像素
            if (this.firstTick) {
                if (ls.CollisionUtils.testOverlapSolid(this.inst) || ls.CollisionUtils.testOverlapJumpThru(this.inst))
                    ls.CollisionUtils.pushOutSolid(this.inst, -this.downx, -this.downy, 4, true);
                this.firstTick = false;
            }
            if (lastFloor && this.dy === 0 && (lastFloor.y !== this.lastFloorY || lastFloor.x !== this.lastFloorX)) {
                var mx = lastFloor.x - this.lastFloorX;
                var my = lastFloor.y - this.lastFloorY;
                this.inst.x += mx;
                this.inst.y += my;
                this.lastFloorX = lastFloor.x;
                this.lastFloorY = lastFloor.y;
                floor_moved = true;
                if (ls.CollisionUtils.testOverlapSolid(this.inst)) {
                    ls.CollisionUtils.pushOutSolid(this.inst, -mx, -my, Math.sqrt(mx * mx + my * my) * 2.5);
                }
            }
            //检测是否在地板上
            var floor_ = this.isOnFloor();
            //如果有碰撞的对象
            var collobj = ls.CollisionUtils.testOverlapSolid(this.inst);
            if (collobj) {
                if (this.inst["inputPredicted"])
                    ls.CollisionUtils.pushOutSolid(this.inst, -this.downx, -this.downy, 10, false);
                else if (ls.CollisionUtils.pushOutSolidNearest(this.inst, Math.max(this.inst.width, this.inst.height) / 2))
                    ls.CollisionUtils.registerCollision(this.inst, collobj);
                else
                    return;
            }
            if (floor_) {
                this.doubleJumped = false;
                this.canDoubleJump = false;
                if (this.dy > 0) {
                    if (!this.wasOnFloor) {
                        ls.CollisionUtils.pushInFractional(this.inst, -this.downx, -this.downy, floor_, 16);
                        this.wasOnFloor = true;
                    }
                    this.dy = 0;
                }
                if (lastFloor != floor_) {
                    this.lastFloorObject = floor_;
                    this.lastFloorX = floor_.x;
                    this.lastFloorY = floor_.y;
                    ls.CollisionUtils.registerCollision(this.inst, floor_);
                }
                else if (floor_moved) {
                    collobj = ls.CollisionUtils.testOverlapSolid(this.inst);
                    if (collobj) {
                        ls.CollisionUtils.registerCollision(this.inst, collobj);
                        if (mx !== 0) {
                            if (mx > 0)
                                ls.CollisionUtils.pushOutSolid(this.inst, -this.rightx, -this.righty);
                            else
                                ls.CollisionUtils.pushOutSolid(this.inst, this.rightx, this.righty);
                        }
                        ls.CollisionUtils.pushOutSolid(this.inst, -this.downx, -this.downy);
                    }
                }
            }
            else {
                //如果对象没有与任何对象进行碰撞，并松开了向上键，那么，开启二级跳
                if (!this.jumpkey)
                    this.canDoubleJump = true;
            }
            //如果从地板开始跳或者在空中二级跳（与地板没有碰撞&&支持二级跳&&按下向上键&&可以二级跳&&没有二级跳过）
            if ((floor_ && jump) || (!floor_ && this.enableDoubleJump && jumpkey && this.canDoubleJump && !this.doubleJumped)) {
                var oldx = this.inst.x;
                var oldy = this.inst.y;
                this.inst.x -= this.downx;
                this.inst.y -= this.downy;
                //如果在跳的过程中与任何对象没有碰撞
                if (!ls.CollisionUtils.testOverlapSolid(this.inst)) {
                    //重置维持时间
                    this.sustainTime = this.jumpSustain;
                    //触发开始跳
                    //console.log("onJump");
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onJump));
                    //状态变为跳的模式
                    this.animMode = this.ANIMMODE_JUMPING;
                    this.dy = -this.jumpStrength;
                    jump = true;
                    //阻止别1个跳跃，直到key up
                    if (floor_)
                        this.jumped = true;
                    else
                        this.doubleJumped = true;
                }
                else
                    jump = false;
                this.inst.x = oldx;
                this.inst.y = oldy;
            }
            //如果不在地面了，应用重力
            if (!floor_) {
                //如果向上键处于按下的状态，并且跳跃持续时间大于0，控制维持跳跃的状态
                if (jumpkey && this.sustainTime > 0) {
                    //应用持续时间的这段时间是没有重力作用的，这个与跳跃的力量有关系，单位:像素/秒
                    this.dy = -this.jumpStrength;
                    this.sustainTime -= dt;
                }
                else {
                    //否则，应用重力
                    this.lastFloorObject = null;
                    this.dy += this.g * dt;
                    //如果当前的速度大于了最大的下落速度，则限制为最大下落速度
                    if (this.dy > this.maxFall)
                        this.dy = this.maxFall;
                }
                //仍然设置跳跃标志以阻止双级跳
                if (jump)
                    this.jumped = true;
            }
            this.wasOnFloor = !!floor_;
            //当键盘左右键都没有按下的时候，直接应用水平方向的减速
            if (left == right) {
                if (this.dx < 0) {
                    this.dx += this.dec * dt;
                    //直到速度减为零
                    if (this.dx > 0)
                        this.dx = 0;
                }
                else if (this.dx > 0) {
                    this.dx -= this.dec * dt;
                    //直到速度减为零
                    if (this.dx < 0)
                        this.dx = 0;
                }
            }
            //应用加速
            if (left && !right) {
                if (this.dx > 0)
                    this.dx -= (this.acc + this.dec) * dt;
                else
                    this.dx -= this.acc * dt;
            }
            if (right && !left) {
                if (this.dx < 0)
                    this.dx += (this.acc + this.dec) * dt;
                else
                    this.dx += this.acc * dt;
            }
            //最大速度上限
            if (this.dx > this.maxspeed)
                this.dx = this.maxspeed;
            else if (this.dx < -this.maxspeed)
                this.dx = -this.maxspeed;
            var landed = false;
            if (this.dx !== 0) {
                //尝试X方向运动
                oldx = this.inst.x;
                oldy = this.inst.y;
                mx = this.dx * dt * this.rightx;
                my = this.dy * dt * this.righty;
                this.inst.x += this.rightx * (this.dx > 1 ? 1 : -1) - this.downx;
                this.inst.y += this.righty * (this.dx > 1 ? 1 : -1) - this.downy;
                var is_jumpthru = false;
                var slope_too_steep = ls.CollisionUtils.testOverlapSolid(this.inst);
                this.inst.x = oldx + mx;
                this.inst.y = oldy + my;
                var obstacle = ls.CollisionUtils.testOverlapSolid(this.inst);
                if (!obstacle && floor_) {
                    obstacle = ls.CollisionUtils.testOverlapJumpThru(this.inst);
                    if (obstacle) {
                        this.inst.x = oldx;
                        this.inst.y = oldy;
                        if (ls.CollisionUtils.testOverlap(this.inst, obstacle)) {
                            obstacle = null;
                            is_jumpthru = false;
                        }
                        else
                            is_jumpthru = true;
                        this.inst.x = oldx + mx;
                        this.inst.y = oldy + my;
                    }
                }
                if (obstacle) {
                    //如果是1个可接受的斜坡，那么，推出相同的距离
                    var push_dist = Math.abs(this.dx * dt) + 2;
                    if (slope_too_steep || !ls.CollisionUtils.pushOutSolid(this.inst, -this.downx, -this.downy, push_dist, is_jumpthru, obstacle)) {
                        ls.CollisionUtils.registerCollision(this.inst, obstacle);
                        push_dist = Math.max(Math.abs(this.dx * dt * 2.5), 30);
                        if (!ls.CollisionUtils.pushOutSolid(this.inst, this.rightx * (this.dx < 0 ? 1 : -1), this.righty * (this.dx < 0 ? 1 : -1), push_dist, false)) {
                            this.inst.x = oldx;
                            this.inst.y = oldy;
                        }
                        else if (floor_ && !is_jumpthru && !this.floorIsJumpthru) {
                            oldx = this.inst.x;
                            oldy = this.inst.y;
                            this.inst.x += this.downx;
                            this.inst.y += this.downy;
                            if (ls.CollisionUtils.testOverlapSolid(this.inst)) {
                                if (!ls.CollisionUtils.pushOutSolid(this.inst, -this.downx, -this.downy, 3, false)) {
                                    this.inst.x = oldx;
                                    this.inst.y = oldy;
                                }
                            }
                            else {
                                this.inst.x = oldx;
                                this.inst.y = oldy;
                            }
                        }
                        if (!is_jumpthru)
                            this.dx = 0; //stop
                    }
                    else if (!slope_too_steep && !jump && (Math.abs(this.dy) < Math.abs(this.jumpStrength / 4))) {
                        this.dy = 0;
                        if (!floor_)
                            landed = true;
                    }
                }
                else {
                    var newfloor = this.isOnFloor();
                    if (floor_ && !newfloor) {
                        var mag = Math.ceil(Math.abs(this.dx * dt)) + 2;
                        oldx = this.inst.x;
                        oldy = this.inst.y;
                        this.inst.x += this.downx * mag;
                        this.inst.y += this.downy * mag;
                        if (ls.CollisionUtils.testOverlapSolid(this.inst) || ls.CollisionUtils.testOverlapJumpThru(this.inst))
                            ls.CollisionUtils.pushOutSolid(this.inst, -this.downx, -this.downy, mag + 2, true);
                        else {
                            this.inst.x = oldx;
                            this.inst.y = oldy;
                        }
                    }
                    else if (newfloor && this.dy === 0) {
                        //推到地板上，以确保对象紧紧停留在地面上
                        ls.CollisionUtils.pushInFractional(this.inst, -this.downx, -this.downy, newfloor, 16);
                    }
                }
            }
            if (this.dy !== 0) {
                oldx = this.inst.x;
                oldy = this.inst.y;
                this.inst.x += this.dy * dt * this.downx;
                this.inst.y += this.dy * dt * this.downy;
                var newx = this.inst.x;
                var newy = this.inst.y;
                collobj = ls.CollisionUtils.testOverlapSolid(this.inst);
                var fell_on_jumpthru = false;
                if (!collobj && (this.dy > 0) && !floor_) {
                    var allover = this.fallthrough > 0 ? null : ls.CollisionUtils.testOverlapJumpThru(this.inst, true);
                    if (allover && allover.length) {
                        //支持垂直移动并穿透的情况
                        if (this.wasOverJumpthru) {
                            this.inst.x = oldx;
                            this.inst.y = oldy;
                            for (var i = 0, j = 0; i < allover.length; i++) {
                                allover[j] = allover[i];
                                if (!ls.CollisionUtils.testOverlap(this.inst, allover[i]))
                                    j++;
                            }
                            allover.length = j;
                            this.inst.x = newx;
                            this.inst.y = newy;
                        }
                        if (allover.length >= 1)
                            collobj = allover[0];
                    }
                    fell_on_jumpthru = !!collobj;
                }
                if (collobj) {
                    ls.CollisionUtils.registerCollision(this.inst, collobj);
                    this.sustainTime = 0;
                    //推动2.5倍的垂直距离或者30像素
                    var push_dist = (fell_on_jumpthru ? Math.abs(this.dy * dt * 2.5 + 10) : Math.max(Math.abs(this.dy * dt * 2.5 + 10), 30));
                    if (!ls.CollisionUtils.pushOutSolid(this.inst, this.downx * (this.dy < 0 ? 1 : -1), this.downy * (this.dy < 0 ? 1 : -1), push_dist, fell_on_jumpthru, collobj)) {
                        this.inst.x = oldx;
                        this.inst.y = oldy;
                        this.wasOnFloor = true;
                        if (!fell_on_jumpthru)
                            this.dy = 0; //stop
                    }
                    else {
                        this.lastFloorObject = collobj;
                        this.lastFloorX = collobj.x;
                        this.lastFloorY = collobj.y;
                        this.floorIsJumpthru = fell_on_jumpthru;
                        if (fell_on_jumpthru)
                            landed = true;
                        this.dy = 0; //stop
                    }
                }
            }
            //运行动画触发
            if (this.animMode != this.ANIMMODE_FALLING && this.dy > 0 && !floor_) {
                //console.log("onFall");
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onFall));
                this.animMode = this.ANIMMODE_FALLING;
            }
            if (floor_ || landed) {
                if (this.animMode === this.ANIMMODE_FALLING || landed || (jump && this.dy === 0)) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onLand));
                    if (this.dx === 0 && this.dy === 0)
                        this.animMode = this.ANIMMODE_STOPPED;
                    else {
                        this.animMode = this.ANIMMODE_MOVING;
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onMove));
                    }
                }
                else {
                    if (this.animMode != this.ANIMMODE_STOPPED && this.dx === 0 && this.dy === 0) {
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onStop));
                        this.animMode = this.ANIMMODE_STOPPED;
                    }
                    if (this.animMode !== this.ANIMMODE_MOVING && (this.dx !== 0 || this.dy !== 0) && !jump) {
                        this.animMode = this.ANIMMODE_MOVING;
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onMove));
                    }
                }
            }
            if (this.dx != 0) {
                var curMoveStatus = (this.dx > 0) ? 1 : -1;
                if (curMoveStatus != this.moveDirStatus) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, (curMoveStatus == 1) ? this.onMoveRight : this.onMoveLeft));
                    this.moveDirStatus = curMoveStatus;
                }
            }
            if (this.fallthrough > 0)
                this.fallthrough--;
            this.wasOverJumpthru = ls.CollisionUtils.testOverlapJumpThru(this.inst);
        };
        p.saveToJSON = function () {
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances,
                "maxspeed": this.maxspeed,
                "acc": this.acc,
                "dec": this.dec,
                "jumpStrength": this.jumpStrength,
                "g": this.g,
                "maxFall": this.maxFall,
                "enableDoubleJump": this.enableDoubleJump,
                "jumpSustain": this.jumpSustain,
                "defaultControls": this.defaultControls
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
                this.maxspeed = o["maxspeed"];
                this.acc = o["acc"];
                this.dec = o["dec"];
                this.jumpStrength = o["jumpStrength"];
                this.g = o["g"];
                this.maxFall = o["maxFall"];
                this.enableDoubleJump = o["enableDoubleJump"];
                this.jumpSustain = o["jumpSustain"];
                this.defaultControls = o["defaultControls"];
            }
        };
        //获取重力方向
        p.getGDir = function () {
            return (this.g < 0) ? -1 : 1;
        };
        p.isOnFloor = function () {
            var ret = null;
            var ret2 = null;
            var oldx = this.inst.x;
            var oldy = this.inst.y;
            this.inst.x += this.downx;
            this.inst.y += this.downy;
            if (this.lastFloorObject) {
                var oldFloorX = this.lastFloorObject.x;
                var oldFloorY = this.lastFloorObject.y;
            }
            if (this.lastFloorObject && ls.CollisionUtils.testOverlap(this.inst, this.lastFloorObject)) {
                this.inst.x = oldx;
                this.inst.y = oldy;
                this.lastFloorObject.x = oldFloorX;
                this.lastFloorObject.y = oldFloorY;
                return this.lastFloorObject;
            }
            else {
                ret = ls.CollisionUtils.testOverlapSolid(this.inst);
                if (!ret && this.fallthrough === 0)
                    ret2 = ls.CollisionUtils.testOverlapJumpThru(this.inst, true);
                this.inst.x = oldx;
                this.inst.y = oldy;
                if (this.lastFloorObject) {
                    this.lastFloorObject.x = oldFloorX;
                    this.lastFloorObject.y = oldFloorY;
                }
                //如果虚拟移动1像素有碰撞，那么，要检测不移动时是否有碰撞
                if (ret) {
                    if (ls.CollisionUtils.testOverlap(this.inst, ret))
                        return null;
                    else {
                        //表明正好在地板上
                        this.floorIsJumpthru = false;
                        return ret;
                    }
                }
                //如果与1个或者多个对象进行jumpthrus
                if (ret2 && ret2.length) {
                    var j = 0;
                    for (var i = 0, j = 0, len = ret2.length; i < len; i++) {
                        ret2[j] = ret2[i];
                        if (!ls.CollisionUtils.testOverlap(this.inst, ret2[i]))
                            j++;
                    }
                    if (j >= 1) {
                        this.floorIsJumpthru = true;
                        return ret2[0];
                    }
                }
                return null;
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.onJump = function (event) {
            return { instances: [this], status: true };
        };
        p.onFall = function (event) {
            return { instances: [this], status: true };
        };
        p.onLand = function (event) {
            return { instances: [this], status: true };
        };
        p.onStop = function (event) {
            return { instances: [this], status: true };
        };
        p.onMove = function (event) {
            return { instances: [this], status: true };
        };
        p.onMoveLeft = function (event) {
            return { instances: [this], status: true };
        };
        p.onMoveRight = function (event) {
            return { instances: [this], status: true };
        };
        p.isMovingPlatform = function (event) {
            return { instances: [this.inst], status: this.dx !== 0 || this.dy !== 0 };
        };
        p.compareSpeedPlatform = function ($event) {
            return { instances: [this], status: ls.compare(Math.sqrt(this.dx * this.dx + this.dy * this.dy), $event.operationType, $event.speed) };
        };
        //判断是否在地板上
        p.isOnFloorFlatform = function ($event) {
            if ($event === void 0) { $event = null; }
            if (this.dy !== 0)
                return { instances: [this.inst], status: false };
            var oldx = this.inst.x;
            var oldy = this.inst.y;
            this.inst.x += this.downx;
            this.inst.y += this.downy;
            var ret = ls.CollisionUtils.testOverlapSolid(this.inst);
            var ret2 = null;
            if (!ret && this.fallthrough === 0)
                ret2 = ls.CollisionUtils.testOverlapJumpThru(this.inst, true);
            this.inst.x = oldx;
            this.inst.y = oldy;
            if (ret) {
                return { instances: [this.inst], status: !ls.CollisionUtils.testOverlap(this.inst, ret) };
            }
            if (ret2 && ret2.length) {
                for (var i = 0, j = 0; i < ret2.length; i++) {
                    ret2[j] = ret2[i];
                    if (!ls.CollisionUtils.testOverlap(this.inst, ret2[i])) {
                        j++;
                    }
                }
                if (j >= 1)
                    return { instances: [this.inst], status: true };
            }
            return { instances: [this.inst], status: false };
        };
        //判断是否与墙碰撞
        p.isByWall = function ($event) {
            var oldx = this.inst.x;
            var oldy = this.inst.y;
            this.inst.x -= this.downx * 3;
            this.inst.y -= this.downy * 3;
            if (ls.CollisionUtils.testOverlapSolid(this.inst)) {
                this.inst.x = oldx;
                this.inst.y = oldy;
                return { instances: [this.inst], status: false };
            }
            var side = $event.side;
            if (side === 0) {
                this.inst.x -= this.rightx * 2;
                this.inst.y -= this.righty * 2;
            }
            else {
                this.inst.x += this.rightx * 2;
                this.inst.y += this.righty * 2;
            }
            var ret = ls.CollisionUtils.testOverlapSolid(this.inst);
            this.inst.x = oldx;
            this.inst.y = oldy;
            return { instances: [this.inst], status: !!ret };
        };
        p.isJumping = function ($event) {
            return { instances: [this.inst], status: this.dy < 0 };
        };
        p.isFalling = function ($event) {
            return { instances: [this.inst], status: this.dy > 0 };
        };
        p.isDoubleJumpEnabled = function ($event) {
            return { instances: [this.inst], status: this.enableDoubleJump };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        //忽视输入
        p.setIgnoreInput = function (ignoring) {
            this.ignoreInput = ls.eval_e(ignoring) !== 0;
        };
        //设置最大速度
        p.setMaxSpeed = function (maxspeed) {
            this.maxspeed = ls.eval_e(maxspeed);
            if (this.maxspeed < 0)
                this.maxspeed = 0;
        };
        //设置加速度
        p.setAcceleration = function (acc) {
            this.acc = ls.eval_e(acc);
            if (this.acc < 0)
                this.acc = 0;
        };
        //设置减速度
        p.setDeceleration = function (dec) {
            this.dec = ls.eval_e(dec);
            if (this.dec < 0)
                this.dec = 0;
        };
        //设置向上跳的力量
        p.setJumpStrength = function (js) {
            this.jumpStrength = ls.eval_e(js);
            if (this.jumpStrength < 0)
                this.jumpStrength = 0;
        };
        //设置重力
        p.setGravity = function (grav) {
            this.g1 = ls.eval_e(grav);
            if (this.g1 === grav)
                return;
            this.updateGravity();
            if (ls.CollisionUtils.testOverlapSolid(this.inst)) {
                ls.CollisionUtils.pushOutSolid(this.inst, this.downx, this.downy, 10);
                this.inst.x += this.downx * 2;
                this.inst.y += this.downy * 2;
            }
            //允许在重力改变的情况下，落到当前地板
            this.lastFloorObject = null;
        };
        //设置最大掉落速度
        p.setMaxFallSpeed = function (mfs) {
            this.maxFall = ls.eval_e(mfs);
            if (this.maxFall < 0)
                this.maxFall = 0;
        };
        p.simulateControl = function (ctrl) {
            ctrl = ls.eval_e(ctrl);
            switch (ctrl) {
                case 0:
                    this.simleft = true;
                    break;
                case 1:
                    this.simright = true;
                    break;
                case 2:
                    this.simjump = true;
                    break;
            }
        };
        //设置水平方向移动矢量，速度vx像素/秒
        p.setVectorX = function (vx) {
            this.dx = ls.eval_e(vx);
        };
        //设置垂直方向移动矢量，速度vy像素/秒
        p.setVectorY = function (vy) {
            this.dy = ls.eval_e(vy);
        };
        //设置重力角度，设置之后，运动方向就会改变
        p.setGravityAngle = function (a) {
            a = ls.MathUtils.toRadian(ls.eval_e(a));
            a = ls.MathUtils.clampAngle(a);
            if (this.ga === a)
                return;
            this.ga = a;
            this.updateGravity();
            //允许在重力改变的情况下，落下当前地板
            this.lastFloorObject = null;
        };
        p.setEnabled = function (en) {
            en = ls.eval_e(en);
            if (this.enabled !== (en === 1)) {
                this.enabled = (en === 1);
                if (!this.enabled)
                    this.lastFloorObject = null;
            }
        };
        //主要用于绑定了JumpThru行为中的对象，默认如果对象停留在绑定JumpThru对象上，那么，通过这个动作可以让对象掉下来
        p.setfallThrough = function () {
            var oldx = this.inst.x;
            var oldy = this.inst.y;
            this.inst.x += this.downx;
            this.inst.y += this.downy;
            var overlaps = ls.CollisionUtils.testOverlapJumpThru(this.inst, false);
            this.inst.x = oldx;
            this.inst.y = oldy;
            if (!overlaps)
                return;
            this.fallthrough = 3;
            this.lastFloorObject = null;
        };
        //双级跳
        p.setDoubleJumpEnabled = function (e) {
            this.enableDoubleJump = (ls.eval_e(e) !== 0);
        };
        //设置跳持续时间
        p.setJumpSustain = function (s) {
            this.jumpSustain = ls.eval_e(s) / 1000;
        };
        p.onKeyDown = function (event) {
            switch (event.keyCode) {
                case 38:
                    event.preventDefault();
                    this.jumpkey = true;
                    break;
                case 37:
                    event.preventDefault();
                    this.leftkey = true;
                    break;
                case 39:
                    event.preventDefault();
                    this.rightkey = true;
                    break;
            }
        };
        p.onKeyUp = function (event) {
            switch (event.keyCode) {
                case 38:
                    event.preventDefault();
                    this.jumpkey = false;
                    this.jumped = false;
                    break;
                case 37:
                    event.preventDefault();
                    this.leftkey = false;
                    break;
                case 39:
                    event.preventDefault();
                    this.rightkey = false;
                    break;
            }
        };
        p.updateGravity = function () {
            //down,向下的力
            this.downx = Math.cos(this.ga);
            this.downy = Math.sin(this.ga);
            //right，向右的力
            this.rightx = Math.cos(this.ga - Math.PI / 2);
            this.righty = Math.sin(this.ga - Math.PI / 2);
            this.downx = ls.round6dp(this.downx);
            this.downy = ls.round6dp(this.downy);
            this.rightx = ls.round6dp(this.rightx);
            this.righty = ls.round6dp(this.righty);
            this.g1 = this.g;
            //如果重力为负，那么，向上
            if (this.g < 0) {
                this.downx *= -1;
                this.downy *= -1;
                this.g = Math.abs(this.g);
            }
        };
        p.clone = function () {
            var bh = new PlatformBehaivor();
            bh.enabled = this.enabled;
            bh.name = this.name;
            bh.paramInstances = this.paramInstances;
            bh.maxspeed = this.maxspeed;
            bh.acc = this.acc;
            bh.dec = this.dec;
            bh.jumpStrength = this.jumpStrength;
            bh.g = this.g;
            bh.maxFall = this.maxFall;
            bh.enableDoubleJump = this.enableDoubleJump;
            bh.jumpSustain = this.jumpSustain;
            bh.defaultControls = this.defaultControls;
            return bh;
        };
        return PlatformBehaivor;
    }(ls.BaseBehavior));
    ls.PlatformBehaivor = PlatformBehaivor;
    egret.registerClass(PlatformBehaivor,'ls.PlatformBehaivor');
    var OnPlatformJumpEvent = (function (_super) {
        __extends(OnPlatformJumpEvent, _super);
        function OnPlatformJumpEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPlatformJumpEvent,p=c.prototype;
        return OnPlatformJumpEvent;
    }(ls.BaseEvent));
    ls.OnPlatformJumpEvent = OnPlatformJumpEvent;
    egret.registerClass(OnPlatformJumpEvent,'ls.OnPlatformJumpEvent');
    var OnPlatformFallEvent = (function (_super) {
        __extends(OnPlatformFallEvent, _super);
        function OnPlatformFallEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPlatformFallEvent,p=c.prototype;
        return OnPlatformFallEvent;
    }(ls.BaseEvent));
    ls.OnPlatformFallEvent = OnPlatformFallEvent;
    egret.registerClass(OnPlatformFallEvent,'ls.OnPlatformFallEvent');
    var OnPlatformLandEvent = (function (_super) {
        __extends(OnPlatformLandEvent, _super);
        function OnPlatformLandEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPlatformLandEvent,p=c.prototype;
        return OnPlatformLandEvent;
    }(ls.BaseEvent));
    ls.OnPlatformLandEvent = OnPlatformLandEvent;
    egret.registerClass(OnPlatformLandEvent,'ls.OnPlatformLandEvent');
    var OnPlatformStopEvent = (function (_super) {
        __extends(OnPlatformStopEvent, _super);
        function OnPlatformStopEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPlatformStopEvent,p=c.prototype;
        return OnPlatformStopEvent;
    }(ls.BaseEvent));
    ls.OnPlatformStopEvent = OnPlatformStopEvent;
    egret.registerClass(OnPlatformStopEvent,'ls.OnPlatformStopEvent');
    var OnPlatformMoveEvent = (function (_super) {
        __extends(OnPlatformMoveEvent, _super);
        function OnPlatformMoveEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPlatformMoveEvent,p=c.prototype;
        return OnPlatformMoveEvent;
    }(ls.BaseEvent));
    ls.OnPlatformMoveEvent = OnPlatformMoveEvent;
    egret.registerClass(OnPlatformMoveEvent,'ls.OnPlatformMoveEvent');
    var OnPlatformMoveLeftEvent = (function (_super) {
        __extends(OnPlatformMoveLeftEvent, _super);
        function OnPlatformMoveLeftEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPlatformMoveLeftEvent,p=c.prototype;
        return OnPlatformMoveLeftEvent;
    }(ls.BaseEvent));
    ls.OnPlatformMoveLeftEvent = OnPlatformMoveLeftEvent;
    egret.registerClass(OnPlatformMoveLeftEvent,'ls.OnPlatformMoveLeftEvent');
    var OnPlatformMoveRightEvent = (function (_super) {
        __extends(OnPlatformMoveRightEvent, _super);
        function OnPlatformMoveRightEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPlatformMoveRightEvent,p=c.prototype;
        return OnPlatformMoveRightEvent;
    }(ls.BaseEvent));
    ls.OnPlatformMoveRightEvent = OnPlatformMoveRightEvent;
    egret.registerClass(OnPlatformMoveRightEvent,'ls.OnPlatformMoveRightEvent');
    var IsMovingPlatformEvent = (function (_super) {
        __extends(IsMovingPlatformEvent, _super);
        function IsMovingPlatformEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsMovingPlatformEvent,p=c.prototype;
        return IsMovingPlatformEvent;
    }(ls.BaseEvent));
    ls.IsMovingPlatformEvent = IsMovingPlatformEvent;
    egret.registerClass(IsMovingPlatformEvent,'ls.IsMovingPlatformEvent');
    var CompareSpeedPlatformEvent = (function (_super) {
        __extends(CompareSpeedPlatformEvent, _super);
        function CompareSpeedPlatformEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareSpeedPlatformEvent,p=c.prototype;
        return CompareSpeedPlatformEvent;
    }(ls.BaseEvent));
    ls.CompareSpeedPlatformEvent = CompareSpeedPlatformEvent;
    egret.registerClass(CompareSpeedPlatformEvent,'ls.CompareSpeedPlatformEvent');
    var IsOnFloorEvent = (function (_super) {
        __extends(IsOnFloorEvent, _super);
        function IsOnFloorEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsOnFloorEvent,p=c.prototype;
        return IsOnFloorEvent;
    }(ls.BaseEvent));
    ls.IsOnFloorEvent = IsOnFloorEvent;
    egret.registerClass(IsOnFloorEvent,'ls.IsOnFloorEvent');
    var IsByWallEvent = (function (_super) {
        __extends(IsByWallEvent, _super);
        function IsByWallEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsByWallEvent,p=c.prototype;
        return IsByWallEvent;
    }(ls.BaseEvent));
    ls.IsByWallEvent = IsByWallEvent;
    egret.registerClass(IsByWallEvent,'ls.IsByWallEvent');
    var IsJumpingEvent = (function (_super) {
        __extends(IsJumpingEvent, _super);
        function IsJumpingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsJumpingEvent,p=c.prototype;
        return IsJumpingEvent;
    }(ls.BaseEvent));
    ls.IsJumpingEvent = IsJumpingEvent;
    egret.registerClass(IsJumpingEvent,'ls.IsJumpingEvent');
    var IsFallingEvent = (function (_super) {
        __extends(IsFallingEvent, _super);
        function IsFallingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsFallingEvent,p=c.prototype;
        return IsFallingEvent;
    }(ls.BaseEvent));
    ls.IsFallingEvent = IsFallingEvent;
    egret.registerClass(IsFallingEvent,'ls.IsFallingEvent');
    var IsDoubleJumpEnabledEvent = (function (_super) {
        __extends(IsDoubleJumpEnabledEvent, _super);
        function IsDoubleJumpEnabledEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsDoubleJumpEnabledEvent,p=c.prototype;
        return IsDoubleJumpEnabledEvent;
    }(ls.BaseEvent));
    ls.IsDoubleJumpEnabledEvent = IsDoubleJumpEnabledEvent;
    egret.registerClass(IsDoubleJumpEnabledEvent,'ls.IsDoubleJumpEnabledEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map