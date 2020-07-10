const methods = {
  //计算角度
  getAngle(p1, p2) {
    //两点的x、y值
    var x = p2.x - p1.x;
    var y = p2.y - p1.y;
    var hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    //斜边长度
    var cos = x / hypotenuse;
    var radian = Math.acos(cos);
    //求出弧度
    var angle = 180 / (Math.PI / radian);
    //用弧度算出角度
    if (y > 0) {
      angle = -angle
    }
    return angle
  },

  //loading页面
  loadStartGameBtn(func) {
    const splash = window.document.getElementById('splash');
    const startBtn = window.document.getElementById("start-btn")  //开始按钮
    startBtn.style.display = 'inline-block';
    startBtn.onclick = () => {
      splash.style.display = 'none'
      if (func) {
        func.bind(this)()
      }
    }
  },
}

/**
* Base Game class
*/
cc.Class({
  extends: cc.Component,
  properties: {
  },
  onLoad: function () {
    this.init();
  },
  init() {
    const comps = this.node._components;
    for (let i in comps) {
      let comp = comps[i];
      if (!comp || comp.sceneScript !== true) {
        continue;
      }
      // inject methods into components whose scenceScript property is true
      Object.assign(comp, methods);
      comp.resourceHost = this.resourceHost;
      comp.query = this._query;
      comp.env = this._env;
    }
  }
});
