import { Action } from '@ngrx/store';

import { PersistentAppStateData } from '../app.store';

export class LoadStateAction implements Action {
  static type = 't2forum.local-storage.loadFromLocalStorage';
  type = LoadStateAction.type;
  constructor(public payload: {stateData: any}) {}
}
