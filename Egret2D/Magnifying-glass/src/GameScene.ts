class GameScene extends egret.DisplayObjectContainer
{
	private _circleShape:egret.Shape;//遮罩层显示区域容器
	private _bigBmp:egret.Bitmap;//大图被遮罩层
	private scaleWH:number;//计算缩放大小
	private _touchStatus:boolean = false;//计算触摸
	private _container:egret.Sprite;//放大镜容器
	public constructor() 
	{
		super();

		this.Init();

		this.touchEnabled = true;
	}
	private Init()
	{
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
		this.addChild(this._container)
		this._container.x = this._container.y = 300;

		//圆形遮罩图形
		var circleShape = new egret.Shape();
		circleShape.graphics.beginFill(0x000000);
		circleShape.graphics.drawCircle(0,0,70);// x y r 
		circleShape.graphics.endFill();
		this._container.addChild(circleShape);
		this._bigBmp.mask = circleShape;
		//this._bigBmp.mask = null;

		//放大镜边框
		var glassBmp = new egret.Bitmap(RES.getRes("glass_png"));
		this._container.addChild(glassBmp);
		glassBmp.x = -70;
		glassBmp.y = -70;

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touch_begin,this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touch_move,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.touch_end,this);
	}
	private touch_begin(event:egret.TouchEvent)
	{
		this._touchStatus = true;
		this._container.x = event.stageX - 70;
		this._container.y = event.stageY - 70;
	}
	private touch_end(event:egret.TouchEvent)
	{
		this._touchStatus = false;
	}
	private touch_move(event:egret.TouchEvent)
	{
		if(this._touchStatus)
		{
			this._container.x = event.stageX - 70;
			this._container.y = event.stageY - 70;
			
			//this._bigBmp.x = event.stageX * (this.scaleWH - 1) * - 1 + 70;
			//this._bigBmp.y = event.stageY * (this.scaleWH - 1) * - 1 + 70;
	     	this._bigBmp.x = event.stageX * (this.scaleWH - 1)  * -1  + 70;
			this._bigBmp.y = event.stageY * (this.scaleWH - 1)  * -1  + 70;
			//监听你所点的位置 * (图片缩放 - 1(遮罩层偏移度越大右下角) )* -(偏移度越大左上角) + 放大镜偏移度
		}
	}
}