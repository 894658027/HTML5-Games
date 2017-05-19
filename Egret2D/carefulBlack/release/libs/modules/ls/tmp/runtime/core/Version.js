var ls;
(function (ls) {
    var Version = (function () {
        function Version() {
        }
        var d = __define,c=Version,p=c.prototype;
        /**
         * 比较版本大小 1：v1>v2 0:v1=v2 -1:v1<v2
         */
        Version.compareVersion = function (v1, v2) {
            var v1s = v1.split(".");
            var v2s = v2.split(".");
            var v1Data = v1s[0] + "." + v1s[1];
            if (v1s[2])
                v1Data += v1s[2];
            var v2Data = v2s[0] + "." + v2s[1];
            if (v2s[2])
                v2Data += v2s[2];
            var v1Value = +v1Data;
            var v2Value = +v2Data;
            if (v1Value > v2Value)
                return 1;
            else if (v1Value === v2Value)
                return 0;
            else
                return -1;
        };
        Version.version = "1.2";
        return Version;
    }());
    ls.Version = Version;
    egret.registerClass(Version,'ls.Version');
})(ls || (ls = {}));
//# sourceMappingURL=Version.js.map