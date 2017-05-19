var ls;
(function (ls) {
    var AIDisplayObject = (function (_super) {
        __extends(AIDisplayObject, _super);
        function AIDisplayObject() {
            _super.call(this);
            this._isAddToStage = false;
            this._collision = false;
            this._isCollisioning = false;
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
            return new egret.Rectangle(this.x - this.anchorOffsetX, this.y - this.anchorOffsetY, this.width, this.height);
        };
        p.getGlobalBounds = function () {
            //强制刷新渲染
            this.renderUpdate();
            return this.container.getTransformedBounds(ls.GameUILayer.stage);
        };
        p.renderUpdate = function () {
            if (this.container.x != this.x)
                this.container.x = this.x;
            if (this.container.y != this.y)
                this.container.y = this.y;
            if (this.container.width != this.width)
                this.container.width = this.width;
            if (this.container.height != this.height)
                this.container.height = this.height;
            if (this.scaleContainer) {
                if (this.container.scaleX != this.scaleX)
                    this.container.scaleX = this.scaleX;
                if (this.container.scaleY != this.scaleY)
                    this.container.scaleY = this.scaleY;
            }
            if (this.container.rotation != this.angle)
                this.container.rotation = this.angle;
            if (this.container.anchorOffsetX != this.width * this.anchorX)
                this.container.anchorOffsetX = this.width * this.anchorX;
            if (this.container.anchorOffsetY != this.height * this.anchorY)
                this.container.anchorOffsetY = this.height * this.anchorY;
            if (this.container.alpha != this.alpha)
                this.container.alpha = this.alpha;
            if (this.container.visible != this.visible)
                this.container.visible = this.visible;
        };
        d(p, "box"
            ,function () {
                return this.getGlobalBounds();
            }
        );
        d(p, "quad"
            ,function () {
                if (this._quad == null)
                    this._quad = new ls.Quad();
                var bounds = this.getGlobalBounds();
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
        };
        p.setBoolean = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject setBoolean parameter type incorrect!!");
            this[$instanceVariables] = (value == 1);
        };
        p.setValue = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            this[$instanceVariables] = value;
        };
        p.subtractFrom = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject subtractFrom parameter type incorrect!!");
            this[$instanceVariables] -= value;
        };
        p.toogleBoolean = function ($instanceVariables) {
            this[$instanceVariables] = !this[$instanceVariables];
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
            var collsionObjectList = ls.World.getInstance().collisionObjectList;
            var index = collsionObjectList.indexOf(this);
            if (this.collision) {
                if (index == -1)
                    collsionObjectList.push(this);
            }
            else {
                var index = collsionObjectList.indexOf(this);
                if (index != -1)
                    collsionObjectList.splice(index, 1);
            }
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
            o["collisionData"] = this.collisionData;
            o["collisionType"] = this.collisionType;
            o["collisionVectorData"] = this.collisionVectorData;
            o["collisionSourceVectorData"] = this.collisionSourceVectorData;
            o["scaleContainer"] = this.scaleContainer;
            o["enabled"] = this.enabled;
            o["relyOnTarget"] = this.relyOnTarget;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
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
                this.collisionData = o["collisionData"];
                this.collisionType = o["collisionType"];
                this.collisionVectorData = o["collisionVectorData"];
                this.collisionSourceVectorData = o["collisionSourceVectorData"];
                this.scaleContainer = o["scaleContainer"];
                this.enabled = o["enabled"];
                this.relyOnTarget = o["relyOnTarget"];
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
            cl.global = this.global;
            cl.collisionData = this.collisionData;
            cl.collisionType = this.collisionType;
            cl.collisionVectorData = this.collisionVectorData;
            cl.collisionSourceVectorData = this.collisionSourceVectorData;
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