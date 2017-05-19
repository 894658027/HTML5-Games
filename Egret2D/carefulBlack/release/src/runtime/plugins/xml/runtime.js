var ls;
(function (ls) {
    var AIXML = (function (_super) {
        __extends(AIXML, _super);
        function AIXML() {
            _super.call(this);
        }
        var d = __define,c=AIXML,p=c.prototype;
        p.initialize = function () {
            this.loadXML(this["url"]);
        };
        p.loadXML = function (url) {
            if (!url)
                return;
            var onRESComplete = function (xmldata) {
                if (xmldata) {
                    this._data = ls.xmlToJson(xmldata);
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onXMLLoadComplete));
                }
                else {
                    ls.assert(true, "地址为：" + this.url + "的xml文件读取失败或者解析出错！！！");
                }
            };
            RES.getResByUrl(url, onRESComplete, this, RES.ResourceItem.TYPE_XML);
        };
        p.onXMLLoadComplete = function (event) {
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
        return AIXML;
    }(ls.AIObject));
    ls.AIXML = AIXML;
    egret.registerClass(AIXML,'ls.AIXML');
    var OnXMLLoadCompleteEvent = (function (_super) {
        __extends(OnXMLLoadCompleteEvent, _super);
        function OnXMLLoadCompleteEvent() {
            _super.call(this);
        }
        var d = __define,c=OnXMLLoadCompleteEvent,p=c.prototype;
        return OnXMLLoadCompleteEvent;
    }(ls.BaseEvent));
    ls.OnXMLLoadCompleteEvent = OnXMLLoadCompleteEvent;
    egret.registerClass(OnXMLLoadCompleteEvent,'ls.OnXMLLoadCompleteEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map