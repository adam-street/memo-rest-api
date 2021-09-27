import cassandra from 'cassandra-driver';
import config from '../config/index.js';

const client = new cassandra.Client({
    contactPoints: config.db.contant_points,
    localDataCenter: config.db.datacenter,
    keyspace: config.db.keyspace
});

export async function query(query, params) {
    try {
        let result = await client.execute(query, params);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}