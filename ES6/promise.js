new Promise((resolve) => {
    console.log('start');
    resolve()
}).then(res => {
    console.log('then1');
    new Promise(resolve => {
        console.log('promise2');
        resolve()
    }).then(res => {
        console.log('then21');
    }).then(res => {
        console.log('then22');
    })
}).then(res => {
    console.log('then12');
}).then(res => {
    console.log('then13');
})

// start 、 then1 、 promise2 、 then21

new Promise((resolve, reject) => {
    console.log("log: 外部promise");
    resolve();
})
    .then(() => {
        console.log("log: 外部第一个then");
        new Promise((resolve, reject) => {
            console.log("log: 内部promise");
            resolve();
        })
            .then(() => {
                console.log("log: 内部第一个then");
            })
            .then(() => {
                console.log("log: 内部第二个then");
            });
    })
    .then(() => {
        console.log("log: 外部第二个then");
    });
