var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this._touchStatus = false; //计算触摸
        _this.Init();
        _this.touchEnabled = true;
        return _this;
    }
    GameScene.prototype.Init = function () {
        //添加小图
        var smallBmp = new egret.Bitmap(RES.getRes("small_jpg"));
        this.addChild(smallBmp);
        //添加大图
        this._bigBmp = new egret.Bitmap(RES.getRes("big_jpg"));
        this.addChild(this._bigBmp);
        //计算大小图的宽度比 宽度值等与2
        this.scaleWH = this._bigBmp.width / smallBmp.width;
        //添加放大镜容器用来移动
        this._container = new egret.Sprite();
        this.addChild(this._container);
        this._container.x = this._container.y = 300;
        //圆形遮罩图形
        var circleShape = new egret.Shape();
        circleShape.graphics.beginFill(0x000000);
        circleShape.graphics.drawCircle(0, 0, 70); // x y r 
        circleShape.graphics.endFill();
        this._container.addChild(circleShape);
        this._bigBmp.mask = circleShape;
        //this._bigBmp.mask = null;
        //放大镜边框
        var glassBmp = new egret.Bitmap(RES.getRes("glass_png"));
        this._container.addChild(glassBmp);
        glassBmp.x = -70;
        glassBmp.y = -70;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touch_begin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touch_move, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touch_end, this);
    };
    GameScene.prototype.touch_begin = function (event) {
        this._touchStatus = true;
        this._container.x = event.stageX - 70;
        this._container.y = event.stageY - 70;
    };
    GameScene.prototype.touch_end = function (event) {
        this._touchStatus = false;
    };
    GameScene.prototype.touch_move = function (event) {
        if (this._touchStatus) {
            this._container.x = event.stageX - 70;
            this._container.y = event.stageY - 70;
            //this._bigBmp.x = event.stageX * (this.scaleWH - 1) * - 1 + 70;
            //this._bigBmp.y = event.stageY * (this.scaleWH - 1) * - 1 + 70;
            this._bigBmp.x = event.stageX * (this.scaleWH - 2) * -1 + 70;
            this._bigBmp.y = event.stageY * (this.scaleWH - 2) * -1 + 70;
        }
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map