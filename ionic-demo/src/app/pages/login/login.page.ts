import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { hide, show } from 'src/store/Loading/loading.action';
import { Observable, Subscription } from 'rxjs';
import { LoginState } from 'src/store/Login/LoginState';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
} from 'src/store/Login/Login.action';
import { AppState } from 'src/store/AppState';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  emailFocused: boolean = false;
  loginStateSubscription!: Subscription;

  constructor(
    private router: Router,
    private fromBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginStateSubscription = this.store
      .select('login')
      .subscribe((loginState) => {
        console.log(loginState);
        this.onIsRecoveringPassword(loginState);
        this.onIsRecoveredPassword(loginState);

        this.onIsLogginIn(loginState);
        this.onIsLoggedIn(loginState);
        this.onError(loginState);  // for both recover password error and login error
        this.toggleLoader(loginState); //to handle loader show and hide
      });
  }
  ngOnDestroy(): void {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }
  onIsRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      // this.store.dispatch(show());

      this.authService
        .recoverEmailPassword(this.loginForm.get('email')?.value)
        .subscribe(
          (value) => {
            console.log(value);

            this.store.dispatch(recoverPasswordSuccess());
          },
          (error) => {
            this.store.dispatch(recoverPasswordFail({ error }));
          }
        );
    }
  }
  async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      // this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        color: 'primary',
        position: 'bottom',
        message: 'Recovery email sent',
      });
      toaster.present();
    }
  }

  onIsLogginIn(loginState: LoginState) {
    if (loginState.isLoggingIn) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(email, password).subscribe(
        (user) => {
          this.store.dispatch(loginSuccess({ user }));
        },
        (error) => {
          this.store.dispatch(loginFail({ error }));
        }
      );
    }
  }
  onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  async onError(loginState: LoginState) {
    if (loginState.error) {
      const toaster = await this.toastController.create({
        color: 'danzer',
        position: 'bottom',
        message: loginState.error,
      });
      toaster.present();
    }
  }

  onLogin() {
    this.store.dispatch(login());
  }
  onRegister() {
    this.router.navigate(['register']);
  }
  markEmailAsTouched() {
    this.loginForm.get('email')?.markAsTouched();
  }
  onForgotEmailPass() {
    this.store.dispatch(recoverPassword());
  }

  toggleLoader(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }
}

// this.loginForm= new LoginPageForm(this.fromBuilder).createForm();
