import { compose } from '@ngrx/core/compose';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

import { PersistentAppState, StoreRoot } from './app.store';

export function getItemsFromMapById<T>(ids: string[]) {
  return (state: Observable<Map<string,T>>) => state.select(s => ids.map(
    id => s.get(id)
  ));
}

export function getHideLockedState() {
  return (state: Observable<PersistentAppState>) => state.select(s => s.hideLocked);
}

export function getCannedPostsState() {
  return (state: Observable<PersistentAppState>) => state.select(s => s.cannedPosts);
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

export function composeCannedPostsState() {
  return compose(
    getCannedPostsState(),
    getPersistentAppState()
  )
}
