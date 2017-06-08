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

            { id: "scorePanel", src: "image/direPic/scorePanel.png"},
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
             this.proloadEvent();
            // this.gameDataSheet();
            this.render();
            // createjs.Sound.play("s2", createjs.Sound.INTERRUPT_NONE,0,0,-1,1,0);
    }
         render(){
                    this.stage.update();
                    window.requestAnimationFrame(()=>{
                        this.render();
                    })
                }
       gameDataSheet(){
                    var gameView;
                    this.gameView = new createjs.Container();
                    this.stage.addChild(this.gameView);
                    this.firstScreen();      
                }
       firstScreen(dire = 0) {
                    // this.canvasBgeight();
        var logScore = 1,logSum = 2, logSom = 1, logRow = 1, logClos = 3, logZi = 3,getHero,insect,getHeros,redImgHero,
        sgBtn_1,sgBtns,scBtn_1,scBtns,pjBtn_1,pjBtns;
                    let bitmaps = [];
//得分面板
        var scorePanel = new createjs.Bitmap(window.queue.getResult("scorePanel"));
        scorePanel.x = 400;
        scorePanel.y = -10;
        this.gameView.addChild(scorePanel); 

                    var heroContainer = new createjs.Container();
                        window.currentIndex = babyEye.randomRange(1, 4);
                        getHero = window.queue.getResult(currentIndex);
                        insect = new createjs.Bitmap(getHero);
                        insect.scaleX = insect.scaleY = 0.3;
                        

                        // createjs.Tween.get(insect,{loop:true})
                        //                             .to({x: insect.x,y:insect.y}, 100)
                        //                             .to({x: insect.x,y:insect.y - 50 }, 100)
                        //                             .to({x: insect.x,y:insect.y}, 100);
                        // createjs.Tween.get(insect,{loop:true})
                        //                             .to({alpha:0}, 1000)
                        //                             .to({alpha:1}, 1000);
                        heroContainer.addChild(insect);
                        heroContainer.x = 400;
                        heroContainer.y = 300;
                        this.gameView.addChild(heroContainer);

                    var heroContainers = new createjs.Container();
                        window.current = babyEye.randomRange(5, 7);
                        getHeros = window.queue.getResult(current);

                        redImgHero = new createjs.Bitmap(getHeros);
                        redImgHero.scaleX = redImgHero.scaleY = 0.3;
                        heroContainers.addChild(redImgHero);
                        heroContainers.x = 750;
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
                        if(window.currentIndex == 1 && window.current == 6){
                           scBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else if(window.currentIndex == 2 && window.current == 4){
                           scBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else if(window.currentIndex == 3 && window.current == 5){
                           scBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else{
                           scBtns.addEventListener("mousedown",(ev)=>{
                            this.fail();
                            })
                        }
                         //右边赢判断
                          if(window.currentIndex == 3 && window.current == 4){
                           sgBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else if(window.currentIndex == 1 && window.current == 5){
                           sgBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else if(window.currentIndex == 2 && window.current == 6){
                           sgBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else{
                           sgBtns.addEventListener("mousedown",(ev)=>{
                            this.fail();
                            })
                        }
                        //平局判断
                        if(window.currentIndex == 1 && window.current == 4){
                           pjBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else if(window.currentIndex == 2 && window.current == 5){
                           pjBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else if(window.currentIndex == 3 && window.current == 6){
                           pjBtns.addEventListener("mousedown",(ev)=>{
                               this.gameView.removeChild(heroContainer);
                                     this.success();  
                                     this.reset();
                                this.gameDataSheet();
                           })
                        }else{
                           pjBtns.addEventListener("mousedown",(ev)=>{
                            this.fail();
                            })
                        }     
 } 
            // secondCode() {
            //                 this.bgMain();
            //                 var direction = "距离你近的";
            //                 var zm = "图片";
            //                 var gameViewtwo = new createjs.Container();
            //                 this.stage.addChild(gameViewtwo);
            //                 this.secondScreen(gameViewtwo);
            //               }
            // secondScreen(gameViewtwo, direTwo = 3, direction = "距离你近的") {
            //                 var logSum = 6, logSom = 3, logRow = 3, logClos = 3, logZi = 3,getHero_1,insect_2,getHeros_2,redImgHero_2;
            //                 // window.ceil = 1;
            //                 let bitmaps = [];
            //         for (let i = 0; i < logSom; i++) {
            //                 let heroContainer = new createjs.Container();
            //                 getHero_1 = window.queue.getResult(babyEye.randomRange(1, 10));
            //                 insect_2 = new createjs.Bitmap(getHero_1);
            //                 insect_2.regX = 25;
            //                 insect_2.regY = 25;
                            
            //                 insect_2.scaleX = insect_2.scaleY = ceil;

            //                 createjs.Tween.get(insect_2,{loop:true}).to({alpha:0}, 500).to({alpha:1}, 500);
            //                 createjs.Tween.get(insect_2,{loop:true}).to({rotation:0}, 1000).to({rotation:360}, 1000);

            //                 heroContainer.addChild(insect_2);
            //                 bitmaps.push(heroContainer);
            //                 heroContainer.addEventListener("mousedown", (ev) => {
            //                 gameViewtwo.removeChild(ev.target.parent);
            //                 direTwo = direTwo - 1;
            //                 createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
            //                 if (direTwo == 0) {
            //                 if(ceil == 0.10000000000000014){
            //                     ceil = ceil - 0.3;
            //                         ceil += 0.3;
            //                     }else{
            //                     ceil = ceil - 0.1;
            //                     }
            //                     console.log(ceil);
            //                     this.success();
            //                     this.reset();
            //                     this.secondCode();
            //                 }
            //             })
            //         }
            //         for (let i = 0; i < logSum; i++) {
            //                 let heroContainer = new createjs.Container();
            //                 getHeros_2 = window.queue.getResult(babyEye.randomRange(1, 10));
            //                 redImgHero_2 = new createjs.Bitmap(getHeros_2);
            //                 redImgHero_2.scaleX = redImgHero_2.scaleY = ceil;
            //                 redImgHero_2.regX = 20;
            //                 redImgHero_2.regY = 20;
            //                 createjs.Tween.get(redImgHero_2,{loop:true}).to({rotation:0}, 1000).to({rotation:360}, 1000);

            //                 heroContainer.addChild(redImgHero_2);
            //                 bitmaps.push(heroContainer);
            //                 heroContainer.addEventListener("mousedown", (ev) => {
            //                 this.fail();
            //                 })
            //             }
            //                 babyEye.shuffle(bitmaps);
            //                 let bitIndex = 0
            //         for (var i = 0; i < logRow; i++) {
            //             for (var j = 0; j < logClos; j++) {
            //                 let bitn = bitmaps[bitIndex]
            //                 bitn.x = 440 + 200 * j;
            //                 bitn.y = 180 + 180 * i;
            //                 gameViewtwo.addChild(bitn);
            //                 bitIndex++;
            //             }
            //         }
            //     }
        success(){
                createjs.Sound.play("nzb", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                $("#sucImg").show(1000);
                $("#sucImg").hide(1000);
        }
        fail(){
            createjs.Sound.play("noMuc", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                $("#failImg").show(1000);
                $("#failImg").hide(1000);
        }
        reset(){
                        this.stage.removeAllChildren();
                        this.stage.removeAllEventListeners();
                }
//        bgMain(){
//                 if(ceil == 0.9&&ceil == 0.8){
//                 this.canvasBgseven();
//                 } 
//                 else if(ceil == 0.7000000000000001){
//                 this.canvasBgsix();
//                 }
//                 else if(ceil == 0.6000000000000001){
//                 this.canvasBgfive();
//                 }else if(ceil == 0.5000000000000001){
//                 this.canvasBgfour();
//                 }else if(ceil == 0.40000000000000013){
//                 this.canvasBgthree();
//                 }else if(ceil == 0.30000000000000016&&ceil == 0.20000000000000015){
//                 this.canvasBgtwo();
//                 }else if(ceil == 0.10000000000000014){
//                 this.canvasBgone();
//       }
//    }
        //  canvasBgone(){
        //                     var config = {
        //                     barWidth: 5,
        //                     deltaTime: 400,
        //                     showTimes: 8
        //                 }
        //                 console.log(1);
        //                 if(window.stbg) stbg.removeSelf();
        //                 window.stbg = new STBG(config);
        //         }
        //  canvasBgtwo(){
        //                     var config = {
        //                     barWidth: 10,
        //                     deltaTime: 400,
        //                     showTimes: 8
        //                 }
        //             console.log(2);
        //                 if(window.stbg) stbg.removeSelf();
        //                 window.stbg = new STBG(config);
        //         }
        //  canvasBgthree(){
        //                     var config = {
        //                     barWidth: 15,
        //                     deltaTime: 400,
        //                     showTimes: 8
        //                 }
        //             console.log(3);
        //                 if(window.stbg) stbg.removeSelf();
        //                 window.stbg = new STBG(config);

        //         }
        //  canvasBgfour(){
        //                     var config = {
        //                     barWidth: 20,
        //                     deltaTime: 400,
        //                     showTimes: 8
        //                 }
        //             console.log(4);
        //                 if(window.stbg) stbg.removeSelf();
        //                 window.stbg = new STBG(config);
        //         }
        // canvasBgfive(){
        //                         var config = {
        //                     barWidth: 25,
        //                     deltaTime: 400,
        //                     showTimes: 8
        //                 }
        //             console.log(5);
        //                 if(window.stbg) stbg.removeSelf();
        //                 window.stbg = new STBG(config);
        //         }
        // canvasBgsix(){
        //                 var config = {
        //                     barWidth: 30,
        //                     deltaTime: 400,
        //                     showTimes: 8
        //                 }
        //                 console.log(6);
        //                 if(window.stbg) stbg.removeSelf();
        //                 window.stbg = new STBG(config);
        //         }
        // canvasBgseven(){
        //                 var config = {
        //                     barWidth: 35,
        //                     deltaTime: 400,
        //                     showTimes: 8
        //                 }
        //                 console.log(7);
        //                 if(window.stbg) stbg.removeSelf();
        //                 window.stbg = new STBG(config);
        //         }
        //  canvasBgeight(){
        //                 var config = {
        //                     barWidth: 40,
        //                     deltaTime: 400,
        //                     showTimes: 8
        //                 }
        //                 console.log(8);
        //                 if(window.stbg) stbg.removeSelf();
        //                 window.stbg = new STBG(config);
        //         }
          proloadEvent(){
                    var gamelayer = new c.Bitmap(window.queue.getResult("loading"));
                    var gamelayerBtn = new c.Bitmap(window.queue.getResult("normal"));
                    var gamelayerHover = new c.Bitmap(window.queue.getResult("hover"));
                    gamelayer.x = 0;
                    gamelayer.y = 0;
                    this.stage.addChild(gamelayer);
                    gamelayerBtn.x = 550;
                    gamelayerBtn.y = 550;
                    this.stage.addChild(gamelayerBtn);
                let mouseoverF = (ev) => {
                    this.stage.removeChild(ev.target);
                    gamelayerHover.x = 550;
                    gamelayerHover.y = 550;
                    this.stage.removeChild(gamelayerBtn);
                    this. stage.addChild(gamelayerHover);
                }
                 gamelayerBtn.addEventListener("mouseover", mouseoverF);
                gamelayerBtn.addEventListener("click", mouseoverF);
                gamelayerHover.addEventListener("mouseout", (ev) => {
                   this.stage.removeChild(gamelayerHover);
                        gamelayerHover.x = 500;
                        gamelayerHover.y = 550;
                       this.stage.addChild(gamelayerBtn);
                })
                gamelayerHover.addEventListener("mousedown", (ev) => {
                        this.stage.removeChild(gamelayer);
                        this.stage.removeChild(gamelayerBtn);
                        this.stage.removeChild(gamelayerHover); 
                        gamelayerBtn.visible = false;
                        gamelayerHover.visible = false;    
                        $("#icon_1").show();
                        $("#icon_2").show(); 
                        //document.body.style.cursor = "none";    
                        this.gameDataSheet();
                    })
               }   
}