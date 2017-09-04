var ls;
(function (ls) {
    var DragDropBehaivor = (function (_super) {
        __extends(DragDropBehaivor, _super);
        function DragDropBehaivor() {
            _super.call(this);
            this.isTouchBegin = false;
            this.localX = 0;
            this.localY = 0;
            this.isMoving = false;
        }
        var d = __define,c=DragDropBehaivor,p=c.prototype;
        p.onCreate = function () {
            if (this.inst == null)
                return;
            this.axes = ls.eval_e(this.axes);
            this.enabled = ls.eval_e(this.enabled);
            this.inst.container.touchChildren = this.inst.container.touchEnabled = true;
            this.inst.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
            ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUp, this);
            ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
        };
        p.saveToJSON = function () {
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances,
                "axes": this.axes
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
                this.axes = o["axes"];
            }
        };
        /////////////////////////////////////////////////////////////////
        //                        conditions
        /////////////////////////////////////////////////////////////////
        p.isDragging = function ($isDraggingEvent) {
            return { instances: [this.inst], status: this.isMoving };
        };
        p.onDragStart = function ($onDragStartEvent) {
            return { instances: [this.inst], status: true };
        };
        p.onDrop = function ($onDropEvent) {
            return { instances: [this.inst], status: true };
        };
        /////////////////////////////////////////////////////////////////
        //                        actions
        /////////////////////////////////////////////////////////////////
        p.drop = function () {
            if (this.enabled)
                this.onMouseUp(null);
        };
        p.onMouseDown = function (event) {
            if (this.enabled == 0)
                return;
            this.isTouchBegin = true;
            this.mouseDownInst = this.inst;
            this.localX = event.stageX - this.inst.x - ls.GameUILayer.renderContainer.x;
            this.localY = event.stageY - this.inst.y - ls.GameUILayer.renderContainer.y;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDragStart));
        };
        p.onMouseUp = function (event) {
            if (this.enabled == 0)
                return;
            if (this.mouseDownInst == this.inst) {
                this.isTouchBegin = false;
                this.isMoving = false;
                this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onDrop));
            }
        };
        p.onMouseMove = function (event) {
            if (this.enabled == 0)
                return;
            if (this.mouseDownInst == this.inst) {
                if (this.isTouchBegin) {
                    this.isMoving = true;
                    var newX = event.stageX - this.localX - ls.GameUILayer.renderContainer.x;
                    var newY = event.stageY - this.localY - ls.GameUILayer.renderContainer.y;
                    switch (this.axes) {
                        case 0:
                            this.inst.x = newX;
                            this.inst.y = newY;
                            break;
                        case 1:
                            this.inst.x = newX;
                            break;
                        case 2:
                            this.inst.y = newY;
                            break;
                    }
                }
            }
        };
        p.setEnabled = function (state) {
            var state = ls.eval_e(state);
            ls.assert(typeof state !== "number", "DragDropBehaivor setEnabled parameter type incorrect!!");
            this.enabled = (state == 1);
        };
        /////////////////////////////////////////////////////////////////
        //                        expression
        /////////////////////////////////////////////////////////////////
        p.clone = function () {
            var bh = new DragDropBehaivor();
            bh.enabled = this.enabled;
            bh.name = this.name;
            bh.paramInstances = this.paramInstances;
            bh.axes = this.axes;
            return bh;
        };
        return DragDropBehaivor;
    }(ls.BaseBehavior));
    ls.DragDropBehaivor = DragDropBehaivor;
    egret.registerClass(DragDropBehaivor,'ls.DragDropBehaivor');
    var B_DragDrop_IsDraggingEvent = (function (_super) {
        __extends(B_DragDrop_IsDraggingEvent, _super);
        function B_DragDrop_IsDraggingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=B_DragDrop_IsDraggingEvent,p=c.prototype;
        return B_DragDrop_IsDraggingEvent;
    }(ls.BaseEvent));
    ls.B_DragDrop_IsDraggingEvent = B_DragDrop_IsDraggingEvent;
    egret.registerClass(B_DragDrop_IsDraggingEvent,'ls.B_DragDrop_IsDraggingEvent');
    var B_DragDrop_OnDragStartEvent = (function (_super) {
        __extends(B_DragDrop_OnDragStartEvent, _super);
        function B_DragDrop_OnDragStartEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=B_DragDrop_OnDragStartEvent,p=c.prototype;
        return B_DragDrop_OnDragStartEvent;
    }(ls.BaseEvent));
    ls.B_DragDrop_OnDragStartEvent = B_DragDrop_OnDragStartEvent;
    egret.registerClass(B_DragDrop_OnDragStartEvent,'ls.B_DragDrop_OnDragStartEvent');
    var B_DrapDrop_onDropEvent = (function (_super) {
        __extends(B_DrapDrop_onDropEvent, _super);
        function B_DrapDrop_onDropEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=B_DrapDrop_onDropEvent,p=c.prototype;
        return B_DrapDrop_onDropEvent;
    }(ls.BaseEvent));
    ls.B_DrapDrop_onDropEvent = B_DrapDrop_onDropEvent;
    egret.registerClass(B_DrapDrop_onDropEvent,'ls.B_DrapDrop_onDropEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map