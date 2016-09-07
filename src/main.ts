/// <reference types="node" />
/// <reference types="jquery" />
/// <reference types="jqueryui" />
/// <reference types="node-uuid" />

import 'reflect-metadata';
import 'core-js';
import 'zone.js';
import 'rxjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

let el = window.document.createElement('t2forum')
window.document.body.appendChild(el);

platformBrowserDynamic().bootstrapModule(AppModule);
