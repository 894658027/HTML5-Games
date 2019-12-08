var ls;
(function (ls) {
    var AISprite = (function (_super) {
        __extends(AISprite, _super);
        function AISprite() {
            _super.call(this);
            this._sourceWidth = 0;
            this._sourceHeight = 0;
            this._isResourceLoaded = false;
            this.name = "Sprite";
            this._bitmap = new egret.Bitmap();
        }
        var d = __define,c=AISprite,p=c.prototype;
        d(p, "bitmapURL"
            ,function () {
                return this._bitmapURL;
            }
        );
        p.initialize = function () {
            this.createBitmap(this["url"]);
        };
        /**创建位图*/
        p.createBitmap = function ($url) {
            if ($url && $url != "") {
                this._bitmapURL = $url;
                var self = this;
                var textureDatas = ls.getTexture($url);
                if (textureDatas != null)
                    var texture = textureDatas[0];
                //先从spriteSheet中找
                if (texture != null) {
                    this._bitmap.texture = texture;
                    this._sourceWidth = texture.textureWidth;
                    this._sourceHeight = texture.textureHeight;
                    this._bitmap.width = this.width;
                    this._bitmap.height = this.height;
                    if (textureDatas) {
                        this._bitmap.x = textureDatas[1];
                        this._bitmap.y = textureDatas[2];
                    }
                    this.container.addChild(this._bitmap);
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                }
                else {
                    var onRESComplete = function (texture) {
                        if (texture) {
                            self._bitmap.texture = texture;
                            self._sourceWidth = texture.textureWidth;
                            self._sourceHeight = texture.textureHeight;
                            self._bitmap.width = self.width;
                            self._bitmap.height = self.height;
                            self.container.addChild(self._bitmap);
                            self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                            self.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                        }
                    };
                    RES.getResByUrl($url, onRESComplete, this, RES.ResourceItem.TYPE_IMAGE);
                }
            }
        };
        p.addChild = function ($aiSprite) {
            ls.World.getInstance().addChild($aiSprite, this);
        };
        p.removeChild = function ($aiSprite) {
            ls.World.getInstance().removeChild($aiSprite);
        };
        //加载图片 动作
        p.loadImage = function ($url) {
            var curUrl = ls.eval_e($url);
            this.createBitmap(curUrl);
        };
        d(p, "width"
            ,function () {
                return this._width;
            }
            ,function (value) {
                if (this._width != value) {
                    this._width = value;
                    this.update = true;
                }
                if (this._bitmap) {
                    if (this._bitmap.width != value)
                        this._bitmap.width = value;
                }
                // if (this._sourceWidth == 0) 
                //         this._sourceWidth = value
                // this._scaleX = value / this._sourceWidth;
                // if (this._width != value) {
                //     this.update = true;
                //     this._width = value;
                // }
                // if (!isNaN(this.anchorX))
                //     this.container.anchorOffsetX = this.width * this.anchorX;
            }
        );
        d(p, "height"
            ,function () {
                return this._height;
            }
            ,function (value) {
                if (this._height != value) {
                    this._height = value;
                    this.update = true;
                }
                if (this._bitmap) {
                    if (this._bitmap.height != value)
                        this._bitmap.height = value;
                }
                // if (this._sourceHeight == 0)
                //     this._sourceHeight = value;
                // this._scaleY = value / this._sourceHeight;
                // if (this._height != value) {
                //     this._height = value;
                //     this.update = true;
                // }
                // if (!isNaN(this.anchorY))
                //     this.container.anchorOffsetY = this.height * this.anchorY;
            }
        );
        ////////////////////////////////////conditions///////////////////////////////////
        //当资源加载完毕
        p.onResourceLoaded = function ($onResourceLoaded) {
            return { instances: [this], status: true };
        };
        ////////////////////////////////////action///////////////////////////////////
        p.subtractFrom = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject subtractFrom parameter type incorrect!!");
            this[$instanceVariables] -= value;
        };
        ////////////////////////////////////behaviors///////////////////////////////////
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["url"] = this["url"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this["url"] = o["url"];
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl["url"] = this["url"];
            cl.initialize();
            return cl;
        };
        return AISprite;
    }(ls.AIDisplayObject));
    ls.AISprite = AISprite;
    egret.registerClass(AISprite,'ls.AISprite');
    var OnResourceLoadedEvent = (function (_super) {
        __extends(OnResourceLoadedEvent, _super);
        function OnResourceLoadedEvent() {
            _super.call(this);
        }
        var d = __define,c=OnResourceLoadedEvent,p=c.prototype;
        return OnResourceLoadedEvent;
    }(ls.BaseEvent));
    ls.OnResourceLoadedEvent = OnResourceLoadedEvent;
    egret.registerClass(OnResourceLoadedEvent,'ls.OnResourceLoadedEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AISprite.js.map