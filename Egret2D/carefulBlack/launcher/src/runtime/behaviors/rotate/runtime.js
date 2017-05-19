var ls;
(function (ls) {
    var RotateBehaivor = (function (_super) {
        __extends(RotateBehaivor, _super);
        function RotateBehaivor() {
            _super.call(this);
            this._speed = 180;
            this._acceleration = 0;
        }
        var d = __define,c=RotateBehaivor,p=c.prototype;
        d(p, "acceleration"
            ,function () {
                return this._acceleration;
            }
            ,function (acc) {
                var acc = ls.eval_e(acc);
                ls.assert(typeof acc !== "number", "RotateBehaivor acceleration parameter type incorrect!!");
                this._acceleration = acc;
            }
        );
        d(p, "speed"
            /////////////////////////////////////////////////////////////////
            //                        expressions
            /////////////////////////////////////////////////////////////////
            ,function () {
                return this._speed;
            }
            ,function (sp) {
                var sp = ls.eval_e(sp);
                ls.assert(typeof sp !== "number", "RotateBehaivor speed parameter type incorrect!!");
                this._speed = sp;
            }
        );
        p.tick = function () {
            var dt = this.inst.dt;
            if (this._acceleration != 0)
                this._speed += this._acceleration * dt;
            if (this._speed != 0)
                this.inst.angle = ls.MathUtils.clampAngle(this.inst.angle += this._speed * dt);
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.setEnabled = function (state) {
            var state = ls.eval_e(state);
            ls.assert(typeof state !== "number", "RotateBehaivor setEnabled parameter type incorrect!!");
            this.enabled = (state == 1);
        };
        p.setAcceleration = function (acc) {
            this.acceleration = acc;
        };
        p.setSpeed = function (speed) {
            this.speed = speed;
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["speed"] = this.speed;
            o["acceleration"] = this.acceleration;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this._speed = o["speed"];
                this._acceleration = o["acceleration"];
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.speed = this.speed;
            bh.acceleration = this.acceleration;
            return bh;
        };
        return RotateBehaivor;
    }(ls.BaseBehavior));
    ls.RotateBehaivor = RotateBehaivor;
    egret.registerClass(RotateBehaivor,'ls.RotateBehaivor');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map