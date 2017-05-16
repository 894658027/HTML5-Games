/**
 * create by lys 2016/11/10
 */
/**枚举类型 定义瓶子的类型 */
enum BottleType {
	none, Bottle1, Bottle2, Bottle3, Bottle4, Bottle5, Bottle6
}

class Bottle extends eui.Image {
	public constructor(type: BottleType) {
		super();
		this.BottleType = type;
	}
	/**瓶子类型 */
	private _BottleType: BottleType;
	public get BottleType(): BottleType {
		return this._BottleType;
	}
	public set BottleType(v: BottleType) {
		this._BottleType = v;
		var str = 'bottle' + <number>v + "_png";
		this.source = RES.getRes(str);
	}

    /**记录选中状态  选中状态时设置透明度*/
	private _isSelected: boolean;
	public get isSelected(): boolean {
		return this._isSelected;
	}
	public set isSelected(v: boolean) {
		this._isSelected = v;
		if (v) {
			this.alpha = 0.5;
		} else {
			this.alpha = 1;
		}
	}

}