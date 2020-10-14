# Liquid Schema Plugin

This plugin allows Shopify section schema to be imported from JavaScript or JSON files into Liquid sections. It is compatible with any Webpack based build system. This allows you to build partials that can be shared across multiple sections and applied in different contexts such as section blocks or settings.

## Installation
Install using yarn:
```shell
yarn add --dev liquid-schema-plugin
```

Or npm:
```shell
npm install --save-dev liquid-schema-plugin
```

### Slate v1

Add the plugin to `slate.config.js`
```js
const LiquidSchemaPlugin = require('liquid-schema-plugin');

module.exports = {
    // ...
    'webpack.extend': {
        plugins: [
            new LiquidSchemaPlugin({
                from: {
                    liquid: './src/sections',
                    schema: './src/schema'
                },
                to: './dist/sections'
            })
        ]
    }
}
```

### Webpack

Add the plugin to `webpack.config.js`
```js
const LiquidSchemaPlugin = require('liquid-schema-plugin');

module.exports = {
    // ...
    plugins: [
        // ...
        new LiquidSchemaPlugin({
            from: {
                liquid: './src/sections',
                schema: './src/schema'
            },
            to: './dist/sections'
        })
    ]
}
```

## Usage

Add the following to a section file, where `'filepath'` is the location of the schema relative to the `schemaDirectory` defined in the plugin settings:
```liquid
// section.liquid
{% schema 'filepath' %}
```
Note: It doesn't require an `endschema` tag.

```js
// schema.js
const banner = require('./components/banner')

module.exports = {
    name: 'Section',
    blocks: [banner]
}
```

Alternatively, the schema file can export a function, in which case it takes the section filename as the first argument and the contents of the schema tags (after running it through JSON.parse) as the second, like so:
```liquid
// section.liquid
{% schema 'filepath' %}
{
    "settings": [...]
}
{% endschema %}
```

```js
// schema.js
const banner = require('./components/banner')

module.exports = (filename, contents) => ({
    name: filename,
    settings: contents.settings,
    blocks: [banner]
})
```

## Further Reading
If you'd like to learn more about how you can benefit from using this plugin, you can read about making schemas easier to maintain, creating repeatable groups of schema settings and making your schemas modular in [this blog post](https://ellodave.dev/blog/2020/10/14/building-shopify-section-schemas-with-javascript).
