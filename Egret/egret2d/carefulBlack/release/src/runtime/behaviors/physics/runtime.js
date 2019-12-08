var ls;
(function (ls) {
    /**
     * 物理行为（Box2D版）
     * 碰撞区域与用IDE编辑的区域一致
     */
    var PhysicsBehavior = (function (_super) {
        __extends(PhysicsBehavior, _super);
        function PhysicsBehavior() {
            _super.call(this);
            this.isActive = 1;
            this.density = 3;
            this.friction = 0.5; //范围0~1
            this.restitution = 0.3; //范围0~1
            this.isStatic = 2; //是否是静态对象
            this.forceType = 0; //应用力类型
            this.useCustomGravity = 0; //使用自身重力系统
            this.isBullet = 2; //是否是子弹
            this.isFixedRotation = 2; //是否固定旋转
            this.isFilter = 1; //是否进行碰撞组过滤,规则相对于较复杂
            PhysicsBehavior.createNums++;
            this.enabled;
        }
        var d = __define,c=PhysicsBehavior,p=c.prototype;
        p.tick = function () {
            if (!this.inst)
                return;
        };
        p.onCreate = function () {
            this.density = ls.eval_e(this.density);
            this.friction = ls.eval_e(this.friction);
            this.restitution = ls.eval_e(this.restitution);
            this.isStatic = ls.eval_e(this.isStatic);
            this.forceType = ls.eval_e(this.forceType);
            this.useCustomGravity = ls.eval_e(this.useCustomGravity);
            this.gravityX = ls.eval_e(this.gravityX);
            this.gravityY = ls.eval_e(this.gravityY);
            this.supportDrag = ls.eval_e(this.supportDrag);
            this.dragMaxForce = ls.eval_e(this.dragMaxForce);
            this.isSensor = ls.eval_e(this.isSensor) == 1;
            this.isBullet = ls.eval_e(this.isBullet) == 1;
            this.isFixedRotation = ls.eval_e(this.isFixedRotation == 1);
            this.isActive = ls.eval_e(this.isActive) == 1;
            this.isDebug = ls.eval_e(this.isDebug) == 1;
            this.isFilter = ls.eval_e(this.isFilter) == 1;
            this.groupIndex = ls.eval_e(this.groupIndex);
            this.categoryBits = ls.eval_e(this.categoryBits);
            this.maskBits = ls.eval_e(this.maskBits);
            egret.callLater(function () {
                var _x = this.inst.x;
                var _y = this.inst.y;
                this.bodyDef = new Box2D.Dynamics.b2BodyDef();
                this.bodyDef.position = new Box2D.Common.Math.b2Vec2(_x / PhysicsBehavior.p2m, _y / PhysicsBehavior.p2m);
                this.bodyDef.type = (this.isStatic == 1) ? Box2D.Dynamics.b2Body.b2_staticBody : Box2D.Dynamics.b2Body.b2_dynamicBody;
                this.bodyDef.angle = this.inst.angle * Math.PI / 180;
                this.bodyDef.userData = this.inst.container;
                this.body = PhysicsBehavior.world.CreateBody(this.bodyDef);
                this.body["inst"] = this.inst;
                this.body["physicBehavior"] = this;
                this.body.SetBullet(this.isBullet);
                this.body.SetFixedRotation(this.isFixedRotation);
                this.body.SetActive(this.isActive);
                this.fixtureDef = new Box2D.Dynamics.b2FixtureDef();
                this.fixtureDef.density = this.density;
                this.fixtureDef.restitution = this.restitution;
                this.fixtureDef.friction = this.friction;
                this.fixtureDef.isSensor = this.isSensor;
                if (this.isFilter) {
                    var filterData = new Box2D.Dynamics.b2FilterData();
                    filterData.groupIndex = this.groupIndex;
                    filterData.categoryBits = this.categoryBits;
                    filterData.maskBits = this.maskBits;
                    this.fixtureDef.filter = filterData;
                }
                //tilemap实例的碰撞区域由编辑器设置的名称决定
                if (this.inst["tilemap"]) {
                    this.inst.addEventListener("tiledInitialize", this.onTilemapComplete, this);
                }
                else {
                    //多边形形状 0 多边形 1 圆 2 点
                    var shape;
                    if (this.inst.collisionType == 0) {
                        var verticesData = this.inst.collisionSourceVectorData[0];
                        var vertices = [];
                        for (var m = 0; m < verticesData.length; m++) {
                            vertices[m] = new Box2D.Common.Math.b2Vec2((verticesData[m].x - this.inst.anchorOffsetX) / PhysicsBehavior.p2m, (verticesData[m].y - this.inst.anchorOffsetY) / PhysicsBehavior.p2m);
                        }
                        var separator = new b2Separator();
                        var validate = separator.validate(vertices);
                        if (validate == 2) {
                            vertices = vertices.reverse();
                        }
                        else if (validate != 0) {
                            return;
                        }
                        separator.separate(this.body, this.fixtureDef, vertices);
                    }
                    else if (this.inst.collisionType == 1) {
                        shape = new Box2D.Collision.Shapes.b2CircleShape();
                        var circle1 = this.inst.collisionVectorData;
                        shape.SetRadius(circle1.radius / PhysicsBehavior.p2m);
                        this.fixtureDef.shape = shape;
                        this.body.CreateFixture(this.fixtureDef);
                    }
                    else if (this.inst.collisionType == 2) {
                        //如果用点，就改为外边框
                        shape = Box2D.Collision.Shapes.b2PolygonShape.AsBox(this.inst.width / 2 / PhysicsBehavior.p2m, this.inst.height / 2 / PhysicsBehavior.p2m);
                        this.fixtureDef.shape = shape;
                        this.body.CreateFixture(this.fixtureDef);
                    }
                }
                //如果有重力值，使用自己的重力系统
                this.body.useCustomGravity = (this.useCustomGravity == 1) ? true : false;
                if (this.body.useCustomGravity) {
                    this.body.m_customGravity = new Box2D.Common.Math.b2Vec2(this.gravityX, this.gravityY);
                }
                this.body.beginContactHandler = this.onContactHanlder;
                if (this.onBodyComplete != null)
                    this.onBodyComplete.apply(null, this.onBodyCompleteParams);
            }, this);
            if (PhysicsBehavior.createNums == 1) {
                this.createDebug();
                //创建碰撞侦听函数
                PhysicsBehavior.contactListener = new MyContactListener();
                PhysicsBehavior.world.SetContactListener(PhysicsBehavior.contactListener);
                ls.EventSheetDecoder.onEventSheetTick = function () {
                    PhysicsBehavior.world.Step(1 / 60, 10, 10);
                    for (var _body = PhysicsBehavior.world.GetBodyList(); _body; _body = _body.GetNext()) {
                        if (_body.GetUserData() != null) {
                            var object = _body.GetUserData()["owner"];
                            var m = new egret.Matrix();
                            m.translate(-object.width / 2 + object.anchorOffsetX, -object.height / 2 + object.anchorOffsetY);
                            m.rotate(_body.GetAngle());
                            object.x = (_body.GetPosition().x) * PhysicsBehavior.p2m;
                            object.y = (_body.GetPosition().y) * PhysicsBehavior.p2m;
                            object.angle = _body.GetAngle() * 180 / Math.PI;
                        }
                    }
                    PhysicsBehavior.world.ClearForces();
                    PhysicsBehavior.world.DrawDebugData();
                };
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPhysicsStageTouchEvent, this);
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onPhysicsStageTouchEvent, this);
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onPhysicsStageTouchEvent, this);
            }
            ls.World.onWorldDestory = function () {
                PhysicsBehavior.clearBodies();
            };
        };
        p.onTilemapComplete = function (event) {
            var polyShape;
            var collision_rects = this.inst.getCollisionRects();
            if (collision_rects) {
                for (var i = 0; i < collision_rects.length; i++) {
                    var cr = collision_rects[i];
                    polyShape = new Box2D.Collision.Shapes.b2PolygonShape();
                    var verticles = [];
                    verticles[0] = new Box2D.Common.Math.b2Vec2((cr.x - this.inst.x) / PhysicsBehavior.p2m, (cr.y - this.inst.y) / PhysicsBehavior.p2m);
                    verticles[1] = new Box2D.Common.Math.b2Vec2((cr.x + cr.width - this.inst.x) / PhysicsBehavior.p2m, (cr.y - this.inst.y) / PhysicsBehavior.p2m);
                    verticles[2] = new Box2D.Common.Math.b2Vec2((cr.x + cr.width - this.inst.x) / PhysicsBehavior.p2m, (cr.y + cr.height - this.inst.y) / PhysicsBehavior.p2m);
                    verticles[3] = new Box2D.Common.Math.b2Vec2((cr.x - this.inst.x) / PhysicsBehavior.p2m, (cr.y + cr.height - this.inst.y) / PhysicsBehavior.p2m);
                    polyShape.SetAsVector(verticles);
                    this.fixtureDef.shape = polyShape;
                    this.body.CreateFixture(this.fixtureDef);
                }
            }
        };
        p.getObject = function () {
            return this.body.GetUserData()["owner"];
        };
        p.onContactHanlder = function () {
            var contact = PhysicsBehavior.contactListener.myContact;
            var manifold = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(manifold);
            this._beginCollisionX = manifold.m_points[0].x * PhysicsBehavior.p2m;
            this._beginCollisionY = manifold.m_points[1].y * PhysicsBehavior.p2m;
        };
        /** 结束碰撞点 */
        p.onEndContactHanlder = function () {
            var contact = PhysicsBehavior.contactListener.myContact;
            var manifold = new Box2D.Collision.b2WorldManifold();
            contact.GetWorldManifold(manifold);
            this._endCollisionX = manifold.m_points[0].x * PhysicsBehavior.p2m;
            this._endCollisionY = manifold.m_points[1].y * PhysicsBehavior.p2m;
        };
        p.onPhysicsStageTouchEvent = function (event) {
            this.touchX = event.stageX;
            this.touchY = event.stageY;
            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    if (PhysicsBehavior.mouseJoint != null) {
                        PhysicsBehavior.world.DestroyJoint(PhysicsBehavior.mouseJoint);
                        PhysicsBehavior.mouseJoint = null;
                        PhysicsBehavior.mouseBody = null;
                    }
                    PhysicsBehavior.isDragBodyWithMouse = true;
                    var _getBody = this.getBodyAtMouse(event.stageX, event.stageY);
                    if (_getBody) {
                        var curPhysicBehavior = _getBody["physicBehavior"];
                        if (curPhysicBehavior) {
                            if (curPhysicBehavior.supportDrag == 1) {
                                this.startDragBody(_getBody, curPhysicBehavior.dragMaxForce);
                            }
                            if (curPhysicBehavior.onTouchBegin != null) {
                                curPhysicBehavior.onTouchBegin(_getBody);
                            }
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    if (PhysicsBehavior.isDragBodyWithMouse) {
                        PhysicsBehavior.isDragBodyWithMouse = false;
                        //删除鼠标关节
                        if (PhysicsBehavior.mouseJoint != null) {
                            PhysicsBehavior.world.DestroyJoint(PhysicsBehavior.mouseJoint);
                            PhysicsBehavior.mouseJoint = null;
                            PhysicsBehavior.mouseBody = null;
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    if (PhysicsBehavior.mouseJoint && PhysicsBehavior.mouseBody) {
                        var mouseV = new Box2D.Common.Math.b2Vec2(this.touchX / PhysicsBehavior.p2m, this.touchY / PhysicsBehavior.p2m);
                        PhysicsBehavior.mouseJoint.SetTarget(mouseV);
                    }
                    break;
            }
        };
        //设置是否是支持拖拽
        p.setSupportDrag = function (support) {
            var _supportDrag = ls.eval_e(support);
            if (this.supportDrag != _supportDrag)
                this.supportDrag = _supportDrag;
        };
        p.startDragBody = function (body, maxForce) {
            if (maxForce === void 0) { maxForce = 1000; }
            //如果按下的刚体为空，退出
            if (body == null)
                return;
            PhysicsBehavior.mouseBody = body;
            PhysicsBehavior.isDragBodyWithMouse = true;
            var mouseJointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();
            //设置鼠标关节的一个节点为空刚体，GetGroundBody()可以理解为空刚体
            mouseJointDef.bodyA = PhysicsBehavior.world.GetGroundBody();
            mouseJointDef.bodyB = body;
            mouseJointDef.maxForce = maxForce; //设置鼠标可以施加的最大力
            var localPos = body["inst"].container.globalToLocal(this.touchX, this.touchY);
            mouseJointDef["target"].Set(this.touchX / PhysicsBehavior.p2m, this.touchY / PhysicsBehavior.p2m);
            //创建鼠标关节
            PhysicsBehavior.mouseJoint = PhysicsBehavior.world.CreateJoint(mouseJointDef);
        };
        /**
         * 根据坐标获取刚体
         * @param mouseX
         * @param mouseY
         */
        p.getBodyAtMouse = function (mouseX, mouseY) {
            var mouseV = new Box2D.Common.Math.b2Vec2(mouseX / PhysicsBehavior.p2m, mouseY / PhysicsBehavior.p2m);
            var bodyAtMouse = null;
            PhysicsBehavior.world.QueryPoint(function (fixture) {
                if (fixture == null)
                    return;
                bodyAtMouse = fixture.GetBody();
            }, mouseV);
            return bodyAtMouse;
        };
        p.getTargets = function (targets) {
            var realTargets = [];
            var index = targets.indexOf(',');
            if (index != -1) {
                realTargets.push(this.inst);
                var _targets = targets.split(',');
                for (var i = 0; i < _targets.length; i++) {
                    var _target = ls.eval_e(_targets[i]);
                    var physicsBehavior = _target.getBehavior(PhysicsBehavior);
                    if (_target != this.inst && physicsBehavior) {
                        realTargets.push(_target);
                    }
                }
            }
            else {
                var _otherTarget = ls.eval_e(targets);
                var physicsBehavior = _otherTarget.getBehavior(PhysicsBehavior);
                if (physicsBehavior) {
                    realTargets.push(this.inst, _otherTarget);
                }
            }
            return realTargets;
        };
        /**
         * 设置关节目标列表，这里的目标取名字
         */
        p.setDistanceJointList = function (targets, collideConnected) {
            if (collideConnected === void 0) { collideConnected = false; }
            egret.callLater(function () {
                if (targets) {
                    var realTargets = this.getTargets(targets);
                    //创建一条连接刚体
                    if (realTargets.length > 1) {
                        for (var i = 0; i < realTargets.length; i++) {
                            //取每个实例的物理行为
                            if (i < realTargets.length - 1) {
                                var curInst = realTargets[i];
                                var nextInst = realTargets[i + 1];
                                var curPhysicsBehavior = curInst.getBehavior(PhysicsBehavior);
                                var nextPhysicsBehavior = nextInst.getBehavior(PhysicsBehavior);
                                var curBody = curPhysicsBehavior.body;
                                var nextBody = nextPhysicsBehavior.body;
                                var distanceJointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
                                distanceJointDef.Initialize(curBody, nextBody, new Box2D.Common.Math.b2Vec2(curInst.x / PhysicsBehavior.p2m, curInst.y / PhysicsBehavior.p2m), new Box2D.Common.Math.b2Vec2(nextInst.x / PhysicsBehavior.p2m, nextInst.y / PhysicsBehavior.p2m));
                                distanceJointDef.collideConnected = collideConnected; //连接两个刚体之间不进行碰撞
                                var joint = PhysicsBehavior.world.CreateJoint(distanceJointDef);
                            }
                        }
                    }
                }
            }, this);
        };
        /**
         * 创建锁链效果,需要设置某个刚体为静态刚体
         */
        p.setChainList = function (targets) {
            egret.callLater(function () {
                if (targets) {
                    var realTargets = this.getTargets(targets);
                    var prePhysicsBehavior = realTargets[0].getBehavior(PhysicsBehavior);
                    var preBody;
                    //定义关节
                    var revouteJoint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                    for (var i = 0; i < realTargets.length; i++) {
                        var curPhysicBehavior = realTargets[i].getBehavior(PhysicsBehavior);
                        var curBody = curPhysicBehavior.body;
                        if (i == 0) {
                            preBody = curBody;
                        }
                        else {
                            var object = curBody.GetUserData()["owner"];
                            var position = curBody.GetPosition();
                            var anchor = new Box2D.Common.Math.b2Vec2();
                            anchor.Set(position.x + (object.anchorOffsetX - object.width / 2) / PhysicsBehavior.p2m, position.y + (object.anchorOffsetY - object.height / 2) / PhysicsBehavior.p2m);
                            revouteJoint.Initialize(preBody, curBody, anchor);
                            PhysicsBehavior.world.CreateJoint(revouteJoint);
                            preBody = curBody;
                        }
                    }
                }
            }, this);
        };
        /**
         * 设置马达关节
         */
        p.setRevoluteJointList = function (target, motorSpeed, maxMotorTorque, collideConnected) {
            if (motorSpeed === void 0) { motorSpeed = 3; }
            if (maxMotorTorque === void 0) { maxMotorTorque = 500; }
            if (collideConnected === void 0) { collideConnected = false; }
            egret.callLater(function () {
                var realTargets = [this.inst, target];
                //创建一条连接刚体
                if (realTargets.length > 1) {
                    for (var i = 0; i < realTargets.length; i++) {
                        if (i < realTargets.length - 1) {
                            var curInst = realTargets[i];
                            var nextInst = realTargets[i + 1];
                            var curPhysicsBehavior = curInst.getBehavior(PhysicsBehavior);
                            var nextPhysicsBehavior = nextInst.getBehavior(PhysicsBehavior);
                            var curBody = curPhysicsBehavior.body;
                            var nextBody = nextPhysicsBehavior.body;
                            var revoluteJoint = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                            revoluteJoint.Initialize(curBody, nextBody, new Box2D.Common.Math.b2Vec2(curInst.x / PhysicsBehavior.p2m, curInst.y / PhysicsBehavior.p2m));
                            revoluteJoint.enableMotor = true;
                            revoluteJoint.motorSpeed = ls.eval_e(motorSpeed) * Math.PI / 180 * 60;
                            revoluteJoint.maxMotorTorque = ls.eval_e(maxMotorTorque);
                            PhysicsBehavior.world.CreateJoint(revoluteJoint);
                        }
                    }
                }
            }, this);
        };
        /**
         * 应用扭矩
         */
        p.applyTorque = function (torque) {
            torque = ls.eval_e(torque);
            this.body.ApplyTorque(torque);
        };
        /**
         * 应用力
         */
        p.applyForce = function (type, xSpeed, ySpeed) {
            if (this.body) {
                var type = ls.eval_e(type);
                var xSpeed = ls.eval_e(xSpeed);
                var ySpeed = ls.eval_e(ySpeed);
                var v = new Box2D.Common.Math.b2Vec2(xSpeed, ySpeed);
                //this.body.GetWorldCenter()用于获取刚体的重心
                this._applyForce(type, v);
            }
        };
        /**
         * 基于角度应用力
         */
        p.applyForceByAngle = function (type, angle, maxForce) {
            var type = ls.eval_e(type);
            var angle = ls.eval_e(angle);
            var maxForce = ls.eval_e(maxForce);
            var radian = angle * Math.PI / 180;
            var v = new Box2D.Common.Math.b2Vec2(Math.cos(radian), Math.sin(radian));
            v.Multiply(maxForce);
            this._applyForce(type, v);
        };
        /**
         * 基于目标位置应用力
         */
        p.applyForceByTargetPos = function (type, x, y, maxForce) {
            this.inst.update = true;
            var type = ls.eval_e(type);
            var x = ls.eval_e(x);
            var y = ls.eval_e(y);
            var maxForce = ls.eval_e(maxForce);
            var dx = x - this.inst.x;
            var dy = y - this.inst.y;
            var v = new Box2D.Common.Math.b2Vec2(dx, dy);
            v.Normalize();
            v.Multiply(maxForce);
            this._applyForce(type, v);
        };
        p._applyForce = function (type, v) {
            switch (type) {
                case 0:
                    this.body.ApplyForce(v, this.body.GetWorldCenter());
                    break;
                case 1:
                    this.body.ApplyImpulse(v, this.body.GetWorldCenter());
                    break;
                case 2:
                    this.body.SetAwake(true);
                    this.body.SetLinearVelocity(v);
                    break;
            }
        };
        /**
         * 添加浮力控制器
         */
        p.addBuoyancyController = function (normalX, normalY, offsetY, density, linearDrag, angularDrag, velocity) {
            if (normalX === void 0) { normalX = 0; }
            if (normalY === void 0) { normalY = -1; }
            if (offsetY === void 0) { offsetY = 200; }
            if (density === void 0) { density = 5.0; }
            if (linearDrag === void 0) { linearDrag = 10; }
            if (angularDrag === void 0) { angularDrag = 6; }
            if (velocity === void 0) { velocity = 0; }
            normalX = ls.eval_e(normalX);
            normalY = ls.eval_e(normalY);
            offsetY = ls.eval_e(offsetY);
            density = ls.eval_e(density);
            linearDrag = ls.eval_e(linearDrag);
            angularDrag = ls.eval_e(angularDrag);
            velocity = ls.eval_e(velocity);
            if (this.buoyancyController == null)
                this.buoyancyController = new Box2D.Dynamics.Controllers.b2BuoyancyController();
            //设置水面的法向量
            this.buoyancyController.normal.Set(normalX, normalY);
            //设置水面的位置
            this.buoyancyController.offset = -offsetY / PhysicsBehavior.p2m;
            //设置水的密度
            this.buoyancyController.density = density;
            //设置刚体在水中的移动阻尼
            this.buoyancyController.linearDrag = linearDrag;
            //设置刚体在水中的旋转阻尼
            this.buoyancyController.angularDrag = angularDrag;
            //设置水流动的速度
            this.buoyancyController.velocity = velocity;
            //将水面，浮力器添加到世界中
            PhysicsBehavior.world.AddController(this.buoyancyController);
            //浮力控制器创建完毕
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onB2BuoyancyControllerCreateComplete));
        };
        //浮力对象添加刚体
        p.addBuoyancyBody = function (target) {
            //如果目标添加了浮力控制器
            if (target && this.buoyancyController) {
                var curPhysicsBehavior = target.getBehavior(PhysicsBehavior);
                if (curPhysicsBehavior) {
                    curPhysicsBehavior.onBodyComplete = function (buoyancyController, physicBehavior) {
                        buoyancyController.AddBody(physicBehavior.body);
                    };
                    curPhysicsBehavior.onBodyCompleteParams = [this.buoyancyController, curPhysicsBehavior];
                }
            }
        };
        PhysicsBehavior.getSourceVertices = function (shape) {
            if (shape["sourceVertices"] == null) {
                shape["sourceVertices"] = [];
                for (var i = 0; i < shape.GetVertices().length; i++) {
                    var _b2Vec2 = shape.GetVertices()[i];
                    shape["sourceVertices"][i] = _b2Vec2.Copy();
                }
            }
            return shape["sourceVertices"];
        };
        PhysicsBehavior.getSourceRadius = function (shape) {
            if (shape["sourceRadius"] == undefined)
                shape["sourceRadius"] = shape.GetRadius();
            return shape["sourceRadius"];
        };
        //获取点的边界盒
        PhysicsBehavior.getVerticesBounds = function (vetices) {
            var minX = Number.MAX_VALUE;
            var minY = Number.MAX_VALUE;
            var maxX = Number.MIN_VALUE;
            var maxY = Number.MIN_VALUE;
            for (var i = 0; i < vetices.length; i++) {
                var sVec = vetices[i];
                if (minX > sVec.x)
                    minX = sVec.x;
                if (minY > sVec.y)
                    minY = sVec.y;
                if (maxX < sVec.x)
                    maxX = sVec.x;
                if (maxY < sVec.y)
                    maxY = sVec.y;
            }
            var shapeWidth = (maxX - minX) * PhysicsBehavior.p2m;
            var shapeHeight = (maxY - minY) * PhysicsBehavior.p2m;
            var rect = new egret.Rectangle(0, 0, shapeWidth, shapeHeight);
            return rect;
        };
        /**
         * 设置是否固定旋转
         */
        p.setIsFixedRotation = function (isFixed) {
            this.isFixedRotation = ls.eval_e(isFixed) == 1;
            this.body.SetFixedRotation(this.isFixedRotation);
        };
        /**
         * 设置是否是子弹
         */
        p.setIsBullet = function (isBullet) {
            this.isBullet = ls.eval_e(isBullet) == 1;
            this.body.SetBullet(this.isBullet);
        };
        //设置是否激活
        p.setIsActive = function (isActive) {
            this.isActive = ls.eval_e(isActive) == 1;
            this.body.SetActive(this.isActive);
        };
        /** 缩放body */
        p.scaleBody = function (scale) {
            scale = ls.eval_e(scale);
            this.body.SetAwake(true);
            var pressedBody = this.body;
            var object = this.getObject();
            if (pressedBody == null || pressedBody.GetType() == Box2D.Dynamics.b2Body.b2_staticBody)
                return;
            //获取鼠标点击刚体的图形数据
            var pressedShape = pressedBody.GetFixtureList().GetShape();
            if (pressedBody.GetFixtureList().GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape) {
                var sourceRadius = PhysicsBehavior.getSourceRadius(pressedShape);
                pressedShape.SetRadius(scale * sourceRadius);
                object.width = scale * sourceRadius * 2 * PhysicsBehavior.p2m;
                object.height = scale * sourceRadius * 2 * PhysicsBehavior.p2m;
            }
            else {
                var sourceVetices = PhysicsBehavior.getSourceVertices(pressedShape);
                for (var i = 0; i < sourceVetices.length; i++) {
                    var sVec = sourceVetices[i];
                    var vec = pressedShape.GetVertices()[i];
                    var len = Math.sqrt(sVec.x * sVec.x + sVec.y * sVec.y);
                    vec.Normalize();
                    vec.Multiply(scale * len);
                }
                var bounds = PhysicsBehavior.getVerticesBounds(sourceVetices);
                if (bounds) {
                    object.width = bounds.width * scale;
                    object.height = bounds.height * scale;
                }
            }
            pressedBody.SetAwake(true);
        };
        /** 缩放body */
        p.scaleXYBody = function (scaleX, scaleY) {
            scaleX = ls.eval_e(scaleX);
            scaleY = ls.eval_e(scaleY);
            this.body.SetAwake(true);
            var pressedBody = this.body;
            var object = this.getObject();
            if (pressedBody == null || pressedBody.GetType() == Box2D.Dynamics.b2Body.b2_staticBody)
                return;
            //获取鼠标点击刚体的图形数据
            var pressedShape = pressedBody.GetFixtureList().GetShape();
            if (pressedBody.GetFixtureList().GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape) {
                var sourceRadius = PhysicsBehavior.getSourceRadius(pressedShape);
                //如果是圆形只有一个起作用
                pressedShape.SetRadius(scaleX * sourceRadius);
                object.width = scaleX * sourceRadius * 2 * PhysicsBehavior.p2m;
                object.height = scaleX * sourceRadius * 2 * PhysicsBehavior.p2m;
            }
            else {
                var sourceVetices = PhysicsBehavior.getSourceVertices(pressedShape);
                for (var i = 0; i < sourceVetices.length; i++) {
                    var sVec = sourceVetices[i];
                    var vec = pressedShape.GetVertices()[i];
                    var len = Math.sqrt(sVec.x * sVec.x + sVec.y * sVec.y);
                    vec.Set(sVec.x * scaleX, sVec.y * scaleY);
                }
                var bounds = PhysicsBehavior.getVerticesBounds(sourceVetices);
                if (bounds) {
                    object.width = bounds.width * scaleX;
                    object.height = bounds.height * scaleY;
                }
            }
            pressedBody.SetAwake(true);
        };
        p.setBodyWH = function (width, height) {
            width = ls.eval_e(width);
            height = ls.eval_e(height);
            this.body.SetAwake(true);
            var pressedBody = this.body;
            if (pressedBody == null || pressedBody.GetType() == Box2D.Dynamics.b2Body.b2_staticBody)
                return;
            var object = this.getObject();
            //获取鼠标点击刚体的图形数据
            var pressedShape = pressedBody.GetFixtureList().GetShape();
            if (pressedBody.GetFixtureList().GetShape() instanceof Box2D.Collision.Shapes.b2CircleShape) {
                //如果是圆形只有一个起作用
                pressedShape.SetRadius(width / PhysicsBehavior.p2m / 2);
            }
            else {
                var sourceVetices = PhysicsBehavior.getSourceVertices(pressedShape);
                //计算原始宽高
                var minX = Number.MAX_VALUE;
                var minY = Number.MAX_VALUE;
                var maxX = Number.MIN_VALUE;
                var maxY = Number.MIN_VALUE;
                for (var i = 0; i < sourceVetices.length; i++) {
                    var sVec = sourceVetices[i];
                    if (minX > sVec.x)
                        minX = sVec.x;
                    if (minY > sVec.y)
                        minY = sVec.y;
                    if (maxX < sVec.x)
                        maxX = sVec.x;
                    if (maxY < sVec.y)
                        maxY = sVec.y;
                }
                var shapeWidth = (maxX - minX) * PhysicsBehavior.p2m;
                var shapeHeight = (maxY - minY) * PhysicsBehavior.p2m;
                for (var i = 0; i < sourceVetices.length; i++) {
                    var sVec = sourceVetices[i];
                    var vec = pressedShape.GetVertices()[i];
                    vec.Set(sVec.x * width / shapeWidth, sVec.y * height / shapeWidth);
                }
            }
            object.width = width;
            object.height = height;
            pressedBody.SetAwake(true);
        };
        p.setBodyWidth = function (width) {
            width = ls.eval_e(width);
            this.body.SetAwake(true);
            this.setBodyWH(width, this.getObject().height);
        };
        p.setBodyHeight = function (height) {
            height = ls.eval_e(height);
            this.body.SetAwake(true);
            this.setBodyWH(this.getObject().width, height);
        };
        p.setBodyAngle = function (angle) {
            angle = ls.eval_e(angle);
            this.body.SetAwake(true);
            this.body.SetAngle(angle * Math.PI / 180);
        };
        p.setBodyAngleTowardPosition = function (x, y) {
            this.body.SetAwake(true);
            var x = ls.eval_e(x);
            var y = ls.eval_e(y);
            var curPos = this.body.GetPosition();
            var targetAngle = ls.MathUtils.radianTo(curPos.x * PhysicsBehavior.p2m, curPos.y * PhysicsBehavior.p2m, x, y);
            this.body.SetAngle(targetAngle);
        };
        p.setBodyPosition = function (x, y) {
            this.body.SetAwake(true);
            x = ls.eval_e(x);
            y = ls.eval_e(y);
            this.body.SetPosition(new Box2D.Common.Math.b2Vec2(x / PhysicsBehavior.p2m, y / PhysicsBehavior.p2m));
        };
        p.setBodyPositionToAnotherObject = function (target, x, y) {
            this.body.SetAwake(true);
            x = ls.eval_e(x);
            y = ls.eval_e(y);
            this.body.SetPosition(new Box2D.Common.Math.b2Vec2((x + target.x) / PhysicsBehavior.p2m, (y + target.y) / PhysicsBehavior.p2m));
        };
        p.setBodyPostionAndAngle = function (x, y, angle) {
            this.body.SetAwake(true);
            x = ls.eval_e(x);
            y = ls.eval_e(y);
            angle = ls.eval_e(angle);
            angle = angle * Math.PI / 180;
            this.body.SetPositionAndAngle(new Box2D.Common.Math.b2Vec2(x / PhysicsBehavior.p2m, y / PhysicsBehavior.p2m), angle);
        };
        p.setBodyRotateClockWise = function ($angle) {
            if (this.body.IsFixedRotation())
                return;
            this.body.SetAwake(true);
            var angle = ls.eval_e($angle);
            this.body.SetAngle(this.body.GetAngle() + (angle * Math.PI / 180));
        };
        p.setBodyCounterRotateClockWise = function ($angle) {
            if (this.body.IsFixedRotation())
                return;
            this.body.SetAwake(true);
            var angle = ls.eval_e($angle);
            this.body.SetAngle(this.body.GetAngle() - (angle * Math.PI / 180));
        };
        p.onUseCustomGravity = function (useCustomGravity, gravityX, gravityY) {
            this.body.SetAwake(true);
            this.gravityX = ls.eval_e(gravityX);
            this.gravityY = ls.eval_e(gravityY);
            this.body.useCustomGravity = (ls.eval_e(useCustomGravity) == 1) ? true : false;
            if (this.body.useCustomGravity) {
                this.body.m_customGravity = new Box2D.Common.Math.b2Vec2(this.gravityX, this.gravityY);
            }
        };
        p.setBodyType = function (isStatic) {
            this.body.SetAwake(true);
            this.isStatic = ls.eval_e(isStatic);
            var _type = (this.isStatic == 1) ? Box2D.Dynamics.b2Body.b2_staticBody : Box2D.Dynamics.b2Body.b2_dynamicBody;
            this.body.SetType(_type);
        };
        //TODO
        p.setBodyUserData = function (url) {
            url = ls.eval_e(url);
            if (this.inst instanceof ls.AISprite)
                this.inst.loadImage(url);
            this.body.SetUserData(this.inst.container);
        };
        p.setDensity = function (density) {
            this.density = ls.eval_e(density);
            this.fixtureDef.density = this.density;
            this.body.SetAwake(true);
        };
        p.setFriction = function (friction) {
            this.friction = ls.eval_e(friction);
            this.fixtureDef.friction = this.friction;
            this.body.SetAwake(true);
        };
        /**
         * 设置刚体重心
         */
        p.setBodyMassCenter = function (x, y) {
            x = ls.eval_e(x);
            y = ls.eval_e(y);
            var massData = new Box2D.Collision.Shapes.b2MassData();
            massData.center = new Box2D.Common.Math.b2Vec2(x / PhysicsBehavior.p2m, y / PhysicsBehavior.p2m);
            this.body.SetMassData(massData);
        };
        p.setRestitution = function (restitution) {
            this.restitution = ls.eval_e(restitution);
            this.fixtureDef.restitution = this.restitution;
            this.body.SetAwake(true);
        };
        p.setDragMaxForce = function (dragMaxForce) {
            this.dragMaxForce = ls.eval_e(dragMaxForce);
        };
        p.setIsSensor = function (isSensor) {
            this.body.SetAwake(true);
            this.isSensor = (ls.eval_e(isSensor) == 1);
            this.fixtureDef.isSensor = this.isSensor;
        };
        p.moveBodyForward = function (speed) {
            this.body.SetAwake(true);
            speed = ls.eval_e(speed);
            var curPos = this.body.GetPosition();
            var radian = this.body.GetAngle();
            curPos.x += Math.cos(radian) * speed / PhysicsBehavior.p2m;
            curPos.y += Math.sin(radian) * speed / PhysicsBehavior.p2m;
            this.body.SetPosition(curPos);
        };
        p.moveBodyAtAngle = function (angle, speed) {
            this.inst.update = true;
            angle = ls.eval_e(angle);
            speed = ls.eval_e(speed);
            this.body.SetAwake(true);
            var curPos = this.body.GetPosition();
            var radian = ls.MathUtils.toRadian(angle);
            curPos.x += Math.cos(radian) * speed / PhysicsBehavior.p2m;
            curPos.y += Math.sin(radian) * speed / PhysicsBehavior.p2m;
            this.body.SetPosition(curPos);
        };
        p.moveBodyToTargetPoint = function (x, y, speed) {
            this.body.SetAwake(true);
            x = ls.eval_e(x);
            y = ls.eval_e(y);
            speed = ls.eval_e(speed);
            var pos = this.body.GetPosition();
            var vx = x - pos.x * PhysicsBehavior.p2m;
            var vy = y - pos.y * PhysicsBehavior.p2m;
            var distance = Math.sqrt(vx * vx + vy * vy);
            if (distance < speed) {
                this.body.SetPosition(new Box2D.Common.Math.b2Vec2(x / PhysicsBehavior.p2m, y / PhysicsBehavior.p2m));
            }
            else {
                var dirRadian = Math.atan2(vy, vx);
                var dx = Math.cos(dirRadian) * speed / PhysicsBehavior.p2m;
                var dy = Math.sin(dirRadian) * speed / PhysicsBehavior.p2m;
                var vec2 = this.body.GetPosition();
                vec2.x += dx;
                vec2.y += dy;
                this.body.SetPosition(vec2);
            }
        };
        p.onB2BuoyancyControllerCreateComplete = function (event) {
            return { instances: [this.inst], status: true };
        };
        /**
         * 创建一根绳子
         * 这里遵循下面规则：
         * 1、绳子的纹理采用平铺
         * 2、如果有起始目标startTarget，则绳子固定在起点目标点
         * 3、如果有终点目标endTarget，则绳子固定在终点目标点
         * 4、segmentWidth 代表每段长度，数据越小，越平滑，但性能消耗越高
         * 5、segments 代表总共有多少段
         */
        p.createARope = function (startTarget, segmentWidth, segmentHeight, segments, endTarget) {
            segmentWidth = ls.eval_e(segmentWidth);
            segmentHeight = ls.eval_e(segmentHeight);
            segments = ls.eval_e(segments);
            for (var i = 0; i < segments; i++) {
                var ropeDef = new Box2D.Dynamics.b2BodyDef();
                //ropeDef.type=this.
                ropeDef.position.x = startTarget.x / PhysicsBehavior.p2m;
                ropeDef.position.y = startTarget.y / PhysicsBehavior.p2m;
            }
        };
        /**
         * 清除所有刚体
         */
        PhysicsBehavior.clearBodies = function () {
            for (var body = PhysicsBehavior.world.GetBodyList(); body; body = body.GetNext()) {
                PhysicsBehavior.world.DestroyBody(body);
            }
            PhysicsBehavior.contactListener = null;
            PhysicsBehavior.isCreateWorld = false;
            PhysicsBehavior.mouseBody = null;
            PhysicsBehavior.mouseJoint = null;
            PhysicsBehavior.isDragBodyWithMouse = false;
        };
        /**
         * 销毁body
         */
        p.destory = function () {
            if (this.body)
                PhysicsBehavior.world.DestroyBody(this.body);
        };
        p.createDebug = function () {
            this.debug = new Box2D.Dynamics.b2DebugDraw();
            this.debug.SetSprite(ls.GameUILayer.debugContainer);
            this.debug.SetDrawScale(PhysicsBehavior.p2m);
            this.debug.SetLineThickness(1);
            this.debug.SetFillAlpha(0.5);
            this.debug.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
            if (this.isDebug)
                PhysicsBehavior.world.SetDebugDraw(this.debug);
            else
                PhysicsBehavior.world.SetDebugDraw(null);
        };
        /**唤醒body */
        p.wakeBody = function (wake) {
            wake = ls.eval_e(wake);
            if (this.body)
                this.body.SetAwake(wake);
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.density = this.density;
            o.friction = this.friction;
            o.restitution = this.restitution;
            o.isStatic = this.isStatic;
            o.forceType = this.forceType;
            o.useCustomGravity = this.useCustomGravity;
            o.gravityX = this.gravityX;
            o.gravityY = this.gravityY;
            o.supportDrag = this.supportDrag;
            o.isSensor = this.isSensor;
            o.dragMaxForce = this.dragMaxForce;
            o.isDebug = this.isDebug;
            o.isFilter = this.isFilter;
            o.groupIndex = this.groupIndex;
            o.maskBits = this.maskBits;
            o.categoryBits = this.categoryBits;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.density = o.density;
                this.friction = o.friction;
                this.restitution = o.restitution;
                this.isStatic = o.isStatic;
                this.forceType = o.forceType;
                this.useCustomGravity = o.useCustomGravity;
                this.gravityX = o.gravityX;
                this.gravityY = o.gravityY;
                this.supportDrag = o.supportDrag;
                this.isSensor = o.isSensor;
                this.dragMaxForce = o.dragMaxForce;
                this.isDebug = o.isDebug;
                this.isFilter = o.isFilter;
                this.groupIndex = o.groupIndex;
                this.maskBits = o.maskBits;
                this.categoryBits = o.categoryBits;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.density = this.density;
            bh.friction = this.friction;
            bh.restitution = this.restitution;
            bh.isStatic = this.isStatic;
            bh.forceType = this.forceType;
            bh.useCustomGravity = this.useCustomGravity;
            bh.gravityX = this.gravityX;
            bh.gravityY = this.gravityY;
            bh.supportDrag = this.supportDrag;
            bh.isSensor = this.isSensor;
            bh.dragMaxForce = this.dragMaxForce;
            bh.isDebug = this.isDebug;
            bh.isFilter = this.isFilter;
            bh.groupIndex = this.groupIndex;
            bh.maskBits = this.maskBits;
            bh.categoryBits = this.categoryBits;
            return bh;
        };
        PhysicsBehavior.world = new Box2D.Dynamics.b2World(new Box2D.Common.Math.b2Vec2(0, 10), true);
        PhysicsBehavior.isCreateWorld = false;
        PhysicsBehavior.isDragBodyWithMouse = false;
        PhysicsBehavior.p2m = 30;
        PhysicsBehavior.createNums = 0;
        return PhysicsBehavior;
    }(ls.BaseBehavior));
    ls.PhysicsBehavior = PhysicsBehavior;
    egret.registerClass(PhysicsBehavior,'ls.PhysicsBehavior');
    var MyContactListener = (function (_super) {
        __extends(MyContactListener, _super);
        function MyContactListener() {
            _super.call(this);
            this.BeginContact;
            this.EndContact;
        }
        var d = __define,c=MyContactListener,p=c.prototype;
        p.BeginContact = function (contact) {
            this.myContact = contact;
            var bodyA = this.myContact.GetFixtureA().GetBody();
            var bodyB = this.myContact.GetFixtureB().GetBody();
            if (bodyA.beginContactHandler != null)
                bodyA.beginContactWith(bodyB);
            if (bodyB.beginContactHandler != null)
                bodyB.beginContactWith(bodyA);
            bodyA["inst"].setIsColliding(true, bodyB["inst"]);
        };
        p.EndContact = function (contact) {
            var bodyA = contact.GetFixtureA().GetBody();
            var bodyB = contact.GetFixtureB().GetBody();
            if (bodyA.endContactHandler != null)
                bodyA.endContactWith(bodyB);
            if (bodyB.endContactHandler != null)
                bodyB.endContactWith(bodyA);
            bodyA["inst"].setIsColliding(false, null);
            bodyB["inst"].setIsColliding(false, null);
        };
        return MyContactListener;
    }(Box2D.Dynamics.b2ContactListener));
    ls.MyContactListener = MyContactListener;
    egret.registerClass(MyContactListener,'ls.MyContactListener');
    //浮力控制器创建完毕    
    var OnB2BuoyancyControllerCreateCompleteEvent = (function (_super) {
        __extends(OnB2BuoyancyControllerCreateCompleteEvent, _super);
        function OnB2BuoyancyControllerCreateCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnB2BuoyancyControllerCreateCompleteEvent,p=c.prototype;
        return OnB2BuoyancyControllerCreateCompleteEvent;
    }(ls.BaseEvent));
    ls.OnB2BuoyancyControllerCreateCompleteEvent = OnB2BuoyancyControllerCreateCompleteEvent;
    egret.registerClass(OnB2BuoyancyControllerCreateCompleteEvent,'ls.OnB2BuoyancyControllerCreateCompleteEvent');
    /*
    * Convex Separator for Box2D Flash
    *
    * This class has been written by Antoan Angelov.
    * It is designed to work with Erin Catto's Box2D physics library.
    *
    * Everybody can use this software for any purpose, under two restrictions:
    * 1. You cannot claim that you wrote this software.
    * 2. You can not remove or alter this notice.
    *
    */
    var b2Separator = (function () {
        function b2Separator() {
        }
        var d = __define,c=b2Separator,p=c.prototype;
        p.separate = function (body, fixtureDef, verticesVec, scale) {
            if (scale === void 0) { scale = 30; }
            var i, n = verticesVec.length, j, m;
            var vec = [], figsVec;
            var polyShape;
            for (i = 0; i < n; i++)
                vec.push(new Box2D.Common.Math.b2Vec2(verticesVec[i].x * scale, verticesVec[i].y * scale));
            figsVec = this.calcShapes(vec);
            n = figsVec.length;
            for (i = 0; i < n; i++) {
                verticesVec = [];
                vec = figsVec[i];
                m = vec.length;
                for (j = 0; j < m; j++)
                    verticesVec.push(new Box2D.Common.Math.b2Vec2(vec[j].x / scale, vec[j].y / scale));
                polyShape = new Box2D.Collision.Shapes.b2PolygonShape();
                polyShape.SetAsVector(verticesVec);
                fixtureDef.shape = polyShape;
                body.CreateFixture(fixtureDef);
            }
        };
        p.validate = function (verticesVec) {
            var i, n = verticesVec.length, j, j2, i2, i3, d, ret = 0;
            var fl, fl2 = false;
            for (i = 0; i < n; i++) {
                i2 = (i < n - 1 ? i + 1 : 0);
                i3 = (i > 0 ? i - 1 : n - 1);
                fl = false;
                for (j = 0; j < n; j++) {
                    if (j != i && j != i2) {
                        if (!fl) {
                            d = this.det(verticesVec[i].x, verticesVec[i].y, verticesVec[i2].x, verticesVec[i2].y, verticesVec[j].x, verticesVec[j].y);
                            if (d > 0)
                                fl = true;
                        }
                        if (j != i3) {
                            j2 = (j < n - 1 ? j + 1 : 0);
                            if (this.hitSegment(verticesVec[i].x, verticesVec[i].y, verticesVec[i2].x, verticesVec[i2].y, verticesVec[j].x, verticesVec[j].y, verticesVec[j2].x, verticesVec[j2].y))
                                ret = 1;
                        }
                    }
                }
                if (!fl)
                    fl2 = true;
            }
            if (fl2) {
                if (ret == 1)
                    ret = 3;
                else
                    ret = 2;
            }
            return ret;
        };
        p.calcShapes = function (verticesVec) {
            var vec;
            var i, n, j;
            var d, t, dx, dy, minLen;
            var i1, i2, i3, p1, p2, p3;
            var j1, j2, v1, v2, k, h;
            var vec1, vec2;
            var v, hitV;
            var isConvex;
            var figsVec = [], queue = [];
            queue.push(verticesVec);
            while (queue.length) {
                vec = queue[0];
                n = vec.length;
                isConvex = true;
                for (i = 0; i < n; i++) {
                    i1 = i;
                    i2 = (i < n - 1 ? i + 1 : i + 1 - n);
                    i3 = (i < n - 2 ? i + 2 : i + 2 - n);
                    p1 = vec[i1];
                    p2 = vec[i2];
                    p3 = vec[i3];
                    d = this.det(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
                    if (d < 0) {
                        isConvex = false;
                        minLen = Number.MAX_VALUE;
                        for (j = 0; j < n; j++) {
                            if (j != i1 && j != i2) {
                                j1 = j;
                                j2 = (j < n - 1 ? j + 1 : 0);
                                v1 = vec[j1];
                                v2 = vec[j2];
                                v = this.hitRay(p1.x, p1.y, p2.x, p2.y, v1.x, v1.y, v2.x, v2.y);
                                if (v) {
                                    dx = p2.x - v.x;
                                    dy = p2.y - v.y;
                                    t = dx * dx + dy * dy;
                                    if (t < minLen) {
                                        h = j1;
                                        k = j2;
                                        hitV = v;
                                        minLen = t;
                                    }
                                }
                            }
                        }
                        if (minLen == Number.MAX_VALUE)
                            this.err();
                        vec1 = [];
                        vec2 = [];
                        j1 = h;
                        j2 = k;
                        v1 = vec[j1];
                        v2 = vec[j2];
                        if (!this.pointsMatch(hitV.x, hitV.y, v2.x, v2.y))
                            vec1.push(hitV);
                        if (!this.pointsMatch(hitV.x, hitV.y, v1.x, v1.y))
                            vec2.push(hitV);
                        h = -1;
                        k = i1;
                        while (true) {
                            if (k != j2)
                                vec1.push(vec[k]);
                            else {
                                if (h < 0 || h >= n)
                                    this.err();
                                if (!this.isOnSegment(v2.x, v2.y, vec[h].x, vec[h].y, p1.x, p1.y))
                                    vec1.push(vec[k]);
                                break;
                            }
                            h = k;
                            if (k - 1 < 0)
                                k = n - 1;
                            else
                                k--;
                        }
                        vec1 = vec1.reverse();
                        h = -1;
                        k = i2;
                        while (true) {
                            if (k != j1)
                                vec2.push(vec[k]);
                            else {
                                if (h < 0 || h >= n)
                                    this.err();
                                if (k == j1 && !this.isOnSegment(v1.x, v1.y, vec[h].x, vec[h].y, p2.x, p2.y))
                                    vec2.push(vec[k]);
                                break;
                            }
                            h = k;
                            if (k + 1 > n - 1)
                                k = 0;
                            else
                                k++;
                        }
                        queue.push(vec1, vec2);
                        queue.shift();
                        break;
                    }
                }
                if (isConvex)
                    figsVec.push(queue.shift());
            }
            return figsVec;
        };
        p.hitRay = function (x1, y1, x2, y2, x3, y3, x4, y4) {
            var t1 = x3 - x1, t2 = y3 - y1, t3 = x2 - x1, t4 = y2 - y1, t5 = x4 - x3, t6 = y4 - y3, t7 = t4 * t5 - t3 * t6, a;
            a = (t5 * t2 - t6 * t1) / t7;
            var px = x1 + a * t3, py = y1 + a * t4;
            var b1 = this.isOnSegment(x2, y2, x1, y1, px, py);
            var b2 = this.isOnSegment(px, py, x3, y3, x4, y4);
            if (b1 && b2)
                return new Box2D.Common.Math.b2Vec2(px, py);
            return null;
        };
        p.hitSegment = function (x1, y1, x2, y2, x3, y3, x4, y4) {
            var t1 = x3 - x1, t2 = y3 - y1, t3 = x2 - x1, t4 = y2 - y1, t5 = x4 - x3, t6 = y4 - y3, t7 = t4 * t5 - t3 * t6, a;
            a = (t5 * t2 - t6 * t1) / t7;
            var px = x1 + a * t3, py = y1 + a * t4;
            var b1 = this.isOnSegment(px, py, x1, y1, x2, y2);
            var b2 = this.isOnSegment(px, py, x3, y3, x4, y4);
            if (b1 && b2)
                return new Box2D.Common.Math.b2Vec2(px, py);
            return null;
        };
        p.isOnSegment = function (px, py, x1, y1, x2, y2) {
            var b1 = ((x1 + 0.1 >= px && px >= x2 - 0.1) || (x1 - 0.1 <= px && px <= x2 + 0.1));
            var b2 = ((y1 + 0.1 >= py && py >= y2 - 0.1) || (y1 - 0.1 <= py && py <= y2 + 0.1));
            return (b1 && b2 && this.isOnLine(px, py, x1, y1, x2, y2));
        };
        p.pointsMatch = function (x1, y1, x2, y2) {
            var dx = (x2 >= x1 ? x2 - x1 : x1 - x2), dy = (y2 >= y1 ? y2 - y1 : y1 - y2);
            return (dx < 0.1 && dy < 0.1);
        };
        p.isOnLine = function (px, py, x1, y1, x2, y2) {
            if (x2 - x1 > 0.1 || x1 - x2 > 0.1) {
                var a = (y2 - y1) / (x2 - x1);
                var possibleY = a * (px - x1) + y1, diff = (possibleY > py ? possibleY - py : py - possibleY);
                return (diff < 0.1);
            }
            return (px - x1 < 0.1 || x1 - px < 0.1);
        };
        p.det = function (x1, y1, x2, y2, x3, y3) {
            return x1 * y2 + x2 * y3 + x3 * y1 - y1 * x2 - y2 * x3 - y3 * x1;
        };
        p.err = function () {
            throw new Error("A problem has occurred. Use the Validate() method to see where the problem is.");
        };
        return b2Separator;
    }());
    ls.b2Separator = b2Separator;
    egret.registerClass(b2Separator,'ls.b2Separator');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map