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