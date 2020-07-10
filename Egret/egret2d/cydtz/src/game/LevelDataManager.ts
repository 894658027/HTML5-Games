class LevelDataItem{
	public answer:string;
	public img:string;
	public word:string;
	public tip:string;
	public content:string;
}

class LevelDataManager {
	public static shared: LevelDataManager;
	public static getInstance() {
		if (!LevelDataManager.shared) {
             LevelDataManager.shared = new LevelDataManager();
		}
		return LevelDataManager.shared
	}
	private items: LevelDataItem[] = [];
	public totalLevels:number;

	public constructor() {
		this.items = RES.getRes('questions_json');
		//获取关卡总长度
		this.totalLevels = this.items.length;
	}
	//获取json具体关卡下标
	public getLevelData(level:number):LevelDataItem{
		return this.items[level]
	}
	//本地存储关卡逻辑
	public get Milestone(){
		let milestone = egret.localStorage.getItem('guessword');
		if(milestone == null || milestone == ''){
			return 1;
		}else{
			return parseInt(milestone);
		}
	}
	//读取当前关卡数据
	public set Milestone(level:number){
		console.log('set milestone'+level)
		egret.localStorage.setItem('guessword',level.toString())
	}

}