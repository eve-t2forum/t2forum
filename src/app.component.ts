import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 't2forum',
    template: `
    <router-outlet></router-outlet>
    <canned-posts></canned-posts>
    <hide-locked></hide-locked>
    <rule-quote></rule-quote>
    `,
})
export class AppComponent {}

@Component({
  selector: 'dummy',
  template: `<!-- for the angular router to be happy -->`,
})
export class DummyComponent {}
