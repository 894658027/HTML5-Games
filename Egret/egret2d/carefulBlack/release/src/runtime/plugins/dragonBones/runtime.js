var ls;
(function (ls) {
    var AIDragonBones = (function (_super) {
        __extends(AIDragonBones, _super);
        function AIDragonBones() {
            _super.call(this);
            this._playOrder = 1; //1:正序 2：逆序
            this.isPlayDefault = true;
            this.playTimes = 0;
            this.curPlayedTimes = 0; //当前已经播放成次数
            //一个db可能有多个不同的骨架，所以受多骨架影响，需要记住默认的源比例
            this.sourceWidth = 1;
            this.sourceHeight = 1;
            this.sourceScaleX = 1;
            this.sourceScaleY = 1;
            this.isRealPlaying = false;
            this.name = "dragonBones";
            this._onComplete = this.onComplete;
            this.scaleContainer = false;
        }
        var d = __define,c=AIDragonBones,p=c.prototype;
        p.initialize = function () {
            this._url = decodeURIComponent(this["url"]);
            this._textureConfigUrl = decodeURIComponent(this["textureConfigUrl"]);
            this._armatureUrl = decodeURIComponent(this["skeletonUrl"]);
            this.isPlayDefault = decodeURIComponent(this["isPlayDefault"]) === "true";
            this.playTimes = ls.eval_e(decodeURIComponent(this["playTimes"]));
            this.defaultAnimation = decodeURIComponent(this["animationName"]);
            this.defaultArmature = decodeURIComponent(this["armatureName"]);
            var textureDatas = ls.getTexture(this._url);
            if (textureDatas != null)
                this.texture = textureDatas[0];
            var self = this;
            //图片加载完成
            var onImageLoadComplete = function () {
                //加载纹理配置 
                var onTextureConfigRESComplete = function (textureConfig) {
                    self._textureConfig = textureConfig;
                    self._armateName = self._textureConfig.name;
                    AIDragonBones.textureConfigs[self._textureConfigUrl] = textureConfig;
                    //加载骨骼配置
                    var onSkeletonConfigRESComplete = function (_armatureConfig) {
                        self._armatureConfig = _armatureConfig;
                        if (self._armatureConfig.name != self._armateName) {
                            ls.assert(true, "纹理配置文件与骨骼配置文件不匹配！！！");
                        }
                        AIDragonBones.armatureContfigs[self._armatureUrl] = _armatureConfig;
                        if (self._onComplete != null)
                            self._onComplete();
                    };
                    if (AIDragonBones.armatureContfigs[self._armatureUrl] == null) {
                        RES.getResByUrl(self._armatureUrl, onSkeletonConfigRESComplete, self, RES.ResourceItem.TYPE_JSON);
                    }
                    else {
                        onSkeletonConfigRESComplete(AIDragonBones.armatureContfigs[self._armatureUrl]);
                    }
                };
                if (AIDragonBones.textureConfigs[self._textureConfigUrl] == null) {
                    RES.getResByUrl(self._textureConfigUrl, onTextureConfigRESComplete, self, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    onTextureConfigRESComplete(AIDragonBones.textureConfigs[self._textureConfigUrl]);
                }
            };
            // if (this.texture) {
            //     var spritesheet: egret.SpriteSheet = new egret.SpriteSheet(this.texture);
            //     var renderTexture = spritesheet.createTexture(this._url, 0, 0, this.texture.textureWidth, this.texture.textureHeight, 0, 0);
            //     //var renderTexture: egret.RenderTexture = new egret.RenderTexture();
            //     //renderTexture.drawToTexture(new egret.Bitmap(this.texture), new egret.Rectangle(this.texture._bitmapX, this.texture._bitmapY, this.texture.textureWidth, this.texture.textureHeight));
            //     this._bitmap.texture = renderTexture;
            //     var testImage: egret.Bitmap = new egret.Bitmap(renderTexture);
            //     GameUILayer.debugContainer.addChild(testImage);
            //     onImageLoadComplete(this);
            //     // this._sourceWidth       = texture.textureWidth;
            //     // this._sourceHeight      = texture.textureHeight;
            //     // this._bitmap.width      = this.width;
            //     // this._bitmap.height     = this.height;
            // } else {
            var onRESComplete = function (texture) {
                self.texture = texture;
                self._bitmap.texture = texture;
                // var testImage: egret.Bitmap = new egret.Bitmap(texture);
                // GameUILayer.debugContainer.addChild(testImage);
                onImageLoadComplete();
            };
            RES.getResByUrl(this._url, onRESComplete, this, RES.ResourceItem.TYPE_IMAGE);
            //}
        };
        p.onComplete = function () {
            this.factory = new dragonBones.EgretFactory();
            this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(this._armatureConfig));
            this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(this._bitmap.texture, this._textureConfig));
            this._dragonBonesData = this.factory.getDragonBonesData(this._armatureConfig.name);
            this.currentArmatureData = this._dragonBonesData.armatures[this.defaultArmature ? this.defaultArmature : this._dragonBonesData.armatureNames[0]];
            if (this.currentArmatureData)
                this.currentAnimationData = this.currentArmatureData.getAnimation(this.defaultAnimation);
            if (this.currentArmatureData && this.currentAnimationData) {
                this.armature = this.factory.buildArmature(this.currentArmatureData.name);
                this.armatureDisplay = this.armature.display;
                this._scaleX = this.width / this.currentArmatureData.aabb.width;
                this._scaleY = this.height / this.currentArmatureData.aabb.height;
                this.sourceScaleX = this._scaleX;
                this.sourceScaleY = this._scaleY;
                this.armatureDisplay.x = -this.currentArmatureData.aabb.x * this._scaleX;
                this.armatureDisplay.y = -this.currentArmatureData.aabb.y * this._scaleY;
                this.armatureDisplay.scaleX = this._scaleX;
                this.armatureDisplay.scaleY = this._scaleY;
                this._isComplete = true;
                this.sourceWidth = this.width;
                this.sourceHeight = this.height;
                this.container.addChild(this.armatureDisplay);
                dragonBones.WorldClock.clock.add(this.armature);
                if (this.isPlayDefault) {
                    this.armature.animation.play(this.defaultAnimation, this.playTimes);
                    this.isRealPlaying = true;
                }
                else {
                    this.armature.animation.stop();
                    this.isRealPlaying = false;
                }
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onResourceLoaded));
                //动画开始播放时
                this.armature.addEventListener(dragonBones.AnimationEvent.START, this.onStartPlayHanlder, this);
                //每循环完成一次
                this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onLoopCompleteHanlder, this);
                //所有的都循环完成
                this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onAllLoopCompleteHanlder, this);
            }
        };
        //开始播放时        
        p.onStartPlayHanlder = function (event) {
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPlayStart));
        };
        //每循环一次
        p.onLoopCompleteHanlder = function (event) {
            this.curPlayedTimes++;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onLoopComplete));
        };
        p.onAllLoopCompleteHanlder = function (event) {
            this.curPlayedTimes++;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onAllLoopComplete));
            this.isRealPlaying = false;
        };
        d(p, "scale"
            ,function () {
                return this._scale;
            }
            ,function (value) {
                if (this._scale != value) {
                    this._scale = value;
                    this._scaleX = this._scaleY = value;
                    this.update = true;
                }
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
                    if (this.armatureDisplay && this.currentAnimationData) {
                        this.armatureDisplay.x = -this.currentArmatureData.aabb.x * this._scaleX;
                        this.armatureDisplay.scaleX = this._scaleX;
                    }
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
                    if (this.armatureDisplay && this.currentAnimationData) {
                        this.armatureDisplay.y = -this.currentArmatureData.aabb.y * this._scaleY;
                        this.armatureDisplay.scaleY = this._scaleY;
                    }
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
                    if (this.armatureDisplay && this.currentAnimationData) {
                        this._scaleX = this.width / this.currentArmatureData.aabb.width;
                        this.armatureDisplay.x = -this.currentArmatureData.aabb.x * this._scaleX;
                        this.armatureDisplay.scaleX = this._scaleX;
                    }
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
                    if (this.armatureDisplay && this.currentAnimationData) {
                        this._scaleY = this.height / this.currentArmatureData.aabb.height;
                        this.armatureDisplay.y = -this.currentArmatureData.aabb.y * this._scaleY;
                        this.armatureDisplay.scaleY = this._scaleY;
                    }
                }
            }
        );
        p.onTick = function () {
            if (!this._isComplete)
                return;
            dragonBones.WorldClock.clock.advanceTime(-1);
        };
        /**
         * 切换骨架
         *
         */
        p.changeArmature = function (armatureName, animationName) {
            armatureName = ls.eval_e(armatureName);
            animationName = ls.eval_e(animationName);
            if (this.armatureDisplay) {
                this.container.removeChild(this.armatureDisplay);
            }
            if (this.armature) {
                dragonBones.WorldClock.clock.remove(this.armature);
                this.armature.removeEventListener(dragonBones.AnimationEvent.START, this.onStartPlayHanlder, this);
                this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onLoopCompleteHanlder, this);
                this.armature.dispose();
                this.armatureDisplay.dispose();
            }
            this.currentArmatureData = this._dragonBonesData.armatures[armatureName];
            if (!this.currentArmatureData)
                return;
            this.currentAnimationData = this.currentArmatureData.getAnimation(animationName);
            if (!this.currentAnimationData)
                return;
            var isError = false;
            try {
                this.armature = this.factory.buildArmature(armatureName);
            }
            catch (err) {
                isError = true;
            }
            if (isError)
                return;
            this.armatureDisplay = this.armature.display;
            this.armatureDisplay.scaleX = this.sourceScaleX;
            this.armatureDisplay.scaleY = this.sourceScaleY;
            this.armatureDisplay.x = -this.currentArmatureData.aabb.x * this.armatureDisplay.scaleX;
            this.armatureDisplay.y = -this.currentArmatureData.aabb.y * this.armatureDisplay.scaleY;
            this._isComplete = true;
            this.container.addChild(this.armatureDisplay);
            dragonBones.WorldClock.clock.add(this.armature);
            this.armature.animation.play(animationName, this.playTimes);
            this.isRealPlaying = true;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onResourceLoaded));
            this.armature.addEventListener(dragonBones.AnimationEvent.START, this.onStartPlayHanlder, this);
            this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onLoopCompleteHanlder, this);
        };
        p.setAnimationTimeScale = function (timeScale) {
            if (this._isComplete) {
                this.armature.animation.timeScale = ls.eval_e(timeScale);
            }
        };
        p.setPlayTimes = function (playTimes) {
            if (this._isComplete) {
                this.playTimes = ls.eval_e(playTimes);
                var animationState = this.armature.animation.getState(this.currentAnimationName);
                if (animationState)
                    animationState.playTimes = this.playTimes;
            }
        };
        p.play = function () {
            if (this._isComplete) {
                this.armature.animation.play(this.currentAnimationName, this.playTimes);
                this.isRealPlaying = true;
            }
        };
        p.gotoAndPlayByFrame = function (frame) {
            if (frame === void 0) { frame = 0; }
            if (this._isComplete) {
                frame = ls.eval_e(frame);
                this.armature.animation.gotoAndPlayByFrame(this.currentAnimationName, frame, this.playTimes);
                this.isRealPlaying = true;
            }
        };
        p.gotoAndPlayByProgress = function (progress) {
            if (this._isComplete) {
                progress = ls.eval_e(progress);
                this.armature.animation.gotoAndPlayByProgress(this.currentAnimationName, progress, this.playTimes);
                this.isRealPlaying = true;
            }
        };
        p.gotoAndPlayByTime = function (time) {
            if (this._isComplete) {
                time = ls.eval_e(time);
                this.armature.animation.gotoAndPlayByTime(this.currentAnimationName, time, this.playTimes);
                this.isRealPlaying = true;
            }
        };
        p.gotoAndStopByFrame = function (frame) {
            if (this._isComplete) {
                frame = ls.eval_e(frame);
                this.armature.animation.gotoAndStopByFrame(this.currentAnimationName, frame);
            }
        };
        p.gotoNextFrame = function (isRecycle) {
            if (this._isComplete) {
                isRecycle = ls.eval_e(isRecycle);
                var _curFame = this.currentFrame;
                var _totalFrame = this.totalFrame;
                var nextFrame;
                if (isRecycle == 1)
                    nextFrame = (_curFame + 1);
                else {
                    if (this.totalFrame == 0)
                        nextFrame = 0;
                    else
                        nextFrame = (_curFame + 1) % _totalFrame;
                }
                this.armature.animation.gotoAndStopByFrame(this.currentAnimationName, nextFrame);
            }
        };
        p.gotoPrevFrame = function (isRecycle) {
            if (this._isComplete) {
                isRecycle = ls.eval_e(isRecycle);
                var _curFame = this.currentFrame;
                var _totalFrame = this.totalFrame;
                var prevFrame;
                if (isRecycle == 1) {
                    prevFrame = (_curFame <= 0 ? 0 : (_curFame - 1));
                }
                else {
                    if (this.totalFrame == 0)
                        prevFrame = 0;
                    else
                        prevFrame = (_curFame - 1 + _totalFrame) % _totalFrame;
                }
                this.armature.animation.gotoAndStopByFrame(this.currentAnimationName, prevFrame);
            }
        };
        //设置播放顺序 order 1:正序 2：逆序
        p.setDBPlayOrder = function (order) {
            if (this._isComplete) {
                var order = ls.eval_e(order);
                this._playOrder = order || 1;
                var animationState = this.armature.animation.getState(this.currentAnimationName);
                if (animationState)
                    animationState.timeScale = (order == 1 ? 1 : -1);
            }
        };
        p.gotoAndStopByProgress = function (progress) {
            if (this._isComplete) {
                progress = ls.eval_e(progress);
                this.armature.animation.gotoAndStopByProgress(this.currentAnimationName, progress);
            }
        };
        p.gotoAndStopByTime = function (time) {
            if (this._isComplete) {
                time = ls.eval_e(time);
                this.armature.animation.gotoAndStopByTime(this.currentAnimationName, time);
            }
        };
        p.stop = function () {
            if (this._isComplete) {
                this.armature.animation.stop(this.currentAnimationName);
                this.isRealPlaying = false;
            }
        };
        p.hasAnimation = function (event) {
            return { instances: [this], status: this._isComplete && this.currentAnimationName == ls.eval_e(event.animationName) && this.currentArmatureData.name == ls.eval_e(event.armatureName) };
        };
        p.compareSkeletonAction = function (event) {
            return { instances: [this], status: (!this._isComplete || !this.currentArmatureData) ? false : ls.eval_e(event.armatureName) == this.currentArmatureData.name };
        };
        p.compareDragonBonesTimeScale = function (event) {
            return { instances: [this], status: this._isComplete && ls.compare(this.armature.animation.timeScale, event.operationType, event.timeScale) };
        };
        p.dragonBonesIsPlaying = function (event) {
            return { instances: [this], status: this._isComplete && this.isRealPlaying && this.armature.animation.isPlaying && !this.armature.animation.isCompleted };
        };
        p.dragonBonesIsPlayComplete = function (event) {
            return { instances: [this], status: this._isComplete && this.armature.animation.isCompleted };
        };
        p.onPlayStart = function (event) {
            return { instances: [this], status: true };
        };
        //每循环一次触发
        p.onLoopComplete = function (event) {
            return { instances: [this], status: true };
        };
        //所有循环播放完毕之后触发        
        p.onAllLoopComplete = function (event) {
            return { instances: [this], status: true };
        };
        d(p, "currentAnimationName"
            ,function () {
                if (this._isComplete)
                    return this.currentAnimationData.name;
                return "";
            }
        );
        d(p, "animationDuration"
            ,function () {
                if (this._isComplete)
                    return this.currentAnimationData.duration;
                return 0;
            }
        );
        d(p, "animationFrameCount"
            ,function () {
                if (this._isComplete)
                    return this.currentAnimationData.frameCount;
                return 0;
            }
        );
        d(p, "animationPlayTimes"
            ,function () {
                if (this._isComplete)
                    return this.currentAnimationData.playTimes;
                return 0;
            }
        );
        d(p, "animationPosition"
            ,function () {
                if (this._isComplete)
                    return this.currentAnimationData.position;
                return 0;
            }
        );
        d(p, "animationFadeInTime"
            ,function () {
                if (this._isComplete)
                    return this.currentAnimationData.fadeInTime;
                return 0;
            }
        );
        d(p, "currentArmatureName"
            ,function () {
                if (this._isComplete)
                    return this.currentArmatureData.name;
                return "";
            }
        );
        d(p, "armatureframeRate"
            ,function () {
                if (this._isComplete)
                    return this.currentArmatureData.frameRate;
                return 0;
            }
        );
        d(p, "currentFrame"
            ,function () {
                if (this._isComplete && this.armature.animation.lastAnimationState)
                    return Math.round(this.armature.animation.lastAnimationState.currentTime * this.armature.armatureData.frameRate);
                return 0;
            }
        );
        d(p, "totalFrame"
            ,function () {
                if (this._isComplete && this.armature.animation.lastAnimationState)
                    return Math.round(this.armature.animation.lastAnimationState.totalTime * this.armature.armatureData.frameRate);
                return 0;
            }
        );
        d(p, "currentPlayedTimes"
            ,function () {
                if (this._isComplete)
                    return this.curPlayedTimes;
                return 0;
            }
        );
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["url"] = this["url"];
            o["textureConfigUrl"] = this["textureConfigUrl"];
            o["skeletonUrl"] = this["skeletonUrl"];
            o["isPlayDefault"] = this["isPlayDefault"];
            o["isPlayDefault"] = this["isPlayDefault"];
            o["playTimes"] = this["playTimes"];
            o["animationName"] = this["animationName"];
            o["armatureName"] = this["armatureName"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this["url"] = o["url"];
                this["textureConfigUrl"] = o["textureConfigUrl"];
                this["skeletonUrl"] = o["skeletonUrl"];
                this["isPlayDefault"] = o["isPlayDefault"];
                this["isPlayDefault"] = o["isPlayDefault"];
                this["playTimes"] = o["playTimes"];
                this["animationName"] = o["animationName"];
                this["armatureName"] = o["armatureName"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl["url"] = this["url"];
            cl["textureConfigUrl"] = this["textureConfigUrl"];
            cl["skeletonUrl"] = this["skeletonUrl"];
            cl["isPlayDefault"] = this["isPlayDefault"];
            cl["playTimes"] = this["playTimes"];
            cl["animationName"] = this["animationName"];
            cl["armatureName"] = this["armatureName"];
            cl.initialize();
            return cl;
        };
        AIDragonBones.textureConfigs = {};
        AIDragonBones.armatureContfigs = {};
        return AIDragonBones;
    }(ls.AISprite));
    ls.AIDragonBones = AIDragonBones;
    egret.registerClass(AIDragonBones,'ls.AIDragonBones');
    var CompareSkeletonActionEvent = (function (_super) {
        __extends(CompareSkeletonActionEvent, _super);
        function CompareSkeletonActionEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareSkeletonActionEvent,p=c.prototype;
        return CompareSkeletonActionEvent;
    }(ls.BaseEvent));
    ls.CompareSkeletonActionEvent = CompareSkeletonActionEvent;
    egret.registerClass(CompareSkeletonActionEvent,'ls.CompareSkeletonActionEvent');
    var CompareDragonBonesTimeScaleEvent = (function (_super) {
        __extends(CompareDragonBonesTimeScaleEvent, _super);
        function CompareDragonBonesTimeScaleEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=CompareDragonBonesTimeScaleEvent,p=c.prototype;
        return CompareDragonBonesTimeScaleEvent;
    }(ls.BaseEvent));
    ls.CompareDragonBonesTimeScaleEvent = CompareDragonBonesTimeScaleEvent;
    egret.registerClass(CompareDragonBonesTimeScaleEvent,'ls.CompareDragonBonesTimeScaleEvent');
    var DragonBonesHasAnimationEvent = (function (_super) {
        __extends(DragonBonesHasAnimationEvent, _super);
        function DragonBonesHasAnimationEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=DragonBonesHasAnimationEvent,p=c.prototype;
        return DragonBonesHasAnimationEvent;
    }(ls.BaseEvent));
    ls.DragonBonesHasAnimationEvent = DragonBonesHasAnimationEvent;
    egret.registerClass(DragonBonesHasAnimationEvent,'ls.DragonBonesHasAnimationEvent');
    var DragonBonesIsPlayingEvent = (function (_super) {
        __extends(DragonBonesIsPlayingEvent, _super);
        function DragonBonesIsPlayingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=DragonBonesIsPlayingEvent,p=c.prototype;
        return DragonBonesIsPlayingEvent;
    }(ls.BaseEvent));
    ls.DragonBonesIsPlayingEvent = DragonBonesIsPlayingEvent;
    egret.registerClass(DragonBonesIsPlayingEvent,'ls.DragonBonesIsPlayingEvent');
    var DragonBonesIsPlayCompleteEvent = (function (_super) {
        __extends(DragonBonesIsPlayCompleteEvent, _super);
        function DragonBonesIsPlayCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=DragonBonesIsPlayCompleteEvent,p=c.prototype;
        return DragonBonesIsPlayCompleteEvent;
    }(ls.BaseEvent));
    ls.DragonBonesIsPlayCompleteEvent = DragonBonesIsPlayCompleteEvent;
    egret.registerClass(DragonBonesIsPlayCompleteEvent,'ls.DragonBonesIsPlayCompleteEvent');
    var DragonBonesOnPlayStartEvent = (function (_super) {
        __extends(DragonBonesOnPlayStartEvent, _super);
        function DragonBonesOnPlayStartEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=DragonBonesOnPlayStartEvent,p=c.prototype;
        return DragonBonesOnPlayStartEvent;
    }(ls.BaseEvent));
    ls.DragonBonesOnPlayStartEvent = DragonBonesOnPlayStartEvent;
    egret.registerClass(DragonBonesOnPlayStartEvent,'ls.DragonBonesOnPlayStartEvent');
    var DragonBonesOnLoopCompleteEvent = (function (_super) {
        __extends(DragonBonesOnLoopCompleteEvent, _super);
        function DragonBonesOnLoopCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=DragonBonesOnLoopCompleteEvent,p=c.prototype;
        return DragonBonesOnLoopCompleteEvent;
    }(ls.BaseEvent));
    ls.DragonBonesOnLoopCompleteEvent = DragonBonesOnLoopCompleteEvent;
    egret.registerClass(DragonBonesOnLoopCompleteEvent,'ls.DragonBonesOnLoopCompleteEvent');
    var DragonBonesOnAllLoopCompleteEvent = (function (_super) {
        __extends(DragonBonesOnAllLoopCompleteEvent, _super);
        function DragonBonesOnAllLoopCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=DragonBonesOnAllLoopCompleteEvent,p=c.prototype;
        return DragonBonesOnAllLoopCompleteEvent;
    }(ls.BaseEvent));
    ls.DragonBonesOnAllLoopCompleteEvent = DragonBonesOnAllLoopCompleteEvent;
    egret.registerClass(DragonBonesOnAllLoopCompleteEvent,'ls.DragonBonesOnAllLoopCompleteEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map