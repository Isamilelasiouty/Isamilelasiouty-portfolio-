#!/usr/bin/env python3
"""
Image optimization script for Ismail El Asiouty SEO Portfolio.
- Generates a single contact sheet of all source images.
- Crops and resizes portrait (900px, 480px WebP, 1200x630 og-image.jpg).
- Generates transparent logo using alpha = max(R,G,B) & un-premultiplied RGB.
- Generates favicon suite (32, 180, 512, ico).
- Optimizes case study and evidence screenshots to WebP (max width 1600px, quality 85).
- Outputs metadata JSON with widths and heights for zero-CLS HTML.
"""

import os
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SOURCE_DIR = Path(r"D:\Ismail El Asiouty\Prtfolo images")
DEST_DIR = Path(r"D:\Ismail El Asiouty\assets\images")
ARTIFACT_DIR = Path(r"C:\Users\dell\.gemini\antigravity\brain\014e935a-f4ea-475e-b855-b978222727d3")

DEST_DIR.mkdir(parents=True, exist_ok=True)
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

# 1. Inspect source directory
all_source_files = list(SOURCE_DIR.iterdir())
print(f"Total source files found: {len(all_source_files)}")

# Find Tourist office with any extension
tourist_office_files = [f for f in all_source_files if "tourist" in f.name.lower()]
if not tourist_office_files:
    print("[MISSING FILE] 'Tourist office' image NOT found in source directory.")
else:
    print(f"Found Tourist office: {tourist_office_files}")

# Map source files by normalized key
source_map = {}
for f in all_source_files:
    clean_name = f.stem.replace('\xa0', ' ').strip()
    source_map[clean_name] = f
    print(f"Mapped '{f.name}' -> '{clean_name}'")

# 2. Build Contact Sheet
def generate_contact_sheet():
    valid_images = []
    for f in sorted(all_source_files, key=lambda x: x.name):
        try:
            im = Image.open(f)
            valid_images.append((f.name, im.size, f))
        except Exception as e:
            print(f"Skipping non-image {f.name}: {e}")

    num_imgs = len(valid_images)
    cols = 4
    rows = math.ceil(num_imgs / cols)
    cell_w, cell_h = 420, 320
    sheet_w = cols * cell_w
    sheet_h = rows * cell_h + 80

    sheet = Image.new("RGB", (sheet_w, sheet_h), color="#0F1114")
    draw = ImageDraw.Draw(sheet)
    
    # Header
    draw.text((30, 25), "Source Images Contact Sheet - Ismail El Asiouty SEO Portfolio", fill="#D4AF37")

    for idx, (fname, (w, h), fpath) in enumerate(valid_images):
        col = idx % cols
        row = idx // cols
        x = col * cell_w + 15
        y = row * cell_h + 80
        
        # Draw frame
        draw.rectangle([x, y, x + cell_w - 30, y + cell_h - 20], outline="#2A2F3D", fill="#151922")
        
        # Load and thumbnail
        with Image.open(fpath) as img:
            img_copy = img.copy()
            img_copy.thumbnail((cell_w - 50, cell_h - 70), Image.Resampling.LANCZOS)
            tw, th = img_copy.size
            # center in box
            ox = x + ((cell_w - 30) - tw) // 2
            oy = y + 10 + ((cell_h - 80) - th) // 2
            if img_copy.mode in ("RGBA", "LA"):
                sheet.paste(img_copy, (ox, oy), img_copy)
            else:
                sheet.paste(img_copy, (ox, oy))
                
        # Caption
        label = f"{fname} ({w}x{h})"
        draw.text((x + 10, y + cell_h - 38), label, fill="#ECE8DF")

    contact_path_dest = DEST_DIR / "contact-sheet.png"
    contact_path_art = ARTIFACT_DIR / "contact-sheet.png"
    sheet.save(contact_path_dest, "PNG")
    sheet.save(contact_path_art, "PNG")
    print(f"Contact sheet saved to {contact_path_dest} and {contact_path_art}")

