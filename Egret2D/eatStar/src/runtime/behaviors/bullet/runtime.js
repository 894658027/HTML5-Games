var ls;
(function (ls) {
    var BulletBehaivor = (function (_super) {
        __extends(BulletBehaivor, _super);
        function BulletBehaivor() {
            _super.apply(this, arguments);
            //加速度
            this.acceleration = 0;
            //重力
            this.gravity = 0;
            this.bounceOffSolids = false;
            //如果设置角度了，那么，根据设置的角度来算，否则，根据对象所在的角度来算
            this.angle = 0;
            this.dx = 0;
            this.dy = 0;
            this._travelled = 0;
            this._currentSpeed = 0;
            this._currentGravity = 0;
            this._speed = 1;
        }
        var d = __define,c=BulletBehaivor,p=c.prototype;
        p.onCreate = function () {
            this.angle = ls.eval_e(this.angle);
            this._currentSpeed = ls.eval_e(this.speed);
            this._acceleration = ls.eval_e(this.acceleration);
            this._gravity = ls.eval_e(this.gravity);
            if (this.inst)
                this._radian = ls.MathUtils.toRadian(this.inst.relyOnTarget ? this.inst.relyOnTarget.angle : ls.eval_e(this.angle));
            ls.assert(typeof this._currentSpeed !== "number" || typeof this._acceleration !== "number" || typeof this._gravity !== "number", "BulletBehaivor parameter type incorrect!!");
        };
        p.tick = function () {
            if (!this._radian)
                this._radian = ls.MathUtils.toRadian(this.inst.relyOnTarget ? this.inst.relyOnTarget.angle : ls.eval_e(this.angle));
            this.dx = Math.cos(this._radian) * this._currentSpeed;
            this.dy = Math.sin(this._radian) * this._currentSpeed;
            var a;
            if (this.dx === 0 && this.dy === 0) {
                //get inst angle
                a = this._radian;
            }
            else {
                a = Math.atan2(this.dy, this.dx);
            }
            this._currentSpeed += this._acceleration * this.inst.dt;
            if (this._currentSpeed < 0)
                this._currentSpeed = 0;
            this.dx = Math.cos(a) * this._currentSpeed;
            this.dy = Math.sin(a) * this._currentSpeed;
            if (this._gravity != 0)
                this._currentGravity += this._gravity * this.inst.dt;
            this.dy += this._currentGravity;
            //校正数值
            if (Math.abs(this.dx) < 0.000001)
                this.dx = 0;
            if (Math.abs(this.dy) < 0.000001)
                this.dy = 0;
            if (this.dx != 0 || this.dy != 0) {
                this.inst.x += this.dx * this.inst.dt;
                this.inst.y += this.dy * this.inst.dt;
                if (this._currentGravity != 0) {
                    this.inst.angle = ls.MathUtils.toAngle(Math.atan2(this.dy, this.dx));
                }
                if (this._currentSpeed != 0)
                    this._travelled += Math.sqrt(this.dx * this.dx + this.dy * this.dy) * this.inst.dt;
            }
        };
        p.saveToJSON = function () {
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances,
                "acceleration": this.acceleration,
                "gravity": this.gravity,
                "bounceOffSolids": this.bounceOffSolids,
                "angle": this.angle
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
                this.acceleration = o["acceleration"];
                this.gravity = o["gravity"];
                this.bounceOffSolids = o["bounceOffSolids"];
                this.angle = o["angle"];
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.compareSpeed = function ($compareSpeedEvent) {
            return { instances: [this], status: ls.compare(this._currentSpeed, $compareSpeedEvent.operationType, $compareSpeedEvent.speed) };
        };
        p.compareTravelled = function ($compareTravelledEvent) {
            return { instances: [this], status: ls.compare(this._travelled, $compareTravelledEvent.operationType, $compareTravelledEvent.distance) };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.setEnabled = function (state) {
            var state = ls.eval_e(state);
            ls.assert(typeof state !== "number", "BulletBehaivor setEnabled parameter type incorrect!!");
            this.enabled = (state == 1);
        };
        p.setAcceleration = function (acce) {
            var acce = ls.eval_e(acce);
            ls.assert(typeof acce !== "number", "BulletBehavior setAcceleration parameter type incorrect!!");
            this._acceleration = acce;
        };
        p.setAngleOfMotion = function (angle) {
            var angle = ls.eval_e(angle);
            ls.assert(typeof angle !== "number", "BulletBehavior setAngleOfMotion parameter type incorrect!!");
            this.angle = angle;
            this._radian = ls.MathUtils.toRadian(this.inst.relyOnTarget ? this.inst.relyOnTarget.angle : ls.eval_e(this.angle));
        };
        p.setGravity = function (gravity) {
            var gravity = ls.eval_e(gravity);
            ls.assert(typeof gravity !== "number", "BulletBehavior setGravity parameter type incorrect!!");
            this._gravity = gravity;
        };
        p.setSpeed = function (speed) {
            var speed = ls.eval_e(speed);
            ls.assert(typeof speed !== "number", "BulletBehavior setSpeed parameter type incorrect!!");
            this._speed = speed;
            this._currentSpeed = this._speed;
        };
        d(p, "speed"
            /////////////////////////////////////////////////////////////////
            //                        expression
            /////////////////////////////////////////////////////////////////
            ,function () {
                return this._speed;
            }
            ,function (value) {
                if (this._speed != value)
                    this._speed = value;
            }
        );
        p.clone = function () {
            var bh = new BulletBehaivor();
            bh.enabled = this.enabled;
            bh.speed = this.speed;
            bh.acceleration = this.acceleration;
            bh.gravity = this.gravity;
            bh.bounceOffSolids = this.bounceOffSolids;
            bh.angle = this.angle;
            bh.name = this.name;
            bh.paramInstances = this.paramInstances;
            return bh;
        };
        return BulletBehaivor;
    }(ls.BaseBehavior));
    ls.BulletBehaivor = BulletBehaivor;
    egret.registerClass(BulletBehaivor,'ls.BulletBehaivor');
    var B_Bullet_compareSpeedEvent = (function (_super) {
        __extends(B_Bullet_compareSpeedEvent, _super);
        function B_Bullet_compareSpeedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=B_Bullet_compareSpeedEvent,p=c.prototype;
        return B_Bullet_compareSpeedEvent;
    }(ls.BaseEvent));
    ls.B_Bullet_compareSpeedEvent = B_Bullet_compareSpeedEvent;
    egret.registerClass(B_Bullet_compareSpeedEvent,'ls.B_Bullet_compareSpeedEvent');
    var B_Bullet_compareDistanceTravelledEvent = (function (_super) {
        __extends(B_Bullet_compareDistanceTravelledEvent, _super);
        function B_Bullet_compareDistanceTravelledEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=B_Bullet_compareDistanceTravelledEvent,p=c.prototype;
        return B_Bullet_compareDistanceTravelledEvent;
    }(ls.BaseEvent));
    ls.B_Bullet_compareDistanceTravelledEvent = B_Bullet_compareDistanceTravelledEvent;
    egret.registerClass(B_Bullet_compareDistanceTravelledEvent,'ls.B_Bullet_compareDistanceTravelledEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map