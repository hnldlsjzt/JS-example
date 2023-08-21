
const obj = {
    a: 1,
    b: 2,
    c: 3
}
const { a: a1, ...d } = obj;
console.log(a1, d);

function getCode(params) {
    console.log('code', this, this.code);
}
const OrgPropertyAddRights = {
    code: 'OrgPropertyAdd',
    get add() {
        console.log('code', this, this.code);
        return this.code
    }
}

console.log(OrgPropertyAddRights.add);