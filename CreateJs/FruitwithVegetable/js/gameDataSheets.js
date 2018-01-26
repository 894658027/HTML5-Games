var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.init = function () {
    var loadingValue = $("#loading span");
    window.queue = new c.LoadQueue();
    window.queue.installPlugin(createjs.Sound);
    window.queue.addEventListener("complete", function (ev) {
        window.game = new Game();
        $("#loading").hide();
    });
    window.queue.addEventListener("progress", function (ev) {
        loadingValue.text((ev.progress * 100).toFixed() + "%");
    });
    window.queue.loadManifest([{ id: "pointsound", src: "music/pointsound.mp3" }, { id: "noMuc", src: "music/noMuc.mp3" }, { id: "s2", src: "music/s2.mp3" }, { id: "nzb", src: "music/nzb.mp3" }]);
    window.queue.loadManifest([{ id: "1", src: "image/shuCai/1.png" }, { id: "2", src: "image/shuCai/2.png" }, { id: "3", src: "image/shuCai/3.png" }, { id: "4", src: "image/shuCai/4.png" }, { id: "5", src: "image/shuCai/5.png" }, { id: "6", src: "image/shuCai/6.png" }, { id: "7", src: "image/shuCai/7.png" }, { id: "8", src: "image/shuCai/8.png" }, { id: "9", src: "image/shuiGuo/1.png" }, { id: "10", src: "image/shuiGuo/2.png" }, { id: "11", src: "image/shuiGuo/3.png" }, { id: "12", src: "image/shuiGuo/4.png" }, { id: "13", src: "image/shuiGuo/5.png" }, { id: "14", src: "image/shuiGuo/6.png" }, { id: "15", src: "image/shuiGuo/7.png" }, { id: "16", src: "image/shuiGuo/8.png" }, { id: "scBtn", src: "image/direPic/scBtn.png" }, { id: "sgBtn", src: "image/direPic/sgBtn.png" }, { id: "scorePanel", src: "image/direPic/scorePanel.png" }, { id: "loading", src: "image/direPic/loading.png" }, { id: "hover", src: "image/direPic/hover.png" }, { id: "normal", src: "image/direPic/normal.png" }]);
};

