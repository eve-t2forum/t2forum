import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';

import { composeCannedPostsState, getItemFromMapById } from '../app.selectors';
import { CannedPostsState } from './canned-posts.store';
import { Canned } from './canned-posts.model';

export function getSelectedCannedPostId() {
  return (state: Observable<CannedPostsState>) => state.select(s => s.selectedPost)
}

export function getCannedPostsMap() {
  return (state: Observable<CannedPostsState>) => state.select(s => s.posts)
}

export function composeCannedPostsMap() {
  return compose(
    getCannedPostsMap(),
    composeCannedPostsState(),
  )
}

export function composeSelectedCannedPostId() {
  return compose(
    getSelectedCannedPostId(),
    composeCannedPostsState()
  )
}

export function composeCannedPostById(id: string) {
  return compose(
    getItemFromMapById<Canned>(id),
    getCannedPostsMap(),
    composeCannedPostsState(),
  )
}