generate_contact_sheet()

# 3. Optimization pipeline
metadata = {}

def get_source_file(candidates):
    for c in candidates:
        if c in source_map:
            return source_map[c]
    # Try fuzzy match
    for k, v in source_map.items():
        for c in candidates:
            if c.lower() == k.lower():
                return v
    return None

# --- A. Portrait ---
portrait_file = get_source_file(["Ismail El Asiouty"])
if portrait_file:
    print(f"Processing portrait: {portrait_file.name}")
    with Image.open(portrait_file) as img:
        img_rgb = img.convert("RGB")
        pw, ph = img_rgb.size
        # Crop square centered around upper-middle to preserve face
        # Typically face is in upper half
        side = min(pw, ph)
        left = (pw - side) // 2
        # Slight upward bias for face
        top = max(0, min((ph - side) // 4, ph - side))
        crop_box = (left, top, left + side, top + side)
        cropped = img_rgb.crop(crop_box)
        
        # 900x900 WebP
        p900 = cropped.resize((900, 900), Image.Resampling.LANCZOS)
        p900.save(DEST_DIR / "ismail-el-asiouty-900.webp", "WEBP", quality=90)
        metadata["portrait_900"] = {"file": "assets/images/ismail-el-asiouty-900.webp", "width": 900, "height": 900}
        
        # 480x480 WebP
        p480 = cropped.resize((480, 480), Image.Resampling.LANCZOS)
        p480.save(DEST_DIR / "ismail-el-asiouty-480.webp", "WEBP", quality=88)
        metadata["portrait_480"] = {"file": "assets/images/ismail-el-asiouty-480.webp", "width": 480, "height": 480}
        
        # OG Image (1200x630)
        og = Image.new("RGB", (1200, 630), color="#0F1114")
        og_draw = ImageDraw.Draw(og)
        # Background subtle gradient/glow
        for r in range(400, 0, -10):
            alpha_val = int(25 * (1 - r / 400))
            og_draw.ellipse([850 - r, 315 - r, 850 + r, 315 + r], outline=(212, 175, 55, alpha_val))
            
        # Draw portrait on right side with gold border
        portrait_og = cropped.resize((440, 440), Image.Resampling.LANCZOS)
        og.paste(portrait_og, (700, 95))
        og_draw.rectangle([696, 91, 1144, 539], outline="#D4AF37", width=3)
        
        # Accent line & Typography on left side
        og_draw.rectangle([80, 140, 84, 490], fill="#D4AF37")
        og_draw.text((110, 160), "ISMAIL EL ASIOUTY", fill="#D4AF37")
        og_draw.text((110, 220), "SEO Specialist", fill="#ECE8DF")
        og_draw.text((110, 310), "Technical SEO · GEO & AEO\nPython & AI-Powered Tools", fill="#A8A396")
        og_draw.text((110, 440), "Proven Organic Growth & Search Architecture", fill="#E8C96A")
        
        og.save(DEST_DIR / "og-image.jpg", "JPEG", quality=90)
        metadata["og_image"] = {"file": "assets/images/og-image.jpg", "width": 1200, "height": 630}
        print("Portrait and OG image generated successfully.")

# --- B. Logo ---
logo_file = get_source_file(["logo"])
if logo_file:
    print(f"Processing logo: {logo_file.name}")
    with Image.open(logo_file) as img:
        img_rgb = img.convert("RGB")
        lw, lh = img_rgb.size
        # Save original copy
        img_rgb.save(DEST_DIR / "logo-original.jpg", "JPEG", quality=95)
        
        # Make transparent version: alpha = max(R,G,B), rgb = rgb / (alpha/255.0)
        img_rgba = img.convert("RGBA")
        pixels = img_rgba.load()
        for y in range(lh):
            for x in range(lw):
                r, g, b, _ = pixels[x, y]
                alpha = max(r, g, b)
                if alpha == 0:
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    norm = alpha / 255.0
                    new_r = min(255, int(round(r / norm)))
                    new_g = min(255, int(round(g / norm)))
                    new_b = min(255, int(round(b / norm)))
                    pixels[x, y] = (new_r, new_g, new_b, alpha)
                    
        img_rgba.save(DEST_DIR / "logo-transparent.png", "PNG")
        metadata["logo"] = {"file": "assets/images/logo-transparent.png", "width": lw, "height": lh}
        
        # Favicons: 32x32, 180x180 (apple-touch-icon), 512x512
        fav32 = img_rgba.resize((32, 32), Image.Resampling.LANCZOS)
        fav32.save(DEST_DIR / "favicon-32x32.png", "PNG")
        
        fav180 = img_rgba.resize((180, 180), Image.Resampling.LANCZOS)
        fav180.save(DEST_DIR / "apple-touch-icon.png", "PNG")
        
        fav512 = img_rgba.resize((512, 512), Image.Resampling.LANCZOS)
        fav512.save(DEST_DIR / "favicon-512x512.png", "PNG")
        
        fav32.save(DEST_DIR / "favicon.ico", format="ICO")
        print("Logo and favicons generated successfully.")

# --- C. Screenshots Pipeline ---
def optimize_screenshot(source_names, dest_name, label=""):
    src = get_source_file(source_names)
    if not src:
        print(f"[NOT FOUND] Screenshot for {dest_name} (checked: {source_names})")
        return None
    with Image.open(src) as img:
        img_rgb = img.convert("RGB")
        w, h = img_rgb.size
        # Max width 1600px
        if w > 1600:
            target_w = 1600
            target_h = int(round(h * (1600.0 / w)))
            optimized = img_rgb.resize((target_w, target_h), Image.Resampling.LANCZOS)
        else:
            target_w, target_h = w, h
            optimized = img_rgb
            
        out_path = DEST_DIR / f"{dest_name}.webp"
        optimized.save(out_path, "WEBP", quality=85)
        meta_entry = {
            "file": f"assets/images/{dest_name}.webp",
            "source": src.name,
            "label": label or src.stem.replace('\xa0', ' ').strip(),
            "width": target_w,
            "height": target_h
        }
        metadata[dest_name] = meta_entry
        print(f"Saved {dest_name}.webp ({target_w}x{target_h}) from {src.name}")
        return meta_entry

# Case Studies
optimize_screenshot(["GSC Medical 2"], "case-1-medical-main", "GSC Medical 2")
optimize_screenshot(["GSC Medical"], "case-1-medical-secondary", "GSC Medical")
optimize_screenshot(["Tourist office", "Tourist Office"], "case-2-travel-main", "Tourist office")
optimize_screenshot(["GSC 5"], "case-3-ecommerce-main", "GSC 5")

# Evidence Gallery
optimize_screenshot(["GSC 4"], "gsc-4", "GSC 4")
optimize_screenshot(["GSC AI1"], "gsc-ai-1", "GSC AI1")
optimize_screenshot(["GSC AI2"], "gsc-ai-2", "GSC AI2")
optimize_screenshot(["GSC index1"], "gsc-index-1", "GSC index1")
optimize_screenshot(["GSC index2"], "gsc-index-2", "GSC index2")
optimize_screenshot(["GSC1"], "gsc-1", "GSC1")
optimize_screenshot(["GSC2"], "gsc-2", "GSC2")
optimize_screenshot(["GSC3"], "gsc-3", "GSC3")

# Save metadata
with open(DEST_DIR / "images-meta.json", "w", encoding="utf-8") as f:
    json.dump(metadata, f, indent=2)

print("\n--- Summary of Image Metadata ---")
for k, v in metadata.items():
    print(f"  {k}: {v.get('file')} ({v.get('width')}x{v.get('height')})")
