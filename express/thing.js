const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ message: "pass!" });
})

module.exports = router;
