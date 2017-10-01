const datas = require('./assets/datas.js').datas;
const Immutable = require('immutable');
const start = new Date();
const newDatasState = new Immutable.Record({
  id: undefined,
  title: '',
});
const s = datas.list.g1.map(v => {
  const a = newDatasState({
    id: v.id,
    title: v.title,
  });
  return a.toObject();
});
const v = s.slice(0, 2);
console.log(v);
const end = new Date();
console.log('Elapsed time: ' + (end - start) + ' msec');
