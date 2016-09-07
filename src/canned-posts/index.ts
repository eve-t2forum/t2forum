export * from './canned-posts.component';
export * from './canned-posts.store';
export * from './canned-posts.model';

import { PostListingComponent } from './post-listing/post-listing.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CannedPostsComponent } from './canned-posts.component';
import { CannedPostsService } from './canned-posts.service';

export const DECLARATIONS = [CannedPostsComponent, PostListingComponent, PostDetailsComponent];
export const PROVIDERS = [CannedPostsService];
