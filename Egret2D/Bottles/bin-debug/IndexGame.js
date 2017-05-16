/**
 * create by masterLi 2016/11/10
 */
var IndexGame = (function (_super) {
    __extends(IndexGame, _super);
    function IndexGame() {
        _super.call(this);
        this.skinName = 'resource/skin/indexGame.exml';
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
    }
    var d = __define,c=IndexGame,p=c.prototype;
    p.onAddtoStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
    };
    /**游戏开始的操作 移除当前元素 添加面页面 */
    p.startGame = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this.btn_start);
        var mainGame = new MainGame();
        this.parent.addChild(mainGame);
        this.parent.removeChild(this);
        mainGame.btnReplay();
    };
    return IndexGame;
}(ComController));
egret.registerClass(IndexGame,'IndexGame');
//# sourceMappingURL=IndexGame.js.map