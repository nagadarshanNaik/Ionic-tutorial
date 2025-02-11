import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { LoadingState } from 'src/store/Loading/LoadingState';
import { LoginState } from 'src/store/Login/LoginState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  loadingState$!: Observable<LoadingState>;
  loginState$!: Observable<LoginState>;

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }
}
