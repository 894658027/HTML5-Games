var game_scene = require('game_scene');
cc.Class({
    extends: cc.Component,

    properties: {
        init_speed: 150,
        a_power: 600,
        y_radio: 0.5560472,  //斜率

        map: {
            type: game_scene,
            default : null
        },
    },

    // onLoad () {},
    player_jump(){
         var x_distance = this.x_distance; //跟方块保持同一距离
         var y_distance = this.x_distance * this.y_radio; //跳到目标位置 -》斜率位=》y

         var target_pos = this.node.getPosition();
         target_pos.x += x_distance;
         target_pos.y += y_distance;

         this.rot_node.runAction(cc.rotateBy(0.5,360));

         var j = cc.jumpTo(0.5, target_pos,200,1);
         var end_func = cc.callFunc(function(){

         }.bind(this));
         var seq = cc.sequence(j,end_func);

         this.node.runAction(j); 
    },

    start () {
          this.rot_node = this.node.getChildByName('rotate');
          this.anim_node = this.rot_node.getChildByName('anim');

          this.is_power_mode = false;   //初始化按钮状态

          this.speed = 0;        //初始化力量
          this.x_distance = 0;   //初始化x坐标位置 -> 通过世界坐标转后的位置
   
          this.anim_node.on(cc.Node.EventType.TOUCH_START, function(e){

               this.is_power_mode = true;
               this.x_distance = 0;  

               this.anim_node.stopAllActions();
               this.anim_node.runAction(cc.scaleTo(2,1,0.5));

          }.bind(this),this); 

          this.anim_node.on(cc.Node.EventType.TOUCH_END, function(e){

               this.is_power_mode = false;

               this.anim_node.stopAllActions();
               this.anim_node.runAction(cc.scaleTo(0.5,1,1));

               this.player_jump();

          }.bind(this),this);

          this.anim_node.on(cc.Node.EventType.TOUCH_CANCEL, function(e){

               this,is_power_mode = false;

               this.anim_node.stopAllActions();
               this.anim_node.runAction(cc.scaleTo(0.5,1,1));

               this.player_jump();
          }.bind(this),this); 
    },

    update (dt) {
   
         if(this.is_power_mode){
            this.speed += (this.a_power * dt);
            this.x_distance += this.speed * dt; // 跳跃距离 += 底数 * 按下时长， 
         }
    },
});
