

void function () {
    // 在 node 版本中执行
    // 在 11.x 之后跟浏览器表现一样，是 1234，
    // 但在 11 之前是，13,24；因为 Node 没有交互事件，所以会先清空宏任务，再来执行微任务
    setTimeout(() => {
        console.log('1');
        Promise.resolve().then(function () {
            console.log('2');
        });
    });
    setTimeout(() => {
        console.log('3');
        Promise.resolve().then(function () {
            console.log('4');
        });
    });
}()
