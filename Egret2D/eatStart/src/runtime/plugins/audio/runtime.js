var ls;
(function (ls) {
    var AIAudio = (function (_super) {
        __extends(AIAudio, _super);
        function AIAudio() {
            _super.call(this);
            this.loopTimes = 1;
            this.volume = 1;
            this.isPlaying = false;
            this.position = 0;
            this.isMuted = false;
            this.isPaused = false;
            this.curPlayTimes = 0;
            this.isPlayOnStart = false;
            this.pausePosition = 0;
            this.name = "Audio";
        }
        var d = __define,c=AIAudio,p=c.prototype;
        p.initialize = function () {
            if (this.isPlayOnStart) {
                this.play(this.loopTimes, this.volume);
            }
        };
        p.saveToJSON = function () {
            return {
                "name": this.name,
                "isModel": this.isModel,
                "paramInstances": this.paramInstances,
                "timeScale": this.timeScale,
                "global": this.global,
                "url": this.url,
                "loop": this.loop,
                "volume": this.volume,
                "playOnStart": this.playOnStart
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.name = o["name"];
                this.isModel = o["isModel"];
                this.paramInstances = o["paramInstances"];
                this.timeScale = o["timeScale"];
                this.global = o["global"];
                this.url = o["url"];
                this.loop = o["loop"];
                this.volume = o["volume"];
                this.playOnStart = o["playOnStart"];
            }
        };
        d(p, "playOnStart",undefined
            ,function (value) {
                if (this.isPlayOnStart != value) {
                    this.isPlayOnStart = value;
                }
            }
        );
        d(p, "loop",undefined
            ,function (value) {
                this.loopTimes = value;
            }
        );
        ///////////////////////////////conditions/////////////////////////////////
        p.isSilent = function (isSilentEvent) {
            var _status = false;
            if (this.isMuted)
                _status = true;
            else {
                _status = (this.volume <= 0) ? true : false;
            }
            return { instances: [this], status: _status };
        };
        p.isAnyPlaying = function (isAnyPlayingEvent) {
            var _status = false;
            for (var url in AIAudio.soundCaches) {
                var audio = AIAudio.soundCaches[url];
                if (audio.isPlaying) {
                    _status = true;
                    break;
                }
            }
            return { instances: [this], status: _status };
        };
        p.isSoundPlaying = function (isSoundPlayingEvent) {
            return { instances: [this], status: this.isPlaying };
        };
        p.onended = function (onEndedEvent) {
            return { instances: [this], status: true };
        };
        p.onLoopOnTimeEnded = function (event) {
            return { instances: [this], status: true };
        };
        p.onAllPreloadComplete = function (onAllPreloadCompleteEvent) {
            return { instances: [this], status: false };
        };
        p.onAudioLoadComplete = function ($onAudioLoadCompleteEvent) {
            return { instances: [this], status: true };
        };
        /////////////////////////////actions////////////////////////////////////////
        p.play = function (loopTimes, volume) {
            if (volume === void 0) { volume = 1; }
            if (AIAudio.soundCaches[this.url] == undefined)
                AIAudio.soundCaches[this.url] = this;
            this.loopTimes = ls.eval_e(loopTimes);
            this.volume = ls.eval_e(volume);
            this.loopTimes = (this.loopTimes <= 0) ? Number.MAX_VALUE : this.loopTimes;
            this.isPlaying = true;
            var onSoundPlayComplete = function () {
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onended));
            };
            if (this.sound) {
                this.soundChannel = this.sound.play(this.position, this.loopTimes);
                this.soundChannel.volume = (this.isMuted) ? 0 : this.volume;
                this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, onSoundPlayComplete, this);
            }
            else {
                var onComplete = function ($sound) {
                    if ($sound) {
                        this.sound = $sound;
                        this.play(this.loopTimes, this.volume);
                        this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onAudioLoadComplete));
                    }
                };
                RES.getResByUrl(this.url, onComplete, this, RES.ResourceItem.TYPE_SOUND);
            }
        };
        p.setLoop = function (state) {
            var _isLoop = (ls.eval_e(state) == 0);
            this.loopTimes = (_isLoop) ? Number.MAX_VALUE : 1;
            if (this.sound)
                this.sound.play(this.position, _isLoop ? this.loopTimes : 1);
        };
        p.setMasterVolume = function (volume) {
            this.volume = ls.eval_e(volume);
            for (var url in AIAudio.soundCaches) {
                var audio = AIAudio.soundCaches[url];
                audio.setVolume(this.volume);
            }
        };
        p.setVolume = function (volume) {
            this.volume = ls.eval_e(volume);
            if (this.soundChannel)
                this.soundChannel.volume = ls.eval_e(volume);
        };
        p.setMuted = function (state) {
            this.isMuted = (ls.eval_e(state) == 0);
            if (this.soundChannel) {
                this.soundChannel["isStopped"] = false;
                this.soundChannel.volume = (this.isMuted) ? 0 : this.volume;
            }
        };
        p.setPaused = function (state) {
            this.isPaused = (ls.eval_e(state) == 0);
            if (this.sound) {
                if (this.isPaused) {
                    this.isPlaying = false;
                    this.pausePosition = this.soundChannel.position;
                    this.stop();
                }
                else {
                    this.isPlaying = true;
                    this.position = this.pausePosition;
                    this.play(this.loopTimes, this.volume);
                }
            }
        };
        p.stop = function () {
            if (this.soundChannel)
                this.soundChannel.stop();
            this.isPlaying = false;
        };
        p.clear = function () {
            if (this.sound)
                this.sound.close();
        };
        p.stopAll = function () {
            for (var url in AIAudio.soundCaches) {
                var audio = AIAudio.soundCaches[url];
                audio.stop();
                audio.position = 0;
            }
        };
        p.destory = function () {
            this.stopAll();
            if (!this.isModel) {
                var _name = this.name;
                var list = ls.World.getInstance().objectHash[_name];
                if (list) {
                    var _index = list.indexOf(this);
                    if (_index != -1)
                        list.splice(_index, 1);
                }
            }
            ls.World.getInstance().removeChild(this);
            if (!this.global)
                this.isDead = true;
        };
        AIAudio.soundCaches = {};
        return AIAudio;
    }(ls.AIObject));
    ls.AIAudio = AIAudio;
    egret.registerClass(AIAudio,'ls.AIAudio');
    var IsSilentEvent = (function (_super) {
        __extends(IsSilentEvent, _super);
        function IsSilentEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsSilentEvent,p=c.prototype;
        return IsSilentEvent;
    }(ls.BaseEvent));
    ls.IsSilentEvent = IsSilentEvent;
    egret.registerClass(IsSilentEvent,'ls.IsSilentEvent');
    var IsAnyPlayingEvent = (function (_super) {
        __extends(IsAnyPlayingEvent, _super);
        function IsAnyPlayingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsAnyPlayingEvent,p=c.prototype;
        return IsAnyPlayingEvent;
    }(ls.BaseEvent));
    ls.IsAnyPlayingEvent = IsAnyPlayingEvent;
    egret.registerClass(IsAnyPlayingEvent,'ls.IsAnyPlayingEvent');
    var IsSoundPlayingEvent = (function (_super) {
        __extends(IsSoundPlayingEvent, _super);
        function IsSoundPlayingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsSoundPlayingEvent,p=c.prototype;
        return IsSoundPlayingEvent;
    }(ls.BaseEvent));
    ls.IsSoundPlayingEvent = IsSoundPlayingEvent;
    egret.registerClass(IsSoundPlayingEvent,'ls.IsSoundPlayingEvent');
    var OnEndEvent = (function (_super) {
        __extends(OnEndEvent, _super);
        function OnEndEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnEndEvent,p=c.prototype;
        return OnEndEvent;
    }(ls.BaseEvent));
    ls.OnEndEvent = OnEndEvent;
    egret.registerClass(OnEndEvent,'ls.OnEndEvent');
    var OnLoopOnTimeEndedEvent = (function (_super) {
        __extends(OnLoopOnTimeEndedEvent, _super);
        function OnLoopOnTimeEndedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLoopOnTimeEndedEvent,p=c.prototype;
        return OnLoopOnTimeEndedEvent;
    }(ls.BaseEvent));
    ls.OnLoopOnTimeEndedEvent = OnLoopOnTimeEndedEvent;
    egret.registerClass(OnLoopOnTimeEndedEvent,'ls.OnLoopOnTimeEndedEvent');
    var PreloadCompleteEvent = (function (_super) {
        __extends(PreloadCompleteEvent, _super);
        function PreloadCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=PreloadCompleteEvent,p=c.prototype;
        return PreloadCompleteEvent;
    }(ls.BaseEvent));
    ls.PreloadCompleteEvent = PreloadCompleteEvent;
    egret.registerClass(PreloadCompleteEvent,'ls.PreloadCompleteEvent');
    var OnAudioLoadCompleteEvent = (function (_super) {
        __extends(OnAudioLoadCompleteEvent, _super);
        function OnAudioLoadCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnAudioLoadCompleteEvent,p=c.prototype;
        return OnAudioLoadCompleteEvent;
    }(ls.BaseEvent));
    ls.OnAudioLoadCompleteEvent = OnAudioLoadCompleteEvent;
    egret.registerClass(OnAudioLoadCompleteEvent,'ls.OnAudioLoadCompleteEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map