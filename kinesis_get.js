#!/usr/bin/env node

var AWS = require('aws-sdk'), config = require('./config.json');

var kinesis = new AWS.Kinesis({
  apiVersion: config.apiVersion,
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  endpoint: config.endpoint
});

var getFromKinesis = function(data) {
  kinesis.getShardIterator({
    ShardId: 'shardId-000000000000',
    ShardIteratorType: 'AT_SEQUENCE_NUMBER',
    StreamName: config.StreamName,
    StartingSequenceNumber: '49553880704106768803814316158966207923650993401794396162'
  },
  function(err, data) {
    if (err) console.log(err, err.stack);
    kinesis.getRecords({
      ShardIterator: data.ShardIterator,
      Limit: 5
    },
    function(err, data) {
      if (err) console.log(err, err.stack);
      data.Records.forEach(function (record) {
        console.log(record.Data.toString());
      });
    });
  });
};


getFromKinesis();
