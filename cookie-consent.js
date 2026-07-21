(function () {
  var STORAGE_KEY = 'apex_cookie_consent';

  var alreadyAccepted;
  try {
    alreadyAccepted = localStorage.getItem(STORAGE_KEY) === 'accepted';
  } catch (e) {
    return; // localStorage unavailable (e.g. private mode) — don't block rendering
  }
  if (alreadyAccepted) return;

  function init() {
    var style = document.createElement('style');
    style.textContent = [
      '#cookie-consent-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;',
      'display:flex;flex-wrap:wrap;align-items:center;gap:12px;justify-content:space-between;',
      'max-width:720px;margin:0 auto;padding:16px 20px;border-radius:var(--radius, 6px);',
      'background:var(--text, #0b0b0c);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,0.25);',
      'font-family:var(--sans, sans-serif);font-size:14px;line-height:1.5;}',
      '#cookie-consent-banner p{margin:0;flex:1 1 320px;color:#fff;}',
      '#cookie-consent-banner a{color:var(--turquoise, #00ffef);text-decoration:underline;}',
      '#cookie-consent-accept{flex:0 0 auto;background:var(--turquoise, #00ffef);color:#0b0b0c;',
      'border:none;border-radius:var(--radius-sm, 3px);padding:10px 20px;font-weight:600;',
      'font-size:14px;cursor:pointer;font-family:inherit;}',
      '#cookie-consent-accept:hover{opacity:0.9;}',
      '@media (max-width:480px){#cookie-consent-banner{left:8px;right:8px;bottom:8px;padding:14px 16px;}}'
    ].join('');
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<p>We use cookies and similar tools to run APEX and understand how it’s used. ' +
      'By continuing, you agree to our <a href="/privacy">Privacy Policy</a> and our use of cookies.</p>' +
      '<button type="button" id="cookie-consent-accept">Accept</button>';
    document.body.appendChild(banner);

    document.getElementById('cookie-consent-accept').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
      banner.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
