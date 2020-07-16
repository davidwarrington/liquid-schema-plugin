const pack = require('./config/webpack');
const compile = require('./utils/compile');

const expectedErrorMessage = 'File to import not found or unreadable';

describe('invalid-json-schema', () => {
    it('throws error when invalid json is exported from schema file', async done => {
        const filename = 'invalid-json-schema';
        const compiler = pack(filename);

        expect(compiler.run).toThrow();
        try {
            await compile(filename, done);
        } catch (error) {
            expect(error.message).toContain(expectedErrorMessage);
            done();
        }
    }, 10000);

    it('throws error when invalid js is exported from schema file', async done => {
        const filename = 'invalid-js-schema';
        const compiler = pack(filename);

        expect(compiler.run).toThrow();
        try {
            await compile(filename, done);
        } catch (error) {
            expect(error.message).toContain(expectedErrorMessage);
            done();
        }
    }, 10000);
});
