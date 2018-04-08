    sheetContainer.on("mousedown", function (evt) {
                                this.parent.addChild(this);
                                this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
                            });
                            sheetContainer.on("pressmove", function (evt) {
                                this.x = evt.stageX + this.offset.x;
                                this.y = evt.stageY + this.offset.y;
                                update = true; 
                            });