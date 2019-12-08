var ls;
(function (ls) {
    /**
     *  在大多数移动设备中，视频是强制全屏播放的，所以你可以直接调用 play() 方法全屏播放视频，不用将它绘制在Stage中。
     */
    var AIVideo = (function (_super) {
        __extends(AIVideo, _super);
        function AIVideo() {
            _super.call(this);
            this.autoPlay = true;
            this.fullscreen = false;
            this.volume = 1; //音量范围从 0（静音）至 1（最大音量）
            this.startTime = 0;
            this._video = new egret.Video();
            this._video.fullscreen = false;
            this._video.once(egret.Event.COMPLETE, this.onLoad, this);
            this._video.once(egret.Event.ENDED, this.onEnded, this);
            this._video.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        }
        var d = __define,c=AIVideo,p=c.prototype;
        d(p, "enabled",undefined
            ,function (value) {
                this.container.touchChildren = this.container.touchEnabled = value;
                this._video.touchEnabled = value;
            }
        );
        d(p, "width"
            ,function () {
                return this._video.width;
            }
            ,function (value) {
                if (this._video.width != value) {
                    this._video.width = value;
                }
            }
        );
        d(p, "height"
            ,function () {
                return this._video.height;
            }
            ,function (value) {
                if (this._video.height != value) {
                    this._video.height = value;
                }
            }
        );
        d(p, "scaleX"
            ,function () {
                return this._video.scaleX;
            }
            ,function (value) {
                if (this._video.scaleX != value) {
                    this._video.scaleX = value;
                }
            }
        );
        d(p, "scaleY"
            ,function () {
                return this._video.scaleY;
            }
            ,function (value) {
                if (this._video.scaleY != value) {
                    this._video.scaleY = value;
                }
            }
        );
        ////////////////////////////conditions///////////////////////
        p.initialize = function () {
            this._video.poster = ls.eval_e(this.poster);
            this._video.volume = ls.eval_e(this.volume);
            this._video.src = ls.eval_e(this.src);
            this.autoPlay = false;
            if (this.autoPlay)
                this.setSource(this.src);
            this.container.addChild(this._video);
            ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapFullscreen, this);
        };
        p.onTapFullscreen = function (event) {
            this._isClick = true;
            this._video.fullscreen = ls.eval_e(this.fullscreen);
        };
        p.isFullscreen = function (event) {
            return { instances: [this], status: ls.eval_e(event.fullscreen) == this._isFullscreen };
        };
        p.isMuted = function (event) {
            return { instances: [this], status: ls.eval_e(event.muted) == this._isMuted };
        };
        p.isPaused = function (event) {
            return { instances: [this], status: !this._isPlaying };
        };
        p.isPlaying = function (event) {
            return { instances: [this], status: this._isPlaying };
        };
        p.onPlayComplete = function (event) {
            return { instances: [this], status: true };
        };
        p.onLoadComplete = function (event) {
            return { instances: [this], status: true };
        };
        p.onLoadError = function (event) {
            return { instances: [this], status: true };
        };
        ////////////////////////////actions///////////////////////
        p.pause = function () {
            this._isPlaying = false;
            this._video.pause();
        };
        p.play = function (startTime, loop) {
            this.startTime = ls.eval_e(startTime);
            this.loop = ls.eval_e(loop);
            this._isPlaying = true;
            this._video.play(this.startTime, this.loop);
        };
        p.close = function () {
            this._video.close();
        };
        p.setPosition = function (value) {
            this.startTime = ls.eval_e(value);
            this._video.play(this.startTime, this.loop);
        };
        p.setfullscreen = function (value) {
            value = ls.eval_e(value);
            if (this._isClick)
                this._video.fullscreen = value;
        };
        p.setloop = function (loop) {
            this.loop = ls.eval_e(loop);
            this._video.play(this.startTime, this.loop);
        };
        p.setMuted = function (value) {
            value = ls.eval_e(value);
            this._isMuted = true;
        };
        p.setSource = function (source) {
            this.src = ls.eval_e(source);
            if (this.src)
                this._video.load(this.src);
        };
        /** 音量从0~1之间 */
        p.setVolume = function (volume) {
            this.volume = ls.eval_e(volume);
            this._video.volume = this.volume;
            //这里设定音量如果为零，表示静音
            this._isMuted = (this.volume <= 0);
        };
        p.setPoster = function (posterSrc) {
            this.poster = ls.eval_e(posterSrc);
            this._video.poster = this.poster;
        };
        p.destory = function () {
            this.pause();
            this.close();
        };
        d(p, "isPlay"
            ////////////////////////////expressions///////////////////////
            ,function () {
                return this._isPlaying;
            }
        );
        d(p, "isMute"
            ,function () {
                return this._isMuted;
            }
        );
        p.onLoad = function (event) {
            this._isloadComplete = true;
            this.startTime = ls.eval_e(this.startTime);
            this.loop = ls.eval_e(this.loop);
            if (this.autoPlay)
                this._video.play(this.startTime, this.loop);
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onLoadComplete));
        };
        p.onEnded = function (event) {
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPlayComplete));
        };
        p.onLoadErr = function (event) {
            this._isloadComplete = false;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onLoadError));
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["src"] = this.src;
            o["autoPlay"] = this.autoPlay;
            o["poster"] = this.poster;
            o["volume"] = this.volume;
            o["startTime"] = this.startTime;
            o["loop"] = this.loop;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this["src"] = o.src;
                this["autoPlay"] = o.autoPlay;
                this["poster"] = o.poster;
                this["volume"] = o.volume;
                this["startTime"] = o.startTime;
                this["loop"] = o.loop;
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.src = this.src;
            cl.autoPlay = this.autoPlay;
            cl.poster = this.poster;
            cl.volume = this.volume;
            cl.startTime = this.startTime;
            cl.loop = this.loop;
            cl.initialize();
            return cl;
        };
        return AIVideo;
    }(ls.AISprite));
    ls.AIVideo = AIVideo;
    egret.registerClass(AIVideo,'ls.AIVideo');
    var IsVideoFullscreenEvent = (function (_super) {
        __extends(IsVideoFullscreenEvent, _super);
        function IsVideoFullscreenEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsVideoFullscreenEvent,p=c.prototype;
        return IsVideoFullscreenEvent;
    }(ls.BaseEvent));
    ls.IsVideoFullscreenEvent = IsVideoFullscreenEvent;
    egret.registerClass(IsVideoFullscreenEvent,'ls.IsVideoFullscreenEvent');
    var IsVideoMutedEvent = (function (_super) {
        __extends(IsVideoMutedEvent, _super);
        function IsVideoMutedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsVideoMutedEvent,p=c.prototype;
        return IsVideoMutedEvent;
    }(ls.BaseEvent));
    ls.IsVideoMutedEvent = IsVideoMutedEvent;
    egret.registerClass(IsVideoMutedEvent,'ls.IsVideoMutedEvent');
    var IsVideoPasuedEvent = (function (_super) {
        __extends(IsVideoPasuedEvent, _super);
        function IsVideoPasuedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsVideoPasuedEvent,p=c.prototype;
        return IsVideoPasuedEvent;
    }(ls.BaseEvent));
    ls.IsVideoPasuedEvent = IsVideoPasuedEvent;
    egret.registerClass(IsVideoPasuedEvent,'ls.IsVideoPasuedEvent');
    var IsVideoPlayingEvent = (function (_super) {
        __extends(IsVideoPlayingEvent, _super);
        function IsVideoPlayingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsVideoPlayingEvent,p=c.prototype;
        return IsVideoPlayingEvent;
    }(ls.BaseEvent));
    ls.IsVideoPlayingEvent = IsVideoPlayingEvent;
    egret.registerClass(IsVideoPlayingEvent,'ls.IsVideoPlayingEvent');
    var OnVideoPlayCompleteEvent = (function (_super) {
        __extends(OnVideoPlayCompleteEvent, _super);
        function OnVideoPlayCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnVideoPlayCompleteEvent,p=c.prototype;
        return OnVideoPlayCompleteEvent;
    }(ls.BaseEvent));
    ls.OnVideoPlayCompleteEvent = OnVideoPlayCompleteEvent;
    egret.registerClass(OnVideoPlayCompleteEvent,'ls.OnVideoPlayCompleteEvent');
    var OnVideoLoadCompleteEvent = (function (_super) {
        __extends(OnVideoLoadCompleteEvent, _super);
        function OnVideoLoadCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnVideoLoadCompleteEvent,p=c.prototype;
        return OnVideoLoadCompleteEvent;
    }(ls.BaseEvent));
    ls.OnVideoLoadCompleteEvent = OnVideoLoadCompleteEvent;
    egret.registerClass(OnVideoLoadCompleteEvent,'ls.OnVideoLoadCompleteEvent');
    var OnVideoLoadErrorEvent = (function (_super) {
        __extends(OnVideoLoadErrorEvent, _super);
        function OnVideoLoadErrorEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnVideoLoadErrorEvent,p=c.prototype;
        return OnVideoLoadErrorEvent;
    }(ls.BaseEvent));
    ls.OnVideoLoadErrorEvent = OnVideoLoadErrorEvent;
    egret.registerClass(OnVideoLoadErrorEvent,'ls.OnVideoLoadErrorEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map