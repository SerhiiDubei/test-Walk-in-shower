(function () {
  'use strict';

  var COOKIE_NAME = 'cookie_consent';
  var COOKIE_DAYS = 365;

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + d.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
  }

  function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function initCookieBanner() {
    var banner = document.getElementById('cookies_alert');
    var okBtn = document.getElementById('cookie-ok');

    if (!banner || !okBtn) return;

    if (getCookie(COOKIE_NAME) === 'accepted') {
      if (banner) banner.classList.add('hidden');
      return;
    }

    okBtn.addEventListener('click', function () {
      setCookie(COOKIE_NAME, 'accepted', COOKIE_DAYS);
      if (banner) banner.classList.add('hidden');
    });
  }

  function disableAllLinks() {
    var links = document.querySelectorAll('a.outboundLink, a.LeadCreating, .button-red-container a');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });
  }

  function init() {
    initCookieBanner();
    disableAllLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
