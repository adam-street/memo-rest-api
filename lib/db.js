import cassandra from 'cassandra-driver';
import config from '../config/index.js';

const client = new cassandra.Client({
    contactPoints:
        config.db.contact_points,
    localDataCenter:
        config.db.data_center,
    keyspace:
        config.db.keyspace,
    authProvider:
        new cassandra.auth.PlainTextAuthProvider(
            config.db.auth.user,
            config.db.auth.pass,
        )
});

export async function connect() {
    try {
        await client.connect();
    }
    catch (error) {
        throw error
    }
}

export async function query(cql, params) {
    try {
        const results = await client.execute(cql, params);
        return results;
    } catch (error) {
        throw error;
    }
}

export default {
    connect,
    query
}