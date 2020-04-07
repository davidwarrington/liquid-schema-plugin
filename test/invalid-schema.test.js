const pack = require('./config/webpack')

describe('invalid-json-schema', () => {
    it('throws error when invalid json is exported from schema file', done => {
        const filename = 'invalid-json-schema'
        const compiler = pack(filename)

        expect(compiler.run).toThrow()
        done()
    }, 10000)

    it('throws error when invalid js is exported from schema file', done => {
        const filename = 'invalid-js-schema'
        const compiler = pack(filename)

        expect(compiler.run).toThrow()
        done()
    }, 10000)
})
