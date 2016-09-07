import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { StoreRoot, PersistentAppState, PersistentAppStateData } from '../app.store';
import { T2FORUM_PREFIX } from './local-storage.constants';
import { LoadStateAction } from './local-storage.actions';

@Injectable()
export class LocalStorageEffects {
  constructor(
    private store: Store<StoreRoot>,
    private actions$: Actions,
  ) {
    window.addEventListener('storage', (ev) => {
      if (ev.key == this.stateStorageKey) {
        let stateData = JSON.parse(ev.newValue);
        this.store.dispatch(new LoadStateAction({stateData}));
      }
    })
  }

  get stateStorageKey() {
    return T2FORUM_PREFIX + '@ngrx/store++AppState'
  }

  @Effect() saveStoreToLocalStorage$ = this.actions$
  .debounceTime(100)
  .switchMap(() => this.store.take(1))
  .map(root => root.app)
  .flatMap(state => {
    let stateData: PersistentAppStateData = state.toJS();
    let serialized = JSON.stringify(stateData);
    localStorage.setItem(this.stateStorageKey, serialized);
    return Observable.of<Action>();
  });

  @Effect() loadStoreOnPageLoad$ = this.actions$.take(1)
  .map(() => localStorage.getItem(this.stateStorageKey))
  .map(data => <PersistentAppStateData>JSON.parse(data))
  .map(stateData => new LoadStateAction({stateData}));
}
