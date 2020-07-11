const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use('/bower_components', express.static(path.join(__dirname, '/app/bower_components')));
app.use('/public', express.static(path.join(__dirname, '/app/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app/index.html'));
});

app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});
