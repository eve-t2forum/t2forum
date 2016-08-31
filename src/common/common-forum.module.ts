import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  providers: [{provide: '$', useValue: jQuery}]
})
export class CommonForumModule {}
