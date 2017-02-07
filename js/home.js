/**
 * Created by humorHan on 2017/2/4.
 */
require("home.scss");
import name from './common/haha.js';
let home = {
    say(){
        console.log(name);
    }
};
home.say();

let arr = [1,2,3,,4,5];
console.log(arr.length);
arr.forEach((item)=>{
    console.log(item);
});