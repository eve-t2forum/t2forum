import { compose } from '@ngrx/core/compose';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.store';

export function getHideLockedState() {
  return (state: Observable<AppState>) => state.select(s => {console.log(s); return s.hideLocked});
}
