import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';
import  * as clipboard  from 'clipboard-js';

import { Canned } from '../canned-posts.model';

@Component({
  selector: 'canned-post-details',
  template: require('./post-details.component.html'),
  styles: [
    require('./post-details.component.scss'),
  ]
})
export class PostDetailsComponent implements OnInit {
  @Input() postAsync: Observable<Canned>;
  @Output() titleChanged = new EventEmitter<string>();
  @Output() textChanged = new EventEmitter<string>();
  @Output() postDeleted = new EventEmitter<void>();

  titleChanges$: BehaviorSubject<string>;
  textChanges$: BehaviorSubject<string>;
  post: Canned;
  showCopySuccess = false;

  ngOnInit() {
    let subs: Subscription[] = [];
    this.postAsync.subscribe(post => {
      subs.forEach(sub => sub.unsubscribe());

      if (!post) {
        this.post = undefined;
        return;
      }
      if (!this.post || !post.equals(this.post)) {
        this.post = post;
      }
      if (!this.post) return;

      this.titleChanges$ = new BehaviorSubject(this.post.title);
      this.textChanges$ = new BehaviorSubject(this.post.text);

      subs.push(
        this.titleChanges$
        .filter(title => title!=this.post.title)
        .debounceTime(500)
        .subscribe(title => this.titleChanged.emit(title)),
        this.textChanges$
        .filter(text => text!=this.post.text)
        .debounceTime(500)
        .subscribe(text => this.textChanged.emit(text))
      );
    });

  }

  confirmDelete() {
    let confirmed = confirm(`Are you sure you want to delete '${this.post.title}'?`);
    if (confirmed) {
      this.postDeleted.emit()
    }
  }

  copyToClipboard() {
    clipboard.copy(this.post.text).then(
      () => Observable.of(null)
      .map(() => this.showCopySuccess = true)
      .delay(1000)
      .map(() => this.showCopySuccess = false)
      .subscribe()
    );
  }
}
