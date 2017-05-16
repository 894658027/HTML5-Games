var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeekMain = (function (_super) {
    __extends(GeekMain, _super);
    function GeekMain() {
        var _this = _super.call(this) || this;
        _this.n = 6;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GeekMain.prototype.onAddToStage = function (event) {
        this.spr = new egret.Sprite();
        this.addChild(this.spr);
        this.spr.width = 480;
        this.spr.height = 800;
        this.drawTxt(); //文本格式
        this.drawContent(); //文本内容
        this.onButtonComp(); //开始按钮图片
        //this.onButtonApm();//从玩按钮图片
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onButtonComp, this);
        RES.loadConfig("resource/assets/mybtn.png");
        RES.loadGroup("mybtn_png");
        //确认按钮资源预加载
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onTouchSRP, this);
        RES.loadConfig("resource/assets/congzai.png");
        RES.loadGroup("congzai_png");
        //再玩一次预加载
        this.timer = new egret.Timer(1000, 8);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this); //开始计时执行
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this); //计时结束执行
    };
    GeekMain.prototype.drawTxt = function () {
        this.num = new egret.TextField();
        this.num.text = this.n.toString(); //文本转换进制默认十进制
        this.num.size = 100;
        this.num.width = 630;
        this.num.textColor = 0x00ff00;
        this.num.textAlign = egret.HorizontalAlign.CENTER;
        this.spr.addChild(this.num);
    };
    GeekMain.prototype.drawContent = function () {
        this.con = new egret.TextField();
        this.con.text = "默默倒数6秒，迅速点击文字";
        this.con.textColor = 0x00ff00;
        this.con.width = 630;
        this.con.textAlign = egret.HorizontalAlign.CENTER;
        this.con.y = 120;
        this.spr.addChild(this.con);
    };
    GeekMain.prototype.onButtonComp = function () {
        this.img = new egret.Bitmap();
        this.img.texture = RES.getRes("mybtn_png");
        var rect = new egret.Rectangle(10, 10, 15, 15); //初始坐标位置
        this.img.scale9Grid = rect;
        this.img.y = 200;
        this.img.x = 230;
        this.img.width = 150;
        this.height = 70;
        this.spr.addChild(this.img);
        this.img.touchEnabled = true;
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    GeekMain.prototype.onTouch = function (evt) {
        this.date = new Date();
        this.startTime = this.date.getTime();
        this.img.alpha = 0;
        this.timer.start();
        this.drawTxt();
        this.spr.touchEnabled = true;
        this.spr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
    };
    GeekMain.prototype.timerFunc = function () {
        if (this.n <= 3) {
            this.num.text = "?";
        }
        else {
            this.spr.removeChildren(); //移除对象防止叠加
            this.drawTxt();
        }
        this.n--;
    };
    GeekMain.prototype.timerComFunc = function () {
        if (this.n <= -2) {
            this.drawContent();
            this.con.text = "别模糊了赶紧醒醒!";
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
        }
    };
    GeekMain.prototype.onTouchSRP = function (evt) {
        this.date = new Date(); //截取时间差,点击屏幕时间
        this.stopTime = this.date.getTime();
        this.finalTimer = this.startTime - this.stopTime; //最终时间
        this.num.text = (this.finalTimer / 1000 + 6).toFixed(3); //取最后小数点后3位 ,因为只有number类型
        this.timer.stop();
        this.drawContent();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
        this.spr.touchEnabled = false;
        this.resetImg = new egret.Bitmap();
        this.resetImg.texture = RES.getRes("congzai_png");
        var ract = new egret.Rectangle(30, 30, 15, 15);
        this.resetImg.scale9Grid = ract;
        this.resetImg.y = 400;
        this.resetImg.x = 500;
        this.resetImg.width += 4;
        this.height = 50;
        this.resetImg.touchEnabled = true;
        this.spr.addChild(this.resetImg);
        this.resetImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickBtn, this);
        switch (Math.floor(Math.abs(this.finalTimer / 1000 + 6))) {
            case 0:
                this.con.text = "你真棒！打败了全国百分之99的玩家。";
                break;
            case 1:
                this.con.text = "很专注,还需要继续努力哦！";
                break;
            case 2:
                this.con.text = "别模糊了，醒醒！";
                break;
        }
    };
    GeekMain.prototype.onclickBtn = function (event) {
        this.spr.removeChildren();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
        //alert(123);
        window.location.reload();
    };
    return GeekMain;
}(egret.DisplayObjectContainer));
__reflect(GeekMain.prototype, "GeekMain");
//# sourceMappingURL=GeekMain.js.map