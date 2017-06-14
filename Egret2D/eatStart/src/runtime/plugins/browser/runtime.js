var ls;
(function (ls) {
    var AIBrowser = (function (_super) {
        __extends(AIBrowser, _super);
        function AIBrowser() {
            _super.call(this);
            this.firstRequestFullscreen = true;
            this._isSupportVibrate = false;
            this.orientations = [
                "portrait",
                "landscape",
                "portrait-primary",
                "portrait-secondary",
                "landscape-primary",
                "landscape-secondary"
            ];
            if (AIBrowser._instance != null)
                throw new Error("AITouch为单例！！！");
            this.name = "Browser";
            AIBrowser._instance = this;
        }
        var d = __define,c=AIBrowser,p=c.prototype;
        d(AIBrowser, "instance"
            ,function () {
                if (this._instance == null)
                    this._instance = new AIBrowser();
                return this._instance;
            }
        );
        p.initialize = function () {
            var self = this;
            window.addEventListener("resize", function () {
                self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResize));
            });
            if (typeof navigator.onLine !== "undefined") {
                window.addEventListener("online", function () {
                    self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onOnline));
                });
                window.addEventListener("offline", function () {
                    self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onOffline));
                });
            }
            if (typeof window.applicationCache !== "undefined") {
                window.applicationCache.addEventListener("updateready", function () {
                });
                window.applicationCache.addEventListener("progress", function () {
                });
            }
        };
        p.saveToJSON = function () {
            return {
                "name": this.name,
                "isModel": this.isModel,
                "paramInstances": this.paramInstances,
                "timeScale": this.timeScale,
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.name = o["name"];
                this.isModel = o["isModel"];
                this.paramInstances = o["paramInstances"];
                this.timeScale = o["timeScale"];
            }
        };
        d(p, "URL"
            ////////////////////////////URL//////////////////////////////
            //URL即统一资源定位符 (Uniform Resource Locator, URL)，完整的URL由这几个部分构成：
            //scheme://host:port/path?query#fragment
            //scheme:通信协议，常用的http,ftp,maito等
            //host:主机，服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。
            //port:端口号，整数，可选，省略时使用方案的默认端口，如http的默认端口为80。
            //path:路径，由零或多个"/"符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。
            //query:查询，可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用"&"符号隔开，每个参数的名和值用"="符号隔开。
            //fragment:信息片断，字符串，用于指定网络资源中的片断。例如一个网页中有多个名词解释，可使用fragment直接定位到某一名词解释。(也称为锚点)
            /////////////////////////////////////////////////////////////
            //Expressions
            ,function () {
                return window.location.toString();
            }
        );
        d(p, "protocol"
            //获取URL协议部分，如返回http:
            ,function () {
                return window.location.protocol;
            }
        );
        d(p, "host"
            //例如：www.egret.com
            ,function () {
                return window.location.host;
            }
        );
        d(p, "hostname"
            ,function () {
                return window.location.hostname;
            }
        );
        d(p, "port"
            ,function () {
                return window.location.port;
            }
        );
        d(p, "pathname"
            ,function () {
                return window.location.pathname;
            }
        );
        d(p, "hash"
            //比如http://domain/#admin的location.hash="#admin"
            ,function () {
                return window.location.hash;
            }
        );
        d(p, "Referer"
            //referrer 属性得到载入当前文档的 URL（即链接并打开当前文档的 URL）。语法如下：
            ,function () {
                return document.referrer;
            }
        );
        d(p, "Title"
            ,function () {
                return document.title;
            }
        );
        d(p, "appName"
            ,function () {
                return navigator.appName;
            }
        );
        d(p, "appVersion"
            ,function () {
                return navigator.appVersion;
            }
        );
        d(p, "language"
            ,function () {
                if (navigator && navigator.language)
                    return navigator.language;
                else
                    return "";
            }
        );
        d(p, "queryString"
            ,function () {
                return window.location.search;
            }
        );
        d(p, "screenWidth"
            ,function () {
                return screen.width;
            }
        );
        d(p, "screenHeight"
            ,function () {
                return screen.height;
            }
        );
        d(p, "platform"
            //platform 属性是一个只读的字符串，声明了运行浏览器的操作系统和（或）硬件平台。
            ,function () {
                return navigator.platform;
            }
        );
        d(p, "isSupportVibrate"
            ,function () {
                this._isSupportVibrate = navigator["vibrate"] || navigator["webkitVibrate"] || navigator["mozVibrate"] || navigator["msVibrate"];
                return this._isSupportVibrate;
            }
        );
        //support Google Chrome Beta for Android | Firefox for Android
        //unsupport Safari for iOS7 | Google Chrome for Android
        p.isCanSupportVibrated = function ($event) {
            return { instances: [this], status: this.isSupportVibrate };
        };
        //如果浏览器启用了 cookie，该属性值为 true。如果禁用了 cookie，则值为 false
        p.cookiesEnabled = function ($event) {
            return navigator ? { instances: [this], status: navigator.cookieEnabled } : { instances: [this], status: false };
        };
        //当前网络是否在线
        p.isOnline = function ($event) {
            return navigator ? { instances: [this], status: navigator.onLine } : { instances: [this], status: false };
        };
        //该值指示浏览器是否支持并启用了 Java
        p.hasJava = function ($event) {
            return navigator ? { instances: [this], status: navigator.javaEnabled() } : { instances: [this], status: false };
        };
        p.onOnline = function ($event) {
            return { instances: [this], status: true };
        };
        p.onOffline = function ($event) {
            return { instances: [this], status: true };
        };
        //IsDownloadingUpdate(): IConditionData {
        //    return { instances: [this], status: false };
        //}
        //PageVisible(): IConditionData {
        //    return { instances: [this], status: false };
        //}
        //OnPageVisible(): IConditionData {
        //    return { instances: [this], status: false };
        //}
        //OnPageHidden(): IConditionData {
        //    return { instances: [this], status: false };
        //}
        p.onResize = function ($event) {
            return { instances: [this], status: true };
        };
        p.isFullscreen = function ($event) {
            return { instances: [this], status: !!(document["mozFullScreen"] || document["webkitIsFullScreen"] || document["fullScreen"]) };
        };
        //OnBackButton(): IConditionData {
        //    return { instances: [this], status: false };
        //}
        //OnMenuButton(): IConditionData {
        //    return { instances: [this], status: false };
        //}
        //IsMetered(): IConditionData {
        //    return { instances: [this], status: false };
        //}
        //IsCharging(): IConditionData {
        //    return { instances: [this], status: false };
        //}
        //是横还是坚屏
        p.isPortraitLandscape = function (event) {
            var current = (window.innerWidth <= window.innerHeight ? 0 : 1);
            return { instances: [this], status: current === ls.eval_e(event.orientaion) };
        };
        //是否支持全屏 TODO
        p.supportsFullscreen = function (event) {
            var canvas = document.getElementById("gameDiv");
            if (canvas)
                return { instances: [this], status: !!(canvas["requestFullscreen"] || canvas["mozRequestFullScreen"] || canvas["msRequestFullscreen"] || canvas["webkitRequestFullScreen"]) };
            return { instances: [this], status: false };
        };
        //actions
        p.showAlert = function (message) {
            alert(message);
        };
        p.closeWindow = function () {
            window.close();
        };
        //把焦点给予一个窗口
        p.focus = function () {
            window.focus();
        };
        //把焦点从顶层窗口移开
        p.blur = function () {
            window.blur();
        };
        //页面跳转暂时放到这儿
        p.gotoURL = function (url, target) {
            var _target = parseInt(target);
            if (_target == 0) {
                window.location.href = url;
            }
            else if (_target == 1) {
                window.parent.location.href = url;
            }
            else {
                window.top.location.href = url;
            }
        };
        //暂时放到这儿
        p.gotoURLWindow = function (url, tag) {
            //如果不加延时，那么，可能会出现跳转不了的情况
            setTimeout(function (url, tag) {
                window.open(url, tag);
            }, 100, url, tag);
        };
        p.reload = function () {
            window.location.reload();
        };
        // TODO
        p.requestFullScreen = function () {
            var canvas = document.getElementById("gameDiv");
            if (canvas) {
                if (this.firstRequestFullscreen) {
                    this.firstRequestFullscreen = false;
                    canvas.addEventListener("mozfullscreenerror", this.onFullscreenError);
                    canvas.addEventListener("webkitfullscreenerror", this.onFullscreenError);
                    canvas.addEventListener("MSFullscreenError", this.onFullscreenError);
                    canvas.addEventListener("fullscreenerror", this.onFullscreenError);
                }
                if (canvas["requestFullscreen"])
                    canvas["requestFullscreen"]();
                else if (canvas["mozRequestFullScreen"])
                    canvas["mozRequestFullScreen"]();
                else if (canvas["msRequestFullScreen"])
                    canvas["msRequestFullScreen"]();
                else if (canvas["webkitRequestFullScreen"]) {
                }
            }
        };
        // TODO
        p.cancelFullScreen = function () {
            if (document["exitFullscreen"])
                document["exitFullscreen"]();
            else if (document["mozCancelFullScreen"])
                document["mozCancelFullScreen"]();
            else if (document["msExitFullscreen"])
                document["msExitFullscreen"]();
            else if (document["webkitCancelFullScreen"])
                document["webkitCancelFullScreen"]();
        };
        //@see http://shapeshed.com/html5-vibrate-api/  TODO
        p.vibrate = function (pattern_) {
            try {
                pattern_ = "200,100,200";
                var arr = pattern_.split(",");
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = parseInt(arr[i], 10);
                }
                if (navigator["vibrate"])
                    navigator["vibrate"](arr);
                else if (navigator["mozVibrate"])
                    navigator["mozVibrate"](arr);
                else if (navigator["webkitVibrate"])
                    navigator["webkitVibrate"](arr);
                else if (navigator["msVibrate"])
                    navigator["msVibrate"](arr);
            }
            catch (e) { }
        };
        p.execJs = function (js_) {
            try {
                if (eval)
                    eval(js_);
            }
            catch (e) {
                if (console && console.error)
                    console.error("执行JS语句发生错误！！", e);
            }
        };
        //TODO
        p.lockOrientation = function (o) {
            var o = ls.eval_e(o);
            o = Math.floor(o);
            if (o < 0 || o >= this.orientations.length)
                return;
            var orientation = this.orientations[o];
            if (screen["orientation"] && screen["orientation"]["lock"])
                screen["orientation"]["lock"](orientation);
            else if (screen["lockOrientation"])
                screen["lockOrientation"](orientation);
            else if (screen["webkitLockOrientation"])
                screen["webkitLockOrientation"](orientation);
            else if (screen["mozLockOrientation"])
                screen["mozLockOrientation"](orientation);
            else if (screen["msLockOrientation"])
                screen["msLockOrientation"](orientation);
        };
        //TODO
        p.unLockOrientation = function () {
            if (screen["orientation"] && screen["orientation"]["unlock"])
                screen["orientation"]["unlock"]();
            else if (screen["unlockOrientation"])
                screen["unlockOrientation"]();
            else if (screen["webkitUnlockOrientation"])
                screen["webkitUnlockOrientation"]();
            else if (screen["mozUnlockOrientation"])
                screen["mozUnlockOrientation"]();
            else if (screen["msUnlockOrientation"])
                screen["msUnlockOrientation"]();
        };
        p.onFullscreenError = function (error) {
        };
        return AIBrowser;
    }(ls.AIObject));
    ls.AIBrowser = AIBrowser;
    egret.registerClass(AIBrowser,'ls.AIBrowser');
    var IsSupportVibrateEvent = (function (_super) {
        __extends(IsSupportVibrateEvent, _super);
        function IsSupportVibrateEvent() {
            _super.call(this);
        }
        var d = __define,c=IsSupportVibrateEvent,p=c.prototype;
        return IsSupportVibrateEvent;
    }(ls.BaseEvent));
    ls.IsSupportVibrateEvent = IsSupportVibrateEvent;
    egret.registerClass(IsSupportVibrateEvent,'ls.IsSupportVibrateEvent');
    var IsCookiesEnabledEvent = (function (_super) {
        __extends(IsCookiesEnabledEvent, _super);
        function IsCookiesEnabledEvent() {
            _super.call(this);
        }
        var d = __define,c=IsCookiesEnabledEvent,p=c.prototype;
        return IsCookiesEnabledEvent;
    }(ls.BaseEvent));
    ls.IsCookiesEnabledEvent = IsCookiesEnabledEvent;
    egret.registerClass(IsCookiesEnabledEvent,'ls.IsCookiesEnabledEvent');
    var IsOnlineEvent = (function (_super) {
        __extends(IsOnlineEvent, _super);
        function IsOnlineEvent() {
            _super.call(this);
        }
        var d = __define,c=IsOnlineEvent,p=c.prototype;
        return IsOnlineEvent;
    }(ls.BaseEvent));
    ls.IsOnlineEvent = IsOnlineEvent;
    egret.registerClass(IsOnlineEvent,'ls.IsOnlineEvent');
    var IsHasJavaEvent = (function (_super) {
        __extends(IsHasJavaEvent, _super);
        function IsHasJavaEvent() {
            _super.call(this);
        }
        var d = __define,c=IsHasJavaEvent,p=c.prototype;
        return IsHasJavaEvent;
    }(ls.BaseEvent));
    ls.IsHasJavaEvent = IsHasJavaEvent;
    egret.registerClass(IsHasJavaEvent,'ls.IsHasJavaEvent');
    var OnOnlineEvent = (function (_super) {
        __extends(OnOnlineEvent, _super);
        function OnOnlineEvent() {
            _super.call(this);
        }
        var d = __define,c=OnOnlineEvent,p=c.prototype;
        return OnOnlineEvent;
    }(ls.BaseEvent));
    ls.OnOnlineEvent = OnOnlineEvent;
    egret.registerClass(OnOnlineEvent,'ls.OnOnlineEvent');
    var OnOfflineEvent = (function (_super) {
        __extends(OnOfflineEvent, _super);
        function OnOfflineEvent() {
            _super.call(this);
        }
        var d = __define,c=OnOfflineEvent,p=c.prototype;
        return OnOfflineEvent;
    }(ls.BaseEvent));
    ls.OnOfflineEvent = OnOfflineEvent;
    egret.registerClass(OnOfflineEvent,'ls.OnOfflineEvent');
    var OnResizeEvent = (function (_super) {
        __extends(OnResizeEvent, _super);
        function OnResizeEvent() {
            _super.call(this);
        }
        var d = __define,c=OnResizeEvent,p=c.prototype;
        return OnResizeEvent;
    }(ls.BaseEvent));
    ls.OnResizeEvent = OnResizeEvent;
    egret.registerClass(OnResizeEvent,'ls.OnResizeEvent');
    var IsFullscreenEvent = (function (_super) {
        __extends(IsFullscreenEvent, _super);
        function IsFullscreenEvent() {
            _super.call(this);
        }
        var d = __define,c=IsFullscreenEvent,p=c.prototype;
        return IsFullscreenEvent;
    }(ls.BaseEvent));
    ls.IsFullscreenEvent = IsFullscreenEvent;
    egret.registerClass(IsFullscreenEvent,'ls.IsFullscreenEvent');
    var IsPortraitLandscapeEvent = (function (_super) {
        __extends(IsPortraitLandscapeEvent, _super);
        function IsPortraitLandscapeEvent() {
            _super.call(this);
        }
        var d = __define,c=IsPortraitLandscapeEvent,p=c.prototype;
        return IsPortraitLandscapeEvent;
    }(ls.BaseEvent));
    ls.IsPortraitLandscapeEvent = IsPortraitLandscapeEvent;
    egret.registerClass(IsPortraitLandscapeEvent,'ls.IsPortraitLandscapeEvent');
    var IsSupportFullscreenEvent = (function (_super) {
        __extends(IsSupportFullscreenEvent, _super);
        function IsSupportFullscreenEvent() {
            _super.call(this);
        }
        var d = __define,c=IsSupportFullscreenEvent,p=c.prototype;
        return IsSupportFullscreenEvent;
    }(ls.BaseEvent));
    ls.IsSupportFullscreenEvent = IsSupportFullscreenEvent;
    egret.registerClass(IsSupportFullscreenEvent,'ls.IsSupportFullscreenEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map