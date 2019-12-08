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
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        return _super.call(this) || this;
    }
    SceneBegin.getInstance = function () {
        if (!SceneBegin.shared) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    };
    // 添加皮肤的时候自动调用这个函数 
    SceneBegin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    // 组件加载完毕后调用
    SceneBegin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    SceneBegin.prototype.init = function () {
        SoundManage.getInstance();
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.begin_tap, this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setting_tap, this);
    };
    SceneBegin.prototype.begin_tap = function () {
        SoundManage.getInstance().playClick();
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(SceneLevel.getInstance());
    };
    SceneBegin.prototype.setting_tap = function () {
        SoundManage.getInstance().playClick();
        this.addChild(GameSetting.getInstance());
    };
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SceneBegin.js.map