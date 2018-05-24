var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongSchema = new Schema ({
  trackNumber: Number,
  name: String
})

var AlbumSchema = new Schema ({
  artistName: String,
  tracks: [SongSchema],
  name: String,
  releaseDate: String
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
