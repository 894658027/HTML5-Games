var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function () {
    var GridBarBG = (function () {
        function GridBarBG(colors, flickerTime, deltaTimeColor, deltaTimeBG, gridWidth, barWidth) {
            if (deltaTimeBG === void 0) { deltaTimeBG = 10 * 1000; }
            if (gridWidth === void 0) { gridWidth = 50; }
            if (barWidth === void 0) { barWidth = 50; }
            var _this = this;
            if (!this.validate(colors))
                return;
            this.stage = new c.Stage("bg-canvas");
            this.width = this.stage.canvas.width;
            this.height = this.stage.canvas.height;
            createjs.Touch.enable(this.stage);
            this.flickerTime = flickerTime;
            this.deltaTimeBG = deltaTimeBG;
            this.currentShapeIndex = 0;
            this.stopValue = false;
            this.lastTime = 0;
            this.bgs = [];
            this.bgGrid = new Bg(colors, deltaTimeColor, gridWidth, gridWidth, this.width, this.height);
            this.bgs.push(this.bgGrid);
            this.bgBar = new Bg(colors, deltaTimeColor, barWidth, this.height, this.width, this.height);
            this.bgs.push(this.bgBar);
            for (var i = 0; i < this.bgs.length; i++) {
                this.stage.addChild(this.bgs[i]);
            }
            this.render();
            setTimeout(function () {
                _this.swapBG();
            }, this.deltaTimeBG);
        }
        GridBarBG.prototype.render = function (timestamp) {
            var _this = this;
            if (this.stopValue)
                return;
            if (timestamp - this.lastTime >= this.flickerTime) {
                for (var i = 0; i < this.bgs.length; i++) {
                    this.bgs[i].visible = false;
                }
                this.bgs[this.currentShapeIndex].visible = true;
                this.bgs[this.currentShapeIndex].flicker();
                this.lastTime = timestamp;
                this.stage.update();
            }
            window.requestAnimationFrame(function (timestamp) {
                _this.render(timestamp);
            });
        };
        GridBarBG.prototype.swapBG = function () {
            var _this = this;
            if (this.stopValue)
                return;
            this.currentShapeIndex++;
            this.currentShapeIndex %= this.bgs.length;
            setTimeout(function () {
                _this.swapBG();
            }, this.deltaTimeBG);
        };
        GridBarBG.prototype.validate = function (colors) {
            if (colors.length % 2 != 0) {
                console.log("接受偶数colors");
                return false;
            }
            else {
                return true;
            }
        };
        GridBarBG.prototype.stop = function () {
            this.stopValue = true;
            for (var i = 0; i < this.bgs.length; i++) {
                if (this.bgs[i].stopChange) {
                    this.bgs[i].stopChange();
                }
                ;
            }
        };
        return GridBarBG;
    }());
    var Bg = (function (_super) {
        __extends(Bg, _super);
        function Bg(colors, deltaTimeColor, gw, gh, width, height) {
            if (gw === void 0) { gw = 50; }
            if (gh === void 0) { gh = 50; }
            if (width === void 0) { width = 1024; }
            if (height === void 0) { height = 768; }
            var _this = _super.call(this) || this;
            var _a = [height / gh, width / gw].map(function (value) { return Math.ceil(value); }), row = _a[0], col = _a[1];
            _this.deltaTimeColor = deltaTimeColor;
            _this.lastTime = 0;
            _this.currentBg = 0;
            _this.currentGrid = 0;
            _this.colorPairs = babyEye.bundle(colors, 2);
            _this.bgs = [];
            for (var count = 0; count < _this.colorPairs.length; count++) {
                var bg0 = new c.Container();
                var bg1 = new c.Container();
                for (var i = 0; i < row; i++) {
                    for (var j = 0; j < col; j++) {
                        var grid0 = new Grid(gw, gh, _this.colorPairs[count], i, j).set({
                            x: j * gw,
                            y: i * gh
                        });
                        bg0.addChild(grid0);
                        var grid1 = new Grid(gw, gh, babyEye.reversed(_this.colorPairs[count]), i, j).set({
                            x: j * gw,
                            y: i * gh
                        });
                        bg1.addChild(grid1);
                    }
                }
                _this.bgs.push([bg0, bg1]);
            }
            _this.flicker();
            _this.addChild(_this.bgs[_this.currentBg][0]);
            setTimeout(function () {
                _this.changeBG();
            }, _this.deltaTimeColor);
            return _this;
        }
        Bg.prototype.flicker = function () {
            this.removeChild(this.bgs[this.currentBg][this.currentGrid]);
            this.currentGrid++;
            this.addChild(this.bgs[this.currentBg][this.currentGrid % 2]);
        };
        Bg.prototype.changeBG = function () {
            var _this = this;
            this.currentBg++;
            this.currentBg %= this.bgs.length;
            if (this.stopChangeValue)
                return;
            setTimeout(function () {
                _this.changeBG();
            }, this.deltaTimeColor);
        };
        Bg.prototype.stopChange = function () {
            this.stopChangeValue = true;
        };
        return Bg;
    }(c.Container));
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(width, height, colors, row, col) {
            var _this = _super.call(this) || this;
            _this.colors = colors;
            _this.width = width;
            _this.height = height;
            var color = _this.colors[(row + col) % 2];
            _this.buildGrid(width, height, color);
            return _this;
        }
        Grid.prototype.buildGrid = function (width, height, color) {
            this.grid = new c.Shape();
            this.grid.color = color;
            this.grid.graphics.beginFill(color).rect(0, 0, width, height);
            this.addChild(this.grid);
        };
        return Grid;
    }(c.Container));
    window.GridBarBG = GridBarBG;
})();
(function () {
    var BarBG = (function () {
        function BarBG(colors, flickerTime, deltaTimeColor, barWidth) {
            if (barWidth === void 0) { barWidth = 50; }
            if (!this.validate(colors))
                return;
            this.stage = new c.Stage("bg-canvas");
            this.width = this.stage.canvas.width;
            this.height = this.stage.canvas.height;
            createjs.Touch.enable(this.stage);
            this.flickerTime = flickerTime;
            this.bg = new Bg(colors, deltaTimeColor, barWidth, this.height, this.width, this.height);
            this.stage.addChild(this.bg);
            this.stopValue = false;
            this.render();
        }
        BarBG.prototype.render = function (timestamp) {
            var _this = this;
            if (this.stopValue)
                return;
            if (timestamp - this.bg.lastTime >= this.flickerTime) {
                this.bg.flicker();
                this.bg.lastTime = timestamp;
                this.stage.update();
            }
            window.requestAnimationFrame(function (timestamp) {
                _this.render(timestamp);
            });
        };
        BarBG.prototype.validate = function (colors) {
            if (colors.length % 2 != 0) {
                console.log("接受偶数colors");
                return false;
            }
            else {
                return true;
            }
        };
        BarBG.prototype.stop = function () {
            this.stopValue = true;
            this.bg.stopChange();
        };
        return BarBG;
    }());
    var Bg = (function (_super) {
        __extends(Bg, _super);
        function Bg(colors, deltaTimeColor, gw, gh, width, height) {
            if (gw === void 0) { gw = 50; }
            if (gh === void 0) { gh = 768; }
            if (width === void 0) { width = 1024; }
            if (height === void 0) { height = 768; }
            var _this = _super.call(this) || this;
            var _a = [height / gh, width / gw].map(function (value) { return Math.ceil(value); }), row = _a[0], col = _a[1];
            _this.deltaTimeColor = deltaTimeColor;
            _this.lastTime = 0;
            _this.currentBg = 0;
            _this.currentGrid = 0;
            _this.colorPairs = babyEye.bundle(colors, 2);
            _this.bgs = [];
            for (var count = 0; count < _this.colorPairs.length; count++) {
                var bg0 = new c.Container();
                var bg1 = new c.Container();
                for (var i = 0; i < row; i++) {
                    for (var j = 0; j < col; j++) {
                        var grid0 = new Grid(gw, gh, _this.colorPairs[count], i, j).set({
                            x: j * gw,
                            y: i * gh
                        });
                        bg0.addChild(grid0);
                        var grid1 = new Grid(gw, gh, babyEye.reversed(_this.colorPairs[count]), i, j).set({
                            x: j * gw,
                            y: i * gh
                        });
                        bg1.addChild(grid1);
                    }
                }
                _this.bgs.push([bg0, bg1]);
            }
            _this.flicker();
            _this.addChild(_this.bgs[_this.currentBg][0]);
            setTimeout(function () {
                _this.changeBG();
            }, _this.deltaTimeColor);
            return _this;
        }
        Bg.prototype.flicker = function () {
            this.removeChild(this.bgs[this.currentBg][this.currentGrid]);
            this.currentGrid++;
            this.addChild(this.bgs[this.currentBg][this.currentGrid % 2]);
        };
        Bg.prototype.changeBG = function () {
            var _this = this;
            this.currentBg++;
            this.currentBg %= this.bgs.length;
            if (this.stopChangeValue)
                return;
            setTimeout(function () {
                _this.changeBG();
            }, this.deltaTimeColor);
        };
        Bg.prototype.stopChange = function () {
            this.stopChangeValue = true;
        };
        return Bg;
    }(c.Container));
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(width, height, colors, row, col) {
            var _this = _super.call(this) || this;
            _this.colors = colors;
            _this.width = width;
            _this.height = height;
            var color = _this.colors[(row + col) % 2];
            _this.buildGrid(width, height, color);
            return _this;
        }
        Grid.prototype.buildGrid = function (width, height, color) {
            this.grid = new c.Shape();
            this.grid.color = color;
            this.grid.graphics.beginFill(color).rect(0, 0, width, height);
            this.addChild(this.grid);
        };
        return Grid;
    }(c.Container));
    window.BarBG = BarBG;
})();
(function () {
    var GridBG = (function () {
        function GridBG(colors, flickerTime, deltaTimeColor, gridWidth) {
            if (gridWidth === void 0) { gridWidth = 50; }
            if (!this.validate(colors))
                return;
            this.stage = new c.Stage("bg-canvas");
            this.width = this.stage.canvas.width;
            this.height = this.stage.canvas.height;
            createjs.Touch.enable(this.stage);
            this.flickerTime = flickerTime;
            this.bg = new Bg(colors, deltaTimeColor, gridWidth, gridWidth, this.width, this.height);
            this.stage.addChild(this.bg);
            this.stopValue = false;
            this.render();
        }
        GridBG.prototype.render = function (timestamp) {
            var _this = this;
            if (this.stopValue)
                return;
            if (timestamp - this.bg.lastTime >= this.flickerTime) {
                this.bg.flicker();
                this.bg.lastTime = timestamp;
                this.stage.update();
            }
            window.requestAnimationFrame(function (timestamp) {
                _this.render(timestamp);
            });
        };
        GridBG.prototype.validate = function (colors) {
            if (colors.length % 2 != 0) {
                console.log("接受偶数colors");
                return false;
            }
            else {
                return true;
            }
        };
        GridBG.prototype.stop = function () {
            this.stopValue = true;
            this.bg.stopChange();
        };
        return GridBG;
    }());
    var Bg = (function (_super) {
        __extends(Bg, _super);
        function Bg(colors, deltaTimeColor, gw, gh, width, height) {
            if (gw === void 0) { gw = 50; }
            if (gh === void 0) { gh = 50; }
            if (width === void 0) { width = 1024; }
            if (height === void 0) { height = 768; }
            var _this = _super.call(this) || this;
            var _a = [height / gh, width / gw].map(function (value) { return Math.ceil(value); }), row = _a[0], col = _a[1];
            _this.deltaTimeColor = deltaTimeColor;
            _this.lastTime = 0;
            _this.currentBg = 0;
            _this.currentGrid = 0;
            _this.colorPairs = babyEye.bundle(colors, 2);
            _this.bgs = [];
            for (var count = 0; count < _this.colorPairs.length; count++) {
                var bg0 = new c.Container();
                var bg1 = new c.Container();
                for (var i = 0; i < row; i++) {
                    for (var j = 0; j < col; j++) {
                        var grid0 = new Grid(gw, gh, _this.colorPairs[count], i, j).set({
                            x: j * gw,
                            y: i * gh
                        });
                        bg0.addChild(grid0);
                        var grid1 = new Grid(gw, gh, babyEye.reversed(_this.colorPairs[count]), i, j).set({
                            x: j * gw,
                            y: i * gh
                        });
                        bg1.addChild(grid1);
                    }
                }
                _this.bgs.push([bg0, bg1]);
            }
            _this.flicker();
            _this.addChild(_this.bgs[_this.currentBg][0]);
            setTimeout(function () {
                _this.changeBG();
            }, _this.deltaTimeColor);
            return _this;
        }
        Bg.prototype.flicker = function () {
            this.removeChild(this.bgs[this.currentBg][this.currentGrid]);
            this.currentGrid++;
            this.addChild(this.bgs[this.currentBg][this.currentGrid % 2]);
        };
        Bg.prototype.changeBG = function () {
            var _this = this;
            this.currentBg++;
            this.currentBg %= this.bgs.length;
            if (this.stopChangeValue)
                return;
            setTimeout(function () {
                _this.changeBG();
            }, this.deltaTimeColor);
        };
        Bg.prototype.stopChange = function () {
            this.stopChangeValue = true;
        };
        return Bg;
    }(c.Container));
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(width, height, colors, row, col) {
            var _this = _super.call(this) || this;
            _this.colors = colors;
            _this.width = width;
            _this.height = height;
            var color = _this.colors[(row + col) % 2];
            _this.buildGrid(width, height, color);
            return _this;
        }
        Grid.prototype.buildGrid = function (width, height, color) {
            this.grid = new c.Shape();
            this.grid.color = color;
            this.grid.graphics.beginFill(color).rect(0, 0, width, height);
            this.addChild(this.grid);
        };
        return Grid;
    }(c.Container));
    window.GridBG = GridBG;
})();
(function () {
    var ShineBG = (function () {
        function ShineBG(colors, deltaColorTime) {
            this.stage = new c.Stage("bg-canvas");
            this.width = this.stage.canvas.width;
            this.height = this.stage.canvas.height;
            createjs.Touch.enable(this.stage);
            this.colors = colors;
            this.deltaColorTime = deltaColorTime;
            this.currentColorIndex = 0;
            this.bgs = [];
            for (var i = 0; i < colors.length; i++) {
                var bg = new c.Shape(new c.Graphics().beginFill(this.colors[i]).rect(0, 0, this.width, this.height));
                this.bgs.push(bg);
            }
            this.flicker();
        }
        ShineBG.prototype.flicker = function () {
            var _this = this;
            if (this.stopValue)
                return;
            this.stage.addChild(this.bgs[this.currentColorIndex]);
            this.stage.update();
            this.currentColorIndex++;
            this.currentColorIndex %= this.colors.length;
            setTimeout(function () {
                _this.flicker();
            }, this.deltaColorTime);
        };
        ShineBG.prototype.stop = function () {
            this.stopValue = true;
        };
        return ShineBG;
    }());
    window.ShineBG = ShineBG;
})();
(function () {
    var GridBarShineBG = (function () {
        function GridBarShineBG(colors, shineColors, flickerTime, deltaTimeColor, deltaTimeBG, gridWidth, barWidth) {
            if (deltaTimeBG === void 0) { deltaTimeBG = 10 * 1000; }
            if (gridWidth === void 0) { gridWidth = 50; }
            if (barWidth === void 0) { barWidth = 50; }
            var _this = this;
            if (!this.validate(colors))
                return;
            this.stage = new c.Stage("bg-canvas");
            this.width = this.stage.canvas.width;
            this.height = this.stage.canvas.height;
            createjs.Touch.enable(this.stage);
            this.flickerTime = flickerTime;
            this.deltaTimeBG = deltaTimeBG;
            this.currentShapeIndex = 0;
            this.stopValue = false;
            this.lastTime = 0;
            this.bgs = [];
            this.bgGrid = new Bg(colors, deltaTimeColor, gridWidth, gridWidth, this.width, this.height);
            this.bgBar = new Bg(colors, deltaTimeColor, barWidth, this.height * 2, this.width * 2, this.height);
            this.bgBarRotated = new Bg(colors, deltaTimeColor, barWidth, this.height * 2, this.width * 2, this.height);
            this.bgBarRotated.set({
                regX: this.width,
                regY: this.height,
                x: this.width / 2,
                y: this.height / 2
            });
            this.bgShine = new ShineBg(shineColors, flickerTime, this.width, this.height);
            this.bgs.push(this.bgGrid, this.bgBar, this.bgBarRotated, this.bgShine);
            for (var i = 0; i < this.bgs.length; i++) {
                this.stage.addChild(this.bgs[i]);
            }
            this.render();
            setTimeout(function () {
                _this.swapBG();
            }, this.deltaTimeBG);
        }
        GridBarShineBG.prototype.render = function (timestamp) {
            var _this = this;
            if (this.stopValue)
                return;
            if (timestamp - this.lastTime >= this.flickerTime) {
                for (var i = 0; i < this.bgs.length; i++) {
                    this.bgs[i].visible = false;
                }
                this.bgs[this.currentShapeIndex].visible = true;
                this.bgs[this.currentShapeIndex].flicker();
                this.bgBarRotated.rotation += 10;
                this.lastTime = timestamp;
                this.stage.update();
            }
            window.requestAnimationFrame(function (timestamp) {
                _this.render(timestamp);
            });
        };
        GridBarShineBG.prototype.swapBG = function () {
            var _this = this;
            if (this.stopValue)
                return;
            this.currentShapeIndex++;
            this.currentShapeIndex %= this.bgs.length;
            setTimeout(function () {
                _this.swapBG();
            }, this.deltaTimeBG);
        };
        GridBarShineBG.prototype.validate = function (colors) {
            if (colors.length % 2 != 0) {
                console.log("接受偶数colors");
                return false;
            }
            else {
                return true;
            }
        };
        GridBarShineBG.prototype.stop = function () {
            this.stopValue = true;
            for (var i = 0; i < this.bgs.length; i++) {
                if (this.bgs[i].stopChange) {
                    this.bgs[i].stopChange();
                }
                ;
            }
        };
        return GridBarShineBG;
    }());
    var ShineBg = (function (_super) {
        __extends(ShineBg, _super);
        function ShineBg(colors, flickerTime, width, height) {
            var _this = _super.call(this) || this;
            _this.colors = colors;
            _this.flickerTime = flickerTime;
            _this.currentColorIndex = 0;
            _this.bgs = [];
            for (var i = 0; i < _this.colors.length; i++) {
                var bg = new c.Shape(new c.Graphics().beginFill(_this.colors[i]).rect(0, 0, width, height));
                _this.bgs.push(bg);
                _this.addChild(bg);
            }
            return _this;
        }
        ShineBg.prototype.flicker = function () {
            for (var i = 0; i < this.bgs.length; i++) {
                this.bgs[i].visible = false;
            }
            this.bgs[this.currentColorIndex].visible = true;
            this.currentColorIndex++;
            this.currentColorIndex %= this.colors.length;
        };
        return ShineBg;
    }(c.Container));
    var Bg = (function (_super) {
        __extends(Bg, _super);
        function Bg(colors, deltaTimeColor, gw, gh, width, height) {
            if (gw === void 0) { gw = 50; }
            if (gh === void 0) { gh = 50; }
            if (width === void 0) { width = 1024; }
            if (height === void 0) { height = 768; }
            var _this = _super.call(this) || this;
            var _a = [height / gh, width / gw].map(function (value) { return Math.ceil(value); }), row = _a[0], col = _a[1];
            _this.deltaTimeColor = deltaTimeColor;
            _this.lastTime = 0;
            _this.currentBg = 0;
            _this.currentGrid = 0;
            _this.colorPairs = babyEye.bundle(colors, 2);
            _this.colorPairsR = _this.colorPairs.map(function (pair) {
                return babyEye.reversed(pair);
            });
            _this.bgs = [];
            for (var count = 0; count < _this.colorPairs.length; count++) {
                var bg0 = new c.Container();
                var bg1 = new c.Container();
                var grid0 = new Grid(gw, gh, _this.colorPairs[count][0]);
                var grid1 = new Grid(gw, gh, _this.colorPairs[count][1]);
                var grids = [grid0, grid1];
                for (var i = 0; i < row; i++) {
                    for (var j = 0; j < col; j++) {
                        bg0.addChild(grids[(i + j) % 2].clone(true).set({
                            x: j * gw,
                            y: i * gh
                        }));
                        bg1.addChild(grids[(i + j + 1) % 2].clone(true).set({
                            x: j * gw,
                            y: i * gh
                        }));
                    }
                }
                _this.bgs.push([bg0, bg1]);
            }
            _this.bgs.map(function (bgPair) {
                bgPair.map(function (bg) {
                    _this.addChild(bg);
                    bg.cache(0, 0, width * 2, height * 2);
                    bg.visible = false;
                });
            });
            setTimeout(function () {
                _this.changeBG(); //改变的是背景方格颜色
            }, _this.deltaTimeColor);
            return _this;
        }
        Bg.prototype.flicker = function () {
            var lastbg = this.currentBg - 1 >= 0 ? this.currentBg - 1 : this.bgs.length - 1;
            this.bgs[lastbg][this.currentGrid].visible = false;
            this.bgs[this.currentBg][this.currentGrid].visible = false;
            this.currentGrid++;
            if (this.currentGrid == 2)
                this.currentGrid = 0;
            this.bgs[this.currentBg][this.currentGrid].visible = true;
        };
        Bg.prototype.changeBG = function () {
            var _this = this;
            this.currentBg++;
            this.currentBg %= this.bgs.length;
            if (this.stopChangeValue)
                return;
            setTimeout(function () {
                _this.changeBG();
            }, this.deltaTimeColor);
        };
        Bg.prototype.stopChange = function () {
            this.stopChangeValue = true;
        };
        return Bg;
    }(c.Container));
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(width, height, color) {
            var _this = _super.call(this) || this;
            var grid = new c.Shape();
            grid.graphics.beginFill(color).rect(0, 0, width, height);
            _this.addChild(grid);
            return _this;
        }
        return Grid;
    }(c.Container));
    window.GridBarShineBG = GridBarShineBG;
})();
