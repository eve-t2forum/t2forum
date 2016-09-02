// ==UserScript==
// @name         T2 Forums (Beta)
// @version      1.0
// @description  Making Eve-O better.
// @match        http*://forums.eveonline.com/*
// @grant        unsafeWindow
// ==/UserScript==


function init() {
    console.log('Loaded beta T2 Forums from S3');
}

var BUNDLE_URL = 'https://s3.amazonaws.com/t2-forum/t2forum-beta.bundle.js';

var remoteScript = document.createElement('script');
remoteScript.src = BUNDLE_URL;
remoteScript.onload = init;
unsafeWindow.document.body.appendChild(remoteScript);
