#!/usr/bin/env node

var AWS = require('aws-sdk'), config = require('./config.json');

var kinesis = new AWS.Kinesis({
  apiVersion: config.apiVersion,
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  endpoint: config.endpoint
});

var writeToKinesis = function(data) {
  var params = {
    Data: data,
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

writeToKinesis('hello world');
