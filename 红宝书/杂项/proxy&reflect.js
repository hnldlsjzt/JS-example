
void function () {
    // 通常，尝试读取不存在的属性会返回 undefined。

    // 创建一个代理，在尝试读取不存在的属性时，该代理抛出一个错误。

    let user = {
        name: 'tt'
    }

    user = new Proxy(user, {
        get(target, prop, reveiver) {
            if (prop in target) {
                console.log('arguments: ', arguments, '===',...arguments);
                return Reflect.get(...arguments)
            } else {
                return new ReferenceError('不支持改属性')
            }
        }
    })
    console.log(user.name);
    console.log(user.age);
}()


void function () {
    // 让 array[-n],支持负数

    let array = [1, 2, 3]
    array = new Proxy(array, {
        get(target, prop, reveiver) {
            console.log('prop: ', prop, typeof prop);
            if (prop < 0) {
                // prop 是个 string，转成数字
                // 在length的正常范围内，负数+legnth 必定会成为正数。超出了length，正常返回 undefined
                prop = +prop + target.length
                console.log('prop: ', prop);
            }
            return Reflect.get(target, prop, reveiver)
        }
    })

    console.log(array[-1]);
    console.log(array[-2]);
    console.log(array[-5]);
}()
涛哥，故事七的入参按照你的要求调整了哈
{
    "result": true,
    "msg": "",
    "data": {
        "statistics": [
            {
                "name": "资产总数",
                "value": "722",
                "unit": "个"
            },
            {
                "name": "建筑面积",
                "value": "514028.2500",
                "unit": "㎡"
            },
            {
                "name": "账面原值",
                "value": "23456.00",
                "unit": "元"
            },
            {
                "name": "资产价值",
                "value": "1234580412699.05",
                "unit": "元"
            },
            {
                "name": "证件总数",
                "value": "47",
                "unit": "个"
            },
            {
                "name": "房屋建筑面积（证件）",
                "value": "50140.00",
                "unit": "㎡"
            },
            {
                "name": "宗地面积（证件）",
                "value": "5845.00",
                "unit": "㎡"
            }
        ],
        "hash_code": "73f1539e5cfe4bcb0d2390df72f512e3",
        "statistical_unit_view_type": 0
    }
}