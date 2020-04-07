const path = require('path')
const plugin = require('../../plugin')

module.exports = (context, pluginConfig = {}, webpackConfig = {}) => {
    const testDir = path.join(__dirname, '..')
    const contextDir = path.join(testDir, 'fixtures', context)

    return {
        cache: false,
        context: contextDir,
        entry: './index',
        mode: 'production',
        output: {
            path: path.join(testDir, 'fixtures', context, 'output')
        },
        plugins: [
            new plugin({
                to: path.join(contextDir, 'output'),
                from: {
                    liquid: contextDir,
                    schema: path.join(contextDir, 'schema')
                },
                ...pluginConfig
            })
        ],
        ...webpackConfig
    }
}
