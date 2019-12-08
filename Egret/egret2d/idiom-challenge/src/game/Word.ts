class Word extends eui.Component implements  eui.UIComponent {
	public lab_word:eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/game/Word.exml";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	
	private init(){
		this.lab_word.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickWord,this);

	} 
	// 点击文字的回调函数
	public onClickWord(){
		SceneGame.getInstance().onTapSelectWord(this);
	}

	//设置文字内容
	public setWordText(val:string){
		this.lab_word.text = val;
	}

	// 获取文本内容
	public getWordText():string{
		return this.lab_word.text;
	}
}



class AnswerWord extends Word{
	public selected_word:Word = null;

	public constructor(){
		super();
	}

	//重写点击事件
	public onClickWord(){
		SoundManage.getInstance().playClick();
		//如果点击的答案区有文字内容
		if(this.selected_word){
			this.setWordText("");
			this.selected_word.visible = true;
			this.selected_word = null;
		}

	}

	public setSelectWord(w:Word){
		if(w){
			this.setWordText(w.getWordText());
			w.visible = false;
		}else{
			this.setWordText("");
		}

		this.selected_word = w;
	}


}

window["Word"] = Word;
window["AnswerWord"] = AnswerWord;