
cc.Class({
    extends: cc.Component,

    properties: {
        groups_prefab: {
            default: [],
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
        this._gen_random_group()
    },
    //产生随机的战斗序列
    _gen_random_group() {
        //获得一个随机的数
        var g_type = Math.random() * this.groups_prefab.length + 1;
        g_type = Math.floor(g_type);
        if (g_type >= this.groups_prefab.length) {//如果他大于9，则让他等于9，这个写法很智障
            g_type = this.groups_prefab.length;
        }
        var g = cc.instantiate(this.groups_prefab[g_type -1]);
        console.log(g);
        this.node.addChild(g);
        //屏幕的宽高是400*600；下面是计算出战斗序列随机出现的位置
        g.x = (Math.random()- 0.5) * 200;
        g.y = Math.random() * 100 + 500;

        //这句话用的太棒了，随机2秒到5秒再生成一个战斗序列
        this.scheduleOnce(this._gen_random_group.bind(this),Math.random()*3 + 2)//随机2秒到5秒出现一个战斗单位
    },
    // update (dt) {},
});
