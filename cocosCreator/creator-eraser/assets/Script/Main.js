cc.Class({
  extends: cc.Component,

  properties: {
      rsultLabel:cc.Label,
      mask:cc.Mask,
      promptLabel:cc.Label,
  },

  onLoad: function (){
      this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
      this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
      this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
      this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
  },

  onDestroy:function () {
      this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
      this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
      this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
      this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
  },

  start:function () {
  },

  _onTouchBegin:function (event) {

      cc.log('touchBegin');

      var point = event.touch.getLocation();
      point = this.node.convertToNodeSpaceAR(point);
      this._addCircle(point);
  },

  _onTouchMoved:function (event) {
      var point = event.touch.getLocation();
      point = this.node.convertToNodeSpaceAR(point);
      this._addCircle(point);
  },

  _onTouchEnd:function (event) {
      var point = event.touch.getLocation();
      point = this.node.convertToNodeSpaceAR(point);
      this._addCircle(point);
  },

  _onTouchCancel:function (event) {
  },

  _addCircle:function (point) {
      var stencil = this.mask._clippingStencil;
      var color = cc.color(255, 255, 255, 0);
      stencil.drawPoly(this.mask._calculateCircle(point,cc.p(50,50), 64), color, 0, color);
      if (!CC_JSB) {
          cc.renderer.childrenOrderDirty = true;
      }
  },
  //_clippingStencil是Mask组件内部实现遮罩的东西，
  //用于给cc.ClippingNode（cocos2dx的遮罩节点）作stencil。
  //如果Mask组件是RECT或ELLIPSE模式，那_clippingStencil就是一个cc.DrawNode（也是cocos2dx的东西，理解为cc.Graphics），
  //通过画一个矩形或者椭圆来生成遮罩模板stencil（所以功能要实现必须设置Mask的Type属性为RECT或ELLIPSE）。
  //cc.ClippingNode和cc.DrawNode是cocos2dx的东西，不在Creator的官方API中，最好通过Mask组件使用，但是直接操作它可以获得更大的自由度。


  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});