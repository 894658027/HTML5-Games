var ls;
(function (ls) {
    var GestureComponentInfo = (function () {
        function GestureComponentInfo() {
        }
        var d = __define,c=GestureComponentInfo,p=c.prototype;
        return GestureComponentInfo;
    }());
    ls.GestureComponentInfo = GestureComponentInfo;
    egret.registerClass(GestureComponentInfo,'ls.GestureComponentInfo');
    /**
     * 目前支持手势：
     * 1、双击
     * 2、短按
     * 3、长按
     * 4、滑屏
     * 5、拖动
     * 6、二指向内或者往外拨动（通常缩放用）
     * //单手操作
     * 参考库：http://depts.washington.edu/aimgroup/proj/dollar/
     */
    var GestureBehavior = (function (_super) {
        __extends(GestureBehavior, _super);
        function GestureBehavior() {
            _super.call(this);
            this._swipeAngle = 0; //滑屏角度
            this._swipeGlobalAngle = 0; //滑屏全局角度
            this._swipeDistance = 0; //滑屏距离
            this._swipeTime = 0; //滑屏时间
            //二指向内或者往外拨动
            this.touchPoints = {};
            this._touchNums = 0;
            this.isDraw = false;
        }
        var d = __define,c=GestureBehavior,p=c.prototype;
        p.onCreate = function () {
            this.showHelpline = ls.eval_e(this.showHelpline);
            this.helplineColor = ls.eval_e(this.helplineColor);
            this.helplineThick = ls.eval_e(this.helplineThick);
            this.fadeTime = ls.eval_e(this.fadeTime);
            this.gesture = new ur.UnistrokeRecognize();
            this.gesture.addGesture(GestureBehavior.TRIANGLE, this.addGesture_triangle());
            this.gesture.addGesture(GestureBehavior.X, this.addGesture_x());
            this.gesture.addGesture(GestureBehavior.RECTANGLE, this.addGesture_rectangle());
            this.gesture.addGesture(GestureBehavior.CIRCLE, this.addGesture_circle());
            this.gesture.addGesture(GestureBehavior.CHECK, this.addGesture_check());
            this.gesture.addGesture(GestureBehavior.CARET, this.addGesture_caret());
            this.gesture.addGesture(GestureBehavior.ZIG_ZAG, this.addGesture_zigZag());
            this.gesture.addGesture(GestureBehavior.ARROW, this.addGesture_arrow());
            this.gesture.addGesture(GestureBehavior.LEFT_SQUARE_BRACKET, this.addGesture_left_square_bracket());
            this.gesture.addGesture(GestureBehavior.RIGHT_SQUARE_BRACKET, this.addGesture_right_square_bracket());
            this.gesture.addGesture(GestureBehavior.V, this.addGesture_v());
            this.gesture.addGesture(GestureBehavior.DELETE, this.addGesture_delete());
            this.gesture.addGesture(GestureBehavior.LEFT_CURLY_BRACE, this.addGesture_left_curly_brace());
            this.gesture.addGesture(GestureBehavior.RIGHT_CURLY_BRACE, this.addGesture_right_curly_brace());
            this.gesture.addGesture(GestureBehavior.STAR, this.addGesture_star());
            this.gesture.addGesture(GestureBehavior.PIGTAIL, this.addGesture_pigtail());
            if (this.inst) {
                var container = this.inst.container;
                container.touchChildren = container.touchEnabled = true;
                this.helpline = new egret.Shape();
                container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTargetTouchEvent, this);
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTargetTouchEvent, this);
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTargetTouchEvent, this);
            }
        };
        p.tick = function () {
            var currentTime = egret.getTimer();
            if (currentTime - this.clearTime >= this.fadeTime * 1000 && this.isDraw) {
                this.helpline.graphics.clear();
                this.isDraw = false;
            }
            if (this.isTapBegin) {
                if (!this.isShortTaped && this.oldTouchBeginTime && currentTime - this.oldTouchBeginTime >= GestureBehavior.SHORT_TAP_TIME) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onShortTap));
                    this.isShortTaped = true;
                }
                if (!this.isLongTaped && this.oldTouchBeginTime && currentTime - this.oldTouchBeginTime >= GestureBehavior.LONG_TAP_TIME) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onLongTap));
                    this.isLongTaped = true;
                }
            }
        };
        p.getTouchIndex = function (touchPointID) {
            var searchIndex = -1;
            if (this.touchPoints) {
                for (var i = 0; i < this.touchPoints.length; i++) {
                    if (this.touchPoints[i].touchID == touchPointID) {
                        searchIndex = i;
                        break;
                    }
                }
            }
            return searchIndex;
        };
        d(p, "touchNums"
            ,function () {
                return this._touchNums;
            }
        );
        p.onTargetTouchEvent = function (event) {
            var container = this.inst.container;
            var p = container.globalToLocal(event.stageX, event.stageY);
            this.currentTouchID = event.touchPointID;
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.isTouchDown = true;
                    this.helpline.graphics.clear();
                    container.addChild(this.helpline);
                    var currentTouchBeginTime = egret.getTimer();
                    if (this.touchPoints[event.touchPointID] == null) {
                        var gestureTouchInfo = new GestureComponentInfo();
                        gestureTouchInfo.touchID = event.touchPointID;
                        gestureTouchInfo.touchX = event.stageX;
                        gestureTouchInfo.touchY = event.stageY;
                        this.touchPoints[event.touchPointID] = gestureTouchInfo;
                        this._touchNums++;
                    }
                    //执行旋转与缩放
                    this.onPinchAndScaleStartExec();
                    this.isTapBegin = true;
                    this._currentPoint = p;
                    this._tapBeginPos = p;
                    this._mousePoints = [];
                    this._mousePoints[0] = p;
                    if (this.lastTapBeginPos) {
                        var dx = p.x - this.lastTapBeginPos.x;
                        var dy = p.y - this.lastTapBeginPos.y;
                        if (dx * dx + dy * dy <= GestureBehavior.DOUBLE_TAP_DISTANCE * GestureBehavior.DOUBLE_TAP_DISTANCE) {
                            if (currentTouchBeginTime - this.oldTouchBeginTime <= GestureBehavior.DOUBLE_TAP_TIME) {
                                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDoubleTap));
                                this.lastTapBeginPos = null;
                                break;
                            }
                        }
                    }
                    this.oldTouchBeginTime = currentTouchBeginTime;
                    this.lastTapBeginPos = p;
                    break;
                case egret.TouchEvent.TOUCH_END:
                    if (this.isTouchDown) {
                        //删除手势信息
                        if (this.touchPoints[event.touchPointID]) {
                            delete this.touchPoints[event.touchPointID];
                            this._touchNums--;
                        }
                        this._mousePoints.push(p);
                        this.isTapBegin = false;
                        this.isShortTaped = false;
                        this.isLongTaped = false;
                        var result = this.gesture.recognize(this._mousePoints, false);
                        this.clearTime = egret.getTimer();
                        this.isDraw = true;
                        this._tapEndPos = p;
                        this.onGestureResult(result);
                        this.onSwipeExec();
                        this.isTouchDown = false;
                    }
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    if (!this.isTouchDown)
                        return;
                    if (event.touchDown) {
                        var touchInfo = this.touchPoints[event.touchPointID];
                        if (touchInfo) {
                            touchInfo.touchX = event.stageX;
                            touchInfo.touchY = event.stageY;
                        }
                        if (this.showHelpline == 1) {
                            this.helpline.graphics.lineStyle(this.helplineThick, this.helplineColor);
                            this.helpline.graphics.moveTo(this._currentPoint.x, this._currentPoint.y);
                            this.helpline.graphics.lineTo(p.x, p.y);
                            this.helpline.graphics.endFill();
                        }
                        this._mousePoints.push(p);
                        this._currentPoint = p;
                        this.onPinchAndScaleMoveExec();
                    }
                    break;
            }
        };
        p.onSwipeExec = function () {
            //swipe
            //滑屏是绑定速度还是距离，这得测试，这里先绑定的是距离
            var dx = this._tapEndPos.x - this._tapBeginPos.x;
            var dy = this._tapEndPos.y - this._tapBeginPos.y;
            var distSQRT = dx * dx * this.inst.scale + dy * dy * this.inst.scale;
            var radian = Math.atan2(dy, dx);
            var angle = radian * 180 / Math.PI;
            this._swipeAngle = angle;
            this._swipeGlobalAngle = angle + this.inst.angle;
            this._swipeDistance = Math.sqrt(distSQRT);
            this._swipeTime = (this.clearTime - this.oldTouchBeginTime);
            // Log.log("时间：" + (this.clearTime - this.oldTouchBeginTime) + "，长度：" + this._mousePoints.length + "，角度：" + angle + "，距离：" + Math.sqrt(distSQRT));
            if ((this.clearTime - this.oldTouchBeginTime) <= GestureBehavior.SWIPE_TIME && this._mousePoints.length >= GestureBehavior.SWIPE_POINT_NUMS && distSQRT >= GestureBehavior.SWIPE_DISTANCE * GestureBehavior.SWIPE_DISTANCE) {
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSwipe));
                if (angle < 22.5 && angle > -22.5) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSwipeRight));
                }
                else if (angle > 67.5 && angle < 112.5) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSwipeDown));
                }
                else if (angle > 157.5 || angle < -157.5) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSwipeLeft));
                }
                else if (angle > -112.5 && angle < -67.5) {
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onSwipeUp));
                }
            }
        };
        p.getPoints = function () {
            var list = [];
            for (var key in this.touchPoints) {
                list.push(this.touchPoints[key]);
            }
            return list;
        };
        /**
         * 执行两指旋转与缩放
         */
        p.onPinchAndScaleStartExec = function () {
            if (this._touchNums == 2) {
                var points = this.getPoints();
                var firstTouchInfo = points[0];
                var secondTouchInfo = points[1];
                var dx = secondTouchInfo.touchX - firstTouchInfo.touchX;
                var dy = secondTouchInfo.touchY - firstTouchInfo.touchY;
                this.pinchDistance = Math.sqrt(dx * dx + dy * dy);
                this.pinchAngle = Math.atan2(dy, dx);
                this.inst["sourceTapScale"] = this.inst.scale;
                this.inst["sourceTapAngle"] = this.inst.angle;
            }
        };
        p.onPinchAndScaleMoveExec = function () {
            if (this._touchNums == 2) {
                var points = this.getPoints();
                var firstTouchInfo = points[0];
                var secondTouchInfo = points[1];
                var dx = secondTouchInfo.touchX - firstTouchInfo.touchX;
                var dy = secondTouchInfo.touchY - firstTouchInfo.touchY;
                this.lastDistance = Math.sqrt(dx * dx + dy * dy);
                this.lastPinchAngle = Math.atan2(dy, dx);
                var scale = this.lastDistance / this.pinchDistance;
                this.inst.scale = scale * this.inst["sourceTapScale"];
                this.inst.angle = this.inst["sourceTapAngle"] + (this.lastPinchAngle - this.pinchAngle) * 180 / Math.PI;
            }
        };
        p.getScale = function () {
            return this.inst.scale;
        };
        /////////////////////////gesture/////////////////////////////////        
        p.onGestureResult = function (result) {
            if (result) {
                console.log("结果:", result.name, result.score);
                switch (result.name) {
                    case GestureBehavior.TRIANGLE:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTriangleDraw));
                        break;
                    case GestureBehavior.X:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onXDraw));
                        break;
                    case GestureBehavior.RECTANGLE:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onRectangleDraw));
                        break;
                    case GestureBehavior.CIRCLE:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onCircleDraw));
                        break;
                    case GestureBehavior.CHECK:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onCheckDraw));
                        break;
                    case GestureBehavior.CARET:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onCaretDraw));
                        break;
                    case GestureBehavior.ZIG_ZAG:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onZigZagDraw));
                        break;
                    case GestureBehavior.ARROW:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onArrowDraw));
                        break;
                    case GestureBehavior.LEFT_SQUARE_BRACKET:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onLeft_square_bracketDraw));
                        break;
                    case GestureBehavior.RIGHT_SQUARE_BRACKET:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onRight_square_bracketDraw));
                        break;
                    case GestureBehavior.V:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onVDraw));
                        break;
                    case GestureBehavior.DELETE:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDeleteDraw));
                        break;
                    case GestureBehavior.LEFT_CURLY_BRACE:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onLeft_curly_braceDraw));
                        break;
                    case GestureBehavior.RIGHT_CURLY_BRACE:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onRight_curly_braceDraw));
                        break;
                    case GestureBehavior.STAR:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onStarDraw));
                        break;
                    case GestureBehavior.PIGTAIL:
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPigtailDraw));
                        break;
                }
            }
        };
        p.onTriangleDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onXDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onRectangleDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onCircleDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onCheckDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onCaretDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onZigZagDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onArrowDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onLeft_square_bracketDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onRight_square_bracketDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onVDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onDeleteDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onLeft_curly_braceDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onRight_curly_braceDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onStarDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onPigtailDraw = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onDoubleTap = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onShortTap = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onLongTap = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onSwipe = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onSwipeLeft = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onSwipeRight = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onSwipeUp = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onSwipeDown = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.onPinchTap = function (event) {
            return { instances: [this.inst], status: true };
        };
        p.addGesture_triangle = function () {
            return new Array(new ur.Point(137, 139), new ur.Point(135, 141), new ur.Point(133, 144), new ur.Point(132, 146), new ur.Point(130, 149), new ur.Point(128, 151), new ur.Point(126, 155), new ur.Point(123, 160), new ur.Point(120, 166), new ur.Point(116, 171), new ur.Point(112, 177), new ur.Point(107, 183), new ur.Point(102, 188), new ur.Point(100, 191), new ur.Point(95, 195), new ur.Point(90, 199), new ur.Point(86, 203), new ur.Point(82, 206), new ur.Point(80, 209), new ur.Point(75, 213), new ur.Point(73, 213), new ur.Point(70, 216), new ur.Point(67, 219), new ur.Point(64, 221), new ur.Point(61, 223), new ur.Point(60, 225), new ur.Point(62, 226), new ur.Point(65, 225), new ur.Point(67, 226), new ur.Point(74, 226), new ur.Point(77, 227), new ur.Point(85, 229), new ur.Point(91, 230), new ur.Point(99, 231), new ur.Point(108, 232), new ur.Point(116, 233), new ur.Point(125, 233), new ur.Point(134, 234), new ur.Point(145, 233), new ur.Point(153, 232), new ur.Point(160, 233), new ur.Point(170, 234), new ur.Point(177, 235), new ur.Point(179, 236), new ur.Point(186, 237), new ur.Point(193, 238), new ur.Point(198, 239), new ur.Point(200, 237), new ur.Point(202, 239), new ur.Point(204, 238), new ur.Point(206, 234), new ur.Point(205, 230), new ur.Point(202, 222), new ur.Point(197, 216), new ur.Point(192, 207), new ur.Point(186, 198), new ur.Point(179, 189), new ur.Point(174, 183), new ur.Point(170, 178), new ur.Point(164, 171), new ur.Point(161, 168), new ur.Point(154, 160), new ur.Point(148, 155), new ur.Point(143, 150), new ur.Point(138, 148), new ur.Point(136, 148));
        };
        p.addGesture_x = function () {
            return new Array(new ur.Point(87, 142), new ur.Point(89, 145), new ur.Point(91, 148), new ur.Point(93, 151), new ur.Point(96, 155), new ur.Point(98, 157), new ur.Point(100, 160), new ur.Point(102, 162), new ur.Point(106, 167), new ur.Point(108, 169), new ur.Point(110, 171), new ur.Point(115, 177), new ur.Point(119, 183), new ur.Point(123, 189), new ur.Point(127, 193), new ur.Point(129, 196), new ur.Point(133, 200), new ur.Point(137, 206), new ur.Point(140, 209), new ur.Point(143, 212), new ur.Point(146, 215), new ur.Point(151, 220), new ur.Point(153, 222), new ur.Point(155, 223), new ur.Point(157, 225), new ur.Point(158, 223), new ur.Point(157, 218), new ur.Point(155, 211), new ur.Point(154, 208), new ur.Point(152, 200), new ur.Point(150, 189), new ur.Point(148, 179), new ur.Point(147, 170), new ur.Point(147, 158), new ur.Point(147, 148), new ur.Point(147, 141), new ur.Point(147, 136), new ur.Point(144, 135), new ur.Point(142, 137), new ur.Point(140, 139), new ur.Point(135, 145), new ur.Point(131, 152), new ur.Point(124, 163), new ur.Point(116, 177), new ur.Point(108, 191), new ur.Point(100, 206), new ur.Point(94, 217), new ur.Point(91, 222), new ur.Point(89, 225), new ur.Point(87, 226), new ur.Point(87, 224));
        };
        p.addGesture_rectangle = function () {
            return new Array(new ur.Point(78, 149), new ur.Point(78, 153), new ur.Point(78, 157), new ur.Point(78, 160), new ur.Point(79, 162), new ur.Point(79, 164), new ur.Point(79, 167), new ur.Point(79, 169), new ur.Point(79, 173), new ur.Point(79, 178), new ur.Point(79, 183), new ur.Point(80, 189), new ur.Point(80, 193), new ur.Point(80, 198), new ur.Point(80, 202), new ur.Point(81, 208), new ur.Point(81, 210), new ur.Point(81, 216), new ur.Point(82, 222), new ur.Point(82, 224), new ur.Point(82, 227), new ur.Point(83, 229), new ur.Point(83, 231), new ur.Point(85, 230), new ur.Point(88, 232), new ur.Point(90, 233), new ur.Point(92, 232), new ur.Point(94, 233), new ur.Point(99, 232), new ur.Point(102, 233), new ur.Point(106, 233), new ur.Point(109, 234), new ur.Point(117, 235), new ur.Point(123, 236), new ur.Point(126, 236), new ur.Point(135, 237), new ur.Point(142, 238), new ur.Point(145, 238), new ur.Point(152, 238), new ur.Point(154, 239), new ur.Point(165, 238), new ur.Point(174, 237), new ur.Point(179, 236), new ur.Point(186, 235), new ur.Point(191, 235), new ur.Point(195, 233), new ur.Point(197, 233), new ur.Point(200, 233), new ur.Point(201, 235), new ur.Point(201, 233), new ur.Point(199, 231), new ur.Point(198, 226), new ur.Point(198, 220), new ur.Point(196, 207), new ur.Point(195, 195), new ur.Point(195, 181), new ur.Point(195, 173), new ur.Point(195, 163), new ur.Point(194, 155), new ur.Point(192, 145), new ur.Point(192, 143), new ur.Point(192, 138), new ur.Point(191, 135), new ur.Point(191, 133), new ur.Point(191, 130), new ur.Point(190, 128), new ur.Point(188, 129), new ur.Point(186, 129), new ur.Point(181, 132), new ur.Point(173, 131), new ur.Point(162, 131), new ur.Point(151, 132), new ur.Point(149, 132), new ur.Point(138, 132), new ur.Point(136, 132), new ur.Point(122, 131), new ur.Point(120, 131), new ur.Point(109, 130), new ur.Point(107, 130), new ur.Point(90, 132), new ur.Point(81, 133), new ur.Point(76, 133));
        };
        p.addGesture_circle = function () {
            return new Array(new ur.Point(127, 141), new ur.Point(124, 140), new ur.Point(120, 139), new ur.Point(118, 139), new ur.Point(116, 139), new ur.Point(111, 140), new ur.Point(109, 141), new ur.Point(104, 144), new ur.Point(100, 147), new ur.Point(96, 152), new ur.Point(93, 157), new ur.Point(90, 163), new ur.Point(87, 169), new ur.Point(85, 175), new ur.Point(83, 181), new ur.Point(82, 190), new ur.Point(82, 195), new ur.Point(83, 200), new ur.Point(84, 205), new ur.Point(88, 213), new ur.Point(91, 216), new ur.Point(96, 219), new ur.Point(103, 222), new ur.Point(108, 224), new ur.Point(111, 224), new ur.Point(120, 224), new ur.Point(133, 223), new ur.Point(142, 222), new ur.Point(152, 218), new ur.Point(160, 214), new ur.Point(167, 210), new ur.Point(173, 204), new ur.Point(178, 198), new ur.Point(179, 196), new ur.Point(182, 188), new ur.Point(182, 177), new ur.Point(178, 167), new ur.Point(170, 150), new ur.Point(163, 138), new ur.Point(152, 130), new ur.Point(143, 129), new ur.Point(140, 131), new ur.Point(129, 136), new ur.Point(126, 139));
        };
        p.addGesture_check = function () {
            return new Array(new ur.Point(91, 185), new ur.Point(93, 185), new ur.Point(95, 185), new ur.Point(97, 185), new ur.Point(100, 188), new ur.Point(102, 189), new ur.Point(104, 190), new ur.Point(106, 193), new ur.Point(108, 195), new ur.Point(110, 198), new ur.Point(112, 201), new ur.Point(114, 204), new ur.Point(115, 207), new ur.Point(117, 210), new ur.Point(118, 212), new ur.Point(120, 214), new ur.Point(121, 217), new ur.Point(122, 219), new ur.Point(123, 222), new ur.Point(124, 224), new ur.Point(126, 226), new ur.Point(127, 229), new ur.Point(129, 231), new ur.Point(130, 233), new ur.Point(129, 231), new ur.Point(129, 228), new ur.Point(129, 226), new ur.Point(129, 224), new ur.Point(129, 221), new ur.Point(129, 218), new ur.Point(129, 212), new ur.Point(129, 208), new ur.Point(130, 198), new ur.Point(132, 189), new ur.Point(134, 182), new ur.Point(137, 173), new ur.Point(143, 164), new ur.Point(147, 157), new ur.Point(151, 151), new ur.Point(155, 144), new ur.Point(161, 137), new ur.Point(165, 131), new ur.Point(171, 122), new ur.Point(174, 118), new ur.Point(176, 114), new ur.Point(177, 112), new ur.Point(177, 114), new ur.Point(175, 116), new ur.Point(173, 118));
        };
        p.addGesture_zigZag = function () {
            return new Array(new ur.Point(307, 216), new ur.Point(333, 186), new ur.Point(356, 215), new ur.Point(375, 186), new ur.Point(399, 216), new ur.Point(418, 186));
        };
        p.addGesture_caret = function () {
            return new Array(new ur.Point(79, 245), new ur.Point(79, 242), new ur.Point(79, 239), new ur.Point(80, 237), new ur.Point(80, 234), new ur.Point(81, 232), new ur.Point(82, 230), new ur.Point(84, 224), new ur.Point(86, 220), new ur.Point(86, 218), new ur.Point(87, 216), new ur.Point(88, 213), new ur.Point(90, 207), new ur.Point(91, 202), new ur.Point(92, 200), new ur.Point(93, 194), new ur.Point(94, 192), new ur.Point(96, 189), new ur.Point(97, 186), new ur.Point(100, 179), new ur.Point(102, 173), new ur.Point(105, 165), new ur.Point(107, 160), new ur.Point(109, 158), new ur.Point(112, 151), new ur.Point(115, 144), new ur.Point(117, 139), new ur.Point(119, 136), new ur.Point(119, 134), new ur.Point(120, 132), new ur.Point(121, 129), new ur.Point(122, 127), new ur.Point(124, 125), new ur.Point(126, 124), new ur.Point(129, 125), new ur.Point(131, 127), new ur.Point(132, 130), new ur.Point(136, 139), new ur.Point(141, 154), new ur.Point(145, 166), new ur.Point(151, 182), new ur.Point(156, 193), new ur.Point(157, 196), new ur.Point(161, 209), new ur.Point(162, 211), new ur.Point(167, 223), new ur.Point(169, 229), new ur.Point(170, 231), new ur.Point(173, 237), new ur.Point(176, 242), new ur.Point(177, 244), new ur.Point(179, 250), new ur.Point(181, 255), new ur.Point(182, 257));
        };
        p.addGesture_arrow = function () {
            return new Array(new ur.Point(68, 222), new ur.Point(70, 220), new ur.Point(73, 218), new ur.Point(75, 217), new ur.Point(77, 215), new ur.Point(80, 213), new ur.Point(82, 212), new ur.Point(84, 210), new ur.Point(87, 209), new ur.Point(89, 208), new ur.Point(92, 206), new ur.Point(95, 204), new ur.Point(101, 201), new ur.Point(106, 198), new ur.Point(112, 194), new ur.Point(118, 191), new ur.Point(124, 187), new ur.Point(127, 186), new ur.Point(132, 183), new ur.Point(138, 181), new ur.Point(141, 180), new ur.Point(146, 178), new ur.Point(154, 173), new ur.Point(159, 171), new ur.Point(161, 170), new ur.Point(166, 167), new ur.Point(168, 167), new ur.Point(171, 166), new ur.Point(174, 164), new ur.Point(177, 162), new ur.Point(180, 160), new ur.Point(182, 158), new ur.Point(183, 156), new ur.Point(181, 154), new ur.Point(178, 153), new ur.Point(171, 153), new ur.Point(164, 153), new ur.Point(160, 153), new ur.Point(150, 154), new ur.Point(147, 155), new ur.Point(141, 157), new ur.Point(137, 158), new ur.Point(135, 158), new ur.Point(137, 158), new ur.Point(140, 157), new ur.Point(143, 156), new ur.Point(151, 154), new ur.Point(160, 152), new ur.Point(170, 149), new ur.Point(179, 147), new ur.Point(185, 145), new ur.Point(192, 144), new ur.Point(196, 144), new ur.Point(198, 144), new ur.Point(200, 144), new ur.Point(201, 147), new ur.Point(199, 149), new ur.Point(194, 157), new ur.Point(191, 160), new ur.Point(186, 167), new ur.Point(180, 176), new ur.Point(177, 179), new ur.Point(171, 187), new ur.Point(169, 189), new ur.Point(165, 194), new ur.Point(164, 196));
        };
        p.addGesture_left_square_bracket = function () {
            return new Array(new ur.Point(140, 124), new ur.Point(138, 123), new ur.Point(135, 122), new ur.Point(133, 123), new ur.Point(130, 123), new ur.Point(128, 124), new ur.Point(125, 125), new ur.Point(122, 124), new ur.Point(120, 124), new ur.Point(118, 124), new ur.Point(116, 125), new ur.Point(113, 125), new ur.Point(111, 125), new ur.Point(108, 124), new ur.Point(106, 125), new ur.Point(104, 125), new ur.Point(102, 124), new ur.Point(100, 123), new ur.Point(98, 123), new ur.Point(95, 124), new ur.Point(93, 123), new ur.Point(90, 124), new ur.Point(88, 124), new ur.Point(85, 125), new ur.Point(83, 126), new ur.Point(81, 127), new ur.Point(81, 129), new ur.Point(82, 131), new ur.Point(82, 134), new ur.Point(83, 138), new ur.Point(84, 141), new ur.Point(84, 144), new ur.Point(85, 148), new ur.Point(85, 151), new ur.Point(86, 156), new ur.Point(86, 160), new ur.Point(86, 164), new ur.Point(86, 168), new ur.Point(87, 171), new ur.Point(87, 175), new ur.Point(87, 179), new ur.Point(87, 182), new ur.Point(87, 186), new ur.Point(88, 188), new ur.Point(88, 195), new ur.Point(88, 198), new ur.Point(88, 201), new ur.Point(88, 207), new ur.Point(89, 211), new ur.Point(89, 213), new ur.Point(89, 217), new ur.Point(89, 222), new ur.Point(88, 225), new ur.Point(88, 229), new ur.Point(88, 231), new ur.Point(88, 233), new ur.Point(88, 235), new ur.Point(89, 237), new ur.Point(89, 240), new ur.Point(89, 242), new ur.Point(91, 241), new ur.Point(94, 241), new ur.Point(96, 240), new ur.Point(98, 239), new ur.Point(105, 240), new ur.Point(109, 240), new ur.Point(113, 239), new ur.Point(116, 240), new ur.Point(121, 239), new ur.Point(130, 240), new ur.Point(136, 237), new ur.Point(139, 237), new ur.Point(144, 238), new ur.Point(151, 237), new ur.Point(157, 236), new ur.Point(159, 237));
        };
        p.addGesture_right_square_bracket = function () {
            return new Array(new ur.Point(112, 138), new ur.Point(112, 136), new ur.Point(115, 136), new ur.Point(118, 137), new ur.Point(120, 136), new ur.Point(123, 136), new ur.Point(125, 136), new ur.Point(128, 136), new ur.Point(131, 136), new ur.Point(134, 135), new ur.Point(137, 135), new ur.Point(140, 134), new ur.Point(143, 133), new ur.Point(145, 132), new ur.Point(147, 132), new ur.Point(149, 132), new ur.Point(152, 132), new ur.Point(153, 134), new ur.Point(154, 137), new ur.Point(155, 141), new ur.Point(156, 144), new ur.Point(157, 152), new ur.Point(158, 161), new ur.Point(160, 170), new ur.Point(162, 182), new ur.Point(164, 192), new ur.Point(166, 200), new ur.Point(167, 209), new ur.Point(168, 214), new ur.Point(168, 216), new ur.Point(169, 221), new ur.Point(169, 223), new ur.Point(169, 228), new ur.Point(169, 231), new ur.Point(166, 233), new ur.Point(164, 234), new ur.Point(161, 235), new ur.Point(155, 236), new ur.Point(147, 235), new ur.Point(140, 233), new ur.Point(131, 233), new ur.Point(124, 233), new ur.Point(117, 235), new ur.Point(114, 238), new ur.Point(112, 238));
        };
        p.addGesture_v = function () {
            return new Array(new ur.Point(89, 164), new ur.Point(90, 162), new ur.Point(92, 162), new ur.Point(94, 164), new ur.Point(95, 166), new ur.Point(96, 169), new ur.Point(97, 171), new ur.Point(99, 175), new ur.Point(101, 178), new ur.Point(103, 182), new ur.Point(106, 189), new ur.Point(108, 194), new ur.Point(111, 199), new ur.Point(114, 204), new ur.Point(117, 209), new ur.Point(119, 214), new ur.Point(122, 218), new ur.Point(124, 222), new ur.Point(126, 225), new ur.Point(128, 228), new ur.Point(130, 229), new ur.Point(133, 233), new ur.Point(134, 236), new ur.Point(136, 239), new ur.Point(138, 240), new ur.Point(139, 242), new ur.Point(140, 244), new ur.Point(142, 242), new ur.Point(142, 240), new ur.Point(142, 237), new ur.Point(143, 235), new ur.Point(143, 233), new ur.Point(145, 229), new ur.Point(146, 226), new ur.Point(148, 217), new ur.Point(149, 208), new ur.Point(149, 205), new ur.Point(151, 196), new ur.Point(151, 193), new ur.Point(153, 182), new ur.Point(155, 172), new ur.Point(157, 165), new ur.Point(159, 160), new ur.Point(162, 155), new ur.Point(164, 150), new ur.Point(165, 148), new ur.Point(166, 146));
        };
        p.addGesture_delete = function () {
            return new Array(new ur.Point(123, 129), new ur.Point(123, 131), new ur.Point(124, 133), new ur.Point(125, 136), new ur.Point(127, 140), new ur.Point(129, 142), new ur.Point(133, 148), new ur.Point(137, 154), new ur.Point(143, 158), new ur.Point(145, 161), new ur.Point(148, 164), new ur.Point(153, 170), new ur.Point(158, 176), new ur.Point(160, 178), new ur.Point(164, 183), new ur.Point(168, 188), new ur.Point(171, 191), new ur.Point(175, 196), new ur.Point(178, 200), new ur.Point(180, 202), new ur.Point(181, 205), new ur.Point(184, 208), new ur.Point(186, 210), new ur.Point(187, 213), new ur.Point(188, 215), new ur.Point(186, 212), new ur.Point(183, 211), new ur.Point(177, 208), new ur.Point(169, 206), new ur.Point(162, 205), new ur.Point(154, 207), new ur.Point(145, 209), new ur.Point(137, 210), new ur.Point(129, 214), new ur.Point(122, 217), new ur.Point(118, 218), new ur.Point(111, 221), new ur.Point(109, 222), new ur.Point(110, 219), new ur.Point(112, 217), new ur.Point(118, 209), new ur.Point(120, 207), new ur.Point(128, 196), new ur.Point(135, 187), new ur.Point(138, 183), new ur.Point(148, 167), new ur.Point(157, 153), new ur.Point(163, 145), new ur.Point(165, 142), new ur.Point(172, 133), new ur.Point(177, 127), new ur.Point(179, 127), new ur.Point(180, 125));
        };
        p.addGesture_left_curly_brace = function () {
            return new Array(new ur.Point(150, 116), new ur.Point(147, 117), new ur.Point(145, 116), new ur.Point(142, 116), new ur.Point(139, 117), new ur.Point(136, 117), new ur.Point(133, 118), new ur.Point(129, 121), new ur.Point(126, 122), new ur.Point(123, 123), new ur.Point(120, 125), new ur.Point(118, 127), new ur.Point(115, 128), new ur.Point(113, 129), new ur.Point(112, 131), new ur.Point(113, 134), new ur.Point(115, 134), new ur.Point(117, 135), new ur.Point(120, 135), new ur.Point(123, 137), new ur.Point(126, 138), new ur.Point(129, 140), new ur.Point(135, 143), new ur.Point(137, 144), new ur.Point(139, 147), new ur.Point(141, 149), new ur.Point(140, 152), new ur.Point(139, 155), new ur.Point(134, 159), new ur.Point(131, 161), new ur.Point(124, 166), new ur.Point(121, 166), new ur.Point(117, 166), new ur.Point(114, 167), new ur.Point(112, 166), new ur.Point(114, 164), new ur.Point(116, 163), new ur.Point(118, 163), new ur.Point(120, 162), new ur.Point(122, 163), new ur.Point(125, 164), new ur.Point(127, 165), new ur.Point(129, 166), new ur.Point(130, 168), new ur.Point(129, 171), new ur.Point(127, 175), new ur.Point(125, 179), new ur.Point(123, 184), new ur.Point(121, 190), new ur.Point(120, 194), new ur.Point(119, 199), new ur.Point(120, 202), new ur.Point(123, 207), new ur.Point(127, 211), new ur.Point(133, 215), new ur.Point(142, 219), new ur.Point(148, 220), new ur.Point(151, 221));
        };
        p.addGesture_right_curly_brace = function () {
            return new Array(new ur.Point(117, 132), new ur.Point(115, 132), new ur.Point(115, 129), new ur.Point(117, 129), new ur.Point(119, 128), new ur.Point(122, 127), new ur.Point(125, 127), new ur.Point(127, 127), new ur.Point(130, 127), new ur.Point(133, 129), new ur.Point(136, 129), new ur.Point(138, 130), new ur.Point(140, 131), new ur.Point(143, 134), new ur.Point(144, 136), new ur.Point(145, 139), new ur.Point(145, 142), new ur.Point(145, 145), new ur.Point(145, 147), new ur.Point(145, 149), new ur.Point(144, 152), new ur.Point(142, 157), new ur.Point(141, 160), new ur.Point(139, 163), new ur.Point(137, 166), new ur.Point(135, 167), new ur.Point(133, 169), new ur.Point(131, 172), new ur.Point(128, 173), new ur.Point(126, 176), new ur.Point(125, 178), new ur.Point(125, 180), new ur.Point(125, 182), new ur.Point(126, 184), new ur.Point(128, 187), new ur.Point(130, 187), new ur.Point(132, 188), new ur.Point(135, 189), new ur.Point(140, 189), new ur.Point(145, 189), new ur.Point(150, 187), new ur.Point(155, 186), new ur.Point(157, 185), new ur.Point(159, 184), new ur.Point(156, 185), new ur.Point(154, 185), new ur.Point(149, 185), new ur.Point(145, 187), new ur.Point(141, 188), new ur.Point(136, 191), new ur.Point(134, 191), new ur.Point(131, 192), new ur.Point(129, 193), new ur.Point(129, 195), new ur.Point(129, 197), new ur.Point(131, 200), new ur.Point(133, 202), new ur.Point(136, 206), new ur.Point(139, 211), new ur.Point(142, 215), new ur.Point(145, 220), new ur.Point(147, 225), new ur.Point(148, 231), new ur.Point(147, 239), new ur.Point(144, 244), new ur.Point(139, 248), new ur.Point(134, 250), new ur.Point(126, 253), new ur.Point(119, 253), new ur.Point(115, 253));
        };
        p.addGesture_star = function () {
            return new Array(new ur.Point(75, 250), new ur.Point(75, 247), new ur.Point(77, 244), new ur.Point(78, 242), new ur.Point(79, 239), new ur.Point(80, 237), new ur.Point(82, 234), new ur.Point(82, 232), new ur.Point(84, 229), new ur.Point(85, 225), new ur.Point(87, 222), new ur.Point(88, 219), new ur.Point(89, 216), new ur.Point(91, 212), new ur.Point(92, 208), new ur.Point(94, 204), new ur.Point(95, 201), new ur.Point(96, 196), new ur.Point(97, 194), new ur.Point(98, 191), new ur.Point(100, 185), new ur.Point(102, 178), new ur.Point(104, 173), new ur.Point(104, 171), new ur.Point(105, 164), new ur.Point(106, 158), new ur.Point(107, 156), new ur.Point(107, 152), new ur.Point(108, 145), new ur.Point(109, 141), new ur.Point(110, 139), new ur.Point(112, 133), new ur.Point(113, 131), new ur.Point(116, 127), new ur.Point(117, 125), new ur.Point(119, 122), new ur.Point(121, 121), new ur.Point(123, 120), new ur.Point(125, 122), new ur.Point(125, 125), new ur.Point(127, 130), new ur.Point(128, 133), new ur.Point(131, 143), new ur.Point(136, 153), new ur.Point(140, 163), new ur.Point(144, 172), new ur.Point(145, 175), new ur.Point(151, 189), new ur.Point(156, 201), new ur.Point(161, 213), new ur.Point(166, 225), new ur.Point(169, 233), new ur.Point(171, 236), new ur.Point(174, 243), new ur.Point(177, 247), new ur.Point(178, 249), new ur.Point(179, 251), new ur.Point(180, 253), new ur.Point(180, 255), new ur.Point(179, 257), new ur.Point(177, 257), new ur.Point(174, 255), new ur.Point(169, 250), new ur.Point(164, 247), new ur.Point(160, 245), new ur.Point(149, 238), new ur.Point(138, 230), new ur.Point(127, 221), new ur.Point(124, 220), new ur.Point(112, 212), new ur.Point(110, 210), new ur.Point(96, 201), new ur.Point(84, 195), new ur.Point(74, 190), new ur.Point(64, 182), new ur.Point(55, 175), new ur.Point(51, 172), new ur.Point(49, 170), new ur.Point(51, 169), new ur.Point(56, 169), new ur.Point(66, 169), new ur.Point(78, 168), new ur.Point(92, 166), new ur.Point(107, 164), new ur.Point(123, 161), new ur.Point(140, 162), new ur.Point(156, 162), new ur.Point(171, 160), new ur.Point(173, 160), new ur.Point(186, 160), new ur.Point(195, 160), new ur.Point(198, 161), new ur.Point(203, 163), new ur.Point(208, 163), new ur.Point(206, 164), new ur.Point(200, 167), new ur.Point(187, 172), new ur.Point(174, 179), new ur.Point(172, 181), new ur.Point(153, 192), new ur.Point(137, 201), new ur.Point(123, 211), new ur.Point(112, 220), new ur.Point(99, 229), new ur.Point(90, 237), new ur.Point(80, 244), new ur.Point(73, 250), new ur.Point(69, 254), new ur.Point(69, 252));
        };
        p.addGesture_pigtail = function () {
            return new Array(new ur.Point(81, 219), new ur.Point(84, 218), new ur.Point(86, 220), new ur.Point(88, 220), new ur.Point(90, 220), new ur.Point(92, 219), new ur.Point(95, 220), new ur.Point(97, 219), new ur.Point(99, 220), new ur.Point(102, 218), new ur.Point(105, 217), new ur.Point(107, 216), new ur.Point(110, 216), new ur.Point(113, 214), new ur.Point(116, 212), new ur.Point(118, 210), new ur.Point(121, 208), new ur.Point(124, 205), new ur.Point(126, 202), new ur.Point(129, 199), new ur.Point(132, 196), new ur.Point(136, 191), new ur.Point(139, 187), new ur.Point(142, 182), new ur.Point(144, 179), new ur.Point(146, 174), new ur.Point(148, 170), new ur.Point(149, 168), new ur.Point(151, 162), new ur.Point(152, 160), new ur.Point(152, 157), new ur.Point(152, 155), new ur.Point(152, 151), new ur.Point(152, 149), new ur.Point(152, 146), new ur.Point(149, 142), new ur.Point(148, 139), new ur.Point(145, 137), new ur.Point(141, 135), new ur.Point(139, 135), new ur.Point(134, 136), new ur.Point(130, 140), new ur.Point(128, 142), new ur.Point(126, 145), new ur.Point(122, 150), new ur.Point(119, 158), new ur.Point(117, 163), new ur.Point(115, 170), new ur.Point(114, 175), new ur.Point(117, 184), new ur.Point(120, 190), new ur.Point(125, 199), new ur.Point(129, 203), new ur.Point(133, 208), new ur.Point(138, 213), new ur.Point(145, 215), new ur.Point(155, 218), new ur.Point(164, 219), new ur.Point(166, 219), new ur.Point(177, 219), new ur.Point(182, 218), new ur.Point(192, 216), new ur.Point(196, 213), new ur.Point(199, 212), new ur.Point(201, 211));
        };
        d(p, "swipeAngle"
            /////////////////////////////////////////expression/////////////////////////////////////////////
            ,function () {
                return this._swipeAngle;
            }
        );
        d(p, "swipeGlobalAngle"
            ,function () {
                return this._swipeGlobalAngle;
            }
        );
        d(p, "swipeDistane"
            ,function () {
                return this._swipeDistance;
            }
        );
        d(p, "swipeTime"
            ,function () {
                return this._swipeTime;
            }
        );
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.showHelpline = this.showHelpline;
            o.helplineColor = this.helplineColor;
            o.helplineThick = this.helplineThick;
            o.fadeTime = this.fadeTime;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.showHelpline = o.showHelpline;
                this.helplineColor = o.helplineColor;
                this.helplineThick = o.helplineThick;
                this.fadeTime = o.fadeTime;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.showHelpline = this.showHelpline;
            bh.helplineColor = this.helplineColor;
            bh.helplineThick = this.helplineThick;
            bh.fadeTime = this.fadeTime;
            return bh;
        };
        GestureBehavior.TRIANGLE = "triangle";
        GestureBehavior.X = "x";
        GestureBehavior.RECTANGLE = "rectangle";
        GestureBehavior.CIRCLE = "circle";
        GestureBehavior.CHECK = "check";
        GestureBehavior.CARET = "caret";
        GestureBehavior.ZIG_ZAG = "zig-zag";
        GestureBehavior.ARROW = "arrow";
        GestureBehavior.LEFT_SQUARE_BRACKET = "left square bracket";
        GestureBehavior.RIGHT_SQUARE_BRACKET = "right square bracket";
        GestureBehavior.V = "v";
        GestureBehavior.DELETE = "delete";
        GestureBehavior.LEFT_CURLY_BRACE = "left curly brace";
        GestureBehavior.RIGHT_CURLY_BRACE = "right curly brace";
        GestureBehavior.STAR = "star";
        GestureBehavior.PIGTAIL = "pigtail";
        GestureBehavior.DOUBLE_TAP_TIME = 300; //双击时间间隔
        GestureBehavior.DOUBLE_TAP_DISTANCE = 80; //距离容差值
        GestureBehavior.SHORT_TAP_TIME = 400;
        GestureBehavior.LONG_TAP_TIME = 800;
        //滑屏
        //需要判断释放点与起始点的距离
        GestureBehavior.SWIPE_DISTANCE = 150; //滑屏的距离
        GestureBehavior.SWIPE_TIME = 200; //滑屏最小的时间，单位：毫秒
        GestureBehavior.SWIPE_POINT_NUMS = 30; //滑屏时需要移动的点        
        return GestureBehavior;
    }(ls.BaseBehavior));
    ls.GestureBehavior = GestureBehavior;
    egret.registerClass(GestureBehavior,'ls.GestureBehavior');
    var OnTriangleDrawEvent = (function (_super) {
        __extends(OnTriangleDrawEvent, _super);
        function OnTriangleDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnTriangleDrawEvent,p=c.prototype;
        return OnTriangleDrawEvent;
    }(ls.BaseEvent));
    ls.OnTriangleDrawEvent = OnTriangleDrawEvent;
    egret.registerClass(OnTriangleDrawEvent,'ls.OnTriangleDrawEvent');
    var OnXDrawEvent = (function (_super) {
        __extends(OnXDrawEvent, _super);
        function OnXDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnXDrawEvent,p=c.prototype;
        return OnXDrawEvent;
    }(ls.BaseEvent));
    ls.OnXDrawEvent = OnXDrawEvent;
    egret.registerClass(OnXDrawEvent,'ls.OnXDrawEvent');
    var OnRectangleDrawEvent = (function (_super) {
        __extends(OnRectangleDrawEvent, _super);
        function OnRectangleDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnRectangleDrawEvent,p=c.prototype;
        return OnRectangleDrawEvent;
    }(ls.BaseEvent));
    ls.OnRectangleDrawEvent = OnRectangleDrawEvent;
    egret.registerClass(OnRectangleDrawEvent,'ls.OnRectangleDrawEvent');
    var OnCircleDrawEvent = (function (_super) {
        __extends(OnCircleDrawEvent, _super);
        function OnCircleDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnCircleDrawEvent,p=c.prototype;
        return OnCircleDrawEvent;
    }(ls.BaseEvent));
    ls.OnCircleDrawEvent = OnCircleDrawEvent;
    egret.registerClass(OnCircleDrawEvent,'ls.OnCircleDrawEvent');
    var OnCheckDrawEvent = (function (_super) {
        __extends(OnCheckDrawEvent, _super);
        function OnCheckDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnCheckDrawEvent,p=c.prototype;
        return OnCheckDrawEvent;
    }(ls.BaseEvent));
    ls.OnCheckDrawEvent = OnCheckDrawEvent;
    egret.registerClass(OnCheckDrawEvent,'ls.OnCheckDrawEvent');
    var OnCaretDrawEvent = (function (_super) {
        __extends(OnCaretDrawEvent, _super);
        function OnCaretDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnCaretDrawEvent,p=c.prototype;
        return OnCaretDrawEvent;
    }(ls.BaseEvent));
    ls.OnCaretDrawEvent = OnCaretDrawEvent;
    egret.registerClass(OnCaretDrawEvent,'ls.OnCaretDrawEvent');
    var OnZigZagDrawEvent = (function (_super) {
        __extends(OnZigZagDrawEvent, _super);
        function OnZigZagDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnZigZagDrawEvent,p=c.prototype;
        return OnZigZagDrawEvent;
    }(ls.BaseEvent));
    ls.OnZigZagDrawEvent = OnZigZagDrawEvent;
    egret.registerClass(OnZigZagDrawEvent,'ls.OnZigZagDrawEvent');
    var OnArrowDrawEvent = (function (_super) {
        __extends(OnArrowDrawEvent, _super);
        function OnArrowDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnArrowDrawEvent,p=c.prototype;
        return OnArrowDrawEvent;
    }(ls.BaseEvent));
    ls.OnArrowDrawEvent = OnArrowDrawEvent;
    egret.registerClass(OnArrowDrawEvent,'ls.OnArrowDrawEvent');
    var OnLeft_square_bracketDrawEvent = (function (_super) {
        __extends(OnLeft_square_bracketDrawEvent, _super);
        function OnLeft_square_bracketDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLeft_square_bracketDrawEvent,p=c.prototype;
        return OnLeft_square_bracketDrawEvent;
    }(ls.BaseEvent));
    ls.OnLeft_square_bracketDrawEvent = OnLeft_square_bracketDrawEvent;
    egret.registerClass(OnLeft_square_bracketDrawEvent,'ls.OnLeft_square_bracketDrawEvent');
    var OnRight_square_bracketDrawEvent = (function (_super) {
        __extends(OnRight_square_bracketDrawEvent, _super);
        function OnRight_square_bracketDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnRight_square_bracketDrawEvent,p=c.prototype;
        return OnRight_square_bracketDrawEvent;
    }(ls.BaseEvent));
    ls.OnRight_square_bracketDrawEvent = OnRight_square_bracketDrawEvent;
    egret.registerClass(OnRight_square_bracketDrawEvent,'ls.OnRight_square_bracketDrawEvent');
    var OnVDrawEvent = (function (_super) {
        __extends(OnVDrawEvent, _super);
        function OnVDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnVDrawEvent,p=c.prototype;
        return OnVDrawEvent;
    }(ls.BaseEvent));
    ls.OnVDrawEvent = OnVDrawEvent;
    egret.registerClass(OnVDrawEvent,'ls.OnVDrawEvent');
    var OnLeft_curly_braceEvent = (function (_super) {
        __extends(OnLeft_curly_braceEvent, _super);
        function OnLeft_curly_braceEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLeft_curly_braceEvent,p=c.prototype;
        return OnLeft_curly_braceEvent;
    }(ls.BaseEvent));
    ls.OnLeft_curly_braceEvent = OnLeft_curly_braceEvent;
    egret.registerClass(OnLeft_curly_braceEvent,'ls.OnLeft_curly_braceEvent');
    var OnRight_curly_braceDrawEvent = (function (_super) {
        __extends(OnRight_curly_braceDrawEvent, _super);
        function OnRight_curly_braceDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnRight_curly_braceDrawEvent,p=c.prototype;
        return OnRight_curly_braceDrawEvent;
    }(ls.BaseEvent));
    ls.OnRight_curly_braceDrawEvent = OnRight_curly_braceDrawEvent;
    egret.registerClass(OnRight_curly_braceDrawEvent,'ls.OnRight_curly_braceDrawEvent');
    var OnDeleteDrawEvent = (function (_super) {
        __extends(OnDeleteDrawEvent, _super);
        function OnDeleteDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnDeleteDrawEvent,p=c.prototype;
        return OnDeleteDrawEvent;
    }(ls.BaseEvent));
    ls.OnDeleteDrawEvent = OnDeleteDrawEvent;
    egret.registerClass(OnDeleteDrawEvent,'ls.OnDeleteDrawEvent');
    var OnStarDrawEvent = (function (_super) {
        __extends(OnStarDrawEvent, _super);
        function OnStarDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnStarDrawEvent,p=c.prototype;
        return OnStarDrawEvent;
    }(ls.BaseEvent));
    ls.OnStarDrawEvent = OnStarDrawEvent;
    egret.registerClass(OnStarDrawEvent,'ls.OnStarDrawEvent');
    var OnPigtailDrawEvent = (function (_super) {
        __extends(OnPigtailDrawEvent, _super);
        function OnPigtailDrawEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPigtailDrawEvent,p=c.prototype;
        return OnPigtailDrawEvent;
    }(ls.BaseEvent));
    ls.OnPigtailDrawEvent = OnPigtailDrawEvent;
    egret.registerClass(OnPigtailDrawEvent,'ls.OnPigtailDrawEvent');
    var OnDoubleTapEvent = (function (_super) {
        __extends(OnDoubleTapEvent, _super);
        function OnDoubleTapEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnDoubleTapEvent,p=c.prototype;
        return OnDoubleTapEvent;
    }(ls.BaseEvent));
    ls.OnDoubleTapEvent = OnDoubleTapEvent;
    egret.registerClass(OnDoubleTapEvent,'ls.OnDoubleTapEvent');
    var OnShortTapEvent = (function (_super) {
        __extends(OnShortTapEvent, _super);
        function OnShortTapEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnShortTapEvent,p=c.prototype;
        return OnShortTapEvent;
    }(ls.BaseEvent));
    ls.OnShortTapEvent = OnShortTapEvent;
    egret.registerClass(OnShortTapEvent,'ls.OnShortTapEvent');
    var OnLongTapEvent = (function (_super) {
        __extends(OnLongTapEvent, _super);
        function OnLongTapEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLongTapEvent,p=c.prototype;
        return OnLongTapEvent;
    }(ls.BaseEvent));
    ls.OnLongTapEvent = OnLongTapEvent;
    egret.registerClass(OnLongTapEvent,'ls.OnLongTapEvent');
    var OnSwipeEvent = (function (_super) {
        __extends(OnSwipeEvent, _super);
        function OnSwipeEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnSwipeEvent,p=c.prototype;
        return OnSwipeEvent;
    }(ls.BaseEvent));
    ls.OnSwipeEvent = OnSwipeEvent;
    egret.registerClass(OnSwipeEvent,'ls.OnSwipeEvent');
    var OnSwipeLeftEvent = (function (_super) {
        __extends(OnSwipeLeftEvent, _super);
        function OnSwipeLeftEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnSwipeLeftEvent,p=c.prototype;
        return OnSwipeLeftEvent;
    }(ls.BaseEvent));
    ls.OnSwipeLeftEvent = OnSwipeLeftEvent;
    egret.registerClass(OnSwipeLeftEvent,'ls.OnSwipeLeftEvent');
    var OnSwipeRightEvent = (function (_super) {
        __extends(OnSwipeRightEvent, _super);
        function OnSwipeRightEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnSwipeRightEvent,p=c.prototype;
        return OnSwipeRightEvent;
    }(ls.BaseEvent));
    ls.OnSwipeRightEvent = OnSwipeRightEvent;
    egret.registerClass(OnSwipeRightEvent,'ls.OnSwipeRightEvent');
    var OnSwipeUpEvent = (function (_super) {
        __extends(OnSwipeUpEvent, _super);
        function OnSwipeUpEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnSwipeUpEvent,p=c.prototype;
        return OnSwipeUpEvent;
    }(ls.BaseEvent));
    ls.OnSwipeUpEvent = OnSwipeUpEvent;
    egret.registerClass(OnSwipeUpEvent,'ls.OnSwipeUpEvent');
    var OnSwipeDownEvent = (function (_super) {
        __extends(OnSwipeDownEvent, _super);
        function OnSwipeDownEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnSwipeDownEvent,p=c.prototype;
        return OnSwipeDownEvent;
    }(ls.BaseEvent));
    ls.OnSwipeDownEvent = OnSwipeDownEvent;
    egret.registerClass(OnSwipeDownEvent,'ls.OnSwipeDownEvent');
    var OnPinchTapEvent = (function (_super) {
        __extends(OnPinchTapEvent, _super);
        function OnPinchTapEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPinchTapEvent,p=c.prototype;
        return OnPinchTapEvent;
    }(ls.BaseEvent));
    ls.OnPinchTapEvent = OnPinchTapEvent;
    egret.registerClass(OnPinchTapEvent,'ls.OnPinchTapEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map