
const axios = {
    get: () => {

    },
    post: () => {

    },
}
void function () {
    console.log(`class 的继承-------------`);
    //  class 使用extends关键字实现继承，比ES5修改原型链实现继承要方便清晰

    // ES5的继承，实质上是先创造子类的实例对象，然后在将父类的方法添加到this上(Person.apply(this))
    // ES6的继承不同，实质是先将父类实例对象的属性和方法，加到this上（所以必须先super），然后再用子类的构造函数修改this

    // 感觉class除了做对象模板和继承，没有别的两点了
    // 而对象模板还不如工厂函数


    class Point { }
    class ColorPoint extends Point {
        constructor(x, y, color) {
            super(x, y)// 调用父类的constructor(x,y)，不调用super会报错
            this.color = color
        }
        toString() {
            return this.color + " " + super.toString()// 调用父类的toString
        }
    }
    const color = new ColorPoint
    // constructor和toString中都使用了super,它在这表示父类的构造函数，用来新建父类的this对象
    // 子类必须在constructor中调用super方法，否则新建实例会报错
    // 这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法
    // 然后对其加工，加上子类自己的属性和方法。
    // 子类使用this前必须先使用super
}()


void function () {
    console.log('super-----------');
    //  super关键字既可以做方法用，也可以做对象用
    // 第一种,super(),代表父类的构造函数，子类继承时，必须使用。但它返回的是子类的实例
    // 即super内的this指向B的实例

    // 第二种：super做对象用，在普通方法中，指向父类的原型对象。在静态方法中，指向父类
    // 下文中的super.p相当于 A.prototype.p()
    // 注意，由于super.p是指向父类原型，所以是获取不到实例属性和方法的

    // ES6规定，子类普通方法中调用super.xx时的this指向子类实例

    // super必需是函数或对象调用，不然报错
    class A {
        constructor() {
            // super()// 'super' keyword unexpected here。 在没有继承的地方使用super
            console.log(new.target.name);
            this.p1 = 3
        }
        p() {
            console.log('我是p,父类原型');
        }
    }

    class B extends A {
        constructor() {
            super()
            // super.p()
            // super // 非函数调用和对象调用，直接报错
        }
        get m() {
            return super.p1
        }
    }
    new A // A
    new B // B
    const b = new B
    console.log(b.m);// undefined
}()

void function () {
    class HttpClient {
        constructor(baseUrl) {
            this.baseUrl = baseUrl;
            this.listUsers = this.listUsers.bind(this);
            this.getUser = this.getUser.bind(this);
            this.createUser = this.createUser.bind(this);
            this.listBooks = this.listBooks.bind(this);
            this.getBook = this.listUsers.bind(this);
            this.createBook = this.createBook.bind(this);
        }

        listUsers() {
            return axios.get(`${this.baseUrl}/users`)
        }

        getUser(id) {
            return axios.get(`${this.baseUrl}/users/${id}`)
        }

        createUser(user) {
            return axios.post(`${this.baseUrl}/users`, user);
        }

        listBooks() {
            return axios.get(`${this.baseUrl}/books`)
        }

        getBook(bookName) {
            return axios.get(`${this.baseUrl}/books/${bookName}`)
        }

        createBook(book) {
            return axios.post(`${this.baseUrl}/books`, book)
        }
    }

    const httpClient = new HttpClient("https://your-endpoints/api");
    httpClient.getUser("123");
    httpClient.getBook("JavaScript Is Interesting");
    console.log("The httpClient's baseUrl is " + httpClient.baseUrl);
}()

void function () {
    //  工厂函数,比class更直观
    function httpClientFactory(baseUrl) {
        return {
            baseUrl: baseUrl,
            listUsers: () => {
                return axios.get(`${baseUrl}/users`)
            },
            getUser: (id) => {
                return axios.get(`${baseUrl}/users/${id}`)
            },
            createUser: (user) => {
                return axios.post(`${baseUrl}/users`, user);
            },
            listBooks: () => {
                return axios.get(`${baseUrl}/books`)
            },
            getBook: (bookName) => {
                return axios.get(`${baseUrl}/books/${bookName}`)
            },
            createBook: (book) => {
                return axios.post(`${baseUrl}/books`, book)
            }
        }
    }

    const httpClient = httpClientFactory("https://your-endpoints/api");
    httpClient.getUser("123");
    httpClient.getBook("JavaScript Is Interesting");
    console.log("The httpClient's baseUrl is " + httpClient.baseUrl);
}()

