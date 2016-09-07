export * from './canned-posts.component';
export * from './canned-posts.store';
export * from './canned-posts.model';

import { PostListingComponent } from './post-listing/post-listing.component';
import { CannedPostsComponent } from './canned-posts.component';

export const DECLARATIONS = [CannedPostsComponent, PostListingComponent];
