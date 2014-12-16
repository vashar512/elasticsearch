var express = require('express'),
  config = require('./config/config');

var twitterKey = 'dMwGilyEIuH0PMdmxmDFTr7BD',
    twitterSecret = '7Ebh0oheS734yNsSFDJmIeAymxjkuaqPpVFWgnFi2rC8cw8iy6',
    token = '2890344886-ZRimYCSfnQVlaHhQr2CiiKw7t65VMPLNVJAY43C',
    secret = 'I9GNc8MB05UfbIaKFAUZezfLbsdDgQmz38RRjSyDEkfNb';

var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  twitterKey,
  twitterSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

oauth.get('https://api.twitter.com/1.1/statuses/home_timeline.json',
      token,
      secret,
      function (error, data, response){
        if (error) console.error(error);
        json = JSON.parse(data);
        tweets = JSON.stringify(json);
        console.log(json);
      }
);

var app = express();

//require('./config/express')(app, config);

app.listen(config.port);
