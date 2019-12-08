# Liquid Schema Plugin

This plugin allows Shopify section schema to be imported from JavaScript or JSON files into Liquid sections. It is compatible with any Webpack based build system. This allows you to build partials that can be shared across multiple sections and applied in different contexts such as section blocks or settings.

## Installation

### Slate v1

Add the plugin to `slate.config.js`
```js
const LiquidSchemaPlugin = require('liquid-schema-plugin');

module.exports = {
    // ...
    'webpack.extend': {
        plugins: [
            new LiquidSchemaPlugin({
                from: './src/sections',
                to: './dist/sections',
                schemaDirectory: './src/schema'
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
            from: './src/sections',
            to: './dist/sections',
            schemaDirectory: './src/schema'
        })
    ]
}
```

## Usage

Add the following to a section file, where `'filename'` is the location of the schema relative to the `schemaDirectory` defined in the plugin settings:
```liquid
// section.liquid
{% schema 'schema' %}
{% endschema %}
```

```js
// schema.js
const banner = require('./components/banner')

module.exports = {
    name: 'Section',
    blocks: [banner]
}
```
