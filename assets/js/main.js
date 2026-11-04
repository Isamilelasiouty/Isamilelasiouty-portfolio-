/**
 * ISMAIL EL ASIOUTY - SEO SPECIALIST PORTFOLIO
 * Main JavaScript Engine (Vanilla JS, Zero Dependencies, < 25 KB)
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. THEME CONTROLLER
  // -------------------------------------------------------------------------
  const THEME_KEY = 'asiouty_portfolio_theme';
  const root = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      root.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // Respect system preference if set, though dark is default design
    }
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', current);
    localStorage.setItem(THEME_KEY, current);
    
    // Update theme toggle buttons aria-label
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${current === 'light' ? 'dark' : 'light'} theme`);
    });
  }

  // -------------------------------------------------------------------------
  // 1.1 BILINGUAL CONTROLLER (EN / AR)
  // -------------------------------------------------------------------------
  const LANG_KEY = 'asiouty_portfolio_lang';
  let currentLang = 'en';

  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.case_studies': 'Case Studies',
      'nav.ai_search': 'AI & Search',
      'nav.tools': 'Tools',
      'nav.contact': 'Contact',
      'nav.download_cv': 'Download CV',
      'nav.toggle_theme': 'Toggle Theme',
      'hero.badge': 'SEO Command Center',
      'hero.title': 'Ismail El Asiouty',
      'hero.role': 'SEO Specialist',
      'hero.intro': 'Product-minded SEO Specialist with proven success optimizing 23+ websites across diverse industries. Scaled organic search performance on Google Search Console (3-month comparison): grew clicks from 1.74K to 4.82K (+177%), impressions from 253K to 691K (+173%), and improved average position from 9.2 to 5.2. Creator of 9+ SEO tools and founder of “SEO GPS” automation platform. Business Information Systems student specializing in Website Development.',
      'hero.cta_cv': 'Download CV',
      'hero.cta_cases': 'View Case Studies',
      'hero.cta_contact': 'Contact me',
      'hero.signal_monitor': 'Organic Signal Monitor',
      'hero.live_analysis': 'Live Index Analysis',
      'proof.years_label': 'Years of experience',
      'proof.sites_label': 'Websites optimized',
      'proof.tools_label': 'SEO tools & platforms built',
      'sim.site_name': 'Ismail El Asiouty',
      'sim.snippet': 'Product-minded SEO Specialist with proven success optimizing 23+ websites across diverse industries. Scaled GSC performance: <strong>+177% clicks</strong>, <strong>+173% impressions</strong>, avg position 9.2 to 5.2. Founder of “SEO GPS” automation platform.',
      'sim.sitelink_cases': 'Case Studies',
      'sim.sitelink_gps': 'SEO GPS Platform',
      'sim.sitelink_ai': 'AI & GEO Engine',
      'sim.sitelink_contact': 'Contact Ismail',
      'tools.lab_tag': 'SEO Software Lab',
      'tools.lab_title': 'Custom SEO Diagnostic & Automation Tools',
      'tools.lab_desc': 'Python and AI-powered utilities built to automate issue detection and streamline audits, led by the flagship SEO GPS automation platform.',
      'tools.gps_meta': 'Flagship Automation Platform • Live Web App',
      'tools.gps_title': 'SEO GPS — Intelligent Search Navigation & Diagnostics',
      'tools.gps_desc': 'Automated SEO guidance platform engineered by Ismail El Asiouty. Analyzes on-page architecture, visualizes keyword positioning trajectories, automates repetitive technical checks, and provides clear algorithmic remediation pathways.',
      'tools.launch_btn': 'Launch SEO GPS →',
      'tools.details_btn': 'Platform Architecture',
      'tools.pipeline_tag': 'Tool Suite in Progress',
      'tools.pipeline_title': 'Additional Diagnostic Utilities (9+ Tools Suite)',
      'tools.tool1_title': 'Orphan Page & Internal Link Auditor',
      'tools.tool1_desc': 'Crawl analysis engine that maps the complete internal URL link graph, detecting isolated orphan pages and calculating internal PageRank distribution.',
      'tools.tool2_title': 'AI Overview Readiness Scanner',
      'tools.tool2_desc': 'Analyzes entity density, schema markup compliance, and high-intent Q&A structure for inclusion in Google AI Overviews and answer engines.'
    },
    ar: {
      'nav.home': 'الرئيسية',
      'nav.case_studies': 'دراسات الحالة',
      'nav.ai_search': 'الذكاء الاصطناعي والبحث',
      'nav.tools': 'أدوات السيو',
      'nav.contact': 'تواصل معي',
      'nav.download_cv': 'تحميل السيرة الذاتية',
      'nav.toggle_theme': 'تبديل المظهر',
      'hero.badge': 'مركز قيادة محركات البحث (SEO Command Center)',
      'hero.title': 'إسماعيل الأسيوطي',
      'hero.role': 'أخصائي تحسين محركات البحث (SEO Specialist)',
      'hero.intro': 'أخصائي سيو ذو عقلية تركّز على تطوير المنتجات والنمو الرقمي، أمتلك سجلاً حافلاً في تحسين وتطوير أكثر من 23 موقعاً إلكترونياً عبر قطاعات متنوعة. حققت نمواً قياسياً في الأداء العضوي عبر Google Search Console (مقارنة 3 أشهر): زيادة النقرات من 1.74K إلى 4.82K (+177%)، وارتفاع مرات الظهور من 253K إلى 691K (+173%)، وتحسين متوسط الترتيب من 9.2 إلى 5.2. مطور لأكثر من 9 أدوات سيو ومؤسس منصة الأتمتة «SEO GPS». طالب نظم معلومات الأعمال (BIS) متخصص في تطوير المواقع.',
      'hero.cta_cv': 'تحميل السيرة الذاتية (CV)',
      'hero.cta_cases': 'عرض دراسات الحالة',
      'hero.cta_contact': 'تواصل معي',
      'hero.signal_monitor': 'مراقب إشارات الفهرسة العضوية',
      'hero.live_analysis': 'تحليل مباشر للفهرسة',
      'proof.years_label': 'سنوات خبرة متخصصة',
      'proof.sites_label': 'موقعاً إلكترونياً تم تحسينه',
      'proof.tools_label': 'أدوات ومنصات سيو مؤتمتة',
      'sim.site_name': 'إسماعيل الأسيوطي',
      'sim.snippet': 'أخصائي سيو ذو عقلية تركز على تطوير المنتجات بخبرة في تحسين أكثر من 23 موقعاً إلكترونياً. نمو قياسي على Google Search Console: <strong>+177% نقرات</strong>، <strong>+173% ظهور</strong>، وتحسين الترتيب من 9.2 إلى 5.2. مؤسس منصة «SEO GPS» للأتمتة.',
      'sim.sitelink_cases': 'دراسات الحالة',
      'sim.sitelink_gps': 'منصة SEO GPS',
      'sim.sitelink_ai': 'محرك الذكاء الاصطناعي (GEO)',
      'sim.sitelink_contact': 'تواصل مع إسماعيل',
      'tools.lab_tag': 'معمل برمجيات السيو',
      'tools.lab_title': 'أدوات الفحص والأتمتة المخصصة',
      'tools.lab_desc': 'حلول وأدوات برمجية مبنية بلغة بايثون والذكاء الاصطناعي لاكتشاف المشكلات التقنية وتسريع عمليات التدقيق، تقودها منصة SEO GPS المتطورة.',
      'tools.gps_meta': 'المنصة الرائدة للأتمتة • تطبيق ويب مباشر',
      'tools.gps_title': 'SEO GPS — الملاحة الذكية وتشخيص محركات البحث',
      'tools.gps_desc': 'منصة أتمتة وإرشاد سيو متقدمة من تطوير إسماعيل الأسيوطي. تحلل البنية الداخلية لصفحات الويب، وترسم مسار تمركز الكلمات المفتاحية، وتؤتمت الفحوصات التقنية المتكررة مع مسارات علاجية واضحة.',
      'tools.launch_btn': 'تشغيل منصة SEO GPS ←',
      'tools.details_btn': 'معمارية المنصة',
      'tools.pipeline_tag': 'قيد الإطلاق والتطوير',
      'tools.pipeline_title': 'حزمة أدوات التشخيص التقني (أكثر من 9 أدوات)',
      'tools.tool1_title': 'فاحص الصفحات اليتيمة والروابط الداخلية',
      'tools.tool1_desc': 'محرك تحليل زحف يرسم مخطط الربط الداخلي للروابط (Internal Link Graph)، ويكتشف الصفحات اليتيمة المعزولة ويوزع قوة البيج رانك الداخلي.',
      'tools.tool2_title': 'فاحص جاهزية الذكاء الاصطناعي (AI Overviews)',
      'tools.tool2_desc': 'يقيس كثافة الكيانات (Entities) وتطابق بيانات Schema وهيكلة الأسئلة والأجوبة المؤهلة للظهور في ملخصات الذكاء الاصطناعي من جوجل ومحركات الإجابة.'
    }
  };

  function setLanguage(lang) {
    currentLang = lang === 'ar' ? 'ar' : 'en';
    root.setAttribute('lang', currentLang);
    root.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem(LANG_KEY, currentLang);

    // Apply translations
    const dict = translations[currentLang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        // If element contains an inner SVG or icon, replace text safely
        const svg = el.querySelector('svg');
        if (svg && el.childNodes.length > 1) {
          // preserve svg
          el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              node.textContent = ' ' + dict[key] + ' ';
            }
          });
        } else {
          el.innerHTML = dict[key];
        }
      }
    });

    // Update lang-toggle buttons label
    document.querySelectorAll('.lang-toggle .lang-text').forEach(span => {
      span.textContent = currentLang === 'ar' ? 'English' : 'عربي';
    });
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  }

  function initLanguage() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved) {
      setLanguage(saved);
    } else {
      setLanguage('en');
    }
  }


  // -------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION
  // -------------------------------------------------------------------------
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.nav-mobile-drawer');
    if (!toggle || !drawer) return;

    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setOpen(false));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. SCROLL HANDLER (rAF Throttled)
  // -------------------------------------------------------------------------
  let isScrolling = false;
  const scrollProgressBar = document.querySelector('.scroll-progress');
  const backToTopBtn = document.querySelector('.back-to-top');
  const heroCard = document.querySelector('.hero-card');
  const rankBadge = document.querySelector('#hero-rank-badge');
  const signalLine = document.querySelector('#hero-signal-line');

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;

    // Progress bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // Back to top
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Hero interactive scroll animation: Signal path & subtle parallax
    if (heroCard) {
      const heroRect = heroCard.getBoundingClientRect();
      const heroInView = heroRect.top < window.innerHeight && heroRect.bottom > 0;
      if (heroInView) {
        const heroProgress = Math.max(0, Math.min(1, (window.innerHeight - heroRect.top) / (window.innerHeight + heroRect.height)));
        
        // Signal path stroke-dashoffset modulation
        if (signalLine) {
          const offset = (1 - heroProgress) * 120;
          signalLine.style.strokeDashoffset = offset.toFixed(1);
        }
      }
    }

    // Set --p per observed section
    document.querySelectorAll('[data-scroll-section]').forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      sec.style.setProperty('--p', p.toFixed(3));
    });

    isScrolling = false;
  }

  // -------------------------------------------------------------------------
  // 3.1 HERO SEARCH & AI OVERVIEW AUTOMATION SIMULATOR
  // -------------------------------------------------------------------------
  function initHeroSearchSimulator() {
    const queryEl = document.getElementById('hero-query-display');
    const scanBar = document.getElementById('sim-scan-progress');
    const rankBadge = document.getElementById('hero-rank-badge');
    const titleLink = document.getElementById('hero-result-title');
    if (!queryEl) return;

    // Strict rule: Result title must always display strictly Ismail El Asiouty
    if (titleLink) {
      titleLink.textContent = 'Ismail El Asiouty';
    }

    const queriesEn = [
      'SEO',
      'شركة SEO',
      'Best SEO Specialist',
      'SEO Company',
      'Technical SEO Audit'
    ];

    const queriesAr = [
      'شركة SEO',
      'SEO',
      'أفضل خبير سيو',
      'تحسين محركات البحث',
      'أخصائي سيو'
    ];

    let queryIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function getQueries() {
      return currentLang === 'ar' ? queriesAr : queriesEn;
    }

    function typeLoop() {
      const activeQueries = getQueries();
      const currentQuery = activeQueries[queryIdx % activeQueries.length];

      if (isDeleting) {
        charIdx--;
        queryEl.textContent = currentQuery.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          queryIdx = (queryIdx + 1) % activeQueries.length;
          setTimeout(typeLoop, 500);
          return;
        }
        setTimeout(typeLoop, 30);
      } else {
        charIdx++;
        queryEl.textContent = currentQuery.substring(0, charIdx);
        if (charIdx === currentQuery.length) {
          // Completed typing query: simulate instant Google search & AI index scan
          if (scanBar) {
            scanBar.style.width = '100%';
            setTimeout(() => {
              scanBar.style.opacity = '0';
              setTimeout(() => {
                scanBar.style.width = '0%';
                scanBar.style.opacity = '1';
              }, 300);
            }, 550);
          }
          if (rankBadge) {
            rankBadge.style.transform = 'scale(1.15)';
            setTimeout(() => {
              rankBadge.style.transform = 'scale(1)';
            }, 350);
          }
          // Pause to read the authentic Google #1 ranking result
          isDeleting = true;
          setTimeout(typeLoop, 3400);
          return;
        }
        setTimeout(typeLoop, 65 + Math.random() * 40);
      }
    }

    // Start typing
    setTimeout(typeLoop, 1000);
  }

  function handleScroll() {
    if (!isScrolling) {
      window.requestAnimationFrame(onScroll);
      isScrolling = true;
    }
  }

  // -------------------------------------------------------------------------
  // 4. INTERSECTION OBSERVER (Reveals & Counters)
  // -------------------------------------------------------------------------
  function initObserver() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('active'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Number counter animation
          const counters = entry.target.querySelectorAll('[data-counter]');
          counters.forEach(animateCounter);

          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-stagger, .proof-strip').forEach(el => {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1600;
    const start = performance.now();

    function step(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }
    requestAnimationFrame(step);
  }

  // -------------------------------------------------------------------------
  // 5. LIGHTBOX COMPONENT
  // -------------------------------------------------------------------------
  let activeLightboxItems = [];
  let currentLightboxIdx = 0;
  let lastActiveElement = null;

  function initLightbox() {
    const lightbox = document.getElementById('accessible-lightbox');
    if (!lightbox) return;

    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Collect zoomable items
    const zoomTriggers = document.querySelectorAll('[data-lightbox]');
    activeLightboxItems = Array.from(zoomTriggers).map((el, i) => {
      el.setAttribute('data-lb-index', String(i));
      return {
        src: el.getAttribute('data-lightbox-src') || el.querySelector('img')?.src,
        alt: el.getAttribute('data-lightbox-alt') || el.querySelector('img')?.alt || 'Enlarged screenshot',
        caption: el.getAttribute('data-lightbox-caption') || el.querySelector('img')?.alt || '',
        trigger: el
      };
    });

    function showItem(idx) {
      if (idx < 0) idx = activeLightboxItems.length - 1;
      if (idx >= activeLightboxItems.length) idx = 0;
      currentLightboxIdx = idx;

      const item = activeLightboxItems[idx];
      if (!item) return;

      lbImg.src = item.src;
      lbImg.alt = item.alt;
      lbCaption.textContent = item.caption;
    }

    function openLightbox(idx) {
      lastActiveElement = document.activeElement;
      showItem(idx);
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastActiveElement) lastActiveElement.focus();
    }

    zoomTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(trigger.getAttribute('data-lb-index') || '0', 10);
        openLightbox(idx);
      });
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(trigger.getAttribute('data-lb-index') || '0', 10);
          openLightbox(idx);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => showItem(currentLightboxIdx - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showItem(currentLightboxIdx + 1));

    // Backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showItem(currentLightboxIdx - 1);
      if (e.key === 'ArrowRight') showItem(currentLightboxIdx + 1);
    });

    // Touch swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX - touchStartX > 50) {
        showItem(currentLightboxIdx - 1); // Swipe right -> prev
      } else if (touchStartX - touchEndX > 50) {
        showItem(currentLightboxIdx + 1); // Swipe left -> next
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 6. COPY TO CLIPBOARD & TOAST
  // -------------------------------------------------------------------------
  function initCopyButtons() {
    const copyBtns = document.querySelectorAll('[data-copy]');
    const toast = document.getElementById('toast');

    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    copyBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const text = btn.getAttribute('data-copy');
        if (!text) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }
          showToast(`Copied "${text}" to clipboard!`);
        } catch (err) {
          showToast(`Could not copy: ${err}`);
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 7. EVIDENCE GALLERY FILTER
  // -------------------------------------------------------------------------
  function initEvidenceFilter() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    const items = document.querySelectorAll('.evidence-figure');
    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        items.forEach(item => {
          const category = item.getAttribute('data-category') || '';
          if (filter === 'all' || category === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 8. AI ARCHITECTURE DIAGRAM INTERACTIVE TOGGLE
  // -------------------------------------------------------------------------
  function initArchDiagram() {
    const toggleBtns = document.querySelectorAll('[data-arch-mode]');
    const encoderView = document.getElementById('arch-encoder-view');
    const decoderView = document.getElementById('arch-decoder-view');
    const infoTitle = document.getElementById('arch-info-title');
    const infoDesc = document.getElementById('arch-info-desc');
    const nodes = document.querySelectorAll('[data-node-title]');

    if (!toggleBtns.length) return;

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-arch-mode');

        if (mode === 'bert') {
          if (encoderView) encoderView.style.display = 'block';
          if (decoderView) decoderView.style.display = 'none';
          if (infoTitle) infoTitle.textContent = 'BERT (Bidirectional Encoder)';
          if (infoDesc) infoDesc.textContent = 'Reads text in both directions simultaneously. Built for natural language understanding, search intent classification, and entity relationships.';
          updateAttentionDemo('encoder');
        } else {
          if (encoderView) encoderView.style.display = 'none';
          if (decoderView) decoderView.style.display = 'block';
          if (infoTitle) infoTitle.textContent = 'GPT (Autoregressive Decoder)';
          if (infoDesc) infoDesc.textContent = 'Uses causal masked self-attention to predict the next token from preceding tokens. Built for answer generation, summaries, and generative synthesis.';
          updateAttentionDemo('decoder');
        }
      });
    });

    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        const title = node.getAttribute('data-node-title');
        const desc = node.getAttribute('data-node-desc');
        if (infoTitle && title) infoTitle.textContent = title;
        if (infoDesc && desc) infoDesc.textContent = desc;
      });
      node.addEventListener('click', () => {
        const title = node.getAttribute('data-node-title');
        const desc = node.getAttribute('data-node-desc');
        if (infoTitle && title) infoTitle.textContent = title;
        if (infoDesc && desc) infoDesc.textContent = desc;
      });
    });
  }

  function updateAttentionDemo(mode) {
    const demo = document.getElementById('attention-demo');
    if (!demo) return;
    const tokens = demo.querySelectorAll('.token-pill');
    const note = document.getElementById('attention-note');

    if (mode === 'encoder') {
      tokens.forEach((t, i) => {
        t.classList.remove('active', 'masked');
        if (i === 3) {
          t.classList.add('masked');
          t.textContent = '[MASKED]';
        } else {
          t.textContent = t.getAttribute('data-original-token') || t.textContent;
        }
      });
      if (note) {
        note.textContent = 'Encoder Mode: Bidirectional attention allows every token to inspect left and right context simultaneously to fill in the masked word.';
      }
    } else {
      tokens.forEach((t, i) => {
        t.classList.remove('masked');
        t.textContent = t.getAttribute('data-original-token') || t.textContent;
        if (i <= 4) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });
      if (note) {
        note.textContent = 'Decoder Mode: Causal masking prevents tokens from attending to future tokens. It computes the probability distribution for the next token strictly from previous words.';
      }
    }
  }

  // -------------------------------------------------------------------------
  // 9. CASE STUDIES IN-PAGE NAV OBSERVER
  // -------------------------------------------------------------------------
  function initCaseNav() {
    const navBtns = document.querySelectorAll('.case-nav-btn');
    const sections = ['case-1', 'case-2', 'case-3', 'evidence-section'];
    if (!navBtns.length) return;

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = id;
          }
        }
      });

      if (current) {
        navBtns.forEach(btn => {
          const href = btn.getAttribute('href');
          if (href === `#${current}`) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // 10. DETAIL MODAL (TOOLS SCAFFOLD)
  // -------------------------------------------------------------------------
  function initModal() {
    const modal = document.getElementById('tool-detail-modal');
    if (!modal) return;
    const title = modal.querySelector('#modal-tool-title');
    const desc = modal.querySelector('#modal-tool-desc');
    const stack = modal.querySelector('#modal-tool-stack');
    const closeBtn = modal.querySelector('.modal-close');

    document.querySelectorAll('[data-open-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (title) title.textContent = trigger.getAttribute('data-tool-title') || 'Tool Details';
        if (desc) desc.textContent = trigger.getAttribute('data-tool-desc') || '';
        if (stack) stack.textContent = trigger.getAttribute('data-tool-stack') || '';
        modal.classList.add('active');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // -------------------------------------------------------------------------
  // INITIALIZATION ENTRY POINT
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initMobileNav();
    initObserver();
    initLightbox();
    initCopyButtons();
    initEvidenceFilter();
    initArchDiagram();
    initCaseNav();
    initModal();
    initHeroSearchSimulator();

    // Theme toggle button click
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Language toggle button click
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', toggleLanguage);
    });

    // Back to top click
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    onScroll(); // initial check
  });
})();
