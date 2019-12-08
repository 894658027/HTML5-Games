var ls;
(function (ls) {
    var AIArray = (function (_super) {
        __extends(AIArray, _super);
        function AIArray() {
            _super.call(this);
            this._arrCache = [];
            this._arr = [];
            this._isCreateArray = false;
            this.curX = 0;
            this.curY = 0;
            this.curZ = 0;
            this.curValue = 0;
        }
        var d = __define,c=AIArray,p=c.prototype;
        p.initialize = function () {
            this.setArraySize(this.arr_width, this.arr_height, this.arr_depth);
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onArrayCreated));
        };
        d(p, "width"
            //////////////////////expressions/////////////////////////
            //////////////////////前面几个的值是动态的/////////////////////////
            ,function () {
                return this.arr_width;
            }
        );
        d(p, "height"
            ,function () {
                return this.arr_height;
            }
        );
        d(p, "depth"
            ,function () {
                return this.arr_depth;
            }
        );
        //是否超出三维数组范围
        p.isOutOfRange = function (xIndex, yIndex, zIndex) {
            xIndex = Math.floor(xIndex);
            yIndex = Math.floor(yIndex);
            zIndex = Math.floor(zIndex);
            if (isNaN(xIndex))
                xIndex = 0;
            if (isNaN(yIndex))
                yIndex = 0;
            if (isNaN(zIndex))
                zIndex = 0;
            if (xIndex < 0 || xIndex > this.arr_width - 1)
                return true;
            if (yIndex < 0 || yIndex > this.arr_height - 1)
                return true;
            if (zIndex < 0 || zIndex > this.arr_depth - 1)
                return true;
            return false;
        };
        //获取当前索引的值，如果索引超出数组范围，则取零
        p.at = function (xIndex, yIndex, zIndex) {
            xIndex = Math.floor(xIndex);
            yIndex = Math.floor(yIndex);
            zIndex = Math.floor(zIndex);
            if (isNaN(xIndex))
                xIndex = 0;
            if (isNaN(yIndex))
                yIndex = 0;
            if (isNaN(zIndex))
                zIndex = 0;
            if (xIndex < 0 || xIndex > this.arr_width - 1)
                return 0;
            if (yIndex < 0 || yIndex > this.arr_height - 1)
                return 0;
            if (zIndex < 0 || zIndex > this.arr_depth - 1)
                return 0;
            return this._arr[xIndex][yIndex][zIndex];
        };
        //设置数组当前索引的值，如果索引超出数组范围，则跳出
        p.setValue = function (xIndex, yIndex, zIndex, value) {
            xIndex = Math.floor(xIndex);
            yIndex = Math.floor(yIndex);
            zIndex = Math.floor(zIndex);
            if (isNaN(xIndex))
                xIndex = 0;
            if (isNaN(yIndex))
                yIndex = 0;
            if (isNaN(zIndex))
                zIndex = 0;
            if (xIndex < 0 || xIndex > this.arr_width - 1)
                return;
            if (yIndex < 0 || yIndex > this.arr_height - 1)
                return;
            if (zIndex < 0 || zIndex > this.arr_depth - 1)
                return;
            this._arr[xIndex][yIndex][zIndex] = value;
        };
        p.compareValues = function (va, vb) {
            if (ls.is_number(va) && ls.is_number(vb)) {
                return va - vb;
            }
            else {
                var sa = "" + va;
                var sb = "" + vb;
                if (sa < sb)
                    return -1;
                else if (sa > sb)
                    return 1;
                return 0;
            }
        };
        //////////////////////conditions/////////////////////////
        p.onForEachArrayElement = function ($event) {
            this.arr_width = this.arr_width || 0;
            this.arr_height = this.arr_height || 0;
            this.arr_depth = this.arr_depth || 0;
            $event.array = this;
            return { instances: [this], status: this.arr_width > 0 || this.arr_height > 0 || this.arr_depth > 0, data: $event };
        };
        p.compareXDimention = function ($event) {
            var isOutRange = this.isOutOfRange($event.xDimention, 0, 0);
            return { instances: [this], status: isOutRange ? false : ls.compare(this.at($event.xDimention, 0, 0), $event.operationType, $event.value) };
        };
        p.compareXYDimention = function ($event) {
            var isOutRange = this.isOutOfRange($event.xDimention, $event.yDimention, 0);
            return { instances: [this], status: isOutRange ? false : ls.compare(this.at($event.xDimention, $event.yDimention, 0), $event.operationType, $event.value) };
        };
        p.compareXYZDimention = function ($event) {
            var isOutRange = this.isOutOfRange($event.xDimention, $event.yDimention, $event.zDimention);
            return { instances: [this], status: isOutRange ? false : ls.compare(this.at($event.xDimention, $event.yDimention, $event.zDimention), $event.operationType, $event.value) };
        };
        //判断某比维的长度
        p.compareArraySize = function ($event) {
            var s = 0;
            switch ($event.xyzDimention) {
                case 1:
                    s = this.arr_width;
                    break;
                case 2:
                    s = this.arr_height;
                    break;
                case 3:
                    s = this.arr_depth;
                    break;
            }
            return { instances: [this], status: ls.compare(s, $event.operationType, $event.value) };
        };
        //判断是否包含某值
        p.containsValue = function ($event) {
            var value = $event.value;
            for (var i = 0; i < this.arr_width; i++) {
                for (var j = 0; j < this.arr_height; j++) {
                    for (var k = 0; k < this.arr_depth; k++) {
                        var curValue = this.at(i, j, k);
                        if (curValue === value)
                            return { instances: [this], status: true };
                    }
                }
            }
            return { instances: [this], status: false };
        };
        //检测三维数组是否为空，为空的条件是只要其中一维的长度为零，即为空
        p.checkArrayIsEmpty = function ($event) {
            return { instances: [this], status: this.arr_width === 0 || this.arr_height === 0 || this.arr_depth === 0 };
        };
        //比较当前循环中的值，一般情况下是与循环一起用
        p.compareCurrentValue = function ($event) {
            var isOutRange = this.isOutOfRange(this.curX, this.curY, this.curZ);
            return { instances: [this], status: isOutRange ? false : ls.compare(this.at(this._arr[this.curX], this._arr[this.curY], this._arr[this.curZ]), $event.operationType, $event.value) };
        };
        //数组创建时Trigger
        p.onArrayCreated = function ($event) {
            return { instances: [this], status: true };
        };
        p.onArrayDestroyed = function ($event) {
            return { instances: [this], status: true };
        };
        //////////////////////actions/////////////////////////
        //将数组所有元素值置为零
        p.clearArray = function () {
            for (var i = 0; i < this.arr_width; i++) {
                for (var j = 0; j < this.arr_height; j++) {
                    for (var k = 0; k < this.arr_depth; k++) {
                        this._arr[i][j][k] = 0;
                    }
                }
            }
        };
        p.setXDimentionValue = function (xIndex, value) {
            xIndex = ls.eval_e(xIndex);
            ls.assert(typeof xIndex !== "number", "AIArray setXDimentionValue parameter type incorrect!!");
            this.setValue(xIndex, 0, 0, ls.eval_e(value));
        };
        p.setXYDimentionValue = function (xIndex, yIndex, value) {
            xIndex = ls.eval_e(xIndex);
            yIndex = ls.eval_e(yIndex);
            ls.assert(typeof xIndex !== "number" || typeof yIndex !== "number", "AIArray setXYDimentionValue parameter type incorrect!!");
            this.setValue(xIndex, yIndex, 0, ls.eval_e(value));
        };
        p.setXYZDimentionValue = function (xIndex, yIndex, zIndex, value) {
            xIndex = ls.eval_e(xIndex);
            yIndex = ls.eval_e(yIndex);
            zIndex = ls.eval_e(zIndex);
            ls.assert(typeof xIndex !== "number" || typeof yIndex !== "number" || typeof zIndex !== "number", "AIArray setXYZDimentionValue parameter type incorrect!!");
            this.setValue(xIndex, yIndex, zIndex, ls.eval_e(value));
        };
        //初始化数组大小
        p.setArraySize = function (width, height, depth) {
            width = Math.floor(ls.eval_e(width));
            height = Math.floor(ls.eval_e(height));
            depth = Math.floor(ls.eval_e(depth));
            if (width < 0)
                width = 0;
            if (height < 0)
                height = 0;
            if (depth < 0)
                depth = 0;
            if (this.arr_width === width && this.arr_height === height && this.arr_depth === depth && this._isCreateArray)
                return;
            this.arr_width = width;
            this.arr_height = height;
            this.arr_depth = depth;
            //创建一个三维数组
            var a = this._arr;
            a.length = width;
            for (var x = 0; x < this.arr_width; x++) {
                a[x] = [];
                a[x].length = height;
                for (var y = 0; y < this.arr_height; y++) {
                    a[x][y] = [];
                    a[x][y].length = depth;
                    for (var z = 0; z < this.arr_depth; z++) {
                        a[x][y][z] = 0;
                    }
                }
            }
            this._isCreateArray = true;
        };
        p.deleteArray = function (index, xyzDimention) {
            index = ls.eval_e(index);
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof index !== "number" || typeof dims !== "number", "AIArray deleteArray parameter type incorrect!!");
            if (index < 0)
                return;
            switch (dims) {
                case 1:
                    if (index >= this.arr_width)
                        break;
                    this._arr.splice(index, 1);
                    this.arr_width--;
                    break;
                case 2:
                    if (index >= this.arr_height)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        this._arr[i].splice(index, 1);
                    }
                    this.arr_height--;
                    break;
                case 3:
                    if (index >= this.arr_depth)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            this._arr[i][j].splice(index, 1);
                        }
                    }
                    this.arr_depth--;
                    break;
            }
        };
        //将某个值插入到数组的某维，如果索引超出范围，那么无效插入
        p.insertArray = function (value, index, xyzDimention) {
            value = ls.eval_e(value);
            index = ls.eval_e(index);
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof index !== "number" || typeof dims !== "number", "AIArray insertArray parameter type incorrect!!");
            if (index < 0)
                return;
            switch (dims) {
                case 1:
                    if (index > this.arr_width)
                        break;
                    if (this.isOutOfRange(index, 0, 0))
                        break;
                    this._arr.splice(index, 0, []);
                    for (var i = 0; i < this.arr_height; i++) {
                        this._arr[index][i] = [];
                        for (var j = 0; j < this.arr_depth; j++) {
                            this._arr[index][i][j] = value;
                        }
                    }
                    this.arr_width++;
                    break;
                case 2:
                    if (index > this.arr_height)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        this._arr[i].splice(index, 0, [[]]);
                        for (var k = 0; k < this.arr_height; k++) {
                            this._arr[i][index][k] = value;
                        }
                    }
                    this.arr_height++;
                    break;
                case 3:
                    if (index > this.arr_depth)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            this._arr[i][j].splice(index, 0, value);
                        }
                    }
                    this.arr_depth++;
                    break;
            }
        };
        //删除某维度的数据
        p.popArray = function (where, xyzDimention) {
            var dims = ls.eval_e(xyzDimention);
            where = ls.eval_e(where);
            ls.assert(typeof dims !== "number" || typeof where !== "number", "AIArray popArray parameter type incorrect!!");
            switch (dims) {
                case 1:
                    if (this.arr_width === 0)
                        break;
                    if (where === 0)
                        this._arr.pop();
                    else
                        this._arr.shift();
                    this.arr_width--;
                    break;
                case 2:
                    if (this.arr_height === 0)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        if (where === 0)
                            this._arr[i].pop();
                        else
                            this._arr[i].shift();
                    }
                    this.arr_height--;
                    break;
                case 3:
                    if (this.arr_depth === 0)
                        break;
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            if (where === 0)
                                this._arr[i][j].pop();
                            else
                                this._arr[i][j].shift();
                        }
                    }
                    this.arr_depth--;
                    break;
            }
        };
        //将某值添加到某维度的前面或者后面
        p.pushArray = function (where, value, xyzDimention) {
            where = ls.eval_e(where);
            value = ls.eval_e(value);
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof where !== "number" || typeof dims !== "number", "AIArray pushArray parameter type incorrect!!");
            switch (dims) {
                case 1:
                    var pushIndex = 0;
                    if (where === 0) {
                        pushIndex = this.arr_width;
                        this._arr.push([]);
                    }
                    else {
                        pushIndex = 0;
                        this._arr.unshift([]);
                    }
                    for (var j = 0; j < this.arr_height; j++) {
                        this._arr[pushIndex][j] = [];
                        for (var k = 0; k < this.arr_depth; k++) {
                            this._arr[pushIndex][j][k] = value;
                        }
                    }
                    this.arr_width++;
                    break;
                case 2:
                    for (var i = 0; i < this.arr_width; i++) {
                        var pushIndex = 0;
                        if (where === 0) {
                            pushIndex = this.arr_height;
                            this._arr[i].push([]);
                        }
                        else {
                            pushIndex = 0;
                            this._arr[i].unshift([]);
                        }
                        for (var k = 0; k < this.arr_depth; k++) {
                            this._arr[i][pushIndex][k] = value;
                        }
                    }
                    this.arr_height++;
                    break;
                case 3:
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            if (where === 0)
                                this._arr[i][j].push(value);
                            else
                                this._arr[i][j].unshift(value);
                        }
                    }
                    this.arr_depth++;
                    break;
            }
        };
        p.reverseArray = function (xyzDimention) {
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof dims !== "number", "AIArray reverseArray parameter type incorrect!!");
            switch (dims) {
                case 1:
                    this._arr.reverse();
                    break;
                case 2:
                    for (var i = 0; i < this.arr_width; i++)
                        this._arr[i].reverse();
                    break;
                case 3:
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            this._arr[i][j].reverse();
                        }
                    }
                    break;
            }
        };
        p.sortArray = function (xyzDimention) {
            var dims = ls.eval_e(xyzDimention);
            ls.assert(typeof dims !== "number", "AIArray sortArray parameter type incorrect!!");
            if (this.arr_width === 0 || this.arr_height === 0 || this.arr_depth === 0)
                return;
            var self = this;
            switch (dims) {
                case 1:
                    this._arr.sort(function (a, b) {
                        return self.compareValues(a[0][0], b[0][0]);
                    });
                    break;
                case 2:
                    for (var i = 0; i < this.arr_width; i++) {
                        this._arr[i].sort(function (a, b) {
                            return self.compareValues(a[0], b[0]);
                        });
                    }
                    break;
                case 3:
                    for (var i = 0; i < this.arr_width; i++) {
                        for (var j = 0; j < this.arr_height; j++) {
                            this._arr[i][j].sort(this.compareValues);
                        }
                    }
                    break;
            }
        };
        p.destroyArray = function () {
            this._arr.length = 0;
            this.arr_width = this.arr_height = this.arr_depth = 0;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onArrayDestroyed));
        };
        /////////////////////////////expressions/////////////////////////////
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["curX"] = this.curX;
            o["curY"] = this.curY;
            o["curZ"] = this.curZ;
            o["curValue"] = this.curValue;
            o["arr_width"] = this.arr_width;
            o["arr_height"] = this.arr_height;
            o["arr_depth"] = this.arr_depth;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this.curX = o["curX"];
                this.curY = o["curY"];
                this.curZ = o["curZ"];
                this.curValue = o["curValue"];
                this.arr_width = o["arr_width"];
                this.arr_height = o["arr_height"];
                this.arr_depth = o["arr_depth"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.curX = this.curX;
            cl.curY = this.curY;
            cl.curZ = this.curZ;
            cl.curValue = this.curValue;
            cl.arr_width = this.arr_width;
            cl.arr_height = this.arr_height;
            cl.arr_depth = this.arr_depth;
            cl.initialize();
            return cl;
        };
        return AIArray;
    }(ls.AIObject));
    ls.AIArray = AIArray;
    egret.registerClass(AIArray,'ls.AIArray');
    // export class OnForEachArrayElementEvent extends ls.BaseEvent{
    //     xyzDimention: any;
    //     array: AIArray;
    //     constructor(){super();}
    // }
    var CompareXDimentionEvent = (function (_super) {
        __extends(CompareXDimentionEvent, _super);
        function CompareXDimentionEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareXDimentionEvent,p=c.prototype;
        return CompareXDimentionEvent;
    }(ls.BaseEvent));
    ls.CompareXDimentionEvent = CompareXDimentionEvent;
    egret.registerClass(CompareXDimentionEvent,'ls.CompareXDimentionEvent');
    var CompareXYDimentionEvent = (function (_super) {
        __extends(CompareXYDimentionEvent, _super);
        function CompareXYDimentionEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareXYDimentionEvent,p=c.prototype;
        return CompareXYDimentionEvent;
    }(ls.BaseEvent));
    ls.CompareXYDimentionEvent = CompareXYDimentionEvent;
    egret.registerClass(CompareXYDimentionEvent,'ls.CompareXYDimentionEvent');
    var CompareXYZDimentionEvent = (function (_super) {
        __extends(CompareXYZDimentionEvent, _super);
        function CompareXYZDimentionEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareXYZDimentionEvent,p=c.prototype;
        return CompareXYZDimentionEvent;
    }(ls.BaseEvent));
    ls.CompareXYZDimentionEvent = CompareXYZDimentionEvent;
    egret.registerClass(CompareXYZDimentionEvent,'ls.CompareXYZDimentionEvent');
    var CompareArraySizeEvent = (function (_super) {
        __extends(CompareArraySizeEvent, _super);
        function CompareArraySizeEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareArraySizeEvent,p=c.prototype;
        return CompareArraySizeEvent;
    }(ls.BaseEvent));
    ls.CompareArraySizeEvent = CompareArraySizeEvent;
    egret.registerClass(CompareArraySizeEvent,'ls.CompareArraySizeEvent');
    var ContainsValueEvent = (function (_super) {
        __extends(ContainsValueEvent, _super);
        function ContainsValueEvent() {
            _super.call(this);
        }
        var d = __define,c=ContainsValueEvent,p=c.prototype;
        return ContainsValueEvent;
    }(ls.BaseEvent));
    ls.ContainsValueEvent = ContainsValueEvent;
    egret.registerClass(ContainsValueEvent,'ls.ContainsValueEvent');
    var CheckArrayIsEmptyEvent = (function (_super) {
        __extends(CheckArrayIsEmptyEvent, _super);
        function CheckArrayIsEmptyEvent() {
            _super.call(this);
        }
        var d = __define,c=CheckArrayIsEmptyEvent,p=c.prototype;
        return CheckArrayIsEmptyEvent;
    }(ls.BaseEvent));
    ls.CheckArrayIsEmptyEvent = CheckArrayIsEmptyEvent;
    egret.registerClass(CheckArrayIsEmptyEvent,'ls.CheckArrayIsEmptyEvent');
    var CompareCurrentValueEvent = (function (_super) {
        __extends(CompareCurrentValueEvent, _super);
        function CompareCurrentValueEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareCurrentValueEvent,p=c.prototype;
        return CompareCurrentValueEvent;
    }(ls.BaseEvent));
    ls.CompareCurrentValueEvent = CompareCurrentValueEvent;
    egret.registerClass(CompareCurrentValueEvent,'ls.CompareCurrentValueEvent');
    var OnArrayCreatedEvent = (function (_super) {
        __extends(OnArrayCreatedEvent, _super);
        function OnArrayCreatedEvent() {
            _super.call(this);
        }
        var d = __define,c=OnArrayCreatedEvent,p=c.prototype;
        return OnArrayCreatedEvent;
    }(ls.BaseEvent));
    ls.OnArrayCreatedEvent = OnArrayCreatedEvent;
    egret.registerClass(OnArrayCreatedEvent,'ls.OnArrayCreatedEvent');
    var OnArrayDestroyedEvent = (function (_super) {
        __extends(OnArrayDestroyedEvent, _super);
        function OnArrayDestroyedEvent() {
            _super.call(this);
        }
        var d = __define,c=OnArrayDestroyedEvent,p=c.prototype;
        return OnArrayDestroyedEvent;
    }(ls.BaseEvent));
    ls.OnArrayDestroyedEvent = OnArrayDestroyedEvent;
    egret.registerClass(OnArrayDestroyedEvent,'ls.OnArrayDestroyedEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map