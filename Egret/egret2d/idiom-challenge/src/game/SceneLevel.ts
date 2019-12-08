class SceneLevel extends eui.Component implements eui.UIComponent {
	public btn_back: eui.Button;
	public sc_level: eui.Scroller;
	public gp_level: eui.Group;
	public img_arrow: eui.Image; //箭头
	// 声明数组 存放关卡按钮
	private levelIcons: LevelIcon[] = [];
	// 当前选择的关卡
	private sel_levle: number;

	private static shared: SceneLevel;
	public static getInstance() {
		if (!SceneLevel.shared) {
			SceneLevel.shared = new SceneLevel();
		}
		return SceneLevel.shared;
	}

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}

	private init() {
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backCallBack, this);
		// scroller  关闭水平方向滚动
		this.sc_level.scrollPolicyH = eui.ScrollPolicy.OFF;
		//20行*10列
		let col = 10;
		let row = 20;
		let icon_width = this.width / col;
		let icon_height = this.height / row;

		//创建icon的group添加到scroller上
		let group: eui.Group = new eui.Group();
		this.gp_level.addChild(group);
		group.width = this.width;
		// 每个icon的高度 * 总关卡数
		group.height = icon_height * LevelDataManager.getInstance().totalLevels;

		// 填充背景图
		for (let i: number = 0; i < group.height / this.height; i++) {
			let img_bg: eui.Image = new eui.Image("GameBG2_jpg");
			img_bg.y = i * this.height;
			this.gp_level.addChildAt(img_bg, 0);
		}
		//获取当前游戏的进度
		let milestrone: number = LevelDataManager.getInstance().Milestone;

		//设置关卡icon
		for (let i: number = 0; i < LevelDataManager.getInstance().totalLevels; i++) {
			let icon: LevelIcon = new LevelIcon();
			group.addChild(icon);
			icon.Level = i + 1;
			icon.x = Math.sin(icon_height * i / 2 / 180 * Math.PI) * 200 + group.width / 2;
			icon.y = group.height - icon_height * i - icon.height;
			//给按钮添加点击事件回调
			icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapIcon, this);
			//设置关卡按钮的状态 是否可以点击
			icon.enabled = i < milestrone;
			// 把关卡按钮存入数组
			this.levelIcons.push(icon);
		}

		//scroller滚动到底部
		this.gp_level.scrollV = group.height - this.height;
		//让目前进度处于屏幕最上端（假设，我玩到了25关，让25关出现在最顶层）
		if (milestrone > 20) {
			this.gp_level.scrollV = group.height - milestrone * icon_height;
		}
		//设置箭头位置
		this.img_arrow.anchorOffsetX = this.img_arrow.width / 2;
		this.img_arrow.anchorOffsetY = this.img_arrow.height;

		let curretIcon: LevelIcon = this.levelIcons[milestrone - 1];
		this.img_arrow.x = curretIcon.x + curretIcon.width / 2;
		this.img_arrow.y = curretIcon.y;
		//将箭头显示在最上层
		this.gp_level.addChild(this.img_arrow);

		//设置当前选择的关卡
		this.sel_levle = milestrone;

	}

	private backCallBack() {
		SoundManage.getInstance().playClick();
		this.parent.addChild(SceneBegin.getInstance());
		this.parent.removeChild(this);

	}

	/**
	 * 点击关卡按钮
	 */

	private onTapIcon(event) {
		// 播放点击音效
		SoundManage.getInstance().playClick();
		// 获取当前点击的关卡
		let tg_icon: LevelIcon = <LevelIcon>event.currentTarget;
		this.sel_levle = tg_icon.Level;

		// let currentLevel = LevelDataManager.getInstance().Milestone;

		// 设置箭头的位置为当前点击关卡的位置
		this.img_arrow.x = tg_icon.x + tg_icon.width / 2;
		this.img_arrow.y = tg_icon.y;

		// 跳转场景 
		this.parent.addChild( SceneGame.getInstance() );
		this.parent.removeChild(this);
		SceneGame.getInstance().initLevelData(tg_icon.Level);


	}

	public setMileStoneLevel(level: number) {

		var icon = this.levelIcons[level - 1];
		icon.enabled = true;
		this.img_arrow.x = icon.x + icon.width / 2;
		this.img_arrow.y = icon.y;

		if (level > LevelDataManager.getInstance().Milestone) {
			LevelDataManager.getInstance().Milestone = level;
		}
	}

}