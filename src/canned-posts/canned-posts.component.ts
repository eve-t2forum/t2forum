import { Component, ElementRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

import { Canned } from './canned-posts.model';
import { CannedPostsService } from './canned-posts.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'canned-posts',
  template: require('./canned-posts.component.html'),
  styles: [require('./canned-posts.component.scss')],
})
export class CannedPostsComponent implements OnInit {
  hovering: boolean = false;

  posts$: Observable<Canned[]>;
  selectedPostId$: Observable<string>;
  selectedPost$: Observable<Canned>;

  selectedPostId: string;

  constructor(
    private myElement: ElementRef,
    @Inject('jquery') private $: JQueryStatic,
    private dialogService: DialogService,
    private cannedPostsService: CannedPostsService
  ) {}

  ngOnInit() {
    this.$(this.myElement.nativeElement).find('li#canned-posts').detach().appendTo(
      $('div#bbcodeFeatures ul').first()
    );

    this.posts$ = this.cannedPostsService.getCannedPostsMap().map(map => map.toArray());
    this.selectedPostId$ = this.cannedPostsService.getSelectedPostId();
    this.selectedPostId$.subscribe(id => this.selectedPostId = id);
    this.selectedPost$ = this.selectedPostId$.flatMap(id => this.cannedPostsService.getCannedPostById(id));
  }

  openCannedModal() {
    this.dialogService.openDialog(this.myElement, 'Canned Text', {
      'Close': () => this.dialogService.destroyDialog(),
    });
  }

}
