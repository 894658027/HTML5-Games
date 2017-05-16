var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        _this._rePlay = false;
        _this.skinName = "src/GameUI.exml";
        _this.init();
        _this.lb_restPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick_replay, _this);
        return _this;
    }
    GameUI.prototype.init = function () {
        this.Score = 0;
        this.lb_gameoverGroup.visible = true;
    };
    Object.defineProperty(GameUI.prototype, "Score", {
        //存取器通过getters/setters来封装一下，以便在类的外部去访问该属性。
        //计算步数得分
        get: function () {
            return parseInt(this.lb_score.text);
        },
        set: function (value) {
            this.lb_score.text = value.toString();
        },
        enumerable: true,
        configurable: true
    });
    //localStorage 取出计算最好分数
    GameUI.prototype.getBestScore = function () {
        var str = egret.localStorage.getItem("POLE_BESTSCORE");
        if (str == null) {
            return 0;
        }
        else {
            return parseInt(str);
        }
    };
    //存储更改
    GameUI.prototype.setBestScore = function (value) {
        egret.localStorage.setItem("POLE_BESTSCORE", value.toString());
    };
    //显示结束面板
    GameUI.prototype.showOver = function () {
        this.lb_gameoverGroup.visible = true; //可见
        if (this.Score > this.getBestScore()) {
            this.setBestScore(this.Score); //当前分大于最高分显示当前分
        }
        this.lb_bestscore.text = this.getBestScore().toString(); //将当前分负值给最高分
        this.lb_scoreTwo.text = this.Score.toString(); //当前分显示
    };
    //从新开始按钮
    GameUI.prototype.onClick_replay = function () {
        this._rePlay = true;
        this.init();
    };
    return GameUI;
}(eui.Component));
__reflect(GameUI.prototype, "GameUI");
//# sourceMappingURL=GameUI.js.map