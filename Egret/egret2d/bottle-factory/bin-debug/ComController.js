/**
 * 公共类 放一些公用的方法 节省代码量
 * create by masterLi 2016/11/10
 */
var ComController = (function (_super) {
    __extends(ComController, _super);
    function ComController() {
        _super.call(this);
    }
    var d = __define,c=ComController,p=c.prototype;
    /**毁灭自己 */
    p.destroyMe = function (ele) {
        if (ele) {
            ele.parent.removeChild(ele);
        }
    };
    /**包含测试*/
    p.containTest = function (ele, point) {
        var rect = new egret.Rectangle(ele.x, ele.y, ele.width, ele.height);
        return rect.containsPoint(point);
    };
    /**log输出方法封装 */
    p.log = function (str) {
        console.log(str);
    };
    return ComController;
}(eui.Component));
egret.registerClass(ComController,'ComController');
//# sourceMappingURL=ComController.js.map