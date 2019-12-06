module.exports = {
    type: 'object',
    required: [
        'from',
        'schemaDirectory',
        'to'
    ],
    properties: {
        from: {
            description: 'Input directory for liquid files',
            type: 'string'
        },
        schemaDirectory: {
            description: 'Input directory for schema files',
            type: 'string'
        },
        to: {
            description: 'Output directory for liquid files',
            type: 'string'
        }
    },
    additionalProperties: false
}
