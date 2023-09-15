import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import sharp from "sharp";
config();

const s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.S3_BUCKET_REGION,
});
const s3Config = new S3Client({
  region: process.env.S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const upload = () =>
  multer({
    storage: multerS3({
      s3: s3Config,
      bucket: "projectimagestorage1", // Replace with your S3 bucket name
      acl: "public-read", // Set appropriate access control
      key: function (req, file, cb) {
        cb(null, "images/" + Date.now() + "-" + file.originalname); // Specify the S3 object key
      },
    }),
  });
export const uploadBase64Image = async (imageBuffer: string) => {
  try {
    console.log(imageBuffer.length / (1024 * 1024));
    const base64Image = imageBuffer.split(",")[1]; // Extract base64 part
    const imageBufferResized = Buffer.from(base64Image, "base64");
    const resizedImageBuffer = await sharp(imageBufferResized)
      .resize({ width: 300, height: 200 }) // Set the desired width and height
      .jpeg({ quality: 70 }) // Specify the JPEG compression quality (adjust as needed)
      .toBuffer();
    // console.log(
    //   imageBufferResized.length / (1024 * 1024) + "MB",
    //   imageBuffer.length / (1024 * 1024) + "MB",
    //   resizedImageBuffer.length / (1024 * 1024) + "MB"
    // );

    const objectKey = "images/my" + Date.now() + "Image.jpg";
    const bucketName = "projectimagestorage1";

    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: resizedImageBuffer,
      ContentType: "image/jpeg", // Set the appropriate content type
    };

    // Upload the image buffer to S3
    const uploadResponse = await s3.upload(params).promise();
    

    // Construct the S3 URL for the uploaded image
    const imageUrl = `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
    console.log("Image uploaded successfully");

    return uploadResponse.Location;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export default upload;
