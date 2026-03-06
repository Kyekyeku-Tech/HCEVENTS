import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

/* ===============================
   GENERIC HELPERS
================================ */

/**
 * Get all documents from a collection
 */
export const getAll = async (collectionName, options = {}) => {
  const ref = collection(db, collectionName);

  let q = ref;

  if (options.orderBy) {
    q = query(ref, orderBy(options.orderBy, options.direction || "desc"));
  }

  if (options.where) {
    q = query(
      ref,
      where(
        options.where.field,
        options.where.operator,
        options.where.value
      )
    );
  }

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Get single document by ID
 */
export const getOne = async (collectionName, id) => {
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

/**
 * Create document
 */
export const create = async (collectionName, data) => {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

/**
 * Update document
 */
export const update = async (collectionName, id, data) => {
  return updateDoc(doc(db, collectionName, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete document
 */
export const remove = async (collectionName, id) => {
  return deleteDoc(doc(db, collectionName, id));
};
