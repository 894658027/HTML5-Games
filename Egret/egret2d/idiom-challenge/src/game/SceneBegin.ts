class SceneBegin extends eui.Component implements  eui.UIComponent {
	public btn_begin:eui.Button;
	public btn_setting:eui.Button;

	public constructor() {
		super();
	}

	private static shared:SceneBegin;
	public static getInstance(){
		if( !SceneBegin.shared){
			SceneBegin.shared =  new SceneBegin();
		}
		return SceneBegin.shared;
	}

	// 添加皮肤的时候自动调用这个函数 
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	// 组件加载完毕后调用
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init()
	}
	private init() {
		SoundManage.getInstance();

		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.begin_tap,this);
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.setting_tap,this);
	}
	private begin_tap() {
		SoundManage.getInstance().playClick();
		let parent:egret.DisplayObjectContainer = this.parent;
		parent.removeChild(this);
		parent.addChild( SceneLevel.getInstance() );
	}
	private setting_tap() {
		SoundManage.getInstance().playClick()
		this.addChild(GameSetting.getInstance());
	}
	
}