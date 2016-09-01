import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HideLockedService } from './hide-locked.service';

@Component({
  selector: 'hide-locked',
  template: `<!--placeholder-->`,
})
export class HideLockedComponent implements OnInit {
  hide$: Observable<boolean>;
  lockCheckBox: JQuery;

  constructor(
    private hideLockedService: HideLockedService,
    @Inject('jquery') private $: JQueryStatic
  ) {}

  injectHideToggle() {
    let headerContainer = this.$('#yafheader td').first();

    this.lockCheckBox = $('<input/>', {
      id: 'hideLocked',
      type: 'checkbox',
    });

    let elements = [
      this.lockCheckBox,
      $('<label>', {
        text: 'Hide locked posts',
        'for': 'hideLocked',
      }),
    ];

    headerContainer.prepend(elements);
    this.lockCheckBox.click((ev) => {
      let checked = (<HTMLInputElement>ev.currentTarget).checked;
      this.hideLockedService.setChecked(checked);
    });
  }

  ngOnInit() {
    this.injectHideToggle();
    console.log(this.lockCheckBox);
    this.hide$ = this.hideLockedService.getHideLocked();
    this.hide$.subscribe(hide => {
      console.log('hide updated', hide);
      this.lockCheckBox.attr('checked', hide ? 'checked' : null);
      let lockedRows = this.$('table.content.topics a.locked, table.content.topics a.topic_new_locked').parents('tr');
      console.log(lockedRows);
      if (hide) {
        lockedRows.hide();
      } else {
        lockedRows.show();
      }
    });
  }
}
