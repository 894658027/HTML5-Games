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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.isMove = false;
        _this.speed = 10;
        _this.cl = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")
                            // this.startAnimation(result);
                        ];
                    case 2:
                        result = _a.sent();
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        platform.showShareMenu();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        this.createBgPic();
        this.createPaoDao();
        this.car = new egret.Bitmap();
        this.car.texture = RES.getRes('car_png');
        this.addChild(this.car);
        this.car.anchorOffsetX = this.car.width / 2;
        this.car.anchorOffsetY = this.car.width / 2;
        this.car.y = this.stage.stageHeight - this.stage.stageWidth / 2 - 10;
        this.car.x = this.stage.stageWidth - this.car.width / 2;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDrive, this);
    };
    Main.prototype.createBgPic = function () {
        var bgPic = this.createBitmapByName('bg_jpg');
        this.addChild(bgPic);
        bgPic.width = this.stage.stageWidth;
        bgPic.height = this.stage.stageHeight;
    };
    Main.prototype.createPaoDao = function () {
        var top = new egret.Shape();
        top.graphics.lineStyle(10, 0xff0304);
        top.graphics.beginFill(0xff0000, 0);
        //绘制 圆心的位置x,圆心的位置y,半径，从什么角度到什么角度绘制
        top.graphics.drawArc(this.stage.stageWidth / 2, this.stage.stageWidth / 2 - 10, this.stage.stageWidth / 2 - 40, -Math.PI, 0, false);
        top.graphics.endFill();
        this.addChild(top);
        this.radius = this.stage.stageWidth / 2 - 40;
        this.top_cx = this.stage.stageWidth / 2;
        this.top_cy = this.stage.stageWidth / 2 - 10;
        var left = new egret.Shape();
        left.graphics.lineStyle(10, 0xff0000);
        //从什么位置开始
        left.graphics.moveTo(40, this.stage.stageWidth / 2 - 10);
        //到什么位置结束
        left.graphics.lineTo(40, this.stage.stageHeight - this.stage.stageWidth / 2 - 10);
        left.graphics.endFill();
        this.addChild(left);
        this.left_x = 40;
        var right = new egret.Shape();
        right.graphics.lineStyle(10, 0xff0000);
        //从什么位置开始
        right.graphics.moveTo(this.stage.stageWidth - 40, this.stage.stageWidth / 2 - 10);
        //到什么位置结束
        right.graphics.lineTo(this.stage.stageWidth - 40, this.stage.stageHeight - this.stage.stageWidth / 2 - 10);
        right.graphics.endFill();
        this.addChild(right);
        this.right_x = this.stage.stageWidth - 40;
        var bottom = new egret.Shape();
        bottom.graphics.lineStyle(10, 0xff0304);
        bottom.graphics.beginFill(0xff0000, 0);
        //绘制 圆心的位置x,圆心的位置y,半径，从什么角度到什么角度绘制 
        bottom.graphics.drawArc(this.stage.stageWidth / 2, this.stage.stageHeight - this.stage.stageWidth / 2 - 10, this.stage.stageWidth / 2 - 40, -Math.PI, 0, true);
        bottom.graphics.endFill();
        this.addChild(bottom);
        this.bot_cx = this.stage.stageWidth / 2;
        this.bot_cy = this.stage.stageHeight - this.stage.stageWidth / 2 - 10, this.stage.stageWidth / 2 - 40;
    };
    Main.prototype.onDrive = function () {
        if (!this.isMove) {
            this.isMove = true;
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        else {
            this.isMove = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
    };
    Main.prototype.update = function () {
        if (this.car.y < this.top_cy) {
            this.topRun();
        }
        else if (this.car.y > this.bot_cy) {
            this.bottomRun();
        }
        else {
            if (this.car.x < this.top_cx) {
                this.leftRun();
            }
            else {
                this.rightRun();
            }
        }
    };
    Main.prototype.leftRun = function () {
        this.cl = 0;
        this.car.y += this.speed;
    };
    Main.prototype.rightRun = function () {
        this.cl = 0;
        this.car.y -= this.speed;
    };
    Main.prototype.topRun = function () {
        //先确定位置，然后根据位置 计算出角度, 弧度 = 角度/半径 
        this.cl += this.speed;
        var angle = this.cl / this.radius;
        if (angle < Math.PI) {
            //根据弧度旋转小车头部
            this.car.rotation = 180 * -angle / Math.PI;
            this.car.x = this.top_cx + Math.cos(angle) * this.radius;
            this.car.y = this.top_cy - Math.sin(angle) * this.radius;
        }
        else {
            this.car.rotation = 180;
            this.car.x = this.left_x;
            this.car.y = this.top_cy;
        }
    };
    Main.prototype.bottomRun = function () {
        this.cl += this.speed;
        var angle = this.cl / this.radius;
        if (angle < Math.PI) {
            this.car.rotation = -(180 + 180 * angle / Math.PI);
            this.car.x = this.bot_cx - Math.cos(angle) * this.radius;
            this.car.y = this.bot_cy + Math.sin(angle) * this.radius;
        }
        else {
            this.car.rotation = 0;
            this.car.x = this.right_x;
            this.car.y = this.bot_cy;
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
