import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../app.store';
import * as selectors from './hide-locked.selectors';
import * as actions from './hide-locked.actions';

@Injectable()
export class HideLockedService {
  constructor(private store: Store<AppState>) {}

  getHideLocked() {
    return this.store.let(selectors.composeHideLocked());
  }

  setChecked(checked: boolean) {
    return this.store.dispatch(new actions.ToggleHideLockedAction({hide: checked}))
  }
}
