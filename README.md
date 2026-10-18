# Ismail El Asiouty &mdash; SEO Specialist Portfolio

A premium, static, multi-page portfolio engineered for **Ismail El Asiouty**, SEO Specialist. Built as a high-performance SEO "command center" featuring deep-dive case studies, Generative Engine Optimization (GEO/AEO) analysis, an interactive Transformer architecture diagram, and an SEO Software Lab.

Zero frameworks, zero dependencies, zero build steps &mdash; 100% pure semantic HTML5, CSS3, and vanilla JavaScript.

---

## 1. Quick Deployment to GitHub Pages

1. **Verify your local files**:
   Place your CV file in `assets/cv/` named `Ismail-El-Asiouty-CV.pdf`.

2. **Replace base URL placeholders**:
   Search and replace `https://isamilelasiouty.github.io/Isamilelasiouty-portfolio/` with your actual GitHub Pages URL (see section 3 below).

3. **Initialize Git and Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit for Ismail El Asiouty SEO Portfolio"
   ```

4. **Connect to GitHub and Push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

5. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** &gt; **Pages**.
   - Under **Build and deployment**:
     - **Source**: `Deploy from a branch`
     - **Branch**: `main` / `/ (root)`
   - Click **Save**. Within 1–2 minutes, your website will be live.

---

## 2. Directory Structure

```text
/
├── index.html                  # Command center homepage & proof metrics
├── case-studies.html           # 3 In-depth case studies & Evidence Gallery
├── ai-search.html              # BERT vs GPT Transformer architecture & GEO
├── tools.html                  # SEO Software Lab scaffold & detail modal
├── contact.html                # Direct contact channels & copy email toast
├── 404.html                    # On-brand HTTP 404 crawl error page
├── robots.txt                  # Search crawler directives
├── sitemap.xml                 # XML search engine sitemap
├── .nojekyll                   # Bypasses Jekyll processing on GitHub Pages
├── .gitignore                  # Git exclusions for OS & cache files
├── PLAN.md                     # Sequential development phase checklist
├── README.md                   # Full documentation & maintenance guide
├── assets/
│   ├── css/
│   │   └── main.css            # Central design system & responsive styles
│   ├── js/
│   │   └── main.js             # Theme toggle, observer, lightbox & diagrams
│   ├── icons/
│   │   ├── python.svg          # Local Python emblem
│   │   └── r.svg               # Local R project emblem
│   ├── images/
│   │   ├── ismail-el-asiouty-900.webp
│   │   ├── ismail-el-asiouty-480.webp
│   │   ├── og-image.jpg        # 1200x630 social share card
│   │   ├── logo-transparent.png # Un-premultiplied alpha logo
│   │   ├── favicon-32x32.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-512x512.png
│   │   ├── favicon.ico
│   │   └── *.webp              # Optimized WebP screenshots (quality 85)
│   └── cv/
│       └── README.md           # Instructions for Ismail-El-Asiouty-CV.pdf
└── scripts/
    └── optimize_images.py      # Pillow batch processor & contact sheet generator
```

---

## 3. Placeholders to Replace Before Launch

Replace `https://isamilelasiouty.github.io/Isamilelasiouty-portfolio/` in the following files:
- `index.html` (canonical, og:url, twitter:url, and JSON-LD schema IDs)
- `case-studies.html` (canonical, og:url, twitter:url, and BreadcrumbList)
- `ai-search.html` (canonical, og:url, twitter:url, and BreadcrumbList)
- `tools.html` (canonical, og:url, twitter:url, and BreadcrumbList)
- `contact.html` (canonical, og:url, twitter:url, and BreadcrumbList)
- `404.html` (canonical)
- `robots.txt` (Sitemap URL)
- `sitemap.xml` (all `<loc>` entries)

---

## 4. How to Edit Content & Add Tools

### A. How to Add a Tool in `tools.html`
In `tools.html`, uncomment the documented tool card template:
```html
<article class="card result-card reveal">
  <div class="result-card-thumb">
    <img src="assets/images/your-tool-thumb.webp" alt="Tool Name" width="800" height="400" loading="lazy">
  </div>
  <span class="result-card-meta">Python • Automation</span>
  <h3>Tool Name</h3>
  <p>Short description of what the tool automates or analyzes.</p>
  <div class="chip-group" style="margin: 14px 0;">
    <span class="chip">Python 3.12</span>
    <span class="chip">Pandas</span>
  </div>
  <div style="display: flex; gap: 10px; margin-top: auto; padding-top: 14px;">
    <button type="button" class="btn btn-secondary btn-sm"
            data-open-modal
            data-tool-title="Tool Name"
            data-tool-desc="Full description of the tool mechanism."
            data-tool-stack="Python, Streamlit, Pandas">
      View Details
    </button>
    <a href="https://github.com/..." target="_blank" rel="noopener" class="btn btn-primary btn-sm">GitHub &rarr;</a>
  </div>
</article>
```
The modal in `tools.html` and `assets/js/main.js` will automatically read your `data-*` attributes with zero JavaScript modifications.

### B. Adding Your CV File
Copy your official PDF file into `assets/cv/` and name it:
`Ismail-El-Asiouty-CV.pdf`
All buttons across the header, hero, CV strip, and contact page already link directly to this file with the `download` attribute.

---

## 5. Third-Party Icon Licenses & Usage

- **Python Logo (`assets/icons/python.svg`)**:
  The Python logo is a trademark of the Python Software Foundation (PSF). Used locally in accordance with the PSF Trademark Usage Policy under nominative and descriptive use to indicate programming and automation capabilities. Not used to imply commercial endorsement.
- **R Logo (`assets/icons/r.svg`)**:
  The R logo is copyright &copy; 2016 The R Foundation. Used locally under the Creative Commons Attribution-ShareAlike 4.0 International license (CC BY-SA 4.0) to signify data analysis competencies.

---

## 6. Privacy & Missing File Notes

- **Tourist Office Screenshot**:
  The file "Tourist office" was not present in the source folder. Per design instructions, an elegant on-brand placeholder (`Screenshot coming soon`) has been configured for Case 2. When available, save it as `assets/images/case-2-travel-main.webp` to populate the slot immediately.
- **Client Domain Privacy Check**:
  Review Search Console screenshots before public distribution:
  - `GSC 4`: Contains domain bar and desktop taskbar details at bottom.
  - `GSC Medical` & `GSC Medical 2`: May display domain prefixes in URL inspection filters.
  - `GSC1`, `GSC2`, `GSC3`: Check query/page tabs for identifiable client terms.
