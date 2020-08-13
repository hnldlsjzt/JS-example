void function () {
    //  暂时性死区是运行时
    function sayHi() {
        console.log(name);// undefined
        console.log(age); // 暂时性死区
        var name = 'zt'
        let age = 18
    }

}()
