cc.Class({
  extends: cc.Component,
  properties: {
    sceneScript: true,
  },
  onLoad() {
    window.c = this;
  },
  start() {
    this.touchCard();
    console.log(_jsonRes)
    this.loadAtlas('picAltas')
    this.loadStartGameBtn(this.playAnimalGif)
  },
  //点击单词卡逻辑
  touchCard() {
    this.buildGroup$.children.forEach(node => {
      let buildNode = node.children[1];
      buildNode.on('touchstart', () => {
        this.playBuildGif(buildNode)
        cc.audioEngine.play(_jsonRes.touch, false, 1);
        this.scheduleOnce(() => {
          this.stopCustomGif(buildNode)
        }, 3)
      })
    })
  },
  //播放小动物gif动画
  playAnimalGif() {
    this.jsonGroup$.children.forEach(pic => {
      let key = this.randomKey(3, 6)
      this.gifCustomClip(pic, pic.name + '-1-', key)
    })
  },
  //播放建筑gif动画
  playBuildGif(n) {
    this.gifCustomClip(n, n.name + '-2-', 7)
  },
  //获取自定义动画剪辑
  gifCustomClip(node, prefix, sample = 10, repeat = -1, wrapMode = "Normal") {
    const g = node.getComponent("Gif")
    const frames = []
    var j = 1
    for (let i in this.altas) {
      if (i == prefix + j + ".png") {
        frames.push(this.altas[i]);
        j++
      }
    }
    g.sample = sample
    g._frames = frames

    //初始化gif组件，创建动画剪辑,并且添加到animation组件上(在gif.js文件里)
    g.creatAnimationClip()

    g.WrapMode = cc.WrapMode[wrapMode]
    g.repeatCount = repeat
    g.play(repeat)
  },
  //读取图集plist文件与图片，放到一个数组里
  loadAtlas(url) {
    const plistUrl = _json.resources.plist[url]
    const pngUrl = _json.resources.images[url]
    cc.loaderp.loadAtalas(plistUrl, pngUrl).then(altas => {
      this.altas = altas
      let frames = this._frames = []
      for (let i in altas) {
        frames.push(altas[i]);
      }
    })
  },
  //停止自定义gif动画
  stopCustomGif(node) {
    node.getComponent('Gif').animation.stop('comp-spriteframe-anim'); //pause暂停=>resume恢复
    node.getComponent('Gif').showFrameAt(0)
  },
  //取随机数，从k-m之间
  randomKey(k, m) {
    var c = m - k + 1;
    return Math.floor(Math.random() * c + k);
  },
  //load远端图片
  loadPic(url, spNode) {
    cc.loader.load(url, function (errors, tex) {
      var sp = spNode.getComponent(cc.Sprite)
      sp.spriteFrame = new cc.SpriteFrame(tex)
    })
  },
  //loading页面
  loadStartGameBtn(func) {
    const splash = window.document.getElementById('splash');
    const startBtn = window.document.getElementById("start-btn")
    startBtn.style.display = 'inline-block';
    startBtn.onclick = () => {
      splash.style.display = 'none'
      if (func) {
        func.bind(this)()
      }
    }
  },
});
