import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { User } from '../Models/User';
import { Observable, catchError, from, map } from 'rxjs';
import { ErrorHandleService } from './error-handle.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor
  (private firestore: AngularFirestore, 
    private errorHandlerService: ErrorHandleService,
    private afAuth: AngularFireAuth) { }

  getAllUsers(): Observable<User[]> {
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(snapshot => snapshot.map(doc => ({
        id: doc.payload.doc.id,
         ...doc.payload.doc.data() as User
      })))
    );
  }


  getUserData(uid: string):  Observable<User | undefined> {
    return this.firestore.collection('users').doc(uid).get().pipe(
      map(taskSnapshot => taskSnapshot.exists ? taskSnapshot.data() as User : undefined),
      catchError(error => this.errorHandlerService.handleError(error)) 
    ) 
   }

  updateUserData(uid: string, data: Partial<User>) {
    return this.firestore.collection('users').doc(uid).update(data);
  }

    // Create a new user
    createUser(user: User): Observable<string> {
      user.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
      return from(this.firestore.collection('users').add(user)).pipe( 
        map(action => action.id), // Return just the ID
        catchError(error => this.errorHandlerService.handleError(error)) 
      );
    } 
    
    
  

    deleteUser(uid: string) {
      return from(this.firestore.collection('users').doc(uid).delete()); 
    }

    getCurrentUserUid(): Observable<string | null> {
      return this.afAuth.authState.pipe(
        map(authState => authState ? authState.uid : null)
      );
    }
}
