import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { User } from 'src/app/Model/user/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.auth
        .sendPasswordResetEmail(email)
        .then((res) => {
          console.log(res);
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.log(error);
          observer.next(error);
          observer.complete();
        });
      // setTimeout(() => {
      //   if (email === 'error@email.com') {
      //     observer.error({ message: 'Email not found' });
      //   }
      //   observer.next();
      //   observer.complete();
      // }, 2000);
    });
  }
  login(email: string, password: string): Observable<User> {
    return new Observable<User>((observer) => {

      this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() =>{
        this.auth.signInWithEmailAndPassword(email,password).then((firebaseUser: firebase.default.auth.UserCredential)=>{
          const id = firebaseUser.user?.uid || '';
          observer.next({email, id});
          observer.complete();
        }).catch(error => {
          observer.next(error);
          observer.complete();
        })
      })
      // setTimeout(() => {
      //   if (email === 'error@email.com') {
      //     observer.error({ message: 'user not dound' });
      //     observer.next();
      //   } else {
      //     const user = new User();
      //     user.email = email;
      //     user.id = 'userId';
      //     observer.next(user);
      //   }
      //   observer.complete();
      // }, 2000);
    });
  }
}
