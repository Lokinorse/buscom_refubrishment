console.log(1);

const a = new Promise((resolve, reject) => resolve(console.log(2)));

a.then((res) => console.log(3));

setTimeout(() => {
  console.log(4);
}, 0);

console.log(5);
