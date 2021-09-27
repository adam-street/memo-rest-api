import {query} from "../../lib/db.js";

async function post(req, res) {
    const cql = `
        INSERT INTO astreet.memo_by_user (id, created_timestamp, user_id, content, tags)
        VALUES (now(), toTimestamp(now()), ?, ?, ?);
    `;

    const params = [
        req.body.userID,
        req.body.content,
        req.body.tags ? req.body.tags : [],
    ];

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

async function getByUserID(req, res) {
    const cql = `
        SELECT id, created_timestamp, content, tags
        FROM astreet.memo_by_user
        WHERE user_id = ?
        ;
    `;

    const params = [
        req.body.userID,
    ];

    try {
        let memoList = await query(cql, params);

        if (req.body.tags) {

            /*
                loop over each tag in request and create a list memos with a matching tag
                loop over matching memos and add them to the temp list if they are not already added
                overwrite memoList with tempList
             */
            const tempList = [];
            for (const tag of req.body.tags) {
                let matchList = memoList.filter(memo => memo.tags.includes(tag));
                for (let match of matchList) {
                    const existingMemo = tempList.find(memo => memo.id === match.id);
                    if (!existingMemo) {
                        tempList.push(match);
                    }
                }
            }

            memoList = tempList;
        }

        res.send({
            memo_list: memoList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'error'
        });
    }
}

async function getByPostID(req, res) {
    const cql = `
        SELECT *
        FROM astreet.memo
        WHERE id = ?;
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
        UPDATE astreet.memo
        SET content = ?
        WHERE id = ?;
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
        DELETE
        FROM astreet.memo
        WHERE id = ?
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
    getByPostID,
    getByUserID,
    put,
    del
}