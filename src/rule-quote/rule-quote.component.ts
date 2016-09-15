import { Component, ElementRef, Inject, OnInit } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Set } from 'immutable';
import * as _ from 'lodash';
import * as clipboard  from 'clipboard-js';

import { DialogService } from '../dialog/dialog.service';
import { RulesService, RuleLocator } from '../rules';

@Component({
  selector: 'rule-quote',
  template: require('./rule-quote.component.html'),
  styles: [
    require('./rule-quote.component.scss'),
    require('../vendor/glyphicons/glyphicons.scss'),
    require('../common/styles.scss'),
  ]
})
export class RuleQuoteComponent implements OnInit {
  constructor(
    private myElement: ElementRef,
    @Inject('jquery') private $: JQueryStatic,
    private dialogService: DialogService,
    private rulesService: RulesService
  ) {  }

  ngOnInit() {
    this.$(this.myElement.nativeElement).find('#rule-quote-trigger').detach().appendTo(
      $('div.support-nav td').first()
    );
  }

  hidden = true;
  success = false;

  searchResults$: BehaviorSubject<RuleLocator[]> = new BehaviorSubject<RuleLocator[]>(null);
  selectedRules$: BehaviorSubject<Set<RuleLocator>> =
    new BehaviorSubject<Set<RuleLocator>>(Set.of<RuleLocator>());

  sortedSelectedRules$: Observable<RuleLocator[]> = this.selectedRules$
    .map(rules => rules.toArray())
    .map(rules => rules.sort((a, b) => this.rulesService.compareRules(a, b)));

  filteredSearchResults$ =
    Observable.combineLatest(this.searchResults$, this.selectedRules$)
    .map(([searchResults, selectedRules]) => ({
      searchResults: <RuleLocator[]>searchResults,
      selectedRules: <Set<RuleLocator>>selectedRules,
    }))
    .map(({searchResults, selectedRules}) => !searchResults ? null :
      searchResults.filter(resultLoc => !selectedRules.contains(resultLoc))
    );

  openRuleQuoteModal() {
   this.dialogService.openDialog(this.myElement, 'Rule Paster', {
     'Close': () => this.dialogService.destroyDialog(),
   }).subscribe(closed => this.hidden=closed);
  }

  searchReturnedResults(locators: RuleLocator[]) {
    this.searchResults$.next(locators);
  }

  ruleSelected(locator: RuleLocator) {
    this.selectedRules$.next(this.selectedRules$.value.add(locator));
  }

  ruleDeselected(locator: RuleLocator) {
    this.selectedRules$.next(this.selectedRules$.value.remove(locator));
  }

  formatToClipboard() {
    let locators = this.selectedRules$.getValue();
    let groupByFiles: {[pageId: string]: string[]} = {};
    locators.forEach(locator => {
      if (!_.has(groupByFiles, locator.fileId)) {
        groupByFiles[locator.fileId] = [];
      }
      groupByFiles[locator.fileId].push(locator.ruleId);
    });

    let chunks: string[] = [];
    let rules = this.rulesService.getRules();
    for (let fileId in groupByFiles) {
      chunks.push(`[quote=${rules[fileId].title}]\n`);
      let first = true;
      for (let ruleId of groupByFiles[fileId]) {
        if (first) {
          first = false;
        } else {
          chunks.push(`\n\n`);
        }
        let rule = rules[fileId].rules[ruleId];
        chunks.push(`[b]${ruleId}. ${rule.headline}[/b]`);
        if (!!rule.details) {
          chunks.push(`\n\n${rule.details}`);
        }
      }
      let url = rules[fileId].url;
      chunks.push(`[url=${url}]#[/url]`);
      chunks.push(`[/quote]\n`);
    }

    let finalizedText = chunks.join('');
    clipboard.copy(finalizedText).then(
      () => Observable.of(null)
      .map(() => this.success = true)
      .delay(2000)
      .map(() => this.success = false)
      .subscribe()
    );
  }
}
