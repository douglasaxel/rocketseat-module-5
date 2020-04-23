var fs = require('fs');
var parse = require('csv-parse');
var path = require('path');

var inputFile = path.resolve(__dirname, 'tmp', '04ed5ac551f0fa1dc164 - import_template.csv');

var csvData = [];
fs.createReadStream(path.resolve(__dirname, 'tmp', '04ed5ac551f0fa1dc164 - import_template.csv'))
  .pipe(parse({ delimiter: ':' }))
  .on('data', csvrow => {
    console.log(csvrow);
    //do something with csvrow
    csvData.push(csvrow);
  });
