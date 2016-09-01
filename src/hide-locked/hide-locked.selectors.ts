import { compose } from '@ngrx/core/compose';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { getHideLockedState } from '../app.selectors';
import { HideLockedState } from './hide-locked.store';

export function getHideLocked() {
  return (state: Observable<HideLockedState>) => state.select(s => s ? s.hideLocked: false);
}

export function composeHideLocked() {
  return compose(
    getHideLocked(),
    getHideLockedState()
  );
}
