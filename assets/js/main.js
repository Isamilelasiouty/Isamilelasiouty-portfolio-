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
    if (!queryEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      queryEl.textContent = 'SEO Company';
      if (scanBar) scanBar.style.width = '100%';
      return;
    }

    const queries = [
      'SEO Company',
      'Best SEO Specialist',
      'Technical SEO Audit',
      'GEO & AI Search Optimization',
      'High-Intent Organic Growth'
    ];

    let queryIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentQuery = queries[queryIdx];

      if (isDeleting) {
        charIdx--;
        queryEl.textContent = currentQuery.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          queryIdx = (queryIdx + 1) % queries.length;
          setTimeout(typeLoop, 450);
          return;
        }
        setTimeout(typeLoop, 28);
      } else {
        charIdx++;
        queryEl.textContent = currentQuery.substring(0, charIdx);
        if (charIdx === currentQuery.length) {
          // Completed typing query: simulate instant AI search index scan
          if (scanBar) {
            scanBar.style.width = '100%';
            setTimeout(() => {
              scanBar.style.opacity = '0';
              setTimeout(() => {
                scanBar.style.width = '0%';
                scanBar.style.opacity = '1';
              }, 300);
            }, 600);
          }
          if (rankBadge) {
            rankBadge.style.transform = 'scale(1.12)';
            setTimeout(() => {
              rankBadge.style.transform = 'scale(1)';
            }, 350);
          }
          // Pause to read the ranked result
          isDeleting = true;
          setTimeout(typeLoop, 3600);
          return;
        }
        setTimeout(typeLoop, 65 + Math.random() * 45);
      }
    }

    // Start with a gentle delay
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
