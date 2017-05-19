var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.radius = 25; // 延迟
        _this.color = 0x4c8dae;
        _this.score = 0;
        _this.modal = "当前得分:";
        _this.during = 40;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createGameScene, _this);
        var sound = new egret.Sound(); //媒体函数
        sound.addEventListener(egret.Event.COMPLETE, function loadOver(event) { sound.play(0, 0); }, _this);
        //监听 当页面加载完成时候默认播放音乐且重复播放执行
        sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event) {
            console.log("loaded error!");
        }, _this);
        //监听如果音乐报错 抛出异常
        sound.load("resource/assets/s2.mp3"); //加载音乐
        return _this;
    }
    Main.prototype.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        //绘制白色背景
        var bg = new egret.Shape();
        //bg.graphics.beginFill(0x0000ff);
        bg.graphics.drawRect(0, 0, this.stageW, this.stageH);
        bg.graphics.endFill();
        //this.addChild(bg);
        this.drawScore();
        this.drawScoreMoadl();
        this.randomFood();
        // 调用随机制造食物
        this.snake = new Snake(this.stageW * 0.5, this.stageH * 0.5, this.radius, 0x000000);
        this.addChild(this.snake);
        this.touchEnabled = true;
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEnd, this);
        //         if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
        //添加键盘事件
        // var self = this;
        //  document.addEventListener("keydown", function (event: KeyboardEvent) {
        //switch (event.keyCode) {
        //  case 38:
        //    self.doMove();
        //   break;
        // case 39:
        //     self.doMove(1);
        //     break;
        // case 40:
        //     self.doMove(2);
        //     break;
        // case 37:
        //     self.doMove(3);
        //     break;
    };
    //  });
    // }
    // }
    Main.prototype.doMove = function () {
        //上键执行操作
        var duing = 1000;
        //this.head.y -= 10;
        var tweens;
        tweens = egret.Tween.get(this.head.y);
        tweens.to({ x: this.head.x, y: this.head.y }, duing);
    };
    Main.prototype.onEat = function () {
        this.removeChild(this.food);
        this.score += 1;
        this.num.text = this.score.toString();
        this.addChild(this.num);
        //---------------------计时定义---------------------------------------------------------------------------
        if (this.score == 3) {
            var timer = new egret.Timer(300, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncs, this);
            timer.start();
        }
        if (this.score == 6) {
            var timerone = new egret.Timer(200, 0);
            timerone.addEventListener(egret.TimerEvent.TIMER, this.timerFuncone, this);
            timerone.start();
        }
        if (this.score == 9) {
            var timertwo = new egret.Timer(200, 0);
            timertwo.addEventListener(egret.TimerEvent.TIMER, this.timerFunctwo, this);
            timertwo.start();
        }
        //   if(this.score == 8)
        //  {
        // var timerthree:egret.Timer = new egret.Timer(800,0);
        // timerthree.addEventListener(egret.TimerEvent.TIMER,this.timerFuncthree,this);
        // timerthree.start(); 
        //  }
        //同步分数更新
        this.snake.afterEat(this.food.color);
        this.randomFood();
    };
    //---------------------计时执行---------------------------------------------------------------------------
    Main.prototype.timerFuncs = function () {
        // console.log("计时");
        this.food.scaleX = 0.3;
        this.food.scaleY = 0.3;
    };
    Main.prototype.timerFuncone = function () {
        //console.log("计时1");
        this.food.scaleX = 0.2;
        this.food.scaleY = 0.2;
    };
    Main.prototype.timerFunctwo = function () {
        //console.log("计时2");
        this.food.scaleX = 0.1;
        this.food.scaleY = 0.1;
    };
    Main.prototype.randomFood = function () {
        //显示果实
        var tmpx = Math.random() * (this.stageW - this.radius * 2);
        var tmpy = Math.random() * (this.stageH - this.radius * 2);
        this.food = new Food(tmpx, tmpy, this.radius);
        this.addChild(this.food);
        //模拟被吃
    };
    Main.prototype.drawScore = function () {
        this.num = new egret.TextField();
        this.num.text = this.score.toString();
        this.num.size = 50;
        this.num.width = 200;
        this.num.x = 120;
        this.num.textColor = 0x000000;
        this.num.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.num);
    };
    Main.prototype.drawScoreMoadl = function () {
        this.scoreModal = new egret.TextField();
        this.scoreModal.text = this.modal.toString();
        this.scoreModal.size = 40;
        this.scoreModal.width = 300;
        this.scoreModal.x = 2;
        this.scoreModal.y = 5;
        this.scoreModal.textColor = 0x000000;
        this.scoreModal.textAlign = egret.HorizontalAlign.LEFT;
        this.addChild(this.scoreModal);
    };
    // private move(e: egret.TouchEvent) {
    //     this.snake.move(e, this.during);
    // }
    Main.prototype.onMove = function (e) {
        this.moveEvent = e;
        if (this.timer == null) {
            this.timer = new egret.Timer(this.during);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
            this.snake.move(this.moveEvent, this.during);
        }
    };
    Main.prototype.moveEnd = function (e) {
        if (this.timer != null) {
            this.timer.stop();
            this.timer = null;
        }
    };
    Main.prototype.onTimer = function (e) {
        this.head = this.snake.getHead();
        if (this.hit(this.head, this.food))
            this.onEat();
        this.snake.move(this.moveEvent, this.during);
    };
    Main.prototype.hit = function (a, b) {
        // this.snake.move(this.moveEvent, this.during);
        return (new egret.Rectangle(a.x + this.snake.x, a.y + this.snake.y, a.width, a.height))
            .intersects(new egret.Rectangle(b.x, b.y, b.width, b.height));
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map