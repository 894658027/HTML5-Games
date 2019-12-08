var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameSetting = (function (_super) {
    __extends(GameSetting, _super);
    function GameSetting() {
        return _super.call(this) || this;
    }
    GameSetting.getInstance = function () {
        if (!GameSetting.shared) {
            GameSetting.shared = new GameSetting();
        }
        return GameSetting.shared;
    };
    GameSetting.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameSetting.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    GameSetting.prototype.init = function () {
        this.btn_music_dis.visible = !SoundManage.getInstance().isMusic;
        this.btn_effect_dis.visible = !SoundManage.getInstance().isEffect;
        this.gp_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMusic, this);
        this.gp_effect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setEffect, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmCallBack, this);
    };
    GameSetting.prototype.setMusic = function () {
        if (SoundManage.getInstance().isMusic) {
            SoundManage.getInstance().isMusic = false;
            this.btn_music_dis.visible = true;
        }
        else {
            SoundManage.getInstance().isMusic = true;
            this.btn_music_dis.visible = false;
        }
    };
    GameSetting.prototype.setEffect = function () {
        if (SoundManage.getInstance().isEffect) {
            SoundManage.getInstance().isEffect = false;
            this.btn_effect_dis.visible = true;
        }
        else {
            SoundManage.getInstance().isEffect = true;
            this.btn_effect_dis.visible = false;
        }
    };
    GameSetting.prototype.confirmCallBack = function () {
        SoundManage.getInstance().playClick();
        this.parent.removeChild(this);
    };
    return GameSetting;
}(eui.Component));
__reflect(GameSetting.prototype, "GameSetting", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameSetting.js.map