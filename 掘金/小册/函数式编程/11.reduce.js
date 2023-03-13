

/**
 * 模拟 map
 */
void function () {
    const map = (arr, callback) => {
        let newArr = []
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            const result = callback(element, index, arr)
            newArr.push(result)
        }
        return newArr
    }
    (map([1, 2, 3], (item) => {
        return item * 2
    }));

    /**
     * reduce 种模拟 map
     */
    function add1andpush(prev, curr) {
        prev.push(curr * 2)
        return prev
    }

    const result = [1, 2, 3].reduce(add1andpush, [])
    console.log('result: ', result);
}()

/**
 * 理解声明式数据流：从链式调用到“回调地狱”
 */
void function () {
    // 现在我想以 arr 数组作为数据源，按照如下的步骤指引做一个求和操作：  
    // 1
    // 筛选出 arr 里大于 2 的数字
    // 2
    // 将步骤1中筛选出的这些数字逐个乘以 2
    // 3
    // 对步骤 3 中的偶数数组做一次求和
    // 当然啦，1、2都只是过程，我想要的只有步骤3的求和结果而已。
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]

    /**
     * @name 命令式实现
     * @param {} num 
     * @returns 
     */


    void function () {
        // 用于筛选大于2的数组元素
        const biggerThan2 = num => num > 2
        // 用于做乘以2计算
        const multi2 = num => num * 2
        // 用于求和
        const add = (a, b) => a + b

        // 完成步骤 1
        const filteredArr = arr.filter(biggerThan2)
        // 完成步骤 2
        const multipledArr = filteredArr.map(multi2)
        // 完成步骤 3
        const sum = multipledArr.reduce(add, 0)
        // 本着简洁和安全的原则，我们来对楼上的🌰进行一次 code review。  
        // 首先，代码是否简洁？
        // 答案是【否】。  
        // 我们的目标输出只有 sum 这一个求和结果，计算过程中额外定义的 filteredArr、multipledArr 完全属于混淆视听的冗余常量，它们拉垮了代码的可读性。

        // 其次，代码是否安全？   
        // 答案是【否】。  
        // filteredArr 和 multipledArr 作为引用类型，完全有可能在运行过程中被修改。  
        // 试想一下，楼下的这三行代码，它们是严格绑定的吗？  
        // const filteredArr = arr.filter(biggerThan2)
        // const multipledArr = filteredArr.map(multi2)
        // const sum = multipledArr.reduce(add, 0)

        // todo 显然不是，只要我想，我可以往它们中间插入任何噪音代码，像这样：  
        void function () {
            const filteredArr = arr.filter(biggerThan2)

            // 噪音代码1号
            function changeArray() {
                filteredArr.push(100)
            }
            changeArray()

            const multipledArr = filteredArr.map(multi2)

            // 噪音代码2号
            function changeArrayAgain() {
                multipledArr.push(101)
            }
            changeArrayAgain()

            const sum = multipledArr.reduce(add, 0)
        }()

    }()




    /**
     * 解法
     * 链式调用，冗余的“计算中间态”
     */
    // 链式调用，这个过程中没有“中间值”，即有可读性，也避免了过程“不小心”的篡改
    const result = arr.filter(val => val > 2).map(val => val * 2).reduce((prev, curr) => prev + curr)
    console.log('result: ', result);

    /**
     * 但是对于一些没有挂在同一个对象上的方法，例如独立的函数，就不能使用链式调用了，那怎么办呢？
     * 独立函数的组合姿势：组合，但是回调地狱版    
     * */
    void function () {
        function add4(num) {
            return num + 4
        }

        function mutiply3(num) {
            return num * 3
        }

        function divide2(num) {
            return num / 2
        }
        // 直接套娃 - 把函数结果当成参数传入下一个计算函数中，然后把下一个的结果传入下下个函数……
        // 当嵌套层数较少时，还可以接受，但一旦函数层级过多，不管是代码阅读还是可维护性都是灾难性的
        const sum = add4(mutiply3(divide2(10)))
        console.log('sum: ', sum);
    }()

    /**
     * 最简单的 pipe 函数
     * 
     */

    void function () {
        function add4(num) {
            return num + 4
        }

        function mutiply3(num) {
            return num * 3
        }

        function divide2(num) {
            return num / 2
        }

        // 使用展开符来获取数组格式的 pipe 参数,这样入参就不用手动声明 [xxx]
        function pipe(...funcs) {
            function callback(input, fun) {
                return fun(input)
            }
            return function (params) {
                return funcs.reduce(callback, params)
            }
        }
        // 执行顺序是从前往后
        const compute = pipe(add4, mutiply3, divide2)
        console.log('compute: ', compute(10));
        function compose(...funcs) {
            function callback(input, fun) {
                return fun(input)
            }
            return function (params) {
                return funcs.reduceRight(callback, params)
            }
        }
        // 执行顺序是从后往前
        const compute2 = compose(divide2, mutiply3, add4)
        console.log('compute: ', compute2(10), compute(10));

    }()

}()
const isEmpty = (obj) => obj === null || obj === '' || obj === undefined;
function formatNumberRgx(v, _opts) {
    const opts = Object.assign(
        {
            placeholder: '-',
            checkUnit: false,
            checkUnitTenThousand: false,
            allFields: false,
            checkEffectNum: true,
            floatLength: 0,
            thousand: ',',
            decimal: '.',
            retainDecimal: false, // 是否保留小数位
        },
        _opts || {}
    )

    if (isEmpty(v)) {
        if (opts.checkUnit || opts.checkUnitTenThousand || opts.allFields) {
            return {
                value: opts.placeholder || '-',
                fullValue: opts.placeholder || '-',
            }
        }
        return opts.placeholder || '-'
    }

    if (Number.isNaN(+v)) {
        return v
    }

    const { floatLength } = opts
    const negative = Number(v) < 0 ? '-' : ''
    const numberArray = v.toString().split('.')
    let base = Math.abs(parseInt(numberArray[0], 10)).toString()
    let decimal = numberArray[1] || ''

    // 补齐小数位数
    if (floatLength) {
        if (typeof floatLength === 'object') {
            const { max, min } = floatLength
            const p = decimal.length > max ? max : decimal.length < min ? min : decimal.length
            const [, second] = parseFloat(`0.${decimal}`).toFixed(p).split('.')
            if (max) {
                decimal = second
            } else {
                base = Math.abs(parseFloat(Math.round(Number(v)).toString())).toString()
                decimal = ''
            }
        } else {
            [, decimal] = parseFloat(`0.${decimal}`).toFixed(floatLength).split('.')
        }
    } else {
        base = Math.abs(parseInt(Number(v).toString(), 10)).toString()
        if (!opts.retainDecimal) {
            decimal = ''
        }
    }

    // 开启单位换算（亿、万）
    let unit = ''
    if (opts.checkUnit) {
        const len = base.length
        if (len > 8) {
            // eslint-disable-next-line no-mixed-operators
            [base, decimal] = (parseInt(base, 10) / 10 ** 8).toFixed(2).split('.')
            unit = '亿'
        } else if (len > 4) {
            // eslint-disable-next-line no-mixed-operators
            [base, decimal] = (parseInt(base, 10) / 10 ** 4).toFixed(2).split('.')
            unit = '万'
        }
    }

    // 开启单位换算（万）
    if (opts.checkUnitTenThousand) {
        // eslint-disable-next-line no-mixed-operators
        [base, decimal] = (parseInt(base, 10) / 10 ** 4).toFixed(4).split('.')
        unit = '万'
    }

    const mod = base.length > 3 ? base.length % 3 : 0

    if (opts.checkEffectNum && decimal && !opts.retainDecimal) {
        while (decimal.length > 2) {
            if (decimal.endsWith('0')) {
                decimal = decimal.substr(0, decimal.length - 1)
            } else {
                break
            }
        }
    }

    const value = `${negative}${mod ? `${base.substr(0, mod)}${opts.thousand}` : ''}${base.substr(mod).replace(/(\d{3})(?=\d)/g, `$1${opts.thousand}`)}${decimal ? `${opts.decimal}${decimal}` : ''
        }`

    // 返回所有字段
    if (opts.checkUnit || opts.checkUnitTenThousand || opts.allFields) {
        return {
            value,
            base,
            decimal,
            unit,
            fullValue: `${value}${unit}`,
            floatLength: decimal?.length
        }
    }

    return value
}
function formatNumberRgx1(v, _opts) {
    const opts = Object.assign(
        {
            placeholder: '-',
            checkUnit: false,
            checkEffectNum: true,
            floatLength: 0,
            thousand: ',',
            decimal: '.',
            retainDecimal: false // 是否保留小数位
        },
        _opts || {}
    );

    if (isEmpty(v)) {
        if (opts.checkUnit) {
            return {
                value: opts.placeholder || '-'
            };
        }
        return opts.placeholder || '-';
    }

    if (Number.isNaN(+v)) {
        return v
    }

    const { floatLength } = opts;
    const negative = Number(v) < 0 ? '-' : '';
    const numberArray = v.toString().split('.');
    let base = Math.abs(parseInt(numberArray[0], 10)).toString();
    let decimal = numberArray[1] || '';

    // 补齐小数位数
    if (floatLength) {
        if (typeof floatLength === 'object') {
            const { max, min } = floatLength;
            const p = decimal.length > max ? max : decimal.length < min ? min : decimal.length;
            const [, second] = parseFloat(`0.${decimal}`).toFixed(p).split('.');
            if (max) {
                decimal = second;
            } else {
                base = Math.abs(parseFloat(Math.round(Number(v)).toString())).toString();
                decimal = '';
            }
        } else {
            [, decimal] = parseFloat(`0.${decimal}`).toFixed(floatLength).split('.');
        }
    } else {
        base = Math.abs(parseFloat(Math.round(Number(v)).toString())).toString();
        if (!opts.retainDecimal) {
            decimal = '';
        }
    }

    // 开启单位换算
    let unit = '';
    if (opts.checkUnit) {
        const len = base.length;
        if (len > 8) {
            // eslint-disable-next-line no-mixed-operators
            [base, decimal] = (parseInt(base, 10) / 10 ** 8).toFixed(2).split('.');
            unit = '亿';
        } else if (len > 4) {
            // eslint-disable-next-line no-mixed-operators
            [base, decimal] = (parseInt(base, 10) / 10 ** 4).toFixed(2).split('.');
            unit = '万';
        }
    }

    const mod = base.length > 3 ? base.length % 3 : 0;

    if (opts.checkEffectNum && decimal && !opts.retainDecimal) {
        while (decimal.length > 2) {
            if (decimal.endsWith('0')) {
                decimal = decimal.substr(0, decimal.length - 1);
            } else {
                break;
            }
        }
    }

    if (opts.checkUnit) {
        return {
            value: `${negative}${mod ? `${base.substr(0, mod)}${opts.thousand}` : ''}${base
                .substr(mod)
                .replace(/(\d{3})(?=\d)/g, `$1${opts.thousand}`)}${decimal ? `${opts.decimal}${decimal}` : ''
                }`,
            unit,
            floatLength: decimal.length
        };
    }

    return `${negative}${mod ? `${base.substr(0, mod)}${opts.thousand}` : ''}${base
        .substr(mod)
        .replace(/(\d{3})(?=\d)/g, `$1${opts.thousand}`)}${decimal ? `${opts.decimal}${decimal}${unit}` : ''
        }`;
}
console.log('eam3:', formatNumberRgx('73.7000', { retainDecimal: true }));
console.log(formatNumberRgx('73.7000', { retainDecimal: false }));

console.log('library:', formatNumberRgx1('73.7000', { retainDecimal: true }));
console.log(formatNumberRgx1('73.7000', { retainDecimal: false }));
