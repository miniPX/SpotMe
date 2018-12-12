var express = require('express'),
    bodyParser = require('body-parser'),
    approutes = require('./routes.js'),
    app = express(),
    port = process.env.port || 3000;

//router
app.use('/api/', approutes);

//body parser
app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Server currently running on port 3000');
});