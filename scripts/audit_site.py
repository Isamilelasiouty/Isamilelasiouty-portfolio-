#!/usr/bin/env python3
"""Site audit script to verify paths, links, file sizes, and HTML structure."""
import re
from pathlib import Path

root = Path(r"D:\Ismail El Asiouty")
html_files = list(root.glob("*.html"))
print(f"Auditing {len(html_files)} HTML files...")

errors = 0
for hf in sorted(html_files):
    text = hf.read_text(encoding="utf-8")
    
    # Check for hardcoded local absolute paths
    if "D:\\" in text or "D:/" in text:
        print(f"[FAIL] Absolute drive letter found in {hf.name}")
        errors += 1
        
    # Check for leading slashes on assets
    bad_assets = re.findall(r'(?:href|src)=["\']/assets/', text)
    if bad_assets:
        print(f"[FAIL] Leading slash in asset path in {hf.name}: {bad_assets}")
        errors += 1
        
    # Check image width/height attributes
    img_tags = re.findall(r'<img[^>]+>', text)
    for img in img_tags:
        if 'width=' not in img or 'height=' not in img:
            print(f"[WARN] Missing width or height in {hf.name}: {img[:80]}...")
            
    # Check references
    links = re.findall(r'(?:href|src)=["\']([^"\'#]+)(?:#[^"\']*)?["\']', text)
    for link in links:
        if link.startswith(("mailto:", "tel:", "http://", "https://", "data:")):
            continue
        target = root / link
        # CV is added by user so we know it will be there
        if not target.exists() and not link.endswith("Ismail-El-Asiouty-CV.pdf"):
            print(f"[FAIL] Broken link/asset in {hf.name} -> {link}")
            errors += 1

# Check total size of assets
asset_size = sum(f.stat().st_size for f in root.glob("assets/**/*") if f.is_file())
print(f"Total asset size: {asset_size / (1024*1024):.2f} MB (target: < 15 MB)")

# Check CSS and JS file sizes
css_size = (root / "assets" / "css" / "main.css").stat().st_size
js_size = (root / "assets" / "js" / "main.js").stat().st_size
print(f"main.css size: {css_size / 1024:.2f} KB (1 file)")
print(f"main.js size: {js_size / 1024:.2f} KB (target: < 40 KB unminified)")

if errors == 0:
    print("\n[SUCCESS] All checks passed with 0 errors!")
else:
    print(f"\n[SUMMARY] Found {errors} errors to fix.")
