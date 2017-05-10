/**
 * Created by humorHan on 2017/5/8.
 */
function Drag(clickDom, moveDom){
    if (typeof($) == 'undefined') {
        throw new Error('亲，请先引入jquery');
    }
    this.$clickDom = $(clickDom);
    this.$moveDom = $(moveDom);
    this.isDragable = false;
    // 点击位置xy坐标和点击时候moveDom的xy
    this.x = '';
    this.y = '';
    this.mx = '';
    this.my = '';
    this.init();
}
Drag.prototype = {
    init: function(){
        this.initBtns();
    },
    initBtns: function(){
        let _this = this;
        _this.$clickDom.on("mousedown", function(event){
            let e = event || window.event;
            _this.x = e.pageX;
            _this.y = e.pageY;
            _this.mx = _this.$moveDom.position().left;
            _this.my = _this.$moveDom.position().top;
            _this.isDragable = true;
        });
        $(document).on("mousemove", function(event){
            if (_this.isDragable) {
                let e =  event || window.event;
                _this.$moveDom.css("left", e.pageX - _this.x + _this.mx);
                _this.$moveDom.css("top", e.pageY - _this.y + _this.my);
            }
        });
        $(document).on("mouseup", function(event){
            _this.isDragable = false;
        });
    }
};

/**
 * 拖动
 * @param clickDom 拖动点击点
 * @param moveDom 拖动移动的dom
 */
module.exports = function(clickDom, moveDom){
    return new Drag(clickDom, moveDom);
};
