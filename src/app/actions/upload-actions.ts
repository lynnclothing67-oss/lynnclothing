'use server';

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary server-side
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a base64 encoded image to Cloudinary.
 * @param base64Data The base64 string of the image (with data URI prefix).
 * @returns The secure URL of the uploaded image.
 */
export async function uploadToCloudinary(base64Data: string): Promise<string> {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary environment variables are missing. Please add them to your .env file.');
  }

  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: 'lynn_clothing_products',
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.message || 'Failed to upload image to Cloudinary.');
  }
}
