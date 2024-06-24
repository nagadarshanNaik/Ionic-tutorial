import { LoadingState } from "./Loading/LoadingState";
import { LoginState } from "./Login/LoginState";

export interface AppState{
  loading: LoadingState;
  login: LoginState;
}
