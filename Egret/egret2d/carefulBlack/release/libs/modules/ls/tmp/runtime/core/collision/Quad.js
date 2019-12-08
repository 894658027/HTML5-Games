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