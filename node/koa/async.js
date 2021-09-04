void function () {
    function getSomething() {
        return 'something'
    }

    async function testAsync() {
        return 'hello async'
    }

    async function test() {
        const v1 = await getSomething()
        const v2 = await testAsync()
        console.log(v1, v2);
    }
    test()
}()

void function () {
    function takeLongTime() {
        return new Promise((res) => {
            setTimeout(() => {
                res('resolve')
            }, 1000)
        })
    }
    async function test() {
        const v = await takeLongTime()
        console.log('1s后',v);
    }
    test()
}()
