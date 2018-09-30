cc.Class({
    extends: cc.Component,

    properties: {
        enemy_skin: { //敌人皮肤
            default: [],
            type: cc.SpriteFrame
        },
        bomb_anim: { //敌人爆炸动画
            default: [],
            type: cc.SpriteFrame
        },
        bomb_duration: 0.1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.anim = this.node.getChildByName('anim');
        //播放动画帧组件
        this.anim_com = this.anim.addComponent('frame_anim');
       

        // 敌人向下运动
        this.speed_x = 0;
        this.speed_y = -200;
    },
    start() {
        this._set_enemy_idle();
    },
    //设置随机敌人皮肤
    _set_enemy_idle() {
        //0-10
        var skin_type = Math.random() * 9 + 1;
        //向下取整
        skin_type = Math.floor(skin_type);
        if (skin_type >= 10) {
            skin_type = 9;
        }
        cc.log("###############: "+skin_type)
        this.anim.getComponent(cc.Sprite).spriteFrame = this.enemy_skin[skin_type - 1];
    },
    //播放爆炸
    _play_bomb_anim() {
        this.anim_com.sprite_frams = this.bomb_anim;
        this.anim_com.bomb_duration = this.bomb_duration;
        this.anim_com.play_once(function () {
            //把父节点也就是敌人节点删除掉
            this.node.removeFromParent();
        }.bind(this));
    },

    

    update(dt) {
        var sx = this.speed_x * dt;
        var sy = this.speed_y * dt;
        this.node.x += sx;
        this.node.y += sy;

        var w_pos = this.node.convertToWorldSpaceAR(cc.p(0, 0));
        //超出屏幕则删除节点
        if (w_pos.x < -100 || w_pos.x > 500 || w_pos.y < -100) {
            //把父节点也就是敌人节点删除掉
            this.node.removeFromParent();
        }
    },
});