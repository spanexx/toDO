import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AuthResponse } from '../Models/AuthREsponse';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage = ''
  constructor
  (private afAuth: AngularFireAuth,
    private http: HttpClient
  ) { }

  


  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    const data = { email, password, returnSecureToken: true };
  
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAg9m4aDi30zsSKCQr91sFcsKgxAVucR1I', data
    ).pipe(
      catchError(err => {
        let errorMessage = "An unknown error occurred"
        if(!err.error || !err.error.error){
          return throwError(()=> errorMessage)
        }
        switch (err.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'Email already exists'
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Operation not allowed'
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'Too many attempts, Try again later'
        }
        return throwError(()=> errorMessage)
      })
    );
  }

  // logout() {
  //   return this.afAuth.signOut();
  // }

  // resetPassword(email: string) {
  //   return this.afAuth.sendPasswordResetEmail(email);
  // }
}
