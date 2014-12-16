var express = require('express'),
  config = require('./config/config'),
  keys = require('./oauth.js'),
  elasticsearch = require('elasticsearch'),
  CronJob = require('cron').CronJob;

var client = new elasticsearch.Client({
                    host: 'localhost:9200',
                    sniffOnStart: true,
                    sniffInterval: 60000,
                    trace: true
                  });

var twitterKey = keys.twitter.consumerKey,
    twitterSecret = keys.twitter.consumerSecret,
    token = keys.twitter.oauth_token,
    secret = keys.twitter.oauth_token_secret;

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
new CronJob('15 * * * * *', function(){
    console.log('cron job is running...');
    oauth.get('https://api.twitter.com/1.1/statuses/home_timeline.json',
      token,
      secret,
      function (error, data, response){
        if (error) console.error(error);
        json = JSON.parse(data);
        tweets = JSON.stringify(json);

        for(var i = 0; i<json.length; i++)
          {
            var item = json[i];
            client.create({
              index: 'twitter',
              type: 'tweets',
              id: item.id,
              body: item
            }, function (error, response) {
              if(error) {
                console.log(error);
              } else {
                console.log("index created!");
              }
            });
          }
    });
}, null, true, "America/New_York");


var app = express();

require('./config/express')(app, config);

app.listen(config.port);



