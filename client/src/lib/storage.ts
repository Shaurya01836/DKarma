import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadResult
} from 'firebase/storage';
import { storage } from './firebase';

export class StorageService {
  // Upload a file
  static async uploadFile(
    file: File,
    path: string,
    metadata?: any
  ): Promise<UploadResult> {
    try {
      const storageRef = ref(storage, path);
      return await uploadBytes(storageRef, file, metadata);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Get download URL for a file
  static async getDownloadUrl(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error getting download URL:', error);
      throw error;
    }
  }

  // Delete a file
  static async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // List all files in a directory
  static async listFiles(path: string): Promise<string[]> {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      return result.items.map(item => item.fullPath);
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  // Upload image with automatic path generation
  static async uploadImage(
    file: File,
    userId: string,
    folder: string = 'images'
  ): Promise<{ url: string; path: string }> {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const path = `${folder}/${userId}/${fileName}`;
      
      const uploadResult = await this.uploadFile(file, path);
      const url = await this.getDownloadUrl(path);
      
      return { url, path };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Upload profile picture
  static async uploadProfilePicture(
    file: File,
    userId: string
  ): Promise<{ url: string; path: string }> {
    try {
      const timestamp = Date.now();
      const fileName = `profile_${timestamp}.jpg`;
      const path = `profiles/${userId}/${fileName}`;
      
      const uploadResult = await this.uploadFile(file, path);
      const url = await this.getDownloadUrl(path);
      
      return { url, path };
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }
}
