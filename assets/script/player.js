
cc.Class({
    extends: cc.Component,

    properties: {
        bomb_anim: { //爆炸动画是个数组
            type: cc.SpriteFrame,
            default: []
        },
        bomb_anim_duration: 0.1, //帧动画时间间隔
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.anim = this.node.getChildByName('anim');
        //this.anim_com就是播放帧动画组件
        this.anim_com = this.anim.addComponent("frame_anim");
        //触摸移动事件,t表示touch对象
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            var offset = t.getDelta();
            this.node.x += offset.x;
            this.node.y += offset.y;
        }.bind(this), this.node);
        //test
        this._play_bomb_anim();
    },
    start() {

    },
    _play_bomb_anim() {
        this.anim_com.sprite_frames = this.bomb_anim;//注意加s
        this.anim_com.duration = this.bomb_anim_duration;
        this.anim_com.play_once();//播放一次
    },
    // update (dt) {},
});