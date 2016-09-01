import { Injectable } from '@angular/core';
import { Store, ActionReducer } from '@ngrx/store';

import { hideLockedReducer } from './hide-locked/hide-locked.store';

export interface AppState{
  hideLocked: any;
}

export const REDUCERS: {[k:string]: ActionReducer<any>} = {
  hideLocked: hideLockedReducer,
}
