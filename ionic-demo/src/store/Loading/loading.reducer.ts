import { createReducer, on } from '@ngrx/store';
import { hide, show } from './loading.action';
import { LoadingState } from './LoadingState';
import { AppInitialState } from '../AppInitialState';

const initalState: LoadingState = AppInitialState.loading;
const reducer = createReducer(
  initalState,
  on(show, () => {
    return { show: true };
  }),
  on(hide, () => {
    return { show: false };
  })
);

export function loadingReducer(state: LoadingState, action:any) {
 return reducer(state, action);
}
