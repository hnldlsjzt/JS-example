/*
 * @Author: hnldlsjzt
 * @Date: 2022-06-18 15:08:08
 * @LastEditTime: 2022-06-18 15:31:46
 * @LastEditors: hnldlsjzt
 * @Description: 
 * @FilePath: /coding/JS-example/TS/ts-course/10.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

/**
 * @name 泛型
 */

void function () {
    // 输入什么类型，就输出什么类型
    function reflect<P extends string | number | boolean>(param: P): P {
        return param
    }
    reflect('1')// 1
    reflect(1)// 1
    reflect(true)// true
    reflect([])// 

    // 把接口入参约束在特定范围内
    {
        interface ReduxModel<State extends { name: string, id: string }> {
            state: State
        }
        type Computed1 = ReduxModel<{ name: string, id: string }>
        // 可以声明额外字段
        type Computed2 = ReduxModel<{ name: '1', id: '1', age: 1 }>
        // fail 缺少 id 字段
        type Computed3 = ReduxModel<{ name: string }>

    }
    // 泛型参数和函数参数类似的还有一个：都可以设置形参默认值
    {
        interface ReduxModal<State extends {} = { name: '1', id: '1' }> {
            state: State
        }
        type Computed5 = ReduxModal //默认值
        type Computed6 = ReduxModal<{ name: 'zt', id: '18' }>
    }

    // 多个不同的泛型入参之间设置约束关系
    {
        interface ObjSetter {
            // 限定 O 必需是对象，
            // 获取 O 对象中所有 key，keyof 返回 1 个联合类型。限定 K 是对象中的键
            // V 是对象中的值
            // 
            <O extends object, K extends keyof O, V extends O[K]>(obj: O, key: K, value: V): V
        }
        const getValueFn: ObjSetter = (obj, key, value) => (obj[key] = value)
        getValueFn({ id: 1 }, 'id', 2)
        getValueFn({ name: 'zt' }, 'name', '1')
        getValueFn({ id: 1, name: 'name' }, 'id', 2);
    }
}()
