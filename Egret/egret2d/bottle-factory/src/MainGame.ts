/**
 * create by masterLi 2016/11/10
 */
class MainGame extends ComController {
	/** 生产时间 */
	private birthTime: number = 0;
	/** 上一次的时间 */
	private lastTime: number = 0;
	/** 是否停止 */
	private isPaused: boolean = false;
    /** 瓶子出现的范围 */
	private g_bottles: eui.Group;
	/** 显示分数 */
	public lb_score: eui.Label;
	/** 瓶子下落的速度 */
	public speed: number = 15;
	/** 计时器 */
	public timer: egret.Timer;
	/** 分数记录 */
	private _score: number = 0;
	public get score(): number {
		return this._score;
	}
	public set score(v: number) {
		this._score = v;
		this.lb_score.text = this.lb_over.text = v.toString();
	}
	public constructor() {
		super();
		this.skinName = 'resource/skin/mainGame.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	private onAddToStage() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		// 初始化拖拽的瓶子
		this.pickUpBottleInit();
		// 类似于定时器的效果
        // egret.startTick(this.onUpdate, this); // 这种会出现一个bug  使用下边的方法修复这个 bug 
		// 使用计时器timer来控制瓶子的生成
		this.timer = new egret.Timer(100, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.onUpdate, this);
		this.timer.start();

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.btn_replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnReplay, this);
		this.btn_main.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnMain, this);
	}

	/** 瓶子的移动以及更新 */
    private onUpdate(evt: egret.TimerEvent) {
		var timeStamp = (<egret.Timer>evt.target).currentCount;
		this.log("timeStamp===>" + timeStamp);
		var timeChaLiang = timeStamp - this.lastTime;
		this.lastTime = timeStamp;
		if (this.isPaused) {
			return;
		}
		this.birthTime += timeChaLiang;
		// 生成瓶子 2秒生成一个 
		if (this.birthTime > this.speed) {
			this.birthTime = 0;
			var bottle = new Bottle(<BottleType>Math.floor(Math.random() * 6 + 1));
			bottle.x = Math.random() * this.g_bottles.width;
			this.g_bottles.addChild(bottle);
		}
		// 瓶子下移并且移除超出屏幕的瓶子
		for (var i = this.g_bottles.numChildren - 1; i >= 0; i--) {
			var element = <Bottle>this.g_bottles.getChildAt(i);
			element.y += timeChaLiang * 10;
			// 收集超出屏幕的瓶子
			if (element.y > this.g_bottles.height) {
				this.g_bottles.removeChild(element);
				this.log("出现超出屏幕的瓶子，游戏结束...");
				this.gameOver();
			}
		}
		return;
	}


	/** 拖动的瓶子 */
	private pickUpBottle: Bottle = null;
	/** 选中的瓶子 */
	private selectBottle: Bottle = null;
	/** 拖动的瓶子初始化 */
	private pickUpBottleInit() {
		// 初始化一个拖拽的瓶子
		this.pickUpBottle = new Bottle(1);
		// 将瓶子的锚点移动瓶子的中心
		this.pickUpBottle.anchorOffsetX = 25 / 2;
		this.pickUpBottle.anchorOffsetY = 90 / 2;
		// 为了拖拽的效果比较好 所以将瓶子 扩大一倍显示
		this.pickUpBottle.scaleX = this.pickUpBottle.scaleY = 2;
		this.addChild(this.pickUpBottle);
		this.pickUpBottle.visible = false;
	}

	/** 触碰开始 */
	private onTouchBegin(evt: egret.TouchEvent) {
		// 因为瓶子都在g_bottles上 所以我们要把点击位置相对于g_bottle
		var pt = new egret.Point(evt.stageX - this.g_bottles.x, evt.stageY - this.g_bottles.y);
		// 判断用户是否点击到瓶子上 这里运用点是否包含在某一个区域的方法检测
		for (var i = this.g_bottles.numChildren - 1; i >= 0; i--) {
			var element = <Bottle>this.g_bottles.getChildAt(i);
			if (this.containTest(element, pt)) {
				element.isSelected = true;
				this.selectBottle = element;
				this.pickUpBottle.BottleType = element.BottleType;
				var that = this;
				window.setTimeout(function () {
					that.pickUpBottle.visible = true;
				}, 100);
				return false;
			}
		}
	}
	/** 移动中 */
	private onTouchMove(evt: egret.TouchEvent) {
		if (this.selectBottle == null) {
			return false;
		}
		this.pickUpBottle.x = evt.stageX;
		this.pickUpBottle.y = evt.stageY;
	}
	/** 打包组 */
	private g_bottlePackage: eui.Group;
	/** 触碰结束 */
	private onTouchEnd(evt: egret.TouchEvent) {
		// 将选中的瓶子恢复原色
		if (this.selectBottle !== null) {
			this.selectBottle.isSelected = false;
		}
		// 需要将拖拽的瓶子隐藏掉
		this.pickUpBottle.visible = false;
		// 因为打包车是相对于g_bottlePackage 所以要将结束点的坐标对应到 g_bottlePackage 组中去
		var point = new egret.Point(evt.stageX - this.g_bottlePackage.x, evt.stageY - this.g_bottlePackage.y);
		// 判断瓶子是否放入对应的打包车中
		for (var i = 0; i < this.g_bottlePackage.numChildren; i++) {
			var ele = <BotllePackage>this.g_bottlePackage.getChildAt(i);
			// 若果正在打包的包裹是不能在放入瓶子的
			if (ele.isPacking) {
				this.log('正在打包,不能装载瓶子...');
				continue;
			}
			if (this.containTest(ele, point)) {
				if (this.pickUpBottle.BottleType == ele.pak_type) {
					if (ele.addBottle(this.pickUpBottle)) {
						this.score += 5;// 打包一次加5分
					}
					this.score += 1; // 平常的没进入一次包裹得一分
					this.g_bottles.removeChild(this.selectBottle);
					return false;
				} else {
					// 放错瓶子了,游戏结束
					this.log('放错瓶子了,游戏结束');
					this.gameOver();
				}
			}
		}
	}


	public g_gameOver: eui.Group;
	public btn_replay: eui.Button;
	public btn_main: eui.Button;
	public lb_over: eui.Label;
	/**游戏结束 */
	private gameOver() {
		egret.stopTick(function (timeStamp: number): boolean { return false }, this);
		this.g_gameOver.visible = true;
		this.isPaused = true;
		// 这里做一个出现的动画
		for (var i = 0; i < this.g_gameOver.numChildren; i++) {
			var item = this.g_gameOver.getChildAt(i);
			item.alpha = 0;
			egret.Tween.get(item).wait(i * 200).to({
				'alpha': 1
			}, 1000);
		}
		this.timer.stop();
	}
	/**从新开始 */
    public btnReplay() {
		// 分数清零
		this.score = 0;
		// 清空包裹
		for (var i = 0; i < this.g_bottlePackage.numChildren; i++) {
			var _package = <BotllePackage>this.g_bottlePackage.getChildAt(i);
			_package.cleanPackage();
		}
		// 做一个显示的动画
		for (var i = 0; i < this.g_bottlePackage.numChildren; i++) {
			var item = <BotllePackage>this.g_bottlePackage.getChildAt(i);
			item.anchorOffsetY = -1600;
			egret.Tween.get(item).wait(i * 200).to({
				'anchorOffsetY': 0
			}, 500);
		}
		this.isPaused = false;
		// 清空滚动条上的瓶子
		this.g_bottles.removeChildren();
		this.g_gameOver.visible = false;
        this.timer.start();
	}
	/**返回到介绍页面 */
	public btnMain() {
		this.parent.addChild(new IndexGame());
		this.parent.removeChild(this);
	}
}

