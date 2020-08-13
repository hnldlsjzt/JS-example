


// 虽然ES6增加了class，但它是语法糖，它的做的，es5都能做
// ES6可以看做是ES5的另一种写法
// class 必需被new调用
// 实例属性必需显示的使用this，比如this.x
/**
 * 区别：
 * class必需使用new调用，构造函数加不加都可以
 * 原型上的方法,直接在class里面写方法，构造函数声明在prototype上
 * class不存在变量提升，和继承有关，必需保证子类在父类之后
 * this默认指向实例，最好不要单独使用。使用this，最好使用箭头函数或bind
 */

void function () {
    //  class 和 构造函数的区别

    function Foo(x, y) {
        this.x = x;
        this.y = y;
        console.log('构造函数的newtarget',new.target);
    }
    Foo.prototype.getVal = function () {
        console.log('Foo --- getVal', this.x, this.y);
    }


    class Bar {
        constructor(x, y) {
            // 定义实例属性
            this.x = x
            this.y = y
            console.log('class的newtarget',new.target);
        }
        // 类似于原型上的方法
        getVal() {
            console.log('Bar --- getVal', this.x, this.y);
        }
    }

    const foo = new Foo(1, 2)
    const bar = new Bar(3, 4)
    console.log(foo, bar);
    foo.getVal(), bar.getVal();
    // Bar() // Class constructor Bar cannot be invoked without 'new'
}()

void function () {
    console.log('constructor-------------');
    /**
     * class必需有constructor方法，通过new生成实例时，会自动调用该方法。
     * 如果没有显示声明constructor,class会默认加上
     */
}()


void function () {
    console.log('取值函数(getter)和存值函数(setter)---------------');
    class MyClass {
        get prop() {
            console.log('get prop');
        }
        set prop(value) {
            console.log(`set ${value}`);
        }
    }
    const inst = new MyClass()
    inst.prop
    inst.prop = 1
}()

void function () {
    console.log('属性表达式-------------');
    const methodName = 'getArea'
    class Square {
        [methodName]() {
            console.log(`属性表达式：${methodName}`);
        }
    }
    const square = new Square
    square[methodName]()

    console.log(`class表达式------------`);
    const MyClass = class Me {
        getClassName() {
            return Me.name
        }
    }
    const inst = new MyClass
    console.log(inst.getClassName());
    // console.log(Me.name);// Me is not define
    // 如果Me没有在内部没有使用的话，Me都可以省略
    const MyClassTwo = class {
        getClassName() {
            this.name
        }
    }
    const instTwo = new MyClassTwo
    console.log(instTwo.getClassName());

    console.log(`立即执行的Class`);
    let person = new class {
        constructor(name) {
            this.name = name
        }
        sayName() {
            console.log(this.name);
        }
    }('zt')
    person.sayName()// zt
}()

void function () {
    console.log(`this指向`);
    class Logger {
        printName = (name = 'zt') => {
            console.log(this);
            this.print(`hello ${name}`)
        }


        print(text) {
            console.log(text);
        }
    }
    const logger = new Logger
    const { printName } = logger
    printName()// 报错,class默认使用use strict，this指向undefined
    logger.printName()
}()


void function () {
    console.log(`静态方法----------`);
    // 类相当于实例的原型，所有在类上的方法都会被实例继承。
    // 方法前加上 static，表示该方法不会被继承，只能被类直接调用，称为“静态方法”
    // static中的this指向class，而不是实例
    // 静态方法可以与非静态方法重名
    // 父类的静态方法可以被子类继承,是子类不是子类实例
    class Foo {
        static sayName(text) {
            console.log(`text: ${text}`);
            console.log(`${this} ${this.name} hello static`);
        }
        getClassName = () => {
            console.log(this);
        }
    }
    const foo = new Foo
    foo.getClassName()
    // foo.sayName()// sayName is not function,在foo找不到
    Foo.sayName('foo') // hello static, this指向class

    class Bar extends Foo {

    }
    const bar = new Bar
    Bar.sayName('bar')
}()

void function () {
    console.log(`实例属性的新写法`);
    //  实例属性除了可以定在constructor方法里面的this上，也可以定义在类的最顶层
    class Count {
        _count = 0;
        get value() {
            return this._count
        }
        increment() {
            this._count++
        }
    }
    const count = new Count
    console.log(count._count)
    count.increment()
    console.log(count.value);
}()

void function () {
    console.log(`new target属性`);
    // 可以通过该属性来判断构造函数是怎么调用的
    // new.target返回这个类
    function Person(name) {
        if (new.target !== undefined) {
            console.log(`new target ${new.target}`);
        } else {
            throw new Error('必需使用 new 命令生成实例')
        }
    }
     new Person()
    //  Person()
}()





