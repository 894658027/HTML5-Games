var ls;
(function (ls) {
    var AIObject = (function (_super) {
        __extends(AIObject, _super);
        function AIObject() {
            _super.call(this);
            this.id = 0;
            this.name = "Object";
            this.isModel = false;
            this.timeScale = 1.0;
            this.parallaxX = 100;
            this.parallaxY = 100;
            this.isDead = false;
            this.global = false;
            this.variables = {};
            this.index = 0;
            //每个目标都有特定的条件
            //conditions: any = {};
            this.paramInstances = {};
            this.actionSaves = {};
            this.currentStatus = true;
            this.selfStatus = true; //自身状态
            this._uid = 0;
            AIObject._uniqueID++;
            AIObject.U_ID++;
            this._uid = AIObject.U_ID;
            this.name = "Object";
            this.plugin = egret.getQualifiedClassName(this);
            ls.Trigger.register(this);
        }
        var d = __define,c=AIObject,p=c.prototype;
        d(p, "u_id"
            ,function () {
                return this._uid;
            }
        );
        d(p, "dt"
            ,function () {
                return this.timeScale * ls.AISystem.instance.dt1;
            }
        );
        p.getClass = function () {
            return this["constructor"];
        };
        /**
         * 初始化，所有的插件都扩展自这个
         */
        p.initialize = function () {
        };
        /**
         * 每帧频执行一次
         */
        p.onTick = function () {
        };
        p.addVariable = function (variableName, value) {
            this[variableName] = ls.eval_e(value);
            this.variables[variableName] = ls.eval_e(value);
        };
        p.getFirstPicked = function () {
            var objects = ls.World.getInstance().objectHash[this.name];
            if (objects)
                return objects[0];
        };
        /**比较两个值*/
        p.compareTwoValue = function ($compareTwoValues) {
            return { instances: [this], status: ls.compare($compareTwoValues.value1, $compareTwoValues.operationType, $compareTwoValues.value2) };
        };
        /**判断值是否在两个值内*/
        p.isBetweenValues = function ($isBetweenValues) {
            var value = ls.eval_e($isBetweenValues.value);
            var lowerValue = ls.eval_e($isBetweenValues.lowerValue);
            var highValue = ls.eval_e($isBetweenValues.highValue);
            if (lowerValue < highValue)
                return { instances: [this], status: (value > lowerValue && value < highValue) };
            return { instances: [this], status: (value < lowerValue && value > highValue) };
        };
        /**是否是数字*/
        p.isNumberNaN = function ($isNumberNaN) {
            return { instances: [this], status: (typeof ls.eval_e($isNumberNaN.value) === "number") };
        };
        /**
         * 切换场景时销毁
         *
         */
        p.destoryOnChangeScene = function () {
            this.destory();
        };
        p.destory = function () {
        };
        p.saveToJSON = function () {
            return {
                "plugin": egret.getQualifiedClassName(this),
                "name": this.name,
                "isModel": this.isModel,
                "paramInstances": this.paramInstances,
                "timeScale": this.timeScale,
                "global": this.global
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.plugin = o["plugin"];
                this.name = o["name"];
                this.isModel = o["isModel"];
                this.paramInstances = o["paramInstances"];
                this.timeScale = o["timeScale"];
                this.global = o["global"];
            }
        };
        p.clone = function () {
            var cl = this.getClass();
            var cloneInstance = new cl();
            cloneInstance.name = this.name;
            cloneInstance.isModel = false;
            cloneInstance.timeScale = this.timeScale;
            cloneInstance.global = this.global;
            //clone variables
            for (var key in this.variables)
                cloneInstance.addVariable(key, this.variables[key]);
            return cloneInstance;
        };
        AIObject._uniqueID = 0;
        AIObject.U_ID = 0;
        return AIObject;
    }(egret.EventDispatcher));
    ls.AIObject = AIObject;
    egret.registerClass(AIObject,'ls.AIObject');
    var CompareTwoValuesEvent = (function (_super) {
        __extends(CompareTwoValuesEvent, _super);
        function CompareTwoValuesEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareTwoValuesEvent,p=c.prototype;
        return CompareTwoValuesEvent;
    }(ls.BaseEvent));
    ls.CompareTwoValuesEvent = CompareTwoValuesEvent;
    egret.registerClass(CompareTwoValuesEvent,'ls.CompareTwoValuesEvent');
    var IsBetweenValuesEvent = (function (_super) {
        __extends(IsBetweenValuesEvent, _super);
        function IsBetweenValuesEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsBetweenValuesEvent,p=c.prototype;
        return IsBetweenValuesEvent;
    }(ls.BaseEvent));
    ls.IsBetweenValuesEvent = IsBetweenValuesEvent;
    egret.registerClass(IsBetweenValuesEvent,'ls.IsBetweenValuesEvent');
    var IsNumberNaNEvent = (function (_super) {
        __extends(IsNumberNaNEvent, _super);
        function IsNumberNaNEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsNumberNaNEvent,p=c.prototype;
        return IsNumberNaNEvent;
    }(ls.BaseEvent));
    ls.IsNumberNaNEvent = IsNumberNaNEvent;
    egret.registerClass(IsNumberNaNEvent,'ls.IsNumberNaNEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AIObject.js.map