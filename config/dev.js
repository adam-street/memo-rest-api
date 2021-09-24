const config = {
    log: {
        format: ':method :url :status :response-time ms - :res[content-length]'
    },
    jwt: {
        exp: '1m',
    },
    db: {
        contact_points: ['3.132.60.209'],
        data_center: 'datacenter1',
        keyspace: 'astreet',
    }
}

export default config;