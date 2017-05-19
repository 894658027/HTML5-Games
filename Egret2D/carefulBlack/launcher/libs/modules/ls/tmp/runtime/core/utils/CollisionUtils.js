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
        //检测实例a、b是否碰撞
        CollisionUtils.testOverlap2 = function (a, b) {
            // if (!a || !b || a === b)//|| !a.collisionsEnabled || !b.collisionsEnabled
            //     return false;
            // // if (!(a.platformEnabled && (b.solidEnabeld||b.jumpthruEnabled)) || (b.platformEnabled && (a.solidEnabeld||a.jumpthruEnabled)))
            // //     return false;
            // //这里作简单的优化，如果某个目标绑定了横轴跑酷行为，而另一个目标在屏幕外，那么将不参与与另一个对象进行碰撞
            // if (a.platformEnabled && !b.isOnScreen) 
            //     return false;
            // else if (b.platformEnabled && !a.isOnScreen) 
            //     return false;
            // else
            //     return Collision.checkCollision(a, b);
            if (!a || !b || a === b)
                return false;
            var colliding = false;
            //return Collision.checkCollision(a, b);
            if (a.angle == 0 && b.angle == 0) {
                colliding = a.getGlobalBounds().intersects(b.getGlobalBounds());
            }
            else {
                return ls.Collision.checkCollision(a, b);
            }
            return colliding;
        };
        /**检测矩形1与矩形2是否相交 */
        CollisionUtils.intersects_rect = function (rect1, rect2) {
            return !(rect2.right < rect1.left || rect2.bottom < rect1.top || rect2.left > rect1.right || rect2.top > rect1.bottom);
        };
        CollisionUtils.intersects_poly = function (a, b) {
            return false;
        };
        CollisionUtils.testOverlap = function (a, b) {
            if (!a || !b || a === b)
                return false;
            if (!(a.solidEnabeld || a.collision))
                return false;
            if (!(b.solidEnabeld || b.collision))
                return false;
            // if (!a.getGlobalBounds().intersects(b.getGlobalBounds()))
            //     return false;
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
                        anticlockwise_free_angle = curangle - increment;
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