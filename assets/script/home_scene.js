
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.started = false;//防止误操作，因为加载场景的时候有可能按了多次
    },

    start () {
      
    },
    on_start_click() {
        if (this.started) {//用一个变量来挡住它，防止误操作
            return;
        }
        this.started = true;
        cc.director.loadScene('game_scene');
    },

    update (dt) {},
});
