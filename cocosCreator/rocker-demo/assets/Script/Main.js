cc.Class({
	extends: cc.Component,

	properties: {
		sceneScript: true,
		rightWallLimit: {
			default: 268,
			tooltip: "右侧墙体限制",
		},
		leftWallLimit: {
			default: -275,
			tooltip: "左侧墙体限制",
		},
		posInit: {
			default: 0,
			tooltip: "坐标初始化",
		},
		clipDuration: {
			default: 3,
			tooltip: "爪子持续时间",
		},
		rocker: cc.Node,
		clip: cc.Node,
		rockerAudio: {
			url: cc.AudioClip,
			default: null
		},
	},
	start() {
		this.loadStartGameBtn();
		this.moveRocker(this.rocker)
	},
	moveRocker(n) {
		n.on('touchstart', () => {
			//播放摇杆音频
			cc.audioEngine.play(this.rockerAudio, false, 1);
		})
		n.on('touchmove', (ev) => {
			//将一个点转换到节点 (局部) 空间坐标系，这个坐标系以锚点为原点。
			var a = n.parent.convertToNodeSpaceAR(ev.touch.getLocation());
			//触摸的点，拖拽移动的点
			var angle = this.getAngle(a, n) - 90
			//区域左侧
			if (angle >= -180 && angle < 0) {
				//左半圆上
				if (angle > -45 && angle < 0) {
					n.rotation = angle
				}
				//左半圆下
				else {
					n.rotation = -45
				}
				//摇杆左侧开关  开启
				this.directionLeft = true;
				this.directionRight = false;
			}
			else {
				//右边半圆上
				if (angle > 0 && angle < 45) {
					n.rotation = angle
				} else {
					n.rotation = 45
				}
				this.directionRight = true;
				this.directionLeft = false;
			}
		})
		n.on("touchend", () => {
			n.runAction(cc.rotateTo(0.3, 0))
			this.rockerInit();
		})
		n.on("touchcancel", () => {
			n.runAction(cc.rotateTo(0.3, 0))
			this.rockerInit();
		})
	},
	rockerInit() {
		this.directionRight = this.posInit;
		this.directionLeft = this.posInit;
	},
	update: function (dt) {
		if (this.directionLeft) {
			//摇杆左边开启
			this.clip.x -= this.clipDuration;
			//限制爪子左区域
			if (this.clip.x < this.leftWallLimit) {
				this.clip.x = this.leftWallLimit;
				this.rockerInit();
			}
		}
		//摇杆右边开启
		if (this.directionRight) {
			this.clip.x += this.clipDuration;
			//限制爪子右区域
			if (this.clip.x > this.rightWallLimit) {
				this.clip.x = this.rightWallLimit;
				this.rockerInit();
			}
		}
	},
});
