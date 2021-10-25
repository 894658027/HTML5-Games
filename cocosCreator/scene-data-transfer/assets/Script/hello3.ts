
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //第三种引入全局变量，
    //  访问全局变量时，如果变量未定义将会抛出异常。
    // 添加全局变量时，请小心不要和系统已有的全局变量重名。
    // 你需要小心确保全局变量使用之前都已初始化和赋值。
    Global: any;
    start() {
        var text = 'Back';
        this.Global = window['Global']
        this.Global.label = text;
        console.log(this.Global)

    }

    // update (dt) {}
}
