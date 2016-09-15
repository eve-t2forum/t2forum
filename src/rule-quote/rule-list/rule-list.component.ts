import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RuleFile, Rule, RuleLocator } from '../../rules';

@Component({
  selector: 'rule-list',
  template: require('./rule-list.component.html'),
  styles: [
    require('./rule-list.component.scss'),
  ],
})
export class RuleListComponent {
  @Input() ruleFiles: {[id: string]: RuleFile};
  @Input() showOnlyLocators: RuleLocator[];
  @Input() isUserSelected: boolean;

  @Output() ruleSelected = new EventEmitter<RuleLocator>();
  @Output() ruleDeselected = new EventEmitter<RuleLocator>();

  isHidden(locator: RuleLocator) {
    if (!this.showOnlyLocators) {
      return true;
    }
    return this.showOnlyLocators.filter(
      showLoc => (locator.fileId==showLoc.fileId && locator.ruleId==showLoc.ruleId)
    ).length == 0;
  }

  logevent(x: any) {
    console.log(x);
  }
}
