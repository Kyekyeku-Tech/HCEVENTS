import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a single file to Firebase Storage
 * @param {File} file
 * @param {string} path
 * @returns {Promise<string>} download URL
 */
export const uploadFile = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

/**
 * Upload multiple files
 * @param {File[]} files
 * @param {string} folder
 * @returns {Promise<string[]>}
 */
export const uploadMultipleFiles = async (files, folder) => {
  const uploads = files.map((file) => {
    const path = `${folder}/${Date.now()}-${file.name}`;
    return uploadFile(file, path);
  });

  return Promise.all(uploads);
};

/**
 * Delete file by URL
 * (use carefully)
 */
export const deleteFileByUrl = async (url) => {
  const fileRef = ref(storage, url);
  return deleteObject(fileRef);
};
