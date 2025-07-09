import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  DocumentData,
  WhereFilterOp,
  WithFieldValue,
  Query,
  CollectionReference,
  setDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Generic CRUD operations
export class FirestoreService {
  // Get a single document
  static async getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  // Get all documents from a collection
  static async getDocuments<T>(collectionName: string): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  // Add a new document
  static async addDocument<T extends WithFieldValue<DocumentData>>(collectionName: string, data: T): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }

  // Update a document
  static async updateDocument<T extends WithFieldValue<DocumentData>>(collectionName: string, docId: string, data: Partial<T>): Promise<void> {
    try {
      await setDoc(doc(db, collectionName, docId), data as DocumentData, { merge: true });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Delete a document
  static async deleteDocument(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // Query documents with filters
  static async queryDocuments<T>(
    collectionName: string,
    filters?: Array<{ field: string; operator: WhereFilterOp; value: unknown }>,
    orderByField?: string,
    orderDirection?: 'asc' | 'desc',
    limitCount?: number
  ): Promise<T[]> {
    try {
      let q: CollectionReference<DocumentData> | Query<DocumentData> = collection(db, collectionName);
      
      // Apply filters
      if (filters) {
        filters.forEach(filter => {
          q = query(q, where(filter.field, filter.operator, filter.value));
        });
      }
      
      // Apply ordering
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection || 'asc'));
      }
      
      // Apply limit
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  }

  // Real-time listener for a single document
  static onDocumentSnapshot<T>(
    collectionName: string,
    docId: string,
    callback: (data: T | null) => void
  ) {
    const docRef = doc(db, collectionName, docId);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as T);
      } else {
        callback(null);
      }
    });
  }

  // Real-time listener for a collection
  static onCollectionSnapshot<T>(
    collectionName: string,
    callback: (data: T[]) => void,
    filters?: Array<{ field: string; operator: WhereFilterOp; value: unknown }>,
    orderByField?: string,
    orderDirection?: 'asc' | 'desc'
  ) {
    let q: CollectionReference<DocumentData> | Query<DocumentData> = collection(db, collectionName);
    
    if (filters) {
      filters.forEach(filter => {
        q = query(q, where(filter.field, filter.operator, filter.value));
      });
    }
    
    if (orderByField) {
      q = query(q, orderBy(orderByField, orderDirection || 'asc'));
    }
    
    return onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      callback(data);
    });
  }
} 