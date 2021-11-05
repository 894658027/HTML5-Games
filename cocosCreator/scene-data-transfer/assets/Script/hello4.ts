
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    label: cc.Node = null;


    onLoad () {
        //设置舞台背景透明
        //1
        cc.director.setClearColor(cc.color(0, 0, 0, 0));
        //2打开构建后的style.css 在body里面改写background: transparent;
        //3构建后的main.js  window.boot里面开启 cc.macro.ENABLE_TRANSPARENT_CANVAS = true
    }

    start () {

    }

    // update (dt) {}
}
