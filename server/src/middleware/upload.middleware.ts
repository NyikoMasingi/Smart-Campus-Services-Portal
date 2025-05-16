import multer from 'multer';
import { PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import s3 from '../config/aws_config';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).array('images', 5);

export const uploadToS3 = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];
    const imageUrls: string[] = [];

    if (!files || files.length === 0) {
      req.body.imageUrls = [];
      return next();
    }

    for (const file of files) {
      const uniqueFileName = `tickets/${Date.now()}_${uuidv4()}_${file.originalname}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read' as ObjectCannedACL,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
      imageUrls.push(fileUrl);
    }

    req.body.imageUrls = imageUrls;
    next();
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).json({ message: 'Failed to upload images to S3' });
  }
};

export default upload;
