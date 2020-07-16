const compile = require('./utils/compile');

describe('function-schema', () => {
    it('uses schema returned by function', done => {
        const filename = 'function-schema';

        compile(filename, done);
    }, 10000);
});
