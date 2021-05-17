const fields = require("./fields.json"),
    path = require('path'),
    cors = require('cors'),
    express = require('express'),
    app = express();

app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'templates')))
app.get('/', (req, res) => {
    res.sendFile(('public/index.html'));
});

app.get('/api', (req, res) => {
    return res.json(fields)
});


app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});
