import TweenUtil from "./TweenUtil"

const { ccclass, property } = cc._decorator;

/**
 * 卡片翻转
 * @see TweenUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/TweenUtil.ts
 * @version 20210320
 */
@ccclass
export default class Case_CardFlip extends cc.Component {

    @property({ displayName: CC_DEV && '卡片', type: cc.Node })
    protected card: cc.Node = null;

    // @property({ displayName: CC_DEV && '翻转按钮', type: cc.Node })
    // protected flipBtn: cc.Node = null;

    /** 按钮组件 */
    protected button: cc.Button = null;

    /** 正面颜色 */
    protected readonly frontColor: cc.Color = cc.Color.WHITE;

    /** 背面颜色 */
    protected readonly backColor: cc.Color = cc.Color.GRAY;

    protected onLoad() {
        // this.init();
        // this.registerEvent();
    }

    protected start() {
        // this.reset();
        this.onFlipBtnClick()
    }

    protected onDestroy() {
        // this.unregisterEvent();
    }

    /**
     * 订阅事件
     */
    // protected registerEvent() {
    //     this.flipBtn.on(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
    // }

    /**
     * 取消事件订阅
     */
    // protected unregisterEvent() {
    //     this.flipBtn.off(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
    // }

    /**
     * 初始化
     */
    // protected init() {
    //     this.button = this.flipBtn.getComponent(cc.Button) || this.flipBtn.addComponent(cc.Button);
    // }

    /**
     * 重置
     */
    protected reset() {
        this.card.color = this.frontColor;
        // this.setButtonState(true);
    }

    /**
     * 翻转按钮点击回调
     */
    protected async onFlipBtnClick() {
        // if (!this.button.interactable) return;
        // this.setButtonState(false);
        await TweenUtil.flip(this.card, 2, () => {
            if (this.card.color.equals(this.frontColor)) {
                this.card.color = this.backColor;
            } else {
                this.card.color = this.frontColor;
            }
        });
        // this.setButtonState(true);
    }

    /**
     * 设置按钮状态
     * @param interactable 是否可点击
     */
    protected setButtonState(interactable: boolean) {
        // this.button.interactable = interactable;
        // this.flipBtn.color = interactable ? cc.Color.WHITE : cc.Color.GRAY;
    }

}