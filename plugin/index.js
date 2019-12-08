const fs = require('fs-extra');
const log = require('webpack-log');
const path = require('path');
const validate = require('schema-utils');
const {RawSource} = require('webpack-sources');
const {asString} = require('webpack').Template;

const schema = require('./schema');

const PLUGIN_NAME = 'Liquid Schema Plugin';

const logger = log({ name: PLUGIN_NAME });

module.exports = class LiquidSchemaPlugin {
    constructor(options = {}) {
        validate(schema, options, { name: PLUGIN_NAME });
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapPromise(PLUGIN_NAME, this.buildSchema.bind(this));
    }

    async buildSchema(compilation) {
        const files = await fs.readdir(this.options.from);
        const compilationOutput = compilation.compiler.outputPath;

        compilation.contextDependencies.add(this.options.from);

        const preTransformCache = [...Object.keys(require.cache)];

        return Promise.all(
            files.map(async file => {
                const fileLocation = path.resolve(this.options.from, file);
                const fileStat = await fs.stat(fileLocation);

                compilation.contextDependencies.add(fileLocation);

                if (fileStat.isFile() && path.extname(file) === '.liquid') {
                    const outputKey = this._getOutputKey(
                        path.resolve(this.options.from, file),
                        compilationOutput
                    );
                    compilation.assets[outputKey] = await this._replaceSchemaTags(
                        path.resolve(this.options.from, file)
                    );
                }
            })
        )
        .then(() => {
            const postTransformCache = [...Object.keys(require.cache)];
            postTransformCache
                .filter(module => !preTransformCache.includes(module))
                .forEach(module => {
                    compilation.contextDependencies.add(module);
                    compilation.fileDependencies.add(module);
                    delete require.cache[module];
                });
        });
    }

    _getOutputKey(liquidSourcePath, compilationOutput) {
        const fileName = path.relative(
            this.options.from,
            liquidSourcePath
        );
        const relativeOutputPath = path.relative(
            compilationOutput,
            this.options.to
        );

        return path.join(relativeOutputPath, fileName);
    }

    async _replaceSchemaTags(fileLocation) {
        const fileContents = await fs.readFile(fileLocation, 'utf-8');
        const replaceableSchemaRegex = /{%-? ?schema ('.*'|".*") ?-?%}\s*{%-? ?endschema ?-?%}/;
        const fileContainsReplaceableSchemaRegex = replaceableSchemaRegex.test(fileContents);

        if (!fileContainsReplaceableSchemaRegex) {
            return new RawSource(fileContents);
        }

        let [, importableFilePath] = fileContents.match(replaceableSchemaRegex);
        importableFilePath = importableFilePath.replace(/(^('|"))|(('|")$)/g, '');
        importableFilePath = path.resolve(this.options.schemaDirectory, importableFilePath);
        const importedSchema = require(importableFilePath);

        if (typeof importedSchema !== 'object') {
            const fileName = path.basename(require.resolve(importableFilePath));
            logger.error(`Error! Expected an object to be exported from ${fileName}`);
        }

        return new RawSource(
            fileContents.replace(replaceableSchemaRegex, asString([
                '{% schema %}',
                JSON.stringify(importedSchema, null, 4),
                '{% endschema %}'
            ]))
        );
    }
}
