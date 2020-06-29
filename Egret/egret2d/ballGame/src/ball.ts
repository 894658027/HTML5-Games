class ball extends eui.Component implements eui.UIComponent {

	//神棍按钮
	public btn_start: eui.Button;
	//足球图片
	public img_ball: eui.Image;
	//Win图片
	public win_Top: eui.Image;
	public win_Buttom: eui.Image;
	public i: number = 1;
	public tw: egret.Tween;
	//用于判定输赢的0 - 1的随机数
	random: number;
	private btnbool: Boolean = true;

	private audioCurrent;

	private _sound: egret.Sound;

	public constructor() {
		super();
		this.skinName = "resource/gameSkins/ball.exml";
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
	}
	private startGame():void{

	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.startLoad();
	}
	private startLoad() {
		this.loadBgSound();
		this.loadImages();
	}
	private loadImages() {
		var loader: egret.ImageLoader = new egret.ImageLoader();
		loader.addEventListener(egret.Event.COMPLETE, this.loadComplate, this)
		var url: string = 'resource/assets/ballImgs.png'
		loader.load(url)
	}
	private loadBgSound() {
		this.audioCurrent = new SoundExample();
	}
	private loadComplate() {
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,
			this.onButtonClick, this);
		this.img_ball.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playTweenAnim, this)
	}

	//点击神棍，足球开始缓动
	private onButtonClick(e: egret.TouchEvent) {

		if (this.btnbool) {
			this.img_ball.source = 'resource/assets/ballImgs.png'
			this.btnbool = false;
		} else {
			this.img_ball.source = 'resource/assets/ballImg.png'
			this.btnbool = true;
		}

		switch (this.i) {
			case 1://开始游戏
				this.ballTween();
				this.i++;
				this.btn_start.currentState = "pause";
				break;
			case 2://暂停游戏
				this.tw.setPaused(true);
				this.btn_start.currentState = "resume";
				this.i++;
				break;
			case 3://继续游戏
				this.tw.setPaused(false);
				this.btn_start.currentState = "pause";
				this.i = 2;
				break;
			case 4://重新开始
				//将win图片设置为不可见
				this.win_Top.visible = false;
				this.win_Buttom.visible = false;
				//将足球图片位置居中
				this.img_ball.x = this.stage.width / 2;
				this.img_ball.y = this.stage.height / 2;
				this.i = 1;
				this.btn_start.currentState = "up"
				break;
		}
	}


	/**
	 * 足球缓动
	 */
	private ballTween() {
		this.random = Math.random();
		if (this.random < 0.5) {
			//获取球执行tween动画
			this.tw = egret.Tween.get(this.img_ball)

			this.tw.to({ y: 1000 }, 250).to({ y: 120 }, 500).to({ y: 1000 }, 500)
				.to({ y: 120 }, 500).to({ y: 1000 }, 500).to({ y: 120 }, 500).call(() => {
					this.win_Buttom.visible = true;
					this.btn_start.currentState = "reset";
					this.i = 4;
				});
		}
		else if (this.random > 0.5) {
			this.tw = egret.Tween.get(this.img_ball)
			this.tw.to({ y: 1000 }, 250).to({ y: 120 }, 500).to({ y: 1000 }, 500)
				.to({ y: 120 }, 500).to({ y: 1000 }, 500).call(() => {
					this.win_Top.visible = true;
					this.btn_start.currentState = "reset";
					this.i = 4;
				});
		}
	}
	private playTweenAnim() {
		// 图片缩放动画 
		this.playBallZoom(this.img_ball)
		// 图片旋转动画
		this.playBallrotation(this.img_ball)
		// 播放音频
		 var url:string = "resource/assets/Sound/sound_click.mp3";
		this.audioCurrent.startLoadMusic(url);

	}
	private _nScaleBase: number;
	//定义缩放系数
	private static STEP_SCALE: number = .3;
	//定义旋转角度
	private static STEP_ROT: number = 3;

	private _channel: egret.SoundChannel;

	private _pauseTime: number = 0;

	private playBallZoom(e) {
		this._nScaleBase = 0;
		this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
			e.scaleX = e.scaleY = 0.8 + 0.2 * Math.abs(Math.sin(this._nScaleBase += ball.STEP_SCALE));
		}, this)
	}
	private playBallrotation(e) {
		this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
			e.rotation += ball.STEP_ROT;
		}, this)
	}
}