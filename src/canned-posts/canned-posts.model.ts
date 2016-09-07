import { Record } from 'immutable';

export interface CannedData {
  id: string;
  title: string;
  text: string;
}

export interface Canned extends CannedData {}
export class Canned extends Record({
  id: undefined, title: undefined, text: undefined,
}) {
  constructor(data: CannedData) {super(data)}
}
