import fs from 'fs';

const list = fs.readdirSync('.');
console.log('list: ', list);
