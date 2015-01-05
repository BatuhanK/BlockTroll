var Twit = require('twit')
var fs = require('fs');
var util = require('util');


var kelimeler = fs.readFileSync('kelimeler.txt','utf8');
var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
})


var count = 0;

var stream = T.stream('statuses/filter', { track: kelimeler , language: 'tr' });



	stream.on('connect', function (request) {
  		console.log("## Twitter Stream baglantisi saglandi !");
	});
	stream.on('disconnect', function (request) {
  		console.log("-- Twitter Stream baglantisi koptu !");
	});

	stream.on('tweet', function (tweet) {

		var screen_name = tweet.user.screen_name;
		T.post('blocks/create', { screen_name: screen_name }, function(err, data, response) {
			if(err){
				console.log(err)
			}
			else {
				count++;
				var bilgilendirme = util.format("%s kullanicisi blocklandi, toplam blocklanan kullanici -- %s",screen_name,count);
				console.log(bilgilendirme);
			}
		});
	});
														
