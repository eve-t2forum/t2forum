import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HideLockedService } from './hide-locked.service';

@Component({
  selector: 'hide-locked',
  template: require('./hide-locked.component.html'),
  styles: [require('./hide-locked.component.scss')],
})
export class HideLockedComponent implements OnInit {
  hide$: Observable<boolean>;
  lockCheckBox: JQuery;

  constructor(
    private hideLockedService: HideLockedService,
    private myElement: ElementRef,
    @Inject('jquery') private $: JQueryStatic
  ) {}

  toggle(event: Event) {
    let checked: boolean = (<any>event.target).checked;
    this.hideLockedService.setChecked(checked);
  }


  ngOnInit() {
    this.$(this.myElement.nativeElement).detach().prependTo(
      $('#yafheader td').first()
    );

    this.hide$ = this.hideLockedService.getHideLocked();
    this.hide$.subscribe(hide => {
      console.log('hide updated', hide);
      let lockedRows = this.$('table.content.topics a.locked, table.content.topics a.topic_new_locked').parents('tr');
      if (hide) {
        lockedRows.hide();
      } else {
        lockedRows.show();
      }
    });
  }
}
