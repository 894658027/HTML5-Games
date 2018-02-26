"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(window).ready(function () {
    var STBG = function () {
        function STBG(config) {
            var _this = this;

            _classCallCheck(this, STBG);

            this.config = config;
            if (window.bgQueue) {
                this.initBG();
                return;
            }

            window.bgQueue = new c.LoadQueue();
            window.bgQueue.addEventListener("complete", function (ev) {
                _this.initBG();
            });

            window.bgQueue.loadManifest([{ id: "black-white-bar", src: "bg1/black-white-bar.png" }, { id: "white-black-bar", src: "bg1/white-black-bar.png" }, { id: "yellow-red-bar", src: "bg1/yellow-red-bar.png" }, { id: "red-yellow-bar", src: "bg1/red-yellow-bar.png" }, { id: "black-white-box", src: "bg1/black-white-box.png" }, { id: "white-black-box", src: "bg1/white-black-box.png" }, { id: "yellow-red-box", src: "bg1/yellow-red-box.png" }, { id: "red-yellow-box", src: "bg1/red-yellow-box.png" }]);
        }

        _createClass(STBG, [{
            key: "initBG",
            value: function initBG() {
                this.stage = new createjs.Stage("bg-canvas");
                this.showTimes = this.config.showTimes < 2 ? 2 : this.config.showTimes;
                this.barWidth = this.config.barWidth > 50 ? 50 : this.config.barWidth;
                this.deltaTime = this.config.deltaTime < 30 ? 30 : this.config.deltaTime;
                this.base = 50;
                this.bgIndex = 0;
                this.currentShowTimes = 0;
                this.bgTypes = ["black-white-bar", "white-black-bar", "yellow-red-bar", "red-yellow-bar", "black-white-box", "white-black-box", "yellow-red-box", "red-yellow-box", "black", "white", "yellow", "red"];
                this.nextBool = true;
                this.rotationBool = false;
                this.bgMaterial = window.bgQueue.getResult("black-white-bar");
                this.pauseValue = false;
                this.stopValue = false;

                this.bg = new createjs.Shape();
                this.stage.addChild(this.bg);
                this.bg.set({
                    regX: this.stage.canvas.width,
                    regY: this.stage.canvas.height,
                    x: this.stage.canvas.width / 2,
                    y: this.stage.canvas.height / 2
                });
                var a = this.barWidth / this.base;
                var b = 0;
                var c = 0;
                var d = this.barWidth / this.base;
                var tx = 0;
                var ty = 0;
                this.matrix = new createjs.Matrix2D(a, b, c, d, tx, ty);
                this.update();
            }
        }, {
            key: "setBarWidth",
            value: function setBarWidth(barWidth) {
                this.barWidth = barWidth > 50 ? 50 : barWidth;
                var a = this.barWidth / this.base;
                var b = 0;
                var c = 0;
                var d = this.barWidth / this.base;
                var tx = 0;
                var ty = 0;
                this.matrix = new createjs.Matrix2D(a, b, c, d, tx, ty);
            }
        }, {
            key: "update",
            value: function update() {
                var _this2 = this;

                this.bg.graphics.clear();
                if (this.bgMaterial) {
                    this.bg.graphics.beginBitmapFill(this.bgMaterial, "repeat", this.matrix).drawRect(0, 0, this.stage.canvas.width * 2, this.stage.canvas.height * 2);
                } else {
                    this.bg.graphics.beginFill(this.fillColor).drawRect(0, 0, this.stage.canvas.width * 2, this.stage.canvas.height * 2);
                }
                this.stage.update();
                this.next();

                if (!this.pauseValue && !this.stopValue) {
                    setTimeout(function () {
                        _this2.update();
                    }, this.deltaTime);
                }
            }
        }, {
            key: "next",
            value: function next() {
                this.currentShowTimes++;
                if (this.currentShowTimes == this.showTimes) {
                    this.currentShowTimes = 0;
                    this.bgIndex++;
                    this.bgIndex %= this.bgTypes.length / 2;

                    if (this.bgIndex == 0) {
                        this.rotationBool = !this.rotationBool;
                    }
                }

                if (this.nextBool) {
                    this.bgMaterial = window.bgQueue.getResult(this.bgTypes[2 * this.bgIndex + 1]);
                    if (!this.bgMaterial) this.fillColor = this.bgTypes[2 * this.bgIndex + 1];
                } else {
                    this.bgMaterial = window.bgQueue.getResult(this.bgTypes[2 * this.bgIndex]);
                    if (!this.bgMaterial) this.fillColor = this.bgTypes[2 * this.bgIndex];
                }

                this.nextBool = !this.nextBool;

                if (this.rotationBool) {
                    this.bg.rotation = (this.bg.rotation + 10) % 360;
                } else {
                    this.bg.rotation = 0;
                }
            }
        }, {
            key: "pause",
            value: function pause() {
                this.pauseValue = true;
            }
        }, {
            key: "restart",
            value: function restart() {
                if (this.pauseValue) {
                    this.pauseValue = false;
                    this.update();
                }
            }
        }, {
            key: "stop",
            value: function stop() {
                this.stopValue = true;
            }
        }, {
            key: "removeSelf",
            value: function removeSelf() {
                this.stopValue = true;
                this.stage.removeAllChildren();
                this.stage.update();
            }
        }]);

        return STBG;
    }();

    window.STBG = STBG;
});