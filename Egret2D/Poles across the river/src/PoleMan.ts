class PoleMan extends egret.DisplayObjectContainer
{
    public constructor(){
        super();
        this.touchEnabled = true;
        this.mcFactory = new egret.MovieClipDataFactory(RES.getRes('longzhu_json'),RES.getRes('longzhu_png'));
        this.addContainer();
    }
    private _bgContainer:egret.Sprite;//游戏背景
    private _container:egret.Sprite;//游戏主容器
    private _touchOnOff:boolean = false;//检测屏幕是否被点击
    private _speed:number = 0.001;//加速度

    private _hill:egret.Shape;//山实际距离
    private _dis:number = 0;//山体距离
    private _distance:number = 0;// 山体距离
    private _hillWidth:number = 0;//山体宽度
    private _createHill:boolean = true;//可创建山体
    private _pole:egret.Shape;//杆子
    private _poleWidth:number = 0;//杆子宽度
    private _createPole:boolean = true;//创建杆子
    private _rotationComplete:boolean = true;//旋转开关
    private _rotationOver:boolean = false;//旋转失败

    private mcFactory:egret.MovieClipDataFactory;//动画编辑
    private _hero:egret.MovieClip;
    private _heroMove:boolean = false;
    private _heroRun:boolean = false;
    private _overOne:boolean = false;

    private _GameUI:GameUI;

    //--------------------------------------------初始化容器------------------------------------------------
    private addContainer(){
        
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touch_begin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touch_end,this);
        //将在进入新的一帧即下一帧开始时回调，回调速率是跟帧率相关的
        this.addEventListener(egret.TouchEvent.ENTER_FRAME,this.onLoop,this);


        this._bgContainer = new egret.Sprite();
        this.addChild(this._bgContainer);

        this._container = new egret.Sprite();
        this.addChild(this._container);

        var bg:egret.Shape = new egret.Shape();
        bg = GraphicsUtil.drawRect(0,0,640,960,0x445566);
        this._bgContainer.addChild(bg);

        this._hill = GraphicsUtil.drawRect(-50,800,100,300);
        this._container.addChild(this._hill);

        
    }

    private touch_begin(){

    }

    private touch_end(){

    }

    private onLoop(){
        
    }

}