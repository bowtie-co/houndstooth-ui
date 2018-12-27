const fs = require('fs')

fs.readdirSync(__dirname).forEach(fileName => {
  if (fileName.substr(-3) === '.js' && fileName !== 'index.js') {
    module.exports[fileName.split('.')[0]] = require('./' + fileName)
  }
})
