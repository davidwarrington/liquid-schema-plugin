const compile = require('./utils/compile');

describe('object-schema', () => {
    it('uses schema returned by object', done => {
        const filename = 'object-schema';

        compile(filename, done);
    }, 10000);
});
