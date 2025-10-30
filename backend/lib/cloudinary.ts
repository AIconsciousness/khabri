import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File | Buffer, folder: string = 'khabri-news') => {
  try {
    let fileData: string;

    // Handle File object (from browser)
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fileData = `data:${file.type};base64,${buffer.toString('base64')}`;
    }
    // Handle Buffer (from server)
    else {
      fileData = `data:image/jpeg;base64,${file.toString('base64')}`;
    }

    const result = await cloudinary.uploader.upload(fileData, {
      folder,
      transformation: [
        { width: 1200, height: 630, crop: 'fill', gravity: 'auto' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
};

export default cloudinary;
