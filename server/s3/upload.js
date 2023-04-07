import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getExtensionFromMimeType } from "../helpers/index.js";

const region = "eu-central-1";
const FIVE_MB = 5 * 1024 * 1024; // 5 MB in bytes

/*
File {
    fieldName: 'picture',
    originalname: 'pcitureName.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg'
    buffer: BUFFER
}
*/
export const uploadUserImage = async (userId, file) => {
  const { mimetype, buffer } = file;

  const extension = getExtensionFromMimeType(mimetype);

  const key = `userImages/${userId}.${extension}`;

  const { Key: s3Key } = await upload(buffer, key);

  return s3Key;
};

export const upload = async (buffer, key) => {
  const s3Client = new S3Client({ region });
  const bucketName = "socialite-images";

  let uploadId;

  try {
    const multipartUpload = await s3Client.send(
      new CreateMultipartUploadCommand({
        Bucket: bucketName,
        Key: key,
      })
    );

    uploadId = multipartUpload.UploadId;

    const uploadPromises = [];
    // Multipart uploads require a minimum size of 5 MB per part.
    const partSize = Math.max(Math.ceil(buffer.length / 5), FIVE_MB);
    // number of parts
    const partNum = Math.ceil(buffer.length / partSize);

    // Upload each part.
    for (let i = 0; i < partNum; i++) {
      const start = i * partSize;
      const end = start + partSize;
      uploadPromises.push(
        s3Client
          .send(
            new UploadPartCommand({
              Bucket: bucketName,
              Key: key,
              UploadId: uploadId,
              Body: buffer.subarray(start, end),
              PartNumber: i + 1,
            })
          )
          .then((d) => {
            console.log("Part", i + 1, "uploaded");
            return d;
          })
      );
    }

    const uploadResults = await Promise.all(uploadPromises);

    return await s3Client.send(
      new CompleteMultipartUploadCommand({
        Bucket: bucketName,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: uploadResults.map(({ ETag }, i) => ({
            ETag,
            PartNumber: i + 1,
          })),
        },
      })
    );

    // Verify the output by downloading the file from the Amazon Simple Storage Service (Amazon S3) console.
    // Because the output is a 25 MB string, text editors might struggle to open the file.
  } catch (err) {
    console.error(err);

    if (uploadId) {
      const abortCommand = new AbortMultipartUploadCommand({
        Bucket: bucketName,
        Key: key,
        UploadId: uploadId,
      });

      await s3Client.send(abortCommand);
    }
  }
};
