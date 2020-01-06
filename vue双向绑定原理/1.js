// 可观测
let car = {}
let val = 3000
Object.defineProperty(car, 'price', {
    get(){
        console.log('price属性被读取了')
        return val
    },
    set(newVal){
        console.log('price属性被修改了')
        val = newVal
    }
})
console.log(car.price);
car.price=1

// 为了把car的所有属性都变得可观测，我们可以编写如下两个函数：
/**
 * 把一个对象的每一项都转化成可观测对象
 * @param { Object } obj 对象
 */
function observable (obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) =>{
        defineReactive(obj,key,obj[key])
    })
    return obj;
}
/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive (obj,key,val) {
    Object.defineProperty(obj, key, {
        get(){
            console.log(`${key}属性被读取了:${val}`);
            return val;
        },
        set(newVal){
            console.log(`${key}属性被修改了:${newVal}`);
            val = newVal;
        }
    })
}
let a=observable({
    name:'a',
    age:'11'
})
a.name=1