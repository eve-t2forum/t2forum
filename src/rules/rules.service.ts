import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { RuleFile, RuleLocator } from './rules.model';

const RULE_FILES: {[id:string]: RuleFile} = {
  forum: require('./data/forum-rules.yaml'),
  cb: require('./data/char-bazaar.yaml'),
}

@Injectable()
export class RulesService {
  getRules() {
    return RULE_FILES;
  }

  compareRules(r1: RuleLocator, r2: RuleLocator) {
    if (r1.fileId < r2.fileId) return -1;
    if (r1.fileId > r2.fileId) return 1;
    if (r1.ruleId < r2.ruleId) return -1;
    if (r2.ruleId > r2.ruleId) return 1;
    return 0;
  }

  locatorIn(loc: RuleLocator, locs: RuleLocator[]) {
    console.log(loc, locs);
    for (let l of locs) {
      if (this.compareRules(loc, l) == 0) {
        console.log('yes');
        return true;
      }
    }
    console.log('no');
    return false;
  }

  private serializeLocator(loc: RuleLocator) {
    return `${loc.fileId}++${loc.ruleId}`
  }
}
