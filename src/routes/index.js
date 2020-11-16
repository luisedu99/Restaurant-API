const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": "Luis",
        "lastname" : "Cañas"
    };
    //res.json(data);
});

module.exports = router;