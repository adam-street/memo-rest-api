import cassandra from 'cassandra-driver';

const client = new cassandra.Client({
    contactPoints: ['3.132.60.209'],
    localDataCenter: 'datacenter1',
    keyspace: 'astreet'
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