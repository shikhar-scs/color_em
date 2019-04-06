const router = require('express').Router();
const path = require('path');


router.get('/uploadImages', (req,res) => {
    res.sendFile(path.join(__dirname,'../frontendWorks/html/uploadImages.html'));
});


module.exports.route = router;