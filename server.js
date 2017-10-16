

const express = require('express');
const app = express();
const http = require('http').createServer(app);

const path = require('path');


app.set('port', (process.env.PORT || 3000));

app.use('/bower_components', express.static(path.join(__dirname, '/app/bower_components')));
app.use('/public', express.static(path.join(__dirname, '/app/public')));


http.listen(app.get('port'), function () {
    console.log('Server is listening at port: ' + app.get('port'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/app/index.html'));

});