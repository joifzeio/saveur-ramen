import { supabase } from './supabase';

export type StorageBucket = 'menu-images' | 'blog-images' | 'event-images';

interface UploadResult {
  url: string | null;
  error: any;
  path?: string;
}

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name
 * @param folder - Optional folder within the bucket
 * @returns Object with url and error
 */
export async function uploadImage(
  file: File,
  bucket: StorageBucket,
  folder?: string
): Promise<UploadResult> {
  try {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return {
        url: null,
        error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.',
      };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        url: null,
        error: 'File too large. Maximum size is 5MB.',
      };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        url: null,
        error: error.message || 'Failed to upload image',
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
      error: null,
      path: filePath,
    };
  } catch (error: any) {
    console.error('Unexpected upload error:', error);
    return {
      url: null,
      error: error.message || 'An unexpected error occurred',
    };
  }
}

/**
 * Delete an image from Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path in the bucket
 * @returns Object with success status and error
 */
export async function deleteImage(
  bucket: StorageBucket,
  path: string
): Promise<{ success: boolean; error: any }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete image',
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.error('Unexpected delete error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
}

/**
 * Update an image (delete old, upload new)
 * @param file - The new file to upload
 * @param bucket - The storage bucket name
 * @param oldPath - The path of the old file to delete
 * @param folder - Optional folder within the bucket
 * @returns Object with url and error
 */
export async function updateImage(
  file: File,
  bucket: StorageBucket,
  oldPath?: string,
  folder?: string
): Promise<UploadResult> {
  // Delete old image if exists
  if (oldPath) {
    await deleteImage(bucket, oldPath);
  }

  // Upload new image
  return uploadImage(file, bucket, folder);
}

/**
 * Validate image dimensions (optional)
 * @param file - The file to validate
 * @param maxWidth - Maximum width in pixels
 * @param maxHeight - Maximum height in pixels
 * @returns Promise with validation result
 */
export async function validateImageDimensions(
  file: File,
  maxWidth?: number,
  maxHeight?: number
): Promise<{ valid: boolean; width: number; height: number; error?: string }> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const { width, height } = img;

      if (maxWidth && width > maxWidth) {
        resolve({
          valid: false,
          width,
          height,
          error: `Image width (${width}px) exceeds maximum (${maxWidth}px)`,
        });
        return;
      }

      if (maxHeight && height > maxHeight) {
        resolve({
          valid: false,
          width,
          height,
          error: `Image height (${height}px) exceeds maximum (${maxHeight}px)`,
        });
        return;
      }

      resolve({ valid: true, width, height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        valid: false,
        width: 0,
        height: 0,
        error: 'Failed to load image',
      });
    };

    img.src = objectUrl;
  });
}
