class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

        platform.showShareMenu();

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    private car: egret.Bitmap;
    private isMove: boolean = false;
    private radius: number
    private top_cx: number;
    private top_cy: number;
    private bot_cx: number;
    private bot_cy: number;
    private left_x: number;
    private right_x: number;
    private speed: number = 10;
    private cl: number = 0;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.createBgPic()
        this.createPaoDao()

        this.car = new egret.Bitmap();
        this.car.texture = RES.getRes('car_png');
        this.addChild(this.car)

        this.car.anchorOffsetX = this.car.width / 2;
        this.car.anchorOffsetY = this.car.width / 2;
        this.car.y = this.stage.stageHeight - this.stage.stageWidth / 2 - 10;
        this.car.x = this.stage.stageWidth - this.car.width / 2;

        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDrive, this)
    }
    private createBgPic() {
        let bgPic:egret.Bitmap = this.createBitmapByName('bg_jpg')
        this.addChild(bgPic);
        bgPic.width = this.stage.stageWidth;
        bgPic.height = this.stage.stageHeight;
    }
    private createPaoDao() {
        let top: egret.Shape = new egret.Shape()
        top.graphics.lineStyle(10, 0xff0304);
        top.graphics.beginFill(0xff0000, 0);
        //绘制 圆心的位置x,圆心的位置y,半径，从什么角度到什么角度绘制
        top.graphics.drawArc(this.stage.stageWidth / 2, this.stage.stageWidth / 2 - 10, this.stage.stageWidth / 2 - 40, -Math.PI, 0, false)
        top.graphics.endFill();
        this.addChild(top);

        this.radius = this.stage.stageWidth / 2 - 40;
        this.top_cx = this.stage.stageWidth / 2;
        this.top_cy = this.stage.stageWidth / 2 - 10;

        let left: egret.Shape = new egret.Shape();
        left.graphics.lineStyle(10, 0xff0000);
        //从什么位置开始
        left.graphics.moveTo(40, this.stage.stageWidth / 2 - 10);
        //到什么位置结束
        left.graphics.lineTo(40, this.stage.stageHeight - this.stage.stageWidth / 2 - 10);
        left.graphics.endFill();
        this.addChild(left);
        this.left_x = 40;

        let right: egret.Shape = new egret.Shape();
        right.graphics.lineStyle(10, 0xff0000);
        //从什么位置开始
        right.graphics.moveTo(this.stage.stageWidth - 40, this.stage.stageWidth / 2 - 10);
        //到什么位置结束
        right.graphics.lineTo(this.stage.stageWidth - 40, this.stage.stageHeight - this.stage.stageWidth / 2 - 10);
        right.graphics.endFill();
        this.addChild(right);
        this.right_x = this.stage.stageWidth - 40;


        let bottom: egret.Shape = new egret.Shape()
        bottom.graphics.lineStyle(10, 0xff0304);
        bottom.graphics.beginFill(0xff0000, 0);
        //绘制 圆心的位置x,圆心的位置y,半径，从什么角度到什么角度绘制 
        bottom.graphics.drawArc(this.stage.stageWidth / 2, this.stage.stageHeight - this.stage.stageWidth / 2 - 10, this.stage.stageWidth / 2 - 40, -Math.PI, 0, true)
        bottom.graphics.endFill();
        this.addChild(bottom);

        this.bot_cx = this.stage.stageWidth / 2;
        this.bot_cy = this.stage.stageHeight - this.stage.stageWidth / 2 - 10, this.stage.stageWidth / 2 - 40;
    }
    private onDrive() {
        if (!this.isMove) {
            this.isMove = true;
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this)
        } else {
            this.isMove = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
    }
    private update() {
        if (this.car.y < this.top_cy) {
            this.topRun()
        } else if (this.car.y > this.bot_cy) {
            this.bottomRun()

        } else {
            if (this.car.x < this.top_cx) {
                this.leftRun()
            } else {
                this.rightRun()
            }
        }
    }
    private leftRun() {
        this.cl = 0;
        this.car.y += this.speed;
    }
    private rightRun() {
        this.cl = 0;
        this.car.y -= this.speed;
    }
    private topRun() {
        //先确定位置，然后根据位置 计算出角度, 弧度 = 角度/半径 
        this.cl += this.speed;
        let angle: number = this.cl / this.radius;
        if (angle < Math.PI) {
            //根据弧度旋转小车头部
            this.car.rotation = 180 * -angle / Math.PI;
            this.car.x = this.top_cx + Math.cos(angle) * this.radius;
            this.car.y = this.top_cy - Math.sin(angle) * this.radius;
        } else {
            this.car.rotation = 180;
            this.car.x = this.left_x;
            this.car.y = this.top_cy;
        }
    }
    private bottomRun() {
        this.cl += this.speed;
        let angle: number = this.cl / this.radius;
        if (angle < Math.PI) {
            this.car.rotation = -(180 + 180 * angle / Math.PI);
            this.car.x = this.bot_cx - Math.cos(angle) * this.radius;
            this.car.y = this.bot_cy + Math.sin(angle) * this.radius;
        } else {
            this.car.rotation = 0;
            this.car.x = this.right_x;
            this.car.y = this.bot_cy;
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}