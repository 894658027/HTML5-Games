/**
 * 初始化  加载关卡信息
 */
class SceneGame extends eui.Component implements eui.UIComponent {
	// 返回按钮
	public btn_back:eui.Button;
	// 问题图片
	public img_question:eui.Image;
	// win
	public gp_win:eui.Group;
	// 成语解释
	public lab_cyjs:eui.Label;
	// 成语出处
	public lab_cycc:eui.Label;
	// 元宝
	public lab_yb:eui.Label;
	// 下一题按钮
	public btn_next:eui.Button;
	// 答案
	public gp_answer:eui.Group;
	// 选字
	public gp_words:eui.Group;
	// 记录当前关卡
	public cur_level:number;

	private static shared: SceneGame;
	public static getInstance() {
		if (!SceneGame.shared) {
			SceneGame.shared = new SceneGame();
		}
		return SceneGame.shared;
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
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapBackBtn, this);
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapNext, this);
	}

	/**
	 * 初始化游戏场景
	 */
	public initLevelData(level: number) {
		//记录当前关卡
		this.cur_level = level;
		// 获取本关卡的数据
		let curret_levelData: LevelDataItem = LevelDataManager.getInstance().getLevelData(level);
		// 设置问题图片
		this.img_question.source = "resource/assets/data/" + curret_levelData.img;

		// 设置问题字 先把自己关卡的成语(四个字)和混淆字(六个字)拼接起来
		let words: string = curret_levelData.answer + curret_levelData.word;
		//拼接20个字符
		while (words.length == 10) {
			let i = Math.floor(Math.random() * LevelDataManager.getInstance().totalLevels);
			if (i != level) {
				let random_levelData: LevelDataItem = LevelDataManager.getInstance().getLevelData(i);
				words += (random_levelData.answer + random_levelData.word);
			}
		}
		// 把words变成数组
		let words_arr = words.split("");
		// console.log(words_arr);

		words_arr = this.randomList(words_arr);
		// console.log(words_arr);

		// 初始化单词组的文字，渲染并显示出来
		for (let i: number = 0; i < this.gp_words.numChildren; i++) {
			let gp_word_item = <Word>this.gp_words.getChildAt(i);
			gp_word_item.setWordText(words_arr[i]);
			gp_word_item.visible = true;
		}
		// 初始化问题组，清空组内数据
		for (let i: number = 0; i < this.gp_answer.numChildren; i++) {
			let gp_answer_item = <AnswerWord>this.gp_answer.getChildAt(i);
			gp_answer_item.setSelectWord(null);
			gp_answer_item.selected_word = null;
			gp_answer_item.visible = true;
		}

	}

	/**
	 * 返回按钮回调函数
	 */
	private onTapBackBtn() {
		this.parent.addChild(SceneLevel.getInstance());
		this.parent.removeChild(this);

	}
	/**
	 * 下一题按钮
	 */
	private onTapNext() {
		// 先把游戏正解场景隐藏起来
		this.gp_win.visible = false;
		SceneLevel.getInstance().setMileStoneLevel(this.cur_level + 1);
		// 重新初始化游戏场景
		this.initLevelData(this.cur_level + 1);
	}

	//点击选择区域的文字
	public onTapSelectWord(w: Word) {
		SoundManage.getInstance().playTapWord();
		let sel: AnswerWord = null;
		for (let i: number = 0; i < this.gp_answer.numChildren; i++) {
			let answer_word = <AnswerWord>this.gp_answer.getChildAt(i);

			if (answer_word.getWordText() == "") {
				sel = answer_word;
				break;
			}
		}

		//找到空白的文字
		if (sel) {
			sel.setSelectWord(w);
		}
		//初始化文本内容并绘制内容
		let answer_str: string = "";
		for (let i: number = 0; i < this.gp_answer.numChildren; i++) {
			let gp_answer_item = <AnswerWord>this.gp_answer.getChildAt(i);
			answer_str += gp_answer_item.getWordText();
		}
		//选项填满了，开始匹配json文件中的answer正确与否
		if (answer_str.length == 4) {
			if (answer_str == LevelDataManager.getInstance().getLevelData(this.cur_level).answer) {
				SoundManage.getInstance().playRight();
				this.showWin();
			} else {
				SoundManage.getInstance().playWrong();
			}
		}


	}

	private showWin() {
		let data: LevelDataItem = LevelDataManager.getInstance().getLevelData(this.cur_level);
		this.lab_cyjs.text = data.tip;
		this.lab_cycc.text = data.content;
		this.gp_win.visible = true;
	}
	/**
	 * 对一个数组进行随机排列
	 */
	private randomList(arr: string[]): string[] {
		var array = [];
		while (arr.length > 0) {
			var i = Math.floor(Math.random() * arr.length)
			// array.push(arr.splice(i,1)[0]);
			array.push(arr[i]);
			arr.splice(i, 1);
		}
		return array;
	}

}