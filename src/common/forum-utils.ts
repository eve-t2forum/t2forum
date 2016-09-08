import { RouterState } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export enum PageType {
  Unknown,
  ForumRoot,
  ForumListing,
  ThreadListing,
  ThreadView,
  ThreadReplyView,
  NewThreadView,
}

interface PageInfo {
  g: string;
  f: string;
  t: string;
  m: string;
  fragment: string;
}

export function getCurrentPageType(route: RouterState): Observable<PageType> {
  return Observable.combineLatest(route.queryParams, route.fragment)
  .map(([params, fragment]) => ({
    g: params['g'],
    f: params['f'],
    t: params['t'],
    m: params['m'],
    fragment
  }))
  .map((info: PageInfo) => {
    if (!info.g && !info.f && !info.t && !info.m) {
      return PageType.ForumRoot;
    }
    if (info.g == 'forum') {
      return PageType.ForumListing;
    }
    if (info.g == 'topics') {
      return PageType.ThreadListing;
    }
    if (info.g == 'posts') {
      return PageType.ThreadView;
    }
    if (info.g == 'postmessage') {
      if (!!info.t) {
        return PageType.ThreadReplyView;
      } else {
        return PageType.NewThreadView;
      }
    }
    return PageType.Unknown;
  })
}
