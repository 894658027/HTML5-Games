function gameData() {
            var stage = new createjs.Stage("gameView");
            var gameView = new createjs.Container();
            gameView.width = stage.width;
            gameView.height = stage.height;
            stage.addChild(gameView);
            gameDataSheet();
            setPicture(ceil = 30);
            gameBgPic();
function firstScreen(direction = "距离你最近的", dire = 1,ceil = 30) {
            scorePanel.x = 400;
            scorePanel.y = 10;
            stage.addChild(scorePanel); 
            var logScore = 1;
            logSum = 2, logSom = 1; logRow = 1, logClos = 3, logZi = 3;
            let bitmaps = [];
       for (let i = 0; i < logSom; i++) {
             let heroContainer = new createjs.Container();
             redFilter = new createjs.ColorFilter(1,0,0,1,255,0,0);
             blueFilter= new c.ColorFilter(0,0,1,1,0,0,255,0);
             getHero = window.queue.getResult(babyEye.randomRange(1, 10));
             redHeroImg = new FilteredImg(getHero, [this.redFilter]).getImg();
             blueHeroImg = new FilteredImg(getHero, [this.blueFilter]).getImg();
             insect = new createjs.Bitmap(redHeroImg);
             insect_1 = new createjs.Bitmap(blueHeroImg);
         if (glasses == 0) {
                    insect.set({x: ceil, y: 0});
                    } else {
                    insect.set({x: -ceil, y: 0});
            }
              heroContainer.addChild(insect,insect_1);
              heroContainer.compositeOperation = "darken";
              bitmaps.push(heroContainer);
                heroContainer.addEventListener("mousedown", (ev) => {
                gameView.removeChild(ev.target);
                dire = dire - 1;
                createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                if (dire == 0) {
                    success();
                    reset();
                    secondCode();        
                }
            }) 
        }
        for (let i = 0; i < logSum; i++) {
            let heroContainer = new createjs.Container();
             redPic = new createjs.ColorFilter(1,0,0,1,255,0,0);
             bluePic= new c.ColorFilter(0,0,1,1,0,0,255,0);
             getHeros = window.queue.getResult(babyEye.randomRange(1, 10));
             redHeroPic = new FilteredImg(getHeros, [this.redPic]).getImg();
             blueHeroPic = new FilteredImg(getHeros, [this.bluePic]).getImg();
             redImgHero = new createjs.Bitmap(redHeroPic);
             blueImgHero = new createjs.Bitmap(blueHeroPic);

            if (glasses == 0) {
                  redImgHero.set({x: ceil/2, y: 0});
            } else if (glasses == 1) {
                  redImgHero.set({x: -ceil/2, y: 0});
            }
            heroContainer.addChild(redImgHero,blueImgHero);
            heroContainer.compositeOperation = "darken";
            bitmaps.push(heroContainer);
            heroContainer.addEventListener("mousedown", (ev) => {
              fail();
              })
           }
            babyEye.shuffle(bitmaps);
            let bitIndex = 0
       for (var i = 0; i < logRow; i++) {
            for (var j = 0; j < logClos; j++) {
                let bitn = bitmaps[bitIndex]
                bitn.x = 390 + 200 * j;
                bitn.y = 250 + 250 * i;
                gameView.addChild(bitn);
                bitIndex++;
            }
        }
    }
    firstScreen();
    //------------------------------------------第二关开始----------------------------------------------------------
function secondCode() {
                var direction = "距离你近的";
                var zm = "图片";
                var gameViewtwo = new createjs.Container();
                stage.addChild(gameViewtwo);
                secondScreen(gameViewtwo);
    }
function secondScreen(gameViewtwo, direTwo = 1, direction = "距离你近的") {
                scorePanel.x = 400;
                scorePanel.y = 10;
                stage.addChild(scorePanel); 
                gameBg = window.queue.getResult("gamebg");
                let gun = new createjs.Bitmap(gameBg);
                gun.width = stage.width;
                gun.height = stage.height;
                gun.compositeOperation = "lighter";
                gameViewtwo.addChild(gun);
                setPicture(ceila);
                var logSum = 5, logSom = 1; logRow = 2, logClos = 3, logZi = 3;
                let bitmaps = [];
        for (let i = 0; i < logSom; i++) {
                let heroContainer = new createjs.Container();
                redFilter_1 = new createjs.ColorFilter(1,0,0,1,255,0,0);
                blueFilter_1= new c.ColorFilter(0,0,1,1,0,0,255,0);
                getHero_1 = window.queue.getResult(babyEye.randomRange(1, 10));
                redHeroImg_1 = new FilteredImg(getHero_1, [this.redFilter_1]).getImg();
                blueHeroImg_1 = new FilteredImg(getHero_1, [this.blueFilter_1]).getImg();
                insect_2 = new createjs.Bitmap(redHeroImg_1);
                insects_2 = new createjs.Bitmap(blueHeroImg_1);
                if (glasses == 0) {
                    insect_2.set({x: ceila, y: 0});
                } else {
                    insect_2.set({x: -ceila, y: 0});
                }
                heroContainer.addChild(insect_2,insects_2);
                heroContainer.compositeOperation = "darken";
                bitmaps.push(heroContainer);
                heroContainer.addEventListener("mousedown", (ev) => {
                gameViewtwo.removeChild(ev.target);
                direTwo = direTwo - 1;
                createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                if (direTwo == 0) {
                    success();
                    reset();
                    thirdlyCode()
                }
            })
        }
        for (let i = 0; i < logSum; i++) {
                let heroContainer = new createjs.Container();
                redPic_2 = new createjs.ColorFilter(1,0,0,1,255,0,0);
                bluePic_2= new c.ColorFilter(0,0,1,1,0,0,255,0);
                getHeros_2 = window.queue.getResult(babyEye.randomRange(1, 10));
                redHeroPic_2 = new FilteredImg(getHeros_2, [this.redPic_2]).getImg();
                blueHeroPic_2 = new FilteredImg(getHeros_2, [this.bluePic_2]).getImg();
                redImgHero_2 = new createjs.Bitmap(redHeroPic_2);
                blueImgHero_2 = new createjs.Bitmap(blueHeroPic_2);
                if (glasses == 0) {
                    redImgHero_2.set({x: ceila/2, y: 0});
                } else if (glasses == 1) {
                    redImgHero_2.set({x: -ceila/2, y: 0});
                }
                heroContainer.addChild(redImgHero_2,blueImgHero_2);
                heroContainer.compositeOperation = "darken";
                bitmaps.push(heroContainer);
                heroContainer.addEventListener("mousedown", (ev) => {
                fail();
                })
               }
                babyEye.shuffle(bitmaps);
                let bitIndex = 0
        for (var i = 0; i < logRow; i++) {
            for (var j = 0; j < logClos; j++) {
                let bitn = bitmaps[bitIndex]
                bitn.x = 370 + 200 * j;
                bitn.y = 190 + 250 * i;
                gameViewtwo.addChild(bitn);
                bitIndex++;
            }
        }
    }
    //------------------------------------------第三关开始----------------------------------------------------------
function thirdlyCode() {
                var direction = "距离你近的";
                var zm = "图片";
                var gameViewthree = new createjs.Container();
                stage.addChild(gameViewthree);
                thirdlyScreen(gameViewthree);
    }
function thirdlyScreen(gameViewthree, direThree = 1, direction = "距离你近的") {
                scorePanel.x = 400;
                scorePanel.y = 10;
                stage.addChild(scorePanel); 
            
                gameBg = window.queue.getResult("gamebg");
                let gun = new createjs.Bitmap(gameBg);
                gun.width = stage.width;
                gun.height = stage.height;
                gun.compositeOperation = "lighter";
                gameViewthree.addChild(gun);
                setPicture(ceilc);     
                var logSum = 8, logSom = 1; logRow = 3, logClos = 3, logZi = 3;
                let bitmaps = [];
        for (let i = 0; i < logSom; i++) {
                let heroContainer = new createjs.Container();
                redFilter_3 = new createjs.ColorFilter(1,0,0,1,255,0,0);
                blueFilter_3= new c.ColorFilter(0,0,1,1,0,0,255,0);
                getHero_3 = window.queue.getResult(babyEye.randomRange(1, 10));
                redHeroImg_3 = new FilteredImg(getHero_3, [this.redFilter_3]).getImg();
                blueHeroImg_3 = new FilteredImg(getHero_3, [this.blueFilter_3]).getImg();
                insect_3 = new createjs.Bitmap(redHeroImg_3);
                insects_3 = new createjs.Bitmap(blueHeroImg_3);
                if (glasses == 0) {
                    insect_3.set({x: ceilc, y: 0});
                } else {
                    insect_3.set({x: -ceilc, y: 0});
                }
                heroContainer.addChild(insect_3,insects_3);
                heroContainer.compositeOperation = "darken";
                bitmaps.push(heroContainer);
                heroContainer.addEventListener("mousedown", (ev) => {
                    gameViewthree.removeChild(ev.target);
                    direThree = direThree - 1;
                    console.log(direThree);
                    createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
                    if (direThree == 0) {
                        //通关条件 等于－1
                        success();
                        reset();
                        thirdlyCode();
                    }
                })
            }
        for (let i = 0; i < logSum; i++) {
            let heroContainer = new createjs.Container();
             redPic_3 = new createjs.ColorFilter(1,0,0,1,255,0,0);
             bluePic_3= new c.ColorFilter(0,0,1,1,0,0,255,0);
             getHeros_3 = window.queue.getResult(babyEye.randomRange(1, 10));
             redHeroPic_3 = new FilteredImg(getHeros_3, [this.redPic_3]).getImg();
             blueHeroPic_3 = new FilteredImg(getHeros_3, [this.bluePic_3]).getImg();
             redImgHero_3 = new createjs.Bitmap(redHeroPic_3);
             blueImgHero_3 = new createjs.Bitmap(blueHeroPic_3);
            if (glasses == 0) {
                redImgHero_3.set({x: ceild, y: 0});
            } else if (glasses == 1) {
                redImgHero_3.set({x: -ceild, y: 0});
            }
            heroContainer.addChild(redImgHero_3,blueImgHero_3);
            heroContainer.compositeOperation = "darken";
            bitmaps.push(heroContainer);
            heroContainer.addEventListener("mousedown", (ev) => {
              fail();
              })
        }
        babyEye.shuffle(bitmaps);
        let bitIndex = 0
        for (var i = 0; i < logRow; i++) {
            for (var j = 0; j < logClos; j++) {
                let bitn = bitmaps[bitIndex]
                bitn.x = 380 + 190 * j;
                bitn.y = 100 + 170 * i;
                gameViewthree.addChild(bitn);
                bitIndex++;
            }
        }
    }
    // // //------------------------------------------第四关开始----------------------------------------------------------
    // function fourthCode() {
    //     gameBgPic(ceilc);
    //     setPicture(ceilc);
    //     var direction = "距离你近的";
    //     var zm = "图片";
    //     //textInit(direction, zm);
    //     var gameViewfourth = new createjs.Container();
    //     stage.addChild(gameViewfourth);
    //     fourthScreen(gameViewfourth);
    // }
    // function fourthScreen(gameViewfourth, direFourth = 4, direction = "距离你近的") {
    //     scorePanel.x = 400;
    //     scorePanel.y = -10;
    //     gameViewfourth.addChild(scorePanel); 
    // let text_sum = new createjs.Text("5 " , "50px Arial", "#ffffff");
    //    text_sum.x = 690;
    //     text_sum.y = 15;
    //     gameViewfourth.addChild(text_sum);
    //     var logSum = 11, logSom = 5; logRow = 4, logClos = 4, logZi = 4;
    //     let bitmaps = [];
    //     for (let i = 0; i < logSom; i++) {
    //         if (glasses == 0) {
    //             var STEimg = new ImageSTE({
    //                 image: window.queue.getResult(babyEye.randomRange(1, 13)),
    //                 colors: ["r", "gb"],
    //                 delta: ceilc
    //             })
    //         } else {
    //             var STEimg = new ImageSTE({
    //                 image: window.queue.getResult(babyEye.randomRange(1, 13)),
    //                 colors: ["gb", "r"],
    //                 delta: ceilc
    //             })
    //         }
    //         insect = new createjs.Bitmap(STEimg);
    //         insect.compositeOperation = "lighter";
    //         bitmaps.push(insect);
    //         var hit = new createjs.Shape();
    //         hit.graphics.beginFill("black").drawRect(0, 0, getImgb.width, getImgb.height);
    //         insect.hitArea = hit;
    //         insect.addEventListener("mousedown", (ev) => {
    //             gameViewfourth.removeChild(ev.target);
    //             text_sum.text = direFourth;
    //             direFourth = direFourth - 1;
    //             createjs.Sound.play("pointsound", createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 1, 0);
    //             if (direFourth == -1) {
    //                 //通关条件 等于－1
    //                 success();
    //                 reset();
    //                 fourthCode();
    //             }
    //         })
    //     }
    //     for (let i = 0; i < logSum; i++) {
    //         if (glasses == 0) {
    //             var STEimgs = new ImageSTE({
    //                 image: window.queue.getResult(babyEye.randomRange(1, 13)),
    //                 colors: ["r", "gb"],
    //                 delta: ceild 
    //             })
    //         } else if (glasses == 1) {
    //             var STEimgs = new ImageSTE({
    //                 image: window.queue.getResult(babyEye.randomRange(1, 13)),
    //                 colors: ["gb", "r"],
    //                 delta: ceild
    //             })
    //         }
    //         insects = new createjs.Bitmap(STEimgs);
    //         insects.compositeOperation = "lighter";
    //         bitmaps.push(insects);
    //         insects.addEventListener("mousedown", (ev) => {
    //           fail();
    //           })
    //     }
    //     babyEye.shuffle(bitmaps);
    //     let bitIndex = 0
    //     for (var i = 0; i < logRow; i++) {
    //         for (var j = 0; j < logClos; j++) {
    //             let bitn = bitmaps[bitIndex]
    //             bitn.x = 170 + 250 * j;
    //             bitn.y = 85 + 160 * i;
    //             bitn.scaleX = 0.9;
    //             bitn.scaleY = 0.9;

    //             gameViewfourth.addChild(bitn);
    //             bitIndex++;
    //         }
    //     }
    // }
    //鼠标换笼子
    function setPicture(ceil = 30) {
            let heroContainer = new createjs.Container();
                redlz = new createjs.ColorFilter(1,0,0,1,255,0,0);
                blurlz= new c.ColorFilter(0,0,1,1,0,0,255,0);
                longzi = window.queue.getResult("longzi");
                redlzs = new FilteredImg(longzi, [this.redlz]).getImg();
                bluelzs = new FilteredImg(longzi, [this.blurlz]).getImg();
                insectlz = new createjs.Bitmap(redlzs);
                insectlzs = new createjs.Bitmap(bluelzs);
                stage.enableMouseOver();
                if (glasses == 0) {
                    insectlz.set({x: ceil, y: 0});
                } else if (glasses == 1) {
                    insectlz.set({x: -ceil, y: 0});
                }
                stage.removeChild(window.gun);

                heroContainer.addChild(insectlz,insectlzs);
                stage.addEventListener("stagemousemove", function () {
                    heroContainer.x = stage.mouseX ;
                    heroContainer.y = stage.mouseY  ;
                })
            heroContainer.compositeOperation = "darken";
            stage.addChild(heroContainer);
    }
    //背景图片
    
    function gameBgPic(ceil = 40) {
                gameBg = window.queue.getResult("gamebg");
                let gun = new createjs.Bitmap(gameBg);
                gun.width = stage.width;
                gun.height = stage.height;
                gun.compositeOperation = "lighter";
                gameView.addChild(gun);
            }
    function reset() {
                stage.removeAllChildren();
                stage.removeAllEventListeners();
                //清空画布
         }
    function musicBg() {//音乐资源
         //createjs.Sound.play("s2", createjs.Sound.INTERRUPT_NONE,0,0,-1,.4,0);
    }
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", function () {
            stage.update();
        //不断更新
    })
    musicBg();
    gamelayer.x = 0;
    gamelayer.y = 0;
    stage.addChild(gamelayer);

    gamelayerBtn.x = 550;
    gamelayerBtn.y = 550;
    stage.addChild(gamelayerBtn);
    let mouseoverF = (ev) => {
                stage.removeChild(ev.target);
                      gamelayerHover.x = 550;
                      gamelayerHover.y = 550;
                      stage.removeChild(gamelayerBtn);
                      stage.addChild(gamelayerHover);
    }

    gamelayerBtn.addEventListener("mouseover", mouseoverF);
     gamelayerHover.addEventListener("mouseout", (ev) => {
                 stage.removeChild(gamelayerHover);
                      gamelayerHover.x = 500;
                      gamelayerHover.y = 550;
                      stage.addChild(gamelayerBtn);
     })
    gamelayerHover.addEventListener("mousedown", (ev) => {
            stage.removeChild(gamelayer);
            stage.removeChild(gamelayerBtn);
             stage.removeChild(gamelayerHover); 
             gamelayerBtn.visible = false;
             gamelayerHover.visible = false;    
              $("#icon_1").show();
              $("#icon_2").show(); 
	          document.body.style.cursor = "none";
  })
}

