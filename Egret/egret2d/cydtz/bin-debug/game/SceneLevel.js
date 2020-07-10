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
var SceneLevel = (function (_super) {
    __extends(SceneLevel, _super);
    function SceneLevel() {
        var _this = _super.call(this) || this;
        // 声明数组 存放关卡按钮
        _this.levelIcons = [];
        return _this;
    }
    SceneLevel.getInstance = function () {
        if (!SceneLevel.shared) {
            SceneLevel.shared = new SceneLevel();
        }
        return SceneLevel.shared;
    };
    SceneLevel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SceneLevel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    SceneLevel.prototype.init = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backCallBack, this);
        // scroller  关闭水平方向滚动
        this.sc_level.scrollPolicyH = eui.ScrollPolicy.OFF;
        //20行*10列
        var col = 10;
        var row = 20;
        var icon_width = this.width / col;
        var icon_height = this.height / row;
        //创建icon的group添加到scroller上
        var group = new eui.Group();
        this.gp_level.addChild(group);
        group.width = this.width;
        // 每个icon的高度 * 总关卡数
        group.height = icon_height * LevelDataManager.getInstance().totalLevels;
        // 填充背景图
        for (var i = 0; i < group.height / this.height; i++) {
            var img_bg = new eui.Image("GameBG2_jpg");
            img_bg.y = i * this.height;
            this.gp_level.addChildAt(img_bg, 0);
        }
        //获取当前游戏的进度
        var milestrone = LevelDataManager.getInstance().Milestone;
        //设置关卡icon
        for (var i = 0; i < LevelDataManager.getInstance().totalLevels; i++) {
            var icon = new LevelIcon();
            group.addChild(icon);
            icon.Level = i + 1;
            icon.x = Math.sin(icon_height * i / 2 / 180 * Math.PI) * 200 + group.width / 2;
            icon.y = group.height - icon_height * i - icon.height;
            //给按钮添加点击事件回调
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapIcon, this);
            //设置关卡按钮的状态 是否可以点击
            icon.enabled = i < milestrone;
            // 把关卡按钮存入数组
            this.levelIcons.push(icon);
        }
        //scroller滚动到底部
        this.gp_level.scrollV = group.height - this.height;
        //让目前进度处于屏幕最上端（假设，我玩到了25关，让25关出现在最顶层）
        if (milestrone > 20) {
            this.gp_level.scrollV = group.height - milestrone * icon_height;
        }
        //设置箭头位置
        this.img_arrow.anchorOffsetX = this.img_arrow.width / 2;
        this.img_arrow.anchorOffsetY = this.img_arrow.height;
        var curretIcon = this.levelIcons[milestrone - 1];
        this.img_arrow.x = curretIcon.x + curretIcon.width / 2;
        this.img_arrow.y = curretIcon.y;
        //将箭头显示在最上层
        this.gp_level.addChild(this.img_arrow);
        //设置当前选择的关卡
        this.sel_levle = milestrone;
    };
    SceneLevel.prototype.backCallBack = function () {
        SoundManage.getInstance().playClick();
        this.parent.addChild(SceneBegin.getInstance());
        this.parent.removeChild(this);
    };
    /**
     * 点击关卡按钮
     */
    SceneLevel.prototype.onTapIcon = function (event) {
        // 播放点击音效
        SoundManage.getInstance().playClick();
        // 获取当前点击的关卡
        var tg_icon = event.currentTarget;
        this.sel_levle = tg_icon.Level;
        // let currentLevel = LevelDataManager.getInstance().Milestone;
        // 设置箭头的位置为当前点击关卡的位置
        this.img_arrow.x = tg_icon.x + tg_icon.width / 2;
        this.img_arrow.y = tg_icon.y;
        // 跳转场景 
        this.parent.addChild(SceneGame.getInstance());
        this.parent.removeChild(this);
        SceneGame.getInstance().initLevelData(tg_icon.Level);
    };
    SceneLevel.prototype.setMileStoneLevel = function (level) {
        var icon = this.levelIcons[level - 1];
        icon.enabled = true;
        this.img_arrow.x = icon.x + icon.width / 2;
        this.img_arrow.y = icon.y;
        if (level > LevelDataManager.getInstance().Milestone) {
            LevelDataManager.getInstance().Milestone = level;
        }
    };
    return SceneLevel;
}(eui.Component));
__reflect(SceneLevel.prototype, "SceneLevel", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SceneLevel.js.map