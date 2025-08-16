
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import type { Product } from './types';

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

export async function uploadImage(file: File): Promise<string> {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  const metadata = { contentType: file.type };
  await uploadBytes(storageRef, file, metadata);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}
