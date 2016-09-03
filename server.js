//Copyright 2013-2014 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//Licensed under the Apache License, Version 2.0 (the "License"). 
//You may not use this file except in compliance with the License. 
//A copy of the License is located at
//
//    http://aws.amazon.com/apache2.0/
//
//or in the "license" file accompanying this file. This file is distributed 
//on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
//either express or implied. See the License for the specific language 
//governing permissions and limitations under the License.

//Get modules.
/*var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var AWS = require('aws-sdk');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.locals.theme = process.env.THEME; //Make the THEME environment variable available to the app. 

//Read config values from a JSON file.
var config = fs.readFileSync('./app_config.json', 'utf8');
config = JSON.parse(config);

//Create DynamoDB client and pass in region.
var db = new AWS.DynamoDB({region: config.AWS_REGION});
//Create SNS client and pass in region.
var sns = new AWS.SNS({ region: config.AWS_REGION});

//GET home page.
app.get('/', routes.index);

//POST signup form.
app.post('/signup', function(req, res) {
  var nameField = req.body.name,
      emailField = req.body.email,
      previewBool = req.body.previewAccess;
  res.send(200);
  signup(nameField, emailField, previewBool);
});

//Add signup form data to database.
var signup = function (nameSubmitted, emailSubmitted, previewPreference) {
  var formData = {
    TableName: config.STARTUP_SIGNUP_TABLE,
    Item: {
      email: {'S': emailSubmitted}, 
      name: {'S': nameSubmitted},
      preview: {'S': previewPreference}
    }
  };
  db.putItem(formData, function(err, data) {
    if (err) {
      console.log('Error adding item to database: ', err);
    } else {
      console.log('Form data added to database.');
      var snsMessage = 'New signup: %EMAIL%'; //Send SNS notification containing email from form.
      snsMessage = snsMessage.replace('%EMAIL%', formData.Item.email['S']);
      sns.publish({ TopicArn: config.NEW_SIGNUP_TOPIC, Message: snsMessage }, function(err, data) {
        if (err) {
          console.log('Error publishing SNS message: ' + err);
        } else {
          console.log('SNS message sent.');
        }
      });  
    }
  });
};

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/

const fs = require('fs');
const Guid = require('guid');
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const Mustache  = require('mustache');
const Request  = require('request');
const Querystring  = require('querystring');
const AWS = require('aws-sdk');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var csrf_guid = Guid.raw();
const api_version = "v1.0";
const app_id = "318220035190461";
const app_secret = '25ceabc36fe3c704f745814fc588f873';
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.0/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.0/access_token';

//Read config values from a JSON file.
var config = fs.readFileSync('./app_config.json', 'utf8');
config = JSON.parse(config);

//Create DynamoDB client and pass in region.
var db = new AWS.DynamoDB({region: config.AWS_REGION});
//Create SNS client and pass in region.
var sns = new AWS.SNS({ region: config.AWS_REGION});
function loadLogin() {
  return fs.readFileSync('public/index.html').toString();
}

app.get('/hello', function(request, response){
  var view = {
    appId: app_id,
    csrf: csrf_guid,
    version: api_version,
  };

  var html = Mustache.to_html(loadLogin(), view);
  response.send(html);
});

function loadLoginSuccess() {
  return fs.readFileSync('public/template/login_success.html').toString();
}

app.post('/sendcode', function(request, response){
  // CSRF check
  if (request.body.csrf_nonce === csrf_guid) {
    var app_access_token = ['AA', app_id, app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token
      //appsecret_proof: app_secret
    };
  
    // exchange tokens
    var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
    Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
      console.log(respBody);
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id,	
      };
      // get account details at /me endpoint
      var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
        // send login_success.html
        console.log(respBody);
        if (respBody.phone) {
          view.method = "SMS"
          view.identity = respBody.phone.number;
        } else if (respBody.email) {
          view.method = "Email"
          view.identity = respBody.email.address;
        }
        var html = Mustache.to_html(loadLoginSuccess(), view);
        var snsMessage = 'New signup: %EMAIL%'; //Send SNS notification containing email from form.
        snsMessage = snsMessage.replace('%EMAIL%', formData.Item.email['S']);
        sns.publish({ TopicArn: config.NEW_SIGNUP_TOPIC, Message: snsMessage }, function(err, data) {
          if (err) {
            console.log('Error publishing SNS message: ' + err);
          } else {
            console.log('SNS message sent.');
          }
        });
        response.send(html);
      });
    });
  } 
  else {
    // login failed
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("Something went wrong. :( ");
  }
});

app.listen(process.env.PORT, '0.0.0.0', function(err) {
  console.log("Started listening on %s", app.url);
});
console.log('Express server listening on port ' + app.get('port'));
