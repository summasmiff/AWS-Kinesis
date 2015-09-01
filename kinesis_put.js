#!/usr/bin/env node

var AWS = require('aws-sdk'), config = require('./config.json');
var fs = require('fs');

var kinesis = new AWS.Kinesis({
  apiVersion: config.apiVersion,
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  endpoint: config.endpoint
});

var writeToKinesis = function(data) {
  var buffer = new Buffer(JSON.stringify(data).toString("base64"));
  var params = {
    Data: buffer,
    PartitionKey: config.PartitionKey,
    StreamName: config.StreamName
  };

  kinesis.putRecord(params, function(err, data) {
    if (err) {
      console.log('Could not put record', err);
    } else {
      console.log(data);
    }
  });
};

var file = fs.readFile('./fitbit_example.json', 'utf8', function (err, data) {
  if (err)
    return console.log(err);
  writeToKinesis(data);
});
