const compile = require('./utils/compile')

describe('no-schema', () => {
    it('uses schema included between schema liquid tags', done => {
        const filename = 'no-schema'

        compile(filename, done)
    }, 10000)
})
