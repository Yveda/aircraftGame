
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed_x = 0;
        this.speed_y = 500;
    },

    start () {

    },

    update (dt) {
        var sx = this.speed_x * dt;
        var sy = this.speed_y * dt;

        this.node.x += sx;
        this.node.y += sy;
    },
});
