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
/**
 * 以下示例加载一个 MP3 文件，进行播放，并输出播放该 MP3 文件时所发生的声音事件的相关信息。
 */
var SoundExample = (function (_super) {
    __extends(SoundExample, _super);
    function SoundExample() {
        return _super.call(this) || this;
    }
    SoundExample.prototype.startLoadMusic = function (url) {
        //创建 Sound 对象
        var sound = new egret.Sound();
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(url);
        console.log(123);
    };
    SoundExample.prototype.onLoadComplete = function (event) {
        //获取加载到的 Sound 对象
        var sound = event.target;
        //播放音乐
        var channel = sound.play(0, 1);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    SoundExample.prototype.onSoundComplete = function (event) {
        egret.log("onSoundComplete");
    };
    return SoundExample;
}(egret.DisplayObjectContainer));
__reflect(SoundExample.prototype, "SoundExample");
//# sourceMappingURL=SoundExample.js.map