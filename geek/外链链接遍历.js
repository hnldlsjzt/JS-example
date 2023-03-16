const article = {
    "637538": "现代 C++20 实战高手课",
    "638994": "现代 C++20 实战高手课",
    "637258": "云原生架构与 GitOps 实战",
    "636136": "云原生架构与 GitOps 实战",
    "635602": "云原生架构与 GitOps 实战",
    "633953": "从 0 开始学架构",
    "630582": "手把手教你落地 DDD",
}



const map = [
    "637538:现代 C++20 实战高手课",
    "638994:现代 C++20 实战高手课",
    "637258:云原生架构与 GitOps 实战",
    "636136:云原生架构与 GitOps 实战",
    "635602:云原生架构与 GitOps 实战",
    "633953:从 0 开始学架构",
    "630582:手把手教你落地 DDD",
]
console.log(map);
// openwrite
// 文章来源：极客时间《[摄影入门课](https://time.geekbang.org/column/article/188736?utm_source=zmt&utm_medium=zmt&utm_term=zmt)》

// 蚁小二
// 内容来源：《摄影入门课》https://time.geekbang.org/column/article/188736?utm_source=zmt&utm_medium=zmt&utm_term=zmt
console.log(Object.entries(article))
const result = map.reduce((prev, curr, index) => {
    const [id, title] = curr.split(':')
    prev.openwrite.push(`文章来源：极客时间《[${title}](https://time.geekbang.org/column/article/${id}?utm_source=zmt&utm_medium=zmt&utm_term=zmt)》`)
    prev['蚁小二'].push(`内容来源：《${title}》(https://time.geekbang.org/column/article/${id}?utm_source=zmt&utm_medium=zmt&utm_term=zmt)`)
    return prev
}, {
    openwrite: [],
    蚁小二: []
})
console.log('result: ', result);