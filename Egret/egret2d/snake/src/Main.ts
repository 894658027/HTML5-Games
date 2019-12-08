class Main extends egret.DisplayObjectContainer {

    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createGameScene, this);

         var sound:egret.Sound = new egret.Sound();//媒体函数
         sound.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) { sound.play(0,0);}, this);
         //监听 当页面加载完成时候默认播放音乐且重复播放执行
         sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) 
 {
          console.log("loaded error!"); 
              }, this);
         //监听如果音乐报错 抛出异常
          sound.load("resource/assets/s2.mp3");//加载音乐
       }
    private food: Food; //绘制食物
    private snake: Snake; //绘制蛇
    private stageW: number; //舞台宽度
    private stageH: number;// 舞台高度
    private radius = 25; // 延迟

    private createGameScene(): void {

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
                    }
              //  });
            // }
   // }
    public doMove():void
    {
     //上键执行操作
     let duing: number = 1000;
     //this.head.y -= 10;
     let tweens: egret.Tween;
     tweens = egret.Tween.get(this.head.y);
    tweens.to({x: this.head.x, y:this.head.y}, duing);
    }
    private color = 0x4c8dae;
    private score: number = 0;
    private modal: string = "当前得分:";
    private num: egret.TextField;
    private scoreModal: egret.TextField;

    private onEat() {
        this.removeChild(this.food);

        this.score +=1;
        this.num.text = this.score.toString();
         this.addChild(this.num);
         //---------------------计时定义---------------------------------------------------------------------------
         if(this.score == 3)
         {
        var timer:egret.Timer = new egret.Timer(300,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.timerFuncs,this);
        timer.start(); 
         }
          if(this.score == 6)
         {
        var timerone:egret.Timer = new egret.Timer(200,0);
        timerone.addEventListener(egret.TimerEvent.TIMER,this.timerFuncone,this);
        timerone.start(); 
         }
          if(this.score == 9)
         {
        var timertwo:egret.Timer = new egret.Timer(200,0);
        timertwo.addEventListener(egret.TimerEvent.TIMER,this.timerFunctwo,this);
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
    }

    //---------------------计时执行---------------------------------------------------------------------------
    private timerFuncs()
   {
      // console.log("计时");
       this.food.scaleX = 0.3
       this.food.scaleY = 0.3
     }
     private timerFuncone()
   {
       //console.log("计时1");
       this.food.scaleX = 0.2
       this.food.scaleY = 0.2
     }
     private timerFunctwo()
   {
       //console.log("计时2");
       this.food.scaleX = 0.1
       this.food.scaleY = 0.1
     }


    private randomFood() {
        //显示果实
        var tmpx = Math.random() * (this.stageW - this.radius * 2);
        var tmpy = Math.random() * (this.stageH - this.radius * 2);
        this.food = new Food(tmpx, tmpy, this.radius);
        this.addChild(this.food);
        //模拟被吃
    }
    private drawScore(): void
    {//得分统计面板
       this.num = new egret.TextField();
       this.num.text = this.score.toString();
       this.num.size = 50;
       this.num.width = 200;
       this.num.x = 120;
       this.num.textColor = 0x000000;
       this.num.textAlign = egret.HorizontalAlign.CENTER;
       this.addChild(this.num);
    }
    private drawScoreMoadl()
    {//得分面板
        this.scoreModal = new egret.TextField();
        this.scoreModal.text = this.modal.toString();
        this.scoreModal.size = 40;
        this.scoreModal.width = 300;
        this.scoreModal.x = 2;
        this.scoreModal.y = 5;
        this.scoreModal.textColor = 0x000000;
        this.scoreModal.textAlign = egret.HorizontalAlign.LEFT;
        this.addChild(this.scoreModal);

    }
    private timer: egret.Timer;
    private during: number = 40;
    private moveEvent: egret.TouchEvent;
    private head: egret.Shape;
    // private move(e: egret.TouchEvent) {
    //     this.snake.move(e, this.during);
    // }
    private onMove(e: egret.TouchEvent) {
        this.moveEvent = e;
        if (this.timer == null) {
            this.timer = new egret.Timer(this.during);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
            this.snake.move(this.moveEvent, this.during);
        }
    }
    private moveEnd(e: egret.TouchEvent) {
        if (this.timer != null) {
            this.timer.stop();
            this.timer = null;
    //     let zx = e.stageX;
    //     let zy = e.stageY;
    //     console.log(zx);
    //     console.log(zy);
    //    var tweena: egret.Tween;
    // tweena = egret.Tween.get(this.head);
    // tweena.to({ x:zx+5 , y:zy+5  }, 500);
        }
    }
    private onTimer(e: egret.TimerEvent) {
        this.head = this.snake.getHead();
        if (this.hit(this.head, this.food))
             this.onEat();
        this.snake.move(this.moveEvent, this.during);
    }

    private hit(a, b) {
       // this.snake.move(this.moveEvent, this.during);
        return (new egret.Rectangle(a.x + this.snake.x, a.y + this.snake.y, a.width, a.height))
            .intersects(new egret.Rectangle(b.x, b.y, b.width, b.height));
            
    }
 }