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
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        get(){
            dep.depend();
            console.log(`${key}属性被读取了:${val}`);
            return val;
        },
        set(newVal){
            console.log(`${key}属性被修改了:${newVal}`);
            val = newVal;
            dep.notify()                    //数据变化通知所有订阅者
        }
    })
}

// 依赖收集
// 我们就可以在数据被读或写的时候通知那些依赖该数据的视图更新了，为了方便，我们需要先将所有依赖收集起来，一旦数据发生变化，就统一通知更新。
// 其实，这就是典型的“发布订阅者”模式，数据变化为“发布者”，依赖对象为“订阅者”。

// 创建消息订阅器Dep:
class Dep{
    constructor(){
        this.subs=[];
    }
    addSub(sub){ // 增加订阅者
        this.subs.push(sub)
    }
    depend(){// 判断是否增加订阅者
        if(Dep.target) this.addSub(Dep.target)
    }
    notify(){// 通知订阅者更新
        this.subs.forEach((sub) =>{
            sub.update()
        })
    }
}
Dep.target = null;

// 订阅者Watcher
class Watcher{
    constructor(vm,exp,cb){
        this.vm = vm; // 一个Vue的实例对象；
        this.exp = exp; // 是node节点的v-model或v-on：click等指令的属性值。如v-model="name"，exp就是name;
        this.cb = cb; // 是Watcher绑定的更新函数;
        this.value = this.get();  // 将自己添加到订阅器的操作
    }
    update(){
        let value = this.vm.data[this.exp];
        let oldVal=this.value;
        if(value!==oldVal){
            this.value=value;
            this.cb.call(this.vm,value)
        }
    }
    get(){
        Dep.target = this;  // 缓存自己
        let value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
}
    