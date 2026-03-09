"""Generate Caelith 'C' lettermark favicon in multiple formats."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = r"C:\Users\julia\.openclaw\sandboxes\caelith-project\src\frontend"

BG = (45, 51, 51)       # #2D3333
FG = (197, 224, 238)     # #C5E0EE
RADIUS_RATIO = 0.1875    # corner radius relative to size

def rounded_rect(draw, xy, radius, fill):
    x0, y0, x1, y1 = xy
    r = radius
    draw.rectangle([x0+r, y0, x1-r, y1], fill=fill)
    draw.rectangle([x0, y0+r, x1, y1-r], fill=fill)
    draw.pieslice([x0, y0, x0+2*r, y0+2*r], 180, 270, fill=fill)
    draw.pieslice([x1-2*r, y0, x1, y0+2*r], 270, 360, fill=fill)
    draw.pieslice([x0, y1-2*r, x0+2*r, y1], 90, 180, fill=fill)
    draw.pieslice([x1-2*r, y1-2*r, x1, y1], 0, 90, fill=fill)

def make_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    r = int(size * RADIUS_RATIO)
    rounded_rect(draw, (0, 0, size-1, size-1), r, BG)
    
    # Try to use a system bold font, fall back to default
    font_size = int(size * 0.625)
    try:
        # Windows system fonts
        for fname in ["segoeuib.ttf", "arialbd.ttf", "calibrib.ttf"]:
            try:
                font = ImageFont.truetype(fname, font_size)
                break
            except:
                continue
        else:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()
    
    # Center the "C"
    bbox = draw.textbbox((0, 0), "C", font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1] - size * 0.02  # slight optical lift
    draw.text((x, y), "C", fill=FG, font=font)
    
    return img

# Generate sizes
sizes = [16, 32, 48, 180, 192, 512]
images = {}
for s in sizes:
    images[s] = make_icon(s)

# Save ICO (16, 32, 48)
ico_path = os.path.join(OUT_DIR, "src", "app", "favicon.ico")
images[16].save(ico_path, format="ICO", sizes=[(16,16), (32,32), (48,48)],
                append_images=[images[32], images[48]])
print(f"Saved {ico_path}")

# Save apple-touch-icon
apple_path = os.path.join(OUT_DIR, "public", "apple-touch-icon.png")
images[180].save(apple_path, format="PNG")
print(f"Saved {apple_path}")

# Save android icons
for s in [192, 512]:
    p = os.path.join(OUT_DIR, "public", f"icon-{s}.png")
    images[s].save(p, format="PNG")
    print(f"Saved {p}")

# Save favicon-32 as PNG too (for <link rel="icon" type="image/png">)
p32 = os.path.join(OUT_DIR, "public", "favicon-32x32.png")
images[32].save(p32, format="PNG")
print(f"Saved {p32}")

print("Done!")
