cc.Class({
    extends: cc.Component,

    properties: {
     target:cc.Node,
    },

 
    onLoad: function () {
        //  var rightBooks,page,btns;
         var page;
         this.page = 0;
         this.gameBegin();
    },
    /*   */
    gameBegin: function(){
      this.right_1 = cc.find('Canvas/bookPiceBg/right_1');
      this.right_2 = cc.find('Canvas/bookPiceBg/right_2');
      this.right_3 = cc.find('Canvas/bookPiceBg/right_3');
      this.right_4 = cc.find('Canvas/bookPiceBg/right_4');
      this.right_5 = cc.find('Canvas/bookPiceBg/right_5');
      this.right_6 = cc.find('Canvas/bookPiceBg/right_6');
      this.right_7 = cc.find('Canvas/bookPiceBg/right_7');
      this.right_8 = cc.find('Canvas/bookPiceBg/right_8');
      this.gameInit(this.right_1,this.right_2,this.right_3,this.right_4,this.right_5,this.right_6,this.right_7,this.right_8);
    },
    gameInit: function(right_1,right_2,right_3,right_4,right_5,right_6,right_7,right_8){
     
      right_1.zIndex = right_2.zIndex = right_3.zIndex = right_4.zIndex = right_5.zIndex = right_6.zIndex = right_7.zIndex = right_8.zIndex = 0;

              right_1.on('touchstart',(ev) => {
                        if(this.page == 0){
                          right_1.runAction(cc.scaleTo(1, 0.5,1));
                          this.page = 1;
                          right_1.zIndex = right_1.zIndex + 0.1;  //0

                          console.log(right_1.zIndex);

                        }else if(this.page == 1){
                          right_1.zIndex = right_1.zIndex + right_2.zIndex; //1
                          right_1.runAction(cc.scaleTo(1, -0.5,1));
                          this.page = 0;

                          console.log(right_1.zIndex);

                        }
        // this.schedule(function() {
                right_2.on('touchstart',(ev) => {
                          if(this.page == 1){
                              right_2.runAction(cc.scaleTo(1, 0.5,1));
                                right_2.zIndex = right_2.zIndex + right_1.zIndex; //1
                                this.page = 2;

                                console.log(right_2.zIndex);

                          }else if(this.page == 2){
                                // right_2.zIndex = right_2.zIndex + 0.1;  //0
                                right_2.zIndex = right_2.zIndex + 0.1 + 0.1;
                                right_2.runAction(cc.scaleTo(1, -0.5,1));
                                this.page = 1;

                                console.log(right_2.zIndex);

                          }
        // this.schedule(function() {
                right_3.on('touchstart',(ev) => {
                          if(this.page == 2){
                              right_3.runAction(cc.scaleTo(1, 0.5,1));

                                right_3.zIndex = right_2.zIndex + right_1.zIndex
                                this.page = 3;
                                console.log(right_3.zIndex);
                          }
                          else if(this.page == 3){
                            // right_3.zIndex = right_2.zIndex + 0.1;   //0
                            right_3.zIndex = right_2.zIndex  + right_1.zIndex + 0.1;
                            right_3.runAction(cc.scaleTo(1, -0.5,1));
                            this.page = 2;
                            console.log(right_3.zIndex);
                        }
        // this.schedule(function() {
                right_4.on('touchstart',(ev) => {
                          if(this.page == 3){
                              right_4.runAction(cc.scaleTo(1, 0.5,1));
                                // right_4.zIndex = right_2.zIndex + right_1.zIndex;
                                right_4.zIndex = right_2.zIndex + right_1.zIndex;
                                this.page = 4;
                                console.log(right_4.zIndex);
                          }
                          else if(this.page == 4){
                            // right_4.zIndex = right_2.zIndex ;
                            right_4.zIndex = right_2.zIndex + right_1.zIndex + 0.1;

                            right_4.runAction(cc.scaleTo(1, -0.5,1));
                            this.page = 3;
                            console.log(right_4.zIndex);
                            }


        // this.schedule(function() {
                right_5.on('touchstart',(ev) => {
                            if(this.page == 4){
                                right_5.runAction(cc.scaleTo(1, 0.5,1));
                                  right_5.zIndex = right_2.zIndex + right_1.zIndex;
                                  this.page = 5;
                                  console.log(right_5.zIndex);
                             }
                             else if(this.page == 5){
                              // right_5.zIndex = right_2.zIndex - 0.1;
                              right_5.zIndex = right_2.zIndex + right_1.zIndex + 0.1
                              right_5.runAction(cc.scaleTo(1, -0.5,1));
                              this.page = 4;
                              console.log(right_5.zIndex);
                              }
        // this.schedule(function() {
                right_6.on('touchstart',(ev) => {
                                if(this.page == 5){
                                    right_6.runAction(cc.scaleTo(1, 0.5,1));
                                      right_6.zIndex = right_2.zIndex + right_1.zIndex;
                                      this.page = 6;
                                      console.log(right_6.zIndex);
                                 }
                                 else if(this.page == 6){
                                  // right_6.zIndex = right_2.zIndex - 0.1;
                                  right_6.zIndex = right_2.zIndex + right_1.zIndex + 0.1;
                                  right_6.runAction(cc.scaleTo(1, -0.5,1));
                                  this.page = 5;
                                  console.log(right_6.zIndex);
                              }
        // this.schedule(function() {
                right_7.on('touchstart',(ev) => {
                                      if(this.page == 6){
                                          right_7.runAction(cc.scaleTo(1, 0.5,1));
                                          right_7.zIndex = right_2.zIndex + right_1.zIndex;
                                          this.page = 7;
                                          console.log(right_7.zIndex);
                                      }
                                      else if(this.page == 7){
                                          // right_7.zIndex = right_2.zIndex - 0.1;
                                          right_7.zIndex = right_2.zIndex + right_1.zIndex + 0.1;
                                          right_7.runAction(cc.scaleTo(1, -0.5,1));
                                          this.page = 6;
                                          console.log(right_6.zIndex);
                                    }
        // this.schedule(function() {

                right_8.on('touchstart',(ev) => {
                                        if(this.page == 7){
                                            right_8.runAction(cc.scaleTo(1, 0.5,1));
                                              right_8.zIndex = right_2.zIndex + right_1.zIndex;
                                              this.page = 8;
                                              console.log(right_8.zIndex);
                                        }
                                        else if(this.page == 8){
                                              // right_8.zIndex = right_2.zIndex - 0.1;
                                              right_8.zIndex = right_2.zIndex + right_1.zIndex;
                                              right_8.runAction(cc.scaleTo(1, -0.5,1));
                                              this.page = 7;
                                              console.log(right_6.zIndex);
                                       }
                                   })
                                // }, 1);

                               })
                            // }, 1);

                           })
                        // }, 1);

                       })
                    // }, 1);

                  })
                // }, 1);

              })
            // }, 1);
          })
        // }, 1);
    });

   },
});
