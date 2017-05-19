






var ls;
(function (ls) {
    var BaseClass = (function (_super) {
        __extends(BaseClass, _super);
        function BaseClass() {
            _super.call(this);
            this._sid = 0;
            BaseClass.UID++;
            this._sid = BaseClass.UID;
        }
        var d = __define,c=BaseClass,p=c.prototype;
        d(p, "sid"
            ,function () {
                return this._sid;
            }
        );
        d(p, "className"
            ,function () {
                return egret.getQualifiedClassName(this);
            }
        );
        p.getClass = function () {
            return this["constructor"];
        };
        p.clone = function () {
            var cl = this.getClass();
            return new cl();
        };
        BaseClass.UID = 0;
        return BaseClass;
    }(egret.EventDispatcher));
    ls.BaseClass = BaseClass;
    egret.registerClass(BaseClass,'ls.BaseClass');
})(ls || (ls = {}));
//# sourceMappingURL=BaseClass.js.map
var ls;
(function (ls) {
    var loopSelections = (function () {
        function loopSelections() {
        }
        var d = __define,c=loopSelections,p=c.prototype;
        return loopSelections;
    }());
    ls.loopSelections = loopSelections;
    egret.registerClass(loopSelections,'ls.loopSelections');
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.call(this);
            //动作索引
            this.index = 0;
            this.instances = {};
        }
        var d = __define,c=Action,p=c.prototype;
        return Action;
    }(ls.BaseClass));
    ls.Action = Action;
    egret.registerClass(Action,'ls.Action');
})(ls || (ls = {}));
//# sourceMappingURL=Action.js.map
var ls;
(function (ls) {
    var BaseBehavior = (function (_super) {
        __extends(BaseBehavior, _super);
        function BaseBehavior() {
            _super.call(this);
            this.enabled = 1;
            this.isCreated = false;
            this.renderEnabled = true;
            ls.Trigger.register(this);
        }
        var d = __define,c=BaseBehavior,p=c.prototype;
        //当实例创建时
        p.onCreate = function () {
        };
        //帧循环
        p.tick = function () {
        };
        //保存成json        
        p.saveToJSON = function () {
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances
            };
        };
        //加载数据
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
            }
        };
        p.getClass = function () {
            return this["constructor"];
        };
        //销毁
        p.destory = function () {
        };
        p.clone = function () {
            var cl = this.getClass();
            var bh = new cl();
            bh.name = this.name;
            bh.enabled = this.enabled;
            bh.paramInstances = this.paramInstances;
            return bh;
        };
        return BaseBehavior;
    }(egret.EventDispatcher));
    ls.BaseBehavior = BaseBehavior;
    egret.registerClass(BaseBehavior,'ls.BaseBehavior');
})(ls || (ls = {}));
//# sourceMappingURL=BaseBehavior.js.map
var ls;
(function (ls) {
    var Circle = (function () {
        function Circle() {
            this.radius = 0;
        }
        var d = __define,c=Circle,p=c.prototype;
        return Circle;
    }());
    ls.Circle = Circle;
    egret.registerClass(Circle,'ls.Circle');
    /**
     * 暂时未实现椭圆之间的碰撞
     *
     */
    var Collision = (function () {
        function Collision() {
        }
        var d = __define,c=Collision,p=c.prototype;
        /**碰撞检测 默认采用边界盒 0 多边形 1 圆 2 点 */
        Collision.checkCollision = function (inst1, inst2) {
            if (!inst1 || !inst2 || inst1 == inst2)
                return false;
            if (!inst1.getBounds().intersects(inst2.getBounds()))
                return false;
            //inst1没有数据 inst2没有数据
            var pos1 = new ls.Vector2D(inst1.x, inst1.y);
            var pos2 = new ls.Vector2D(inst2.x, inst2.y);
            if (inst1.collisionType == 0 && inst2.collisionType == 0) {
                return this.checkPolygonCollisionPolygon(inst1, inst2);
            }
            else if (inst1.collisionType == 1 && inst2.collisionType == 1) {
                return this.checkCircleCollisionCircle(inst1, inst2);
            }
            else if (inst1.collisionType == 2 && inst2.collisionType == 2) {
                return this.checkDotCollisionDot(inst1, inst2);
            }
            else if (inst1.collisionType == 0 && inst2.collisionType == 1) {
                return this.checkCircleCollisionPolygon(inst2, inst1);
            }
            else if (inst1.collisionType == 1 && inst2.collisionType == 0) {
                return this.checkCircleCollisionPolygon(inst1, inst2);
            }
            else if (inst1.collisionType == 0 && inst2.collisionType == 2) {
                return this.checkDotCollisionPolygon(inst2, inst1);
            }
            else if (inst1.collisionType == 2 && inst2.collisionType == 0) {
                return this.checkDotCollisionPolygon(inst1, inst2);
            }
            else if (inst1.collisionType == 1 && inst2.collisionType == 2) {
                return this.checkDotCollisionCircle(inst2, inst1);
            }
            else if (inst1.collisionType == 2 && inst2.collisionType == 1) {
                return this.checkDotCollisionCircle(inst1, inst2);
            }
            return false;
        };
        /**
         * 检测两个对象多边形碰撞是否参与碰撞
         * @param polygonInst1
         * @param polygonInst2
         */
        Collision.checkPolygonCollisionPolygon = function (polygonInst1, polygonInst2) {
            var collisioning = false;
            if (polygonInst1.angle == 0 && polygonInst2.angle == 0 && polygonInst1.collisionVectorData.length == 1 && polygonInst2.collisionVectorData.length == 1 && polygonInst1.collisionVectorData[0].length == 4 && polygonInst2.collisionVectorData[0].length == 4) {
                collisioning = this.checkCommonCollision(polygonInst1, polygonInst2);
            }
            else {
                //如果碰撞区域为矩形，那么，算法为两个矩形进行碰撞检测
                if (polygonInst1.collisionIsRect && polygonInst2.collisionIsRect) {
                }
                var ovss = polygonInst1.getCacheCollisionPolygonData();
                var evss = polygonInst2.getCacheCollisionPolygonData();
                for (var i = 0; i < ovss.length; i++) {
                    var _ovs = ovss[i];
                    for (var j = 0; j < evss.length; j++) {
                        var _evs = evss[j];
                        collisioning = ls.SAT.sat(new ls.Vector2D(polygonInst1.x, polygonInst1.y), new ls.Vector2D(polygonInst2.x, polygonInst2.y), _ovs, _evs);
                        if (collisioning)
                            break;
                    }
                    if (collisioning)
                        break;
                }
            }
            return collisioning;
        };
        //矩形与矩形碰撞
        Collision.isCollsionWithRect = function (x1, y1, w1, h1, x2, y2, w2, h2) {
            if (x1 >= x2 && x1 >= x2 + w2)
                return false;
            else if (x1 <= x2 && x1 + w1 <= x2)
                return false;
            else if (y1 >= y2 && y1 >= y2 + h2)
                return false;
            else if (y1 <= y2 && y1 + h1 <= y2)
                return false;
            return true;
        };
        Collision.checkCommonCollision = function (inst1, inst2) {
            var inst1Data = inst1.collisionVectorData[0];
            var inst2Data = inst2.collisionVectorData[0];
            var rv1 = inst1Data.concat().reverse();
            var rv2 = inst2Data.concat().reverse();
            var inst1width = rv1[1].x - rv1[0].x;
            var inst1height = rv1[2].y - rv1[1].y;
            var inst2width = rv2[1].x - rv2[0].x;
            var inst2height = rv2[2].y - rv2[1].y;
            var m1 = new egret.Matrix();
            //先进行注册点移动
            m1.translate(rv1[0].x - inst1.anchorOffsetX, rv1[0].y - inst1.anchorOffsetY);
            //再进行缩放
            m1.scale(inst1.scaleX, inst1.scaleY);
            var x1 = inst1.x + m1.tx;
            var y1 = inst1.y + m1.ty;
            var m2 = new egret.Matrix();
            //先进行注册点移动
            m2.translate(rv2[0].x - inst2.anchorOffsetX, rv2[0].y - inst2.anchorOffsetY);
            //再进行缩放
            m2.scale(inst2.scaleX, inst2.scaleY);
            var x2 = inst2.x + m2.tx;
            var y2 = inst2.y + m2.ty;
            return this.isCollsionWithRect(x1, y1, inst1width * inst1.scaleX, inst1height * inst1.scaleY, x2, y2, inst2width * inst2.scaleX, inst2height * inst2.scaleY);
        };
        /**
         * 检测点与点的碰撞
         * @param dotInst1 实例1 点
         * @param dotInst2 实例2 点
         */
        Collision.checkDotCollisionDot = function (dotInst1, dotInst2) {
            var dot1 = dotInst1.collisionVectorData;
            var dot2 = dotInst2.collisionVectorData;
            var instRadius1 = dotInst1.angle * Math.PI / 180;
            var instRadius2 = dotInst2.angle * Math.PI / 180;
            //添加一个变换矩阵
            var m1 = new egret.Matrix();
            //先进行注册点移动
            m1.translate(dot1.x - dotInst1.anchorOffsetX, dot1.y - dotInst1.anchorOffsetY);
            //再进行缩放
            m1.scale(dotInst1.scaleX, dotInst1.scaleY);
            //再进行旋转
            m1.rotate(instRadius1);
            //添加一个变换矩阵
            var m2 = new egret.Matrix();
            //先进行注册点移动
            m2.translate(dot2.x - dotInst2.anchorOffsetX, dot2.y - dotInst2.anchorOffsetY);
            //再进行缩放
            m2.scale(dotInst2.scaleX, dotInst2.scaleY);
            //再进行旋转
            m2.rotate(instRadius2);
            var p1 = new ls.Vector2D(dotInst1.x + m1.tx, dotInst1.y + m1.ty);
            var p2 = new ls.Vector2D(dotInst2.x + m2.tx, dotInst2.y + m2.ty);
            return p1.equals(p2);
        };
        /**
         * 检测点与圆碰撞检测（点到圆心的距离小于半径），暂时不支持椭圆
         * @param dotInst 实例1 点
         * @param circleInst 实例2 圆
         */
        Collision.checkDotCollisionCircle = function (dotInst, circleInst) {
            var dot = dotInst.collisionVectorData;
            var circle = circleInst.collisionVectorData;
            var instRadius1 = dotInst.angle * Math.PI / 180;
            var instRadius2 = circleInst.angle * Math.PI / 180;
            //添加一个变换矩阵
            var m1 = new egret.Matrix();
            //先进行注册点移动
            m1.translate(dot.x - dotInst.anchorOffsetX, dot.y - dotInst.anchorOffsetY);
            //再进行缩放
            m1.scale(dotInst.scaleX, dotInst.scaleY);
            //再进行旋转
            m1.rotate(instRadius1);
            //添加一个变换矩阵
            var m2 = new egret.Matrix();
            //先进行注册点移动
            m2.translate(circle.center.x - circleInst.anchorOffsetX, circle.center.y - circleInst.anchorOffsetY);
            //再进行缩放
            m2.scale(circleInst.scaleX, circleInst.scaleY);
            //再进行旋转
            m2.rotate(instRadius2);
            var p1 = new ls.Vector2D(dotInst.x + m1.tx, dotInst.y + m1.ty);
            var p2 = new ls.Vector2D(circleInst.x + m2.tx, circleInst.y + m2.ty);
            var dist = p1.distanceSQ(p2);
            var realRadius = circle.radius * circleInst.scale;
            return dist <= realRadius * realRadius;
        };
        /**
         * 检测点与任意多边形凸碰撞检测
         * 原理：按顺时针，点到多边形某个点的向量与某个点与下一个点所形成的向量所形成的夹角，遍历所有，进行cross运算，如果有小于零的值，则不相交，否则相交
         * @param dotInst 实例1 点
         * @param polygonInst 实例2 多边形
         */
        Collision.checkDotCollisionPolygon = function (dotInst, polygonInst) {
            var dot = dotInst.collisionVectorData;
            var dotRadius = dotInst.angle * Math.PI / 180;
            var polygonRadius = polygonInst.angle * Math.PI / 180;
            var dotMatrix = new egret.Matrix();
            //先进行注册点移动
            dotMatrix.translate(dot.x - dotInst.anchorOffsetX, dot.y - dotInst.anchorOffsetY);
            //再进行缩放
            dotMatrix.scale(dotInst.scaleX, dotInst.scaleY);
            //再进行旋转
            dotMatrix.rotate(dotRadius);
            var dotPoint = new ls.Vector2D(dotInst.x + dotMatrix.tx, dotInst.y + dotMatrix.ty);
            var polygons = polygonInst.collisionVectorData;
            var isCollisioning = false;
            var ncoss = 0;
            if (polygons) {
                for (var i = 0; i < polygons.length; i++) {
                    var polygon = polygons[i];
                    for (var j = 0; j < polygon.length; j++) {
                        var v = polygon[j];
                        var nextIndex = (j + 1) % polygon.length;
                        var m1 = new egret.Matrix();
                        //先进行注册点移动
                        m1.translate(v.x - polygonInst.anchorOffsetX, v.y - polygonInst.anchorOffsetY);
                        //再进行缩放
                        m1.scale(polygonInst.scaleX, polygonInst.scaleY);
                        //再进行旋转
                        m1.rotate(polygonRadius);
                        var m2 = new egret.Matrix();
                        //先进行注册点移动
                        m2.translate(polygon[nextIndex].x - polygonInst.anchorOffsetX, polygon[nextIndex].y - polygonInst.anchorOffsetY);
                        //再进行缩放
                        m2.scale(polygonInst.scaleX, polygonInst.scaleY);
                        //再进行旋转
                        m2.rotate(polygonRadius);
                        var p1 = new ls.Vector2D(polygonInst.x + m1.tx, polygonInst.y + m1.ty);
                        var p2 = new ls.Vector2D(polygonInst.x + m2.tx, polygonInst.y + m2.ty);
                        if (p1.y == p2.y) {
                            continue;
                        }
                        if (dotPoint.y < (p1.y < p2.y ? p1.y : p2.y))
                            continue; //交点在p1p2延长线上
                        if (dotPoint.y >= (p1.y > p2.y ? p1.y : p2.y))
                            continue; //交点在p1p2延长线上
                        var x = (dotPoint.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
                        if (x > dotPoint.x) {
                            ncoss++; //只统计单边交点
                        }
                    }
                    isCollisioning = (ncoss % 2 == 1);
                }
                return isCollisioning;
            }
            return false;
        };
        /**
         * 检测圆与圆碰撞
         * @param circleInst1 实例1 圆
         * @param circleInst2 实例2 圆
         */
        Collision.checkCircleCollisionCircle = function (circleInst1, circleInst2) {
            var circle1 = circleInst1.collisionVectorData;
            var circle2 = circleInst2.collisionVectorData;
            var instRadius1 = circleInst1.angle * Math.PI / 180;
            var instRadius2 = circleInst2.angle * Math.PI / 180;
            //添加一个变换矩阵
            var m1 = new egret.Matrix();
            //先进行注册点移动
            m1.translate(circle1.center.x - circleInst1.anchorOffsetX, circle1.center.y - circleInst1.anchorOffsetY);
            //再进行缩放
            m1.scale(circleInst1.scaleX, circleInst1.scaleY);
            //再进行旋转
            m1.rotate(instRadius1);
            //添加一个变换矩阵
            var m2 = new egret.Matrix();
            //先进行注册点移动
            m2.translate(circle2.center.x - circleInst2.anchorOffsetX, circle2.center.y - circleInst2.anchorOffsetY);
            //再进行缩放
            m2.scale(circleInst2.scaleX, circleInst2.scaleY);
            //再进行旋转
            m2.rotate(instRadius2);
            var p1 = new ls.Vector2D(circleInst1.x + m1.tx, circleInst1.y + m1.ty);
            var p2 = new ls.Vector2D(circleInst2.x + m2.tx, circleInst2.y + m2.ty);
            var distSQ = p1.distanceSQ(p2);
            var realRadius1 = circle1.radius * circleInst1.scale;
            var realRadius2 = circle2.radius * circleInst2.scale;
            return distSQ <= (realRadius1 + realRadius2) * (realRadius1 + realRadius2);
        };
        /**
         * 圆与多边形碰撞检测，1、需要检测圆心多边形点的距离大小，2、需要检测圆心到边的投影距离大小
         * @param circleInst 实例1 圆数据
         * @param polygonInst 实例2 多边形数据
         */
        Collision.checkCircleCollisionPolygon = function (circleInst, polygonInst) {
            var circle = circleInst.collisionVectorData;
            var circleRadius = circleInst.angle * Math.PI / 180;
            var instRadius = polygonInst.angle * Math.PI / 180;
            var realRadius = circle.radius * circleInst.scale;
            var isCollisioning = false;
            var polygons = polygonInst.collisionVectorData;
            var m = new egret.Matrix();
            m.translate(circle.center.x - circleInst.anchorOffsetX, circle.center.y - circleInst.anchorOffsetY);
            m.scale(circleInst.scaleX, circleInst.scaleY);
            m.rotate(circleRadius);
            var circlePoint = new ls.Vector2D(circleInst.x + m.tx, circleInst.y + m.ty);
            if (polygons) {
                for (var i = 0; i < polygons.length; i++) {
                    var polygon = polygons[i];
                    for (var j = 0; j < polygon.length; j++) {
                        var v = polygon[j];
                        //添加一个变换矩阵
                        var m1 = new egret.Matrix();
                        //先进行注册点移动
                        m1.translate(v.x - polygonInst.anchorOffsetX, v.y - polygonInst.anchorOffsetY);
                        //再进行缩放
                        m1.scale(polygonInst.scaleX, polygonInst.scaleY);
                        //再进行旋转
                        m1.rotate(instRadius);
                        var v = new ls.Vector2D(m1.tx + polygonInst.x, m1.ty + polygonInst.y);
                        if (circlePoint.distanceSQ(v) <= realRadius * realRadius) {
                            isCollisioning = true;
                            break;
                        }
                        //圆与线段碰撞
                        var nextIndex = (j + 1) % polygon.length;
                        var m2 = new egret.Matrix();
                        m2.translate(polygon[nextIndex].x - polygonInst.anchorOffsetX, polygon[nextIndex].y - polygonInst.anchorOffsetY);
                        m2.scale(polygonInst.scaleX, polygonInst.scaleY);
                        m2.rotate(instRadius);
                        var lineP1 = new ls.Vector2D(polygonInst.x + m1.tx, polygonInst.y + m1.ty);
                        var lineP2 = new ls.Vector2D(polygonInst.x + m2.tx, polygonInst.y + m2.ty);
                        var newCircle = new Circle();
                        newCircle.center = new ls.Vector2D(circleInst.x + m.tx, circleInst.y + m.ty);
                        newCircle.radius = circle.radius * circleInst.scale;
                        if (this.circleCollisionLine(newCircle, lineP1, lineP2)) {
                            isCollisioning = true;
                            break;
                        }
                    }
                    if (isCollisioning)
                        break;
                }
                return isCollisioning;
            }
            return false;
        };
        Collision.circleCollisionLine = function (circle, lineP1, lineP2) {
            var vx1 = circle.center.x - lineP1.x;
            var vy1 = circle.center.y - lineP1.y;
            var vx2 = lineP2.x - lineP1.x;
            var vy2 = lineP2.y - lineP1.y;
            var len = Math.sqrt(vx2 * vx2 + vy2 * vy2);
            vx2 /= len;
            vy2 /= len;
            var u = vx1 * vx2 + vy1 * vy2;
            var x0 = 0;
            var y0 = 0;
            if (u <= 0) {
                x0 = lineP1.x;
                y0 = lineP1.y;
            }
            else if (u >= len) {
                x0 = lineP2.x;
                y0 = lineP2.y;
            }
            else {
                x0 = lineP1.x + vx2 * u;
                y0 = lineP1.y + vy2 * u;
            }
            return (circle.center.x - x0) * (circle.center.x - x0) + (circle.center.y - y0) * (circle.center.y - y0) <= circle.radius * circle.radius;
        };
        Collision.pointToSegDist = function (x, y, x1, y1, x2, y2) {
            var cross = (x2 - x1) * (x - x1) + (y2 - y1) * (y - y1);
            if (cross <= 0)
                return Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
            var d2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
            if (cross >= d2)
                return Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
            var r = cross / d2;
            var px = x1 + (x2 - x1) * r;
            var py = y1 + (y2 - y1) * r;
            return Math.sqrt((x - px) * (x - px) + (py - y1) * (py - y1));
        };
        /**
         * 点到直线的距离
         * @param 点矢量
         * @param lineP1 直线某点
         * @param lineP2 直线另外一点
         */
        Collision.distFromPointToLine = function (p, lineP1, lineP2) {
            var vx = lineP2.x - lineP1.x;
            var vy = lineP2.y - lineP2.x;
            var c = lineP2.x * lineP1.y - lineP1.x * lineP2.y;
            return Math.abs(vx * p.x + vy * p.y + c) / Math.sqrt(vx * vx + vy * vy);
        };
        return Collision;
    }());
    ls.Collision = Collision;
    egret.registerClass(Collision,'ls.Collision');
})(ls || (ls = {}));
//# sourceMappingURL=Collision.js.map
var ls;
(function (ls) {
    var Quad = (function () {
        function Quad() {
            this.tlx = 0;
            this.tly = 0;
            this.trx = 0;
            this.try_ = 0; // is a keyword otherwise!
            this.brx = 0;
            this.bry = 0;
            this.blx = 0;
            this.bly = 0;
            this.minresult = 0;
            this.maxresult = 0;
        }
        var d = __define,c=Quad,p=c.prototype;
        p.offset = function (px, py) {
            this.tlx += px;
            this.tly += py;
            this.trx += px;
            this.try_ += py;
            this.brx += px;
            this.bry += py;
            this.blx += px;
            this.bly += py;
            return this;
        };
        p.set_from_rect = function (rc) {
            this.tlx = rc.left;
            this.tly = rc.top;
            this.trx = rc.right;
            this.try_ = rc.top;
            this.brx = rc.right;
            this.bry = rc.bottom;
            this.blx = rc.left;
            this.bly = rc.bottom;
        };
        p.set_from_rotated_rect = function (rc, a) {
            if (a === 0) {
                this.set_from_rect(rc);
            }
            else {
                var sin_a = Math.sin(a);
                var cos_a = Math.cos(a);
                var left_sin_a = rc.left * sin_a;
                var top_sin_a = rc.top * sin_a;
                var right_sin_a = rc.right * sin_a;
                var bottom_sin_a = rc.bottom * sin_a;
                var left_cos_a = rc.left * cos_a;
                var top_cos_a = rc.top * cos_a;
                var right_cos_a = rc.right * cos_a;
                var bottom_cos_a = rc.bottom * cos_a;
                this.tlx = left_cos_a - top_sin_a;
                this.tly = top_cos_a + left_sin_a;
                this.trx = right_cos_a - top_sin_a;
                this.try_ = top_cos_a + right_sin_a;
                this.brx = right_cos_a - bottom_sin_a;
                this.bry = bottom_cos_a + right_sin_a;
                this.blx = left_cos_a - bottom_sin_a;
                this.bly = bottom_cos_a + left_sin_a;
            }
        };
        p.midX = function () {
            return (this.tlx + this.trx + this.brx + this.blx) / 4;
        };
        p.midY = function () {
            return (this.tly + this.try_ + this.bry + this.bly) / 4;
        };
        p.at = function (i, xory) {
            // Returning X pos
            if (xory) {
                switch (i) {
                    case 0: return this.tlx;
                    case 1: return this.trx;
                    case 2: return this.brx;
                    case 3: return this.blx;
                    case 4: return this.tlx;
                    default: return this.tlx;
                }
            }
            else {
                switch (i) {
                    case 0: return this.tly;
                    case 1: return this.try_;
                    case 2: return this.bry;
                    case 3: return this.bly;
                    case 4: return this.tly;
                    default: return this.tly;
                }
            }
        };
        p.minmax4 = function (a, b, c, d) {
            if (a < b) {
                if (c < d) {
                    // sort order: (a, c) (b, d)
                    if (a < c)
                        this.minresult = a;
                    else
                        this.minresult = c;
                    if (b > d)
                        this.maxresult = b;
                    else
                        this.maxresult = d;
                }
                else {
                    // sort order: (a, d) (b, c)
                    if (a < d)
                        this.minresult = a;
                    else
                        this.minresult = d;
                    if (b > c)
                        this.maxresult = b;
                    else
                        this.maxresult = c;
                }
            }
            else {
                if (c < d) {
                    // sort order: (b, c) (a, d)
                    if (b < c)
                        this.minresult = b;
                    else
                        this.minresult = c;
                    if (a > d)
                        this.maxresult = a;
                    else
                        this.maxresult = d;
                }
                else {
                    // sort order: (b, d) (a, c)
                    if (b < d)
                        this.minresult = b;
                    else
                        this.minresult = d;
                    if (a > c)
                        this.maxresult = a;
                    else
                        this.maxresult = c;
                }
            }
        };
        p.bounding_box = function (rc) {
            this.minmax4(this.tlx, this.trx, this.brx, this.blx);
            rc.left = this.minresult;
            rc.right = this.maxresult;
            this.minmax4(this.tly, this.try_, this.bry, this.bly);
            rc.top = this.minresult;
            rc.bottom = this.maxresult;
        };
        ;
        p.contains_pt = function (x, y) {
            var tlx = this.tlx;
            var tly = this.tly;
            // p lies inside either triangles tl, tr, br or tl, bl, br
            var v0x = this.trx - tlx;
            var v0y = this.try_ - tly;
            var v1x = this.brx - tlx;
            var v1y = this.bry - tly;
            var v2x = x - tlx;
            var v2y = y - tly;
            var dot00 = v0x * v0x + v0y * v0y;
            var dot01 = v0x * v1x + v0y * v1y;
            var dot02 = v0x * v2x + v0y * v2y;
            var dot11 = v1x * v1x + v1y * v1y;
            var dot12 = v1x * v2x + v1y * v2y;
            var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
            // Point is in first triangle
            if ((u >= 0.0) && (v > 0.0) && (u + v < 1))
                return true;
            // For second triangle, only v0 changes, so only recompute what that changes
            v0x = this.blx - tlx;
            v0y = this.bly - tly;
            var dot00 = v0x * v0x + v0y * v0y;
            var dot01 = v0x * v1x + v0y * v1y;
            var dot02 = v0x * v2x + v0y * v2y;
            invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
            u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            v = (dot00 * dot12 - dot01 * dot02) * invDenom;
            // Point is in second triangle
            return (u >= 0.0) && (v > 0.0) && (u + v < 1);
        };
        p.segments_intersect = function (a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y) {
            var max_ax, min_ax, max_ay, min_ay, max_bx, min_bx, max_by, min_by;
            // Long-hand code since this is a performance hotspot and this type of
            // code minimises the number of conditional tests necessary.
            if (a1x < a2x) {
                min_ax = a1x;
                max_ax = a2x;
            }
            else {
                min_ax = a2x;
                max_ax = a1x;
            }
            if (b1x < b2x) {
                min_bx = b1x;
                max_bx = b2x;
            }
            else {
                min_bx = b2x;
                max_bx = b1x;
            }
            if (max_ax < min_bx || min_ax > max_bx)
                return false;
            if (a1y < a2y) {
                min_ay = a1y;
                max_ay = a2y;
            }
            else {
                min_ay = a2y;
                max_ay = a1y;
            }
            if (b1y < b2y) {
                min_by = b1y;
                max_by = b2y;
            }
            else {
                min_by = b2y;
                max_by = b1y;
            }
            if (max_ay < min_by || min_ay > max_by)
                return false;
            var dpx = b1x - a1x + b2x - a2x;
            var dpy = b1y - a1y + b2y - a2y;
            var qax = a2x - a1x;
            var qay = a2y - a1y;
            var qbx = b2x - b1x;
            var qby = b2y - b1y;
            var d = Math.abs(qay * qbx - qby * qax);
            var la = qbx * dpy - qby * dpx;
            if (Math.abs(la) > d)
                return false;
            var lb = qax * dpy - qay * dpx;
            return Math.abs(lb) <= d;
        };
        p.intersects_segment = function (x1, y1, x2, y2) {
            // Contained segments count as intersecting
            if (this.contains_pt(x1, y1) || this.contains_pt(x2, y2))
                return true;
            var a1x, a1y, a2x, a2y;
            // Otherwise check all 4 combinations of segment intersects
            var i;
            for (i = 0; i < 4; i++) {
                a1x = this.at(i, true);
                a1y = this.at(i, false);
                a2x = this.at(i + 1, true);
                a2y = this.at(i + 1, false);
                if (this.segments_intersect(x1, y1, x2, y2, a1x, a1y, a2x, a2y))
                    return true;
            }
            return false;
        };
        p.intersects_quad = function (rhs) {
            // If rhs is completely contained by this quad, none of its segments intersect, but its
            // mid point will be inside this quad.  Test for this first.
            var midx = rhs.midX();
            var midy = rhs.midY();
            if (this.contains_pt(midx, midy))
                return true;
            // Alternatively rhs may completely contain this quad
            midx = this.midX();
            midy = this.midY();
            if (rhs.contains_pt(midx, midy))
                return true;
            var a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y;
            // Otherwise check all 16 combinations of segment intersects
            var i, j;
            for (i = 0; i < 4; i++) {
                for (j = 0; j < 4; j++) {
                    a1x = this.at(i, true);
                    a1y = this.at(i, false);
                    a2x = this.at(i + 1, true);
                    a2y = this.at(i + 1, false);
                    b1x = rhs.at(j, true);
                    b1y = rhs.at(j, false);
                    b2x = rhs.at(j + 1, true);
                    b2y = rhs.at(j + 1, false);
                    if (this.segments_intersect(a1x, a1y, a2x, a2y, b1x, b1y, b2x, b2y))
                        return true;
                }
            }
            return false;
        };
        return Quad;
    }());
    ls.Quad = Quad;
    egret.registerClass(Quad,'ls.Quad');
})(ls || (ls = {}));
//# sourceMappingURL=Quad.js.map
//# sourceMappingURL=QuadChild.js.map
var ls;
(function (ls) {
    var QuadTree = (function () {
        function QuadTree(index, level, parent, bound) {
        }
        var d = __define,c=QuadTree,p=c.prototype;
        p.getTreeBoundInfo = function (szbounds) {
        };
        return QuadTree;
    }());
    ls.QuadTree = QuadTree;
    egret.registerClass(QuadTree,'ls.QuadTree');
})(ls || (ls = {}));
//# sourceMappingURL=QuadTree.js.map
var ls;
(function (ls) {
    var IntersectionStruct = (function () {
        function IntersectionStruct() {
            this.intersectionIndex = -1;
            this.intersectionPoint = new ls.Vector2D();
        }
        var d = __define,c=IntersectionStruct,p=c.prototype;
        //获取上一个索引        
        p.getPrevIndex = function (curIndex, len) {
            return (curIndex - 1 + len) % len;
        };
        //获取下一个索引
        p.getNextIndex = function (curIndex, len) {
            return (curIndex + 1) % len;
        };
        //是否为凹多边形
        p.isConcavePoly = function (vs) {
            if (vs.length <= 3)
                return false;
            return this.getNextConcaveIndex(vs, 0) >= 0;
        };
        //分割凹多边形
        p.onSeparateConcavePoly = function (vs) {
            var szlist = []; //可见视点列表
            //如果为顺时针，反转多边形
            if (!this.isAntiClockDir(vs))
                vs.reverse();
            this.separateConcavePoly(vs, szlist, 0);
            return szlist;
        };
        //获取下一个凹点
        p.getNextConcaveIndex = function (vs, startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            if (vs.length <= 3)
                return -1;
            var len = vs.length;
            var nmax = len + startIndex;
            for (var i = startIndex; i < nmax; i++) {
                var prevIndex = this.getPrevIndex(i, len);
                var nextIndex = this.getNextIndex(i, len);
                var curIndex = (i + len) % len;
                var curdir = this.getMultiPtClockDir(vs[curIndex], vs[prevIndex], vs[nextIndex]);
                if (curdir == 1)
                    return i % len;
            }
            return -1;
        };
        //获取所有的凹点列表        
        p.getAllConvaveIndex = function (vs, startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            if (vs.length <= 3)
                return [];
            var szlist = [];
            var len = vs.length;
            var nmax = len + startIndex;
            for (var i = startIndex; i < nmax; i++) {
                var prevIndex = this.getPrevIndex(i, len);
                var nextIndex = this.getNextIndex(i, len);
                var curIndex = (i + len) % len;
                var curdir = this.getMultiPtClockDir(vs[curIndex], vs[prevIndex], vs[nextIndex]);
                if (curdir == 1)
                    szlist.push(i % len);
            }
            return szlist;
        };
        //分割多边形
        p.separateConcavePoly = function (vs, szlist, startIndex) {
            if (vs.length <= 3) {
                szlist.push(vs);
                return;
            }
            var nextConcaveIndex = this.getNextConcaveIndex(vs, startIndex);
            startIndex = nextConcaveIndex + 1;
            if (nextConcaveIndex < 0) {
                szlist.push(vs);
                return;
            }
            if (this.getSplitPointByRgnBCinter(vs, nextConcaveIndex)) {
                var szleft = [];
                var szright = [];
                this.splitPolyByIntersection(vs, nextConcaveIndex, szleft, szright);
                this.separateConcavePoly(szleft, szlist, startIndex);
                this.separateConcavePoly(szright, szlist, startIndex);
                return;
            }
            szlist.push(vs);
        };
        /**根据分割点分割 */
        p.splitPolyByIntersection = function (vs, concaveIndex, szleft, szright) {
            var len = vs.length;
            if (concaveIndex < 0 || concaveIndex >= len)
                return false;
            if (this.intersectionIndex < 0 || this.intersectionIndex >= len)
                return false;
            if (concaveIndex <= this.intersectionIndex + 1) {
                for (var i = this.intersectionIndex, len = concaveIndex + len; i <= len; i++) {
                    szleft.push(vs[i % len]);
                }
            }
            else {
                for (var i = this.intersectionIndex; i <= concaveIndex; i++) {
                    szleft.push(vs[i]);
                }
            }
            if (concaveIndex <= this.intersectionIndex) {
                for (var i = concaveIndex; i < this.intersectionIndex; i++) {
                    szright.push(vs[i]);
                }
            }
            else {
                for (var i = concaveIndex; i < this.intersectionIndex + len; i++) {
                    szright.push(vs[i % len]);
                }
            }
            if (!vs[this.intersectionIndex].equals(this.intersectionPoint)) {
                szleft.push(this.intersectionPoint);
                szright.push(this.intersectionPoint);
            }
            return true;
        };
        /**
         * 基于顶点可见性的局部剖分算法
         * @see http://www.doc88.com/p-114690887292.html
         */
        p.getSplitPointByRgnBCinter = function (vs, concaveIndex) {
            if (vs.length <= 3)
                return false;
            var len = vs.length;
            var prevIndex = (concaveIndex - 1 + len) % len;
            var nextIndex = (concaveIndex + 1) % len;
            //将凹点作为视点，ST=(s0,s1,...,sj)为可见视点
            //分区计算
            var A = []; //射线M与N所形成的扇形区域
            var B = []; //射线M与N的反向射线所形成的扇形区域（包括N的反向射线）
            var C = []; //射线M的反向射线与N所形成的扇形区域（包括M的反向射线）
            var D = []; //射线M的反向射线与N的反向射线形成的扇形区域
            //可见点区域（显然，ST中的点只可能在区域A,B,C中）
            var A1 = [];
            var B1 = [];
            var C1 = [];
            var D1 = [];
            var nmax = (nextIndex < prevIndex) ? prevIndex : (prevIndex + len);
            for (var i = nextIndex; i < nmax; i++) {
                var ncur = i % len;
                var ret1 = this.getMultiPtClockDir(vs[concaveIndex], vs[prevIndex], vs[ncur]);
                var ret2 = this.getMultiPtClockDir(vs[concaveIndex], vs[nextIndex], vs[ncur]);
                //计算所在的区域
                if (ret1 < 0 && ret2 > 0)
                    A.push(ncur);
                else if (ret1 >= 0 && ret2 >= 0)
                    B.push(ncur);
                else if (ret1 <= 0 && ret2 < 0)
                    C.push(ncur);
                else
                    D.push(ncur);
            }
            //取可见点区分
            A1 = this.getVisiblePtsOnRegion(vs, concaveIndex, A);
            B1 = B.concat();
            D1 = D.concat();
            C1 = this.getVisiblePtsOnRegion(vs, concaveIndex, C);
            if (A1.length > 0) {
                var setA = [];
                var setB = [];
                this.setSplitByRegion(vs, A1, setA, setB);
                if (setB.length > 0)
                    this.intersectionIndex = this.getBestIntersectionPt(vs, concaveIndex, setB);
                else
                    this.intersectionIndex = this.getBestIntersectionPt(vs, concaveIndex, setA);
                if (this.intersectionIndex < 0 || this.intersectionIndex >= len)
                    return false;
            }
            //如果A为空，BC必不为空
            if (B1.length < 1 || C1.length < 1) {
                console.error('BC分区为空错误！！');
                return false;
            }
            var mid = concaveIndex;
            var left = B1[B1.length - 1];
            var right = C1[0];
            //BC区域的首位点必在一条直线上
            var d1 = new ls.Vector2D(vs[right].x - vs[left].x, vs[right].y - vs[left].y);
            var d00 = new ls.Vector2D(vs[concaveIndex].x - vs[prevIndex].x, vs[concaveIndex].y - vs[prevIndex].y);
            var d01 = new ls.Vector2D(vs[concaveIndex].x - vs[nextIndex].x, vs[concaveIndex].y - vs[nextIndex].y);
            //A区域与交点区域的角平分线
            var d0 = new ls.Vector2D((d00.x + d01.x) >> 1, (d00.y + d01.y) >> 1);
            var crossPt = new ls.Vector2D();
            if (this.getCrossByRadialAndSegment(vs[concaveIndex], d0, vs[left], d1, crossPt) != 1)
                return false;
            this.intersectionIndex = left;
            this.intersectionPoint = crossPt;
            return true;
        };
        /**
         * 获取三点方向
         * @param v1 当前点
         * @param v2 上一点
         * @param v3 下一点
         */
        p.getMultiPtClockDir = function (v1, v2, v3) {
            var ret = (v1.x - v2.x) * (v3.y - v1.y) - (v3.x - v1.x) * (v1.y - v2.y);
            return ret > 0 ? 1 : (ret < 0 ? -1 : 0);
        };
        /**
         * 获取多边形某一点的方向
         * @param vs 多边形点列表
         * @param index 索引
         */
        p.getMultiPtClockDirByIndex = function (vs, index) {
            if (vs.length <= 2)
                return 0;
            //为了保证循环，这里通过取余来计算结果
            var curV = vs[index % vs.length];
            var preV = vs[(index + vs.length - 1) % vs.length];
            var nextV = vs[(index + 1) % vs.length];
            return this.getMultiPtClockDir(curV, preV, nextV);
        };
        /**
         * 是否是逆时针旋转
         * @param vs 多边形点列表
         */
        p.isAntiClockDir = function (vs) {
            if (vs.length <= 2)
                return true;
            var count = 0;
            for (var i = 1, len = vs.length; i < len; i++) {
                var nextIndex = (i + 1) % len;
                var nextIndex2 = (i + 2) % len;
                var n = (vs[nextIndex].x - vs[i].x) * (vs[nextIndex2].y - vs[nextIndex].y);
                n -= (vs[nextIndex].y - vs[i].y) * (vs[nextIndex2].x - vs[nextIndex].x);
                if (n < 0)
                    count--;
                else if (n > 0)
                    count++;
            }
            return count <= 0;
        };
        p.isInsection = function (sv1, ev1, sv2, ev2) {
            var v = new ls.Vector2D(sv2.x - sv1.x, sv2.y - sv1.y);
            var kross = ev1.x * ev2.y - ev1.y * ev2.x;
            var sqrtKross = kross * kross;
            var sqrtlen0 = ev1.x * ev1.x + ev1.y * ev1.y;
            var sqrtlen1 = ev2.x * ev2.x + ev2.y * ev2.y;
            if (sqrtKross > 0.01 * sqrtlen0 * sqrtlen1) {
                var s = (v.x * ev2.y - v.y * ev2.x) / kross;
                if (s < 0 || s > 1)
                    return 0;
                var t = (v.x * ev1.y - sv1.y * ev1.x) / kross;
                if (t < 0 || t > 1)
                    return 0;
                return 1;
            }
            return 0;
        };
        /**
         * 判断是否是可见点
         * @param vs 多边形点集
         * @param concaveIndex 凹点索引
         * @param regionIndex 区域点索引
         */
        p.isVisiblePtOnConcave = function (vs, concaveIndex, regionIndex) {
            for (var i = 0, len = vs.length; i < len; i++) {
                var nextIndex = (i + 1) % len;
                if (i == concaveIndex || i == regionIndex || nextIndex == concaveIndex || nextIndex == regionIndex)
                    continue;
                if (this.isInsection(vs[concaveIndex], vs[regionIndex], vs[i], vs[nextIndex]))
                    return false;
            }
            return true;
        };
        /**
         * 获取区域内的可见点列表
         */
        p.getVisiblePtsOnRegion = function (vs, concaveIndex, region) {
            var visibleRegions = [];
            for (var i = 0, len = region.length; i < len; i++) {
                if (this.isVisiblePtOnConcave(vs, concaveIndex, region[i]))
                    visibleRegions.push(region[i]);
            }
            return visibleRegions;
        };
        /**
         * 设置区域分隔 A:凸点集合 B:凹点集合
         */
        p.setSplitByRegion = function (vs, region1, setA, setB) {
            for (var i = 0, len = vs.length; i < len; i++) {
                if (this.getMultiPtClockDirByIndex(vs, region1[i]))
                    setA.push(region1[i]);
                else
                    setB.push(region1[i]);
            }
        };
        p.dotProd = function (v1, v2) {
            return v1.dotProd(v2);
        };
        /**
         * 获取最好的相交点
         */
        p.getBestIntersectionPt = function (vs, concaveIndex, ptsets) {
            if (ptsets.length < 1)
                return -1;
            var len = vs.length;
            var prevIndex = (concaveIndex - 1 + len) % len;
            var nextIndex = (concaveIndex + 1) % len;
            var d00 = vs[concaveIndex].clone().substruct(vs[prevIndex].x, vs[prevIndex].y).normalize();
            var d01 = vs[concaveIndex].clone().substruct(vs[nextIndex].x, vs[nextIndex].y).normalize();
            var bestIndex = -1;
            var flen = -1;
            for (var i = 0, ptlen = ptsets.length; i < ptlen; i++) {
                var ptset = ptsets[i];
                var tempv = vs[ptset];
                var dp = tempv.clone().substruct(vs[concaveIndex].x, vs[concaveIndex].y).normalize();
                var ntemplen = d00.clone().dotProd(dp);
                if (ntemplen > flen)
                    bestIndex = ptset;
            }
            return bestIndex;
        };
        p.getCrossByRadialAndSegment = function (sv1, ev1, sv2, ev2, crossV) {
            var v = sv2.clone().substruct(sv1.x, sv1.y);
            var cross = ev1.getCross(ev2);
            if (cross * cross > 0.01 * ev1.lengthSQ * ev2.lengthSQ) {
                var s = v.getCross(ev2) / cross;
                if (s < 0)
                    return 0;
                var t = v.getCross(ev1) / cross;
                if (t < 0 || t > 1)
                    return 0;
                var pv = ev1.clone().scale(s);
                crossV.x = sv1.x + pv.x;
                crossV.y = sv1.y + pv.y;
                return 1;
            }
            return 0;
        };
        /**
         * 用来返回点与直线的位置关系
         * @param v1 直线上的点1
         * @param v2 直接上的点2
         * @param randomV 直线上任意一点
         */
        p.getPosRelationToLine = function (v1, v2, randomV) {
            return randomV.x * (v2.y - v1.y) + randomV.y * (v1.x - v2.x) + randomV.y * v2.x - randomV.x * v2.y;
        };
        return IntersectionStruct;
    }());
    ls.IntersectionStruct = IntersectionStruct;
    egret.registerClass(IntersectionStruct,'ls.IntersectionStruct');
})(ls || (ls = {}));
//# sourceMappingURL=IntersectionStruct.js.map
var ls;
(function (ls) {
    var SAT = (function () {
        function SAT() {
        }
        var d = __define,c=SAT,p=c.prototype;
        SAT.sat = function (pos1, pos2, v1, v2) {
            if (v1.length < 1 || v2.length < 1)
                return false;
            return this.convexsat(pos1, pos2, v1, v2);
        };
        /**
         * 计算是否相交，顺序传入多边形顶点,比较场景内的绝对坐标，如果为凹多边形，先用separateConcavePoly函数分解成凸多边形
         * @param pos1 多边形1位置
         * @param pos2 多边形2位置
         * @param v1 多边形1顶点数据
         * @param v2 多边形2顶点数据
         */
        SAT.convexsat = function (pos1, pos2, v1, v2) {
            if (v1.length < 1 || v2.length < 2)
                return false;
            var szaxis = [];
            szaxis = this.getUniqueAxis(v1, szaxis);
            szaxis = this.getUniqueAxis(v2, szaxis);
            for (var i = 0, len = szaxis.length; i < len; i++) {
                var projection1 = this.getProjection(pos1, v1, szaxis[i]);
                var projection2 = this.getProjection(pos2, v2, szaxis[i]);
                if (!this.overlap(projection1, projection2))
                    return false;
            }
            return true;
        };
        /**
         * 获取多边形需要计算的分离轴
         * @param vs 多边形顶点列表
         * @param curaxis 轴
         */
        SAT.getUniqueAxis = function (vs, curaxis) {
            var perp;
            var b = false;
            var perp = new ls.Vector2D();
            for (var i = 0, len = vs.length; i < len; i++) {
                var perp = vs[(i + 1) % len].clone().substruct(vs[i].x, vs[i].y).normalize().perp;
                if (perp.x <= 0) {
                    if (perp.x == 0) {
                        if (perp.y < 0)
                            perp.y *= -1;
                    }
                    else {
                        perp.x *= -1;
                        perp.y *= -1;
                    }
                }
                b = true;
                for (var j = 0, axislen = curaxis.length; j < axislen; j++) {
                    if (!curaxis[j].equals(perp))
                        continue;
                    b = false;
                    break;
                }
                if (!b)
                    continue;
                curaxis.push(perp);
            }
            return curaxis;
        };
        //计算是否相交
        SAT.overlap = function (s1, s2) {
            if (s1.x > s2.y)
                return false;
            if (s1.y < s2.x)
                return false;
            if ((s1.x - s2.x) * (s2.x - s2.y) < 0)
                return true;
            return true;
        };
        //获取多边形包围盒 xmin,ymin,xmax,ymax
        SAT.getPolyBound = function (vs) {
            if (vs.length < 1)
                return [0, 0, 0, 0];
            var v0 = vs[0];
            var szpt = [v0.x, v0.y, v0.x, v0.y];
            for (var i = 0; i < vs.length; i++) {
                var v = vs[i];
                if (v.x < szpt[0])
                    szpt[0] = v.x;
                if (v.y < szpt[1])
                    szpt[1] = v.y;
                if (v.x > szpt[2])
                    szpt[2] = v.x;
                if (v.y > szpt[3])
                    szpt[3] = v.y;
            }
            return szpt;
        };
        //获取圆形包围盒 (参数:两项,第一项为圆心坐标,第二项x,y都为半径,后面也许会扩充椭圆).顺序:左上右下四个值→Xmin,Ymin,Xmax,Ymax 
        SAT.getCircleBound = function (vs) {
            if (vs.length !== 2)
                return [0, 0, 0, 0];
            var v0 = vs[0];
            var v1 = vs[1];
            return [v0.x - v1.x, v0.y - v1.x, v0.x + v1.x, v0.y + v1.x];
        };
        //获取多边形在投影轴上的最小点与最大点        
        SAT.getProjection = function (pos, p, axis) {
            var n, min, max = 0;
            min = new ls.Vector2D(p[0].x + pos.x, p[0].y + pos.y).dotProd(axis);
            max = min;
            for (var i = 0; i < p.length; i++) {
                n = new ls.Vector2D(p[i].x + pos.x, p[i].y + pos.y).dotProd(axis);
                if (n < min)
                    min = n;
                if (n > max)
                    max = n;
            }
            return new ls.Vector2D(min, max);
        };
        return SAT;
    }());
    ls.SAT = SAT;
    egret.registerClass(SAT,'ls.SAT');
})(ls || (ls = {}));
//# sourceMappingURL=SAT.js.map
var ls;
(function (ls) {
    var Condition = (function (_super) {
        __extends(Condition, _super);
        function Condition() {
            _super.call(this);
            //是否是触发条件
            this.isTrigger = false;
            //是否是反转条件
            this.isInvert = false;
            //操作符类型(包括0：逻辑与（&&），1：逻辑或（||）)
            //注意，第1个条件的操作符类型会忽略
            this.operatorType = 0;
        }
        var d = __define,c=Condition,p=c.prototype;
        d(p, "isFirstCondition"
            //是否是第1个条件
            ,function () {
                return this.index === 0;
            }
        );
        return Condition;
    }(ls.BaseClass));
    ls.Condition = Condition;
    egret.registerClass(Condition,'ls.Condition');
})(ls || (ls = {}));
//# sourceMappingURL=Condition.js.map
var ls;
(function (ls) {
    //条件块，条件块中包含1个逻辑列表的条件
    var ConditionBlock = (function () {
        function ConditionBlock() {
            //条件块当前的条件状态
            this.status = false;
            //当前条件所保存的数据，在执行动作的时候可以获取
            //一般情况下这个数据为空，像Array的forEachElement里就有
            this.loopDatas = [];
            //循环层数
            this.loopLayers = 0;
        }
        var d = __define,c=ConditionBlock,p=c.prototype;
        d(p, "loop"
            //获取这个条件块是否是循环模式
            ,function () {
                if (this.conditions == null)
                    return false;
                for (var i = 0; i < this.conditions.length; i++) {
                    var condition = this.conditions[i];
                    if (condition.loop)
                        return true;
                }
                return false;
            }
        );
        //执行动作
        //这里有个规则，父事件中过滤的目标参与到子事件中运算，而不是只是子事件中单独运算
        //@param searchInstances 查找的实例列表，有true,也有false
        p.execActions = function (searchInstances) {
            if (this.actions == null)
                return;
            // var instances: Array<AIObject> = [];
            // for (var key in searchInstances) {
            //     var _instance: AIObject = searchInstances[key];
            //     instances.push(searchInstances[key]);
            // }
            var instances = searchInstances;
            //每次执行动作的时候重置上次选择的列表
            this.lastActionResults = [];
            for (var i = 0; i < this.actions.length; i++) {
                var action = this.actions[i];
                action.lastLoopSelectInstances = [];
            }
            if (this.loopDatas && this.loopDatas.length > 0) {
                if (this.loopDatas.length > 3) {
                    ls.assert(true, "不支持三层以上循环！！！");
                }
                else {
                    var layer0Data = this.loopDatas[0];
                    var layer1Data = this.loopDatas[1];
                    var layer2Data = this.loopDatas[2];
                    //判断是否有for each循环，如果有的话，排序
                    if (layer0Data && layer0Data instanceof ls.ForEachOrderEvent)
                        instances = this.execForEach(layer0Data, instances);
                    if (layer1Data && layer1Data instanceof ls.ForEachOrderEvent)
                        instances = this.execForEach(layer1Data, instances);
                    if (layer2Data && layer2Data instanceof ls.ForEachOrderEvent)
                        instances = this.execForEach(layer2Data, instances);
                    if (layer0Data && layer0Data instanceof ls.ForEvent) {
                        var startIndex0 = +ls.eval_e(layer0Data.startIndex);
                        var endIndex0 = +ls.eval_e(layer0Data.endIndex);
                        var ikey = layer0Data.name;
                        for (var i = startIndex0; ((startIndex0 >= endIndex0) ? i >= endIndex0 : i <= endIndex0); ((startIndex0 <= endIndex0) ? i++ : i--)) {
                            ls.loopIndex[ikey] = i;
                            if (layer1Data && layer1Data instanceof ls.ForEvent) {
                                var startIndex1 = +ls.eval_e(layer1Data.startIndex);
                                var endIndex1 = +ls.eval_e(layer1Data.endIndex);
                                var jkey = layer1Data.name;
                                for (var j = startIndex1; ((startIndex1 >= endIndex1) ? j >= endIndex1 : j <= endIndex1); ((startIndex1 <= endIndex1) ? j++ : j--)) {
                                    ls.loopIndex[jkey] = j;
                                    if (layer2Data && layer2Data instanceof ls.ForEvent) {
                                        var startIndex2 = +ls.eval_e(layer2Data.startIndex);
                                        var endIndex2 = +ls.eval_e(layer2Data.endIndex);
                                        var kkey = layer2Data.name;
                                        for (var k = startIndex2; ((startIndex2 >= endIndex2) ? k >= endIndex2 : k <= endIndex2); ((startIndex2 <= endIndex2) ? k++ : k--)) {
                                            ls.loopIndex[kkey] = k;
                                            this.execLoopAction(true, instances, k);
                                        }
                                    }
                                    else {
                                        this.execLoopAction(true, instances, j);
                                    }
                                }
                            }
                            else {
                                this.execLoopAction(true, instances, i);
                            }
                        }
                    }
                    else if (layer0Data && layer0Data instanceof ls.OnForEachArrayElementEvent) {
                        //遍历元素
                        var arrayElementEvent = layer0Data;
                        var array = arrayElementEvent.array;
                        if (array) {
                            var dims = ls.eval_e(arrayElementEvent.xyzDimention);
                            switch (dims) {
                                case 1:
                                    for (var i = 0; i < array.width; i++) {
                                        array.curX = i;
                                        this.execLoopAction(true, instances, i);
                                        array.curValue = array.at(i, 0, 0);
                                    }
                                    break;
                                case 2:
                                    for (var i = 0; i < array.width; i++) {
                                        for (var j = 0; j < array.height; j++) {
                                            array.curX = i;
                                            array.curY = j;
                                            this.execLoopAction(true, instances, i);
                                            array.curValue = array.at(i, j, 0);
                                        }
                                    }
                                    break;
                                case 3:
                                    for (var i = 0; i < array.width; i++) {
                                        for (var j = 0; j < array.height; j++) {
                                            for (var k = 0; k < array.depth; k++) {
                                                array.curX = i;
                                                array.curY = j;
                                                array.curZ = k;
                                                this.execLoopAction(true, instances, i);
                                                array.curValue = array.at(i, j, k);
                                            }
                                        }
                                    }
                                    break;
                                default:
                                    ls.assert(true, "无法解析当前数组维数：" + dims);
                                    break;
                            }
                        }
                    }
                }
            }
            else {
                this.execLoopAction(false, instances, 0);
            }
        };
        p.execForEach = function (data, instances) {
            var object = data.object;
            var order = ls.eval_e(data.order);
            var list = ls.World.getInstance().objectHash[object.name];
            var computedResults = [];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var computeInstance = list[i];
                    if (this.instancesStatus[computeInstance.u_id] && this.instancesStatus[computeInstance.u_id].status)
                        computedResults.push(computeInstance);
                }
                //如果求目标的表达式不是循环列表中的。那么，不进行排序
                var searchIndex = -1;
                for (var i = 0; i < computedResults.length; i++) {
                    var name = computedResults[i].name;
                    searchIndex = data.expression.indexOf(name);
                    if (searchIndex != -1) {
                        break;
                    }
                }
                if (searchIndex != -1) {
                    //进行排序
                    computedResults.sort(function (a, b) {
                        ls.lakeshoreInst()[a.name] = a;
                        var valueA = +(ls.eval_e(data.expression));
                        valueA = valueA || 0;
                        ls.lakeshoreInst()[b.name] = b;
                        var valueB = +(ls.eval_e(data.expression));
                        valueB = valueB || 0;
                        if (order === 0) {
                            if (valueA > valueB)
                                return 1;
                            else if (valueA < valueB)
                                return -1;
                            else
                                return 0;
                        }
                        else {
                            if (valueA > valueB)
                                return -1;
                            else if (valueA < valueB)
                                return 1;
                            else
                                return 0;
                        }
                    });
                }
                //将instances中含有该名字的对象删除
                for (var i = 0; i < instances.length; i++) {
                    var __instance = instances[i];
                    if (__instance.name == object.name)
                        instances.splice(i, 1);
                }
                //将新的结果加入进来
                instances = instances.concat(computedResults);
            }
            return instances;
        };
        //instances为所有条件成立的实例
        p.execLoopAction = function (isloop, instances, loopIndex) {
            if (loopIndex === void 0) { loopIndex = 0; }
            this.event.execActionIndex = 0;
            if (this.actions.length > 0)
                this.execLoopNextAction(this.actions[this.event.execActionIndex], isloop, instances, loopIndex);
        };
        /** 执行下一个动作 */
        p.execLoopNextAction = function (action, isloop, instances, loopIndex) {
            if (loopIndex === void 0) { loopIndex = 0; }
            if (this.event.execActionIndex >= this.actions.length) {
                return;
            }
            var world = ls.World.getInstance();
            var callTarget = action.callTarget; //目标有可能是实例，有可能是行为实例
            var targetName = callTarget.name;
            var callParams = ls.EventSheetDecoder.decodeActionParams(action).params;
            var callHanlderName = action.callHanlderName;
            var actionResult = false;
            if (callHanlderName == "wait") {
                var time = ls.eval_e(callParams[0]);
                if (typeof time != "number") {
                    time = 0;
                }
                egret.setTimeout(function (isloop, instances) {
                    this.event.execActionIndex++;
                    this.execLoopNextAction(this.actions[this.event.execActionIndex], isloop, instances);
                }, this, time * 1000, isloop, instances);
                return;
            }
            //注册过滤的目标给windows
            for (var m = 0; m < instances.length; m++) {
                ls.lakeshoreInst()[instances[m].name] = instances[m];
            }
            //动作参数列表中可能有需要选取的实例，这里通过传递过来的过滤目标来进一步过滤
            var paramTargetInstances = [];
            for (var j = 0; j < callParams.length; j++) {
                var param = callParams[j];
                if (param instanceof ls.AIObject) {
                    for (var k = 0; k < instances.length; k++) {
                        var instance = instances[k];
                        if (instance.name == param.name) {
                            //注册给windows
                            ls.lakeshoreInst()[instance.name] = instance;
                            paramTargetInstances.push(instance);
                            break;
                        }
                    }
                }
            }
            //行为实例
            if (callTarget instanceof ls.BaseBehavior)
                targetName = action.targetName;
            var needComputedInstances = [];
            if (ls.isSingleInst(targetName)) {
                needComputedInstances = [ls.getInstanceByInstanceName(targetName)];
            }
            else {
                //查找前面的条件列表中是否有与当前目标名字相同并且状态为真的对象，如果有，则取条件列表中的对象，否则取目标列表中的对象
                if (action.isFamily) {
                    //过滤之后与组内实例进行比较
                    var familys = ls.EventSheetDecoder.curFamilys[action.callTarget];
                    for (var j = 0; j < instances.length; j++) {
                        var instance = instances[j];
                        ls.lakeshoreInst()[instance.name] = instance;
                        for (var i = 0; i < familys.insts.length; i++) {
                            var familyInstance = familys.insts[i];
                            if (familyInstance.name == instance.name) {
                                needComputedInstances.push(instance);
                            }
                        }
                    }
                    //如果在条件列表中没有查到符合要求的对象，则取组内列表中的对象
                    if (needComputedInstances.length === 0) {
                        for (var m = 0; m < familys.insts.length; m++) {
                            var familyInstance = familys.insts[m];
                            var list = world.objectHash[familyInstance.name];
                            for (var n = 0; n < list.length; n++) {
                                var _instance_ = list[n];
                                //if (_instance_.selfStatus)
                                needComputedInstances.push(_instance_);
                            }
                        }
                    }
                }
                else {
                    //将目标进行过滤
                    for (var j = 0; j < instances.length; j++) {
                        var instance = instances[j];
                        if (instance.name == targetName) {
                            //注册过滤出来的目标列表
                            ls.lakeshoreInst()[instance.name] = instance;
                            needComputedInstances.push(instance);
                        }
                    }
                    //如果在条件列表中没有查到符合要求的对象，且在当前事件中没有被计算过，则取目标全局列表中同名且状态为真的对象
                    if (needComputedInstances.length === 0) {
                        if (!this.event.computeTargets[targetName]) {
                            var list = world.objectHash[targetName];
                            if (list) {
                                for (var j = 0; j < list.length; j++) {
                                    var _instance_ = list[j];
                                    needComputedInstances.push(_instance_);
                                }
                            }
                            else {
                                console.error("没有查到目标【" + targetName + "】实例列表！！");
                            }
                        }
                    }
                }
            }
            //如果找到了上一次的,再查找在需要计算的实例列表中是否有
            var isSeachLast = false;
            if (this.lastActionResults && this.lastActionResults.length > 0) {
                for (var j = 0; j < needComputedInstances.length; j++) {
                    var needInstance = needComputedInstances[j];
                    for (var k = this.lastActionResults.length - 1; k >= 0; k--) {
                        var actionInstance = this.lastActionResults[k];
                        if (needInstance == actionInstance) {
                            isSeachLast = true;
                            break;
                        }
                    }
                }
                if (isSeachLast)
                    needComputedInstances = this.lastActionResults;
            }
            //执行动作
            if (needComputedInstances.length > 0) {
                //检测当前条件块中是否有循环数据
                var actionComputeResults = this.execSingleAction(action, needComputedInstances, loopIndex);
                if (actionComputeResults && actionComputeResults.length > 0)
                    this.lastActionResults = actionComputeResults;
                else
                    this.lastActionResults = [];
            }
            this.event.execActionIndex++;
            //执一个动作完毕之后，执行下一个动作
            this.execLoopNextAction(this.actions[this.event.execActionIndex], isloop, instances, loopIndex);
        };
        /**执行单独的动作 */
        p.execSingleAction = function (action, computedInstances, loopIndex) {
            if (loopIndex === void 0) { loopIndex = 0; }
            var callTarget = action.callTarget; //目标有可能是实例，有可能是行为实例
            var targetName = callTarget.name;
            var callHanlderName = action.callHanlderName;
            var actionParams = ls.EventSheetDecoder.decodeActionParams(action);
            var callParams = actionParams.params;
            var isFamilys = actionParams.isFamilys;
            for (var i = 0; i < computedInstances.length; i++) {
                var instance = computedInstances[i];
                if (instance.isDead)
                    continue;
                //保存应用动作函数的实例，可能是普通实例，也可能是行为实例
                var execActionInstance;
                //行为
                if (callTarget instanceof ls.BaseBehavior) {
                    var behaviors = instance.behaviors;
                    for (var j = 0; j < behaviors.length; j++) {
                        var behavior = behaviors[j];
                        if (behavior.name == callTarget.name) {
                            execActionInstance = behavior;
                            break;
                        }
                    }
                }
                else {
                    execActionInstance = instance;
                }
                //请求调用的行为方法
                var callHanlder = execActionInstance[callHanlderName];
                if (callHanlder) {
                    //重新给windows注册一遍
                    //特殊情况不能注册，否则，与系统api冲突
                    //只有显示对象才注册
                    if (callTarget instanceof ls.AIObject) {
                        if (execActionInstance.name != "WebSocket")
                            ls.lakeshoreInst()[execActionInstance.name] = execActionInstance;
                    }
                    if (actionParams.hasFamily) {
                        //为了满足常用需求，组动作里随机执行
                        for (var n = 0; n < callParams.length; n++) {
                            var _isFamily = isFamilys[n];
                            if (_isFamily) {
                                var familyName = callParams[n];
                                var curFamilyVo = ls.EventSheetDecoder.curFamilys[familyName];
                                callParams[n] = curFamilyVo.insts[Math.floor(curFamilyVo.insts.length * Math.random())];
                            }
                        }
                        var results = callHanlder.apply(execActionInstance, callParams);
                    }
                    else {
                        var results = callHanlder.apply(execActionInstance, callParams);
                    }
                    if (results != undefined)
                        action.lastLoopSelectInstances[loopIndex] = results;
                    else
                        action.lastLoopSelectInstances[loopIndex] = [];
                }
            }
            return action.lastLoopSelectInstances[loopIndex];
        };
        return ConditionBlock;
    }());
    ls.ConditionBlock = ConditionBlock;
    egret.registerClass(ConditionBlock,'ls.ConditionBlock');
})(ls || (ls = {}));
//# sourceMappingURL=ConditionBlock.js.map
var ls;
(function (ls) {
    var Config = (function () {
        function Config() {
        }
        var d = __define,c=Config,p=c.prototype;
        Config.sceneWidth = 0;
        Config.sceneHeight = 0;
        Config.version = 0;
        Config.isHasJpg = false;
        Config.isHasPng = false;
        Config.openLog = true;
        return Config;
    }());
    ls.Config = Config;
    egret.registerClass(Config,'ls.Config');
})(ls || (ls = {}));
//# sourceMappingURL=Config.js.map
var ls;
(function (ls) {
    var BaseEvent = (function (_super) {
        __extends(BaseEvent, _super);
        function BaseEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=BaseEvent,p=c.prototype;
        return BaseEvent;
    }(ls.BaseClass));
    ls.BaseEvent = BaseEvent;
    egret.registerClass(BaseEvent,'ls.BaseEvent');
})(ls || (ls = {}));
//# sourceMappingURL=BaseEvent.js.map
var ls;
(function (ls) {
    var AIEvent = (function (_super) {
        __extends(AIEvent, _super);
        function AIEvent() {
            _super.apply(this, arguments);
            //事件索引
            this.index = 0;
            //执行动作索引
            this.execActionIndex = 0;
            //当前事件中参与过计算的目标
            this.computeTargets = {};
            //事件是否可用
            this.enabled = true;
        }
        var d = __define,c=AIEvent,p=c.prototype;
        return AIEvent;
    }(ls.BaseEvent));
    ls.AIEvent = AIEvent;
    egret.registerClass(AIEvent,'ls.AIEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AIEvent.js.map
var ls;
(function (ls) {
    var KeyboardEvent = (function (_super) {
        __extends(KeyboardEvent, _super);
        function KeyboardEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=KeyboardEvent,p=c.prototype;
        KeyboardEvent.KEY_DOWN = "keyDown";
        KeyboardEvent.KEY_UP = "keyUp";
        return KeyboardEvent;
    }(egret.Event));
    ls.KeyboardEvent = KeyboardEvent;
    egret.registerClass(KeyboardEvent,'ls.KeyboardEvent');
})(ls || (ls = {}));
//# sourceMappingURL=KeyboardEvent.js.map
var ls;
(function (ls) {
    var OnForEachArrayElementEvent = (function (_super) {
        __extends(OnForEachArrayElementEvent, _super);
        function OnForEachArrayElementEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnForEachArrayElementEvent,p=c.prototype;
        return OnForEachArrayElementEvent;
    }(ls.BaseEvent));
    ls.OnForEachArrayElementEvent = OnForEachArrayElementEvent;
    egret.registerClass(OnForEachArrayElementEvent,'ls.OnForEachArrayElementEvent');
})(ls || (ls = {}));
//# sourceMappingURL=OnForEachArrayElementEvent.js.map
var ls;
(function (ls) {
    var TriggerEvent = (function (_super) {
        __extends(TriggerEvent, _super);
        function TriggerEvent(type, triggerCondtion, triggerData, bubbles, cancelable) {
            if (triggerData === void 0) { triggerData = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            this.triggerTargets = [];
            this.triggerCondition = triggerCondtion;
            this.triggerData = triggerData;
        }
        var d = __define,c=TriggerEvent,p=c.prototype;
        TriggerEvent.TRIGGER = "TRIGGER";
        return TriggerEvent;
    }(egret.Event));
    ls.TriggerEvent = TriggerEvent;
    egret.registerClass(TriggerEvent,'ls.TriggerEvent');
})(ls || (ls = {}));
//# sourceMappingURL=TriggerEvent.js.map
var ls;
(function (ls) {
    var EventSheetVo = (function () {
        function EventSheetVo() {
        }
        var d = __define,c=EventSheetVo,p=c.prototype;
        return EventSheetVo;
    }());
    ls.EventSheetVo = EventSheetVo;
    egret.registerClass(EventSheetVo,'ls.EventSheetVo');
    var FamilyVo = (function () {
        function FamilyVo() {
        }
        var d = __define,c=FamilyVo,p=c.prototype;
        return FamilyVo;
    }());
    ls.FamilyVo = FamilyVo;
    egret.registerClass(FamilyVo,'ls.FamilyVo');
    var VariableVo = (function () {
        function VariableVo() {
        }
        var d = __define,c=VariableVo,p=c.prototype;
        return VariableVo;
    }());
    ls.VariableVo = VariableVo;
    egret.registerClass(VariableVo,'ls.VariableVo');
    var CollisionDataVo = (function () {
        function CollisionDataVo() {
        }
        var d = __define,c=CollisionDataVo,p=c.prototype;
        return CollisionDataVo;
    }());
    ls.CollisionDataVo = CollisionDataVo;
    egret.registerClass(CollisionDataVo,'ls.CollisionDataVo');
    var CollisionSearchVo = (function () {
        function CollisionSearchVo() {
            this.enemyNames = [];
        }
        var d = __define,c=CollisionSearchVo,p=c.prototype;
        return CollisionSearchVo;
    }());
    egret.registerClass(CollisionSearchVo,'CollisionSearchVo');
    var EventSheetDecoder = (function () {
        function EventSheetDecoder() {
        }
        var d = __define,c=EventSheetDecoder,p=c.prototype;
        EventSheetDecoder.saveEventSheetData = function (eventSheetName) {
            var eventSheet = ls.Config.sceneInfo.eventsheetData;
            this.eventsheetVo = new EventSheetVo();
            this.eventsheetVo.eventSheetName = eventSheetName;
            this.eventsheetVo.nextEventSheetName = eventSheet["$next"];
            this.eventsheetVo.prevEventSheetName = eventSheet["$previous"];
            this.eventsheetVo.layoutName = eventSheet["$layout"];
            var version = eventSheet["$version"];
            this.eventsheetVo.version = version ? (version) : "1.1.1";
            this.eventSheets[eventSheetName] = this.eventsheetVo;
        };
        EventSheetDecoder.start = function (eventSheetName) {
            ls.assert(eventSheetName == null || eventSheetName == "", eventSheetName + " can not null!");
            this.saveEventSheetData(eventSheetName);
            var eventSheet = ls.Config.sceneInfo.eventsheetData;
            ls.assert(eventSheet == null, "can not find " + eventSheetName);
            //GameUILayer.testContainer.addChild(this.testShape);
            this.curSceneInstancesData = [];
            this.curSceneEventsData = [];
            this.curSceneAiObjects = [];
            this.curSceneAiObjectsHash = {};
            this.curSceneEvents = [];
            var objectList = ls.World.getInstance().objectList;
            this.currentEventSheetName = eventSheetName;
            var _eventSheetDataList = eventSheet.children;
            if (_eventSheetDataList === undefined)
                return;
            for (var i = 0, itemlen = _eventSheetDataList.length; i < itemlen; i++) {
                var _data = _eventSheetDataList[i];
                var _type = _data["$type"];
                switch (_type) {
                    case "instance":
                        if (ls.LayoutDecoder.curSceneInstances[_data["$UID"]])
                            this.curSceneInstancesData.push(_data);
                        break;
                    case "family":
                        var familyVo = this.decodeFamily(_data);
                        this.curFamilys[familyVo.name] = familyVo;
                        //将familyVo里的实例添加行为
                        if (familyVo.insts && familyVo.behaviors) {
                            for (var fi = 0; fi < familyVo.insts.length; fi++) {
                                var finst = familyVo.insts[fi];
                                if (finst) {
                                    for (var bi = 0; bi < familyVo.behaviors.length; bi++) {
                                        var bh = familyVo.behaviors[bi];
                                        var cbh = fi == 0 ? bh : bh.clone();
                                        finst.addBehavior(cbh);
                                        cbh.onCreate();
                                        cbh.isCreated = true;
                                    }
                                }
                            }
                        }
                        break;
                    case "event":
                        this.curSceneEventsData.push(_data);
                        break;
                    case "variable":
                        //如果是全局变量，那么全部加入到System对象中
                        var v = this.decodeVaraible(_data);
                        if (ls.AISystem.instance[v.name] == undefined) {
                            switch (v.variableType) {
                                case "number":
                                    ls.AISystem.instance[v.name] = +v.initValue;
                                    break;
                                case "string":
                                    ls.AISystem.instance[v.name] = v.initValue + "";
                                    break;
                                case "any":
                                    ls.AISystem.instance[v.name] = v.initValue;
                                    break;
                                case "boolean":
                                    ls.AISystem.instance[v.name] = Boolean(ls.eval_e(v.initValue));
                                    break;
                            }
                            if (ls.AISystem.instance.globalVariables == undefined)
                                ls.AISystem.instance.globalVariables = {};
                            ls.AISystem.instance.globalVariables[v.name] = ls.AISystem.instance[v.name];
                        }
                        break;
                }
            }
            this.decode();
        };
        EventSheetDecoder.decode = function () {
            //解析属性
            this.decodePropertys();
            //解析事件
            this.decodeEvents();
            //发送场景初始化完成事件
            ls.AISystem.instance.sendSceneInitComplete();
            this.decodeExpressions();
            //开始渲染
            ls.GameUILayer.stage.addEventListener(egret.Event.ENTER_FRAME, this.eventsheetRender, this);
            //实例初始化完毕
            this.onInstancesCreate();
        };
        /**解析表达式 */
        EventSheetDecoder.decodeExpressions = function () {
            // var exps: any[][]       = ls["getObjectRefTabel"]();
            // this.expressionObject   = {};
            // for (var i: number = 0; i < exps.length; i++){
            //     var item: any[]     = exps[i];
            //     var key: string     = item[0];
            //     var value: any      = item[1];
            //     this.expressionObject[key] = value;
            // }
            // console.log(this.expressionObject);
        };
        //初始化aiObject
        EventSheetDecoder.decodePropertys = function () {
            //解析实例属性
            for (var i = 0, instancelen = this.curSceneInstancesData.length; i < instancelen; i++) {
                var _instanceData = this.curSceneInstancesData[i];
                var _targetType = _instanceData["$type"];
                var UID = +_instanceData["$UID"];
                var _instance = ls.LayoutDecoder.curSceneInstances[UID];
                if (_instance == null) {
                    ls.assert(true, "EventSheetDecoder UID:" + UID + " instance is null!");
                    continue;
                }
                this.curSceneAiObjectsHash[_instance.name] = _instance;
                this.curSceneAiObjects.push(_instance);
                //解析属性
                var _instanceItems = _instanceData.children;
                if (_instanceItems) {
                    var _instanceItemlen = _instanceItems.length;
                    for (var j = 0; j < _instanceItemlen; j++) {
                        var _instanceItem = _instanceItems[j];
                        this.decodeInstancePropertie(_instanceItem, _instance);
                    }
                }
            }
        };
        EventSheetDecoder.decodeFamily = function (data) {
            var _uids = data["$UID"];
            var uids = _uids == "" ? [] : _uids.split(',');
            var familyVo = new FamilyVo();
            familyVo.name = data["$target"];
            familyVo.UIDs = [];
            familyVo.insts = [];
            if (uids && uids.length) {
                for (var i = 0; i < uids.length; i++) {
                    familyVo.UIDs[i] = parseFloat(uids[i]);
                    familyVo.insts[i] = ls.LayoutDecoder.curSceneInstances[familyVo.UIDs[i]];
                }
            }
            //解析行为列表
            familyVo.behaviors = [];
            familyVo.variables = [];
            var familyChildrenData = data.children;
            for (var i = 0; i < familyChildrenData.length; i++) {
                var item = familyChildrenData[i];
                switch (item["$name"]) {
                    case "behaviors":
                        var behaviorDatas = item.children;
                        for (var i1 = 0; i1 < behaviorDatas.length; i1++) {
                            var behaviorVo = this.decodeBehavior(behaviorDatas[i1]);
                            familyVo.behaviors[i1] = behaviorVo;
                        }
                        break;
                    case "variables":
                        var variableDatas = item.children;
                        for (var i2 = 0; i2 < variableDatas.length; i2++) {
                            var variableVo = this.decodeVaraible(variableDatas[i2]);
                            familyVo.variables[i2] = variableVo;
                        }
                        break;
                }
            }
            //将组的变量绑定到对象实例上
            if (familyVo.insts && familyVo.variables) {
                for (var i = 0; i < familyVo.insts.length; i++) {
                    var inst = familyVo.insts[i];
                    for (var j = 0; j < familyVo.variables.length; j++) {
                        var v = familyVo.variables[j];
                        switch (v.variableType) {
                            case "number":
                                inst[v.name] = +v.initValue;
                                break;
                            case "string":
                                inst[v.name] = v.initValue + "";
                                break;
                            case "any":
                                inst[v.name] = v.initValue;
                                break;
                            case "boolean":
                                inst[v.name] = Boolean(ls.eval_e(v.initValue));
                                break;
                        }
                    }
                }
            }
            return familyVo;
        };
        EventSheetDecoder.decodeVaraible = function (data) {
            var v = new VariableVo();
            v.initValue = decodeURIComponent(data["$initValue"]);
            v.variableType = data["$variableType"];
            v.name = data["$variableName"];
            return v;
        };
        //解析事件数据
        EventSheetDecoder.decodeEvents = function () {
            //解析事件属性
            for (var i = 0; i < this.curSceneEventsData.length; i++) {
                var eventData = this.curSceneEventsData[i];
                var event = this.decodeEvent(eventData, i);
                if (event)
                    this.curSceneEvents.push(event);
            }
        };
        //解析事件
        EventSheetDecoder.decodeEvent = function (eventData, index) {
            var event = new ls.AIEvent();
            event.index = index;
            //【兼容1.11以前】,1.11以前版本有$conditionRelationShip,后面的将会取消，以operatorType替代
            var conditionRelationShip = eventData["$conditionRelationShip"];
            if (conditionRelationShip)
                event.conditionRelationShip = ls.eval_e(conditionRelationShip);
            //是否是一次性触发事件
            var triggerOnceWhileTrue = eventData["$triggerOnceWhileTrue"];
            if (triggerOnceWhileTrue)
                event.triggerOnceWhileTrue = ls.eval_e(triggerOnceWhileTrue);
            //条件列表
            var items = eventData.children;
            if (items == null)
                return;
            var prevConditionBlock;
            var nextConditionBlock;
            var eventlen = items.length;
            var conditionBlockIndex = 0;
            var conditionIndex = 0;
            var actionIndex = 0;
            //检测是否有conditionBlock元素
            var isHasConditionBlock = false;
            for (var i = 0; i < eventlen; i++) {
                if (items[i]["$type"] === "conditionBlock") {
                    isHasConditionBlock = true;
                    break;
                }
            }
            if (isHasConditionBlock) {
                var subEventIndex = 0;
                for (var j = 0; j < eventlen; j++) {
                    var childItem = items[j];
                    var childType = childItem["$type"];
                    var conditionBlock;
                    //1.2及以后的版本
                    //解析条件块
                    switch (childType) {
                        case "conditionBlock":
                            conditionBlock = this.decodeConditionBlock(childItem.children, conditionBlockIndex, event);
                            conditionBlock.event = event;
                            if (event.conditionBlocks == null)
                                event.conditionBlocks = [];
                            event.conditionBlocks.push(conditionBlock);
                            if (conditionBlockIndex === 0) {
                                prevConditionBlock = conditionBlock;
                            }
                            else {
                                //上一个
                                conditionBlock.prevConditionBlock = prevConditionBlock;
                                prevConditionBlock = conditionBlock;
                                //下一个
                                conditionBlock.prevConditionBlock.nextConditionBlock = conditionBlock;
                            }
                            conditionBlockIndex++;
                            break;
                        case "event":
                            if (event.children == null)
                                event.children = [];
                            var subEvent = this.decodeEvent(childItem, subEventIndex);
                            subEvent.parent = event;
                            event.children.push(subEvent);
                            subEventIndex++;
                            break;
                    }
                }
            }
            else {
                //1.11及以前的版本
                subEventIndex = 0;
                var version1_1_1Datas = [];
                for (var j = 0; j < eventlen; j++) {
                    var childItem = items[j];
                    var childType = childItem["$type"];
                    switch (childType) {
                        case "condition":
                        case "action":
                            version1_1_1Datas.push(childItem);
                            break;
                        case "event":
                            if (event.children == null)
                                event.children = [];
                            var subEvent = this.decodeEvent(childItem, subEventIndex);
                            subEvent.parent = event;
                            event.children.push(subEvent);
                            subEventIndex++;
                            break;
                    }
                }
                conditionBlock = this.decodeConditionBlock(version1_1_1Datas, 0, event);
                conditionBlock.event = event;
                if (event.conditionBlocks == null)
                    event.conditionBlocks = [];
                event.conditionBlocks.push(conditionBlock);
                if (conditionBlockIndex === 0) {
                    prevConditionBlock = conditionBlock;
                }
                else {
                    //上一个
                    conditionBlock.prevConditionBlock = prevConditionBlock;
                    prevConditionBlock = conditionBlock;
                    //下一个
                    conditionBlock.prevConditionBlock.nextConditionBlock = conditionBlock;
                }
                conditionBlockIndex++;
            }
            return event;
        };
        //解析实例属性数据
        EventSheetDecoder.decodeInstancePropertie = function (data, instance) {
            var _itemType = data["$type"];
            switch (_itemType) {
                case "behavior":
                    //如果global.xml解析过一次，那么，此时不需要解析了
                    if (instance.global)
                        break;
                    var _behavior = this.decodeBehavior(data);
                    if (instance instanceof ls.AIDisplayObject)
                        instance.addBehavior(_behavior);
                    else
                        ls.assert(true, instance + "must instance of AIDisplayObject for have Behaviors");
                    //添加行为列表
                    _behavior.onCreate();
                    _behavior.isCreated = true;
                    break;
                case "variable":
                    var variableName = data["$variableName"];
                    var variableValueType = data["$variableType"];
                    var initValue = decodeURIComponent(data["$initValue"]);
                    switch (variableValueType) {
                        case "number":
                            instance.addVariable(variableName, +initValue);
                            break;
                        case "string":
                            instance.addVariable(variableName, initValue + "");
                            break;
                        case "any":
                            instance.addVariable(variableName, initValue);
                            break;
                        case "boolean":
                            instance.addVariable(variableName, Boolean(ls.eval_e(initValue)));
                            break;
                    }
                    break;
            }
        };
        //解析行为列表
        EventSheetDecoder.decodeBehavior = function (data) {
            //注意完全限定类名中都要加Behavior扩展关键字以便好识别
            var _behaivorType = data["$behaviorType"];
            var _behaivor = ls.getInstanceByPluginClassName(_behaivorType);
            _behaivor.name = data["$name"];
            //行为数据
            var _behaivorDatas = data.children;
            if (_behaivorDatas) {
                var _behaivorDatalen = _behaivorDatas.length;
                for (var k = 0; k < _behaivorDatalen; k++) {
                    var _propertyItem = _behaivorDatas[k];
                    var _propertyName = _propertyItem["$name"];
                    var _propertyValue = decodeURIComponent(_propertyItem["$value"]);
                    var _propertyValueType = _propertyItem["$valueDataType"];
                    switch (_propertyValueType) {
                        case "number":
                            _behaivor[_propertyName] = +_propertyValue;
                            break;
                        case "string":
                            _behaivor[_propertyName] = _propertyValue + "";
                            break;
                        case "any":
                            _behaivor[_propertyName] = _propertyValue;
                            break;
                        case "boolean":
                            _behaivor[_propertyName] = Boolean(ls.eval_e(_propertyValue));
                            break;
                    }
                }
            }
            return _behaivor;
        };
        //解析条件块数据
        //为了兼容以前的1.1.1版本，data是个数组
        EventSheetDecoder.decodeConditionBlock = function (data, index, event) {
            var items = data;
            if (items) {
                var conditionBlock = new ls.ConditionBlock();
                conditionBlock.index = index;
                conditionBlock.conditions = [];
                conditionBlock.actions = [];
                var len = items.length;
                var conditionIndex = 0;
                var actionIndex = 0;
                var firstCondition;
                var prevCondition;
                var nextCondition;
                var firstAction;
                var prevAction;
                var nextAction;
                for (var i = 0; i < len; i++) {
                    var childItem = items[i];
                    var childType = childItem["$type"];
                    switch (childType) {
                        case "condition":
                            var condition = this.decodeCondition(childItem, conditionIndex, event);
                            condition.conditionBlock = conditionBlock;
                            condition.event = event;
                            if (condition.callCondition == undefined) {
                                if (!condition.isFamily)
                                    ls.assert(true, "目标：" + condition.callTarget + "没有" + condition.callConditionName + "方法！！！");
                                else
                                    ls.assert(true, "目标组没有" + condition.callConditionName + "方法！！！");
                            }
                            conditionBlock.conditions.push(condition);
                            if (conditionIndex === 0)
                                prevCondition = firstCondition = condition;
                            else {
                                condition.prevCondition = prevCondition;
                                prevCondition = condition;
                                condition.prevCondition.nextCondition = condition;
                            }
                            conditionIndex++;
                            break;
                        case "action":
                            var action = this.decodeAction(childItem, actionIndex, event);
                            action.conditionBlock = conditionBlock;
                            action.event = event;
                            conditionBlock.actions.push(action);
                            if (actionIndex === 0)
                                prevAction = firstAction = action;
                            else {
                                action.prevAction = prevAction;
                                prevAction = action;
                                action.prevAction.nextAction = action;
                            }
                            actionIndex++;
                            break;
                    }
                }
                return conditionBlock;
            }
            return null;
        };
        /**
         * 解析条件属性(条件属性要在运行时一直解析，否则，很多时候读取的值可能不是动态的，只是初始化的值)
         * 并且条件属性中可能会有组
         */
        EventSheetDecoder.decodeConditionProperties = function (eventsid, conditionIndex, conditionInstance) {
            var key = eventsid + "_" + conditionIndex;
            if (this.instancesConditions[key] == undefined) {
                var data = conditionInstance.data;
                var conditionPropsInfos = data.children;
                if (conditionPropsInfos) {
                    var conditionProplen = conditionPropsInfos.length;
                    for (var i = 0; i < conditionProplen; i++) {
                        var conditionPropItem = conditionPropsInfos[i];
                        var conditionPropType = conditionPropItem["$valueDataType"];
                        var conditionPropName = conditionPropItem["$name"];
                        var conditionPropValue = conditionPropItem["$value"];
                        var isVariable = conditionPropItem["$variable"] ? conditionPropItem["$variable"] === "true" : false;
                        var isFamily = conditionPropItem["$isFamily"] ? conditionPropItem["$isFamily"] === "true" : false;
                        conditionInstance.isFamily = isFamily;
                        switch (conditionPropType) {
                            case "number":
                                conditionInstance[conditionPropName] = +conditionPropValue;
                                break;
                            case "string":
                                var realValue = decodeURIComponent(conditionPropValue + "");
                                realValue = isVariable ? realValue : ls.getTransformationStr(realValue);
                                if (isVariable)
                                    conditionInstance[conditionPropName] = realValue;
                                else
                                    conditionInstance[conditionPropName] = ls.eval_e(realValue);
                                break;
                            case "any":
                                conditionInstance[conditionPropName] = isVariable ? decodeURIComponent(conditionPropItem["$value"]) : ls.getTransformationStr(decodeURIComponent(conditionPropItem["$value"]));
                                break;
                            case "boolean":
                                conditionInstance[conditionPropName] = Boolean(ls.eval_e(conditionPropValue));
                                break;
                        }
                    }
                }
                this.instancesConditions[key] = conditionInstance;
            }
            conditionInstance = this.instancesConditions[key];
            return conditionInstance;
        };
        EventSheetDecoder.decodeConditionFamilyProperties = function (conditionInstance, data) {
            var list = [];
            var conditionPropsInfos = data.children;
            if (conditionPropsInfos) {
                var conditionProplen = conditionPropsInfos.length;
                for (var i = 0; i < conditionProplen; i++) {
                    var conditionPropItem = conditionPropsInfos[i];
                    var isFamily = conditionPropItem["$isFamily"] ? conditionPropItem["$isFamily"] === "true" : false;
                    if (isFamily) {
                        var enemyName = conditionPropItem["$value"];
                        var familyVo = this.curFamilys[enemyName];
                        var familyInstances = familyVo.insts;
                        for (var j = 0; j < familyInstances.length; j++) {
                            if (list.indexOf(familyInstances[j].name) == -1) {
                                list.push(familyInstances[j].name);
                            }
                        }
                    }
                }
            }
            return list;
        };
        //解析条件数据
        EventSheetDecoder.decodeCondition = function (data, index, event) {
            var targetName = data["$target"]; //实例名
            var behaviorName = data["$behaviorName"]; //如果此值存在，那么，表示是执行该目标的行为方法，否则执行实例方法
            var conditionInstance = ls.getInstanceByPluginClassName(data["$paramsClass"]);
            var callName = data["$callName"]; //【目标，函数名，函数参数】
            var invert = false;
            //invert
            if (data["$invert"])
                invert = (data["$invert"] === "true");
            //loop
            var loop = false;
            if (data["$loop"])
                loop = (data["$loop"] === "true");
            var condition = new ls.Condition();
            condition.index = index;
            condition.firstCondition = (index == 0) ? condition : null;
            condition.targetName = targetName;
            condition.paramClassName = data["$paramsClass"];
            condition.isInvert = invert;
            condition.paramsInstance = conditionInstance;
            condition.callConditionName = callName;
            condition.isFamily = (data["$family"] == "true");
            condition.event = event;
            if (ls.Version.compareVersion(this.eventsheetVo.version, "1.1.1") === 1) {
                var operatorType = 0;
                if (data["$operatorType"])
                    operatorType = +data["$operatorType"];
                condition.operatorType = operatorType;
            }
            else {
                //【兼容1.1.1以前】为了兼容以前的版本，解析conditionRelationShip
                condition.operatorType = +(!event.conditionRelationShip);
            }
            if (conditionInstance) {
                conditionInstance.data = data;
                condition.isTrigger = Boolean(ls.eval_e(data["$isTrigger"]));
                //存储带触发条件的条件
                if (condition.isTrigger)
                    this.triggerConditions.push(condition);
            }
            //这里要优化碰撞检测查找目标，这里可能也需要组的操作,这里需要对组进行处理
            if (callName == "onCollisionWithOtherObject") {
                //主要是存储敌人
                var conditionPropsInfos = data.children;
                if (conditionPropsInfos) {
                    var enemyName = conditionPropsInfos[0]["$value"];
                    var enemy = ls.eval_e(ls.getTransformationStr(enemyName));
                    if (condition.isFamily) {
                        var familyVo = this.curFamilys[targetName];
                        if (familyVo.insts && familyVo.insts.length > 0) {
                            for (var fi = 0; fi < familyVo.insts.length; fi++) {
                                var _inst = familyVo.insts[fi];
                                if (this.collisionSearchs[_inst.name] == null) {
                                    var collisionVo = new CollisionSearchVo();
                                    collisionVo.owerName = _inst.name;
                                    if (enemy instanceof ls.AIDisplayObject)
                                        collisionVo.enemyNames.push(enemyName);
                                    this.collisionSearchs[_inst.name] = collisionVo;
                                }
                                else {
                                    collisionVo = this.collisionSearchs[_inst.name];
                                    if (enemy instanceof ls.AIDisplayObject)
                                        collisionVo.enemyNames.push(enemyName);
                                }
                            }
                        }
                    }
                    else {
                        var list = this.decodeConditionFamilyProperties(condition.paramsInstance, data);
                        if (this.collisionSearchs[targetName] == null) {
                            var collisionVo = new CollisionSearchVo();
                            collisionVo.owerName = targetName;
                            this.collisionSearchs[targetName] = collisionVo;
                        }
                        else {
                            collisionVo = this.collisionSearchs[targetName];
                        }
                        if (list.length > 0) {
                            //组
                            for (var m = 0; m < list.length; m++) {
                                collisionVo.enemyNames.push(list[m]);
                            }
                        }
                        else {
                            if (enemy instanceof ls.AIDisplayObject)
                                collisionVo.enemyNames.push(enemyName);
                        }
                    }
                }
            }
            if (ls.isSingleInst(targetName)) {
                condition.callTarget = ls.getInstanceByInstanceName(targetName);
                condition.callCondition = condition.callTarget[callName];
            }
            else {
                //查找目标的行为列表
                if (condition.isFamily) {
                    var callThisObject = null;
                    var familyVo = this.curFamilys[targetName];
                    var familyInstances = familyVo.insts;
                    if (familyInstances == undefined)
                        alert("当前场景中没有" + targetName + "的组！！！");
                    var callFamilyTargets = [];
                    for (var f = 0; f < familyInstances.length; f++) {
                        var fInstance = familyInstances[f];
                        var templateInstance = ls.World.getInstance().objectHash[fInstance.name][0];
                        //这里需要查找当前条件中用到的行为
                        if (behaviorName != null && behaviorName != "") {
                            if (templateInstance) {
                                var behaviors = familyVo.behaviors;
                                var _b;
                                for (var i = 0, len = behaviors.length; i < len; i++) {
                                    var behaivor = behaviors[i];
                                    if (behaivor.name == behaviorName) {
                                        _b = behaivor;
                                        break;
                                    }
                                }
                                callThisObject = (_b == null) ? templateInstance : _b;
                            }
                        }
                        else {
                            callThisObject = [];
                            callThisObject.push(templateInstance);
                        }
                    }
                    condition.callTarget = callThisObject;
                    if (callThisObject[0] == undefined)
                        condition.callCondition = callThisObject[callName];
                    else
                        condition.callCondition = callThisObject[0][callName];
                }
                else {
                    //取模板实例
                    var callThisObject = null;
                    if (ls.World.getInstance().objectHash[targetName] == undefined)
                        alert("当前场景中没有" + targetName + "实例对象！！！");
                    var templateInstance = ls.World.getInstance().objectHash[targetName][0];
                    if (behaviorName != null && behaviorName != "") {
                        if (templateInstance) {
                            var behaviors = templateInstance.behaviors;
                            for (var i = 0, len = behaviors.length; i < len; i++) {
                                var behaivor = behaviors[i];
                                if (behaivor.name == behaviorName) {
                                    callThisObject = behaivor;
                                    break;
                                }
                            }
                            callThisObject = (callThisObject == null) ? templateInstance : callThisObject;
                        }
                    }
                    else {
                        callThisObject = templateInstance;
                    }
                    condition.callTarget = callThisObject;
                    condition.callCondition = condition.callTarget[callName];
                }
                if (condition.callCondition === undefined)
                    ls.assert(true, "条件目标:" + condition.targetName + ",没有调用的方法名：" + callName);
            }
            return condition;
        };
        //解析动作数据
        EventSheetDecoder.decodeAction = function (data, index, event) {
            var targetName = data["$target"];
            var behaviorName = data["$behaviorName"]; //如果此值存在，那么，表示是执行该目标的行为方法，否则执行实例方法 
            var callName = data["$callName"];
            var isFamily = (data["$family"] == "true");
            //modified
            var callTarget;
            if (ls.isSingleInst(targetName)) {
                callTarget = ls.getInstanceByInstanceName(targetName);
            }
            else {
                if (this.curSceneAiObjects) {
                    for (var i = 0, len = this.curSceneAiObjects.length; i < len; i++) {
                        if (this.curSceneAiObjects[i].name == targetName) {
                            callTarget = this.curSceneAiObjects[i];
                            var callThisObject;
                            if (behaviorName != null && behaviorName != "") {
                                if (callTarget) {
                                    var behaviors = callTarget["behaviors"];
                                    if (behaviors) {
                                        for (var j = 0, slen = behaviors.length; j < slen; j++) {
                                            var behaivor = behaviors[j];
                                            if (behaivor.name == behaviorName) {
                                                callThisObject = behaivor;
                                                break;
                                            }
                                        }
                                        callTarget = callThisObject;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
            if (callTarget == undefined)
                callTarget = ls.eval_e(targetName);
            var callParams = [];
            var action = new ls.Action();
            action.index = index;
            action.targetName = targetName;
            action.isFamily = isFamily;
            action.callTarget = callTarget;
            action.paramData = data.children;
            action.callHanlderName = callName;
            return action;
        };
        /**解析动作参数 */
        EventSheetDecoder.decodeActionParams = function (action) {
            var actionParams = {};
            var params = [];
            var actionPropsInfos = action.paramData;
            var isFamilys = [];
            var hasFamily = false;
            if (actionPropsInfos && actionPropsInfos.length) {
                for (var i = 0, len = actionPropsInfos.length; i < len; i++) {
                    var _propertyItem = actionPropsInfos[i];
                    var _propertyValueType = _propertyItem["$valueDataType"];
                    var _propertyName = _propertyItem["$name"];
                    var _propertyValue = decodeURIComponent(_propertyItem["$value"]);
                    var _isVariable = _propertyItem["$variable"] ? _propertyItem["$variable"] === "true" : false;
                    var _isFamily = _propertyItem["$isFamily"] ? _propertyItem["$isFamily"] === "true" : false;
                    if (_isFamily) {
                        hasFamily = true;
                    }
                    var _value;
                    switch (_propertyValueType) {
                        case "number":
                            _value = +_propertyValue;
                            break;
                        case "string":
                            _propertyValue = _isVariable ? _propertyValue : ls.getTransformationStr(_propertyValue);
                            if (_isVariable)
                                _value = _propertyValue;
                            else
                                _value = ls.eval_e(_propertyValue + "");
                            break;
                        case "any":
                            _value = _isVariable ? _propertyValue : ls.getTransformationStr(_propertyValue);
                            break;
                        case "boolean":
                            _value = Boolean(ls.eval_e(_propertyValue));
                            break;
                    }
                    isFamilys[i] = _isFamily;
                    params.push(_value);
                }
            }
            actionParams.params = params;
            actionParams.isFamilys = isFamilys;
            actionParams.hasFamily = hasFamily;
            return actionParams;
        };
        EventSheetDecoder.tick = function () {
            return this._tick;
        };
        EventSheetDecoder.eventsheetRender = function (event) {
            var system = ls.AISystem.instance;
            var currentTime = egret.getTimer();
            if (this.lastTickTime !== 0) {
                this._tick = currentTime - this.lastTickTime;
                if (this._tick < 0)
                    this._tick = 0;
                system.dt1 = this._tick / 1000;
                //如果最小化了，或者切换了tab标签，那么，停止游戏
                if (system.dt1 > 0.5) {
                    system.dt1 = 0;
                }
                else if (system.dt1 > 1 / system.minimumFramerate) {
                    system.dt1 = 1 / system.minimumFramerate;
                }
                //渲染摄像机
                ls.World.getInstance().sceneCamera.render();
                ls.World.getInstance().sceneCamera.renderContainer();
                this.renderCamera();
                //渲染事件
                this.renderEvents();
                //渲染行为
                this.renderBehaviors();
                //渲染更新
                this.onRenderUpdate();
                //渲染更新
                if (this.onEventSheetTick != null)
                    this.onEventSheetTick();
                //碰撞检测
                this.checkCollistions();
            }
            this.lastTickTime = currentTime;
            system.dt = system.dt1 * system.timeScale;
        };
        EventSheetDecoder.onRenderUpdate = function () {
            var insts = ls.World.getInstance().objectList;
            for (var i = 0; i < insts.length; i++) {
                var inst = insts[i];
                if (inst instanceof ls.AIDisplayObject)
                    inst.renderUpdate();
            }
        };
        //渲染摄像机
        EventSheetDecoder.renderCamera = function () {
            ls.World.getInstance().render();
        };
        //实例初始化完毕
        EventSheetDecoder.onInstancesCreate = function () {
            for (var uid in ls.LayoutDecoder.curSceneInstances) {
                if (ls.LayoutDecoder.curSceneInstances[uid] instanceof ls.AIDisplayObject) {
                    ls.LayoutDecoder.curSceneInstances[uid].onCreate();
                }
            }
        };
        //渲染行为的列表
        EventSheetDecoder.renderBehaviors = function () {
            var objectList = ls.World.getInstance().objectList;
            //检测是否绑定了横轴跑酷行为，如果有，那么，让其行为最后执行
            //检测所有的对象，并渲染其行为 
            var platforms = [];
            for (var i = 0; i < objectList.length; i++) {
                var inst = objectList[i];
                //if (inst && !inst["hasPlatform"]) {
                inst.onTick();
                var behaviors = inst.behaviors;
                if (behaviors) {
                    for (var j = 0; j < behaviors.length; j++) {
                        var behaivor = behaviors[j];
                        if (behaivor.enabled && behaivor.inst && !(behaivor.inst.dt === 0 || behaivor.inst.dt > 1000000))
                            behaivor.tick();
                    }
                }
            }
            // for (var i: number = 0; i < platforms.length; i++){
            //     var inst: AIDisplayObject = platforms[i];
            //     if (inst.container) {
            //         inst.onTick();
            //         var behaviors: BaseBehavior[]       = inst.behaviors;
            //         if (behaviors) {
            //             for (var j: number = 0; j < behaviors.length; j++) {
            //                 var behaivor: BaseBehavior = behaviors[j];
            //                 if (behaivor.enabled && behaivor.inst && !(behaivor.inst.dt === 0 || behaivor.inst.dt > 1000000))
            //                     behaivor.tick();  
            //             }
            //         }
            //     }
            // }
        };
        EventSheetDecoder.renderEvents = function () {
            var disableDataEvents = ls.AISystem.instance.disableDataEvents;
            for (var i = 0; i < this.curSceneEvents.length; i++) {
                //序号从1开始
                if (disableDataEvents[i + 1] == undefined) {
                    var event = this.curSceneEvents[i];
                    this.execEvent(event);
                }
            }
        };
        //条件块是为if else 条件语句而生的
        EventSheetDecoder.execEvent = function (event, triggerInfo) {
            if (triggerInfo === void 0) { triggerInfo = null; }
            if (event.enabled) {
                //如果有父事件，判断父事件条件块状态，否则，直接判断
                var status = false;
                if (event.parent) {
                    if (event.parent.conditionBlocks[0].status)
                        status = true;
                }
                else {
                    status = true;
                }
                if (status) {
                    var cbs = event.conditionBlocks;
                    this.execConditionBlock(cbs[0], triggerInfo);
                }
            }
        };
        EventSheetDecoder.execConditionBlock = function (cb, triggerInfo) {
            if (cb) {
                cb.cs = {};
                cb.loopDatas = [];
                cb.loopLayers = 0;
                this.execNextCondition(cb.conditions[0], cb, triggerInfo, function () {
                    //如果所有的条件都进行完毕，那么，直接进行动作处理，这里将产生所有条件过滤出来的结果
                    var filterInstances = [];
                    //第一步，所有条件进行过滤
                    var cStatus;
                    for (var i = 0; i < cb.conditions.length; i++) {
                        var condition = cb.conditions[i];
                        if (i == 0) {
                            cStatus = condition.currentStatus;
                        }
                        else {
                            if (condition.operatorType == 1)
                                cStatus = cStatus || condition.currentStatus;
                            else
                                cStatus = cStatus && condition.currentStatus;
                        }
                    }
                    cb.status = cStatus;
                    if (cStatus) {
                        //如果是一次性触发条件，那么，将去掉禁止掉该事件的运行
                        if (cb.event.triggerOnceWhileTrue)
                            cb.event.enabled = false;
                        //所有的总的条件计算完毕，并成立后，再次计算所有目标所有条件的状态比较值
                        for (var uid in cb.cs.instanceStatus) {
                            var cs = cb.cs.instanceStatus[uid];
                            var _inst = cs.instance;
                            var _ccs = cs.ccs;
                            var _s;
                            var _computeIndex = 0;
                            for (var cindex in _ccs) {
                                var ccs = _ccs[cindex];
                                var c = ccs.c;
                                //首先总的条件要成立
                                if (_computeIndex == 0) {
                                    _s = ccs.status;
                                }
                                else {
                                    if (c.operatorType == 1)
                                        _s = (_s || ccs.status);
                                    else
                                        _s = (_s && ccs.status);
                                }
                                _computeIndex++;
                            }
                            if (_s) {
                                filterInstances.push(_inst);
                            }
                        }
                        //只有过滤的目标大于0，才会执行动作与子事件
                        if (filterInstances.length > 0) {
                            cb.execActions(filterInstances);
                            //解析子事件
                            var _event = cb.event;
                            if (_event.children) {
                                for (var m = 0; m < _event.children.length; m++) {
                                    var subevent = _event.children[m];
                                    if (subevent) {
                                        subevent.lastFilterTargets = filterInstances;
                                        EventSheetDecoder.execEvent(subevent);
                                    }
                                }
                            }
                        }
                    }
                });
                var nextBlock = cb.nextConditionBlock;
                if (nextBlock)
                    this.execConditionBlock(nextBlock, triggerInfo);
            }
        };
        /**
         * 执行下一个条件
         * c2做了特殊处理，触发条件产生的过滤与普通条件不一致
         */
        EventSheetDecoder.execNextCondition = function (c, cb, triggerInfo, onComplete) {
            if (onComplete === void 0) { onComplete = null; }
            if (c) {
                var condition = c;
                var targetName = condition.targetName; //实例名称
                var isFamily = condition.isFamily; //是否是组
                var callTarget = condition.callTarget; //可能为实例，也可能为行为（模板）
                var callCondition = condition.callCondition;
                var callConditionName = condition.callConditionName;
                var isInvert = condition.isInvert;
                var paramClassName = condition.paramClassName; //参数实例名称（模板）
                var paramsInstance = condition.paramsInstance; //参数实例类（模板）
                var conditionIsTrigger = condition.isTrigger; //当前条件是否是触发
                var objectlist;
                //检测所有的目标   
                //重置当前总的条件状态
                condition.currentStatus = false;
                if (!cb.cs.instanceStatus)
                    cb.cs.instanceStatus = {};
                if (isFamily) {
                    //如果是组，那么，选取组中所有的对象
                    objectlist = this.curFamilys[targetName].insts;
                }
                else {
                    //非组中可能会出现单例
                    if (ls.isSingleInst(targetName))
                        objectlist = [ls.getInstanceByInstanceName(targetName)];
                    else {
                        objectlist = ls.World.getInstance().objectHash[targetName];
                    }
                }
                //如果条件本身是触发条件
                if (conditionIsTrigger) {
                    for (var k = 0; k < objectlist.length; k++) {
                        var instance = objectlist[k];
                        if (!cb.cs.instanceStatus[instance.u_id])
                            cb.cs.instanceStatus[instance.u_id] = { instance: instance, ccs: {} };
                        cb.cs.instanceStatus[instance.u_id].ccs[condition.index] = { c: condition, status: false };
                    }
                    if (triggerInfo && condition == triggerInfo.compareCondition) {
                        condition.currentStatus = true;
                        var triggerTargets = triggerInfo.triggerTargets;
                        if (triggerTargets) {
                            for (var i = 0; i < triggerTargets.length; i++) {
                                var _inst = triggerTargets[i];
                                if (!cb.cs.instanceStatus[_inst.u_id])
                                    cb.cs.instanceStatus[_inst.u_id] = { instance: _inst, ccs: {} };
                                cb.cs.instanceStatus[_inst.u_id].ccs[condition.index] = { c: condition, status: true };
                            }
                        }
                    }
                    else {
                        condition.currentStatus = false;
                    }
                }
                else {
                    for (var i = 0; i < objectlist.length; i++) {
                        var instance = objectlist[i];
                        var searchBehavior;
                        //如果调用的目标是行为
                        if (callTarget instanceof ls.BaseBehavior) {
                            var behaviors;
                            if (isFamily) {
                                if (triggerInfo && triggerInfo.familyVo)
                                    behaviors = triggerInfo.familyVo.behaviors;
                            }
                            else
                                behaviors = instance.behaviors;
                            //如果是行为，查找同名行为，这也意味着1个实例只有存在着同一个种行为，不能添加多种行为
                            for (var j = 0; j < behaviors.length; j++) {
                                var bh = behaviors[j];
                                if (bh.name == callTarget.name) {
                                    searchBehavior = bh;
                                    break;
                                }
                            }
                        }
                        //解析条件属性
                        this.decodeConditionProperties(c.event.sid, c.index, paramsInstance);
                        //求解条件结果，这里的条件有可能是实例的条件，也有可能是行为的条件
                        //求解结果需要将所有的条件中包包含的目标存起来进行比较，否则，逻辑不正确
                        var rs = callCondition.apply(searchBehavior ? searchBehavior : instance, [paramsInstance]);
                        rs.status = (isInvert) ? !rs.status : rs.status;
                        //记录for循环
                        if (rs.data && (rs.data instanceof ls.ForEvent || rs.data instanceof ls.ForEachOrderEvent || rs.data instanceof ls.OnForEachArrayElementEvent))
                            cb.loopDatas[cb.loopLayers++] = rs.data;
                        if (!cb.cs.instanceStatus[instance.u_id])
                            cb.cs.instanceStatus[instance.u_id] = { instance: instance, ccs: {} };
                        cb.cs.instanceStatus[instance.u_id].ccs[condition.index] = { c: condition, status: rs.status };
                        if (rs.status)
                            condition.currentStatus = rs.status;
                    }
                }
                //如果下一个条件为或，那么，继续检测
                var nc = c.nextCondition;
                if (nc) {
                    this.execNextCondition(nc, cb, triggerInfo, onComplete);
                }
                else {
                    if (onComplete)
                        onComplete();
                }
            }
        };
        EventSheetDecoder.checkCollistions = function () {
            var world = ls.World.getInstance();
            var objectList = world.objectList;
            var collisionGroups = {};
            for (var targetName in this.collisionSearchs) {
                var coVo = this.collisionSearchs[targetName];
                var owners = world.objectHash[coVo.owerName];
                for (var ownerKey in owners) {
                    var ownerObject = owners[ownerKey];
                    if (!ownerObject.container.stage)
                        continue;
                    if (ownerObject.isDead)
                        continue;
                    if (!ownerObject.collision)
                        continue;
                    for (var i = 0; i < coVo.enemyNames.length; i++) {
                        var enemyName = coVo.enemyNames[i];
                        var enemys = world.objectHash[enemyName];
                        for (var enemyKey in enemys) {
                            var enemyObject = enemys[enemyKey];
                            if (!enemyObject.container.stage)
                                continue;
                            if (!enemyObject.collision)
                                continue;
                            if (enemyObject.isDead)
                                continue;
                            var colliding = ls.Collision.checkCollision(ownerObject, enemyObject);
                            if (colliding) {
                                if (collisionGroups[ownerObject.u_id] == null) {
                                    collisionGroups[ownerObject.u_id] = [ownerObject, enemyObject];
                                }
                                if (collisionGroups[enemyObject.u_id] == null) {
                                    collisionGroups[enemyObject.u_id] = [enemyObject, ownerObject];
                                }
                            }
                        }
                    }
                }
            }
            var isExecCollision = {};
            for (var i2 = 0; i2 < objectList.length; i2++) {
                if (objectList[i2] instanceof ls.AIDisplayObject) {
                    var inst = objectList[i2];
                    var targets = collisionGroups[inst.u_id];
                    if (targets != null) {
                        var target = targets[1];
                        var insertNums = 0;
                        if (isExecCollision[inst.u_id] == null) {
                            insertNums++;
                            isExecCollision[inst.u_id] = inst;
                        }
                        if (isExecCollision[target.u_id] == null) {
                            insertNums++;
                            isExecCollision[target.u_id] = target;
                        }
                        if (insertNums != 2) {
                            inst.setIsColliding(true, target);
                        }
                    }
                    else {
                        inst.setIsColliding(false, null);
                    }
                }
            }
        };
        EventSheetDecoder.execScenePauseOrPlay = function (type) {
            if (type == 0)
                ls.StartUp.stage.frameRate = 0.001;
            else
                ls.StartUp.stage.frameRate = 60;
        };
        EventSheetDecoder.destory = function () {
            this.curSceneInstancesData = []; //重置当前场景的实例列表
            this.curSceneEventsData = [];
            this.curSceneAiObjects = [];
            this.curSceneAiObjectsHash = {};
            this.curSceneEvents = [];
            this.triggerConditions = [];
            this.curFamilys = {};
            this.instancesConditions = {};
            ls.AISystem.instance.disableDataEvents = {};
            //全局变量不要销毁，除非主动销毁
            ls.GameUILayer.stage.removeEventListener(egret.Event.ENTER_FRAME, this.eventsheetRender, this);
        };
        EventSheetDecoder.curSceneInstancesData = []; //当前场景的实例列表
        EventSheetDecoder.curSceneEventsData = []; //当前场景的事件数据
        EventSheetDecoder.curSceneAiObjects = []; //当前场景的对象列表
        EventSheetDecoder.curSceneAiObjectsHash = {}; //当前场景的对象列表(以实例名字存储)
        EventSheetDecoder.curSceneEvents = []; //当前场景的事件列表 
        EventSheetDecoder.curFamilys = {}; //当前场景组列表
        EventSheetDecoder.eventSheets = {};
        EventSheetDecoder.collisionSearchs = {};
        EventSheetDecoder.lastTickTime = 0;
        EventSheetDecoder._tick = 60;
        EventSheetDecoder.testShape = new egret.Sprite();
        //存储触发条件，这样就不用每次都要用查找了,提升运行效率
        EventSheetDecoder.triggerConditions = [];
        EventSheetDecoder.instancesConditions = {};
        return EventSheetDecoder;
    }());
    ls.EventSheetDecoder = EventSheetDecoder;
    egret.registerClass(EventSheetDecoder,'ls.EventSheetDecoder');
})(ls || (ls = {}));
//# sourceMappingURL=EventSheetDecoder.js.map
var ls;
(function (ls) {
    ls.loopIndex = {};
    function assert(cnd, msg) {
        if (cnd) {
            var stack;
            try {
                throw Error();
            }
            catch (ex) {
                stack = ex.stack;
            }
            var msg = "【ERROR】:" + msg + "\n\nStack trace: \n" + stack;
            if (console.error)
                console.error(msg);
            if (isWeixinLogin()) {
                document.write(msg);
                alert(msg);
            }
        }
    }
    ls.assert = assert;
    /**注册对象给windows */
    function registerObject(name, instance) {
        window[name] = instance;
    }
    ls.registerObject = registerObject;
    function lakeshoreInst() {
        return window;
    }
    ls.lakeshoreInst = lakeshoreInst;
    function eval_e(exp) {
        try {
            return eval(exp); //EventSheetDecoder.expressionObject[encodeURIComponent(exp)];
        }
        catch (exception) {
            return exp;
        }
    }
    ls.eval_e = eval_e;
    /**获取循环索引 */
    function getloopIndex(key) {
        return ls.loopIndex[key];
    }
    ls.getloopIndex = getloopIndex;
    /**返回当前运行的fps */
    function fps() {
        return 1 / dt();
    }
    ls.fps = fps;
    /**返回当前运行时每帧的运行时间间隔（单位：ms） */
    function dt() {
        return ls.AISystem.instance.dt1;
    }
    ls.dt = dt;
    /**返回当前场景对象数量 */
    function objectcount() {
        return ls.World.getInstance().objectList.length;
    }
    ls.objectcount = objectcount;
    /**获取当前真实运行时间间隔与理论时间间隔的比例（获取在帧运行的过程中因帧频不稳定而带来的运动错误）*/
    function timeScale() {
        return 1;
    }
    ls.timeScale = timeScale;
    ls.oldtime = egret.getTimer();
    /**返回自游戏运行以来运行的时间（单位：毫秒）*/
    function time() {
        return egret.getTimer() - ls.oldtime;
    }
    ls.time = time;
    /** 添加日志输出口 */
    function log(args) {
        args = args + "";
        args = args.split(",");
        for (var i = 0; i < args.length; i++) {
            var logStr = eval_e(args[i]);
            ls.Log.log(logStr);
        }
    }
    ls.log = log;
    /**当前运行环境是否是pc */
    function isPc() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    ls.isPc = isPc;
    /**注入属性 */
    function injectProp(target, data, ignroeMethod) {
        if (data === void 0) { data = null; }
        if (ignroeMethod === void 0) { ignroeMethod = true; }
        if (!data)
            return false;
        var result = true;
        for (var key in data) {
            var value = data[key];
            if (!ignroeMethod || typeof value != 'function') {
                target[key] = value;
            }
        }
        return result;
    }
    ls.injectProp = injectProp;
    /**获取毫秒 */
    function getMiniSeconds(str) {
        var reg = /-/g;
        var date = new Date(Date.parse(str.replace(reg, "/")));
        return date.getTime();
    }
    ls.getMiniSeconds = getMiniSeconds;
    /**
     * 获取倒计时字符串
     */
    function getRemainTimeStr(str, splitStr, showZero) {
        if (splitStr === void 0) { splitStr = ":"; }
        if (showZero === void 0) { showZero = true; }
        var oldTime = this.getMiniSeconds(str);
        var curTime = new Date().getTime();
        var remainMinSecond = oldTime - curTime;
        if (remainMinSecond >= 0) {
            var remainSecond = Math.round(remainMinSecond / 1000);
            var hour = Math.floor(remainSecond / 3600);
            var minute = Math.floor((remainSecond - hour * 3600) / 60);
            var second = remainSecond - hour * 3600 - minute * 60;
            var hourStr = (hour < 10) ? "0" + hour : hour.toString();
            var minuteStr = (minute < 10) ? "0" + minute : minute.toString();
            var secondStr = (second < 10) ? "0" + second : second.toString();
            return hourStr + splitStr + minuteStr + splitStr + secondStr;
        }
        if (showZero)
            return "00" + splitStr + "00" + splitStr + "00";
        return "";
    }
    ls.getRemainTimeStr = getRemainTimeStr;
    ls.internalData = [];
    ls.cacheInternal = {};
    ls.cachePlugins = {};
    /**
     * 判断当前实例是否在场景上
     * TODO
     */
    function isInternal(name) {
        if (ls.cacheInternal[name] == undefined) {
            var status = false;
            if (ls.internalData) {
                for (var i = 0; i < ls.internalData.length; i++) {
                    var item = ls.internalData[i];
                    if (item.name == name) {
                        status = true;
                        break;
                    }
                }
            }
            ls.cacheInternal[name] = status;
        }
        return ls.cacheInternal[name];
    }
    ls.isInternal = isInternal;
    function getPlugin(name) {
        if (ls.cachePlugins[name] == undefined) {
            var plugin = "";
            if (ls.internalData) {
                for (var i = 0; i < ls.internalData.length; i++) {
                    var item = ls.internalData[i];
                    if (item.name == name) {
                        plugin = item.plugin;
                        break;
                    }
                }
            }
            ls.cachePlugins[name] = plugin;
        }
        return ls.cachePlugins[name];
    }
    ls.getPlugin = getPlugin;
    function isSingleInst(name) {
        return isInternal(name);
    }
    ls.isSingleInst = isSingleInst;
    ls.singles = {};
    function getInstanceByInstanceName(name) {
        var instance;
        var instanceClass;
        if (isSingleInst(name)) {
            if (ls.singles[name] == null) {
                instanceClass = egret.getDefinitionByName("ls." + getPlugin(name));
                if (instanceClass == null) {
                    alert("name:" + name);
                    return;
                }
                instanceClass.name = name;
                if (instanceClass.instance == null)
                    instance = new instanceClass();
                else
                    instance = instanceClass.instance;
                ls.singles[name] = instance;
                registerObject(name, instance);
            }
            else {
                instance = ls.singles[name];
            }
            if (isInternal(name)) {
                window[name] = instance;
            }
        }
        return instance;
    }
    ls.getInstanceByInstanceName = getInstanceByInstanceName;
    /**根据类名获取实例 */
    function getInstanceByPluginClassName(name, isCreate) {
        if (isCreate === void 0) { isCreate = false; }
        var instance;
        var instanceClass;
        if (name == "Object")
            return null;
        if (isSingleInst(name)) {
            if (ls.singles[name] == null) {
                instanceClass = egret.getDefinitionByName("ls." + getPlugin(name));
                if (instanceClass == null) {
                    if (!isCreate) {
                        alert("name:" + name);
                    }
                    return;
                }
                instanceClass.name = name;
                if (name == "System")
                    instance = instanceClass.instance;
                else
                    instance = new instanceClass();
                instance.name = name;
                ls.singles[name] = instance;
                registerObject(name, instance);
            }
            else {
                instance = ls.singles[name];
            }
        }
        else {
            instanceClass = egret.getDefinitionByName("ls." + name);
            if (instanceClass == null) {
                if (!isCreate) {
                    alert("name:" + name);
                }
                instance = null;
                return;
            }
            instance = new instanceClass();
        }
        if (isInternal(name)) {
            window[name] = instance;
        }
        return instance;
    }
    ls.getInstanceByPluginClassName = getInstanceByPluginClassName;
    /**
     * 根据地址获取纹理数据
     */
    function getTexture(url) {
        if (url) {
            var imageName = url; //this.getName(url);
            var texture;
            if (imageName) {
                var spriteSheetData = ls.LayoutDecoder.spriteSheetDatas[imageName];
                if (spriteSheetData) {
                    texture = spriteSheetData.texture;
                }
                if (texture == undefined || texture == null) {
                    texture = RES.getRes(imageName);
                }
                if (texture != undefined && texture != null)
                    return [texture, spriteSheetData ? spriteSheetData.offsetX : 0, spriteSheetData ? spriteSheetData.offsetY : 0];
            }
        }
        return null;
    }
    ls.getTexture = getTexture;
    /**
     * 根据地址获取名字
     */
    function getName(url) {
        if (url)
            return url.substring(url.lastIndexOf("\/") + 1, url.lastIndexOf("\."));
        return "";
    }
    ls.getName = getName;
    //TODO
    function getTransformationStr(str) {
        return str;
    }
    ls.getTransformationStr = getTransformationStr;
    function xmlToJson(xml) {
        var obj = {};
        if (xml.nodeType == 1) {
            for (var key in xml.attributes) {
                obj[key] = xml.attributes[key];
            }
        }
        else if (xml.nodeType == 3) {
            obj = xml.name;
        }
        if (xml.children) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children[i];
                var nodeName = item.localName;
                if (obj[nodeName] == undefined) {
                    obj[nodeName] = this.xmlToJson(item);
                }
                else {
                    if (obj[nodeName].length == undefined) {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    }
    ls.xmlToJson = xmlToJson;
    function round6dp(x) {
        return Math.round(x * 1000000) / 1000000;
    }
    ls.round6dp = round6dp;
    function is_undefined(x) {
        return typeof x === "undefined";
    }
    ls.is_undefined = is_undefined;
    function is_number(x) {
        return typeof x === "number";
    }
    ls.is_number = is_number;
    function is_string(x) {
        return typeof x === "string";
    }
    ls.is_string = is_string;
    /////////////////////////////Math////////////////////////////////
    /**返回数value的绝对值 */
    function abs(value) {
        value = eval_e(value);
        return Math.abs(value);
    }
    ls.abs = abs;
    /**返回数value的反余弦值 */
    function acos(value) {
        value = eval_e(value);
        return Math.acos(value);
    }
    ls.acos = acos;
    function angle(x1, y1, x2, y2) {
        x1 = eval_e(x1);
        y1 = eval_e(y1);
        x2 = eval_e(x2);
        y2 = eval_e(y2);
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }
    ls.angle = angle;
    /**返回数value的反正弦值 */
    function asin(value) {
        value = eval_e(value);
        return Math.asin(value);
    }
    ls.asin = asin;
    /**以介于 -PI/2 与 PI/2 弧度之间的数值value来返回 x 的反正切值 */
    function atan(value) {
        value = eval_e(value);
        return Math.atan(value);
    }
    ls.atan = atan;
    /**返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间） */
    function atan2(y, x) {
        y = eval_e(y);
        x = eval_e(x);
        return Math.atan2(y, x);
    }
    ls.atan2 = atan2;
    /**对数value进行向上取整 */
    function ceil(value) {
        value = eval_e(value);
        return Math.ceil(value);
    }
    ls.ceil = ceil;
    /**对数value进行向下取整 */
    function floor(value) {
        value = eval_e(value);
        return Math.floor(value);
    }
    ls.floor = floor;
    /**返回角value的正弦 */
    function sin(value) {
        value = eval_e(value);
        return Math.sin(value);
    }
    ls.sin = sin;
    /**返回角value的余弦 */
    function cos(value) {
        value = eval_e(value);
        return Math.cos(value);
    }
    ls.cos = cos;
    /**返回数value的平方根 */
    function sqrt(value) {
        value = eval_e(value);
        return Math.sqrt(value);
    }
    ls.sqrt = sqrt;
    /**返回角value的正切 */
    function tan(value) {
        value = eval_e(value);
        return Math.tan(value);
    }
    ls.tan = tan;
    function cosp(a, b, x) {
        a = eval_e(a);
        b = eval_e(b);
        x = eval_e(x);
        return (a + b + (a - b) * Math.cos(x * Math.PI)) / 2;
    }
    ls.cosp = cosp;
    /**
     * 计算点(x1,y1)与点(x2,y2)之间的距离
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    function distance(x1, y1, x2, y2) {
        x1 = eval_e(x1);
        y1 = eval_e(y1);
        x2 = eval_e(x2);
        y2 = eval_e(y2);
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
    ls.distance = distance;
    /**
     * e的value次方
     */
    function exp(value) {
        value = eval_e(value);
        return Math.exp(value);
    }
    ls.exp = exp;
    /**
     * 返回x的y次幂
     */
    function pow(x, y) {
        x = eval_e(x);
        y = eval_e(y);
        return Math.pow(x, y);
    }
    ls.pow = pow;
    function getbit(num, bit) {
        num = eval_e(num);
        bit = eval_e(bit);
        num = num | 0;
        bit = bit | 0;
        return (num & (1 << bit)) ? 1 : 0;
    }
    ls.getbit = getbit;
    /**插值 */
    function lerp(a, b, x) {
        a = eval_e(a);
        b = eval_e(b);
        x = eval_e(x);
        return a + (b - a) * x;
    }
    ls.lerp = lerp;
    function unlerp(a, b, c) {
        a = eval_e(a);
        b = eval_e(b);
        c = eval_e(c);
        if (a == b)
            return 0;
        return (c - a) / (b - a);
    }
    ls.unlerp = unlerp;
    function log10(value) {
        value = eval_e(value);
        return Math.log(value) / Math.LN10;
    }
    ls.log10 = log10;
    /**返回value1与值value2中的最高值 */
    function max(value1, value2) {
        value1 = eval_e(value1);
        value2 = eval_e(value2);
        return Math.max(value1, value2);
    }
    ls.max = max;
    /**返回value1与值value2中的最低值 */
    function min(value1, value2) {
        value1 = eval_e(value1);
        value2 = eval_e(value2);
        return Math.min(value1, value2);
    }
    ls.min = min;
    /**返回圆周率（约等于3.14159） */
    function pi() {
        return Math.PI;
    }
    ls.pi = pi;
    function qarp(a, b, c, x) {
        a = eval_e(a);
        b = eval_e(b);
        c = eval_e(c);
        x = eval_e(x);
        return lerp(lerp(a, b, x), lerp(b, c, x), x);
    }
    ls.qarp = qarp;
    /**将数字value进行四舍五入运算 */
    function round(value) {
        value = eval_e(value);
        return Math.round(value);
    }
    ls.round = round;
    /**获取0~1之间的任意数 */
    function random() {
        return Math.random();
    }
    ls.random = random;
    function togglebit(value, bit) {
        value = eval_e(value);
        bit = eval_e(bit);
        value = value | 0;
        bit = bit | 0;
        return value ^ (1 << bit);
    }
    ls.togglebit = togglebit;
    /**将值value转换成浮点型 */
    function float(value) {
        value = eval_e(value);
        return +value;
    }
    ls.float = float;
    /**将值value转换成整型 */
    function int(value) {
        value = eval_e(value);
        return parseInt(value);
    }
    ls.int = int;
    /**将红绿蓝值转化为rgb值 */
    function rgb(red, green, blue) {
        red = eval_e(red);
        green = eval_e(green);
        blue = eval_e(blue);
        return Math.max(Math.min(red, 255), 0) | (Math.max(Math.min(green, 255), 0) << 8) | (Math.max(Math.min(blue, 255), 0) << 16);
    }
    ls.rgb = rgb;
    /**根据rgb值获取红色值 */
    function getRed(rgb) {
        rgb = eval_e(rgb);
        return rgb & 0xFF;
    }
    ls.getRed = getRed;
    /**根据rgb值获取绿色值 */
    function getGreen(rgb) {
        rgb = eval_e(rgb);
        return (rgb & 0xFF00) >> 8;
    }
    ls.getGreen = getGreen;
    /**根据rgb值获取蓝色值 */
    function getBlue(rgb) {
        rgb = eval_e(rgb);
        return (rgb & 0xFF0000) >> 16;
    }
    ls.getBlue = getBlue;
    /////////////////////////////Math////////////////////////////////
    function regexp_escape(text) {
        text = eval_e(text);
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    ls.regexp_escape = regexp_escape;
    function find(text, searchstr) {
        text = eval_e(text);
        searchstr = eval_e(searchstr);
        return text.search(new RegExp(regexp_escape(searchstr), "i"));
    }
    ls.find = find;
    function replace(text, find, replace_) {
        text = eval_e(text);
        find = eval_e(find);
        replace_ = eval_e(replace_);
        return text.replace(new RegExp(regexp_escape(find), "gi"), replace_);
    }
    ls.replace = replace;
    function left(text, count) {
        text = eval_e(text);
        count = eval_e(count);
        return text.substr(text, count);
    }
    ls.left = left;
    function right(text, count) {
        text = eval_e(text);
        return text.substr(text.length - count);
    }
    ls.right = right;
    function len(value) {
        if (value == undefined || value == null)
            return 0;
        value = eval_e(value);
        value = value + "";
        return value.length;
    }
    ls.len = len;
    function toFixed(text, fractionDigts) {
        text = eval_e(text);
        fractionDigts = eval_e(fractionDigts);
        return parseFloat(parseFloat(text).toFixed(fractionDigts));
    }
    ls.toFixed = toFixed;
    function lowercase(text) {
        text = eval_e(text);
        return text.toLowerCase();
    }
    ls.lowercase = lowercase;
    function upppercase(text) {
        text = eval_e(text);
        return text.toUpperCase();
    }
    ls.upppercase = upppercase;
    function trim(text) {
        text = eval_e(text);
        return text.trim();
    }
    ls.trim = trim;
    function mid(text, index, length) {
        text = eval_e(text);
        index = eval_e(index);
        length = eval_e(length);
        return text.substr(index, length);
    }
    ls.mid = mid;
    function newline() {
        return "\n";
    }
    ls.newline = newline;
    function zeropad(num, digits) {
        num = eval_e(num);
        digits = eval_e(digits);
        var s = (num < 0) ? "-" : "";
        if (num < 0)
            num = -num;
        var zeroes = digits - (num.toString()).length;
        for (var i = 0; i < zeroes; i++) {
            s += "0";
        }
        return s + num.toString();
    }
    ls.zeropad = zeropad;
    function choose() {
        var index = Math.floor(Math.random() * (arguments.length - 1));
        return arguments[index + 1];
    }
    ls.choose = choose;
    function getTime() {
        return new Date().getTime();
    }
    ls.getTime = getTime;
    function week() {
        return new Date().getDay();
    }
    ls.week = week;
    function year() {
        return new Date().getFullYear();
    }
    ls.year = year;
    function month() {
        return new Date().getMonth();
    }
    ls.month = month;
    function day() {
        return new Date().getDate();
    }
    ls.day = day;
    function hours() {
        return new Date().getHours();
    }
    ls.hours = hours;
    function minutes() {
        return new Date().getMinutes();
    }
    ls.minutes = minutes;
    function seconds() {
        return new Date().getSeconds();
    }
    ls.seconds = seconds;
    function minuteSeconds() {
        return new Date().getMilliseconds();
    }
    ls.minuteSeconds = minuteSeconds;
    function clamp(x, l, u) {
        x = eval_e(x);
        l = eval_e(l);
        u = eval_e(u);
        if (x < l)
            return l;
        else if (x > u)
            return u;
        else
            return x;
    }
    ls.clamp = clamp;
    function isWeixinLogin() {
        var ua = window.navigator.userAgent.toLowerCase();
        var metchStr = ua.match(/MicroMessenger/i);
        return (metchStr && metchStr.length > 0 && metchStr[0] == 'micromessenger');
    }
    ls.isWeixinLogin = isWeixinLogin;
    var OperationType = (function () {
        function OperationType() {
        }
        var d = __define,c=OperationType,p=c.prototype;
        OperationType.EQUAL_TO = "equalTo";
        OperationType.NOT_EQUAL_TO = "notEqualTo";
        OperationType.LESS_THAN = "lessThan";
        OperationType.LESS_OR_EQUAL = "lessOrEqual";
        OperationType.GREATER_THAN = "greaterThan";
        OperationType.GREATER_OR_EQUAL = "greaterOrEqual";
        return OperationType;
    }());
    ls.OperationType = OperationType;
    egret.registerClass(OperationType,'ls.OperationType');
    var InstanceVariablesType = (function () {
        function InstanceVariablesType() {
        }
        var d = __define,c=InstanceVariablesType,p=c.prototype;
        InstanceVariablesType.TEXT = "text";
        InstanceVariablesType.INT = "int";
        InstanceVariablesType.NUMBER = "Number";
        InstanceVariablesType.BOOLEAN = "boolean";
        return InstanceVariablesType;
    }());
    ls.InstanceVariablesType = InstanceVariablesType;
    egret.registerClass(InstanceVariablesType,'ls.InstanceVariablesType');
    /**
     * 比较运算符（值都被转换了）
     */
    function compare(curValue, operand, comValue) {
        var curV = eval_e(curValue);
        var comV = eval_e(comValue);
        switch (operand) {
            case OperationType.EQUAL_TO: return curV == comV;
            case OperationType.GREATER_OR_EQUAL: return curV >= comV;
            case OperationType.GREATER_THAN: return curV > comV;
            case OperationType.LESS_OR_EQUAL: return curV <= comV;
            case OperationType.LESS_THAN: return curV < comV;
            case OperationType.NOT_EQUAL_TO: return curV != comV;
        }
        return false;
    }
    ls.compare = compare;
})(ls || (ls = {}));
//# sourceMappingURL=Global.js.map
var ls;
(function (ls) {
    var LayerManager = (function () {
        function LayerManager() {
        }
        var d = __define,c=LayerManager,p=c.prototype;
        LayerManager.getLayerByIndex = function (target, index) {
            var layer = this.layers[index];
            if (layer == null) {
                layer = new egret.Sprite();
                layer["layerIndex"] = index;
                this.layers.push(layer);
                //排序
                this.layers.sort(function (x, y) {
                    if (x.layerIndex > y.layerIndex)
                        return 1;
                    else if (x.layerIndex < y.layerIndex)
                        return -1;
                    else
                        return 0;
                });
                //背景颜色
                var layerVo = ls.LayoutDecoder.layers[index];
                layer.scaleX = layerVo.layerScaleX / 100;
                layer.scaleY = layerVo.layerScaleY / 100;
                layer.alpha = layerVo.layerAlpha;
                layer.visible = layerVo.layerVisible;
                for (var i = 0, layerlen = this.layers.length; i < layerlen; i++) {
                    layer = this.layers[i];
                    ls.GameUILayer.renderContainer.addChild(layer);
                }
            }
            return layer;
        };
        LayerManager.getIndexByLayer = function ($layer) {
            if ($layer)
                return this.layers.indexOf($layer);
            return -1;
        };
        LayerManager.getLayer = function ($index) {
            for (var i = 0; i < this.layers.length; i++) {
                var s = this.layers[i];
                if (s["layerIndex"] == $index) {
                    return s;
                }
            }
            return null;
        };
        LayerManager.layers = [];
        return LayerManager;
    }());
    ls.LayerManager = LayerManager;
    egret.registerClass(LayerManager,'ls.LayerManager');
})(ls || (ls = {}));
//# sourceMappingURL=Layer.js.map
var ls;
(function (ls) {
    var LayerVo = (function () {
        function LayerVo() {
        }
        var d = __define,c=LayerVo,p=c.prototype;
        return LayerVo;
    }());
    ls.LayerVo = LayerVo;
    egret.registerClass(LayerVo,'ls.LayerVo');
})(ls || (ls = {}));
//# sourceMappingURL=LayerVo.js.map
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
var ls;
(function (ls) {
    var Layout = (function () {
        function Layout() {
        }
        var d = __define,c=Layout,p=c.prototype;
        return Layout;
    }());
    ls.Layout = Layout;
    egret.registerClass(Layout,'ls.Layout');
    var LayoutDecoder = (function () {
        function LayoutDecoder() {
        }
        var d = __define,c=LayoutDecoder,p=c.prototype;
        LayoutDecoder.getTexture = function (name) {
            for (var resName in this.spriteSheets) {
                var spriteSheet = this.spriteSheets[resName];
                var texture = spriteSheet.getTexture(name);
                if (texture != undefined) {
                    return texture;
                }
            }
            return null;
        };
        LayoutDecoder.saveLayout = function (layoutName) {
            var layout = ls.Config.sceneInfo.layoutData;
            var layoutVo = new Layout();
            layoutVo.layoutName = layoutName;
            layoutVo.nextLayoutName = layout["$next"];
            layoutVo.prevLayoutName = layout["$previous"];
            layoutVo.eventSheetName = layout["$eventSheet"];
            var version = layout["$version"];
            layoutVo.version = version ? version : "1.1.1";
            this.layouts[layoutName] = layoutVo;
        };
        LayoutDecoder.start = function (layoutName) {
            ls.assert(layoutName == null || layoutName == "", "layout canot null!");
            var layout = ls.Config.sceneInfo.layoutData;
            ls.assert(layout == null, "can not find" + layoutName);
            var sceneSize = layout["$sceneSize"].split(",");
            this.sceneWidth = +(sceneSize[0]);
            this.sceneHeight = +(sceneSize[1]);
            this.currentLayoutName = layoutName;
            this.saveLayout(layoutName);
            var layoutDataList = layout.children;
            if (layoutDataList) {
                //初始化场景实例
                var sorts = [];
                for (var i = 0, itemlen = layoutDataList.length; i < itemlen; i++) {
                    var data = layoutDataList[i];
                    if (data.localName != "layer") {
                        var instance = this.decodeInstance(data);
                        if (instance && instance["index"] !== undefined) {
                            instance.index = data["$index"] ? (+data["$index"]) : i;
                            sorts.push(instance);
                        }
                    }
                    else {
                        if (this.layers[+data["$index"]] == null) {
                            var layerVo = this.decodeLayers(data);
                            this.layers[layerVo.index] = layerVo;
                        }
                    }
                }
                sorts = sorts.concat(LayoutDecoder.globalInstances);
                sorts.sort(function (a, b) {
                    if (a.index > b.index)
                        return 1;
                    else if (a.index < b.index)
                        return -1;
                    else
                        return 0;
                });
                for (var i = 0; i < sorts.length; i++) {
                    var instance = sorts[i];
                    ls.World.getInstance().addChild(instance);
                }
            }
            //为了在事件表中可以直接引用，必须先实体化非场景实例
            if (ls.internalData) {
                for (var i = 0; i < ls.internalData.length; i++) {
                    var _name = ls.internalData[i].name;
                    ls.getInstanceByPluginClassName(_name, true);
                }
            }
            //注册模板实例，这样，就可以根据实例名来引用实例了
            for (var uid in this.curSceneInstances) {
                ls.registerObject(this.curSceneInstances[uid].name, this.curSceneInstances[uid]);
            }
        };
        LayoutDecoder.decodeInstances = function (datas) {
            var instances = [];
            if (datas) {
                var children = datas.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var item = children[i];
                        if (item.localName == "layer") {
                            if (this.layers[+item["$index"]] == null) {
                                var layerVo = this.decodeLayers(item);
                                this.layers[layerVo.index] = layerVo;
                            }
                        }
                        else {
                            var instance = this.decodeInstance(item);
                            if (instance && instance["index"] !== undefined)
                                instance.index = +item["$index"];
                            if (instance)
                                instances.push(instance);
                        }
                    }
                }
            }
            return instances;
        };
        //解析图层数据        
        LayoutDecoder.decodeLayers = function (data) {
            var layerVo = new ls.LayerVo();
            layerVo.index = +data["$index"];
            layerVo.parallaxX = +data["$parallaxX"];
            layerVo.parallaxY = +data["$parallaxY"];
            layerVo.layerAlpha = +data["$layerAlpha"];
            layerVo.layerVisible = data["$index"] != "false";
            layerVo.layerScaleX = +data["$layerScaleX"];
            layerVo.layerScaleY = +data["$layerScaleY"];
            return layerVo;
        };
        //解析实例列表
        LayoutDecoder.decodeInstance = function (data) {
            if (data.localName == "spritesheets")
                return;
            var UID = +data["$UID"];
            var plugin = data["$plugin"];
            var instanceName = data["$name"];
            var isVisual = data["$isVisual"] == "true";
            //为了兼容性，这里过滤掉单例
            if (ls.isInternal(instanceName))
                return null;
            //判断当前是否存在这个实例
            var instance = this.curSceneInstances[UID];
            if (instance == undefined) {
                instance = ls.getInstanceByPluginClassName(plugin);
            }
            else {
                return instance;
            }
            instance.isModel = true;
            instance.name = instanceName;
            instance.id = UID;
            instance.parallaxX = +data["$parallaxX"];
            instance.parallaxY = +data["$parallaxY"];
            if (data.children == null)
                return;
            if (this.instanceNames[instanceName] == null)
                this.instanceNames[instanceName] = instanceName;
            var isHasLayer = false;
            //临时存储属性列表
            var properties = {};
            //解析属性
            var behaviorPropertyItem;
            for (var j = 0, propertylen = data.children.length; j < propertylen; j++) {
                var propertyItem = data.children[j];
                var propertyName = propertyItem["$name"];
                var propertyValue = propertyItem["$value"];
                var propertyValueType = propertyItem["$valueDataType"];
                switch (propertyName) {
                    case "layer":
                        isHasLayer = true;
                        instance[propertyName] = +propertyValue;
                        break;
                    case "actions":
                        instance["setData"](propertyItem.children);
                        break;
                    case "behaviors":
                        behaviorPropertyItem = propertyItem;
                        break;
                    default:
                        switch (propertyValueType) {
                            case "number":
                                properties[propertyName] = +propertyValue;
                                break;
                            case "string":
                                properties[propertyName] = decodeURIComponent(propertyValue);
                                //解析碰撞数据
                                if (propertyName == "collisionData") {
                                    instance.collisionVectorData = this.decodeCollision(instance, properties[propertyName]);
                                    instance["collisionSourceData"] = decodeURIComponent(propertyItem["$sourceValue"]);
                                    instance.collisionSourceVectorData = this.decodeCollision(instance, instance["collisionSourceData"]);
                                }
                                break;
                            case "boolean":
                                properties[propertyName] = (propertyValue == "true");
                                break;
                            case "any":
                                properties[propertyName] = ls.eval_e(decodeURIComponent(propertyValue));
                                break;
                        }
                        break;
                }
            }
            if (properties.hasOwnProperty("width"))
                instance["width"] = properties["width"];
            if (properties.hasOwnProperty("height"))
                instance["height"] = properties["height"];
            for (var prop in properties) {
                instance[prop] = properties[prop];
            }
            if (behaviorPropertyItem) {
            }
            //这里假定不设置layer属性，那么，这里默认设置其图层为1
            if (!isHasLayer)
                instance["layer"] = 0;
            //所有的扩展组件进行初始化
            if (instance)
                instance.initialize();
            if (this.curSceneInstances[UID] == null)
                this.curSceneInstances[UID] = instance;
            return instance;
        };
        //解析碰撞数据
        LayoutDecoder.decodeCollision = function (inst, data) {
            var bindData;
            if (inst && data) {
                if (data == "")
                    inst.collisionType - 1;
                else {
                    var spData = data.split('/n');
                    if (spData.length == 2) {
                        inst.collisionType = +spData[0];
                        switch (inst.collisionType) {
                            case 0:
                                //先分隔下划线
                                //检测是否存在下划线
                                bindData = [];
                                var isExistUnderline = spData[1].indexOf("_");
                                if (isExistUnderline != -1) {
                                    var underlineSplit = spData[1].split('_');
                                    for (var i = 0; i < underlineSplit.length; i++) {
                                        var undrelineItem = underlineSplit[i];
                                        var vdSplit = undrelineItem.split(',');
                                        var polyData = [];
                                        for (var j = 0; j < vdSplit.length; j++) {
                                            var pointSplit = vdSplit[j].split('|');
                                            var v = new ls.Vector2D(+pointSplit[0], +pointSplit[1]);
                                            polyData[j] = v;
                                        }
                                        bindData[i] = polyData;
                                    }
                                }
                                else {
                                    var vdSplit = spData[1].split(',');
                                    var polyData = [];
                                    for (var i = 0; i < vdSplit.length; i++) {
                                        var pointSplit = vdSplit[i].split('|');
                                        var v = new ls.Vector2D(+pointSplit[0], +pointSplit[1]);
                                        polyData[i] = v;
                                    }
                                    bindData[0] = polyData;
                                }
                                break;
                            case 1:
                                var circleData = spData[1].split("|"); //x,y,r;
                                var circle = new ls.Circle();
                                circle.center = new ls.Vector2D(+circleData[0], +circleData[1]);
                                circle.radius = +circleData[2];
                                bindData = circle;
                                break;
                            case 2:
                                var dotData = spData[1].split("|"); //x，y;
                                bindData = new ls.Vector2D(+dotData[0], +dotData[1]);
                                break;
                        }
                    }
                }
            }
            return bindData;
        };
        //解析行为列表
        LayoutDecoder.decodeBehaviors = function (instance, datas) {
            if (instance && datas) {
                // if (!instance.global)
                //     return;
                var children = datas.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var data = children[i];
                        //注意完全限定类名中都要加Behavior扩展关键字以便好识别
                        var _behaivorType = data["$behaviorType"];
                        var _behaivor = ls.getInstanceByPluginClassName(_behaivorType);
                        _behaivor.name = data["$name"];
                        //行为数据
                        var _behaivorDatas = data.children;
                        if (_behaivorDatas) {
                            var _behaivorDatalen = _behaivorDatas.length;
                            for (var k = 0; k < _behaivorDatalen; k++) {
                                var _propertyItem = _behaivorDatas[k];
                                var _propertyName = _propertyItem["$name"];
                                var _propertyValue = decodeURIComponent(_propertyItem["$value"]);
                                var _propertyValueType = _propertyItem["$valueDataType"];
                                switch (_propertyValueType) {
                                    case "number":
                                        _behaivor[_propertyName] = +_propertyValue;
                                        break;
                                    case "string":
                                        _behaivor[_propertyName] = _propertyValue + "";
                                        break;
                                    case "any":
                                        _behaivor[_propertyName] = _propertyValue;
                                        break;
                                    case "boolean":
                                        _behaivor[_propertyName] = Boolean(ls.eval_e(_propertyValue));
                                        break;
                                }
                            }
                        }
                        if (instance instanceof ls.AIDisplayObject)
                            instance.addBehavior(_behaivor);
                        else
                            ls.assert(true, instance + "must instance of AIDisplayObject for have Behaviors");
                        //添加行为列表
                        _behaivor.onCreate();
                        _behaivor.isCreated = true;
                    }
                }
            }
        };
        /**
         * 销毁实例
         */
        LayoutDecoder.destory = function () {
            //this.curSceneInstances      = {};
            //非全局变量都删除
            for (var UID in this.curSceneInstances) {
                var instance = this.curSceneInstances[UID];
                if (!instance.global) {
                    if (instance instanceof ls.AIDisplayObject)
                        instance.removeAllBehaviors();
                    delete this.curSceneInstances[UID];
                }
            }
            this.instanceNames = {};
            this.layers = {};
        };
        LayoutDecoder.curSceneInstances = {};
        LayoutDecoder.instanceNames = {}; //根据名字存储对象
        LayoutDecoder.layouts = {};
        LayoutDecoder.spriteSheets = {};
        LayoutDecoder.spriteSheetDatas = {};
        LayoutDecoder.globalInstances = []; //全局实例
        LayoutDecoder.layers = {}; //图层数据
        return LayoutDecoder;
    }());
    ls.LayoutDecoder = LayoutDecoder;
    egret.registerClass(LayoutDecoder,'ls.LayoutDecoder');
})(ls || (ls = {}));
//# sourceMappingURL=LayoutDecoder.js.map
var ls;
(function (ls) {
    var Log = (function () {
        function Log() {
        }
        var d = __define,c=Log,p=c.prototype;
        Log.log = function (message) {
            if (!ls.Config.openLog)
                return;
            if (this.logText == null) {
                var testContainer = ls.GameUILayer.testContainer;
                testContainer.graphics.clear();
                testContainer.graphics.beginFill(0, 0.8);
                testContainer.graphics.drawRect(0, 0, 250, 250);
                testContainer.graphics.endFill();
                this.logText = new egret.TextField();
                this.logText.width = 250;
                this.logText.height = 250;
                this.logText.size = 14;
                this.logText.lineSpacing = 6;
                this.logText.fontFamily = "宋体";
                this.logText.textColor = 0x00c200;
                this.logText.x = 5;
                this.logText.y = 5;
                testContainer.addChild(this.logText);
            }
            if (this.logCache.length > 12) {
                this.logCache.shift();
            }
            message = (message == undefined) ? "" : message;
            this.logCache.push(message);
            var messages = "";
            for (var i = 0; i < this.logCache.length; i++) {
                messages += this.logCache[i] + "\n";
            }
            this.logText.text = messages;
            this.logText.scrollV = (this.logText.maxScrollV - 12 < 0) ? 0 : (this.logText.maxScrollV - 12);
        };
        Log.logCache = [];
        return Log;
    }());
    ls.Log = Log;
    egret.registerClass(Log,'ls.Log');
})(ls || (ls = {}));
//# sourceMappingURL=Log.js.map
var ls;
(function (ls) {
    var GameUILayer = (function (_super) {
        __extends(GameUILayer, _super);
        function GameUILayer() {
            _super.call(this);
        }
        var d = __define,c=GameUILayer,p=c.prototype;
        GameUILayer.init = function ($stage) {
            if ($stage) {
                this.stage = $stage;
                if (this.renderContainer == null) {
                    this.renderContainer = new egret.Sprite();
                    this.renderContainer.name = "renderContainer";
                    $stage.addChild(this.renderContainer);
                }
                if (this.debugContainer == null) {
                    this.debugContainer = new egret.Sprite();
                    this.debugContainer.name = "debugContainer";
                    $stage.addChild(this.debugContainer);
                }
                if (this.testContainer == null) {
                    this.testContainer = new egret.Sprite();
                    this.testContainer.name = "testContainer";
                    $stage.addChild(this.testContainer);
                }
                if (this.preContainer == null) {
                    this.preContainer = new egret.Sprite();
                    this.preContainer.name = "preContainer";
                    $stage.addChild(this.preContainer);
                }
                if (this.loadingContainer == null) {
                    this.loadingContainer = new egret.Sprite();
                    this.loadingContainer.name = "loadingContainer";
                    $stage.addChild(this.loadingContainer);
                }
                if (this.drawContainer == null) {
                    this.drawContainer = new egret.Sprite();
                    this.drawContainer.name = "drawContainer";
                    $stage.addChild(this.drawContainer);
                }
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTouchEvent, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageTouchEvent, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEvent, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchEvent, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onStageTouchEvent, this);
            }
        };
        GameUILayer.onStageTouchEvent = function (event) {
            this.touchX = event.stageX;
            this.touchY = event.stageY;
        };
        GameUILayer.touchX = 0;
        GameUILayer.touchY = 0;
        return GameUILayer;
    }(egret.DisplayObjectContainer));
    ls.GameUILayer = GameUILayer;
    egret.registerClass(GameUILayer,'ls.GameUILayer');
})(ls || (ls = {}));
//# sourceMappingURL=GameUILayer.js.map
var ls;
(function (ls) {
    var SceneCamera = (function () {
        function SceneCamera(scene) {
            this.oldSceneX = 0;
            this.oldSceneY = 0;
            this.newSceneX = 0;
            this.newSceneY = 0;
            this.updateCamera = false;
            this.scene = scene;
        }
        var d = __define,c=SceneCamera,p=c.prototype;
        p.resetCamera = function () {
            ls.GameUILayer.renderContainer.x = ls.GameUILayer.renderContainer.y = 0;
            this.oldSceneX = this.oldSceneY = 0;
            this.newSceneX = this.newSceneY = 0;
        };
        p.lookAtPoint = function (pos) {
            if (this.pos != pos) {
                this.pos = pos;
                this._scrollX = this.pos.x;
                this._scrollY = this.pos.y;
                this.updateCamera = true;
            }
        };
        p.lookAtX = function (x) {
            if (this._scrollX != x) {
                this.updateCamera = true;
                this._scrollX = x;
            }
        };
        p.lookAtY = function (y) {
            if (this._scrollY != y) {
                this.updateCamera = true;
                this._scrollY = y;
            }
        };
        p.lookAtChar = function (target) {
            this.lookAtTarget = target;
            if (this._scrollX != this.lookAtTarget.x || this._scrollY != this.lookAtTarget.y) {
                this.updateCamera = true;
                this._scrollX = this.lookAtTarget.x;
                this._scrollY = this.lookAtTarget.y;
            }
        };
        p.render = function () {
            if (!this.updateCamera)
                return;
            this.updateCamera = false;
            var sceneWidth = ls.LayoutDecoder.sceneWidth;
            var sceneHeight = ls.LayoutDecoder.sceneHeight;
            var stageWidth = ls.GameUILayer.stage.stageWidth;
            var stageHeight = ls.GameUILayer.stage.stageHeight;
            var objects = ls.World.getInstance().objectList;
            //新的坐标
            if (this._scrollX > stageWidth / 2 && this._scrollX < sceneWidth - stageWidth / 2) {
                this.newSceneX = stageWidth / 2 - this._scrollX;
            }
            else if (this._scrollX <= ls.GameUILayer.stage.stageWidth / 2)
                this.newSceneX = 0;
            else if (this._scrollX > sceneWidth - stageWidth / 2)
                this.newSceneX = stageWidth - sceneWidth;
            //垂直方向坐标更新
            if (this._scrollY > stageHeight / 2 && this._scrollY < sceneHeight - stageHeight / 2) {
                this.newSceneY = stageHeight / 2 - this._scrollY;
            }
            else if (this._scrollY <= stageHeight / 2)
                this.newSceneY = 0;
            else if (this._scrollY > sceneHeight - stageHeight / 2)
                this.newSceneY = stageHeight - sceneHeight;
            // var nums: number = GameUILayer.renderContainer.numChildren;
            // for (var i: number = 0; i < nums; i++){
            //     var childContainer: egret.Sprite = <egret.Sprite>GameUILayer.renderContainer.getChildAt(i);
            //     if (!isNaN(this.oldSceneX) && !isNaN(this.oldSceneY)) {
            //         //增量
            //         childContainer.x += -((this.newSceneX - this.oldSceneX) * (100 - childContainer["parallaxX"]) / 100);
            //         childContainer.y += -((this.newSceneY - this.oldSceneY) * (100 - childContainer["parallaxY"]) / 100);
            //     }
            // }
            for (var i = 0; i < objects.length; i++) {
                var instance = objects[i];
                if (!instance.isHasCamera) {
                    if (!isNaN(this.oldSceneX) && !isNaN(this.oldSceneY)) {
                        //增量
                        instance.x += -((this.newSceneX - this.oldSceneX) * (100 - instance.parallaxX) / 100);
                        instance.y += -((this.newSceneY - this.oldSceneY) * (100 - instance.parallaxY) / 100);
                    }
                }
            }
            this._oldSceneX_ = this.oldSceneX;
            this._oldSceneY_ = this.oldSceneY;
            this.oldSceneX = this.newSceneX;
            this.oldSceneY = this.newSceneY;
        };
        p.renderContainer = function () {
            var sceneContainer = ls.GameUILayer.renderContainer;
            if (!isNaN(this._oldSceneX_) && !isNaN(this._oldSceneY_)) {
                sceneContainer.x += (this.newSceneX - this._oldSceneX_);
                sceneContainer.y += (this.newSceneY - this._oldSceneY_);
            }
        };
        return SceneCamera;
    }());
    ls.SceneCamera = SceneCamera;
    egret.registerClass(SceneCamera,'ls.SceneCamera');
})(ls || (ls = {}));
//# sourceMappingURL=SceneCamera.js.map
var ls;
(function (ls) {
    var World = (function () {
        function World() {
            this._objectList = [];
            this._objectHash = {};
            this._updateCamera = true;
            this._childCaches = {};
            if (World._instance)
                throw new Error(this["constructor"] + "为单例！");
            World._instance = this;
            this._sceneCamera = new ls.SceneCamera(this);
        }
        var d = __define,c=World,p=c.prototype;
        World.getInstance = function () {
            if (this._instance == null)
                this._instance = new World();
            return this._instance;
        };
        d(p, "sceneCamera"
            ,function () {
                return this._sceneCamera;
            }
        );
        d(p, "objectList"
            /**获取世界中的AI对象列*/
            ,function () {
                return this._objectList;
            }
        );
        d(p, "objectHash"
            /**获取世界中的AI Hash结构列表*/
            ,function () {
                return this._objectHash;
            }
        );
        //锁定到目标
        p.scrollToTarget = function (inst) {
            this._sceneCamera.lookAtChar(inst);
        };
        p.scrollToXY = function (x, y) {
            this._sceneCamera.lookAtPoint(new egret.Point(x, y));
        };
        p.scrollToX = function (x) {
            this._sceneCamera.lookAtX(x);
        };
        p.scrollToY = function (y) {
            this._sceneCamera.lookAtY(y);
        };
        //这里移动的不是整个sceneContainer,而是遍历的对象
        p.render = function () {
            var stageWidth = ls.GameUILayer.stage.stageWidth;
            var stageHeight = ls.GameUILayer.stage.stageHeight;
            var sortChilds = [];
            for (var layer in this._childCaches) {
                var childData = this._childCaches[layer];
                sortChilds.push(childData);
            }
            sortChilds.sort(function (a, b) {
                if (a.layer > b.layer)
                    return 1;
                else if (a.layer < b.layer)
                    return -1;
                return 0;
            });
            for (var j = 0; j < sortChilds.length; j++) {
                var childData = sortChilds[j];
                var children = childData.instances;
                var layerContainer = childData.parent;
                //
                for (var i = 0; i < children.length; i++) {
                    var _child = children[i];
                    var gpos = new egret.Point(ls.GameUILayer.renderContainer.x + layerContainer.x + _child.x, ls.GameUILayer.renderContainer.y + layerContainer.y + _child.y);
                    var isOnScreen = ls.CollisionUtils.isCollsionWithRect(gpos.x - _child.anchorOffsetX, gpos.y - _child.anchorOffsetY, _child.width, _child.height, 0, 0, ls.GameUILayer.stage.stageWidth, ls.GameUILayer.stage.stageHeight);
                    var _container = _child.container;
                    if (isOnScreen) {
                        layerContainer.addChild(_container);
                    }
                    else {
                        if (_container.parent) {
                            _container.parent.removeChild(_container);
                        }
                    }
                }
            }
        };
        /**根据唯一id查找对象*/
        p.getChildByUID = function ($uid) {
            if ($uid === void 0) { $uid = 0; }
            for (var i = 0, len = this._objectList.length; i < len; i++) {
                var object = this._objectList[i];
                if (object.id == $uid)
                    return object;
            }
            return null;
        };
        /**根据名字查找AiObject对象列表，一般情况下，多个名称列表都是表示关联复制生成的，而不是直接创建生成的*/
        p.getChildByName = function ($name) {
            var findAiObjects = [];
            if ($name == null || $name == "")
                return findAiObjects;
            for (var i = 0, len = this._objectList.length; i < len; i++) {
                var object = this._objectList[i];
                if (object.name == $name)
                    findAiObjects.push(object);
            }
            return findAiObjects;
        };
        p.addChild = function ($child, $parent) {
            if ($parent === void 0) { $parent = null; }
            if ($child) {
                this._objectList.push($child);
                var container = $child["container"];
                var layer = $child.layer;
                //这里维护层级结构
                var layerContainer = ls.LayerManager.getLayerByIndex($child, layer);
                //添加到显示列表
                if (container && container.parent == null) {
                    if (this._childCaches[layer] == null) {
                        this._childCaches[layer] = { instances: [], parent: layerContainer, layer: layer };
                    }
                    this._childCaches[layer].instances.push($child);
                }
                layerContainer["parallaxX"] = $child.parallaxX;
                layerContainer["parallaxX"] = $child.parallaxY;
                $child["helpParent"] = layerContainer;
                //维护一份hash数组
                var name = $child.name;
                if (!this._objectHash.hasOwnProperty(name))
                    this._objectHash[name] = [];
                var __searchIndex = -1;
                for (var i = 0; i < this._objectHash[name].length; i++) {
                    var __inst = this._objectHash[name][i];
                    if (__inst.u_id == $child.u_id) {
                        __searchIndex = i;
                        break;
                    }
                }
                if (__searchIndex == -1)
                    this._objectHash[name].push($child);
                else
                    this._objectHash[name][__searchIndex] = $child;
                //触发注册
                ls.Trigger.register($child);
            }
        };
        p.removeChild = function ($child) {
            if ($child) {
                var _index = this.objectList.indexOf($child);
                if (_index != -1) {
                    this._objectList.splice(_index, 1);
                }
                var container = $child["container"];
                if (container && container.parent != null)
                    container.parent.removeChild(container);
                //删除对象hash
                if (this._objectHash.hasOwnProperty(name)) {
                    var list = this._objectHash[name];
                    var __searchIndex = -1;
                    for (var i = 0; i < list.length; i++) {
                        var __inst = list[i];
                        if (__inst.u_id == $child.u_id) {
                            __searchIndex = i;
                            break;
                        }
                    }
                    if (__searchIndex != -1)
                        list.splice(__searchIndex, 1);
                }
                var dio = $child;
                if (dio) {
                    if (this._childCaches[dio.layer]) {
                        var layerInstances = this._childCaches[dio.layer].instances;
                        if (layerInstances) {
                            var layerIndex = layerInstances.indexOf(dio);
                            if (layerIndex != -1) {
                                layerInstances.splice(layerIndex, 1);
                            }
                            if (layerInstances.length == 0)
                                delete this._childCaches[dio.layer];
                        }
                    }
                }
                ls.Trigger.removeTrigger($child);
            }
        };
        //移除所有的角色(全局实例只保存实例本身，不保存其事件表中的内容)
        p.removeAllChildrens = function () {
            ls.Trigger.removeAllTriggers();
            for (var name in this._objectHash) {
                var data = this._objectHash[name];
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        var instance = data[i];
                        if (!instance.global) {
                            instance.destoryOnChangeScene();
                            delete this._objectHash[name];
                        }
                    }
                }
            }
        };
        //destory all
        p.destory = function () {
            this._sceneCamera.lookAtPoint(new egret.Point(0, 0));
            if (World.onWorldDestory != null) {
                World.onWorldDestory();
            }
            ls.LayoutDecoder.destory();
            ls.EventSheetDecoder.destory();
            this._sceneCamera.resetCamera();
            this.removeAllChildrens();
        };
        World.renderFirst = true;
        return World;
    }());
    ls.World = World;
    egret.registerClass(World,'ls.World');
})(ls || (ls = {}));
//# sourceMappingURL=World.js.map
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
                "id": this.id,
                "uid": this.u_id,
                "name": this.name,
                "isModel": this.isModel,
                "isDead": this.isDead,
                "paramInstances": this.paramInstances,
                "timeScale": this.timeScale,
                "global": this.global,
                "variables": JSON.stringify(this.variables)
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.plugin = o["plugin"];
                this.id = o["id"];
                this._uid = o["uid"];
                this.name = o["name"];
                this.isModel = o["isModel"];
                this.isDead = o["isDead"];
                this.paramInstances = o["paramInstances"];
                this.timeScale = o["timeScale"];
                this.global = o["global"];
                this.variables = JSON.parse(o["variables"]);
                for (var key in this.variables)
                    this.addVariable(key, this.variables[key]);
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
var ls;
(function (ls) {
    var AIDisplayObject = (function (_super) {
        __extends(AIDisplayObject, _super);
        function AIDisplayObject() {
            _super.call(this);
            this._isAddToStage = false;
            this._collision = false;
            this._isCollisioning = false;
            //是否更新矩形边界框
            this._isupdatebounds = true;
            this._mirrored = 3;
            this._sourceWidth = 0;
            this._sourceHeight = 0;
            this._x = 0;
            this._y = 0;
            this._anchorX = 0;
            this._anchorY = 0;
            this._anchorOffsetX = 0;
            this._anchorOffsetY = 0;
            this._width = 1;
            this._height = 1;
            this._scaleX = 1.0;
            this._scaleY = 1.0;
            this._scale = 1.0;
            this._angle = 0;
            this._alpha = 1;
            this._visible = true;
            this.behaviors = [];
            this.layer = 0;
            this.vx = 0;
            this.vy = 0;
            //是否曾经在场景中，用于修复出屏幕行为bug
            this.isInScreenOnce = false;
            //是否有solid
            this.solidEnabeld = false;
            //是否有横轴跑酷行为
            this.platformEnabled = false;
            //是否有穿透属性
            this.jumpthruEnabled = false;
            //碰撞类型 -1 默认采用边界盒 0 多边形 1 圆点 2 点
            this.collisionType = -1;
            //碰撞区域是否为矩形
            this.collisionIsRect = true;
            this.scaleContainer = true;
            //是否更新渲染
            this.update = true;
            this.isOldCollision = false;
            //0 1 2 3 4 5
            this._scaleXChanged = false;
            this._scaleYChanged = false;
            this._container = new egret.Sprite();
            this._container["owner"] = this;
            this._container.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHanlder, this);
            this._container.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveToStageHanlder, this);
            this._container.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
            this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchEvent, this);
            this._container.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEvent, this);
            this._container.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchEvent, this);
            this._container.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEvent, this);
        }
        var d = __define,c=AIDisplayObject,p=c.prototype;
        p.onTouchEvent = function ($event) {
            this._isTouchDown = $event.touchDown;
            this._touchPointID = $event.touchPointID;
            this._touchX = $event.localX;
            this._touchY = $event.localY;
            this._touchStageX = $event.stageX;
            this._touchStageY = $event.stageY;
            switch ($event.type) {
                case egret.TouchEvent.TOUCH_TAP:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onButtonTap));
                    break;
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onButtonBegin));
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onButtonEnd));
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onButtonMove));
                    break;
                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onButtonReleaseOutside));
                    break;
            }
        };
        //实例创建时
        p.onCreate = function () {
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onCreated));
        };
        d(p, "layerIndex"
            ,function () {
                return ls.LayerManager.getIndexByLayer(this.container.parent);
            }
        );
        d(p, "enabled"
            ,function () {
                return this.container.touchEnabled;
            }
            ,function (value) {
                this.container.touchChildren = this.container.touchEnabled = value;
            }
        );
        d(p, "collision"
            ,function () {
                return this._collision;
            }
            ,function (value) {
                this._collision = value;
            }
        );
        d(p, "isCollsioning"
            ,function () {
                return this._isCollisioning;
            }
            ,function (value) {
                this._isCollisioning = value;
            }
        );
        d(p, "isOnScreen"
            //是否在屏幕内
            ,function () {
                var parentContainer = this.container.parent;
                if (parentContainer) {
                    var gpos = new egret.Point(parentContainer.x + this.x, parentContainer.y + this.y);
                    return ls.CollisionUtils.isCollsionWithRect(gpos.x - this.anchorOffsetX, gpos.y - this.anchorOffsetY, this.width, this.height, 0, 0, ls.GameUILayer.stage.stageWidth, ls.GameUILayer.stage.stageHeight);
                }
                return false;
            }
        );
        p.getBounds = function () {
            if (this._isupdatebounds || !this._cachebounds) {
                var parentContainer = this.container.parent;
                if (!parentContainer)
                    this._cachebounds = new egret.Rectangle(this.x - this.anchorOffsetX, this.y - this.anchorOffsetY, this.width, this.height);
                else
                    this._cachebounds = new egret.Rectangle(parentContainer.x + this.x - this.anchorOffsetX, parentContainer.y + this.y - this.anchorOffsetY, this.width, this.height);
            }
            return this._cachebounds;
        };
        p.getGlobalBounds = function () {
            //强制刷新渲染
            this.renderUpdate();
            if (this._isupdatebounds || !this._cacheglobalbounds)
                this._cacheglobalbounds = this.container.getTransformedBounds(ls.GameUILayer.stage);
            return this._cacheglobalbounds;
        };
        p.getCacheCollisionPolygonData = function () {
            if (this._isupdatebounds || !this._cacheCollisionPolygonDatas) {
                var ovss = [];
                /**
                 * 1、先将起始点移动到原点
                 * 2、再进行缩放
                 * 3、再进行旋转
                 * 4、再移回到目的地
                 *
                 */
                for (var m1 = 0; m1 < this.collisionVectorData.length; m1++) {
                    var ovs = [];
                    for (var op = 0; op < this.collisionVectorData[m1].length; op++) {
                        var ov = this.collisionVectorData[m1][op];
                        var otm = new egret.Matrix();
                        //先进行注册点移动
                        otm.translate(ov.x - this.anchorOffsetX, ov.y - this.anchorOffsetY);
                        //再进行缩放
                        otm.scale(this.scaleX, this.scaleY);
                        //再进行旋转
                        otm.rotate(this.angle * Math.PI / 180);
                        ovs[op] = new ls.Vector2D(otm.tx, otm.ty);
                    }
                    ovss[m1] = ovs;
                }
                this._cacheCollisionPolygonDatas = ovss;
            }
            return this._cacheCollisionPolygonDatas;
        };
        p.renderUpdate = function () {
            this._isupdatebounds = false;
            if (this.container.x != this.x) {
                this.container.x = this.x;
                this._isupdatebounds = true;
            }
            if (this.container.y != this.y) {
                this.container.y = this.y;
                this._isupdatebounds = true;
            }
            if (this.container.width != this.width) {
                this.container.width = this.width;
                this._isupdatebounds = true;
            }
            if (this.container.height != this.height) {
                this.container.height = this.height;
                this._isupdatebounds = true;
            }
            if (this.scaleContainer) {
                if (this.container.scaleX != this.scaleX) {
                    this.container.scaleX = this.scaleX;
                    this._isupdatebounds = true;
                }
                if (this.container.scaleY != this.scaleY) {
                    this.container.scaleY = this.scaleY;
                    this._isupdatebounds = true;
                }
            }
            if (this.container.rotation != this.angle) {
                this.container.rotation = this.angle;
                this._isupdatebounds = true;
            }
            if (this.container.anchorOffsetX != this.width * this.anchorX) {
                this.container.anchorOffsetX = this.width * this.anchorX;
                this._isupdatebounds = true;
            }
            if (this.container.anchorOffsetY != this.height * this.anchorY) {
                this.container.anchorOffsetY = this.height * this.anchorY;
                this._isupdatebounds = true;
            }
            if (this.container.alpha != this.alpha)
                this.container.alpha = this.alpha;
            if (this.container.visible != this.visible)
                this.container.visible = this.visible;
        };
        d(p, "box"
            ,function () {
                return this.getBounds();
            }
        );
        d(p, "quad"
            ,function () {
                if (this._quad == null)
                    this._quad = new ls.Quad();
                var bounds = this.getBounds();
                this._quad.tlx = bounds.x;
                this._quad.tly = bounds.y;
                this._quad.trx = bounds.x + bounds.width;
                this._quad.try_ = bounds.y;
                this._quad.blx = bounds.x;
                this._quad.bly = bounds.y + bounds.height;
                this._quad.brx = bounds.x + bounds.width;
                this._quad.bry = bounds.y + bounds.height;
                return this._quad;
            }
        );
        p.setIsColliding = function (isColliding, target) {
            this.collisionTarget = target;
            if (isColliding)
                this.isCollsioning = isColliding;
            if (this.isOldCollision != isColliding) {
                this.isOldCollision = isColliding;
                if (target && isColliding) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onCollisionWithOtherObject, target));
                    target.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onCollisionWithOtherObject, this));
                }
            }
        };
        d(p, "mirrored"
            ,function () {
                return this._mirrored;
            }
            ,function (state) {
                if (this._mirrored != state) {
                    this._mirrored = state;
                    switch (this._mirrored) {
                        case 0:
                            this.scaleX = -1;
                            break;
                        case 1:
                            this.scaleY = -1;
                            break;
                        case 2:
                            this.scaleX = -1;
                            this.scaleY = -1;
                            break;
                        case 3:
                            this.scaleX = 1;
                            this.scaleY = 1;
                            break;
                    }
                }
            }
        );
        /**
         * 根据行为类名获取行为
         *
         */
        p.getBehavior = function ($behaviorClass) {
            for (var i = 0; i < this.behaviors.length; i++) {
                var behavior = this.behaviors[i];
                if (behavior["constructor"] == $behaviorClass) {
                    return behavior;
                }
            }
            return null;
        };
        p.addBehavior = function ($behavior) {
            if ($behavior != null) {
                if ($behavior["constructor"]["name"] == "ScrollToBehavior")
                    this.isHasCamera = true;
                $behavior.inst = this;
                $behavior.enabled = $behavior.enabled;
                this.isInScreenOnce = false;
                this.behaviors.push($behavior);
                return true;
            }
            return false;
        };
        p.removeBehavior = function ($behavior) {
            if ($behavior != null) {
                var index = this.behaviors.indexOf($behavior);
                if (index != -1) {
                    $behavior = null;
                    return this.behaviors.splice(index, 1);
                }
            }
            return null;
        };
        p.removeAllBehaviors = function () {
            this.behaviors.length = 0;
        };
        d(p, "container"
            ,function () {
                return this._container;
            }
        );
        d(p, "x"
            ,function () {
                return this._x;
            }
            ,function (value) {
                if (this._x != value) {
                    this._x = value;
                    this.update = true;
                }
            }
        );
        d(p, "y"
            ,function () {
                return this._y;
            }
            ,function (value) {
                if (this._y != value) {
                    this._y = value;
                    this.update = true;
                }
            }
        );
        d(p, "width"
            ,function () {
                return this._width;
            }
            ,function (value) {
                if (this._width != value) {
                    this._width = value;
                    this.update = true;
                }
            }
        );
        d(p, "height"
            ,function () {
                return this._height;
            }
            ,function (value) {
                if (this._height != value) {
                    this._height = value;
                    this.update = true;
                }
            }
        );
        d(p, "angle"
            /**角度(0~360)*/
            ,function () {
                return this._angle;
            }
            ,function (value) {
                if (this._angle != value) {
                    this._angle = value;
                    this.update = true;
                }
            }
        );
        d(p, "alpha"
            ,function () {
                return this._alpha;
            }
            ,function (value) {
                if (this._alpha != value) {
                    this._alpha = value;
                    this.update = true;
                }
            }
        );
        d(p, "visible"
            ,function () {
                return this._visible;
            }
            ,function (value) {
                if (this._visible != value) {
                    this._visible = value;
                    this.update = true;
                }
            }
        );
        d(p, "scale"
            ,function () {
                return this._scale;
            }
            ,function (value) {
                this._scale = value;
                this._scaleX = this._scaleY = value;
                this.update = true;
            }
        );
        d(p, "scaleX"
            ,function () {
                return this._scaleX;
            }
            ,function (value) {
                if (this._scaleX != value) {
                    this._scaleX = value;
                    this.update = true;
                }
            }
        );
        d(p, "scaleY"
            ,function () {
                return this._scaleY;
            }
            ,function (value) {
                if (this._scaleY != value) {
                    this._scaleY = value;
                    this.update = true;
                }
            }
        );
        d(p, "anchorX"
            ,function () {
                return this._anchorX;
            }
            ,function (value) {
                if (this._anchorX != value) {
                    this._anchorX = value;
                    this._anchorOffsetX = this.width * value;
                    this.update = true;
                }
            }
        );
        d(p, "anchorOffsetX"
            ,function () {
                return this._anchorOffsetX;
            }
        );
        d(p, "anchorOffsetY"
            ,function () {
                return this._anchorOffsetY;
            }
        );
        d(p, "anchorY"
            ,function () {
                return this._anchorY;
            }
            ,function (value) {
                if (this._anchorY != value) {
                    this._anchorY = value;
                    this._anchorOffsetY = this.height * value;
                    this.update = true;
                }
            }
        );
        ////////////////////////////////////conditions///////////////////////////////////
        p.isTouchDown = function ($isTouchDownEvent) {
            return { instances: [this], status: this._isTouchDown };
        };
        p.onButtonTap = function ($onTouchTapEvent) {
            return { instances: [this], status: true };
        };
        p.onButtonBegin = function ($onTouchBeginEvent) {
            return { instances: [this], status: true };
        };
        p.onButtonEnd = function ($onTouchEnd) {
            return { instances: [this], status: true };
        };
        p.onButtonMove = function ($onTouchMoveEvent) {
            return { instances: [this], status: true };
        };
        p.onButtonReleaseOutside = function ($onTouchReleaseOutside) {
            return { instances: [this], status: true };
        };
        p.isEnabled = function ($isButtonEnabledEvent) {
            return { instances: [this], status: this.enabled };
        };
        /**判断当前显示对象是否在这两个角度之间*/
        p.isBetweenAngles = function ($isBetweenAngles) {
            var angle = ls.eval_e($isBetweenAngles.angle);
            var angle1 = ls.eval_e($isBetweenAngles.angle1);
            var angle2 = ls.eval_e($isBetweenAngles.angle2);
            var obtuse = this._isClosewideform(angle1, angle2);
            if (obtuse)
                return { instances: [this], status: this._isClosewideform(angle, angle1) && this._isClosewideform(angle, angle2) };
            else
                return { instances: [this], status: this._isClosewideform(angle, angle1) && !this._isClosewideform(angle, angle2) };
        };
        /**判断是否是顺时针方向*/
        p.isclockwiseform = function ($isClockwiseFrom) {
            var angle1 = ls.eval_e($isClockwiseFrom.angle1);
            var angle2 = ls.eval_e($isClockwiseFrom.angle2);
            return { instances: [this], status: this._isClosewideform(angle1, angle2) };
        };
        p._isClosewideform = function (angle1, angle2) {
            var radian1 = ls.MathUtils.toRadian(angle1);
            var radian2 = ls.MathUtils.toRadian(angle2);
            var s1 = Math.sin(radian1);
            var c1 = Math.cos(radian1);
            var s2 = Math.sin(radian2);
            var c2 = Math.cos(radian2);
            return (c1 * s2 - s1 * c2) <= 0;
        };
        /**对象是否在运动*/
        p.isObjectMoving = function ($event) {
            var curX = this.x;
            var curY = this.y;
            if (this._oldX != curX || this._oldY != curY) {
                this._oldX = curX;
                this._oldY = curY;
                return { instances: [this], status: true };
            }
            return { instances: [this], status: false };
        };
        p.onCreated = function ($event) {
            return { instances: [this], status: true };
        };
        p.compareInstanceVariable = function ($event) {
            return { instances: [this], status: ls.compare(this[$event.instanceVariable], $event.operationType, $event.value) };
        };
        p.compareX = function ($event) {
            return { instances: [this], status: ls.compare(this.x, $event.operationType, $event.x) };
        };
        p.compareY = function ($event) {
            return { instances: [this], status: ls.compare(this.y, $event.operationType, $event.y) };
        };
        p.compareWidth = function ($event) {
            return { instances: [this], status: ls.compare(this.width, $event.operationType, $event.width) };
        };
        p.compareHeight = function ($event) {
            return { instances: [this], status: ls.compare(this.height, $event.operationType, $event.height) };
        };
        p.compareAlpha = function ($event) {
            return { instances: [this], status: ls.compare(this.alpha, $event.operationType, $event.alpha) };
        };
        p.compareMirored = function ($event) {
            return { instances: [this], status: ls.eval_e($event.mirrored) == this._mirrored };
        };
        p.compareObjectMoveAngle = function ($event) {
            var curX = this.x;
            var curY = this.y;
            var status = false;
            if (!isNaN(this._oldMoveX) && !isNaN(this._oldMoveY)) {
                if (this._oldMoveX != curX || this._oldMoveY != curY) {
                    var moveRadian = Math.atan2(curY - this._oldMoveY, curX - this._oldMoveX);
                    var moveAngle = ls.MathUtils.toAngle(moveRadian);
                    status = ls.compare(moveAngle, $event.operationType, $event.angle);
                    this._oldMoveX = curX;
                    this._oldMoveY = curY;
                }
            }
            else {
                this._oldMoveX = curX;
                this._oldMoveY = curY;
            }
            return { instances: [this], status: status };
        };
        /**比较对象自身角度*/
        p.compareObjectAngle = function ($event) {
            return { instances: [this], status: ls.compare(this.angle, $event.operationType, $event.angle) };
        };
        /**比较对象与目标点之间的距离*/
        p.compareTargetDistance = function ($event) {
            var targetX = ls.eval_e($event.x);
            var targetY = ls.eval_e($event.y);
            var vx = targetX - this.x;
            var vy = targetY - this.y;
            var distance = Math.sqrt(vx * vx + vy * vy);
            return { instances: [this], status: ls.compare(distance, $event.operationType, $event.distance) };
        };
        /**是否添加到舞台条件*/
        p.onAddToStage = function ($onAddToStag) {
            return { instances: [this], status: this.container.stage != null || this._isAddToStage };
        };
        /**是否从舞台移除条件*/
        p.onRemoveToToStage = function () {
            return { instances: [this], status: (!this.container.stage || !this._isAddToStage) };
        };
        /**是否在屏幕里或者外*/
        p.isOnScreenOrFalse = function ($isOnScreen) {
            return { instances: [this], status: (ls.eval_e($isOnScreen.isOnScreen) === 1) ? (this.isOnScreen) : (!this.isOnScreen) };
        };
        p.isVisible = function ($isVisible) {
            return { instances: [this], status: ls.eval_e($isVisible.isVisible) !== 0 };
        };
        /////////////////////////////////////
        ///Collisions
        ////////////////////////////////////
        //trigger 碰撞期间只触发一次
        p.onCollisionWithOtherObject = function ($onCollisionWidthOtherObject) {
            return { instances: [this, $onCollisionWidthOtherObject.object], status: true };
        };
        p.onEnabledDisabledCollision = function ($onCollisionWidthOtherObject) {
            return { instances: [this], status: $onCollisionWidthOtherObject.status == 1 };
        };
        //只要在碰撞期间，那么，一直会触发
        p.isOverlappingOtherObject = function ($isOverlappingOtherObject) {
            return { instances: [this.collisionTarget, $isOverlappingOtherObject.object], status: this.collisionTarget.name == $isOverlappingOtherObject.object.name };
        };
        //缓动播放完成回调
        p.onTweenComplete = function ($event) {
            return { instances: [this], status: true };
        };
        //test
        p.pickByUniqueID = function ($event) {
            //找出同名的UID名字
            var instances = ls.World.getInstance().objectHash[this.name];
            var searchInstance;
            for (var i = 0; i < instances.length; i++) {
                var _instance = instances[i];
                if (_instance.id == ls.eval_e($event.uniqueID)) {
                    searchInstance = _instance;
                    break;
                }
            }
            return { instances: [_instance], status: Boolean(searchInstance) };
        };
        //当销毁时Trigger
        p.onDestory = function ($event) {
            return { instances: [this], status: true };
        };
        ////////////////////////////////////actions///////////////////////////////////
        p.addTo = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject addTo parameter type incorrect!!");
            this[$instanceVariables] += value;
            this.variables[$instanceVariables] = this[$instanceVariables];
        };
        p.setBoolean = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject setBoolean parameter type incorrect!!");
            this[$instanceVariables] = (value == 1);
            this.variables[$instanceVariables] = this[$instanceVariables];
        };
        p.setValue = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            this[$instanceVariables] = value;
            this.variables[$instanceVariables] = this[$instanceVariables];
        };
        p.subtractFrom = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject subtractFrom parameter type incorrect!!");
            this[$instanceVariables] -= value;
            this.variables[$instanceVariables] = this[$instanceVariables];
        };
        p.toogleBoolean = function ($instanceVariables) {
            this[$instanceVariables] = !this[$instanceVariables];
            this.variables[$instanceVariables] = this[$instanceVariables];
        };
        p.spawn = function ($object, $layer, $offsetX, $offsetY, relyOnTarget) {
            var layer = ls.eval_e($layer);
            var offsetX = ls.eval_e($offsetX);
            var offsetY = ls.eval_e($offsetY);
            var relyOnTarget = ls.eval_e(relyOnTarget);
            ls.assert(typeof layer !== "number" || typeof offsetX !== "number" || typeof offsetY !== "number", "AIDisplayObject spawn parameter type incorrect!!");
            var clone = $object.clone();
            clone.layer = layer;
            if (relyOnTarget == 1) {
                clone.angle = this.angle;
                clone.relyOnTarget = this;
            }
            else
                clone.relyOnTarget = null;
            var betweenAngle = ls.MathUtils.angleTo(this.x, this.y, this.x + offsetX, this.y + offsetY);
            var distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
            var mergeRaian = ls.MathUtils.toRadian(clone.angle) + ls.MathUtils.toRadian(betweenAngle);
            clone.x = this.x + Math.cos(mergeRaian) * distance;
            clone.y = this.y + Math.sin(mergeRaian) * distance;
            ls.lakeshoreInst()[clone.name] = clone;
            ls.World.getInstance().addChild(clone);
            return [clone];
        };
        p.moveAtAngle = function ($angle, $distance) {
            var angle = ls.eval_e($angle);
            var distance = ls.eval_e($distance);
            ls.assert(typeof angle !== "number", "AIDisplayObject moveAtAngle parameter type incorrect!!");
            ls.assert(typeof distance !== "number", "AIDisplayObject moveAtAngle parameter type incorrect!!");
            var radian = ls.MathUtils.toRadian(angle);
            this.x += Math.cos(radian) * distance * ls.timeScale();
            this.y += Math.sin(radian) * distance * ls.timeScale();
        };
        p.moveForward = function ($speed) {
            var speed = ls.eval_e($speed);
            ls.assert(typeof speed !== "number", "AIDisplayObject moveForward parameter type incorrect!!");
            var radian = ls.MathUtils.toRadian(this.angle);
            this.x += Math.cos(radian) * speed * ls.timeScale();
            this.y += Math.sin(radian) * speed * ls.timeScale();
        };
        /**以指定速度移动到目标点*/
        p.moveToTargetPoint = function (xpos, ypos, speed) {
            var xpos = ls.eval_e(xpos);
            var ypos = ls.eval_e(ypos);
            var speed = ls.eval_e(speed);
            ls.assert(typeof xpos !== "number" || typeof ypos !== "number" || typeof speed !== "number", "AIDisplayObject moveToTargetPoint parameter type incorrect!!");
            var vx = xpos - this.x;
            var vy = ypos - this.y;
            var distance = Math.sqrt(vx * vx + vy * vy);
            if (distance < speed) {
                this.x = xpos;
                this.y = ypos;
            }
            else {
                var dirRadian = Math.atan2(vy, vx);
                this.x += Math.cos(dirRadian) * speed * ls.timeScale();
                this.y += Math.sin(dirRadian) * speed * ls.timeScale();
            }
        };
        p.rotateClockWise = function ($angle) {
            var angle = ls.eval_e($angle);
            ls.assert(typeof angle !== "number", "AIDisplayObject rotateClockWise parameter type incorrect!!");
            this.angle += angle * ls.timeScale();
            this.angle = ls.MathUtils.clampAngle(this.angle);
        };
        p.rotateCounterClockWise = function ($angle) {
            var angle = ls.eval_e($angle);
            ls.assert(typeof angle !== "number", "AIDisplayObject rotateCounterClockWise parameter type incorrect!!");
            this.angle -= angle * ls.timeScale();
            this.angle = ls.MathUtils.clampAngle(this.angle);
        };
        p.rotateTowardAngle = function ($targetAngle, $step) {
            var targetAngle = ls.eval_e($targetAngle);
            var step = ls.eval_e($step);
            ls.assert(typeof targetAngle !== "number" || typeof step !== "number", "AIDisplayObject rotateTowardAngle parameter type incorrect!!");
            var newAngle = ls.MathUtils.toAngle(ls.MathUtils.angleRadius(ls.MathUtils.toRadian(this.angle), ls.MathUtils.toRadian(targetAngle), ls.MathUtils.toRadian(step * ls.timeScale())));
            if (isNaN(newAngle))
                return;
            if (this.angle != newAngle) {
                this.angle = newAngle;
            }
        };
        p.rotateTowardPosition = function (x, y, $step) {
            var x = ls.eval_e(x);
            var y = ls.eval_e(y);
            var step = ls.eval_e($step);
            ls.assert(typeof x !== "number" || typeof y !== "number" || typeof step !== "number", "AIDisplayObject rotateTowardPosition parameter type incorrect!!");
            var targetAngle = ls.MathUtils.angleTo(this.x, this.y, x, y);
            var newAngle = ls.MathUtils.angleRotate(this.angle, targetAngle, step * ls.timeScale());
            if (isNaN(newAngle))
                return;
            if (this.angle != newAngle) {
                this.angle = newAngle;
            }
        };
        p.setAngle = function ($angle) {
            var angle = ls.eval_e($angle);
            ls.assert(typeof angle !== "number", "AIDisplayObject setAngle parameter type incorrect!!");
            this.angle = angle;
        };
        p.setAngleTowardPosition = function (x, y) {
            var x = ls.eval_e(x);
            var y = ls.eval_e(y);
            ls.assert(typeof x !== "number" || typeof y !== "number", "AIDisplayObject setAngleTowardPosition parameter type incorrect!!");
            var targetAngle = ls.MathUtils.angleTo(this.x, this.y, x, y);
            this.angle = targetAngle;
        };
        p.setHeight = function ($height) {
            var height = ls.eval_e($height);
            ls.assert(typeof height !== "number", "AIDisplayObject setHeight parameter type incorrect!!");
            this.height = height;
        };
        p.setMirrored = function ($state) {
            var state = ls.eval_e($state);
            ls.assert(typeof state !== "number", "AIDisplayObject setMirrored parameter type incorrect!!");
            this.mirrored = state;
        };
        p.setPosition = function ($x, $y) {
            var x = ls.eval_e($x);
            var y = ls.eval_e($y);
            ls.assert(typeof x !== "number" || typeof y !== "number", "AIDisplayObject setPosition parameter type incorrect!!");
            this.x = x;
            this.y = y;
        };
        p.setPositionToAnotherObject = function ($object, $offsetX, $offsetY) {
            var offsetX = ls.eval_e($offsetX);
            var offsetY = ls.eval_e($offsetY);
            var object = ($object instanceof ls.AIObject) ? $object : ls.eval_e($object);
            ls.assert(typeof offsetX !== "number" || typeof offsetX !== "number", "AIDisplayObject setPositionToAnotherObject parameter type incorrect!!");
            this.x = object.x + offsetX;
            this.y = object.y + offsetY;
        };
        p.setScale = function ($scale) {
            var scale = ls.eval_e($scale);
            ls.assert(typeof scale !== "number", "AIDisplayObject setScale parameter type incorrect!!");
            this.scale = scale;
        };
        p.setScaleX = function ($scaleX) {
            var scaleX = ls.eval_e($scaleX);
            ls.assert(typeof scaleX !== "number", "AIDisplayObject setScaleX parameter type incorrect!!");
            this.scaleX = scaleX;
        };
        p.setScaleY = function ($scaleY) {
            var scaleY = ls.eval_e($scaleY);
            ls.assert(typeof scaleY !== "number", "AIDisplayObject setScaleY parameter type incorrect!!");
            this.scaleY = scaleY;
        };
        p.setSize = function ($width, $height) {
            var width = ls.eval_e($width);
            var height = ls.eval_e($height);
            ls.assert(typeof width !== "number" || typeof height !== "number", "AIDisplayObject setSize parameter type incorrect!!");
            this.width = width;
            this.height = height;
        };
        p.setVisible = function ($visible) {
            var visible = ls.eval_e($visible);
            ls.assert(typeof visible !== "number", "AIDisplayObject setVisible parameter type incorrect!!");
            this.visible = (visible == 1);
        };
        p.setAlpha = function ($alpha) {
            var alpha = ls.eval_e($alpha);
            ls.assert(typeof alpha !== "number", "AIDisplayObject setAlpha parameter type incorrect!!");
            if (alpha < 0.0001)
                alpha = 0;
            if (alpha > 1)
                alpha = 1;
            this.alpha = alpha;
        };
        p.setWidth = function ($width) {
            var width = ls.eval_e($width);
            ls.assert(typeof width !== "number", "AIDisplayObject setWidth parameter type incorrect!!");
            this.width = width;
        };
        p.setX = function ($x) {
            var x = ls.eval_e($x);
            ls.assert(typeof x !== "number", "AIDisplayObject setX parameter type incorrect!!");
            this.x = x;
        };
        p.setY = function ($y) {
            var y = ls.eval_e($y);
            ls.assert(typeof y !== "number", "AIDisplayObject setY parameter type incorrect!!");
            this.y = y;
        };
        p.setEnabled = function ($enabled) {
            var enabled = ls.eval_e($enabled);
            ls.assert(typeof enabled !== "number", "AIDisplayObject setEnabled parameter type incorrect!!");
            this.enabled = (enabled >= 1);
        };
        p.setMask = function (maskTarget) {
            if (maskTarget && maskTarget instanceof AIDisplayObject) {
                this.container.mask = maskTarget.container;
            }
        };
        /**
         * 这块非常容易引起性能上的问题，层容器越大，性能越低，尤其是层大小大于2048的时候
         */
        p.setMaskByLayer = function ($layerIndex) {
            $layerIndex = ls.eval_e($layerIndex);
            var layerContainer = ls.LayerManager.getLayer($layerIndex);
            if (layerContainer)
                this.container.mask = layerContainer;
        };
        p.setMaskIsNull = function () {
            this.container.mask = null;
        };
        ////////////////////////////////////滤镜实现///////////////////////////////////
        /**
         * 添加颜色矩阵滤镜
         */
        p.addColorMatrixFilter = function (filterData) {
            if (filterData) {
                var filterValues = filterData.split(',');
                if (filterValues && filterValues.length == 20) {
                    var matrixs = [];
                    for (var i = 0; i < filterValues.length; i++) {
                        matrixs[i] = +filterValues[i];
                    }
                    var colorMatrixFilter = new egret.ColorMatrixFilter(matrixs);
                    if (this.container.filters == null)
                        this.container.filters = [];
                    this.container.filters.push(colorMatrixFilter);
                }
            }
        };
        /**
         * 添加模糊滤镜
         */
        p.addBlurFilter = function (blurX, blurY) {
            blurX = ls.eval_e(blurX);
            blurY = ls.eval_e(blurY);
            var blurFilter = new egret.BlurFilter(blurX, blurY);
            if (this.container.filters == null)
                this.container.filters = [];
            this.container.filters.push(blurFilter);
        };
        /**
         * 添加投影滤镜
         */
        p.addDropShadowFilter = function (distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
            distance = ls.eval_e(distance);
            angle = ls.eval_e(angle);
            color = ls.eval_e(color);
            alpha = ls.eval_e(alpha);
            blurX = ls.eval_e(blurX);
            blurY = ls.eval_e(blurY);
            strength = ls.eval_e(strength);
            quality = ls.eval_e(quality);
            inner = ls.eval_e(inner);
            knockout = ls.eval_e(knockout);
            hideObject = ls.eval_e(hideObject);
            var dropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject);
            if (this.container.filters == null)
                this.container.filters = [];
            this.container.filters.push(dropShadowFilter);
        };
        /**
         * 添加发光滤镜
         */
        p.addGlowFilter = function (color, alpha, blurX, blurY, strength, quality, inner, knockout) {
            color = ls.eval_e(color);
            alpha = ls.eval_e(alpha);
            blurX = ls.eval_e(blurX);
            blurY = ls.eval_e(blurY);
            strength = ls.eval_e(strength);
            quality = ls.eval_e(quality);
            inner = ls.eval_e(inner);
            knockout = ls.eval_e(knockout);
            var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
            if (this.container.filters == null)
                this.container.filters = [];
            this.container.filters.push(glowFilter);
        };
        /**
         * 根据类型移除滤镜
         */
        p.removeFilterByType = function (type) {
            type = ls.eval_e(type);
            if (this.container.filters) {
                var removeCount = 0;
                for (var i = 0; i < this.container.filters.length; i++) {
                    var filterInst = this.container.filters[i];
                    switch (type) {
                        case 0:
                            if (filterInst instanceof egret.ColorMatrixFilter) {
                                this.container.filters.splice(i - removeCount, 1);
                                removeCount++;
                            }
                            break;
                        case 1:
                            if (filterInst instanceof egret.BlurFilter) {
                                this.container.filters.splice(i - removeCount, 1);
                                removeCount++;
                            }
                            break;
                        case 2:
                            if (filterInst instanceof egret.DropShadowFilter) {
                                this.container.filters.splice(i - removeCount, 1);
                                removeCount++;
                            }
                            break;
                        case 3:
                            if (filterInst instanceof egret.GlowFilter) {
                                this.container.filters.splice(i - removeCount, 1);
                                removeCount++;
                            }
                            break;
                    }
                }
            }
        };
        /**
         * 移除所有颜色滤镜
         */
        p.removeAllFilters = function () {
            this.container.filters = null;
        };
        ////////////////////////////////////缓动实现///////////////////////////////////
        //执行缓动
        p.execTween = function ($key, $x, $y, $anchorX, $anchorY, $width, $height, $angle, $alpha, $duration, $ease, $waitTime, $loop, $scaleX, $scaleY) {
            var key = ($key) ? ls.eval_e($key) : "lsTweenStartKey";
            var duration = ls.eval_e($duration);
            var ease = ls.eval_e($ease);
            var waitTime = ls.eval_e($waitTime);
            var easeFunc = egret.Ease[ease];
            var props = {};
            if ($x)
                props.x = ls.eval_e($x);
            if ($y)
                props.y = ls.eval_e($y);
            if ($anchorX)
                props.anchorX = ls.eval_e($anchorX);
            if ($anchorY)
                props.anchorY = ls.eval_e($anchorY);
            if ($width)
                props.width = ls.eval_e($width);
            if ($height)
                props.height = ls.eval_e($height);
            if ($angle)
                props.angle = ls.eval_e($angle);
            if ($alpha)
                props.alpha = ls.eval_e($alpha);
            if ($scaleX)
                props.scaleX = ls.eval_e($scaleX);
            if ($scaleY)
                props.scaleY = ls.eval_e($scaleY);
            egret.setTimeout(function () {
                egret.Tween.get(this, {
                    loop: ($loop == 1), onChange: null, onChangeObj: this
                }).to(props, duration, easeFunc).wait(0).call(function (key) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTweenComplete, key));
                }, this, [key]);
            }, this, waitTime);
        };
        //启用或者禁用碰撞
        p.enabledDisabledCollision = function ($status) {
            var status = ls.eval_e($status);
            this.collision = (status == 1);
        };
        ////////////////////////////////////protected///////////////////////////////////
        p.onAddToStageHanlder = function (event) {
            this._isAddToStage = true;
        };
        p.onRemoveToStageHanlder = function (event) {
            this._isAddToStage = false;
        };
        p.destoryTest = function () {
            this.destory();
        };
        /**
         * 切换场景时销毁
         *
         */
        p.destoryOnChangeScene = function () {
            this.removeAllBehaviors();
            this.destory();
        };
        /**销毁*/
        p.destory = function () {
            if (!this.isModel) {
                var _name = this.name;
                var list = ls.World.getInstance().objectHash[_name];
                if (list) {
                    var _index = list.indexOf(this);
                    if (_index != -1) {
                        list.splice(_index, 1);
                    }
                }
            }
            //处理特殊情况销毁
            if (this.behaviors) {
                for (var i = 0; i < this.behaviors.length; i++) {
                    var _behavior = this.behaviors[i];
                    _behavior.destory();
                }
            }
            if (this.container)
                this.container.graphics.clear();
            this.container.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHanlder, this);
            this.container.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveToStageHanlder, this);
            ls.World.getInstance().removeChild(this);
            this.container = null;
            if (!this.global)
                this.isDead = true;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDestory));
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["x"] = this.x;
            o["y"] = this.y;
            o["width"] = this.width;
            o["height"] = this.height;
            o["scale"] = this.scale;
            o["scaleX"] = this.scaleX;
            o["scaleY"] = this.scaleY;
            o["angle"] = this.angle;
            o["alpha"] = this.alpha;
            o["visible"] = this.visible;
            o["mirrored"] = this.mirrored;
            o["collision"] = this.collision;
            o["anchorX"] = this.anchorX;
            o["anchorY"] = this.anchorY;
            o["layer"] = this.layer;
            o["parallaxX"] = this.parallaxX;
            o["parallaxY"] = this.parallaxY;
            o["collisionData"] = this.collisionData;
            o["collisionType"] = this.collisionType;
            o["collisionSourceData"] = this.collisionSourceData;
            o["collisionIsRect"] = this.collisionIsRect;
            o["scaleContainer"] = this.scaleContainer;
            o["enabled"] = this.enabled;
            o["relyOnTarget"] = this.relyOnTarget;
            o["variables"] = JSON.stringify(this.variables);
            o["behaviors"] = [];
            for (var i = 0; i < this.behaviors.length; i++) {
                var behavior = this.behaviors[i];
                o["behaviors"][i] = behavior.saveToJSON();
                o["behaviors"][i].plugin = egret.getQualifiedClassName(behavior);
            }
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.x = o["x"];
                this.y = o["y"];
                this.width = o["width"];
                this.height = o["height"];
                this.scale = o["scale"];
                this.scaleX = o["scaleX"];
                this.scaleY = o["scaleY"];
                this.angle = o["angle"];
                this.alpha = o["alpha"];
                this.visible = o["visible"];
                this.mirrored = o["mirrored"];
                this.collision = o["collision"];
                this.anchorX = o["anchorX"];
                this.anchorY = o["anchorY"];
                this.layer = o["layer"];
                this.parallaxX = o["parallaxX"];
                this.parallaxY = o["parallaxY"];
                this.collisionData = o["collisionData"];
                this.collisionType = o["collisionType"];
                this.collisionSourceData = o["collisionSourceData"];
                this.collisionVectorData = ls.LayoutDecoder.decodeCollision(this, this.collisionData);
                this.collisionSourceVectorData = ls.LayoutDecoder.decodeCollision(this, this.collisionSourceData);
                this.collisionIsRect = o["collisionIsRect"];
                this.scaleContainer = o["scaleContainer"];
                this.enabled = o["enabled"];
                this.relyOnTarget = o["relyOnTarget"];
                this.variables = JSON.parse(o["variables"]);
                for (var vk in this.variables) {
                    this[vk] = this.variables[vk];
                }
                this.removeAllBehaviors();
                for (var i = 0; i < o["behaviors"].length; i++) {
                    var behaviorData = o["behaviors"][i];
                    var plugin = behaviorData.plugin.slice(3);
                    var behaivor = ls.getInstanceByPluginClassName(plugin);
                    behaivor.loadFromJSON(behaviorData);
                    this.addBehavior(behaivor);
                    behaivor.onCreate();
                }
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.name = this.name;
            cl.x = this.x;
            cl.y = this.y;
            cl.width = this.width;
            cl.height = this.height;
            cl.scale = this.scale;
            cl.scaleX = this.scaleX;
            cl.scaleY = this.scaleY;
            cl.angle = this.angle;
            cl.alpha = this.alpha;
            cl.visible = this.visible;
            cl.mirrored = this.mirrored;
            cl.anchorX = this.anchorX;
            cl.anchorY = this.anchorY;
            cl.layer = this.layer;
            cl.parallaxX = this.parallaxX;
            cl.parallaxY = this.parallaxY;
            cl.global = this.global;
            cl.collisionData = this.collisionData;
            cl.collisionType = this.collisionType;
            cl.collisionSourceData = this.collisionSourceData;
            cl.collisionVectorData = this.collisionVectorData;
            cl.collisionSourceVectorData = this.collisionSourceVectorData;
            cl.collisionIsRect = this.collisionIsRect;
            cl.scaleContainer = this.scaleContainer;
            cl.enabled = this.enabled;
            cl.collision = this.collision;
            cl.relyOnTarget = this.relyOnTarget;
            for (var i = 0; i < this.behaviors.length; i++) {
                var behaivor = this.behaviors[i];
                var cloneBehaivor = behaivor.clone();
                cl.addBehavior(cloneBehaivor);
                cloneBehaivor.onCreate();
            }
            return cl;
        };
        return AIDisplayObject;
    }(ls.AIObject));
    ls.AIDisplayObject = AIDisplayObject;
    egret.registerClass(AIDisplayObject,'ls.AIDisplayObject');
    var IsButtonDownEvent = (function (_super) {
        __extends(IsButtonDownEvent, _super);
        function IsButtonDownEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsButtonDownEvent,p=c.prototype;
        return IsButtonDownEvent;
    }(ls.BaseEvent));
    ls.IsButtonDownEvent = IsButtonDownEvent;
    egret.registerClass(IsButtonDownEvent,'ls.IsButtonDownEvent');
    var OnButtonTapEvent = (function (_super) {
        __extends(OnButtonTapEvent, _super);
        function OnButtonTapEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnButtonTapEvent,p=c.prototype;
        return OnButtonTapEvent;
    }(ls.BaseEvent));
    ls.OnButtonTapEvent = OnButtonTapEvent;
    egret.registerClass(OnButtonTapEvent,'ls.OnButtonTapEvent');
    var OnButtonBeginEvent = (function (_super) {
        __extends(OnButtonBeginEvent, _super);
        function OnButtonBeginEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnButtonBeginEvent,p=c.prototype;
        return OnButtonBeginEvent;
    }(ls.BaseEvent));
    ls.OnButtonBeginEvent = OnButtonBeginEvent;
    egret.registerClass(OnButtonBeginEvent,'ls.OnButtonBeginEvent');
    var OnButtonEndEvent = (function (_super) {
        __extends(OnButtonEndEvent, _super);
        function OnButtonEndEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnButtonEndEvent,p=c.prototype;
        return OnButtonEndEvent;
    }(ls.BaseEvent));
    ls.OnButtonEndEvent = OnButtonEndEvent;
    egret.registerClass(OnButtonEndEvent,'ls.OnButtonEndEvent');
    var OnButtonMoveEvent = (function (_super) {
        __extends(OnButtonMoveEvent, _super);
        function OnButtonMoveEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnButtonMoveEvent,p=c.prototype;
        return OnButtonMoveEvent;
    }(ls.BaseEvent));
    ls.OnButtonMoveEvent = OnButtonMoveEvent;
    egret.registerClass(OnButtonMoveEvent,'ls.OnButtonMoveEvent');
    var OnButtonReleaseOutsideEvent = (function (_super) {
        __extends(OnButtonReleaseOutsideEvent, _super);
        function OnButtonReleaseOutsideEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnButtonReleaseOutsideEvent,p=c.prototype;
        return OnButtonReleaseOutsideEvent;
    }(ls.BaseEvent));
    ls.OnButtonReleaseOutsideEvent = OnButtonReleaseOutsideEvent;
    egret.registerClass(OnButtonReleaseOutsideEvent,'ls.OnButtonReleaseOutsideEvent');
    var IsButtonEnabledEvent = (function (_super) {
        __extends(IsButtonEnabledEvent, _super);
        function IsButtonEnabledEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsButtonEnabledEvent,p=c.prototype;
        return IsButtonEnabledEvent;
    }(ls.BaseEvent));
    ls.IsButtonEnabledEvent = IsButtonEnabledEvent;
    egret.registerClass(IsButtonEnabledEvent,'ls.IsButtonEnabledEvent');
    var IsBetweenAnglesEvent = (function (_super) {
        __extends(IsBetweenAnglesEvent, _super);
        function IsBetweenAnglesEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsBetweenAnglesEvent,p=c.prototype;
        return IsBetweenAnglesEvent;
    }(ls.BaseEvent));
    ls.IsBetweenAnglesEvent = IsBetweenAnglesEvent;
    egret.registerClass(IsBetweenAnglesEvent,'ls.IsBetweenAnglesEvent');
    var IsClockwiseFromEvent = (function (_super) {
        __extends(IsClockwiseFromEvent, _super);
        function IsClockwiseFromEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsClockwiseFromEvent,p=c.prototype;
        return IsClockwiseFromEvent;
    }(ls.BaseEvent));
    ls.IsClockwiseFromEvent = IsClockwiseFromEvent;
    egret.registerClass(IsClockwiseFromEvent,'ls.IsClockwiseFromEvent');
    var IsObjectMovingEvent = (function (_super) {
        __extends(IsObjectMovingEvent, _super);
        function IsObjectMovingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsObjectMovingEvent,p=c.prototype;
        return IsObjectMovingEvent;
    }(ls.BaseEvent));
    ls.IsObjectMovingEvent = IsObjectMovingEvent;
    egret.registerClass(IsObjectMovingEvent,'ls.IsObjectMovingEvent');
    var OnCreatedEvent = (function (_super) {
        __extends(OnCreatedEvent, _super);
        function OnCreatedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnCreatedEvent,p=c.prototype;
        return OnCreatedEvent;
    }(ls.BaseEvent));
    ls.OnCreatedEvent = OnCreatedEvent;
    egret.registerClass(OnCreatedEvent,'ls.OnCreatedEvent');
    var CompareInstanceVariableEvent = (function (_super) {
        __extends(CompareInstanceVariableEvent, _super);
        function CompareInstanceVariableEvent() {
            _super.apply(this, arguments);
            this.value = 0;
        }
        var d = __define,c=CompareInstanceVariableEvent,p=c.prototype;
        return CompareInstanceVariableEvent;
    }(ls.BaseEvent));
    ls.CompareInstanceVariableEvent = CompareInstanceVariableEvent;
    egret.registerClass(CompareInstanceVariableEvent,'ls.CompareInstanceVariableEvent');
    var CompareXPosEvent = (function (_super) {
        __extends(CompareXPosEvent, _super);
        function CompareXPosEvent() {
            _super.apply(this, arguments);
            this.x = 0;
        }
        var d = __define,c=CompareXPosEvent,p=c.prototype;
        return CompareXPosEvent;
    }(ls.BaseEvent));
    ls.CompareXPosEvent = CompareXPosEvent;
    egret.registerClass(CompareXPosEvent,'ls.CompareXPosEvent');
    var CompareYPosEvent = (function (_super) {
        __extends(CompareYPosEvent, _super);
        function CompareYPosEvent() {
            _super.apply(this, arguments);
            this.y = 0;
        }
        var d = __define,c=CompareYPosEvent,p=c.prototype;
        return CompareYPosEvent;
    }(ls.BaseEvent));
    ls.CompareYPosEvent = CompareYPosEvent;
    egret.registerClass(CompareYPosEvent,'ls.CompareYPosEvent');
    var CompareWidthEvent = (function (_super) {
        __extends(CompareWidthEvent, _super);
        function CompareWidthEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareWidthEvent,p=c.prototype;
        return CompareWidthEvent;
    }(ls.BaseEvent));
    ls.CompareWidthEvent = CompareWidthEvent;
    egret.registerClass(CompareWidthEvent,'ls.CompareWidthEvent');
    var CompareHeightEvent = (function (_super) {
        __extends(CompareHeightEvent, _super);
        function CompareHeightEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareHeightEvent,p=c.prototype;
        return CompareHeightEvent;
    }(ls.BaseEvent));
    ls.CompareHeightEvent = CompareHeightEvent;
    egret.registerClass(CompareHeightEvent,'ls.CompareHeightEvent');
    var CompareOpacityEvent = (function (_super) {
        __extends(CompareOpacityEvent, _super);
        function CompareOpacityEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareOpacityEvent,p=c.prototype;
        return CompareOpacityEvent;
    }(ls.BaseEvent));
    ls.CompareOpacityEvent = CompareOpacityEvent;
    egret.registerClass(CompareOpacityEvent,'ls.CompareOpacityEvent');
    var CompareMirroredStatusEvent = (function (_super) {
        __extends(CompareMirroredStatusEvent, _super);
        function CompareMirroredStatusEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareMirroredStatusEvent,p=c.prototype;
        return CompareMirroredStatusEvent;
    }(ls.BaseEvent));
    ls.CompareMirroredStatusEvent = CompareMirroredStatusEvent;
    egret.registerClass(CompareMirroredStatusEvent,'ls.CompareMirroredStatusEvent');
    var CompareObjectMoveAngleEvent = (function (_super) {
        __extends(CompareObjectMoveAngleEvent, _super);
        function CompareObjectMoveAngleEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareObjectMoveAngleEvent,p=c.prototype;
        return CompareObjectMoveAngleEvent;
    }(ls.BaseEvent));
    ls.CompareObjectMoveAngleEvent = CompareObjectMoveAngleEvent;
    egret.registerClass(CompareObjectMoveAngleEvent,'ls.CompareObjectMoveAngleEvent');
    var CompareObjectAngleEvent = (function (_super) {
        __extends(CompareObjectAngleEvent, _super);
        function CompareObjectAngleEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareObjectAngleEvent,p=c.prototype;
        return CompareObjectAngleEvent;
    }(ls.BaseEvent));
    ls.CompareObjectAngleEvent = CompareObjectAngleEvent;
    egret.registerClass(CompareObjectAngleEvent,'ls.CompareObjectAngleEvent');
    var CompareTargetDistanceEvent = (function (_super) {
        __extends(CompareTargetDistanceEvent, _super);
        function CompareTargetDistanceEvent() {
            _super.apply(this, arguments);
            this.x = 0;
            this.y = 0;
            this.distance = 0;
        }
        var d = __define,c=CompareTargetDistanceEvent,p=c.prototype;
        return CompareTargetDistanceEvent;
    }(ls.BaseEvent));
    ls.CompareTargetDistanceEvent = CompareTargetDistanceEvent;
    egret.registerClass(CompareTargetDistanceEvent,'ls.CompareTargetDistanceEvent');
    var OnStartOfLayoutEvent = (function (_super) {
        __extends(OnStartOfLayoutEvent, _super);
        function OnStartOfLayoutEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnStartOfLayoutEvent,p=c.prototype;
        return OnStartOfLayoutEvent;
    }(ls.BaseEvent));
    ls.OnStartOfLayoutEvent = OnStartOfLayoutEvent;
    egret.registerClass(OnStartOfLayoutEvent,'ls.OnStartOfLayoutEvent');
    var IsOnScreenEvent = (function (_super) {
        __extends(IsOnScreenEvent, _super);
        function IsOnScreenEvent() {
            _super.apply(this, arguments);
            this.isOnScreen = 1;
        }
        var d = __define,c=IsOnScreenEvent,p=c.prototype;
        return IsOnScreenEvent;
    }(ls.BaseEvent));
    ls.IsOnScreenEvent = IsOnScreenEvent;
    egret.registerClass(IsOnScreenEvent,'ls.IsOnScreenEvent');
    var IsVisibleEvent = (function (_super) {
        __extends(IsVisibleEvent, _super);
        function IsVisibleEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsVisibleEvent,p=c.prototype;
        return IsVisibleEvent;
    }(ls.BaseEvent));
    ls.IsVisibleEvent = IsVisibleEvent;
    egret.registerClass(IsVisibleEvent,'ls.IsVisibleEvent');
    var OnCollisionWithOtherObjectEvent = (function (_super) {
        __extends(OnCollisionWithOtherObjectEvent, _super);
        function OnCollisionWithOtherObjectEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnCollisionWithOtherObjectEvent,p=c.prototype;
        return OnCollisionWithOtherObjectEvent;
    }(ls.BaseEvent));
    ls.OnCollisionWithOtherObjectEvent = OnCollisionWithOtherObjectEvent;
    egret.registerClass(OnCollisionWithOtherObjectEvent,'ls.OnCollisionWithOtherObjectEvent');
    var OnEnabledDisabledCollisionEvent = (function (_super) {
        __extends(OnEnabledDisabledCollisionEvent, _super);
        function OnEnabledDisabledCollisionEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnEnabledDisabledCollisionEvent,p=c.prototype;
        return OnEnabledDisabledCollisionEvent;
    }(ls.BaseEvent));
    ls.OnEnabledDisabledCollisionEvent = OnEnabledDisabledCollisionEvent;
    egret.registerClass(OnEnabledDisabledCollisionEvent,'ls.OnEnabledDisabledCollisionEvent');
    var IsOverlappingOtherObjectEvent = (function (_super) {
        __extends(IsOverlappingOtherObjectEvent, _super);
        function IsOverlappingOtherObjectEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsOverlappingOtherObjectEvent,p=c.prototype;
        return IsOverlappingOtherObjectEvent;
    }(ls.BaseEvent));
    ls.IsOverlappingOtherObjectEvent = IsOverlappingOtherObjectEvent;
    egret.registerClass(IsOverlappingOtherObjectEvent,'ls.IsOverlappingOtherObjectEvent');
    var PickByUniqueIDEvent = (function (_super) {
        __extends(PickByUniqueIDEvent, _super);
        function PickByUniqueIDEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=PickByUniqueIDEvent,p=c.prototype;
        return PickByUniqueIDEvent;
    }(ls.BaseEvent));
    ls.PickByUniqueIDEvent = PickByUniqueIDEvent;
    egret.registerClass(PickByUniqueIDEvent,'ls.PickByUniqueIDEvent');
    var OnDestoryEvent = (function (_super) {
        __extends(OnDestoryEvent, _super);
        function OnDestoryEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnDestoryEvent,p=c.prototype;
        return OnDestoryEvent;
    }(ls.BaseEvent));
    ls.OnDestoryEvent = OnDestoryEvent;
    egret.registerClass(OnDestoryEvent,'ls.OnDestoryEvent');
    var OnTweenCompleteEvent = (function (_super) {
        __extends(OnTweenCompleteEvent, _super);
        function OnTweenCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnTweenCompleteEvent,p=c.prototype;
        return OnTweenCompleteEvent;
    }(ls.BaseEvent));
    ls.OnTweenCompleteEvent = OnTweenCompleteEvent;
    egret.registerClass(OnTweenCompleteEvent,'ls.OnTweenCompleteEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AIDisplayObject.js.map
var ls;
(function (ls) {
    var AISprite = (function (_super) {
        __extends(AISprite, _super);
        function AISprite() {
            _super.call(this);
            this._sourceWidth = 0;
            this._sourceHeight = 0;
            this._isResourceLoaded = false;
            this.name = "Sprite";
            this._bitmap = new egret.Bitmap();
        }
        var d = __define,c=AISprite,p=c.prototype;
        d(p, "bitmapURL"
            ,function () {
                return this._bitmapURL;
            }
        );
        p.initialize = function () {
            this.createBitmap(this["url"]);
        };
        /**创建位图*/
        p.createBitmap = function ($url) {
            if ($url && $url != "") {
                this._bitmapURL = $url;
                var self = this;
                var textureDatas = ls.getTexture($url);
                if (textureDatas != null)
                    var texture = textureDatas[0];
                //先从spriteSheet中找
                if (texture != null) {
                    this._bitmap.texture = texture;
                    this._sourceWidth = texture.textureWidth;
                    this._sourceHeight = texture.textureHeight;
                    this._bitmap.width = this.width;
                    this._bitmap.height = this.height;
                    if (textureDatas) {
                        this._bitmap.x = textureDatas[1];
                        this._bitmap.y = textureDatas[2];
                    }
                    this.container.addChild(this._bitmap);
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                }
                else {
                    var onRESComplete = function (texture) {
                        if (texture) {
                            self._bitmap.texture = texture;
                            self._sourceWidth = texture.textureWidth;
                            self._sourceHeight = texture.textureHeight;
                            self._bitmap.width = self.width;
                            self._bitmap.height = self.height;
                            self.container.addChild(self._bitmap);
                            self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                            self.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                        }
                    };
                    RES.getResByUrl($url, onRESComplete, this, RES.ResourceItem.TYPE_IMAGE);
                }
            }
        };
        p.addChild = function ($aiSprite) {
            ls.World.getInstance().addChild($aiSprite, this);
        };
        p.removeChild = function ($aiSprite) {
            ls.World.getInstance().removeChild($aiSprite);
        };
        //加载图片 动作
        p.loadImage = function ($url) {
            var curUrl = ls.eval_e($url);
            this.createBitmap(curUrl);
        };
        d(p, "width"
            ,function () {
                return this._width;
            }
            ,function (value) {
                if (this._width != value) {
                    this._width = value;
                    this.update = true;
                }
                if (this._bitmap) {
                    if (this._bitmap.width != value)
                        this._bitmap.width = value;
                }
                // if (this._sourceWidth == 0) 
                //         this._sourceWidth = value
                // this._scaleX = value / this._sourceWidth;
                // if (this._width != value) {
                //     this.update = true;
                //     this._width = value;
                // }
                // if (!isNaN(this.anchorX))
                //     this.container.anchorOffsetX = this.width * this.anchorX;
            }
        );
        d(p, "height"
            ,function () {
                return this._height;
            }
            ,function (value) {
                if (this._height != value) {
                    this._height = value;
                    this.update = true;
                }
                if (this._bitmap) {
                    if (this._bitmap.height != value)
                        this._bitmap.height = value;
                }
                // if (this._sourceHeight == 0)
                //     this._sourceHeight = value;
                // this._scaleY = value / this._sourceHeight;
                // if (this._height != value) {
                //     this._height = value;
                //     this.update = true;
                // }
                // if (!isNaN(this.anchorY))
                //     this.container.anchorOffsetY = this.height * this.anchorY;
            }
        );
        ////////////////////////////////////conditions///////////////////////////////////
        //当资源加载完毕
        p.onResourceLoaded = function ($onResourceLoaded) {
            return { instances: [this], status: true };
        };
        ////////////////////////////////////action///////////////////////////////////
        p.subtractFrom = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject subtractFrom parameter type incorrect!!");
            this[$instanceVariables] -= value;
        };
        ////////////////////////////////////behaviors///////////////////////////////////
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["url"] = this["url"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this["url"] = o["url"];
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl["url"] = this["url"];
            cl.initialize();
            return cl;
        };
        return AISprite;
    }(ls.AIDisplayObject));
    ls.AISprite = AISprite;
    egret.registerClass(AISprite,'ls.AISprite');
    var OnResourceLoadedEvent = (function (_super) {
        __extends(OnResourceLoadedEvent, _super);
        function OnResourceLoadedEvent() {
            _super.call(this);
        }
        var d = __define,c=OnResourceLoadedEvent,p=c.prototype;
        return OnResourceLoadedEvent;
    }(ls.BaseEvent));
    ls.OnResourceLoadedEvent = OnResourceLoadedEvent;
    egret.registerClass(OnResourceLoadedEvent,'ls.OnResourceLoadedEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AISprite.js.map
var ls;
(function (ls) {
    var AISystem = (function (_super) {
        __extends(AISystem, _super);
        function AISystem() {
            _super.call(this);
            this._heading = 0;
            this._lastUpdate = 0;
            this._lastTime = 0;
            this.SHAKE_THRESHOLD = 1000;
            this.isShakeble = true;
            this.dt1 = 0.016;
            this.dt = 0.016;
            this.minimumFramerate = 30;
            this.disableDataEvents = {};
            this.lastRegex = "";
            this.lastFlags = "";
            if (AISystem._instance != null) {
                throw new Error("AISystem 为单例！！！");
            }
            this.name = "System";
            AISystem._instance = this;
            this.onDevice();
            this.onGetGeolocation();
            this.onDeviceMotion();
            this.onDeviceVibrate();
        }
        var d = __define,c=AISystem,p=c.prototype;
        p.onDevice = function () {
            this._orientation = new egret.DeviceOrientation();
            this._orientation.addEventListener(egret.OrientationEvent.CHANGE, this.onOrientation, this);
        };
        p.onOrientation = function (event) {
            this._alpha = event.alpha;
            this._beta = event.beta;
            this._gamma = event.gamma;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDeviceOrientationChanged));
        };
        p.onGetGeolocation = function () {
            this._gps = new egret.Geolocation();
            this._gps.addEventListener(egret.GeolocationEvent.CHANGE, this.onGeolocation, this);
            this._gps.addEventListener(egret.GeolocationEvent.PERMISSION_DENIED, this.onGeolocation, this);
            this._gps.addEventListener(egret.GeolocationEvent.UNAVAILABLE, this.onGeolocation, this);
        };
        p.onGeolocation = function (event) {
            switch (event.type) {
                case egret.GeolocationEvent.CHANGE:
                    this._latitude = event.latitude;
                    this._longitude = event.longitude;
                    this._altitude = event.altitude;
                    this._speed = event.speed;
                    this._heading = event.heading;
                    this._accuracy = event.accuracy;
                    this._altitudeAccuracy = event.altitudeAccuracy;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDevicePostionChanged));
                    break;
                case egret.GeolocationEvent.PERMISSION_DENIED:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onGeolocationPermissionDenied));
                    break;
                default:
                    this._geolocationErrorMessage = event.errorMessage;
                    this._geolocationErrorType = event.errorType;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onGeolocationFail));
                    break;
            }
        };
        p.onDeviceMotion = function () {
            if (window['DeviceMotionEvent'])
                window.addEventListener('devicemotion', this.ondeviceMotionHandler, false);
        };
        p.ondeviceMotionHandler = function (eventData) {
            var self = AISystem.instance;
            self._curTime = egret.getTimer();
            var diffTime = self._curTime - self._lastUpdate;
            if (diffTime > 100) {
                //重力加速度
                var accleration = eventData.accelerationIncludingGravity;
                self._lastUpdate = self._curTime;
                self._x = accleration.x;
                self._y = accleration.y;
                self._z = accleration.z;
                var _movespeed = Math.abs(self._x + self._y + self._z - self._lastX - self._lastY - self._lastZ) / diffTime * 10000;
                if (_movespeed > self.SHAKE_THRESHOLD && self._curTime - self._lastTime > 1100 && self.isShakeble) {
                    self._lastTime = self._curTime;
                    self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onDeviceShake));
                }
                self._lastX = self._x;
                self._lastY = self._y;
                self._lastZ = self._z;
            }
        };
        p.onDeviceVibrate = function () {
            var supportsVibrate = window.navigator["vibrate"];
        };
        d(AISystem, "instance"
            ,function () {
                if (this._instance == null)
                    this._instance = new AISystem();
                return this._instance;
            }
        );
        p.sendSceneInitComplete = function () {
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSceneInitComplete));
        };
        ////////////////////////////////////conditions///////////////////////////////////
        p.runOs = function (event) {
            var os = ls.eval_e(event.os);
            return { instances: [this], status: os == egret.Capabilities.os };
        };
        p.isMobile = function (event) {
            return { instances: [this], status: ls.eval_e(event.mobile) == egret.Capabilities.isMobile };
        };
        p.onRunTimeType = function (event) {
            return { instances: [this], status: ls.eval_e(event.runtimeType) == egret.Capabilities.runtimeType };
        };
        p.runLanguageType = function (event) {
            return { instances: [this], status: ls.eval_e(event.language) == egret.Capabilities.language };
        };
        p.onGeolocationPermissionDenied = function (event) {
            return { instances: [this], status: true };
        };
        p.onGeolocationFail = function (event) {
            return { instances: [this], status: true };
        };
        p.onDeviceShake = function (event) {
            return { instances: [this], status: true };
        };
        p.onDevicePostionChanged = function (event) {
            return { instances: [this], status: true };
        };
        p.onDeviceOrientationChanged = function (event) {
            return { instances: [this], status: true };
        };
        p.onGameDataLoadComplete = function (event) {
            return { instances: [this], status: true };
        };
        p.onGameDataSaveComplete = function (event) {
            return { instances: [this], status: true };
        };
        /**每帧都执行*/
        p.everyTick = function ($eventyTickEvent) {
            return { instances: [this], status: true };
        };
        /**每多少秒执行的事件，这得改为触发条件，不然条件这块用多个会有问题*/
        p.everyXSecondEvent = function ($everyXSecondEvent) {
            $everyXSecondEvent.curTime = egret.getTimer();
            if ($everyXSecondEvent.curTime - $everyXSecondEvent.oldTime >= ls.eval_e($everyXSecondEvent.interval) * 1000) {
                $everyXSecondEvent.oldTime = $everyXSecondEvent.curTime;
                return { instances: [this], status: true };
            }
            return { instances: [this], status: false };
        };
        /**当场景初始化完成Trigger*/
        p.onSceneInitComplete = function ($event) {
            return { instances: [this], status: true };
        };
        /**当退出场景时Trigger*/
        p.onSceneEndComplete = function ($event) {
            return { instances: [this], status: true };
        };
        /**是否是某个类型TODO*/
        p.isValueType = function ($isValueType) {
            return { instances: [this], status: true };
        };
        /**判断某个对象的UID是否存在*/
        p.ObjectUIDExist = function ($objectUIDExist) {
            return { instances: [this], status: ls.LayoutDecoder.curSceneInstances[ls.eval_e($objectUIDExist.UID)] != null };
        };
        //测试正则表达式
        p.testRegex = function (event) {
            var str = ls.eval_e(event.str);
            str = str + "";
            var regex = event.regex;
            var flags = event.flags;
            if (!this.cacheRegex || regex != this.lastRegex || flags != this.lastFlags) {
                this.cacheRegex = new RegExp(regex, flags);
                this.lastRegex = regex;
                this.lastFlags = flags;
            }
            this.cacheRegex.lastIndex = 0;
            return { instances: [this], status: this.cacheRegex.test(str) };
        };
        /**获取任意实例*/
        p.pickRandomInstance = function ($pickRandomInstanceEvent) {
            var objects = ls.World.getInstance().objectHash[$pickRandomInstanceEvent.object.name];
            var randomObject = objects[Math.floor(Math.random() * (objects.length))];
            return { instances: [randomObject], status: objects && objects.length > 0, selectSingle: true };
        };
        /**获取所有实例*/
        p.pickAll = function ($event) {
            var objects = ls.World.getInstance().objectHash[$event.object.name];
            return { instances: objects, status: true };
        };
        /**基于判断条件获取实例列表*/
        p.pickInstanceByCondition = function ($event) {
            var results = [];
            var objects = ls.World.getInstance().objectHash[$event.object.name];
            if (objects) {
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    window[object.name] = object;
                    var result = ls.compare($event.expression, $event.operationType, $event.value);
                    if (result)
                        results.push(object);
                }
            }
            if (results.length > 0)
                return { instances: results, status: true };
            return { instances: [this], status: false };
        };
        //基于索引获取实例
        p.pickInstanceByIndex = function ($event) {
            var objects = ls.World.getInstance().objectHash[$event.object.name];
            if (objects) {
                var index = ls.eval_e($event.index);
                if (index < objects.length - 1 && index >= 0)
                    return { instances: [objects[index]], status: true };
            }
            return { instances: [this], status: false };
        };
        //基于鼠标与对象相交来获取实例列表
        p.pickInstanceOverlapping = function ($event) {
            var objects = ls.World.getInstance().objectHash[$event.object.name];
            if (objects) {
                var results = [];
                var x = ls.eval_e($event.x);
                var y = ls.eval_e($event.y);
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    var globalRect = object.getGlobalBounds();
                    if (globalRect.contains(x, y)) {
                        results.push(object);
                    }
                }
                if (results.length > 0) {
                    return { instances: results, status: true };
                }
            }
            return { instances: [this], status: false };
        };
        p.execFor = function (event) {
            return { instances: [this], status: true, data: event };
        };
        p.execForEachSort = function (event) {
            return { instances: [this], status: true, data: event };
        };
        /**比较变量值*/
        p.compareVariable = function ($event) {
            return { instances: [this], status: ls.compare(AISystem.instance[$event.variable], $event.operationType, $event.value) };
        };
        p.onLayerIsExist = function (event) {
            return { instances: [this], status: ls.LayerManager.getLayer(ls.eval_e(event.layer)) != null };
        };
        p.onLayerIsVisible = function (event) {
            var layerContainer = ls.LayerManager.getLayer(ls.eval_e(event.layer));
            if (layerContainer)
                return { instances: [this], status: layerContainer.visible == ls.eval_e(event.isVisible == 1) };
            return { instances: [this], status: false };
        };
        ////////////////////////////////////actions///////////////////////////////////
        /** 创建对象 */
        p.createObject = function ($object, $layer, $x, $y) {
            var layer = ls.eval_e($layer);
            var x = ls.eval_e($x);
            var y = ls.eval_e($y);
            ls.assert(typeof layer !== "number" || typeof x !== "number" || typeof y !== "number", "AISystem createObject parameter type incorrect!!");
            var clone = $object.clone();
            clone.layer = layer;
            clone.x = Math.round(x);
            clone.y = Math.round(y);
            ls.lakeshoreInst()[clone.name] = clone;
            ls.World.getInstance().addChild(clone);
            return [clone];
        };
        /**切换场景 */
        p.gotoScene = function ($layoutName) {
            //发送场景初始化完成事件
            egret.callLater(function () {
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSceneEndComplete));
                ls.World.getInstance().destory();
                $layoutName = $layoutName;
                ls.StartUp.onConfigLoad($layoutName);
            }, this);
        };
        //激活事件列表，用于优化大量的事件会一直存在时导致的性能消耗过高的问题
        p.disableEvents = function ($type, eventIDs) {
            var type = ls.eval_e($type);
            var eventIDs_ = eventIDs + "";
            var eventDataIDs;
            if (eventIDs_.length == 0)
                return;
            else if (eventIDs_.length == 1)
                eventDataIDs = [eventIDs_];
            else
                eventDataIDs = eventIDs_.split(",");
            for (var i = 0; i < eventDataIDs.length; i++) {
                var ids = +eventDataIDs[i];
                if (type == 1) {
                    delete this.disableDataEvents[ids]; //激活
                }
                else {
                    this.disableDataEvents[ids] = ids; //禁用
                }
            }
        };
        //显示加载logo
        p.showLoadingLogo = function (time) {
            var time = ls.eval_e(time);
            ls.GameUILayer.stage.addChild(ls.GameUILayer.preContainer);
            ls.GameUILayer.preContainer.alpha = 1;
            var tw = egret.Tween.get(ls.GameUILayer.preContainer);
            tw.wait(time * 1000 - 250);
            tw.to({ "alpha": 0 }, 250);
            setTimeout(function () {
                ls.GameUILayer.stage.removeChild(ls.GameUILayer.preContainer);
            }, time * 1000);
        };
        /** 暂停或者继续播放场景 */
        p.onScenePauseOrPlay = function (type) {
            var type = ls.eval_e(type);
            ls.EventSheetDecoder.execScenePauseOrPlay(type);
        };
        p.log = function (args) {
            ls.log(args);
        };
        p.addTo = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject addTo parameter type incorrect!!");
            this[$instanceVariables] += value;
            this.globalVariables[$instanceVariables] = this[$instanceVariables];
        };
        p.setBoolean = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject setBoolean parameter type incorrect!!");
            this[$instanceVariables] = (value == 1);
            this.globalVariables[$instanceVariables] = this[$instanceVariables];
        };
        p.setValue = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            this[$instanceVariables] = value;
            this.globalVariables[$instanceVariables] = this[$instanceVariables];
        };
        p.subtractFrom = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject subtractFrom parameter type incorrect!!");
            this[$instanceVariables] -= value;
            this.globalVariables[$instanceVariables] = this[$instanceVariables];
        };
        p.toogleBoolean = function ($instanceVariables) {
            this[$instanceVariables] = !this[$instanceVariables];
            this.globalVariables[$instanceVariables] = this[$instanceVariables];
        };
        //停止循环
        p.stopLoop = function () {
        };
        p.load = function ($url) {
        };
        //resatart scene ,that all data is reset
        p.restartScene = function () {
            ls.assert(ls.LayoutDecoder.currentLayoutName == null, "current layout name is null!");
            this.gotoScene(ls.LayoutDecoder.currentLayoutName);
        };
        p.resetGlobalVariables = function () {
        };
        p.scrollToObject = function ($object) {
            var firstObject = $object.getFirstPicked();
            if (firstObject) {
                ls.World.getInstance().sceneCamera.lookAtChar(firstObject);
            }
        };
        p.scrollToPos = function ($x, $y) {
            var x = ls.eval_e($x);
            var y = ls.eval_e($y);
            ls.World.getInstance().sceneCamera.lookAtPoint(new egret.Point(x, y));
        };
        p.scrollToXPos = function ($x) {
            var x = ls.eval_e($x);
            ls.World.getInstance().sceneCamera.lookAtX(x);
        };
        p.scrollToYPos = function ($y) {
            var y = ls.eval_e($y);
            ls.World.getInstance().sceneCamera.lookAtY(y);
        };
        ///////////////////////////////////////// 图层 ///////////////////////////////////////////////////////
        p.setLayerAngle = function (layer, angle) {
            var layer = ls.eval_e(layer);
            var angle = ls.eval_e(angle);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer)
                layerContainer.rotation = angle;
        };
        p.setLayerBgColor = function (layer, bgColor) {
            var layer = ls.eval_e(layer);
            var bgColor = ls.eval_e(bgColor);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer) {
                //
                var nums = layerContainer.numChildren;
                if (nums > 0) {
                    var minX = Number.MAX_VALUE;
                    var minY = Number.MAX_VALUE;
                    for (var i = 0; i < nums; i++) {
                        var s = layerContainer.getChildAt(i);
                        if (s.x - s.anchorOffsetX < minX)
                            minX = s.x - s.anchorOffsetX;
                        if (s.y - s.anchorOffsetY < minY)
                            minY = s.y - s.anchorOffsetY;
                    }
                }
                layerContainer.graphics.clear();
                layerContainer.graphics.beginFill(bgColor);
                layerContainer.graphics.drawRect(minX, minY, layerContainer.width, layerContainer.height);
                layerContainer.graphics.endFill();
            }
        };
        p.setLayerAlpha = function (layer, alpha) {
            var layer = ls.eval_e(layer);
            var alpha = ls.eval_e(alpha);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer)
                layerContainer.alpha = alpha;
        };
        p.setLayerParallax = function (layer, parallaxX, parallaxY) {
            var layer = ls.eval_e(layer);
            var parallaxX = ls.eval_e(parallaxX);
            var parallaxY = ls.eval_e(parallaxY);
            var objects = ls.World.getInstance().objectList;
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                if (object.index == layer) {
                    object.parallaxX = parallaxX;
                    object.parallaxY = parallaxY;
                }
            }
        };
        p.setLayerScale = function (layer, scaleX, scaleY) {
            var layer = ls.eval_e(layer);
            var scaleX = ls.eval_e(scaleX);
            var scaleY = ls.eval_e(scaleY);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer) {
                layerContainer.scaleX = scaleX / 100;
                layerContainer.scaleY = scaleY / 100;
            }
        };
        p.setLayerVisible = function (layer, visible) {
            var layer = ls.eval_e(layer);
            var visible = ls.eval_e(visible);
            var layerContainer = ls.LayerManager.getLayer(layer);
            if (layerContainer) {
                layerContainer.visible = (visible == 1);
            }
        };
        p.setObjectTimeScale = function (object, timeScale) {
            if (!object)
                return;
            timeScale = ls.eval_e(timeScale);
            if (timeScale < 0)
                timeScale = 0;
            var objects = ls.World.getInstance().objectHash[object.name];
            for (var i = 0; i < objects.length; i++) {
                objects[i].timeScale = timeScale;
            }
        };
        p.setTimeScale = function (timeScale) {
            this._timeScale = ls.eval_e(timeScale);
            if (this._timeScale < 0)
                this._timeScale = 0;
        };
        p.startDeviceOrientation = function (status) {
            var s = ls.eval_e(status);
            if (this._orientation) {
                if (s == 0)
                    this._orientation.stop();
                else
                    this._orientation.start();
            }
        };
        p.startDeviceGeolocation = function (status) {
            var s = ls.eval_e(status);
            if (this._gps) {
                if (s == 0)
                    this._gps.stop();
                else
                    this._gps.start(); //开始监听设备位置信息
            }
        };
        p.onLoadComplete = function () {
        };
        //获取数据        
        p.loadStorageFromJSON = function (key) {
            if (typeof localStorage === "undefined") {
                ls.assert(true, "当前浏览器不支持本地存储");
                return;
            }
            //检测键值为key是否有数据
            //重置缓存的条件实例数据
            var key = ls.eval_e(key);
            var getData = localStorage.getItem(key);
            if (getData == undefined || getData == null)
                return;
            var getDataObject = JSON.parse(getData);
            var objects = ls.World.getInstance().objectList;
            //遍历一下当前保存的对象
            for (var uid in getDataObject) {
                var instanceInfo = getDataObject[uid];
                var existInstance = null;
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    if (object.u_id == parseFloat(uid)) {
                        existInstance = object;
                        break;
                    }
                }
                if (existInstance) {
                    existInstance.loadFromJSON(instanceInfo);
                }
                else {
                    //不存在，就创建对象
                    if (instanceInfo.plugin) {
                        var pluginName = instanceInfo.plugin.slice(3);
                        var newInstance = ls.getInstanceByPluginClassName(pluginName);
                        //应用行为
                        newInstance.loadFromJSON(instanceInfo);
                        //newInstance.isDead = false;
                        newInstance.initialize();
                        ls.World.getInstance().addChild(newInstance);
                        ls.registerObject(newInstance.name, newInstance);
                        //替换所有条件的目标实例
                        for (var i = 0; i < ls.EventSheetDecoder.curSceneEvents.length; i++) {
                            var event = ls.EventSheetDecoder.curSceneEvents[i];
                            for (var j = 0; j < event.conditionBlocks.length; j++) {
                                var cb = event.conditionBlocks[j];
                                for (var k = 0; k < cb.conditions.length; k++) {
                                    var c = cb.conditions[k];
                                    if (c.callTarget instanceof ls.AIObject) {
                                        if (c.callTarget.u_id == newInstance.u_id) {
                                            c.callTarget = newInstance;
                                            if (cb.cs && cb.cs.instanceStatus) {
                                                if (cb.cs.instanceStatus[newInstance.u_id]) {
                                                    cb.cs.instanceStatus[newInstance.u_id].instance = newInstance;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //销毁目前没有的
            var nones = [];
            for (var i = 0; i < objects.length; i++) {
                var object = objects[i];
                if (getDataObject[object.u_id] == undefined) {
                    nones.push(object);
                }
            }
            for (var i = 0; i < nones.length; i++) {
                ls.World.getInstance().removeChild(nones[i]);
                nones[i].destory();
            }
            nones = [];
            //更新一下全局变量
            var globalVariablesData = getDataObject.globalVariables;
            for (var gname in globalVariablesData) {
                this[gname] = globalVariablesData[gname];
            }
            ls.EventSheetDecoder.instancesConditions = {};
            console.log("加载存档完毕！！");
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onGameDataLoadComplete, key));
        };
        //数据保存
        p.saveStorageToJSON = function (key) {
            if (typeof localStorage === "undefined") {
                ls.assert(true, "当前浏览器不支持本地存储");
                return;
            }
            //检测键值为key是否有数据
            var key = ls.eval_e(key);
            var dataObject = {};
            var objects = ls.World.getInstance().objectList;
            if (objects) {
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    dataObject[object.u_id] = object.saveToJSON();
                }
            }
            //存储全局变量
            dataObject.globalVariables = this.globalVariables;
            var resultStr = JSON.stringify(dataObject);
            localStorage.setItem(key, resultStr);
            console.log("保存存档完毕！！");
            console.log(resultStr);
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onGameDataSaveComplete, key));
        };
        /**销毁*/
        p.destory = function () {
        };
        d(p, "alpha"
            ////////////////////////////////////expressions///////////////////////////////////
            /**表示设备绕 Z 轴的角度，单位是 角度 范围是 0 到 360 */
            ,function () {
                return this._alpha;
            }
        );
        d(p, "beta"
            /**表示设备绕 X 轴的角度，单位是 角度 范围是 -180 到 180.这个值表示设备从前向后的旋转状态 */
            ,function () {
                return this._beta;
            }
        );
        d(p, "gamma"
            /**表示设备绕 Y 轴的角度，单位是 角度 范围是 -90 到 90.这个值表示设备从左到右的旋转状态 */
            ,function () {
                return this._gamma;
            }
        );
        d(p, "latitude"
            /**表示设备所在的纬度信息 */
            ,function () {
                return this._latitude;
            }
        );
        d(p, "longitude"
            /**表示设备所在的经度信息 */
            ,function () {
                return this._longitude;
            }
        );
        d(p, "altitude"
            /**表示设备所在的海拔信息 */
            ,function () {
                return this._altitude;
            }
        );
        d(p, "speed"
            /**表示设备所在的速度信息 */
            ,function () {
                return this._speed;
            }
        );
        d(p, "heading"
            /**表示设备正在前进的方向，单位是度。heading 表示从正北开始顺时针旋转到当前方向的角度，
             *比如正东是 90 度，正西是 270 度，如果 speed 是 0，heading 为 NaN。 */
            ,function () {
                return this._heading;
            }
        );
        d(p, "accuracy"
            /**经纬度的准确性，单位是米 */
            ,function () {
                return this._accuracy;
            }
        );
        d(p, "altitudeAccuracy"
            /**该位置海拔信息的准确性，单位是米，这个值有可能为 null*/
            ,function () {
                return this._altitudeAccuracy;
            }
        );
        d(p, "geolocationErrorMessage"
            /** 获取位置信息错误的错误信息*/
            ,function () {
                return this._geolocationErrorMessage;
            }
        );
        d(p, "geolocationErrorType"
            /* 获取位置信息错误的错误类型*/
            ,function () {
                return this._geolocationErrorType;
            }
        );
        return AISystem;
    }(ls.AIObject));
    ls.AISystem = AISystem;
    egret.registerClass(AISystem,'ls.AISystem');
    var RunOsEvent = (function (_super) {
        __extends(RunOsEvent, _super);
        function RunOsEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=RunOsEvent,p=c.prototype;
        return RunOsEvent;
    }(ls.BaseEvent));
    ls.RunOsEvent = RunOsEvent;
    egret.registerClass(RunOsEvent,'ls.RunOsEvent');
    var IsMobileEvent = (function (_super) {
        __extends(IsMobileEvent, _super);
        function IsMobileEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsMobileEvent,p=c.prototype;
        return IsMobileEvent;
    }(ls.BaseEvent));
    ls.IsMobileEvent = IsMobileEvent;
    egret.registerClass(IsMobileEvent,'ls.IsMobileEvent');
    var RuntimeTypeEvent = (function (_super) {
        __extends(RuntimeTypeEvent, _super);
        function RuntimeTypeEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=RuntimeTypeEvent,p=c.prototype;
        return RuntimeTypeEvent;
    }(ls.BaseEvent));
    ls.RuntimeTypeEvent = RuntimeTypeEvent;
    egret.registerClass(RuntimeTypeEvent,'ls.RuntimeTypeEvent');
    var RunLanguageEvent = (function (_super) {
        __extends(RunLanguageEvent, _super);
        function RunLanguageEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=RunLanguageEvent,p=c.prototype;
        return RunLanguageEvent;
    }(ls.BaseEvent));
    ls.RunLanguageEvent = RunLanguageEvent;
    egret.registerClass(RunLanguageEvent,'ls.RunLanguageEvent');
    var OnGeolocationPermissionDeniedEvent = (function (_super) {
        __extends(OnGeolocationPermissionDeniedEvent, _super);
        function OnGeolocationPermissionDeniedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnGeolocationPermissionDeniedEvent,p=c.prototype;
        return OnGeolocationPermissionDeniedEvent;
    }(ls.BaseEvent));
    ls.OnGeolocationPermissionDeniedEvent = OnGeolocationPermissionDeniedEvent;
    egret.registerClass(OnGeolocationPermissionDeniedEvent,'ls.OnGeolocationPermissionDeniedEvent');
    var OnGeolocationFailEvent = (function (_super) {
        __extends(OnGeolocationFailEvent, _super);
        function OnGeolocationFailEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnGeolocationFailEvent,p=c.prototype;
        return OnGeolocationFailEvent;
    }(ls.BaseEvent));
    ls.OnGeolocationFailEvent = OnGeolocationFailEvent;
    egret.registerClass(OnGeolocationFailEvent,'ls.OnGeolocationFailEvent');
    var OnDeviceShakeEvent = (function (_super) {
        __extends(OnDeviceShakeEvent, _super);
        function OnDeviceShakeEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnDeviceShakeEvent,p=c.prototype;
        return OnDeviceShakeEvent;
    }(ls.BaseEvent));
    ls.OnDeviceShakeEvent = OnDeviceShakeEvent;
    egret.registerClass(OnDeviceShakeEvent,'ls.OnDeviceShakeEvent');
    var OnDevicePositionChangedEvent = (function (_super) {
        __extends(OnDevicePositionChangedEvent, _super);
        function OnDevicePositionChangedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnDevicePositionChangedEvent,p=c.prototype;
        return OnDevicePositionChangedEvent;
    }(ls.BaseEvent));
    ls.OnDevicePositionChangedEvent = OnDevicePositionChangedEvent;
    egret.registerClass(OnDevicePositionChangedEvent,'ls.OnDevicePositionChangedEvent');
    var onDeviceOrientationChangedEvent = (function (_super) {
        __extends(onDeviceOrientationChangedEvent, _super);
        function onDeviceOrientationChangedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=onDeviceOrientationChangedEvent,p=c.prototype;
        return onDeviceOrientationChangedEvent;
    }(ls.BaseEvent));
    ls.onDeviceOrientationChangedEvent = onDeviceOrientationChangedEvent;
    egret.registerClass(onDeviceOrientationChangedEvent,'ls.onDeviceOrientationChangedEvent');
    var EveryTickEvent = (function (_super) {
        __extends(EveryTickEvent, _super);
        function EveryTickEvent() {
            _super.call(this);
        }
        var d = __define,c=EveryTickEvent,p=c.prototype;
        return EveryTickEvent;
    }(ls.BaseEvent));
    ls.EveryTickEvent = EveryTickEvent;
    egret.registerClass(EveryTickEvent,'ls.EveryTickEvent');
    var EveryXSecondsEvent = (function (_super) {
        __extends(EveryXSecondsEvent, _super);
        function EveryXSecondsEvent() {
            _super.call(this);
            this.interval = 0;
            this.oldTime = 0;
            this.curTime = 0;
        }
        var d = __define,c=EveryXSecondsEvent,p=c.prototype;
        return EveryXSecondsEvent;
    }(ls.BaseEvent));
    ls.EveryXSecondsEvent = EveryXSecondsEvent;
    egret.registerClass(EveryXSecondsEvent,'ls.EveryXSecondsEvent');
    var TestRegexEvent = (function (_super) {
        __extends(TestRegexEvent, _super);
        function TestRegexEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=TestRegexEvent,p=c.prototype;
        return TestRegexEvent;
    }(ls.BaseEvent));
    ls.TestRegexEvent = TestRegexEvent;
    egret.registerClass(TestRegexEvent,'ls.TestRegexEvent');
    var OnSceneInitCompleteEvent = (function (_super) {
        __extends(OnSceneInitCompleteEvent, _super);
        function OnSceneInitCompleteEvent() {
            _super.call(this);
        }
        var d = __define,c=OnSceneInitCompleteEvent,p=c.prototype;
        return OnSceneInitCompleteEvent;
    }(ls.BaseEvent));
    ls.OnSceneInitCompleteEvent = OnSceneInitCompleteEvent;
    egret.registerClass(OnSceneInitCompleteEvent,'ls.OnSceneInitCompleteEvent');
    var OnSceneEndCompleteEvent = (function (_super) {
        __extends(OnSceneEndCompleteEvent, _super);
        function OnSceneEndCompleteEvent() {
            _super.call(this);
        }
        var d = __define,c=OnSceneEndCompleteEvent,p=c.prototype;
        return OnSceneEndCompleteEvent;
    }(ls.BaseEvent));
    ls.OnSceneEndCompleteEvent = OnSceneEndCompleteEvent;
    egret.registerClass(OnSceneEndCompleteEvent,'ls.OnSceneEndCompleteEvent');
    var IsValueTypeEvent = (function (_super) {
        __extends(IsValueTypeEvent, _super);
        function IsValueTypeEvent() {
            _super.call(this);
        }
        var d = __define,c=IsValueTypeEvent,p=c.prototype;
        return IsValueTypeEvent;
    }(ls.BaseEvent));
    ls.IsValueTypeEvent = IsValueTypeEvent;
    egret.registerClass(IsValueTypeEvent,'ls.IsValueTypeEvent');
    var ObjectUIDExistEvent = (function (_super) {
        __extends(ObjectUIDExistEvent, _super);
        function ObjectUIDExistEvent() {
            _super.call(this);
            this.UID = 0;
        }
        var d = __define,c=ObjectUIDExistEvent,p=c.prototype;
        return ObjectUIDExistEvent;
    }(ls.BaseEvent));
    ls.ObjectUIDExistEvent = ObjectUIDExistEvent;
    egret.registerClass(ObjectUIDExistEvent,'ls.ObjectUIDExistEvent');
    var PickRandomInstanceEvent = (function (_super) {
        __extends(PickRandomInstanceEvent, _super);
        function PickRandomInstanceEvent() {
            _super.call(this);
        }
        var d = __define,c=PickRandomInstanceEvent,p=c.prototype;
        return PickRandomInstanceEvent;
    }(ls.BaseEvent));
    ls.PickRandomInstanceEvent = PickRandomInstanceEvent;
    egret.registerClass(PickRandomInstanceEvent,'ls.PickRandomInstanceEvent');
    var PickAllEvent = (function (_super) {
        __extends(PickAllEvent, _super);
        function PickAllEvent() {
            _super.call(this);
        }
        var d = __define,c=PickAllEvent,p=c.prototype;
        return PickAllEvent;
    }(ls.BaseEvent));
    ls.PickAllEvent = PickAllEvent;
    egret.registerClass(PickAllEvent,'ls.PickAllEvent');
    var PickByComparisionEvent = (function (_super) {
        __extends(PickByComparisionEvent, _super);
        function PickByComparisionEvent() {
            _super.call(this);
        }
        var d = __define,c=PickByComparisionEvent,p=c.prototype;
        return PickByComparisionEvent;
    }(ls.BaseEvent));
    ls.PickByComparisionEvent = PickByComparisionEvent;
    egret.registerClass(PickByComparisionEvent,'ls.PickByComparisionEvent');
    var PickInstanceByIndexEvent = (function (_super) {
        __extends(PickInstanceByIndexEvent, _super);
        function PickInstanceByIndexEvent() {
            _super.call(this);
        }
        var d = __define,c=PickInstanceByIndexEvent,p=c.prototype;
        return PickInstanceByIndexEvent;
    }(ls.BaseEvent));
    ls.PickInstanceByIndexEvent = PickInstanceByIndexEvent;
    egret.registerClass(PickInstanceByIndexEvent,'ls.PickInstanceByIndexEvent');
    var PickInstanecOverlappingEvent = (function (_super) {
        __extends(PickInstanecOverlappingEvent, _super);
        function PickInstanecOverlappingEvent() {
            _super.call(this);
        }
        var d = __define,c=PickInstanecOverlappingEvent,p=c.prototype;
        return PickInstanecOverlappingEvent;
    }(ls.BaseEvent));
    ls.PickInstanecOverlappingEvent = PickInstanecOverlappingEvent;
    egret.registerClass(PickInstanecOverlappingEvent,'ls.PickInstanecOverlappingEvent');
    var CompareVariableEvent = (function (_super) {
        __extends(CompareVariableEvent, _super);
        function CompareVariableEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareVariableEvent,p=c.prototype;
        return CompareVariableEvent;
    }(ls.BaseEvent));
    ls.CompareVariableEvent = CompareVariableEvent;
    egret.registerClass(CompareVariableEvent,'ls.CompareVariableEvent');
    // export class E_loader_Config_Loader extends lionfw.ModuleEvent {
    //     layoutName: string;
    // }
    var ForEachOrderEvent = (function (_super) {
        __extends(ForEachOrderEvent, _super);
        function ForEachOrderEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=ForEachOrderEvent,p=c.prototype;
        return ForEachOrderEvent;
    }(ls.BaseEvent));
    ls.ForEachOrderEvent = ForEachOrderEvent;
    egret.registerClass(ForEachOrderEvent,'ls.ForEachOrderEvent');
    var ForEvent = (function (_super) {
        __extends(ForEvent, _super);
        function ForEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=ForEvent,p=c.prototype;
        return ForEvent;
    }(ls.BaseEvent));
    ls.ForEvent = ForEvent;
    egret.registerClass(ForEvent,'ls.ForEvent');
    //当读取存档中的游戏数据完成时    
    var OnGameDataLoadCompleteEvent = (function (_super) {
        __extends(OnGameDataLoadCompleteEvent, _super);
        function OnGameDataLoadCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnGameDataLoadCompleteEvent,p=c.prototype;
        return OnGameDataLoadCompleteEvent;
    }(ls.BaseEvent));
    ls.OnGameDataLoadCompleteEvent = OnGameDataLoadCompleteEvent;
    egret.registerClass(OnGameDataLoadCompleteEvent,'ls.OnGameDataLoadCompleteEvent');
    //当游戏数据保存完成时    
    var OnGameDataSaveCompleteEvent = (function (_super) {
        __extends(OnGameDataSaveCompleteEvent, _super);
        function OnGameDataSaveCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnGameDataSaveCompleteEvent,p=c.prototype;
        return OnGameDataSaveCompleteEvent;
    }(ls.BaseEvent));
    ls.OnGameDataSaveCompleteEvent = OnGameDataSaveCompleteEvent;
    egret.registerClass(OnGameDataSaveCompleteEvent,'ls.OnGameDataSaveCompleteEvent');
    var OnLayerIsExistEvent = (function (_super) {
        __extends(OnLayerIsExistEvent, _super);
        function OnLayerIsExistEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLayerIsExistEvent,p=c.prototype;
        return OnLayerIsExistEvent;
    }(ls.BaseEvent));
    ls.OnLayerIsExistEvent = OnLayerIsExistEvent;
    egret.registerClass(OnLayerIsExistEvent,'ls.OnLayerIsExistEvent');
    var OnLayerIsVisibleEvent = (function (_super) {
        __extends(OnLayerIsVisibleEvent, _super);
        function OnLayerIsVisibleEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLayerIsVisibleEvent,p=c.prototype;
        return OnLayerIsVisibleEvent;
    }(ls.BaseEvent));
    ls.OnLayerIsVisibleEvent = OnLayerIsVisibleEvent;
    egret.registerClass(OnLayerIsVisibleEvent,'ls.OnLayerIsVisibleEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AISystem.js.map
var ls;
(function (ls) {
    var Trigger = (function () {
        function Trigger() {
        }
        var d = __define,c=Trigger,p=c.prototype;
        Trigger.register = function (target) {
            target.addEventListener(ls.TriggerEvent.TRIGGER, this.onTrigger, this);
        };
        Trigger.removeTrigger = function (target) {
            target.removeEventListener(ls.TriggerEvent.TRIGGER, this.onTrigger, this);
        };
        Trigger.removeAllTriggers = function () {
            for (var i = 0, len = ls.World.getInstance().objectList.length; i < len; i++)
                this.removeTrigger(ls.World.getInstance().objectList[i]);
        };
        Trigger.onTrigger = function (event) {
            var disableDataEvents = ls.AISystem.instance.disableDataEvents;
            //检测是否屏蔽触发事件
            //时间复杂度O(n),以前的时间复杂度为O(n3)
            var triggerConditions = ls.EventSheetDecoder.triggerConditions;
            //通知触发条件执行的目标（可能是普通实例，也可能是行为实例）
            var target = event.target;
            var isBehaviorInstance = target instanceof ls.BaseBehavior;
            for (var i = 0; i < triggerConditions.length; i++) {
                //可能存在多个同名的条件，因为不同的事件及条件块中可能会编辑同样的名字的条件
                //每个条件都有自己独立的计算
                var condition = triggerConditions[i];
                if (disableDataEvents[condition.event.index + 1] == undefined) {
                    if (condition.callCondition == event.triggerCondition) {
                        //这里先分类成family与普通
                        if (condition.isFamily) {
                            if (isBehaviorInstance) {
                                var searchInst = null;
                                var targets = ls.EventSheetDecoder.curFamilys[condition.targetName].insts;
                                if (targets) {
                                    for (var s = 0; s < targets.length; s++) {
                                        var si = targets[s];
                                        if (si.name == target.inst.name) {
                                            searchInst = si;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    ls.assert(true, "组触发条件目标查找失败,组名：" + condition.targetName);
                                }
                                //组行为
                                if (searchInst) {
                                    var familyVo = ls.EventSheetDecoder.curFamilys[condition.targetName];
                                    if (event.triggerData) {
                                        //比较触发条件的参数是否一致，只有一致，才会执行触发
                                        var paramsInstance = condition.paramsInstance;
                                        var data = paramsInstance.data;
                                        var childrens = data.children;
                                        var isFind = false;
                                        if (childrens && childrens.length > 0) {
                                            for (var j = 0; j < childrens.length; j++) {
                                                var o = childrens[j];
                                                if (event.triggerData == o["$value"]) {
                                                    isFind = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (isFind) {
                                            var triggerInfo = { triggerTargets: [searchInst], behaviorTarget: target, compareCondition: condition, familyVo: familyVo };
                                            ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                        }
                                    }
                                    else {
                                        var triggerInfo = { triggerTargets: [searchInst], behaviorTarget: target, compareCondition: condition, familyVo: familyVo };
                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                    }
                                }
                            }
                            else {
                                var searchInst = null;
                                var targets = ls.EventSheetDecoder.curFamilys[condition.targetName].insts;
                                if (targets) {
                                    for (var s = 0; s < targets.length; s++) {
                                        var si = targets[s];
                                        if (si.name == target.name) {
                                            searchInst = si;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    ls.assert(true, "组触发条件目标查找失败,组名：" + condition.targetName);
                                }
                                if (searchInst) {
                                    if (event.triggerData) {
                                        //比较触发条件的参数是否一致，只有一致，才会执行触发
                                        var paramsInstance = condition.paramsInstance;
                                        var data = paramsInstance.data;
                                        var childrens = data.children;
                                        var isFind = false;
                                        if (childrens && childrens.length > 0) {
                                            for (var j = 0; j < childrens.length; j++) {
                                                var o = childrens[j];
                                                if (condition.callConditionName == "onCollisionWithOtherObject") {
                                                    if (event.triggerData.name == o["$value"]) {
                                                        isFind = true;
                                                        var triggerInfo = { triggerTargets: [searchInst, event.triggerData], compareCondition: condition };
                                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                        break;
                                                    }
                                                }
                                                else {
                                                    if (event.triggerData == o["$value"]) {
                                                        isFind = true;
                                                        var triggerInfo = { triggerTargets: [searchInst], compareCondition: condition };
                                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        var triggerInfo = { triggerTargets: [searchInst], compareCondition: condition };
                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                    }
                                }
                            }
                        }
                        else {
                            if (isBehaviorInstance) {
                                if (condition.callTarget.name == target.name && condition.targetName == target.inst.name) {
                                    if (event.triggerData) {
                                        //比较触发条件的参数是否一致，只有一致，才会执行触发
                                        var paramsInstance = condition.paramsInstance;
                                        var data = paramsInstance.data;
                                        var childrens = data.children;
                                        var isFind = false;
                                        if (childrens && childrens.length > 0) {
                                            for (var j = 0; j < childrens.length; j++) {
                                                var o = childrens[j];
                                                if (event.triggerData == o["$value"]) {
                                                    isFind = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (isFind) {
                                            var triggerInfo = { triggerTargets: [target.inst], compareCondition: condition, behaviorTarget: target };
                                            ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                        }
                                    }
                                    else {
                                        var triggerInfo = { triggerTargets: [target.inst], compareCondition: condition, behaviorTarget: target };
                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                    }
                                }
                            }
                            else {
                                var searchInst = null;
                                if (condition.targetName == target.name)
                                    searchInst = target;
                                if (searchInst) {
                                    if (event.triggerData) {
                                        //比较触发条件的参数是否一致，只有一致，才会执行触发
                                        var paramsInstance = condition.paramsInstance;
                                        //事件也可能为family，因此，需要作特殊处理
                                        var data = paramsInstance.data;
                                        var childrens = data.children;
                                        var isFind = false;
                                        if (childrens && childrens.length > 0) {
                                            for (var j = 0; j < childrens.length; j++) {
                                                var o = childrens[j];
                                                if (condition.callConditionName == "onCollisionWithOtherObject") {
                                                    if (paramsInstance.isFamily) {
                                                        var familyVo = ls.EventSheetDecoder.curFamilys[o["$value"]];
                                                        if (familyVo.insts) {
                                                            for (var fk = 0; fk < familyVo.insts.length; fk++) {
                                                                if (event.triggerData.name == familyVo.insts[fk].name) {
                                                                    isFind = true;
                                                                    var triggerInfo = { triggerTargets: [searchInst, event.triggerData], compareCondition: condition };
                                                                    ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (event.triggerData.name == o["$value"]) {
                                                            isFind = true;
                                                            var triggerInfo = { triggerTargets: [searchInst, event.triggerData], compareCondition: condition };
                                                            ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                            break;
                                                        }
                                                    }
                                                }
                                                else {
                                                    if (event.triggerData == o["$value"]) {
                                                        isFind = true;
                                                        var triggerInfo = { triggerTargets: [searchInst], compareCondition: condition };
                                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        var triggerInfo = { triggerTargets: [searchInst], compareCondition: condition };
                                        ls.EventSheetDecoder.execEvent(condition.event, triggerInfo);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        return Trigger;
    }());
    ls.Trigger = Trigger;
    egret.registerClass(Trigger,'ls.Trigger');
})(ls || (ls = {}));
//# sourceMappingURL=Trigger.js.map
var ls;
(function (ls) {
    var Base64 = (function () {
        function Base64() {
        }
        var d = __define,c=Base64,p=c.prototype;
        d(Base64, "nativeBase64"
            ,function () {
                return (typeof (window.atob) === "function");
            }
        );
        Base64.decode = function (input) {
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            if (this.nativeBase64) {
                return window.atob(input);
            }
            else {
                var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
                while (i < input.length) {
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output.push(String.fromCharCode(chr1));
                    if (enc3 !== 64) {
                        output.push(String.fromCharCode(chr2));
                    }
                    if (enc4 !== 64) {
                        output.push(String.fromCharCode(chr3));
                    }
                }
                output = output.join("");
                return output;
            }
        };
        Base64.encode = function (input) {
            input = input.replace(/\r\n/g, "\n");
            if (this.nativeBase64) {
                window.btoa(input);
            }
            else {
                var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    }
                    else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output.push(this._keyStr.charAt(enc1));
                    output.push(this._keyStr.charAt(enc2));
                    output.push(this._keyStr.charAt(enc3));
                    output.push(this._keyStr.charAt(enc4));
                }
                output = output.join("");
                return output;
            }
        };
        Base64.decodeBase64AsArray = function (input, bytes) {
            bytes = bytes || 1;
            var dec = Base64.decode(input), i, j, len;
            var ar = new Uint32Array(dec.length / bytes);
            for (i = 0, len = dec.length / bytes; i < len; i++) {
                ar[i] = 0;
                for (j = bytes - 1; j >= 0; --j) {
                    ar[i] += dec.charCodeAt((i * bytes) + j) << (j << 3);
                }
            }
            return ar;
        };
        Base64.decompress = function (data, decoded, compression) {
            ls.assert(true, "GZIP/ZLIB compressed TMX Tile Map not supported!");
        };
        Base64.decodeCSV = function (input) {
            var entries = input.replace("\n", "").trim().split(",");
            var result = [];
            for (var i = 0; i < entries.length; i++) {
                result.push(+entries[i]);
            }
            return result;
        };
        Base64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        return Base64;
    }());
    ls.Base64 = Base64;
    egret.registerClass(Base64,'ls.Base64');
})(ls || (ls = {}));
//# sourceMappingURL=Base64.js.map
var ls;
(function (ls) {
    var CollisionUtils = (function () {
        function CollisionUtils() {
        }
        var d = __define,c=CollisionUtils,p=c.prototype;
        //点与矩形碰撞
        CollisionUtils.isCollision = function (x1, y1, x2, y2, w, h) {
            return x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h;
        };
        //矩形与矩形碰撞
        CollisionUtils.isCollsionWithRect = function (x1, y1, w1, h1, x2, y2, w2, h2) {
            if (x1 >= x2 && x1 >= x2 + w2)
                return false;
            else if (x1 <= x2 && x1 + w1 <= x2)
                return false;
            else if (y1 >= y2 && y1 >= y2 + h2)
                return false;
            else if (y1 <= y2 && y1 + h1 <= y2)
                return false;
            return true;
        };
        //点与圆碰撞
        CollisionUtils.isCollisionPointWithCircle = function (x1, y1, x2, y2, r) {
            return (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))) <= r;
        };
        //圆与圆碰撞
        CollisionUtils.isCollisionCircleWithCircle = function (x1, y1, x2, y2, r1, r2) {
            return (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))) <= (r1 + r2);
        };
        //矩形与圆碰撞
        CollisionUtils.isCollisionRectWithCircle = function (x1, y1, w1, h1, x2, y2, r) {
            var hw = w1 * 0.5;
            var hh = h1 * 0.5;
            var rx = x2 - (x1 + hw);
            var ry = y2 - (y1 + hh);
            var dx = Math.min(rx, hw);
            var dx1 = Math.max(dx, -hw);
            var dy = Math.min(ry, hh);
            var dy1 = Math.max(dy, -hh);
            return (dx1 - rx) * (dx1 - rx) + (dy1 - ry) * (dy1 - ry) <= r * r;
        };
        //点与任意凸多边形碰撞检测
        CollisionUtils.checkPointCollideShape = function (p, shppos, szpt) {
            var n = szpt.length;
            if (n < 3)
                return false;
            var i = 0;
            var clonept = [];
            for (i = 0; i < szpt.length; i++) {
                var vp = new egret.Point(szpt[i].x, szpt[i].y);
                clonept.push(vp);
            }
            //把图形的顶点坐标转换到所在坐标系（如果坐标系不同需另处理，这里只是简单实例）
            for (i = 0; i < clonept.length; i++) {
                clonept[i].x += shppos.x;
                clonept[i].y += shppos.y;
            }
            //主要原理为右手法则，逆时针向量积为正，顺时针为负
            //首先判断起点、第二点与P向量积，如果大于零，说明在外面
            if (this.vectorCrossPoint(clonept[0], p, clonept[1]) > 0)
                return false;
            //首先判断起点、倒数第二点与P向量积，如果小于零，说明在外面
            if (this.vectorCrossPoint(clonept[0], p, clonept[n - 1]) < 0)
                return false;
            //以上两个判断通过了，说明检查点在多边形起点相邻两边的开口方向
            //从第二点和倒数第二点开始收缩
            i = 2;
            var j = n - 1;
            var line = -1;
            //这里采用二分法逐渐缩小范围来判定点的位置
            while (i <= j) {
                //找到当前等待队列中的点的中点
                var mid = (i + j) >> 1;
                //如果点在起点与中点之间，则把终点设为中点的前一点，否则把起点设置为中点的下一点
                if (this.vectorCrossPoint(clonept[0], p, clonept[mid]) > 0) {
                    line = mid;
                    j = mid - 1;
                }
                else
                    i = mid + 1;
            }
            if (line < 0)
                return false;
            //找到了紧挨着点的两个夹边，此时，如果在多边形内，则与夹边的积必然小于零
            return this.vectorCrossPoint(clonept[line - 1], p, clonept[line]) < 0;
        };
        CollisionUtils.vectorCrossPoint = function (p0, p1, p2) {
            return (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
        };
        //不规则图形的碰撞检测
        CollisionUtils.hitTest = function (lines1, lines2) {
            for (var i = 0; i < lines1.length; i++) {
                for (var j = 0; j < lines2.length; j++) {
                    var line1 = lines1[i];
                    var line2 = lines2[j];
                    if (this.simpleLineTest(line1, line2))
                        return true;
                }
            }
            return false;
        };
        CollisionUtils.simpleLineTest = function (line1, line2) {
            var l1p1x = line1.p1x;
            var l1p1y = line1.p1y;
            var l1p2x = line1.p2x;
            var l1p2y = line1.p2y;
            var l2p1x = line2.p1x;
            var l2p1y = line2.p1y;
            var l2p2x = line2.p2x;
            var l2p2y = line2.p2y;
            var l1p1 = (l1p2x - l1p1x) * (l2p1y - l1p1y) - (l2p1x - l1p1x) * (l1p2y - l1p1y);
            var l1p2 = (l1p2x - l1p1x) * (l2p2y - l1p1y) - (l2p2x - l1p1x) * (l1p2y - l1p1y);
            var l2p1 = (l2p2x - l2p1x) * (l1p1y - l2p1y) - (l1p1x - l2p1x) * (l2p2y - l2p1y);
            var l2p2 = (l2p2x - l2p1x) * (l1p2y - l2p1y) - (l1p2x - l2p1x) * (l2p2y - l2p1y);
            return (l1p1 * l1p2 <= 0 && l2p1 * l2p2 <= 0);
        };
        /**检测矩形1与矩形2是否相交 */
        CollisionUtils.intersects_rect = function (rect1, rect2) {
            return !(rect2.right < rect1.left || rect2.bottom < rect1.top || rect2.left > rect1.right || rect2.top > rect1.bottom);
        };
        /** 多边形相交 */
        CollisionUtils.intersects_poly = function (a, b, offx, offy) {
            return false;
        };
        CollisionUtils.testOverlap = function (a, b) {
            if (!a || !b || a === b)
                return false;
            if (!(a.solidEnabeld || a.collision))
                return false;
            if (!(b.solidEnabeld || b.collision))
                return false;
            return ls.Collision.checkCollision(a, b);
        };
        CollisionUtils.getLines = function (object) {
            var ra = ls.MathUtils.toRadian(object.angle);
            var m1 = new egret.Matrix();
            m1.translate(-object.width / 2, -object.height / 2);
            m1.rotate(ra);
            var m2 = new egret.Matrix();
            m2.translate(object.width / 2, -object.height / 2);
            m2.rotate(ra);
            var m3 = new egret.Matrix();
            m3.translate(object.width / 2, object.height / 2);
            m3.rotate(ra);
            var m4 = new egret.Matrix();
            m4.translate(-object.width / 2, object.height / 2);
            m4.rotate(ra);
            var lines = [];
            var line1 = {
                p1x: m1.tx + object.x,
                p1y: m1.ty + object.y,
                p2x: m2.tx + object.x,
                p2y: m2.tx + object.y,
            };
            var line2 = {
                p1x: m2.tx + object.x,
                p1y: m2.ty + object.y,
                p2x: m3.tx + object.x,
                p2y: m3.ty + object.y
            };
            var line3 = {
                p1x: m3.tx + object.x,
                p1y: m3.ty + object.y,
                p2x: m4.tx + object.x,
                p2y: m4.ty + object.y
            };
            var line4 = {
                p1x: m4.tx + object.x,
                p1y: m4.ty + object.y,
                p2x: m1.tx + object.x,
                p2y: m1.ty + object.y
            };
            lines.push(line1, line2, line3, line4);
            return lines;
        };
        CollisionUtils.getSolidCollisionCandidates = function (layer, bbox, candidates) {
        };
        /**检测与绑定刚体行为的对象碰撞 */
        CollisionUtils.testOverlapSolid = function (inst) {
            var objects = ls.World.getInstance().objectList;
            for (var i = 0; i < objects.length; i++) {
                var instance = objects[i];
                if (instance != inst && instance.solidEnabeld) {
                    if (this.testOverlap(inst, instance)) {
                        return instance;
                    }
                }
            }
            return null;
        };
        //检测是否具备穿透
        CollisionUtils.testOverlapJumpThru = function (inst, all) {
            if (all === void 0) { all = false; }
            var objects = ls.World.getInstance().objectList;
            var ret = null;
            if (all) {
                ret = [];
            }
            for (var i = 0, len = objects.length; i < len; i++) {
                var instance = objects[i];
                if (instance.jumpthruEnabled) {
                    if (this.testOverlap(inst, instance)) {
                        if (all)
                            ret.push(instance);
                        else {
                            return [instance];
                        }
                    }
                }
            }
            return ret;
        };
        CollisionUtils.pushInFractional = function (inst, xdir, ydir, obj, limit) {
            var frac;
            var divisor = 2;
            var forward = false;
            var overlapping = false;
            var bestx = inst.x;
            var besty = inst.y;
            while (divisor <= limit) {
                frac = 1 / divisor;
                divisor *= 2;
                inst.x += xdir * frac * (forward ? 1 : -1);
                inst.y += ydir * frac * (forward ? 1 : -1);
                if (this.testOverlap(inst, obj)) {
                    forward = true;
                    overlapping = true;
                }
                else {
                    forward = false;
                    overlapping = false;
                    bestx = inst.x;
                    besty = inst.y;
                }
            }
            if (overlapping) {
                inst.x = bestx;
                inst.y = besty;
            }
        };
        //如果对象与绑定solid行为的对象列表有碰撞，尝试则将其反向移动，移动多少与dist有关，结果不一定能够移动出来
        CollisionUtils.pushOutSolid = function (inst, xdir, ydir, dist, include_jumpthrus, specific_jumpthru) {
            if (dist === void 0) { dist = 0; }
            if (include_jumpthrus === void 0) { include_jumpthrus = false; }
            if (specific_jumpthru === void 0) { specific_jumpthru = null; }
            var push_dist = dist || 50;
            var oldx = inst.x;
            var oldy = inst.y;
            var last_overlapped = null;
            var secondlast_overlapped = null;
            //每次在其方向上移动1像素，因此需要遍历
            for (var i = 0; i < push_dist; i++) {
                inst.x = oldx + xdir * i;
                inst.y = oldy + ydir * i;
                var isOverlap = this.testOverlap(inst, last_overlapped);
                if (isOverlap)
                    continue;
                //检测是否与不同的solid对象重叠
                last_overlapped = this.testOverlapSolid(inst);
                if (last_overlapped)
                    secondlast_overlapped = last_overlapped;
                else {
                    //如果包含jumpthrus，那么，还要进行Jumpthrus的检测
                    if (include_jumpthrus) {
                        if (specific_jumpthru)
                            last_overlapped = (this.testOverlap(inst, specific_jumpthru) ? specific_jumpthru : null);
                        else
                            last_overlapped = this.testOverlapJumpThru(inst);
                        if (last_overlapped)
                            secondlast_overlapped = last_overlapped;
                    }
                    if (!last_overlapped) {
                        if (secondlast_overlapped)
                            this.pushInFractional(inst, xdir, ydir, secondlast_overlapped, 16);
                        return true;
                    }
                }
            }
            inst.x = oldx;
            inst.y = oldy;
            return false;
        };
        //将对象移动附近的位置
        CollisionUtils.pushOutSolidNearest = function (inst, maxDist) {
            var max_dist = ls.is_undefined(max_dist) ? 100 : max_dist;
            var dist = 0;
            var oldx = inst.x;
            var oldy = inst.y;
            var dir = 0;
            var dx = 0;
            var dy = 0;
            var last_overlapped = this.testOverlapSolid(inst);
            if (!last_overlapped)
                return true;
            //8方向螺旋扫描
            while (dist <= max_dist) {
                switch (dir) {
                    case 0:
                        dx = 0;
                        dy = -1;
                        dist++;
                        break;
                    case 1:
                        dx = 1;
                        dy = -1;
                        break;
                    case 2:
                        dx = 1;
                        dy = 0;
                        break;
                    case 3:
                        dx = 1;
                        dy = 1;
                        break;
                    case 4:
                        dx = 0;
                        dy = 1;
                        break;
                    case 5:
                        dx = -1;
                        dy = 1;
                        break;
                    case 6:
                        dx = -1;
                        dy = 0;
                        break;
                    case 7:
                        dx = -1;
                        dy = -1;
                        break;
                }
                dir = (dir + 1) % 8;
                inst.x = Math.floor(oldx + dx * dist);
                inst.y = Math.floor(oldy + dy * dist);
                if (!this.testOverlap(inst, last_overlapped)) {
                    last_overlapped = this.testOverlapSolid(inst);
                    if (!last_overlapped)
                        return true;
                }
            }
            inst.x = oldx;
            inst.y = oldy;
            return false;
        };
        CollisionUtils.registerCollision = function (a, b) {
            if (!a.collision || !b.collision)
                return;
            this.registered_collisions.push([a, b]);
        };
        CollisionUtils.checkRegisteredCollision = function (a, b) {
            for (var i = 0; i < this.registered_collisions.length; i++) {
                var data = this.registered_collisions[i];
                if ((data[0] == a && data[1] == b) || (data[0] == b && data[1] == a))
                    return true;
            }
            return false;
        };
        CollisionUtils.calculateSolidBounceAngle = function (inst, startx, starty, obj) {
            if (obj === void 0) { obj = null; }
            var objx = inst.x;
            var objy = inst.y;
            var radius = Math.max(10, ls.distance(startx, starty, objx, objy));
            var startangle = ls.MathUtils.radianTo(startx, starty, objx, objy);
            var firstsolid = obj || this.testOverlapSolid(inst);
            if (!firstsolid)
                return ls.MathUtils.clampRadian(startangle + Math.PI);
            var cursolid = firstsolid;
            var i, curangle, anticlockwise_free_angle, clockwise_free_angle;
            var increment = ls.MathUtils.toRadian(5);
            for (i = 1; i < 36; i++) {
                curangle = startangle - i * increment;
                inst.x = startx + Math.cos(curangle) * radius;
                inst.y = starty + Math.sin(curangle) * radius;
                if (!this.testOverlap(inst, cursolid)) {
                    cursolid = obj ? null : this.testOverlapSolid(inst);
                    if (!cursolid) {
                        anticlockwise_free_angle = curangle;
                        break;
                    }
                }
            }
            if (i === 36)
                anticlockwise_free_angle = ls.MathUtils.clampRadian(startangle + Math.PI);
            var cursolid = firstsolid;
            for (i = 1; i < 36; i++) {
                curangle = startangle + i * increment;
                inst.x = startx + Math.cos(curangle) * radius;
                inst.y = starty + Math.sin(curangle) * radius;
                if (!this.testOverlap(inst, cursolid)) {
                    cursolid = obj ? null : this.testOverlapSolid(inst);
                    if (!cursolid) {
                        clockwise_free_angle = curangle;
                        break;
                    }
                }
            }
            if (i === 36)
                clockwise_free_angle = ls.MathUtils.clampRadian(startangle + Math.PI);
            inst.x = objx;
            inst.y = objy;
            if (clockwise_free_angle === anticlockwise_free_angle)
                return clockwise_free_angle;
            var half_diff = ls.MathUtils.angleDiff(clockwise_free_angle, anticlockwise_free_angle) / 2;
            var normal;
            if (ls.MathUtils.angleClockWise(clockwise_free_angle, anticlockwise_free_angle)) {
                normal = ls.MathUtils.clampRadian(anticlockwise_free_angle + half_diff + Math.PI);
            }
            else {
                normal = ls.MathUtils.clampRadian(clockwise_free_angle + half_diff);
            }
            var vx = Math.cos(startangle);
            var vy = Math.sin(startangle);
            var nx = Math.cos(normal);
            var ny = Math.sin(normal);
            var v_dot_n = vx * nx + vy * ny;
            var rx = vx - 2 * v_dot_n * nx;
            var ry = vy - 2 * v_dot_n * ny;
            return ls.MathUtils.radianTo(0, 0, rx, ry);
        };
        ;
        CollisionUtils.registered_collisions = [];
        return CollisionUtils;
    }());
    ls.CollisionUtils = CollisionUtils;
    egret.registerClass(CollisionUtils,'ls.CollisionUtils');
})(ls || (ls = {}));
//# sourceMappingURL=CollisionUtils.js.map
var ls;
(function (ls) {
    var MathUtils = (function () {
        function MathUtils() {
        }
        var d = __define,c=MathUtils,p=c.prototype;
        //将角度转化为弧度
        MathUtils.toRadian = function (a) {
            return a * this.TO_RADIAN;
        };
        //将弧度转化为角度
        MathUtils.toAngle = function (radian) {
            return radian * this.TO_ANGLE;
        };
        /**
         * 将角度转化为0~360度之间
         */
        MathUtils.clampAngle = function (a) {
            a %= 360; // now in (-360, 360) range
            if (a < 0)
                a += 360; // now in [0, 360) range
            return a;
        };
        /**
         * 将弧度转化为0~2pi之间
         */
        MathUtils.clampRadian = function (r) {
            r %= 2 * Math.PI; // now in (-2pi, 2pi) range
            if (r < 0)
                r += 2 * Math.PI; // now in [0, 2pi) range
            return r;
        };
        //从start到end以step速度旋转
        MathUtils.angleRotate = function (start, end, step) {
            var sr = this.toRadian(start);
            var er = this.toRadian(end);
            var ss = Math.sin(sr);
            var cs = Math.cos(sr);
            var se = Math.sin(er);
            var ce = Math.cos(er);
            if (Math.acos(ss * se + cs * ce) > this.toRadian(step)) {
                if (cs * se - ss * ce > 0)
                    return this.clampAngle(start + step);
                else
                    return this.clampAngle(start - step);
            }
            else
                return this.clampAngle(end);
        };
        MathUtils.angleRadius = function (start, end, step) {
            var ss = Math.sin(start);
            var cs = Math.cos(start);
            var se = Math.sin(end);
            var ce = Math.cos(end);
            if (Math.acos(ss * se + cs * ce) > step) {
                if (cs * se - ss * ce > 0)
                    return this.clampRadian(start + step);
                else
                    return this.clampRadian(start - step);
            }
            else
                return this.clampRadian(end);
        };
        /** 是否是顺时针旋转 弧度制 */
        MathUtils.angleClockWise = function (radian1, radian2) {
            var s1 = Math.sin(radian1);
            var c1 = Math.cos(radian1);
            var s2 = Math.sin(radian2);
            var c2 = Math.cos(radian2);
            return (c1 * s2 - s1 * c2) <= 0;
        };
        MathUtils.angleTo = function (x1, y1, x2, y2) {
            return this.toAngle(Math.atan2(y2 - y1, x2 - x1));
        };
        MathUtils.radianTo = function (x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1);
        };
        MathUtils.distance = function (x1, y1, x2, y2) {
            var hdist = x2 - x1;
            var vdist = y2 - y1;
            return Math.sqrt(hdist * hdist + vdist * vdist);
        };
        MathUtils.color16ToUnit = function ($color) {
            var colorStr = "0x" + $color.slice(1);
            return parseInt(colorStr, 16);
        };
        MathUtils.angleDiff = function (a1, a2) {
            if (a1 === a2)
                return 0;
            var s1 = Math.sin(a1);
            var c1 = Math.cos(a1);
            var s2 = Math.sin(a2);
            var c2 = Math.cos(a2);
            var n = s1 * s2 + c1 * c2;
            if (n >= 1)
                return 0;
            if (n <= -1)
                return Math.PI;
            return Math.acos(n);
        };
        //转化为弧度
        MathUtils.TO_RADIAN = Math.PI / 180;
        //转化为角度
        MathUtils.TO_ANGLE = 180 / Math.PI;
        return MathUtils;
    }());
    ls.MathUtils = MathUtils;
    egret.registerClass(MathUtils,'ls.MathUtils');
})(ls || (ls = {}));
//# sourceMappingURL=MathUtils.js.map
var ls;
(function (ls) {
    var Version = (function () {
        function Version() {
        }
        var d = __define,c=Version,p=c.prototype;
        /**
         * 比较版本大小 1：v1>v2 0:v1=v2 -1:v1<v2
         */
        Version.compareVersion = function (v1, v2) {
            var v1s = v1.split(".");
            var v2s = v2.split(".");
            var v1Data = v1s[0] + "." + v1s[1];
            if (v1s[2])
                v1Data += v1s[2];
            var v2Data = v2s[0] + "." + v2s[1];
            if (v2s[2])
                v2Data += v2s[2];
            var v1Value = +v1Data;
            var v2Value = +v2Data;
            if (v1Value > v2Value)
                return 1;
            else if (v1Value === v2Value)
                return 0;
            else
                return -1;
        };
        Version.version = "1.2";
        return Version;
    }());
    ls.Version = Version;
    egret.registerClass(Version,'ls.Version');
})(ls || (ls = {}));
//# sourceMappingURL=Version.js.map
var ls;
(function (ls) {
    var StartUp = (function () {
        function StartUp() {
        }
        var d = __define,c=StartUp,p=c.prototype;
        StartUp.execute = function (document) {
            this.stage = document.stage;
            //初始化图层
            this.onLayerInit(document);
            this.onPreResourceLoad();
            this.stage.dirtyRegionPolicy = "off";
        };
        StartUp.onLayerInit = function (document) {
            ls.GameUILayer.init(document.stage);
            ls.GameUILayer.document = document;
        };
        //预加载资源加载
        StartUp.onPreResourceLoad = function () {
            this.onProjectLoad("resource/assets/projects.xml");
        };
        //项目加载
        StartUp.onProjectLoad = function (url, onComplete) {
            if (onComplete === void 0) { onComplete = null; }
            RES.getResByUrl(url, function (data) {
                var children = data.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var item = children[i];
                        var lname = item.localName;
                        switch (lname) {
                            case "sceneSize":
                                ls.Config.sceneWidth = +(item["$width"]);
                                ls.Config.sceneHeight = +(item["$height"]);
                                ls.Config.openLog = (+(item["$openLog"]) == 1);
                                break;
                            case "info":
                                StartUp.baseUrl = item["$baseUrl"];
                                ls.Config.sceneInfo = { layoutName: item["$layoutName"], layoutUrl: item["$layoutUrl"], eventsheetName: item["$eventsheetName"], eventsheetUrl: item["$eventsheetUrl"], baseUrl: StartUp.baseUrl };
                                var self = this;
                                //加载全局变量
                                self.onGlobalConfigLoad(ls.Config.sceneInfo.baseUrl + "global.xml", function () {
                                    //加载布局配置
                                    RES.getResByUrl(ls.Config.sceneInfo.baseUrl + ls.Config.sceneInfo.layoutUrl, function (layoutData) {
                                        ls.Config.sceneInfo.layoutData = layoutData;
                                        //加载事件表配置
                                        RES.getResByUrl(ls.Config.sceneInfo.baseUrl + ls.Config.sceneInfo.eventsheetUrl, function (eventsheetData) {
                                            ls.Config.sceneInfo.eventsheetData = eventsheetData;
                                            ls.LayoutDecoder.start(ls.Config.sceneInfo.layoutName);
                                            ls.EventSheetDecoder.start(ls.Config.sceneInfo.eventsheetName);
                                        }, this);
                                    }, ls.Config.sceneInfo);
                                }, [ls.Config.sceneInfo.layoutName]);
                                break;
                            case "internal":
                                var internalStr = item.children[0].text;
                                var internalObject = JSON.parse(decodeURIComponent(internalStr));
                                ls.internalData = internalObject.internalComponents;
                                break;
                            case "version":
                                ls.Config.version = +(item.text);
                                break;
                        }
                    }
                }
            }, this, RES.ResourceItem.TYPE_XML);
        };
        //全局配置加载
        StartUp.onGlobalConfigLoad = function (url, onComplete, onCompleteParams) {
            if (onComplete === void 0) { onComplete = null; }
            if (onCompleteParams === void 0) { onCompleteParams = null; }
            RES.getResByUrl(url, function (data) {
                this.globalData = data;
                //全局实例添加到舞台
                ls.LayoutDecoder.globalInstances = ls.LayoutDecoder.decodeInstances(this.globalData);
                if (onComplete != null)
                    onComplete.apply(null, onCompleteParams);
            }, this, RES.ResourceItem.TYPE_XML);
        };
        /**配置加载 */
        StartUp.onConfigLoad = function (layoutName) {
            ls.Config.sceneInfo.layoutName = layoutName;
            ls.Config.sceneInfo.layoutUrl = layoutName + ".xml";
            //加载布局配置
            RES.getResByUrl(ls.Config.sceneInfo.baseUrl + ls.Config.sceneInfo.layoutUrl, function (layoutData) {
                ls.Config.sceneInfo.layoutData = layoutData;
                ls.Config.sceneInfo.eventsheetName = layoutData["$eventSheet"];
                ls.Config.sceneInfo.eventsheetUrl = ls.Config.sceneInfo.eventsheetName + ".xml";
                //加载事件表配置
                RES.getResByUrl(ls.Config.sceneInfo.baseUrl + ls.Config.sceneInfo.eventsheetUrl, function (eventsheetData) {
                    ls.Config.sceneInfo.eventsheetData = eventsheetData;
                    ls.LayoutDecoder.start(ls.Config.sceneInfo.layoutName);
                    ls.EventSheetDecoder.start(ls.Config.sceneInfo.eventsheetName);
                }, this);
            }, this);
        };
        return StartUp;
    }());
    ls.StartUp = StartUp;
    egret.registerClass(StartUp,'ls.StartUp');
})(ls || (ls = {}));
//# sourceMappingURL=StartUp.js.map
//# sourceMappingURL=tmp.js.map

