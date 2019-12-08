/**
 * 公共类 放一些公用的方法 节省代码量
 * create by masterLi 2016/11/10
 */
class ComController extends eui.Component {
	public constructor() {
		super();
	}
	/**毁灭自己 */
	public destroyMe(ele: egret.DisplayObject) {
		if (ele) {
			ele.parent.removeChild(ele);
		}
	}
	/**包含测试*/
	public containTest(ele: egret.DisplayObject, point: egret.Point) {
		var rect = new egret.Rectangle(ele.x, ele.y, ele.width, ele.height);
		return rect.containsPoint(point);
	}
	/**log输出方法封装 */
	public log(str) {
		console.log(str);
	}
}