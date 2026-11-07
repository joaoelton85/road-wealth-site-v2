"""Generate print-friendly diagnosis bars from ROAD's approved color palette.

The 13 image variants contain no client data: only the selected public score (0-12).
All elements including color and marker are pixels, not CSS background paint.
"""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path("public/assets")
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1024, 96
COFFEE = (72, 58, 47, 255)
SAND = (243, 236, 227, 255)
COLORS = [
    (212, 160, 128, 255),
    (215, 188, 119, 255),
    (123, 163, 152, 255),
]

for score in range(13):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    start, split1, split2, end = 8, round(W*7/13), round(W*10/13), W-8
    d.rectangle((start, 48, split1-1, 79), fill=COLORS[0])
    d.rectangle((split1, 48, split2-1, 79), fill=COLORS[1])
    d.rectangle((split2, 48, end, 79), fill=COLORS[2])
    cx = round(start + score / 12 * (end-start))
    # A white underlay separates the pointer from the background in e-mail and print.
    d.polygon([(cx-15,17),(cx+15,17),(cx,47)],fill=(255,255,255,255))
    d.polygon([(cx-11,20),(cx+11,20),(cx,42)],fill=COFFEE)
    path = OUT / f"checkup-bar-{score}.png"
    img.save(path, optimize=True)
    assert path.stat().st_size > 300
    print(f"{path}: {path.stat().st_size} bytes")
