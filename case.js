(() => {
  const projects = [
    { id:'beexpay', title:'BeeXpay', summary:'Crypto banking: cards, crypto assets, payments and eSIM', category:'PRODUCT DESIGN · FINTECH', image:'./assets/cases/beexpay-case-01.png', alt:'BeeXpay landing page — crypto banking, cards, payments and eSIM' },
    { id:'eva-dex', title:'EVADEX', summary:'Web3 platform for DEX trading', category:'WEB3 · DEX TRADING', image:'./assets/cases/evadex-case-01.png', alt:'EVADEX multi-chain DEX trading platform homepage and dashboard' },
    { id:'superearn', title:'SuperEarn App', summary:'Non-custodial, multichain, portal to decentralized finance and SUPER app.', category:'MULTICHAIN APP', image:'./assets/cases/superearn-project-01.png', alt:'SuperEarn wallet onboarding and portfolio screens' },
    { id:'deepden', title:'DeepDen', summary:'Chat, call and create with any AI girlfriend', category:'WEB SERVICES', image:'./assets/cases/deepden-03.jpg', alt:'DeepDen AI companion platform' },
    { id:'crocobit', title:'CrocoBit', summary:'Crypto-trading GameFi platform', category:'GAMEFI PLATFORM', image:'./assets/cases/crocobit-01.png', alt:'CrocoBit crypto trading GameFi website' },
    { id:'artbot', title:'ArtBot', summary:'AI LegalTech platform for legal and migration support', category:'AI · LEGALTECH', image:'./assets/cases/artbot-case-01.png', alt:'ArtBot AI LegalTech platform homepage and assistant interface' }
  ];
  const projectId = new URLSearchParams(location.search).get('project');
  const index = projects.findIndex((project) => project.id === projectId);
  const project = projects[index];
  const content = document.querySelector('#case-content');
  // Temporary UI figures per user request. Replace with verified project analytics when available.
  const projectFactData = {
    'eva-dex': { scope:'DEX product experience, trading dashboards and multi-chain workflows', status:'Product design case', timeline:'1 month', outcome:'A unified workspace for token discovery, market analysis, portfolio tracking and trade automation.', metrics:[['+21%','reach growth'],['+14%','engagement growth'],['+11%','conversion growth']] },
    'superearn': { scope:'Non-custodial DeFi app and responsive product website', status:'Live product link · design case', timeline:'2 months', outcome:'A connected journey across yield discovery, staking, swaps, bridges and portfolio management.', metrics:[['+16%','reach growth'],['+13%','engagement growth'],['+8%','activation growth']] },
    deepden: { scope:'AI companion web experience and conversational interface', status:'Design case', timeline:'8 weeks', outcome:'A concept for bringing AI chat, calls and creative interaction into one experience.', metrics:[['+19%','reach growth'],['+11%','engagement growth'],['+10%','conversion growth']] },
    crocobit: { scope:'GameFi platform, NFT collection and token-based features', status:'Live website · GameFi design case', timeline:'3 months', outcome:'A connected product concept linking NFT collecting, racing gameplay and token rewards.', metrics:[['+23%','reach growth'],['+15%','engagement growth'],['+12%','conversion growth']] },
    artbot: { scope:'AI LegalTech MVP, assistant chat and specialist handoff flows', status:'MVP design concept', timeline:'2 months', outcome:'A clear service flow from AI guidance and document preparation to specialist support.', metrics:[['+17%','reach growth'],['+12%','engagement growth'],['+9%','conversion growth']] },
    beexpay: { metrics:[['+18%','reach growth'],['+12%','engagement growth'],['+9%','activation growth']] }
  };
  const metricsMarkup = (metrics) => metrics.map(([value, label]) => `<span><strong>${value}</strong><small>${label}</small></span>`).join('');
  const createProjectFacts = ({scope, status, timeline, outcome, metrics}) => {
    const section = document.createElement('section');
    section.className = 'project-facts reveal-on-scroll';
    section.setAttribute('aria-label', 'Role and project facts');
    section.innerHTML = `<div class="project-facts-heading"><p class="case-eyebrow">MY ROLE & PROJECT FACTS</p><h2>From product thinking to a connected experience.</h2></div><dl class="project-fact-list"><div><dt>My role</dt><dd>Product & UX/UI design</dd></div><div><dt>Scope</dt><dd>${scope}</dd></div><div><dt>Timeline</dt><dd>${timeline}</dd></div><div><dt>Project status</dt><dd>${status}</dd></div><div class="project-fact-wide"><dt>Design outcome</dt><dd>${outcome}</dd></div><div class="project-fact-wide"><dt>Launch results</dt><dd class="project-metric-list">${metricsMarkup(metrics)}</dd></div></dl>`;
    return section;
  };
  if (!project) {
    document.title = 'Project not found — Dmitry Dovgal';
    content.innerHTML = '<a class="case-back" href="./index.html?skipPreloader=1#top">← All projects</a><section class="case-intro"><p class="case-eyebrow">PROJECT NOT FOUND</p><h1>This project isn’t available.</h1><p class="case-summary">Choose another project from the selected work collection.</p></section>';
  } else {
    document.title = `${project.title} — Dmitry Dovgal`;
    document.body.classList.add(`theme-${project.id}`);
      if (project.id === 'beexpay') document.querySelector('meta[name="description"]').content = 'BeeXpay crypto banking case: digital assets, payment cards, eSIM and a unified mobile product experience.';
    const cover = document.querySelector('.case-cover');
    cover.classList.add(`case-cover--${project.id}`);
    document.querySelector('#case-category').textContent = project.category;
    document.querySelector('#case-title').textContent = project.title;
    document.querySelector('#case-summary').textContent = project.summary;
    document.querySelector('#case-image').src = project.image;
    document.querySelector('#case-image').alt = project.alt;
    if (project.id === 'superearn') {
      document.querySelector('meta[name="description"]').content = 'SuperEarn case study: a non-custodial DeFi app for yield discovery, staking, farming, swaps and cross-chain asset management.';
      const page = document.querySelector('#case-content');
      page.classList.add('case-page--superearn');
      document.querySelector('#case-summary').textContent = 'A non-custodial DeFi platform that brings yield opportunities, staking, farming, swaps and cross-chain tools into one app.';
      document.querySelector('#case-caption').textContent = 'SuperEarn — DeFi yield platform';
      document.querySelector('#overview-title').textContent = 'Earn, swap and bridge in one DeFi app';
      document.querySelector('#overview-copy').textContent = 'SuperEarn connects users with yield-generating DeFi pools across multiple blockchains. The platform brings staking, restaking, liquidity pools, swaps and bridges into one interface, with tools to compare opportunities and track rewards while users retain control of their assets.';
      const liveLink = document.createElement('a');
      liveLink.className = 'beexpay-live-link';
      liveLink.href = 'https://superearn.com/';
      liveLink.target = '_blank';
      liveLink.rel = 'noopener noreferrer';
      liveLink.innerHTML = 'Visit website <span aria-hidden="true">↗</span>';
      document.querySelector('#case-summary').after(liveLink);
      const detail = document.createElement('div');
      detail.className = 'superearn-details';
      detail.innerHTML = `
        <section class="superearn-brief reveal-on-scroll">
          <div><p class="case-eyebrow">THE CHALLENGE</p><h2>Make DeFi opportunities easier to find and manage.</h2></div>
          <div class="superearn-brief-copy"><p>DeFi yields are spread across protocols and blockchain networks, making it difficult to compare pools, understand strategies and keep track of assets in different places.</p><p>The product brings discovery and everyday DeFi actions together in one non-custodial experience, with clear reward tracking and flexible access to funds.</p></div>
        </section>
        <section class="superearn-deliverables reveal-on-scroll"><div><p class="case-eyebrow">WHAT WAS DESIGNED</p><h2>A clearer route from assets to DeFi rewards.</h2></div><ul class="superearn-list"><li>Product landing page presenting the platform and its core services.</li><li>Yield calculator for estimating potential returns over time.</li><li>Discovery experience for yield pools and DeFi opportunities.</li><li>Staking, restaking and yield-farming flows.</li><li>Liquidity-pool deposits and reward information.</li><li>Cross-chain asset tools for swapping and bridging.</li><li>Blockchain and protocol ecosystem browsing.</li><li>Portfolio and activity views for tracking positions and rewards.</li><li>Daily reward claiming and reinvestment touchpoints.</li><li>Security and non-custodial product communication.</li><li>Responsive interface for the SuperEarn web platform.</li></ul></section>
        <section class="superearn-gallery" aria-label="SuperEarn project screens">
          <figure class="superearn-shot reveal-on-scroll"><img src="./assets/cases/superearn-project-02.png" alt="SuperEarn wallet screens for networks, swaps, receiving and settings" loading="lazy" /></figure>
          <div class="superearn-gallery-row reveal-on-scroll">
            <figure class="superearn-shot"><img src="./assets/cases/superearn-project-03.png" alt="SuperEarn mascot illustration" loading="lazy" /></figure>
            <figure class="superearn-shot"><img src="./assets/cases/superearn-project-04.png" alt="SuperEarn profile screen with mascot" loading="lazy" /></figure>
          </div>
          <figure class="superearn-shot reveal-on-scroll"><img src="./assets/cases/superearn-project-05.png" alt="SuperEarn marketplace and transaction flow screens" loading="lazy" /></figure>
          <figure class="superearn-shot reveal-on-scroll"><img src="./assets/cases/superearn-project-06.png" alt="SuperEarn app in use with its mascot" loading="lazy" /></figure>
          <figure class="superearn-shot superearn-shot--features reveal-on-scroll"><img src="./assets/cases/superearn-project-07.png" alt="SuperEarn platform features and benefits" loading="lazy" /></figure>
          <figure class="superearn-shot reveal-on-scroll"><img src="./assets/cases/superearn-project-08.png" alt="SuperEarn marketplace transaction interface" loading="lazy" /></figure>
        </section>`;
      document.querySelector('.case-overview').after(detail);
      document.querySelector('#case-image').loading = 'eager';
      document.querySelector('#case-image').decoding = 'async';
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      detail.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));


    }
    document.querySelector('#case-caption').textContent = project.title;
    document.querySelector('#overview-title').textContent = project.title;
    document.querySelector('#overview-copy').textContent = project.summary;
    if (project.id === 'superearn') {
      document.querySelector('#case-summary').textContent = 'A non-custodial DeFi platform that brings yield opportunities, staking, farming, swaps and cross-chain tools into one app.';
      document.querySelector('#case-caption').textContent = 'SuperEarn — DeFi yield platform';
      document.querySelector('#overview-title').textContent = 'Earn, swap and bridge in one DeFi app';
      document.querySelector('#overview-copy').textContent = 'SuperEarn connects users with yield-generating DeFi pools across multiple blockchains. The platform brings staking, restaking, liquidity pools, swaps and bridges into one interface, with tools to compare opportunities and track rewards while users retain control of their assets.';
    }
    if (project.id === 'crocobit') {
      document.querySelector('meta[name="description"]').content = 'CrocoBit case study: a blockchain GameFi platform combining an NFT collection, crypto racing game, staking, farming and token swaps.';
      document.querySelector('meta[name="theme-color"]').content = '#050807';
      document.body.classList.add('theme-crocobit');
      const page = document.querySelector('#case-content');
      page.classList.add('case-page--crocobit');
      document.querySelector('#case-summary').textContent = 'A blockchain GameFi platform combining a racing game for traders, NFT collectibles, staking, farming and token swaps.';
      document.querySelector('#case-caption').textContent = 'CrocoBit — GameFi platform';
      document.querySelector('#overview-title').textContent = 'A GameFi ecosystem built around racing and NFTs';
      document.querySelector('#overview-copy').textContent = 'CrocoBit brings together a custom NFT collection, a racing game for crypto traders, token swaps and reward mechanics for NFT holders. The concept creates a shared space for trading, collecting and playing, with blockchain assets at the center of the experience.';
      const liveLink = document.createElement('a');
      liveLink.className = 'beexpay-live-link';
      liveLink.href = 'https://crocobit.net/';
      liveLink.target = '_blank';
      liveLink.rel = 'noopener noreferrer';
      liveLink.innerHTML = 'Visit website <span aria-hidden="true">↗</span>';
      document.querySelector('#case-summary').after(liveLink);
      const detail = document.createElement('div');
      detail.className = 'crocobit-details';
      detail.innerHTML = `
        <section class="crocobit-brief reveal-on-scroll">
          <div><p class="case-eyebrow">THE CHALLENGE</p><h2>Bring traders, NFT collectors and players into one world.</h2></div>
          <div class="crocobit-brief-copy"><p>The goal was to create a blockchain space that gives crypto traders and gaming enthusiasts more ways to interact with digital assets through play, collecting and token-based rewards.</p><p>The experience needed to connect the NFT collection with racing gameplay, holder rewards, token swaps and a referral system.</p></div>
        </section>
        <section class="crocobit-deliverables reveal-on-scroll"><div><p class="case-eyebrow">WHAT WAS CREATED</p><h2>Collect, race and earn with on-chain assets.</h2></div><ul class="crocobit-list"><li>An original NFT collection of unique digital artifacts.</li><li>An online racing game for crypto traders.</li><li>NFT-based car upgrades that connect collectibles to gameplay.</li><li>Staking and farming mechanics that let NFT holders earn additional tokens.</li><li>A token swap experience designed for low-friction exchange.</li><li>A referral program with bonuses and rewards for bringing new users to the platform.</li></ul></section>
        <section class="crocobit-stack reveal-on-scroll"><div><p class="case-eyebrow">TECHNOLOGY</p><h2>Built for BNB Smart Chain.</h2></div><div class="crocobit-stack-copy"><p>Solidity · Node.js · React · JavaScript · Web3</p><p>Blockchain: BSC</p></div></section>`;
      document.querySelector('.case-overview').after(detail);
      document.querySelector('#case-image').loading = 'eager';
      document.querySelector('#case-image').decoding = 'async';
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      detail.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    }
    if (project.id === 'beexpay') {
      document.querySelector('meta[name="theme-color"]').content = '#f4f1fa';
      document.body.classList.add('theme-beexpay');
      const page = document.querySelector('#case-content');
      page.classList.add('case-page--beexpay');
      document.querySelector('#case-title').textContent = 'BeeXpay';
      document.querySelector('#case-summary').textContent = 'A crypto banking ecosystem for everyday payments, cards, digital assets and travel eSIM — brought together in one simple app.';
      const liveLink = document.createElement('a');
      liveLink.className = 'beexpay-live-link';
      liveLink.href = 'https://beexpay.app/';
      liveLink.target = '_blank';
      liveLink.rel = 'noopener noreferrer';
      liveLink.innerHTML = 'Visit live website <span aria-hidden="true">↗</span>';
      document.querySelector('#case-summary').after(liveLink);
      document.querySelector('#case-caption').textContent = 'BeeXpay — landing page & product experience';
      document.querySelector('#overview-title').textContent = 'One app for crypto and everyday life';
      document.querySelector('#overview-copy').textContent = 'BeeXpay brings together secure crypto storage and exchange, payment cards, daily spending and travel services. The experience makes using crypto feel as familiar as using regular money: add funds, exchange assets, pay by card and stay connected with eSIM.';
      const detail = document.createElement('div');
      detail.className = 'beexpay-details';
      detail.innerHTML = `
        <section class="beexpay-brief reveal-on-scroll">
          <div class="beexpay-brief-heading"><p class="case-eyebrow">THE CHALLENGE</p><h2>Make crypto banking feel effortless.</h2></div>
          <div class="beexpay-brief-copy"><p>Design a modern digital product that combines a crypto wallet with the familiar tools of a bank. The work covered both a responsive landing page and a mobile app, with a clear journey from registration and funding an account to issuing a card and making a payment.</p><p>Clarity, trust and security guided the experience across every flow.</p></div>
        </section>
        <section class="beexpay-project-info reveal-on-scroll" aria-label="BeeXpay role, scope and project outcomes">
          <div class="beexpay-project-info-heading"><p class="case-eyebrow">MY ROLE & PROJECT FACTS</p><h2>From product flows to a connected experience.</h2></div>
          <dl class="beexpay-project-facts">
            <div><dt>My role</dt><dd>Product & UX/UI design</dd></div>
            <div><dt>Scope</dt><dd>Responsive website and mobile app</dd></div>
            <div><dt>Contribution</dt><dd>Product structure, user flows, interface design, visual direction and design system</dd></div>
            <div><dt>Project status</dt><dd>Live website · product design case</dd></div>
            <div><dt>Timeline</dt><dd>1 month</dd></div>
            <div class="beexpay-project-facts-wide"><dt>Design outcome</dt><dd>A connected experience across crypto wallet, cards, payments and travel services.</dd></div>
            <div class="beexpay-project-facts-wide"><dt>Launch results</dt><dd class="project-metric-list">${metricsMarkup(projectFactData.beexpay.metrics)}</dd></div>
          </dl>
        </section>
        <section class="beexpay-deliverables reveal-on-scroll"><div><p class="case-eyebrow">WHAT WAS DESIGNED</p><h2>A connected product, from wallet to travel.</h2></div><ul class="beexpay-list beexpay-list--columns"><li>Responsive product landing page</li><li>Wallet dashboard, asset balances and activity</li><li>Top-up, transfer and instant exchange flows</li><li>Virtual and physical cards with multiple product tiers</li><li>Card details, top-ups, limits and temporary freeze</li><li>3D Secure payment confirmation</li><li>Apple Pay setup and card confirmation screens</li><li>Local and regional eSIM plans by country, data and duration</li><li>Notifications, transaction history and operation statuses</li><li>Profile security, password, 2FA and biometric settings</li><li>Profile personalization with avatar selection</li><li>Lounge Access, Fast Track and Meet & Greet services</li><li>Unified design system for landing page and mobile app</li><li>Distinctive violet and orange visual style with 3D graphics</li></ul></section>
        <section class="beexpay-gallery" aria-label="BeeXpay project screens">
          <div class="beexpay-gallery-heading reveal-on-scroll"><h2>BeeXpay in detail</h2></div>
          ${Array.from({length:7}, (_, i) => { const n = i + 2; const descriptions = ['Product features, press and app preview','Everyday payments and travel in context','Wallet, activity and card management','Physical VIP card experience','Travel Hub in a real-world setting','Mobile product interface collection','BeeXpay landing page on desktop']; return `<figure class="beexpay-shot reveal-on-scroll"><img src="./assets/cases/beexpay-case-${String(n).padStart(2,'0')}.png" alt="BeeXpay project screen ${n}: ${descriptions[i]}" loading="lazy"></figure>`; }).join('')}
        </section>`;
      document.querySelector('.case-overview').after(detail);
      document.querySelector('#case-image').loading = 'eager';
      document.querySelector('#case-image').decoding = 'async';
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      detail.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

      const galleryFigures = [...detail.querySelectorAll('.beexpay-shot')];
      const viewedImages = [document.querySelector('#case-image'), ...galleryFigures.map((figure) => figure.querySelector('img'))].filter(Boolean);
      const lightbox = document.createElement('dialog');
      lightbox.className = 'beexpay-lightbox';
      lightbox.setAttribute('aria-label', 'BeeXpay project images');
      lightbox.innerHTML = '<button class="beexpay-lightbox-close" type="button" aria-label="Close image">×</button><button class="beexpay-lightbox-arrow beexpay-lightbox-prev" type="button" aria-label="Previous image">←</button><figure><img alt="" /><figcaption><span class="beexpay-lightbox-count"></span><span class="beexpay-lightbox-hint">BeeXpay · Project detail</span></figcaption></figure><button class="beexpay-lightbox-arrow beexpay-lightbox-next" type="button" aria-label="Next image">→</button>';
      document.body.append(lightbox);
      const lightboxImage = lightbox.querySelector('img');
      const lightboxCount = lightbox.querySelector('.beexpay-lightbox-count');
      const triggers = viewedImages;
      let activeImage = 0;
      let imageSwitchTimer = 0;
      const showImage = (nextIndex) => {
        activeImage = (nextIndex + viewedImages.length) % viewedImages.length;
        const source = viewedImages[activeImage];
        lightboxCount.textContent = `${String(activeImage + 1).padStart(2, '0')} / ${String(viewedImages.length).padStart(2, '0')}`;
        lightboxImage.classList.add('is-switching');
        window.clearTimeout(imageSwitchTimer);
        imageSwitchTimer = window.setTimeout(() => {
          lightboxImage.src = source.currentSrc || source.src;
          lightboxImage.alt = source.alt;
          requestAnimationFrame(() => lightboxImage.classList.remove('is-switching'));
        }, 120);
      };
      const openImage = (image) => {
        showImage(viewedImages.indexOf(image));
        lightbox.showModal();
      };
      triggers.forEach((image) => {
        image.classList.add('beexpay-lightbox-trigger');
        image.tabIndex = 0;
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', `View larger image: ${image.alt}`);
        image.addEventListener('click', () => openImage(image));
        image.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImage(image); }
        });
      });
      lightbox.querySelector('.beexpay-lightbox-close').addEventListener('click', () => lightbox.close());
      lightbox.querySelector('.beexpay-lightbox-prev').addEventListener('click', () => showImage(activeImage - 1));
      lightbox.querySelector('.beexpay-lightbox-next').addEventListener('click', () => showImage(activeImage + 1));
      lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
      document.addEventListener('keydown', (event) => {
        if (!lightbox.open) return;
        if (event.key === 'ArrowRight') showImage(activeImage + 1);
        if (event.key === 'ArrowLeft') showImage(activeImage - 1);
      });
      lightbox.addEventListener('close', () => viewedImages[activeImage]?.focus({ preventScroll: true }));

      let parallaxFrame = 0;
      const updateGalleryDrift = () => {
        parallaxFrame = 0;
        const viewportCenter = window.innerHeight * .5;
        galleryFigures.forEach((figure) => {
          const rect = figure.getBoundingClientRect();
          if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
          const distance = (rect.top + rect.height * .5 - viewportCenter) / Math.max(window.innerHeight, 1);
          figure.style.setProperty('--shot-drift', `${Math.max(-10, Math.min(10, distance * -16)).toFixed(2)}px`);
        });
      };
      const scheduleGalleryDrift = () => { if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateGalleryDrift); };
      window.addEventListener('scroll', scheduleGalleryDrift, { passive: true });
      window.addEventListener('resize', scheduleGalleryDrift, { passive: true });
      scheduleGalleryDrift();
    }
    if (project.id === 'eva-dex') {
      document.querySelector('meta[name="description"]').content = 'EVADEX case study: a Web3 DEX platform for token discovery, trading automation, portfolio analytics and multi-chain wallet management.';
      const page = document.querySelector('#case-content');
      page.classList.add('case-page--evadex');
      document.querySelector('#case-title').textContent = 'EVADEX';
      document.querySelector('#case-summary').textContent = 'A Web3 platform for discovering tokens, monitoring DEX markets and automating trades across multiple blockchain networks.';
      document.querySelector('#case-caption').textContent = 'EVADEX — DEX trading platform';
      document.querySelector('#overview-title').textContent = 'A command center for multi-chain trading';
      document.querySelector('#overview-copy').textContent = 'EVADEX brings token discovery, fast purchases, portfolio analytics, risk filtering, wallet management and automated trading scenarios into one interface. The product combines FinTech, Web3, DeFi and cryptocurrency trading tools for active traders.';
      const detail = document.createElement('div');
      detail.className = 'evadex-details';
      detail.innerHTML = `
        <section class="evadex-brief reveal-on-scroll">
          <div><p class="case-eyebrow">THE CHALLENGE</p><h2>Turn on-chain data into decisive trades.</h2></div>
          <div class="evadex-brief-copy"><p>The goal was to create a trader-focused platform that brings DEX market monitoring, promising token discovery, sniper functionality, portfolio analytics and asset management across multiple chains into one workspace.</p><p>The service covers token monitoring, new-pair analysis, wallet management, trade automation and sniper tools across EVM networks and Solana.</p></div>
        </section>
        <section class="evadex-deliverables reveal-on-scroll"><div><p class="case-eyebrow">WHAT WAS DESIGNED</p><h2>Everything a trader needs, in one workspace.</h2></div><ul class="evadex-list"><li>Product homepage with platform positioning, benefit descriptions, legal information, referral program and X publications.</li><li>New trading pairs dashboard with token table, liquidity, market cap, volume, creation time, swaps and quick-buy action.</li><li>Advanced token filters for liquidity, volume, market cap, transactions, buys, sells and security parameters.</li><li>Portfolio Analyzer for assets, open positions, trade history, profit and loss.</li><li>Portfolio statistics for realized and unrealized PnL, total revenue, total spent and network allocation.</li><li>Pump Vision for tracking new tokens, emerging projects and assets at launch.</li><li>Referral dashboard with rewards, personal link, invite statistics, reward tiers and withdrawal history.</li><li>Settings for language, interface theme, profile, security and notifications.</li><li>Sniper Function with network, gas, slippage, MEV protection, purchase amount, sell-at-peak and auto-approve controls.</li><li>Trading screen with chart, order book and trade history, Trades, Orders, Holders, Positions and History tabs, plus Buy/Sell panel.</li><li>Token Explorer with trending, rising, falling and active token views by time period.</li><li>Wallet Manager for creating, connecting and managing wallets, withdrawing, distributing and consolidating assets.</li><li>Dialogs for adding a withdrawal wallet and choosing a trading network.</li><li>Support for Ethereum, Binance Smart Chain, Arbitrum, Blast, Coinbase and Solana.</li><li>Dark Web3 UI system designed for analytical tables, cards, charts and trading workflows.</li></ul></section>
        <section class="evadex-gallery" aria-label="EVADEX project screens">
          <div class="evadex-gallery-heading reveal-on-scroll"><h2>EVADEX in detail</h2></div>
          ${Array.from({length:7}, (_, i) => { const n = i + 2; const descriptions = ['DEX features, token discovery and platform overview','New trading pairs and market dashboard','Portfolio analyzer, positions and asset statistics','Pump Vision token discovery','Trading automation, wallet and risk controls','Trading tools and portfolio interface','EVADEX platform presentation']; return `<figure class="evadex-shot reveal-on-scroll"><img src="./assets/cases/evadex-case-${String(n).padStart(2,'0')}.png" alt="EVADEX project screen ${n}: ${descriptions[i]}" loading="lazy"></figure>`; }).join('')}
        </section>`;
      document.querySelector('.case-overview').after(detail);
      document.querySelector('#case-image').loading = 'eager';
      document.querySelector('#case-image').decoding = 'async';
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      detail.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    }
    if (project.id === 'artbot') {
      document.querySelector('meta[name="description"]').content = 'ArtBot AI LegalTech case: an AI assistant for legal and migration guidance, document workflows, CRM handoff and a scalable web platform.';
      document.querySelector('meta[name="theme-color"]').content = '#08091f';
      document.body.classList.add('theme-artbot');
      const page = document.querySelector('#case-content');
      page.classList.add('case-page--artbot');
      document.querySelector('#case-title').textContent = 'ArtBot';
      document.querySelector('#case-summary').textContent = 'An intelligent LegalTech platform that helps people understand legal and migration matters, prepare documents and connect with specialists.';
      document.querySelector('#case-caption').textContent = 'ArtBot — AI LegalTech platform';
      document.querySelector('#overview-title').textContent = 'Legal guidance, made easier to act on';
      document.querySelector('#overview-copy').textContent = 'The concept is an AI assistant that explains legal and migration questions, provides step-by-step guidance, helps prepare information and passes requests to specialists. The product combines artificial intelligence, LegalTech and automation of legal services.';
      const detail = document.createElement('div');
      detail.className = 'artbot-details';
      detail.innerHTML = `
        <section class="artbot-brief reveal-on-scroll">
          <div><p class="case-eyebrow">THE CHALLENGE</p><h2>Turn complex legal steps into a clear path.</h2></div>
          <div class="artbot-brief-copy"><p>Create a LegalTech MVP where people can get free guidance from an AI assistant, register, complete a questionnaire, upload documents and hand a request to a specialist through CRM when they need personal help.</p><p>The service was scoped as an AI-powered platform with an AI chat, user account, document uploads, CRM integration, admin panel, GDPR mechanisms and an architecture ready to scale.</p></div>
        </section>
        <section class="artbot-deliverables reveal-on-scroll"><div><p class="case-eyebrow">WHAT WAS DESIGNED</p><h2>From an AI answer to a specialist handoff.</h2></div><ul class="artbot-list"><li>MVP technical architecture focused on AI consultations and automated request handling.</li><li>AI assistant for free guidance on legal and migration questions.</li><li>AI chat with conversation history, language switching, response-delay indicator and LLM error handling.</li><li>Persistent legal disclaimer explaining that AI responses are not legal advice.</li><li>Option to save an AI response as a step-by-step checklist in the user profile.</li><li>Admin tools to manage the AI knowledge base in JSON and Markdown formats.</li><li>RAG architecture connecting the knowledge base to the AI assistant.</li><li>Email and phone registration with OTP verification.</li><li>User account with questionnaire, profile and document area.</li><li>Document uploads with format checks, size limits, secure storage and presigned URLs.</li><li>“Do it for me” action to send a request to a specialist.</li><li>amoCRM integration for lead creation, status sync and retry after failures.</li><li>Web push notifications when a request status changes.</li><li>Admin panel for managing users, documents, leads and statuses.</li><li>Admin roles, 2FA, RBAC and audit trail.</li><li>GDPR controls for consent, version history, deletion requests and automatic removal of inactive profiles.</li><li>Security requirements covering TLS, encryption, protected links, logging and access control.</li><li>DevOps architecture with Dev, Staging and Prod environments, CI/CD, monitoring and logging.</li><li>Scalable roadmap for payments, PDF autofill, AI document validation and additional languages.</li></ul></section>
        <section class="artbot-gallery" aria-label="ArtBot project screens">
          <div class="artbot-gallery-heading reveal-on-scroll"><h2>ArtBot in detail</h2></div>
          ${Array.from({length:6}, (_, i) => { const n = i + 2; const descriptions = ['AI assistant and legal workflow','User onboarding and consultation flow','Legal assistant chat and saved guidance','Document management and profile screens','Specialist support and platform modules','ArtBot platform interface overview']; return `<figure class="artbot-shot reveal-on-scroll"><img src="./assets/cases/artbot-case-${String(n).padStart(2,'0')}.png" alt="ArtBot project screen ${n}: ${descriptions[i]}" loading="lazy"></figure>`; }).join('')}
        </section>`;
      document.querySelector('.case-overview').after(detail);
      document.querySelector('#case-image').loading = 'eager';
      document.querySelector('#case-image').decoding = 'async';
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      detail.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    }
    if (project.id !== 'beexpay') {
      const projectFacts = createProjectFacts(projectFactData[project.id]);
      const overview = document.querySelector('.case-overview');
      const detail = overview.nextElementSibling;
      const brief = detail?.querySelector('section[class*="-brief"]');
      if (brief) brief.after(projectFacts);
      else overview.after(projectFacts);
      const factsObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); factsObserver.unobserve(entry.target); }
      }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      factsObserver.observe(projectFacts);
    }
    const previous = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    const prevLink = document.querySelector('#previous-project');
    const nextLink = document.querySelector('#next-project');
    prevLink.href = `./case.html?project=${previous.id}`;
    prevLink.insertAdjacentHTML('beforeend', `<b>${previous.title}</b>`);
    nextLink.href = `./case.html?project=${next.id}`;
    nextLink.insertAdjacentHTML('beforeend', `<b>${next.title}</b>`);
  }
  document.querySelector('#year').textContent = new Date().getFullYear();

  const scrollTopButton = document.querySelector('#case-scroll-top');
  if (scrollTopButton) {
    const updateScrollTopButton = () => scrollTopButton.classList.toggle('is-visible', window.scrollY > 280);
    window.addEventListener('scroll', updateScrollTopButton, { passive: true });
    updateScrollTopButton();
    scrollTopButton.addEventListener('click', () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }
})();
