const {ccclass, property} = cc._decorator;
@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    labels: cc.Label = null;

    @property
    text: string = 'hello2';

    start () {
        //接受传过来的值
        console.log(cc.find('data'))
    }
}
