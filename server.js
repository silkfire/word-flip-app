const path = require('path');
const express = require('express');
const app = express();

const distDirectory = path.resolve(__dirname, 'dist');

app.use(express.static(distDirectory));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(distDirectory, 'index.html'));
});

const server = app.listen(process.env.PORT || 3000, function() {
    const address = server.address();

    console.log('App listening at http://%s:%s', address.address, address.port);
    // console.log(process.env);
});