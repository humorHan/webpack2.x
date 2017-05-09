webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

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
            _this.mx = _this.$moveDom.offset().left;
            _this.my = _this.$moveDom.offset().top;
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

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
var dragUtil = __webpack_require__(2);

var main = {
    init: function(){
        dragUtil('#test .pop-title', '#test');
        dragUtil('#test2 .pop-title', '#test2');
    }
};

$(function(){
    main.init();
});

/***/ })
],[4]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9kcmFnLnNjc3M/MjM1NiIsIndlYnBhY2s6Ly8vLi9zcmMvZGVwL3V0aWwvZHJhZy11dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kcmFnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSx5Qzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDbkRBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDLEUiLCJmaWxlIjoianMvZHJhZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Nzcy9kcmFnLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTcvNS84LlxuICovXG5mdW5jdGlvbiBEcmFnKGNsaWNrRG9tLCBtb3ZlRG9tKXtcbiAgICBpZiAodHlwZW9mKCQpID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcign5Lqy77yM6K+35YWI5byV5YWlanF1ZXJ5Jyk7XG4gICAgfVxuICAgIHRoaXMuJGNsaWNrRG9tID0gJChjbGlja0RvbSk7XG4gICAgdGhpcy4kbW92ZURvbSA9ICQobW92ZURvbSk7XG4gICAgdGhpcy5pc0RyYWdhYmxlID0gZmFsc2U7XG4gICAgLy8g54K55Ye75L2N572ueHnlnZDmoIflkozngrnlh7vml7blgJltb3ZlRG9t55qEeHlcbiAgICB0aGlzLnggPSAnJztcbiAgICB0aGlzLnkgPSAnJztcbiAgICB0aGlzLm14ID0gJyc7XG4gICAgdGhpcy5teSA9ICcnO1xuICAgIHRoaXMuaW5pdCgpO1xufVxuRHJhZy5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5pbml0QnRucygpO1xuICAgIH0sXG4gICAgaW5pdEJ0bnM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIF90aGlzLiRjbGlja0RvbS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBsZXQgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIF90aGlzLnggPSBlLnBhZ2VYO1xuICAgICAgICAgICAgX3RoaXMueSA9IGUucGFnZVk7XG4gICAgICAgICAgICBfdGhpcy5teCA9IF90aGlzLiRtb3ZlRG9tLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgICAgICBfdGhpcy5teSA9IF90aGlzLiRtb3ZlRG9tLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgIF90aGlzLmlzRHJhZ2FibGUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgaWYgKF90aGlzLmlzRHJhZ2FibGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgZSA9ICBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICAgICAgX3RoaXMuJG1vdmVEb20uY3NzKFwibGVmdFwiLCBlLnBhZ2VYIC0gX3RoaXMueCArIF90aGlzLm14KTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbW92ZURvbS5jc3MoXCJ0b3BcIiwgZS5wYWdlWSAtIF90aGlzLnkgKyBfdGhpcy5teSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRvY3VtZW50KS5vbihcIm1vdXNldXBcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgX3RoaXMuaXNEcmFnYWJsZSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG4vKipcbiAqIOaLluWKqFxuICogQHBhcmFtIGNsaWNrRG9tIOaLluWKqOeCueWHu+eCuVxuICogQHBhcmFtIG1vdmVEb20g5ouW5Yqo56e75Yqo55qEZG9tXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY2xpY2tEb20sIG1vdmVEb20pe1xuICAgIHJldHVybiBuZXcgRHJhZyhjbGlja0RvbSwgbW92ZURvbSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RlcC91dGlsL2RyYWctdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCdkcmFnLnNjc3MnKTtcbnZhciBkcmFnVXRpbCA9IHJlcXVpcmUoXCJ1dGlsL2RyYWctdXRpbC5qc1wiKTtcblxudmFyIG1haW4gPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKXtcbiAgICAgICAgZHJhZ1V0aWwoJyN0ZXN0IC5wb3AtdGl0bGUnLCAnI3Rlc3QnKTtcbiAgICAgICAgZHJhZ1V0aWwoJyN0ZXN0MiAucG9wLXRpdGxlJywgJyN0ZXN0MicpO1xuICAgIH1cbn07XG5cbiQoZnVuY3Rpb24oKXtcbiAgICBtYWluLmluaXQoKTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2RyYWcuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==