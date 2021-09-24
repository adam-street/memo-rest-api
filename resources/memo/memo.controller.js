import model from './memo.model.js';
import {query} from "../../lib/db.js";
import config from "../../config/index.js";

async function getOne(req, res) {
    const cql = `
        SELECT *
        FROM ${config.db.keyspace}.${model.table_name}
        WHERE id = ?
        ;
    `;

    const params = [
        req.params.id
    ];

    try {
        const results = await query(cql, params);
        if (results.rows.length === 0) {
            return res.status(404).send({
                message: 'unknown id'
            });
        }

        return res.send({
            data: results.rows[0]
        });
    } catch (error) {

        if (error.code == 8704) {
            return res.status(404).send({
                message: 'invalid id'
            });
        }

        console.error(error);
        return res.status(400).send({
            message: 'internal error'
        });
    }
}

async function getAll(req, res) {
    const cql = `
        SELECT *
        FROM ${config.db.keyspace}.${model.table_name}
        ;
    `;

    const params = [];

    try {
        const results = await query(cql, params);
        return res.send({
            data: results.rows
        });

    } catch (error) {
        console.error(error);
        return res.status(400).send({
            message: 'internal error'
        });
    }
}

async function post(req, res) {

    validate(req, res);

    const cql = `
        INSERT INTO ${config.db.keyspace}.${model.table_name} (id, content)
        VALUES (now(), ?)
        ;
    `;

    const params = [req.body.content];

    try {
        await query(cql, params);
        return res.send({
            message: 'created'
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            message: 'internal error'
        });
    }


    function validate(req, res) {
        const requiredCols = model.table_cols.filter(col => col.required);
        for (const col of requiredCols) {
            if (!req.body[col.name]) {
                res.status(400).send({
                    message: `parameter (${col.name}) is required`
                })
            }
        }
    }
}

async function put(req, res) {
    // TODO
}

async function del(req, res) {
    // TODO
}

export default {
    getOne,
    getAll,
    post,
    put,
    del
}