const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");
const { removeFile } = require("./multerHelper");
const filePath = require("path");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const handleUpload = async (file) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Body: fs.createReadStream(file.path),
      Key: `${Date.now()}${filePath.extname(file.originalname)}`,
      ACL: "public-read",
    };

    const result = await s3Client.send(new PutObjectCommand(params));
    removeFile(file.path);
    return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
  } catch (err) {
    throw new Error(err);
  }
};

const handleDelete = async (value) => {
  try {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: value[0],
    };
    const result = await s3Client.send(new DeleteObjectCommand(params));
    return true

  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = { handleUpload, handleDelete };
