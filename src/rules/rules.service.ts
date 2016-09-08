import { Injectable } from '@angular/core';

import { RuleFile } from './rules.model';

const RULE_FILES: {[id:string]: RuleFile} = {
  forum: require('./data/forum-rules.yaml'),
  cb: require('./data/char-bazaar.yaml'),
}

@Injectable()
export class RulesService {
  getRules() {
    return RULE_FILES;
  }
}
