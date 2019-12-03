const path = require('path');
const fs = require('fs-extra');
const {RawSource} = require('webpack-sources');

const PLUGIN_NAME = 'Liquid Schema Plugin';

module.exports = class LiquidSchemaPlugin {
    constructor(options = {}) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapPromise(PLUGIN_NAME, this.buildSchema.bind(this));
    }

    async buildSchema(compilation) {
        const files = await fs.readdir(this.options.from);
        const compilationOutput = compilation.compiler.outputPath;

        compilation.contextDependencies.add(this.options.from);

        return Promise.all(
            files.map(async file => {
                const fileLocation = path.resolve(this.options.from, file);
                const fileStat = await fs.stat(fileLocation);

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
        );
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
        const fileContainsReplaceableSchemaRegex = replaceableSchemaRegex.test(fileContents)

        if (!fileContainsReplaceableSchemaRegex) {
            return new RawSource(fileContents);
        }

        let [, importableFilePath] = fileContents.match(replaceableSchemaRegex);
        importableFilePath = importableFilePath.replace(/(^('|"))|(('|")$)/g, '');
        const importedFile = require(
            path.resolve(this.options.schemaDirectory, importableFilePath)
        );

        return new RawSource(fileContents.replace(replaceableSchemaRegex, JSON.stringify(importedFile, null, 4)));
    }
}
