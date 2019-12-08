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
            if (!inst1 || !inst2)
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
                var inst1Radius = polygonInst1.angle * Math.PI / 180;
                var inst2Radius = polygonInst2.angle * Math.PI / 180;
                /**
                 * 1、先将起始点移动到原点
                 * 2、再进行缩放
                 * 3、再进行旋转
                 * 4、再移回到目的地
                 *
                 */
                var ovss = [];
                for (var m1 = 0; m1 < polygonInst1.collisionVectorData.length; m1++) {
                    var ovs = [];
                    for (var op = 0; op < polygonInst1.collisionVectorData[m1].length; op++) {
                        var ov = polygonInst1.collisionVectorData[m1][op];
                        var otm = new egret.Matrix();
                        //先进行注册点移动
                        otm.translate(ov.x - polygonInst1.anchorOffsetX, ov.y - polygonInst1.anchorOffsetY);
                        //再进行缩放
                        otm.scale(polygonInst1.scaleX, polygonInst1.scaleY);
                        //再进行旋转
                        otm.rotate(inst1Radius);
                        ovs[op] = new ls.Vector2D(otm.tx, otm.ty);
                    }
                    ovss[m1] = ovs;
                }
                var evss = [];
                for (var n1 = 0; n1 < polygonInst2.collisionVectorData.length; n1++) {
                    var evs = [];
                    for (var ep = 0; ep < polygonInst2.collisionVectorData[n1].length; ep++) {
                        var ev = polygonInst2.collisionVectorData[n1][ep];
                        var etm = new egret.Matrix();
                        //先进行注册点移动
                        etm.translate(ev.x - polygonInst2.anchorOffsetX, ev.y - polygonInst2.anchorOffsetY);
                        //再进行缩放
                        etm.scale(polygonInst2.scaleX, polygonInst2.scaleY);
                        //再进行旋转
                        etm.rotate(inst2Radius);
                        evs[ep] = new ls.Vector2D(etm.tx, etm.ty);
                    }
                    evss[n1] = evs;
                }
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