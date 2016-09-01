import { compose } from '@ngrx/core/compose';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { PersistentAppState, StoreRoot } from './app.store';

export function getHideLockedState() {
  return (state: Observable<PersistentAppState>) => state.select(s => {console.log(s); return s.hideLocked});
}

export function getPersistentAppState() {
  return (state: Observable<StoreRoot>) => state.select(s => s.app);
}

export function composeHideLockedState() {
  return compose(
    getHideLockedState(),
    getPersistentAppState()
  )
}
