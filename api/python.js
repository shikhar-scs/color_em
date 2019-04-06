const router = require('express').Router();
const path = require('path');

router.get('/images', (req,res) => {
    console.log(req)
    //
    // if (!req.files)
    //     return res.status(400).send('No files were uploaded.');
    // const sampleFile = req.files.sampleFile
    //
    //
    // sampleFile.mv(__dirname + '../imageUsers/black_image.jpg', function(err) {
    //     if (err)
    //         return res.status(500).send(err);
    // });
    // console.log("dss")
    console.log("hi")
     imageVision()
        .then((d)=>{
                    console.log('imagevision ka .then()')
            console.log(d)
            router.post('/python/setImages',(req,res)=>{
                res.send(d)
            })
        })
})


function imageVision() {
    return new Promise((res, rej) => {
        console.log('imagevision')
        const spawn = require('child_process').spawn;
        let py = spawn('python', [path.join(__dirname, 'pythonScripts/imgcap.py')]);

        py.stdout.on('data', function (data) {
            info = data.toString();
            console.log("data aaya ");
            console.log(info);
            res('defe')
        });

        py.stderr.on('data', (data) => {
            console.log(data.toString());
            console.log("Error occured!");
        });
        py.stdin.end();
        // res("done")
    })
}

module.exports.route = router;
