import { Map, Record } from 'immutable';
import { ActionReducer, Store } from '@ngrx/store';
import * as UUID from 'node-uuid';

import { LoadStateAction } from '../local-storage';

import { Canned } from './canned-posts.model';

export interface CannedPosts {
  posts: Map<string, Canned>;
  selectedPost: string;
}
export class CannedPosts extends Record({
  posts: Map.of(),
}) {
  createPost() {
    let newPost = new Canned({
      id: UUID.v4(),
      title: 'Untitled canned post',
      text: '',
    });
    return <this>this.withMutations((self: CannedPosts) => {
      self.update('posts', (posts: Map<string, Canned>) => posts.set(newPost.id, newPost));
      self.set('selectedPost', newPost.id);
    })
  }

  deletePost(id: string) {
    return <this>this.update('posts', (posts: Map<string, Canned>) => posts.remove(id));
  }

  updatePostTitle(id: string, title: string) {
    return <this>this.updateIn(['posts', id], (c: Canned) =>
      c.set('title', title)
    );
  }

  updatePostText(id: string, text: string) {
    return <this>this.updateIn(['posts', id], (c: Canned) =>
      c.set('text', text)
    );
  }


}
