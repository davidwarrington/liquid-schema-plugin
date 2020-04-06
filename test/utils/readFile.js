const fs = require('fs')

module.exports = file => {
    return fs.readFileSync(file, { encoding: 'utf-8' })
}
