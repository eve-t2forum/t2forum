import 'reflect-metadata';
import 'core-js';
import './unsafeWindow-shim';
import 'zone.js';
import 'rxjs';

import * as $ from 'jquery';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

let el = window.document.createElement('t2forum')
window.document.body.appendChild(el);

platformBrowserDynamic().bootstrapModule(AppModule);
