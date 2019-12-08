var ls;
(function (ls) {
    var BulletBehaivor = (function (_super) {
        __extends(BulletBehaivor, _super);
        function BulletBehaivor() {
            _super.apply(this, arguments);
            this.bounceOffSolids = 0;
            this.solidChangedAngle = 1;
            this.travelled = 0;
        }
        var d = __define,c=BulletBehaivor,p=c.prototype;
        p.onCreate = function () {
            this.speed = ls.eval_e(this.speed);
            this.acceleration = ls.eval_e(this.acceleration);
            this.gravity = ls.eval_e(this.gravity);
            this.bounceOffSolids = ls.eval_e(this.bounceOffSolids);
            this.angle = ls.eval_e(this.angle);
            this.solidChangedAngle = ls.eval_e(this.solidChangedAngle);
            this._radian = ls.MathUtils.toRadian(this.inst.relyOnTarget ? this.inst.relyOnTarget.angle : ls.eval_e(this.angle));
            this.dx = Math.cos(this._radian) * this.speed;
            this.dy = Math.sin(this._radian) * this.speed;
            this.lastx = this.inst.x;
            this.lasty = this.inst.y;
            this.travelled = 0;
            this.lastKnownAngle = this._radian;
            if (this.inst.relyOnTarget && this.bounceOffSolids !== 1)
                this.inst.angle = this.inst.relyOnTarget.angle;
        };
        p.tick = function () {
            var dt = 1 / 60;
            var s, a;
            if (this.acceleration !== 0) {
                s = ls.MathUtils.distance(0, 0, this.dx, this.dy);
                if (this.dx === 0 && this.dy === 0)
                    a = this._radian;
                else
                    a = ls.MathUtils.radianTo(0, 0, this.dx, this.dy);
                s += this.acceleration * dt;
                if (s < 0)
                    s = 0;
                this.dx = Math.cos(a) * s;
                this.dy = Math.sin(a) * s;
            }
            if (this.gravity !== 0)
                this.dy += this.gravity * dt;
            this.lastx = this.inst.x;
            this.lasty = this.inst.y;
            if (this.dx !== 0 || this.dy !== 0) {
                this.inst.x += this.dx * dt;
                this.inst.y += this.dy * dt;
                this.travelled += ls.MathUtils.distance(0, 0, this.dx * dt, this.dy * dt);
                this.lastKnownAngle = ls.MathUtils.angleTo(0, 0, this.dx, this.dy);
                if (this.bounceOffSolids == 1) {
                    var bounceSolid = ls.CollisionUtils.testOverlapSolid(this.inst);
                    if (bounceSolid) {
                        s = ls.MathUtils.distance(0, 0, this.dx, this.dy);
                        var bounceRadius = ls.CollisionUtils.calculateSolidBounceAngle(this.inst, this.lastx, this.lasty);
                        this.dx = Math.cos(bounceRadius) * s;
                        this.dy = Math.sin(bounceRadius) * s;
                        this.inst.x += this.dx * dt;
                        this.inst.y += this.dy * dt;
                        if (this.solidChangedAngle === 1)
                            this.inst.angle = ls.MathUtils.toAngle(bounceRadius);
                        this.lastKnownAngle = bounceRadius;
                        if (ls.CollisionUtils.pushOutSolid(this.inst, this.dx / s, this.dy / s, Math.max(s * 2.5 * dt, 30)))
                            ls.CollisionUtils.pushOutSolidNearest(this.inst, 100);
                        bounceSolid.setIsColliding(true, this.inst);
                    }
                }
            }
        };
        p.compareSpeed = function ($compareSpeedEvent) {
            return { instances: [this.inst], status: ls.compare(this.speed, $compareSpeedEvent.operationType, $compareSpeedEvent.speed) };
        };
        p.compareTravelled = function ($compareTravelledEvent) {
            return { instances: [this.inst], status: ls.compare(this.travelled, $compareTravelledEvent.operationType, $compareTravelledEvent.distance) };
        };
        p.setEnabled = function (state) {
            var state = ls.eval_e(state);
            ls.assert(typeof state !== "number", "BulletBehaivor setEnabled parameter type incorrect!!");
            this.enabled = (state == 1);
        };
        p.setAcceleration = function (acce) {
            var acce = ls.eval_e(acce);
            ls.assert(typeof acce !== "number", "BulletBehavior setAcceleration parameter type incorrect!!");
            this.acceleration = acce;
        };
        p.setAngleOfMotion = function (angle) {
            var angle = ls.eval_e(angle);
            ls.assert(typeof angle !== "number", "BulletBehavior setAngleOfMotion parameter type incorrect!!");
            this.angle = angle;
            this._radian = ls.MathUtils.toRadian(ls.eval_e(this.angle));
            this.dx = Math.cos(this._radian) * this.speed;
            this.dy = Math.sin(this._radian) * this.speed;
        };
        p.setGravity = function (gravity) {
            var gravity = ls.eval_e(gravity);
            ls.assert(typeof gravity !== "number", "BulletBehavior setGravity parameter type incorrect!!");
            this.gravity = gravity;
        };
        p.setSpeed = function (speed) {
            var speed = ls.eval_e(speed);
            ls.assert(typeof speed !== "number", "BulletBehavior setSpeed parameter type incorrect!!");
            if (this.speed != speed) {
                this.speed = speed;
                this.dx = Math.cos(this._radian) * this.speed;
                this.dy = Math.sin(this._radian) * this.speed;
            }
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.speed = this.speed;
            o.acceleration = this.acceleration;
            o.gravity = this.gravity;
            o.bounceOffSolids = this.bounceOffSolids;
            o.solidChangedAngle = this.solidChangedAngle;
            o.angle = this.angle;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.speed = o.speed;
                this.acceleration = o.acceleration;
                this.gravity = o.gravity;
                this.bounceOffSolids = o.bounceOffSolids;
                this.solidChangedAngle = o.solidChangedAngle;
                this.angle = o.angle;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.speed = this.speed;
            bh.acceleration = this.acceleration;
            bh.gravity = this.gravity;
            bh.bounceOffSolids = this.bounceOffSolids;
            bh.solidChangedAngle = this.solidChangedAngle;
            bh.angle = this.angle;
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
