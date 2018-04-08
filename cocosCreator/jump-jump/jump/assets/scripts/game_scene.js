// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
       
        player:{
            type:cc.Node,
            default: null,
        },
        block_prefab:{
            default: [],
            type: cc.Prefab,
        },
        block_root:{
            type: cc.Node,
            default: null,
        },
        left_org: cc.p(0,0),
        map_root:{
            type:cc.Node,
            default:null,
        },
        y_radio: 0.5560472,  //斜率
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.cur_block = cc.instantiate(this.block_prefab[Math.floor(Math.random() * 3)]);  //  随机产生预制块
        this.block_root.addChild(this.cur_block); 
        this.cur_block.setPosition(this.block_root.convertToNodeSpaceAR(cc.p(this.left_org)));   //转换世界坐标

        var w_pos = this.cur_block.getChildByName("mid").convertToWorldSpaceAR(cc.p(0,0)); //转换回来

        this.player.setPosition(this.map_root.convertToNodeSpaceAR(w_pos));
         
        this.next_block = this.cur_block;

        this.add_block();
    },

    add_block(){

        this.cur_block = this.next_block;

        this.next_block = cc.instantiate(this.block_prefab[Math.floor(Math.random() * 3)]);
        this.block_root.addChild(this.next_block);
        
        var x_distance = 200 + Math.random() * 280;

        var y_distance = x_distance * this.y_radio;

        // this.next_block.setPosition(this.cur_block)
        var next_pos = this.cur_block.getPosition();
        next_pos.x += x_distance;
        next_pos.y += y_distance;
        this.next_block.setPosition(next_pos);

    },
    move_map(offset_x,offset_y){
         var m1 = cc.moveBy(0.5, offset_x,offset_y);
         this.node.runAction(m1);
    },
    // update (dt) {},
});
