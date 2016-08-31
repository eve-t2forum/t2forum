import { ElementRef, Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'logo-test',
  template: '<!--test-->',
})
export class LogoComponent implements OnInit {
  $logo: JQuery;
  constructor(
    private el: ElementRef,
    @Inject('$') private $: JQueryStatic,
  ) {}

  ngOnInit() {
    this.$logo = this.$('a.logo img');
    this.$logo.click((ev) => {
      console.log('logo clicked!');
      ev.preventDefault();
      ev.stopPropagation();
      return false;
    })
  }
}
