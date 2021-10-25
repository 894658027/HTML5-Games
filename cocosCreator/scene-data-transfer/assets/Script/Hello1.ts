const {ccclass, property} = cc._decorator;
import session from "./session"

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    onLoad(){
        //第一种----可以使用import方式，
        console.log(session)
    }
    start () {
        let lableNode = this.label.node;

        //在节点上绑定接口格式
        lableNode['port']={
            sceneId : "hello1",
            name : lableNode.name,
            label : this.label.string,
            
        }
        //第二种---设置常驻节点->要保证常驻节点是根节点，否则取的为null,配合切换场景
        cc.game.addPersistRootNode(lableNode);

        //cc.game.removePersistRootNode(myNode); 取消常驻节点

        this.scheduleOnce(()=>{
            //切换到hello2场景
            cc.director.loadScene("hello2");
        },1)

    }
}
