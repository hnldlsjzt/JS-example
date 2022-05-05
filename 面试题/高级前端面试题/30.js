function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5 * 1000);
  });
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();
