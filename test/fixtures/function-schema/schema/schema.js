module.exports = (filename, contents) => ({
    name: filename,
    settings: [
        {
            label: 'Title',
            id: 'title',
            type: 'text',
        },
        ...contents.settings,
    ],
});
