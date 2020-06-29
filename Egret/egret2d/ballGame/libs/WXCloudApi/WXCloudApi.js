var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var egret;
(function (egret) {
    var WXDBWatcher = /** @class */ (function () {
        function WXDBWatcher() {
        }
        WXDBWatcher.openCollection = function (name, env) {
            var db = new WXDBWatcher();
            db._env = env;
            db.init(name);
            return db;
        };
        WXDBWatcher.prototype.startWatch = function (selectRule, callback) {
            var listener = this._collection.where(selectRule).watch(callback);
            return new WXDBListener(listener);
        };
        WXDBWatcher.prototype.stopWatch = function (listener) {
            listener.close();
        };
        WXDBWatcher.prototype.init = function (name) {
            var wxDB;
            var env = this._env;
            if (!env) {
                wxDB = egret.wxCloud.cloud.database();
            }
            else {
                wxDB = egret.wxCloud.cloud.database({ env: env });
            }
            this._collection = wxDB.collection(name);
        };
        return WXDBWatcher;
    }());
    egret.WXDBWatcher = WXDBWatcher;
    var WXDBListener = /** @class */ (function () {
        function WXDBListener(listener) {
            this._listener = listener;
        }
        WXDBListener.prototype.close = function () {
            this._listener.close();
        };
        return WXDBListener;
    }());
    egret.WXDBListener = WXDBListener;
})(egret || (egret = {}));
/////////////////////
///// WX Cloud Apis
/////////////////////
/**
 * Common interfaces and types
 */
var egret;
(function (egret) {
    var wxCloud;
    (function (wxCloud) {
        var cloud = /** @class */ (function () {
            function cloud() {
            }
            cloud.init = function (config) {
                if (isWXPlatform()) {
                    wx.cloud.init(config);
                }
                else {
                    this._webTcb = tcb.init(config);
                }
            };
            cloud.database = function (config) {
                if (isWXPlatform()) {
                    return wx.cloud.database(config);
                }
                // return new EgretDatabase(config, wx.cloud.database(config));
                if (!this._webTcb) {
                    throw new Error("egret.wxCloud.cloud尚未初始化，请先调用egret.wxCloud.cloud.init初始化");
                }
                return this._webTcb.database(config);
            };
            cloud.callFunction = function (param) {
                if (isWXPlatform()) {
                    return wx.cloud.callFunction(param);
                }
                if (!this._webTcb) {
                    throw new Error("egret.wxCloud.cloud尚未初始化，请先调用egret.wxCloud.cloud.init初始化");
                }
                return this._webTcb.callFunction({
                    name: param.name,
                    data: param.data
                }, function (err, res) {
                    if (err) {
                        if (param.fail) {
                            param.fail(err);
                        }
                    }
                    else {
                        if (param.success) {
                            param.success(res);
                        }
                    }
                });
            };
            cloud.auth = function (config) {
                if (!assertWebPlatform("egret.wxCloud.cloud.auth")) {
                    return new EgretAuth(config);
                }
                else {
                    if (!this._webTcb) {
                        throw new Error("egret.wxCloud.cloud尚未初始化，请先调用egret.wxCloud.cloud.init初始化");
                    }
                    return this._webTcb.auth(config);
                }
            };
            return cloud;
        }());
        wxCloud.cloud = cloud;
    })(wxCloud = egret.wxCloud || (egret.wxCloud = {}));
})(egret || (egret = {}));
/**
 * @internal
 */
function assertWXPlatform(apiName) {
    if (typeof egret.Capabilities === "undefined" ||
        egret.Capabilities.runtimeType !== egret.RuntimeType.WXGAME) {
        if (apiName) {
            console.warn(apiName + "\u53EA\u5728\u5FAE\u4FE1\u5C0F\u6E38\u620F\u4E0B\u53EF\u7528");
        }
        else {
            console.warn("\u8BE5\u63A5\u53E3\u53EA\u5728\u5FAE\u4FE1\u5C0F\u6E38\u620F\u4E0B\u53EF\u7528");
        }
        return false;
    }
    return true;
}
/**
 * @internal
 */
function assertWebPlatform(apiName) {
    if (typeof egret.Capabilities !== "undefined" &&
        egret.Capabilities.runtimeType === egret.RuntimeType.WXGAME) {
        if (apiName) {
            console.warn("\u5FAE\u4FE1\u5C0F\u6E38\u620F\u4E0D\u652F\u6301" + apiName);
        }
        else {
            console.warn("\u5FAE\u4FE1\u5C0F\u6E38\u620F\u4E0D\u652F\u6301\u8BE5\u63A5\u53E3");
        }
        return false;
    }
    return true;
}
function isWXPlatform() {
    if (typeof egret.Capabilities === "undefined" ||
        egret.Capabilities.runtimeType !== egret.RuntimeType.WXGAME) {
        return false;
    }
    return true;
}
/**
 * @internal
 */
var EgretTCBCache = /** @class */ (function () {
    function EgretTCBCache(persistence) {
    }
    EgretTCBCache.prototype.setStore = function (key, value, version) {
    };
    EgretTCBCache.prototype.getStore = function (key, version) {
        return {};
    };
    EgretTCBCache.prototype.removeStore = function (key) {
    };
    return EgretTCBCache;
}());
/**
 * @internal
 */
var EgretBase = /** @class */ (function () {
    function EgretBase(config) {
    }
    EgretBase.prototype.setRefreshToken = function (refreshToken) {
        assertWebPlatform("Base");
    };
    EgretBase.prototype.getJwt = function (appid, loginType, code) {
        assertWebPlatform("Base");
        return {};
    };
    return EgretBase;
}());
/**
 * @internal
 */
var EgretWeixinAuthProvider = /** @class */ (function (_super) {
    __extends(EgretWeixinAuthProvider, _super);
    function EgretWeixinAuthProvider(config, appid, scope, loginMode, state) {
        var _this = _super.call(this, config) || this;
        _this.config = config;
        _this.appid = appid;
        _this.scope = scope;
        _this.loginMode = loginMode;
        _this.state = state;
        return _this;
    }
    EgretWeixinAuthProvider.prototype.signIn = function (callback) {
        assertWebPlatform("WeixinAuthProvider");
        if (callback) {
            callback(new Error("微信小游戏不支持WeixinAuthProvider"), null);
        }
        return;
    };
    EgretWeixinAuthProvider.prototype.redirect = function () {
        assertWebPlatform("WeixinAuthProvider");
    };
    return EgretWeixinAuthProvider;
}(EgretBase));
/**
 * @internal
 */
var EgretAuth = /** @class */ (function () {
    function EgretAuth(config) {
        this.config = config;
    }
    EgretAuth.prototype.weixinAuthProvider = function (_a) {
        var appid = _a.appid, scope = _a.scope, loginMode = _a.loginMode, state = _a.state;
        assertWebPlatform("Auth");
        return new EgretWeixinAuthProvider(this.config, appid, scope, loginMode, state);
    };
    EgretAuth.prototype.signOut = function () {
        assertWebPlatform("Auth");
        return Promise.resolve({});
    };
    EgretAuth.prototype.getAccessToken = function () {
        assertWebPlatform("Auth");
        return Promise.resolve({});
    };
    EgretAuth.prototype.onLoginStateExpire = function (callback) {
        assertWebPlatform("Auth");
    };
    EgretAuth.prototype.signInWithTicket = function (ticket) {
        assertWebPlatform("Auth");
        return Promise.resolve();
    };
    EgretAuth.prototype.shouldRefreshAccessToken = function (hook) {
        assertWebPlatform("Auth");
    };
    EgretAuth.prototype.getUserInfo = function () {
        assertWebPlatform("Auth");
        return Promise.resolve({});
    };
    return EgretAuth;
}());
/**
 * @internal
 */
var EgretDatabase = /** @class */ (function () {
    function EgretDatabase(_config, db) {
        this._config = _config;
        this._db = db;
    }
    Object.defineProperty(EgretDatabase.prototype, "config", {
        get: function () {
            if (this._db) {
                return this._db.config;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(EgretDatabase.prototype, "command", {
        get: function () {
            if (this._db) {
                return this._db.command;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return new EgretDatabaseCommand();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(EgretDatabase.prototype, "Geo", {
        get: function () {
            if (this._db) {
                return this._db.Geo;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return new EgretGeo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretDatabase.prototype, "serverDate", {
        get: function () {
            if (this._db) {
                return this._db.serverDate;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return function () {
                return {
                    options: {
                        offset: 0
                    }
                };
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretDatabase.prototype, "RegExp", {
        get: function () {
            if (this._db) {
                return this._db.RegExp;
            }
            assertWXPlatform("egret.wxCloud.DB.Database");
            return EgretRegExp;
        },
        enumerable: true,
        configurable: true
    });
    EgretDatabase.prototype.collection = function (collectionName) {
        if (this._db) {
            return this._db.collection(collectionName);
        }
        assertWXPlatform("egret.wxCloud.DB.Database");
        return new EgretCollectionReference("", undefined);
    };
    return EgretDatabase;
}());
/**
 * @internal
 */
var EgretQuery = /** @class */ (function () {
    function EgretQuery() {
    }
    EgretQuery.prototype.where = function (condition) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.orderBy = function (fieldPath, order) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.limit = function (max) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.skip = function (offset) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.field = function (object) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return this;
    };
    EgretQuery.prototype.get = function (options) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return Promise.resolve({
            data: [],
            errMsg: ""
        });
    };
    EgretQuery.prototype.count = function (options) {
        assertWXPlatform("egret.wxCloud.DB.Query");
        return Promise.resolve({
            total: 0,
            errMsg: ""
        });
    };
    EgretQuery.prototype.watch = function (callback) {
        assertWXPlatform("egret.wxCloud.DB.Query");
    };
    return EgretQuery;
}());
/**
 * @internal
 */
var EgretCollectionReference = /** @class */ (function (_super) {
    __extends(EgretCollectionReference, _super);
    function EgretCollectionReference(name, database) {
        var _this = _super.call(this) || this;
        _this.collectionName = name;
        _this.database = database;
        return _this;
    }
    EgretCollectionReference.prototype.doc = function (docId) {
        assertWXPlatform("egret.wxCloud.DB.CollectionReference");
        return new EgretDocumentReference(docId, this.database);
    };
    EgretCollectionReference.prototype.add = function (options) {
        assertWXPlatform("egret.wxCloud.DB.CollectionReference");
        return Promise.resolve({
            _id: "",
            errMsg: ""
        });
    };
    return EgretCollectionReference;
}(EgretQuery));
/**
 * @internal
 */
var EgretDocumentReference = /** @class */ (function () {
    function EgretDocumentReference(docId, database) {
        this.docId = docId;
        this.database = database;
    }
    EgretDocumentReference.prototype.field = function (object) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return this;
    };
    EgretDocumentReference.prototype.get = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return Promise.resolve({
            data: [],
            errMsg: ""
        });
    };
    EgretDocumentReference.prototype.set = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return Promise.resolve({
            _id: this.docId,
            stats: {
                updated: 0,
                created: 0
            },
            errMsg: ""
        });
    };
    EgretDocumentReference.prototype.update = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return Promise.resolve({
            stats: {
                updated: 0,
            },
            errMsg: ""
        });
    };
    EgretDocumentReference.prototype.remove = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DocumentReference");
        return Promise.resolve({
            stats: {
                removed: 0,
            },
            errMsg: ""
        });
    };
    return EgretDocumentReference;
}());
/**
 * @internal
 */
var EgretDatabaseCommand = /** @class */ (function () {
    function EgretDatabaseCommand() {
    }
    EgretDatabaseCommand.prototype.eq = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.neq = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.gt = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.gte = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.lt = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.lte = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.in = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.nin = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.geoNear = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.geoWithin = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.geoIntersects = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseQueryCommand();
    };
    EgretDatabaseCommand.prototype.and = function () {
        var expressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expressions[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseLogicCommand();
    };
    EgretDatabaseCommand.prototype.or = function () {
        var expressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expressions[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new EgretDatabaseLogicCommand();
    };
    EgretDatabaseCommand.prototype.set = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.remove = function () {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.inc = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.mul = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.push = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.pop = function () {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.shift = function () {
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    EgretDatabaseCommand.prototype.unshift = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseCommand");
        return new DatabaseUpdateCommand("", []);
    };
    return EgretDatabaseCommand;
}());
/**
 * @internal
 */
var EgretDatabaseLogicCommand = /** @class */ (function () {
    function EgretDatabaseLogicCommand() {
    }
    EgretDatabaseLogicCommand.prototype._setFieldName = function (fieldName) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseLogicCommand");
        this.fieldName = fieldName;
        return this;
    };
    EgretDatabaseLogicCommand.prototype.and = function () {
        var expressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expressions[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseLogicCommand");
        return this;
    };
    EgretDatabaseLogicCommand.prototype.or = function () {
        var expressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expressions[_i] = arguments[_i];
        }
        assertWXPlatform("egret.wxCloud.DB.DatabaseLogicCommand");
        return this;
    };
    return EgretDatabaseLogicCommand;
}());
/**
 * @internal
 */
var EgretDatabaseQueryCommand = /** @class */ (function (_super) {
    __extends(EgretDatabaseQueryCommand, _super);
    function EgretDatabaseQueryCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EgretDatabaseQueryCommand.prototype._setFieldName = function (fieldName) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        this.fieldName = fieldName;
        return this;
    };
    EgretDatabaseQueryCommand.prototype.eq = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.neq = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.gt = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.gte = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.lt = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.lte = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.in = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.nin = function (val) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.geoNear = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.geoWithin = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    EgretDatabaseQueryCommand.prototype.geoIntersects = function (options) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseQueryCommand");
        return this;
    };
    return EgretDatabaseQueryCommand;
}(EgretDatabaseLogicCommand));
/**
 * @internal
 */
var DatabaseUpdateCommand = /** @class */ (function () {
    function DatabaseUpdateCommand(
    // operator: UPDATE_COMMANDS_LITERAL,
    operator, operands, fieldName) {
        this.operator = operator;
        this.operands = operands;
        this.fieldName = fieldName;
    }
    DatabaseUpdateCommand.prototype._setFieldName = function (fieldName) {
        assertWXPlatform("egret.wxCloud.DB.DatabaseUpdateCommand");
        this.fieldName = fieldName;
        return this;
    };
    return DatabaseUpdateCommand;
}());
/**
 * @internal
 */
var EgretGeo = /** @class */ (function () {
    function EgretGeo() {
        this.Point = EgretGeoPoint;
        this.MultiPoint = EgretGeoMultiPoint;
        this.LineString = EgretGeoLineString;
        this.MultiLineString = EgretGeoMultiLineString;
        this.Polygon = EgretGeoPolygon;
        this.MultiPolygon = EgretGeoMultiPolygon;
    }
    return EgretGeo;
}());
/**
 * @internal
 */
var EgretGeoPoint = /** @class */ (function () {
    function EgretGeoPoint(longitude, latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }
    EgretGeoPoint.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoPoint");
        return {};
    };
    EgretGeoPoint.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoPoint");
        return "";
    };
    return EgretGeoPoint;
}());
/**
 * @internal
 */
var EgretGeoMultiPoint = /** @class */ (function () {
    function EgretGeoMultiPoint(points) {
        this.points = points;
    }
    EgretGeoMultiPoint.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoMultiPoint");
        return {
            type: 'MultiPoint',
            coordinates: []
        };
    };
    EgretGeoMultiPoint.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoMultiPoint");
        return "";
    };
    return EgretGeoMultiPoint;
}());
/**
 * @internal
 */
var EgretGeoLineString = /** @class */ (function () {
    function EgretGeoLineString(points) {
        this.points = points;
    }
    EgretGeoLineString.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoLineString");
        return {
            type: 'LineString',
            coordinates: []
        };
    };
    EgretGeoLineString.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoLineString");
        return "";
    };
    return EgretGeoLineString;
}());
/**
 * @internal
 */
var EgretGeoMultiLineString = /** @class */ (function () {
    function EgretGeoMultiLineString(lines) {
        this.lines = lines;
    }
    EgretGeoMultiLineString.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoMultiLineString");
        return {
            type: 'GeoMultiLineString',
            coordinates: []
        };
    };
    EgretGeoMultiLineString.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoMultiLineString");
        return "";
    };
    return EgretGeoMultiLineString;
}());
/**
 * @internal
 */
var EgretGeoPolygon = /** @class */ (function () {
    function EgretGeoPolygon(lines) {
        this.lines = lines;
    }
    EgretGeoPolygon.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoPolygon");
        return {
            type: 'Polygon',
            coordinates: []
        };
    };
    EgretGeoPolygon.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.GeoPolygon");
        return "";
    };
    return EgretGeoPolygon;
}());
/**
 * @internal
 */
var EgretGeoMultiPolygon = /** @class */ (function () {
    function EgretGeoMultiPolygon(polygons) {
        this.polygons = polygons;
    }
    EgretGeoMultiPolygon.prototype.toJSON = function () {
        assertWXPlatform("egret.wxCloud.DB.MultiPolygon");
        return {
            type: 'MultiPolygon',
            coordinates: []
        };
    };
    EgretGeoMultiPolygon.prototype.toString = function () {
        assertWXPlatform("egret.wxCloud.DB.MultiPolygon");
        return "";
    };
    return EgretGeoMultiPolygon;
}());
/**
 * @internal
 */
