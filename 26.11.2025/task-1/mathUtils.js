const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => {
    if (b == 0) throw new Error("can not divide on zero");
    return Math.floor(a / b);
}

module.exports = {add, sub, mul, div};
