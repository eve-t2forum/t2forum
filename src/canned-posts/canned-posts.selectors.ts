import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';

import { composeCannedPostsState, getItemsFromMapById } from '../app.selectors';
import { CannedPostsState } from './canned-posts.store';
import { Canned } from './canned-posts.model';

export function getSelectedCannedPostId() {
  return (state: Observable<CannedPostsState>) => state.select(s => s.selectedPost)
}

export function getCannedPostsMap() {
  return (state: Observable<CannedPostsState>) => state.select(s => s.posts)
}

export function composeCannedPostsById(ids: string[]) {
  return compose(
    getItemsFromMapById<Canned>(ids),
    getCannedPostsMap(),
    composeCannedPostsState(),
  )
}
