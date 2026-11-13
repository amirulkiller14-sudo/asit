(() => {
  if (window.__obsidianModeratorEnhancements) return;
  window.__obsidianModeratorEnhancements = true;

  const categoryScripts = [
    ['General Inquiry', 'Thank you for contacting Obsidian Games Support. Please provide the details of your concern so our team can assist you.'],
    ['Partnership Application', 'Thank you for your interest in partnering with Obsidian Games. Please submit your proposal and the required information in this ticket so our team can review your application.'],
    ['CBT / Event Winner', 'Congratulations, and thank you for participating! Please provide the required event or CBT details in this ticket so our team can verify your eligibility.'],
    ['Tech Support', 'Thank you for reporting this technical issue. Please include a clear description of the problem, any error messages, and relevant screenshots so our team can investigate.'],
    ['Account Support', 'For your account security, please do not share passwords, verification codes, or other sensitive information. Kindly describe your account concern so our team can guide you safely.'],
    ['Clan Registration', 'Thank you for your clan registration request. Please provide your clan name, leader details, and all required registration information for review.'],
    ['Community Registration', 'Thank you for your interest in joining our community. Please provide the required registration details and make sure your information is complete.'],
    ['Streamers Application', 'Thank you for your interest in becoming an Obsidian Games streamer. Please provide your channel links, content details, and the required application information for review.']
  ];

  const generalScripts = [
    ['Wrong ticket category', 'Please submit your concern under the correct ticket category so it can be directed to the appropriate team. If you selected the wrong category, kindly close this ticket and create a new one using the correct category.'],
    ['No concern / unresponsive', 'No concern was raised by the author, or the author did not respond. This ticket will now be closed. You may open a new ticket if you still need assistance.'],
    ['Concern addressed', 'Your concern has already been addressed. If you have any other questions or need further assistance, please feel free to submit a new ticket.'],
    ['PH Chat – Discord code warning (1-day TO)', 'Reminder: Sharing Discord codes in PH Chat is prohibited. Anyone who sends or shares their Discord code in PH Chat will receive a 1-day timeout (TO). Please keep your account information private.']
  ];

  const style = document.createElement('style');
  style.textContent = `
    #og-moderator-quick-scripts{margin-top:18px;padding:16px;border:1px solid var(--border-color, #343434);border-radius:14px;background:var(--card-background, rgba(255,255,255,.015));color:inherit;font:inherit}
    #og-moderator-quick-scripts .og-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
    #og-moderator-quick-scripts .og-title{font-size:15px;font-weight:600;color:inherit}
    #og-moderator-quick-scripts .og-subtitle{font-size:12px;opacity:.65;margin:3px 0 12px}
    #og-moderator-quick-scripts .og-group-title{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;opacity:.72;margin:14px 0 8px}
    #og-moderator-quick-scripts .og-chips{display:flex;flex-wrap:wrap;gap:8px}
    #og-moderator-quick-scripts button{font:inherit;font-size:12px;color:inherit;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:7px 12px;cursor:pointer;transition:background .15s,border-color .15s}
    #og-moderator-quick-scripts button:hover{background:rgba(255,255,255,.11);border-color:rgba(255,255,255,.3)}
    #og-moderator-quick-scripts .og-toggle{font-size:12px;padding:6px 11px}
    #og-moderator-quick-scripts .og-status{font-size:11px;opacity:.7;min-height:15px;margin-top:10px}
    #og-moderator-quick-scripts[hidden]{display:none}
  `;
  document.documentElement.appendChild(style);

  function findMount() {
    const heading = [...document.querySelectorAll('h1,h2,h3,h4,div,span')]
      .find(el => el.children.length < 3 && (el.textContent || '').trim() === 'File a report');
    if (heading) {
      let node = heading;
      for (let i = 0; i < 6 && node.parentElement; i++, node = node.parentElement) {
        if (node.querySelector && node.querySelector('textarea') && node.querySelector('input')) return node;
      }
    }
    const textarea = [...document.querySelectorAll('textarea')].find(el => /purpose|closing/i.test((el.parentElement?.textContent || '') + ' ' + (el.getAttribute('placeholder') || '')));
    return textarea?.closest('form') || textarea?.parentElement?.parentElement?.parentElement || document.querySelector('main') || document.body;
  }

  function copyText(value, status) {
    const done = () => { status.textContent = 'Copied to clipboard.'; };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(() => fallbackCopy(value, status));
    } else fallbackCopy(value, status);
  }
  function fallbackCopy(value, status) {
    const area = document.createElement('textarea');
    area.value = value; area.style.position = 'fixed'; area.style.opacity = '0';
    document.body.appendChild(area); area.select();
    try { document.execCommand('copy'); status.textContent = 'Copied to clipboard.'; }
    catch { status.textContent = 'Copy unavailable in this browser.'; }
    area.remove();
  }

  function addPanel() {
    if (document.getElementById('og-moderator-quick-scripts')) return;
    const mount = findMount();
    if (!mount || !document.body.contains(mount)) return;

    const panel = document.createElement('section');
    panel.id = 'og-moderator-quick-scripts';
    panel.innerHTML = `<div class="og-head"><div class="og-title">Moderator Quick Scripts</div><button class="og-toggle" type="button" aria-expanded="true">Hide scripts</button></div><div class="og-content"><div class="og-subtitle">Click any suggestion to copy its ready-to-send message.</div><div class="og-group-title">Ticket category scripts</div><div class="og-chips" data-group="categories"></div><div class="og-group-title">Moderation & closing scripts</div><div class="og-chips" data-group="general"></div><div class="og-status" aria-live="polite"></div></div>`;

    const status = panel.querySelector('.og-status');
    const addButtons = (items, selector) => {
      const container = panel.querySelector(selector);
      items.forEach(([label, message]) => {
        const button = document.createElement('button');
        button.type = 'button'; button.textContent = label; button.title = 'Copy script';
        button.addEventListener('click', () => copyText(message, status));
        container.appendChild(button);
      });
    };
    addButtons(categoryScripts, '[data-group="categories"]');
    addButtons(generalScripts, '[data-group="general"]');
    panel.querySelector('.og-toggle').addEventListener('click', event => {
      const content = panel.querySelector('.og-content');
      const willHide = !content.hidden;
      content.hidden = willHide;
      event.currentTarget.textContent = willHide ? 'Show scripts' : 'Hide scripts';
      event.currentTarget.setAttribute('aria-expanded', String(!willHide));
    });
    mount.appendChild(panel);
  }

  const start = () => { addPanel(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
  new MutationObserver(() => addPanel()).observe(document.documentElement, { childList: true, subtree: true });
})();
