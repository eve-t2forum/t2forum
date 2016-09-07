import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Canned } from '../canned-posts.model';

@Component({
  selector: 'canned-post-listing',
  template: require('./post-listing.component.html'),
  styles: [
    require('../../common/styles.scss'),
    require('./post-listing.component.scss'),
  ]
})
export class PostListingComponent implements OnChanges{
  @Input() posts: Canned[];
  @Input() selectedPostId: string;
  @Output() postSelected = new EventEmitter<string>();
  @Output() postCreated = new EventEmitter<void>();

  ngOnChanges() {
    this.posts = this.posts.sort((p1, p2) => p1.title.localeCompare(p2.title));
  }
}
