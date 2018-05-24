var db = require('../model');

var albums = [{
	_id: 132,
	artistName: 'Nine Inch Nails',
	name: 'The Downward Spiral',
	releaseDate: '1994, March 8',
	genres: [ 'industrial', 'industrial metal' ]
}, {
	_id: 133,
	artistName: 'Metallica',
	name: 'Metallica',
	releaseDate: '1991, August 12',
	genres: [ 'heavy metal' ]
}, {
	_id: 134,
	artistName: 'The Prodigy',
	name: 'Music for the Jilted Generation',
	releaseDate: '1994, July 4',
	genres: [ 'electronica', 'breakbeat hardcore', 'rave', 'jungle' ]
}, {
	_id: 135,
	artistName: 'Johnny Cash',
	name: 'Unchained',
	releaseDate: '1996, November 5',
	genres: [ 'country', 'rock' ]
}];

function index(req, res) {
	// res.json({albums});
	db.Album.find({}, (err, albums) => {
		if (err) {
			console.log('this didn\'t work')
			res.sendStatus(500)
		}
		console.log(albums);
		res.json({albums});

	})
};

function create(req, res) {
	var newAlbumName = req.query.name;
	var newAlbumArtist = req.query.artistName;
	var newAlbumReleaseDate = req.query.releaseDate;
	db.Album.create({
		name: newAlbumName,
		artistName: newAlbumArtist,
		releaseDate: newAlbumReleaseDate
	}, function(err, album){
		if (err) { return console.log('ERROR', err); }
		console.log("New album:", album);
		console.log("created", album.length, "albums");
		res.json(album);
	});
};

function show(req, res) {

};

function destroy(req, res) {

};

function update(req, res) {

};

module.exports = {
	index,
	create,
	show,
	destroy,
	update,
}
