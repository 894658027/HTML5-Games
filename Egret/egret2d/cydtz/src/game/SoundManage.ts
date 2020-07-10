class SoundManage {
	private bg_sound: egret.Sound;
	private tapWord_sound: egret.Sound;
	private click_sound: egret.Sound;
	private right_sound: egret.Sound;
	private wrong_sound: egret.Sound;

	private soundChannel: egret.SoundChannel;

	public static shared:SoundManage;
	public static getInstance(){
		if(!SoundManage.shared){
			SoundManage.shared = new SoundManage;
		}else{
			return SoundManage.shared;
		}
	}

	public constructor() {
		this.bg_sound = new egret.Sound();
		this.bg_sound.load('resource/assets/data/sound/Music.mp3');
		this.bg_sound.addEventListener(egret.Event.SOUND_COMPLETE,()=>{
			this.playBgMusic();
		},this)

		this.click_sound = new egret.Sound();
		this.click_sound.load('resource/assets/data/sound/buttonclick.mp3')

		this.right_sound = new egret.Sound();
		this.right_sound.load('resource/assets/data/sound/right.mp3')

		this.wrong_sound = new egret.Sound();
		this.wrong_sound.load('resource/assets/data/sound/wrong.mp3')

		this.tapWord_sound = new egret.Sound();
		this.tapWord_sound.load('resource/assets/data/sound/type_word.mp3')
	}
	public playBgMusic() {
		if(this.bg_sound && this.isMusic){
			this.soundChannel = this.bg_sound.play(0,0);
		}
	}
	public stopBgMusic() {
		if(this.soundChannel){
			this.soundChannel.stop()
		}
	}
	public playClick() {
		if(this.isEffect && this.click_sound){
			this.click_sound.play(0,1);
		}
	}
	public playTapWord() {
		if(this.isEffect && this.tapWord_sound){
			this.tapWord_sound.play(0,1);
		}
	}
	public playRight() {
		if(this.isEffect && this.right_sound){
			this.right_sound.play(0,1);
		}
	}
	public playWrong() {
		if(this.isEffect && this.wrong_sound){
			this.wrong_sound.play(0,1);
		}
	}
	//设置是否播放背景音频
	public set isMusic(val){
		if(val){
			egret.localStorage.setItem('isMusic','1');
			this.playBgMusic();
		}else{
			egret.localStorage.setItem('isMusic','0');
			this.stopBgMusic();
		}
	}
	//获取背景音频是否播放
	public get isMusic(){
        let ret = egret.localStorage.getItem('isMusic');
		if(ret == null || ret == ''){
			return true
		}else{
			return ret == '1'
		}
	}

	//设置是否播放背景音频
	public set isEffect(val){
		if(val){
			egret.localStorage.setItem('isSound','1');
		}else{
			egret.localStorage.setItem('isSound','0');
		}
	}
	//获取背景音频是否播放
	public get isEffect(){
        let ret = egret.localStorage.getItem('isSound');
		if(ret == null || ret == ''){
			return true
		}else{
			return ret == '1'
		}
	}
}