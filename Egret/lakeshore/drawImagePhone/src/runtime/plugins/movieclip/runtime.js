var ls;
(function (ls) {
    var AIMovieClip = (function (_super) {
        __extends(AIMovieClip, _super);
        function AIMovieClip() {
            _super.call(this);
            //默认循环播放
            this._loop = Number.MAX_VALUE;
            this._speedRate = 1;
            this._playOrder = 1;
            this.actions = {}; //动作列表
            this.currentActionName = "动作"; //当前动作名
            this.isloadComplete = false;
            this.isFirstPlay = true;
            this.name = "MovieClip";
        }
        var d = __define,c=AIMovieClip,p=c.prototype;
        p.initialize = function () {
        };
        p.onTick = function () {
            this.render();
        };
        p.saveToJSON = function () {
            return {
                "name": this.name,
                "isModel": this.isModel,
                "paramInstances": this.paramInstances,
                "timeScale": this.timeScale,
                "x": this.x,
                "y": this.y,
                "width": this.width,
                "height": this.height,
                "scale": this.scale,
                "scaleX": this.scaleX,
                "scaleY": this.scaleY,
                "angle": this.angle,
                "alpha": this.alpha,
                "visible": this.visible,
                "mirrored": this.mirrored,
                "collision": this.collision,
                "anchorX": this.anchorX,
                "anchorY": this.anchorY,
                "layer": this.layer,
                "isFirstPlay": this.isFirstPlay,
                "collisionsEnabled": this.collisionsEnabled,
                "collisionData": this.collisionData,
                "collisionType": this.collisionType,
                "collisionVectorData": this.collisionVectorData
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.name = o["name"];
                this.isModel = o["isModel"];
                this.paramInstances = o["paramInstances"];
                this.timeScale = o["timeScale"];
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
                this.enabled = o["enabled"];
                this.data = o["data"];
                this.isFirstPlay = o["isFirstPlay"];
                this.collisionsEnabled = o["collisionsEnabled"];
                this.collisionData = o["collisionData"];
                this.collisionType = o["collisionType"];
                this.collisionVectorData = o["collisionVectorData"];
            }
        };
        //设置数据
        p.setData = function (data) {
            this.data = data; //动作列表
            this.actions = {};
            var actionDatas = data;
            var firstActionName;
            var firstLoop;
            for (var i = 0; i < actionDatas.length; i++) {
                var actionData = data[i];
                var actionName = actionData["$name"];
                var fps = +actionData["$fps"];
                var loop = +actionData["$loop"];
                if (!firstActionName)
                    firstActionName = actionName;
                if (isNaN(firstLoop))
                    firstLoop = loop;
                if (fps < 0)
                    fps = 0.00001;
                var movieAction = { name: actionName, movieFrames: [], duration: 1000 / fps, loop: loop };
                this.decodeFrame(movieAction, actionData.children);
                this.actions[actionName] = movieAction;
            }
            //初始化第1个动作
            this.currentActionName = firstActionName;
            this._currentFrame = 1;
            this._loop = firstLoop;
            this._isPlaying = true;
            this.play(this._loop);
        };
        //解析帧
        p.decodeFrame = function (movieAction, data) {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var itemData = data[i];
                    var src = itemData["$src"];
                    movieAction.movieFrames[i] = { src: src };
                }
                movieAction.totalFrames = data.length;
                this._oldTime = egret.getTimer();
                this.container.addChild(this._bitmap);
            }
        };
        p.render = function () {
            //限制播放次数
            if (this._currentloop >= this._loop)
                return;
            if (!this.currentActionName)
                return;
            //检测当前图片是否在场景中，如果不在，不进行渲染
            this.currentAction = this.actions[this.currentActionName];
            if (!this.currentAction)
                return;
            this._totalFrames = this.currentAction.totalFrames;
            var currentTime = egret.getTimer();
            var currentData = this.currentAction.movieFrames[this._currentFrame - 1];
            if (currentData) {
                var src = decodeURIComponent(currentData.src);
                var duration = this.currentAction.duration;
                if (this.isFirstPlay || (!this.isFirstPlay && currentTime - this._oldTime >= duration / this._speedRate)) {
                    this.isFirstPlay = false;
                    var textureDatas = ls.getTexture(src);
                    if (textureDatas != null)
                        var texture = textureDatas[0];
                    //先从spriteSheet中找
                    if (texture != null) {
                        this._bitmap.texture = texture;
                        if (textureDatas) {
                            this._bitmap.x = textureDatas[1];
                            this._bitmap.y = textureDatas[2];
                        }
                        if (!this.isloadComplete) {
                            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                            this.isloadComplete = true;
                        }
                    }
                    else {
                        RES.getResByUrl(src, function (texture) {
                            this._bitmap.texture = texture;
                            if (!this.isloadComplete) {
                                this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                                this.isloadComplete = true;
                            }
                        }, this);
                    }
                    this._oldTime = currentTime;
                    if (this._isPlaying) {
                        if (this._playOrder == 1) {
                            if (this._currentFrame < this._totalFrames) {
                                this._currentFrame++;
                                //动画播放完成一次
                                if (this._currentFrame == this._totalFrames) {
                                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPlayComplete));
                                }
                            }
                            else {
                                this._currentFrame = 1;
                                this._currentloop++;
                            }
                        }
                        else {
                            if (this._currentFrame > 1) {
                                this._currentFrame--;
                                //动画播放完成一次
                                if (this._currentFrame == 1) {
                                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPlayComplete));
                                }
                            }
                            else {
                                this._currentFrame = this._totalFrames;
                                this._currentloop++;
                            }
                        }
                    }
                    //全部播放完成
                    if (this._currentloop == this._loop) {
                        this._isPlaying = false;
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onAllPlayComplete));
                    }
                }
            }
        };
        ///////////////////////////////conditions//////////////////////////////////
        /**当前动画是否播放完毕Trigger*/
        p.onAllPlayComplete = function ($onAllPlayComplete) {
            return { instances: [this], status: true };
        };
        /**当前动画是否播放完一次Trigger*/
        p.onPlayComplete = function ($onPlayComplete) {
            return { instances: [this], status: true };
        };
        /**是否在播放*/
        p.isPlayingCheck = function ($isPlaying) {
            return { instances: [this], status: this._isPlaying };
        };
        /**比较当前帧*/
        p.compareFrame = function ($event) {
            return { instances: [this], status: ls.compare(this._currentFrame, $event.operationType, $event.frame) };
        };
        /**比较当前前序列帧播放速率*/
        p.compareSpeed = function ($event) {
            return { instances: [this], status: ls.compare(this._speedRate, $event.operationType, $event.speed) };
        };
        /**比较播放顺序*/
        p.comparePlayOrder = function ($event) {
            return { instances: [this], status: this._playOrder == ls.eval_e($event.order) };
        };
        /**比较循环次数*/
        p.compareLoop = function ($event) {
            return { instances: [this], status: ls.compare(this._loop, $event.operationType, $event.loop) };
        };
        /**比较当前动作*/
        p.compareCurrentAction = function ($event) {
            return { instances: [this], status: this.currentActionName == ls.eval_e($event.action) };
        };
        ///////////////////////////////actions//////////////////////////////////
        p.gotoAndPlay = function (frame, loop) {
            this._currentloop = 0;
            var frame = ls.eval_e(frame);
            var loop = ls.eval_e(loop);
            ls.assert(typeof frame !== "number" || typeof loop !== "number", "AIMovieClip gotoAndPlay parameter type incorrect!!");
            this._currentFrame = frame;
            this._loop = loop;
            this._isPlaying = true;
        };
        p.gotoAndStop = function (frame) {
            this._currentloop = 0;
            var frame = ls.eval_e(frame);
            ls.assert(typeof frame !== "number", "AIMovieClip gotoAndStop parameter type incorrect!!");
            this._currentFrame = frame;
            this._isPlaying = false;
        };
        p.play = function (loop) {
            this._currentloop = 0;
            var loop = ls.eval_e(loop);
            ls.assert(typeof loop !== "number", "AIMovieClip play parameter type incorrect!!");
            this._loop = (loop <= 0 ? Number.MAX_VALUE : loop);
            this._isPlaying = true;
        };
        p.stop = function () {
            this._currentloop = 0;
            this._isPlaying = false;
        };
        p.prevFrame = function () {
            this._currentloop = 0;
            if (this._currentFrame > 1)
                this._currentFrame--;
            this._isPlaying = false;
        };
        p.nextFrame = function () {
            this._currentloop = 0;
            if (this._currentFrame < this._totalFrames)
                this._currentFrame++;
            this._isPlaying = false;
        };
        p.setLoop = function (loop) {
            var loop = ls.eval_e(loop);
            ls.assert(typeof loop !== "number", "AIMovieClip setLoop parameter type incorrect!!");
            this._loop = loop;
        };
        //设置播放顺序 order 1:正序 2：逆序
        p.setPlayOrder = function (order) {
            var order = ls.eval_e(order);
            ls.assert(typeof order !== "number", "AIMovieClip setPlayOrder parameter type incorrect!!");
            this._playOrder = order || 1;
        };
        //设置播放速率
        p.setSpeedRate = function (speedRate) {
            var speedRate = ls.eval_e(speedRate);
            ls.assert(typeof speedRate !== "number", "AIMovieClip setSpeedRate parameter type incorrect!!");
            this._speedRate = speedRate || 1;
            if (this._speedRate <= 0)
                this.speedRate = 0.000001;
        };
        //设置播放动作
        p.setAction = function (frameType, action) {
            var frameType = ls.eval_e(frameType);
            var action = ls.eval_e(action);
            this.currentActionName = action || "动作";
            this.currentAction = this.actions[action];
            var frame;
            switch (frameType) {
                case 1:
                    frame = 1;
                    break;
                case 2:
                    frame = Math.min(this.currentAction.totalFrames, this.currentFrame);
                    break;
            }
            this.gotoAndPlay(frame, this.loop);
        };
        d(p, "currentFrame"
            ///////////////////////////////exps//////////////////////////////////
            ,function () {
                return this._currentFrame;
            }
        );
        d(p, "isPlaying"
            ,function () {
                return this._isPlaying;
            }
        );
        d(p, "totalFrames"
            ,function () {
                return this._totalFrames;
            }
        );
        d(p, "loop"
            ,function () {
                return this._loop;
            }
        );
        d(p, "speedRate"
            ,function () {
                return this._speedRate;
            }
        );
        d(p, "playOrder"
            ,function () {
                return this._playOrder;
            }
        );
        p.clone = function () {
            var cloneInstance = new AIMovieClip();
            cloneInstance.name = this.name;
            //拷贝属性
            cloneInstance.x = this.x;
            cloneInstance.y = this.y;
            cloneInstance.width = this.width;
            cloneInstance.height = this.height;
            cloneInstance.scale = this.scale;
            cloneInstance.scaleX = this.scaleX;
            cloneInstance.scaleY = this.scaleY;
            cloneInstance.angle = this.angle;
            cloneInstance.alpha = this.alpha;
            cloneInstance.visible = this.visible;
            cloneInstance.mirrored = this.mirrored;
            cloneInstance.collision = this.collision;
            cloneInstance.anchorX = this.anchorX;
            cloneInstance.anchorY = this.anchorY;
            cloneInstance.global = this.global;
            cloneInstance.layer = this.layer;
            cloneInstance.isFirstPlay = this.isFirstPlay;
            cloneInstance.collisionsEnabled = this.collisionsEnabled;
            cloneInstance.collisionData = this.collisionData;
            cloneInstance.collisionType = this.collisionType;
            cloneInstance.collisionVectorData = this.collisionVectorData;
            cloneInstance.collisionSourceVectorData = this.collisionSourceVectorData;
            cloneInstance.setData(this.data);
            //TODO 执行onTick();
            cloneInstance.initialize();
            //拷贝行为
            cloneInstance.behaviors = [];
            for (var i = 0; i < this.behaviors.length; i++) {
                var behaivor = this.behaviors[i];
                var cloneBehaivor = behaivor.clone();
                cloneInstance.addBehavior(cloneBehaivor);
                cloneBehaivor.onCreate();
            }
            //clone variables
            for (var key in this.variables)
                cloneInstance.addVariable(key, this.variables[key]);
            return cloneInstance;
        };
        return AIMovieClip;
    }(ls.AISprite));
    ls.AIMovieClip = AIMovieClip;
    egret.registerClass(AIMovieClip,'ls.AIMovieClip');
    var OnAllPlayCompleteEvent = (function (_super) {
        __extends(OnAllPlayCompleteEvent, _super);
        function OnAllPlayCompleteEvent() {
            _super.call(this);
        }
        var d = __define,c=OnAllPlayCompleteEvent,p=c.prototype;
        return OnAllPlayCompleteEvent;
    }(ls.BaseEvent));
    ls.OnAllPlayCompleteEvent = OnAllPlayCompleteEvent;
    egret.registerClass(OnAllPlayCompleteEvent,'ls.OnAllPlayCompleteEvent');
    var OnPlayCompleteEvent = (function (_super) {
        __extends(OnPlayCompleteEvent, _super);
        function OnPlayCompleteEvent() {
            _super.call(this);
        }
        var d = __define,c=OnPlayCompleteEvent,p=c.prototype;
        return OnPlayCompleteEvent;
    }(ls.BaseEvent));
    ls.OnPlayCompleteEvent = OnPlayCompleteEvent;
    egret.registerClass(OnPlayCompleteEvent,'ls.OnPlayCompleteEvent');
    var IsPlayingEvent = (function (_super) {
        __extends(IsPlayingEvent, _super);
        function IsPlayingEvent() {
            _super.call(this);
        }
        var d = __define,c=IsPlayingEvent,p=c.prototype;
        return IsPlayingEvent;
    }(ls.BaseEvent));
    ls.IsPlayingEvent = IsPlayingEvent;
    egret.registerClass(IsPlayingEvent,'ls.IsPlayingEvent');
    var CompareFrameEvent = (function (_super) {
        __extends(CompareFrameEvent, _super);
        function CompareFrameEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareFrameEvent,p=c.prototype;
        return CompareFrameEvent;
    }(ls.BaseEvent));
    ls.CompareFrameEvent = CompareFrameEvent;
    egret.registerClass(CompareFrameEvent,'ls.CompareFrameEvent');
    var CompareSpeedEvent = (function (_super) {
        __extends(CompareSpeedEvent, _super);
        function CompareSpeedEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareSpeedEvent,p=c.prototype;
        return CompareSpeedEvent;
    }(ls.BaseEvent));
    ls.CompareSpeedEvent = CompareSpeedEvent;
    egret.registerClass(CompareSpeedEvent,'ls.CompareSpeedEvent');
    var ComparePlayOrderEvent = (function (_super) {
        __extends(ComparePlayOrderEvent, _super);
        function ComparePlayOrderEvent() {
            _super.call(this);
        }
        var d = __define,c=ComparePlayOrderEvent,p=c.prototype;
        return ComparePlayOrderEvent;
    }(ls.BaseEvent));
    ls.ComparePlayOrderEvent = ComparePlayOrderEvent;
    egret.registerClass(ComparePlayOrderEvent,'ls.ComparePlayOrderEvent');
    var CompareLoopEvent = (function (_super) {
        __extends(CompareLoopEvent, _super);
        function CompareLoopEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareLoopEvent,p=c.prototype;
        return CompareLoopEvent;
    }(ls.BaseEvent));
    ls.CompareLoopEvent = CompareLoopEvent;
    egret.registerClass(CompareLoopEvent,'ls.CompareLoopEvent');
    var CompareCurrentActionEvent = (function (_super) {
        __extends(CompareCurrentActionEvent, _super);
        function CompareCurrentActionEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareCurrentActionEvent,p=c.prototype;
        return CompareCurrentActionEvent;
    }(ls.BaseEvent));
    ls.CompareCurrentActionEvent = CompareCurrentActionEvent;
    egret.registerClass(CompareCurrentActionEvent,'ls.CompareCurrentActionEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map