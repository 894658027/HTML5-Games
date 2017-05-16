window.init = function(){
window.queue = new c.LoadQueue();
 let loadingValue = $("#loading span");
  window.queue.installPlugin(createjs.Sound);//如果载入声音，必须先注册createjs.Sound
  window.queue.addEventListener("complete", (ev) => {//放置场景加载完立即执行内容
     gameData();
     $("#loading").hide();
  });
      window.queue.addEventListener("progress", (ev)=>{
            loadingValue.text((ev.progress * 100).toFixed() + "%");
            //console.log(ev.progress);
        })
  window.queue.loadManifest([ //载入一个文件列表
    { id: "pointsound", src: "music/pointsound.mp3" },
    { id: "noMuc", src: "music/noMuc.mp3" },
    { id: "s2", src: "music/s2.mp3" },
    { id: "nzb", src: "music/nzb.mp3" },

    { id: "1", src: "image/insect/qixing.png"},
    { id: "2", src: "image/insect/qixingBig.png"},
    { id: "3", src: "image/insect/mogu.png"},
    { id: "4", src: "image/insect/mifengBig.png"},
    { id: "5", src: "image/insect/mifeng.png"},
    { id: "6", src: "image/insect/mayi.png"},
    { id: "7", src: "image/insect/congzi.png"},
    { id: "8", src: "image/insect/pear.png"},
    { id: "9", src: "image/insect/woniu.png"},

    { id: "gamebg", src: "image/gameBg/gamebg.png"},
    { id: "scorePanel", src: "image/insect/scorePanel.png"},
    { id: "loading", src: "image/direPic/loading.png"},
    { id: "hover", src: "image/direPic/hover.png"},
    { id: "normal", src: "image/direPic/normal.png"},
    { id: "longzi", src: "image/direPic/longzi.png"},
  ])
}
function gameDataSheet(){
          ceila = (Math.ceil(15 + Math.random()*25));
          ceilb = (Math.ceil(15 + Math.random()*25));
          ceilc = (Math.ceil(15 + Math.random()*25));
          ceild = (Math.ceil(5 + Math.random()*5));
          console.log(ceila);
          console.log(ceilc);
          console.log(ceild);

          scorePanel = new createjs.Bitmap(window.queue.getResult("scorePanel"));
          gamelayer = new createjs.Bitmap(window.queue.getResult("loading"));
          gamelayerBtn = new createjs.Bitmap(window.queue.getResult("normal"));
          gamelayerHover = new createjs.Bitmap(window.queue.getResult("hover"));
}
//你真棒 部分 
function success(){
                createjs.Sound.play("nzb", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                $("#sucImg").show(1000);
                $("#sucImg").hide(2000);
}
//失败 部分 
function fail(){
            createjs.Sound.play("noMuc", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                $("#failImg").show(1000);
                $("#failImg").hide(1000);
}
