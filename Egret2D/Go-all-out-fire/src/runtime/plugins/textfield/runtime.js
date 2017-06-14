var ls;
(function (ls) {
    var AITextField = (function (_super) {
        __extends(AITextField, _super);
        function AITextField() {
            _super.call(this);
            this.name = "TextField";
            this._textfield = new egret.TextField();
            this._textfield.addEventListener(egret.TextEvent.FOCUS_IN, this.onTextEvent, this);
            this._textfield.addEventListener(egret.TextEvent.FOCUS_OUT, this.onTextEvent, this);
            this._textfield.addEventListener(egret.TextEvent.CHANGE, this.onTextEvent, this);
            this.container.addChild(this._textfield);
        }
        var d = __define,c=AITextField,p=c.prototype;
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
                this._textfield.text = value;
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
        p.onTextEvent = function (event) {
            switch (event.type) {
                case egret.TextEvent.FOCUS_IN:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTextFocusIn));
                    break;
                case egret.TextEvent.FOCUS_OUT:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTextFocusOut));
                    break;
                case egret.TextEvent.CHANGE:
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onTextChanged));
                    break;
            }
        };
        p.onTextFocusIn = function (event) {
            return { instances: [this], status: true };
        };
        p.onTextFocusOut = function (event) {
            return { instances: [this], status: true };
        };
        p.onTextChanged = function (event) {
            return { instances: [this], status: true };
        };
        p.compareText = function ($compareTextEvent) {
            var textValue = ls.eval_e($compareTextEvent.text);
            return { instances: [this], status: this._textfield.text == textValue };
        };
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
            this.text = $text + "";
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
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["fontFamily"] = this.fontFamily;
            o["textColor"] = this.textColor;
            o["size"] = this.size;
            o["textAlign"] = this.textAlign;
            o["verticalAlign"] = this.verticalAlign;
            o["italic"] = this.italic;
            o["border"] = this.border;
            o["borderColor"] = this.borderColor;
            o["background"] = this.background;
            o["backgourndColor"] = this.backgourndColor;
            o["text"] = this.text;
            o["italic"] = this.italic;
            o["enableInput"] = this.enableInput;
            o["bold"] = this.bold;
            o["displayAsPassword"] = this.displayAsPassword;
            o["maxChars"] = this.maxChars;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this.fontFamily = o["fontFamily"];
                this.textColor = o["textColor"];
                this.size = o["size"];
                this.textAlign = o["textAlign"];
                this.verticalAlign = o["verticalAlign"];
                this.italic = o["italic"];
                this.border = o["border"];
                this.borderColor = o["borderColor"];
                this.background = o["background"];
                this.backgourndColor = o["backgourndColor"];
                this.text = o["text"];
                this.italic = o["italic"];
                this.enableInput = o["enableInput"];
                this.bold = o["bold"];
                this.displayAsPassword = o["displayAsPassword"];
                this.maxChars = o["maxChars"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.fontFamily = this.fontFamily;
            cl.textColor = this.textColor;
            cl.size = this.size;
            cl.textAlign = this.textAlign;
            cl.verticalAlign = this.verticalAlign;
            cl.italic = this.italic;
            cl.border = this.border;
            cl.borderColor = this.borderColor;
            cl.background = this.background;
            cl.backgourndColor = this.backgourndColor;
            cl.text = this.text;
            cl.italic = this.italic;
            cl.enableInput = this.enableInput;
            cl.bold = this.bold;
            cl.displayAsPassword = this.displayAsPassword;
            cl.maxChars = this.maxChars;
            return cl;
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
    var OnTextFocusInEvent = (function (_super) {
        __extends(OnTextFocusInEvent, _super);
        function OnTextFocusInEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnTextFocusInEvent,p=c.prototype;
        return OnTextFocusInEvent;
    }(ls.BaseEvent));
    ls.OnTextFocusInEvent = OnTextFocusInEvent;
    egret.registerClass(OnTextFocusInEvent,'ls.OnTextFocusInEvent');
    var OnTextFocusOutEvent = (function (_super) {
        __extends(OnTextFocusOutEvent, _super);
        function OnTextFocusOutEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnTextFocusOutEvent,p=c.prototype;
        return OnTextFocusOutEvent;
    }(ls.BaseEvent));
    ls.OnTextFocusOutEvent = OnTextFocusOutEvent;
    egret.registerClass(OnTextFocusOutEvent,'ls.OnTextFocusOutEvent');
    var OnTextChangeEvent = (function (_super) {
        __extends(OnTextChangeEvent, _super);
        function OnTextChangeEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnTextChangeEvent,p=c.prototype;
        return OnTextChangeEvent;
    }(ls.BaseEvent));
    ls.OnTextChangeEvent = OnTextChangeEvent;
    egret.registerClass(OnTextChangeEvent,'ls.OnTextChangeEvent');
})(ls || (ls = {}));
