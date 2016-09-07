import { Component, ElementRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'canned-posts',
  template: require('./canned-posts.component.html'),
  styles: [require('./canned-posts.component.scss')],
})
export class CannedPostsComponent implements OnInit {
  hovering: boolean = false;

  constructor(
    private myElement: ElementRef,
    @Inject('jquery') private $: JQueryStatic,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.$(this.myElement.nativeElement).find('li#canned-posts').detach().appendTo(
      $('div#bbcodeFeatures ul').first()
    );
  }

  openCannedModal() {
    this.dialogService.openDialog(this.myElement, 'Canned Text', {
      'Close': () => this.dialogService.destroyDialog(),
    });
  }

}
