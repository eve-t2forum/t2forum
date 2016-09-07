import { Injectable } from '@angular/core';
import { Store, ActionReducer } from '@ngrx/store';
import { Record } from 'immutable';

import { hideLockedReducer, HideLockedState, HideLockedStateData } from './hide-locked/hide-locked.store';
import { cannedPostsReducer, CannedPostsState, CannedPostsStateData } from './canned-posts';
import { LoadStateAction } from './local-storage/local-storage.actions';


export interface PersistentAppStateData {
  hideLocked: HideLockedStateData;
  cannedPosts: CannedPostsStateData;
}
export interface PersistentAppState extends PersistentAppStateData {}
export class PersistentAppState extends Record({
  hideLocked: undefined, cannedPosts: undefined,
}) {
  hideLocked: HideLockedState;
  cannedPosts: CannedPostsState;
}

export const persistentAppStateReducer: ActionReducer<PersistentAppState> = (state=new PersistentAppState(), action) => {
  if (action.type == LoadStateAction.type) {
    let stateData = (<LoadStateAction>action).payload.stateData;
    console.log('loading state', stateData);
    state = new PersistentAppState(stateData);
  }

  state = <PersistentAppState>state.merge({
    hideLocked: hideLockedReducer(state.hideLocked, action),
    cannedPosts: cannedPostsReducer(state.cannedPosts, action),
  });

  return state;
}

// =====

export interface StoreRoot {
  app: PersistentAppState;
}

export const ROOT_REDUCERS = {
  app: persistentAppStateReducer,
}
