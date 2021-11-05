/**
 * Tween 工具
 * @author 陈皮皮 (ifaswind)
 * @version 20210320
 * @see TweenUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/TweenUtil.ts
 */
 export default class TweenUtil {

    /**
     * 水平翻转（卡片翻转）
     * @param node 节点
     * @param duration 总时长
     * @param onMiddle 中间状态回调
     * @param onComplete 完成回调
     */
    public static flip(node: cc.Node, duration: number, onMiddle?: Function, onComplete?: Function): Promise<void> {
        return new Promise<void>(res => {
            const tween = cc.tween,
                time = duration / 2,
                scaleX = node.scale,
                skewY = scaleX > 0 ? 20 : -20;
            tween(node)
                .parallel(
                    tween().to(time, { scaleX: 0 }, { easing: 'quadIn' }),
                    tween().to(time, { skewY: -skewY }, { easing: 'quadOut' }),
                )
                .call(() => {
                    onMiddle && onMiddle();
                })
                .parallel(
                    tween().to(time, { scaleX: -scaleX }, { easing: 'quadOut' }),
                    tween().to(time, { skewY: 0 }, { easing: 'quadIn' }),
                )
                .call(() => {
                    onComplete && onComplete();
                    res();
                })
                .start();
        });
    }

}