var EgretRegExp = /** @class */ (function () {
    /**
     *
     */
    function EgretRegExp(options) {
    }
    Object.defineProperty(EgretRegExp.prototype, "regexp", {
        get: function () {
            assertWXPlatform("egret.wxCloud.DB.RegExp");
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EgretRegExp.prototype, "options", {
        get: function () {
            assertWXPlatform("egret.wxCloud.DB.RegExp");
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return EgretRegExp;
}());
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("tcb", [], t) : "object" == typeof exports ? exports.tcb = t() : e.tcb = t();
}(window, function () {
    // 微信
    if (typeof wx !== "undefined" && typeof wx.getUserInfo === "function") {
        return;
    }
    // vivo，小米，oppo
    if (typeof qg !== "undefined" && typeof qg.getSystemInfoSync === "function") {
        return;
    }
    // 百度
    if (typeof swan !== "undefined" && typeof swan.getSystemInfoSync === "function") {
        return;
    }
    // 支付宝
    if (typeof my !== "undefined" && typeof my.getSystemInfoSync === "function") {
        return;
    }
    // QQ小游戏
    if (typeof qq !== "undefined" && typeof qq.getSystemInfoSync === "function") {
        return;
    }
    // ios, android
    if (egret.nativeRender) {
        return;
    }
    // 非H5环境
    if (typeof document === "undefined") {
        return;
    }
    return function (e) {
        var t = window.webpackHotUpdatetcb;
        window.webpackHotUpdatetcb = function (e, n) {
            !function (e, t) {
                if (!b[e] || !O[e])
                    return;
                for (var n in O[e] = !1, t)
                    Object.prototype.hasOwnProperty.call(t, n) && (y[n] = t[n]);
                0 == --v && 0 === _ && S();
            }(e, n), t && t(e, n);
        };
        var n, r = !0, o = "724d5223cfd021be164d", i = 1e4, a = {}, s = [], c = [];
        function u(e) {
            var t = L[e];
            if (!t)
                return P;
            var r = function (r) {
                return t.hot.active ? (L[r] ? -1 === L[r].parents.indexOf(e) && L[r].parents.push(e) : (s = [e], n = r), -1 === t.children.indexOf(r) && t.children.push(r)) : (console.warn("[HMR] unexpected require(" + r + ") from disposed module " + e), s = []), P(r);
            }, o = function (e) {
                return {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                        return P[e];
                    },
                    set: function (t) {
                        P[e] = t;
                    }
                };
            };
            for (var i in P)
                Object.prototype.hasOwnProperty.call(P, i) && "e" !== i && "t" !== i && Object.defineProperty(r, i, o(i));
            return r.e = function (e) {
                return "ready" === l && d("prepare"), _++, P.e(e).then(t, function (e) {
                    throw t(), e;
                });
                function t() {
                    _--, "prepare" === l && (g[e] || T(e), 0 === _ && 0 === v && S());
                }
            }, r.t = function (e, t) {
                return 1 & t && (e = r(e)), P.t(e, -2 & t);
            }, r;
        }
        function f(e) {
            var t = {
                _acceptedDependencies: {},
                _declinedDependencies: {},
                _selfAccepted: !1,
                _selfDeclined: !1,
                _disposeHandlers: [],
                _main: n !== e,
                active: !0,
                accept: function (e, n) {
                    if (void 0 === e)
                        t._selfAccepted = !0;
                    else if ("function" == typeof e)
                        t._selfAccepted = e;
                    else if ("object" == typeof e)
                        for (var r = 0; r < e.length; r++)
                            t._acceptedDependencies[e[r]] = n || function () { };
                    else
                        t._acceptedDependencies[e] = n || function () { };
                },
                decline: function (e) {
                    if (void 0 === e)
                        t._selfDeclined = !0;
                    else if ("object" == typeof e)
                        for (var n = 0; n < e.length; n++)
                            t._declinedDependencies[e[n]] = !0;
                    else
                        t._declinedDependencies[e] = !0;
                },
                dispose: function (e) {
                    t._disposeHandlers.push(e);
                },
                addDisposeHandler: function (e) {
                    t._disposeHandlers.push(e);
                },
                removeDisposeHandler: function (e) {
                    var n = t._disposeHandlers.indexOf(e);
                    n >= 0 && t._disposeHandlers.splice(n, 1);
                },
                check: w,
                apply: A,
                status: function (e) {
                    if (!e)
                        return l;
                    p.push(e);
                },
                addStatusHandler: function (e) {
                    p.push(e);
                },
                removeStatusHandler: function (e) {
                    var t = p.indexOf(e);
                    t >= 0 && p.splice(t, 1);
                },
                data: a[e]
            };
            return n = void 0, t;
        }
        var p = [], l = "idle";
        function d(e) {
            l = e;
            for (var t = 0; t < p.length; t++)
                p[t].call(null, e);
        }
        var h, y, m, v = 0, _ = 0, g = {}, O = {}, b = {};
        function E(e) {
            return +e + "" === e ? +e : e;
        }
        function w(e) {
            if ("idle" !== l)
                throw new Error("check() is only allowed in idle status");
            return r = e, d("check"), (t = i, t = t || 1e4, new Promise(function (e, n) {
                if ("undefined" == typeof XMLHttpRequest)
                    return n(new Error("No browser support"));
                try {
                    var r = new XMLHttpRequest, i = P.p + "" + o + ".hot-update.json";
                    r.open("GET", i, !0), r.timeout = t, r.send(null);
                }
                catch (e) {
                    return n(e);
                }
                r.onreadystatechange = function () {
                    if (4 === r.readyState)
                        if (0 === r.status)
                            n(new Error("Manifest request to " + i + " timed out."));
                        else if (404 === r.status)
                            e();
                        else if (200 !== r.status && 304 !== r.status)
                            n(new Error("Manifest request to " + i + " failed."));
                        else {
                            try {
                                var t = JSON.parse(r.responseText);
                            }
                            catch (e) {
                                return void n(e);
                            }
                            e(t);
                        }
                };
            })).then(function (e) {
                if (!e)
                    return d("idle"), null;
                O = {}, g = {}, b = e.c, m = e.h, d("prepare");
                var t = new Promise(function (e, t) {
                    h = {
                        resolve: e,
                        reject: t
                    };
                });
                y = {};
                return T(0), "prepare" === l && 0 === _ && 0 === v && S(), t;
            });
            var t;
        }
        function T(e) {
            b[e] ? (O[e] = !0, v++, function (e) {
                var t = document.createElement("script");
                t.charset = "utf-8", t.src = P.p + "" + e + "." + o + ".hot-update.js", document.head.appendChild(t);
            }(e)) : g[e] = !0;
        }
        function S() {
            d("ready");
            var e = h;
            if (h = null, e)
                if (r)
                    Promise.resolve().then(function () {
                        return A(r);
                    }).then(function (t) {
                        e.resolve(t);
                    }, function (t) {
                        e.reject(t);
                    });
                else {
                    var t = [];
                    for (var n in y)
                        Object.prototype.hasOwnProperty.call(y, n) && t.push(E(n));
                    e.resolve(t);
                }
        }
        function A(t) {
            if ("ready" !== l)
                throw new Error("apply() is only allowed in ready status");
            var n, r, i, c, u;
            function f(e) {
                for (var t = [e], n = {}, r = t.slice().map(function (e) {
                    return {
                        chain: [e],
                        id: e
                    };
                }); r.length > 0;) {
                    var o = r.pop(), i = o.id, a = o.chain;
                    if ((c = L[i]) && !c.hot._selfAccepted) {
                        if (c.hot._selfDeclined)
                            return {
                                type: "self-declined",
                                chain: a,
                                moduleId: i
                            };
                        if (c.hot._main)
                            return {
                                type: "unaccepted",
                                chain: a,
                                moduleId: i
                            };
                        for (var s = 0; s < c.parents.length; s++) {
                            var u = c.parents[s], f = L[u];
                            if (f) {
                                if (f.hot._declinedDependencies[i])
                                    return {
                                        type: "declined",
                                        chain: a.concat([u]),
                                        moduleId: i,
                                        parentId: u
                                    };
                                -1 === t.indexOf(u) && (f.hot._acceptedDependencies[i] ? (n[u] || (n[u] = []), p(n[u], [i])) : (delete n[u], t.push(u), r.push({
                                    chain: a.concat([u]),
                                    id: u
                                })));
                            }
                        }
                    }
                }
                return {
                    type: "accepted",
                    moduleId: e,
                    outdatedModules: t,
                    outdatedDependencies: n
                };
            }
            function p(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    -1 === e.indexOf(r) && e.push(r);
                }
            }
            t = t || {};
            var h = {}, v = [], _ = {}, g = function () {
                console.warn("[HMR] unexpected require(" + w.moduleId + ") to disposed module");
            };
            for (var O in y)
                if (Object.prototype.hasOwnProperty.call(y, O)) {
                    var w;
                    u = E(O);
                    var T = !1, S = !1, A = !1, M = "";
                    switch ((w = y[O] ? f(u) : {
                        type: "disposed",
                        moduleId: O
                    }).chain && (M = "\nUpdate propagation: " + w.chain.join(" -> ")), w.type) {
                        case "self-declined":
                            t.onDeclined && t.onDeclined(w), t.ignoreDeclined || (T = new Error("Aborted because of self decline: " + w.moduleId + M));
                            break;
                        case "declined":
                            t.onDeclined && t.onDeclined(w), t.ignoreDeclined || (T = new Error("Aborted because of declined dependency: " + w.moduleId + " in " + w.parentId + M));
                            break;
                        case "unaccepted":
                            t.onUnaccepted && t.onUnaccepted(w), t.ignoreUnaccepted || (T = new Error("Aborted because " + u + " is not accepted" + M));
                            break;
                        case "accepted":
                            t.onAccepted && t.onAccepted(w), S = !0;
                            break;
                        case "disposed":
                            t.onDisposed && t.onDisposed(w), A = !0;
                            break;
                        default:
                            throw new Error("Unexception type " + w.type);
                    }
                    if (T)
                        return d("abort"), Promise.reject(T);
                    if (S)
                        for (u in _[u] = y[u], p(v, w.outdatedModules), w.outdatedDependencies)
                            Object.prototype.hasOwnProperty.call(w.outdatedDependencies, u) && (h[u] || (h[u] = []), p(h[u], w.outdatedDependencies[u]));
                    A && (p(v, [w.moduleId]), _[u] = g);
                }
            var N, C = [];
            for (r = 0; r < v.length; r++)
                u = v[r], L[u] && L[u].hot._selfAccepted && C.push({
                    module: u,
                    errorHandler: L[u].hot._selfAccepted
                });
            d("dispose"), Object.keys(b).forEach(function (e) {
                !1 === b[e] && function (e) {
                    delete installedChunks[e];
                }(e);
            });
            for (var I, D, R = v.slice(); R.length > 0;)
                if (u = R.pop(), c = L[u]) {
                    var j = {}, x = c.hot._disposeHandlers;
                    for (i = 0; i < x.length; i++)
                        (n = x[i])(j);
                    for (a[u] = j, c.hot.active = !1, delete L[u], delete h[u], i = 0; i < c.children.length; i++) {
                        var U = L[c.children[i]];
                        U && ((N = U.parents.indexOf(u)) >= 0 && U.parents.splice(N, 1));
                    }
                }
            for (u in h)
                if (Object.prototype.hasOwnProperty.call(h, u) && (c = L[u]))
                    for (D = h[u], i = 0; i < D.length; i++)
                        I = D[i], (N = c.children.indexOf(I)) >= 0 && c.children.splice(N, 1);
            for (u in d("apply"), o = m, _)
                Object.prototype.hasOwnProperty.call(_, u) && (e[u] = _[u]);
            var k = null;
            for (u in h)
                if (Object.prototype.hasOwnProperty.call(h, u) && (c = L[u])) {
                    D = h[u];
                    var q = [];
                    for (r = 0; r < D.length; r++)
                        if (I = D[r], n = c.hot._acceptedDependencies[I]) {
                            if (-1 !== q.indexOf(n))
                                continue;
                            q.push(n);
                        }
                    for (r = 0; r < q.length; r++) {
                        n = q[r];
                        try {
                            n(D);
                        }
                        catch (e) {
                            t.onErrored && t.onErrored({
                                type: "accept-errored",
                                moduleId: u,
                                dependencyId: D[r],
                                error: e
                            }), t.ignoreErrored || k || (k = e);
                        }
                    }
                }
            for (r = 0; r < C.length; r++) {
                var F = C[r];
                u = F.module, s = [u];
                try {
                    P(u);
                }
                catch (e) {
                    if ("function" == typeof F.errorHandler)
                        try {
                            F.errorHandler(e);
                        }
                        catch (n) {
                            t.onErrored && t.onErrored({
                                type: "self-accept-error-handler-errored",
                                moduleId: u,
                                error: n,
                                originalError: e
                            }), t.ignoreErrored || k || (k = n), k || (k = e);
                        }
                    else
                        t.onErrored && t.onErrored({
                            type: "self-accept-errored",
                            moduleId: u,
                            error: e
                        }), t.ignoreErrored || k || (k = e);
                }
            }
            return k ? (d("fail"), Promise.reject(k)) : (d("idle"), new Promise(function (e) {
                e(v);
            }));
        }
        var L = {};
        function P(t) {
            if (L[t])
                return L[t].exports;
            var n = L[t] = {
                i: t,
                l: !1,
                exports: {},
                hot: f(t),
                parents: (c = s, s = [], c),
                children: []
            };
            return e[t].call(n.exports, n, n.exports, u(t)), n.l = !0, n.exports;
        }
        return P.m = e, P.c = L, P.d = function (e, t, n) {
            P.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            });
        }, P.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }, P.t = function (e, t) {
            if (1 & t && (e = P(e)), 8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var n = Object.create(null);
            if (P.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
                for (var r in e)
                    P.d(n, r, function (t) {
                        return e[t];
                    }.bind(null, r));
            return n;
        }, P.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default;
            } : function () {
                return e;
            };
            return P.d(t, "a", t), t;
        }, P.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }, P.p = "", P.h = function () {
            return o;
        }, u(74)(P.s = 74);
    }([function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(42);
            !function (e) {
                for (var n in e)
                    t.hasOwnProperty(n) || (t[n] = e[n]);
            }(n(42)), t.SYMBOL_UNSET_FIELD_NAME = r.default.for("UNSET_FIELD_NAME"), t.SYMBOL_UPDATE_COMMAND = r.default.for("UPDATE_COMMAND"), t.SYMBOL_QUERY_COMMAND = r.default.for("QUERY_COMMAND"), t.SYMBOL_LOGIC_COMMAND = r.default.for("LOGIC_COMMAND"), t.SYMBOL_GEO_POINT = r.default.for("GEO_POINT"), t.SYMBOL_GEO_LINE_STRING = r.default.for("SYMBOL_GEO_LINE_STRING"), t.SYMBOL_GEO_POLYGON = r.default.for("SYMBOL_GEO_POLYGON"), t.SYMBOL_GEO_MULTI_POINT = r.default.for("SYMBOL_GEO_MULTI_POINT"), t.SYMBOL_GEO_MULTI_LINE_STRING = r.default.for("SYMBOL_GEO_MULTI_LINE_STRING"), t.SYMBOL_GEO_MULTI_POLYGON = r.default.for("SYMBOL_GEO_MULTI_POLYGON"), t.SYMBOL_SERVER_DATE = r.default.for("SERVER_DATE"), t.SYMBOL_REGEXP = r.default.for("REGEXP");
        }, function (e, t, n) {
            "use strict";
            var r = n(56), o = n(108), i = Object.prototype.toString;
            function a(e) {
                return "[object Array]" === i.call(e);
            }
            function s(e) {
                return null !== e && "object" == typeof e;
            }
            function c(e) {
                return "[object Function]" === i.call(e);
            }
            function u(e, t) {
                if (null != e)
                    if ("object" != typeof e && (e = [e]), a(e))
                        for (var n = 0, r = e.length; n < r; n++)
                            t.call(null, e[n], n, e);
                    else
                        for (var o in e)
                            Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
            }
            e.exports = {
                isArray: a,
                isArrayBuffer: function (e) {
                    return "[object ArrayBuffer]" === i.call(e);
                },
                isBuffer: o,
                isFormData: function (e) {
                    return "undefined" != typeof FormData && e instanceof FormData;
                },
                isArrayBufferView: function (e) {
                    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
                },
                isString: function (e) {
                    return "string" == typeof e;
                },
                isNumber: function (e) {
                    return "number" == typeof e;
                },
                isObject: s,
                isUndefined: function (e) {
                    return void 0 === e;
                },
                isDate: function (e) {
                    return "[object Date]" === i.call(e);
                },
                isFile: function (e) {
                    return "[object File]" === i.call(e);
                },
                isBlob: function (e) {
                    return "[object Blob]" === i.call(e);
                },
                isFunction: c,
                isStream: function (e) {
                    return s(e) && c(e.pipe);
                },
                isURLSearchParams: function (e) {
                    return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
                },
                isStandardBrowserEnv: function () {
                    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;
                },
                forEach: u,
                merge: function e() {
                    var t = {};
                    function n(n, r) {
                        "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n;
                    }
                    for (var r = 0, o = arguments.length; r < o; r++)
                        u(arguments[r], n);
                    return t;
                },
                deepMerge: function e() {
                    var t = {};
                    function n(n, r) {
                        "object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n;
                    }
                    for (var r = 0, o = arguments.length; r < o; r++)
                        u(arguments[r], n);
                    return t;
                },
                extend: function (e, t, n) {
                    return u(t, function (t, o) {
                        e[o] = n && "function" == typeof t ? r(t, n) : t;
                    }), e;
                },
                trim: function (e) {
                    return e.replace(/^\s*/, "").replace(/\s*$/, "");
                }
            };
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(42);
            t.getType = function (e) {
                return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
            }, t.isObject = function (e) {
                return "object" === t.getType(e);
            }, t.isString = function (e) {
                return "string" === t.getType(e);
            }, t.isNumber = function (e) {
                return "number" === t.getType(e);
            }, t.isPromise = function (e) {
                return "promise" === t.getType(e);
            }, t.isFunction = function (e) {
                return "function" == typeof e;
            }, t.isArray = function (e) {
                return Array.isArray(e);
            }, t.isDate = function (e) {
                return "date" === t.getType(e);
            }, t.isRegExp = function (e) {
                return "regexp" === t.getType(e);
            }, t.isInternalObject = function (e) {
                return e && e._internalType instanceof r.InternalSymbol;
            }, t.isPlainObject = function (e) {
                if ("object" != typeof e || null === e)
                    return !1;
                for (var t = e; null !== Object.getPrototypeOf(t);)
                    t = Object.getPrototypeOf(t);
                return Object.getPrototypeOf(e) === t;
            };
        }, function (e, t) {
            var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = n);
        }, function (e, t) {
            var n = {}.hasOwnProperty;
            e.exports = function (e, t) {
                return n.call(e, t);
            };
        }, function (e, t, n) {
            var r = n(6), o = n(15);
            e.exports = n(7) ? function (e, t, n) {
                return r.f(e, t, o(1, n));
            } : function (e, t, n) {
                return e[t] = n, e;
            };
        }, function (e, t, n) {
            var r = n(13), o = n(46), i = n(24), a = Object.defineProperty;
            t.f = n(7) ? Object.defineProperty : function (e, t, n) {
                if (r(e), t = i(t, !0), r(n), o)
                    try {
                        return a(e, t, n);
                    }
                    catch (e) { }
                if ("get" in n || "set" in n)
                    throw TypeError("Accessors not supported!");
                return "value" in n && (e[t] = n.value), e;
            };
        }, function (e, t, n) {
            e.exports = !n(14)(function () {
                return 7 != Object.defineProperty({}, "a", {
                    get: function () {
                        return 7;
                    }
                }).a;
            });
        }, function (e, t, n) {
            var r = n(86), o = n(23);
            e.exports = function (e) {
                return r(o(e));
            };
        }, function (e, t, n) {
            var r = n(28)("wks"), o = n(16), i = n(3).Symbol, a = "function" == typeof i;
            (e.exports = function (e) {
                return r[e] || (r[e] = a && i[e] || (a ? i : o)("Symbol." + e));
            }).store = r;
        }, function (e, t) {
            e.exports = function (e) {
                return "object" == typeof e ? null !== e : "function" == typeof e;
            };
        }, function (e, t) {
            e.exports = !0;
        }, function (e, t) {
            var n = e.exports = {
                version: "2.6.9"
            };
            "number" == typeof __e && (__e = n);
        }, function (e, t, n) {
            var r = n(10);
            e.exports = function (e) {
                if (!r(e))
                    throw TypeError(e + " is not an object!");
                return e;
            };
        }, function (e, t) {
            e.exports = function (e) {
                try {
                    return !!e();
                }
                catch (e) {
                    return !0;
                }
            };
        }, function (e, t) {
            e.exports = function (e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                };
            };
        }, function (e, t) {
            var n = 0, r = Math.random();
            e.exports = function (e) {
                return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36));
            };
        }, function (e, t, n) {
            "use strict";
            var r = function () {
                return (r = Object.assign || function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                }).apply(this, arguments);
            }, o = function (e, t, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                    function a(e) {
                        try {
                            c(r.next(e));
                        }
                        catch (e) {
                            i(e);
                        }
                    }
                    function s(e) {
                        try {
                            c(r.throw(e));
                        }
                        catch (e) {
                            i(e);
                        }
                    }
                    function c(e) {
                        e.done ? o(e.value) : new n(function (t) {
                            t(e.value);
                        }).then(a, s);
                    }
                    c((r = r.apply(e, t || [])).next());
                });
            }, i = function (e, t) {
                var n, r, o, i, a = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1];
                    },
                    trys: [],
                    ops: []
                };
                return i = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                    return this;
                }), i;
                function s(i) {
                    return function (s) {
                        return function (i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; a;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                        case 0:
                                        case 1:
                                            o = i;
                                            break;
                                        case 4:
                                            return a.label++, {
                                                value: i[1],
                                                done: !1
                                            };
                                        case 5:
                                            a.label++, r = i[1], i = [0];
                                            continue;
                                        case 7:
                                            i = a.ops.pop(), a.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                                a = 0;
                                                continue;
                                            }
                                            if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                                a.label = i[1];
                                                break;
                                            }
                                            if (6 === i[0] && a.label < o[1]) {
                                                a.label = o[1], o = i;
                                                break;
                                            }
                                            if (o && a.label < o[2]) {
                                                a.label = o[2], a.ops.push(i);
                                                break;
                                            }
                                            o[2] && a.ops.pop(), a.trys.pop();
                                            continue;
                                    }
                                    i = t.call(e, a);
                                }
                                catch (e) {
                                    i = [6, e], r = 0;
                                }
                                finally {
                                    n = o = 0;
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            };
                        }([i, s]);
                    };
                }
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var a = n(55), s = n(34), c = n(35), u = n(36), f = ["auth.getJwt", "auth.logout", "auth.signInWithTicket"], p = function () {
                function e(e) {
                    this.config = e, this.cache = new c.Cache(e.persistence), this.accessTokenKey = s.ACCESS_TOKEN + "_" + e.env, this.accessTokenExpireKey = s.ACCESS_TOKEN_Expire + "_" + e.env, this.refreshTokenKey = s.REFRESH_TOKEN + "_" + e.env;
                }
                return e.prototype.refreshAccessToken = function () {
                    return o(this, void 0, void 0, function () {
                        var e, t;
                        return i(this, function (n) {
                            switch (n.label) {
                                case 0:
                                    if (this.cache.removeStore(this.accessTokenKey), this.cache.removeStore(this.accessTokenExpireKey), !(e = this.cache.getStore(this.refreshTokenKey)))
                                        throw new Error("[tcb-js-sdk] 未登录CloudBase");
                                    return [4, this.request("auth.getJwt", {
                                            refresh_token: e
                                        })];
                                case 1:
                                    if ("SIGN_PARAM_INVALID" === (t = n.sent()).data.code || "REFRESH_TOKEN_EXPIRED" === t.data.code)
                                        throw u.activateEvent("LoginStateExpire"), this.cache.removeStore(this.refreshTokenKey), new Error("[tcb-js-sdk] 刷新access token失败：" + t.data.code);
                                    return t.data.access_token ? (u.activateEvent("refreshAccessToken"), this.cache.setStore(this.accessTokenKey, t.data.access_token), this.cache.setStore(this.accessTokenExpireKey, t.data.access_token_expire + Date.now()), [2, {
                                            accessToken: t.data.access_token,
                                            accessTokenExpire: t.data.access_token_expire
                                        }]) : [2];
                            }
                        });
                    });
                }, e.prototype.getAccessToken = function () {
                    return o(this, void 0, void 0, function () {
                        var e, t, n;
                        return i(this, function (r) {
                            return e = this.cache.getStore(this.accessTokenKey), t = this.cache.getStore(this.accessTokenExpireKey), n = !0, this._shouldRefreshAccessTokenHook && !this._shouldRefreshAccessTokenHook(e, t) && (n = !1), (!e || !t || t < Date.now()) && n ? [2, this.refreshAccessToken()] : [2, {
                                    accessToken: e,
                                    accessTokenExpire: t
                                }];
                        });
                    });
                }, e.prototype.request = function (e, t, n) {
                    return o(this, void 0, void 0, function () {
                        var o, c, u, p, l, d, h;
                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    return o = "application/x-www-form-urlencoded", c = r({
                                        action: e,
                                        env: this.config.env,
                                        dataVersion: "2019-08-16"
                                    }, t), -1 !== f.indexOf(e) ? [3, 2] : (u = c, [4, this.getAccessToken()]);
                                case 1:
                                    u.access_token = i.sent().accessToken, i.label = 2;
                                case 2:
                                    if ("storage.uploadFile" === e) {
                                        for (l in p = new FormData)
                                            p.hasOwnProperty(l) && void 0 !== p[l] && p.append(l, c[l]);
                                        o = "multipart/form-data";
                                    }
                                    else
                                        o = "application/json;charset=UTF-8", p = c;
                                    return d = {
                                        headers: {
                                            "content-type": o
                                        }
                                    }, n && n.onUploadProgress && (d.onUploadProgress = n.onUploadProgress), [4, a.default.post(s.BASE_URL, p, d)];
                                case 3:
                                    if (h = i.sent(), 200 !== Number(h.status) || !h.data)
                                        throw new Error("network request error");
                                    return [2, h];
                            }
                        });
                    });
                }, e.prototype.send = function (e, t) {
                    return o(this, void 0, void 0, function () {
                        var n, r;
                        return i(this, function (o) {
                            switch (o.label) {
                                case 0:
                                    return n = setTimeout(function () {
                                        console.warn("Database operation is longer than 3s. Please check query performance and your network environment.");
                                    }, 3e3), [4, this.request(e, t, {
                                            onUploadProgress: t.onUploadProgress
                                        })];
                                case 1:
                                    return r = o.sent(), clearTimeout(n), "ACCESS_TOKEN_EXPIRED" !== r.data.code || -1 !== f.indexOf(e) ? [3, 3] : [4, this.refreshAccessToken()];
                                case 2:
                                    return o.sent(), [2, this.request(e, t, {
                                            onUploadProgress: t.onUploadProgress
                                        })];
                                case 3:
                                    if (r.data.code)
                                        throw new Error("[" + r.data.code + "] " + r.data.message);
                                    return [2, r.data];
                            }
                        });
                    });
                }, e;
            }();
            t.Request = p;
        }, function (e, t, n) {
            "use strict";
            function r(e) {
                for (var n in e)
                    t.hasOwnProperty(n) || (t[n] = e[n]);
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), r(n(39)), r(n(43)), r(n(68)), r(n(128)), r(n(129)), r(n(130));
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r, o = n(0);
            t.SET = "set", t.REMOVE = "remove", t.INC = "inc", t.MUL = "mul", t.PUSH = "push", t.POP = "pop", t.SHIFT = "shift", t.UNSHIFT = "unshift",
                function (e) {
                    e.SET = "set", e.REMOVE = "remove", e.INC = "inc", e.MUL = "mul", e.PUSH = "push", e.POP = "pop", e.SHIFT = "shift", e.UNSHIFT = "unshift";
                }(r = t.UPDATE_COMMANDS_LITERAL || (t.UPDATE_COMMANDS_LITERAL = {}));
            var i = function () {
                function e(e, t, n) {
                    this._internalType = o.SYMBOL_UPDATE_COMMAND, Object.defineProperties(this, {
                        _internalType: {
                            enumerable: !1,
                            configurable: !1
                        }
                    }), this.operator = e, this.operands = t, this.fieldName = n || o.SYMBOL_UNSET_FIELD_NAME;
                }
                return e.prototype._setFieldName = function (t) {
                    return new e(this.operator, this.operands, t);
                }, e;
            }();
            function a(e) {
                return e && e instanceof i && e._internalType === o.SYMBOL_UPDATE_COMMAND;
            }
            t.UpdateCommand = i, t.isUpdateCommand = a, t.isKnownUpdateCommand = function (e) {
                return a(e) && e.operator.toUpperCase() in r;
            }, t.default = i;
        }, function (e, t, n) {
            "use strict";
            var r, o = this && this.__extends || (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                    e.__proto__ = t;
                } || function (e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n]);
                })(e, t);
            }, function (e, t) {
                function n() {
                    this.constructor = e;
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n);
            });
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i, a = n(21), s = n(0), c = n(18), u = n(2);
            t.EQ = "eq", t.NEQ = "neq", t.GT = "gt", t.GTE = "gte", t.LT = "lt", t.LTE = "lte", t.IN = "in", t.NIN = "nin",
                function (e) {
                    e.EQ = "eq", e.NEQ = "neq", e.GT = "gt", e.GTE = "gte", e.LT = "lt", e.LTE = "lte", e.IN = "in", e.NIN = "nin", e.GEO_NEAR = "geoNear", e.GEO_WITHIN = "geoWithin", e.GEO_INTERSECTS = "geoIntersects";
                }(i = t.QUERY_COMMANDS_LITERAL || (t.QUERY_COMMANDS_LITERAL = {}));
            var f = function (e) {
                function t(t, n, r) {
                    var o = e.call(this, t, n, r) || this;
                    return o.operator = t, o._internalType = s.SYMBOL_QUERY_COMMAND, o;
                }
                return o(t, e), t.prototype._setFieldName = function (e) {
                    return new t(this.operator, this.operands, e);
                }, t.prototype.eq = function (e) {
                    var n = new t(i.EQ, [e], this.fieldName);
                    return this.and(n);
                }, t.prototype.neq = function (e) {
                    var n = new t(i.NEQ, [e], this.fieldName);
                    return this.and(n);
                }, t.prototype.gt = function (e) {
                    var n = new t(i.GT, [e], this.fieldName);
                    return this.and(n);
                }, t.prototype.gte = function (e) {
                    var n = new t(i.GTE, [e], this.fieldName);
                    return this.and(n);
                }, t.prototype.lt = function (e) {
                    var n = new t(i.LT, [e], this.fieldName);
                    return this.and(n);
                }, t.prototype.lte = function (e) {
                    var n = new t(i.LTE, [e], this.fieldName);
                    return this.and(n);
                }, t.prototype.in = function (e) {
                    var n = new t(i.IN, e, this.fieldName);
                    return this.and(n);
                }, t.prototype.nin = function (e) {
                    var n = new t(i.NIN, e, this.fieldName);
                    return this.and(n);
                }, t.prototype.geoNear = function (e) {
                    if (!(e.geometry instanceof c.Point))
                        throw new TypeError('"geometry" must be of type Point. Received type ' + typeof e.geometry);
                    if (void 0 !== e.maxDistance && !u.isNumber(e.maxDistance))
                        throw new TypeError('"maxDistance" must be of type Number. Received type ' + typeof e.maxDistance);
                    if (void 0 !== e.minDistance && !u.isNumber(e.minDistance))
                        throw new TypeError('"minDistance" must be of type Number. Received type ' + typeof e.minDistance);
                    var n = new t(i.GEO_NEAR, [e], this.fieldName);
                    return this.and(n);
                }, t.prototype.geoWithin = function (e) {
                    if (!(e.geometry instanceof c.MultiPolygon || e.geometry instanceof c.Polygon))
                        throw new TypeError('"geometry" must be of type Polygon or MultiPolygon. Received type ' + typeof e.geometry);
                    var n = new t(i.GEO_WITHIN, [e], this.fieldName);
                    return this.and(n);
                }, t.prototype.geoIntersects = function (e) {
                    if (!(e.geometry instanceof c.Point || e.geometry instanceof c.LineString || e.geometry instanceof c.Polygon || e.geometry instanceof c.MultiPoint || e.geometry instanceof c.MultiLineString || e.geometry instanceof c.MultiPolygon))
                        throw new TypeError('"geometry" must be of type Point, LineString, Polygon, MultiPoint, MultiLineString or MultiPolygon. Received type ' + typeof e.geometry);
                    var n = new t(i.GEO_INTERSECTS, [e], this.fieldName);
                    return this.and(n);
                }, t;
            }(a.LogicCommand);
            function p(e) {
                return e && e instanceof f && e._internalType === s.SYMBOL_QUERY_COMMAND;
            }
            t.QueryCommand = f, t.isQueryCommand = p, t.isKnownQueryCommand = function (e) {
                return p(e) && e.operator.toUpperCase() in i;
            }, t.isComparisonCommand = function (e) {
                return p(e);
            }, t.default = f;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r, o = n(0), i = n(20);
            t.AND = "and", t.OR = "or", t.NOT = "not", t.NOR = "nor",
                function (e) {
                    e.AND = "and", e.OR = "or", e.NOT = "not", e.NOR = "nor";
                }(r = t.LOGIC_COMMANDS_LITERAL || (t.LOGIC_COMMANDS_LITERAL = {}));
            var a = function () {
                function e(e, t, n) {
                    if (this._internalType = o.SYMBOL_LOGIC_COMMAND, Object.defineProperties(this, {
                        _internalType: {
                            enumerable: !1,
                            configurable: !1
                        }
                    }), this.operator = e, this.operands = t, this.fieldName = n || o.SYMBOL_UNSET_FIELD_NAME, this.fieldName !== o.SYMBOL_UNSET_FIELD_NAME) {
                        t = t.slice(), this.operands = t;
                        for (var r = 0, a = t.length; r < a; r++) {
                            var c = t[r];
                            (s(c) || i.isQueryCommand(c)) && (t[r] = c._setFieldName(this.fieldName));
                        }
                    }
                }
                return e.prototype._setFieldName = function (t) {
                    var n = this.operands.map(function (n) {
                        return n instanceof e ? n._setFieldName(t) : n;
                    });
                    return new e(this.operator, n, t);
                }, e.prototype.and = function () {
                    for (var t = [], n = 0; n < arguments.length; n++)
                        t[n] = arguments[n];
                    var o = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
                    return o.unshift(this), new e(r.AND, o, this.fieldName);
                }, e.prototype.or = function () {
                    for (var t = [], n = 0; n < arguments.length; n++)
                        t[n] = arguments[n];
                    var o = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
                    return o.unshift(this), new e(r.OR, o, this.fieldName);
                }, e;
            }();
            function s(e) {
                return e && e instanceof a && e._internalType === o.SYMBOL_LOGIC_COMMAND;
            }
            t.LogicCommand = a, t.isLogicCommand = s, t.isKnownLogicCommand = function (e) {
                return s && e.operator.toUpperCase() in r;
            }, t.default = a;
        }, function (e, t) {
            var n = Math.ceil, r = Math.floor;
            e.exports = function (e) {
                return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
            };
        }, function (e, t) {
            e.exports = function (e) {
                if (null == e)
                    throw TypeError("Can't call method on  " + e);
                return e;
            };
        }, function (e, t, n) {
            var r = n(10);
            e.exports = function (e, t) {
                if (!r(e))
                    return e;
                var n, o;
                if (t && "function" == typeof (n = e.toString) && !r(o = n.call(e)))
                    return o;
                if ("function" == typeof (n = e.valueOf) && !r(o = n.call(e)))
                    return o;
                if (!t && "function" == typeof (n = e.toString) && !r(o = n.call(e)))
                    return o;
                throw TypeError("Can't convert object to primitive value");
            };
        }, function (e, t) {
            e.exports = {};
        }, function (e, t, n) {
            var r = n(50), o = n(29);
            e.exports = Object.keys || function (e) {
                return r(e, o);
            };
        }, function (e, t, n) {
            var r = n(28)("keys"), o = n(16);
            e.exports = function (e) {
                return r[e] || (r[e] = o(e));
            };
        }, function (e, t, n) {
            var r = n(12), o = n(3), i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
            (e.exports = function (e, t) {
                return i[e] || (i[e] = void 0 !== t ? t : {});
            })("versions", []).push({
                version: r.version,
                mode: n(11) ? "pure" : "global",
                copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
            });
        }, function (e, t) {
            e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
        }, function (e, t, n) {
            var r = n(6).f, o = n(4), i = n(9)("toStringTag");
            e.exports = function (e, t, n) {
                e && !o(e = n ? e : e.prototype, i) && r(e, i, {
                    configurable: !0,
                    value: t
                });
            };
        }, function (e, t, n) {
            t.f = n(9);
        }, function (e, t, n) {
            var r = n(3), o = n(12), i = n(11), a = n(31), s = n(6).f;
            e.exports = function (e) {
                var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
                "_" == e.charAt(0) || e in t || s(t, e, {
                    value: a.f(e)
                });
            };
        }, function (e, t) {
            t.f = {}.propertyIsEnumerable;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ACCESS_TOKEN = "access_token", t.ACCESS_TOKEN_Expire = "access_token_expire", t.REFRESH_TOKEN = "refresh_token", t.BASE_URL = "//tcb-api.tencentcloudapi.com/web";
        }, function (e, t, n) {
            "use strict";
            (function (e) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var n = function () {
                    function t(e) {
                        this.storageClass = "local" === e ? localStorage : "none" === e ? new r : sessionStorage;
                    }
                    return t.prototype.setStore = function (e, t, n) {
                        try {
                            if (!this.storageClass)
                                return;
                        }
                        catch (e) {
                            return;
                        }
                        var r, o = {};
                        o.version = n || "localCachev1", o.content = t, r = JSON.stringify(o);
                        try {
                            this.storageClass.setItem(e, r);
                        }
                        catch (e) {
                            return;
                        }
                    }, t.prototype.getStore = function (t, n) {
                        try {
                            if (e && e.env && e.env.tcb_token)
                                return e.env.tcb_token;
                            if (!this.storageClass)
                                return;
                        }
                        catch (e) {
                            return "";
                        }
                        n = n || "localCachev1";
                        var r = this.storageClass.getItem(t);
                        return r && r.indexOf(n) >= 0 ? JSON.parse(r).content : "";
                    }, t.prototype.removeStore = function (e) {
                        this.storageClass.removeItem(e);
                    }, t;
                }();
                t.Cache = n;
                var r = function () {
                    function e() {
                        window.tcbObject || (window.tcbObject = {});
                    }
                    return e.prototype.setItem = function (e, t) {
                        window.tcbObject[e] = t;
                    }, e.prototype.getItem = function (e) {
                        return window.tcbObject[e];
                    }, e.prototype.removeItem = function (e) {
                        delete window.tcbObject[e];
                    }, e.prototype.clear = function () {
                        delete window.tcbObject;
                    }, e;
                }();
            }).call(this, n(60));
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = new (n(123));
            t.addEventListener = function (e, t) {
                r.on(e, t);
            }, t.activateEvent = function (e, t) {
                r.emit(e, t);
            };
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getQuery = function (e, t) {
                if ("undefined" == typeof window)
                    return !1;
                var n = t || window.location.search, r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), o = n.substr(n.indexOf("?") + 1).match(r);
                return null != o ? o[2] : "";
            }, t.getHash = function (e) {
                var t = window.location.hash.match(new RegExp("[#?&/]" + e + "=([^&#]*)"));
                return t ? t[1] : "";
            }, t.removeParam = function (e, t) {
                var n = t.split("?")[0], r = [], o = -1 !== t.indexOf("?") ? t.split("?")[1] : "";
                if ("" !== o) {
                    for (var i = (r = o.split("&")).length - 1; i >= 0; i -= 1)
                        r[i].split("=")[0] === e && r.splice(i, 1);
                    n = n + "?" + r.join("&");
                }
                return n;
            }, t.createPromiseCallback = function () {
                var e;
                if (!Promise) {
                    (e = function () { }).promise = {};
                    var t = function () {
                        throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');
                    };
                    return Object.defineProperty(e.promise, "then", {
                        get: t
                    }), Object.defineProperty(e.promise, "catch", {
                        get: t
                    }), e;
                }
                var n = new Promise(function (t, n) {
                    e = function (e, r) {
                        return e ? n(e) : t(r);
                    };
                });
                return e.promise = n, e;
            }, t.getWeixinCode = function () {
                return t.getQuery("code") || t.getHash("code");
            };
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(18), o = n(131), i = n(135), a = n(41), s = n(136), c = function () {
                function e(e) {
                    this.config = e, this.Geo = r, this.serverDate = a.ServerDateConstructor, this.command = i.Command, this.RegExp = s.RegExpConstructor;
                }
                return e.prototype.collection = function (e) {
                    if (!e)
                        throw new Error("Collection name is required");
                    return new o.CollectionReference(this, e);
                }, e.prototype.createCollection = function (t) {
                    var n = {
                        collectionName: t
                    };
                    return new e.reqClass(this.config).send("database.addCollection", n);
                }, e;
            }();
            t.Db = c;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(66), o = n(0), i = n(2), a = function () {
                function e(e, t) {
                    r.Validate.isGeopoint("longitude", e), r.Validate.isGeopoint("latitude", t), this.longitude = e, this.latitude = t;
                }
                return e.prototype.parse = function (e) {
                    var t;
                    return (t = {})[e] = {
                        type: "Point",
                        coordinates: [this.longitude, this.latitude]
                    }, t;
                }, e.prototype.toJSON = function () {
                    return {
                        type: "Point",
                        coordinates: [this.longitude, this.latitude]
                    };
                }, e.prototype.toReadableString = function () {
                    return "[" + this.longitude + "," + this.latitude + "]";
                }, e.validate = function (e) {
                    return "Point" === e.type && i.isArray(e.coordinates) && r.Validate.isGeopoint("longitude", e.coordinates[0]) && r.Validate.isGeopoint("latitude", e.coordinates[1]);
                }, Object.defineProperty(e.prototype, "_internalType", {
                    get: function () {
                        return o.SYMBOL_GEO_POINT;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e;
            }();
            t.Point = a;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(67), o = n(18), i = n(41), a = function () {
                function e() { }
                return e.formatResDocumentData = function (t) {
                    return t.map(function (t) {
                        return e.formatField(t);
                    });
                }, e.formatField = function (t) {
                    var n = Object.keys(t), i = {};
                    return Array.isArray(t) && (i = []), n.forEach(function (n) {
                        var a, s = t[n];
                        switch (e.whichType(s)) {
                            case r.FieldType.GeoPoint:
                                a = new o.Point(s.coordinates[0], s.coordinates[1]);
                                break;
                            case r.FieldType.GeoLineString:
                                a = new o.LineString(s.coordinates.map(function (e) {
                                    return new o.Point(e[0], e[1]);
                                }));
                                break;
                            case r.FieldType.GeoPolygon:
                                a = new o.Polygon(s.coordinates.map(function (e) {
                                    return new o.LineString(e.map(function (e) {
                                        var t = e[0], n = e[1];
                                        return new o.Point(t, n);
                                    }));
                                }));
                                break;
                            case r.FieldType.GeoMultiPoint:
                                a = new o.MultiPoint(s.coordinates.map(function (e) {
                                    return new o.Point(e[0], e[1]);
                                }));
                                break;
                            case r.FieldType.GeoMultiLineString:
                                a = new o.MultiLineString(s.coordinates.map(function (e) {
                                    return new o.LineString(e.map(function (e) {
                                        var t = e[0], n = e[1];
                                        return new o.Point(t, n);
                                    }));
                                }));
                                break;
                            case r.FieldType.GeoMultiPolygon:
                                a = new o.MultiPolygon(s.coordinates.map(function (e) {
                                    return new o.Polygon(e.map(function (e) {
                                        return new o.LineString(e.map(function (e) {
                                            var t = e[0], n = e[1];
                                            return new o.Point(t, n);
                                        }));
                                    }));
                                }));
                                break;
                            case r.FieldType.Timestamp:
                                a = new Date(1e3 * s.$timestamp);
                                break;
                            case r.FieldType.Object:
                            case r.FieldType.Array:
                                a = e.formatField(s);
                                break;
                            case r.FieldType.ServerDate:
                                a = new Date(s.$date);
                                break;
                            default:
                                a = s;
                        }
                        Array.isArray(i) ? i.push(a) : i[n] = a;
                    }), i;
                }, e.whichType = function (e) {
                    var t = Object.prototype.toString.call(e).slice(8, -1);
                    if (t === r.FieldType.Object) {
                        if (e instanceof o.Point)
                            return r.FieldType.GeoPoint;
                        if (e instanceof Date)
                            return r.FieldType.Timestamp;
                        if (e instanceof i.ServerDate)
                            return r.FieldType.ServerDate;
                        e.$timestamp ? t = r.FieldType.Timestamp : e.$date ? t = r.FieldType.ServerDate : o.Point.validate(e) ? t = r.FieldType.GeoPoint : o.LineString.validate(e) ? t = r.FieldType.GeoLineString : o.Polygon.validate(e) ? t = r.FieldType.GeoPolygon : o.MultiPoint.validate(e) ? t = r.FieldType.GeoMultiPoint : o.MultiLineString.validate(e) ? t = r.FieldType.GeoMultiLineString : o.MultiPolygon.validate(e) && (t = r.FieldType.GeoMultiPolygon);
                    }
                    return t;
                }, e.generateDocId = function () {
                    for (var e = "ABCDEFabcdef0123456789", t = "", n = 0; n < 24; n++)
                        t += e.charAt(Math.floor(Math.random() * e.length));
                    return t;
                }, e;
            }();
            t.Util = a;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(0), o = function () {
                function e(e) {
                    var t = (void 0 === e ? {} : e).offset, n = void 0 === t ? 0 : t;
                    this.offset = n;
                }
                return Object.defineProperty(e.prototype, "_internalType", {
                    get: function () {
                        return r.SYMBOL_SERVER_DATE;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.parse = function () {
                    return {
                        $date: {
                            offset: this.offset
                        }
                    };
                }, e;
            }();
            t.ServerDate = o, t.ServerDateConstructor = function (e) {
                return new o(e);
            };
        }, function (e, t, n) {
            "use strict";
            var r, o = this && this.__extends || (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                    e.__proto__ = t;
                } || function (e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n]);
                })(e, t);
            }, function (e, t) {
                function n() {
                    this.constructor = e;
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n);
            });
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = [], a = {}, s = function (e) {
                function t(t, n) {
                    if (n !== a)
                        throw new TypeError("InternalSymbol cannot be constructed with new operator");
                    return e.call(this, t) || this;
                }
                return o(t, e), t.for = function (e) {
                    for (var n = 0, r = i.length; n < r; n++)
                        if (i[n].target === e)
                            return i[n].instance;
                    var o = new t(e, a);
                    return i.push({
                        target: e,
                        instance: o
                    }), o;
                }, t;
            }(function () {
                return function (e) {
                    Object.defineProperties(this, {
                        target: {
                            enumerable: !1,
                            writable: !1,
                            configurable: !1,
                            value: e
                        }
                    });
                };
            }());
            t.InternalSymbol = s, t.default = s;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(0), o = n(39), i = n(2), a = function () {
                function e(e) {
                    if (!i.isArray(e))
                        throw new TypeError('"points" must be of type Point[]. Received type ' + typeof e);
                    if (e.length < 2)
                        throw new Error('"points" must contain 2 points at least');
                    e.forEach(function (e) {
                        if (!(e instanceof o.Point))
                            throw new TypeError('"points" must be of type Point[]. Received type ' + typeof e + "[]");
                    }), this.points = e;
                }
                return e.prototype.parse = function (e) {
                    var t;
                    return (t = {})[e] = {
                        type: "LineString",
                        coordinates: this.points.map(function (e) {
                            return e.toJSON().coordinates;
                        })
                    }, t;
                }, e.prototype.toJSON = function () {
                    return {
                        type: "LineString",
                        coordinates: this.points.map(function (e) {
                            return e.toJSON().coordinates;
                        })
                    };
                }, e.validate = function (e) {
                    if ("LineString" !== e.type || !i.isArray(e.coordinates))
                        return !1;
                    for (var t = 0, n = e.coordinates; t < n.length; t++) {
                        var r = n[t];
                        if (!i.isNumber(r[0]) || !i.isNumber(r[1]))
                            return !1;
                    }
                    return !0;
                }, e.isClosed = function (e) {
                    var t = e.points[0], n = e.points[e.points.length - 1];
                    if (t.latitude === n.latitude && t.longitude === n.longitude)
                        return !0;
                }, Object.defineProperty(e.prototype, "_internalType", {
                    get: function () {
                        return r.SYMBOL_GEO_LINE_STRING;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e;
            }();
            t.LineString = a;
        }, function (e, t, n) {
            "use strict";
            var r = n(11), o = n(45), i = n(48), a = n(5), s = n(25), c = n(84), u = n(30), f = n(91), p = n(9)("iterator"), l = !([].keys && "next" in [].keys()), d = function () {
                return this;
            };
            e.exports = function (e, t, n, h, y, m, v) {
                c(n, t, h);
                var _, g, O, b = function (e) {
                    if (!l && e in S)
                        return S[e];
                    switch (e) {
                        case "keys":
                        case "values":
                            return function () {
                                return new n(this, e);
                            };
                    }
                    return function () {
                        return new n(this, e);
                    };
                }, E = t + " Iterator", w = "values" == y, T = !1, S = e.prototype, A = S[p] || S["@@iterator"] || y && S[y], L = A || b(y), P = y ? w ? b("entries") : L : void 0, M = "Array" == t && S.entries || A;
                if (M && (O = f(M.call(new e))) !== Object.prototype && O.next && (u(O, E, !0), r || "function" == typeof O[p] || a(O, p, d)), w && A && "values" !== A.name && (T = !0, L = function () {
                    return A.call(this);
                }), r && !v || !l && !T && S[p] || a(S, p, L), s[t] = L, s[E] = d, y)
                    if (_ = {
                        values: w ? L : b("values"),
                        keys: m ? L : b("keys"),
                        entries: P
                    }, v)
                        for (g in _)
                            g in S || i(S, g, _[g]);
                    else
                        o(o.P + o.F * (l || T), t, _);
                return _;
            };
        }, function (e, t, n) {
            var r = n(3), o = n(12), i = n(82), a = n(5), s = n(4), c = function (e, t, n) {
                var u, f, p, l = e & c.F, d = e & c.G, h = e & c.S, y = e & c.P, m = e & c.B, v = e & c.W, _ = d ? o : o[t] || (o[t] = {}), g = _.prototype, O = d ? r : h ? r[t] : (r[t] || {}).prototype;
                for (u in d && (n = t), n)
                    (f = !l && O && void 0 !== O[u]) && s(_, u) || (p = f ? O[u] : n[u], _[u] = d && "function" != typeof O[u] ? n[u] : m && f ? i(p, r) : v && O[u] == p ? function (e) {
                        var t = function (t, n, r) {
                            if (this instanceof e) {
                                switch (arguments.length) {
                                    case 0:
                                        return new e;
                                    case 1:
                                        return new e(t);
                                    case 2:
                                        return new e(t, n);
                                }
                                return new e(t, n, r);
                            }
                            return e.apply(this, arguments);
                        };
                        return t.prototype = e.prototype, t;
                    }(p) : y && "function" == typeof p ? i(Function.call, p) : p, y && ((_.virtual || (_.virtual = {}))[u] = p, e & c.R && g && !g[u] && a(g, u, p)));
            };
            c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
        }, function (e, t, n) {
            e.exports = !n(7) && !n(14)(function () {
                return 7 != Object.defineProperty(n(47)("div"), "a", {
                    get: function () {
                        return 7;
                    }
                }).a;
            });
        }, function (e, t, n) {
            var r = n(10), o = n(3).document, i = r(o) && r(o.createElement);
            e.exports = function (e) {
                return i ? o.createElement(e) : {};
            };
        }, function (e, t, n) {
            e.exports = n(5);
        }, function (e, t, n) {
            var r = n(13), o = n(85), i = n(29), a = n(27)("IE_PROTO"), s = function () { }, c = function () {
                var e, t = n(47)("iframe"), r = i.length;
                for (t.style.display = "none", n(90).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; r--;)
                    delete c.prototype[i[r]];
                return c();
            };
            e.exports = Object.create || function (e, t) {
                var n;
                return null !== e ? (s.prototype = r(e), n = new s, s.prototype = null, n[a] = e) : n = c(), void 0 === t ? n : o(n, t);
            };
        }, function (e, t, n) {
            var r = n(4), o = n(8), i = n(87)(!1), a = n(27)("IE_PROTO");
            e.exports = function (e, t) {
                var n, s = o(e), c = 0, u = [];
                for (n in s)
                    n != a && r(s, n) && u.push(n);
                for (; t.length > c;)
                    r(s, n = t[c++]) && (~i(u, n) || u.push(n));
                return u;
            };
        }, function (e, t) {
            var n = {}.toString;
            e.exports = function (e) {
                return n.call(e).slice(8, -1);
            };
        }, function (e, t, n) {
            var r = n(23);
            e.exports = function (e) {
                return Object(r(e));
            };
        }, function (e, t) {
            t.f = Object.getOwnPropertySymbols;
        }, function (e, t, n) {
            var r = n(50), o = n(29).concat("length", "prototype");
            t.f = Object.getOwnPropertyNames || function (e) {
                return r(e, o);
            };
        }, function (e, t, n) {
            e.exports = n(107);
        }, function (e, t, n) {
            "use strict";
            e.exports = function (e, t) {
                return function () {
                    for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
                        n[r] = arguments[r];
                    return e.apply(t, n);
                };
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1);
            function o(e) {
                return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
            }
            e.exports = function (e, t, n) {
                if (!t)
                    return e;
                var i;
                if (n)
                    i = n(t);
                else if (r.isURLSearchParams(t))
                    i = t.toString();
                else {
                    var a = [];
                    r.forEach(t, function (e, t) {
                        null != e && (r.isArray(e) ? t += "[]" : e = [e], r.forEach(e, function (e) {
                            r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)), a.push(o(t) + "=" + o(e));
                        }));
                    }), i = a.join("&");
                }
                if (i) {
                    var s = e.indexOf("#");
                    -1 !== s && (e = e.slice(0, s)), e += (-1 === e.indexOf("?") ? "?" : "&") + i;
                }
                return e;
            };
        }, function (e, t, n) {
            "use strict";
            e.exports = function (e) {
                return !(!e || !e.__CANCEL__);
            };
        }, function (e, t, n) {
            "use strict";
            (function (t) {
                var r = n(1), o = n(113), i = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };
                function a(e, t) {
                    !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
                }
                var s, c = {
                    adapter: (void 0 !== t && "[object process]" === Object.prototype.toString.call(t) ? s = n(61) : "undefined" != typeof XMLHttpRequest && (s = n(61)), s),
                    transformRequest: [function (e, t) {
                            return o(t, "Accept"), o(t, "Content-Type"), r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (a(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : r.isObject(e) ? (a(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e;
                        }],
                    transformResponse: [function (e) {
                            if ("string" == typeof e)
                                try {
                                    e = JSON.parse(e);
                                }
                                catch (e) { }
                            return e;
                        }],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    validateStatus: function (e) {
                        return e >= 200 && e < 300;
                    }
                };
                c.headers = {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    }
                }, r.forEach(["delete", "get", "head"], function (e) {
                    c.headers[e] = {};
                }), r.forEach(["post", "put", "patch"], function (e) {
                    c.headers[e] = r.merge(i);
                }), e.exports = c;
            }).call(this, n(60));
        }, function (e, t) {
            var n, r, o = e.exports = {};
            function i() {
                throw new Error("setTimeout has not been defined");
            }
            function a() {
                throw new Error("clearTimeout has not been defined");
            }
            function s(e) {
                if (n === setTimeout)
                    return setTimeout(e, 0);
                if ((n === i || !n) && setTimeout)
                    return n = setTimeout, setTimeout(e, 0);
                try {
                    return n(e, 0);
                }
                catch (t) {
                    try {
                        return n.call(null, e, 0);
                    }
                    catch (t) {
                        return n.call(this, e, 0);
                    }
                }
            }
            !function () {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : i;
                }
                catch (e) {
                    n = i;
                }
                try {
                    r = "function" == typeof clearTimeout ? clearTimeout : a;
                }
                catch (e) {
                    r = a;
                }
            }();
            var c, u = [], f = !1, p = -1;
            function l() {
                f && c && (f = !1, c.length ? u = c.concat(u) : p = -1, u.length && d());
            }
            function d() {
                if (!f) {
                    var e = s(l);
                    f = !0;
                    for (var t = u.length; t;) {
                        for (c = u, u = []; ++p < t;)
                            c && c[p].run();
                        p = -1, t = u.length;
                    }
                    c = null, f = !1,
                        function (e) {
                            if (r === clearTimeout)
                                return clearTimeout(e);
                            if ((r === a || !r) && clearTimeout)
                                return r = clearTimeout, clearTimeout(e);
                            try {
                                r(e);
                            }
                            catch (t) {
                                try {
                                    return r.call(null, e);
                                }
                                catch (t) {
                                    return r.call(this, e);
                                }
                            }
                        }(e);
                }
            }
            function h(e, t) {
                this.fun = e, this.array = t;
            }
            function y() { }
            o.nextTick = function (e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                u.push(new h(e, t)), 1 !== u.length || f || s(d);
            }, h.prototype.run = function () {
                this.fun.apply(null, this.array);
            }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function (e) {
                return [];
            }, o.binding = function (e) {
                throw new Error("process.binding is not supported");
            }, o.cwd = function () {
                return "/";
            }, o.chdir = function (e) {
                throw new Error("process.chdir is not supported");
            }, o.umask = function () {
                return 0;
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1), o = n(114), i = n(57), a = n(116), s = n(117), c = n(62);
            e.exports = function (e) {
                return new Promise(function (t, u) {
                    var f = e.data, p = e.headers;
                    r.isFormData(f) && delete p["Content-Type"];
                    var l = new XMLHttpRequest;
                    if (e.auth) {
                        var d = e.auth.username || "", h = e.auth.password || "";
                        p.Authorization = "Basic " + btoa(d + ":" + h);
                    }
                    if (l.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0), l.timeout = e.timeout, l.onreadystatechange = function () {
                        if (l && 4 === l.readyState && (0 !== l.status || l.responseURL && 0 === l.responseURL.indexOf("file:"))) {
                            var n = "getAllResponseHeaders" in l ? a(l.getAllResponseHeaders()) : null, r = {
                                data: e.responseType && "text" !== e.responseType ? l.response : l.responseText,
                                status: l.status,
                                statusText: l.statusText,
                                headers: n,
                                config: e,
                                request: l
                            };
                            o(t, u, r), l = null;
                        }
                    }, l.onabort = function () {
                        l && (u(c("Request aborted", e, "ECONNABORTED", l)), l = null);
                    }, l.onerror = function () {
                        u(c("Network Error", e, null, l)), l = null;
                    }, l.ontimeout = function () {
                        u(c("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", l)), l = null;
                    }, r.isStandardBrowserEnv()) {
                        var y = n(118), m = (e.withCredentials || s(e.url)) && e.xsrfCookieName ? y.read(e.xsrfCookieName) : void 0;
                        m && (p[e.xsrfHeaderName] = m);
                    }
                    if ("setRequestHeader" in l && r.forEach(p, function (e, t) {
                        void 0 === f && "content-type" === t.toLowerCase() ? delete p[t] : l.setRequestHeader(t, e);
                    }), e.withCredentials && (l.withCredentials = !0), e.responseType)
                        try {
                            l.responseType = e.responseType;
                        }
                        catch (t) {
                            if ("json" !== e.responseType)
                                throw t;
                        }
                    "function" == typeof e.onDownloadProgress && l.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && l.upload && l.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
                        l && (l.abort(), u(e), l = null);
                    }), void 0 === f && (f = null), l.send(f);
                });
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(115);
            e.exports = function (e, t, n, o, i) {
                var a = new Error(e);
                return r(a, t, n, o, i);
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1);
            e.exports = function (e, t) {
                t = t || {};
                var n = {};
                return r.forEach(["url", "method", "params", "data"], function (e) {
                    void 0 !== t[e] && (n[e] = t[e]);
                }), r.forEach(["headers", "auth", "proxy"], function (o) {
                    r.isObject(t[o]) ? n[o] = r.deepMerge(e[o], t[o]) : void 0 !== t[o] ? n[o] = t[o] : r.isObject(e[o]) ? n[o] = r.deepMerge(e[o]) : void 0 !== e[o] && (n[o] = e[o]);
                }), r.forEach(["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"], function (r) {
                    void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r]);
                }), n;
            };
        }, function (e, t, n) {
            "use strict";
            function r(e) {
                this.message = e;
            }
            r.prototype.toString = function () {
                return "Cancel" + (this.message ? ": " + this.message : "");
            }, r.prototype.__CANCEL__ = !0, e.exports = r;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(17), o = n(35), i = n(34), a = function () {
                function e(e) {
                    this.httpRequest = new r.Request(e), this.cache = new o.Cache(e.persistence), this.accessTokenKey = i.ACCESS_TOKEN + "_" + e.env, this.accessTokenExpireKey = i.ACCESS_TOKEN_Expire + "_" + e.env, this.refreshTokenKey = i.REFRESH_TOKEN + "_" + e.env;
                }
                return e.prototype.setRefreshToken = function (e) {
                    this.cache.setStore(this.refreshTokenKey, e);
                }, e.prototype.getRefreshTokenByWXCode = function (e, t, n) {
                    var r = this;
                    return this.httpRequest.send("auth.getJwt", {
                        appid: e,
                        loginType: t,
                        code: n
                    }).then(function (e) {
                        if (e.code)
                            throw new Error("[tcb-js-sdk] 微信登录失败: " + e.code);
                        return e.refresh_token && r.cache.setStore(r.refreshTokenKey, e.refresh_token), e;
                    });
                }, e;
            }();
            t.default = a;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(67), o = n(40), i = function () {
                function e() { }
                return e.isGeopoint = function (e, t) {
                    if (o.Util.whichType(t) !== r.FieldType.Number)
                        throw new Error("Geo Point must be number type");
                    var n = Math.abs(t);
                    if ("latitude" === e && n > 90)
                        throw new Error("latitude should be a number ranges from -90 to 90");
                    if ("longitude" === e && n > 180)
                        throw new Error("longitude should be a number ranges from -180 to 180");
                    return !0;
                }, e.isInteger = function (e, t) {
                    if (!Number.isInteger(t))
                        throw new Error(e + r.ErrorCode.IntergerError);
                    return !0;
                }, e.isFieldOrder = function (e) {
                    if (-1 === r.OrderDirectionList.indexOf(e))
                        throw new Error(r.ErrorCode.DirectionError);
                    return !0;
                }, e.isFieldPath = function (e) {
                    if (!/^[a-zA-Z0-9-_\.]/.test(e))
                        throw new Error;
                    return !0;
                }, e.isOperator = function (e) {
                    if (-1 === r.WhereFilterOpList.indexOf(e))
                        throw new Error(r.ErrorCode.OpStrError);
                    return !0;
                }, e.isCollName = function (e) {
                    if (!/^[a-zA-Z0-9]([a-zA-Z0-9-_]){1,32}$/.test(e))
                        throw new Error(r.ErrorCode.CollNameError);
                    return !0;
                }, e.isDocID = function (e) {
                    if (!/^([a-fA-F0-9]){24}$/.test(e))
                        throw new Error(r.ErrorCode.DocIDError);
                    return !0;
                }, e;
            }();
            t.Validate = i;
        }, function (e, t, n) {
            "use strict";
            var r, o;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                function (e) {
                    e.DocIDError = "文档ID不合法", e.CollNameError = "集合名称不合法", e.OpStrError = "操作符不合法", e.DirectionError = "排序字符不合法", e.IntergerError = "must be integer";
                }(o || (o = {})), t.ErrorCode = o;
            t.FieldType = {
                String: "String",
                Number: "Number",
                Object: "Object",
                Array: "Array",
                Boolean: "Boolean",
                Null: "Null",
                GeoPoint: "GeoPoint",
                GeoLineString: "GeoLineString",
                GeoPolygon: "GeoPolygon",
                GeoMultiPoint: "GeoMultiPoint",
                GeoMultiLineString: "GeoMultiLineString",
                GeoMultiPolygon: "GeoMultiPolygon",
                Timestamp: "Date",
                Command: "Command",
                ServerDate: "ServerDate"
            };
            t.OrderDirectionList = ["desc", "asc"];
            var i;
            t.WhereFilterOpList = ["<", "<=", "==", ">=", ">"],
                function (e) {
                    e.lt = "<", e.gt = ">", e.lte = "<=", e.gte = ">=", e.eq = "==";
                }(i || (i = {})), t.Opeartor = i;
            var a = ((r = {})[i.eq] = "$eq", r[i.lt] = "$lt", r[i.lte] = "$lte", r[i.gt] = "$gt", r[i.gte] = "$gte", r);
            t.OperatorMap = a;
            t.UpdateOperatorList = ["$set", "$inc", "$mul", "$unset", "$push", "$pop", "$unshift", "$shift", "$currentDate", "$each", "$position"];
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(0), o = n(2), i = n(43), a = function () {
                function e(e) {
                    if (!o.isArray(e))
                        throw new TypeError('"lines" must be of type LineString[]. Received type ' + typeof e);
                    if (0 === e.length)
                        throw new Error("Polygon must contain 1 linestring at least");
                    e.forEach(function (e) {
                        if (!(e instanceof i.LineString))
                            throw new TypeError('"lines" must be of type LineString[]. Received type ' + typeof e + "[]");
                        if (!i.LineString.isClosed(e))
                            throw new Error("LineString " + e.points.map(function (e) {
                                return e.toReadableString();
                            }) + " is not a closed cycle");
                    }), this.lines = e;
                }
                return e.prototype.parse = function (e) {
                    var t;
                    return (t = {})[e] = {
                        type: "Polygon",
                        coordinates: this.lines.map(function (e) {
                            return e.points.map(function (e) {
                                return [e.longitude, e.latitude];
                            });
                        })
                    }, t;
                }, e.prototype.toJSON = function () {
                    return {
                        type: "Polygon",
                        coordinates: this.lines.map(function (e) {
                            return e.points.map(function (e) {
                                return [e.longitude, e.latitude];
                            });
                        })
                    };
                }, e.validate = function (e) {
                    if ("Polygon" !== e.type || !o.isArray(e.coordinates))
                        return !1;
                    for (var t = 0, n = e.coordinates; t < n.length; t++) {
                        var r = n[t];
                        if (!this.isCloseLineString(r))
                            return !1;
                        for (var i = 0, a = r; i < a.length; i++) {
                            var s = a[i];
                            if (!o.isNumber(s[0]) || !o.isNumber(s[1]))
                                return !1;
                        }
                    }
                    return !0;
                }, e.isCloseLineString = function (e) {
                    var t = e[0], n = e[e.length - 1];
                    return t[0] === n[0] && t[1] === n[1];
                }, Object.defineProperty(e.prototype, "_internalType", {
                    get: function () {
                        return r.SYMBOL_GEO_MULTI_POLYGON;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e;
            }();
            t.Polygon = a;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.createPromiseCallback = function () {
                var e;
                if (!Promise) {
                    (e = function () { }).promise = {};
                    var t = function () {
                        throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');
                    };
                    return Object.defineProperty(e.promise, "then", {
                        get: t
                    }), Object.defineProperty(e.promise, "catch", {
                        get: t
                    }), e;
                }
                var n = new Promise(function (t, n) {
                    e = function (e, r) {
                        return e ? n(e) : t(r);
                    };
                });
                return e.promise = n, e;
            };
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(19), o = n(0), i = n(2), a = n(71), s = n(72), c = function () {
                function e() { }
                return e.encode = function (t) {
                    return (new e).encodeUpdate(t);
                }, e.prototype.encodeUpdate = function (e) {
                    return r.isUpdateCommand(e) ? this.encodeUpdateCommand(e) : "object" === i.getType(e) ? this.encodeUpdateObject(e) : e;
                }, e.prototype.encodeUpdateCommand = function (e) {
                    if (e.fieldName === o.SYMBOL_UNSET_FIELD_NAME)
                        throw new Error("Cannot encode a comparison command with unset field name");
                    switch (e.operator) {
                        case r.UPDATE_COMMANDS_LITERAL.SET:
                        case r.UPDATE_COMMANDS_LITERAL.REMOVE:
                        case r.UPDATE_COMMANDS_LITERAL.INC:
                        case r.UPDATE_COMMANDS_LITERAL.MUL:
                            return this.encodeFieldUpdateCommand(e);
                        case r.UPDATE_COMMANDS_LITERAL.PUSH:
                        case r.UPDATE_COMMANDS_LITERAL.POP:
                        case r.UPDATE_COMMANDS_LITERAL.SHIFT:
                        case r.UPDATE_COMMANDS_LITERAL.UNSHIFT:
                            return this.encodeArrayUpdateCommand(e);
                        default:
                            return this.encodeFieldUpdateCommand(e);
                    }
                }, e.prototype.encodeFieldUpdateCommand = function (e) {
                    var t, n, o, i, s = a.operatorToString(e.operator);
                    switch (e.operator) {
                        case r.UPDATE_COMMANDS_LITERAL.REMOVE:
                            return (t = {})[s] = ((n = {})[e.fieldName] = "", n), t;
                        case r.UPDATE_COMMANDS_LITERAL.SET:
                        case r.UPDATE_COMMANDS_LITERAL.INC:
                        case r.UPDATE_COMMANDS_LITERAL.MUL:
                        default:
                            return (o = {})[s] = ((i = {})[e.fieldName] = e.operands[0], i), o;
                    }
                }, e.prototype.encodeArrayUpdateCommand = function (e) {
                    var t, n, o, i, c, u, f, p, l, d, h = a.operatorToString(e.operator);
                    switch (e.operator) {
                        case r.UPDATE_COMMANDS_LITERAL.PUSH:
                            var y = {
                                $each: e.operands.map(s.encodeInternalDataType)
                            };
                            return (t = {})[h] = ((n = {})[e.fieldName] = y, n), t;
                        case r.UPDATE_COMMANDS_LITERAL.UNSHIFT:
                            y = {
                                $each: e.operands.map(s.encodeInternalDataType),
                                $position: 0
                            };
                            return (o = {})[h] = ((i = {})[e.fieldName] = y, i), o;
                        case r.UPDATE_COMMANDS_LITERAL.POP:
                            return (c = {})[h] = ((u = {})[e.fieldName] = 1, u), c;
                        case r.UPDATE_COMMANDS_LITERAL.SHIFT:
                            return (f = {})[h] = ((p = {})[e.fieldName] = -1, p), f;
                        default:
                            return (l = {})[h] = ((d = {})[e.fieldName] = s.encodeInternalDataType(e.operands), d), l;
                    }
                }, e.prototype.encodeUpdateObject = function (e) {
                    var t = s.flattenQueryObject(e);
                    for (var n in t)
                        if (!/^\$/.test(n)) {
                            var o = t[n];
                            if (r.isUpdateCommand(o)) {
                                t[n] = o._setFieldName(n);
                                var i = this.encodeUpdateCommand(t[n]);
                                s.mergeConditionAfterEncode(t, i, n);
                            }
                            else {
                                t[n] = o = s.encodeInternalDataType(o);
                                var a = new r.UpdateCommand(r.UPDATE_COMMANDS_LITERAL.SET, [o], n);
                                i = this.encodeUpdateCommand(a);
                                s.mergeConditionAfterEncode(t, i, n);
                            }
                        }
                    return t;
                }, e;
            }();
            t.UpdateSerializer = c;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(20), o = n(21), i = n(19);
            for (var a in t.OperatorMap = {}, r.QUERY_COMMANDS_LITERAL)
                t.OperatorMap[a] = "$" + a.toLowerCase();
            for (var a in o.LOGIC_COMMANDS_LITERAL)
                t.OperatorMap[a] = "$" + a.toLowerCase();
            for (var a in i.UPDATE_COMMANDS_LITERAL)
                t.OperatorMap[a] = "$" + a.toLowerCase();
            t.OperatorMap[r.QUERY_COMMANDS_LITERAL.NEQ] = "$ne", t.OperatorMap[i.UPDATE_COMMANDS_LITERAL.REMOVE] = "$unset", t.OperatorMap[i.UPDATE_COMMANDS_LITERAL.SHIFT] = "$pop", t.OperatorMap[i.UPDATE_COMMANDS_LITERAL.UNSHIFT] = "$push", t.operatorToString = function (e) {
                return t.OperatorMap[e] || "$" + e.toLowerCase();
            };
        }, function (e, t, n) {
            "use strict";
            var r = this && this.__assign || function () {
                return (r = Object.assign || function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                }).apply(this, arguments);
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(2), i = n(73);
            function a(e, t, n, i) {
                var s = r({}, e);
                for (var c in e)
                    if (!/^\$/.test(c)) {
                        var u = e[c];
                        if (u && o.isObject(u) && !t(u)) {
                            if (i.indexOf(u) > -1)
                                throw new Error("Cannot convert circular structure to JSON");
                            var f = a(u, t, n.concat([c]), i.concat([u]));
                            s[c] = f;
                            var p = !1;
                            for (var l in f)
                                /^\$/.test(l) ? p = !0 : (s[c + "." + l] = f[l], delete s[c][l]);
                            p || delete s[c];
                        }
                    }
                return s;
            }
            function s(e) {
                return o.isInternalObject(e) || o.isDate(e) || o.isRegExp(e);
            }
            t.flattenQueryObject = function (e) {
                return a(e, s, [], [e]);
            }, t.flattenObject = function (e) {
                return a(e, function (e) {
                    return !1;
                }, [], [e]);
            }, t.mergeConditionAfterEncode = function (e, t, n) {
                for (var r in t[n] || delete e[n], t)
                    e[r] ? o.isArray(e[r]) ? e[r].push(t[r]) : o.isObject(e[r]) ? o.isObject(t[r]) ? Object.assign(e[r], t[r]) : (console.warn("unmergable condition, query is object but condition is " + o.getType(t) + ", can only overwrite", t, n), e[r] = t[r]) : (console.warn("to-merge query is of type " + o.getType(e) + ", can only overwrite", e, t, n), e[r] = t[r]) : e[r] = t[r];
            }, t.isConversionRequired = s, t.encodeInternalDataType = function (e) {
                return i.serialize(e);
            }, t.decodeInternalDataType = function (e) {
                return i.deserialize(e);
            };
        }, function (e, t, n) {
            "use strict";
            var r = this && this.__assign || function () {
                return (r = Object.assign || function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                }).apply(this, arguments);
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(0), i = n(2), a = n(18), s = n(41);
            t.serialize = function (e) {
                return function e(t, n) {
                    if (!i.isInternalObject(t)) {
                        if (i.isDate(t))
                            return {
                                $date: +t
                            };
                        if (i.isRegExp(t))
                            return {
                                $regex: t.source,
                                $options: t.flags
                            };
                        if (i.isArray(t))
                            return t.map(function (t) {
                                if (n.indexOf(t) > -1)
                                    throw new Error("Cannot convert circular structure to JSON");
                                return e(t, n.concat([t]));
                            });
                        if (i.isObject(t)) {
                            var a = r({}, t);
                            for (var s in a) {
                                if (n.indexOf(a[s]) > -1)
                                    throw new Error("Cannot convert circular structure to JSON");
                                a[s] = e(a[s], n.concat([a[s]]));
                            }
                            return a;
                        }
                        return t;
                    }
                    switch (t._internalType) {
                        case o.SYMBOL_GEO_POINT:
                            return t.toJSON();
                        case o.SYMBOL_SERVER_DATE:
                        case o.SYMBOL_REGEXP:
                            return t.parse();
                        default:
                            return t.toJSON ? t.toJSON() : t;
                    }
                }(e, [e]);
            }, t.deserialize = function (e) {
                var t = r({}, e);
                for (var n in t)
                    switch (n) {
                        case "$date":
                            switch (i.getType(t[n])) {
                                case "number":
                                    return new Date(t[n]);
                                case "object":
                                    return new s.ServerDate(t[n]);
                            }
                            break;
                        case "type":
                            switch (t.type) {
                                case "Point":
                                    if (i.isArray(t.coordinates) && i.isNumber(t.coordinates[0]) && i.isNumber(t.coordinates[1]))
                                        return new a.Point(t.coordinates[0], t.coordinates[1]);
                            }
                    }
                return e;
            };
        }, function (e, t, n) {
            e.exports = n(75);
        }, function (e, t, n) {
            "use strict";
            var r = function () {
                return (r = Object.assign || function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                }).apply(this, arguments);
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(76), i = n(124), a = n(126), s = n(17), c = n(36), u = n(127).Db;
            function f(e) {
                this.config = e || this.config, this.authObj = void 0;
            }
            function p(e, t) {
                return function (e, t) {
                    for (var n in e)
                        e.hasOwnProperty(n) && t(e[n], n);
                }(t, function (n, r) {
                    e[r] = t[r];
                }), e;
            }
            f.prototype.init = function (e) {
                return this.config = {
                    env: e.env,
                    timeout: e.timeout || 15e3
                }, new f(this.config);
            }, f.prototype.database = function (e) {
                if (u.reqClass = s.Request, this.authObj)
                    return u.getAccessToken = this.authObj.getAccessToken.bind(this.authObj), u.ws || (u.ws = null), new u(r({}, this.config, e));
                console.warn("需要app.auth()授权");
            }, f.prototype.auth = function (e) {
                var t = (void 0 === e ? {} : e).persistence;
                return this.authObj ? (console.warn("tcb实例只存在一个auth对象"), this.authObj) : (Object.assign(this.config, {
                    persistence: t || "session"
                }), this.authObj = new i.default(this.config), this.authObj);
            }, f.prototype.on = c.addEventListener.bind(f), p(f.prototype, a), p(f.prototype, o);
            var l = new f;
            try {
                window.tcb = l;
            }
            catch (e) { }
            t.default = l, e.exports = l;
        }, function (e, t, n) {
            "use strict";
            var r, o = n(77), i = (r = o) && r.__esModule ? r : {
                default: r
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var a = n(55), s = n(17), c = n(37);
            t.uploadFile = function (e, t) {
                var n = e.cloudPath, r = e.filePath, o = e.onUploadProgress;
                t = t || c.createPromiseCallback();
                return new s.Request(this.config).send("storage.getUploadMetadata", {
                    path: n
                }).then(function (e) {
                    var i = e.data, s = i.url, c = i.authorization, u = i.token, f = i.fileId, p = i.cosFileId, l = e.requestId, d = new FormData;
                    d.append("key", n), d.append("signature", c), d.append("x-cos-meta-fileid", p), d.append("success_action_status", "201"), d.append("x-cos-security-token", u), d.append("file", r), a.default.post(s, d, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        onUploadProgress: o
                    }).then(function (e) {
                        201 === e.status ? t(null, {
                            fileID: f,
                            requestId: l
                        }) : t(new Error("STORAGE_REQUEST_FAIL: " + e.data));
                    }).catch(function (e) {
                        t(e);
                    });
                }).catch(function (e) {
                    t(e);
                }), t.promise;
            }, t.deleteFile = function (e, t) {
                var n = e.fileList;
                if (t = t || c.createPromiseCallback(), !n || !Array.isArray(n))
                    return {
                        code: "INVALID_PARAM",
                        message: "fileList必须是非空的数组"
                    };
                for (var r = 0, o = n; r < o.length; r++) {
                    var i = o[r];
                    if (!i || "string" != typeof i)
                        return {
                            code: "INVALID_PARAM",
                            message: "fileList的元素必须是非空的字符串"
                        };
                }
                var a = {
                    fileid_list: n
                };
                return new s.Request(this.config).send("storage.batchDeleteFile", a).then(function (e) {
                    e.code ? t(null, e) : t(null, {
                        fileList: e.data.delete_list,
                        requestId: e.requestId
                    });
                }).catch(function (e) {
                    t(e);
                }), t.promise;
            }, t.getTempFileURL = function (e, t) {
                var n = e.fileList;
                t = t || c.createPromiseCallback(), n && Array.isArray(n) || t(null, {
                    code: "INVALID_PARAM",
                    message: "fileList必须是非空的数组"
                });
                for (var r = [], o = 0, a = n; o < a.length; o++) {
                    var u = a[o];
                    "object" === (void 0 === u ? "undefined" : (0, i.default)(u)) ? (u.hasOwnProperty("fileID") && u.hasOwnProperty("maxAge") || t(null, {
                        code: "INVALID_PARAM",
                        message: "fileList的元素必须是包含fileID和maxAge的对象"
                    }), r.push({
                        fileid: u.fileID,
                        max_age: u.maxAge
                    })) : "string" == typeof u ? r.push({
                        fileid: u
                    }) : t(null, {
                        code: "INVALID_PARAM",
                        message: "fileList的元素必须是字符串"
                    });
                }
                var f = {
                    file_list: r
                };
                return new s.Request(this.config).send("storage.batchGetDownloadUrl", f).then(function (e) {
                    e.code ? t(null, e) : t(null, {
                        fileList: e.data.download_list,
                        requestId: e.requestId
                    });
                }).catch(function (e) {
                    t(e);
                }), t.promise;
            }, t.downloadFile = function (e, n) {
                var r = e.fileID;
                return n = n || c.createPromiseCallback(), t.getTempFileURL.call(this, {
                    fileList: [{
                            fileID: r,
                            maxAge: 600
                        }]
                }).then(function (e) {
                    var t = e.fileList[0];
                    if ("SUCCESS" === t.code) {
                        var r = t.download_url;
                        r = encodeURI(r), a.default.get(r, {
                            responseType: "blob"
                        }).then(function (e) {
                            var t = window.URL.createObjectURL(new Blob([e.data])), n = document.createElement("a");
                            n.href = t, n.setAttribute("download", "file.pdf"), document.body.appendChild(n), n.click();
                        });
                    }
                    else
                        n(t);
                }), n.promise;
            };
        }, function (e, t, n) {
            "use strict";
            t.__esModule = !0;
            var r = a(n(78)), o = a(n(96)), i = "function" == typeof o.default && "symbol" == typeof r.default ? function (e) {
                return typeof e;
            } : function (e) {
                return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : typeof e;
            };
            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            }
            t.default = "function" == typeof o.default && "symbol" === i(r.default) ? function (e) {
                return void 0 === e ? "undefined" : i(e);
            } : function (e) {
                return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : void 0 === e ? "undefined" : i(e);
            };
        }, function (e, t, n) {
            e.exports = {
                default: n(79),
                __esModule: !0
            };
        }, function (e, t, n) {
            n(80), n(92), e.exports = n(31).f("iterator");
        }, function (e, t, n) {
            "use strict";
            var r = n(81)(!0);
            n(44)(String, "String", function (e) {
                this._t = String(e), this._i = 0;
            }, function () {
                var e, t = this._t, n = this._i;
                return n >= t.length ? {
                    value: void 0,
                    done: !0
                } : (e = r(t, n), this._i += e.length, {
                    value: e,
                    done: !1
                });
            });
        }, function (e, t, n) {
            var r = n(22), o = n(23);
            e.exports = function (e) {
                return function (t, n) {
                    var i, a, s = String(o(t)), c = r(n), u = s.length;
                    return c < 0 || c >= u ? e ? "" : void 0 : (i = s.charCodeAt(c)) < 55296 || i > 56319 || c + 1 === u || (a = s.charCodeAt(c + 1)) < 56320 || a > 57343 ? e ? s.charAt(c) : i : e ? s.slice(c, c + 2) : a - 56320 + (i - 55296 << 10) + 65536;
                };
            };
        }, function (e, t, n) {
            var r = n(83);
            e.exports = function (e, t, n) {
                if (r(e), void 0 === t)
                    return e;
                switch (n) {
                    case 1:
                        return function (n) {
                            return e.call(t, n);
                        };
                    case 2:
                        return function (n, r) {
                            return e.call(t, n, r);
                        };
                    case 3:
                        return function (n, r, o) {
                            return e.call(t, n, r, o);
                        };
                }
                return function () {
                    return e.apply(t, arguments);
                };
            };
        }, function (e, t) {
            e.exports = function (e) {
                if ("function" != typeof e)
                    throw TypeError(e + " is not a function!");
                return e;
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(49), o = n(15), i = n(30), a = {};
            n(5)(a, n(9)("iterator"), function () {
                return this;
            }), e.exports = function (e, t, n) {
                e.prototype = r(a, {
                    next: o(1, n)
                }), i(e, t + " Iterator");
            };
        }, function (e, t, n) {
            var r = n(6), o = n(13), i = n(26);
            e.exports = n(7) ? Object.defineProperties : function (e, t) {
                o(e);
                for (var n, a = i(t), s = a.length, c = 0; s > c;)
                    r.f(e, n = a[c++], t[n]);
                return e;
            };
        }, function (e, t, n) {
            var r = n(51);
            e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
                return "String" == r(e) ? e.split("") : Object(e);
            };
        }, function (e, t, n) {
            var r = n(8), o = n(88), i = n(89);
            e.exports = function (e) {
                return function (t, n, a) {
                    var s, c = r(t), u = o(c.length), f = i(a, u);
                    if (e && n != n) {
                        for (; u > f;)
                            if ((s = c[f++]) != s)
                                return !0;
                    }
                    else
                        for (; u > f; f++)
                            if ((e || f in c) && c[f] === n)
                                return e || f || 0;
                    return !e && -1;
                };
            };
        }, function (e, t, n) {
            var r = n(22), o = Math.min;
            e.exports = function (e) {
                return e > 0 ? o(r(e), 9007199254740991) : 0;
            };
        }, function (e, t, n) {
            var r = n(22), o = Math.max, i = Math.min;
            e.exports = function (e, t) {
                return (e = r(e)) < 0 ? o(e + t, 0) : i(e, t);
            };
        }, function (e, t, n) {
            var r = n(3).document;
            e.exports = r && r.documentElement;
        }, function (e, t, n) {
            var r = n(4), o = n(52), i = n(27)("IE_PROTO"), a = Object.prototype;
            e.exports = Object.getPrototypeOf || function (e) {
                return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null;
            };
        }, function (e, t, n) {
            n(93);
            for (var r = n(3), o = n(5), i = n(25), a = n(9)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < s.length; c++) {
                var u = s[c], f = r[u], p = f && f.prototype;
                p && !p[a] && o(p, a, u), i[u] = i.Array;
            }
        }, function (e, t, n) {
            "use strict";
            var r = n(94), o = n(95), i = n(25), a = n(8);
            e.exports = n(44)(Array, "Array", function (e, t) {
                this._t = a(e), this._i = 0, this._k = t;
            }, function () {
                var e = this._t, t = this._k, n = this._i++;
                return !e || n >= e.length ? (this._t = void 0, o(1)) : o(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);
            }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");
        }, function (e, t) {
            e.exports = function () { };
        }, function (e, t) {
            e.exports = function (e, t) {
                return {
                    value: t,
                    done: !!e
                };
            };
        }, function (e, t, n) {
            e.exports = {
                default: n(97),
                __esModule: !0
            };
        }, function (e, t, n) {
            n(98), n(104), n(105), n(106), e.exports = n(12).Symbol;
        }, function (e, t, n) {
            "use strict";
            var r = n(3), o = n(4), i = n(7), a = n(45), s = n(48), c = n(99).KEY, u = n(14), f = n(28), p = n(30), l = n(16), d = n(9), h = n(31), y = n(32), m = n(100), v = n(101), _ = n(13), g = n(10), O = n(52), b = n(8), E = n(24), w = n(15), T = n(49), S = n(102), A = n(103), L = n(53), P = n(6), M = n(26), N = A.f, C = P.f, I = S.f, D = r.Symbol, R = r.JSON, j = R && R.stringify, x = d("_hidden"), U = d("toPrimitive"), k = {}.propertyIsEnumerable, q = f("symbol-registry"), F = f("symbols"), G = f("op-symbols"), Q = Object.prototype, B = "function" == typeof D && !!L.f, Y = r.QObject, H = !Y || !Y.prototype || !Y.prototype.findChild, $ = i && u(function () {
                return 7 != T(C({}, "a", {
                    get: function () {
                        return C(this, "a", {
                            value: 7
                        }).a;
                    }
                })).a;
            }) ? function (e, t, n) {
                var r = N(Q, t);
                r && delete Q[t], C(e, t, n), r && e !== Q && C(Q, t, r);
            } : C, V = function (e) {
                var t = F[e] = T(D.prototype);
                return t._k = e, t;
            }, K = B && "symbol" == typeof D.iterator ? function (e) {
                return "symbol" == typeof e;
            } : function (e) {
                return e instanceof D;
            }, J = function (e, t, n) {
                return e === Q && J(G, t, n), _(e), t = E(t, !0), _(n), o(F, t) ? (n.enumerable ? (o(e, x) && e[x][t] && (e[x][t] = !1), n = T(n, {
                    enumerable: w(0, !1)
                })) : (o(e, x) || C(e, x, w(1, {})), e[x][t] = !0), $(e, t, n)) : C(e, t, n);
            }, z = function (e, t) {
                _(e);
                for (var n, r = m(t = b(t)), o = 0, i = r.length; i > o;)
                    J(e, n = r[o++], t[n]);
                return e;
            }, W = function (e) {
                var t = k.call(this, e = E(e, !0));
                return !(this === Q && o(F, e) && !o(G, e)) && (!(t || !o(this, e) || !o(F, e) || o(this, x) && this[x][e]) || t);
            }, X = function (e, t) {
                if (e = b(e), t = E(t, !0), e !== Q || !o(F, t) || o(G, t)) {
                    var n = N(e, t);
                    return !n || !o(F, t) || o(e, x) && e[x][t] || (n.enumerable = !0), n;
                }
            }, Z = function (e) {
                for (var t, n = I(b(e)), r = [], i = 0; n.length > i;)
                    o(F, t = n[i++]) || t == x || t == c || r.push(t);
                return r;
            }, ee = function (e) {
                for (var t, n = e === Q, r = I(n ? G : b(e)), i = [], a = 0; r.length > a;)
                    !o(F, t = r[a++]) || n && !o(Q, t) || i.push(F[t]);
                return i;
            };
            B || (s((D = function () {
                if (this instanceof D)
                    throw TypeError("Symbol is not a constructor!");
                var e = l(arguments.length > 0 ? arguments[0] : void 0), t = function (n) {
                    this === Q && t.call(G, n), o(this, x) && o(this[x], e) && (this[x][e] = !1), $(this, e, w(1, n));
                };
                return i && H && $(Q, e, {
                    configurable: !0,
                    set: t
                }), V(e);
            }).prototype, "toString", function () {
                return this._k;
            }), A.f = X, P.f = J, n(54).f = S.f = Z, n(33).f = W, L.f = ee, i && !n(11) && s(Q, "propertyIsEnumerable", W, !0), h.f = function (e) {
                return V(d(e));
            }), a(a.G + a.W + a.F * !B, {
                Symbol: D
            });
            for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne;)
                d(te[ne++]);
            for (var re = M(d.store), oe = 0; re.length > oe;)
                y(re[oe++]);
            a(a.S + a.F * !B, "Symbol", {
                for: function (e) {
                    return o(q, e += "") ? q[e] : q[e] = D(e);
                },
                keyFor: function (e) {
                    if (!K(e))
                        throw TypeError(e + " is not a symbol!");
                    for (var t in q)
                        if (q[t] === e)
                            return t;
                },
                useSetter: function () {
                    H = !0;
                },
                useSimple: function () {
                    H = !1;
                }
            }), a(a.S + a.F * !B, "Object", {
                create: function (e, t) {
                    return void 0 === t ? T(e) : z(T(e), t);
                },
                defineProperty: J,
                defineProperties: z,
                getOwnPropertyDescriptor: X,
                getOwnPropertyNames: Z,
                getOwnPropertySymbols: ee
            });
            var ie = u(function () {
                L.f(1);
            });
            a(a.S + a.F * ie, "Object", {
                getOwnPropertySymbols: function (e) {
                    return L.f(O(e));
                }
            }), R && a(a.S + a.F * (!B || u(function () {
                var e = D();
                return "[null]" != j([e]) || "{}" != j({
                    a: e
                }) || "{}" != j(Object(e));
            })), "JSON", {
                stringify: function (e) {
                    for (var t, n, r = [e], o = 1; arguments.length > o;)
                        r.push(arguments[o++]);
                    if (n = t = r[1], (g(t) || void 0 !== e) && !K(e))
                        return v(t) || (t = function (e, t) {
                            if ("function" == typeof n && (t = n.call(this, e, t)), !K(t))
                                return t;
                        }), r[1] = t, j.apply(R, r);
                }
            }), D.prototype[U] || n(5)(D.prototype, U, D.prototype.valueOf), p(D, "Symbol"), p(Math, "Math", !0), p(r.JSON, "JSON", !0);
        }, function (e, t, n) {
            var r = n(16)("meta"), o = n(10), i = n(4), a = n(6).f, s = 0, c = Object.isExtensible || function () {
                return !0;
            }, u = !n(14)(function () {
                return c(Object.preventExtensions({}));
            }), f = function (e) {
                a(e, r, {
                    value: {
                        i: "O" + ++s,
                        w: {}
                    }
                });
            }, p = e.exports = {
                KEY: r,
                NEED: !1,
                fastKey: function (e, t) {
                    if (!o(e))
                        return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                    if (!i(e, r)) {
                        if (!c(e))
                            return "F";
                        if (!t)
                            return "E";
                        f(e);
                    }
                    return e[r].i;
                },
                getWeak: function (e, t) {
                    if (!i(e, r)) {
                        if (!c(e))
                            return !0;
                        if (!t)
                            return !1;
                        f(e);
                    }
                    return e[r].w;
                },
                onFreeze: function (e) {
                    return u && p.NEED && c(e) && !i(e, r) && f(e), e;
                }
            };
        }, function (e, t, n) {
            var r = n(26), o = n(53), i = n(33);
            e.exports = function (e) {
                var t = r(e), n = o.f;
                if (n)
                    for (var a, s = n(e), c = i.f, u = 0; s.length > u;)
                        c.call(e, a = s[u++]) && t.push(a);
                return t;
            };
        }, function (e, t, n) {
            var r = n(51);
            e.exports = Array.isArray || function (e) {
                return "Array" == r(e);
            };
        }, function (e, t, n) {
            var r = n(8), o = n(54).f, i = {}.toString, a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
            e.exports.f = function (e) {
                return a && "[object Window]" == i.call(e) ? function (e) {
                    try {
                        return o(e);
                    }
                    catch (e) {
                        return a.slice();
                    }
                }(e) : o(r(e));
            };
        }, function (e, t, n) {
            var r = n(33), o = n(15), i = n(8), a = n(24), s = n(4), c = n(46), u = Object.getOwnPropertyDescriptor;
            t.f = n(7) ? u : function (e, t) {
                if (e = i(e), t = a(t, !0), c)
                    try {
                        return u(e, t);
                    }
                    catch (e) { }
                if (s(e, t))
                    return o(!r.f.call(e, t), e[t]);
            };
        }, function (e, t) { }, function (e, t, n) {
            n(32)("asyncIterator");
        }, function (e, t, n) {
            n(32)("observable");
        }, function (e, t, n) {
            "use strict";
            var r = n(1), o = n(56), i = n(109), a = n(63);
            function s(e) {
                var t = new i(e), n = o(i.prototype.request, t);
                return r.extend(n, i.prototype, t), r.extend(n, t), n;
            }
            var c = s(n(59));
            c.Axios = i, c.create = function (e) {
                return s(a(c.defaults, e));
            }, c.Cancel = n(64), c.CancelToken = n(121), c.isCancel = n(58), c.all = function (e) {
                return Promise.all(e);
            }, c.spread = n(122), e.exports = c, e.exports.default = c;
        }, function (e, t) {
            /*!
             * Determine if an object is a Buffer
             *
             * @author   Feross Aboukhadijeh <https://feross.org>
             * @license  MIT
             */
            e.exports = function (e) {
                return null != e && null != e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1), o = n(57), i = n(110), a = n(111), s = n(63);
            function c(e) {
                this.defaults = e, this.interceptors = {
                    request: new i,
                    response: new i
                };
            }
            c.prototype.request = function (e) {
                "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = s(this.defaults, e)).method = e.method ? e.method.toLowerCase() : "get";
                var t = [a, void 0], n = Promise.resolve(e);
                for (this.interceptors.request.forEach(function (e) {
                    t.unshift(e.fulfilled, e.rejected);
                }), this.interceptors.response.forEach(function (e) {
                    t.push(e.fulfilled, e.rejected);
                }); t.length;)
                    n = n.then(t.shift(), t.shift());
                return n;
            }, c.prototype.getUri = function (e) {
                return e = s(this.defaults, e), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");
            }, r.forEach(["delete", "get", "head", "options"], function (e) {
                c.prototype[e] = function (t, n) {
                    return this.request(r.merge(n || {}, {
                        method: e,
                        url: t
                    }));
                };
            }), r.forEach(["post", "put", "patch"], function (e) {
                c.prototype[e] = function (t, n, o) {
                    return this.request(r.merge(o || {}, {
                        method: e,
                        url: t,
                        data: n
                    }));
                };
            }), e.exports = c;
        }, function (e, t, n) {
            "use strict";
            var r = n(1);
            function o() {
                this.handlers = [];
            }
            o.prototype.use = function (e, t) {
                return this.handlers.push({
                    fulfilled: e,
                    rejected: t
                }), this.handlers.length - 1;
            }, o.prototype.eject = function (e) {
                this.handlers[e] && (this.handlers[e] = null);
            }, o.prototype.forEach = function (e) {
                r.forEach(this.handlers, function (t) {
                    null !== t && e(t);
                });
            }, e.exports = o;
        }, function (e, t, n) {
            "use strict";
            var r = n(1), o = n(112), i = n(58), a = n(59), s = n(119), c = n(120);
            function u(e) {
                e.cancelToken && e.cancelToken.throwIfRequested();
            }
            e.exports = function (e) {
                return u(e), e.baseURL && !s(e.url) && (e.url = c(e.baseURL, e.url)), e.headers = e.headers || {}, e.data = o(e.data, e.headers, e.transformRequest), e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
                    delete e.headers[t];
                }), (e.adapter || a.adapter)(e).then(function (t) {
                    return u(e), t.data = o(t.data, t.headers, e.transformResponse), t;
                }, function (t) {
                    return i(t) || (u(e), t && t.response && (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);
                });
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1);
            e.exports = function (e, t, n) {
                return r.forEach(n, function (n) {
                    e = n(e, t);
                }), e;
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1);
            e.exports = function (e, t) {
                r.forEach(e, function (n, r) {
                    r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);
                });
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(62);
            e.exports = function (e, t, n) {
                var o = n.config.validateStatus;
                !o || o(n.status) ? e(n) : t(r("Request failed with status code " + n.status, n.config, null, n.request, n));
            };
        }, function (e, t, n) {
            "use strict";
            e.exports = function (e, t, n, r, o) {
                return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code
                    };
                }, e;
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1), o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
            e.exports = function (e) {
                var t, n, i, a = {};
                return e ? (r.forEach(e.split("\n"), function (e) {
                    if (i = e.indexOf(":"), t = r.trim(e.substr(0, i)).toLowerCase(), n = r.trim(e.substr(i + 1)), t) {
                        if (a[t] && o.indexOf(t) >= 0)
                            return;
                        a[t] = "set-cookie" === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ", " + n : n;
                    }
                }), a) : a;
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1);
            e.exports = r.isStandardBrowserEnv() ? function () {
                var e, t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
                function o(e) {
                    var r = e;
                    return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
                        href: n.href,
                        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                        host: n.host,
                        search: n.search ? n.search.replace(/^\?/, "") : "",
                        hash: n.hash ? n.hash.replace(/^#/, "") : "",
                        hostname: n.hostname,
                        port: n.port,
                        pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
                    };
                }
                return e = o(window.location.href),
                    function (t) {
                        var n = r.isString(t) ? o(t) : t;
                        return n.protocol === e.protocol && n.host === e.host;
                    };
            }() : function () {
                return !0;
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(1);
            e.exports = r.isStandardBrowserEnv() ? {
                write: function (e, t, n, o, i, a) {
                    var s = [];
                    s.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), r.isString(o) && s.push("path=" + o), r.isString(i) && s.push("domain=" + i), !0 === a && s.push("secure"), document.cookie = s.join("; ");
                },
                read: function (e) {
                    var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                    return t ? decodeURIComponent(t[3]) : null;
                },
                remove: function (e) {
                    this.write(e, "", Date.now() - 864e5);
                }
            } : {
                write: function () { },
                read: function () {
                    return null;
                },
                remove: function () { }
            };
        }, function (e, t, n) {
            "use strict";
            e.exports = function (e) {
                return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
            };
        }, function (e, t, n) {
            "use strict";
            e.exports = function (e, t) {
                return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
            };
        }, function (e, t, n) {
            "use strict";
            var r = n(64);
            function o(e) {
                if ("function" != typeof e)
                    throw new TypeError("executor must be a function.");
                var t;
                this.promise = new Promise(function (e) {
                    t = e;
                });
                var n = this;
                e(function (e) {
                    n.reason || (n.reason = new r(e), t(n.reason));
                });
            }
            o.prototype.throwIfRequested = function () {
                if (this.reason)
                    throw this.reason;
            }, o.source = function () {
                var e;
                return {
                    token: new o(function (t) {
                        e = t;
                    }),
                    cancel: e
                };
            }, e.exports = o;
        }, function (e, t, n) {
            "use strict";
            e.exports = function (e) {
                return function (t) {
                    return e.apply(null, t);
                };
            };
        }, function (e, t, n) {
            "use strict";
            var r = Object.prototype.hasOwnProperty, o = "~";
            function i() { }
            function a(e, t, n) {
                this.fn = e, this.context = t, this.once = n || !1;
            }
            function s(e, t, n, r, i) {
                if ("function" != typeof n)
                    throw new TypeError("The listener must be a function");
                var s = new a(n, r || e, i), c = o ? o + t : t;
                return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
            }
            function c(e, t) {
                0 == --e._eventsCount ? e._events = new i : delete e._events[t];
            }
            function u() {
                this._events = new i, this._eventsCount = 0;
            }
            Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (o = !1)), u.prototype.eventNames = function () {
                var e, t, n = [];
                if (0 === this._eventsCount)
                    return n;
                for (t in e = this._events)
                    r.call(e, t) && n.push(o ? t.slice(1) : t);
                return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n;
            }, u.prototype.listeners = function (e) {
                var t = o ? o + e : e, n = this._events[t];
                if (!n)
                    return [];
                if (n.fn)
                    return [n.fn];
                for (var r = 0, i = n.length, a = new Array(i); r < i; r++)
                    a[r] = n[r].fn;
                return a;
            }, u.prototype.listenerCount = function (e) {
                var t = o ? o + e : e, n = this._events[t];
                return n ? n.fn ? 1 : n.length : 0;
            }, u.prototype.emit = function (e, t, n, r, i, a) {
                var s = o ? o + e : e;
                if (!this._events[s])
                    return !1;
                var c, u, f = this._events[s], p = arguments.length;
                if (f.fn) {
                    switch (f.once && this.removeListener(e, f.fn, void 0, !0), p) {
                        case 1:
                            return f.fn.call(f.context), !0;
                        case 2:
                            return f.fn.call(f.context, t), !0;
                        case 3:
                            return f.fn.call(f.context, t, n), !0;
                        case 4:
                            return f.fn.call(f.context, t, n, r), !0;
                        case 5:
                            return f.fn.call(f.context, t, n, r, i), !0;
                        case 6:
                            return f.fn.call(f.context, t, n, r, i, a), !0;
                    }
                    for (u = 1, c = new Array(p - 1); u < p; u++)
                        c[u - 1] = arguments[u];
                    f.fn.apply(f.context, c);
                }
                else {
                    var l, d = f.length;
                    for (u = 0; u < d; u++)
                        switch (f[u].once && this.removeListener(e, f[u].fn, void 0, !0), p) {
                            case 1:
                                f[u].fn.call(f[u].context);
                                break;
                            case 2:
                                f[u].fn.call(f[u].context, t);
                                break;
                            case 3:
                                f[u].fn.call(f[u].context, t, n);
                                break;
                            case 4:
                                f[u].fn.call(f[u].context, t, n, r);
                                break;
                            default:
                                if (!c)
                                    for (l = 1, c = new Array(p - 1); l < p; l++)
                                        c[l - 1] = arguments[l];
                                f[u].fn.apply(f[u].context, c);
                        }
                }
                return !0;
            }, u.prototype.on = function (e, t, n) {
                return s(this, e, t, n, !1);
            }, u.prototype.once = function (e, t, n) {
                return s(this, e, t, n, !0);
            }, u.prototype.removeListener = function (e, t, n, r) {
                var i = o ? o + e : e;
                if (!this._events[i])
                    return this;
                if (!t)
                    return c(this, i), this;
                var a = this._events[i];
                if (a.fn)
                    a.fn !== t || r && !a.once || n && a.context !== n || c(this, i);
                else {
                    for (var s = 0, u = [], f = a.length; s < f; s++)
                        (a[s].fn !== t || r && !a[s].once || n && a[s].context !== n) && u.push(a[s]);
                    u.length ? this._events[i] = 1 === u.length ? u[0] : u : c(this, i);
                }
                return this;
            }, u.prototype.removeAllListeners = function (e) {
                var t;
                return e ? (t = o ? o + e : e, this._events[t] && c(this, t)) : (this._events = new i, this._eventsCount = 0), this;
            }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = o, u.EventEmitter = u, e.exports = u;
        }, function (e, t, n) {
            "use strict";
            var r, o = (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                    e.__proto__ = t;
                } || function (e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n]);
                })(e, t);
            }, function (e, t) {
                function n() {
                    this.constructor = e;
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n);
            }), i = function () {
                return (i = Object.assign || function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                }).apply(this, arguments);
            }, a = function (e, t, n, r) {
                return new (n || (n = Promise))(function (o, i) {
                    function a(e) {
                        try {
                            c(r.next(e));
                        }
                        catch (e) {
                            i(e);
                        }
                    }
                    function s(e) {
                        try {
                            c(r.throw(e));
                        }
                        catch (e) {
                            i(e);
                        }
                    }
                    function c(e) {
                        e.done ? o(e.value) : new n(function (t) {
                            t(e.value);
                        }).then(a, s);
                    }
                    c((r = r.apply(e, t || [])).next());
                });
            }, s = function (e, t) {
                var n, r, o, i, a = {
                    label: 0,
                    sent: function () {
                        if (1 & o[0])
                            throw o[1];
                        return o[1];
                    },
                    trys: [],
                    ops: []
                };
                return i = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                    return this;
                }), i;
                function s(i) {
                    return function (s) {
                        return function (i) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; a;)
                                try {
                                    if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done)
                                        return o;
                                    switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
                                        case 0:
                                        case 1:
                                            o = i;
                                            break;
                                        case 4:
                                            return a.label++, {
                                                value: i[1],
                                                done: !1
                                            };
                                        case 5:
                                            a.label++, r = i[1], i = [0];
                                            continue;
                                        case 7:
                                            i = a.ops.pop(), a.trys.pop();
                                            continue;
                                        default:
                                            if (!(o = (o = a.trys).length > 0 && o[o.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                                a = 0;
                                                continue;
                                            }
                                            if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                                a.label = i[1];
                                                break;
                                            }
                                            if (6 === i[0] && a.label < o[1]) {
                                                a.label = o[1], o = i;
                                                break;
                                            }
                                            if (o && a.label < o[2]) {
                                                a.label = o[2], a.ops.push(i);
                                                break;
                                            }
                                            o[2] && a.ops.pop(), a.trys.pop();
                                            continue;
                                    }
                                    i = t.call(e, a);
                                }
                                catch (e) {
                                    i = [6, e], r = 0;
                                }
                                finally {
                                    n = o = 0;
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            };
                        }([i, s]);
                    };
                }
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var c = n(125), u = n(65), f = n(36), p = n(35), l = n(34), d = function (e) {
                function t(t) {
                    var n = e.call(this, t) || this;
                    return n.config = t, n.customAuthProvider = new u.default(n.config), n;
                }
                return o(t, e), t.prototype.weixinAuthProvider = function (e) {
                    var t = e.appid, n = e.scope, r = e.loginMode, o = e.state;
                    return new c.default(this.config, t, n, r, o);
                }, t.prototype.signOut = function () {
                    var e = new p.Cache(this.config.persistence);
                    e.removeStore(l.REFRESH_TOKEN + "_" + this.config.env), e.removeStore(l.ACCESS_TOKEN + "_" + this.config.env), e.removeStore(l.ACCESS_TOKEN_Expire + "_" + this.config.env);
                    return this.httpRequest.send("auth.logout", {}).then(function (e) {
                        return e;
                    });
                }, t.prototype.getAccessToken = function () {
                    return a(this, void 0, void 0, function () {
                        var e;
                        return s(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return e = {}, [4, this.httpRequest.getAccessToken()];
                                case 1:
                                    return [2, (e.accessToken = t.sent().accessToken, e.env = this.config.env, e)];
                            }
                        });
                    });
                }, t.prototype.onLoginStateExpire = function (e) {
                    f.addEventListener("LoginStateExpire", e);
                }, t.prototype.signInWithTicket = function (e) {
                    var t = this;
                    return this.httpRequest.send("auth.signInWithTicket", {
                        ticket: e
                    }).then(function (e) {
                        e.refresh_token && t.customAuthProvider.setRefreshToken(e.refresh_token);
                    });
                }, t.prototype.shouldRefreshAccessToken = function (e) {
                    this.httpRequest._shouldRefreshAccessTokenHook = e.bind(this);
                }, t.prototype.getUserInfo = function () {
                    return this.httpRequest.send("auth.getUserInfo", {}).then(function (e) {
                        return e.code ? e : i({}, e.data, {
                            requestId: e.seqId
                        });
                    });
                }, t;
            }(u.default);
            t.default = d;
        }, function (e, t, n) {
            "use strict";
            var r, o = (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                    e.__proto__ = t;
                } || function (e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n]);
                })(e, t);
            }, function (e, t) {
                function n() {
                    this.constructor = e;
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n);
            });
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i, a, s = n(37), c = n(65);
            !function (e) {
                e.snsapi_base = "snsapi_base", e.snsapi_userinfo = "snsapi_userinfo", e.snsapi_login = "snsapi_login";
            }(i || (i = {})),
                function (e) {
                    e.redirect = "redirect", e.prompt = "prompt";
                }(a || (a = {}));
            var u = function (e) {
                function t(t, n, r, o, i) {
                    var a = e.call(this, t) || this;
                    return a.config = t, a.appid = n, a.scope = r, a.state = i || "weixin", a.loginMode = o || "redirect", a;
                }
                return o(t, e), t.prototype.signIn = function (e) {
                    e = e || s.createPromiseCallback();
                    var t = this.cache.getStore(this.accessTokenKey), n = this.cache.getStore(this.accessTokenExpireKey);
                    if (t) {
                        if (n && n > Date.now())
                            return e(0), e.promise;
                        this.cache.removeStore(this.accessTokenKey), this.cache.removeStore(this.accessTokenExpireKey);
                    }
                    if (!1 === Object.values(i).includes(i[this.scope]))
                        throw new Error("错误的scope类型");
                    var r = s.getWeixinCode();
                    if (!r)
                        return this.redirect();
                    var o = "snsapi_login" === this.scope ? "WECHAT-OPEN" : "WECHAT-PUBLIC";
                    return this.getRefreshTokenByWXCode(this.appid, o, r).then(function (t) {
                        e(null, t);
                    }), e.promise;
                }, t.prototype.redirect = function () {
                    var e = s.removeParam("code", location.href);
                    e = s.removeParam("state", e), e = encodeURIComponent(e);
                    var t = "//open.weixin.qq.com/connect/oauth2/authorize";
                    "snsapi_login" === this.scope && (t = "//open.weixin.qq.com/connect/qrconnect"), "redirect" === a[this.loginMode] && (location.href = t + "?appid=" + this.appid + "&redirect_uri=" + e + "&response_type=code&scope=" + this.scope + "&state=" + this.state + "#wechat_redirect");
                }, t;
            }(c.default);
            t.default = u;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(17), o = n(37);
            t.callFunction = function (e, t) {
                var n = e.name, i = e.data;
                t = t || o.createPromiseCallback();
                try {
                    i = i ? JSON.stringify(i) : "";
                }
                catch (e) {
                    return Promise.reject(e);
                }
                if (!n)
                    return Promise.reject(new Error("函数名不能为空"));
                var a = {
                    function_name: n,
                    request_data: i
                };
                return new r.Request(this.config).send("functions.invokeFunction", a).then(function (e) {
                    if (console.log(e), e.code)
                        t(null, e);
                    else {
                        var n = e.data.response_data;
                        try {
                            n = JSON.parse(e.data.response_data), t(null, {
                                result: n,
                                requestId: e.requestId
                            });
                        }
                        catch (e) {
                            t(new Error("response data must be json"));
                        }
                    }
                    return t.promise;
                }).catch(function (e) {
                    t(e);
                }), t.promise;
            };
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
                function (e) {
                    for (var n in e)
                        t.hasOwnProperty(n) || (t[n] = e[n]);
                }(n(38));
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(0), o = n(39), i = n(2), a = function () {
                function e(e) {
                    if (!i.isArray(e))
                        throw new TypeError('"points" must be of type Point[]. Received type ' + typeof e);
                    if (0 === e.length)
                        throw new Error('"points" must contain 1 point at least');
                    e.forEach(function (e) {
                        if (!(e instanceof o.Point))
                            throw new TypeError('"points" must be of type Point[]. Received type ' + typeof e + "[]");
                    }), this.points = e;
                }
                return e.prototype.parse = function (e) {
                    var t;
                    return (t = {})[e] = {
                        type: "MultiPoint",
                        coordinates: this.points.map(function (e) {
                            return e.toJSON().coordinates;
                        })
                    }, t;
                }, e.prototype.toJSON = function () {
                    return {
                        type: "MultiPoint",
                        coordinates: this.points.map(function (e) {
                            return e.toJSON().coordinates;
                        })
                    };
                }, e.validate = function (e) {
                    if ("MultiPoint" !== e.type || !i.isArray(e.coordinates))
                        return !1;
                    for (var t = 0, n = e.coordinates; t < n.length; t++) {
                        var r = n[t];
                        if (!i.isNumber(r[0]) || !i.isNumber(r[1]))
                            return !1;
                    }
                    return !0;
                }, Object.defineProperty(e.prototype, "_internalType", {
                    get: function () {
                        return r.SYMBOL_GEO_MULTI_POINT;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e;
            }();
            t.MultiPoint = a;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(0), o = n(2), i = n(43), a = function () {
                function e(e) {
                    if (!o.isArray(e))
                        throw new TypeError('"lines" must be of type LineString[]. Received type ' + typeof e);
                    if (0 === e.length)
                        throw new Error("Polygon must contain 1 linestring at least");
                    e.forEach(function (e) {
                        if (!(e instanceof i.LineString))
                            throw new TypeError('"lines" must be of type LineString[]. Received type ' + typeof e + "[]");
                    }), this.lines = e;
                }
                return e.prototype.parse = function (e) {
                    var t;
                    return (t = {})[e] = {
                        type: "MultiLineString",
                        coordinates: this.lines.map(function (e) {
                            return e.points.map(function (e) {
                                return [e.longitude, e.latitude];
                            });
                        })
                    }, t;
                }, e.prototype.toJSON = function () {
                    return {
                        type: "MultiLineString",
                        coordinates: this.lines.map(function (e) {
                            return e.points.map(function (e) {
                                return [e.longitude, e.latitude];
                            });
                        })
                    };
                }, e.validate = function (e) {
                    if ("MultiLineString" !== e.type || !o.isArray(e.coordinates))
                        return !1;
                    for (var t = 0, n = e.coordinates; t < n.length; t++)
                        for (var r = 0, i = n[t]; r < i.length; r++) {
                            var a = i[r];
                            if (!o.isNumber(a[0]) || !o.isNumber(a[1]))
                                return !1;
                        }
                    return !0;
                }, Object.defineProperty(e.prototype, "_internalType", {
                    get: function () {
                        return r.SYMBOL_GEO_MULTI_LINE_STRING;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e;
            }();
            t.MultiLineString = a;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(0), o = n(2), i = n(68), a = function () {
                function e(e) {
                    if (!o.isArray(e))
                        throw new TypeError('"polygons" must be of type Polygon[]. Received type ' + typeof e);
                    if (0 === e.length)
                        throw new Error("MultiPolygon must contain 1 polygon at least");
                    for (var t = 0, n = e; t < n.length; t++) {
                        var r = n[t];
                        if (!(r instanceof i.Polygon))
                            throw new TypeError('"polygon" must be of type Polygon[]. Received type ' + typeof r + "[]");
                    }
                    this.polygons = e;
                }
                return e.prototype.parse = function (e) {
                    var t;
                    return (t = {})[e] = {
                        type: "MultiPolygon",
                        coordinates: this.polygons.map(function (e) {
                            return e.lines.map(function (e) {
                                return e.points.map(function (e) {
                                    return [e.longitude, e.latitude];
                                });
                            });
                        })
                    }, t;
                }, e.prototype.toJSON = function () {
                    return {
                        type: "MultiPolygon",
                        coordinates: this.polygons.map(function (e) {
                            return e.lines.map(function (e) {
                                return e.points.map(function (e) {
                                    return [e.longitude, e.latitude];
                                });
                            });
                        })
                    };
                }, e.validate = function (e) {
                    if ("MultiPolygon" !== e.type || !o.isArray(e.coordinates))
                        return !1;
                    for (var t = 0, n = e.coordinates; t < n.length; t++)
                        for (var r = 0, i = n[t]; r < i.length; r++)
                            for (var a = 0, s = i[r]; a < s.length; a++) {
                                var c = s[a];
                                if (!o.isNumber(c[0]) || !o.isNumber(c[1]))
                                    return !1;
                            }
                    return !0;
                }, Object.defineProperty(e.prototype, "_internalType", {
                    get: function () {
                        return r.SYMBOL_GEO_POLYGON;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e;
            }();
            t.MultiPolygon = a;
        }, function (e, t, n) {
            "use strict";
            var r, o = this && this.__extends || (r = function (e, t) {
                return (r = Object.setPrototypeOf || {
                    __proto__: []
                }
                    instanceof Array && function (e, t) {
                    e.__proto__ = t;
                } || function (e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n]);
                })(e, t);
            }, function (e, t) {
                function n() {
                    this.constructor = e;
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n);
            });
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = n(132), a = function (e) {
                function t(t, n) {
                    return e.call(this, t, n) || this;
                }
                return o(t, e), Object.defineProperty(t.prototype, "name", {
                    get: function () {
                        return this._coll;
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.doc = function (e) {
                    return new i.DocumentReference(this._db, this._coll, e);
                }, t.prototype.add = function (e, t) {
                    return this.doc().create(e, t);
                }, t;
            }(n(133).Query);
            t.CollectionReference = a;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(69), o = n(38), i = n(40), a = n(70), s = n(73), c = n(19), u = function () {
                function e(e, t, n, r) {
                    void 0 === r && (r = {}), this._db = e, this._coll = t, this.id = n, this.request = new o.Db.reqClass(this._db.config), this.projection = r;
                }
                return e.prototype.create = function (e, t) {
                    t = t || r.createPromiseCallback();
                    var n = {
                        collectionName: this._coll,
                        data: s.serialize(e)
                    };
                    return this.id && (n._id = this.id), this.request.send("database.addDocument", n).then(function (e) {
                        e.code ? t(0, e) : t(0, {
                            id: e.data._id,
                            requestId: e.requestId
                        });
                    }).catch(function (e) {
                        t(e);
                    }), t.promise;
                }, e.prototype.set = function (e, t) {
                    if (t = t || r.createPromiseCallback(), !e || "object" != typeof e)
                        return Promise.resolve({
                            code: "INVALID_PARAM",
                            message: "参数必需是非空对象"
                        });
                    if (e.hasOwnProperty("_id"))
                        return Promise.resolve({
                            code: "INVALID_PARAM",
                            message: "不能更新_id的值"
                        });
                    var n = !1, o = function (e) {
                        if ("object" == typeof e)
                            for (var t in e)
                                e[t] instanceof c.UpdateCommand ? n = !0 : "object" == typeof e[t] && o(e[t]);
                    };
                    if (o(e), n)
                        return Promise.resolve({
                            code: "DATABASE_REQUEST_FAILED",
                            message: "update operator complicit"
                        });
                    var i = {
                        collectionName: this._coll,
                        data: s.serialize(e),
                        multi: !1,
                        merge: !1,
                        upsert: !0
                    };
                    return this.id && (i.query = {
                        _id: this.id
                    }), this.request.send("database.updateDocument", i).then(function (e) {
                        e.code ? t(0, e) : t(0, {
                            updated: e.data.updated,
                            upsertedId: e.data.upserted_id,
                            requestId: e.requestId
                        });
                    }).catch(function (e) {
                        t(e);
                    }), t.promise;
                }, e.prototype.update = function (e, t) {
                    if (t = t || r.createPromiseCallback(), !e || "object" != typeof e)
                        return Promise.resolve({
                            code: "INVALID_PARAM",
                            message: "参数必需是非空对象"
                        });
                    if (e.hasOwnProperty("_id"))
                        return Promise.resolve({
                            code: "INVALID_PARAM",
                            message: "不能更新_id的值"
                        });
                    var n = {
                        _id: this.id
                    }, o = {
                        collectionName: this._coll,
                        data: a.UpdateSerializer.encode(e),
                        query: n,
                        multi: !1,
                        merge: !0,
                        upsert: !1
                    };
                    return this.request.send("database.updateDocument", o).then(function (e) {
                        e.code ? t(0, e) : t(0, {
                            updated: e.data.updated,
                            upsertedId: e.data.upserted_id,
                            requestId: e.requestId
                        });
                    }).catch(function (e) {
                        t(e);
                    }), t.promise;
                }, e.prototype.remove = function (e) {
                    e = e || r.createPromiseCallback();
                    var t = {
                        _id: this.id
                    }, n = {
                        collectionName: this._coll,
                        query: t,
                        multi: !1
                    };
                    return this.request.send("database.deleteDocument", n).then(function (t) {
                        t.code ? e(0, t) : e(0, {
                            deleted: t.data.deleted,
                            requestId: t.requestId
                        });
                    }).catch(function (t) {
                        e(t);
                    }), e.promise;
                }, e.prototype.get = function (e) {
                    e = e || r.createPromiseCallback();
                    var t = {
                        _id: this.id
                    }, n = {
                        collectionName: this._coll,
                        query: t,
                        multi: !1,
                        projection: this.projection
                    };
                    return this.request.send("database.queryDocument", n).then(function (t) {
                        if (t.code)
                            e(0, t);
                        else {
                            var n = i.Util.formatResDocumentData(t.data.list);
                            e(0, {
                                data: n,
                                requestId: t.requestId,
                                total: t.TotalCount,
                                limit: t.Limit,
                                offset: t.Offset
                            });
                        }
                    }).catch(function (t) {
                        e(t);
                    }), e.promise;
                }, e.prototype.field = function (t) {
                    for (var n in t)
                        t[n] ? t[n] = 1 : t[n] = 0;
                    return new e(this._db, this._coll, this.id, t);
                }, e;
            }();
            t.DocumentReference = u;
        }, function (e, t, n) {
            "use strict";
            var r = this && this.__assign || function () {
                return (r = Object.assign || function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var o in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                    return e;
                }).apply(this, arguments);
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = n(69), i = n(38), a = n(66), s = n(40), c = n(134), u = n(70), f = function () {
                function e(e, t, n, r, o) {
                    this._db = e, this._coll = t, this._fieldFilters = n, this._fieldOrders = r || [], this._queryOptions = o || {}, this._request = new i.Db.reqClass(this._db.config);
                }
                return e.prototype.get = function (e) {
                    e = e || o.createPromiseCallback();
                    var t = [];
                    this._fieldOrders && this._fieldOrders.forEach(function (e) {
                        t.push(e);
                    });
                    var n = {
                        collectionName: this._coll
                    };
                    return this._fieldFilters && (n.query = this._fieldFilters), t.length > 0 && (n.order = t), this._queryOptions.offset && (n.offset = this._queryOptions.offset), this._queryOptions.limit ? n.limit = this._queryOptions.limit < 100 ? this._queryOptions.limit : 100 : n.limit = 100, this._queryOptions.projection && (n.projection = this._queryOptions.projection), this._request.send("database.queryDocument", n).then(function (t) {
                        if (t.code)
                            e(0, t);
                        else {
                            var n = {
                                data: s.Util.formatResDocumentData(t.data.list),
                                requestId: t.requestId
                            };
                            t.TotalCount && (n.total = t.TotalCount), t.Limit && (n.limit = t.Limit), t.Offset && (n.offset = t.Offset), e(0, n);
                        }
                    }).catch(function (t) {
                        e(t);
                    }), e.promise;
                }, e.prototype.count = function (e) {
                    e = e || o.createPromiseCallback();
                    var t = {
                        collectionName: this._coll
                    };
                    return this._fieldFilters && (t.query = this._fieldFilters), this._request.send("database.countDocument", t).then(function (t) {
                        t.code ? e(0, t) : e(0, {
                            requestId: t.requestId,
                            total: t.data.total
                        });
                    }), e.promise;
                }, e.prototype.where = function (t) {
                    return new e(this._db, this._coll, c.QuerySerializer.encode(t), this._fieldOrders, this._queryOptions);
                }, e.prototype.orderBy = function (t, n) {
                    a.Validate.isFieldPath(t), a.Validate.isFieldOrder(n);
                    var r = {
                        field: t,
                        direction: n
                    }, o = this._fieldOrders.concat(r);
                    return new e(this._db, this._coll, this._fieldFilters, o, this._queryOptions);
                }, e.prototype.limit = function (t) {
                    a.Validate.isInteger("limit", t);
                    var n = r({}, this._queryOptions);
                    return n.limit = t, new e(this._db, this._coll, this._fieldFilters, this._fieldOrders, n);
                }, e.prototype.skip = function (t) {
                    a.Validate.isInteger("offset", t);
                    var n = r({}, this._queryOptions);
                    return n.offset = t, new e(this._db, this._coll, this._fieldFilters, this._fieldOrders, n);
                }, e.prototype.update = function (e, t) {
                    if (t = t || o.createPromiseCallback(), !e || "object" != typeof e)
                        return Promise.resolve({
                            code: "INVALID_PARAM",
                            message: "参数必需是非空对象"
                        });
                    if (e.hasOwnProperty("_id"))
                        return Promise.resolve({
                            code: "INVALID_PARAM",
                            message: "不能更新_id的值"
                        });
                    var n = {
                        collectionName: this._coll,
                        query: this._fieldFilters,
                        multi: !0,
                        merge: !0,
                        upsert: !1,
                        data: u.UpdateSerializer.encode(e)
                    };
                    return this._request.send("database.updateDocument", n).then(function (e) {
                        e.code ? t(0, e) : t(0, {
                            requestId: e.requestId,
                            updated: e.data.updated,
                            upsertId: e.data.upsert_id
                        });
                    }), t.promise;
                }, e.prototype.field = function (t) {
                    for (var n in t)
                        t[n] ? t[n] = 1 : t[n] = 0;
                    var o = r({}, this._queryOptions);
                    return o.projection = t, new e(this._db, this._coll, this._fieldFilters, this._fieldOrders, o);
                }, e.prototype.remove = function (e) {
                    e = e || o.createPromiseCallback(), Object.keys(this._queryOptions).length > 0 && console.warn("`offset`, `limit` and `projection` are not supported in remove() operation"), this._fieldOrders.length > 0 && console.warn("`orderBy` is not supported in remove() operation");
                    var t = {
                        collectionName: this._coll,
                        query: c.QuerySerializer.encode(this._fieldFilters),
                        multi: !0
                    };
                    return this._request.send("database.deleteDocument", t).then(function (t) {
                        t.code ? e(0, t) : e(0, {
                            requestId: t.requestId,
                            deleted: t.data.deleted
                        });
                    }), e.promise;
                }, e;
            }();
            t.Query = f;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(20), o = n(21), i = n(0), a = n(2), s = n(71), c = n(72), u = function () {
                function e() { }
                return e.encode = function (e) {
                    return (new f).encodeQuery(e);
                }, e;
            }();
            t.QuerySerializer = u;
            var f = function () {
                function e() { }
                return e.prototype.encodeQuery = function (e, t) {
                    var n;
                    return c.isConversionRequired(e) ? o.isLogicCommand(e) ? this.encodeLogicCommand(e) : r.isQueryCommand(e) ? this.encodeQueryCommand(e) : ((n = {})[t] = this.encodeQueryObject(e), n) : a.isObject(e) ? this.encodeQueryObject(e) : e;
                }, e.prototype.encodeLogicCommand = function (e) {
                    var t, n, r, i = this;
                    switch (e.operator) {
                        case o.LOGIC_COMMANDS_LITERAL.AND:
                        case o.LOGIC_COMMANDS_LITERAL.OR:
                            var a = s.operatorToString(e.operator), c = e.operands.map(function (t) {
                                return i.encodeQuery(t, e.fieldName);
                            });
                            return (t = {})[a] = c, t;
                        default:
                            a = s.operatorToString(e.operator);
                            if (1 === e.operands.length) {
                                var u = this.encodeQuery(e.operands[0]);
                                return (n = {})[a] = u, n;
                            }
                            c = e.operands.map(this.encodeQuery.bind(this));
                            return (r = {})[a] = c, r;
                    }
                }, e.prototype.encodeQueryCommand = function (e) {
                    return r.isComparisonCommand(e), this.encodeComparisonCommand(e);
                }, e.prototype.encodeComparisonCommand = function (e) {
                    var t, n, o, a, u, f, p, l, d;
                    if (e.fieldName === i.SYMBOL_UNSET_FIELD_NAME)
                        throw new Error("Cannot encode a comparison command with unset field name");
                    var h = s.operatorToString(e.operator);
                    switch (e.operator) {
                        case r.QUERY_COMMANDS_LITERAL.EQ:
                        case r.QUERY_COMMANDS_LITERAL.NEQ:
                        case r.QUERY_COMMANDS_LITERAL.LT:
                        case r.QUERY_COMMANDS_LITERAL.LTE:
                        case r.QUERY_COMMANDS_LITERAL.GT:
                        case r.QUERY_COMMANDS_LITERAL.GTE:
                            return (t = {})[e.fieldName] = ((n = {})[h] = c.encodeInternalDataType(e.operands[0]), n), t;
                        case r.QUERY_COMMANDS_LITERAL.IN:
                        case r.QUERY_COMMANDS_LITERAL.NIN:
                            return (o = {})[e.fieldName] = ((a = {})[h] = c.encodeInternalDataType(e.operands), a), o;
                        case r.QUERY_COMMANDS_LITERAL.GEO_NEAR:
                            var y = e.operands[0];
                            return (u = {})[e.fieldName] = {
                                $nearSphere: {
                                    $geometry: y.geometry.toJSON(),
                                    $maxDistance: y.maxDistance,
                                    $minDistance: y.minDistance
                                }
                            }, u;
                        case r.QUERY_COMMANDS_LITERAL.GEO_WITHIN:
                            y = e.operands[0];
                            return (f = {})[e.fieldName] = {
                                $geoWithin: {
                                    $geometry: y.geometry.toJSON()
                                }
                            }, f;
                        case r.QUERY_COMMANDS_LITERAL.GEO_INTERSECTS:
                            y = e.operands[0];
                            return (p = {})[e.fieldName] = {
                                $geoIntersects: {
                                    $geometry: y.geometry.toJSON()
                                }
                            }, p;
                        default:
                            return (l = {})[e.fieldName] = ((d = {})[h] = c.encodeInternalDataType(e.operands[0]), d), l;
                    }
                }, e.prototype.encodeQueryObject = function (e) {
                    var t = c.flattenQueryObject(e);
                    for (var n in t) {
                        var i = t[n];
                        if (o.isLogicCommand(i)) {
                            t[n] = i._setFieldName(n);
                            var a = this.encodeLogicCommand(t[n]);
                            this.mergeConditionAfterEncode(t, a, n);
                        }
                        else if (r.isComparisonCommand(i)) {
                            t[n] = i._setFieldName(n);
                            a = this.encodeComparisonCommand(t[n]);
                            this.mergeConditionAfterEncode(t, a, n);
                        }
                        else
                            c.isConversionRequired(i) && (t[n] = c.encodeInternalDataType(i));
                    }
                    return t;
                }, e.prototype.mergeConditionAfterEncode = function (e, t, n) {
                    for (var r in t[n] || delete e[n], t)
                        e[r] ? a.isArray(e[r]) ? e[r].push(t[r]) : a.isObject(e[r]) ? a.isObject(t[r]) ? Object.assign(e, t) : (console.warn("unmergable condition, query is object but condition is " + a.getType(t) + ", can only overwrite", t, n), e[r] = t[r]) : (console.warn("to-merge query is of type " + a.getType(e) + ", can only overwrite", e, t, n), e[r] = t[r]) : e[r] = t[r];
                }, e;
            }();
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(20), o = n(21), i = n(19), a = n(2);
            t.Command = {
                eq: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.EQ, [e]);
                },
                neq: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.NEQ, [e]);
                },
                lt: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.LT, [e]);
                },
                lte: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.LTE, [e]);
                },
                gt: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.GT, [e]);
                },
                gte: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.GTE, [e]);
                },
                in: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.IN, e);
                },
                nin: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.NIN, e);
                },
                geoNear: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.GEO_NEAR, [e]);
                },
                geoWithin: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.GEO_WITHIN, [e]);
                },
                geoIntersects: function (e) {
                    return new r.QueryCommand(r.QUERY_COMMANDS_LITERAL.GEO_INTERSECTS, [e]);
                },
                and: function () {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var n = a.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
                    return new o.LogicCommand(o.LOGIC_COMMANDS_LITERAL.AND, n);
                },
                or: function () {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var n = a.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
                    return new o.LogicCommand(o.LOGIC_COMMANDS_LITERAL.OR, n);
                },
                set: function (e) {
                    return new i.UpdateCommand(i.UPDATE_COMMANDS_LITERAL.SET, [e]);
                },
                remove: function () {
                    return new i.UpdateCommand(i.UPDATE_COMMANDS_LITERAL.REMOVE, []);
                },
                inc: function (e) {
                    return new i.UpdateCommand(i.UPDATE_COMMANDS_LITERAL.INC, [e]);
                },
                mul: function (e) {
                    return new i.UpdateCommand(i.UPDATE_COMMANDS_LITERAL.MUL, [e]);
                },
                push: function () {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var n = a.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
                    return new i.UpdateCommand(i.UPDATE_COMMANDS_LITERAL.PUSH, n);
                },
                pop: function () {
                    return new i.UpdateCommand(i.UPDATE_COMMANDS_LITERAL.POP, []);
                },
                shift: function () {
                    return new i.UpdateCommand(i.UPDATE_COMMANDS_LITERAL.SHIFT, []);
                },
                unshift: function () {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var n = a.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
                    return new i.UpdateCommand(i.UPDATE_COMMANDS_LITERAL.UNSHIFT, n);
                }
            }, t.default = t.Command;
        }, function (e, t, n) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(0), o = function () {
                function e(e) {
                    var t = e.regexp, n = e.options;
                    if (!t)
                        throw new TypeError("regexp must be a string");
                    this.$regex = t, this.$options = n;
                }
                return e.prototype.parse = function () {
                    return {
                        $regex: this.$regex,
                        $options: this.$options
                    };
                }, Object.defineProperty(e.prototype, "_internalType", {
                    get: function () {
                        return r.SYMBOL_REGEXP;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e;
            }();
            t.RegExp = o, t.RegExpConstructor = function (e) {
                return new o(e);
            };
        }]);
});
