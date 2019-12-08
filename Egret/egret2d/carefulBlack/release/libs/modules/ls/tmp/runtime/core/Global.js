var ls;
(function (ls) {
    ls.loopIndex = {};
    function assert(cnd, msg) {
        if (cnd) {
            var stack;
            try {
                throw Error();
            }
            catch (ex) {
                stack = ex.stack;
            }
            var msg = "【ERROR】:" + msg + "\n\nStack trace: \n" + stack;
            if (console.error)
                console.error(msg);
            if (isWeixinLogin()) {
                document.write(msg);
                alert(msg);
            }
        }
    }
    ls.assert = assert;
    /**注册对象给windows */
    function registerObject(name, instance) {
        window[name] = instance;
    }
    ls.registerObject = registerObject;
    function lakeshoreInst() {
        return window;
    }
    ls.lakeshoreInst = lakeshoreInst;
    function eval_e(exp) {
        try {
            return eval(exp); //EventSheetDecoder.expressionObject[encodeURIComponent(exp)];
        }
        catch (exception) {
            return exp;
        }
    }
    ls.eval_e = eval_e;
    /**获取循环索引 */
    function getloopIndex(key) {
        return ls.loopIndex[key];
    }
    ls.getloopIndex = getloopIndex;
    /**返回当前运行的fps */
    function fps() {
        return 1 / dt();
    }
    ls.fps = fps;
    /**返回当前运行时每帧的运行时间间隔（单位：ms） */
    function dt() {
        return ls.AISystem.instance.dt1;
    }
    ls.dt = dt;
    /**返回当前场景对象数量 */
    function objectcount() {
        return ls.World.getInstance().objectList.length;
    }
    ls.objectcount = objectcount;
    /**获取当前真实运行时间间隔与理论时间间隔的比例（获取在帧运行的过程中因帧频不稳定而带来的运动错误）*/
    function timeScale() {
        return 1;
    }
    ls.timeScale = timeScale;
    ls.oldtime = egret.getTimer();
    /**返回自游戏运行以来运行的时间（单位：毫秒）*/
    function time() {
        return egret.getTimer() - ls.oldtime;
    }
    ls.time = time;
    /** 添加日志输出口 */
    function log(args) {
        args = args + "";
        args = args.split(",");
        for (var i = 0; i < args.length; i++) {
            var logStr = eval_e(args[i]);
            ls.Log.log(logStr);
        }
    }
    ls.log = log;
    /**当前运行环境是否是pc */
    function isPc() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    ls.isPc = isPc;
    /**注入属性 */
    function injectProp(target, data, ignroeMethod) {
        if (data === void 0) { data = null; }
        if (ignroeMethod === void 0) { ignroeMethod = true; }
        if (!data)
            return false;
        var result = true;
        for (var key in data) {
            var value = data[key];
            if (!ignroeMethod || typeof value != 'function') {
                target[key] = value;
            }
        }
        return result;
    }
    ls.injectProp = injectProp;
    /**获取毫秒 */
    function getMiniSeconds(str) {
        var reg = /-/g;
        var date = new Date(Date.parse(str.replace(reg, "/")));
        return date.getTime();
    }
    ls.getMiniSeconds = getMiniSeconds;
    /**
     * 获取倒计时字符串
     */
    function getRemainTimeStr(str, splitStr, showZero) {
        if (splitStr === void 0) { splitStr = ":"; }
        if (showZero === void 0) { showZero = true; }
        var oldTime = this.getMiniSeconds(str);
        var curTime = new Date().getTime();
        var remainMinSecond = oldTime - curTime;
        if (remainMinSecond >= 0) {
            var remainSecond = Math.round(remainMinSecond / 1000);
            var hour = Math.floor(remainSecond / 3600);
            var minute = Math.floor((remainSecond - hour * 3600) / 60);
            var second = remainSecond - hour * 3600 - minute * 60;
            var hourStr = (hour < 10) ? "0" + hour : hour.toString();
            var minuteStr = (minute < 10) ? "0" + minute : minute.toString();
            var secondStr = (second < 10) ? "0" + second : second.toString();
            return hourStr + splitStr + minuteStr + splitStr + secondStr;
        }
        if (showZero)
            return "00" + splitStr + "00" + splitStr + "00";
        return "";
    }
    ls.getRemainTimeStr = getRemainTimeStr;
    ls.internalData = [];
    ls.cacheInternal = {};
    ls.cachePlugins = {};
    /**
     * 判断当前实例是否在场景上
     * TODO
     */
    function isInternal(name) {
        if (ls.cacheInternal[name] == undefined) {
            var status = false;
            if (ls.internalData) {
                for (var i = 0; i < ls.internalData.length; i++) {
                    var item = ls.internalData[i];
                    if (item.name == name) {
                        status = true;
                        break;
                    }
                }
            }
            ls.cacheInternal[name] = status;
        }
        return ls.cacheInternal[name];
    }
    ls.isInternal = isInternal;
    function getPlugin(name) {
        if (ls.cachePlugins[name] == undefined) {
            var plugin = "";
            if (ls.internalData) {
                for (var i = 0; i < ls.internalData.length; i++) {
                    var item = ls.internalData[i];
                    if (item.name == name) {
                        plugin = item.plugin;
                        break;
                    }
                }
            }
            ls.cachePlugins[name] = plugin;
        }
        return ls.cachePlugins[name];
    }
    ls.getPlugin = getPlugin;
    function isSingleInst(name) {
        return isInternal(name);
    }
    ls.isSingleInst = isSingleInst;
    ls.singles = {};
    function getInstanceByInstanceName(name) {
        var instance;
        var instanceClass;
        if (isSingleInst(name)) {
            if (ls.singles[name] == null) {
                instanceClass = egret.getDefinitionByName("ls." + getPlugin(name));
                if (instanceClass == null) {
                    alert("name:" + name);
                    return;
                }
                instanceClass.name = name;
                if (instanceClass.instance == null)
                    instance = new instanceClass();
                else
                    instance = instanceClass.instance;
                ls.singles[name] = instance;
                registerObject(name, instance);
            }
            else {
                instance = ls.singles[name];
            }
            if (isInternal(name)) {
                window[name] = instance;
            }
        }
        return instance;
    }
    ls.getInstanceByInstanceName = getInstanceByInstanceName;
    /**根据类名获取实例 */
    function getInstanceByPluginClassName(name, isCreate) {
        if (isCreate === void 0) { isCreate = false; }
        var instance;
        var instanceClass;
        if (name == "Object")
            return null;
        if (isSingleInst(name)) {
            if (ls.singles[name] == null) {
                instanceClass = egret.getDefinitionByName("ls." + getPlugin(name));
                if (instanceClass == null) {
                    if (!isCreate) {
                        alert("name:" + name);
                    }
                    return;
                }
                instanceClass.name = name;
                if (name == "System")
                    instance = instanceClass.instance;
                else
                    instance = new instanceClass();
                instance.name = name;
                ls.singles[name] = instance;
                registerObject(name, instance);
            }
            else {
                instance = ls.singles[name];
            }
        }
        else {
            instanceClass = egret.getDefinitionByName("ls." + name);
            if (instanceClass == null) {
                if (!isCreate) {
                    alert("name:" + name);
                }
                instance = null;
                return;
            }
            instance = new instanceClass();
        }
        if (isInternal(name)) {
            window[name] = instance;
        }
        return instance;
    }
    ls.getInstanceByPluginClassName = getInstanceByPluginClassName;
    /**
     * 根据地址获取纹理数据
     */
    function getTexture(url) {
        if (url) {
            var imageName = url; //this.getName(url);
            var texture;
            if (imageName) {
                var spriteSheetData = ls.LayoutDecoder.spriteSheetDatas[imageName];
                if (spriteSheetData) {
                    texture = spriteSheetData.texture;
                }
                if (texture == undefined || texture == null) {
                    texture = RES.getRes(imageName);
                }
                if (texture != undefined && texture != null)
                    return [texture, spriteSheetData ? spriteSheetData.offsetX : 0, spriteSheetData ? spriteSheetData.offsetY : 0];
            }
        }
        return null;
    }
    ls.getTexture = getTexture;
    /**
     * 根据地址获取名字
     */
    function getName(url) {
        if (url)
            return url.substring(url.lastIndexOf("\/") + 1, url.lastIndexOf("\."));
        return "";
    }
    ls.getName = getName;
    //TODO
    function getTransformationStr(str) {
        return str;
    }
    ls.getTransformationStr = getTransformationStr;
    function xmlToJson(xml) {
        var obj = {};
        if (xml.nodeType == 1) {
            for (var key in xml.attributes) {
                obj[key] = xml.attributes[key];
            }
        }
        else if (xml.nodeType == 3) {
            obj = xml.name;
        }
        if (xml.children) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children[i];
                var nodeName = item.localName;
                if (obj[nodeName] == undefined) {
                    obj[nodeName] = this.xmlToJson(item);
                }
                else {
                    if (obj[nodeName].length == undefined) {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    }
    ls.xmlToJson = xmlToJson;
    function round6dp(x) {
        return Math.round(x * 1000000) / 1000000;
    }
    ls.round6dp = round6dp;
    function is_undefined(x) {
        return typeof x === "undefined";
    }
    ls.is_undefined = is_undefined;
    function is_number(x) {
        return typeof x === "number";
    }
    ls.is_number = is_number;
    function is_string(x) {
        return typeof x === "string";
    }
    ls.is_string = is_string;
    /////////////////////////////Math////////////////////////////////
    /**返回数value的绝对值 */
    function abs(value) {
        value = eval_e(value);
        return Math.abs(value);
    }
    ls.abs = abs;
    /**返回数value的反余弦值 */
    function acos(value) {
        value = eval_e(value);
        return Math.acos(value);
    }
    ls.acos = acos;
    function angle(x1, y1, x2, y2) {
        x1 = eval_e(x1);
        y1 = eval_e(y1);
        x2 = eval_e(x2);
        y2 = eval_e(y2);
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }
    ls.angle = angle;
    /**返回数value的反正弦值 */
    function asin(value) {
        value = eval_e(value);
        return Math.asin(value);
    }
    ls.asin = asin;
    /**以介于 -PI/2 与 PI/2 弧度之间的数值value来返回 x 的反正切值 */
    function atan(value) {
        value = eval_e(value);
        return Math.atan(value);
    }
    ls.atan = atan;
    /**返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间） */
    function atan2(y, x) {
        y = eval_e(y);
        x = eval_e(x);
        return Math.atan2(y, x);
    }
    ls.atan2 = atan2;
    /**对数value进行向上取整 */
    function ceil(value) {
        value = eval_e(value);
        return Math.ceil(value);
    }
    ls.ceil = ceil;
    /**对数value进行向下取整 */
    function floor(value) {
        value = eval_e(value);
        return Math.floor(value);
    }
    ls.floor = floor;
    /**返回角value的正弦 */
    function sin(value) {
        value = eval_e(value);
        return Math.sin(value);
    }
    ls.sin = sin;
    /**返回角value的余弦 */
    function cos(value) {
        value = eval_e(value);
        return Math.cos(value);
    }
    ls.cos = cos;
    /**返回数value的平方根 */
    function sqrt(value) {
        value = eval_e(value);
        return Math.sqrt(value);
    }
    ls.sqrt = sqrt;
    /**返回角value的正切 */
    function tan(value) {
        value = eval_e(value);
        return Math.tan(value);
    }
    ls.tan = tan;
    function cosp(a, b, x) {
        a = eval_e(a);
        b = eval_e(b);
        x = eval_e(x);
        return (a + b + (a - b) * Math.cos(x * Math.PI)) / 2;
    }
    ls.cosp = cosp;
    /**
     * 计算点(x1,y1)与点(x2,y2)之间的距离
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    function distance(x1, y1, x2, y2) {
        x1 = eval_e(x1);
        y1 = eval_e(y1);
        x2 = eval_e(x2);
        y2 = eval_e(y2);
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
    ls.distance = distance;
    /**
     * e的value次方
     */
    function exp(value) {
        value = eval_e(value);
        return Math.exp(value);
    }
    ls.exp = exp;
    /**
     * 返回x的y次幂
     */
    function pow(x, y) {
        x = eval_e(x);
        y = eval_e(y);
        return Math.pow(x, y);
    }
    ls.pow = pow;
    function getbit(num, bit) {
        num = eval_e(num);
        bit = eval_e(bit);
        num = num | 0;
        bit = bit | 0;
        return (num & (1 << bit)) ? 1 : 0;
    }
    ls.getbit = getbit;
    /**插值 */
    function lerp(a, b, x) {
        a = eval_e(a);
        b = eval_e(b);
        x = eval_e(x);
        return a + (b - a) * x;
    }
    ls.lerp = lerp;
    function unlerp(a, b, c) {
        a = eval_e(a);
        b = eval_e(b);
        c = eval_e(c);
        if (a == b)
            return 0;
        return (c - a) / (b - a);
    }
    ls.unlerp = unlerp;
    function log10(value) {
        value = eval_e(value);
        return Math.log(value) / Math.LN10;
    }
    ls.log10 = log10;
    /**返回value1与值value2中的最高值 */
    function max(value1, value2) {
        value1 = eval_e(value1);
        value2 = eval_e(value2);
        return Math.max(value1, value2);
    }
    ls.max = max;
    /**返回value1与值value2中的最低值 */
    function min(value1, value2) {
        value1 = eval_e(value1);
        value2 = eval_e(value2);
        return Math.min(value1, value2);
    }
    ls.min = min;
    /**返回圆周率（约等于3.14159） */
    function pi() {
        return Math.PI;
    }
    ls.pi = pi;
    function qarp(a, b, c, x) {
        a = eval_e(a);
        b = eval_e(b);
        c = eval_e(c);
        x = eval_e(x);
        return lerp(lerp(a, b, x), lerp(b, c, x), x);
    }
    ls.qarp = qarp;
    /**将数字value进行四舍五入运算 */
    function round(value) {
        value = eval_e(value);
        return Math.round(value);
    }
    ls.round = round;
    /**获取0~1之间的任意数 */
    function random() {
        return Math.random();
    }
    ls.random = random;
    function togglebit(value, bit) {
        value = eval_e(value);
        bit = eval_e(bit);
        value = value | 0;
        bit = bit | 0;
        return value ^ (1 << bit);
    }
    ls.togglebit = togglebit;
    /**将值value转换成浮点型 */
    function float(value) {
        value = eval_e(value);
        return +value;
    }
    ls.float = float;
    /**将值value转换成整型 */
    function int(value) {
        value = eval_e(value);
        return parseInt(value);
    }
    ls.int = int;
    /**将红绿蓝值转化为rgb值 */
    function rgb(red, green, blue) {
        red = eval_e(red);
        green = eval_e(green);
        blue = eval_e(blue);
        return Math.max(Math.min(red, 255), 0) | (Math.max(Math.min(green, 255), 0) << 8) | (Math.max(Math.min(blue, 255), 0) << 16);
    }
    ls.rgb = rgb;
    /**根据rgb值获取红色值 */
    function getRed(rgb) {
        rgb = eval_e(rgb);
        return rgb & 0xFF;
    }
    ls.getRed = getRed;
    /**根据rgb值获取绿色值 */
    function getGreen(rgb) {
        rgb = eval_e(rgb);
        return (rgb & 0xFF00) >> 8;
    }
    ls.getGreen = getGreen;
    /**根据rgb值获取蓝色值 */
    function getBlue(rgb) {
        rgb = eval_e(rgb);
        return (rgb & 0xFF0000) >> 16;
    }
    ls.getBlue = getBlue;
    /////////////////////////////Math////////////////////////////////
    function regexp_escape(text) {
        text = eval_e(text);
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    ls.regexp_escape = regexp_escape;
    function find(text, searchstr) {
        text = eval_e(text);
        searchstr = eval_e(searchstr);
        return text.search(new RegExp(regexp_escape(searchstr), "i"));
    }
    ls.find = find;
    function replace(text, find, replace_) {
        text = eval_e(text);
        find = eval_e(find);
        replace_ = eval_e(replace_);
        return text.replace(new RegExp(regexp_escape(find), "gi"), replace_);
    }
    ls.replace = replace;
    function left(text, count) {
        text = eval_e(text);
        count = eval_e(count);
        return text.substr(text, count);
    }
    ls.left = left;
    function right(text, count) {
        text = eval_e(text);
        return text.substr(text.length - count);
    }
    ls.right = right;
    // export function len(value:any):number {
    // }
    function lowercase(text) {
        text = eval_e(text);
        return text.toLowerCase();
    }
    ls.lowercase = lowercase;
    function upppercase(text) {
        text = eval_e(text);
        return text.toUpperCase();
    }
    ls.upppercase = upppercase;
    function trim(text) {
        text = eval_e(text);
        return text.trim();
    }
    ls.trim = trim;
    function mid(text, index, length) {
        text = eval_e(text);
        return text.substr(index, length);
    }
    ls.mid = mid;
    function newline() {
        return "\n";
    }
    ls.newline = newline;
    function zeropad(num, digits) {
        num = eval_e(num);
        digits = eval_e(digits);
        var s = (num < 0) ? "-" : "";
        if (num < 0)
            num = -num;
        var zeroes = digits - (num.toString()).length;
        for (var i = 0; i < zeroes; i++) {
            s += "0";
        }
        return s + num.toString();
    }
    ls.zeropad = zeropad;
    function choose() {
        var index = Math.floor(Math.random() * (arguments.length - 1));
        return arguments[index + 1];
    }
    ls.choose = choose;
    function clamp(x, l, u) {
        x = eval_e(x);
        l = eval_e(l);
        u = eval_e(u);
        if (x < l)
            return l;
        else if (x > u)
            return u;
        else
            return x;
    }
    ls.clamp = clamp;
    function isWeixinLogin() {
        var ua = window.navigator.userAgent.toLowerCase();
        var metchStr = ua.match(/MicroMessenger/i);
        return (metchStr && metchStr.length > 0 && metchStr[0] == 'micromessenger');
    }
    ls.isWeixinLogin = isWeixinLogin;
    var OperationType = (function () {
        function OperationType() {
        }
        var d = __define,c=OperationType,p=c.prototype;
        OperationType.EQUAL_TO = "equalTo";
        OperationType.NOT_EQUAL_TO = "notEqualTo";
        OperationType.LESS_THAN = "lessThan";
        OperationType.LESS_OR_EQUAL = "lessOrEqual";
        OperationType.GREATER_THAN = "greaterThan";
        OperationType.GREATER_OR_EQUAL = "greaterOrEqual";
        return OperationType;
    }());
    ls.OperationType = OperationType;
    egret.registerClass(OperationType,'ls.OperationType');
    var InstanceVariablesType = (function () {
        function InstanceVariablesType() {
        }
        var d = __define,c=InstanceVariablesType,p=c.prototype;
        InstanceVariablesType.TEXT = "text";
        InstanceVariablesType.INT = "int";
        InstanceVariablesType.NUMBER = "Number";
        InstanceVariablesType.BOOLEAN = "boolean";
        return InstanceVariablesType;
    }());
    ls.InstanceVariablesType = InstanceVariablesType;
    egret.registerClass(InstanceVariablesType,'ls.InstanceVariablesType');
    /**
     * 比较运算符（值都被转换了）
     */
    function compare(curValue, operand, comValue) {
        var curV = eval_e(curValue);
        var comV = eval_e(comValue);
        switch (operand) {
            case OperationType.EQUAL_TO: return curV == comV;
            case OperationType.GREATER_OR_EQUAL: return curV >= comV;
            case OperationType.GREATER_THAN: return curV > comV;
            case OperationType.LESS_OR_EQUAL: return curV <= comV;
            case OperationType.LESS_THAN: return curV < comV;
            case OperationType.NOT_EQUAL_TO: return curV != comV;
        }
        return false;
    }
    ls.compare = compare;
})(ls || (ls = {}));
//# sourceMappingURL=Global.js.map