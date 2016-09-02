import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ROOT_REDUCERS } from './app.store';

import { HideLockedComponent, HideLockedService } from './hide-locked';
import { LocalStorageEffects } from './local-storage';

@NgModule({
    imports: [
      BrowserModule,
      StoreModule.provideStore(ROOT_REDUCERS),
      EffectsModule.run(LocalStorageEffects),
    ],
    declarations: [AppComponent, HideLockedComponent],
    providers: [
      {provide: 'jquery', useValue: jQuery},
      HideLockedService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
