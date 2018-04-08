spriteGroup(){
                        let playLeft, offset;
                        var update = true;
                        this.playLeft = 100;
                        let sheetContainer = new createjs.Container();
                            var data={
                                        "animations": {
                                            "aa": [0, 3,"aa",0.2]
                                        },
                                        "images":["assest/buddy.png"],
                                        "frames":
                                        {
                                            "height":310,
                                            "width":240,
                                            "regX":0,
                                            "regY":0,
                                            "count":4,
                                        }
                                  }
                            let spriteSheet=new createjs.SpriteSheet(data);
                            let bitmapAnimation = new createjs.Sprite(spriteSheet,"aa");

                            sheetContainer.addChild(bitmapAnimation)
                            this.gameView.addChild(sheetContainer); 
                            sheetContainer.x = 520;
                            sheetContainer.y = 200;
}