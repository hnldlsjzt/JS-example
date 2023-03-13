void function () {
    // for of 语句，遍历对象
    const o = {
        [Symbol.iterator]: () => ({
            _value: 0,
            // 不能写成 next:()=>{},不然 this 就一直指向外部 this，而不是对象调用 next 时的对象
            next() {
                if (this._value === 10) {
                    return {
                        done: true
                    }
                } else {
                    console.log('this._value: ', this, this._value);
                    return {
                        value: this._value++,
                        done: false
                    }
                }
            }
        })
    }
    for (const v of o) {
        // console.log('v: ', v);
    }

    try {
        const nums = [1, 2, 3, 4]
        nums.forEach(element => {
            console.log(element.abc())
        });
        // for (let index = 0; index < nums.length; index++) {
        //     const element = nums[index];
        //     console.log(element.abc.a)
            
        // }
    } catch (error) {
        console.log('error---: ', error);

    }

}()
