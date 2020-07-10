cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
    this.loadStartGameBtn();
    },
    loadStartGameBtn(func) {
        const splash = window.document.getElementById('splash')       //loading页面
        const startBtn = window.document.getElementById("start-btn")  //开始按钮
        startBtn.style.display = 'inline-block';
        startBtn.onclick = () => {
          splash.style.display = 'none'
          this.guideState = true;
          this.guideScondState = true;
          if (func) {
            func.bind(this)()
          }
        }
      },
});
