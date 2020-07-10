var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelDataItem = (function () {
    function LevelDataItem() {
    }
    return LevelDataItem;
}());
__reflect(LevelDataItem.prototype, "LevelDataItem");
var LevelDataManager = (function () {
    function LevelDataManager() {
        this.items = [];
        this.items = RES.getRes('questions_json');
        //获取关卡总长度
        this.totalLevels = this.items.length;
    }
    LevelDataManager.getInstance = function () {
        if (!LevelDataManager.shared) {
            LevelDataManager.shared = new LevelDataManager();
        }
        return LevelDataManager.shared;
    };
    //获取json具体关卡下标
    LevelDataManager.prototype.getLevelData = function (level) {
        return this.items[level];
    };
    Object.defineProperty(LevelDataManager.prototype, "Milestone", {
        //本地存储关卡逻辑
        get: function () {
            var milestone = egret.localStorage.getItem('guessword');
            if (milestone == null || milestone == '') {
                return 1;
            }
            else {
                return parseInt(milestone);
            }
        },
        //读取当前关卡数据
        set: function (level) {
            console.log('set milestone' + level);
            egret.localStorage.setItem('guessword', level.toString());
        },
        enumerable: true,
        configurable: true
    });
    return LevelDataManager;
}());
__reflect(LevelDataManager.prototype, "LevelDataManager");
//# sourceMappingURL=LevelDataManager.js.map