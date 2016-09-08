import { Component, ElementRef, Inject, OnInit } from '@angular/core'

@Component({
  selector: 'rule-quote',
  template: require('./rule-quote.component.html'),
  styles: [
    require('../vendor/glyphicons/glyphicons.scss'),
    require('../common/styles.scss'),
  ]
})
export class RuleQuoteComponent implements OnInit {
  constructor(
    private myElement: ElementRef,
    @Inject('jquery') private $: JQueryStatic
  ) {}

  ngOnInit() {
    this.$(this.myElement.nativeElement).find('#rule-quote-trigger').detach().appendTo(
      $('div.support-nav td').first()
    );
  }

  openRuleQuoteModal() {
    alert('placeholder!');
  }
}
