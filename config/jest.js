const path = require('path')
const { alias: aliases } = require('./webpack')
const basePath = path.join(__dirname, '..', 'src')

const mapAliasNames = (aliases) => {
  const nameMap = {}

  Object.keys(aliases).forEach(alias => {
    const aliasPath = aliases[alias]

    const mappedPath = aliasPath.replace(basePath, '<rootDir>/src')

    nameMap[`^${alias}[/]?(.*)`] = mappedPath + '/$1'
  })

  return nameMap
}

module.exports = {
  configure: {
    collectCoverage: true,
    moduleNameMapper: Object.assign({
      '^libphonenumber-js$': 'libphonenumber-js',
      '\\.worker.js': '<rootDir>/__mocks__/workerMock.js'
    }, mapAliasNames(aliases))
  }
}
