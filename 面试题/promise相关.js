void function () {
    // 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？
    console.log('红绿灯start');
    function red() {
        console.log('red');
    }
    function green() {
        console.log('green');
    }
    function yellow() {
        console.log('yellow');
    }
    const light = (timer, cb) => {
        return new Promise((resolve) => {
            setTimeout(()=>{
                cb();
                resolve()
            },timer)
        })
    }
    const step = () => {
        Promise.resolve().then((resolve) => {
            return light(3000, red)
        }).then(() => {
            return light(1000, green)
        }).then(() => {
            return light(2000, yellow)
        }).then(() => {
            step();
        })
    }
    // step()
}()

void function(){
    console.log('异步封装图片start---------------');
    
}()

