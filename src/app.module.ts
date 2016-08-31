import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SampleModule } from './sample';
import { CommonForumModule } from './common/common-forum.module';

@NgModule({
    imports: [BrowserModule, SampleModule, CommonForumModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
