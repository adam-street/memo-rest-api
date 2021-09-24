import {Router} from 'express';

let memoList = {};
const router = Router();

router.post("/", (req, res) => {
    const memo = {
        id: new Date().getTime(),
        message: req.body.message
    }

    memoList.push(memo);

    res.send({
        message: 'created'
    })
});

router.get("/", (req, res) => {
    res.send({
        memo_list: memoList
    })
})

router.get("/:id", (req, res) => {
    console.log(req.params);

    const memo = memoList.find((memo) => {
        return memo.id == req.params.id
    })

    res.send({
        memo: memo
    })
})

router.put("/:id", (req, res) => {
    const memo = memoList.find((memo) => {
        return memo.id == req.params.id
    })

    memo.message = req.body.message;

    res.send({
        message: 'updated'
    })
})

router.delete("/:id", (req, res) => {
    const index = memoList.findIndex( (memo) => {
        return memo.id == req.params.id
    });

    memoList.splice(index, 1);

    res.send({
        message: "deleted"
    })
})

export default router;