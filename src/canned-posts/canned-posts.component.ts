import { Component, ElementRef, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

import { Canned } from './canned-posts.model';
import { CannedPostsService } from './canned-posts.service';
import { DialogService } from '../dialog/dialog.service';
import { getCurrentPageType, PageType } from '../common/forum-utils';

@Component({
  selector: 'canned-posts',
  template: require('./canned-posts.component.html'),
  styles: [require('./canned-posts.component.scss')],
})
export class CannedPostsComponent implements OnInit {
  hovering: boolean = false;
  relevant$: Observable<boolean>;
  hidden = true;

  posts$: Observable<Canned[]>;
  selectedPostId$: Observable<string>;
  selectedPost$: Observable<Canned>;

  selectedPostId: string;

  constructor(
    private myElement: ElementRef,
    @Inject('jquery') private $: JQueryStatic,
    private dialogService: DialogService,
    private cannedPostsService: CannedPostsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.$(this.myElement.nativeElement).find('li#canned-posts').detach().appendTo(
      $('div#bbcodeFeatures ul').first()
    );

    this.relevant$ = getCurrentPageType(this.router.routerState)
    .map(pageType =>
      [PageType.ThreadReplyView, PageType.NewThreadView].indexOf(pageType) > -1
    );

    this.posts$ = this.cannedPostsService.getCannedPostsMap().map(map => map.toArray());
    this.selectedPostId$ = this.cannedPostsService.getSelectedPostId();
    this.selectedPostId$.subscribe(id => this.selectedPostId = id);
    this.selectedPost$ = this.selectedPostId$.flatMap(id => this.cannedPostsService.getCannedPostById(id));
  }

  openCannedModal() {
    this.dialogService.openDialog(this.myElement, 'Canned Text', {
      'Close': () => this.dialogService.destroyDialog(),
    }).subscribe(closed => this.hidden=closed);
  }

}
