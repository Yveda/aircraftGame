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
        player_path: "UI_ROOT/player",//指定玩家路径
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //找到这个player
        this.player = cc.find(this.player_path);
        this.anim = this.node.getChildByName('anim');
        //播放动画帧组件
        this.anim_com = this.anim.addComponent('frame_anim');
       

        // 敌人向下运动
        this.speed_x = 0;
        this.speed_y = -200;

        //敌人状态0：正常；1:死亡
        this.status_state = 0;
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
        this.anim.getComponent(cc.Sprite).spriteFrame = this.enemy_skin[skin_type - 1];
    },
    //播放敌人爆炸
    _play_bomb_anim() {
        this.anim_com.sprite_frams = this.bomb_anim;
        this.anim_com.bomb_duration = this.bomb_duration;
        this.anim_com.play_once(function () {
            //把父节点也就是敌人节点删除掉
            this.node.removeFromParent();
        }.bind(this));
    },
    //子弹碰到敌人
    on_bullet_hit() {
        //如果敌人正在播放动画就不用了
        if (this.status_state !== 0) {
            return;
        }
        //否则就表示敌人是死亡状态
        this.status_state = 1;
        //接下来就播放敌人爆炸动画
        this._play_bomb_anim();
    },
    update(dt) {
        var sx = this.speed_x * dt;
        var sy = this.speed_y * dt;
        this.node.x += sx;
        this.node.y += sy;

        //如果敌人死亡，则不进行检测
        if (this.status_state === 1) {
            return;
        }
        //敌人和玩家的碰撞检测
        //获取玩家的世界包围盒
        var w_player_box = this.player.getBoundingBoxToWorld();
        //获取enemy的世界包围盒
        var w_enemy_box = this.node.getBoundingBoxToWorld();
        //敌人与玩家相交，即发生碰撞/intersects检测两个矩形的碰撞
        if(w_enemy_box.intersects(w_player_box)){
            //获取player组件，即获取这个脚本
            var player_com = this.player.getComponent('player');
            //调用玩家爆炸动画之行函数
            player_com.on_hit_enemy();
        }


        var w_pos = this.node.convertToWorldSpaceAR(cc.p(0, 0));
        //超出屏幕则删除节点
        if (w_pos.x < -100 || w_pos.x > 500 || w_pos.y < -100) {
            //把父节点也就是敌人节点删除掉
            this.node.removeFromParent();
        }
    },
});