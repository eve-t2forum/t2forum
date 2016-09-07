import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { StoreRoot } from '../app.store';
import * as actions from './canned-posts.actions';
import * as selectors from './canned-posts.selectors';

@Injectable()
export class CannedPostsService {
  constructor(private store: Store<StoreRoot>) {}

  getCannedPostsMap() {
    return this.store.let(selectors.composeCannedPostsMap());
  }

  getSelectedPostId() {
    return this.store.let(selectors.composeSelectedCannedPostId());
  }

  getCannedPostById(id: string) {
    return this.store.let(selectors.composeCannedPostById(id));
  }

  createCannedPost() {
    this.store.dispatch(new actions.CreateAndSelectCannedPostAction());
  }

  selectCannedPost(id: string) {
    this.store.dispatch(new actions.SelectCannedPostAction({cannedPostId: id}));
  }

  setPostTitle(id: string, title: string) {
    this.store.dispatch(new actions.SetCannedPostTitleAction({cannedPostId: id, title}));
  }

  setPostText(id: string, text: string) {
    this.store.dispatch(new actions.SetCannedPostTextAction({cannedPostId: id, text}));
  }

  deletePost(id: string) {
    this.store.dispatch(new actions.DeleteCannedPostAction({cannedPostId: id}));
  }
}
