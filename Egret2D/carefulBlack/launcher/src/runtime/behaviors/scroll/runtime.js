var ls;
(function (ls) {
    var ScrollBehaivor = (function (_super) {
        __extends(ScrollBehaivor, _super);
        function ScrollBehaivor() {
            _super.call(this);
            /**up down left right @see egret.enum.behaivors.BehaivorType*/
            this.scrollDirectionType = BehaivorType.scrollDown;
            /**滚屏速度*/
            this.speed = 0;
            //是否激活滚屏１:激活 2：不激活
            this.active = 1;
        }
        var d = __define,c=ScrollBehaivor,p=c.prototype;
        p.tick = function () {
            this.active = ls.eval_e(this.active);
            if (this.active != 1)
                return;
            var speed = ls.eval_e(this.speed);
            ls.assert(typeof speed !== "number", "ScrollBehaivor speed parameter type incorrect!!");
            //目前滚屏的方式根据坐标来判断，初始化的时候
            var aiSprite = this.inst;
            if (aiSprite) {
                var perSecondSpeed = speed / 60;
                switch (this.scrollDirectionType) {
                    case BehaivorType.scrollUp:
                        aiSprite.y -= perSecondSpeed;
                        if (aiSprite.y < -aiSprite.height + aiSprite.anchorY * aiSprite.height)
                            aiSprite.y += 2 * aiSprite.height;
                        break;
                    case BehaivorType.scrollDown:
                        aiSprite.y += perSecondSpeed;
                        if (aiSprite.y > aiSprite.height + aiSprite.anchorY * aiSprite.height)
                            aiSprite.y += -2 * aiSprite.height;
                        break;
                    case BehaivorType.scrollLeft:
                        aiSprite.x -= perSecondSpeed;
                        if (aiSprite.x < -aiSprite.width + aiSprite.anchorX * aiSprite.width)
                            aiSprite.x += 2 * aiSprite.width;
                        break;
                    case BehaivorType.scrollRight:
                        aiSprite.x += perSecondSpeed;
                        if (aiSprite.x > aiSprite.width + aiSprite.anchorX * aiSprite.width)
                            aiSprite.x += -2 * aiSprite.width;
                        break;
                }
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.setActive = function (active) {
            this.active = ls.eval_e(active);
        };
        p.setScrollDirection = function (direction) {
            this.scrollDirectionType = ls.eval_e(direction);
        };
        p.setScrollSpeed = function (speed) {
            this.speed = ls.eval_e(speed);
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.scrollDirectionType = this.scrollDirectionType;
            o.speed = this.speed;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.scrollDirectionType = o.scrollDirectionType;
                this.speed = o.speed;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.scrollDirectionType = this.scrollDirectionType;
            bh.speed = this.speed;
            return bh;
        };
        return ScrollBehaivor;
    }(ls.BaseBehavior));
    ls.ScrollBehaivor = ScrollBehaivor;
    egret.registerClass(ScrollBehaivor,'ls.ScrollBehaivor');
    var BehaivorType = (function () {
        function BehaivorType() {
        }
        var d = __define,c=BehaivorType,p=c.prototype;
        BehaivorType.scrollUp = "scrollUp";
        BehaivorType.scrollDown = "scrollDown";
        BehaivorType.scrollLeft = "scrollLeft";
        BehaivorType.scrollRight = "scrollRight";
        return BehaivorType;
    }());
    ls.BehaivorType = BehaivorType;
    egret.registerClass(BehaivorType,'ls.BehaivorType');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map