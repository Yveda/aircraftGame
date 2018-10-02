
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed_x = 0;
        this.speed_y = 500;
        //拿到game_scene.js下的敌人集合的数组
        this.enemy_set = cc.find("UI_ROOT").getComponent("game_scene").enemy_set;
    },

    start () {

    },
    //检测子弹是否碰到敌人，返回true或者false
    hit_enemy_test(w_b_box,enemy_com) {
        //如果敌人正常返回false
        if (enemy_com.status_state !== 0) {
            return false;
        }
        //获得敌人的世界包围盒
        var w_e_box = enemy_com.node.getBoundingBoxToWorld();
        //假设两个相撞，就表示打到了这个敌人
        return w_b_box.intersects(w_e_box);
    },
    update (dt) {
        var sx = this.speed_x * dt;
        var sy = this.speed_y * dt;

        this.node.x += sx;
        this.node.y += sy;

        //如果子弹超出屏幕范围则删除
        if (this.node.y >= 310) {
            this.node.removeFromParent();
            return;//如若没有返回的话就做接下来的碰撞检测 
        }

        //和敌人的碰撞检测

        //获得子弹的世界包围盒
        var w_b_box = this.node.getBoundingBoxToWorld();
        for (var i = 0; i < this.enemy_set.length; i++) {
            //com表示组件，component的缩写，在这里是enemy.js
             var com = this.enemy_set[i].getComponent("enemy")
            //如果是一次有效的碰撞,就将这个敌人删掉
            if(this.hit_enemy_test(w_b_box,com)){
                //子弹碰到了,就调用enemy.js里面的函数
                com.on_bullet_hit();
                this.node.removeFromParent();
                return;
            }
        }
    },
});
