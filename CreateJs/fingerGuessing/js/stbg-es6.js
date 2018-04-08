$(window).ready(function(){
    class STBG {
        constructor(config){
            this.config = config;
            if(window.bgQueue) {
                this.initBG();
                return;
            }

            window.bgQueue = new c.LoadQueue();
            window.bgQueue.addEventListener("complete", (ev)=>{
                this.initBG();
            });

            window.bgQueue.loadManifest([
                {id: "black-white-bar", src: "http://t.test.babyeye.com/program/old-bird/static/img/stbg/bg1/black-white-bar.png"},
                {id: "white-black-bar", src: "http://t.test.babyeye.com/program/old-bird/static/img/stbg/bg1/white-black-bar.png"},

                {id: "yellow-red-bar", src: "http://t.test.babyeye.com/program/old-bird/static/img/stbg/bg1/yellow-red-bar.png"},
                {id: "red-yellow-bar", src: "http://t.test.babyeye.com/program/old-bird/static/img/stbg/bg1/red-yellow-bar.png"},

                {id: "black-white-box", src: "http://t.test.babyeye.com/program/old-bird/static/img/stbg/bg1/black-white-box.png"},
                {id: "white-black-box", src: "http://t.test.babyeye.com/program/old-bird/static/img/stbg/bg1/white-black-box.png"},

                {id: "yellow-red-box", src: "http://t.test.babyeye.com/program/old-bird/static/img/stbg/bg1/yellow-red-box.png"},
                {id: "red-yellow-box", src: "http://t.test.babyeye.com/program/old-bird/static/img/stbg/bg1/red-yellow-box.png"}
            ])
        }
        initBG() {
            this.stage = new createjs.Stage("bg-canvas");
            this.showTimes = this.config.showTimes < 2?2:this.config.showTimes;
            this.barWidth = this.config.barWidth > 50 ? 50:this.config.barWidth;
            this.deltaTime = this.config.deltaTime < 30? 30: this.config.deltaTime ;
            this.base = 50;
            this.bgIndex = 0;
            this.currentShowTimes = 0;
            this.bgTypes = ["black-white-bar","white-black-bar", "yellow-red-bar", "red-yellow-bar",
            "black-white-box","white-black-box", "yellow-red-box","red-yellow-box",
            "black", "white","yellow", "red"];
            this.nextBool = true;
            this.rotationBool = false;
            this.bgMaterial = window.bgQueue.getResult("black-white-bar");
            this.pauseValue = false;
            this.stopValue = false;

            this.bg = new createjs.Shape();
            this.stage.addChild(this.bg);
            this.bg.set({
                regX: this.stage.canvas.width,
                regY: this.stage.canvas.height,
                x: this.stage.canvas.width/2,
                y: this.stage.canvas.height/2
            })
            let a = this.barWidth/this.base;
            let b = 0;
            let c = 0;
            let d = this.barWidth/this.base;
            let tx = 0;
            let ty = 0;
            this.matrix = new createjs.Matrix2D(a, b, c, d, tx, ty);
            this.update();
        }

        setBarWidth(barWidth){
            this.barWidth = barWidth > 50 ? 50:barWidth;
            let a = this.barWidth/this.base;
            let b = 0;
            let c = 0;
            let d = this.barWidth/this.base;
            let tx = 0;
            let ty = 0;
            this.matrix = new createjs.Matrix2D(a, b, c, d, tx, ty);
        }
        update() {
            this.bg.graphics.clear();
            if(this.bgMaterial){
                this.bg.graphics.beginBitmapFill(this.bgMaterial,"repeat", this.matrix).drawRect(0,0,this.stage.canvas.width * 2,this.stage.canvas.height * 2);
            }else {
                this.bg.graphics.beginFill(this.fillColor).drawRect(0,0,this.stage.canvas.width * 2,this.stage.canvas.height * 2);
            }
            this.stage.update();
            this.next();

            if(!this.pauseValue && !this.stopValue){
                setTimeout(()=>{
                    this.update();
                }, this.deltaTime);
            }
        }

        next(){
            this.currentShowTimes++;
            if(this.currentShowTimes == this.showTimes){
                this.currentShowTimes = 0;
                this.bgIndex++;
                this.bgIndex %= this.bgTypes.length/2;

                if(this.bgIndex == 0) {
                    this.rotationBool = !this.rotationBool;
                }
            }

            if(this.nextBool) {
                this.bgMaterial = window.bgQueue.getResult(this.bgTypes[2 * this.bgIndex + 1]);
                if(!this.bgMaterial) this.fillColor = this.bgTypes[2 * this.bgIndex + 1];
            }else {
                this.bgMaterial = window.bgQueue.getResult(this.bgTypes[2 * this.bgIndex]);
                if(!this.bgMaterial) this.fillColor = this.bgTypes[2 * this.bgIndex];
            }

            this.nextBool = !this.nextBool;

            if(this.rotationBool) {
                this.bg.rotation = (this.bg.rotation + 10) % 360;
            } else {
                this.bg.rotation = 0;
            }
        }

        pause(){
            this.pauseValue = true;
        }

        restart(){
            if(this.pauseValue){
                this.pauseValue = false;
                this.update();
            }
        }

        stop(){
            this.stopValue = true;
        }

        removeSelf(){
            this.stopValue = true;
            this.stage.removeAllChildren();
            this.stage.update();
        }
    }

    window.STBG = STBG;
})