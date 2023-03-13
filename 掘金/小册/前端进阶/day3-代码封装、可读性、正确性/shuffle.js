void function () {
    // 初级的洗牌算法
    function shuffle(items) {
        // console.log('items: ', items, [...items], items.sort((a, b) => Math.random() > 0.5 ? -1 : 1), [...items].sort((a, b) => Math.random() > 0.5 ? -1 : 1));
        return items.sort((a, b) => Math.random() > 0.5 ? -1 : 1);
    }
    const weights = Array(9).fill(0)
    console.log('weights--before: ', weights);
    /**
     * 1~9 的数字经过随机函数打乱后，循环 10000 次，然后把每次打乱的数字相加，得到总和。经过多次模拟，发现越后面出现的数，数字越大
     * 出现这个结果的原因是，sort 内部的原理，它是比较两个值的大小（返回负数或0，位置不变，反之调换位置，如果记不住，就记一半即可，另外一半推算出来）
     * 而 Math.random 的随机性，不能保证数学上的让每个元素出现在每个位置上都具有相同的概率
     *  */
    for (let index = 0; index < 10000; index++) {
        const testItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffle(testItems);
        testItems.forEach((item, index) => weights[index] += item)
    }
    console.log('weights--after: ', weights);
}()

void function () {
    function shuffle(items) {
        items = [...items]
        const res = []
        while (items.length) {
            const idx = Math.floor(Math.random() * items.length)
            const item = items.splice(idx, 1)[0]
            res.push(item)
        }
        return res
    }
    let [, ...items] = [...Array(10).keys()]
    items = shuffle(items)
    console.log('items: ', items);
}()

