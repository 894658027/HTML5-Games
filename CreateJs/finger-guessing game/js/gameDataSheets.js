 window.init = () => {
        let loadingValue = $("#loading span");
        window.queue = new c.LoadQueue();
        window.queue.installPlugin(createjs.Sound);
        window.queue.addEventListener("complete", (ev)=>{
             window.game = new Game();
            $("#loading").hide();
        });
        window.queue.addEventListener("progress", (ev)=>{
            loadingValue.text((ev.progress * 100).toFixed() + "%");
        })
        window.queue.loadManifest([
            { id: "pointsound", src: "music/pointsound.mp3" },
            { id: "noMuc", src: "music/noMuc.mp3" },
            { id: "s2", src: "music/s2.mp3" },
            { id: "nzb", src: "music/nzb.mp3" },
        ])
        window.queue.loadManifest([
            { id: "1", src: "image/assest/1.png"},
            { id: "2", src: "image/assest/2.png"},
            { id: "3", src: "image/assest/3.png"},
            { id: "4", src: "image/assest/6.png"},
            { id: "5", src: "image/assest/5.png"},
            { id: "6", src: "image/assest/4.png"},
            { id: "scBtn", src: "image/direPic/scBtn.png"},
            { id: "sgBtn", src: "image/direPic/sgBtn.png"},
            { id: "pjBtn", src: "image/direPic/middle.png"},
            // { id: "scorePanel", src: "image/direPic/scorePanel.png"},
            { id: "loading", src: "image/direPic/loading.png"},
            { id: "hover", src: "image/direPic/hover.png"},
            { id: "normal", src: "image/direPic/normal.png"},
        ]);
    }
 class Game {
        constructor(){
            this.stage = new c.Stage("gameView");
            c.Touch.enable(this.stage);
            this.stage.enableMouseOver();
            this.width = this.stage.canvas.width;
            this.height = this.stage.canvas.height;
            this.gameDataSheet();
            this.render();
            createjs.Sound.play("s2", createjs.Sound.INTERRUPT_NONE,0,0,-1,1,0);
    }
         render(){
                    this.stage.update();
                    window.requestAnimationFrame(()=>{
                        this.render();
                    })
                }
                // localstory 取值
       gameDataSheet(){
                    window.ceil = window.localStorage.vision;
                    console.log(ceil);
                    this.firstScreen();      
                }
                // 游戏主逻辑处理
       firstScreen() {
            var gameView;
                    this.gameView = new createjs.Container();
                    this.stage.addChild(this.gameView);
                    this.bgMain();
        var logScore = 1,logSum = 2, logSom = 1, logRow = 1, logClos = 3, logZi = 3,getHero,insect,getHeros,redImgHero,
        sgBtn_1,sgBtns,scBtn_1,scBtns,pjBtn_1,pjBtns;
                    let bitmaps = [];
//得分面板
        // var scorePanel = new createjs.Bitmap(window.queue.getResult("scorePanel"));
        // scorePanel.x = 400;
        // scorePanel.y = -10;
        // this.gameView.addChild(scorePanel); 

// 左手
                    var heroContainer = new createjs.Container();
                        window.currentIndex = babyEye.randomRange(1, 4);
                        getHero = window.queue.getResult(currentIndex);
                        insect = new createjs.Bitmap(getHero);
                        insect.scaleX = insect.scaleY = ceil;
                        insect.regX = 39;
                        insect.regY = 29;
                        heroContainer.addChild(insect);
                        heroContainer.x = 490;
                        heroContainer.y = 300;
                        this.gameView.addChild(heroContainer);
// 右手
                    var heroContainers = new createjs.Container();
                        window.current = babyEye.randomRange(5, 7);
                        getHeros = window.queue.getResult(current);
                        redImgHero = new createjs.Bitmap(getHeros);
                        redImgHero.scaleX = redImgHero.scaleY = ceil;
                        redImgHero.regX = 39;
                        redImgHero.regY = 29;
                        heroContainers.addChild(redImgHero);
                        heroContainers.x = 800;
                        heroContainers.y = 300;
                        this.gameView.addChild(heroContainers);
//右边赢按钮
                        sgBtn_1 = window.queue.getResult("sgBtn");
                        sgBtns = new createjs.Bitmap(sgBtn_1);
                        sgBtns.scaleX = sgBtns.scaleY = 0.7;
                        sgBtns.x= 760;
                        sgBtns.y = 520;
                        this.gameView.addChild(sgBtns);
//左边赢按钮
                        scBtn_1 = window.queue.getResult("scBtn");
                        scBtns = new createjs.Bitmap(scBtn_1);
                        scBtns.scaleX = scBtns.scaleY = 0.7;
                        scBtns.x= 390;
                        scBtns.y = 520;
                        this.gameView.addChild(scBtns);

//平局按钮
                        pjBtn_1 = window.queue.getResult("pjBtn");
                        pjBtns = new createjs.Bitmap(pjBtn_1);
                        pjBtns.scaleX = pjBtns.scaleY = 0.7;
                        pjBtns.x = 580;
                        pjBtns.y = 520;
                        this.gameView.addChild(pjBtns);
                       
//左边赢判断
                        if(window.currentIndex == 1 && window.current == 6||window.currentIndex == 2 && window.current == 4||window.currentIndex == 3 && window.current == 5){
                           scBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                               this.opinion();
                           })
                        }else{
                           scBtns.addEventListener("mousedown",(ev)=>{
                            this.fail();
                            })
                        }
 //右边赢判断
                          if(window.currentIndex == 3 && window.current == 4||window.currentIndex == 1 && window.current == 5||window.currentIndex == 2 && window.current == 6){
                           sgBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                               this.opinion();
                           })
                        }else{
                           sgBtns.addEventListener("mousedown",(ev)=>{
                            this.fail();
                            })
                        }
