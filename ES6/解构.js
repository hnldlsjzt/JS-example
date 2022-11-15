
const obj = {
    a: 1,
    b: 2,
    c: 3
}
const { a: a1, ...d } = obj;
console.log(a1, d);