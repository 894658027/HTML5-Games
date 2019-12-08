var ls;
(function (ls) {
    var AIBitmapText = (function (_super) {
        __extends(AIBitmapText, _super);
        function AIBitmapText() {
            _super.call(this);
            this.name = "bitmapText";
        }
        var d = __define,c=AIBitmapText,p=c.prototype;
        p.initialize = function () {
            var url = decodeURIComponent(this["bmpUrl"]);
            var fnturl = decodeURIComponent(this["fntUrl"]);
            this._bitmapURL = url;
            this._fntUrl = fnturl;
            var self = this;
            var textureDatas = ls.getTexture(url);
            if (textureDatas != null)
                var texture = textureDatas[0];
            //加载fnt
            var onFntResComplete = function (bitmapFont) {
                self._bitmapText = new egret.BitmapText();
                self._bitmapText.font = bitmapFont;
                self._sourceWidth = self._bitmapText.width;
                self._sourceHeight = self._bitmapText.height;
                if (self.text)
                    self._bitmapText.text = self.text.toString();
                if (self.width)
                    self._bitmapText.width = self.width;
                if (self.height)
                    self._bitmapText.height = self.height;
                if (self.letterSpacing)
                    self._bitmapText.letterSpacing = self.letterSpacing;
                if (self.lineSpacing)
                    self._bitmapText.lineSpacing = self.lineSpacing;
                self.container.addChild(self._bitmapText);
                if (textureDatas) {
                    self._bitmapText.x = textureDatas[1];
                    self._bitmapText.y = textureDatas[2];
                }
                self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
            };
            RES.getResByUrl(self._fntUrl, onFntResComplete, this, RES.ResourceItem.TYPE_FONT);
        };
        d(p, "letterSpacing"
            ,function () {
                return this._letterSpacing;
            }
            ,function (value) {
                if (this._letterSpacing != value) {
                    if (this._bitmapText)
                        this._bitmapText.letterSpacing = value;
                    else
                        this._letterSpacing = value;
                }
            }
        );
        d(p, "lineSpacing"
            ,function () {
                return this._lineSpacing;
            }
            ,function (value) {
                if (this._lineSpacing != value) {
                    if (this._bitmapText)
                        this._bitmapText.lineSpacing = value;
                    else
                        this._lineSpacing = value;
                }
            }
        );
        d(p, "text"
            ,function () {
                return this._text;
            }
            ,function ($text) {
                if (this._bitmapText)
                    this._bitmapText.text = $text;
                else
                    this._text = $text;
            }
        );
        d(p, "width"
            ,function () {
                return this._width;
            }
            ,function (value) {
                if (this._bitmapText) {
                    if (this._bitmapText.width != value)
                        this._bitmapText.width = value;
                }
                if (this._width != value) {
                    this.update = true;
                    this._width = value;
                }
            }
        );
        d(p, "height"
            ,function () {
                return this._height;
            }
            ,function (value) {
                if (this._bitmapText) {
                    if (this._bitmapText.height != value)
                        this._bitmapText.height = value;
                }
                if (this._height != value) {
                    this.update = true;
                    this._height = value;
                }
            }
        );
        d(p, "scaleX"
            ,function () {
                return this._scaleX;
            }
            ,function (value) {
                if (this._scaleX != value) {
                    this._scaleX = value;
                    this.width = this._scaleX * this._sourceWidth;
                    this.update = true;
                }
            }
        );
        d(p, "scaleY"
            ,function () {
                return this._scaleY;
            }
            ,function (value) {
                if (this._scaleY != value) {
                    this._scaleY = value;
                    this.height = this._scaleY * this._sourceHeight;
                    this.update = true;
                }
            }
        );
        d(p, "scale"
            ,function () {
                if (this._scaleX == this._scaleY)
                    return this._scaleX;
                else
                    return 1;
            }
            ,function (value) {
                if (this.scale != value) {
                    this.update = true;
                    this.scaleX = this.scaleY = value;
                }
            }
        );
        ///////////////////////////////conditions///////////////////////////////
        p.compareBitmapFontText = function (event) {
            return { instances: [this], status: this._text == ls.eval_e(event.text) };
        };
        ///////////////////////////////actions///////////////////////////////
        p.setBitmapText = function ($text) {
            var text = ls.eval_e($text);
            if (this._text != text) {
                if (this._bitmapText) {
                    if (typeof text === "number")
                        this._bitmapText.text = text.toString();
                    else
                        this._bitmapText.text = text;
                }
                this._text = text;
            }
        };
        p.appendBitmapText = function ($text) {
            var text = ls.eval_e($text);
            if (this._bitmapText) {
                if (typeof text === "number")
                    this._bitmapText.text += text.toString();
                else
                    this._bitmapText.text += text;
            }
            this._text += text;
        };
        p.setBitmapLetterSpace = function ($letterSpace) {
            var letterSpace = ls.eval_e($letterSpace);
            if (this._bitmapText) {
                this._bitmapText.letterSpacing = letterSpace;
            }
            this._letterSpacing = letterSpace;
        };
        p.setBitmapLineSpace = function ($lineSpace) {
            var lineSpace = ls.eval_e($lineSpace);
            if (this._bitmapText) {
                this._bitmapText.lineSpacing = lineSpace;
            }
            this._lineSpacing = lineSpace;
        };
        d(p, "bitmapText"
            ///////////////////////////////exps///////////////////////////////
            ,function () {
                return this._bitmapText;
            }
        );
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["text"] = this.text;
            o["letterSpacing"] = this.letterSpacing;
            o["lineSpacing"] = this.lineSpacing;
            o["bmpUrl"] = this["bmpUrl"];
            o["fntUrl"] = this["fntUrl"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this["bmpUrl"] = o["bmpUrl"];
                this["fntUrl"] = o["fntUrl"];
                this.text = o["text"];
                this.letterSpacing = o["letterSpacing"];
                this.lineSpacing = o["lineSpacing"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.text = this.text;
            cl.letterSpacing = this.letterSpacing;
            cl.lineSpacing = this.lineSpacing;
            cl["bmpUrl"] = this["bmpUrl"];
            cl["fntUrl"] = this["fntUrl"];
            cl.initialize();
            return cl;
        };
        return AIBitmapText;
    }(ls.AISprite));
    ls.AIBitmapText = AIBitmapText;
    egret.registerClass(AIBitmapText,'ls.AIBitmapText');
    var CompareBitmapFontTextEvent = (function (_super) {
        __extends(CompareBitmapFontTextEvent, _super);
        function CompareBitmapFontTextEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareBitmapFontTextEvent,p=c.prototype;
        return CompareBitmapFontTextEvent;
    }(ls.BaseEvent));
    ls.CompareBitmapFontTextEvent = CompareBitmapFontTextEvent;
    egret.registerClass(CompareBitmapFontTextEvent,'ls.CompareBitmapFontTextEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map