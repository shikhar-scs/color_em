const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const config = require('./config.json')
const fileupload = require('express-fileupload');

const routes = {
    dashboard: require('./api/dashboard').route
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/dashboard', routes.dashboard);

app.use(express.static(path.join(__dirname,'/frontendWorks')));

app.get('/',(req,res)=>{
    res.redirect('/dashboard/uploadImages');
});

app.use(fileupload());

app.post('/imageupload', (req, res) => {

    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    console.log(req.files.sampleFile)
    const sampleFile = req.files.sampleFile

    sampleFile.mv(__dirname + '/frontendWorks/dist/imageUsers/black_image.jpg', function(err) {
        if (err)
            return res.status(500).send(err);
    });

    imageVision()
        .then((d)=>{
                    console.log('imagevision ka .then() ->' + d)
                res.send(d)
        })

    function imageVision() {
        return new Promise((res, rej) => {
            console.log('imagevision')
            const spawn = require('child_process').spawn;
            let py = spawn('python', [path.join(__dirname, 'api/pythonScripts/imgcap.py')]);

            py.stdout.on('data', function (data) {
                info = data.toString();
                res(info)
            });

            py.stderr.on('data', (data) => {
                console.log(data.toString());
                console.log("Error occured!");
            });
            py.stdin.end();
        })
    }

});

app.use((req,res)=> res.status(404).send('page not found'));

app.listen( process.env.PORT || config.SERVER.PORT ,
    ()=> {console.log("Server started at http://localhost:" +config.SERVER.PORT)});
