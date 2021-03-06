// ==UserScript==
// @name         T2 Forums (Local Dev)
// @version      1.0
// @description  Making Eve-O better.
// @match        http*://forums.eveonline.com/*
// @grant        unsafeWindow
// ==/UserScript==

function init() {
    console.log('Loaded developer T2 Forums from localhost');
}

var BUNDLE_URL = 'https://localhost:3333/t2forum-dev.bundle.js';

var remoteScript = document.createElement('script');
remoteScript.src = BUNDLE_URL + '?_ts=' + (+new Date());
remoteScript.onload = init;
unsafeWindow.document.body.appendChild(remoteScript);
