
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bg_red = this.node.getChildByName('bg_red');
        this.bg_green = this.node.getChildByName('bg_green');
        this.bottom_bg = this.bg_red;//保存一个当前位于最底层的块
        this.speed = -100;//由于是向下运动所以为负数
        //保证子弹在星空的上面，因为子弹是-1000
        this.node.setlocalZOrder(-2000);
    },

    start () {

    },

    update (dt) {
        //让两块一起往下掉
        var s = dt * this.speed;
        this.bg_red.y += s;
        this.bg_green.y += s;

        if (this.bottom_bg.y <= -1669) {//地图切换
            if(this.bottom_bg == this.bg_red){
                this.bg_red.y = this.bg_green.y + 1369;
                this.bottom_bg = this.bg_green;
            }else {
                this.bg_green.y = this.bg_red.y + 1369;
                this.bottom_bg = this.bg_red;
            }
        }
    },
});
