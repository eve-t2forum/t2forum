import { Action } from '@ngrx/store';

export class CreateAndSelectCannedPostAction implements Action{
  static type = "t2forum.canned-posts.createSelectPost";
  type = CreateAndSelectCannedPostAction.type;
}

export class DeleteCannedPostAction implements Action {
  static type = 't2forum.canned-posts.delete';
  type = DeleteCannedPostAction.type;
  constructor(public payload: {cannedPostId: string}) {}
}

export class SetCannedPostTitleAction implements Action {
  static type = 't2forum.canned-posts.setTitle';
  type = SetCannedPostTitleAction.type;
  constructor(public payload: {cannedPostId: string, title: string}) {}
}

export class SetCannedPostTextAction implements Action {
  static type = 't2forum.canned-posts.setText';
  type = SetCannedPostTextAction.type;
  constructor(public payload: {cannedPostId: string, text: string}) {}
}
