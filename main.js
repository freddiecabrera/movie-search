'use strict';

$(function(){
  $('#searchButton').click(search);
  $('#leftBtn').click(previousPage);
  $('#rightBtn').click(nextPage);
  $('.searchForm').keypress(function(e) {
    if(e.which === 13){
      search();
    }
  });
});
var $page = 2;
var search = function () {
  $('#imgWrapper').empty();
  $('#notFound').empty();
  var $titleInput = $('#title').val();
  var $yearInput = $('#year').val();
  var api = "http://www.omdbapi.com/?s=" + $titleInput + "&y=" + $yearInput + "&plot=short&r=json";

  $.ajax({
    method: 'GET',
    url: api,
    success: function (data) {
      var movies = data.Search;
      if(movies === undefined){
        $page = 2;
        $('#notFound').html('<iframe src="http://giphy.com/gifs/zNXvBiNNcrjDW/html5" height="450" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>');
      } else {
        movies.forEach(function(item) {
          var $poster = '<img class="col-xs-4"' + 'src=' + item.Poster + '>'
          var $imdb = 'http://www.imdb.com/title/' + item.imdbID;
          $('#imgWrapper').append('<a href=' + $imdb + '>' + $poster + '</a>');
        });
      }
    },
    error: function () {
      console.error('error!');
    }
  });
}

var previousPage = function(){

  var $titleInput = $('#title').val();
  var $yearInput = $('#year').val();
  var api = "http://www.omdbapi.com/?s=" + $titleInput + "&y=" + $yearInput + "&plot=short&r=json&page=" + $page + '';

  $.ajax({
    method: 'GET',
    url: api,
    success: function (data) {
      $('#imgWrapper').empty();
      $('#notFound').empty();
      $page--;
      console.log('api before:' + api);
      var movies = data.Search;
      if(data.Response === 'False'){
        $('#notFound').html('<iframe src="http://giphy.com/gifs/zNXvBiNNcrjDW/html5" height="450" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>');
      } else {
        console.log(movies);

        movies.forEach(function(item) {
          var $poster = '<img class="col-xs-4"' + 'src=' + item.Poster + '>'
          var $imdb = 'http://www.imdb.com/title/' + item.imdbID;
          $('#imgWrapper').append('<a href=' + $imdb + '>' + $poster + '</a>');
        });
        console.log('api after:' + api);
      }
    },
    error: function () {
      console.error('error!');
    }
  });
};
var nextPage = function(){

  var $titleInput = $('#title').val();
  var $yearInput = $('#year').val();
  var api = "http://www.omdbapi.com/?s=" + $titleInput + "&y=" + $yearInput + "&plot=short&r=json&page=" + $page + '';

  $.ajax({
    method: 'GET',
    url: api,
    success: function (data) {
      $('#imgWrapper').empty();
      $('#notFound').empty();
      $page++;
      console.log('api before:' + api);
      var movies = data.Search;
      if(data.Response === 'False'){
        $('#notFound').html('<iframe src="http://giphy.com/gifs/zNXvBiNNcrjDW/html5" height="450" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>');
      } else {
        console.log(movies);

        movies.forEach(function(item) {
          var $poster = '<img class="col-xs-4"' + 'src=' + item.Poster + '>'
          var $imdb = 'http://www.imdb.com/title/' + item.imdbID;
          $('#imgWrapper').append('<a href=' + $imdb + '>' + $poster + '</a>');
        });
        console.log('api after:' + api);
      }
    },
    error: function () {
      console.error('error!');
    }
  });
};
