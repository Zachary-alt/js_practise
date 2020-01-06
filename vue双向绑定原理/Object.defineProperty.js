// 深入浅出Object.defineProperty()


// Object.defineProperty()语法说明
// Object.defineProperty()的作用就是直接在一个对象上定义一个新属性，或者修改一个已经存在的属性
/**
 * @param obj 需要定义属性的当前对象
 * @param prop 当前需要定义的属性名
 * @param desc 属性描述符
 */
Object.defineProperty(obj={}, prop='', desc={})

// 一般通过为对象的属性赋值的情况下，对象的属性可以修改也可以删除，
// 但是通过Object.defineProperty()定义属性，通过描述符的设置可以进行更精准的控制对象属性

// 属性描述符
// 通过Object.defineProperty()为对象定义属性，有两种形式，且不能混合使用，分别为数据描述符，存取描述符，下面分别描述下两者的区别：
// 数据描述符 --特有的两个属性（value,writable）
let person={}
Object.defineProperty(person,'name',{
    value:'tom',
    writable:true //是否可以改变,默认false
})
person.name="jack"
console.log(person.name); // jack

let a={},temp=null;
Object.defineProperty(a,'name',{
    get(){
        return temp
    },
    set(val){
        temp=val
    }
})
a.name='li'
console.log(a.name);//li


let b={}
Object.defineProperty(b,'name',{
    value:'tom',
    configurable:false,//描述属性是否配置，以及可否删除
    enumerable:true,//描述属性是否会出现在for in 或者 Object.keys()的遍历中
    writable:true //是否可以改变,默认false
})
delete b.name
console.log(b.name);//tom
Object.defineProperty(b,'age',{
    value:'11',
    configurable:false,//描述属性是否配置，以及可否删除
    enumerable:false,//描述属性是否会出现在for in 或者 Object.keys()的遍历中
})
console.log(Object.keys(b)); //[ 'name' ]


// 禁止扩展
// 如果你想禁止一个对象添加新属性并且保留已有属性，就可以使用Object.preventExtensions(...)
Object.preventExtensions(b)
b.gender='male'
console.log(b.gender); //undefined

// 密封
// Object.seal()会创建一个密封的对象，这个方法实际上会在一个现有对象上调用object.preventExtensions(...)
// 并把所有现有属性标记为configurable:false。

// 冻结
// Object.freeze()会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(),
// 并把所有现有属性标记为writable: false,这样就无法修改它们的值。
// 这个方法是你可以应用在对象上级别最高的不可变性，它会禁止对于对象本身及其任意直接属性的修改（但是这个对象引用的其他对象是不受影响的）

let proto={
    get bar(){
        console.log('getter!');
        return 'a'
    }
}
let obj1= Object.create(proto)
obj1.bar='b'
console.log(obj1.bar); //a
Object.defineProperty(obj1,'bar',{
    value:'hello'
})
console.log(obj1.bar);//hell0
console.log(proto.bar); //a



let c={
    name:'lily'
}
// 等同于
let c=new Object();
Object.defineProperties(c,{
    name:{
        value:'lily',
        configurable:true,//描述属性是否配置，以及可否删除
        enumerable:true,//描述属性是否会出现在for in 或者 Object.keys()的遍历中
        writable:true //是否可以改变,默认false
    }
})