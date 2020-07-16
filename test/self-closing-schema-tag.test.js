const compile = require('./utils/compile');

describe('self-closing-schema-tag', () => {
    it('supports external schema with no endschema tag', done => {
        const filename = 'self-closing-schema-tag';

        compile(filename, done);
    }, 10000);
});
