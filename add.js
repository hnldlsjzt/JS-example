function add(count, index) {
    let sum = 0;
    for (let i = index; i < count; i++) {
        sum += i;
    }
    return sum
}
console.log(add(27, 18));