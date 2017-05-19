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