const datas = require('./assets/datas.js').datas;
const start = new Date();
const s = datas.list.g1.map(v => {
  return Object.assign({}, { id: v.id, title: v.title });
});
const v = s.slice(0, 2);
console.log(v);
const end = new Date();
console.log('Elapsed time: ' + (end - start) + ' msec');
