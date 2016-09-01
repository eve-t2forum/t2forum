import { Record } from 'immutable';
import { ActionReducer, Store } from '@ngrx/store';

import { ToggleHideLockedAction } from './hide-locked.actions';

export interface HideLockedState {
  hideLocked: boolean;
}

export class HideLockedState extends Record({
  hideLocked: false,
}) {
  setHide(hide: boolean) {
    return <this>this.set('hideLocked', hide);
  }
}

export const hideLockedReducer: ActionReducer<HideLockedState> = (state=new HideLockedState(), action) => {
  console.log('reduce', state, action);
  switch(action.type) {
    case ToggleHideLockedAction.type:
    let hide = (<ToggleHideLockedAction>action).payload.hide;
    state = state.setHide(hide);
    break;
  }
  console.log('result', state);
  return state;
}
