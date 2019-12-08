var ls;
(function (ls) {
    var AITextField = (function (_super) {
        __extends(AITextField, _super);
        function AITextField() {
            _super.call(this);
            this.name = "TextField";
            this._textfield = new egret.TextField();
            this.container.addChild(this._textfield);
        }
        var d = __define,c=AITextField,p=c.prototype;
        p.saveToJSON = function () {
            return {
                "name": this.name,
                "isModel": this.isModel,
                "paramInstances": this.paramInstances,
                "timeScale": this.timeScale,
                "x": this.x,
                "y": this.y,
                "width": this.width,
                "height": this.height,
                "scale": this.scale,
                "scaleX": this.scaleX,
                "scaleY": this.scaleY,
                "angle": this.angle,
                "alpha": this.alpha,
                "visible": this.visible,
                "mirrored": this.mirrored,
                "italic": this.italic,
                "enableInput": this.enableInput,
                "collision": this.collision,
                "anchorX": this.anchorX,
                "anchorY": this.anchorY,
                "layer": this.layer,
                "fontFamily": this.fontFamily,
                "size": this.size,
                "textColor": this.textColor,
                "bold": this.bold,
                "textAlign": this.textAlign,
                "verticalAlign": this.verticalAlign,
                "maxChars": this.maxChars,
                "displayAsPassword": this.displayAsPassword,
                "wordWrap": this.wordWrap,
                "collisionsEnabled": this.collisionsEnabled,
                "collisionData": this.collisionData,
                "collisionType": this.collisionType,
                "collisionVectorData": this.collisionVectorData
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.name = o["name"];
                this.isModel = o["isModel"];
                this.paramInstances = o["paramInstances"];
                this.timeScale = o["timeScale"];
                this.x = o["x"];
                this.y = o["y"];
                this.width = o["width"];
                this.height = o["height"];
                this.scale = o["scale"];
                this.scaleX = o["scaleX"];
                this.scaleY = o["scaleY"];
                this.angle = o["angle"];
                this.alpha = o["alpha"];
                this.visible = o["visible"];
                this.mirrored = o["mirrored"];
                this.italic = o["italic"];
                this.enableInput = o["enableInput"];
                this.collision = o["collision"];
                this.anchorX = o["anchorX"];
                this.anchorY = o["anchorY"];
                this.enabled = o["enabled"];
                this.fontFamily = o["fontFamily"];
                this.size = o["size"];
                this.textColor = o["textColor"];
                this.bold = o["bold"];
                this.textAlign = o["textAlign"];
                this.verticalAlign = o["verticalAlign"];
                this.maxChars = o["maxChars"];
                this.displayAsPassword = o["displayAsPassword"];
                this.wordWrap = o["wordWrap"];
                this.collisionsEnabled = o["collisionsEnabled"];
                this.collisionData = o["collisionData"];
                this.collisionType = o["collisionType"];
                this.collisionVectorData = o["collisionVectorData"];
            }
        };
        d(p, "textField"
            ,function () {
                return this._textfield;
            }
        );
        d(p, "type"
            ,function () {
                return this._textfield.type;
            }
            ,function (value) {
                this._textfield.type = value;
            }
        );
        d(p, "inputType"
            ,function () {
                return this._textfield.inputType;
            }
            ,function (value) {
                this._textfield.inputType = value;
                this.displayAsPassword = (value == "password");
            }
        );
        d(p, "enableInput",undefined
            ,function (value) {
                this.type = (value) ? "input" : "dynamic";
                this._textfield.touchEnabled = (this.type == "dynamic") ? false : true;
            }
        );
        d(p, "width"
            ,function () {
                return this._width;
            }
            ,function (value) {
                if (this.container.width != value) {
                    this.update = true;
                    this.container.width = value;
                    this._width = value;
                    if (this.anchorX)
                        this.container.anchorOffsetX = this.width * this.anchorX;
                }
                this._textfield.width = value;
            }
        );
        d(p, "height"
            ,function () {
                return this._height;
            }
            ,function (value) {
                if (this.container.height != value) {
                    this.update = true;
                    this.container.height = value;
                    this._height = value;
                    if (this.anchorY)
                        this.container.anchorOffsetY = this.height * this.anchorY;
                }
                this._textfield.height = value;
            }
        );
        d(p, "text"
            ,function () {
                return this._textfield.text;
            }
            ,function (value) {
                if (value)
                    this._textfield.text = value.toString();
            }
        );
        d(p, "bold"
            ,function () {
                return this._textfield.bold;
            }
            ,function (value) {
                this._textfield.bold = value;
            }
        );
        d(p, "fontFamily"
            ,function () {
                return this._textfield.fontFamily;
            }
            ,function (value) {
                this._textfield.fontFamily = value;
            }
        );
        d(p, "textColor"
            ,function () {
                return this._textfield.textColor;
            }
            ,function (value) {
                this._textfield.textColor = value;
            }
        );
        d(p, "size"
            ,function () {
                return this._textfield.size;
            }
            ,function (value) {
                this._textfield.size = value;
            }
        );
        d(p, "textAlign"
            ,function () {
                return this._textfield.textAlign;
            }
            ,function (value) {
                this._textfield.textAlign = value;
            }
        );
        d(p, "verticalAlign"
            ,function () {
                return this._textfield.verticalAlign;
            }
            ,function (value) {
                this._textfield.verticalAlign = value;
            }
        );
        d(p, "italic"
            ,function () {
                return this._textfield.italic;
            }
            ,function (value) {
                this._textfield.italic = value;
            }
        );
        d(p, "border"
            ,function () {
                return this._textfield.border;
            }
            ,function (value) {
                this._textfield.border = value;
            }
        );
        d(p, "borderColor"
            ,function () {
                return this._textfield.borderColor;
            }
            ,function (value) {
                this._textfield.borderColor = value;
            }
        );
        d(p, "background"
            ,function () {
                return this._textfield.background;
            }
            ,function (value) {
                this._textfield.background = value;
            }
        );
        d(p, "backgroundColor"
            ,function () {
                return this._textfield.backgroundColor;
            }
        );
        d(p, "backgourndColor",undefined
            ,function (value) {
                this._textfield.backgroundColor = value;
            }
        );
        d(p, "maxChars"
            ,function () {
                return this._textfield.maxChars;
            }
            ,function (value) {
                this._textfield.maxChars = value;
            }
        );
        d(p, "displayAsPassword"
            ,function () {
                return this._textfield.displayAsPassword;
            }
            ,function (value) {
                this._textfield.displayAsPassword = value;
            }
        );
        d(p, "wordWrap"
            ,function () {
                return this._textfield.multiline;
            }
            ,function (value) {
                this._textfield.multiline = (value == 1);
            }
        );
        ////////////////////////////////////conditions///////////////////////////////////
        p.compareText = function ($compareTextEvent) {
            var textValue = ls.eval_e($compareTextEvent.text);
            return { instances: [this], status: this._textfield.text == textValue };
        };
        ////////////////////////////////////actions///////////////////////////////////
        p.appendText = function ($text) {
            var text = ls.eval_e($text);
            this.textField.appendText(text);
        };
        p.setFontColor = function ($textColor) {
            var textColor = ls.eval_e($textColor);
            ls.assert(typeof textColor !== "number", "setFontColor parameter type incorrect!!");
            this.textColor = textColor;
        };
        p.setFontFamily = function ($fontFamily) {
            var fontFamily = ls.eval_e($fontFamily);
            ls.assert(typeof fontFamily !== "string", "setFontFamily parameter type incorrect!!");
            this.fontFamily = fontFamily;
        };
        p.setFontSize = function ($size) {
            var size = ls.eval_e($size);
            ls.assert(typeof size !== "number", "setFontSize parameter type incorrect!!");
            this.size = size;
        };
        p.setBold = function ($bold) {
            var bold = ls.eval_e($bold);
            ls.assert(typeof bold !== "number", "setBold parameter type incorrect!!");
            this.bold = (bold == 1) ? true : false;
        };
        p.setText = function ($text) {
            var text = ls.eval_e($text);
            this.text = text;
        };
        p.setTextAlign = function ($textAlign) {
            this.textAlign = $textAlign;
        };
        p.setVerticalAlign = function ($vertialAlign) {
            this.verticalAlign = $vertialAlign;
        };
        p.setMaxChars = function ($maxChars) {
            var maxChars = ls.eval_e($maxChars);
            ls.assert(typeof maxChars !== "number", "setMaxChars parameter type incorrect!!");
            this.maxChars = maxChars;
        };
        p.setItalic = function ($value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "setItalic parameter type incorrect!!");
            this.italic = (value == 1) ? true : false;
        };
        p.setType = function ($value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "string", "setType parameter type incorrect!!");
            this.type = value;
        };
        p.setWordWrap = function ($value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "setType setWordWrap type incorrect!!");
            this.wordWrap = ($value == 1) ? true : false;
        };
        ////////////////////////////////////expression///////////////////////////////////
        p.clone = function () {
            var cloneInstance = new AITextField();
            cloneInstance.name = this.name;
            cloneInstance.collision = this.collision;
            cloneInstance.behaviors = [];
            cloneInstance.anchorX = this.anchorX;
            cloneInstance.anchorY = this.anchorY;
            cloneInstance.type = this.type;
            cloneInstance.x = this.x;
            cloneInstance.y = this.y;
            cloneInstance.width = this.width;
            cloneInstance.height = this.height;
            cloneInstance.scale = this.scale;
            cloneInstance.scaleX = this.scaleX;
            cloneInstance.scaleY = this.scaleY;
            cloneInstance.angle = this.angle;
            cloneInstance.alpha = this.alpha;
            cloneInstance.visible = this.visible;
            cloneInstance.collision = this.collision;
            cloneInstance.mirrored = this.mirrored;
            cloneInstance.fontFamily = this.fontFamily;
            cloneInstance.textColor = this.textColor;
            cloneInstance.size = this.size;
            cloneInstance.textAlign = this.textAlign;
            cloneInstance.verticalAlign = this.verticalAlign;
            cloneInstance.italic = this.italic;
            cloneInstance.border = this.border;
            cloneInstance.borderColor = this.borderColor;
            cloneInstance.background = this.background;
            cloneInstance.backgourndColor = this.backgourndColor;
            cloneInstance.text = this.text;
            cloneInstance.italic = this.italic;
            cloneInstance.enableInput = this.enableInput;
            cloneInstance.bold = this.bold;
            cloneInstance.displayAsPassword = this.displayAsPassword;
            cloneInstance.maxChars = this.maxChars;
            cloneInstance.global = this.global;
            cloneInstance.layer = this.layer;
            cloneInstance.collisionsEnabled = this.collisionsEnabled;
            cloneInstance.collisionData = this.collisionData;
            cloneInstance.collisionType = this.collisionType;
            cloneInstance.collisionVectorData = this.collisionVectorData;
            cloneInstance.collisionSourceVectorData = this.collisionSourceVectorData;
            for (var i = 0; i < this.behaviors.length; i++) {
                var behaivor = this.behaviors[i];
                var cloneBehaivor = behaivor.clone();
                cloneInstance.addBehavior(cloneBehaivor);
                cloneBehaivor.onCreate();
            }
            //clone variables
            for (var key in this.variables)
                cloneInstance.addVariable(key, this.variables[key]);
            return cloneInstance;
        };
        return AITextField;
    }(ls.AIDisplayObject));
    ls.AITextField = AITextField;
    egret.registerClass(AITextField,'ls.AITextField');
    var CompareTFTextEvent = (function (_super) {
        __extends(CompareTFTextEvent, _super);
        function CompareTFTextEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareTFTextEvent,p=c.prototype;
        return CompareTFTextEvent;
    }(ls.BaseEvent));
    ls.CompareTFTextEvent = CompareTFTextEvent;
    egret.registerClass(CompareTFTextEvent,'ls.CompareTFTextEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map