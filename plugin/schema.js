module.exports = {
    type: 'object',
    required: ['from', 'to'],
    properties: {
        from: {
            description: 'Input directory for liquid files',
            type: 'object',
            required: ['liquid', 'schema'],
            properties: {
                liquid: {
                    description: 'Input directory for liquid files',
                    type: 'string',
                },
                schema: {
                    description: 'Input directory for schema files',
                    type: 'string',
                },
            },
            additionalProperties: false,
        },
        to: {
            description: 'Output directory for liquid files',
            type: 'string',
        },
    },
    additionalProperties: false,
};
