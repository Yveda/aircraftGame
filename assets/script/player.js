
cc.Class({
    extends: cc.Component,

    properties: {
        bomb_anim: { //爆炸动画是个数组
            type: cc.SpriteFrame,
            default: []
        },
        bomb_anim_duration: 0.1, //帧动画时间间隔
        plane_idle: {//玩家的背景图片
            type: cc.SpriteFrame,
            default:null
        },
        bullet_prefab: {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.anim = this.node.getChildByName('anim');
        //this.anim_com就是播放帧动画组件，动态添加组件
        this.anim_com = this.anim.addComponent("frame_anim");
        //触摸移动事件,t表示touch对象
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            //t.getDelta()获取上一次移动的位置
            var offset = t.getDelta();
            this.node.x += offset.x;
            this.node.y += offset.y;
        }.bind(this), this.node);

        //玩家状态：0代表活着，1代表死亡
        this.status_state = 0;

        //test测试爆炸
        ///this._play_bomb_anim();
    },
    start() {

    },
    //发射
    shoot_bullet() {

    },
    //玩家新产生一个生命
    new_life() {    
        //先进行隐身
        this.anim.scale = 0;
        //隔一段时间再出来，比方说隔一秒之后再复活
        this.scheduleOnce(function(){
            //一秒之后显示出来
            this.anim.scale = 1;
            //重置玩家的背景,注意spriteFrame是小写的
            this.anim.getComponent(cc.Sprite).spriteFrame = this.plane_idle;
            //产生无敌效果，或者说不检测碰撞的时候会出现一闪一闪的样子
            var seq = cc.sequence([cc.fadeTo(0.1,128),cc.fadeTo(0.1,255)]);
            //重复播放
            var rf = cc.repeatForever(seq);
            //执行动画
            this.anim.runAction(rf);
        }.bind(this),1);

        //过3秒之后
        this.scheduleOnce(function(){
            //玩家完全的出来，玩家显示活着，不再隐身，可以进行碰撞检测
            this.status_state = 0;
            this.anim.opacity = 255;
            //停止所有的动画
            this.anim.stopAllActions();
        }.bind(this),3);
    },
    //玩家爆炸动画
    _play_bomb_anim() {
        //注意加s
        this.anim_com.sprite_frames = this.bomb_anim;
        this.anim_com.duration = this.bomb_anim_duration;
        //播放一次.玩家爆炸完了之后，产生新的生命
        this.anim_com.play_once(this.new_life.bind(this));
    },
    //玩家碰到敌人，就播放玩家爆炸动画
    on_hit_enemy() {
        //活着的时候发生碰撞才触发这个动画
        if (this.status_state !== 0) {
            return;
        }
        //表示死亡状态
        this.status_state = 1;
        this._play_bomb_anim();
    }
    // update (dt) {},
});