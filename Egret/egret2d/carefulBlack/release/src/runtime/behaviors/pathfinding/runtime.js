var ls;
(function (ls) {
    var PathfindingBehaivor = (function (_super) {
        __extends(PathfindingBehaivor, _super);
        function PathfindingBehaivor() {
            _super.call(this);
            this.moveSpeed = 60;
            this.pathIndex = 0;
            this.isSet = true;
            this.oldTime = -1000;
            this.oldTargetX = -100000000;
            this.oldTargetY = -100000000;
        }
        var d = __define,c=PathfindingBehaivor,p=c.prototype;
        p.onCreate = function () {
            this.moveSpeed = ls.eval_e(this.moveSpeed);
            this.aiTiledmap = ls.eval_e(this.tiledmapName);
            this.gridLayerName = ls.eval_e(this.gridLayerName);
        };
        p.tick = function () {
            if (this.isSet) {
                this.setTiledmap(this.aiTiledmap, this.gridLayerName);
                this.isSet = false;
            }
            if (!this.isPathfinding)
                return;
            if (!this.path)
                return;
            if (this.aiTiledmap == null && this.aiTiledmap.tiledMap == null)
                return;
            this.isRealFindPathing = true;
            var dt = this.inst.dt;
            var targetX = this.path[this.pathIndex][0] * this.aiTiledmap.tiledMap.tilewidth + this.aiTiledmap.tiledMap.tilewidth / 2;
            var targetY = this.path[this.pathIndex][1] * this.aiTiledmap.tiledMap.tileheight + this.aiTiledmap.tiledMap.tileheight / 2;
            var dx = targetX - this.inst.x;
            var dy = targetY - this.inst.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var angle = Math.atan2(dy, dx);
            var oldX = this.inst.x;
            var oldY = this.inst.y;
            if (dist < this.moveSpeed * this.inst.dt) {
                this.pathIndex++;
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPathfindingSegmentArrived));
                if (this.pathIndex >= this.path.length) {
                    this.isPathfinding = false;
                    this.inst.x = targetX;
                    this.inst.y = targetY;
                    this.isRealFindPathing = false;
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPathfindingArrived));
                }
            }
            else {
                this.inst.x += Math.cos(angle) * this.moveSpeed * dt;
                this.inst.y += Math.sin(angle) * this.moveSpeed * dt;
            }
            var targetAngle = ls.MathUtils.angleTo(oldX, oldY, this.inst.x, this.inst.y);
            var newAngle = ls.MathUtils.angleRotate(this.inst.angle, targetAngle, 300);
            if (isNaN(newAngle))
                return;
            if (this.inst.angle != newAngle) {
                this.inst.angle = newAngle;
            }
        };
        d(p, "nodeIndex"
            //获取当前结点索引（公开的索引）用于表达式中
            ,function () {
                return this.pathIndex;
            }
        );
        d(p, "isMoving"
            //是否正在移动（公开的方法）用于表达式中
            ,function () {
                return this.isRealFindPathing;
            }
        );
        p.isPathfindingMoving = function ($event) {
            return { instances: [this.inst], status: this.isRealFindPathing };
        };
        p.isSolid = function ($event) {
            if (this.tmxLayer && this.grid) {
                var touchX = ls.eval_e($event.touchX);
                var touchY = ls.eval_e($event.touchY);
                //转化为格子坐标
                var gridX = Math.floor(touchX / this.tmxLayer.width);
                var gridY = Math.floor(touchY / this.tmxLayer.height);
                return { instances: [this.inst], status: !this.grid.getWalkable(gridX, gridY) };
            }
            return { instances: [this.inst], status: true };
        };
        p.isWalkable = function ($event) {
            if (this.tmxLayer && this.grid) {
                var touchX = ls.eval_e($event.touchX);
                var touchY = ls.eval_e($event.touchY);
                //转化为格子坐标
                var gridX = Math.floor(touchX / this.tmxLayer.width);
                var gridY = Math.floor(touchY / this.tmxLayer.height);
                return { instances: [this.inst], status: this.grid.getWalkable(gridX, gridY) };
            }
            return { instances: [this.inst], status: false };
        };
        //trigger
        p.onPathfindingReady = function ($event) {
            return { instances: [this.inst], status: true };
        };
        //trigger
        p.onPathfindingArrived = function ($event) {
            return { instances: [this.inst], status: true };
        };
        //trigger
        p.onPathfindingSegmentArrived = function ($event) {
            return { instances: [this.inst], status: true };
        };
        p.setTiledmap = function ($tiledmapName, $gridLayerName) {
            this.aiTiledmap = ls.eval_e($tiledmapName);
            this.gridLayerName = ls.eval_e($gridLayerName);
            if (this.inst && this.aiTiledmap) {
                if (!this.aiTiledmap.tiledMap) {
                    var onTiledComplete = function (event) {
                        this.onCreateReady(null);
                    };
                    this.aiTiledmap.addEventListener("tiledInitialize", onTiledComplete, this);
                }
                else {
                    this.onCreateReady(null);
                }
            }
        };
        //设置网络图层(Tiled层次可以取重名，这里重名的情况下可能会过滤掉，因此，建议不要取重名的，后期可能对这一块作改进)
        p.onCreateReady = function (event) {
            //this.tiledmapVo = event.data;
            var aStar;
            if (ls.AITiledMap.aStars[this.gridLayerName] == null) {
                this.gridLayerName = this.gridLayerName;
                var tmxTiledmap = this.aiTiledmap.tiledMap;
                /////////////////////////new////////////////////////////
                if (tmxTiledmap) {
                    var layers = tmxTiledmap.getLayers();
                    for (var i = 0; i < layers.length; i++) {
                        var layer = layers[i];
                        if (layer.name == this.gridLayerName) {
                            var grid = new Grid(layer.cols, layer.rows);
                            var layerDatas = layer.layerData;
                            for (var j = 0; j < layerDatas.length; j++) {
                                var hoLayerData = layerDatas[j];
                                for (var k = 0; k < hoLayerData.length; k++) {
                                    var tile = layerDatas[j][k];
                                    if (tile) {
                                        var gid = tile.gid;
                                        if (gid != 0)
                                            grid.setWalkable(j, k, false);
                                        else
                                            grid.setWalkable(j, k, true);
                                    }
                                    else {
                                        grid.setWalkable(j, k, true);
                                    }
                                }
                            }
                            this.grid = grid;
                            grid.calculateLinks(1);
                            aStar = new ls.AStar(grid);
                            break;
                        }
                        else {
                        }
                    }
                }
                if (aStar) {
                    ls.AITiledMap.aStars[this.gridLayerName] = aStar;
                }
            }
            else {
                aStar = ls.AITiledMap.aStars[this.gridLayerName];
            }
            //寻路网格设置完成
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPathGridComplete));
        };
        p.onPathGridComplete = function ($event) {
            return { instances: [this.inst], status: true };
        };
        p.setMoveSpeed = function ($moveSpeed) {
            this.moveSpeed = ls.eval_e($moveSpeed);
            ls.assert(typeof this.moveSpeed !== "number", "PathfindingBehaivor setMoveSpeed parameter type incorrect!!");
        };
        p.findPath = function (targetX, targetY) {
            var curTime = egret.getTimer();
            if (curTime - this.oldTime > 200) {
                this.oldTime = curTime;
                this.targetX = ls.eval_e(targetX);
                this.targetY = ls.eval_e(targetY);
                if (this.oldTargetX != this.targetX || this.oldTargetY != this.targetY) {
                    this.oldTargetX = this.targetX;
                    this.oldTargetY = this.targetY;
                    this.isRealFindPathing = false;
                }
                if (!this.isRealFindPathing) {
                    this.oldTargetX = this.targetX;
                    this.oldTargetY = this.targetY;
                    ls.assert(typeof this.targetX !== "number" || typeof this.targetY !== "number", "PathfindingBehaivor findPath parameter type incorrect!!");
                    if (this.aiTiledmap) {
                        var tilemap = this.aiTiledmap.tiledMap;
                        if (tilemap) {
                            this.isPathfinding = true;
                            this.pathIndex = 0;
                            var gridWidth = tilemap.tilewidth;
                            var gridHeight = tilemap.tileheight;
                            var targetTiledX = Math.floor(this.targetX / gridWidth);
                            var targetTiledY = Math.floor(this.targetY / gridHeight);
                            var startTiledX = Math.floor(this.inst.x / gridWidth);
                            var startTiledY = Math.floor(this.inst.y / gridHeight);
                            if (targetTiledX < 0 || targetTiledY < 0 || startTiledX < 0 || startTiledY < 0)
                                return;
                            if (targetTiledX > tilemap.rows - 1 || targetTiledY > tilemap.cols - 1 || startTiledX > tilemap.rows - 1 || startTiledY > tilemap.cols - 1)
                                return;
                            var astar = ls.AITiledMap.aStars[this.gridLayerName];
                            if (astar) {
                                var grid = astar.grid;
                                grid.setStartNode(startTiledX, startTiledY);
                                grid.setEndNode(targetTiledX, targetTiledY);
                                this.path = astar.search();
                                //remove first path
                                if (this.path && this.path.length > 1)
                                    this.path.shift();
                                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onPathfindingReady));
                            }
                        }
                    }
                }
            }
        };
        p.onCreateGrid = function (event) {
            this.aiTiledmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        p.onTouchBegin = function (event) {
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.tiledmapName = this.tiledmapName;
            o.gridLayerName = this.gridLayerName;
            o.moveSpeed = this.moveSpeed;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.tiledmapName = o.tiledmapName;
                this.gridLayerName = o.gridLayerName;
                this.moveSpeed = o.moveSpeed;
                _super.prototype.loadFromJSON.call(this, o);
            }
        };
        p.clone = function () {
            var bh = _super.prototype.clone.call(this);
            bh.tiledmapName = this.tiledmapName;
            bh.gridLayerName = this.gridLayerName;
            bh.moveSpeed = this.moveSpeed;
            return bh;
        };
        return PathfindingBehaivor;
    }(ls.BaseBehavior));
    ls.PathfindingBehaivor = PathfindingBehaivor;
    egret.registerClass(PathfindingBehaivor,'ls.PathfindingBehaivor');
    var TMXTiledMapCreateGridEvent = (function (_super) {
        __extends(TMXTiledMapCreateGridEvent, _super);
        function TMXTiledMapCreateGridEvent(type, data, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = true; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            this.data = data;
        }
        var d = __define,c=TMXTiledMapCreateGridEvent,p=c.prototype;
        TMXTiledMapCreateGridEvent.CREATE_GRID_START = "createGridStart";
        TMXTiledMapCreateGridEvent.CREATE_GRID_COMPLETE = "createGridComplete";
        TMXTiledMapCreateGridEvent.CREATE_GRID_READY = "createGridReady"; //地图数据初始化完毕后，抛出
        return TMXTiledMapCreateGridEvent;
    }(egret.Event));
    ls.TMXTiledMapCreateGridEvent = TMXTiledMapCreateGridEvent;
    egret.registerClass(TMXTiledMapCreateGridEvent,'ls.TMXTiledMapCreateGridEvent');
    var OnPathfindingGridCompleteEvent = (function (_super) {
        __extends(OnPathfindingGridCompleteEvent, _super);
        function OnPathfindingGridCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPathfindingGridCompleteEvent,p=c.prototype;
        return OnPathfindingGridCompleteEvent;
    }(ls.BaseEvent));
    ls.OnPathfindingGridCompleteEvent = OnPathfindingGridCompleteEvent;
    egret.registerClass(OnPathfindingGridCompleteEvent,'ls.OnPathfindingGridCompleteEvent');
    var OnPathfindingSegmentArrivedEvent = (function (_super) {
        __extends(OnPathfindingSegmentArrivedEvent, _super);
        function OnPathfindingSegmentArrivedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPathfindingSegmentArrivedEvent,p=c.prototype;
        return OnPathfindingSegmentArrivedEvent;
    }(ls.BaseEvent));
    ls.OnPathfindingSegmentArrivedEvent = OnPathfindingSegmentArrivedEvent;
    egret.registerClass(OnPathfindingSegmentArrivedEvent,'ls.OnPathfindingSegmentArrivedEvent');
    var OnPathfindingArrivedEvent = (function (_super) {
        __extends(OnPathfindingArrivedEvent, _super);
        function OnPathfindingArrivedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPathfindingArrivedEvent,p=c.prototype;
        return OnPathfindingArrivedEvent;
    }(ls.BaseEvent));
    ls.OnPathfindingArrivedEvent = OnPathfindingArrivedEvent;
    egret.registerClass(OnPathfindingArrivedEvent,'ls.OnPathfindingArrivedEvent');
    var OnPathfindingReadyEvent = (function (_super) {
        __extends(OnPathfindingReadyEvent, _super);
        function OnPathfindingReadyEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnPathfindingReadyEvent,p=c.prototype;
        return OnPathfindingReadyEvent;
    }(ls.BaseEvent));
    ls.OnPathfindingReadyEvent = OnPathfindingReadyEvent;
    egret.registerClass(OnPathfindingReadyEvent,'ls.OnPathfindingReadyEvent');
    var IsWalkableEvent = (function (_super) {
        __extends(IsWalkableEvent, _super);
        function IsWalkableEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsWalkableEvent,p=c.prototype;
        return IsWalkableEvent;
    }(ls.BaseEvent));
    ls.IsWalkableEvent = IsWalkableEvent;
    egret.registerClass(IsWalkableEvent,'ls.IsWalkableEvent');
    var IsSolidEvent = (function (_super) {
        __extends(IsSolidEvent, _super);
        function IsSolidEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsSolidEvent,p=c.prototype;
        return IsSolidEvent;
    }(ls.BaseEvent));
    ls.IsSolidEvent = IsSolidEvent;
    egret.registerClass(IsSolidEvent,'ls.IsSolidEvent');
    var IsPathfindingMovingEvent = (function (_super) {
        __extends(IsPathfindingMovingEvent, _super);
        function IsPathfindingMovingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsPathfindingMovingEvent,p=c.prototype;
        return IsPathfindingMovingEvent;
    }(ls.BaseEvent));
    ls.IsPathfindingMovingEvent = IsPathfindingMovingEvent;
    egret.registerClass(IsPathfindingMovingEvent,'ls.IsPathfindingMovingEvent');
    /////////////////////////////class////////////////////////////////
    var ANode = (function () {
        function ANode($x, $y) {
            this.walkable = true;
            this.costMultiplier = 1.0;
            this.version = 1;
            this.x = $x;
            this.y = $y;
        }
        var d = __define,c=ANode,p=c.prototype;
        p.toString = function () {
            return "x:" + this.x + " y:" + this.y;
        };
        return ANode;
    }());
    ls.ANode = ANode;
    egret.registerClass(ANode,'ls.ANode');
    var BinaryHeap = (function () {
        function BinaryHeap($justMinFun) {
            if ($justMinFun === void 0) { $justMinFun = null; }
            this.a = [];
            this.justMinFun = function (x, y) {
                return x < y;
            };
            this.a.push(-1);
            if ($justMinFun != null)
                this.justMinFun = $justMinFun;
        }
        var d = __define,c=BinaryHeap,p=c.prototype;
        p.ins = function (value) {
            var p = this.a.length;
            this.a[p] = value;
            var pp = p >> 1;
            while (p > 1 && this.justMinFun(this.a[p], this.a[pp])) {
                var temp = this.a[p];
                this.a[p] = this.a[pp];
                this.a[pp] = temp;
                p = pp;
                pp = p >> 1;
            }
        };
        p.pop = function () {
            var min = this.a[1];
            this.a[1] = this.a[this.a.length - 1];
            this.a.pop();
            var p = 1;
            var l = this.a.length;
            var sp1 = p << 1;
            var sp2 = sp1 + 1;
            while (sp1 < l) {
                if (sp2 < l) {
                    var minp = this.justMinFun(this.a[sp2], this.a[sp1]) ? sp2 : sp1;
                }
                else {
                    minp = sp1;
                }
                if (this.justMinFun(this.a[minp], this.a[p])) {
                    var temp = this.a[p];
                    this.a[p] = this.a[minp];
                    this.a[minp] = temp;
                    p = minp;
                    sp1 = p << 1;
                    sp2 = sp1 + 1;
                }
                else {
                    break;
                }
            }
            return min;
        };
        return BinaryHeap;
    }());
    ls.BinaryHeap = BinaryHeap;
    egret.registerClass(BinaryHeap,'ls.BinaryHeap');
    var Grid = (function () {
        function Grid(numCols, numRows) {
            this._numCols = 0;
            this._numRows = 0;
            this.type = 0;
            this._straightCost = 1.0;
            this._diagCost = Math.SQRT2;
            this._numCols = numCols;
            this._numRows = numRows;
            this._nodes = [];
            for (var i = 0; i < this._numCols; i++) {
                this._nodes[i] = [];
                for (var j = 0; j < this._numRows; j++) {
                    this._nodes[i][j] = new ANode(i, j);
                }
            }
        }
        var d = __define,c=Grid,p=c.prototype;
        p.getType = function () {
            return this.type;
        };
        d(p, "startNode"
            ,function () {
                return this._startNode;
            }
        );
        d(p, "endNode"
            ,function () {
                return this._endNode;
            }
        );
        d(p, "numCols"
            ,function () {
                return this._numCols;
            }
        );
        d(p, "numRows"
            ,function () {
                return this._numRows;
            }
        );
        //0四方向 1八方向 2跳棋
        p.calculateLinks = function (type) {
            if (type === void 0) { type = 0; }
            this.type = type;
            for (var i = 0; i < this._numCols; i++) {
                for (var j = 0; j < this._numRows; j++) {
                    this.initNodeLink(this._nodes[i][j], type);
                }
            }
        };
        p.initNodeLink = function (node, type) {
            var startX = Math.max(0, node.x - 1);
            var startY = Math.max(0, node.y - 1);
            var endX = Math.min(this.numCols - 1, node.x + 1);
            var endY = Math.min(this.numRows - 1, node.y + 1);
            node.links = [];
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this.getNode(i, j);
                    if (test == node || !test.walkable)
                        continue;
                    if (type != 2 && i != node.x && j != node.y) {
                        var test2 = this.getNode(node.x, j);
                        if (!test2.walkable)
                            continue;
                        test2 = this.getNode(i, node.y);
                        if (!test2.walkable)
                            continue;
                    }
                    var cost = this._straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        if (type == 1)
                            continue;
                        if (type == 2 && (node.x - test.x) * (node.y - test.y) == 1)
                            continue;
                        if (type == 2)
                            cost = this._straightCost;
                        else
                            cost = this._diagCost;
                    }
                    node.links.push(new Link(test, cost));
                }
            }
        };
        p.getNode = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return this._nodes[x][y];
        };
        p.setEndNode = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (this._nodes[x] && this._nodes[x][y])
                this._endNode = this._nodes[x][y];
        };
        p.setStartNode = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._startNode = this._nodes[x][y];
        };
        p.setWalkable = function (x, y, value) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (value === void 0) { value = true; }
            if (this._nodes[x] && this._nodes[x][y])
                this._nodes[x][y].walkable = value;
        };
        p.getWalkable = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (this._nodes[x] && this._nodes[x][y])
                return this._nodes[x][y].walkable;
            return false;
        };
        p.destory = function () {
            if (this._startNode && this._startNode.parent) {
                this._startNode.parent = null;
                this._startNode = null;
            }
            if (this._endNode && this._endNode.parent) {
                this._endNode.parent = null;
                this._endNode = null;
            }
            if (this._nodes) {
                while (this._nodes.length) {
                    this._nodes.shift();
                }
                this._nodes = null;
            }
        };
        p.hasBarrier = function (startX, startY, endX, endY) {
            if (startX === void 0) { startX = 0; }
            if (startY === void 0) { startY = 0; }
            if (endX === void 0) { endX = 0; }
            if (endY === void 0) { endY = 0; }
            if (startX == endX && startY == endY)
                return false;
            var point1 = new egret.Point(startX, startY);
            var point2 = new egret.Point(endX, endY);
            var distX = Math.abs(endX - startX);
            var distY = Math.abs(endY - startY);
            var loopDirection = distX > distY ? true : false;
            if (loopDirection) {
                var lineFunction = this.getLineFunc(point1, point2, 0);
                var loopStart = Math.min(startX, endX);
                var loopEnd = Math.max(startX, endX);
                for (var i = loopStart; i < loopEnd; i++) {
                    var yPos = lineFunction(i);
                    var passedNodeList = this.getNodesUnderPoint(i, yPos);
                    for (var key in passedNodeList) {
                        if (passedNodeList[key].walkNode == false)
                            return true;
                    }
                }
            }
            else {
                lineFunction = this.getLineFunc(point1, point2, 1);
                loopStart = Math.min(startY, endY);
                loopEnd = Math.max(startY, endY);
                for (var i = loopStart; i < loopEnd; i++) {
                    var xPos = lineFunction(i);
                    var passedNodeList = this.getNodesUnderPoint(xPos, i);
                    for (var key in passedNodeList) {
                        if (passedNodeList[key].walkable == false)
                            return true;
                    }
                }
            }
            return false;
        };
        p.getNodesUnderPoint = function (xPos, yPos, exception) {
            if (xPos === void 0) { xPos = 0; }
            if (yPos === void 0) { yPos = 0; }
            if (exception === void 0) { exception = null; }
            var result = [];
            var xIsInt = xPos % 1 == 0;
            var yIsInt = yPos % 1 == 0;
            if (xIsInt && yIsInt) {
                result[0] = this.getNode(xPos - 1, yPos - 1);
                result[1] = this.getNode(xPos, yPos - 1);
                result[2] = this.getNode(xPos - 1, yPos);
                result[3] = this.getNode(xPos, yPos);
            }
            else if (xIsInt && !yIsInt) {
                result[0] = this.getNode(xPos - 1, Math.round(yPos));
                result[1] = this.getNode(xPos, Math.round(yPos));
            }
            else if (!xIsInt && yIsInt) {
                result[0] = this.getNode(Math.round(xPos), yPos - 1);
                result[1] = this.getNode(Math.round(xPos), yPos);
            }
            else {
                result[0] = this.getNode(Math.round(xPos), Math.round(yPos));
            }
            if (exception && exception.length > 0) {
                for (var i = 0; result.length; i++) {
                    if (exception.indexOf(result[i]) != -1) {
                        result.splice(i, 1);
                        i--;
                    }
                }
            }
            return result;
        };
        p.getLineFunc = function (point1, point2, type) {
            if (type === void 0) { type = 0; }
            if (point1.x == point2.x) {
                if (type == 0) {
                    throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
                }
                else if (type == 1) {
                    var resultFuc = function (y) {
                        return point1.x;
                    };
                }
                return resultFuc;
            }
            else if (point1.y == point2.y) {
                if (type == 0) {
                    var resultFuc = function (x) {
                        return point1.y;
                    };
                }
                else if (type == 1) {
                    throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
                }
                return resultFuc;
            }
            var a = (point1.y - point2.y) / (point1.x - point2.x);
            var b = point1.y - a * point1.x;
            if (type == 0) {
                var resultFuc = function (x) {
                    return a * x + b;
                };
            }
            else if (type == 1) {
                var resultFuc = function (y) {
                    return (y - b) / a;
                };
            }
            return resultFuc;
        };
        return Grid;
    }());
    ls.Grid = Grid;
    egret.registerClass(Grid,'ls.Grid');
    var Link = (function () {
        function Link(node, cost) {
            this.node = node;
            this.cost = cost;
        }
        var d = __define,c=Link,p=c.prototype;
        return Link;
    }());
    ls.Link = Link;
    egret.registerClass(Link,'ls.Link');
    var AStar = (function () {
        function AStar(grid) {
            this._straightCost = 1.0;
            this._diagCost = Math.SQRT2;
            this.nowversion = 1;
            this.TwoOneTwoZero = 2 * Math.cos(Math.PI / 3);
            this._grid = grid;
            this.heuristic = this.euclidian2;
        }
        var d = __define,c=AStar,p=c.prototype;
        d(p, "grid"
            ,function () {
                return this._grid;
            }
        );
        d(p, "path"
            ,function () {
                return this._path;
            }
        );
        d(p, "floydPath"
            ,function () {
                return this._floydPath;
            }
        );
        p.justMin = function (x, y) {
            return x.f < y.f;
        };
        p.search = function () {
            if (this.findPath()) {
                this.floyd();
                var _findPaths = [];
                for (var i = 0; i < this._floydPath.length; i++) {
                    _findPaths[i] = [];
                    _findPaths[i][0] = this._floydPath[i].x;
                    _findPaths[i][1] = this._floydPath[i].y;
                }
                return _findPaths;
            }
        };
        p.findPath = function () {
            this._endNode = this._grid.endNode;
            this.nowversion++;
            this._startNode = this._grid.startNode;
            this._open = new BinaryHeap(this.justMin);
            this._startNode.g = 0;
            return this.search2();
        };
        p.floyd = function () {
            if (this.path == null)
                return;
            this._floydPath = this.path.concat();
            var len = this._floydPath.length;
            if (len > 2) {
                var vector = new ANode(0, 0);
                var tempVector = new ANode(0, 0);
                this.floydVector(vector, this._floydPath[len - 1], this._floydPath[len - 2]);
                for (var i = this._floydPath.length - 3; i >= 0; i--) {
                    this.floydVector(tempVector, this._floydPath[i + 1], this._floydPath[i]);
                    if (vector.x == tempVector.x && vector.y == tempVector.y) {
                        this._floydPath.splice(i + 1, 1);
                    }
                    else {
                        vector.x = tempVector.x;
                        vector.y = tempVector.y;
                    }
                }
            }
            len = this._floydPath.length;
            for (var i = len - 1; i >= 0; i--) {
                for (var j = 0; j <= i - 2; j++) {
                    if (this.floydCrossAble(this._floydPath[i], this._floydPath[j])) {
                        for (var k = i - 1; k > j; k--) {
                            this._floydPath.splice(k, 1);
                        }
                        i = j;
                        len = this._floydPath.length;
                        break;
                    }
                }
            }
        };
        p.floydCrossAble = function (n1, n2) {
            var ps = this.bresenhamNodes(new egret.Point(n1.x, n1.y), new egret.Point(n2.x, n2.y));
            for (var i = ps.length - 2; i > 0; i--) {
                if (ps[i].x >= 0 && ps[i].y >= 0 && ps[i].x < this._grid.numCols && ps[i].y < this._grid.numRows && !this._grid.getNode(ps[i].x, ps[i].y).walkable) {
                    return false;
                }
            }
            return true;
        };
        p.bresenhamNodes = function (p1, p2) {
            var steep = Math.abs(p2.y - p1.y) > Math.abs(p2.x - p1.x);
            if (steep) {
                var temp = p1.x;
                p1.x = p1.y;
                p1.y = temp;
                temp = p2.x;
                p2.x = p2.y;
                p2.y = temp;
            }
            var stepX = ((p2.x > p1.x) ? 1 : (p2.x < p1.x ? -1 : 0));
            var deltay = (p2.y - p1.y) / Math.abs(p2.x - p1.x);
            var ret = [];
            var nowX = p1.x + stepX;
            var nowY = p1.y + deltay;
            if (steep)
                ret.push(new egret.Point(p1.y, p1.x));
            else
                ret.push(new egret.Point(p1.x, p1.y));
            if (Math.abs(p1.x - p2.x) == Math.abs(p1.y - p2.y)) {
                if (p1.x < p2.x && p1.y < p2.y) {
                    ret.push(new egret.Point(p1.x, p1.y + 1), new egret.Point(p2.x, p2.y - 1));
                }
                else if (p1.x > p2.x && p1.y > p2.y) {
                    ret.push(new egret.Point(p1.x, p1.y - 1), new egret.Point(p2.x, p2.y + 1));
                }
                else if (p1.x < p2.x && p1.y > p2.y) {
                    ret.push(new egret.Point(p1.x, p1.y - 1), new egret.Point(p2.x, p2.y + 1));
                }
                else if (p1.x > p2.x && p1.y < p2.y) {
                    ret.push(new egret.Point(p1.x, p1.y + 1), new egret.Point(p2.x, p2.y - 1));
                }
            }
            while (nowX != p2.x) {
                var fy = Math.floor(nowY);
                var cy = Math.ceil(nowY);
                if (steep)
                    ret.push(new egret.Point(fy, nowX));
                else
                    ret.push(new egret.Point(nowX, fy));
                if (fy != cy) {
                    if (steep)
                        ret.push(new egret.Point(cy, nowX));
                    else
                        ret.push(new egret.Point(nowX, cy));
                }
                else if (deltay != 0) {
                    if (steep) {
                        ret.push(new egret.Point(cy + 1, nowX));
                        ret.push(new egret.Point(cy - 1, nowX));
                    }
                    else {
                        ret.push(new egret.Point(nowX, cy + 1));
                        ret.push(new egret.Point(nowX, cy - 1));
                    }
                }
                nowX += stepX;
                nowY += deltay;
            }
            if (steep)
                ret.push(new egret.Point(p2.y, p2.x));
            else
                ret.push(new egret.Point(p2.x, p2.y));
            return ret;
        };
        p.floydVector = function (target, n1, n2) {
            target.x = n1.x - n2.x;
            target.y = n1.y - n2.y;
        };
        p.search2 = function () {
            var node = this._startNode;
            node.version = this.nowversion;
            while (node != this._endNode) {
                var len = node.links.length;
                for (var i = 0; i < len; i++) {
                    var _test = node.links[i].node;
                    var cost = node.links[i].cost;
                    var g = node.g + cost;
                    var h = this.heuristic(_test);
                    var f = g + h;
                    if (_test.version == this.nowversion) {
                        if (_test.f > f) {
                            _test.f = f;
                            _test.g = g;
                            _test.h = h;
                            _test.parent = node;
                        }
                    }
                    else {
                        _test.f = f;
                        _test.g = g;
                        _test.h = h;
                        _test.parent = node;
                        this._open.ins(_test);
                        _test.version = this.nowversion;
                    }
                }
                if (this._open.a.length == 1)
                    return false;
                node = this._open.pop();
            }
            this.buildPath();
            return true;
        };
        p.buildPath = function () {
            this._path = [];
            var node = this._endNode;
            this._path.push(node);
            while (node != this._startNode) {
                node = node.parent;
                this._path.unshift(node);
            }
        };
        p.manhattan = function (node) {
            return Math.abs(node.x - this._endNode.x) + Math.abs(node.y - this._endNode.y);
        };
        p.manhattan2 = function (node) {
            var dx = Math.abs(node.x - this._endNode.x);
            var dy = Math.abs(node.y - this._endNode.y);
            return dx + dy + Math.abs(dx - dy) / 1000;
        };
        p.euclidian = function (node) {
            var dx = node.x - this._endNode.x;
            var dy = node.y - this._endNode.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        p.chineseCheckersEuclidian2 = function (node) {
            var y = node.y / this.TwoOneTwoZero;
            var x = node.x + node.y / 2;
            var dx = x - this._endNode.x - this._endNode.y / 2;
            var dy = y - this._endNode.y / this.TwoOneTwoZero;
            return Math.sqrt(dx * dx + dy * dy);
        };
        p.euclidian2 = function (node) {
            var dx = node.x - this._endNode.x;
            var dy = node.x - this._endNode.y;
            return dx * dx + dy * dy;
        };
        p.diagonal = function (node) {
            var dx = Math.abs(node.x - this._endNode.x);
            var dy = Math.abs(node.y - this._endNode.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        };
        return AStar;
    }());
    ls.AStar = AStar;
    egret.registerClass(AStar,'ls.AStar');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map