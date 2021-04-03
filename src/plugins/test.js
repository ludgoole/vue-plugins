export const add = (x, y) => x + y
export const sum = (...args) => args.reduce((a, c) => a + c, 0)

export default { add, sum }
