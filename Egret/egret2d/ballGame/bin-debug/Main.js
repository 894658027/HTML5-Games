//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isPause = false;
        _this.isBegin = false;
        return _this;
        // private timerFunc(){
        //     console.log("计时");
        // }
        // private timerComFunc(){
        //         this.win.scaleX = 1;
        //         this.win.scaleY = 1;
        //         this.button.enabled = true;
        //     console.log("计时结束");
        // }
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        // private createBitmapByName(name: string): egret.Bitmap {
        //     let result = new egret.Bitmap();
        //     let texture: egret.Texture = RES.getRes(name);
        //     result.texture = texture;
        //     return result;
        // }
        /**
         * 描述文件加载成功，开始播放动画
         * Description file loading is successful, start to play the animation
         */
        //   private startAnimation(result: Array<any>): void {
        //         let parser = new egret.HtmlTextParser();
        //         let textflowArr = result.map(text => parser.parse(text));
        //         let textfield = this.textfield;
        //         let count = -1;
        //         let change = () => {
        //             count++;
        //             if (count >= textflowArr.length) {
        //                 count = 0;
        //             }
        //             let textFlow = textflowArr[count];
        //             // 切换描述内容
        //             // Switch to described content
        //             textfield.textFlow = textFlow;
        //             let tw = egret.Tween.get(textfield);
        //             tw.to({ "alpha": 1 }, 200);
        //             tw.wait(2000);
        //             tw.to({ "alpha": 0 }, 200);
        //             tw.call(change, this);
        //         };
        //         change();
        //     }
        /**
         * 点击按钮
         * Click the button
         */
        //开始游戏的方法
        //     private onButtonClick(e: egret.TouchEvent) {
        //         this.button.enabled = false;
        //    if(this.win){    
        //        this.removeChild(this.win);
        //    }
        //    this.ball.y = this.stage.height/2 ;
        // var ran:number= Math.random();
        //创建一个计时器
        // this.timer = new egret.Timer(900,4);
        // this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        // this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        // this.timer.start();  
        //     if(ran < 0.5){
        //         this.tn = egret.Tween.get(this.ball);        
        //     this.tn.to({y:120},250)      
        //     for(var i = 0; i < 3 ; i++)
        //     {
        //         this.tn.to({y:1000},500) 
        //         this.tn.to({y:120},500)
        //     }
        //     this. win = this.createBitmapByName("win_png");
        //             this.addChild(this.win);
        //             this.win.width = 400;
        //             this.win.height = 400;
        //             this.win.x = this.stage.width /2-200 ;
        //             this.win.y = this.stage.height /2 + 50 ; 
        //             this.win.scaleX = 0;
        //             this.win.scaleY = 0;
        // }
        // else if(ran >= 0.5){
        //     this.tn = egret.Tween.get(this.ball);  
        // this.timer1 = new egret.Timer(3500,1);
        // this.timer1.addEventListener(egret.TimerEvent.TIMER,this.timerFunc1,this);
        // this.timer1.addEventListener(egret.TimerEvent.TIMER,this.timerComFunc1,this); 
        // this.timer1.start();
        //         this.tn.to({y:1000},250)       
        //         for(var i = 0; i < 3 ; i++)
        //         {
        //             this.tn.to({y:120},500) 
        //             this.tn.to({y:1000},500) 
        //         }
        //         this. win = this.createBitmapByName("win_png");
        //                 this.addChild(this.win);
        //                 this.win.width = 400;
        //                 this.win.height = 400;
        //                 this.win.x = this.stage.width /2-200 ;
        //                 this.win.y = this.stage.height /2 - 400 ;
        //                 this.win.scaleX = 0;
        //                 this.win.scaleY = 0;
        //     }
        // }
        //暂停游戏的方法
        // private onButtonClickPause(e:egret.TouchEvent)
        // {
        //     console.log("游戏暂停了");
        //     this.tn.setPaused(true);
        //     this.timer.stop();
        // }
        // //继续游戏的方法
        // private onButtonClickResume(e:egret.TouchEvent){
        //     console.log("游戏继续");
        //     this.tn.setPaused(false);
        //     this.timer.start();
        // }
        // //每帧都执行的方法
        // private timeOnEnterFrame:number = 0;
        // private  onEnterFrame(e:egret.Event){  
        //     var now = egret.getTimer();
        //     var time = this.timeOnEnterFrame;
        //     var pass = now - time;
        //     this.timeOnEnterFrame = egret.getTimer();
        // }
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
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
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.createGameScene = function () {
        //eui方法
        var ballStage = new ball();
        this.addChild(ballStage);
        //添加开启帧事件监听
        // this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        // this.timeOnEnterFrame = egret.getTimer();
        // let sky = this.createBitmapByName("bgImg_png");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;
        // console.log(sky.width);
        // console.log(sky.height);
        // let aimg = this.createBitmapByName("aImg_png");
        // this.addChild(aimg);
        // aimg.width = 540;
        // aimg.height = 330;
        // aimg.x = this.stage.width /2;
        // aimg.y = 300;
        // aimg.anchorOffsetX = aimg.width /2;
        // aimg.anchorOffsetY = aimg.height /2;
        // let bimg = this.createBitmapByName("bImg_png");
        // this.addChild(bimg);
        // bimg.width = 540;
        // bimg.height = 330;
        // bimg.x = this.stage.width /2;
        // bimg.y = 830;
        // bimg.anchorOffsetX = bimg.width /2;
        // bimg.anchorOffsetY = bimg.height /2;
        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0x140ec8;
        // colorLabel.width = this.stage.width - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "足球比赛";
        // colorLabel.size = 40;
        // colorLabel.anchorOffsetX = colorLabel.width /2;
        // colorLabel.anchorOffsetY = colorLabel.height /2;
        // colorLabel.x = this.stage.width /2 ;
        // colorLabel.y =30;
        // this.addChild(colorLabel);
        // this.ball = new egret.Bitmap(RES.getRes("ballImg_png"));
        // this.addChild(this.ball);
        // this.ball.width = 150;
        // this.ball.height = 150;
        // this.ball.x = this.stage.width / 2;  
        // this.ball.y = this.stage.height / 2;
        // this.ball.anchorOffsetX = this.ball.width /2 ;
        // this.ball.anchorOffsetY = this.ball.height /2 ;
        // //开始游戏
        // this.button = new eui.Button();
        // this.button.label = "开始游戏!";
        // this.button.horizontalCenter = 225;
        // // button.verticalCenter = 0;
        // this.button.width = 180;
        // this.button.height = 80;
        // this.button.anchorOffsetX = this.button.width/ 2;
        // this.button.anchorOffsetY = this.button.height/ 2;
        // // button.x = 500;
        // this.button.y = this.stage.height /2 - 150 ;
        // this.addChild(this.button);
        // this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);
        // //暂停游戏
        // let buttonPause = new eui.Button();
        // buttonPause.label = "暂停游戏!";
        // buttonPause.horizontalCenter = 225;
        // // button.verticalCenter = 0;
        // buttonPause.width = 180;
        // buttonPause.height = 80;
        // buttonPause.anchorOffsetX = buttonPause.width/ 2;
        // buttonPause.anchorOffsetY = buttonPause.height/ 2;
        // // button.x = 500;
        // buttonPause.y = this.stage.height /2 ;
        // this.addChild(buttonPause);
        // buttonPause.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClickPause,this);
        // //继续游戏
        // //暂停游戏
        // let buttonResume = new eui.Button();
        // buttonResume.label = "继续游戏!";
        // buttonResume.horizontalCenter = 225;
        // buttonResume.width = 180;
        // buttonResume.height = 80;
        // buttonResume.anchorOffsetX = buttonResume.width/ 2;
        // buttonResume.anchorOffsetY = buttonResume.height/ 2;
        // buttonResume.y = this.stage.height /2 + 150 ;
        // this.addChild(buttonResume);
        // buttonResume.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClickResume,this);      
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map