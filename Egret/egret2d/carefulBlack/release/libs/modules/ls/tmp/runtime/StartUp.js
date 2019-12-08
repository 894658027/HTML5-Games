var ls;
(function (ls) {
    var StartUp = (function () {
        function StartUp() {
        }
        var d = __define,c=StartUp,p=c.prototype;
        StartUp.execute = function (document) {
            this.stage = document.stage;
            //初始化图层
            this.onLayerInit(document);
            this.onPreResourceLoad();
            this.stage.dirtyRegionPolicy = "off";
        };
        StartUp.onLayerInit = function (document) {
            ls.GameUILayer.init(document.stage);
            ls.GameUILayer.document = document;
        };
        //预加载资源加载
        StartUp.onPreResourceLoad = function () {
            this.onProjectLoad("resource/assets/projects.xml");
        };
        //项目加载
        StartUp.onProjectLoad = function (url, onComplete) {
            if (onComplete === void 0) { onComplete = null; }
            RES.getResByUrl(url, function (data) {
                var children = data.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var item = children[i];
                        var lname = item.localName;
                        switch (lname) {
                            case "sceneSize":
                                ls.Config.sceneWidth = +(item["$width"]);
                                ls.Config.sceneHeight = +(item["$height"]);
                                ls.Config.openLog = (+(item["$openLog"]) == 1);
                                break;
                            case "info":
                                StartUp.baseUrl = item["$baseUrl"];
                                ls.Config.sceneInfo = { layoutName: item["$layoutName"], layoutUrl: item["$layoutUrl"], eventsheetName: item["$eventsheetName"], eventsheetUrl: item["$eventsheetUrl"], baseUrl: StartUp.baseUrl };
                                var self = this;
                                //加载全局变量
                                self.onGlobalConfigLoad(ls.Config.sceneInfo.baseUrl + "global.xml", function () {
                                    //加载布局配置
                                    RES.getResByUrl(ls.Config.sceneInfo.baseUrl + ls.Config.sceneInfo.layoutUrl, function (layoutData) {
                                        ls.Config.sceneInfo.layoutData = layoutData;
                                        //加载事件表配置
                                        RES.getResByUrl(ls.Config.sceneInfo.baseUrl + ls.Config.sceneInfo.eventsheetUrl, function (eventsheetData) {
                                            ls.Config.sceneInfo.eventsheetData = eventsheetData;
                                            ls.LayoutDecoder.start(ls.Config.sceneInfo.layoutName);
                                            ls.EventSheetDecoder.start(ls.Config.sceneInfo.eventsheetName);
                                        }, this);
                                    }, ls.Config.sceneInfo);
                                }, [ls.Config.sceneInfo.layoutName]);
                                break;
                            case "internal":
                                var internalStr = item.children[0].text;
                                var internalObject = JSON.parse(decodeURIComponent(internalStr));
                                ls.internalData = internalObject.internalComponents;
                                break;
                            case "version":
                                ls.Config.version = +(item.text);
                                break;
                        }
                    }
                }
            }, this, RES.ResourceItem.TYPE_XML);
        };
        //全局配置加载
        StartUp.onGlobalConfigLoad = function (url, onComplete, onCompleteParams) {
            if (onComplete === void 0) { onComplete = null; }
            if (onCompleteParams === void 0) { onCompleteParams = null; }
            RES.getResByUrl(url, function (data) {
                this.globalData = data;
                //全局实例添加到舞台
                ls.LayoutDecoder.globalInstances = ls.LayoutDecoder.decodeInstances(this.globalData);
                if (onComplete != null)
                    onComplete.apply(null, onCompleteParams);
            }, this, RES.ResourceItem.TYPE_XML);
        };
        /**配置加载 */
        StartUp.onConfigLoad = function (layoutName) {
            ls.Config.sceneInfo.layoutName = layoutName;
            ls.Config.sceneInfo.layoutUrl = layoutName + ".xml";
            //加载布局配置
            RES.getResByUrl(ls.Config.sceneInfo.baseUrl + ls.Config.sceneInfo.layoutUrl, function (layoutData) {
                ls.Config.sceneInfo.layoutData = layoutData;
                ls.Config.sceneInfo.eventsheetName = layoutData["$eventSheet"];
                ls.Config.sceneInfo.eventsheetUrl = ls.Config.sceneInfo.eventsheetName + ".xml";
                //加载事件表配置
                RES.getResByUrl(ls.Config.sceneInfo.baseUrl + ls.Config.sceneInfo.eventsheetUrl, function (eventsheetData) {
                    ls.Config.sceneInfo.eventsheetData = eventsheetData;
                    ls.LayoutDecoder.start(ls.Config.sceneInfo.layoutName);
                    ls.EventSheetDecoder.start(ls.Config.sceneInfo.eventsheetName);
                }, this);
            }, this);
        };
        return StartUp;
    }());
    ls.StartUp = StartUp;
    egret.registerClass(StartUp,'ls.StartUp');
})(ls || (ls = {}));
//# sourceMappingURL=StartUp.js.map