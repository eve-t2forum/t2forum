import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Canned } from '../canned-posts.model';

@Component({
  selector: 'post-listing',
  template: require('./post-listing.component.html'),
})
export class PostListingComponent {
  @Input() posts: Canned[];
  @Input() selectedPostId: string;
  @Output() postSelected = new EventEmitter<string>();
  @Output() postCreated = new EventEmitter<void>();
}
