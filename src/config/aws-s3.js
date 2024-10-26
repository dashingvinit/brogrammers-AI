const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const {
  accessKeyId,
  secretAccessKey,
  Bucket,
} = require('../config/server-config');
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

async function getSignedFileUrl(fileName) {
  // Instantiate the GetObject command,
  // a.k.a. specific the bucket and key
  try {
    const command = new GetObjectCommand({
      Bucket: Bucket,
      Key: fileName,
    });
    // await the signed URL and return it
    const url = await getSignedUrl(s3Client, command);
    return url;
  } catch (error) {
    console.log(error);
  }
}

async function putSignedFileUrl(fileName, contentType) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      ContentType: contentType,
    });
    // await the signed URL and return it
    const url = await getSignedUrl(s3Client, command);
    return url;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getSignedFileUrl,
  putSignedFileUrl,
};
