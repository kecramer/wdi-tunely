var express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./model'),
	 controller = require('./controller');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile('views/index.html' , {root : __dirname});
});

app.get('/api', controller.api.index);
app.get('/api/albums', controller.albums.index);


app.listen(process.env.PORT || 3000, () => {
	console.log('Book app listening at http://localhost:3000/');
});
