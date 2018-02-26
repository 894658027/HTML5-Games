var loadingValue = $("#loading span");
window.queue = new c.LoadQueue();
window.queue.installPlugin(createjs.Sound);
window.queue.addEventListener("complete", function (ev) {
     //放置场景加载完立即执行内容
     $("#loading").hide();
     gameData();
});
window.queue.addEventListener("progress", function (ev) {
     // console.log(ev.progress);
    //  loadingValue.text((ev.progress * 100).toFixed() + "%");
});
window.queue.loadManifest([{ id: "pointsound", src: "music/pointsound.mp3" }, { id: "s2", src: "music/s2.mp3" }, { id: "nzb", src: "music/nzb.mp3" }, { id: "noMuc", src: "music/noMuc.mp3" }, { id: "5up", src: "image/5/5pxup.png" }, { id: "5down", src: "image/5/5pxdown.png" }, { id: "200up", src: "image/200/200pxup.png" }, { id: "80up", src: "image/80/80pxup.png" }, { id: "50up", src: "image/50/50pxup.png" }, { id: "40up", src: "image/40/40pxup.png" }, { id: "30up", src: "image/30/30pxup.png" }, { id: "25up", src: "image/25/25pxup.png" }, { id: "20up", src: "image/20/20pxup.png" }, { id: "15up", src: "image/15/15pxup.png" }, { id: "10up", src: "image/10/10pxup.png" }, { id: "5up", src: "image/5/5pxup.png" }, { id: "200left", src: "image/200/200pxleft.png" }, { id: "80left", src: "image/80/80pxleft.png" }, { id: "50left", src: "image/50/50pxleft.png" }, { id: "40left", src: "image/40/40pxleft.png" }, { id: "30left", src: "image/30/30pxleft.png" }, { id: "25left", src: "image/25/25pxleft.png" }, { id: "20left", src: "image/20/20pxleft.png" }, { id: "15left", src: "image/15/15pxleft.png" }, { id: "10left", src: "image/10/10pxleft.png" }, { id: "5left", src: "image/5/5pxleft.png" }, { id: "40leftup", src: "image/40/40pxleftup.png" }, { id: "25leftup", src: "image/25/25pxleftup.png" }, { id: "20leftup", src: "image/20/20pxleftup.png" }, { id: "30leftup", src: "image/30/30pxleftup.png" }, { id: "15leftup", src: "image/15/15pxleftup.png" }, { id: "10leftup", src: "image/10/10pxleftup.png" }, { id: "5leftup", src: "image/5/5pxleftup.png" }, { id: "40A", src: "image/40/40pxA.png" }, { id: "30A", src: "image/30/30pxA.png" }, { id: "25A", src: "image/25/25pxA.png" }, { id: "20A", src: "image/20/20pxA.png" }, { id: "15A", src: "image/15/15pxA.png" }, { id: "10A", src: "image/10/10pxA.png" }, { id: "5A", src: "image/5/5pxA.png" }]);
localVn = window.localStorage.vision;
//游戏图片数据   
function gameDataSheet() {
     if (localVn == 0.02) {
          logSum = 2;
          sim = "image/200/200pxdown.png";vim = window.queue.getResult("200up");
     }
     if (localVn == 0.05) {
          sim = "image/80/80pxdown.png";vim = window.queue.getResult("80up");
     }
     if (localVn == 0.08 || localVn == 0.08000000000000002) {
          sim = "image/50/50pxdown.png";vim = window.queue.getResult("50up");
     }
     if (localVn == 0.09999999999999998) {
          sim = "image/40/40pxdown.png";vim = window.queue.getResult("40up");
     }
     if (localVn == 0.2) {
          sim = "image/30/30pxdown.png";vim = window.queue.getResult("30up");
     }
     if (localVn == 0.3) {
          sim = "image/25/25pxdown.png";vim = window.queue.getResult("25up");
     }
     if (localVn == 0.4 || localVn == 0.39999999999999997) {
          sim = "image/20/20pxdown.png";vim = window.queue.getResult("20up");
     }
     if (localVn == 0.5 || localVn == 0.49999999999999994) {
          sim = "image/15/15pxdown.png";vim = window.queue.getResult("15up");
     }
     if (localVn == 0.6 || localVn == 0.6000000000000001) {
          sim = "image/10/10pxdown.png";vim = window.queue.getResult("10up");
     }
     if (localVn == 0.8||localVn == 0.7) {
          sim = "image/5/5pxdown.png";vim = window.queue.getResult("5up");
     }
     if (localVn == 1.5) {
          sim = "image/5/5pxdown.png";vim = window.queue.getResult("5up");
     }
}
//算法部分 第二关
function chooseMark() {
     if (localVn == 0.05) {
          rim = "image/50/50pxright.png";lim = window.queue.getResult("50left");
          localBn = 0.08;
     }
     if (localVn == 0.02) {
          localVn = 0.05;
          rim = "image/80/80pxright.png";lim = window.queue.getResult("80left");
          localBn = 0.05;
     }
     if (localVn == 0.09999999999999998) {
          rim = "image/30/30pxright.png";lim = window.queue.getResult("30left");
          localBn = 0.2;
     }
     if (localVn == 0.08 || localVn == 0.08000000000000002) {
          localVn = 0.1;
          rim = "image/40/40pxright.png";lim = window.queue.getResult("40left");
          localBn = 0.1;
     }
     if (localVn == 0.2) {
          rim = "image/25/25pxright.png";lim = window.queue.getResult("25left");
          localBn = 0.3;
     }
     if (localVn == 0.3) {
          rim = "image/20/20pxright.png";lim = window.queue.getResult("20left");
          localBn = 0.4;
     }
     if (localVn == 0.4 || localVn == 0.39999999999999997) {
          rim = "image/15/15pxright.png";lim = window.queue.getResult("15left");
          localBn = 0.5;
     }
     if (localVn == 0.49999999999999994) {
          rim = "image/10/10pxright.png";lim = window.queue.getResult("10left");
          localBn = 0.6;
     }
     if (localVn == 0.6 || localVn == 0.6000000000000001 || localVn == 0.7) {
          rim = "image/5/5pxright.png";lim = window.queue.getResult("5left");
          localBn = 0.8;
     }
     if (localVn == 1.5) {
          rim = "image/5/5pxright.png";lim = window.queue.getResult("5left");
          localBn = 1.5;
     }
}
//算法部分    第三关
function chooseMarks() {
     if (localVn == 0.05) {
          rtm = "image/40/40pxrightup.png";ltm = window.queue.getResult("40leftup");
          localBns = 0.1;
     }
     if (localVn == 0.02) {
          localVn = 0.05;
          rtm = "image/40/40pxrightup.png";ltm = window.queue.getResult("40leftup");
          //localBns = 0.1;
     }
     if (localVn == 0.09999999999999998) {
          rtm = "image/25/25pxrightup.png";ltm = window.queue.getResult("25leftup");
          localBns = 0.3;
     }
     if (localVn == 0.08 || localVn == 0.08000000000000002) {
          localVn = 0.1;
          rtm = "image/25/25pxrightup.png";ltm = window.queue.getResult("25leftup");
          localBns = 0.3;
     }
     if (localVn == 0.2) {
          rtm = "image/20/20pxrightup.png";ltm = window.queue.getResult("20leftup");
          localBns = 0.4;
     }
     if (localVn == 0.3) {
          rtm = "image/15/15pxrightup.png";ltm = window.queue.getResult("15leftup");
          localBns = 0.5;
     }
     if (localVn == 0.1) {
          rtm = "image/30/30pxrightup.png";ltm = window.queue.getResult("30leftup");
          localBns = 0.2;
     }
     if (localVn == 0.4 || localVn == 0.39999999999999997) {
          rtm = "image/10/10pxrightup.png";ltm = window.queue.getResult("10leftup");
          localBns = 0.6;
     }
     if (localVn == 0.6 || localVn == 0.6000000000000001 || localVn == 0.7) {
          rtm = "image/5/5pxrightup.png";ltm = window.queue.getResult("5leftup");
          localBns = (1.5 - 0.5).toFixed(1);
     }
     if (localVn == 1.5) {
          rtm = "image/5/5pxrightup.png";ltm = window.queue.getResult("5leftup");
          localBns = 1.5;
     }
     if (localVn == 0.49999999999999994) {
          rtm = "image/5/5pxrightup.png";ltm = window.queue.getResult("5leftup");
          localBns = 0.8;
     }
}
//算法部分 第四关
function chooseMarkA() {
     if (localVn == 0.05) {
          am = window.queue.getResult("30A");vm = "image/30/30pxV.png";
          localBna = 0.2;
     }
     if (localVn == 0.02) {
          localVn = 0.05;
          am = window.queue.getResult("40A");vm = "image/40/40pxV.png";
          localBna = 0.1;
     }
     if (localVn == 0.09999999999999998) {
          am = window.queue.getResult("20A");vm = "image/20/20pxV.png";
          localBna = 0.4;
     }
     if (localVn == 0.1) {
          am = window.queue.getResult("25A");vm = "image/25/25pxV.png";
          localBna = 0.3;
     }
     if (localVn == 0.08 || localVn == 0.08000000000000002) {
          localVn = 0.1;
          am = window.queue.getResult("40A");vm = "image/40/40pxV.png";
          localBna = 0.3;
     }
     if (localVn == 0.2) {
          am = window.queue.getResult("15A");vm = "image/15/15pxV.png";
          localBna = 0.5;
     }
     if (localVn == 0.3) {
          am = window.queue.getResult("10A");vm = "image/10/10pxV.png";
          localBna = 0.6;
     }
     if (localVn == 0.4 || localVn == 0.39999999999999997) {
          am = window.queue.getResult("5A");vm = "image/5/5pxV.png";
          localBna = 0.8;
     }
     if (localVn == 0.6 || localVn == 0.6000000000000001 || localVn == 0.7) {

          am = window.queue.getResult("5A");vm = "image/5/5pxV.png";
          localBna = 1.5;
     }
     if (localVn == 1.5 || localVn == 0.49999999999999994) {
          am = window.queue.getResult("5A");vm = "image/5/5pxV.png";
          localBna = 1.5;
     }
}
//你真棒 部分
function success() {
     createjs.Sound.play("nzb", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
     $("#sucImg").show(1000);
     $("#sucImg").hide(1000);
}
function fail() {
     createjs.Sound.play("noMuc", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
     $("#failImg").show(1000);
     $("#failImg").hide(1000);
}
//参考图片
var direBitm = new createjs.Bitmap("image/direPic/25pxup.png");
var direBitms = new createjs.Bitmap("image/direPic/25pxup.png");

var direBita = new createjs.Bitmap("image/direPic/25pxleft.png");
var direBitb = new createjs.Bitmap("image/direPic/25pxleft.png");

var direBitmc = new createjs.Bitmap("image/direPic/25pxleftup.png");
var direBitmd = new createjs.Bitmap("image/direPic/25pxleftup.png");

var direBitme = new createjs.Bitmap("image/direPic/25pxA.png");
var direBitmf = new createjs.Bitmap("image/direPic/25pxA.png");
//背景绘制代码 　        
function canvasBgone() {
     var config = {
          barWidth: 5, //条删宽度 5－50
          deltaTime: 400, //闪烁间隔 > 50
          showTimes: 8 //闪烁次数 >=4
     };
     //console.log(1);
     if (window.stbg) stbg.removeSelf();
     window.stbg = new STBG(config);
}
//中
function canvasBgtwo() {
     var config = {
          barWidth: 15, //条删宽度 5－50
          deltaTime: 400, //闪烁间隔 > 50
          showTimes: 8 //闪烁次数 >=4
     };
     // console.log(2);
     if (window.stbg) stbg.removeSelf();
     window.stbg = new STBG(config);
}
//高
function canvasBgthree() {
     var config = {
          barWidth: 25, //条删宽度 5－50
          deltaTime: 400, //闪烁间隔 > 50
          showTimes: 8 //闪烁次数 >=4
     };
     // console.log(3);
     if (window.stbg) stbg.removeSelf();
     window.stbg = new STBG(config);
}
function canvasBgfour() {
     var config = {
          barWidth: 35, //条删宽度 5－50
          deltaTime: 400, //闪烁间隔 > 50
          showTimes: 8 //闪烁次数 >=4
     };
     // console.log(4);
     if (window.stbg) stbg.removeSelf();
     window.stbg = new STBG(config);
}
//背景调用
function bgMain() {
     if (0.05 <= localVn && localVn < 0.1) {
          canvasBgthree();
     } else if (0.08 < localVn && localVn < 0.5) {
          canvasBgtwo();
     } else if (0.4 < localVn && localVn < 0.9 || localVn == 1.5) {
          canvasBgone();
     }
}