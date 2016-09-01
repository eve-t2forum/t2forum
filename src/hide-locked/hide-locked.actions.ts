import { Action } from '@ngrx/store';

export class ToggleHideLockedAction implements Action {
  static type = 't2forum.hide-locked.toggle';
  type = ToggleHideLockedAction.type;
  constructor(public payload: {hide: boolean}) {}
}
