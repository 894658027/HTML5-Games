class GameSetting extends eui.Component implements eui.UIComponent {
	public btn_confirm: eui.Button;
	public gp_music: eui.Group;
	public btn_music: eui.Button;
	public btn_music_dis: eui.Image;
	public gp_effect: eui.Group;
	public btn_effect: eui.Button;
	public btn_effect_dis: eui.Image;

	public constructor() {
		super();
	}

	private static shared: GameSetting;
	public static getInstance() {
		if (!GameSetting.shared) {
			GameSetting.shared = new GameSetting();
		}
		return GameSetting.shared;
	}


	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	private init() {
		this.btn_music_dis.visible = !SoundManage.getInstance().isMusic;
		this.btn_effect_dis.visible = !SoundManage.getInstance().isEffect;

		this.gp_music.addEventListener(egret.TouchEvent.TOUCH_TAP,this.setMusic,this);
		this.gp_effect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.setEffect,this);
		this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP,this.confirmCallBack,this);
	}
	private setMusic() {
		if(SoundManage.getInstance().isMusic){
			SoundManage.getInstance().isMusic = false;
			this.btn_music_dis.visible = true;
		}else{
			SoundManage.getInstance().isMusic = true;
			this.btn_music_dis.visible = false;
		}
	}
	private setEffect() {
		if(SoundManage.getInstance().isEffect){
			SoundManage.getInstance().isEffect = false;
			this.btn_effect_dis.visible = true;
		}else{
			SoundManage.getInstance().isEffect = true;
			this.btn_effect_dis.visible = false;
		}
	}
	private confirmCallBack() {
		SoundManage.getInstance().playClick()
		this.parent.removeChild(this)
	}

}