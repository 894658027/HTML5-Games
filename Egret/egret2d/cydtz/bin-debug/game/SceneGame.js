var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 初始化  加载关卡信息
 */
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        return _super.call(this) || this;
    }
    SceneGame.getInstance = function () {
        if (!SceneGame.shared) {
            SceneGame.shared = new SceneGame();
        }
        return SceneGame.shared;
    };
    SceneGame.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SceneGame.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    SceneGame.prototype.init = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapBackBtn, this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapNext, this);
    };
    /**
     * 初始化游戏场景
     */
    SceneGame.prototype.initLevelData = function (level) {
        //记录当前关卡
        this.cur_level = level;
        // 获取本关卡的数据
        var curret_levelData = LevelDataManager.getInstance().getLevelData(level);
        // 设置问题图片
        this.img_question.source = "resource/assets/data/" + curret_levelData.img;
        // 设置问题字 先把自己关卡的成语(四个字)和混淆字(六个字)拼接起来
        var words = curret_levelData.answer + curret_levelData.word;
        //拼接20个字符
        while (words.length == 10) {
            var i = Math.floor(Math.random() * LevelDataManager.getInstance().totalLevels);
            if (i != level) {
                var random_levelData = LevelDataManager.getInstance().getLevelData(i);
                words += (random_levelData.answer + random_levelData.word);
            }
        }
        // 把words变成数组
        var words_arr = words.split("");
        // console.log(words_arr);
        words_arr = this.randomList(words_arr);
        // console.log(words_arr);
        // 初始化单词组的文字，渲染并显示出来
        for (var i = 0; i < this.gp_words.numChildren; i++) {
            var gp_word_item = this.gp_words.getChildAt(i);
            gp_word_item.setWordText(words_arr[i]);
            gp_word_item.visible = true;
        }
        // 初始化问题组，清空组内数据
        for (var i = 0; i < this.gp_answer.numChildren; i++) {
            var gp_answer_item = this.gp_answer.getChildAt(i);
            gp_answer_item.setSelectWord(null);
            gp_answer_item.selected_word = null;
            gp_answer_item.visible = true;
        }
    };
    /**
     * 返回按钮回调函数
     */
    SceneGame.prototype.onTapBackBtn = function () {
        this.parent.addChild(SceneLevel.getInstance());
        this.parent.removeChild(this);
    };
    /**
     * 下一题按钮
     */
    SceneGame.prototype.onTapNext = function () {
        // 先把游戏正解场景隐藏起来
        this.gp_win.visible = false;
        SceneLevel.getInstance().setMileStoneLevel(this.cur_level + 1);
        // 重新初始化游戏场景
        this.initLevelData(this.cur_level + 1);
    };
    //点击选择区域的文字
    SceneGame.prototype.onTapSelectWord = function (w) {
        SoundManage.getInstance().playTapWord();
        var sel = null;
        for (var i = 0; i < this.gp_answer.numChildren; i++) {
            var answer_word = this.gp_answer.getChildAt(i);
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
        var answer_str = "";
        for (var i = 0; i < this.gp_answer.numChildren; i++) {
            var gp_answer_item = this.gp_answer.getChildAt(i);
            answer_str += gp_answer_item.getWordText();
        }
        //选项填满了，开始匹配json文件中的answer正确与否
        if (answer_str.length == 4) {
            if (answer_str == LevelDataManager.getInstance().getLevelData(this.cur_level).answer) {
                SoundManage.getInstance().playRight();
                this.showWin();
            }
            else {
                SoundManage.getInstance().playWrong();
            }
        }
    };
    SceneGame.prototype.showWin = function () {
        var data = LevelDataManager.getInstance().getLevelData(this.cur_level);
        this.lab_cyjs.text = data.tip;
        this.lab_cycc.text = data.content;
        this.gp_win.visible = true;
    };
    /**
     * 对一个数组进行随机排列
     */
    SceneGame.prototype.randomList = function (arr) {
        var array = [];
        while (arr.length > 0) {
            var i = Math.floor(Math.random() * arr.length);
            // array.push(arr.splice(i,1)[0]);
            array.push(arr[i]);
            arr.splice(i, 1);
        }
        return array;
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SceneGame.js.map