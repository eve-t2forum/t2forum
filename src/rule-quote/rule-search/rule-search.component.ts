import { Component, EventEmitter, Output } from '@angular/core'

import { RulesService, RuleFile, Rule, RuleLocator } from '../../rules';

@Component({
  selector: 'rule-search',
  template: require('./rule-search.component.html'),
  styles: [
    require('./rule-search.component.scss'),
  ]
})
export class RuleSearchComponent {
  searchCategory: string = 'all';
  searchQuery: string = '';
  ruleFiles: {[id:string]: RuleFile} = {};

  @Output() rulesFound = new EventEmitter<RuleLocator[]>();

  constructor(
    private rulesService: RulesService
  ) {
    this.ruleFiles = rulesService.getRules();
  }

  get ruleCategories() {
    let cats: {id: string, title: string}[] = [];
    for (let id in this.ruleFiles) {
      cats.push({id, title: this.ruleFiles[id].title});
    }
    return cats;
  }

  isSelected(categoryId: string) {
    return categoryId == this.searchCategory ? true : null;
  }

  searchCategoryUpdated(newCat: string) {
    this.searchCategory = newCat;
    this.search();
  }

  searchQueryUpdated(newQuery: string) {
    this.search();
  }

  search() {
    let results: RuleLocator[] = [];
    let categoryFiltered = !!this.ruleFiles[this.searchCategory];

    if (!categoryFiltered && !(this.searchQuery.trim())) {
      this.rulesFound.emit(null);
      return;
    }

    for (let fileId in this.ruleFiles) {
      if (categoryFiltered && fileId != this.searchCategory) {
        continue;
      }
      for (let ruleId in this.ruleFiles[fileId].rules) {
          let rule = this.ruleFiles[fileId].rules[ruleId]
          if (this.ruleMatches(rule)) {
            results.push({fileId, ruleId});
          }
      }
    }
    this.rulesFound.emit(results);
  }

  ruleMatches(rule: Rule) {
    let searchWords = this.searchQuery.trim().split(' ');
    searchWords = searchWords.map(word => word.toLowerCase());
    for (let word of searchWords) {
      let headlineMatch = rule.headline.toLowerCase().search(word) >= 0;
      let detailsMatch = !!rule.details ? rule.details.toLowerCase().search(word)>=0 : false;
      if (!headlineMatch && !detailsMatch){
        return false;
      }
    }
    return true;
  }
}
