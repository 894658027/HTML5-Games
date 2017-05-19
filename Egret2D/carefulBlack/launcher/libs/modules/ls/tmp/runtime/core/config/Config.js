var ls;
(function (ls) {
    var Config = (function () {
        function Config() {
        }
        var d = __define,c=Config,p=c.prototype;
        Config.sceneWidth = 0;
        Config.sceneHeight = 0;
        Config.version = 0;
        Config.isHasJpg = false;
        Config.isHasPng = false;
        Config.openLog = true;
        return Config;
    }());
    ls.Config = Config;
    egret.registerClass(Config,'ls.Config');
})(ls || (ls = {}));
//# sourceMappingURL=Config.js.map