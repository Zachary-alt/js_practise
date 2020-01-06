// toString：toString()函数的作用是返回object的字符串表示

// Array 返回数组元素的字符串，默认以逗号链接。
// Boolean 布尔值的字符串值
// Date 日期UTC标准格式
// Function 函数的字符串值
// Number 数字值的字符串值
// Object [Object Object]
// String 字符串值
// Reg 正则的字符串值


// valueOf：valueOf()函数将对象转换为原始值

// Array 返回数组对象本身
// Boolean 布尔值
// Date 返回时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC
// Function 函数本身
// Number 数字值
// Object 对象本身，这是默认情况。
// String 字符串值
// Reg 正则本身


// 隐式转换规则：
// 转化成字符串：使用字符串连接符 +
// 转化成数字： 2.1 ++/-- （自加/自减） 2.2 + - * / % （算术运算）2.3 > < >= <= == != === !== （关系运算符）
// 转成布尔值：使用！非运算符


// 字符串连接符和算法运算符混淆
let a = '1'
// 当 + 号为字符串连接符时，则调用对象的toString方法转化为字符串然后相加
console.log(a + null)         // '1null'
// 当 + 号为算术运算符时，则调用Number()方法转化然后相加
console.log(a + null)         // 1
console.log(a + undefined)    // NaN (Number(undefined) = NaN)
// 在这里我们需要注意的是null、布尔值和undefined这三类对象使用 + 进行操作，当有一边确定为数字的时候，这三类值会尝试用Number()进行转化

// 关系运算符会把其他数据类型转换成number之后再比较关系
console.log('2' > 10)    // false
// 当关系比较有一边为数字的时候，会把其他数据类型调用Number()转化为数字后进行运算
// 当关系比较两边都为字符串的时候，会同时把字符串转化为数字进行比较，但是不是用Number()进行转化，
// 而是按照字符串的unicode编码进行转化(string.charCodeAt,默认为字符的第一位)
console.log('ab' > 'aa') // true


// 复杂数据类型在隐式转换时会先转成String，然后再转成Number运算
// 复杂类型数据指的是对象或数组这类数据进行隐式转换时，会先调用valueOf后调用toString方法转化成数据，再调用Number()转化成数字进行运算。
// 如果这个对象的valueOf方法和toString方法被重写过，则会根据valueOf返回的数据类型判断是否执行toString。
let a = {
    valueOf: function () {
        console.log('执行valueOf')
        // return 'a'
        // return 1
        return {}
    },
    toString: function () {
        console.log('执行toString')
        return 'a'
    }
}
console.log(a == 'a')
// 执行valueOf
// true

// 执行valueOf
// false

// 执行valueOf
// 执行toString
// true

// valueOf返回的数据类型决定是否调用toString，如果返回的类型是数字或者字符串(其实用基础数据类型更准确点)，toString方法就不执行了。
// 转化成字符串后再调用Number()转化成数字进行比较

// 这里还有个问题就是如果toString方法返回不是基础类型，进行比较的时候则会报错。



// 逻辑非隐式转换与关系运算符隐式转换混淆

// 当使用!逻辑非运算符进行转化的时候，会尝试把数据转化成布尔值
// 以下情况使用Boolean()转化将会得到false
// 0、-0、undefined、null、NaN、false、''(空字符串)、document.all
console.log([] == 0)    // true
console.log(![] == 0)   // true
// [] == 0 --> [].valueOf().toString()得到空字符串，Number('') == 0 成立
// ![] == 0 --> Boolean([])得到true再取反，最后转化成数字0，Number(!true) == 0 成立
 
console.log([] == ![])  // true
console.log([] == [])   // false
// [] == ![] --> [].valueOf().toString()得到空字符串，Number('')取得0，Boolean([])得到true再取反，转化成数字0，最后Number('') == Number(!true) 成立
// [] == [] --> 两个数组比较是因为两个数据的引用指向不一致，所以 [] == [] 不成立
 
console.log({} == !{})  // false
console.log({} == {})   // false
// {} == !{} --> {}.valueOf().toString()得到'[object Object]'，Boolean({})得到true再取反，所以 '[object Object]' == false 不成立
// {} == {} --> 两个对象比较是因为两个数据的引用指向不一致，所以 {} == {} 不成立