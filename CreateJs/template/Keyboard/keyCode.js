  $(window).unbind("keydown");
                            $(window).bind("keydown", (ev)=>{
                                let keyMap = {
                                    "37": "left",
                                    "38": "up",
                                    "39": "right",
                                    "40": "down"
                                };
                            if (keyMap[ev.keyCode]) {
                                    ev.preventDefault();
                                    if(keyMap[ev.keyCode] === "left" && 30<sheetContainer.x){
                                    //    console.log(123);
                                    // sheetContainer.scaleX = sheetContainer.scaleX;
                                createjs.Tween.get(sheetContainer).to({ x: sheetContainer.x-this.playLeft }, 500)
                                }else if(keyMap[ev.keyCode] === "right"&& sheetContainer.x<1000){
                                    //    console.log(123);
                                    // sheetContainer.scaleX = -sheetContainer.scaleX;
                                createjs.Tween.get(sheetContainer).to({ x: sheetContainer.x+this.playLeft }, 500)
                                }else{
                                    console.log("按的是上下键");
                                }
                            }
                    })