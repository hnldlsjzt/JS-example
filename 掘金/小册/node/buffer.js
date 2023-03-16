const a = Buffer.from('123');
console.log(a instanceof Uint8Array);  // true
console.log(a.byteOffset);  // 16
console.log(a.buffer);   