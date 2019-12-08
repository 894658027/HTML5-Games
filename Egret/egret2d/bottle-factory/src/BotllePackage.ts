/**
 * create by masterLi 2016/11/10
 */
class BotllePackage extends ComController {
	public constructor() {
		super();
	}
    public img_body: eui.Image;
	protected createChildren() {  //bottle1_0.png
		var str = 'bottle' + this.pak_type + '_0_png';
		// this.log(str);
		this.img_body.source = RES.getRes(str);
	}
	/**package的类型 */
	private _pak_type: number;
	public get pak_type(): number {
		return this._pak_type;
	}
	public set pak_type(v: number) {
		this._pak_type = v;
	}
	/**package收集的数量 */
	private _sum: number = 0;
	public get sum(): number {
		return this._sum;
	}
	public set sum(v: number) {
		this._sum = v;
		this.log
		// 改变瓶子的数量时 更改package的皮肤
		var str = "bottle" + this.pak_type + "_" + v + "_png";
		// this.log(str);
		this.img_body.source = RES.getRes(str);
	}

	/**收集瓶子 */
	public addBottle(bottle: Bottle): boolean {
		this.sum += 1;
		if (this.sum >= 6) {
			this.packing();
			return true;
		}
		return false;
	}

	/**是否正在打包若是 就不在放入瓶子 */
    public isPacking: boolean = false;

	/**显示打包动画 */
	public packing() {
		this.isPacking = true;
		var that = this;
		var frameTween = egret.Tween.get(this.img_body);
		for (var i = 7; i < 24; i++) {
			frameTween.wait(100).set({
				'source': RES.getRes("bottle" + this.pak_type + '_' + i + '_png')
			});
		}
		frameTween.call(this.packageOver, this);
	}

	/** 打包完后初始化参数*/
	private packageOver() {
		this.sum = 0;
		this.isPacking = false;
	}
	/**清空包裹 */
	public cleanPackage() {
		this.sum = 0;
	}
}