const pack = require('./config/webpack');
const compile = require('./utils/compile');

const expectedErrorMessage = 'Schema expected to be of type "object"';

describe('no-schema-found', () => {
    it('throws error when schema file is found', async done => {
        const filename = 'non-object-schema';
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
