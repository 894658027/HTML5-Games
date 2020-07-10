class LevelIcon extends eui.Button implements  eui.UIComponent {
	public lb_level:eui.Label;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	public get Level(){
		console.log( this.lb_level.text )
		return parseInt( this.lb_level.text );
	}

	public set Level(num){
		if(this.lb_level){
			this.lb_level.text = num.toString();
		}
		
	}
	
}