var ls;
(function (ls) {
    var PinBehavior = (function (_super) {
        __extends(PinBehavior, _super);
        function PinBehavior() {
            _super.apply(this, arguments);
            this._theirStartAngle = 0;
        }
        var d = __define,c=PinBehavior,p=c.prototype;
        p.tick = function () {
            if (!this._pinObject)
                return;
            if (this._lastKnownAngle !== this.inst.angle) {
                this._myStartAngle = ls.MathUtils.clampAngle(this._myStartAngle + (this.inst.angle - this._lastKnownAngle));
            }
            var newx = this.inst.x;
            var newy = this.inst.y;
            if (this._mode === 3 || this._mode === 4) {
                var dist = ls.MathUtils.distance(this.inst.x, this.inst.y, this._pinObject.x, this._pinObject.y);
                if ((dist > this._pinDist) || (this._mode === 4 && dist < this._pinDist)) {
                    var radian = ls.MathUtils.radianTo(this._pinObject.x, this._pinObject.y, this.inst.x, this.inst.y);
                    newx = this._pinObject.x + Math.cos(radian) * this._pinDist;
                    newy = this._pinObject.y + Math.sin(radian) * this._pinDist;
                }
            }
            else {
                var mergeRaian = ls.MathUtils.toRadian(this._pinObject.angle) + ls.MathUtils.toRadian(this._pinAngle);
                newx = this._pinObject.x + Math.cos(mergeRaian) * this._pinDist;
                newy = this._pinObject.y + Math.sin(mergeRaian) * this._pinDist;
            }
            var newangle = ls.MathUtils.clampAngle(this._myStartAngle + (this._pinObject.angle - this._theirStartAngle));
            this._lastKnownAngle = newangle;
            if ((this._mode === 0 || this._mode === 1 || this._mode === 3 || this._mode === 4) &&
                (this.inst.x != newx || this.inst.y != newy)) {
                this.inst.x = newx;
                this.inst.y = newy;
            }
            if ((this._mode == 0 || this._mode === 2) && (this.inst.angle != newangle)) {
                this.inst.angle = newangle;
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.isPinned = function ($event) {
            return { instances: [this.inst], status: !!this._pinObject };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.pin = function ($object, mode) {
            this._pinObject = $object;
            this._mode = ls.eval_e(mode);
            var otherinst = $object;
            this._pinObject = otherinst;
            this._pinAngle = ls.MathUtils.angleTo(otherinst.x, otherinst.y, this.inst.x, this.inst.y) - otherinst.angle;
            this._pinDist = ls.MathUtils.distance(this.inst.x, this.inst.y, this._pinObject.x, this._pinObject.y);
            this._myStartAngle = this.inst.angle;
            this._lastKnownAngle = this.inst.angle;
            this._theirStartAngle = otherinst.angle;
        };
        p.unpin = function () {
            this._pinObject = null;
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            return bh;
        };
        return PinBehavior;
    }(ls.BaseBehavior));
    ls.PinBehavior = PinBehavior;
    egret.registerClass(PinBehavior,'ls.PinBehavior');
    var IsPinnedEvent = (function (_super) {
        __extends(IsPinnedEvent, _super);
        function IsPinnedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsPinnedEvent,p=c.prototype;
        return IsPinnedEvent;
    }(ls.BaseEvent));
    ls.IsPinnedEvent = IsPinnedEvent;
    egret.registerClass(IsPinnedEvent,'ls.IsPinnedEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map