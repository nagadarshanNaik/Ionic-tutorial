import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from './Loading/loading.reducer';
import { loginReducer } from './Login/Login.reducer';

export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', loginReducer),
];
