/* H4CKSEC shared interactions */
(function () {
  'use strict';

  // Sidebar expand / collapse
  document.querySelectorAll('.nav-item.expandable').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const id = item.dataset.expand;
      const children = document.getElementById(id);
      if (!children) return;
      const open = children.classList.toggle('open');
      item.classList.toggle('expanded', open);
    });
  });

  // Mobile sidebar
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const menuToggle = document.getElementById('menuToggle');

  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
  }
  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('open');
  }
  menuToggle?.addEventListener('click', () => {
    if (sidebar?.classList.contains('open')) closeSidebar();
    else openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);

  // Search
  const searchIndex = window.H4CKSEC_SEARCH || [
    { title: 'Getting Started', path: 'Foundations / Getting Started', url: '/modules/foundations/getting-started/', keywords: 'intro start orientation' },
    { title: 'OSI Model', path: 'Networking / OSI Model', url: '/modules/foundations/networking/topics/osi-model/', keywords: 'osi layers physical data link network transport' },
    { title: 'TCP/IP Model', path: 'Networking / TCP/IP', url: '/modules/foundations/networking/topics/tcp-ip/', keywords: 'tcp ip internet protocol suite' },
    { title: 'IPv4 Addressing', path: 'Networking / IPv4', url: '/modules/foundations/networking/topics/ipv4/', keywords: 'ipv4 address classes private public' },
    { title: 'Subnetting', path: 'Networking / Subnetting', url: '/modules/foundations/networking/topics/subnetting/', keywords: 'subnet mask cidr vlsm' },
    { title: 'DNS', path: 'Networking / DNS', url: '/modules/foundations/networking/topics/dns/', keywords: 'dns domain name system resolution' },
    { title: 'DHCP', path: 'Networking / DHCP', url: '/modules/foundations/networking/topics/dhcp/', keywords: 'dhcp dora lease' },
    { title: 'HTTP & HTTPS', path: 'Networking / HTTP HTTPS', url: '/modules/foundations/networking/topics/http-https/', keywords: 'http https tls request response' },
    { title: 'Linux Fundamentals', path: 'Foundations / Linux', url: '/modules/foundations/linux/', keywords: 'linux permissions shell processes' },
    { title: 'Web Application Security', path: 'Offensive / Web Security', url: '/modules/offensive/web-security/', keywords: 'owasp injection xss csrf' },
    { title: 'Reconnaissance', path: 'Offensive / Reconnaissance', url: '/modules/offensive/reconnaissance/', keywords: 'recon osint passive active' },
    { title: 'Security Tools', path: 'References / Tools', url: '/modules/references/tools/', keywords: 'nmap burp wireshark metasploit' }
  ];

  const searchOverlay = document.getElementById('searchOverlay');
  const modalSearch = document.getElementById('modalSearch');
  const searchResults = document.getElementById('searchResults');

  function openSearch() {
    searchOverlay?.classList.add('open');
    if (modalSearch) {
      modalSearch.value = '';
      searchResults.innerHTML = '<div class="search-empty">Type to search documentation…</div>';
      setTimeout(() => modalSearch.focus(), 40);
    }
  }
  function closeSearch() {
    searchOverlay?.classList.remove('open');
  }

  document.getElementById('searchBtn')?.addEventListener('click', openSearch);
  document.getElementById('headerSearch')?.addEventListener('focus', openSearch);
  document.getElementById('heroSearch')?.addEventListener('focus', openSearch);

  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  function renderResults(q) {
    const query = q.trim().toLowerCase();
    if (!query) {
      searchResults.innerHTML = '<div class="search-empty">Type to search documentation…</div>';
      return;
    }
    const hits = searchIndex.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.path.toLowerCase().includes(query) ||
      (item.keywords || '').includes(query)
    );
    if (!hits.length) {
      searchResults.innerHTML = '<div class="search-empty">No results found</div>';
      return;
    }
    // Resolve relative URLs based on current path depth
    const depth = (location.pathname.match(/\//g) || []).length - 1;
    const prefix = depth > 1 ? '../'.repeat(depth - 1) : './';
    searchResults.innerHTML = hits.map(h => {
      let href = h.url;
      // Simple relative path handling for static hosting
      if (href.startsWith('/')) href = href.slice(1);
      return `<a class="search-result" href="${prefix}${href}index.html">
        <div class="title">${h.title}</div>
        <div class="path">${h.path}</div>
      </a>`;
    }).join('');
  }

  modalSearch?.addEventListener('input', () => renderResults(modalSearch.value));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
      closeSidebar();
    }
  });

  // Copy code buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const block = btn.closest('.code-block');
    const code = block?.querySelector('pre code')?.textContent ||
                 block?.querySelector('pre')?.textContent || '';
    navigator.clipboard.writeText(code).then(() => {
      const original = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = original;
      }, 1600);
    }).catch(() => {});
  });

  // TOC active highlighting
  const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length) {
    const headings = [];
    tocLinks.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) headings.push({ id, el, link: a });
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('active'));
          const match = headings.find(h => h.el === entry.target);
          if (match) match.link.classList.add('active');
        }
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    headings.forEach(h => observer.observe(h.el));
  }

  // Auto-expand current section in sidebar
  const path = location.pathname;
  if (path.includes('/networking/')) {
    document.getElementById('nav-networking')?.classList.add('open');
    document.querySelector('[data-expand="nav-networking"]')?.classList.add('expanded');
    document.getElementById('nav-foundations')?.classList.add('open');
    document.querySelector('[data-expand="nav-foundations"]')?.classList.add('expanded');
  }
  if (path.includes('/foundations/')) {
    document.getElementById('nav-foundations')?.classList.add('open');
    document.querySelector('[data-expand="nav-foundations"]')?.classList.add('expanded');
  }
  if (path.includes('/offensive/')) {
    document.getElementById('nav-offensive')?.classList.add('open');
    document.querySelector('[data-expand="nav-offensive"]')?.classList.add('expanded');
  }
})();
