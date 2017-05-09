require('drag.scss');
var dragUtil = require("util/drag-util.js");

var main = {
    init: function(){
        dragUtil('#test .pop-title', '#test');
        dragUtil('#test2 .pop-title', '#test2');
    }
};

$(function(){
    main.init();
});