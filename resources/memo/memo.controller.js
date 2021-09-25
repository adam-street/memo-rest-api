
import {query} from "../../lib/db.js";

async function post(req, res) {
    const cql = `
        INSERT INTO astreet.memo (id, content)
        VALUES(now(), ?);
    `;

    const params = [
        req.body.content
    ]

    try {
        await query(cql, params);
        res.send({
            message: 'created'
        });
    } catch (error) {
        res.status(500).send({
            message: 'error'
        });
    }
}

async function getAll(req, res) {
    const cql = `
        SELECT * FROM astreet.memo LIMIT 500;
    `;
    const params = [];

    try {
        let memoList = await query(cql, params);
        res.send({
            memo_list: memoList
        });
    } catch (error) {
        res.status(500).send({
            message: 'error'
        });
    }
}

async function getById(req, res) {
    const cql = `
        SELECT * FROM astreet.memo WHERE id = ?;
    `;

    const params = [req.params.id];

    try {
        let memoList = await query(cql, params);
        res.send({
            memo: memoList[0]
        });
    } catch (error) {

        if (error.code === 8704) {
            res.status(400).send({
                message: 'invalid id'
            });
        }

        res.status(500).send({
            message: 'error'
        });
    }
}

async function put(req, res) {
    const cql = `
        UPDATE astreet.memo SET content = ? WHERE id = ?;
    `;

    const params = [req.body.content, req.params.id];

    try {
        await query(cql, params);
        res.send({
            message: 'updated'
        });
    } catch (error) {
        if (error.code === 8704) {
            res.status(400).send({
                message: 'invalid id'
            });
        }

        res.status(500).send({
            message: 'error'
        });
    }
}

async function del(req, res) {
    const cql = `
        DELETE FROM astreet.memo WHERE id = ?
    `;

    const params = [req.params.id];

    try {
        await query(cql, params);
        res.send({
            message: 'delete'
        });
    } catch (error) {
        if (error.code === 8704) {
            res.status(400).send({
                message: 'invalid id'
            });
        }

        res.status(500).send({
            message: 'error'
        });
    }
}

export default {
    post,
    getAll,
    getById,
    put,
    del
}