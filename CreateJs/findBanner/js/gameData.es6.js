function gameData () {
    var stage = new createjs.Stage("game-canvas");
          var gameView = new createjs.Container();
          gameView.width = stage.width;
          gameView.height = stage.height;
          stage.addChild(gameView);
function textInit(direction = "      ", level = localVn,zm = "视标") {
     }
         gameDataSheet();
 function firstScreen(direction ="      ", dire = 4) {//下视标
               direBitms.x = 1040;
               direBitms.y = -5;
               direBitms.scaleX = direBitms.scaleY = 0.6;
               gameView.addChild(direBitms);
               var logScore = 5;
               if(localVn == 0.02){
                var logScore = 1;
                canvasBgfour();
               }
                bgMain();
               let text_sum = new createjs.Text(logScore, "25px Arial", "#ffffff");
               text_sum.x = 1229;
               text_sum.y = 6;
               gameView.addChild(text_sum);

//图片数量,可点击数量，行数，列数，排列等级
               var logSum = 15,logSom = 5,logRow = 4,logClos = 5,logZi = 5;
               let bitmaps = [];
                if(localVn == 0.02){
                var  logSum = 8,logSom = 1;logRow = 3,logClos = 3,logZi = 3; 
               }
        for(let i = 0; i < logSom;i++){
                let bitA = new createjs.Bitmap(vim); 
                bitmaps.push(bitA);
//热区设置
                var hit = new createjs.Shape();
                hit.graphics.beginFill("black").drawRect(0,0,vim.width,vim.height);
                bitA.hitArea = hit;
                bitA.addEventListener("mousedown", (ev) => {
                gameView.removeChild(ev.target);
//移除事件
                if(localVn == 0.02){
                text_sum.text = new createjs.Text( logScore, "20px Arial", "#000000");
                }else{
                text_sum.text = dire;
                }
                dire = dire - 1;
                createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                if(localVn == 0.02){
                  dire = -1
                }
                if (dire == -1) {
//通关条件 等于－1
                  success();
                  reset();
                  secondCode();
               }
           })
        }
       for(let i = 0; i < logSum;i++){
            let bitV = new createjs.Bitmap(sim);
            bitmaps.push(bitV);
            bitV.addEventListener("mousedown", function (ev) {
                    fail();
                });
        }
            babyEye.shuffle(bitmaps);
       for (var i = 0 ; i < logRow ; i++) {
            for (var j = 0 ; j < logClos ; j++) {
                let bitn = bitmaps[i*logZi + j]
         if(localVn == 0.02){
                 bitn.x = 220 + 290 * j;
                 bitn.y = 1 + 290 * i;
                 gameView.addChild(bitn);  
               }
              if(localVn == 0.05){
                bitn.x = 200 + 180 * j;
                bitn.y = 100 + 180 * i;
                gameView.addChild(bitn);
              }else if(localVn > 0.05){
                bitn.x = 450 + 70 * j;
                bitn.y = 220 + 70 * i;
                gameView.addChild(bitn);
                }
            }
        }
        textInit();
   }
   firstScreen()
//------------------------------------------第二关开始----------------------------------------------------------
//第二关核心代码
function secondCode() {
            canvasBgthree();
            chooseMark();
            var direction = "      ";
            var level = localBn;
            var zm = "视标";
            textInit(direction,level,zm);
            var gameViewtwo = new createjs.Container();
            stage.addChild(gameViewtwo);
            secondScreen(gameViewtwo);
        }
function secondScreen(gameViewtwo,direTwo = 9,direction = "       ") {
               direBitb.x = 965;
               direBitb.y = -10;
               direBitb.scaleX = direBitb.scaleY = 0.8;
               gameViewtwo.addChild(direBitb);
               bgMain();
               let text_sum = new createjs.Text( 10, "20px Arial", "#ffffff");
               text_sum.x = 1225;
               text_sum.y = 13;
               text_sum.textAlign = "center" ;
               gameViewtwo.addChild(text_sum);
//图片数量,可点击数量，行数，列数，排列等级
               var logSum = 40,logSom = 10,logRow = 5,logClos = 10,logZi = 10;
               let bitmaps = [];
//第二关可点击图片
        for(let i = 0; i < logSom;i++){
                let bitA = new createjs.Bitmap(lim);
                bitmaps.push(bitA);
                var hits = new createjs.Shape();
                hits.graphics.beginFill("red").drawRect(0,0,lim.width,lim.height);
                bitA.hitArea = hits;
                bitA.addEventListener("mousedown", (ev) => {
                gameViewtwo.removeChild(ev.target);
//第二关文字右上角
                text_sum.text = direTwo;
//第二关统计
                direTwo = direTwo - 1;
                createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                if (direTwo == 8) {
//通关条件 等于8
                  success();
                  reset();
                  thirdlyCode();
               }
           })
        }
//第二关不可点图片
       for(let i = 0; i < logSum;i++){
            let bitV = new createjs.Bitmap(rim);
            bitmaps.push(bitV);
            bitV.addEventListener("mousedown", function (ev) {
                    fail();
                });
        }
            babyEye.shuffle(bitmaps);
       for (var i = 0 ; i < logRow ; i++) {
            for (var j = 0 ; j < logClos ; j++) {
                let bitn = bitmaps[i*logZi + j]
              if(localVn == 0.05){
                bitn.x = 10 + 130 * j;
                bitn.y = 50 + 130 * i;
                gameViewtwo.addChild(bitn);
              }else if(localVn > 0.05){
                bitn.x = 300 + 70 * j;
                bitn.y = 220 + 70 * i;
                gameViewtwo.addChild(bitn);
                }
            }
        }
   }
//  //------------------------------------------第三关开始----------------------------------------------------------
//游戏住逻辑部分
function thirdlyCode() {
            canvasBgtwo();
            chooseMarks();
            console.log(localVn);
            var direction = "        ";
            var level = localBns;
            var zm = "视标";
            textInit(direction,level,zm);
            var gameViewthree = new createjs.Container();
            stage.addChild(gameViewthree);
            thirdlyScreen(gameViewthree);
        }
function thirdlyScreen(gameViewthree,direThree = 14,direction ="          ") {//下视标
               direBitmd.x = 960;
               direBitmd.y = -10;
               direBitmd.scaleX = direBitmd.scaleY = 0.8;
               gameViewthree.addChild(direBitmd);
               bgMain();
               let text_sum = new createjs.Text( 15, "20px Arial", "#ffffff");
               text_sum.x = 1220;
               text_sum.y = 13;
               text_sum.textAlign = "center" ;
               gameViewthree.addChild(text_sum);
//图片数量,可点击数量，行数，列数，排列等级
               var logSum = 85,logSom = 15,logRow = 10,logClos = 10,logZi = 10;     
               let bitmaps = [];
//第三关可点击图片
        for(let i = 0; i < logSom;i++){
                let bitA = new createjs.Bitmap(ltm);
                bitmaps.push(bitA);
                var hita = new createjs.Shape();
                hita.graphics.beginFill("green").drawRect(0,0,ltm.width,ltm.height);
                bitA.hitArea = hita;
                bitA.addEventListener("mousedown", (ev) => {
                gameViewthree.removeChild(ev.target);
//第三关文字右上角
                text_sum.text =  direThree ;
//第三关统计
                direThree = direThree - 1;
                createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                if (direThree == 13) {
                  //通关条件 等于13
                  success();
                  reset();
                  fourthCode();
               }
           })
        }
//第三关不可点图片
       for(let i = 0; i < logSum;i++){
            let bitV = new createjs.Bitmap(rtm);
            bitmaps.push(bitV);
            bitV.addEventListener("mousedown", function (ev) {
                    fail();
                });
        }
            babyEye.shuffle(bitmaps);
       for (var i = 0 ; i < logRow ; i++) {
            for (var j = 0 ; j < logClos ; j++) {
                let bitn = bitmaps[i*logZi + j]
              if(localVn == 0.05){
                bitn.x = 75 + 120 * j;
                bitn.y = 50 + 70 * i;
                gameViewthree.addChild(bitn);
              }else if(localVn > 0.05){
                bitn.x = 300 + 70 * j;
                bitn.y = 60 + 70 * i;
                gameViewthree.addChild(bitn);
                }
            }
        }
   }
// //------------------------------------------第四关开始----------------------------------------------------------
function fourthCode() {
            canvasBgone();
            chooseMarkA();
            console.log(localVn);
            var direction = "      ";
            var level = localBna;
            var zm = "字母";
            textInit(direction,level,zm);
            var gameViewfourth = new createjs.Container();
            stage.addChild(gameViewfourth);
            fourthScreen(gameViewfourth);
        }
function fourthScreen(gameViewfourth,direFourth = 19,direction ="          ") {//下视标
               direBitmf.x = 960;
               direBitmf.y = -10;
               direBitmf.scaleX = direBitmf.scaleY = 0.8;
               gameViewfourth.addChild(direBitmf);
               bgMain();
               let text_sum = new createjs.Text( 20, "20px Arial", "#ffffff");
               text_sum.x = 1221;
               text_sum.y = 13;
               text_sum.textAlign = "center" ;
               gameViewfourth.addChild(text_sum);
//图片数量,可点击数量，行数，列数，排列等级
               var logSum = 130,logSom = 20,logRow = 10,logClos = 15,logZi = 15;
               let bitmaps = [];
//第四关可点击图片
        for(let i = 0; i < logSom;i++){
                let bitA = new createjs.Bitmap(am);
                bitmaps.push(bitA);
                var hitb = new createjs.Shape();
                hitb.graphics.beginFill("white").drawRect(0,0,ltm.width,ltm.height);
                bitA.hitArea = hitb;

                bitA.addEventListener("mousedown", (ev) => {
                gameViewfourth.removeChild(ev.target);
//第四关文字右上角
                text_sum.text = direFourth;
//第四关统计
                direFourth = direFourth - 1;
                createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                if (direFourth == 18) {
                 //等于18
                  success();
                  reset();
                  //window.location.href="index.html";
                  fourthCode();
               }
           })
        }
//第四关不可点图片
       for(let i = 0; i < logSum;i++){
            let bitV = new createjs.Bitmap(vm);
            bitmaps.push(bitV);
            bitV.addEventListener("mousedown", function (ev) {
                    fail();
                });
        }
            babyEye.shuffle(bitmaps);
       for (var i = 0 ; i < logRow ; i++) {
            for (var j = 0 ; j < logClos ; j++) {
                let bitn = bitmaps[i*logZi + j]
              if(localVn == 0.05){
                bitn.x = 135 + 70 * j;
                bitn.y = 50 + 70 * i;
                gameViewfourth.addChild(bitn);
              }else if(localVn > 0.05){
                bitn.x = 160 + 70 * j;
                bitn.y = 60 + 70 * i;
                gameViewfourth.addChild(bitn);
                }
            }
        }
   }
function reset() {
          stage.removeAllChildren();
          stage.removeAllEventListeners();
          //清空画布
        }
function musicBg() {//音乐资源
    createjs.Sound.play("s2", createjs.Sound.INTERRUPT_NONE,0,0,-1,1,0);
  }
      createjs.Ticker.setFPS(30);
      createjs.Ticker.addEventListener("tick", function () {
      stage.update();
      //不断更新
  })
  musicBg();
}

