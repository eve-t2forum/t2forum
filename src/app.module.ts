import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent, DummyComponent } from './app.component';
import { ROOT_REDUCERS } from './app.store';

import { DialogService } from './dialog/dialog.service';

import { HideLockedComponent, HideLockedService } from './hide-locked';
import {
  DECLARATIONS as CANNED_DECLARATIONS,
  PROVIDERS as CANNED_PROVIDERS
} from './canned-posts';
import {
  PROVIDERS as RULES_PROVIDERS,
} from './rules';
import {
  DECLARATIONS as RULE_QUOTE_DECLARATIONS,
} from './rule-quote';

import { LocalStorageEffects } from './local-storage';

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot([{path: '**', component: DummyComponent}]),
      StoreModule.provideStore(ROOT_REDUCERS),
      EffectsModule.run(LocalStorageEffects),
    ],
    declarations: [
      AppComponent, DummyComponent,
      HideLockedComponent,
      ...CANNED_DECLARATIONS,
      ...RULE_QUOTE_DECLARATIONS,
    ],
    providers: [
      {provide: 'jquery', useValue: jQuery},
      {provide: APP_BASE_HREF, useValue: '/'},
      HideLockedService,
      DialogService,
      CANNED_PROVIDERS,
      RULES_PROVIDERS,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
