const router = require('express').Router();

/**
 * endpoint /api/sample
 */
router.route('/').get((req, res) => {
    try {
        res.json({
            'hey': 'something worked'
        });
    } catch (error) {
        res.status(400).json('error: ' + error);
    }
})

/**
 * endpoint /api/sample/list
 */
router.route('/list').get((req, res) => {
    try {
        res.json({
            'list': [
                'one' , 'two', 'three'
            ]
        });
    } catch (error) {
        res.status(400).json('error: ' + error);
    }
})


module.exports = router;