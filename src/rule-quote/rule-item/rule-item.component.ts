import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RuleFile, Rule, RuleLocator } from '../../rules';

@Component({
  selector: 'rule-item',
  template: require('./rule-item.component.html'),
  styles: [
    require('./rule-item.component.scss'),
    require('../../vendor/glyphicons/glyphicons.scss'),
    require('../../common/styles.scss'),
  ],
})
export class RuleItemComponent {
  @Input() rules: {[id: string]: RuleFile};
  @Input() locator: RuleLocator;
  @Input() isUserSelected: boolean;

  @Output() ruleSelected = new EventEmitter<RuleLocator>();
  @Output() ruleDeselected = new EventEmitter<RuleLocator>();

  get rule() {
    return this.file.rules[this.locator.ruleId];
  }

  get file() {
    return this.rules[this.locator.fileId];
  }

  logEvent(ev: any) { console.log(ev) }
}
