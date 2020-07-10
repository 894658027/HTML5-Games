cc.Class({
    extends: cc.Component,

    properties: {
        pink:cc.Node,
        yellow:cc.Node,
        purple:cc.Node,
    },

    onLoad: function () {
        this.ctx = this.getComponent(cc.Graphics);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this.node);

        console.log(this.ctx);
    },

    onTouchBegan: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points = [touchLoc];

        return true;
    },

    onTouchMoved: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points.push(touchLoc);

        this.ctx.clear(); //清理屏幕

        for (let i = 0, l = this.points.length; i < l; i++) {
            let p = this.points[i];
            if (i === 0) {
                this.ctx.moveTo(p.x, p.y);
            }
            else {
                this.ctx.lineTo(p.x, p.y);
            }
        }

        this.ctx.stroke();
    },

    onTouchEnded: function (touch, event) {
        this.ctx.lineCap = cc.Graphics.LineCap.ROUND;
        console.log(this.points);

        this.ctx.clear(); //清理屏幕
    },

    update: function (dt) {
        this.pink.on('touchstart',()=>{
            let color = this.pink.children[0].getComponent(cc.Label).string;
            this.ctx.strokeColor.fromHEX(color)
        })
        this.yellow.on('touchstart',()=>{
            let color = this.yellow.children[0].getComponent(cc.Label).string;
            this.ctx.strokeColor.fromHEX(color)
        })
        this.purple.on('touchstart',()=>{
            let color = this.purple.children[0].getComponent(cc.Label).string;
            this.ctx.strokeColor.fromHEX(color)
        })
    },
});
