/**
 * create by masterLi 2016/11/10
 */
class IndexGame extends ComController {
	/**开始按钮 */
	public btn_start: eui.Button;
	public constructor() {
		super();
		this.skinName = 'resource/skin/indexGame.exml';
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
	}

	private onAddtoStage() {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
	}

	/**游戏开始的操作 移除当前元素 添加面页面 */
	private startGame() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this.btn_start);
		var mainGame = new MainGame();
		this.parent.addChild(mainGame);
		this.parent.removeChild(this);
		mainGame.btnReplay();
	}
}