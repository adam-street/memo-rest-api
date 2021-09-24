const model = {
    table_name: 'memo',
    table_cols: [
        {
            name: 'id',
            type: 'TIMEUUID',
            primary_key: true,
        },
        {
            name: 'content',
            type: 'text',
            required: true,
        }
    ]
}

export default model;