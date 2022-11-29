
/**
 * 正则表达式
 */
/**
 * 在 js 中正则，有 5 中方法
 * 这 3 中为字符串的方法，需要 str.match()
 * 1.replace()
 * 2.match() // 返回数组，如果 /g，返回所有匹配的数据。非全局（/g),就返回第一个符合的数据。没匹配上，就返回 null
 * 3.search() // 返回符合条件的起始位置
 * 
 * 这 2 种为正则表达式的方法 需要 reg.exec()
 * 4.exec()
 * 5.test()
 */
void function () {
    let reg = /\d+/g // 加上 g 就是全局匹配，不然只会匹配第一个符合要求的数据（但数组长度会有 4 项）
    const str = '123ad456'
    console.log('match:返回匹配上的数组，没匹配上就是null ', str.match(reg));
    console.log('search: 返回第一个符合条件的起始索引', str.search('456'));
    console.log('replace: 替换符合条件的元素，默认不区分大小写、只匹配第一个，如要匹配小写使用 i，全局替换使用 g:', 'abc123abcABC'.replace(/ABC/g, 'qwe'));

}()
