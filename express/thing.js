const router = require('express').Router()

router.get('/', (req, res) => {
    return res.json({ message: "pass!" });
})

module.exports = router;
