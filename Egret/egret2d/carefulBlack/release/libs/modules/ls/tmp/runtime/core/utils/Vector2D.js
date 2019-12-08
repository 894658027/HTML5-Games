var ls;
(function (ls) {
    var Vector2D = (function () {
        function Vector2D(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._x = x;
            this._y = y;
        }
        var d = __define,c=Vector2D,p=c.prototype;
        d(p, "x"
            ,function () {
                return this._x;
            }
            ,function (value) {
                this._x = value;
            }
        );
        d(p, "y"
            ,function () {
                return this._y;
            }
            ,function (value) {
                this._y = value;
            }
        );
        d(p, "length"
            ,function () {
                return Math.sqrt(this._x * this._x + this._y * this._y);
            }
            ,function (value) {
                var a = this.angle;
                this._x = Math.cos(a) * value;
                this._y = Math.sin(a) * value;
            }
        );
        d(p, "lengthSQ"
            ,function () {
                return this._x * this._x + this._y * this._y;
            }
        );
        d(p, "angle"
            ,function () {
                return Math.atan2(this._y, this._x);
            }
            ,function (value) {
                var len = this.length;
                this._x = Math.cos(value) * len;
                this._y = Math.sin(value) * len;
            }
        );
        d(p, "rotation",undefined
            ,function (value) {
                var _angle = value / 180 * Math.PI;
                this.angle = _angle;
            }
        );
        p.normalize = function () {
            var len = this.length;
            if (!len)
                return this;
            this.x /= len;
            this.y /= len;
            return this;
        };
        //截取当前向量(多余的裁掉，少的不裁)        
        p.truncate = function (max) {
            this.length = Math.min(max, this.length);
            return this;
        };
        p.reverse = function () {
            this._x = -this._x;
            this._y = -this._y;
            return this;
        };
        p.isNormalized = function () {
            return this.length == 1;
        };
        //向量积,又称为点积(计算投影)，如果值为负，那么，两向量所形成的角度大于90度，如果为零,那么垂直，否则角度小于90度  
        //通过它可以知道两个向量的相似性，利用点积可以判断一个多边形是否面向摄像机还是背向摄像机
        //向量的点积与它们的夹角余弦成正比，因此，在聚光灯效果计算中，可以根据点积来得到光照效果，点积越大，夹角越小，则物理离光照的轴线越近，光照越强
        p.dotProd = function (v2) {
            return this._x * v2._x + this._y * v2._y;
        };
        //判断两个向量是否垂直        
        p.crossProd = function (v2) {
            return this.getCross(v2) === 0;
        };
        //cross值        
        p.getCross = function (v2) {
            return this._x * v2._y - this._y * v2._x;
        };
        //返回两向量夹角的角度值，两个单位向量的点积得到两个向量的夹角的cos值
        Vector2D.angleBetween = function (v1, v2) {
            if (!v1.isNormalized())
                v1 = v1.clone().normalize();
            if (!v2.normalize())
                v2 = v2.clone().normalize();
            return Math.acos(v1.dotProd(v2));
        };
        d(p, "perp"
            //返回法线向量（perpendicular）      
            ,function () {
                return new Vector2D(-this._y, this._x);
            }
        );
        //返回向量的符号值        
        p.sign = function (v2) {
            return this.perp.dotProd(v2) < 0 ? -1 : 1;
        };
        p.distance = function (v2) {
            return Math.sqrt(this.distanceSQ(v2));
        };
        p.distanceSQ = function (v2) {
            var dx = v2._x - this._x;
            var dy = v2._y - this._y;
            return dx * dx + dy * dy;
        };
        p.equals = function (v2) {
            return this._x === v2._x && this._y === v2._y;
        };
        p.isZero = function () {
            return this._x === 0 && this._y === 0;
        };
        p.scale = function (value) {
            this._x *= value;
            this._y *= value;
            return this;
        };
        p.add = function (x, y) {
            this._x += x;
            this._y += y;
            return this;
        };
        p.substruct = function (x, y) {
            this._x -= x;
            this._y -= y;
            return this;
        };
        p.multiply = function (x, y) {
            this._x *= x;
            this._y *= y;
            return this;
        };
        p.divide = function (x, y) {
            this._x /= x;
            this._y /= y;
            return this;
        };
        p.clone = function () {
            var v = new Vector2D();
            v._x = this._x;
            v._y = this._y;
            return v;
        };
        p.toString = function () {
            return "(x=" + this.x + ", y=" + this.y + ")";
        };
        return Vector2D;
    }());
    ls.Vector2D = Vector2D;
    egret.registerClass(Vector2D,'ls.Vector2D');
})(ls || (ls = {}));
//# sourceMappingURL=Vector2D.js.map