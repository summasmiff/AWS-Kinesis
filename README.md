## Basic example scripts to use the node.js AWS-SDK library to interact with Amazon Kinesis.

### What is Amazon Kinesis?
According to the <a href="http://docs.aws.amazon.com/kinesis/latest/dev/introduction.html">docs</a>, Kinesis is a way to consume large amounts of data for processing.

The main use would be to gather a great quantity of small files very frequently. A good example would be collecting sensor data from a large network of devices.

Each file sent to Kinesis can be 1MB, max. Files are kept on Kinesis as blobs, and must be base64-encoded.

Your storage on Kinesis is known as a stream, to symbolize the fast-moving nature of the data transfer. Accordingly, your data can only live in the stream for 24 hours before it is deleted.

A shard is a partition of a stream. You cannot put data directly into a stream, it must be in a shard. For these scripts, I used a single shard in my stream.

Use the `kinesis_put.js` file to put your 'Hello World' into your stream. Use the `kinesis_get.js` file to get it back out.

### Other Definitions
`sample_config.json` is a file containing most of the config field you need to use Kinesis. Always use a separate config file to hide your credentials!

region: Amazon's data centers where your data will be stored. Usually, the one closest to your actual physical location. In my examples, I am using us-east-1

apiVersion: the Kinesis api version. Should be "2013-12-02" unless you know otherwise.

accessKeyId: Your AWS account ID available by visiting Amazon IAM. **Always gitignore any files with this information!**

secretAccessKey: Also available for your account by visiting Amazon IAM. **Always gitignore any files with this information!**

endpoint: Should be "https://kinesis.us-east-1.amazonaws.com", adjusted for your region.

StreamName: The name you gave your stream when you set it up.

PartitionKey: A required field to put data on your shard. If you would like, you can use this to organize information on your shard, as you are asked for it when you are making 'GET' requests. If you do not wish to use it for this, a key of 'default_key' is fine. Partition keys can be alphanumeric and up to 128 characters.
