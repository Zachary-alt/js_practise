function asyncToGenerator(generatorFunc) {
    return function () {
        let gen = generatorFunc.apply(this, arguments)
        return new Promise((resolve, reject) => {
            function step(key, arg) {
                let generatorResult
                try {
                    generatorResult = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }
                const { value, done } = generatorResult
                if (done) {
                    resolve(value)
                } else {
                    Promise.resolve(value).then(res => step('next', res), err => step('throw', res))
                }
            }
            step('next')
        })
    }
}
const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))

var test = asyncToGenerator(
    function* testG() {
        // await被编译成了yield
        const data = yield getData()
        console.log(1);
        console.log('data: ', data);
        const data2 = yield 2
        console.log(2);
        console.log('data2: ', data2);
        return 'success'
    }
)

test().then(res => console.log(111, res))
