/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


// hard-coded data
var sampleAlbums = [{
  artistName: 'Ladyhawke',
  name: 'Ladyhawke',
  releaseDate: '2008, November 18',
  genres: [ 'new wave', 'indie rock', 'synth pop' ]
}, {
  artistName: 'The Knife',
  name: 'Silent Shout',
  releaseDate: '2006, February 17',
  genres: [ 'synth pop', 'electronica', 'experimental' ]
}, {
  artistName: 'Juno Reactor',
  name: 'Shango',
  releaseDate: '2000, October 9',
  genres: [ 'electronic', 'goa trance', 'tribal house' ]
}, {
  artistName: 'Philip Wesley',
  name: 'Dark Night of the Soul',
  releaseDate: '2008, September 12',
  genres: [ 'piano' ]
}];


$(document).ready(() => {
  console.log('app.js loaded!');
$.ajax({
  url: '/api/albums',
  method: 'GET',
  success: (albumData) => {
    console.log('album data: ' + JSON.stringify(albumData.albums))
    albumData.albums.forEach((album) => {
      renderAlbum(album)
    })
  }
  })
  $('#newAlbumForm').submit( (e) => {
    e.preventDefault();
    var albumUpdates = $('#newAlbumForm').serializeArray();
    var queryParams = `name=${albumUpdates[0].value}&artistName=${albumUpdates[1].value}&releaseDate=${albumUpdates[2].value}`
    console.log(queryParams);
    $('#newAlbumForm input').val('');
    $.ajax({
      url: `api/albums?${queryParams}`,
      method: 'POST',
      success: (album) => {
        console.log('new album: ' + JSON.stringify(album));
        renderAlbum(album);
      }

    })

})
$('#albums').on('click', '.add-song', function(e) {
    console.log('add-song clicked!');
    var id= $(this).closest('.album').data('album-id');
    $('#songModal').data('album-id', id).modal();
    console.log('id',id);
});
$('#saveSong').on('click', (e) => {
  e.preventDefault();
  var songName = $('#songName').val();
  var trackNumber = $('#trackNumber').val();
  var queryParams = `name=${songName}&trackNumber=${trackNumber}`
  var albumId = $('#songModal').data('album-id');
  console.log(queryParams);
  $('#songModal input').val('');
  $.ajax({
    url: `api/album/${albumId}/tracks?${queryParams}`,
    method: 'POST',
    success: (updatedAlbum) => {
      console.log('new track: ' + JSON.stringify(updatedAlbum));
      $(`#${albumId}`).remove();
      renderAlbum(updatedAlbum);

    }

  })
});
});







// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);
  var trackTemplate = '';
  album.tracks.forEach((track) => {
    trackTemplate += ` - (${track.trackNumber}) ${track.name}`
  })

var albumTemplate = `
  <div class="row album" data-album-id="${album._id}" id="${album._id}">
    <div class="col-md-10 col-md-offset-1">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class='row'>
            <div class="col-md-3 col-xs-12 thumbnail album-art">
              <img src="images/800x800.png" alt="album image">
            </div>
            <div class="col-md-9 col-xs-12">
              <ul class="list-group">
                <li class="list-group-item">
                  <h4 class='inline-header'>Album Name:</h4>
                  <span class='album-name'>${album.name}</span>
                </li>
                <li class="list-group-item">
                  <h4 class='inline-header'>Artist Name:</h4>
                  <span class='artist-name'>${album.artistName}</span>
                </li>
                <li class="list-group-item">
                  <h4 class='inline-header'>Released date:</h4>
                  <span class='album-releaseDate'>${album.releaseDate}</span>
                </li>
                <li class="list-group-item trackList">
                  <h4 class="inline-header">Songs:</h4>
                  <span>${trackTemplate}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class='panel-footer'>
            <button class='btn btn-primary add-song'>Add Song</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
$('#albums').append(albumTemplate);

}
