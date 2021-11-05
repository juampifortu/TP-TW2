const express = require('express');

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
    console.log(JSON.stringify(req.body));
});

app.post('/registro', (req, res) => {
    console.log(JSON.stringify(req.body));
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});