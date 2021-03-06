import { Record } from 'immutable';
import { ActionReducer, Store } from '@ngrx/store';

import { ToggleHideLockedAction } from './hide-locked.actions';
import { LoadStateAction } from '../local-storage';

export interface HideLockedStateData {
  hideLocked: boolean;
}
export interface HideLockedState extends HideLockedStateData {}
export class HideLockedState extends Record({
  hideLocked: false,
}) {
  setHide(hide: boolean) {
    return <this>this.set('hideLocked', hide);
  }
}

export const hideLockedReducer: ActionReducer<HideLockedState> = (state=new HideLockedState(), action) => {
  switch(action.type) {
    case ToggleHideLockedAction.type:
    let hide = (<ToggleHideLockedAction>action).payload.hide;
    state = state.setHide(hide);
    break;

    case LoadStateAction.type:
    let myStateData: any = undefined
    try {
      myStateData = (<LoadStateAction>action).payload.stateData.hideLocked;
    } catch(e) {
      console.warn('Failed to load appState.hideLocked; resetting to default');
    }
    state = new HideLockedState(myStateData);
    break;
  }
  return state;
}
