import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { REDUCERS } from './app.store';

import { HideLockedComponent } from './hide-locked/hide-locked.component';
import { HideLockedService } from './hide-locked/hide-locked.service';

import * as jQuery from 'jquery';
jQuery.noConflict();

@NgModule({
    imports: [BrowserModule, StoreModule.provideStore(REDUCERS)],
    declarations: [AppComponent, HideLockedComponent],
    providers: [
      {provide: 'jquery', useValue: jQuery},
      HideLockedService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
