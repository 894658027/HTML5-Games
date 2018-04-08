cc.Class({
    extends: cc.Component,

    properties: {
       animateObj:cc.Node,
    },

    onLoad: function () {
     var anim,animObj;
     this.init();
    },
    init: function(){
    this.anim = this.animateObj.getComponent(cc.Animation);// 获取动画的cc.Animation属性
    this.animObj = this.anim.defaultClip; 
    var dom = this.anim.getAnimationState('未命名'); //动画数据
    var dom_one = this.anim.getAnimationState('111');//动画数据
    this.anim.play('未命名');  //播放动画
    // this.anim.pause('未命名'); //暂停动画
    // this.anim.stop('未命名'); //停止动画
    // this.anim.resume('未命名'); //恢复动画

    // this.anim.setCurrentTime(1,'未命名');  //下一个动画才生效

    var clip = dom.clip; //动画关联clip
    var name = dom.name;// 动画name
    // 获取动画的播放速度
    var speed = dom.speed;
    // 获取动画的播放总时长
    var duration = dom.duration; 
    // 获取动画的播放时间
    var time = dom.time;
    // 获取动画的重复次数
    var repeatCount = dom.repeatCount; 
    // 获取动画的循环模式
    var wrapMode = dom.wrapMode
    // 获取动画是否正在播放
    var playing = dom.isPlaying;
    // 获取动画是否已经暂停
    var paused = dom.isPaused;
    // 获取动画的帧率
    var frameRate = dom.frameRate;

    dom.speed = 3;
    // dom.wrapMode = cc.WrapMode.Normal;  // 设置循环模式为 Normal   
    function animateEndFrame(){
        console.log(123);
    }
    function animateLastFrame(){
        console.log(456);
    }
    dom.on('finished',animateEndFrame,this); //未命名动画，播放完成时，回掉函数animateEndFrame
    dom.on('lastframe ',animateLastFrame,this); //假如动画循环次数大于 1，当动画播放到最后一帧时执行 animateLastFrame
    },
   

});
