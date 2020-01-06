// 方法一：正则实现　
function format (num) {  
    var reg=/\d{1,3}(?=(\d{3})+$)/g;   
    return (num + '').replace(reg, '$&,');  
}
// 正则表达式 \d{1,3}(?=(\d{3})+$)  表示前面有1~3个数字，后面的至少由一组3个数字结尾
// ?=表示正向引用，可以作为匹配的条件，但匹配到的内容不获取，并且作为下一次查询的开始
// $& 表示与正则表达式相匹配的内容，具体的可查看 w3school的replace()方法

// 正则表达式(?=pattern)的语法
// 正向肯定预查（look ahead positive assert），在任何匹配pattern的字符串开始处匹配查找字符串。
// 这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，”Windows(?=95|98|NT|2000)”能匹配”Windows2000”中的”Windows”，
// 但不能匹配”Windows3.1”中的”Windows”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，
// 而不是从包含预查的字符之后开始。

console.log(format (13123903243));

function format1(num){
    var str = ''
    num=num+''
    for(let i=num.length-1,j=1;i>=0;i--,j++){
        if(j%3==0&&i!=0){
            str=str+num[i]+','
        }else{
            str+=num[i]
        }
        console.log(0,str);
    }
    
    return str.split('').reverse().join('')
}
console.log(format1(13123903243));