var Game = (function () {
    function Game() {
        _classCallCheck(this, Game);

        this.stage = new c.Stage("gameView");
        // console.log(this.stage);
        c.Touch.enable(this.stage);
        this.stage.enableMouseOver();
        this.width = this.stage.canvas.width;
        this.height = this.stage.canvas.height;
        //封面操作
        //  this.proloadEvent();
        this.gameDataSheet();
        this.render();
        //音乐媒体
        createjs.Sound.play("s2", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
    }

    _createClass(Game, [{
        key: "render",
        value: function render() {
            var _this = this;

            this.stage.update();
            window.requestAnimationFrame(function () {
                _this.render();
            });
        }
    }, {
        key: "gameDataSheet",
        value: function gameDataSheet() {
            var gameView;
            this.gameView = new createjs.Container();
            this.stage.addChild(this.gameView);
            window.ceil = window.localStorage.vision;
            this.secondCode();
        }
    }, {
        key: "secondCode",
        value: function secondCode() {
            this.bgMain();
            var direction = "距离你近的";
            var zm = "图片";
            var gameViewtwo = new createjs.Container();
            this.stage.addChild(gameViewtwo);
            this.secondScreen(gameViewtwo);
        }
    }, {
        key: "secondScreen",
        value: function secondScreen(gameViewtwo) {
            var _this2 = this;

            var direTwo = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
            var direction = arguments.length <= 2 || arguments[2] === undefined ? "距离你近的" : arguments[2];

            var logSum = 2,
                logSom = 1,
                logRow = 1,
                logClos = 3,
                logZi = 3,
                getHero_1,
                insect_2,
                getHeros_2,
                redImgHero_2;
            var sgBtn_1 = undefined,
                sgBtns = undefined,
                scBtn_1 = undefined,
                scBtns = undefined;
            var bitmaps = [];

            var _loop = function (_i) {
                var heroContainer = new createjs.Container();
                window.currentIndextwo = babyEye.randomRange(1, 15);
                getHero_1 = window.queue.getResult(currentIndextwo);
                insect_2 = new createjs.Bitmap(getHero_1);
                insect_2.regX = 25;
                insect_2.regY = 25;

                insect_2.scaleX = insect_2.scaleY = ceil;

                createjs.Tween.get(insect_2, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
                heroContainer.addChild(insect_2);
                bitmaps.push(heroContainer);
                //按钮组
                //水果按钮
                sgBtn_1 = window.queue.getResult("sgBtn");
                sgBtns = new createjs.Bitmap(sgBtn_1);
                sgBtns.x = 720;
                sgBtns.y = 520;
                gameViewtwo.addChild(sgBtns);
                //蔬菜按钮
                scBtn_1 = window.queue.getResult("scBtn");
                scBtns = new createjs.Bitmap(scBtn_1);
                scBtns.x = 520;
                scBtns.y = 520;
                gameViewtwo.addChild(scBtns);
                //蔬菜水果判断组
                if (window.currentIndextwo <= 8) {
                    scBtns.addEventListener("click", function (ev) {
                        gameViewtwo.removeChild(heroContainer);
                        direTwo = direTwo - 1;
                        if (direTwo == 0) {
                            if (ceil == 0.10000000000000014) {
                                ceil = ceil - 0.3;
                                ceil += 0.3;
                            } else {
                                ceil = ceil - 0.1;
                            }
                            console.log(ceil);
                            _this2.success();
                            _this2.reset();
                            _this2.secondCode();
                        }
                    });
                } else {
                    scBtns.addEventListener("click", function (ev) {
                        _this2.fail();
                    });
                }
                if (window.currentIndextwo > 8) {
                    sgBtns.addEventListener("click", function (ev) {
                        gameViewtwo.removeChild(heroContainer);
                        direTwo = direTwo - 1;
                        if (direTwo == 0) {
                            if (ceil == 0.10000000000000014) {
                                ceil = ceil - 0.3;
                                ceil += 0.3;
                            } else {
                                ceil = ceil - 0.1;
                            }
                            console.log(ceil);
                            _this2.success();
                            _this2.reset();
                            _this2.secondCode();
                        }
                    });
                } else {
                    sgBtns.addEventListener("click", function (ev) {
                        _this2.fail();
                    });
                }
            };

            for (var _i = 0; _i < logSom; _i++) {
                _loop(_i);
            }
            for (var _i2 = 0; _i2 < logSum; _i2++) {
                var heroContainer = new createjs.Container();
                getHeros_2 = window.queue.getResult(babyEye.randomRange(1, 10));
                redImgHero_2 = new createjs.Bitmap(getHeros_2);
                redImgHero_2.scaleX = redImgHero_2.scaleY = ceil;
                redImgHero_2.regX = 20;
                redImgHero_2.regY = 20;
                heroContainer.addChild(redImgHero_2);
                bitmaps.push(heroContainer);
                heroContainer.addEventListener("click", function (ev) {
                    _this2.fail();
                });
            }
            babyEye.shuffle(bitmaps);
            var bitIndex = 0;
            for (var i = 0; i < logRow; i++) {
                for (var j = 0; j < logClos; j++) {
                    var bitn = bitmaps[bitIndex];
                    bitn.x = 440 + 200 * j;
                    bitn.y = 180 + 180 * i;
                    gameViewtwo.addChild(bitn);
                    bitIndex++;
                }
            }
        }
    }, {
        key: "success",
        value: function success() {
            createjs.Sound.play("nzb", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
            $("#sucImg").show(500);
            $("#sucImg").hide(500);
        }
    }, {
        key: "fail",
        value: function fail() {
            createjs.Sound.play("noMuc", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
            $("#failImg").show(500);
            $("#failImg").hide(500);
        }
    }, {
        key: "reset",
        value: function reset() {
            this.stage.removeAllChildren();
            this.stage.removeAllEventListeners();
        }
    }, {
        key: "bgMain",
        value: function bgMain() {
            if (ceil == 1) {
                this.canvasBgeight();
            } else if (ceil == 0.9 && ceil == 0.8) {
                this.canvasBgseven();
            } else if (ceil == 0.7000000000000001) {
                this.canvasBgsix();
            } else if (ceil == 0.6000000000000001) {
                this.canvasBgfive();
            } else if (ceil == 0.5000000000000001) {
                this.canvasBgfour();
            } else if (ceil == 0.40000000000000013) {
                this.canvasBgthree();
            } else if (ceil == 0.30000000000000016 && ceil == 0.20000000000000015) {
                this.canvasBgtwo();
            } else if (ceil == 0.10000000000000014) {
                this.canvasBgone();
            }
        }
    }, {
        key: "canvasBgone",
        value: function canvasBgone() {
            var config = {
                barWidth: 5,
                deltaTime: 400,
                showTimes: 8
            };
            if (window.stbg) stbg.removeSelf();
            window.stbg = new STBG(config);
        }
    }, {
        key: "canvasBgtwo",
        value: function canvasBgtwo() {
            var config = {
                barWidth: 10,
                deltaTime: 400,
                showTimes: 8
            };
            if (window.stbg) stbg.removeSelf();
            window.stbg = new STBG(config);
        }
    }, {
        key: "canvasBgthree",
        value: function canvasBgthree() {
            var config = {
                barWidth: 15,
                deltaTime: 400,
                showTimes: 8
            };
            if (window.stbg) stbg.removeSelf();
            window.stbg = new STBG(config);
        }
    }, {
        key: "canvasBgfour",
        value: function canvasBgfour() {
            var config = {
                barWidth: 20,
                deltaTime: 400,
                showTimes: 8
            };
            if (window.stbg) stbg.removeSelf();
            window.stbg = new STBG(config);
        }
    }, {
        key: "canvasBgfive",
        value: function canvasBgfive() {
            var config = {
                barWidth: 25,
                deltaTime: 400,
                showTimes: 8
            };
            if (window.stbg) stbg.removeSelf();
            window.stbg = new STBG(config);
        }
    }, {
        key: "canvasBgsix",
        value: function canvasBgsix() {
            var config = {
                barWidth: 30,
                deltaTime: 400,
                showTimes: 8
            };
            if (window.stbg) stbg.removeSelf();
            window.stbg = new STBG(config);
        }
    }, {
        key: "canvasBgseven",
        value: function canvasBgseven() {
            var config = {
                barWidth: 35,
                deltaTime: 400,
                showTimes: 8
            };
            if (window.stbg) stbg.removeSelf();
            window.stbg = new STBG(config);
        }
    }, {
        key: "canvasBgeight",
        value: function canvasBgeight() {
            var config = {
                barWidth: 40,
                deltaTime: 400,
                showTimes: 8
            };
            if (window.stbg) stbg.removeSelf();
            window.stbg = new STBG(config);
        }
    }]);

    return Game;
})();