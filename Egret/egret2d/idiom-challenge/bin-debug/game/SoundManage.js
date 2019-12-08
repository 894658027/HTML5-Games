var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManage = (function () {
    function SoundManage() {
        var _this = this;
        this.bg_sound = new egret.Sound();
        this.bg_sound.load('resource/assets/data/sound/Music.mp3');
        this.bg_sound.addEventListener(egret.Event.SOUND_COMPLETE, function () {
            _this.playBgMusic();
        }, this);
        this.click_sound = new egret.Sound();
        this.click_sound.load('resource/assets/data/sound/buttonclick.mp3');
        this.right_sound = new egret.Sound();
        this.right_sound.load('resource/assets/data/sound/right.mp3');
        this.wrong_sound = new egret.Sound();
        this.wrong_sound.load('resource/assets/data/sound/wrong.mp3');
        this.tapWord_sound = new egret.Sound();
        this.tapWord_sound.load('resource/assets/data/sound/type_word.mp3');
    }
    SoundManage.getInstance = function () {
        if (!SoundManage.shared) {
            SoundManage.shared = new SoundManage;
        }
        else {
            return SoundManage.shared;
        }
    };
    SoundManage.prototype.playBgMusic = function () {
        if (this.bg_sound && this.isMusic) {
            this.soundChannel = this.bg_sound.play(0, 0);
        }
    };
    SoundManage.prototype.stopBgMusic = function () {
        if (this.soundChannel) {
            this.soundChannel.stop();
        }
    };
    SoundManage.prototype.playClick = function () {
        if (this.isEffect && this.click_sound) {
            this.click_sound.play(0, 1);
        }
    };
    SoundManage.prototype.playTapWord = function () {
        if (this.isEffect && this.tapWord_sound) {
            this.tapWord_sound.play(0, 1);
        }
    };
    SoundManage.prototype.playRight = function () {
        if (this.isEffect && this.right_sound) {
            this.right_sound.play(0, 1);
        }
    };
    SoundManage.prototype.playWrong = function () {
        if (this.isEffect && this.wrong_sound) {
            this.wrong_sound.play(0, 1);
        }
    };
    Object.defineProperty(SoundManage.prototype, "isMusic", {
        //获取背景音频是否播放
        get: function () {
            var ret = egret.localStorage.getItem('isMusic');
            if (ret == null || ret == '') {
                return true;
            }
            else {
                return ret == '1';
            }
        },
        //设置是否播放背景音频
        set: function (val) {
            if (val) {
                egret.localStorage.setItem('isMusic', '1');
                this.playBgMusic();
            }
            else {
                egret.localStorage.setItem('isMusic', '0');
                this.stopBgMusic();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManage.prototype, "isEffect", {
        //获取背景音频是否播放
        get: function () {
            var ret = egret.localStorage.getItem('isSound');
            if (ret == null || ret == '') {
                return true;
            }
            else {
                return ret == '1';
            }
        },
        //设置是否播放背景音频
        set: function (val) {
            if (val) {
                egret.localStorage.setItem('isSound', '1');
            }
            else {
                egret.localStorage.setItem('isSound', '0');
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundManage;
}());
__reflect(SoundManage.prototype, "SoundManage");
//# sourceMappingURL=SoundManage.js.map