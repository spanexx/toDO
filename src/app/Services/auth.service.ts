import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor
  (private afAuth: AngularFireAuth,
    private http: HttpClient
  ) { }

  


  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    const data = { email, password, returnSecureToken: true };
    return this.http
    .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAg9m4aDi30zsSKCQr91sFcsKgxAVucR1I',
      data
    )
  }

  logout() {
    return this.afAuth.signOut();
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
