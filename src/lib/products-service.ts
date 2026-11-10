
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Product } from './types';
import { uploadToCloudinary } from '@/app/actions/upload-actions';

const PRODUCTS_COLLECTION = 'products';

export async function getProducts(): Promise<Product[]> {
  const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getProduct(id: string): Promise<Product | null> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  } else {
    return null;
  }
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
  return docRef.id;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, product);
}

export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Uploads an image file by converting it to base64 and sending it to the Cloudinary Server Action.
 */
export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        const url = await uploadToCloudinary(base64Data);
        resolve(url);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
