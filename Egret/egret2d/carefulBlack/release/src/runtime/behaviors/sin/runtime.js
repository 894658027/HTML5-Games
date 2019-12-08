var ls;
(function (ls) {
    var SinBehavior = (function (_super) {
        __extends(SinBehavior, _super);
        function SinBehavior() {
            _super.call(this);
            this._2pi = Math.PI * 2;
            this._pi_2 = Math.PI / 2;
            this._3pi_2 = (3 * Math.PI) / 2;
        }
        var d = __define,c=SinBehavior,p=c.prototype;
        p.onCreate = function () {
            this.active = ls.eval_e(this.active);
            this.movement = ls.eval_e(this.movement);
            this.wave = ls.eval_e(this.wave);
            this.period = ls.eval_e(this.period);
            this.periodRandom = ls.eval_e(this.periodRandom);
            this.period += this.periodRandom;
            this.periodOffset = ls.eval_e(this.periodOffset);
            this.periodOffsetRandom = ls.eval_e(this.periodOffsetRandom);
            this.magnitude = ls.eval_e(this.magnitude);
            this.magnitudeRandom = ls.eval_e(this.magnitudeRandom);
            if (this.period === 0) {
                this.i = 0;
            }
            else {
                this.i = (this.periodOffset / this.period) * this._2pi;
                this.i += ((Math.random() * this.periodOffsetRandom) / this.period) * this._2pi;
            }
            this.magnitude += Math.random() * this.magnitudeRandom;
            this._initialValue = 0;
            this._initialValue2 = 0;
            this._ratio = 0;
            this.init();
        };
        p.init = function () {
            if (this.inst) {
                switch (this.movement) {
                    case 0:
                        this._initialValue = this.inst.x;
                        break;
                    case 1:
                        this._initialValue = this.inst.y;
                        break;
                    case 2:
                        this._initialValue = this.inst.width;
                        this._ratio = this.inst.height / this.inst.width;
                        break;
                    case 3:
                        this._initialValue = this.inst.width;
                        break;
                    case 4:
                        this._initialValue = this.inst.height;
                        break;
                    case 5:
                        this._initialValue = this.inst.angle;
                        break;
                    case 6:
                        this._initialValue = this.inst.alpha;
                        break;
                    case 7:
                        this._initialValue = 0;
                        break;
                    case 8:
                        this._initialValue = this.inst.x;
                        this._initialValue2 = this.inst.y;
                        break;
                    default:
                        ls.assert(true, "无效的sine类型！！");
                        break;
                }
            }
            this._lastKnownValue = this._initialValue;
            this._lastKnownValue2 = this._initialValue2;
        };
        p.tick = function () {
            if (this.active === 0)
                return;
            var dt = this.inst.dt;
            if (this.period === 0)
                this.i = 0;
            else {
                this.i += (dt / this.period) * this._2pi;
                this.i = this.i % this._2pi;
            }
            switch (this.movement) {
                case 0:
                    if (this.inst.x !== this._lastKnownValue)
                        this._initialValue += this.inst.x - this._lastKnownValue;
                    this.inst.x = this._initialValue + this.waveFunc(this.i) * this.magnitude;
                    this._lastKnownValue = this.inst.x;
                    break;
                case 1:
                    if (this.inst.y != this._lastKnownValue)
                        this._initialValue += this.inst.y - this._lastKnownValue;
                    this.inst.y = this._initialValue + this.waveFunc(this.i) * this.magnitude;
                    this._lastKnownValue = this.inst.y;
                    break;
                case 2:
                    this.inst.width = this._initialValue + this.waveFunc(this.i) * this.magnitude;
                    this.inst.height = this.inst.width * this._ratio;
                    break;
                case 3:
                    this.inst.width = this._initialValue + this.waveFunc(this.i) * this.magnitude;
                    break;
                case 4:
                    this.inst.height = this._initialValue + this.waveFunc(this.i) * this.magnitude;
                    break;
                case 5:
                    if (this.inst.angle !== this._lastKnownValue)
                        this._initialValue = this._initialValue + (this.inst.angle - this._lastKnownValue);
                    this.inst.angle = this._initialValue + this.waveFunc(this.i) * this.magnitude;
                    this._lastKnownValue = this.inst.angle;
                    break;
                case 6:
                    this.inst.alpha = this._initialValue + (this.waveFunc(this.i) * this.magnitude) / 100;
                    if (this.inst.alpha < 0)
                        this.inst.alpha = 0;
                    if (this.inst.alpha > 1)
                        this.inst.alpha = 1;
                    break;
                case 8:
                    if (this.inst.x !== this._lastKnownValue)
                        this._initialValue += this.inst.x - this._lastKnownValue;
                    if (this.inst.y !== this._lastKnownValue2)
                        this._initialValue2 += this.inst.y - this._lastKnownValue2;
                    var radian = ls.MathUtils.toRadian(this.inst.angle);
                    this.inst.x = this._initialValue + Math.cos(radian) * this.waveFunc(this.i) * this.magnitude;
                    this.inst.y = this._initialValue2 + Math.sin(radian) * this.waveFunc(this.i) * this.magnitude;
                    this._lastKnownValue = this.inst.x;
                    this._lastKnownValue2 = this.inst.y;
                    break;
            }
        };
        p.waveFunc = function (x) {
            x = ls.eval_e(x);
            switch (this.wave) {
                case 0:
                    return Math.sin(x);
                case 1:
                    if (x < this._pi_2)
                        return x / this._pi_2;
                    else if (x <= this._3pi_2)
                        return 1 - (2 * (x - this._pi_2) / Math.PI);
                    else
                        return (x - this._3pi_2) / this._pi_2 - 1;
                case 2:
                    return 2 * x / this._2pi - 1;
                case 3:
                    return -2 * x / this._2pi + 1;
                case 4:
                    return x < Math.PI ? -1 : 1;
            }
            return 0;
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.isActive = function ($event) {
            return { instances: [this.inst], status: this.active };
        };
        p.compareMovement = function ($event) {
            return { instances: [this.inst], status: this.movement == ls.eval_e($event.movement) };
        };
        p.comparePeriod = function ($event) {
            return { instances: [this.inst], status: ls.compare(this.period, $event.operationType, $event.value) };
        };
        p.compareMagnitude = function ($event) {
            return { instances: [this.inst], status: ls.compare(this.period, $event.operationType, $event.value) };
        };
        p.compareWave = function ($event) {
            return { instances: [this.inst], status: this.wave == ls.eval_e($event.wave) };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.setActive = function (active) {
            this.active = ls.eval_e(active);
        };
        p.setPeriod = function (period) {
            this.period = ls.eval_e(period);
        };
        p.setMagnitude = function (magnitude) {
            this.magnitude = ls.eval_e(magnitude);
        };
        p.setMovement = function (movement) {
            this.movement = ls.eval_e(this.movement);
            this.init();
        };
        p.setWave = function (wave) {
            this.wave = ls.eval_e(this.wave);
        };
        p.setPhase = function (x) {
            x = ls.eval_e(x);
            this.i = (x * this._2pi) % this._2pi;
        };
        p.updateInitialState = function () {
            this.init();
        };
        d(p, "cyclePosition"
            /////////////////////////////////////////////////////////////////
            //                        expressions
            /////////////////////////////////////////////////////////////////
            ,function () {
                return Math.floor(this.i / this._2pi);
            }
        );
        d(p, "value"
            ,function () {
                return Math.floor(this.waveFunc(this.i) * this.magnitude);
            }
        );
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.active = this.active;
            o.movement = this.movement;
            o.wave = this.wave;
            o.period = this.period;
            o.periodRandom = this.periodRandom;
            o.periodOffset = this.periodOffset;
            o.periodOffsetRandom = this.periodOffsetRandom;
            o.magnitude = this.magnitude;
            o.magnitudeRandom = this.magnitudeRandom;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.active = o.active;
                this.movement = o.movement;
                this.wave = o.wave;
                this.period = o.period;
                this.periodRandom = o.periodRandom;
                this.periodOffset = o.periodOffset;
                this.periodOffsetRandom = o.periodOffsetRandom;
                this.magnitude = o.magnitude;
                this.magnitudeRandom = o.magnitudeRandom;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.active = this.active;
            bh.movement = this.movement;
            bh.wave = this.wave;
            bh.period = this.period;
            bh.periodRandom = this.periodRandom;
            bh.periodOffset = this.periodOffset;
            bh.periodOffsetRandom = this.periodOffsetRandom;
            bh.magnitude = this.magnitude;
            bh.magnitudeRandom = this.magnitudeRandom;
            return bh;
        };
        return SinBehavior;
    }(ls.BaseBehavior));
    ls.SinBehavior = SinBehavior;
    egret.registerClass(SinBehavior,'ls.SinBehavior');
    var SinIsActiveEvent = (function (_super) {
        __extends(SinIsActiveEvent, _super);
        function SinIsActiveEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=SinIsActiveEvent,p=c.prototype;
        return SinIsActiveEvent;
    }(ls.BaseEvent));
    ls.SinIsActiveEvent = SinIsActiveEvent;
    egret.registerClass(SinIsActiveEvent,'ls.SinIsActiveEvent');
    var SinCompareMovementEvent = (function (_super) {
        __extends(SinCompareMovementEvent, _super);
        function SinCompareMovementEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=SinCompareMovementEvent,p=c.prototype;
        return SinCompareMovementEvent;
    }(ls.BaseEvent));
    ls.SinCompareMovementEvent = SinCompareMovementEvent;
    egret.registerClass(SinCompareMovementEvent,'ls.SinCompareMovementEvent');
    var SinComparePeriodEvent = (function (_super) {
        __extends(SinComparePeriodEvent, _super);
        function SinComparePeriodEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=SinComparePeriodEvent,p=c.prototype;
        return SinComparePeriodEvent;
    }(ls.BaseEvent));
    ls.SinComparePeriodEvent = SinComparePeriodEvent;
    egret.registerClass(SinComparePeriodEvent,'ls.SinComparePeriodEvent');
    var SinCompareMagnitudeEvent = (function (_super) {
        __extends(SinCompareMagnitudeEvent, _super);
        function SinCompareMagnitudeEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=SinCompareMagnitudeEvent,p=c.prototype;
        return SinCompareMagnitudeEvent;
    }(ls.BaseEvent));
    ls.SinCompareMagnitudeEvent = SinCompareMagnitudeEvent;
    egret.registerClass(SinCompareMagnitudeEvent,'ls.SinCompareMagnitudeEvent');
    var SinCompareWaveEvent = (function (_super) {
        __extends(SinCompareWaveEvent, _super);
        function SinCompareWaveEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=SinCompareWaveEvent,p=c.prototype;
        return SinCompareWaveEvent;
    }(ls.BaseEvent));
    ls.SinCompareWaveEvent = SinCompareWaveEvent;
    egret.registerClass(SinCompareWaveEvent,'ls.SinCompareWaveEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map