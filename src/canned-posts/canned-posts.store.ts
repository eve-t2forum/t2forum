import { Map, Record } from 'immutable';
import { ActionReducer, Store } from '@ngrx/store';
import * as UUID from 'node-uuid';

import { LoadStateAction } from '../local-storage';

import { Canned, CannedData } from './canned-posts.model';
import * as actions from './canned-posts.actions';

export interface CannedPostsStateData {
  posts: Map<string, CannedData>;
  selectedPost: string;
}

export interface CannedPostsState extends CannedPostsStateData {}
export class CannedPostsState extends Record({
  posts: Map.of(), selectedPost: null,
}) {
  posts: Map<string, Canned>;

  createPost() {
    let newPost = new Canned({
      id: UUID.v4(),
      title: 'Untitled canned post',
      text: '',
    });
    return <this>this.withMutations((self: CannedPostsState) => {
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

export const cannedPostsReducer: ActionReducer<CannedPostsState> = (state=new CannedPostsState(), action) => {
  switch(action.type) {
    case actions.CreateAndSelectCannedPostAction.type:
    state = state.createPost();
    break;

    case actions.DeleteCannedPostAction.type:
    let postId = (<actions.DeleteCannedPostAction>action).payload.cannedPostId;
    state = state.deletePost(postId);
    break;

    case actions.SetCannedPostTitleAction.type:
    let setTitlePayload = (<actions.SetCannedPostTitleAction>action).payload;
    state = state.updatePostTitle(setTitlePayload.cannedPostId, setTitlePayload.title);
    break;

    case actions.SetCannedPostTextAction.type:
    let setTextPayload = (<actions.SetCannedPostTextAction>action).payload;
    state = state.updatePostText(setTextPayload.cannedPostId, setTextPayload.text);
    break;

    case LoadStateAction.type:
    let myStateData: CannedPostsStateData = undefined
    try {
      myStateData = (<LoadStateAction>action).payload.stateData.cannedPosts;
      myStateData.posts = myStateData.posts.withMutations(posts => {
        posts.forEach((value, key) => posts.set(key, new Canned(value)));
        return posts;
      });
    } catch(e) {
      console.warn('Failed to load appState.cannedPosts; resetting to default');
    }
    state = new CannedPostsState(myStateData);
    break;
  }
  return state;
}