//平局判断
                        if(window.currentIndex == 1 && window.current == 4||window.currentIndex == 2 && window.current == 5||window.currentIndex == 3 && window.current == 6){
                           pjBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                               this.opinion();
                           })
                        }else{
                           pjBtns.addEventListener("mousedown",(ev)=>{
                            this.fail();
                            })
                        }     
 } 
//   精灵图与背景缩放元素控制
        opinion(){
                if(ceil == 0.10000000000000014){
                    ceil = ceil - 0.3;
                      ceil += 0.3;
                        }else{
                           ceil = ceil - 0.1;
                         }
                this.success();  
                this.reset();
                this.firstScreen();
        }
// 正确提示
        success(){
                createjs.Sound.play("nzb", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                $("#sucImg").show(500);
                $("#sucImg").hide(500);
        }
 // 错误提示
        fail(){
            createjs.Sound.play("noMuc", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                $("#failImg").show(500);
                $("#failImg").hide(500);
        }
// 清空画布
        reset(){
                        this.stage.removeAllChildren();
                        this.stage.removeAllEventListeners();
                }
// 背景缩放判断处理
       bgMain(){
                if(ceil == 1){
                this.canvasBgeight(); 
                }else if(ceil == 0.9&&ceil == 0.8){
                this.canvasBgseven();
                } 
                else if(ceil == 0.7000000000000001){
                this.canvasBgsix();
                }
                else if(ceil == 0.6000000000000001){
                this.canvasBgfive();
                }else if(ceil == 0.5000000000000001){
                this.canvasBgfour();
                }else if(ceil == 0.40000000000000013){
                this.canvasBgthree();
                }else if(ceil == 0.30000000000000016&&ceil == 0.20000000000000015){
                this.canvasBgtwo();
                }else if(ceil == 0.10000000000000014){
                this.canvasBgone();
      }
   }
//    背景组
         canvasBgone(){
                            var config = {
                            barWidth: 5,
                            deltaTime: 400,
                            showTimes: 8
                        }
                        console.log(1);
                        if(window.stbg) stbg.removeSelf();
                        window.stbg = new STBG(config);
                }
         canvasBgtwo(){
                            var config = {
                            barWidth: 10,
                            deltaTime: 400,
                            showTimes: 8
                        }
                    console.log(2);
                        if(window.stbg) stbg.removeSelf();
                        window.stbg = new STBG(config);
                }
         canvasBgthree(){
                            var config = {
                            barWidth: 15,
                            deltaTime: 400,
                            showTimes: 8
                        }
                    console.log(3);
                        if(window.stbg) stbg.removeSelf();
                        window.stbg = new STBG(config);

                }
         canvasBgfour(){
                            var config = {
                            barWidth: 20,
                            deltaTime: 400,
                            showTimes: 8
                        }
                    console.log(4);
                        if(window.stbg) stbg.removeSelf();
                        window.stbg = new STBG(config);
                }
        canvasBgfive(){
                                var config = {
                            barWidth: 25,
                            deltaTime: 400,
                            showTimes: 8
                        }
                    console.log(5);
                        if(window.stbg) stbg.removeSelf();
                        window.stbg = new STBG(config);
                }
        canvasBgsix(){
                        var config = {
                            barWidth: 30,
                            deltaTime: 400,
                            showTimes: 8
                        }
                        console.log(6);
                        if(window.stbg) stbg.removeSelf();
                        window.stbg = new STBG(config);
                }
        canvasBgseven(){
                        var config = {
                            barWidth: 35,
                            deltaTime: 400,
                            showTimes: 8
                        }
                        console.log(7);
                        if(window.stbg) stbg.removeSelf();
                        window.stbg = new STBG(config);
                }
         canvasBgeight(){
                        var config = {
                            barWidth: 40,
                            deltaTime: 400,
                            showTimes: 8
                        }
                        console.log(8);
                        if(window.stbg) stbg.removeSelf();
                        window.stbg = new STBG(config);
                }  
}