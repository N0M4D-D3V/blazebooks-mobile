import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getFirestore,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { FirestoreCollection } from '@enum/firestore.collection.enum';

@Injectable({ providedIn: 'root' })
export class FirestoreRepository {
  private firestore: Firestore = inject(Firestore);

  public getCollection(
    name: FirestoreCollection
  ): CollectionReference<DocumentData, DocumentData> {
    return collection(this.firestore, name);
  }

  public getCollectionData<T>(name: FirestoreCollection): Observable<T> {
    const colRef: CollectionReference<DocumentData, DocumentData> = collection(
      this.firestore,
      name
    );
    return collectionData(colRef) as Observable<T>;
  }

  public findById<T>(name: FirestoreCollection, id: string): Observable<T> {
    const docRef = doc(this.firestore, name, id);
    return of(getDoc(docRef)) as Observable<T>;
  }
}
