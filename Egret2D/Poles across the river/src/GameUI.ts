class GameUI extends eui.Component
{
    private lb_score: eui.Label;//步数统计
    private lb_scoreTwo: eui.Label;//初始得分
    private lb_gameoverGroup: eui.Label;//游戏组
    private lb_bestscore: eui.Label;//最高得分
    private lb_restPlay: eui.Button;//再来一次按钮
    private _rePlay: boolean = false;
    public constructor()
    {
        super();
        this.skinName = "src/GameUI.exml";

        this.init();
        this.lb_restPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick_replay,this);
    }
    private init(){
      this.Score = 0;
      this.lb_gameoverGroup.visible = false;
    }
    //存取器通过getters/setters来封装一下，以便在类的外部去访问该属性。

    //计算步数得分
    public get Score():number
    {
      return parseInt(this.lb_score.text);
    }
    public set Score(value: number){

      this.lb_score.text = value.toString();
    }
    //localStorage 取出计算最好分数
    public getBestScore():number{
        
        var str = egret.localStorage.getItem("POLE_BESTSCORE");
        if(str == null){
           return 0;
        } else{
            return parseInt(str);
        }
    }
     //存储更改
    public setBestScore(value:number)
    {
        egret.localStorage.setItem("POLE_BESTSCORE",value.toString());
    }
    //显示结束面板
    public showOver(){
        this.lb_gameoverGroup.visible = true;//可见
        if(this.Score > this.getBestScore())
        {
           this.setBestScore(this.Score);//当前分大于最高分显示当前分
        }
        this.lb_bestscore.text = this.getBestScore().toString();//将当前分负值给最高分
        this.lb_scoreTwo.text = this.Score.toString();//当前分显示
    }
    //从新开始按钮
    private onClick_replay()
    {
      this._rePlay = true;
      this.init();
    }
}