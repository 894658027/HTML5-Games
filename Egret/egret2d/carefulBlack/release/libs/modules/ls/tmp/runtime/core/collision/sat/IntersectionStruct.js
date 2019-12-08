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