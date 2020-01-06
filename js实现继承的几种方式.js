// javascript中实现继承的几中方式

// 借助构造函数实现继承
function Parent1(){
    this.name='jack';
    this.age=18
}
function Child1(){
    Parent1.call(this);
    this.address='南京'
}
var s1=new Child1()
console.log(s1.name);  //jack
// 通过上述栗子，我们好像确实让s1实例继承了父类Child1的name属性，达到了继承的效果，但是这种继承有一个很严重的缺点，具体请看如下代码
//  父类添加say方法
Parent1.prototype.say = function () {
    console.log('say bye bye')
}
//  子类中直接打印这个say方法
// console.log(s1.say())  //报错

// 总结：构造函数继承法只能实现部分继承，如果我们在父类Parent1的原型链上添加属性或者方法的时候子类的实例无法继承到。


// 借助原型链实现继承
function Parent2 () {
    this.name = '祝敏',
    this.age = 19,
    this.play = [1,2,3]
}
//  一样在父类添加say方法
Parent2.prototype = {
    say () {
        console.log('say bye bye')
    }
}
function Child2 () {
    this.address = '硚口区'
}
// 让子类的原型直接等于父类实例
Child2.prototype = new Parent2()
//  生成两个子类的实例s2、s3
var s2 = new Child2()
var s3 = new Child2()
// s2实例继承了父类中的name属性
console.log(s2.name)  //祝敏
//  s2实例也同样继承了父类原型上的say方法
console.log(s2.say())  //say bye bye

// 上述栗子好像解决了第一种方式带来的弊端，但是确又出现了新的问题，
// 细心的小伙伴应该发现了我特意给子类定义了2个实例s2和s3，那么我们来看看下面这个栗子

//  给s2实例继承的play属性的数组中push一个新数字
s2.play.push(4)
console.log(s2.play)  //[1, 2, 3, 4]
console.log(s3.play)  //[1, 2, 3, 4]
// what?搞什么飞机，我只想给操作实例s2，s3怎么也被改变了

// 判断实例对象的 _ proto _ 和生成该实例的构造函数的prototype是不是引用的同一个地址。
//  s2和s3是Child2生成的实例，所以肯定返回true
//  Child2的原型对象又等于Parent2的实例，所以此处也返回true
console.log(s2 instanceof Child2, s2 instanceof Parent2)  // true true
console.log(s3 instanceof Child2, s3 instanceof Parent2)  // true true
console.log(s2.__proto__ === s3.__proto__) //true
//  改变了s2的play属性之后因为s2的原型对象和s3的原型对象相等，所以s3也跟着一起改变

// 总结：借助原型链实现继承虽然解决了父类原型的方法能让子类实例对象继承的问题，
// 但是如果我们通过子类的实例对象修改父类上的属性和方法，那么所有子类的所有实例对象上的属性和方法都会被改变。



// 组合继承
function Parent3 () {
    this.name = '许风',
    this.age = 20,
    this.play = [4,5,6]
}
function Child3 () {
    Parent3.call(this)
    this.address = '江夏区'
}
Child3.prototype = new Parent3()
var s4 = new Child3()
var s5 = new Child3()
s4.play.push(7)
console.log(s4.play)  //  [4, 5, 6, 7]
console.log(s5.play)  //  [4, 5, 6]

// 总结：通过call()方法改变子类的this指向然后将子类的原型对象等于父类的实例，从而实现了我们想要的效果。
// 但是确存在着两个问题，第一个问题是性能占用，在call()方法和Child3.prototype = new Parent3()两次都调用了父级的构造函数，
// 造成了不必要的性能浪费。第二个问题等优化了第一个问题之后我们再来看。



// 组合继承(优化后)
//  解决父级函数的两次调用问题
function Parent4 () {
    this.name = '季亮',
    this.age = 20,
    this.play = [4,5,6]
}
function Child4 () {
    Parent4.call(this)
    this.address = '汉南区'
}
Child4.prototype = Parent4.prototype //  子类的原型和父类的原型相等
// 将new出来的实例转换成父级的构造函数的原型对象，因为实例的_ proto _原型对象和父级构函数的原型对象相等
// ，而实例可以继承原型链上的属性和方法，所以这里解决了多次调用父级构造函数的问题。但是这里还存在一个问题，我们来看下面的这个栗子

var s6 = new Child4()
var s7 = new Child4()
var s8 = new Parent4()
// s6、s7实例是子类Child4构造函数生成
console.log(s6.constructor) //  父类构造函数Parent4()
console.log(s8.constructor)  //  父类构造函数Parent4()

// Child4构造函数生成的实例在程序里无法区分到底是由父类创造的还是子类创造的。
// 为什么会产生这个问题呢？因为Child4.prototype = Parent4.prototype，
// 而Parent4.prototype的constructor肯定是指向自己的，也就是Parent4()构造函数。
// 好吧，如何解决这个问题，就需要用到Object.create()这种创建对象的方法了。



// 组合继承(完美版)
function Parent5 () {
    this.name = '许风',
    this.age = 20,
    this.play = [4,5,6]
}
function Child5 () {
    Parent5.call(this)
    this.address = '江夏区'
}
// 比较关键的一步
Child5.prototype = Object.create(Parent5.prototype)
console.log(Child5.prototype)  //Parent5 {} 
// Object.create()会使用指定的原型对象及其属性去创建一个新的对象，
// 通过Object.create()创建了一个中间对象，这个中间对象有一个特性，他的原型对象是父类的原型对象。

// 这个时候虽然进行了隔离，但是Child5.prototype依然没有自己的constructor，
// 它要找的话，依然是通过原型链往上找，找的还是Parent5.prototype上去。
console.log(Child5.prototype.constructor)  //构造函数Parent5

// 此时在Child5的原型对象写一个自己的constructor。承接上文看如下栗子：
function Parent5 () {
    this.name = '许风',
    this.age = 20,
    this.play = [4,5,6]
}
function Child5 () {
    Parent5.call(this)
    this.address = '江夏区'
}
Child5.prototype=Object.create(Parent5.prototype)
Child5.prototype.constructor=Child5
var s9 = new Child5()
var s10 = new Parent5()
console.log(s9.constructor)  //指向构造函数Child5
console.log(s10.constructor)  //指向构造函数Parent5

// 好吧，完美解决实例对象的指向问题，那么如果我们不通过Object.create()方法，
// 在优化版中Child4.prototype = Parent4.prototype 上写一个constructor可以实现吗？
// 这是不行的，因为两个的原型对象引用的是同一个，一改的话，都改了。父类子类的都改了。又没办法区分父类的。

