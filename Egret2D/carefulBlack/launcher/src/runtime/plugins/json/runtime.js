var ls;
(function (ls) {
    var AIJSON = (function (_super) {
        __extends(AIJSON, _super);
        function AIJSON() {
            _super.call(this);
        }
        var d = __define,c=AIJSON,p=c.prototype;
        p.initialize = function () {
            this.loadJson(this["url"]);
        };
        p.loadJson = function (url) {
            if (!url)
                return;
            var onRESComplete = function (json) {
                if (json) {
                    this._data = json;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onJSONLoadComplete));
                }
                else {
                    ls.assert(true, "地址为：" + this.url + "的json文件读取失败或者解析出错！！！");
                }
            };
            RES.getResByUrl(url, onRESComplete, this, RES.ResourceItem.TYPE_JSON);
        };
        p.onJSONLoadComplete = function (event) {
            return { instances: [this], status: true };
        };
        d(p, "data"
            ,function () {
                return this._data;
            }
        );
        d(p, "dataStringify"
            ,function () {
                if (this._data)
                    return JSON.stringify(this._data);
                return "";
            }
        );
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["url"] = this["url"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this["url"] = o["url"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl["url"] = this["url"];
            cl.initialize();
            return cl;
        };
        return AIJSON;
    }(ls.AIObject));
    ls.AIJSON = AIJSON;
    egret.registerClass(AIJSON,'ls.AIJSON');
    var OnJSONLoadCompleteEvent = (function (_super) {
        __extends(OnJSONLoadCompleteEvent, _super);
        function OnJSONLoadCompleteEvent() {
            _super.call(this);
        }
        var d = __define,c=OnJSONLoadCompleteEvent,p=c.prototype;
        return OnJSONLoadCompleteEvent;
    }(ls.BaseEvent));
    ls.OnJSONLoadCompleteEvent = OnJSONLoadCompleteEvent;
    egret.registerClass(OnJSONLoadCompleteEvent,'ls.OnJSONLoadCompleteEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map