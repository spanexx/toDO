import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { APi, AuthResponse } from '../Models/AuthREsponse';
import { NewUser } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage = '';
  user = new Subject<NewUser>();
  
  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) { }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    let errorMessage = "An unknown error occurred";
    if (error.error && error.error.error) {
      switch (error.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email not found';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid password';
          break;
        case 'USER_DISABLED':
          errorMessage = 'User account disabled';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'Email already exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Operation not allowed';
          break;
        case 'WEAK_PASSWORD':
          errorMessage = 'Password is too Weak';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Too many attempts, Try again later';
          break;
      }
    }
    return throwError(errorMessage);
  }

  private handleCreateUser(data: AuthResponse){
    const expiresInTs = new Date().getTime() + +data.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new NewUser(data.email, data.localId, data.idToken, expiresIn)
    this.user.next(user);
  }

  login(email: string, password: string) {
    const data = { email, password, returnSecureToken: true };

    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APi}`, data
    ).pipe(
      catchError(this.handleError),
      tap((data)=>{
        this.handleCreateUser(data);
      })
    );
  }

  signup(email: string, password: string) {
    const data = { email, password, returnSecureToken: true };

    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APi}`, data
    ).pipe(
      catchError(this.handleError),
      tap((data)=>{
        this.handleCreateUser(data);
      })
    );
  }
}
